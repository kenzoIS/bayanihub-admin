import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./donors.module.css";

// Mock donor data
const MOCK_DONORS = [
  { id: 1, name: "Michael Johnson", bloodType: "A+", location: "Pasig City", appliedDate: "03-15-2024", phone: "(555) 123-4567" },
  { id: 2, name: "Sarah Williams", bloodType: "O-", location: "Quezon City", appliedDate: "02-28-2024", phone: "(555) 987-6543" },
  { id: 3, name: "David Chen", bloodType: "B+", location: "Makati City", appliedDate: "03-22-2024", phone: "(555) 456-7890" },
  { id: 4, name: "Emily Rodriguez", bloodType: "AB+", location: "San Juan City", appliedDate: "01-18-2024", phone: "(555) 234-5678" },
  { id: 5, name: "James Wilson", bloodType: "O+", location: "Mandaluyong City", appliedDate: "03-10-2024", phone: "(555) 345-6789" },
  { id: 6, name: "Lisa Thompson", bloodType: "A-", location: "Caloocan City", appliedDate: "02-14-2024", phone: "(555) 567-8901" },
  { id: 7, name: "Robert Martinez", bloodType: "B-", location: "Taguig City", appliedDate: "03-05-2024", phone: "(555) 678-9012" },
  { id: 8, name: "Amanda Davis", bloodType: "AB-", location: "Manila City", appliedDate: "01-25-2024", phone: "(555) 789-0123" },
];

const BLOOD_TYPES = ["All Blood Types", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = ["All Cities", "Pasig City", "Quezon City", "Makati City", "San Juan City", "Mandaluyong City", "Caloocan City", "Taguig City", "Manila City"];

const BLOOD_TYPE_COLORS: { [key: string]: { bg: string; text: string } } = {
  "A+": { bg: "#FEE2E2", text: "#991B1B" },
  "A-": { bg: "#FECACA", text: "#7F1D1D" },
  "B+": { bg: "#DBEAFE", text: "#1E40AF" },
  "B-": { bg: "#BAE6FD", text: "#0C4A6E" },
  "AB+": { bg: "#E9D5FF", text: "#6B21A8" },
  "AB-": { bg: "#F3E8FF", text: "#5B21B6" },
  "O+": { bg: "#DCFCE7", text: "#166534" },
  "O-": { bg: "#BBFCD9", text: "#065F46" },
};

function BloodTypeBadge({ bloodType }: { bloodType: string }) {
  const color = BLOOD_TYPE_COLORS[bloodType] || { bg: "rgba(92, 110, 213, 0.1)", text: "#5C6ED5" };
  return (
    <span className={styles.bloodTypeBadge} style={{ color: color.text }}>
      {bloodType}
    </span>
  );
}

function DonorCard({ donor, onMenuClick }: { donor: (typeof MOCK_DONORS)[0]; onMenuClick: (id: number) => void }) {
  return (
    <div className={styles.donorCard}>
      <div className={styles.donorCardHeader}>
        <div className={styles.donorAvatar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <BloodTypeBadge bloodType={donor.bloodType} />
      </div>
      <h3 className={styles.donorName}>{donor.name}</h3>
      <p className={styles.donorLocation}>{donor.location}</p>
      <p className={styles.donorApplied}>Applied {donor.appliedDate}</p>
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
  const [selectedBloodType, setSelectedBloodType] = useState("All Blood Types");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredDonors = useMemo(() => {
    return MOCK_DONORS.filter((donor) => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodType = selectedBloodType === "All Blood Types" || donor.bloodType === selectedBloodType;
      const matchesCity = selectedCity === "All Cities" || donor.location === selectedCity;
      return matchesSearch && matchesBloodType && matchesCity;
    });
  }, [searchTerm, selectedBloodType, selectedCity]);

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Page Header with Icon */}
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
                value={selectedBloodType} 
                onChange={(e) => { setSelectedBloodType(e.target.value); setCurrentPage(1); }} 
                className={styles.filterSelect}
              >
                {BLOOD_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              <select 
                value={selectedCity} 
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }} 
                className={styles.filterSelect}
              >
                {CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
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