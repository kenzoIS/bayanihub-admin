import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./volunteers.module.css";

// Mock volunteer application data
const MOCK_VOLUNTEERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Medic",
    description: "Registered Nurse with 5 years emergency care experience",
    appliedDate: "Jan 19, 2025",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    status: "pending",
    gender: "female",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Logistic",
    description: "Supply chain manager with warehouse operations experience",
    appliedDate: "Jan 14, 2025",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    status: "rejected",
    rejectionDate: "March 8, 2025",
    gender: "male",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Field",
    description: "Community outreach coordinator with disaster response training",
    appliedDate: "Jan 13, 2025",
    email: "emily@email.com",
    phone: "+1 (555) 456-7890",
    status: "pending",
    gender: "female",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Medic",
    description: "Paramedic with 3 years field emergency response experience",
    appliedDate: "Jan 10, 2025",
    email: "j.wilson@email.com",
    phone: "+1 (555) 234-5678",
    status: "pending",
    gender: "male",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Logistic",
    description: "Warehouse manager with inventory management expertise",
    appliedDate: "Jan 09, 2025",
    email: "lthompson@email.com",
    phone: "+1 (555) 345-6789",
    status: "rejected",
    rejectionDate: "March 5, 2025",
    gender: "female",
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Field",
    description: "Community volunteer with event coordination experience",
    appliedDate: "Jan 08, 2025",
    email: "rmartinez@email.com",
    phone: "+1 (555) 567-8901",
    status: "pending",
    gender: "male",
  },
  {
    id: 7,
    name: "Amanda Davis",
    role: "Medic",
    description: "Healthcare professional with CPR certification",
    appliedDate: "Jan 07, 2025",
    email: "adavis@email.com",
    phone: "+1 (555) 678-9012",
    status: "pending",
    gender: "female",
  },
  {
    id: 8,
    name: "David Lee",
    role: "Logistic",
    description: "Operations specialist with supply chain expertise",
    appliedDate: "Jan 06, 2025",
    email: "dlee@email.com",
    phone: "+1 (555) 789-0123",
    status: "pending",
    gender: "male",
  },
];

const VOLUNTEER_ROLES = ["All Applications", "Medic", "Logistic", "Field"];

function StatCard({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
      {icon && <p className={styles.statIcon}>{icon}</p>}
    </div>
  );
}

function ApplicationItem({
  volunteer,
  onReview,
  onApprove,
  onReject,
}: {
  volunteer: (typeof MOCK_VOLUNTEERS)[0];
  onReview: (id: number) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const getRoleColor = (role: string) => {
    const colors: { [key: string]: { badge: string; icon: string } } = {
      Medic: { badge: styles.roleBadgeMedic, icon: "👨‍⚕️" },
      Logistic: { badge: styles.roleBadgeLogistic, icon: "📦" },
      Field: { badge: styles.roleBadgeField, icon: "🏃" },
    };
    return colors[role] || { badge: styles.roleBadgeMedic, icon: "👤" };
  };

  const getAvatarImage = (gender: string) => {
    const femaleUrl = "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Ff9735712ac9445bfa5fc8e23bf5556e0?format=webp&width=800&height=1200";
    const maleUrl = "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F5b17614135f047edaec8a0a56e56e95c?format=webp&width=800&height=1200";
    return gender === "female" ? femaleUrl : maleUrl;
  };

  const getRoleBadgeImage = (role: string) => {
    const roleImages: { [key: string]: string } = {
      Medic: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Fa681e75636584033a859b766b8f2d8fd?format=webp&width=800&height=1200",
      Logistic: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Ffbdca7a4acbd47888aa70e5c104ee236?format=webp&width=800&height=1200",
      Field: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Fa3c8b6daffb84fc9a6ff74946c06221a?format=webp&width=800&height=1200",
    };
    return roleImages[role] || "";
  };

  const roleColor = getRoleColor(volunteer.role);

  return (
    <div className={styles.applicationItem}>
      <div className={styles.applicationContent}>
        <img
          src={getAvatarImage(volunteer.gender || "male")}
          alt={volunteer.name}
          className={styles.applicationAvatar}
          style={{ objectFit: "contain" }}
        />
        <div className={styles.applicationInfo}>
          <h3 className={styles.applicationName}>{volunteer.name}</h3>
          <p className={styles.applicationDescription}>{volunteer.description}</p>
          <div className={styles.applicationMeta}>
            <span className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {volunteer.appliedDate}
            </span>
            <span className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              {volunteer.email}
            </span>
            <span className={styles.metaItem}>
              <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {volunteer.phone}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.applicationActions}>
        <img
          src={getRoleBadgeImage(volunteer.role)}
          alt={volunteer.role}
          className={styles.roleBadgeImage}
          style={{ height: "2rem", objectFit: "contain" }}
        />
        <button
          onClick={() => onReview(volunteer.id)}
          className={styles.reviewButton}
        >
          <svg className={styles.svg14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Review
        </button>
        <button
          onClick={() => onApprove(volunteer.id)}
          className={`${styles.actionButton} ${styles.approve}`}
        >
          <svg className={styles.svg14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Approve
        </button>
        <button
          onClick={() => onReject(volunteer.id)}
          className={`${styles.actionButton} ${styles.reject}`}
        >
          <svg className={styles.svg14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Reject
        </button>
      </div>
    </div>
  );
}

export default function Volunteers() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("All Applications");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredVolunteers = useMemo(() => {
    if (selectedRole === "All Applications") {
      return MOCK_VOLUNTEERS;
    }
    return MOCK_VOLUNTEERS.filter((v) => v.role === selectedRole);
  }, [selectedRole]);

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVolunteers = filteredVolunteers.slice(startIndex, startIndex + itemsPerPage);

  // Count applications by role
  const counts = {
    total: MOCK_VOLUNTEERS.length,
    medic: MOCK_VOLUNTEERS.filter((v) => v.role === "Medic").length,
    logistic: MOCK_VOLUNTEERS.filter((v) => v.role === "Logistic").length,
    field: MOCK_VOLUNTEERS.filter((v) => v.role === "Field").length,
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Page header */}
        <div className={styles.pageHeader}>
          <Link
            href="/"
            className={styles.backButton}
          >
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className={styles.headerCenter}>
            <div className={styles.headerIcon}>
              <svg className={styles.svg20} viewBox="0 0 24 24" fill="none" stroke="#5C6ED5" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <h1 className={styles.headerTitle}>Volunteer Applications</h1>
            </div>
          </div>
          <Link
            href="/volunteer-verification"
            className={styles.backButton}
          >
            <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21H3V3h9V1H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-9h-2v9z" />
              <path d="M23 1H13v2h8.293L5 19.293a1 1 0 0 0 1.414 1.414L22.707 4.414V13h2V1z" />
            </svg>
            Verify Volunteers
          </Link>
        </div>

        {/* Application Queue section */}
        <div className={styles.queueSection}>
          <div className={styles.queueHeader}>
            <h2 className={styles.queueTitle}>Application Queue</h2>
            <p className={styles.queueSubtitle}>Filter applications by volunteer role</p>
          </div>

          {/* Statistics */}
          <div className={styles.statsGrid}>
            <StatCard label="Total Pending" value={counts.total.toString()} />
            <StatCard label="Medic" value={counts.medic.toString()} />
            <StatCard label="Logistic" value={counts.logistic.toString()} />
            <StatCard label="Field" value={counts.field.toString()} />
          </div>
        </div>

        {/* Filter buttons */}
        <div className={styles.filterButtonsContainer}>
          {VOLUNTEER_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => {
                setSelectedRole(role);
                setCurrentPage(1);
              }}
              className={`${styles.filterButton} ${selectedRole === role ? styles.filterButtonActive : ""}`}
            >
              {role === "All Applications" && (
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              )}
              {role === "Medic" && (
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                </svg>
              )}
              {role === "Logistic" && (
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 2L6 6H2v10h20V6h-4l-3-4z" />
                </svg>
              )}
              {role === "Field" && (
                <svg className={styles.svg16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                </svg>
              )}
              {role}
            </button>
          ))}
        </div>

        {/* Applications list */}
        <div className={styles.applicationsList}>
          {paginatedVolunteers.length > 0 ? (
            <>
              {paginatedVolunteers.map((volunteer) => (
                <ApplicationItem
                  key={volunteer.id}
                  volunteer={volunteer}
                  onReview={(id) => {
                    const vol = MOCK_VOLUNTEERS.find(v => v.id === id);
                    if (vol?.status === "rejected") {
                      router.push(`/rejected-applicant/${id}`);
                    } else {
                      router.push(`/applicant/${id}`);
                    }
                  }}
                  onApprove={() => router.push("/approval-status")}
                  onReject={() => router.push("/rejection-status")}
                />
              ))}
            </>
          ) : (
            <div className={styles.noApplications}>
              <p className={styles.noApplicationsText}>No volunteer applications found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <p className={styles.paginationInfo}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVolunteers.length)} of{" "}
              {filteredVolunteers.length} applications
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
