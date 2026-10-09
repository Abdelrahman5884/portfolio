import { useState } from 'react';
import confetti from 'canvas-confetti';
import { personalData } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState(null); // 'email' | 'phone'

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (onShowToast) {
      onShowToast(`${type === 'email' ? 'Email address' : 'Phone number'} copied to clipboard!`);
    }
    setTimeout(() => {
      setCopiedType(null);
    }, 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast('Message prepared! Thank you for reaching out.');
    }

    // Optional mailto link fallback
    const mailtoLink = `mailto:${personalData.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Reset after delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 6000);

    // Open user's email client smoothly in the background
    window.open(mailtoLink, '_blank');
  };

  return (
    <section id="contact" className="contact-section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-paper-plane" />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Build <span className="gradient-text">Something Scalable</span>
          </h2>
          <p className="section-subtitle">
            Whether you need a high-performance backend, REST API engineering, database optimization, or a full-time engineer.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column: Direct Contact Info & Channels */}
          <div className="contact-info-col">
            {/* Status card */}
            <div className="contact-status-card glass-card">
              <div className="status-indicator-wrap">
                <span className="live-pulse-dot" />
                <span className="status-heading">Status: Ready to Deploy</span>
              </div>
              <p className="status-text">
                Available for back-end engineering roles, software engineering internships, and high-impact freelance projects.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="contact-cards-list">
              {/* Email Card */}
              <div className="contact-action-card glass-card">
                <div className="action-icon-circle email">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div className="action-content">
                  <span className="action-label">Email Address</span>
                  <a href={`mailto:${personalData.email}`} className="action-value">
                    {personalData.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="copy-action-btn"
                  onClick={() => handleCopy(personalData.email, 'email')}
                  title="Copy email to clipboard"
                >
                  <i className={`fa-solid ${copiedType === 'email' ? 'fa-check text-emerald' : 'fa-copy'}`} />
                  <span className="copy-tooltip">{copiedType === 'email' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-action-card glass-card">
                <div className="action-icon-circle phone">
                  <i className="fa-solid fa-phone" />
                </div>
                <div className="action-content">
                  <span className="action-label">Phone & Call</span>
                  <a href={`tel:${personalData.phoneRaw}`} className="action-value">
                    {personalData.phone}
                  </a>
                </div>
                <button
                  type="button"
                  className="copy-action-btn"
                  onClick={() => handleCopy(personalData.phone, 'phone')}
                  title="Copy phone number"
                >
                  <i className={`fa-solid ${copiedType === 'phone' ? 'fa-check text-emerald' : 'fa-copy'}`} />
                  <span className="copy-tooltip">{copiedType === 'phone' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="contact-action-card glass-card whatsapp-highlight">
                <div className="action-icon-circle whatsapp">
                  <i className="fa-brands fa-whatsapp" />
                </div>
                <div className="action-content">
                  <span className="action-label">Instant Messaging</span>
                  <span className="action-value">WhatsApp Quick Chat</span>
                </div>
                <a
                  href={`https://wa.me/201004732940?text=${encodeURIComponent(
                    'Hello Abdelrahman, I checked your portfolio and would like to discuss a project with you!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                  title="Chat on WhatsApp"
                >
                  <span>Chat</span>
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              </div>

              {/* Location Card */}
              <div className="contact-action-card glass-card">
                <div className="action-icon-circle location">
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div className="action-content">
                  <span className="action-label">Location</span>
                  <span className="action-value">{personalData.location}</span>
                </div>
              </div>
            </div>

            {/* Prominent Download CV Card with Suit Photo */}
            <div className="contact-cv-card glass-card">
              <a
                href={personalData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-card-photo-wrap"
                download="Abdelrahman_Hassan_CV.pdf"
                title="Download CV (PDF)"
              >
                <img
                  src={personalData.suitImage || '/images/abdelrahman_suit.jpg'}
                  alt={`${personalData.displayName} - CV`}
                  className="cv-card-suit-img"
                  loading="lazy"
                />
              </a>
              <a
                href={personalData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-download-cv-end"
                download="Abdelrahman_Hassan_CV.pdf"
                title="Download Abdelrahman's CV (PDF)"
              >
                <i className="fa-solid fa-file-arrow-down" />
                <span>CV</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="contact-socials-row">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                <i className="fa-brands fa-github" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                <i className="fa-brands fa-linkedin-in" />
                <span>LinkedIn Connect</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card glass-card">
              <h3 className="form-card-title">Send a Direct Message</h3>
              <p className="form-card-subtitle">
                Fill in the details below and your default email app will compose the message immediately.
              </p>

              {isSubmitted ? (
                <div className="form-success-banner">
                  <div className="success-icon-box">
                    <i className="fa-solid fa-circle-check" />
                  </div>
                  <h4>Thank You!</h4>
                  <p>
                    Your message draft has been initialized. Abdelrahman will review your message and reply promptly.
                  </p>
                </div>
              ) : (
                <form className="interactive-contact-form" onSubmit={handleSubmit}>
                  <div className="form-row-dual">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Your Email <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sarah@example.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Backend Developer Role / Project Proposal"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message <span className="req">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Abdelrahman, we are looking for a Laravel backend specialist..."
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn w-full">
                    <i className="fa-solid fa-paper-plane" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
