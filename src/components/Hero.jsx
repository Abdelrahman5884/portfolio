import { useState, useEffect, useRef, useCallback } from 'react';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Astronaut Spacesuit Hover Reveal State
  const photoWrapperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 220, y: 160 });
  const revealRadius = 135;

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

  // Track cursor position inside photo for spacesuit reveal
  const updateCursorPosition = useCallback((clientX, clientY) => {
    const el = photoWrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    setCursorPos({ x, y });
  }, []);

  const handleMouseMove = (e) => {
    setIsHovered(true);
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    setIsHovered(true);
    updateCursorPosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  return (
    <section id="hero" className="hero-section hero-centered-layout">
      {/* Ambient Cosmic Radial Glow behind Hero */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="content-wrapper hero-split-grid">
        {/* Left Side: Clean Typography & Actions (Exactly as Requested) */}
        <div className="hero-text-side">
          <h1 className="hero-heading">
            Hi, I'm <span className="gradient-text">{personalData.displayName}</span>
          </h1>

          <div className="hero-typewriter-wrap">
            <span className="typewriter-text">{displayedText}</span>
            <span className="typewriter-cursor">_</span>
          </div>

          <p className="hero-lead hero-clean-lead">
            Front-End & Back-End Web Developer Specializing In Building High-Converting, Performance-Driven, Scalable Websites & RESTful APIs That Help Businesses Grow And Scale.
          </p>

          {/* Action Buttons: Ziad-Style Pill CTA & Secondary */}
          <div className="hero-ziad-actions">
            <a href="#contact" className="ziad-pill-cta">
              <span>Contact Me</span>
              <span className="ziad-arrow-circle">
                <i className="fa-solid fa-arrow-up-right-from-square" />
              </span>
            </a>

            <a
              href={personalData.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ziad-secondary-cta"
            >
              <i className="fa-solid fa-file-arrow-down" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Social Connect Links */}
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
        </div>

        {/* Center / Right: Centered Portrait Pillar with Spacesuit Reveal & Matching Width Name */}
        <div className="hero-portrait-pillar">
          <div
            className="hero-seamless-photo-container"
            ref={photoWrapperRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
          >
            {/* Base Layer: Authentic Balenciaga Portrait (Hands Lowered naturally) */}
            <img
              src={personalData.heroImage}
              alt={personalData.displayName}
              className="hero-base-portrait-img"
              loading="eager"
            />

            {/* Overlay Layer: Astronaut Helmet & Spacesuit (Revealed via Mouse Hover) */}
            <div
              className="hero-spacesuit-reveal-mask"
              style={{
                WebkitMaskImage: isHovered
                  ? `radial-gradient(circle ${revealRadius}px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, black 68%, transparent 100%)`
                  : 'none',
                maskImage: isHovered
                  ? `radial-gradient(circle ${revealRadius}px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, black 68%, transparent 100%)`
                  : 'none',
                opacity: isHovered ? 1 : 0,
              }}
            >
              <img
                src={personalData.heroSpacesuitImage}
                alt={`${personalData.displayName} - Astronaut Spacesuit Mode`}
                className="hero-suit-portrait-img"
                loading="eager"
              />
            </div>

            {/* Glowing Cyber HUD Reticle Following Mouse */}
            {isHovered && (
              <div
                className="hero-suit-reticle"
                style={{
                  left: `${cursorPos.x}px`,
                  top: `${cursorPos.y}px`,
                }}
                aria-hidden="true"
              >
                <span className="reticle-lens-ring" />
                <span className="reticle-plus-crosshair" />
                <span className="reticle-tag">EVA SUIT</span>
              </div>
            )}

            {/* Soft Ambient Fade at Bottom into black canvas */}
            <div className="hero-portrait-bottom-fade" aria-hidden="true" />
          </div>

          {/* Name Underneath: EXACT SAME WIDTH AS THE PHOTO */}
          <div className="hero-portrait-exact-name" aria-hidden="true">
            abdelrahman
          </div>
        </div>
      </div>
    </section>
  );
}
