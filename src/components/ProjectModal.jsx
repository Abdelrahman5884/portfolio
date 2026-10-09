import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content glass-card project-modal-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="modal-luxury-header">
          <div className="modal-header-tags">
            <span className="modal-category-badge">
              <i className="fa-solid fa-layer-group" />
              <span>{project.category}</span>
            </span>
            <span className="modal-status-badge">
              <span className="status-live-dot" />
              <span>Architecture Verified</span>
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll">
          {/* Project Title & Tagline */}
          <div className="modal-header-meta">
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-tagline">
              <i className="fa-solid fa-terminal" />
              <span>{project.tagline}</span>
            </div>
          </div>

          {/* High-Resolution Project Screenshot Showcase */}
          <div className="modal-hero-frame">
            <img
              src={project.image}
              alt={project.title}
              className="modal-showcase-img"
              loading="eager"
            />
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-floating-live-link"
                title="Launch Live Platform"
              >
                <span>Live Preview</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            )}
          </div>

          {/* Architectural Overview */}
          <div className="modal-overview-block">
            <h4 className="modal-section-title">
              <i className="fa-solid fa-file-code text-cyan" />
              <span>System Architecture & Overview</span>
            </h4>
            <p className="modal-description">{project.description}</p>
          </div>

          {/* Backend Engineering Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="modal-features-section">
              <h4 className="modal-section-title">
                <i className="fa-solid fa-shield-halved text-cyan" />
                <span>Backend Engineering Highlights</span>
              </h4>
              <div className="modal-features-grid">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="modal-feature-card">
                    <div className="feature-icon-wrapper">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span className="feature-text">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="modal-tech-section">
            <h4 className="modal-section-title">
              <i className="fa-solid fa-microchip text-emerald" />
              <span>Technology Stack & Modules</span>
            </h4>
            <div className="modal-tech-tags">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-pill highlight">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Only Live Website Action If Available (Removed the 3 cluttered buttons) */}
          {project.website && (
            <div className="modal-actions-bar single-action">
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary modal-primary-cta"
              >
                <span>Launch Live Platform</span>
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
