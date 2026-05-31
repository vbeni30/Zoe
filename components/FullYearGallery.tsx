'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ONE_YEAR_GALLERY_SOURCES,
  oneYearGalleryImageSrc,
  type OneYearSource,
} from '@/lib/one-year-gallery';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type FullYearGalleryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FullYearGallery({ open, onOpenChange }: FullYearGalleryProps) {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i - 1 + ONE_YEAR_GALLERY_SOURCES.length) % ONE_YEAR_GALLERY_SOURCES.length;
    });
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + 1) % ONE_YEAR_GALLERY_SOURCES.length;
    });
  }, []);

  useEffect(() => {
    if (!open) setLightboxIndex(null);
  }, [open]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const lightboxSrc =
    lightboxIndex !== null
      ? oneYearGalleryImageSrc(ONE_YEAR_GALLERY_SOURCES[lightboxIndex])
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(92vh,900px)] w-[min(96vw,1100px)] flex-col gap-0 overflow-hidden border-slate-200 bg-slate-50 p-0 sm:max-w-[1100px]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <DialogTitle className="font-serif text-xl text-slate-800 sm:text-2xl">
              {t.fullGalleryTitle}
            </DialogTitle>
            <DialogDescription className="mt-1 font-sans text-sm text-slate-500">
              {t.fullGallerySubtitle}
            </DialogDescription>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {ONE_YEAR_GALLERY_SOURCES.map((source, index) => (
              <GalleryThumb
                key={source}
                source={source}
                index={index}
                onSelect={() => setLightboxIndex(index)}
              />
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {lightboxSrc !== null && lightboxIndex !== null && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.fullGalleryTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
              onClick={closeLightbox}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={t.closeGallery}
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-4"
                aria-label={t.galleryPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-4"
                aria-label={t.galleryNext}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <motion.div
                key={lightboxSrc}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[85vh] w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* unoptimized: serve high-quality static WebP without Next re-compression */}
                <Image
                  src={lightboxSrc}
                  alt=""
                  width={4000}
                  height={3000}
                  unoptimized
                  className="mx-auto h-auto max-h-[85vh] w-auto max-w-full rounded-lg object-contain"
                  priority
                />
                <p className="mt-3 text-center font-sans text-xs text-white/60">
                  {lightboxIndex + 1} / {ONE_YEAR_GALLERY_SOURCES.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function GalleryThumb({
  source,
  index,
  onSelect,
}: {
  source: OneYearSource;
  index: number;
  onSelect: () => void;
}) {
  const src = oneYearGalleryImageSrc(source);

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-md ring-1 ring-slate-200/80 transition-all hover:ring-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
      >
        <Image
          src={src}
          alt=""
          fill
          quality={90}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
          loading={index < 6 ? 'eager' : 'lazy'}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
    </li>
  );
}
