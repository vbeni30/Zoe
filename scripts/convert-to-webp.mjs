import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public');

const FILES = [
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  'one_year/DSC04487.JPG',
  'one_year/DSC04494.JPG',
  'one_year/DSC04510.JPG',
];

async function convert(relativePath) {
  const inputPath = path.join(ROOT, relativePath);
  const parsed = path.parse(relativePath);
  const outputRelative = path.join(parsed.dir, `${parsed.name}.webp`).replace(/\\/g, '/');
  const outputPath = path.join(ROOT, outputRelative);

  await sharp(inputPath)
    .webp({ quality: 85, effort: 4 })
    .toFile(outputPath);

  const inputStat = await fs.stat(inputPath);
  const outputStat = await fs.stat(outputPath);

  console.log(
    `${relativePath} -> ${outputRelative} (${Math.round(inputStat.size / 1024)}KB -> ${Math.round(outputStat.size / 1024)}KB)`,
  );

  return outputRelative;
}

for (const file of FILES) {
  await convert(file);
}

console.log('Done.');
