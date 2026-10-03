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
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        {/* Modal Banner Image */}
        <div className="modal-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="modal-banner-img"
          />
          <div className="modal-image-gradient" />
          <div className="modal-badge-row">
            <span className="modal-category-badge">{project.category}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          <div className="modal-header-meta">
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-tagline">{project.tagline}</div>
          </div>

          <p className="modal-description">{project.description}</p>

          {/* Key Architectural Highlights */}
          {project.features && project.features.length > 0 && (
            <div className="modal-features-section">
              <h4 className="modal-section-title">
                <i className="fa-solid fa-cube text-cyan" />
                <span>Backend Engineering Highlights:</span>
              </h4>
              <ul className="modal-features-list">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="modal-feature-item">
                    <i className="fa-solid fa-circle-check feature-check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="modal-tech-section">
            <h4 className="modal-section-title">
              <i className="fa-solid fa-microchip text-emerald" />
              <span>Technology Stack & Modules:</span>
            </h4>
            <div className="modal-tech-tags">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-pill highlight">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="modal-actions-bar">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <i className="fa-solid fa-arrow-up-right-from-square" />
                <span>Visit Live Platform</span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={project.website ? "btn btn-secondary" : "btn btn-primary"}
              >
                <i className="fa-brands fa-github" />
                <span>Source Code (GitHub)</span>
              </a>
            )}

            {project.linkedin && (
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fa-brands fa-linkedin-in" />
                <span>LinkedIn Showcase</span>
              </a>
            )}

            <a
              href="#contact"
              onClick={onClose}
              className="btn btn-outline-cyan"
            >
              <i className="fa-solid fa-paper-plane" />
              <span>Inquire About System</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
