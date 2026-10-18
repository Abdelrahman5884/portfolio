import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';

/**
 * CinematicPageTransition
 * Full-screen, upward-sweeping cinematic black wipe inspired by jasonbergh.com
 * - Bottom to top wipe-in (translateY: 100% -> 0%)
 * - Seamless scroll & route repositioning while 100% covered in solid black
 * - Bottom to top wipe-out (translateY: 0% -> -100%)
 * - Target total duration: ~750ms (inside the 600-850ms window)
 * - Cubic-bezier(0.76, 0, 0.24, 1) cinematic editorial easing
 * - Respects prefers-reduced-motion
 * - Auto-safety reset fail-safe
 */
const CinematicWipe = forwardRef(function CinematicWipe(
  { onTransitionStart, onTransitionComplete },
  ref
) {
  // 'idle' | 'covering' | 'covered' | 'revealing'
  const [transitionStage, setTransitionStage] = useState('idle');
  const isNavigatingRef = useRef(false);
  const safetyTimeoutRef = useRef(null);

  // Clear any existing fail-safe timer
  const clearSafetyTimer = useCallback(() => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  }, []);

  const resetToIdle = useCallback(() => {
    clearSafetyTimer();
    isNavigatingRef.current = false;
    setTransitionStage('idle');
  }, [clearSafetyTimer]);

  const navigateTo = useCallback(
    (targetHref, options = {}) => {
      // Prevent overlapping transitions if already animating
      if (isNavigatingRef.current) return;

      const href = typeof targetHref === 'string' ? targetHref : targetHref?.href;
      if (!href || !href.startsWith('#')) return;

      const targetId = href.replace(/^#/, '');
      const targetElement = document.getElementById(targetId);

      // Check current scroll position vs target element
      const currentHash = window.location.hash.replace(/^#/, '');
      if (currentHash === targetId && targetElement) {
        // If already at the target, ensure smooth reposition without stuck transition
        const rect = targetElement.getBoundingClientRect();
        if (Math.abs(rect.top) < 20) return;
      }

      isNavigatingRef.current = true;
      if (onTransitionStart) onTransitionStart(targetId);

      // Check if user prefers reduced motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Fail-safe timeout: Force reset after 1500ms if anything hangs
      clearSafetyTimer();
      safetyTimeoutRef.current = setTimeout(() => {
        resetToIdle();
      }, 1500);

      const coverDuration = prefersReducedMotion ? 180 : 330;
      const holdDuration = 60;
      const revealDuration = prefersReducedMotion ? 200 : 370;

      // Stage 1: Wipe Upward from Bottom (translateY 100% -> 0%)
      setTransitionStage('covering');

      setTimeout(() => {
        // Stage 2: 100% Solid Black Cover
        setTransitionStage('covered');

        // Swap scroll position instantaneously behind the solid black curtain
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'auto' });
        } else if (href === '#hero' || targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }

        // Update URL hash without standard jerky browser jump
        if (!options.isBrowserHistory && window.history?.pushState) {
          window.history.pushState(null, '', href);
        }

        // Ensure rendering and layout settle behind cover
        setTimeout(() => {
          // Stage 3: Wipe Upward Off-Screen (translateY 0% -> -100%)
          setTransitionStage('revealing');

          // Trigger content reveal for destination section
          if (targetElement) {
            targetElement.classList.add('in-view');
            targetElement.classList.add('cinematic-active');
          }

          setTimeout(() => {
            // Stage 4: Completed, reset to idle
            resetToIdle();
            if (onTransitionComplete) onTransitionComplete(targetId);
          }, revealDuration);
        }, holdDuration);
      }, coverDuration);
    },
    [clearSafetyTimer, resetToIdle, onTransitionStart, onTransitionComplete]
  );

  useImperativeHandle(
    ref,
    () => ({
      navigate: navigateTo,
      isTransitioning: () => isNavigatingRef.current,
    }),
    [navigateTo]
  );

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      clearSafetyTimer();
    };
  }, [clearSafetyTimer]);

  if (transitionStage === 'idle') return null;

  return (
    <div
      className={`cinematic-wipe-overlay ${transitionStage}`}
      aria-hidden="true"
    >
      <div className="cinematic-wipe-black-curtain" />
    </div>
  );
});

export default CinematicWipe;
