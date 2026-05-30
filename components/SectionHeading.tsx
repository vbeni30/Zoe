'use client';

import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
  variant?: 'default' | 'light';
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
  variant = 'default',
}: SectionHeadingProps) {
  const isLight = variant === 'light';

  return (
    <div className={`text-center ${className}`}>
      <p
        className={`mb-3 font-lora text-[10px] font-light uppercase tracking-[0.22em] sm:mb-4 sm:text-[11px] sm:tracking-[0.28em] md:text-xs ${
          isLight ? 'text-white/85' : 'text-pink-500/80'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-playfair text-3xl font-light leading-tight tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl ${
          isLight
            ? 'text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]'
            : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mx-auto mt-4 h-px w-16 sm:mt-6 sm:w-28 bg-gradient-to-r from-transparent to-transparent ${
          isLight ? 'via-white/50' : 'via-pink-300/70'
        }`}
      />
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl font-lora text-sm font-light leading-relaxed text-balance sm:mt-6 sm:text-base md:text-lg lg:text-xl ${
            isLight ? 'text-white/90' : 'text-slate-600/90'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
