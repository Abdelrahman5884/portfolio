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

        {/* 5 CATEGORY CARDS — DIVIDED AS ORIGINAL, WITH BIG COLORFUL ICONS */}
        <div className="skills-categories-grid">
          {skillsCategories.map((cat, idx) => (
            <div key={idx} className="skill-category-card glass-card">
              <div className="category-header">
                <div className="category-icon-box">
                  <i className={`fa-solid ${cat.icon}`} />
                </div>
                <h3 className="category-title">{cat.category}</h3>
              </div>

              <div className="category-skills-grid">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`skill-icon-tile ${skill.highlight ? 'highlighted' : ''}`}
                    style={{
                      '--brand-color': skill.color,
                      '--brand-rgb': skill.rgb,
                    }}
                  >
                    {skill.highlight && (
                      <span className="skill-tile-star" title="Core Strength">★</span>
                    )}

                    <div className="skill-tile-icon-box">
                      {skill.isFontAwesome ? (
                        <i className={skill.devicon} style={{ color: skill.color }} />
                      ) : (
                        <i
                          className={skill.devicon}
                          style={skill.isWhite ? { color: '#ffffff' } : undefined}
                        />
                      )}
                    </div>

                    <span className="skill-tile-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
