import { useState, useRef, useEffect, useCallback } from 'react';
import './IntroVideo.css';

/**
 * IntroVideo Component
 * Plays the full-screen cinematic intro video (public/images/ekko.mp4)
 * - Autoplays muted ("من غير صوت")
 * - Automatically fades out and reveals the portfolio when the video finishes
 * - Includes a sleek Skip button, progress indicator, and smooth exit transition
 */
export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  // Trigger smooth exit transition then notify parent to reveal portfolio
  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);

    // Allow the cinematic fade-out animation to complete smoothly (~700ms)
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  }, [onComplete]);

  // Lock body scroll during intro video playback
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard shortcut: Escape or Space to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Ensure autoplay starts reliably (muted prevents browser autoplay blocks)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented or failed:', err);
          // If video completely fails to autoplay or load, dismiss gracefully
          // after a short moment so portfolio isn't blocked
        });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  return (
    <div
      className={`intro-video-overlay ${isExiting ? 'intro-video-exiting' : ''}`}
      role="dialog"
      aria-label="Portfolio Cinematic Intro"
    >
      {/* Video Canvas */}
      <video
        ref={videoRef}
        src="/images/ekko.mp4"
        className="intro-video-player"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleFinish}
        onError={handleFinish}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setHasStarted(true)}
      />

      {/* Cinematic subtle vignette overlay */}
      <div className="intro-video-vignette" />

      {/* Top Bar with Skip Button & Soundless Badge */}
      <div className="intro-video-controls">
        <div className="intro-video-badge">
          <span className="intro-pulse-dot" />
          <span>INTRO</span>
        </div>

        <button
          type="button"
          className="intro-skip-button"
          onClick={handleFinish}
          aria-label="Skip Intro Video"
        >
          <span>Skip Intro</span>
          <i className="fa-solid fa-forward-step" />
        </button>
      </div>

      {/* Bottom Sleek Glowing Progress Bar */}
      <div className="intro-progress-track">
        <div
          className="intro-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
