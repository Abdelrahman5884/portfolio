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
          <div className="brand-name">{personalData.displayName}</div>
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

            {/* CV View Button (Opens in new tab) */}
            <a
              href={personalData.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-download-btn"
              title="Open Abdelrahman's CV in new tab"
            >
              <i className="fa-solid fa-arrow-up-right-from-square" />
              <span>CV</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-toggle-wrap">
          <a
            href={personalData.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-download-btn-sm"
            title="Open CV"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" />
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
            <a
              href={personalData.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-download-btn w-full"
              onClick={handleLinkClick}
            >
              <i className="fa-solid fa-arrow-up-right-from-square" />
              <span>View Full CV</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
