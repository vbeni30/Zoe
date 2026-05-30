'use client';

import React from 'react';

/** Full-width on mobile (no side gaps), constrained on larger screens. */
export default function ContentWrap({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full min-w-0 mx-auto max-w-[92rem] px-3 sm:px-6 lg:px-10 2xl:px-16 ${className}`}>
      {children}
    </div>
  );
}
