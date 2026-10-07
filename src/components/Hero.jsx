import { useState, useEffect, useRef, useCallback } from 'react';
import { personalData } from '../data/portfolioData';

/**
 * Editorial Full-Screen Hero Showcase
 * - Left side: Name, animated typewriter text, bio summary & social links (Restored exactly as requested)
 * - Center: Full-screen authentic portrait with interactive astronaut suit hover reveal
 * - Background: Subtle editorial name watermark ("ABDELRAHMAN") framing shoulders
 * - Bottom: Smooth scroll indicator leading to About section
 */
export default function Hero({ onScrollNext }) {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Astronaut Spacesuit Hover Reveal State
  const photoStageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 250, y: 200 });
  const revealRadius = 185;

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

  const handleMouseMove = useCallback((e) => {
    const el = photoStageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    setIsHovered(true);
  }, []);

  const handleMouseEnter = useCallback((e) => {
    const el = photoStageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!e.touches || e.touches.length === 0) return;
    const el = photoStageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setCursorPos({ x, y });
    setIsHovered(true);
  }, []);

  const handleScrollClick = () => {
    if (onScrollNext) {
      onScrollNext('#about');
    } else {
      const el = document.querySelector('#about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section hero-centered-fullscreen">
      {/* Giant Editorial Name Watermark in Deep Background Behind Photo ("باين سيكا بسيطة") */}
      <div className="hero-giant-title" aria-hidden="true">
        ABDELRAHMAN
      </div>

      {/* Atmospheric Soft Cyan Core Ambient Glow */}
      <div className="hero-center-ambient-glow" aria-hidden="true" />

      {/* Full-Screen Centered Portrait Layer */}
      <div className="hero-fullscreen-portrait-layer">
        <div
          className="hero-portrait-stage"
          ref={photoStageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
        >
          {/* Base Layer: Authentic Portrait (Front & Center, Full Screen) */}
          <img
            src={personalData.heroImage}
            alt={personalData.displayName}
            className="hero-portrait-img-base"
            loading="eager"
          />

          {/* Interactive Astronaut Spacesuit Reveal Mask */}
          <div
            className="hero-spacesuit-mask-layer"
            style={{
              WebkitMaskImage: isHovered
                ? `radial-gradient(circle ${revealRadius}px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, black 65%, transparent 100%)`
                : 'none',
              maskImage: isHovered
                ? `radial-gradient(circle ${revealRadius}px at ${cursorPos.x}px ${cursorPos.y}px, black 0%, black 65%, transparent 100%)`
                : 'none',
              opacity: isHovered ? 1 : 0,
            }}
          >
            <img
              src={personalData.heroSpacesuitImage}
              alt={`${personalData.displayName} - Astronaut Suit`}
              className="hero-spacesuit-img"
              loading="eager"
            />
          </div>

          {/* Futuristic Reveal Reticle */}
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
        </div>

        {/* Soft bottom vignette seamlessly blending into dark background */}
        <div className="hero-bottom-fade" aria-hidden="true" />
      </div>

      {/* Left Content Side: Name & Details (Restored exactly as requested) */}
      <div className="hero-content-left">
        <h1 className="hero-main-title">
          Hi, I'm <br />
          <span className="gradient-text">{personalData.displayName}</span>
        </h1>

        <div className="hero-typewriter-box">
          <span className="typewriter-prefix">&gt; </span>
          <span className="typewriter-text">{displayedText}</span>
          <span className="typewriter-cursor">_</span>
        </div>

        <p className="hero-lead-text">
          Front-End &amp; Back-End Web Developer Specializing In Building High-Converting, Scalable Websites &amp; RESTful APIs.
        </p>

        {/* Social Connect Links */}
        <div className="hero-social-pill">
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-icon"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <i className="fa-brands fa-github" />
          </a>
          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-icon"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            className="hero-social-icon"
            title="Email Abdelrahman"
            aria-label="Email Abdelrahman"
          >
            <i className="fa-solid fa-envelope" />
          </a>
          <a
            href={personalData.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-icon"
            title="WhatsApp Chat"
            aria-label="WhatsApp Chat"
          >
            <i className="fa-brands fa-whatsapp" />
          </a>
          <a
            href={`tel:${personalData.phoneRaw}`}
            className="hero-social-icon"
            title="Call Abdelrahman"
            aria-label="Call Abdelrahman"
          >
            <i className="fa-solid fa-phone" />
          </a>
        </div>
      </div>

      {/* Ownitt.fr-Style Interactive Scroll Indicator (Bottom Center) */}
      <button
        type="button"
        className="hero-ownitt-scroll-hint hero-scroll-flip-bottom"
        onClick={handleScrollClick}
        aria-label="Scroll to about section"
      >
        <span className="scroll-hint-label">SCROLL</span>
        <div className="scroll-hint-track">
          <span className="scroll-hint-dot" />
        </div>
      </button>
    </section>
  );
}
