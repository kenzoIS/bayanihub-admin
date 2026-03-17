import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./approval-status.module.css";

export default function ApprovalStatus() {
  const router = useRouter();

  const applicationData = {
    id: "#APP-2025-001234",
    submittedDate: "January 15, 2025",
    approvedDate: "January 22, 2025",
    processingTime: "7 business days",
  };

  const nextSteps = [
    {
      step: 1,
      title: "Check your email for confirmation",
      description: "We've sent detailed instructions to your registered email address.",
    },
    {
      step: 2,
      title: "Complete account setup",
      description: "Follow the link in your email to complete your account setup.",
    },
    {
      step: 3,
      title: "Access your dashboard",
      description: "Start using all available features and services.",
    },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <div className={styles.successCircle}>
            <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Title and Message */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Application Approved!</h1>
          <p className={styles.subtitle}>
            Congratulations! Your application has been successfully approved.
          </p>
        </div>

        {/* Application Details */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Application Details</h2>
          <div className={styles.detailsGrid}>
            <div className={`${styles.detailColumn} ${styles.detailColumnBorderRight}`}>
              <div className={styles.detailPadding}>
                <p className={styles.detailLabel}>Application ID</p>
                <p className={styles.detailValue}>{applicationData.id}</p>
              </div>
            </div>
            <div className={styles.detailColumn}>
              <p className={styles.detailLabel}>Submitted Date</p>
              <p className={styles.detailValue}>{applicationData.submittedDate}</p>
            </div>
            <div className={`${styles.detailColumn} ${styles.detailColumnBorderRight}`}>
              <div className={styles.detailPadding}>
                <p className={styles.detailLabel}>Approved Date</p>
                <p className={styles.detailValue}>{applicationData.approvedDate}</p>
              </div>
            </div>
            <div className={styles.detailColumn}>
              <p className={styles.detailLabel}>Processing Time</p>
              <p className={styles.detailValue}>{applicationData.processingTime}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Next Steps</h2>
          <div className={styles.stepsContainer}>
            {nextSteps.map((item) => (
              <div key={item.step} className={styles.stepItem}>
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepContent}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGrid}>
          <button className={styles.buttonPrimary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Check Email
          </button>
          <button className={styles.buttonSecondary}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Certificate
          </button>
        </div>

        {/* Back Links */}
        <div className={styles.linkContainer}>
          <button
            onClick={() => router.push("/volunteers")}
            className={styles.link}
          >
            Back to Volunteer Applications
          </button>
          <span className={styles.divider}>•</span>
          <button
            onClick={() => router.push("/")}
            className={styles.link}
          >
            Back to Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
