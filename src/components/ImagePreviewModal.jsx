import { useEffect } from 'react';

export default function ImagePreviewModal({ imageSrc, onClose, title = 'Credential Inspection' }) {
  useEffect(() => {
    if (!imageSrc) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageSrc, onClose]);

  if (!imageSrc) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="cert-modal-box glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-modal-header">
          <div className="cert-modal-title">
            <i className="fa-solid fa-certificate text-cyan" />
            <span>{title}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close image preview"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="cert-modal-img-wrap">
          <img
            src={imageSrc}
            alt={title}
            className="cert-modal-full-img"
          />
        </div>

        <div className="cert-modal-footer">
          <a
            href={imageSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" />
            <span>Open Original Image</span>
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
