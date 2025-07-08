# Responsive Design System - Complete Documentation

## Executive Summary

This document serves as the single source of truth for the responsive design implementation in the Blend component library. It covers the mobile web (mWeb) approach, technical implementation, customization options, and guidelines for different use cases including white-label implementations.

## Table of Contents

1. [Overview](#overview)
2. [Technical Architecture](#technical-architecture)
3. [Implementation Details](#implementation-details)
4. [File Changes Summary](#file-changes-summary)
5. [Token Structure](#token-structure)
6. [Usage Examples](#usage-examples)
7. [Customization Options](#customization-options)
8. [White-Label Strategy](#white-label-strategy)
9. [Dashboard-Specific Implementation](#dashboard-specific-implementation)
10. [Migration Guide](#migration-guide)
11. [Best Practices](#best-practices)
12. [Testing Strategy](#testing-strategy)
13. [FAQ](#faq)

## Overview

### Core Approach

Our responsive design system is built on three key principles:

1. **Mobile-First Design**: Base styles target mobile devices, with progressive enhancement for larger screens
2. **Token-Driven System**: All responsive values are defined in tokens for consistency and reusability
3. **Type-Safe Implementation**: Full TypeScript support ensures compile-time validation

### Key Features

- ✅ CSS-based media queries for optimal performance
- ✅ Backward compatible with existing implementations
- ✅ Flexible breakpoint customization
- ✅ Component-agnostic approach
- ✅ Zero runtime overhead
- ✅ White-label ready

### Default Breakpoints

```typescript
export const BREAKPOINTS = {
  mobile: 0,      // 0px and up
  tablet: 768,    // 768px and up
  desktop: 1024,  // 1024px and up
} as const;
```

## Technical Architecture

### Core Type System

```typescript
// packages/blend/lib/tokens/breakpoints.tokens.ts

// Breakpoint type
export type Breakpoint = keyof typeof BREAKPOINTS;

// Core responsive type - allows static or responsive values
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Type guard for responsive values
export const isResponsiveValue = <T>(
  value: unknown
): value is Partial<Record<Breakpoint, T>> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    ('mobile' in value || 'tablet' in value || 'desktop' in value)
  );
};

// Media query definitions
export const MEDIA_QUERIES = {
  mobile: `@media (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop}px)`,
} as const;
```

### Utility Functions

```typescript
// packages/blend/lib/utils/responsive.utils.ts

import { CSSObject } from 'styled-components';
import { ResponsiveValue, isResponsiveValue, BREAKPOINTS } from '../tokens/breakpoints.tokens';

export const createResponsiveStyles = (
  propName: string,
  value: ResponsiveValue<unknown>
): CSSObject => {
  if (!value || !isResponsiveValue(value)) {
    return { [propName]: value };
  }

  const styles: CSSObject = {};
  
  // Mobile-first approach
  if (value.mobile !== undefined) {
    styles[propName] = value.mobile;
  }
  
  // Tablet styles
  if (value.tablet !== undefined) {
    styles[`@media (min-width: ${BREAKPOINTS.tablet}px)`] = {
      [propName]: value.tablet,
    };
  }
  
  // Desktop styles
  if (value.desktop !== undefined) {
    styles[`@media (min-width: ${BREAKPOINTS.desktop}px)`] = {
      [propName]: value.desktop,
    };
  }

  return styles;
};
```

## Implementation Details

### PrimitiveButton Component Changes

#### Before (Non-Responsive)

```typescript
type PrimitiveButtonProps = {
  padding?: CSSObject["padding"];
  fontSize?: CSSObject["fontSize"];
  minHeight?: CSSObject["minHeight"];
  // ... other props
}
```

#### After (Responsive)

```typescript
import { ResponsiveValue } from '../../../tokens/breakpoints.tokens';

type PrimitiveButtonProps = {
  // All style props now accept ResponsiveValue<T>
  padding?: ResponsiveValue<CSSObject["padding"]>;
  margin?: ResponsiveValue<CSSObject["margin"]>;
  fontSize?: ResponsiveValue<CSSObject["fontSize"]>;
  fontWeight?: ResponsiveValue<CSSObject["fontWeight"]>;
  lineHeight?: ResponsiveValue<CSSObject["lineHeight"]>;
  width?: ResponsiveValue<CSSObject["width"]>;
  height?: ResponsiveValue<CSSObject["height"]>;
  minHeight?: ResponsiveValue<CSSObject["minHeight"]>;
  maxWidth?: ResponsiveValue<CSSObject["maxWidth"]>;
  background?: ResponsiveValue<CSSObject["background"]>;
  color?: ResponsiveValue<CSSObject["color"]>;
  border?: ResponsiveValue<CSSObject["border"]>;
  borderRadius?: ResponsiveValue<CSSObject["borderRadius"]>;
  // ... all other style props
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Updated styled component
const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})<PrimitiveButtonProps>`
  ${(props) => {
    const baseStyles = getStyles(props); // Processes responsive values
    const stateStyles = getStateStyles(props);
    
    // css helper ensures media queries are processed correctly
    return css({ ...baseStyles, ...stateStyles });
  }}
`;
```

### ButtonV2 Component Changes

```typescript
// packages/blend/lib/components/ButtonV2/ButtonV2.tsx

const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>(
  ({ size = ButtonSizeV2.SMALL, subType = ButtonSubTypeV2.DEFAULT, ...props }, ref) => {
    const buttonTokens = useComponentToken("BUTTON") as ButtonTokensType;

    return (
      <PrimitiveButton
        ref={ref}
        // Pass responsive tokens
        padding={buttonTokens.padding[size][subType]}
        fontSize={buttonTokens.fontSize?.[size]}
        minHeight={buttonTokens.minHeight?.[size]?.[subType]}
        height={buttonTokens.minHeight?.[size]?.[subType]} // Added for browser compatibility
        // ... other props
      >
        <Text
          style={{
            fontWeight: 500,
            fontSize: 'inherit',  // Fixed: inherit from button
            lineHeight: 'inherit' // Fixed: inherit from button
          }}
        >
          {text}
        </Text>
      </PrimitiveButton>
    );
  }
);
```

## File Changes Summary

### New Files Created

1. **`packages/blend/lib/tokens/breakpoints.tokens.ts`**
   - Breakpoint definitions
   - ResponsiveValue<T> type
   - Type guards and utilities

2. **`packages/blend/lib/utils/responsive.utils.ts`**
   - createResponsiveStyles utility
   - Converts responsive values to CSS

### Modified Files

1. **`packages/blend/lib/components/Primitives/PrimitiveButton/PrimitiveButton.tsx`**
   - All style props accept ResponsiveValue<T>
   - Uses css helper for media queries
   - Backward compatible

2. **`packages/blend/lib/components/ButtonV2/ButtonV2.tsx`**
   - Added height prop
   - Fixed font size inheritance
   - Uses responsive tokens

3. **`packages/blend/lib/components/ButtonV2/button.tokens.ts`**
   - Converted to responsive structure
   - Added breakpoint values

## Token Structure

### Hierarchy

```
Component (button, input, card)
  └── Property (padding, fontSize, minHeight)
      └── Size Variant (sm, md, lg)
          └── Sub-variant (default, iconOnly, inline)
              └── Breakpoint (mobile, tablet, desktop)
```

### Button Token Example

```typescript
// packages/blend/lib/components/ButtonV2/button.tokens.ts

export type ButtonTokensType = {
  padding: {
    [key in ButtonSizeV2]: {
      [key in ButtonSubTypeV2]: ResponsiveValue<CSSObject["padding"]>;
    };
  };
  minHeight: {
    [key in ButtonSizeV2]: {
      [key in ButtonSubTypeV2]: ResponsiveValue<CSSObject["minHeight"]>;
    };
  };
  fontSize: {
    [key in ButtonSizeV2]: ResponsiveValue<CSSObject["fontSize"]>;
  };
};

const buttonTokens: ButtonTokensType = {
  padding: {
    sm: {
      default: {
        mobile: "4px 8px",
        tablet: "6px 16px",
        desktop: "8px 20px"
      },
      iconOnly: {
        mobile: "6px 6px",
        tablet: "8px 8px",
        desktop: "10px 10px"
      },
      inline: "0px 0px" // Static values still supported
    },
    md: {
      default: {
        mobile: "6px 12px",
        tablet: "10px 20px",
        desktop: "12px 24px"
      }
    },
    lg: {
      default: {
        mobile: "8px 16px",
        tablet: "12px 24px",
        desktop: "16px 32px"
      }
    }
  },
  minHeight: {
    sm: {
      default: {
        mobile: "32px",
        tablet: "36px",
        desktop: "40px"
      }
    },
    md: {
      default: {
        mobile: "36px",
        tablet: "44px",
        desktop: "48px"
      }
    },
    lg: {
      default: {
        mobile: "40px",
        tablet: "48px",
        desktop: "56px"
      }
    }
  },
  fontSize: {
    sm: {
      mobile: "12px",
      tablet: "14px",
      desktop: "14px"
    },
    md: {
      mobile: "14px",
      tablet: "16px",
      desktop: "18px"
    },
    lg: {
      mobile: "16px",
      tablet: "18px",
      desktop: "20px"
    }
  }
};
```

### Responsive Values at Each Breakpoint

| Size | Property | Mobile | Tablet | Desktop |
|------|----------|--------|--------|---------|
| **Small** | Padding | 4px 8px | 6px 16px | 8px 20px |
| | Height | 32px | 36px | 40px |
| | Font | 12px | 14px | 14px |
| **Medium** | Padding | 6px 12px | 10px 20px | 12px 24px |
| | Height | 36px | 44px | 48px |
| | Font | 14px | 16px | 18px |
| **Large** | Padding | 8px 16px | 12px 24px | 16px 32px |
| | Height | 40px | 48px | 56px |
| | Font | 16px | 18px | 20px |

## Usage Examples

### Level 1: Default Responsive Behavior

```jsx
// Zero configuration - uses library defaults
<ButtonV2
  text="Click Me"
  size={ButtonSizeV2.MEDIUM}
  buttonType={ButtonTypeV2.PRIMARY}
/>
```

### Level 2: Custom Responsive Values

```jsx
// Override specific properties with responsive values
<PrimitiveButton
  padding={{
    mobile: "8px 16px",
    tablet: "12px 24px",
    desktop: "16px 32px"
  }}
  fontSize={{
    mobile: "14px",
    desktop: "16px" // Tablet will use mobile value
  }}
  background="#007bff"
  color="white"
  borderRadius="4px"
>
  Custom Responsive Button
</PrimitiveButton>
```

### Level 3: Mixed Static and Responsive

```jsx
<PrimitiveButton
  // Responsive padding
  padding={{ mobile: "8px", tablet: "12px", desktop: "16px" }}
  // Static background
  background="#007bff"
  // Responsive font size
  fontSize={{ mobile: "14px", desktop: "16px" }}
  // Static color
  color="white"
>
  Mixed Values
</PrimitiveButton>
```

## Customization Options

### Option 1: Direct Responsive Values

```jsx
<PrimitiveButton
  padding={{
    mobile: "8px 16px",
    tablet: "12px 24px",
    desktop: "16px 32px"
  }}
>
  Direct Values
</PrimitiveButton>
```

### Option 2: Custom Tokens

```typescript
const customButtonTokens = {
  padding: {
    small: {
      mobile: "4px 8px",
      tablet: "6px 12px",
      desktop: "8px 16px"
    }
  }
};
```

### Option 3: Styled Components

```typescript
const CustomButton = styled(PrimitiveButton)`
  /* Custom breakpoints */
  @media (min-width: 480px) {
    padding: 6px 12px;
  }
  
  @media (min-width: 768px) {
    padding: 8px 16px;
  }
  
  @media (min-width: 1280px) {
    padding: 10px 20px;
  }
`;
```

### Option 4: Theme Override

```typescript
const customTheme = {
  breakpoints: {
    mobile: 0,
    tablet: 640,    // Custom tablet
    desktop: 1280,  // Custom desktop
  },
  button: {
    padding: {
      sm: {
        mobile: "6px 12px",
        tablet: "8px 16px",
        desktop: "10px 20px"
      }
    }
  }
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### Option 5: CSS Variables

```jsx
const DynamicButton = styled(PrimitiveButton)`
  @media (min-width: var(--breakpoint-tablet, 768px)) {
    padding: var(--padding-tablet, 10px 20px);
  }
`;

<div style={{
  '--breakpoint-tablet': '640px',
  '--padding-tablet': '8px 16px'
}}>
  <DynamicButton>Dynamic</DynamicButton>
</div>
```

## White-Label Strategy

### Recommended Architecture

For white-label implementations, use the **Token-Based Approach with Theme Override**:

```typescript
// Core library provides interface
export interface ResponsiveTokens {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    [key: string]: number; // Allow custom breakpoints
  };
  button: {
    padding: Record<string, ResponsiveValue<string>>;
    fontSize: Record<string, ResponsiveValue<string>>;
    minHeight: Record<string, ResponsiveValue<string>>;
  };
}

// Clients override what they need
const clientTheme: Partial<ResponsiveTokens> = {
  breakpoints: {
    mobile: 0,
    tablet: 640,
    desktop: 1280,
    wide: 1920
  },
  button: {
    padding: {
      sm: { mobile: "6px", tablet: "10px", desktop: "14px", wide: "18px" }
    }
  }
};
```

### Why This Approach?

1. **Complete Customization** - Clients control breakpoints and values
2. **Type Safety** - Full TypeScript support
3. **Performance** - CSS generated at build time
4. **Maintainability** - Single source of truth
5. **Scalability** - Easy to extend

## Dashboard-Specific Implementation

### Trading Dashboard (Data-Dense)

```typescript
const tradingTheme = {
  breakpoints: {
    mobile: 0,
    desktop: 1024,    // Skip tablet
    ultrawide: 2560   // Multiple monitors
  },
  button: {
    padding: {
      sm: { 
        mobile: "2px 6px",
        desktop: "3px 8px",
        ultrawide: "4px 10px"
      }
    },
    minHeight: {
      sm: {
        mobile: "24px",
        desktop: "28px",
        ultrawide: "32px"
      }
    }
  }
};
```

### Consumer Banking (Touch-Optimized)

```typescript
const bankingTheme = {
  breakpoints: {
    mobile: 0,
    phablet: 480,
    tablet: 768,
    desktop: 1024
  },
  button: {
    padding: {
      sm: { 
        mobile: "12px 24px",  // Large touch targets
        phablet: "10px 20px",
        tablet: "8px 16px",
        desktop: "6px 12px"
      }
    },
    minHeight: {
      sm: {
        mobile: "48px",  // WCAG AAA
        phablet: "44px",
        tablet: "40px",
        desktop: "36px"
      }
    }
  }
};
```

### E-commerce (Conversion-Focused)

```typescript
const ecommerceTheme = {
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1280,
    wide: 1920
  },
  button: {
    padding: {
      lg: { 
        mobile: "16px 32px",
        tablet: "18px 40px",
        desktop: "20px 48px",
        wide: "24px 56px"
      }
    },
    fontSize: {
      lg: {
        mobile: "18px",
        tablet: "20px",
        desktop: "22px",
        wide: "24px"
      }
    }
  }
};
```

## Migration Guide

### Phase 1: Backward Compatibility ✅ (Current)

```typescript
// Old code continues to work
<PrimitiveButton padding="12px 24px" fontSize="16px">
  Static Button
</PrimitiveButton>

// New responsive code
<PrimitiveButton 
  padding={{ mobile: "8px 16px", tablet: "12px 24px" }}
  fontSize={{ mobile: "14px", tablet: "16px" }}
>
  Responsive Button
</PrimitiveButton>
```

### Phase 2: Gradual Migration

1. Identify components needing responsive behavior
2. Update tokens to responsive values
3. Test across breakpoints
4. Deploy with feature flags if needed

### Phase 3: Future Deprecation

- Deprecate non-responsive props
- Provide codemods for migration
- Update all documentation

## Best Practices

### 1. Mobile-First Design

```typescript
// ✅ Good: Progressive enhancement
{
  mobile: "8px",
  tablet: "12px",
  desktop: "16px"
}

// ❌ Avoid: Desktop-first
{
  desktop: "16px",
  tablet: "12px",
  mobile: "8px"
}
```

### 2. Semantic Tokens

```typescript
// ✅ Good: Meaningful names
const spacing = {
  compact: { mobile: "4px", tablet: "6px", desktop: "8px" },
  comfortable: { mobile: "8px", tablet: "12px", desktop: "16px" },
  spacious: { mobile: "12px", tablet: "16px", desktop: "20px" }
};

// ❌ Avoid: Arbitrary values
const spacing = {
  s1: "4px",
  s2: "8px",
  s3: "12px"
};
```

### 3. Performance

```typescript
// ✅ Good: Reuse objects
const buttonPadding = { mobile: "8px", tablet: "12px", desktop: "16px" };
<Button padding={buttonPadding} />

// ❌ Avoid: Inline objects
<Button padding={{ mobile: "8px", tablet: "12px", desktop: "16px" }} />
```

### 4. Consistency

- Use same breakpoints across the app
- Follow token naming conventions
- Document custom breakpoints

## Testing Strategy

### Unit Tests

```typescript
describe('Responsive Button', () => {
  const breakpoints = [
    { name: 'mobile', width: 375 },
    { name: 'tablet', width: 768 },
    { name: 'desktop', width: 1024 }
  ];

  breakpoints.forEach(({ name, width }) => {
    it(`renders correctly at ${name}`, () => {
      mockViewport(width);
      const { getByRole } = render(<ButtonV2 size="medium" />);
      const button = getByRole('button');
      
      expect(button).toHaveStyle(expectedStyles[name]);
    });
  });
});
```

### Visual Regression

```typescript
// Use Chromatic or Percy
it('captures responsive states', async () => {
  const viewports = [375, 768, 1024];
  
  for (const width of viewports) {
    await page.setViewport({ width, height: 800 });
    await percySnapshot(page, `Button at ${width}px`);
  }
});
```

### Manual Testing

1. Browser DevTools responsive mode
2. Real device testing
3. Cross-browser verification

## FAQ

### Q: Will this break existing code?

A: No, fully backward compatible. Static values work as before.

### Q: What's the bundle size impact?

A: ~2KB gzipped for the responsive system. CSS size depends on usage.

### Q: Can I use custom breakpoints?

A: Yes, through theme provider or styled components.

### Q: How do I debug responsive styles?

A: Use browser DevTools. Styles are standard CSS media queries.

### Q: Does it work with SSR?

A: Yes, compatible with Next.js, Gatsby, etc.

### Q: Can I mix approaches?

A: Yes, all customization options can be combined.

### Q: How do I handle orientation?

A: Extend the system:
```typescript
const orientationTokens = {
  padding: {
    portrait: { mobile: "8px", tablet: "12px" },
    landscape: { mobile: "6px", tablet: "10px" }
  }
};
```

## Future Enhancements

1. **Container Queries** - When browser support improves
2. **Responsive Hooks** - `useBreakpoint()`, `useResponsiveValue()`
3. **Shorthand Props** - `p={{ base: 8, md: 16, lg: 24 }}`
4. **Design Token Sync** - Auto-generate from Figma
5. **Build Optimization** - Tree-shake unused breakpoints

## Conclusion

This responsive design system provides a robust, flexible, and performant solution for mobile web development. The token-based approach ensures consistency while allowing complete customization for different use cases and dashboards.

For support, contact the Design System team.

---

*This document supersedes all previous responsive design documentation and serves as the single source of truth.*
