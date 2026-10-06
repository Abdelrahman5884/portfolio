import { useState } from 'react';
import { projectsData } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="projects-section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-layer-group" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Backend Projects</span>
          </h2>
          <p className="section-subtitle">
            Production-grade systems, RESTful API platforms, AI integrations, and scalable relational database architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              <span>{cat}</span>
              {cat === 'All' ? (
                <span className="filter-count">{projectsData.length}</span>
              ) : (
                <span className="filter-count">
                  {projectsData.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card glass-card"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
            >
              {/* Thumbnail Container */}
              <div
                className="project-thumb-container"
                onClick={() => onSelectProject(project)}
                role="button"
                tabIndex={-1}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-thumb-img"
                  loading="lazy"
                />
                <div className="project-thumb-overlay">
                  <span className="quick-view-badge">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    <span>View Architecture</span>
                  </span>
                </div>
                <div className="project-category-tag">
                  {project.category}
                </div>
              </div>

              {/* Project Body */}
              <div className="project-body">
                <div className="project-header">
                  <h3
                    className="project-title"
                    onClick={() => onSelectProject(project)}
                  >
                    {project.title}
                  </h3>
                  <div className="project-tagline">{project.tagline}</div>
                </div>

                <p className="project-description">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="project-tech-pills">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-pill more">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="project-footer-actions">
                  <button
                    type="button"
                    className="btn-card-action primary"
                    onClick={() => onSelectProject(project)}
                  >
                    <i className="fa-solid fa-circle-info" />
                    <span>Details</span>
                  </button>

                  <div className="project-external-links">
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon-link live-link"
                        title="Visit Live Platform"
                        aria-label={`Live Website for ${project.title}`}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon-link"
                        title="View GitHub Repository"
                        aria-label={`GitHub Repository for ${project.title}`}
                      >
                        <i className="fa-brands fa-github" />
                      </a>
                    )}
                    {project.linkedin && (
                      <a
                        href={project.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon-link"
                        title="View Post on LinkedIn"
                        aria-label={`LinkedIn Post for ${project.title}`}
                      >
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
