import { useEffect, useRef } from 'react';

/**
 * Deep Space Black Hole Singularity & Astrophotography Canvas
 * Features:
 * - Pure pitch-black deep cosmos background (#000000)
 * - Supermassive Black Hole with swirling relativistic Accretion Disk & Photon Ring ("كانك داخل الثقب الاسود")
 * - Gravitational Lensing vortex with spiraling matter particles
 * - Floating zero-G space asteroids & cosmic dust debris tumbling past
 * - Dense Milky Way star cluster with multi-magnitude twinkling stars
 * - Dynamic meteors (shooting stars)
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

    let backgroundStars = [];
    let galacticCloudStars = [];
    let vortexParticles = [];
    let asteroids = [];
    let shootingStars = [];

    const rand = (min, max) => Math.random() * (max - min) + min;

    const randNorm = (mean, stdDev) => {
      let u = 1 - Math.random();
      let v = Math.random();
      let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      return mean + z * stdDev;
    };

    const initSpace = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      // 1. Uniform background stars
      const bgStarCount = Math.floor(Math.min(800, Math.max(300, (W * H) / 3600)));
      backgroundStars = [];
      for (let i = 0; i < bgStarCount; i++) {
        const mag = Math.random();
        let size, baseAlpha, color;
        if (mag < 0.7) {
          size = rand(0.4, 0.9);
          baseAlpha = rand(0.2, 0.55);
          color = '#ffffff';
        } else if (mag < 0.93) {
          size = rand(0.9, 1.4);
          baseAlpha = rand(0.45, 0.85);
          color = Math.random() > 0.4 ? '#ffffff' : '#bae6fd';
        } else {
          size = rand(1.5, 2.2);
          baseAlpha = rand(0.75, 1.0);
          color = Math.random() > 0.5 ? '#ffffff' : '#7dd3fc';
        }

        backgroundStars.push({
          x: rand(0, W),
          y: rand(0, H),
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: rand(0.015, 0.05),
          twinklePhase: rand(0, Math.PI * 2),
          halo: size > 1.6,
        });
      }

      // 2. Dense Milky Way Galactic Cluster
      const galacticStarCount = Math.floor(Math.min(1400, Math.max(600, (W * H) / 1800)));
      galacticCloudStars = [];
      const bandCenterX = W * 0.76;
      const bandWidth = W * 0.24;

      for (let i = 0; i < galacticStarCount; i++) {
        const x = randNorm(bandCenterX, bandWidth * 0.48);
        const y = rand(0, H);
        const skewedX = x + (y - H / 2) * 0.12;

        const starType = Math.random();
        let size, baseAlpha, color;
        if (starType < 0.75) {
          size = rand(0.35, 0.85);
          baseAlpha = rand(0.25, 0.7);
          color = Math.random() > 0.4 ? '#ffffff' : '#93c5fd';
        } else if (starType < 0.95) {
          size = rand(0.85, 1.3);
          baseAlpha = rand(0.5, 0.9);
          color = Math.random() > 0.35 ? '#dbeafe' : '#60a5fa';
        } else {
          size = rand(1.3, 1.9);
          baseAlpha = rand(0.8, 1.0);
          color = '#ffffff';
        }

        galacticCloudStars.push({
          x: skewedX,
          y,
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: rand(0.02, 0.06),
          twinklePhase: rand(0, Math.PI * 2),
          color,
          halo: size > 1.4,
        });
      }

      // 3. Black Hole Accretion Matter Particles (Swirling into Singularity)
      const vCount = 85;
      vortexParticles = [];
      for (let i = 0; i < vCount; i++) {
        vortexParticles.push({
          angle: rand(0, Math.PI * 2),
          radius: rand(24, 48),
          speed: rand(0.012, 0.035),
          size: rand(0.8, 2.0),
          alpha: rand(0.4, 0.9),
          color: Math.random() > 0.6 ? '#ffffff' : (Math.random() > 0.3 ? '#38bdf8' : '#60a5fa'),
        });
      }

      // 4. Floating Asteroids (Tumbling Space Debris like cockpit view)
      const asteroidCount = 8;
      asteroids = [];
      for (let i = 0; i < asteroidCount; i++) {
        const sides = Math.floor(rand(5, 8));
        const vertices = [];
        const baseRadius = rand(8, 24);
        for (let s = 0; s < sides; s++) {
          const a = (s / sides) * Math.PI * 2;
          const r = baseRadius * rand(0.75, 1.25);
          vertices.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
        }

        asteroids.push({
          x: rand(0, W),
          y: rand(0, H),
          vx: rand(-0.18, 0.22),
          vy: rand(-0.12, 0.16),
          rot: rand(0, Math.PI * 2),
          vRot: rand(-0.008, 0.008),
          radius: baseRadius,
          vertices,
          parallax: rand(0.4, 1.2),
        });
      }
    };

    const spawnShootingStar = () => {
      if (shootingStars.length >= 2) return;
      const startX = rand(W * 0.1, W * 0.85);
      const startY = rand(0, H * 0.3);
      const angle = rand(Math.PI * 0.24, Math.PI * 0.36);
      const speed = rand(15, 22);
      const length = rand(120, 200);

      shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 0,
        maxLife: rand(40, 65),
      });
    };

    const handleResize = () => {
      initSpace();
    };

    const handleMouseMove = (e) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
    };

    let scrollY = window.scrollY || 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    initSpace();

    let nextMeteorTime = Date.now() + rand(4000, 9000);
    let time = 0;

    const render = () => {
      if (!animationEnabled) {
        ctx.clearRect(0, 0, W, H);
        return;
      }

      time += 0.02;

      // 1. Pitch-Black Cosmic Abyss
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);

      const mouse = pointerRef.current;
      const mouseParallaxX = mouse.active ? (mouse.x - W / 2) * 0.008 : 0;
      const mouseParallaxY = mouse.active ? (mouse.y - H / 2) * 0.008 : 0;

      // 2. Stars: Galactic Cloud & Background Stars
      for (let i = 0; i < galacticCloudStars.length; i++) {
        const s = galacticCloudStars[i];
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase);
        const currentAlpha = Math.max(0.12, Math.min(1.0, s.baseAlpha + twinkle * 0.25));

        const px = s.x - mouseParallaxX * 0.7;
        const py = s.y - mouseParallaxY * 0.7;

        if (s.halo && currentAlpha > 0.65) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(147, 197, 253, ${(currentAlpha * 0.28).toFixed(3)})`;
          ctx.arc(px, py, s.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < backgroundStars.length; i++) {
        const s = backgroundStars[i];
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase);
        const currentAlpha = Math.max(0.1, Math.min(1.0, s.baseAlpha + twinkle * 0.28));

        const px = s.x - mouseParallaxX * 0.4;
        const py = s.y - mouseParallaxY * 0.4;

        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // ========================================================
      // 3. THE SUPERMASSIVE BLACK HOLE (GRAVITATIONAL SINGULARITY)
      // "وخلى الثقب الاسود على اليمين ومش متداخل مع الكلام"
      // Positioned strictly in the far-right upper cosmic margin of the hero section.
      // Scrolls naturally and fades out smoothly so it NEVER overlaps with text in any section.
      // ========================================================
      const isMobile = W < 1024;
      const bhOpacity = Math.max(0, 1 - scrollY / 320);

      if (bhOpacity > 0.01) {
        // Place strictly on the right side in deep space
        const bhX = (isMobile ? Math.min(W - 65, W * 0.88) : Math.max(W * 0.91, W - 130)) - mouseParallaxX * 1.2;
        const bhY = (isMobile ? 115 : 155) - scrollY * 0.65 - mouseParallaxY * 1.2;
        const bhCoreRadius = isMobile ? 15 : 22;
        const diskTilt = -0.48; // Angle matching relativistic horizon

        ctx.save();
        ctx.globalAlpha = bhOpacity;
        ctx.translate(bhX, bhY);
        ctx.rotate(diskTilt);

        // (A) Outer Relativistic Accretion Glow Halo
        const outerGlow = ctx.createRadialGradient(0, 0, bhCoreRadius * 1.05, 0, 0, bhCoreRadius * 2.2);
        outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.32)');
        outerGlow.addColorStop(0.4, 'rgba(14, 116, 144, 0.12)');
        outerGlow.addColorStop(0.75, 'rgba(3, 105, 161, 0.03)');
        outerGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.ellipse(0, 0, bhCoreRadius * 2.2, bhCoreRadius * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();

        // (B) Outer Primary Cyan Accretion Ring
        ctx.beginPath();
        ctx.ellipse(0, 0, bhCoreRadius * 1.9, bhCoreRadius * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2.8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // (C) Inner Silver-White Concentric Secondary Ring
        ctx.beginPath();
        ctx.ellipse(0, 0, bhCoreRadius * 1.5, bhCoreRadius * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.88)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // (D) Gravitational Lensing Arch (Upper curved loop over the top of the black sphere)
        ctx.beginPath();
        ctx.ellipse(0, -bhCoreRadius * 0.18, bhCoreRadius * 1.25, bhCoreRadius * 1.12, 0, Math.PI * 0.82, Math.PI * 2.18);
        ctx.strokeStyle = '#7dd3fc';
        ctx.lineWidth = 2.8;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // (E) Swirling Matter Inflow (Particles along accretion stream)
        for (let i = 0; i < vortexParticles.length; i++) {
          const vp = vortexParticles[i];
          vp.angle += vp.speed;
          vp.radius -= 0.08;
          if (vp.radius < bhCoreRadius * 0.95) {
            vp.radius = rand(bhCoreRadius * 1.3, bhCoreRadius * 2.1);
            vp.angle = rand(0, Math.PI * 2);
          }

          const vpx = Math.cos(vp.angle) * vp.radius;
          const vpy = Math.sin(vp.angle) * (vp.radius * 0.36);

          ctx.beginPath();
          ctx.fillStyle = vp.color;
          ctx.globalAlpha = vp.alpha * bhOpacity;
          ctx.arc(vpx, vpy, vp.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = bhOpacity;

        // (F) The Photon Ring (Bright white starlight crescent rim on event horizon)
        ctx.beginPath();
        ctx.arc(0, 0, bhCoreRadius * 1.04, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // (G) The Event Horizon (Pure Black Void Singularity)
        ctx.beginPath();
        ctx.arc(0, 0, bhCoreRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        ctx.restore();
      }

      // ========================================================
      // 4. FLOATING SPACE ASTEROIDS & DEBRIS (3D TUMBLING ZERO-G)
      // ========================================================
      for (let i = 0; i < asteroids.length; i++) {
        const a = asteroids[i];
        a.x += a.vx;
        a.y += a.vy;
        a.rot += a.vRot;

        if (a.x < -60) a.x = W + 50;
        if (a.x > W + 60) a.x = -50;
        if (a.y < -60) a.y = H + 50;
        if (a.y > H + 60) a.y = -50;

        const aX = a.x - mouseParallaxX * a.parallax;
        const aY = a.y - mouseParallaxY * a.parallax;

        ctx.save();
        ctx.translate(aX, aY);
        ctx.rotate(a.rot);

        // Draw 3D Shaded Asteroid Polygon
        ctx.beginPath();
        for (let v = 0; v < a.vertices.length; v++) {
          const pt = a.vertices[v];
          if (v === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();

        // 3D Directional Light Shading
        const astGrad = ctx.createLinearGradient(
          -a.radius,
          -a.radius,
          a.radius,
          a.radius
        );
        astGrad.addColorStop(0, '#334155');
        astGrad.addColorStop(0.5, '#1e293b');
        astGrad.addColorStop(1, '#020617');

        ctx.fillStyle = astGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // 5. Shooting Stars (Meteors)
      const now = Date.now();
      if (now > nextMeteorTime) {
        spawnShootingStar();
        nextMeteorTime = now + rand(4500, 10000);
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.dx;
        ss.y += ss.dy;
        ss.life++;

        const progress = ss.life / ss.maxLife;
        const alpha = Math.sin(progress * Math.PI);

        if (progress >= 1 || ss.x > W + 100 || ss.y > H + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const trailStartX = ss.x - (ss.dx / Math.hypot(ss.dx, ss.dy)) * ss.length;
        const trailStartY = ss.y - (ss.dy / Math.hypot(ss.dx, ss.dy)) * ss.length;

        const grad = ctx.createLinearGradient(trailStartX, trailStartY, ss.x, ss.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.7, `rgba(147, 197, 253, ${(alpha * 0.35).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${(alpha * 0.95).toFixed(3)})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.moveTo(trailStartX, trailStartY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
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
      window.removeEventListener('scroll', handleScroll);
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
        background: '#000000',
      }}
    />
  );
}
