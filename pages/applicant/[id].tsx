import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./applicant.module.css";

// Mock applicant data - detailed profiles
const APPLICANT_DATABASE: { [key: string]: any } = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    title: "Community Outreach Volunteer",
    role: "Medic",
    appliedDate: "March 15, 2025",
    status: "Under Review",
    avatar: "👩‍⚕️",
    gender: "female",
    personal: {
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, City, State 12345",
      emergencyContact: "John Johnson - (555) 987-6543",
    },
    experience: {
      title: "Previous Volunteer Experience",
      description: "3 years at local food bank, event coordination experience, youth mentoring program volunteer",
      skills: ["Communication", "Event Planning", "Leadership", "Bilingual (Spanish)"],
      motivation: "I am passionate about giving back to my community and helping those in need. Having grown up in this area, I understand the challenges many families face and want to be part of the solution.",
    },
    documents: [
      { name: "Resume_Sarah_Johnson.pdf", size: "2.3 MB", date: "Mar 15, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F5f9ce991089f4cff860e5dbd32a874a8?format=webp&width=800&height=1200" },
      { name: "Cover_Letter.docx", size: "1.1 MB", date: "Mar 15, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F8caa1a33fbbc4ce8ac590911bc38401c?format=webp&width=800&height=1200" },
      { name: "Background_Check_Certificate.pdf", size: "890 KB", date: "Mar 15, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F33801296e59f43b882fed63d553eaf9b?format=webp&width=800&height=1200" },
      { name: "ID_Photo.jpg", size: "1.5 MB", date: "Mar 15, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Fd8b10940354b4d7493d32b06eb2371e9?format=webp&width=800&height=1200" },
    ],
    timeline: [
      { event: "Application Submitted", date: "Mar 15, 2025 at 2:30 PM", pending: false },
      { event: "Under Review", date: "Mar 15, 2025 at 9:00 AM", pending: false },
      { event: "Interview Scheduled", date: "Pending", pending: true },
    ],
    references: [
      {
        name: "Maria Rodriguez",
        title: "Food Bank Supervisor",
        phone: "(555) 234-5678",
      },
      {
        name: "David Chen",
        title: "Youth Program Director",
        phone: "(555) 345-6789",
      },
      {
        name: "Lisa Thompson",
        title: "Community Center Manager",
        phone: "(555) 456-7890",
      },
    ],
    notes: "",
  },
  "3": {
    id: 3,
    name: "Emily Rodriguez",
    title: "Education & Community Support Volunteer",
    role: "Educator",
    appliedDate: "March 18, 2025",
    status: "Under Review",
    avatar: "👩‍🏫",
    gender: "female",
    personal: {
      email: "emily.rodriguez@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, City, State 12345",
      emergencyContact: "Carlos Rodriguez - (555) 876-5432",
    },
    experience: {
      title: "Previous Volunteer Experience",
      description: "5 years of tutoring experience, community education workshops facilitator, mentorship program lead, fluent in English and Spanish",
      skills: ["Teaching", "Tutoring", "Mentorship", "Community Engagement", "Bilingual (Spanish)"],
      motivation: "Education is a powerful tool for change. I believe every young person deserves access to quality mentorship and educational support. Through volunteering, I want to help bridge educational gaps and inspire the next generation.",
    },
    documents: [
      { name: "Resume_Emily_Rodriguez.pdf", size: "2.4 MB", date: "Mar 18, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F5f9ce991089f4cff860e5dbd32a874a8?format=webp&width=800&height=1200" },
      { name: "Cover_Letter.docx", size: "1.2 MB", date: "Mar 18, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F8caa1a33fbbc4ce8ac590911bc38401c?format=webp&width=800&height=1200" },
      { name: "Background_Check_Certificate.pdf", size: "920 KB", date: "Mar 18, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F33801296e59f43b882fed63d553eaf9b?format=webp&width=800&height=1200" },
      { name: "ID_Photo.jpg", size: "1.6 MB", date: "Mar 18, 2025", icon: "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Fd8b10940354b4d7493d32b06eb2371e9?format=webp&width=800&height=1200" },
    ],
    timeline: [
      { event: "Application Submitted", date: "Mar 18, 2025 at 3:15 PM", pending: false },
      { event: "Under Review", date: "Mar 18, 2025 at 10:30 AM", pending: false },
      { event: "References Check", date: "Pending", pending: true },
    ],
    references: [
      {
        name: "Dr. James Wilson",
        title: "Education Program Director",
        phone: "(555) 567-8901",
      },
      {
        name: "Patricia Martinez",
        title: "Community Center Coordinator",
        phone: "(555) 678-9012",
      },
      {
        name: "Michael Zhang",
        title: "Tutoring Service Manager",
        phone: "(555) 789-0123",
      },
    ],
    notes: "",
  },
};

export default function ApplicantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [notes, setNotes] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const applicant = id ? APPLICANT_DATABASE[id as string] : null;

  const getAvatarImage = (gender: string) => {
    const femaleUrl = "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2Ff9735712ac9445bfa5fc8e23bf5556e0?format=webp&width=800&height=1200";
    const maleUrl = "https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F5b17614135f047edaec8a0a56e56e95c?format=webp&width=800&height=1200";
    return gender === "female" ? femaleUrl : maleUrl;
  };

  if (!applicant) {
    return (
      <div className={styles.notFound}>
        <Header />
        <main className={styles.notFoundContent}>
          <div>
            <p className={styles.notFoundText}>Applicant not found</p>
            <button
              onClick={() => router.push("/volunteers")}
              className={styles.notFoundButton}
            >
              Back to Volunteers
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSaveNotes = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/volunteers" className={styles.breadcrumbLink}>
            Applications
          </Link>
          <span>/</span>
          <Link href="/volunteers" className={styles.breadcrumbLink}>
            Volunteer Applications
          </Link>
          <span>/</span>
          <span className={styles.breadcrumbActive}>{applicant.name}</span>
        </div>

        {/* Applicant Header */}
        <div className={styles.applicantHeader}>
          <div className={styles.headerContent}>
            <div className={styles.applicantInfo}>
              <img
                src={getAvatarImage(applicant.gender || "female")}
                alt={applicant.name}
                className={styles.applicantAvatar}
                style={{ objectFit: "contain" }}
              />
              <div>
                <h1 className={styles.applicantName}>{applicant.name}</h1>
                <p className={styles.applicantTitle}>{applicant.title}</p>
                <p className={styles.applicantDate}>Applied on {applicant.appliedDate}</p>
              </div>
            </div>

            <div className={styles.headerActions}>
              <span className={`${styles.statusBadge} ${styles.statusUnderReview}`}>
                {applicant.status}
              </span>
              <button
                onClick={() => router.push("/approval-status")}
                className={styles.approveButton}
              >
                Approve
              </button>
              <button
                onClick={() => router.push("/rejection-status")}
                className={styles.rejectButton}
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.gridLayout}>
          {/* Left Column */}
          <div className={styles.mainColumn}>
            {/* Personal Information */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Personal Information</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>Email</label>
                  <p className={styles.infoValue}>{applicant.personal.email}</p>
                </div>
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>Phone</label>
                  <p className={styles.infoValue}>{applicant.personal.phone}</p>
                </div>
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>Address</label>
                  <p className={styles.infoValue}>{applicant.personal.address}</p>
                </div>
                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>Emergency Contact</label>
                  <p className={styles.infoValue}>{applicant.personal.emergencyContact}</p>
                </div>
              </div>
            </div>

            {/* Experience & Skills */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Experience & Skills</h2>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{applicant.experience.title}</h3>
                <p className={styles.sectionDescription}>{applicant.experience.description}</p>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Relevant Skills</h3>
                <div className={styles.skillsList}>
                  {applicant.experience.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Motivation</h3>
                <p className={styles.sectionDescription}>{applicant.experience.motivation}</p>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Uploaded Documents</h2>

              <div className={styles.documentsList}>
                {applicant.documents.map((doc, idx) => (
                  <div key={idx} className={styles.documentItem}>
                    <div className={styles.documentInfo}>
                      <img src={doc.icon} alt={doc.name} className={styles.documentIcon} />
                      <div className={styles.documentMeta}>
                        <p className={styles.documentName}>{doc.name}</p>
                        <p className={styles.documentSize}>{doc.size} • Uploaded {doc.date}</p>
                      </div>
                    </div>
                    <div className={styles.documentActions}>
                      <button className={styles.documentButton} title="View">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className={styles.documentButton} title="Download">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className={styles.downloadAllButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download All Documents
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.sidebar}>
            {/* Application Timeline */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Application Timeline</h2>

              <div className={styles.timeline}>
                {applicant.timeline.map((item, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineMarker}>
                      <div className={`${styles.timelineDot} ${item.pending ? styles.timelineDotPending : ""}`} />
                      {idx < applicant.timeline.length - 1 && <div className={styles.timelineLine} />}
                    </div>
                    <div className={styles.timelineContent}>
                      <p className={`${styles.timelineEvent} ${item.pending ? styles.timelineEventPending : ""}`}>
                        {item.event}
                      </p>
                      <p className={styles.timelineDate}>{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>References</h2>

              <div className={styles.referencesList}>
                {applicant.references.map((ref, idx) => (
                  <div key={idx} className={styles.referenceItem}>
                    <p className={styles.referenceName}>{ref.name}</p>
                    <p className={styles.referenceTitle}>{ref.title}</p>
                    <p className={styles.referencePhone}>{ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Internal Notes</h2>

              <div className={styles.notesSection}>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this applicant..."
                  className={styles.notesTextarea}
                  rows={4}
                />

                <button
                  onClick={handleSaveNotes}
                  className={`${styles.notesButton} ${isSaved ? styles.saved : ""}`}
                >
                  {isSaved ? "✓ Saved" : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}