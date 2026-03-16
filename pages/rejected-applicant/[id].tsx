import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, Download, Send, ArrowLeft } from "lucide-react";
import styles from "./rejected-review.module.css";

const REJECTED_APPLICATIONS_DATABASE: { [key: string]: any } = {
  "2": {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    role: "Logistic",
    gender: "male",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F5b17614135f047edaec8a0a56e56e95c?format=webp&width=800&height=1200",
    applicationId: "#APP-2025-0342",
    rejectionDate: "March 8, 2025",
    validationStatus: "Valid",
    rejectionReason:
      "Application does not meet the minimum requirements. Missing required documentation and incomplete information provided.",
    feedbackMessage: `Dear Michael Chen,

Thank you for your application. Unfortunately, we cannot proceed with your application at this time due to incomplete documentation. Please review the requirements and resubmit with all necessary materials.

Best regards,
Application Review Team`,
    notificationStatus: {
      sent: true,
      method: "email",
      timestamp: "Sent on March 8, 2025 at 2:45 PM",
    },
  },
  "5": {
    id: 5,
    name: "Lisa Thompson",
    email: "lthompson@email.com",
    phone: "+1 (555) 345-6789",
    role: "Logistic",
    gender: "female",
    avatar: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Ff9735712ac9445bfa5fc8e23bf5556e0?format=webp&width=800&height=1200",
    applicationId: "#APP-2025-0245",
    rejectionDate: "March 5, 2025",
    validationStatus: "Valid",
    rejectionReason:
      "Application does not meet the minimum requirements. Missing required documentation and incomplete information provided.",
    feedbackMessage: `Dear Lisa Thompson,

Thank you for your application. Unfortunately, we cannot proceed with your application at this time due to incomplete documentation. Please review the requirements and resubmit with all necessary materials.

Best regards,
Application Review Team`,
    notificationStatus: {
      sent: true,
      method: "email",
      timestamp: "Sent on March 5, 2025 at 3:20 PM",
    },
  },
};

export default function RejectedApplicationReview() {
  const router = useRouter();
  const { id } = router.query;

  const application = id ? REJECTED_APPLICATIONS_DATABASE[id as string] : null;

  if (!application) {
    return (
      <div className={styles.container}>
        <Header />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#737373", fontSize: "1.125rem", marginBottom: "1rem" }}>
              Application not found
            </p>
            <button
              onClick={() => router.push("/volunteers")}
              style={{
                padding: "0.6rem 1rem",
                backgroundColor: "#5C6ED5",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Back to Volunteers
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/volunteers" className={styles.breadcrumbLink}>
            Applications
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbActive}>Application Review</span>
        </div>

        {/* Page Header Table */}
        <table className={styles.headerTable}>
          <tbody>
            <tr>
              <td className={styles.headerTableCell}>
                <h1 className={styles.pageTitle}>Application Rejected</h1>
                <div className={styles.statusBadge}>
                  <div className={styles.statusDot}></div>
                  Status: Rejected
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.headerTableCellContent}>
                {/* Alert Box */}
                <div className={styles.alertBox}>
                  <AlertTriangle className={styles.alertIcon} />
                  <div className={styles.alertContent}>
                    <p className={styles.alertTitle}>Application Rejected</p>
                    <p className={styles.alertText}>
                      This application has been rejected and the user will be notified via feedback message.
                    </p>
                  </div>
                </div>

                {/* Application Details */}
                <div className={styles.card}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Application ID</p>
                      <p className={styles.infoValue}>{application.applicationId}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <p className={styles.infoLabel}>Rejection Date</p>
                      <p className={styles.infoValue}>{application.rejectionDate}</p>
                    </div>
                  </div>
                </div>

                {/* Applicant Information */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Applicant Information</h2>
                  <div className={styles.applicantInfo}>
                    <img
                      src={application.avatar}
                      alt={application.name}
                      className={styles.applicantAvatar}
                      style={{ objectFit: "contain" }}
                    />
                    <div className={styles.applicantDetails}>
                      <p className={styles.applicantName}>{application.name}</p>
                      <p className={styles.applicantEmail}>{application.email}</p>
                    </div>
                  </div>
                </div>

                {/* Validation Status */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Validation Status</h2>
                  <div className={styles.validationGrid}>
                    <div className={styles.validationItem}>
                      <span className={styles.validationValue}>Valid?</span>
                    </div>
                    <div className={styles.validationItem}>
                      <div className={styles.validationContent}>
                        <span className={styles.validationValue}>Reject</span>
                        <span className={styles.validationValue} style={{ fontSize: "0.75rem" }}>
                          Notify User with FB (No)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rejection Reason */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Rejection Reason</h2>
                  <div className={styles.reasonSection}>
                    <p className={styles.reasonText}>{application.rejectionReason}</p>
                  </div>
                </div>

                {/* Feedback Message to User */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Feedback Message to User</h2>
                  <div className={styles.feedbackBox}>
                    <p className={styles.feedbackText}>{application.feedbackMessage}</p>
                  </div>
                </div>

                {/* Notification Status */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Notification Status</h2>
                  <div className={styles.notificationContent}>
                    <svg
                      className={styles.notificationIcon}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <div className={styles.notificationDetails}>
                      <p className={styles.notificationMessage}>
                        User has been notified via {application.notificationStatus.method}
                      </p>
                      <p className={styles.notificationTime}>{application.notificationStatus.timestamp}</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>
            <Download className={styles.icon} />
            Download Report
          </button>
          <button className={`${styles.button} ${styles.buttonSecondary}`}>
            <Send className={styles.icon} />
            Resend Notification
          </button>
          <button
            onClick={() => router.push("/volunteers")}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            <ArrowLeft className={styles.icon} />
            Back to Applications
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
