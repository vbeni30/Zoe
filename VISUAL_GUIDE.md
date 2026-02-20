# Visual Design Guide - Baby Girl Invitation

## 🎨 Design Philosophy

**Minimalistic Elegance** meets **Creative Storytelling**

- Clean, uncluttered layouts
- Sophisticated typography
- Soft, calming color palette
- Smooth, purposeful animations
- Image-focused design

## Color Palette

### Primary Colors
```
Rose Pink        #ff69b4  (RGB: 255, 105, 180)
Peach/Gold       #ffd699  (RGB: 255, 214, 153)
Soft Cream       #faf8f3  (RGB: 250, 248, 243)
```

### Extended Palette
```
Light Pink       #ffb3d9  (RGB: 255, 179, 217)
Warm Brown       #3d2416  (RGB: 61, 36, 22)
Muted Beige      #f5f1ed  (RGB: 245, 241, 237)
```

### Usage
- **Primary (Rose Pink)**: Buttons, links, accents, hover states
- **Secondary (Peach)**: Background sections, cards, highlights
- **Background (Cream)**: Main page background
- **Accent (Light Pink)**: Subtle highlights, decorative elements
- **Foreground (Brown)**: Text, headings

## Typography Scale

### Font Families
- **Playfair Display** (Headings) - Elegant, decorative serif
- **Lora** (Body) - Readable, sophisticated serif

### Size Hierarchy
```
Hero Title       text-8xl (96px)    | Playfair Display | Bold
Section Title    text-6xl (60px)    | Playfair Display | Bold
Subsection      text-4xl (36px)    | Playfair Display | Bold
Body Text       text-base (16px)   | Lora | Regular
Small Text      text-sm (14px)     | Lora | Regular
Label           text-lg (18px)     | Playfair Display | Semibold
```

### Line Heights
- **Headings**: 1.2 (tight)
- **Body**: 1.6 (relaxed)
- **Labels**: 1.5

### Letter Spacing
- **Headings**: normal
- **Labels**: 0.15em (tracking-widest)
- **UI Text**: normal

## Layout System

### Breakpoints
```
Mobile      < 640px   (sm)
Tablet      640-1024px (md)
Desktop     1024-1280px (lg)
Large       > 1280px   (xl)
```

### Grid Systems

#### Bento Grid (ImageShowcase)
```
Desktop (4 columns):
┌─────────────┬──────┬──────┐
│   Large     │ Med1 │ Med2 │
│  (2x2)      │      │      │
├─────────────┼──────┼──────┤
│  Small 1 (2col)   │ Small 2 │
└─────────────┴──────┴──────┘

Mobile (1 column):
All items stack vertically
```

#### Masonry Gallery (Gallery.tsx)
```
Desktop (3 columns):
┌─────┬─────┬─────┐
│  1  │  2  │  3  │
├─────┼─────┼─────┤
│  4  │  5  │  6  │
└─────┴─────┴─────┘

Mobile (1-2 columns):
Responsive stacking
```

### Spacing Scale
```
xs      4px    (gap-1)
sm      8px    (gap-2)
md      16px   (gap-4)
lg      24px   (gap-6)
xl      32px   (gap-8)
2xl     48px   (gap-12)
```

## Component Styles

### Buttons
```
Primary Button:
  Background: Rose Pink (#ff69b4)
  Text: White
  Padding: px-8 py-4
  Border Radius: rounded-full
  Font: Playfair Display, lg, semibold
  Hover: scale 1.05, shadow-lg
  Active: scale 0.95

Secondary Button:
  Background: Transparent
  Border: 2px Rose Pink
  Text: Rose Pink
  Padding: px-8 py-4
  Border Radius: rounded-full
  Hover: bg-primary/10
```

### Cards
```
Style:
  Background: White
  Border: 1px border-border/50
  Border Radius: rounded-2xl
  Padding: p-8
  Hover: border-primary/30
  Shadow: subtle

Hover State:
  Border color → primary/30
  Box shadow → medium
```

### Input Fields
```
Style:
  Background: background color
  Border: 1px border-border
  Padding: px-6 py-3
  Border Radius: rounded-xl
  Font: Lora
  Focus: border-primary
```

## Animations

### Scroll Animations
```
Component       Duration    Delay     Type
Hero Title      0.8s        0.2s      Fade + Slide
Section Title   0.8s        -         Fade + Slide
Cards           0.6s        0.1s-0.4s Fade + Scale
Gallery Items   0.6s        0.1s-0.4s Fade + Scale
```

### Hover Animations
```
Button          Scale: 1.05
Button Active   Scale: 0.95
Card Border     Border color change
Gallery Item    Scale: 1.1 + Zoom
Image           Shadow increase
```

### Floating Animations
```
Duration: 3-4s
Direction: Y-axis movement
Repeat: Infinite
Easing: easeInOut

Emoji 1 (✨)    3s duration, -20 to 0px
Emoji 2 (🎀)    4s duration, 0 to 20px
Background Orbs 8-10s duration
```

## Image Layouts

### Hero Image Area
```
Full width, 50vh height
Parallax effect on scroll
Gradient overlay optional
```

### Bento Grid
```
Desktop:
- Large image: 50% width, 2:2 grid
- Medium images: 25% width, auto height
- Small images: 25% width, auto height

Mobile: 100% width per item
```

### Masonry Gallery
```
3 columns on desktop
Responsive: 2 columns tablet, 1 mobile
Variable heights based on content
```

## Shadows & Depth

### Subtle
```
box-shadow: 0 1px 3px rgba(0,0,0,0.1)
```

### Medium
```
box-shadow: 0 4px 12px rgba(0,0,0,0.15)
```

### Large (Hover)
```
box-shadow: 0 10px 25px rgba(0,0,0,0.1)
```

## Borders & Dividers

### Border Color
```
Default: border-border (#e5e4e1)
Hover:   border-primary/30 (rose pink at 30%)
Active:  border-primary (full rose pink)
```

### Border Radius
```
Buttons & Inputs: rounded-full, rounded-xl
Cards: rounded-2xl, rounded-3xl
Sections: rounded-3xl
```

## Accessibility

### Color Contrast
- Text on background: WCAG AA compliant
- All interactive elements: visible focus states
- Hover states: clear visual feedback

### Font Sizes
- Minimum 16px for body text
- 14px minimum for labels
- Proper line heights (1.4-1.6)

### Interactive Elements
- Minimum 44x44px touch target
- Visible focus indicator
- Hover/active states distinct

## Responsive Adjustments

### Mobile (< 640px)
- Single column layouts
- Larger touch targets
- Reduced padding
- Simpler animations

### Tablet (640-1024px)
- Two column grids
- Medium spacing
- Full animations

### Desktop (> 1024px)
- Three+ column grids
- Full animations
- Complex parallax effects

## Animation Easing

```
Entrance:   easeOut
Exit:       easeIn
Continuous: easeInOut
Interactive: easeOut
```

## State Indicators

### Form States
```
Default:  border-border
Focus:    border-primary, shadow outline
Error:    border-destructive
Success:  border-primary (green in dark mode)
Disabled: opacity-50, cursor-not-allowed
```

### Button States
```
Idle:     Default style
Hover:    Scale 1.05, shadow-lg
Active:   Scale 0.95
Disabled: Opacity 0.5
Loading:  Spin animation (if added)
```

## Motion Principles

1. **Purpose**: Every animation serves a purpose
2. **Clarity**: Animations enhance, not distract
3. **Smoothness**: Prefer easeInOut for natural feel
4. **Hierarchy**: Staggered animations guide attention
5. **Constraint**: Keep animations under 1 second for micro-interactions

## Decoration Elements

### Floating Emojis
```
Position: Fixed corners
Opacity: 0.25-0.3
Animation: Gentle Y-axis float
Duration: 3-4 seconds
```

### Background Orbs
```
Position: Fixed (top-left, bottom-right)
Opacity: 0.15-0.2
Animation: Subtle drift
Duration: 8-10 seconds
```

### Dividers
```
Style: Subtle border-top
Color: border-border/30
Spacing: py-12 or py-20
Optional: Gradient at edges
```

---

## Quick Reference

**Primary Action**: Rose Pink buttons
**Secondary Action**: Bordered buttons with rose pink
**Hover State**: 1.05 scale, shadow increase
**Focus State**: Border color change to primary
**Animation Duration**: 0.6-0.8 seconds
**Easing**: easeInOut by default

This maintains visual consistency while being flexible for customization!
