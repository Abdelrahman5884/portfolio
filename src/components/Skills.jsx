import { skillsCategories } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-code" />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Core toolkit focused on modern Laravel backend engineering, relational databases, caching, and scalable architecture.
          </p>
        </div>

        <div className="skills-categories-grid">
          {skillsCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card glass-card">
              <div className="category-header">
                <div className="category-icon-box">
                  <i className={`fa-solid ${cat.icon}`} />
                </div>
                <h3 className="category-title">{cat.category}</h3>
              </div>

              <div className="skills-pill-wrap">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`skill-pill ${skill.highlight ? 'highlighted' : ''}`}
                  >
                    <i className={skill.icon} />
                    <span>{skill.name}</span>
                    {skill.highlight && <span className="star-dot" title="Core Strength" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Standards & Languages Bar */}
        <div className="extra-skills-row glass-card">
          <div className="extra-skill-col">
            <div className="extra-label">
              <i className="fa-solid fa-shield-halved text-cyan" />
              <span>Engineering Standards:</span>
            </div>
            <div className="tags-list">
              <span className="sub-tag">SOLID Principles</span>
              <span className="sub-tag">DRY & Clean Code</span>
              <span className="sub-tag">OWASP Security</span>
              <span className="sub-tag">RESTful Standards</span>
              <span className="sub-tag">Git Flow</span>
            </div>
          </div>

          <div className="extra-divider" />

          <div className="extra-skill-col">
            <div className="extra-label">
              <i className="fa-solid fa-language text-emerald" />
              <span>Languages:</span>
            </div>
            <div className="tags-list">
              <span className="sub-tag highlight-lang">Arabic (Native)</span>
              <span className="sub-tag highlight-lang">English (Professional)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
