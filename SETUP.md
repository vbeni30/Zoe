# Baby Girl Birthday Invitation - Setup & Launch Guide

## 🎉 Welcome!

This is a beautiful, modern baby girl birthday invitation website. It's fully responsive, animated, and ready to personalize with your special details!

## Quick Start

### 1. Installation

If you're using the shadcn CLI:
```bash
npx shadcn-cli@latest init my-invitation
cd my-invitation
```

Or if cloning directly:
```bash
git clone [your-repo-url]
cd baby-invitation
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your invitation live!

## 📝 Essential Customizations

### Step 1: Update Main Content (5 minutes)

**Hero Section** - File: `components/Hero.tsx`
- Change "She's One Year" to your child's name/title
- Update the subtitle
- Modify button text

**Event Details** - File: `components/InvitationDetails.tsx`
- Update date: "Saturday, June 15th, 2024"
- Update time: "2:00 PM - 5:00 PM"
- Update location: "Botanical Gardens, Downtown"
- Change dress code if needed

**RSVP Section** - File: `components/RSVP.tsx`
- Update RSVP deadline
- Change contact email
- Modify thank you message

### Step 2: Personalize Colors (Optional)

Edit `/app/globals.css` to change the color scheme:

```css
:root {
  --primary: 350 100% 68%;        /* Rose Pink */
  --secondary: 30 100% 88%;       /* Peach/Gold */
  --background: 50 100% 97%;      /* Cream */
  --accent: 350 100% 68%;         /* Light Pink */
}
```

**Color Suggestions:**
- Lavender: `280 70% 65%`
- Mint Green: `160 80% 60%`
- Soft Coral: `10 100% 75%`
- Powder Blue: `200 100% 80%`

### Step 3: Add Your Images

1. Place images in `/public/images/`
2. Use Next.js Image component in components:

```jsx
import Image from 'next/image'

<Image 
  src="/images/baby-photo.jpg"
  alt="Baby girl"
  width={400}
  height={300}
  priority
/>
```

3. Update `ImageShowcase.tsx` and `Gallery.tsx` to display your photos

### Step 4: Connect RSVP Form

Currently, the form displays a thank you message. To make it functional:

**Option A: Use a Service**
- Emailjs.com
- Formspree.io
- Supabase
- Firebase

**Option B: Example with Emailjs**

```bash
pnpm install @emailjs/browser
```

Update `RSVP.tsx`:
```tsx
import emailjs from '@emailjs/browser'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  await emailjs.send(
    'SERVICE_ID',
    'TEMPLATE_ID',
    formData,
    'PUBLIC_KEY'
  )
  
  setSubmitted(true)
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy!

**Custom Domain:**
- Go to Settings → Domains
- Add your custom domain
- Follow DNS setup instructions

### Deploy Elsewhere

**Netlify:**
```bash
pnpm run build
# Connect to Netlify
```

**Manual Server:**
```bash
pnpm run build
pnpm run start
```

## 🎨 Advanced Customizations

### Change Fonts

Edit `/app/layout.tsx`:
```tsx
import { Montserrat, OpenSans } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const openSans = OpenSans({ subsets: ['latin'] })
```

Update `/tailwind.config.ts`:
```ts
fontFamily: {
  playfair: 'var(--font-montserrat)',
  lora: 'var(--font-openSans)',
}
```

### Add More Sections

Create new component:
```tsx
// components/Timeline.tsx
'use client'

import { motion } from 'framer-motion'

export default function Timeline() {
  return (
    <section className="py-24 px-4">
      <h2 className="font-playfair text-5xl font-bold text-foreground">
        One Year Timeline
      </h2>
      {/* Add your timeline */}
    </section>
  )
}
```

Add to `app/page.tsx`:
```tsx
import Timeline from '@/components/Timeline'

// Inside the main component:
<Timeline />
```

### Customize Animations

All animations use Framer Motion. Adjust timing in components:

```tsx
animate={{ opacity: 1, y: 0 }}
transition={{ 
  duration: 0.8,      // Change speed
  delay: 0.2,         // Add delay
  ease: 'easeInOut'   // Change easing
}}
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Main layout + fonts
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles & colors
│   └── favicon.ico
├── components/
│   ├── Hero.tsx            # Hero section
│   ├── Navigation.tsx       # Top navigation
│   ├── ImageShowcase.tsx    # Bento grid gallery
│   ├── ParallaxSection.tsx  # Parallax effect
│   ├── InvitationDetails.tsx# Event details
│   ├── Gallery.tsx          # Masonry gallery
│   ├── RSVP.tsx            # RSVP form
│   ├── Footer.tsx          # Footer
│   ├── AnimatedButton.tsx  # Button component
│   └── Confetti.tsx        # Confetti effect
├── public/
│   └── images/             # Your images
├── package.json
└── tailwind.config.ts
```

## ✨ Features Used

- ⚡ **Next.js 16** - App Router, Server Components
- 🎬 **Framer Motion** - Smooth animations
- 🎨 **Tailwind CSS** - Beautiful styling
- 📱 **Responsive Design** - Mobile-first
- 🔤 **Google Fonts** - Playfair Display & Lora
- 🎭 **Parallax Effects** - Scroll-based animations
- 🏗️ **Component Structure** - Modular and reusable

## 🐛 Troubleshooting

**Issue: Dependencies not installing**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Issue: Styles not applying**
```bash
rm -rf .next
pnpm run build
```

**Issue: Images not showing**
- Check `/public/images/` folder exists
- Verify image file names in code match files
- Clear browser cache (Ctrl+Shift+Delete)

**Issue: Animations laggy**
- Check browser dev tools for console errors
- Disable heavy animations if on older device
- Use Chrome DevTools Performance tab to profile

## 📞 Need Help?

- Check `CUSTOMIZATION.md` for detailed guides
- Review component files - they're well-commented
- Visit [Framer Motion docs](https://www.framer.com/motion/)
- Check [Next.js docs](https://nextjs.org/docs)

## 💝 Final Touches

1. **Proofread everything** - Check dates, names, email
2. **Test on mobile** - Use browser DevTools device mode
3. **Share preview** - Send link to family before big event
4. **Get feedback** - Ask if important details are clear
5. **Set RSVP deadline** - Give guests at least 2 weeks notice

## 🎊 Ready to Celebrate!

Your beautiful invitation is ready. Personalize it, share it, and celebrate this special milestone! 

Happy first birthday! 🎂💕✨

---

**Questions?** Check the docs or reach out - we're here to help make this perfect!
