import { useState, forwardRef, useImperativeHandle } from 'react';

/**
 * Ownitt-Style Luxury Page / Section Navigation Transition Curtain
 * Inspired by https://ownitt.fr/
 * Features:
 * - Dual split sliding doors with central cyan laser seam
 * - Smooth luxury cubic-bezier easing (.77, 0, .175, 1)
 * - Seamlessly covers navigation between sections and unveils target smoothly
 */
const PageTransitionVeil = forwardRef(function PageTransitionVeil(_, ref) {
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'covering' | 'revealing'

  useImperativeHandle(ref, () => ({
    navigate: (href) => {
      if (transitionState !== 'idle') return;

      const target = document.querySelector(href);
      if (!target) return;

      // 1. Doors sweep shut smoothly
      setTransitionState('covering');

      setTimeout(() => {
        // 2. Scroll to target while covered
        target.scrollIntoView({ behavior: 'auto' });

        // 3. Doors sweep open to unveil the section
        setTransitionState('revealing');

        setTimeout(() => {
          setTransitionState('idle');
        }, 550);
      }, 350);
    }
  }), [transitionState]);

  if (transitionState === 'idle') return null;

  return (
    <div className={`ownitt-nav-veil ${transitionState}`} aria-hidden="true">
      {/* Left Door */}
      <div className="nav-veil-door nav-veil-door-left" />

      {/* Right Door */}
      <div className="nav-veil-door nav-veil-door-right" />

      {/* Glowing Center Seam */}
      <div className="nav-veil-seam">
        <div className="nav-veil-seam-glow" />
      </div>
    </div>
  );
});

export default PageTransitionVeil;
