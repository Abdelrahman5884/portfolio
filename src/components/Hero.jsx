import { useState, useEffect } from 'react';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = personalData.typingTexts;

  // Typewriter effect
  useEffect(() => {
    const currentFullText = texts[typingIndex];
    let timer;

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, 28);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % texts.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingIndex, texts]);

  return (
    <section id="hero" className="hero-section">
      <div className="content-wrapper hero-grid">
        {/* Left Column: Bio & Core Info */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-indicator" />
            <span>Available for Back-End & Laravel Roles</span>
          </div>

          <h1 className="hero-heading">
            Hi, I'm <span className="gradient-text">{personalData.displayName}</span>
          </h1>

          <div className="hero-typewriter-wrap">
            <span className="typewriter-text">{displayedText}</span>
            <span className="typewriter-cursor">_</span>
          </div>

          <p className="hero-lead">
            {personalData.bio}
          </p>

          {/* Call to action buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <i className="fa-solid fa-code" />
              <span>Explore Projects</span>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fa-solid fa-paper-plane" />
              <span>Contact Me</span>
            </a>
            <a
              href={personalData.cvUrl}
              download="Abdelrahman_Hassan_CV.pdf"
              className="btn btn-outline-cyan"
            >
              <i className="fa-solid fa-file-arrow-down" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Social Quick Bar */}
          <div className="hero-social-bar">
            <span className="social-label">Connect:</span>
            <div className="social-links">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="GitHub Profile"
              >
                <i className="fa-brands fa-github" />
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="social-btn"
                title="Send Email"
              >
                <i className="fa-solid fa-envelope" />
              </a>
              <a
                href={personalData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="Chat on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" />
              </a>
              <a
                href={`tel:${personalData.phoneRaw}`}
                className="social-btn"
                title="Call Phone"
              >
                <i className="fa-solid fa-phone" />
              </a>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats-row">
            {personalData.stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">
                  <i className={`fa-solid ${stat.icon}`} />
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Photo 1 (Formal Portrait with Glasses) in Luxury Showcase Card */}
        <div className="hero-avatar-col">
          <div className="hero-showcase-card">
            {/* Ambient Multi-Layer Radial Glow */}
            <div className="hero-photo-glow" />

            {/* Main Portrait Frame */}
            <div className="hero-photo-wrapper">
              <img
                src={personalData.heroImage}
                alt={`${personalData.displayName} - Software Engineer`}
                className="hero-main-photo"
                loading="eager"
              />

              {/* Seamless Bottom Vignette */}
              <div className="hero-photo-fade" />
            </div>

            {/* Floating Tech Pill: Top Right */}
            <div className="hero-floating-badge badge-top">
              <div className="badge-icon laravel">
                <i className="fa-brands fa-laravel" />
              </div>
              <div className="badge-text">
                <span className="badge-title">Laravel & PHP 8</span>
                <span className="badge-sub">Backend Core</span>
              </div>
            </div>

            {/* Floating Tech Pill: Bottom Left */}
            <div className="hero-floating-badge badge-bottom">
              <div className="badge-icon db">
                <i className="fa-solid fa-database" />
              </div>
              <div className="badge-text">
                <span className="badge-title">MySQL & Redis</span>
                <span className="badge-sub">High-Speed Caching</span>
              </div>
            </div>

            {/* Bottom Status Card */}
            <div className="hero-card-status">
              <span className="live-dot" />
              <span>Software Engineering · Mansoura University</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
