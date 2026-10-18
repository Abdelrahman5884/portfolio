import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';

/**
 * CinematicWipe
 * Premium Multi-Scene Cinematic Transition Engine (Jason Bergh Inspiration)
 * Coordinates:
 * 1. Outgoing scene subtle scale-down and light dimming
 * 2. Solid black curtain upward wipe-in (translateY: 100% -> 0%)
 * 3. Apex swap: instantaneous scroll repositioning & destination background preparation
 * 4. Curtain upward wipe-out (translateY: 0% -> -100%)
 * 5. Incoming scene expansion & coordinated content reveal
 * Total duration: ~900ms (within the 700-1100ms window)
 */
const CinematicWipe = forwardRef(function CinematicWipe(
  { onScenePrepare, onTransitionStart, onTransitionComplete },
  ref
) {
  // 'idle' | 'covering' | 'covered' | 'revealing'
  const [transitionStage, setTransitionStage] = useState('idle');
  const isNavigatingRef = useRef(false);
  const safetyTimeoutRef = useRef(null);

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
    document.body.classList.remove('scene-transition-active');
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('scene-outgoing', 'scene-incoming');
    }
  }, [clearSafetyTimer]);

  const navigateTo = useCallback(
    (targetHref, options = {}) => {
      // Prevent rapid overlapping transitions
      if (isNavigatingRef.current) return;

      const href = typeof targetHref === 'string' ? targetHref : targetHref?.href;
      if (!href || !href.startsWith('#')) return;

      const targetId = href.replace(/^#/, '');
      const targetElement = document.getElementById(targetId);

      // Check if already positioned at target
      const currentHash = window.location.hash.replace(/^#/, '');
      if (currentHash === targetId && targetElement) {
        const rect = targetElement.getBoundingClientRect();
        if (Math.abs(rect.top) < 20) return;
      }

      isNavigatingRef.current = true;
      document.body.classList.add('scene-transition-active');

      const mainContent = document.getElementById('main-content');
      if (onTransitionStart) onTransitionStart(targetId);

      // Check prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Fail-safe auto reset timer
      clearSafetyTimer();
      safetyTimeoutRef.current = setTimeout(() => {
        resetToIdle();
      }, 1600);

      const coverDuration = prefersReducedMotion ? 200 : 380;
      const holdDuration = 90;
      const revealDuration = prefersReducedMotion ? 220 : 430;

      // Stage 1: Outgoing Scene Reaction & Curtain Wipe Upward
      if (mainContent) {
        mainContent.classList.add('scene-outgoing');
        mainContent.classList.remove('scene-incoming');
      }
      setTransitionStage('covering');

      setTimeout(() => {
        // Stage 2: 100% Solid Black Viewport Cover (Apex)
        setTransitionStage('covered');

        // Prepare destination background and notify parent
        if (onScenePrepare) onScenePrepare(targetId);

        // Reposition scroll cleanly behind solid black curtain
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'auto' });
        } else if (href === '#hero' || targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }

        // Update URL hash cleanly
        if (!options.isBrowserHistory && window.history?.pushState) {
          window.history.pushState(null, '', href);
        }

        // Prepare incoming scene class
        if (mainContent) {
          mainContent.classList.remove('scene-outgoing');
          mainContent.classList.add('scene-incoming');
        }

        // Allow browser layout and background to settle behind cover
        setTimeout(() => {
          // Stage 3: Curtain Wipe Upward Off-Screen & Scene Reveal
          setTransitionStage('revealing');

          // Trigger content reveal animations on destination section
          if (targetElement) {
            targetElement.classList.add('in-view');
          }

          setTimeout(() => {
            // Stage 4: Scene Settled
            if (mainContent) {
              mainContent.classList.remove('scene-incoming');
            }
            resetToIdle();
            if (onTransitionComplete) onTransitionComplete(targetId);
          }, revealDuration);
        }, holdDuration);
      }, coverDuration);
    },
    [clearSafetyTimer, resetToIdle, onScenePrepare, onTransitionStart, onTransitionComplete]
  );

  useImperativeHandle(
    ref,
    () => ({
      navigate: navigateTo,
      isTransitioning: () => isNavigatingRef.current,
    }),
    [navigateTo]
  );

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
