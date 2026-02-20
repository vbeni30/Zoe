# ⚡ Quick Start - Baby Girl Birthday Invitation

## 1 Minute Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Visit
# http://localhost:3000
```

## 5 Minute Customization

### Change the Title
**File:** `components/Hero.tsx` (Line 18)
```tsx
// Change this:
She's
<span className="block text-primary">One Year</span>

// To this:
Emma is
<span className="block text-primary">One Year Old</span>
```

### Change the Date
**File:** `components/InvitationDetails.tsx` (Line 19)
```tsx
value: 'Saturday, June 15th, 2024',
// Change to:
value: 'Saturday, July 20th, 2024',
```

### Change the Email
**File:** `components/RSVP.tsx` (Line 226)
```tsx
contact@babygirlcelebration.com
// Change to:
your-email@example.com
```

### Change Colors
**File:** `app/globals.css` (Lines 20-25)
```css
--primary: 350 100% 68%;     /* Change rose pink */
--secondary: 30 100% 88%;    /* Change peach/gold */
--background: 50 100% 97%;   /* Change cream */
--accent: 350 100% 68%;      /* Change light pink */
```

## Color Palette Options

### Lavender Theme
```css
--primary: 280 70% 65%;
--secondary: 280 40% 85%;
--background: 280 30% 97%;
--accent: 280 60% 75%;
```

### Mint Theme
```css
--primary: 160 80% 60%;
--secondary: 150 60% 80%;
--background: 150 40% 96%;
--accent: 160 70% 75%;
```

### Soft Coral Theme
```css
--primary: 10 100% 70%;
--secondary: 20 100% 85%;
--background: 30 50% 97%;
--accent: 10 90% 80%;
```

## File Locations

| What to Change | File Location |
|---|---|
| Hero Title | `components/Hero.tsx` |
| Hero Subtitle | `components/Hero.tsx` (Line 31) |
| Event Date | `components/InvitationDetails.tsx` (Line 19) |
| Event Time | `components/InvitationDetails.tsx` (Line 24) |
| Event Location | `components/InvitationDetails.tsx` (Line 29) |
| Dress Code | `components/InvitationDetails.tsx` (Line 34) |
| Colors | `app/globals.css` (Lines 20-25) |
| Email | `components/RSVP.tsx` (Line 226) |
| RSVP Deadline | `components/RSVP.tsx` (Line 140) |
| Footer Text | `components/Footer.tsx` (Line 13) |

## Font Options

### Headings (Playfair Display alternatives)
- Playfair Display (Current - Elegant)
- Abril Fatface (Bolder)
- Libre Baskerville (Softer)
- Cormorant Garamond (Thinner)

### Body (Lora alternatives)
- Lora (Current - Readable)
- Merriweather (Serif)
- Crimson Text (Thin)
- EB Garamond (Classic)

**To change fonts:**
1. Edit `app/layout.tsx`
2. Import new font: `import { NewFont } from 'next/font/google'`
3. Update `tailwind.config.ts` fontFamily

## Add Your Images

### Option 1: Using Emojis (Current)
No action needed - just customize emoji text

### Option 2: Using Photos
1. Save image to `/public/images/photo.jpg`
2. Update components to use Next.js Image:
```tsx
import Image from 'next/image'

<Image 
  src="/images/photo.jpg"
  alt="Photo"
  width={400}
  height={300}
/>
```

## Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Visit vercel.com
# 3. Click "Add New" → "Project"
# 4. Select your repository
# 5. Click "Deploy"

# That's it! 🚀
```

## Key Sections

```
Page Layout from top to bottom:

1. Navigation Bar
   └─ Sticky header with menu

2. Hero Section
   └─ Main title & CTA buttons

3. Image Showcase
   └─ Bento grid gallery

4. Parallax Section
   └─ Scroll effect

5. Invitation Details
   └─ Date, time, location, dress code

6. Gallery
   └─ Masonry photo grid

7. RSVP Form
   └─ Guest registration

8. Footer
   └─ Closing message
```

## Useful Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run linter
pnpm lint

# Install new package
pnpm add package-name
```

## Common Changes

### Change Button Text
**File:** `components/Hero.tsx`
```tsx
// Primary button
<motion.button>Save the Date</motion.button>

// Secondary button
<motion.button>Gallery</motion.button>
```

### Add Custom Message
**File:** `components/InvitationDetails.tsx`
```tsx
<p className="font-lora text-foreground/70 text-lg leading-relaxed">
  Your custom message here
</p>
```

### Modify Animation Speed
**File:** Any component
```tsx
// Change transition duration (in seconds)
transition={{ duration: 0.8 }}      // Faster or slower
transition={{ delay: 0.2 }}         // Add delay
transition={{ ease: 'easeOut' }}    // Change easing
```

### Change Grid Layout
**File:** `components/ImageShowcase.tsx`
```tsx
// Modify grid columns
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                              Change 4 to desired columns
```

## Testing Checklist

- [ ] All text is accurate
- [ ] Dates and times are correct
- [ ] Email address is correct
- [ ] Colors look good
- [ ] Images load properly
- [ ] Mobile view looks good
- [ ] Links work
- [ ] Form submits
- [ ] Animations are smooth

## Before Sharing

1. **Proofread** - Check all text carefully
2. **Test Links** - Click all buttons
3. **Mobile Check** - View on phone
4. **Speed Test** - Page loads quickly
5. **Share Preview** - Get feedback from family
6. **Browser Test** - Works in Chrome, Safari, Firefox

## Help & Docs

| Document | Purpose |
|---|---|
| `SETUP.md` | Detailed setup guide |
| `CUSTOMIZATION.md` | In-depth customization |
| `VISUAL_GUIDE.md` | Design system reference |
| `PROJECT_SUMMARY.md` | Project overview |

## Keyboard Shortcuts (Dev)

| Command | Action |
|---|---|
| `Ctrl+Shift+Delete` | Clear cache |
| `Ctrl+Shift+I` | DevTools |
| `Ctrl+R` | Refresh page |
| `Ctrl+H` | View history |

## Troubleshooting

**Problem: Styles not updating**
```bash
rm -rf .next
pnpm run build
```

**Problem: Dependencies not installing**
```bash
pnpm install
```

**Problem: Port 3000 already in use**
```bash
pnpm dev -- -p 3001
```

---

## 🚀 You're All Set!

1. Customize content
2. Add images
3. Test on mobile
4. Deploy
5. Share & celebrate! 🎉

Questions? Check the other `.md` files for detailed guides!

Happy first birthday! 💕✨
