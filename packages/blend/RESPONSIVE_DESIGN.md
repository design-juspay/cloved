# Responsive Design System

This document outlines the responsive design implementation in the Blend design system.

## Overview

The responsive design system allows components to adapt their styles based on viewport size using a mobile-first approach. Any style property can accept either a static value or a responsive object with breakpoint-specific values.

## Breakpoints

```typescript
// packages/blend/lib/tokens/breakpoints.tokens.ts
export const BREAKPOINTS = {
  mobile: 0,      // 0px and up
  tablet: 768,    // 768px and up
  desktop: 1024,  // 1024px and up
} as const;
```

## Type System

### ResponsiveValue Type

```typescript
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Examples:
// Static value: "16px"
// Responsive value: { mobile: "14px", tablet: "16px", desktop: "18px" }
```

### Type Guard

```typescript
export const isResponsiveValue = <T>(
  value: ResponsiveValue<T>
): value is Partial<Record<Breakpoint, T>> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    ('mobile' in value || 'tablet' in value || 'desktop' in value)
  );
};
```

## Responsive Utilities

### createResponsiveStyles

Converts responsive values into CSS with media queries:

```typescript
import { createResponsiveStyles } from '../utils/responsive.utils';

// Input:
createResponsiveStyles('padding', {
  mobile: '12px',
  tablet: '16px',
  desktop: '20px'
})

// Output:
{
  padding: '12px',
  '@media (min-width: 768px)': { padding: '16px' },
  '@media (min-width: 1024px)': { padding: '20px' }
}
```

## Implementation in Components

### PrimitiveButton

The PrimitiveButton component supports responsive values for all style properties:

```typescript
// packages/blend/lib/components/Primitives/PrimitiveButton/PrimitiveButton.tsx

type PrimitiveButtonProps = {
  // Spacing
  padding?: ResponsiveValue<CSSObject["padding"]>;
  margin?: ResponsiveValue<CSSObject["margin"]>;
  
  // Sizing
  width?: ResponsiveValue<CSSObject["width"]>;
  height?: ResponsiveValue<CSSObject["height"]>;
  minHeight?: ResponsiveValue<CSSObject["minHeight"]>;
  
  // Typography
  fontSize?: ResponsiveValue<CSSObject["fontSize"]>;
  fontWeight?: ResponsiveValue<CSSObject["fontWeight"]>;
  
  // Visual
  background?: ResponsiveValue<CSSObject["background"]>;
  color?: ResponsiveValue<CSSObject["color"]>;
  borderRadius?: ResponsiveValue<CSSObject["borderRadius"]>;
  
  // ... and many more
};
```

### ButtonV2 Integration

ButtonV2 uses responsive tokens and passes them to PrimitiveButton:

```typescript
// packages/blend/lib/components/ButtonV2/button.tokens.ts

export const buttonTokens = {
  padding: {
    sm: {
      default: {
        mobile: "4px 8px",
        tablet: "6px 16px",
        desktop: "8px 20px"
      }
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

## Usage Examples

### Using ButtonV2 (Automatic Responsive Behavior)

```jsx
import { ButtonV2, ButtonSizeV2, ButtonTypeV2 } from 'blend-v1';

// The button automatically adapts based on viewport
<ButtonV2
  text="Click Me"
  size={ButtonSizeV2.MEDIUM}
  buttonType={ButtonTypeV2.PRIMARY}
/>
```

### Using PrimitiveButton with Custom Responsive Values

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
  minHeight={{
    mobile: "40px",
    tablet: "48px",
    desktop: "56px"
  }}
  background="#007bff"
  color="white"
  borderRadius="4px"
>
  Custom Responsive Button
</PrimitiveButton>
```

### Mixed Static and Responsive Values

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

## Styled Components Integration

The responsive system uses styled-components' `css` helper to ensure media queries are properly processed:

```typescript
const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})<PrimitiveButtonProps>`
  ${(props) => {
    const base = getStyles(props);
    const stateStyles = /* ... */;
    
    // The css helper ensures media queries work correctly
    return css({ ...base, ...stateStyles });
  }}
`;
```

## Best Practices

1. **Mobile-First**: Always design for mobile first, then enhance for larger screens
2. **Consistent Breakpoints**: Use the predefined breakpoints for consistency
3. **Type Safety**: Leverage TypeScript's type system with `ResponsiveValue<T>`
4. **Performance**: CSS media queries are more performant than JavaScript-based solutions
5. **Progressive Enhancement**: Start with a good mobile experience and add complexity for larger screens

## Adding Responsive Support to Other Components

To add responsive support to other components:

1. Import the necessary types and utilities:
   ```typescript
   import { ResponsiveValue } from '../tokens/breakpoints.tokens';
   import { createResponsiveStyles } from '../utils/responsive.utils';
   ```

2. Update prop types to accept `ResponsiveValue<T>`:
   ```typescript
   type MyComponentProps = {
     spacing?: ResponsiveValue<string>;
     size?: ResponsiveValue<number>;
   };
   ```

3. Use `createResponsiveStyles` in your styled component:
   ```typescript
   const StyledComponent = styled.div<MyComponentProps>`
     ${(props) => css({
       ...createResponsiveStyles('padding', props.spacing),
       ...createResponsiveStyles('width', props.size),
     })}
   `;
   ```

## Future Enhancements

- Add support for custom breakpoints per component
- Implement responsive props for more components (Text, Layout, etc.)
- Add responsive utilities for common patterns (hide/show at breakpoints)
- Create responsive hooks for JavaScript-based responsive behavior
