import { useEffect, useRef } from 'react';

/**
 * Deep Space Cosmic Canvas
 * Features:
 * - Multi-layer twinkling stars (distant, mid, foreground stars with realistic twinkle)
 * - Dynamic shooting stars (meteors with glowing starlight trails)
 * - Breathing cosmic nebula clouds (violet, indigo, stellar cyan)
 * - Interactive constellation threads on mouse hover
 */
export default function ParticleCanvas({ animationEnabled = true }) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // Stars collection
    let stars = [];
    // Shooting stars collection
    let shootingStars = [];

    const rand = (min, max) => Math.random() * (max - min) + min;

    // Initialize 3 layers of deep space stars
    const initSpace = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      const starCount = Math.floor(Math.min(260, Math.max(90, (W * H) / 12000)));
      stars = [];

      for (let i = 0; i < starCount; i++) {
        const layer = Math.random();
        let size, baseAlpha, speed, color;

        if (layer < 0.6) {
          // Distant tiny stars
          size = rand(0.5, 1.2);
          baseAlpha = rand(0.15, 0.5);
          speed = rand(0.02, 0.05);
          color = '#ffffff';
        } else if (layer < 0.9) {
          // Mid-ground starlight
          size = rand(1.2, 2.0);
          baseAlpha = rand(0.4, 0.8);
          speed = rand(0.04, 0.09);
          color = Math.random() > 0.5 ? '#38bdf8' : '#c084fc'; // Cyan or violet
        } else {
          // Bright foreground stars with halos
          size = rand(2.0, 3.2);
          baseAlpha = rand(0.7, 0.95);
          speed = rand(0.08, 0.15);
          color = Math.random() > 0.4 ? '#ffffff' : '#38bdf8';
        }

        stars.push({
          x: rand(0, W),
          y: rand(0, H),
          size,
          baseAlpha,
          alpha: baseAlpha,
          speed,
          color,
          twinkleSpeed: rand(0.015, 0.045),
          twinklePhase: rand(0, Math.PI * 2),
          halo: size > 2.2,
        });
      }
    };

    // Spawn a shooting star
    const spawnShootingStar = () => {
      if (shootingStars.length >= 2) return;
      const startX = rand(W * 0.1, W * 0.9);
      const startY = rand(0, H * 0.4);
      const angle = rand(Math.PI * 0.2, Math.PI * 0.35); // Streaking diagonally down-right
      const speed = rand(12, 18);
      const length = rand(140, 220);

      shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 0,
        maxLife: rand(45, 75),
        color: Math.random() > 0.5 ? '#38bdf8' : '#e0e7ff',
      });
    };

    // Event listeners
    const handleResize = () => {
      initSpace();
    };

    const handleMouseMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    initSpace();

    // Shooting star spawn timer (every 3.5 - 7 seconds)
    let nextShootingStarTime = Date.now() + rand(1500, 3500);

    let time = 0;
    const render = () => {
      if (!animationEnabled) {
        ctx.clearRect(0, 0, W, H);
        return;
      }

      time += 0.02;

      // 1. Pure Pitch-Black Deep Space Background
      ctx.fillStyle = '#010206';
      ctx.fillRect(0, 0, W, H);

      // 2. Cosmic Nebulas (Soft breathing radial glows)
      // Top-Right Nebula: Electric Violet
      const neb1 = ctx.createRadialGradient(
        W * 0.8 + Math.sin(time * 0.4) * 40,
        H * 0.2 + Math.cos(time * 0.3) * 30,
        10,
        W * 0.8,
        H * 0.2,
        Math.max(W, H) * 0.45
      );
      neb1.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      neb1.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
      neb1.addColorStop(1, 'transparent');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, W, H);

      // Bottom-Left Nebula: Deep Stellar Cyan
      const neb2 = ctx.createRadialGradient(
        W * 0.15 + Math.cos(time * 0.5) * 50,
        H * 0.75 + Math.sin(time * 0.4) * 35,
        10,
        W * 0.15,
        H * 0.75,
        Math.max(W, H) * 0.42
      );
      neb2.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
      neb2.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
      neb2.addColorStop(1, 'transparent');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, W, H);

      // Center-Right subtle cosmic dust
      const neb3 = ctx.createRadialGradient(
        W * 0.55,
        H * 0.55,
        10,
        W * 0.55,
        H * 0.55,
        Math.max(W, H) * 0.35
      );
      neb3.addColorStop(0, 'rgba(236, 72, 153, 0.035)');
      neb3.addColorStop(1, 'transparent');
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, W, H);

      // 3. Render Stars with Twinkle & Parallax
      const mouse = pointerRef.current;
      const mouseParallaxX = mouse.active ? (mouse.x - W / 2) * 0.015 : 0;
      const mouseParallaxY = mouse.active ? (mouse.y - H / 2) * 0.015 : 0;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle calculation
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase);
        s.alpha = Math.max(0.1, s.baseAlpha + twinkle * 0.28);

        // Slow upward/diagonal space drift
        s.y -= s.speed;
        if (s.y < 0) s.y = H;

        // Position with mouse parallax
        const px = s.x - mouseParallaxX * (s.size * 0.8);
        const py = s.y - mouseParallaxY * (s.size * 0.8);

        // Draw star halo if bright
        if (s.halo && s.alpha > 0.6) {
          ctx.beginPath();
          const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, s.size * 3.5);
          haloGrad.addColorStop(0, `rgba(56, 189, 248, ${s.alpha * 0.4})`);
          haloGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = haloGrad;
          ctx.arc(px, py, s.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star core
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Connect constellation lines when mouse is active and near stars
        if (mouse.active) {
          const mdx = px - mouse.x;
          const mdy = py - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 140) {
            // Star shines brighter near cursor
            ctx.beginPath();
            ctx.fillStyle = '#38bdf8';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 12;
            ctx.arc(px, py, s.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Constellation line to mouse
            ctx.beginPath();
            const beamAlpha = ((140 - mDist) / 140) * 0.28;
            ctx.strokeStyle = `rgba(168, 85, 247, ${beamAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(px, py);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Connect nearby stars in cluster
            for (let j = i + 1; j < Math.min(i + 8, stars.length); j++) {
              const s2 = stars[j];
              const s2x = s2.x - mouseParallaxX * (s2.size * 0.8);
              const s2y = s2.y - mouseParallaxY * (s2.size * 0.8);
              const dx = px - s2x;
              const dy = py - s2y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 90) {
                ctx.beginPath();
                const lineAlpha = ((90 - dist) / 90) * 0.18;
                ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha.toFixed(3)})`;
                ctx.lineWidth = 0.6;
                ctx.moveTo(px, py);
                ctx.lineTo(s2x, s2y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // 4. Trigger & Render Shooting Stars (Meteors)
      const now = Date.now();
      if (now > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = now + rand(3500, 7500);
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.life++;

        const progress = ss.life / ss.maxLife;
        const alpha = Math.sin(progress * Math.PI); // Fades in then out

        if (progress >= 1 || ss.x > W + 200 || ss.y > H + 200) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw meteor trail
        const trailStartX = ss.x - (ss.dx / Math.hypot(ss.dx, ss.dy)) * ss.length;
        const trailStartY = ss.y - (ss.dy / Math.hypot(ss.dx, ss.dy)) * ss.length;

        const grad = ctx.createLinearGradient(trailStartX, trailStartY, ss.x, ss.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.7, `rgba(168, 85, 247, ${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.95})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.moveTo(trailStartX, trailStartY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Meteor glowing head
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animationEnabled]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#010206',
      }}
    />
  );
}
