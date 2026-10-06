import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildAstronaut } from './astronaut/buildAstronaut';

/**
 * Hyper-Realistic 3D Articulated WebGL Astronaut with Skeletal Rig & Expressive Hand Gestures
 * Features:
 * - "شيل الثقب الاسود": Background canvas is pure cosmic starfield, no black hole distraction.
 * - "مكان شغل مفاصل الرجل الفضائي خليها": Active articulated legs (hips, knees, ankles) & spine treading naturally in zero-G.
 * - "وخلية يعمل حركات بايده":
 *   * Intro: Waving hello warmly to the visitor ("مرحباً بك!").
 *   * Opened: Cycles through realistic EVA gestures (waving, checking wrist cuff computer, thumbs-up "All Systems Go", zero-G float).
 *   * Click/Tap: Instant cheerful wave + 360° zero-G acrobatic spin!
 * - "خلى البداية بتاعت الصفحه الاولى احسن من كدا":
 *   * Cinematic Glassmorphism Mission Control HUD with astronaut greeting bubble,
 *     clear call-to-action button ("🚀 ابدأ الرحلة البرمجية • Launch Portfolio"),
 *     and smooth countdown timer with instant-launch capability.
 * - "ويكون شغال حلو على التليفون":
 *   * Ultra-smooth mobile performance (adaptive pixelRatio & particle load).
 *   * Non-blocking touch handling (vertical finger scrolling works smoothly on mobile without being trapped).
 *   * Fully responsive sizing for all phone screens.
 */
export default function FloatingAstronaut() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [curtainState, setCurtainState] = useState('intro'); // 'intro' | 'opened'
  const [topPos, setTopPos] = useState(90);

  const curtainStateRef = useRef(curtainState);
  useEffect(() => {
    curtainStateRef.current = curtainState;
  }, [curtainState]);

  // Open the page smoothly when user clicks anywhere ("تخلى الصفحة تفتح لما اضغط على الصفح")
  // Astronaut stays in place and glides smoothly to the right, NOT pulled up to top ("ومدخليش وانت بتفتح الصفحة الرائد الفضاء يطلع معاها")
  const startCurtainPull = useCallback(() => {
    if (curtainStateRef.current !== 'intro') return;
    setCurtainState('opened');
  }, []);

  // Track window scroll to descend the astronaut down through the portfolio ("وبعدين انزل")
  useEffect(() => {
    const handleScroll = () => {
      if (curtainState !== 'opened') return;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // From top (90px) to bottom (viewport height - 380px)
      const isMobile = window.innerWidth < 768;
      const offsetBottom = isMobile ? 220 : 380;
      const minTop = isMobile ? 70 : 90;
      const maxTop = Math.max(minTop + 30, window.innerHeight - offsetBottom);
      const currentTop = minTop + progress * (maxTop - minTop);
      setTopPos(currentTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [curtainState]);

  // Three.js 3D WebGL Scene & Skeletal Kinematics Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(32, 340 / 420, 0.1, 100);
    camera.position.set(0, 0.15, 4.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    // On mobile: limit to 1.5 for maximum 60FPS fluid battery-friendly rendering
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    // Keep the drawing buffer in sync with the CSS size of the container
    const syncSize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);

    // 2. Studio environment map -> real reflections on the gold visor & EMU suit
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;

    // 3. Cinematic lighting
    scene.add(new THREE.HemisphereLight(0xeaf2ff, 0x1b2333, 0.95));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
    keyLight.position.set(2.5, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 2.3);
    rimLight.position.set(-3.5, 2, -3);
    scene.add(rimLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(2, 1, -4);
    scene.add(backLight);

    const fillLight = new THREE.DirectionalLight(0xffe4c4, 0.7);
    fillLight.position.set(-2, -2, 3);
    scene.add(fillLight);

    // 4. Build the detailed articulated EMU astronaut
    const astronaut = buildAstronaut();
    const { joints } = astronaut;
    const model = astronaut.group;

    // Natural relaxed base pose (A-pose with soft zero-G bend)
    const rest = {
      shoulderL: { x: 0.08, z: 0.24 },
      shoulderR: { x: 0.08, z: -0.24 },
      elbowL: { x: -0.35 },
      elbowR: { x: -0.35 },
      hipL: { x: -0.05, z: 0.07 },
      hipR: { x: -0.05, z: -0.07 },
      kneeL: { x: 0.14 },
      kneeR: { x: 0.14 },
    };
    Object.entries(rest).forEach(([name, r]) => {
      if (joints[name]) {
        if (r.x !== undefined) joints[name].rotation.x = r.x;
        if (r.z !== undefined) joints[name].rotation.z = r.z;
      }
    });

    // Center & normalize model size inside a pivot
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    model.position.set(-center.x, -center.y, -center.z);
    pivotGroup.add(model);
    const scale = 2.2 / size.y;
    pivotGroup.scale.setScalar(scale);

    // 5. PLSS thruster plasma particles
    const particleCount = isMobile ? 32 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];
    const emitter = new THREE.Vector3(0, 0.36 - 0.48, -0.36); // bottom of PLSS

    const resetParticle = (i, randomAge = false) => {
      particlePositions[i * 3] = emitter.x + (Math.random() - 0.5) * 0.25;
      particlePositions[i * 3 + 1] = emitter.y - (randomAge ? Math.random() * 0.5 : 0);
      particlePositions[i * 3 + 2] = emitter.z - (randomAge ? Math.random() * 0.3 : 0);
    };
    for (let i = 0; i < particleCount; i++) {
      resetParticle(i, true);
      particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: -0.012 - Math.random() * 0.02,
        vz: -0.006 - Math.random() * 0.012,
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, '#38bdf8');
    grad.addColorStop(0.75, '#0284c7');
    grad.addColorStop(1, 'transparent');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const thrusterParticles = new THREE.Points(particleGeo, particleMat);
    joints.torso.add(thrusterParticles);

    setLoading(false);

    // 6. Mouse & Touch Interaction (With Non-blocking Mobile Scroll!)
    const mouse = { x: 0, y: 0 };
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    let pointerStart = { x: 0, y: 0 };
    let dragVelocity = 0;
    let tiltVelocity = 0;
    let yaw = 0; // body yaw
    let tilt = 0; // body pitch
    let lastInteraction = -10;
    let spinBoost = 0;
    let userReactionTimer = 0; // Triggers instant wave on click
    const AUTO_SPIN_SPEED = 0.42; // rad/s (smooth ~15s full 360° rotation)

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (e) => {
      isDragging = true;
      previousPointer = { x: e.clientX, y: e.clientY };
      pointerStart = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onCanvasMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointer.x;
      const deltaY = e.clientY - previousPointer.y;
      previousPointer = { x: e.clientX, y: e.clientY };
      dragVelocity = deltaX * 0.012;
      tiltVelocity = deltaY * 0.008;
      yaw += dragVelocity;
      tilt = THREE.MathUtils.clamp(tilt + tiltVelocity, -0.6, 0.6);
    };

    const triggerSpecialReaction = () => {
      spinBoost = Math.PI * 2;
      userReactionTimer = 3.2; // 3.2s of enthusiastic wave & thumbs up
      setIsWavingReaction(true);
      setTimeout(() => setIsWavingReaction(false), 3000);
    };

    const onCanvasClick = (e) => {
      // If mouse moved very little, it's a real click
      if (Math.hypot(e.clientX - pointerStart.x, e.clientY - pointerStart.y) < 8) {
        triggerSpecialReaction();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onCanvasMove);
    canvas.addEventListener('click', onCanvasClick);

    // Mobile Touch Handlers - NON-BLOCKING!
    // In opened phase: vertical touch moves scroll the portfolio page naturally!
    let isHorizontalSwipe = false;
    let touchMoved = false;

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        pointerStart = { x: touch.clientX, y: touch.clientY };
        previousPointer = { x: touch.clientX, y: touch.clientY };
        isDragging = true;
        isHorizontalSwipe = false;
        touchMoved = false;
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - previousPointer.x;
      const deltaY = touch.clientY - previousPointer.y;
      const totalDx = touch.clientX - pointerStart.x;
      const totalDy = touch.clientY - pointerStart.y;

      if (!touchMoved && Math.hypot(totalDx, totalDy) > 6) {
        touchMoved = true;
        // If vertical movement dominates and in opened state, let the phone scroll normally!
        if (Math.abs(totalDy) > Math.abs(totalDx) * 1.3 && curtainStateRef.current === 'opened') {
          isDragging = false;
          return;
        }
        isHorizontalSwipe = true;
      }

      if (isHorizontalSwipe) {
        previousPointer = { x: touch.clientX, y: touch.clientY };
        dragVelocity = deltaX * 0.015;
        yaw += dragVelocity;
        tilt = THREE.MathUtils.clamp(tilt + deltaY * 0.008, -0.5, 0.5);
      }
    };

    const onTouchEnd = () => {
      if (isDragging && !touchMoved) {
        // Quick tap on mobile: trigger special wave + spin reaction!
        triggerSpecialReaction();
      }
      isDragging = false;
      isHorizontalSwipe = false;
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // 7. Dynamic Animation Loop & Skeletal Joint Kinematics
    const clock = new THREE.Clock();
    let animId = null;
    let pullTime = 0;
    const lerp = THREE.MathUtils.lerp;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();
      const state = curtainStateRef.current;
      const isIntro = state === 'intro';
      const isPulling = state === 'pulling';

      if (userReactionTimer > 0) {
        userReactionTimer -= delta;
      }

      // ========================================================
      // 7a. ARTICULATED LEGS & SPINE MOVEMENTS ("مكان شغل مفاصل الرجل الفضائي خليها")
      // Natural zero-G locomotion: hips pedal softly, knees flex, ankles float!
      // ========================================================
      const legSpeed = 1.35;
      const swingL = Math.sin(time * legSpeed);
      const swingR = Math.sin(time * legSpeed + Math.PI);

      joints.hipL.rotation.x = rest.hipL.x + swingL * 0.16;
      joints.hipR.rotation.x = rest.hipR.x + swingR * 0.16;
      joints.hipL.rotation.z = rest.hipL.z + Math.cos(time * 0.7) * 0.03;
      joints.hipR.rotation.z = rest.hipR.z - Math.cos(time * 0.7) * 0.03;

      // Knees bend organically as thighs drift forward
      joints.kneeL.rotation.x = rest.kneeL.x + Math.max(0, swingL) * 0.28;
      joints.kneeR.rotation.x = rest.kneeR.x + Math.max(0, swingR) * 0.28;

      // Boots and ankles flex in sync
      joints.ankleL.rotation.x = Math.sin(time * legSpeed + 0.5) * 0.14;
      joints.ankleR.rotation.x = Math.sin(time * legSpeed + 0.5 + Math.PI) * 0.14;

      // Organic spine breathing & pelvic stabilization
      joints.torso.rotation.x = Math.sin(time * 0.85) * 0.03;
      joints.pelvis.rotation.y = Math.sin(time * 0.65) * 0.04;

      // ========================================================
      // 7b. EXPRESSIVE HAND & ARM GESTURES ("خلية يعمل حركات بايده")
      // ========================================================
      // Target kinematics for left and right arms
      let armTargets = {
        // Left arm
        shLX: rest.shoulderL.x,
        shLZ: rest.shoulderL.z,
        elLX: rest.elbowL.x,
        wrLX: 0,
        wrLY: 0,
        wrLZ: 0,
        handLZ: 0,
        thumbLX: -0.5,
        // Right arm
        shRX: rest.shoulderR.x,
        shRZ: rest.shoulderR.z,
        elRX: rest.elbowR.x,
        wrRX: 0,
        wrRY: 0,
        wrRZ: 0,
        handRZ: 0,
        thumbRX: -0.5,
      };

      if (isPulling) {
        // ========================================================
        // Pulling State: Powerful physical 2-hand haul kinematics
        // ========================================================
        pullTime += delta;
        const p = Math.min(1, pullTime / 1.15);
        if (p < 0.35) {
          // Phase A: Reach both hands up overhead to grab the cosmic laser seam
          const t = p / 0.35;
          armTargets.shLX = lerp(armTargets.shLX, -2.7, t);
          armTargets.shRX = lerp(armTargets.shRX, -2.7, t);
          armTargets.shLZ = lerp(armTargets.shLZ, 0.18, t);
          armTargets.shRZ = lerp(armTargets.shRZ, -0.18, t);
          armTargets.elLX = lerp(armTargets.elLX, -0.25, t);
          armTargets.elRX = lerp(armTargets.elRX, -0.25, t);
          armTargets.wrLX = lerp(0, 0.45, t);
          armTargets.wrRX = lerp(0, 0.45, t);
        } else {
          // Phase B: Firm muscular grip and hauling down with bent elbows
          const t = (p - 0.35) / 0.65;
          armTargets.shLX = lerp(-2.7, -0.85, t);
          armTargets.shRX = lerp(-2.7, -0.85, t);
          armTargets.shLZ = lerp(0.18, 0.45, t);
          armTargets.shRZ = lerp(-0.18, -0.45, t);
          armTargets.elLX = lerp(-0.25, -1.65, t);
          armTargets.elRX = lerp(-0.25, -1.65, t);
          armTargets.wrLX = 0.8;
          armTargets.wrRX = 0.8;
        }
      } else if (isIntro || userReactionTimer > 0) {
        // ========================================================
        // Intro State & User Click: Welcoming Hand Wave ("مرحباً بك!")
        // Right hand raised up, waving side-to-side warmly!
        // ========================================================
        const waveFreq = 5.2;
        const waveAngle = Math.sin(time * waveFreq) * 0.38;

        // Right arm raised in salute/wave
        armTargets.shRX = -1.65; // Lift upper arm up
        armTargets.shRZ = -0.58; // Splay outward
        armTargets.elRX = -1.35; // Bend elbow ~90°
        armTargets.wrRZ = waveAngle; // Forearm wave side-to-side
        armTargets.wrRY = Math.cos(time * 2.5) * 0.15;
        armTargets.handRZ = waveAngle * 1.1; // Hand flexes with wave

        // Left arm soft zero-G drift
        armTargets.shLX = rest.shoulderL.x + Math.sin(time * 1.1) * 0.1;
        armTargets.shLZ = rest.shoulderL.z + Math.cos(time * 0.9) * 0.05;
        armTargets.elLX = rest.elbowL.x + Math.sin(time * 1.1 + 0.8) * 0.08;
      } else {
        // ========================================================
        // Opened State: Dynamic 4-Gesture EVA Choreography Sequencer
        // Cycles smoothly every 16 seconds between lifelike astronaut actions!
        // ========================================================
        const cycle = time % 16.0;

        if (cycle < 5.0) {
          // Gesture 1: Natural Zero-G Float (Swimming drift)
          armTargets.shLX = rest.shoulderL.x + Math.sin(time * 1.2) * 0.12;
          armTargets.shLZ = rest.shoulderL.z + Math.sin(time * 0.8) * 0.06;
          armTargets.elLX = rest.elbowL.x + Math.sin(time * 1.2 + 0.8) * 0.12;

          armTargets.shRX = rest.shoulderR.x + Math.sin(time * 1.2 + Math.PI) * 0.12;
          armTargets.shRZ = rest.shoulderR.z - Math.sin(time * 0.8) * 0.06;
          armTargets.elRX = rest.elbowR.x + Math.sin(time * 1.2 + 0.8 + Math.PI) * 0.12;
        } else if (cycle < 9.0) {
          // Gesture 2: Friendly Wave with Right Hand
          const waveT = Math.sin(time * 5.0) * 0.32;
          armTargets.shRX = -1.6;
          armTargets.shRZ = -0.52;
          armTargets.elRX = -1.3;
          armTargets.wrRZ = waveT;
          armTargets.handRZ = waveT * 1.2;

          armTargets.shLX = rest.shoulderL.x + Math.sin(time * 0.9) * 0.06;
          armTargets.elLX = rest.elbowL.x;
        } else if (cycle < 13.0) {
          // Gesture 3: Checking Left Wrist Cuff Computer & Mission Checklist
          // Lifts left forearm to visor level, rotates wrist inward
          armTargets.shLX = -1.15;
          armTargets.shLZ = 0.28;
          armTargets.elLX = -1.45;
          armTargets.wrLY = 1.1; // Rotate wrist so checklist faces helmet
          armTargets.wrLZ = -0.25;

          // Right arm slightly reaches across as if adjusting cuff instrument knob
          armTargets.shRX = -0.65;
          armTargets.shRZ = 0.2;
          armTargets.elRX = -0.9;
        } else {
          // Gesture 4: Thumbs Up / "Systems Nominal" with Right Arm
          armTargets.shRX = -0.85; // Arm forward
          armTargets.shRZ = -0.15;
          armTargets.elRX = -0.7; // Forearm angled forward
          armTargets.wrRX = 0.25;
          armTargets.thumbRX = -1.25; // Thumb pointing proudly UP!
          armTargets.handRZ = 0.1;

          armTargets.shLX = rest.shoulderL.x + Math.sin(time * 1.0) * 0.08;
          armTargets.elLX = rest.elbowL.x;
        }
      }

      // Smooth kinematic lerp for all joints
      const k = isPulling ? 0.32 : 0.09;

      // Left Arm Joint Rotations
      joints.shoulderL.rotation.x = lerp(joints.shoulderL.rotation.x, armTargets.shLX, k);
      joints.shoulderL.rotation.z = lerp(joints.shoulderL.rotation.z, armTargets.shLZ, k);
      joints.elbowL.rotation.x = lerp(joints.elbowL.rotation.x, armTargets.elLX, k);
      joints.wristL.rotation.x = lerp(joints.wristL.rotation.x, armTargets.wrLX, k);
      joints.wristL.rotation.y = lerp(joints.wristL.rotation.y, armTargets.wrLY, k);
      joints.wristL.rotation.z = lerp(joints.wristL.rotation.z, armTargets.wrLZ, k);
      if (joints.handL) joints.handL.rotation.z = lerp(joints.handL.rotation.z, armTargets.handLZ, k);
      if (joints.thumbL) joints.thumbL.rotation.x = lerp(joints.thumbL.rotation.x, armTargets.thumbLX, k);

      // Right Arm Joint Rotations
      joints.shoulderR.rotation.x = lerp(joints.shoulderR.rotation.x, armTargets.shRX, k);
      joints.shoulderR.rotation.z = lerp(joints.shoulderR.rotation.z, armTargets.shRZ, k);
      joints.elbowR.rotation.x = lerp(joints.elbowR.rotation.x, armTargets.elRX, k);
      joints.wristR.rotation.x = lerp(joints.wristR.rotation.x, armTargets.wrRX, k);
      joints.wristR.rotation.y = lerp(joints.wristR.rotation.y, armTargets.wrRY, k);
      joints.wristR.rotation.z = lerp(joints.wristR.rotation.z, armTargets.wrRZ, k);
      if (joints.handR) joints.handR.rotation.z = lerp(joints.handR.rotation.z, armTargets.handRZ, k);
      if (joints.thumbR) joints.thumbR.rotation.x = lerp(joints.thumbR.rotation.x, armTargets.thumbRX, k);

      // ========================================================
      // 7c. ACTIVE NECK & HEAD GAZE TRACKING ("وتخلى الرائد الفضاء يبص للماوس")
      // ========================================================
      // Noticeable, direct, and responsive head tracking that follows the mouse everywhere
      const targetHeadY = mouse.x * 0.95;  // Look left-right directly toward mouse cursor
      const targetHeadX = -mouse.y * 0.70; // Look up-down directly toward mouse cursor
      joints.head.rotation.y = lerp(joints.head.rotation.y, targetHeadY, 0.14);
      joints.head.rotation.x = lerp(joints.head.rotation.x, targetHeadX, 0.14);
      joints.head.rotation.z = lerp(joints.head.rotation.z, mouse.x * 0.12, 0.08); // Lifelike natural head tilt
      // Torso also slightly turns towards mouse so the entire upper body reacts organically
      joints.torso.rotation.y = lerp(joints.torso.rotation.y, mouse.x * 0.28, 0.08);

      // ========================================================
      // 7d. BODY YAW & 360° TURNTABLE
      // ========================================================
      if (isDragging) {
        lastInteraction = time;
      } else {
        dragVelocity *= 0.93;
        yaw += dragVelocity;
        tilt = lerp(tilt, 0, 0.02);

        // Resume continuous 360° showcase turntable shortly after user drag
        const autoWeight = THREE.MathUtils.clamp((time - lastInteraction - 1.5) / 1.5, 0, 1);
        yaw += AUTO_SPIN_SPEED * delta * autoWeight * (isPulling ? 0 : 1);
      }

      // Spin boost from click or tap
      if (spinBoost > 0) {
        const step = Math.min(spinBoost, 7.5 * delta);
        yaw += step;
        spinBoost -= step;
      }

      // While pulling, face viewer directly for cinematic launch
      if (isPulling) {
        const front = Math.round(yaw / (Math.PI * 2)) * Math.PI * 2;
        yaw = lerp(yaw, front, 0.12);
      }

      // Organic zero-G floating displacement
      const floatY = Math.sin(time * 1.5) * 0.05 + Math.sin(time * 0.7) * 0.02;
      const floatX = Math.cos(time * 1.2) * 0.03;
      const floatRoll = Math.sin(time * 0.9) * 0.04;
      const pullTiltX = isPulling ? -0.26 : 0;

      pivotGroup.position.set(floatX, floatY, 0);
      pivotGroup.rotation.set(tilt + pullTiltX + 0.06, yaw, floatRoll);

      // ========================================================
      // 7e. PLSS THRUSTER PARTICLES (Enhanced glow when pulling)
      // ========================================================
      const posAttr = particleGeo.attributes.position;
      const thrust = isPulling ? 3.0 : 1.0;
      for (let i = 0; i < particleCount; i++) {
        const v = particleVelocities[i];
        particlePositions[i * 3] += v.vx * thrust;
        particlePositions[i * 3 + 1] += v.vy * thrust;
        particlePositions[i * 3 + 2] += v.vz * thrust;
        if (particlePositions[i * 3 + 1] < emitter.y - 0.6) resetParticle(i);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onCanvasMove);
      canvas.removeEventListener('click', onCanvasClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      astronaut.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      envRT.dispose();
      roomEnv.dispose?.();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* ========================================================
          1. CLEAN DEEP SPACE CURTAIN (OPENS ON CLICK)
          "شيل الكلام اللى فى الصفحة وتخلى الصفحة تفتح لما اضغط على الصفحة"
          ======================================================== */}
      <div
        className={`cosmic-portal-curtain ${curtainState}`}
        onClick={startCurtainPull}
        role="button"
        tabIndex={0}
        aria-label="انقر لفتح البورتفوليو"
        aria-hidden={curtainState === 'opened'}
      >
        {/* Laser Energy Seam on bottom of curtain */}
        <div className="curtain-laser-seam">
          <div className="curtain-laser-glow" />
        </div>
      </div>

      {/* ========================================================
          2. THE HYPER-REALISTIC 3D ARTICULATED ASTRONAUT
          In intro: Front and Center waving hello!
          In pulling: Ascends to top, grabs laser edge & pulls page open!
          In opened: Glides on the right and descends smoothly with scroll!
          ======================================================== */}
      <aside
        className={`real-3d-astronaut-container astronaut-phase-${curtainState}`}
        ref={containerRef}
        style={{
          top: curtainState === 'opened' ? `${topPos}px` : undefined,
        }}
        aria-label="Hyper-Realistic 3D WebGL Articulated Astronaut"
      >
        {/* Loading Space Indicator */}
        {loading && (
          <div className="astronaut-3d-loader" aria-hidden="true">
            <div className="loader-ring" />
            <span className="loader-dot" />
          </div>
        )}

        {/* Real-time WebGL Canvas with Touch & Drag */}
        <canvas
          ref={canvasRef}
          id="astronaut-3d-canvas"
          className="real-3d-astronaut-canvas"
          title="انقر أو اسحب لتدوير رائد الفضاء 360 درجة!"
        />

        {/* Subtle Zero-G Atmospheric Aura behind 3D model */}
        <div className="astronaut-3d-aura" aria-hidden="true" />
      </aside>
    </>
  );
}
