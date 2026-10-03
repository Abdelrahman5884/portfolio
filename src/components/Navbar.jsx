import { useState, useEffect } from 'react';
import { personalData } from '../data/portfolioData';

export default function Navbar({ animationEnabled, setAnimationEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Credentials', href: '#achievements', id: 'achievements' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container">
        {/* Brand */}
        <a href="#hero" className="navbar-brand" onClick={handleLinkClick}>
          <div className="brand-avatar-wrap">
            <img
              src={personalData.heroImage}
              alt={personalData.displayName}
              className="brand-avatar"
            />
            <span className="online-dot" title="Available for opportunities" />
          </div>
          <div className="brand-text">
            <div className="brand-name">{personalData.displayName}</div>
            <div className="brand-title">Backend Developer</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="nav-desktop">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {/* Animation Toggle Button */}
            <button
              type="button"
              className="anim-toggle-btn"
              onClick={() => setAnimationEnabled((prev) => !prev)}
              title={animationEnabled ? 'Pause cosmic starfield animation' : 'Resume cosmic animation'}
              aria-label="Toggle Space Animation"
            >
              <i className={`fa-solid ${animationEnabled ? 'fa-meteor' : 'fa-star'}`} />
              <span>{animationEnabled ? 'Cosmos ON' : 'Paused'}</span>
            </button>

            {/* CV Download Button */}
            <a
              href={personalData.cvUrl}
              download="Abdelrahman_Hassan_CV.pdf"
              className="cv-download-btn"
              title="Download Abdelrahman's CV"
            >
              <i className="fa-solid fa-cloud-arrow-down" />
              <span>CV</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-toggle-wrap">
          <a
            href={personalData.cvUrl}
            download="Abdelrahman_Hassan_CV.pdf"
            className="cv-download-btn-sm"
            title="Download CV"
          >
            <i className="fa-solid fa-download" />
          </a>

          <button
            type="button"
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-actions">
            <button
              type="button"
              className="anim-toggle-btn w-full"
              onClick={() => setAnimationEnabled((prev) => !prev)}
            >
              <i className={`fa-solid ${animationEnabled ? 'fa-pause' : 'fa-play'}`} />
              <span>{animationEnabled ? 'Pause Animation' : 'Resume Animation'}</span>
            </button>

            <a
              href={personalData.cvUrl}
              download="Abdelrahman_Hassan_CV.pdf"
              className="cv-download-btn w-full"
              onClick={handleLinkClick}
            >
              <i className="fa-solid fa-cloud-arrow-down" />
              <span>Download Full CV</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
