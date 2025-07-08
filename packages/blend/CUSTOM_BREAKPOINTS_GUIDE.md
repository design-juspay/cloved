# Custom Breakpoints Guide

This guide explains how to define custom breakpoints and use them in your application.

## Current System (Default Breakpoints)

The default breakpoints are defined in `packages/blend/lib/tokens/breakpoints.tokens.ts`:

```typescript
export const BREAKPOINTS = {
  mobile: 0,      // 0px and up
  tablet: 768,    // 768px and up
  desktop: 1024,  // 1024px and up
} as const;
```

## Option 1: Override Default Breakpoints via Theme

You can override the default breakpoints through the theme system:

```typescript
// In your app's theme configuration
import { ThemeProvider } from 'blend-v1';

const customTheme = {
  // ... other theme tokens
  breakpoints: {
    mobile: 0,
    tablet: 640,    // Custom tablet breakpoint
    desktop: 1280,  // Custom desktop breakpoint
  }
};

// Wrap your app
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

## Option 2: Define Custom Breakpoint Tokens

You can define your own breakpoint tokens that work with the existing system:

```typescript
// myBreakpoints.ts
export const MY_BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

// Create responsive tokens
export const myButtonTokens = {
  padding: {
    small: {
      xs: "2px 4px",
      sm: "4px 8px",
      md: "6px 12px",
      lg: "8px 16px",
      xl: "10px 20px"
    }
  }
};
```

## Option 3: Use Responsive Values Directly

The most flexible approach is to pass responsive values directly to components:

```jsx
// Using default breakpoints
<PrimitiveButton
  padding={{
    mobile: "8px 16px",
    tablet: "12px 24px",
    desktop: "16px 32px"
  }}
>
  Default Breakpoints
</PrimitiveButton>

// Using custom breakpoint-like values
// (You would need to extend the type system for this)
<PrimitiveButton
  padding={{
    0: "8px 16px",      // 0px and up
    640: "12px 24px",   // 640px and up
    1280: "16px 32px"   // 1280px and up
  }}
>
  Custom Breakpoints
</PrimitiveButton>
```

## Option 4: Create Custom Responsive Components

For complete control, create wrapper components with your custom breakpoints:

```typescript
// CustomResponsiveButton.tsx
import { PrimitiveButton } from 'blend-v1';
import styled from 'styled-components';

const CustomResponsiveButton = styled(PrimitiveButton)`
  /* XS: 0-479px */
  padding: 4px 8px;
  font-size: 12px;
  
  /* SM: 480-767px */
  @media (min-width: 480px) {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  /* MD: 768-1023px */
  @media (min-width: 768px) {
    padding: 8px 16px;
    font-size: 16px;
  }
  
  /* LG: 1024-1439px */
  @media (min-width: 1024px) {
    padding: 10px 20px;
    font-size: 18px;
  }
  
  /* XL: 1440px+ */
  @media (min-width: 1440px) {
    padding: 12px 24px;
    font-size: 20px;
  }
`;
```

## Option 5: Extend the Type System (Advanced)

To fully support custom breakpoints, you can extend the type system:

```typescript
// customBreakpoints.types.ts
export type CustomBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CustomResponsiveValue<T> = T | Partial<Record<CustomBreakpoint, T>>;

// Extend the utility function
export const createCustomResponsiveStyles = (
  propName: string,
  value: CustomResponsiveValue<unknown>,
  breakpoints: Record<CustomBreakpoint, number>
): CSSObject => {
  // Implementation similar to createResponsiveStyles
  // but using custom breakpoints
};
```

## Practical Examples

### Example 1: Using Theme-Level Custom Breakpoints

```jsx
// App.tsx
import { ThemeProvider } from 'blend-v1';
import { customTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* All ButtonV2 components will use custom breakpoints */}
      <ButtonV2 
        text="Custom Breakpoints"
        size={ButtonSizeV2.MEDIUM}
      />
    </ThemeProvider>
  );
}
```

### Example 2: Component-Level Custom Tokens

```jsx
// CustomButton.tsx
import { PrimitiveButton } from 'blend-v1';

const customSizeTokens = {
  small: {
    mobile: { padding: "4px 8px", fontSize: "12px" },
    tablet: { padding: "6px 12px", fontSize: "14px" },
    desktop: { padding: "8px 16px", fontSize: "16px" }
  },
  // Define for custom breakpoints
  smallCustom: {
    320: { padding: "3px 6px", fontSize: "11px" },
    640: { padding: "5px 10px", fontSize: "13px" },
    1280: { padding: "7px 14px", fontSize: "15px" }
  }
};

export const CustomButton = ({ size = 'small', ...props }) => {
  const tokens = customSizeTokens[size];
  
  return (
    <PrimitiveButton
      padding={tokens.mobile.padding}
      fontSize={tokens.mobile.fontSize}
      {...props}
    />
  );
};
```

### Example 3: Using CSS Variables for Dynamic Breakpoints

```jsx
// DynamicBreakpointButton.tsx
import styled from 'styled-components';
import { PrimitiveButton } from 'blend-v1';

const DynamicButton = styled(PrimitiveButton)`
  /* Use CSS variables that can be set dynamically */
  @media (min-width: var(--breakpoint-tablet, 768px)) {
    padding: var(--padding-tablet, 10px 20px);
    font-size: var(--font-tablet, 16px);
  }
  
  @media (min-width: var(--breakpoint-desktop, 1024px)) {
    padding: var(--padding-desktop, 12px 24px);
    font-size: var(--font-desktop, 18px);
  }
`;

// Usage
<div style={{
  '--breakpoint-tablet': '640px',
  '--breakpoint-desktop': '1280px',
  '--padding-tablet': '8px 16px',
  '--padding-desktop': '10px 20px'
}}>
  <DynamicButton>Dynamic Breakpoints</DynamicButton>
</div>
```

## Best Practices

1. **Consistency**: Use the same breakpoints across your application
2. **Mobile-First**: Start with mobile styles and enhance for larger screens
3. **Token-Based**: Define breakpoint values in tokens for reusability
4. **Type Safety**: Extend TypeScript types when using custom breakpoints
5. **Performance**: Avoid too many breakpoints to keep CSS size manageable

## Future Enhancement Ideas

1. **Dynamic Breakpoint Provider**: A context that allows runtime breakpoint configuration
2. **Breakpoint Hooks**: `useBreakpoint()` hook for JavaScript-based responsive behavior
3. **Responsive Props Helper**: Utility to generate responsive props from custom breakpoints
4. **Build-Time Optimization**: Generate only used breakpoint CSS
