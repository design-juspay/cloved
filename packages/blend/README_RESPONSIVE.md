# Responsive Design Implementation - Quick Reference

## What Was Implemented

A comprehensive responsive design system for the Blend component library that allows any CSS property to adapt based on viewport size.

## Key Files

### Core Implementation
- `packages/blend/lib/tokens/breakpoints.tokens.ts` - Breakpoint definitions and ResponsiveValue type
- `packages/blend/lib/utils/responsive.utils.ts` - Utility functions for creating responsive styles
- `packages/blend/lib/components/Primitives/PrimitiveButton/PrimitiveButton.tsx` - Enhanced with responsive support
- `packages/blend/lib/components/ButtonV2/button.tokens.ts` - Responsive token values

### Documentation
- `packages/blend/RESPONSIVE_DESIGN.md` - Complete technical documentation

### Demo
- `apps/site/src/demos/ResponsiveButtonDemo.tsx` - Live demo of responsive buttons
- `apps/site/src/demos/ButtonSizeComparison.tsx` - Visual comparison of button sizes

## Quick Start

### Basic Usage

```jsx
import { ButtonV2, ButtonSizeV2, ButtonTypeV2 } from 'blend-v1';

// Automatic responsive behavior
<ButtonV2
  text="Responsive Button"
  size={ButtonSizeV2.MEDIUM}
  buttonType={ButtonTypeV2.PRIMARY}
/>
```

### Custom Responsive Values

```jsx
import { PrimitiveButton } from 'blend-v1';

<PrimitiveButton
  padding={{
    mobile: "8px 16px",
    tablet: "12px 24px",
    desktop: "16px 32px"
  }}
  fontSize={{
    mobile: "14px",
    tablet: "16px",
    desktop: "18px"
  }}
  background="#007bff"
  color="white"
>
  Custom Responsive Button
</PrimitiveButton>
```

## Breakpoints

- **Mobile**: 0-767px
- **Tablet**: 768-1023px  
- **Desktop**: 1024px+

## What Changes at Each Breakpoint

### Button Sizes

| Size | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| **Small** | | | |
| Padding | 4px 8px | 6px 16px | 8px 20px |
| Height | 32px | 36px | 40px |
| Font | 12px | 14px | 14px |
| **Medium** | | | |
| Padding | 6px 12px | 10px 20px | 12px 24px |
| Height | 36px | 44px | 48px |
| Font | 14px | 16px | 18px |
| **Large** | | | |
| Padding | 8px 16px | 12px 24px | 16px 32px |
| Height | 40px | 48px | 56px |
| Font | 16px | 18px | 20px |

## Technical Details

- **Mobile-first approach**: Base styles for mobile, enhanced for larger screens
- **CSS media queries**: No JavaScript, pure CSS for performance
- **Type-safe**: Full TypeScript support with `ResponsiveValue<T>` type
- **Backward compatible**: Existing code works without changes
- **Single component**: No duplicate components, enhanced existing ones

## Running the Demo

```bash
# From the project root
cd apps/site
pnpm dev

# Visit http://localhost:5174
```

## Key Benefits

1. **Automatic adaptation** - Components resize based on viewport
2. **Better UX** - Appropriate touch targets and readability for each device
3. **Developer friendly** - Simple API, works with existing code
4. **Performance** - CSS-based, no JavaScript calculations
5. **Maintainable** - Single source of truth for responsive behavior
