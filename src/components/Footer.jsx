import { personalData } from '../data/portfolioData';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="portfolio-footer">
      <div className="content-wrapper">
        <div className="footer-top-row">
          {/* Brand info */}
          <div className="footer-brand-box">
            <div className="footer-brand-header">
              <img
                src={personalData.avatarUrl}
                alt={personalData.displayName}
                className="footer-avatar"
              />
              <div>
                <h3 className="footer-name">{personalData.displayName}</h3>
                <div className="footer-role">Backend Developer & Laravel Specialist</div>
              </div>
            </div>
            <p className="footer-bio">
              Architecting secure, high-performance back-ends and production APIs engineered to scale under real-world traffic.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="footer-links-box">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="footer-connect-box">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-social-icons">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                title="GitHub"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github" />
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="footer-icon-btn"
                title="Email"
                aria-label="Email"
              >
                <i className="fa-solid fa-envelope" />
              </a>
              <a
                href={personalData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn whatsapp"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" />
              </a>
            </div>

            <div className="footer-cv-download">
              <a
                href={personalData.cvUrl}
                download="Abdelrahman_Hassan_CV.pdf"
                className="btn btn-outline-cyan btn-sm"
              >
                <i className="fa-solid fa-file-arrow-down" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {currentYear} {personalData.name}. All rights reserved.
          </div>

          <div className="footer-location-tag">
            <i className="fa-solid fa-location-dot text-cyan" />
            <span>Mansoura, Egypt</span>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            title="Back to Top"
            aria-label="Back to top"
          >
            <span>Top</span>
            <i className="fa-solid fa-arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
