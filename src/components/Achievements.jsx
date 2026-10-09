import { useState } from 'react';
import { achievementsData } from '../data/portfolioData';

export default function Achievements({ onPreviewCert }) {
  const cert = achievementsData[0];
  const [activeMedia, setActiveMedia] = useState('photo'); // 'photo' | 'cert'

  const currentImage = activeMedia === 'photo' ? cert.photoImage : cert.certImage;
  const currentAlt = activeMedia === 'photo' 
    ? 'Abdelrahman Hassan - ITI Graduation at Creativa Mansoura Hub' 
    : 'Official Stamped ITI Certificate Document';

  return (
    <section id="achievements" className="achievements-section">
      <div className="content-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-award" />
            <span>Official Accreditation & Honors</span>
          </div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Certification</span>
          </h2>
          <p className="section-subtitle">
            150-hour intensive full-stack PHP & Laravel professional training at Egypt's premier Information Technology Institute (ITI - MCIT).
          </p>
        </div>

        {/* Master Prestige Showcase Card */}
        <div className="iti-prestige-card glass-card">
          {/* Top Accreditation Ribbon */}
          <div className="iti-ribbon-bar">
            <div className="iti-ribbon-left">
              <span className="iti-badge-pill iti-badge-mcit">
                <i className="fa-solid fa-shield-halved" />
                <span>MCIT Verified</span>
              </span>
              <span className="iti-badge-pill iti-badge-iti">
                <i className="fa-solid fa-building-columns" />
                <span>Information Technology Institute</span>
              </span>
              <span className="iti-badge-pill iti-badge-creativa">
                <i className="fa-solid fa-lightbulb" />
                <span>Creativa Mansoura Hub</span>
              </span>
            </div>
            <div className="iti-ribbon-right">
              <span className="iti-hours-total">
                <i className="fa-solid fa-clock text-cyan" />
                <span><strong>150</strong> Credit Hours</span>
              </span>
            </div>
          </div>

          {/* Main Showcase Grid */}
          <div className="iti-showcase-grid">
            {/* Left: Interactive Media Stage */}
            <div className="iti-media-column">
              {/* Media Switcher Tab Controls */}
              <div className="iti-media-tabs" role="tablist">
                <button
                  type="button"
                  className={`iti-media-tab ${activeMedia === 'photo' ? 'active' : ''}`}
                  onClick={() => setActiveMedia('photo')}
                  aria-selected={activeMedia === 'photo'}
                >
                  <i className="fa-solid fa-user-graduate" />
                  <span>Graduation Ceremony</span>
                </button>
                <button
                  type="button"
                  className={`iti-media-tab ${activeMedia === 'cert' ? 'active' : ''}`}
                  onClick={() => setActiveMedia('cert')}
                  aria-selected={activeMedia === 'cert'}
                >
                  <i className="fa-solid fa-file-contract" />
                  <span>Stamped Document</span>
                </button>
              </div>

              {/* Main Image Frame */}
              <div
                className="iti-image-frame"
                onClick={() => onPreviewCert(currentImage)}
                title="Click to inspect in high resolution"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPreviewCert(currentImage);
                  }
                }}
              >
                <img
                  src={currentImage}
                  alt={currentAlt}
                  className={`iti-frame-img ${activeMedia === 'cert' ? 'is-document' : 'is-photo'}`}
                  loading="lazy"
                />

                {/* Ambient Corner Accents */}
                <div className="iti-corner-accent top-left" />
                <div className="iti-corner-accent top-right" />
                <div className="iti-corner-accent bottom-left" />
                <div className="iti-corner-accent bottom-right" />

                {/* Floating Enlarge Hint Overlay */}
                <div className="iti-enlarge-overlay">
                  <span className="iti-enlarge-pill">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    <span>Enlarge {activeMedia === 'photo' ? 'Graduation Photo' : 'Stamped Certificate'}</span>
                  </span>
                </div>

                {/* Frame Bottom Caption */}
                <div className="iti-frame-caption">
                  <div className="caption-text">
                    <span className="caption-title">
                      {activeMedia === 'photo'
                        ? 'Abdelrahman Hassan Mohamed'
                        : 'Official Stamped Credential (ITI - MCIT)'}
                    </span>
                    <span className="caption-sub">
                      {activeMedia === 'photo'
                        ? 'Creativa Innovation Hub — Mansoura'
                        : 'Signed by Dr. Heba Saleh, Chairman of ITI'}
                    </span>
                  </div>
                  <span className="caption-action-icon">
                    <i className="fa-solid fa-expand" />
                  </span>
                </div>
              </div>

              {/* Quick-Switch Thumbnails Preview */}
              <div className="iti-mini-switchers">
                <button
                  type="button"
                  className={`iti-mini-thumb ${activeMedia === 'photo' ? 'selected' : ''}`}
                  onClick={() => setActiveMedia('photo')}
                >
                  <img src={cert.photoImage} alt="Graduation thumbnail" />
                  <div className="mini-thumb-label">
                    <i className="fa-solid fa-image" />
                    <span>Graduation Day</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`iti-mini-thumb ${activeMedia === 'cert' ? 'selected' : ''}`}
                  onClick={() => setActiveMedia('cert')}
                >
                  <img src={cert.certImage} alt="Certificate document thumbnail" />
                  <div className="mini-thumb-label">
                    <i className="fa-solid fa-file-lines" />
                    <span>Stamped Document</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Credential Details & Curriculum Breakdown */}
            <div className="iti-content-column">
              {/* Track Title & Identity */}
              <div className="iti-content-header">
                <div className="iti-track-kicker">
                  <i className="fa-solid fa-code text-cyan" />
                  <span>Intensive Track · Summer 2025</span>
                </div>
                <h3 className="iti-main-title">{cert.title}</h3>
                <p className="iti-issuer-line">
                  <i className="fa-solid fa-landmark-dome" />
                  <span>{cert.issuer}</span>
                  <span className="iti-date-dot">•</span>
                  <span className="iti-date-range">{cert.period}</span>
                </p>
                <p className="iti-lead-desc">{cert.description}</p>
              </div>

              {/* Official Endorsement Note */}
              <div className="iti-endorsement-box">
                <div className="iti-stamp-circle">
                  <i className="fa-solid fa-stamp" />
                </div>
                <div className="iti-endorsement-text">
                  <strong>Official Validation:</strong>
                  <span> Certified by <strong>Dr. Heba Saleh</strong>, Chairman of Information Technology Institute (MCIT) with official verification stamps.</span>
                </div>
              </div>

              {/* 150-Hour Curriculum Modules */}
              <div className="iti-curriculum-section">
                <div className="iti-curriculum-header">
                  <span className="iti-section-label">
                    <i className="fa-solid fa-layer-group" />
                    <span>Accredited Curriculum (150 Hours)</span>
                  </span>
                </div>

                <div className="iti-modules-grid">
                  {cert.hoursBreakdown.map((item, idx) => (
                    <div key={idx} className="iti-module-card">
                      <div className="iti-module-header">
                        <div className="iti-module-icon-wrap">
                          <i className={`fa-solid ${item.icon}`} />
                        </div>
                        <span className="iti-module-hours">{item.hours} hrs</span>
                      </div>
                      <h4 className="iti-module-name">{item.subject}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="iti-actions-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onPreviewCert(cert.certImage)}
                >
                  <i className="fa-solid fa-file-shield" />
                  <span>Enlarge Stamped Certificate</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onPreviewCert(cert.photoImage)}
                >
                  <i className="fa-solid fa-image" />
                  <span>View Graduation Photo</span>
                </button>

                <a
                  href={cert.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-cyan iti-linkedin-btn"
                >
                  <i className="fa-brands fa-linkedin" />
                  <span>Verify on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
