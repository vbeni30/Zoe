'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useMotionValue
} from 'framer-motion';
import { 
  Calendar, Clock, MapPin, Shirt, Heart, Sparkles, ChevronDown, 
  Send, User, Mail, Minus, Plus, Loader2, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import SectionWithPattern from '@/components/SectionWithPattern';
import SectionHeading from '@/components/SectionHeading';
import ContentWrap from '@/components/ContentWrap';
import FirstYearStickyScroll from '@/components/FirstYearStickyScroll';
import FullYearGallery from '@/components/FullYearGallery';
import type { translations } from '@/lib/translations';

type TranslationStrings = (typeof translations)['en'];

function getTimelineTitle(index: number, t: TranslationStrings): string {
  if (index === 12) return t.celebratingOneYear;
  if (index === 0) return t.month1;
  const monthKey = `month${index}` as keyof TranslationStrings;
  if (monthKey in t && typeof t[monthKey] === 'string') {
    return t[monthKey] as string;
  }
  return t.month12;
}

const OPTIMIZED = '/optimized';

const GALLERY_BENTO_IMAGES = [
  `${OPTIMIZED}/hello-zoe.webp`,
  `${OPTIMIZED}/smile.webp`,
  `${OPTIMIZED}/playing.webp`,
  `${OPTIMIZED}/9.webp`,
  '/IMG_1031.webp',
] as const;

const MONTH_TIMELINE_IMAGES = [
  `${OPTIMIZED}/0.webp`, `${OPTIMIZED}/1.webp`, `${OPTIMIZED}/2.webp`, `${OPTIMIZED}/3.webp`,
  `${OPTIMIZED}/4.webp`, `${OPTIMIZED}/5.webp`, `${OPTIMIZED}/6.webp`, `${OPTIMIZED}/7.webp`,
  `${OPTIMIZED}/8.webp`, `${OPTIMIZED}/9.webp`, `${OPTIMIZED}/10.webp`, `${OPTIMIZED}/11.webp`,
  `${OPTIMIZED}/one_year/DSC04494.webp`,
];

const luxurySpring = { damping: 32, stiffness: 90, mass: 0.6 };

const DETAILS_BG_IMAGE = `${OPTIMIZED}/one_year/DSC04510.webp`;
const HERO_BG_IMAGE = `${OPTIMIZED}/one_year/DSC04487.webp`;

function InvitationDetailsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-280, 280]);

  const detailCardClass =
    'group relative mx-auto flex w-full max-w-[240px] flex-col items-center overflow-hidden rounded-2xl border border-white/30 bg-white/12 p-3.5 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 sm:max-w-none sm:rounded-3xl sm:p-5 md:p-6 lg:p-8';

  const detailIconClass =
    'relative z-10 mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-pink-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110 sm:mb-4 sm:h-12 sm:w-12 md:mb-5 md:h-14 md:w-14 lg:mb-6 lg:h-16 lg:w-16';

  const detailLabelClass =
    'relative z-10 mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-white/55 sm:mb-1.5 sm:text-[10px] sm:tracking-[0.18em] md:text-xs md:tracking-[0.22em]';

  const detailValueClass =
    'relative z-10 font-serif text-sm leading-snug text-balance text-white drop-shadow-sm sm:text-base md:text-lg lg:text-2xl';

  return (
    <section
      ref={sectionRef}
      id="invitation-details"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-[30%] left-0 h-[160%] w-full will-change-transform"
          style={{ y: bgY }}
        >
          <Image
            src={DETAILS_BG_IMAGE}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="object-cover object-[32%_center] sm:object-center"
          />
        </motion.div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-pink-500/40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/25 to-black/45"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <SectionHeading eyebrow={t.theDetails} title={t.youAreInvited} variant="light" />

        <div className="mt-6 grid grid-cols-1 gap-3 min-[520px]:mt-8 min-[520px]:grid-cols-2 min-[520px]:gap-4 min-[520px]:max-w-none sm:mt-12 sm:gap-5 lg:mt-14 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          <motion.div whileHover={{ y: -4 }} className={detailCardClass}>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-white/5 to-transparent" aria-hidden />
            <div className={detailIconClass}>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
            </div>
            <h3 className={detailLabelClass}>{t.date}</h3>
            <p className={detailValueClass}>{t.eventDate}</p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className={detailCardClass}>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-white/5 to-transparent" aria-hidden />
            <div className={detailIconClass}>
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
            </div>
            <h3 className={detailLabelClass}>{t.time}</h3>
            <p className={detailValueClass}>{t.eventTime}</p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className={detailCardClass}>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-white/5 to-transparent" aria-hidden />
            <div className={detailIconClass}>
              <Shirt className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
            </div>
            <h3 className={detailLabelClass}>{t.dressCode}</h3>
            <p className={detailValueClass}>{t.dressCodeValue}</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className={`${detailCardClass} min-[520px]:col-span-2 xl:col-span-1 xl:max-w-none`}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/20 via-white/5 to-transparent" aria-hidden />
            <div className={detailIconClass}>
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
            </div>
            <h3 className={detailLabelClass}>{t.location}</h3>
            <p className={`${detailValueClass} mb-1`}>{t.eventLocationVenue}</p>
            <p className="relative z-10 mb-2 font-serif text-sm leading-snug text-white/85 sm:text-base">
              {t.eventLocationAddress}
            </p>
            <p className="relative z-10 mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-100/90 sm:text-[11px]">
              {t.eventFood}
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Parc+Montsouris,+2+rue+Gazan,+75014+Paris"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-9 items-center gap-2 px-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-pink-100 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-pink-100 after:transition-transform after:duration-300 hover:text-white hover:after:origin-left hover:after:scale-x-100 sm:min-h-11 sm:text-[10px] sm:tracking-[0.16em] md:text-[11px] md:tracking-widest"
            >
              {t.viewMap}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function GalleryMosaicCard({
  img,
  span,
  parallax,
  tag,
  index,
  scrollYProgress,
}: {
  img: string;
  span: string;
  parallax: number;
  tag: string;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax * 120]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-full min-h-[280px] w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ${span} shadow-xl`}
    >
      <div className="absolute inset-0 bg-slate-100/50" />
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[8%] h-[116%]"
      >
        <Image
          src={img}
          alt={`Zoe moment ${index + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={80}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-6 left-6 right-6">
        <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          {tag}
        </span>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   SECTION 5: ENHANCED RSVP SECTION 
   ========================================================================= */
function RSVPSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', guests: '1', attending: 'yes' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Advanced 3D Hover Effect Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, luxurySpring);
  const mouseYSpring = useSpring(y, luxurySpring);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (delta: number) => {
    setFormData((prev) => {
      const current = parseInt(prev.guests, 10);
      const next = Math.max(1, Math.min(5, current + delta));
      return { ...prev, guests: next.toString() };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? t.submitError);
      }

      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', guests: '1', attending: 'yes' });
        setSubmitted(false);
      }, 6000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 20 } }
  };

  return (
    <SectionWithPattern id="rsvp" pattern="dots" className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/50 to-pink-100/30 py-24 sm:py-32 lg:py-40 perspective-[2000px]">
      
      {/* Dynamic Ambient Background Orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-60 mix-blend-multiply blur-[120px] z-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360], borderRadius: ["50%", "40%", "50%"] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-pink-200 to-transparent mix-blend-multiply"
        />
        <motion.div 
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0], borderRadius: ["40%", "50%", "40%"] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[450px] h-[450px] bg-gradient-to-tl from-rose-200 to-transparent mix-blend-multiply translate-x-32"
        />
      </div>

      <ContentWrap className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16 px-1 text-center sm:mb-20">
            <SectionHeading eyebrow={t.rsvpHeader} title={t.rsvpTitle} />
            <p className="mx-auto mt-6 max-w-xl font-serif text-base italic text-slate-500 sm:text-lg md:text-xl">
              {t.rsvpSubtitle}
            </p>
          </div>

          {/* 3D Wrapper */}
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-3xl mx-auto"
          >
            {/* The Glassmorphism Card */}
            <div 
              style={{ transform: "translateZ(40px)" }}
              className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/80 bg-white/40 p-8 sm:p-12 md:p-16 shadow-[0_40px_100px_-20px_rgba(244,114,182,0.25)] ring-1 ring-pink-100/50 backdrop-blur-3xl transition-shadow duration-500 hover:shadow-[0_50px_120px_-20px_rgba(244,114,182,0.35)]"
            >
              {/* Inner card light sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/10 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="rsvp-form"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    onSubmit={handleSubmit}
                    className="space-y-8 sm:space-y-12 relative z-10"
                  >
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      {/* Name Input */}
                      <motion.div variants={itemVariants} className="space-y-3">
                        <label className="flex items-center gap-2 pl-2 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                          {t.yourName}
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-5 flex items-center text-slate-300 transition-colors duration-500 group-focus-within:text-pink-500 z-10">
                            <User className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-300 to-rose-300 opacity-0 blur-md transition-opacity duration-500 group-focus-within:opacity-30" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="relative w-full rounded-3xl border border-white/50 bg-white/50 pl-14 pr-6 py-4.5 font-serif text-base text-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] placeholder-slate-300 backdrop-blur-md transition-all duration-300 hover:bg-white/70 focus:border-pink-300 focus:bg-white focus:outline-none"
                            placeholder={t.namePlaceholder}
                          />
                        </div>
                      </motion.div>

                      {/* Email Input */}
                      <motion.div variants={itemVariants} className="space-y-3">
                        <label className="flex items-center gap-2 pl-2 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                          {t.emailAddress}
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-5 flex items-center text-slate-300 transition-colors duration-500 group-focus-within:text-pink-500 z-10">
                            <Mail className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-300 to-rose-300 opacity-0 blur-md transition-opacity duration-500 group-focus-within:opacity-30" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="relative w-full rounded-3xl border border-white/50 bg-white/50 pl-14 pr-6 py-4.5 font-serif text-base text-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] placeholder-slate-300 backdrop-blur-md transition-all duration-300 hover:bg-white/70 focus:border-pink-300 focus:bg-white focus:outline-none"
                            placeholder={t.emailPlaceholder}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Attendance Selector */}
                    <motion.div variants={itemVariants} className="space-y-4">
                      <label className="block text-center font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-left pl-2">
                        {t.willYouJoin}
                      </label>
                      <div className="relative flex flex-col sm:flex-row rounded-[2rem] bg-white/40 p-1.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-white/60 backdrop-blur-md">
                        {[
                          { value: 'yes', label: t.yesOption },
                          { value: 'maybe', label: t.maybeOption },
                          { value: 'no', label: t.noOption },
                        ].map((opt) => {
                          const isSelected = formData.attending === opt.value;
                          return (
                            <label
                              key={opt.value}
                              className={`relative flex flex-1 cursor-pointer items-center justify-center py-4 px-2 text-center font-serif text-sm transition-colors duration-500 sm:text-base ${
                                isSelected ? 'text-pink-700 font-medium' : 'text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              <input
                                type="radio"
                                name="attending"
                                value={opt.value}
                                checked={isSelected}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              {isSelected && (
                                <motion.div
                                  layoutId="attending-active"
                                  className="absolute inset-0 rounded-[1.75rem] bg-white shadow-[0_8px_30px_rgba(244,114,182,0.2)] border border-pink-100"
                                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                              )}
                              <span className="relative z-10">{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Guest Counter */}
                    <motion.div variants={itemVariants} className="mx-auto max-w-sm space-y-3">
                      <label className="block pl-2 text-center font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-left">
                        {t.numberOfGuests}
                      </label>
                      <div className="flex items-center justify-between rounded-3xl border border-white/50 bg-white/50 p-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:bg-white/70">
                        <button
                          type="button"
                          onClick={() => handleGuestChange(-1)}
                          disabled={formData.guests === '1'}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-all duration-300 hover:text-pink-500 hover:shadow-md hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <div className="flex w-20 flex-col items-center justify-center">
                          <motion.span
                            key={formData.guests}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-2xl text-slate-800"
                          >
                            {formData.guests}
                          </motion.span>
                          <span className="-mt-1 font-sans text-[9px] font-bold uppercase tracking-widest text-pink-400">
                            {parseInt(formData.guests) === 1 ? t.guest : t.guests}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleGuestChange(1)}
                          disabled={formData.guests === '5'}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-all duration-300 hover:text-pink-500 hover:shadow-md hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                      {submitError && (
                        <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center font-sans text-sm text-rose-700">
                          {submitError}
                        </p>
                      )}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-5 font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.4)] focus:outline-none disabled:pointer-events-none disabled:opacity-90"
                      >
                        {/* Premium Light Sweep */}
                        <div className="absolute inset-0 translate-x-[-150%] skew-x-[-30deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
                        
                        <span className="relative z-10 flex items-center gap-3">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin text-pink-200" />
                              <span className="tracking-[0.3em]">{t.submitting}</span>
                            </>
                          ) : (
                            <>
                              <span>{t.submitRsvp}</span>
                              <Send className="h-4 w-4 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="rsvp-success"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="flex flex-col items-center justify-center py-20 text-center relative z-10 min-h-[500px]"
                  >
                    <div className="relative mb-10 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
                        className="absolute inset-0 rounded-full bg-pink-200/50 blur-2xl"
                      />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.1, duration: 1 }}
                        className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-[0_20px_50px_rgba(244,114,182,0.5)] border-4 border-white"
                      >
                        <motion.div
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={2} />
                        </motion.div>
                      </motion.div>
                      
                      {/* Advanced Floating Particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0.5, 1, 0.8],
                            y: -80 - (Math.random() * 60),
                            x: (Math.random() - 0.5) * 100 
                          }}
                          transition={{ 
                            duration: 2.5, 
                            delay: 0.4 + (i * 0.15), 
                            ease: "easeOut"
                          }}
                          className="absolute"
                        >
                          <Heart className="h-5 w-5 fill-pink-400 text-pink-400 opacity-80" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="mb-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800"
                    >
                      {t.thankYou}
                    </motion.h3>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="max-w-md font-serif text-base italic leading-relaxed text-slate-500 sm:text-lg"
                    >
                      {t.rsvpReceived}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <p className="mt-12 text-center font-sans text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
            {t.questionsContact}{' '}
            <a
              href={`mailto:${t.contactEmail}`}
              className="text-pink-500 transition-colors hover:text-pink-600"
            >
              {t.contactEmail}
            </a>
          </p>
        </motion.div>
      </ContentWrap>
    </SectionWithPattern>
  );
}

/* =========================================================================
   MAIN HOME COMPONENT 
   ========================================================================= */
export default function Home() {
  const { t } = useLanguage();
  const [fullGalleryOpen, setFullGalleryOpen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Advanced smooth luxury parallax transforms
  const imgScale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.08]), luxurySpring);
  const heroTextY = useTransform(scrollYProgress, [0, 0.4], [0, 40]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const monthTimeline = Array.from({ length: 13 }, (_, index) => ({
    label: `${t.month} ${index}`,
    title: getTimelineTitle(index, t),
    image: MONTH_TIMELINE_IMAGES[index],
    progress: Math.round((index / 12) * 100),
  }));

  return (
    <main ref={containerRef} className="min-w-0 overflow-x-clip bg-[var(--pink-bg)] antialiased select-none">
      
      {/* SECTION 1: Cinematic Editorial Hero Showcase */}
      <section className="relative flex h-[100svh] w-full items-end justify-center overflow-hidden px-4 pb-24 sm:px-6 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 z-0 w-full h-full">
          <motion.div className="relative h-full w-full" style={{ scale: imgScale }}>
            <Image
              src={HERO_BG_IMAGE}
              alt="Zoe Celebration Opening"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover object-[center_20%] sm:object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        </div>

        {/* Ambient Moving Micro Light leaks */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <motion.div 
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[-10%] h-[40vw] w-[40vw] rounded-full bg-pink-400/10 blur-[120px]" 
          />
          <motion.div 
            animate={{ x: [0, -30, 30, 0], y: [0, 40, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[-10%] right-[-10%] h-[35vw] w-[35vw] rounded-full bg-rose-400/10 blur-[120px]" 
          />
        </div>

        <div className="absolute top-6 right-6 z-40">
          <LanguageSelector />
        </div>

        <motion.div 
          className="relative z-10 w-full max-w-4xl text-center text-white"
          style={{ y: heroTextY, opacity: heroTextOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 sm:space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-pink-200 animate-pulse" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-pink-100 sm:text-[11px] md:text-xs">
                {t.zoeTurnsOne}
              </span>
            </div>
            
            <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              {t.celebratingOneYear}
            </h1>
            
            <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent sm:w-24" />
            
            <p className="mx-auto max-w-2xl font-serif text-base font-light italic tracking-wide text-white/90 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-lg md:text-xl lg:text-2xl">
              {t.ofLoveLaughter}
            </p>
          </motion.div>
        </motion.div>

        {/* Elegant Minimal Anchor Link Button */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center">
          <motion.a
            href="#invitation-details"
            className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white shadow-md backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
          </motion.a>
        </div>
      </section>

      <InvitationDetailsSection />

      <ContentWrap>
        {/* SECTION 4: Editorial Gallery Mosaic */}
        <SectionWithPattern id="gallery" pattern="dots" className="relative bg-slate-50 py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center sm:mb-16">
              <SectionHeading eyebrow={t.memories} title={t.galleryTitle} />
            </div>

            <div className="grid auto-rows-[280px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[300px] lg:grid-cols-4 lg:grid-rows-3 lg:gap-6">
              <GalleryMosaicCard
                img={GALLERY_BENTO_IMAGES[0]}
                span="lg:col-span-2 lg:row-span-2"
                parallax={0.15}
                tag={t.sweetMoments}
                index={0}
                scrollYProgress={scrollYProgress}
              />
              <GalleryMosaicCard
                img={GALLERY_BENTO_IMAGES[1]}
                span="lg:col-span-1 lg:row-span-1"
                parallax={-0.05}
                tag={t.joyous}
                index={1}
                scrollYProgress={scrollYProgress}
              />
              <GalleryMosaicCard
                img={GALLERY_BENTO_IMAGES[2]}
                span="lg:col-span-1 lg:row-span-2"
                parallax={0.1}
                tag={t.growingFast}
                index={2}
                scrollYProgress={scrollYProgress}
              />
              <GalleryMosaicCard
                img={GALLERY_BENTO_IMAGES[3]}
                span="lg:col-span-1 lg:row-span-1"
                parallax={-0.1}
                tag={t.pureJoy}
                index={3}
                scrollYProgress={scrollYProgress}
              />
              <GalleryMosaicCard
                img={GALLERY_BENTO_IMAGES[4]}
                span="sm:col-span-2 lg:col-span-2 lg:row-span-1"
                parallax={0.08}
                tag={t.growingFast}
                index={4}
                scrollYProgress={scrollYProgress}
              />
            </div>

            <div className="mt-12 text-center sm:mt-16">
              <motion.button
                type="button"
                onClick={() => setFullGalleryOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 sm:px-8 sm:py-4"
              >
                {t.viewFullGallery}
              </motion.button>
            </div>
          </div>
        </SectionWithPattern>

        <FullYearGallery open={fullGalleryOpen} onOpenChange={setFullGalleryOpen} />
      </ContentWrap>

      {/* SECTION 3: The First Year Timeline */}
      <div className="relative overflow-visible bg-pattern-pink-soft py-16 sm:py-24 lg:py-32">
        <div className="mx-auto mb-12 max-w-2xl px-4 text-center sm:mb-16 sm:px-6 lg:max-w-7xl">
          <SectionHeading eyebrow={t.ourJourney} title={t.theFirstYear} />
        </div>
        <FirstYearStickyScroll items={monthTimeline} />
      </div>

      <RSVPSection />

      <footer className="relative border-t border-slate-100 bg-white py-12 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/30" />
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-4">
          <Heart className="h-6 w-6 fill-pink-100 text-pink-300" />
          <p className="font-serif text-base italic text-slate-500 sm:text-lg">{t.footerTagline}</p>
          <p className="mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 sm:mt-8">
            © {new Date().getFullYear()} · Zoe&apos;s First Birthday
          </p>
          <p className="font-sans text-[10px] tracking-[0.12em] text-slate-400">
            {t.developedBy}{' '}
            <a
              href="https://vbeni.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-pink-500/80 transition-colors hover:text-pink-600"
            >
              vbeni
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}