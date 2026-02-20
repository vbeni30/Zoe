# Baby Girl Birthday Invitation - Customization Guide

## Overview
This is a stunning, minimalistic baby girl birthday invitation website built with Next.js, Framer Motion, and Tailwind CSS. It features fancy typography, creative image layouts, and smooth animations.

## How to Customize

### 1. Edit Core Content

#### Hero Section (`components/Hero.tsx`)
- Change the emoji (👶)
- Update the title from "She's One Year"
- Modify the subtitle and CTA button text

#### Invitation Details (`components/InvitationDetails.tsx`)
- Update the event date, time, and location
- Modify the dress code
- Change the welcome message and special note

#### RSVP Form (`components/RSVP.tsx`)
- Update the RSVP deadline
- Modify contact email
- Customize the thank you message

### 2. Add Your Own Images

1. Place your images in `/public/images/`
2. Update the components to use your images using Next.js Image component:

```jsx
import Image from 'next/image'

<Image 
  src="/images/your-image.jpg"
  alt="Baby girl"
  width={400}
  height={300}
/>
```

### 3. Customize Colors

The design uses a beautiful pastel color system. To change colors, edit `/app/globals.css`:

**Current Palette:**
- **Primary**: Rose pink (#ff69b4)
- **Secondary**: Peach/Gold (#ffd699)
- **Background**: Soft cream (#faf8f3)
- **Accent**: Light pink (#ffb3d9)

### 4. Modify Fonts

The site uses two elegant fonts:
- **Playfair Display**: For headings (fancy serif)
- **Lora**: For body text (elegant serif)

To change fonts, edit `/app/layout.tsx`:

```tsx
import { YourFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ['latin'], variable: '--font-your-font' })
```

Then update `/tailwind.config.ts` fontFamily section.

### 5. Gallery Customization

Edit `/components/Gallery.tsx` to:
- Change emoji categories
- Modify grid layout (bento style)
- Update hover effects

### 6. Add More Sections

The site structure makes it easy to add new sections. Create a new component in `/components/` and import it in `/app/page.tsx`.

Example component template:
```tsx
'use client'
import { motion } from 'framer-motion'

export default function NewSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-playfair text-5xl font-bold text-foreground"
        >
          Your Title Here
        </motion.h2>
      </div>
    </section>
  )
}
```

## Component Structure

- **Hero.tsx** - Main hero section with title and CTA
- **ImageShowcase.tsx** - Creative bento grid gallery
- **ParallaxSection.tsx** - Parallax scrolling effect
- **InvitationDetails.tsx** - Event details with icons
- **Gallery.tsx** - Masonry-style gallery with hover effects
- **RSVP.tsx** - RSVP form with submission handling
- **Footer.tsx** - Footer with closing message
- **AnimatedButton.tsx** - Reusable animated button component

## Design Features

✨ **Smooth Animations** - Framer Motion animations on scroll and hover
🎨 **Elegant Typography** - Playfair Display for headings, Lora for body
💖 **Pastel Palette** - Soft, sophisticated colors
📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
🎭 **Creative Layouts** - Bento grids and parallax effects
✨ **Decorative Elements** - Floating emojis and animated backgrounds

## Deployment

Deploy to Vercel in one click:
1. Push your code to GitHub
2. Connect your repo on [vercel.com](https://vercel.com)
3. Click Deploy

Or deploy manually:
```bash
npm run build
npm run start
```

## Tips for Best Results

1. **Use High Quality Images** - Replace placeholder emojis with real photos
2. **Personalize Text** - Add family names and personal touches
3. **Preview on Mobile** - Test responsiveness during development
4. **Adjust Timings** - Animation durations can be changed in component files
5. **Brand Your Domain** - Update metadata in `/app/layout.tsx`

## Troubleshooting

**Images not showing?**
- Ensure images are in `/public/images/`
- Check file paths are correct
- Use Next.js Image component for optimization

**Animations not smooth?**
- Check browser console for errors
- Ensure Framer Motion is installed: `pnpm install framer-motion`
- Clear browser cache

**Colors not updating?**
- Edit the CSS variables in `/app/globals.css`
- Update both `:root` and `.dark` sections if using dark mode
- Clear Tailwind cache: `rm -rf .next`

## Support

For questions about specific components or customization needs, refer to:
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Enjoy your beautiful invitation! 💕✨
