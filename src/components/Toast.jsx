export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-notification" role="status">
      <div className="toast-icon">
        <i className="fa-solid fa-circle-check text-emerald" />
      </div>
      <span className="toast-text">{message}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Close notification"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}
