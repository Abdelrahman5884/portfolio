import { personalData, servicesData, educationData } from '../data/portfolioData';

export default function About() {
  const currentEdu = educationData[0];

  return (
    <section id="about" className="about-section">
      <div className="content-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-user" />
            <span>Profile & Background</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            A software engineer passionate about scalable backend architecture, optimized databases, and clean code.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="about-bento-grid">
          {/* Tile 1: Photo 2 (Casual Balenciaga Outfit) */}
          <div className="bento-tile bento-photo-tile glass-card">
            <div className="bento-photo-wrapper">
              <img
                src={personalData.aboutImage}
                alt={`${personalData.displayName} - Casual`}
                className="bento-photo-img"
                loading="lazy"
              />
              <div className="bento-photo-overlay" />
            </div>
            <div className="bento-photo-caption">
              <div className="caption-pill">
                <span className="live-dot" />
                <span>Problem Solver & Developer</span>
              </div>
              <div className="caption-location">
                <i className="fa-solid fa-location-dot text-cyan" />
                <span>{personalData.location}</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Core Engineering Mission */}
          <div className="bento-tile bento-mission-tile glass-card">
            <div className="bento-icon-box">
              <i className="fa-solid fa-code-branch" />
            </div>
            <h3 className="bento-tile-title">High-Performance Backend Engineering</h3>
            <p className="bento-tile-text">
              I specialize in designing scalable Laravel APIs that serve real-world workloads smoothly. From architecting normalized MySQL schemas to tuning queries with composite indexing and Redis caching, I focus on building reliable systems with low latency and clean, maintainable architecture.
            </p>
            <div className="bento-tags-row">
              <span className="bento-tag">SOLID & OOP</span>
              <span className="bento-tag">Clean Architecture</span>
              <span className="bento-tag">Query Profiling</span>
              <span className="bento-tag">Sanctum Auth</span>
            </div>
          </div>

          {/* Tile 3: Education & Academic Foundation */}
          <div className="bento-tile bento-edu-tile glass-card">
            <div className="bento-icon-box edu">
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <div className="bento-edu-header">
              <span className="edu-status-pill">{currentEdu.status}</span>
              <span className="edu-period-text">{currentEdu.period}</span>
            </div>
            <h4 className="bento-edu-title">{currentEdu.faculty}</h4>
            <h5 className="bento-edu-sub">{currentEdu.institution}</h5>
            <p className="bento-edu-desc">{currentEdu.highlight}</p>
          </div>

          {/* Tile 4: What I Build / Core Services (4 Pillars) */}
          <div className="bento-tile bento-services-tile glass-card">
            <h3 className="bento-tile-title mb-4">Core Focus Areas</h3>
            <div className="services-compact-grid">
              {servicesData.map((service, idx) => (
                <div key={idx} className="service-compact-item">
                  <div className="service-compact-icon">
                    <i className={`fa-solid ${service.icon}`} />
                  </div>
                  <div>
                    <h5 className="service-compact-title">{service.title}</h5>
                    <p className="service-compact-desc">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
