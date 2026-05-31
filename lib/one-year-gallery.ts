/** Source files in `public/one_year/` (sorted by filename). */
export const ONE_YEAR_GALLERY_SOURCES = [
  'DSC04342.JPG',
  'DSC04368.JPG',
  'DSC04386.JPG',
  'DSC04392.JPG',
  'DSC04421.JPG',
  'DSC04428.JPG',
  'DSC04443.JPG',
  'DSC04459.JPG',
  'DSC04475.JPG',
  'DSC04479.JPG',
  'DSC04487.webp',
  'DSC04494.webp',
  'DSC04510.webp',
  'DSC04525.JPG',
  'DSC04692.JPG',
] as const;

export type OneYearSource = (typeof ONE_YEAR_GALLERY_SOURCES)[number];

function stem(filename: string): string {
  return filename.replace(/\.[^.]+$/, '');
}

/** Optimized WebP in `public/optimized/one_year/`. */
export function oneYearGalleryImageSrc(source: OneYearSource): string {
  return `/optimized/one_year/${stem(source)}.webp`;
}
