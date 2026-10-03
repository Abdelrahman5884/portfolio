import { useState, useEffect, useRef, useCallback } from 'react';
import { personalData } from '../data/portfolioData';

export default function VenomAvatar() {
  const images = personalData.profileImages || [
    { url: '/images/profile.jpg', title: 'Software Engineer', subtitle: 'Core Profile' },
    { url: '/images/abdelrahman_suit.jpg', title: 'Backend Specialist', subtitle: 'Formal' },
    { url: '/images/abdelrahman_casual.png', title: 'Balenciaga Active', subtitle: 'Casual' },
    { url: '/images/abdelrahman_suit_full.jpg', title: 'Full Stature', subtitle: 'Executive' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [isVenomActive, setIsVenomActive] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animFrameId = useRef(null);
  const transitionState = useRef('IDLE'); // 'IDLE' | 'SWARM_IN' | 'VENOM_PEAK' | 'DISSOLVE_OUT'
  const progressRef = useRef(0);
  const particlesRef = useRef([]);

  // Setup Venom Symbiote particles
  const initParticles = useCallback((w, h) => {
    const pts = [];
    const count = 280;

    // Venom face anchor coordinates relative to center (0,0)
    // Eyes: angled menacing white venom eyes
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      // Start scattered far outside the frame
      const startDist = Math.max(w, h) * 0.8 + Math.random() * 150;
      const startX = w / 2 + Math.cos(angle) * startDist;
      const startY = h / 2 + Math.sin(angle) * startDist;

      // Target zones: some form the Venom face/eyes, some form tendrils across the body
      let targetX, targetY;
      const type = Math.random();

      if (type < 0.22) {
        // Left Venom eye
        const t = Math.random();
        targetX = w / 2 - 35 - t * 40;
        targetY = h * 0.28 - Math.sin(t * Math.PI) * 25 + (Math.random() - 0.5) * 8;
      } else if (type < 0.44) {
        // Right Venom eye
        const t = Math.random();
        targetX = w / 2 + 35 + t * 40;
        targetY = h * 0.28 - Math.sin(t * Math.PI) * 25 + (Math.random() - 0.5) * 8;
      } else if (type < 0.75) {
        // Creeping tendrils over chest & body
        targetX = w / 2 + (Math.random() - 0.5) * (w * 0.65);
        targetY = h * 0.4 + Math.random() * (h * 0.55);
      } else {
        // Venom maw / perimeter tendrils
        targetX = w / 2 + (Math.random() - 0.5) * (w * 0.5);
        targetY = h * 0.25 + (Math.random() - 0.5) * (h * 0.2);
      }

      pts.push({
        x: startX,
        y: startY,
        startX,
        startY,
        targetX,
        targetY,
        vx: 0,
        vy: 0,
        size: 2.2 + Math.random() * 3.5,
        speed,
        isEye: type < 0.44,
        alpha: 0,
        wiggle: Math.random() * Math.PI * 2
      });
    }
    particlesRef.current = pts;
  }, []);

  // Trigger the Venom transition
  const triggerVenomTransition = useCallback((nextIdx) => {
    if (transitionState.current !== 'IDLE') return;
    setTargetIndex(nextIdx);
    setIsVenomActive(true);
    transitionState.current = 'SWARM_IN';
    progressRef.current = 0;

    const canvas = canvasRef.current;
    if (canvas) {
      initParticles(canvas.width, canvas.height);
    }
  }, [initParticles]);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % images.length;
    triggerVenomTransition(next);
  }, [currentIndex, images.length, triggerVenomTransition]);

  const handlePrev = useCallback(() => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    triggerVenomTransition(prev);
  }, [currentIndex, images.length, triggerVenomTransition]);

  // Automatic cycle every 6.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6500);

    return () => clearInterval(interval);
  }, [handleNext]);

  // Animation Loop for Symbiote Particles & Venom morph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width || 380;
      canvas.height = rect.height || 500;
    };
    updateDimensions();

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const state = transitionState.current;

      if (state !== 'IDLE') {
        const pts = particlesRef.current;

        if (state === 'SWARM_IN') {
          progressRef.current += 0.024;
          const p = Math.min(progressRef.current, 1);

          // Dark symbiote fog overlay creeping in
          ctx.fillStyle = `rgba(3, 8, 18, ${p * 0.72})`;
          ctx.fillRect(0, 0, W, H);

          // Animate particles moving toward targets
          for (const pt of pts) {
            pt.x = pt.startX + (pt.targetX - pt.startX) * p + Math.sin(pt.wiggle + p * 10) * 12 * (1 - p);
            pt.y = pt.startY + (pt.targetY - pt.startY) * p + Math.cos(pt.wiggle + p * 10) * 12 * (1 - p);
            pt.alpha = p * 0.9;

            ctx.beginPath();
            if (pt.isEye && p > 0.6) {
              // Glowing white Venom eye particles
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, (p - 0.6) * 2.5)})`;
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 15;
            } else {
              // Deep black & purple symbiote tendrils
              ctx.fillStyle = `rgba(10, 16, 28, ${pt.alpha})`;
              ctx.shadowColor = '#818cf8';
              ctx.shadowBlur = 6;
            }
            ctx.arc(pt.x, pt.y, pt.size * (0.8 + 0.4 * Math.sin(p * Math.PI)), 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Connect nearby symbiote tendrils
          for (let i = 0; i < pts.length; i += 3) {
            const p1 = pts[i];
            for (let j = i + 1; j < Math.min(i + 8, pts.length); j++) {
              const p2 = pts[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 45) {
                ctx.beginPath();
                ctx.strokeStyle = p1.isEye ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.65)';
                ctx.lineWidth = 1.4;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }

          if (progressRef.current >= 1) {
            transitionState.current = 'VENOM_PEAK';
            progressRef.current = 0;

            // Switch the image right at peak symbiote coverage
            setCurrentIndex(targetIndex);

            // Hold peak for 350ms, then dissolve out
            setTimeout(() => {
              transitionState.current = 'DISSOLVE_OUT';
              progressRef.current = 0;
            }, 350);
          }
        } else if (state === 'VENOM_PEAK') {
          // Peak Venom appearance: thick dark symbiote veil + stark glowing eyes
          ctx.fillStyle = 'rgba(3, 8, 18, 0.78)';
          ctx.fillRect(0, 0, W, H);

          for (const pt of pts) {
            ctx.beginPath();
            if (pt.isEye) {
              ctx.fillStyle = '#ffffff';
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 20;
            } else {
              ctx.fillStyle = 'rgba(8, 14, 24, 0.95)';
              ctx.shadowColor = '#000000';
              ctx.shadowBlur = 4;
            }
            ctx.arc(pt.targetX, pt.targetY, pt.size * 1.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else if (state === 'DISSOLVE_OUT') {
          progressRef.current += 0.035;
          const p = Math.min(progressRef.current, 1);
          const inv = 1 - p;

          ctx.fillStyle = `rgba(3, 8, 18, ${inv * 0.72})`;
          ctx.fillRect(0, 0, W, H);

          // Particles explode and scatter outward
          for (const pt of pts) {
            const angle = Math.atan2(pt.targetY - H / 2, pt.targetX - W / 2);
            const scatterX = pt.targetX + Math.cos(angle) * (p * 220);
            const scatterY = pt.targetY + Math.sin(angle) * (p * 220);

            ctx.beginPath();
            ctx.fillStyle = pt.isEye
              ? `rgba(255, 255, 255, ${inv})`
              : `rgba(15, 23, 42, ${inv * 0.8})`;
            ctx.arc(scatterX, scatterY, pt.size * inv, 0, Math.PI * 2);
            ctx.fill();
          }

          if (progressRef.current >= 1) {
            transitionState.current = 'IDLE';
            setIsVenomActive(false);
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [targetIndex]);

  // Subtle 3D tilt on mouse move
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const card = containerRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  const currentPhoto = images[currentIndex];

  return (
    <div className="venom-avatar-wrapper">
      {/* Ambient Radial Energy Behind Figure (No Box Card / No Frame!) */}
      <div className="figure-ambient-glow" />

      {/* Main Figure Stage (Borderless, seamless integration with dark website) */}
      <div
        className="figure-stage"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleNext}
        title="Click to trigger Venom morph transition"
      >
        {/* Cutout Photo seamlessly blending into background */}
        <div className="figure-cutout-container">
          <img
            src={currentPhoto.url}
            alt={`${personalData.displayName} - ${currentPhoto.title}`}
            className="figure-image"
          />

          {/* Soft vignette/gradient blending bottom and edges into dark website background */}
          <div className="figure-bottom-fade" />
        </div>

        {/* Venom Symbiote Overlay Canvas */}
        <canvas
          ref={canvasRef}
          className={`venom-canvas ${isVenomActive ? 'active' : ''}`}
        />

        {/* Venom Indicator Badge */}
        <div className="venom-tag-pill">
          <i className="fa-solid fa-wand-magic-sparkles text-cyan" />
          <span>{currentPhoto.title}</span>
          <span className="photo-counter">{currentIndex + 1}/{images.length}</span>
        </div>
      </div>

      {/* Interactive Controls & Navigation */}
      <div className="venom-controls-row">
        <button
          type="button"
          className="venom-nav-arrow"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous photo"
          title="Previous photo"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <div className="venom-dots-row">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`venom-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (idx !== currentIndex) triggerVenomTransition(idx);
              }}
              title={img.title}
              aria-label={`Switch to photo ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="venom-nav-arrow"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next photo"
          title="Next photo"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>

      {/* Subtle meta info pill floating below */}
      <div className="figure-subtext">
        <span className="live-status-dot" />
        <span>Software Engineering @ Mansoura University</span>
      </div>
    </div>
  );
}
