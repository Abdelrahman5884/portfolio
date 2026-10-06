import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * Detailed procedural NASA EMU-style astronaut.
 * Built entirely from Three.js primitives + canvas-generated textures so every
 * detail (gold visor, helmet lights/cameras, chest DCM, PLSS backpack, flag
 * patches, red stripes, knee pads, gloves, boots, hoses) is crisp from all angles.
 *
 * Coordinate system: +Y up, astronaut faces +Z, astronaut's LEFT side is +X.
 * Returns { group, joints, dispose }.
 */

/* ------------------------------------------------------------------ */
/* Canvas texture helpers                                              */
/* ------------------------------------------------------------------ */

function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return { canvas, ctx: canvas.getContext('2d') };
}

function toTexture(canvas, { repeat = null, srgb = true } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeat[0], repeat[1]);
  }
  return tex;
}

function drawStar(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.4 : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fill();
}

function drawFlag(ctx, x, y, w, h) {
  const sh = h / 13;
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = i % 2 ? '#f7f7f7' : '#b31942';
    ctx.fillRect(x, y + i * sh, w, Math.ceil(sh) + 0.5);
  }
  const cw = w * 0.4;
  const ch = sh * 7;
  ctx.fillStyle = '#0a3161';
  ctx.fillRect(x, y, cw, ch);
  ctx.fillStyle = '#ffffff';
  const r = ch * 0.05;
  for (let row = 0; row < 9; row++) {
    const cols = row % 2 ? 5 : 6;
    for (let k = 0; k < cols; k++) {
      const sx = x + ((row % 2 ? 2 * k + 2 : 2 * k + 1) * cw) / 12;
      const sy = y + ((row + 1) * ch) / 10;
      drawStar(ctx, sx, sy, r);
    }
  }
}

/** Ripstop "ortho fabric" bump texture (weave + grid) */
function createFabricBump() {
  const S = 256;
  const { canvas, ctx } = createCanvas(S, S);
  const img = ctx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;
      const warp = Math.sin(x * 0.9) * 0.5 + 0.5;
      const weft = Math.sin(y * 0.9) * 0.5 + 0.5;
      const weave = (Math.floor(x / 4) + Math.floor(y / 4)) % 2 ? warp : weft;
      const v = 105 + weave * 45 + (Math.random() - 0.5) * 26;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = 'rgba(255,255,255,0.45)';
  ctx.lineWidth = 2;
  for (let k = 0; k <= S; k += 32) {
    ctx.beginPath();
    ctx.moveTo(k, 0);
    ctx.lineTo(k, S);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, k);
    ctx.lineTo(S, k);
    ctx.stroke();
  }
  return toTexture(canvas, { repeat: [4, 4], srgb: false });
}

function createFlagTexture() {
  const { canvas, ctx } = createCanvas(456, 256);
  ctx.fillStyle = '#d5d9de';
  ctx.fillRect(0, 0, 456, 256);
  drawFlag(ctx, 8, 8, 440, 240);
  return toTexture(canvas);
}

function arcText(ctx, text, cx, cy, radius, fontPx, bottom = false) {
  ctx.save();
  ctx.font = `bold ${fontPx}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const charAngle = (fontPx * 0.78) / radius;
  const total = charAngle * text.length;
  const center = bottom ? Math.PI / 2 : -Math.PI / 2;
  for (let i = 0; i < text.length; i++) {
    const offset = (i + 0.5) * charAngle - total / 2;
    const a = bottom ? center - offset : center + offset;
    ctx.save();
    ctx.translate(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
    ctx.rotate(bottom ? a - Math.PI / 2 : a + Math.PI / 2);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

/** Circular EVA mission patch (right shoulder) */
function createMissionPatch() {
  const S = 256;
  const { canvas, ctx } = createCanvas(S, S);
  const c = S / 2;
  ctx.beginPath();
  ctx.arc(c, c, 124, 0, Math.PI * 2);
  ctx.fillStyle = '#d4a017';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(c, c, 112, 0, Math.PI * 2);
  ctx.fillStyle = '#0b1f4d';
  ctx.fill();
  // inner space disc
  const g = ctx.createRadialGradient(c, c - 20, 10, c, c, 80);
  g.addColorStop(0, '#1d4ed8');
  g.addColorStop(1, '#071338');
  ctx.beginPath();
  ctx.arc(c, c, 80, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  // earth limb
  ctx.save();
  ctx.beginPath();
  ctx.arc(c, c, 80, 0, Math.PI * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.arc(c, c + 150, 110, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.ellipse(c - 30, c + 58, 26, 9, -0.2, 0, Math.PI * 2);
  ctx.fill();
  // stars
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 14; i++) {
    drawStar(ctx, c - 65 + Math.random() * 130, c - 65 + Math.random() * 80, 2 + Math.random() * 3);
  }
  // orbit + red vector
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(c, c, 70, 24, -0.35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(c - 70, c + 30);
  ctx.quadraticCurveTo(c, c - 10, c + 72, c - 52);
  ctx.quadraticCurveTo(c + 10, c + 5, c - 70, c + 30);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#ffffff';
  arcText(ctx, 'EXTRAVEHICULAR', c, c, 96, 17);
  arcText(ctx, 'ACTIVITY', c, c, 96, 17, true);
  return toTexture(canvas);
}

/** Display & Control Module face (chest unit) */
function createDCMTexture() {
  const W = 640;
  const H = 256;
  const { canvas, ctx } = createCanvas(W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#eceff2');
  bg.addColorStop(1, '#c9ced5');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#8b939d';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, W - 6, H - 6);

  // LCD display
  ctx.fillStyle = '#1b2128';
  ctx.beginPath();
  ctx.roundRect(200, 26, 240, 100, 10);
  ctx.fill();
  ctx.fillStyle = '#05301b';
  ctx.fillRect(212, 38, 216, 76);
  ctx.fillStyle = '#5dffa0';
  ctx.font = 'bold 26px monospace';
  ctx.fillText('SUIT P 4.3', 226, 70);
  ctx.font = 'bold 18px monospace';
  ctx.fillText('O2 98%  CO2 0.1', 226, 100);

  // toggle switches
  const labels = ['PWR', 'FAN', 'H2O', 'COMM'];
  labels.forEach((label, i) => {
    const x = 40 + i * 40 + (i > 1 ? 450 : 0);
    ctx.fillStyle = '#2b3138';
    ctx.beginPath();
    ctx.roundRect(x - 12, 60, 24, 44, 6);
    ctx.fill();
    ctx.fillStyle = '#d1d5db';
    ctx.beginPath();
    ctx.arc(x, i % 2 ? 72 : 92, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, 128);
    ctx.textAlign = 'left';
  });

  // bottom row: buttons + labels
  const btnColors = ['#f59e0b', '#2563eb', '#dc2626', '#16a34a', '#e5e7eb'];
  btnColors.forEach((col, i) => {
    const x = 210 + i * 50;
    ctx.fillStyle = '#374151';
    ctx.beginPath();
    ctx.arc(x, 180, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x, 180, 12, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('MODE   O2   PURGE   ACT   ALT', 186, 222);

  // hazard strip + caution label
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 ? '#111827' : '#facc15';
    ctx.fillRect(40 + i * 16, 160, 16, 22);
  }
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 14px Arial';
  ctx.fillText('CAUTION', 62, 206);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(500, 160, 110, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px Arial';
  ctx.fillText('EMER O2', 518, 186);

  // screws
  ctx.fillStyle = '#6b7280';
  [[18, 18], [W - 18, 18], [18, H - 18], [W - 18, H - 18]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  return toTexture(canvas);
}

/** PLSS backpack rear panel (panels, flag, vents, labels) */
function createPLSSTexture() {
  const W = 512;
  const H = 610;
  const { canvas, ctx } = createCanvas(W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#f4f5f7');
  bg.addColorStop(1, '#dde1e6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // panel seams
  ctx.strokeStyle = '#a9b0b9';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, W - 32, H - 32);
  ctx.beginPath();
  ctx.moveTo(16, 230);
  ctx.lineTo(W - 16, 230);
  ctx.moveTo(16, 430);
  ctx.lineTo(W - 16, 430);
  ctx.moveTo(W / 2, 430);
  ctx.lineTo(W / 2, H - 16);
  ctx.stroke();

  // screws along seams
  ctx.fillStyle = '#8b939d';
  for (let x = 40; x < W - 20; x += 54) {
    [30, 230, 430, H - 30].forEach((y) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // US flag
  ctx.fillStyle = '#9aa1aa';
  ctx.fillRect(148, 52, 216, 124);
  drawFlag(ctx, 154, 58, 204, 112);

  // ID label
  ctx.fillStyle = '#374151';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('EMU  3011', W / 2, 212);

  // vents grill
  ctx.fillStyle = '#2b3138';
  for (let r = 0; r < 4; r++) {
    for (let k = 0; k < 6; k++) {
      ctx.beginPath();
      ctx.roundRect(70 + k * 64, 262 + r * 34, 50, 16, 8);
      ctx.fill();
    }
  }
  ctx.fillStyle = '#4b5563';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('PLSS  •  PRIMARY LIFE SUPPORT', W / 2, 412);

  // lower panels: caution + red tag
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = i % 2 ? '#111827' : '#facc15';
    ctx.fillRect(44 + i * 18, 470, 18, 26);
  }
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('SOP  O2', 134, 540);
  ctx.fillStyle = '#c1121f';
  ctx.fillRect(296, 466, 170, 64);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('REMOVE', 381, 492);
  ctx.fillText('BEFORE EVA', 381, 516);
  ctx.textAlign = 'left';
  return toTexture(canvas);
}

/** Quilted knee pad */
function createKneePadTexture() {
  const S = 256;
  const { canvas, ctx } = createCanvas(S, S);
  ctx.fillStyle = '#cfd3d8';
  ctx.fillRect(0, 0, S, S);
  ctx.strokeStyle = '#9aa1aa';
  ctx.lineWidth = 4;
  for (let k = -S; k < S * 2; k += 40) {
    ctx.beginPath();
    ctx.moveTo(k, 0);
    ctx.lineTo(k + S, S);
    ctx.moveTo(k, S);
    ctx.lineTo(k + S, 0);
    ctx.stroke();
  }
  ctx.strokeStyle = '#7d848d';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, S - 12, S - 12);
  return toTexture(canvas);
}

/* ------------------------------------------------------------------ */
/* Builder                                                             */
/* ------------------------------------------------------------------ */

export function buildAstronaut() {
  const textures = [];
  const track = (t) => {
    textures.push(t);
    return t;
  };

  const fabricBump = track(createFabricBump());
  const flagTex = track(createFlagTexture());
  const patchTex = track(createMissionPatch());
  const dcmTex = track(createDCMTexture());
  const plssTex = track(createPLSSTexture());
  const kneeTex = track(createKneePadTexture());

  const M = {
    fabric: new THREE.MeshStandardMaterial({
      color: 0xf2f3f1, roughness: 0.9, metalness: 0, bumpMap: fabricBump, bumpScale: 0.35, envMapIntensity: 0.55,
    }),
    hard: new THREE.MeshPhysicalMaterial({
      color: 0xf5f6f7, roughness: 0.32, metalness: 0.02, clearcoat: 0.6, clearcoatRoughness: 0.25, envMapIntensity: 0.8,
    }),
    metal: new THREE.MeshStandardMaterial({ color: 0xbfc5cc, roughness: 0.26, metalness: 0.95, envMapIntensity: 1.2 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x3b4048, roughness: 0.4, metalness: 0.8 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x9aa0a8, roughness: 0.75 }),
    darkRubber: new THREE.MeshStandardMaterial({ color: 0x2a2e33, roughness: 0.85 }),
    boot: new THREE.MeshStandardMaterial({ color: 0xdadde1, roughness: 0.7, bumpMap: fabricBump, bumpScale: 0.25 }),
    glove: new THREE.MeshStandardMaterial({ color: 0xe1e4e7, roughness: 0.72, bumpMap: fabricBump, bumpScale: 0.25 }),
    palm: new THREE.MeshStandardMaterial({ color: 0x5f656d, roughness: 0.92 }),
    red: new THREE.MeshStandardMaterial({ color: 0xc1121f, roughness: 0.6, bumpMap: fabricBump, bumpScale: 0.3 }),
    blue: new THREE.MeshStandardMaterial({ color: 0x1f5fbf, roughness: 0.4, metalness: 0.3 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xf28c28, roughness: 0.45 }),
    hose: new THREE.MeshStandardMaterial({ color: 0xe3e6e9, roughness: 0.5 }),
    gold: new THREE.MeshPhysicalMaterial({
      color: 0xffc04d, metalness: 1, roughness: 0.07, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.9,
    }),
    lens: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff1c1, emissiveIntensity: 1.6 }),
    camLens: new THREE.MeshStandardMaterial({ color: 0x0b0f14, metalness: 0.6, roughness: 0.08 }),
    flag: new THREE.MeshStandardMaterial({ map: flagTex, roughness: 0.75 }),
    patch: new THREE.MeshStandardMaterial({ map: patchTex, roughness: 0.7, transparent: true, alphaTest: 0.5 }),
    dcm: new THREE.MeshStandardMaterial({ map: dcmTex, roughness: 0.5 }),
    plss: new THREE.MeshStandardMaterial({ map: plssTex, roughness: 0.45 }),
    knee: new THREE.MeshStandardMaterial({ map: kneeTex, roughness: 0.8, bumpMap: kneeTex, bumpScale: 0.6 }),
  };

  const add = (parent, geo, mat, { p, r, s } = {}) => {
    const m = new THREE.Mesh(geo, mat);
    if (p) m.position.set(p[0], p[1], p[2]);
    if (r) m.rotation.set(r[0], r[1], r[2]);
    if (s) m.scale.set(s[0], s[1], s[2]);
    parent.add(m);
    return m;
  };
  const group = (parent, p = [0, 0, 0]) => {
    const g = new THREE.Group();
    g.position.set(p[0], p[1], p[2]);
    parent.add(g);
    return g;
  };
  /** Torus ring lying in the XZ plane (wraps around the Y axis) */
  const ring = (radius, tube, sx = 1, sz = 1) => {
    const g = new THREE.TorusGeometry(radius, tube, 12, 48);
    g.rotateX(Math.PI / 2);
    g.scale(sx, 1, sz);
    return g;
  };
  const band = (radius, h) => new THREE.CylinderGeometry(radius, radius, h, 40, 1, true);
  const capsule = (r, len) => new THREE.CapsuleGeometry(r, len, 10, 28);
  const rbox = (w, h, d, rad = 0.02, seg = 3) => new RoundedBoxGeometry(w, h, d, seg, rad);
  const lathe = (pts, sx, sz) => {
    const curve = new THREE.SplineCurve(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    const g = new THREE.LatheGeometry(curve.getPoints(48), 64);
    g.scale(sx, 1, sz);
    return g;
  };
  const cylAlong = (axis, r1, r2, h, seg = 24) => {
    const g = new THREE.CylinderGeometry(r1, r2, h, seg);
    if (axis === 'x') g.rotateZ(Math.PI / 2);
    if (axis === 'z') g.rotateX(Math.PI / 2);
    return g;
  };

  const root = new THREE.Group();
  root.name = 'EMU_Astronaut';
  const pelvis = group(root);
  const torso = group(pelvis);

  /* ---------------- LOWER TORSO (brief) ---------------- */
  add(pelvis, lathe([[0.001, -0.3], [0.16, -0.296], [0.226, -0.24], [0.246, -0.12], [0.236, 0.0], [0.2, 0.05], [0.001, 0.05]], 1.12, 0.85), M.fabric);
  add(pelvis, ring(0.214, 0.022, 1.13, 0.84), M.metal, { p: [0, 0.0, 0] }); // waist bearing
  add(pelvis, ring(0.224, 0.012, 1.13, 0.84), M.blue, { p: [0, -0.03, 0] });
  // waist tether rings
  [1, -1].forEach((s) => {
    add(pelvis, new THREE.TorusGeometry(0.022, 0.006, 8, 20), M.metal, { p: [s * 0.2, -0.06, 0.15], r: [0, s * 0.6, 0] });
  });

  /* ---------------- HARD UPPER TORSO ---------------- */
  add(torso, lathe([[0.001, -0.02], [0.2, -0.02], [0.236, 0.06], [0.27, 0.2], [0.3, 0.38], [0.312, 0.48], [0.29, 0.57], [0.23, 0.635], [0.16, 0.665], [0.001, 0.67]], 1.12, 0.8), M.fabric);
  // neck ring + collar
  add(torso, ring(0.17, 0.022), M.fabric, { p: [0, 0.645, 0] });
  add(torso, ring(0.152, 0.026), M.metal, { p: [0, 0.668, 0] });
  add(torso, ring(0.152, 0.008), M.orange, { p: [0, 0.69, 0] });

  // Display & Control Module (chest unit)
  const dcm = group(torso, [0, 0.34, 0.272]);
  dcm.rotation.x = -0.14;
  add(dcm, rbox(0.28, 0.13, 0.09, 0.015), M.hard);
  add(dcm, new THREE.PlaneGeometry(0.25, 0.1), M.dcm, { p: [0, 0, 0.0465] });
  add(dcm, cylAlong('y', 0.026, 0.026, 0.026), M.darkMetal, { p: [0.075, 0.075, 0.005] }); // flow knob
  add(dcm, cylAlong('y', 0.02, 0.02, 0.01), M.metal, { p: [0.075, 0.09, 0.005] });
  add(dcm, cylAlong('y', 0.012, 0.012, 0.022), M.blue, { p: [-0.02, 0.074, 0.015] });
  add(dcm, cylAlong('y', 0.012, 0.012, 0.022), M.orange, { p: [-0.065, 0.074, 0.015] });
  add(dcm, cylAlong('y', 0.009, 0.009, 0.03), M.darkMetal, { p: [0.015, 0.078, 0.015] });
  add(dcm, cylAlong('x', 0.02, 0.02, 0.035), M.red, { p: [0.155, 0, 0] }); // purge valve
  add(dcm, cylAlong('x', 0.022, 0.022, 0.03), M.blue, { p: [-0.152, 0.01, 0] }); // connector
  // DCM mounting brackets
  [1, -1].forEach((s) => add(dcm, rbox(0.03, 0.18, 0.02, 0.008), M.darkMetal, { p: [s * 0.11, -0.01, -0.035] }));

  // Umbilical hoses from DCM to PLSS
  const hoseCurve = (s) =>
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(s * 0.16, 0.335, 0.27),
      new THREE.Vector3(s * 0.26, 0.24, 0.25),
      new THREE.Vector3(s * 0.33, 0.1, 0.13),
      new THREE.Vector3(s * 0.32, 0.05, -0.1),
      new THREE.Vector3(s * 0.27, 0.1, -0.25),
    ]);
  [1, -1].forEach((s) => {
    const curve = hoseCurve(s);
    add(torso, new THREE.TubeGeometry(curve, 48, 0.016, 10), s > 0 ? M.hose : M.rubber);
    const start = curve.getPointAt(0.02);
    const tangent = curve.getTangentAt(0.02);
    const conn = add(torso, cylAlong('y', 0.024, 0.024, 0.035), s > 0 ? M.blue : M.red, { p: [start.x, start.y, start.z] });
    conn.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
    // hose clamp rings
    [0.35, 0.7].forEach((t) => {
      const pt = curve.getPointAt(t);
      const c = add(torso, cylAlong('y', 0.02, 0.02, 0.012), M.metal, { p: [pt.x, pt.y, pt.z] });
      c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangentAt(t));
    });
  });

  /* ---------------- PLSS BACKPACK ---------------- */
  const plss = group(torso, [0, 0.36, -0.345]);
  add(plss, rbox(0.52, 0.6, 0.22, 0.045, 4), M.hard);
  add(plss, new THREE.PlaneGeometry(0.42, 0.5), M.plss, { p: [0, 0, -0.1115], r: [0, Math.PI, 0] });
  add(plss, rbox(0.44, 0.07, 0.18, 0.03), M.hard, { p: [0, 0.32, 0.01] }); // top hump
  add(plss, rbox(0.5, 0.17, 0.2, 0.04), M.hard, { p: [0, -0.39, 0.01] }); // SOP (secondary O2)
  for (let k = 0; k < 5; k++) add(plss, rbox(0.06, 0.014, 0.01, 0.004, 2), M.darkRubber, { p: [-0.16 + k * 0.08, -0.39, -0.091] });
  [1, -1].forEach((s) => {
    add(plss, cylAlong('y', 0.013, 0.013, 0.5), M.metal, { p: [s * 0.282, 0, -0.03] }); // side rails
    [-0.2, 0.2].forEach((y) => add(plss, rbox(0.03, 0.025, 0.025, 0.006, 2), M.darkMetal, { p: [s * 0.268, y, -0.03] }));
    add(plss, cylAlong('x', 0.02, 0.02, 0.025), s > 0 ? M.blue : M.red, { p: [s * 0.27, -0.12, 0.03] }); // side ports
    add(plss, cylAlong('x', 0.014, 0.014, 0.02), M.darkMetal, { p: [s * 0.27, -0.06, 0.03] });
  });
  add(plss, cylAlong('y', 0.006, 0.006, 0.14), M.darkMetal, { p: [0.19, 0.42, 0.02] }); // antenna
  add(plss, new THREE.SphereGeometry(0.012, 12, 12), M.red, { p: [0.19, 0.495, 0.02] });
  // PLSS lights on top corners
  [1, -1].forEach((s) => {
    add(plss, cylAlong('z', 0.02, 0.02, 0.03), M.darkMetal, { p: [s * 0.2, 0.33, -0.08] });
    add(plss, new THREE.CircleGeometry(0.014, 16), M.lens, { p: [s * 0.2, 0.33, -0.096], r: [0, Math.PI, 0] });
  });

  /* ---------------- HEAD / HELMET (EMU + EVVA) ---------------- */
  const head = group(torso, [0, 0.668, 0]);
  const helmet = group(head, [0, 0.18, 0]);
  add(helmet, new THREE.SphereGeometry(0.205, 64, 48), M.hard); // EVVA shell
  // gold sun visor (front sphere segment)
  add(helmet, new THREE.SphereGeometry(0.209, 64, 32, Math.PI / 2 - 0.95, 1.9, 0.62, 1.2), M.gold);
  // visor hood / brow
  add(helmet, new THREE.SphereGeometry(0.214, 64, 12, Math.PI / 2 - 1.1, 2.2, 0.36, 0.33), M.hard);
  // visor side pivots & rails
  [1, -1].forEach((s) => {
    add(helmet, cylAlong('x', 0.03, 0.03, 0.02), M.hard, { p: [s * 0.205, 0.0, 0.03] });
    add(helmet, cylAlong('x', 0.016, 0.016, 0.026), M.darkMetal, { p: [s * 0.208, 0.0, 0.03] });
  });
  // lower helmet lip ring
  add(helmet, ring(0.17, 0.014), M.hard, { p: [0, -0.115, 0] });
  // EHIP helmet lights + cameras on both sides
  [1, -1].forEach((s) => {
    const ehip = group(helmet, [s * 0.2, 0.08, 0.02]);
    add(ehip, rbox(0.035, 0.04, 0.17, 0.01, 2), M.hard);
    add(ehip, cylAlong('z', 0.03, 0.032, 0.075), M.hard, { p: [s * 0.03, 0.022, 0.06] });
    add(ehip, new THREE.CircleGeometry(0.025, 24), M.lens, { p: [s * 0.03, 0.022, 0.0985] });
    add(ehip, ring(0.026, 0.004), M.darkMetal, { p: [s * 0.03, 0.022, 0.098], r: [Math.PI / 2, 0, 0] });
    add(ehip, cylAlong('z', 0.019, 0.019, 0.065), M.darkMetal, { p: [s * 0.03, -0.028, 0.065] });
    add(ehip, new THREE.CircleGeometry(0.012, 20), M.camLens, { p: [s * 0.03, -0.028, 0.098] });
    add(ehip, rbox(0.02, 0.05, 0.03, 0.006, 2), M.darkMetal, { p: [s * 0.012, 0, -0.07] }); // bracket
  });
  add(helmet, cylAlong('y', 0.022, 0.026, 0.02), M.hard, { p: [0, 0.205, -0.01] }); // top nub

  /* ---------------- ARMS ---------------- */
  const joints = { root, pelvis, torso, head };
  [1, -1].forEach((s) => {
    const side = s > 0 ? 'L' : 'R';
    // torso-fixed shoulder bearing
    add(torso, cylAlong('x', 0.112, 0.112, 0.1), M.fabric, { p: [s * 0.35, 0.5, 0] });
    add(torso, ring(0.112, 0.013), M.metal, { p: [s * 0.385, 0.5, 0], r: [0, 0, Math.PI / 2] });

    const shoulder = group(torso, [s * 0.405, 0.5, 0]);
    add(shoulder, new THREE.SphereGeometry(0.108, 32, 24), M.fabric);
    add(shoulder, capsule(0.096, 0.2), M.fabric, { p: [0, -0.17, 0] });
    add(shoulder, ring(0.095, 0.012), M.fabric, { p: [0, -0.14, 0] });
    add(shoulder, ring(0.094, 0.012), M.fabric, { p: [0, -0.27, 0] });
    add(shoulder, band(0.1, 0.045), M.red, { p: [0, -0.205, 0] });
    if (s > 0) {
      // US flag on left shoulder (canton facing forward)
      add(shoulder, new THREE.CylinderGeometry(0.101, 0.101, 0.072, 24, 1, true, Math.PI / 2 - 0.62, 1.24), M.flag, { p: [0, -0.075, 0] });
    } else {
      // EVA mission patch on right shoulder
      add(shoulder, new THREE.CylinderGeometry(0.101, 0.101, 0.1, 24, 1, true, -Math.PI / 2 - 0.5, 1.0), M.patch, { p: [0, -0.08, 0] });
    }

    const elbow = group(shoulder, [0, -0.34, 0]);
    add(elbow, new THREE.SphereGeometry(0.088, 24, 18), M.fabric);
    [0.03, 0.0, -0.03].forEach((y) => add(elbow, ring(0.087, 0.014), M.fabric, { p: [0, y, 0] }));
    add(elbow, capsule(0.085, 0.16), M.fabric, { p: [0, -0.15, 0] });
    add(elbow, ring(0.084, 0.011), M.fabric, { p: [0, -0.11, 0] });
    if (s > 0) {
      // cuff checklist on left wrist
      add(elbow, rbox(0.075, 0.085, 0.02, 0.006, 2), M.hard, { p: [0, -0.205, 0.09] });
      for (let k = 0; k < 4; k++) add(elbow, cylAlong('x', 0.004, 0.004, 0.06), M.darkMetal, { p: [0, -0.17 - k * 0.022, 0.1] });
    } else {
      // wrist mirror on right forearm
      add(elbow, cylAlong('z', 0.03, 0.03, 0.01), M.darkMetal, { p: [0, -0.2, 0.09] });
      add(elbow, new THREE.CircleGeometry(0.026, 24), M.metal, { p: [0, -0.2, 0.0955] });
    }

    const wrist = group(elbow, [0, -0.29, 0]);
    add(wrist, cylAlong('y', 0.09, 0.09, 0.035, 32), M.metal);
    add(wrist, ring(0.091, 0.006), s > 0 ? M.blue : M.red, { p: [0, -0.018, 0] });
    add(wrist, cylAlong('y', 0.083, 0.072, 0.07, 32), M.glove, { p: [0, -0.055, 0] });

    const hand = group(wrist, [0, -0.09, 0]);
    add(hand, rbox(0.058, 0.1, 0.095, 0.022), M.glove, { p: [0, -0.05, 0] });
    add(hand, rbox(0.012, 0.08, 0.08, 0.005, 2), M.palm, { p: [-s * 0.028, -0.05, 0] });
    add(hand, rbox(0.062, 0.025, 0.1, 0.01, 2), M.rubber, { p: [0, -0.095, 0] }); // knuckle bar
    for (let k = 0; k < 4; k++) {
      const f1 = group(hand, [0, -0.1, -0.036 + k * 0.024]);
      f1.rotation.z = -s * 0.45;
      add(f1, capsule(0.0135, 0.04), M.glove, { p: [0, -0.028, 0] });
      const f2 = group(f1, [0, -0.055, 0]);
      f2.rotation.z = -s * 0.55;
      add(f2, capsule(0.0125, 0.024), M.glove, { p: [0, -0.02, 0] });
      add(f2, new THREE.SphereGeometry(0.0128, 12, 10), M.palm, { p: [0, -0.034, 0] });
    }
    const thumb = group(hand, [-s * 0.012, -0.045, 0.05]);
    thumb.rotation.set(-0.5, 0, -s * 0.5);
    add(thumb, capsule(0.015, 0.04), M.glove, { p: [0, -0.03, 0] });
    add(thumb, new THREE.SphereGeometry(0.0145, 12, 10), M.palm, { p: [0, -0.055, 0] });

    joints[`shoulder${side}`] = shoulder;
    joints[`elbow${side}`] = elbow;
    joints[`wrist${side}`] = wrist;
    joints[`hand${side}`] = hand;
    joints[`thumb${side}`] = thumb;
  });

  /* ---------------- LEGS ---------------- */
  [1, -1].forEach((s) => {
    const side = s > 0 ? 'L' : 'R';
    const hip = group(pelvis, [s * 0.125, -0.15, 0]);
    add(hip, ring(0.125, 0.017), M.metal, { p: [0, -0.02, 0] });
    add(hip, capsule(0.125, 0.24), M.fabric, { p: [0, -0.2, 0] });
    add(hip, band(0.129, 0.05), M.red, { p: [0, -0.12, 0] });
    add(hip, ring(0.124, 0.014), M.fabric, { p: [0, -0.24, 0] });
    add(hip, ring(0.123, 0.014), M.fabric, { p: [0, -0.33, 0] });

    const knee = group(hip, [0, -0.44, 0]);
    add(knee, new THREE.SphereGeometry(0.112, 24, 18), M.fabric);
    [0.035, 0.0, -0.035].forEach((y) => add(knee, ring(0.111, 0.016), M.fabric, { p: [0, y, 0] }));
    add(knee, rbox(0.17, 0.17, 0.05, 0.022), M.knee, { p: [0, -0.01, 0.098], r: [-0.08, 0, 0] });
    add(knee, capsule(0.105, 0.22), M.fabric, { p: [0, -0.19, 0] });
    add(knee, band(0.109, 0.045), M.red, { p: [0, -0.09, 0] });
    add(knee, ring(0.104, 0.012), M.fabric, { p: [0, -0.2, 0] });

    const ankle = group(knee, [0, -0.37, 0]);
    add(ankle, ring(0.1, 0.015), M.metal);
    add(ankle, cylAlong('y', 0.105, 0.112, 0.11, 32), M.boot, { p: [0, -0.04, 0] });
    add(ankle, band(0.114, 0.02), M.darkRubber, { p: [0, -0.03, 0] });
    add(ankle, rbox(0.03, 0.03, 0.012, 0.005, 2), M.metal, { p: [s * 0.06, -0.03, 0.095], r: [0, s * 0.55, 0] });
    add(ankle, rbox(0.15, 0.1, 0.28, 0.04, 4), M.boot, { p: [0, -0.1, 0.045] });
    add(ankle, rbox(0.154, 0.07, 0.08, 0.03), M.rubber, { p: [0, -0.115, 0.16] }); // toe cap
    add(ankle, rbox(0.155, 0.02, 0.045, 0.008, 2), M.darkRubber, { p: [0, -0.06, 0.07], r: [0.35, 0, 0] }); // instep strap
    add(ankle, rbox(0.164, 0.035, 0.3, 0.015), M.darkRubber, { p: [0, -0.152, 0.045] }); // sole
    add(ankle, rbox(0.14, 0.05, 0.06, 0.015), M.rubber, { p: [0, -0.12, -0.075] }); // heel counter

    joints[`hip${side}`] = hip;
    joints[`knee${side}`] = knee;
    joints[`ankle${side}`] = ankle;
  });

  const dispose = () => {
    root.traverse((obj) => {
      if (obj.isMesh) obj.geometry.dispose();
    });
    Object.values(M).forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  };

  return { group: root, joints, dispose };
}
