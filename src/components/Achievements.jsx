import { achievementsData, personalData } from '../data/portfolioData';

export default function Achievements({ onPreviewCert }) {
  const cert = achievementsData[0];

  return (
    <section id="achievements" className="achievements-section">
      <div className="content-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-award" />
            <span>Credentials & Milestones</span>
          </div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Certification</span>
          </h2>
          <p className="section-subtitle">
            150-hour intensive full-stack PHP & Laravel professional training at Egypt's premier Information Technology Institute (ITI - MCIT).
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="achievement-spotlight-card glass-card">
          <div className="achievement-dual-grid">
            {/* Left: Photo 3 (Full Suit Stature by Car) */}
            <div className="achievement-portrait-col">
              <div className="achievement-portrait-wrapper">
                <img
                  src={personalData.journeyImage}
                  alt={`${personalData.displayName} - Formal Stature`}
                  className="achievement-portrait-img"
                  loading="lazy"
                />
                <div className="achievement-portrait-fade" />
                <div className="achievement-portrait-badge">
                  <i className="fa-solid fa-certificate text-cyan" />
                  <span>ITI Graduate · PHP Specialist</span>
                </div>
              </div>
            </div>

            {/* Right: Certificate Preview & Verified Breakdown */}
            <div className="achievement-details-col">
              {/* Header Badges */}
              <div className="cert-top-row">
                <span className="badge badge-emerald">
                  <i className="fa-solid fa-circle-check" />
                  <span>MCIT Verified</span>
                </span>
                <span className="badge badge-cyan">
                  <i className="fa-solid fa-clock" />
                  <span>150 Intensive Hours</span>
                </span>
                <span className="badge badge-indigo">
                  <i className="fa-solid fa-building-columns" />
                  <span>Creativa Mansoura</span>
                </span>
              </div>

              <h3 className="cert-headline">{cert.title}</h3>
              <p className="cert-issuer-text">
                <strong>Issued by:</strong> {cert.issuer} ({cert.period})
              </p>

              <p className="cert-summary">
                {cert.description}
              </p>

              {/* Hours Breakdown Chips */}
              <div className="cert-hours-chips">
                {cert.hoursBreakdown.map((item, idx) => (
                  <div key={idx} className="hour-chip">
                    <i className={`fa-solid ${item.icon}`} />
                    <span className="chip-name">{item.subject}</span>
                    <span className="chip-hrs">{item.hours}h</span>
                  </div>
                ))}
              </div>

              {/* Certificate Document Thumbnail with 1-Click Preview */}
              <div className="cert-preview-action-row">
                <div
                  className="cert-doc-thumbnail"
                  onClick={() => onPreviewCert(cert.certImage)}
                  title="Click to view full high-resolution certificate"
                >
                  <img
                    src={cert.certImage}
                    alt="Official ITI Certificate"
                    className="cert-thumb-img"
                  />
                  <div className="cert-thumb-overlay">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    <span>View Official Certificate</span>
                  </div>
                </div>

                <div className="cert-action-links">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onPreviewCert(cert.certImage)}
                  >
                    <i className="fa-solid fa-expand" />
                    <span>Enlarge Credential</span>
                  </button>
                  <a
                    href={cert.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-cyan"
                  >
                    <i className="fa-brands fa-linkedin" />
                    <span>Verify on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
