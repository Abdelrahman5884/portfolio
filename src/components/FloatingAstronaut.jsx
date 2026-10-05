import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Hyper-Realistic 3D Articulated WebGL Astronaut with Skeletal Rig & Moving Joints
 * - "تكون الصفحة فاضية والرجل الفضائى اللى يسحب الصفحه":
 *   Pure deep space intro with NO clutter, astronaut flies up and pulls the page open!
 * - "يكون عنده مفصلات عادى ان هو يتحرك ويحرك رقابته انا عايز راجل فضاء حقيقى":
 *   Full Mixamo skeleton with 50+ bones (Head, Neck, Arms, Forearms, Hands, Legs, Spine, Hips),
 *   embedded zero-G treading/floating animation + active neck/head mouse tracking!
 * - "وبعدين انزل":
 *   Settles to right companion and descends with scroll!
 */
export default function FloatingAstronaut() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [curtainState, setCurtainState] = useState('intro'); // 'intro' | 'pulling' | 'opened'
  const [topPos, setTopPos] = useState(90);

  const curtainStateRef = useRef(curtainState);
  useEffect(() => {
    curtainStateRef.current = curtainState;
  }, [curtainState]);

  // Trigger the dramatic curtain opening sequence
  const startCurtainPull = () => {
    if (curtainState !== 'intro') return;
    setCurtainState('pulling');

    // After astronaut pulls the curtain up and portfolio opens, switch to 'opened'
    setTimeout(() => {
      setCurtainState('opened');
    }, 1300);
  };

  // Auto-start curtain pull after 2.0 seconds if user hasn't clicked yet
  useEffect(() => {
    const timer = setTimeout(() => {
      startCurtainPull();
    }, 2000);
    return () => clearTimeout(timer);
  }, [curtainState]);

  // Track window scroll to descend the astronaut down through the portfolio ("وبعدين انزل")
  useEffect(() => {
    const handleScroll = () => {
      if (curtainState !== 'opened') return;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // From top (90px) to bottom (viewport height - 380px)
      const maxTop = Math.max(120, window.innerHeight - 380);
      const currentTop = 90 + progress * (maxTop - 90);
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

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = 340;
    let height = 420;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.setClearColor(0x000000, 0);

    // 2. Procedural Space PMREM Environment Map (Mirror reflections on suit & visor!)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    const envLight1 = new THREE.DirectionalLight(0x38bdf8, 4.2);
    envLight1.position.set(2, 2, 2);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x0284c7, 3.2);
    envLight2.position.set(-2, -2, -2);
    envScene.add(envLight2);
    const envLight3 = new THREE.DirectionalLight(0xffffff, 2.5);
    envLight3.position.set(0, 3, 0);
    envScene.add(envLight3);

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
    });
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    cubeCamera.update(renderer, envScene);
    scene.environment = cubeRenderTarget.texture;

    // 3. Cinematic Deep Space Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 2.0);
    scene.add(ambientLight);

    // Key front light for suit textures
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    // Cold blue rim light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 5.0);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Warm fill light
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 2.4);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // Visor gleam specular point light
    const visorLight = new THREE.PointLight(0x7dd3fc, 4.0, 6);
    visorLight.position.set(0, 0.8, 1.6);
    scene.add(visorLight);

    // 4. Thruster Plasma Particles System
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.18;
      particlePositions[i * 3 + 1] = -0.3 + (Math.random() - 0.5) * 0.1;
      particlePositions[i * 3 + 2] = -0.4 - Math.random() * 0.2;
      particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.015,
        vy: -0.025 - Math.random() * 0.04,
        vz: -0.035 - Math.random() * 0.05,
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
      size: 0.16,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const thrusterParticles = new THREE.Points(particleGeo, particleMat);

    // 5. Pivot Group to guarantee perfect centering
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);
    pivotGroup.add(thrusterParticles);

    // 6. Load Fully Rigged 3D Astronaut with Skeleton & Joints
    let mixer = null;
    let modelRef = null;
    let headBone = null;
    let neckBone = null;
    let leftArm = null;
    let leftForeArm = null;
    let leftHand = null;
    let rightArm = null;
    let rightForeArm = null;
    let rightHand = null;
    let pullTime = 0;

    const textureLoader = new THREE.TextureLoader();
    const diffuseMap = textureLoader.load('/models/astronaut_diffuse.png');
    diffuseMap.colorSpace = THREE.SRGBColorSpace;

    const fbxLoader = new FBXLoader();

    fbxLoader.load(
      '/models/astronaut_animated.fbx',
      (fbx) => {
        modelRef = fbx;

        const suitMat = new THREE.MeshStandardMaterial({
          map: diffuseMap,
          roughness: 0.35,
          metalness: 0.45,
          envMapIntensity: 2.0,
        });

        fbx.traverse((child) => {
          if (child.isMesh) {
            child.material = suitMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.isBone) {
            if (child.name === 'mixamorigHead') headBone = child;
            if (child.name === 'mixamorigNeck') neckBone = child;
            if (child.name === 'mixamorigLeftArm') leftArm = child;
            if (child.name === 'mixamorigLeftForeArm') leftForeArm = child;
            if (child.name === 'mixamorigLeftHand') leftHand = child;
            if (child.name === 'mixamorigRightArm') rightArm = child;
            if (child.name === 'mixamorigRightForeArm') rightForeArm = child;
            if (child.name === 'mixamorigRightHand') rightHand = child;
          }
        });

        // Compute bounding box and center
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.45 / maxDim;

        fbx.position.set(-center.x, -center.y, -center.z);
        pivotGroup.add(fbx);
        pivotGroup.scale.set(scale, scale, scale);

        // 6b. Add authentic human facial features inside the space helmet ("عايز يكون فى ملامح لراجل الفضائى")
        if (headBone) {
          const faceTexture = textureLoader.load('/models/astronaut_face_masked.png');
          faceTexture.colorSpace = THREE.SRGBColorSpace;

          // Curvature matching the circular front of the helmet visor opening
          const faceGeo = new THREE.PlaneGeometry(0.64, 0.54, 8, 8);
          const facePos = faceGeo.attributes.position;
          for (let i = 0; i < facePos.count; i++) {
            const vx = facePos.getX(i);
            facePos.setZ(i, -(vx * vx) * 0.25);
          }
          faceGeo.computeVertexNormals();

          const faceMat = new THREE.MeshStandardMaterial({
            map: faceTexture,
            roughness: 0.4,
            metalness: 0.05,
            transparent: true,
            alphaTest: 0.04,
            emissive: new THREE.Color(0xfff7ed),
            emissiveMap: faceTexture,
            emissiveIntensity: 0.32, // Internal helmet illumination so face features are crisp & visible
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -2,
            polygonOffsetUnits: -2,
          });
          const faceMesh = new THREE.Mesh(faceGeo, faceMat);
          // Visor opening is centered at local y = 0.365, z = 0.690 in headBone
          faceMesh.position.set(0, 0.365, 0.690);
          faceMesh.renderOrder = 10;
          headBone.add(faceMesh);

          // Transparent curved outer helmet visor glass
          const visorGeo = new THREE.PlaneGeometry(0.68, 0.58, 8, 8);
          const visorPos = visorGeo.attributes.position;
          for (let i = 0; i < visorPos.count; i++) {
            const vx = visorPos.getX(i);
            const vy = visorPos.getY(i);
            visorPos.setZ(i, -(vx * vx) * 0.28 - (vy * vy) * 0.1);
          }
          visorGeo.computeVertexNormals();

          const visorMat = new THREE.MeshPhysicalMaterial({
            color: 0x7dd3fc,
            roughness: 0.08,
            metalness: 0.12,
            transparent: true,
            opacity: 0.22,
            transmission: 0.85,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            envMapIntensity: 2.6,
            depthTest: true,
            depthWrite: false,
          });
          const visorMesh = new THREE.Mesh(visorGeo, visorMat);
          visorMesh.position.set(0, 0.365, 0.708);
          visorMesh.renderOrder = 11;
          headBone.add(visorMesh);

          // Interior helmet HUD lights directly illuminating the eyes, smile, and communications headset
          const helmetLight = new THREE.PointLight(0xfff7ed, 4.2, 1.8);
          helmetLight.position.set(0, 0.44, 0.82);
          headBone.add(helmetLight);

          const hudGlow = new THREE.PointLight(0x38bdf8, 2.5, 1.2);
          hudGlow.position.set(0, 0.26, 0.75);
          headBone.add(hudGlow);
        }

        // Play the articulated zero-G treading/floating animation
        if (fbx.animations && fbx.animations.length > 0) {
          mixer = new THREE.AnimationMixer(fbx);
          const action = mixer.clipAction(fbx.animations[0]);
          action.play();
        }

        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Fallback to GLTF:', err);
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/models/astronaut.glb', (gltf) => {
          modelRef = gltf.scene;
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const scale = 2.45 / Math.max(size.x, size.y, size.z);
          gltf.scene.position.set(-center.x, -center.y, -center.z);
          pivotGroup.add(gltf.scene);
          pivotGroup.scale.set(scale, scale, scale);
          setLoading(false);
        });
      }
    );

    // 7. Mouse Interaction & 3D Orbit Drag Physics
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0, z: 0 };
    const currentRotation = { x: 0, y: 0, z: 0 };
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };
    let isSpinning = false;
    let spinAngle = 0;

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (!isDragging) {
        targetRotation.y = mouse.x * 0.85;
        targetRotation.x = -mouse.y * 0.65;
        targetRotation.z = -mouse.x * 0.25;
      }
    };

    const onMouseDown = (e) => {
      isDragging = true;
      previousPointer = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onCanvasMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointer.x;
      const deltaY = e.clientY - previousPointer.y;
      previousPointer = { x: e.clientX, y: e.clientY };

      dragVelocity.x = deltaX * 0.015;
      dragVelocity.y = deltaY * 0.015;

      currentRotation.y += dragVelocity.x;
      currentRotation.x += dragVelocity.y;
    };

    const onCanvasClick = () => {
      if (isSpinning) return;
      isSpinning = true;
      spinAngle = 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onCanvasMove);
    canvas.addEventListener('click', onCanvasClick);

    // Touch Support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousPointer.x;
      const deltaY = e.touches[0].clientY - previousPointer.y;
      previousPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      currentRotation.y += deltaX * 0.018;
      currentRotation.x += deltaY * 0.018;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // 8. Animation Loop (60FPS Render Loop)
    let clock = new THREE.Clock();
    let animId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const state = curtainStateRef.current;
      const isPulling = state === 'pulling';

      // 8a. Drive the full Mixamo skeletal animation (moving arms, flexing legs, torso)
      if (mixer) mixer.update(delta);

      // 8b. Active neck & head gaze tracking in zero-G
      if (headBone && !isDragging) {
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetRotation.y * 0.55, 0.08);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetRotation.x * 0.45, 0.08);
      }
      if (neckBone && !isDragging) {
        neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, targetRotation.y * 0.25, 0.08);
      }

      // 8c. Physical Arm & Hand Pulling Kinematics ("خلى يشد الصفحه بايده")
      if (isPulling) {
        pullTime += delta;
        const p = Math.min(1, pullTime / 1.15); // Pull progress 0 -> 1

        if (p < 0.35) {
          // Phase A: Reach both hands upward and forward to GRAB the page
          const reachT = p / 0.35;
          if (leftArm) {
            leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, -1.25, reachT);
            leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, -0.3, reachT);
          }
          if (rightArm) {
            rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -1.25, reachT);
            rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, 0.3, reachT);
          }
          if (leftForeArm) leftForeArm.rotation.x = THREE.MathUtils.lerp(leftForeArm.rotation.x, -0.4, reachT);
          if (rightForeArm) rightForeArm.rotation.x = THREE.MathUtils.lerp(rightForeArm.rotation.x, -0.4, reachT);
          if (leftHand) leftHand.rotation.x = THREE.MathUtils.lerp(leftHand.rotation.x, 0.5, reachT);
          if (rightHand) rightHand.rotation.x = THREE.MathUtils.lerp(rightHand.rotation.x, 0.5, reachT);
        } else {
          // Phase B: GRIP FIRMLY WITH HANDS AND HAUL DOWN with bending elbows!
          const haulT = (p - 0.35) / 0.65;
          if (leftArm) {
            leftArm.rotation.x = THREE.MathUtils.lerp(-1.25, 0.55, haulT);
            leftArm.rotation.z = THREE.MathUtils.lerp(-0.3, -0.65, haulT);
          }
          if (rightArm) {
            rightArm.rotation.x = THREE.MathUtils.lerp(-1.25, 0.55, haulT);
            rightArm.rotation.z = THREE.MathUtils.lerp(0.3, 0.65, haulT);
          }
          if (leftForeArm) leftForeArm.rotation.x = THREE.MathUtils.lerp(-0.4, -1.55, haulT);
          if (rightForeArm) rightForeArm.rotation.x = THREE.MathUtils.lerp(-0.4, -1.55, haulT);
          if (leftHand) leftHand.rotation.x = 0.8; // Tight grip
          if (rightHand) rightHand.rotation.x = 0.8;
        }
      } else {
        pullTime = 0;
      }

      // Inertia & Smooth Lerp Damping towards target rotation
      if (isDragging) {
        currentRotation.y += dragVelocity.x;
        currentRotation.x += dragVelocity.y;
      } else {
        dragVelocity.x *= 0.92;
        dragVelocity.y *= 0.92;
        currentRotation.y += dragVelocity.x;
        currentRotation.x += dragVelocity.y;

        const speed = Math.hypot(dragVelocity.x, dragVelocity.y);
        const trackFactor = speed > 0.008 ? 0.02 : 0.06;
        currentRotation.x += (targetRotation.x - currentRotation.x) * trackFactor;
        currentRotation.y += (targetRotation.y - currentRotation.y) * trackFactor;
        currentRotation.z += (targetRotation.z - currentRotation.z) * trackFactor;
      }

      // Handle 360 Zero-G space flip on click
      if (isSpinning) {
        spinAngle += 0.12;
        currentRotation.y += 0.12;
        if (spinAngle >= Math.PI * 2) {
          isSpinning = false;
        }
      }

      // Human-like Organic Physics: Natural multi-frequency compound breathing & zero-G floating
      const floatY = Math.sin(time * 1.5) * 0.08 + Math.sin(time * 0.7) * 0.03;
      const floatX = Math.cos(time * 1.2) * 0.04;
      const floatTilt = Math.sin(time * 0.9) * 0.05;

      // During pulling: Astronaut tilts backward with tension as he hauls the cosmic portal with hands
      const pullTiltX = isPulling ? -0.36 : 0;

      pivotGroup.position.set(floatX, floatY, 0);
      pivotGroup.rotation.x = currentRotation.x + pullTiltX;
      pivotGroup.rotation.y = currentRotation.y;
      pivotGroup.rotation.z = currentRotation.z + floatTilt;

      // Update Thruster Particles Animation (Boosted 3x when pulling!)
      const posAttr = particleGeo.attributes.position;
      const positions = posAttr.array;
      const thrusterSpeedMult = isPulling ? 2.8 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        positions[i * 3] += vel.vx * thrusterSpeedMult;
        positions[i * 3 + 1] += vel.vy * thrusterSpeedMult;
        positions[i * 3 + 2] += vel.vz * thrusterSpeedMult;

        if (positions[i * 3 + 1] < -0.9 || positions[i * 3 + 2] < -1.2) {
          positions[i * 3] = (Math.random() - 0.5) * 0.18;
          positions[i * 3 + 1] = -0.3 + (Math.random() - 0.5) * 0.08;
          positions[i * 3 + 2] = -0.4;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onCanvasMove);
      canvas.removeEventListener('click', onCanvasClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* ========================================================
          1. THE EMPTY DEEP SPACE CURTAIN ("تكون الصفحة فاضية والرجل الفضائي يشد صفحة البورتفوليو")
          Clean, pure cosmos stage without clutter
          ======================================================== */}
      <div
        className={`cosmic-portal-curtain ${curtainState}`}
        onClick={startCurtainPull}
        aria-hidden={curtainState === 'opened'}
      >
        {/* Laser Energy Pull Edge Seam at bottom of the pulling curtain */}
        <div className="curtain-laser-seam">
          <div className="curtain-laser-glow" />
        </div>
      </div>

      {/* Physical Hand Grip Points where astronaut's hands grasp the top edge of the page ("خلى يشد الصفحه بايده") */}
      {curtainState === 'pulling' && (
        <div className="astronaut-hand-grip-points" aria-hidden="true">
          <div className="hand-grip-clamp left" />
          <div className="hand-grip-clamp right" />
        </div>
      )}

      {/* ========================================================
          2. THE HYPER-REALISTIC 3D ARTICULATED ASTRONAUT
          In intro: Front and Center in empty space
          In pulling: Ascends to top to pull the curtain
          In opened: Glides and descends smoothly with page scroll!
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

        {/* Real-time WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="real-3d-astronaut-canvas"
          title="Interactive 3D Articulated Astronaut - Drag to rotate!"
        />

        {/* Subtle Zero-G Atmospheric Aura behind 3D model */}
        <div className="astronaut-3d-aura" aria-hidden="true" />
      </aside>
    </>
  );
}
