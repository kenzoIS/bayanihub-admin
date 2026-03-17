import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./donors.module.css";
import { apiFetch } from "@/lib/api";

interface Donor {
  id: string;
  name: string;
  location: string;
  appliedDate: string;
  phone: string;
  amount: number;
  currency: string;
  status: string;
  message: string;
}

function DonorCard({ donor, onMenuClick }: { donor: Donor; onMenuClick: (id: string) => void }) {
  return (
    <div className={styles.donorCard}>
      <div className={styles.donorCardHeader}>
        <div className={styles.donorAvatar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span className={styles.bloodTypeBadge} style={{ color: "#5C6ED5" }}>
          {donor.currency} {donor.amount}
        </span>
      </div>
      <h3 className={styles.donorName}>{donor.name}</h3>
      <p className={styles.donorLocation}>{donor.location}</p>
      <p className={styles.donorApplied}>Donated {donor.appliedDate}</p>
      <div className={styles.donorCardFooter}>
        <a href={`tel:${donor.phone}`} className={styles.donorPhone}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {donor.phone}
        </a>
        <button onClick={() => onMenuClick(donor.id)} className={styles.donorMenuButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Donors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [currentPage, setCurrentPage] = useState(1);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    async function fetchDonors() {
      setLoading(true);
      try {
        const data = await apiFetch<any[]>("/donors");

        const mapped: Donor[] = (data ?? []).map((row: any) => {
          const profile = row.user_profiles;
          return {
            id: row.id,
            name: profile ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() : "Anonymous",
            location: profile ? `${profile.municipality ?? ""}, ${profile.province ?? ""}`.replace(/^, |, $/g, "") : "",
            appliedDate: row.donated_at ? new Date(row.donated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "",
            phone: profile?.phone ?? "",
            amount: Number(row.amount ?? 0),
            currency: row.currency ?? "PHP",
            status: row.status ?? "pending",
            message: row.message ?? "",
          };
        });

        setDonors(mapped);
      } catch (err) {
        console.error("Error fetching donors:", err);
      }
      setLoading(false);
    }
    fetchDonors();
  }, []);

  const cities = useMemo(() => {
    const c = new Set(donors.map(d => d.location).filter(Boolean));
    return ["All Cities", ...Array.from(c)];
  }, [donors]);

  const statuses = useMemo(() => {
    const s = new Set(donors.map(d => d.status).filter(Boolean));
    return ["All Status", ...Array.from(s)];
  }, [donors]);

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "All Status" || donor.status === selectedStatus;
      const matchesCity = selectedCity === "All Cities" || donor.location === selectedCity;
      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [searchTerm, selectedStatus, selectedCity, donors]);

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.container}>
      <Head><title>Donors | BayaniHub Admin</title></Head>
      <Header />
      <div className={styles.pageHeader}>
        <Link href="/" className={styles.backButton}>
          <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <div className={styles.headerCenter}>
          <div className={styles.headerTitleWrapper}>
            <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M16 3l4 4-4 4M8 3l-4 4 4 4" />
            </svg>
            <h1 className={styles.headerTitle}>Donor Management</h1>
          </div>
        </div>
        <div className={styles.headerSpacer} />
      </div>

      <main className={styles.main}>
        {/* Filters Section */}
        <div className={styles.filtersSection}>
          <div className={styles.filtersContent}>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div className={styles.filterButtons}>
              <select 
                value={selectedStatus} 
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }} 
                className={styles.filterSelect}
              >
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select 
                value={selectedCity} 
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }} 
                className={styles.filterSelect}
              >
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
              <div className={styles.actionButtonsGroup}>
                <button className={styles.actionButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  </svg>
                </button>
                <button className={styles.actionButton}>Export</button>
                <button className={styles.actionButtonPrimary}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Add Donor
                </button>
                <div className={styles.viewToggleGroup}>
                  <span className={styles.viewLabel}>View:</span>
                  <button className={styles.viewButtonActive}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M16 16H0V0H16V16Z" stroke="#E5E7EB"/>
                      <path d="M14 3V7H9V3H14ZM14 9V13H9V9H14ZM7 7H2V3H7V7ZM2 9H7V13H2V9ZM2 1C0.896875 1 0 1.89688 0 3V13C0 14.1031 0.896875 15 2 15H14C15.1031 15 16 14.1031 16 13V3C16 1.89688 15.1031 1 14 1H2Z" fill="#5C6ED5"/>
                    </svg>
                  </button>
                  <button className={styles.viewButtonInactive}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M16 16H0V0H16V16Z" stroke="#E5E7EB"/>
                      <path d="M1.25 1.5C0.834375 1.5 0.5 1.83437 0.5 2.25V3.75C0.5 4.16563 0.834375 4.5 1.25 4.5H2.75C3.16563 4.5 3.5 4.16563 3.5 3.75V2.25C3.5 1.83437 3.16563 1.5 2.75 1.5H1.25ZM6 2C5.44688 2 5 2.44687 5 3C5 3.55312 5.44688 4 6 4H15C15.5531 4 16 3.55312 16 3C16 2.44687 15.5531 2 15 2H6ZM6 7C5.44688 7 5 7.44688 5 8C5 8.55312 5.44688 9 6 9H15C15.5531 9 16 8.55312 16 8C16 7.44688 15.5531 7 15 7H6ZM6 12C5.44688 12 5 12.4469 5 13C5 13.5531 5.44688 14 6 14H15C15.5531 14 16 13.5531 16 13C16 12.4469 15.5531 12 15 12H6ZM0.5 7.25V8.75C0.5 9.16563 0.834375 9.5 1.25 9.5H2.75C3.16563 9.5 3.5 9.16563 3.5 8.75V7.25C3.5 6.83437 3.16563 6.5 2.75 6.5H1.25C0.834375 6.5 0.5 6.83437 0.5 7.25Z" fill="#9CA3AF"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donor Cards Grid */}
        {paginatedDonors.length > 0 ? (
          <div className={styles.donorsGrid}>
            {paginatedDonors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} onMenuClick={(id) => console.log("Menu clicked for donor:", id)} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>No donors found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <p className={styles.paginationInfo}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDonors.length)} of {filteredDonors.length} donors
            </p>
            <div className={styles.paginationControls}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={styles.paginationButton}
              >
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.paginationPages}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.pageNumberActive : ""}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
              >
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}