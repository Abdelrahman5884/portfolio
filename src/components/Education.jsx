import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-graduation-cap" />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">
            Formal <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            Solid foundations in computer science, software engineering principles, algorithms, and distributed systems.
          </p>
        </div>

        <div className="edu-timeline-wrap">
          <div className="edu-timeline-line" />

          <div className="edu-cards-grid">
            {educationData.map((edu, idx) => (
              <div key={idx} className={`edu-card-container ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="edu-timeline-dot">
                  <span className="dot-inner" />
                </div>

                <div className="edu-glass-card glass-card">
                  <div className="edu-header">
                    <span className="edu-period-badge">
                      <i className="fa-regular fa-calendar-days" />
                      <span>{edu.period}</span>
                    </span>
                    <span className={`edu-status-badge ${edu.status.includes('Enrolled') ? 'active' : ''}`}>
                      {edu.status.includes('Enrolled') && <span className="edu-live-dot" />}
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="edu-faculty">{edu.faculty}</h3>
                  <h4 className="edu-institution">
                    <i className="fa-solid fa-building-columns" />
                    <span>{edu.institution}</span>
                  </h4>

                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-highlight">{edu.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
