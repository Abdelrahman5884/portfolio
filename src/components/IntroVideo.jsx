import { useState, useRef, useEffect, useCallback } from 'react';
import './IntroVideo.css';

/**
 * IntroVideo Component
 * High-performance full-screen cinematic intro video (ekko.mp4):
 * - 100% soundless / muted ("من غير صوت")
 * - Direct src="/images/ekko.mp4" with faststart progressive streaming
 * - Autoplays reliably across all mobile and desktop browsers
 * - Play / Pause toggle on screen click
 * - Dedicated sleek Skip button & keyboard shortcuts (Escape / Space / Enter)
 * - Automatic smooth transition to portfolio upon completion
 */
export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const completedRef = useRef(false);

  // Trigger smooth exit transition then reveal portfolio
  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);

    // Smooth exit fade animation (~600ms)
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  }, [onComplete]);

  // Lock body scroll during intro video playback
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard shortcut: Escape, Space, or Enter to skip/pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        handleFinish();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Reliable Autoplay on mount (muted is required and guaranteed by browsers)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented, ready for user interaction:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  // Toggle play/pause
  const togglePlayPause = (e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

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
      {/* Direct Full-Bleed Soundless Video Element */}
      <video
        ref={videoRef}
        src="/images/ekko.mp4"
        className="intro-video-player"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/ekko_poster.jpg"
        onClick={togglePlayPause}
        onEnded={handleFinish}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Cinematic subtle vignette overlay */}
      <div className="intro-video-vignette" onClick={togglePlayPause} />

      {/* Play/Pause Center Indicator when paused */}
      {!isPlaying && (
        <button
          type="button"
          className="intro-center-play-btn"
          onClick={togglePlayPause}
          aria-label="Play Video"
        >
          <i className="fa-solid fa-play" />
        </button>
      )}

      {/* Top Bar with Badge & Skip Button */}
      <div className="intro-video-controls">
        <div className="intro-video-badge">
          <span className="intro-pulse-dot" />
          <span>CINEMATIC INTRO</span>
        </div>

        <button
          type="button"
          className="intro-skip-button"
          onClick={handleFinish}
          aria-label="Skip Intro Video"
        >
          <span>Skip</span>
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
