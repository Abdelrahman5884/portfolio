import { personalData, servicesData } from '../data/portfolioData';

/**
 * Editorial About Showcase
 * - Clean framed portrait on left with ZERO overlays and ZERO chips
 * - 4 key metric cards below the photo
 * - High-impact narrative, architecture standards, and 4 core focus pillars on right
 * - Buttons row removed per user request
 */
export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="content-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-code" />
            <span>Profile &amp; Engineering Philosophy</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Software engineer specialized in scalable backend architectures, high-performance database optimization, and clean code.
          </p>
        </div>

        {/* Masterpiece 2-Column Showcase */}
        <div className="about-showcase-grid">
          {/* Left Column: Portrait & Proof Metrics */}
          <div className="about-profile-col">
            <div className="about-photo-card glass-card">
              <div className="about-photo-wrapper">
                <img
                  src={personalData.aboutImage}
                  alt={personalData.displayName}
                  className="about-photo-img"
                  loading="lazy"
                />
                <div className="about-photo-glow" aria-hidden="true" />
              </div>
            </div>

            {/* 4 Proof Metric Counter Cards */}
            <div className="about-metrics-grid">
              {personalData.stats.map((st, idx) => (
                <div key={idx} className="about-metric-card glass-card">
                  <div className="metric-icon-wrap">
                    <i className={`fa-solid ${st.icon}`} />
                  </div>
                  <div className="metric-info">
                    <div className="metric-val">{st.value}</div>
                    <div className="metric-lbl">{st.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Engineering Narrative, Standards & 4 Focus Pillars */}
          <div className="about-content-card glass-card">
            <div className="about-role-badge">
              <span className="live-dot" />
              <span>Software Engineer &amp; Backend Specialist</span>
            </div>

            <h3 className="about-story-title">
              Crafting High-Throughput APIs &amp; Resilient Architectures
            </h3>

            <div className="about-story-paragraphs">
              <p>
                I specialize in designing scalable Laravel APIs that serve real-world workloads smoothly. From architecting normalized MySQL schemas to tuning queries with composite indexing and Redis caching, I focus on building reliable systems with low latency and clean, maintainable architecture.
              </p>
              <p>
                My engineering approach is rooted in SOLID design principles, clean architecture, and defensive coding. I bridge high-level system requirements with battle-tested implementation, ensuring every endpoint is secure, robustly tested, and built for growth.
              </p>
            </div>

            {/* Architecture Standards Chips */}
            <div className="about-tags-row">
              <span className="about-tag">
                <i className="fa-solid fa-shield-halved text-cyan" /> SOLID &amp; OOP
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-layer-group text-cyan" /> Clean Architecture
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-gauge-high text-cyan" /> Query Profiling
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-lock text-cyan" /> Sanctum Auth
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-bolt text-cyan" /> Redis Caching
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-network-wired text-cyan" /> RESTful APIs
              </span>
            </div>

            {/* 4 Core Focus Pillars Grid */}
            <div className="about-pillars-header">
              <span className="pillars-kicker">Core Specializations</span>
              <h4 className="pillars-title">What I Architect &amp; Deliver</h4>
            </div>

            <div className="about-pillars-grid">
              {servicesData.map((service, idx) => (
                <div key={idx} className="about-pillar-item">
                  <div className="pillar-item-icon">
                    <i className={`fa-solid ${service.icon}`} />
                  </div>
                  <div className="pillar-item-content">
                    <h5 className="pillar-item-title">{service.title}</h5>
                    <p className="pillar-item-desc">{service.description}</p>
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

