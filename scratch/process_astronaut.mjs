import sharp from 'sharp';

async function processAstronaut() {
  const inputPath = 'c:/Users/NV/portfolio/public/images/astronaut.jpg';
  const outputPath = 'c:/Users/NV/portfolio/public/images/astronaut.png';

  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // channels should be 4 (RGBA)
  const visited = new Uint8Array(width * height);
  const queue = [];

  const getIdx = (x, y) => (y * width + x) * channels;
  const isDark = (x, y) => {
    const idx = getIdx(x, y);
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Threshold for black space background
    return (r < 25 && g < 25 && b < 25);
  };

  // Seed with border pixels
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    queue.push([x, height - 1]);
    visited[x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    queue.push([width - 1, y]);
    visited[y * width + 0] = 1;
    visited[y * width + (width - 1)] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const idx = getIdx(cx, cy);

    if (isDark(cx, cy)) {
      data[idx + 3] = 0; // Make transparent

      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const vIdx = ny * width + nx;
          if (!visited[vIdx]) {
            visited[vIdx] = 1;
            if (isDark(nx, ny)) {
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
  }

  // Feather edges: any pixel next to a transparent pixel that is very dark gets smooth alpha
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = getIdx(x, y);
      if (data[idx + 3] > 0) {
        // Check if any neighbor is 0 alpha
        const hasTransparentNeighbor =
          data[getIdx(x + 1, y) + 3] === 0 ||
          data[getIdx(x - 1, y) + 3] === 0 ||
          data[getIdx(x, y + 1) + 3] === 0 ||
          data[getIdx(x, y - 1) + 3] === 0;

        if (hasTransparentNeighbor) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const brightness = Math.max(r, g, b);
          if (brightness < 60) {
            data[idx + 3] = Math.round((brightness / 60) * 255);
          }
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Saved transparent astronaut PNG to ${outputPath} (${width}x${height})`);
}

processAstronaut().catch(console.error);
