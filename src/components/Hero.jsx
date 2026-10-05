import { useState, useEffect, useRef } from 'react';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeStatIndex, setActiveStatIndex] = useState(null);

  // 3D Tilt & Dynamic Glare for Hero Photo Card
  const photoCardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const texts = personalData.typingTexts;

  const handleStatClick = (idx) => {
    setActiveStatIndex(idx);
    setTimeout(() => {
      setActiveStatIndex(null);
    }, 700);
  };

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

  // 3D interactive tilt & moving light glare on photo
  const handlePhotoMouseMove = (e) => {
    const card = photoCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 0.08s ease-out',
    });

    setGlarePos({
      x: ((x / rect.width) * 100).toFixed(1),
      y: ((y / rect.height) * 100).toFixed(1),
      opacity: 0.35,
    });
  };

  const handlePhotoMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <section id="hero" className="hero-section">
      <div className="content-wrapper hero-grid">
        {/* Left Column: Bio & Core Info */}
        <div className="hero-content">
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

          {/* Quick Metrics (Interactive Animated Stat Cards) */}
          <div className="hero-stats-row">
            {personalData.stats.map((stat, i) => (
              <div
                key={i}
                className={`stat-card ${activeStatIndex === i ? 'stat-card-active' : ''}`}
                onClick={() => handleStatClick(i)}
                role="button"
                tabIndex={0}
                title="Interactive Stat Card"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStatClick(i);
                  }
                }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">
                  <i className={`fa-solid ${stat.icon}`} />
                  <span>{stat.label}</span>
                </div>
                {activeStatIndex === i && <span className="stat-ripple-ring" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Photo Showcase with Enriched 3D Showcase & Holographic Laser Border */}
        <div className="hero-avatar-col">
          <div
            className="hero-showcase-card animated-photo-card"
            ref={photoCardRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            style={tiltStyle}
          >
            {/* Ambient Multi-Layer Radial Glow */}
            <div className="hero-photo-glow" />

            {/* Main Portrait Frame with Enlarged Frame & Laser Rim Light */}
            <div className="hero-photo-wrapper">
              {/* Animated Continuous Laser Border Tracer */}
              <div className="hero-photo-laser-border" />

              <img
                src={personalData.heroImage}
                alt={`${personalData.displayName} - Software Engineer`}
                className="hero-main-photo"
                loading="eager"
              />

              {/* Glowing Cosmic Pedestal beneath shoes */}
              <div className="hero-photo-pedestal" aria-hidden="true" />

              {/* Dynamic Interactive Holographic Glare */}
              <div
                className="hero-photo-glare"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(56, 189, 248, 0.15) 30%, transparent 60%)`,
                  opacity: glarePos.opacity,
                }}
              />

              {/* High-Tech Corner Accent Brackets */}
              <span className="photo-corner corner-tl" />
              <span className="photo-corner corner-tr" />
              <span className="photo-corner corner-bl" />
              <span className="photo-corner corner-br" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
