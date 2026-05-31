import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public');
const OUT = path.join(ROOT, 'optimized');

const GROUPS = [
  {
    label: 'hero & details backgrounds',
    maxWidth: 3200,
    quality: 94,
    files: ['one_year/DSC04487.webp', 'one_year/DSC04510.webp'],
  },
  {
    label: 'timeline',
    maxWidth: 1600,
    quality: 88,
    files: [
      '0.webp', '1.webp', '2.webp', '3.webp', '4.webp', '5.webp',
      '6.webp', '7.webp', '8.webp', '9.webp', '10.webp', '11.webp',
      'one_year/DSC04494.webp',
    ],
  },
  {
    label: 'gallery',
    maxWidth: 1400,
    quality: 88,
    files: ['hello-zoe.webp', 'smile.webp', 'playing.webp', '9.webp'],
  },
];

const ONE_YEAR_GALLERY = { maxWidth: 4000, quality: 94 };

const ONE_YEAR_DIR = path.join(ROOT, 'one_year');
const oneYearFiles = (await fs.readdir(ONE_YEAR_DIR))
  .filter((f) => /\.(jpe?g|webp)$/i.test(f))
  .sort()
  .map((f) => `one_year/${f}`);

function optimizedRelativePath(relativePath) {
  const dir = path.dirname(relativePath);
  const base = path.basename(relativePath, path.extname(relativePath));
  return path.join(dir, `${base}.webp`);
}

async function optimize(relativePath, maxWidth, quality, { highFidelity = false } = {}) {
  const inputPath = path.join(ROOT, relativePath);
  const outputPath = path.join(OUT, optimizedRelativePath(relativePath));

  try {
    await fs.access(inputPath);
  } catch {
    console.warn(`skip (missing): ${relativePath}`);
    return;
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const before = (await fs.stat(inputPath)).size;

  let pipeline = sharp(inputPath).rotate();
  const meta = await pipeline.metadata();

  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline
    .webp({
      quality,
      effort: highFidelity ? 4 : 6,
      smartSubsample: !highFidelity,
    })
    .toFile(outputPath);

  const after = (await fs.stat(outputPath)).size;
  console.log(
    `${relativePath}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`,
  );
}

for (const group of GROUPS) {
  console.log(`\n${group.label}`);
  for (const file of group.files) {
    await optimize(file, group.maxWidth, group.quality);
  }
}

console.log('\none year full gallery');
for (const file of oneYearFiles) {
  await optimize(file, ONE_YEAR_GALLERY.maxWidth, ONE_YEAR_GALLERY.quality, {
    highFidelity: true,
  });
}

console.log('\nDone. Optimized files written to public/optimized/');
