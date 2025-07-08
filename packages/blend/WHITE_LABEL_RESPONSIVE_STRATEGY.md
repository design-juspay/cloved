# White-Label Component Library: Responsive Design Strategy

## Best Approach for White-Label Use Case

For a white-labeled component library that will be used by multiple clients with different brand requirements, the **Token-Based Approach with Theme Override** is the most suitable solution.

## Recommended Architecture

### 1. Core Implementation (Library Level)

```typescript
// packages/blend/lib/tokens/responsive.tokens.ts
export interface ResponsiveTokens {
  breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
    // Allow additional breakpoints
    [key: string]: number;
  };
  // Component-specific responsive tokens
  button: {
    padding: Record<string, ResponsiveValue<string>>;
    fontSize: Record<string, ResponsiveValue<string>>;
    minHeight: Record<string, ResponsiveValue<string>>;
  };
  // Add more components as needed
}

// Default tokens that can be overridden
export const DEFAULT_RESPONSIVE_TOKENS: ResponsiveTokens = {
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
  button: {
    padding: {
      sm: { mobile: "4px 8px", tablet: "6px 16px", desktop: "8px 20px" },
      md: { mobile: "6px 12px", tablet: "10px 20px", desktop: "12px 24px" },
      lg: { mobile: "8px 16px", tablet: "12px 24px", desktop: "16px 32px" },
    },
    fontSize: {
      sm: { mobile: "12px", tablet: "14px", desktop: "14px" },
      md: { mobile: "14px", tablet: "16px", desktop: "18px" },
      lg: { mobile: "16px", tablet: "18px", desktop: "20px" },
    },
    minHeight: {
      sm: { mobile: "32px", tablet: "36px", desktop: "40px" },
      md: { mobile: "36px", tablet: "44px", desktop: "48px" },
      lg: { mobile: "40px", tablet: "48px", desktop: "56px" },
    },
  },
};
```

### 2. Theme Provider Enhancement

```typescript
// packages/blend/lib/context/ResponsiveThemeProvider.tsx
import React, { createContext, useContext } from 'react';
import { ResponsiveTokens, DEFAULT_RESPONSIVE_TOKENS } from '../tokens/responsive.tokens';
import { deepMerge } from '../utils/deepMerge';

interface ResponsiveThemeContextValue {
  tokens: ResponsiveTokens;
  getBreakpoint: (name: string) => number;
  getResponsiveValue: <T>(
    componentName: string,
    propName: string,
    size: string
  ) => ResponsiveValue<T>;
}

const ResponsiveThemeContext = createContext<ResponsiveThemeContextValue | null>(null);

export const ResponsiveThemeProvider: React.FC<{
  tokens?: Partial<ResponsiveTokens>;
  children: React.ReactNode;
}> = ({ tokens = {}, children }) => {
  // Merge custom tokens with defaults
  const mergedTokens = deepMerge(DEFAULT_RESPONSIVE_TOKENS, tokens);

  const getBreakpoint = (name: string) => {
    return mergedTokens.breakpoints[name] || 0;
  };

  const getResponsiveValue = (componentName: string, propName: string, size: string) => {
    return mergedTokens[componentName]?.[propName]?.[size];
  };

  return (
    <ResponsiveThemeContext.Provider
      value={{ tokens: mergedTokens, getBreakpoint, getResponsiveValue }}
    >
      {children}
    </ResponsiveThemeContext.Provider>
  );
};

export const useResponsiveTheme = () => {
  const context = useContext(ResponsiveThemeContext);
  if (!context) {
    throw new Error('useResponsiveTheme must be used within ResponsiveThemeProvider');
  }
  return context;
};
```

### 3. Component Implementation

```typescript
// Enhanced ButtonV2 that uses theme tokens
const ButtonV2: React.FC<ButtonV2Props> = ({ size, ...props }) => {
  const { getResponsiveValue } = useResponsiveTheme();
  
  const padding = getResponsiveValue('button', 'padding', size);
  const fontSize = getResponsiveValue('button', 'fontSize', size);
  const minHeight = getResponsiveValue('button', 'minHeight', size);
  
  return (
    <PrimitiveButton
      padding={padding}
      fontSize={fontSize}
      minHeight={minHeight}
      {...props}
    />
  );
};
```

## Client Implementation Examples

### Client A: E-commerce Platform
```typescript
// client-a-theme.ts
const clientATheme = {
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1280,  // Wider desktop breakpoint
    wide: 1920      // Additional breakpoint
  },
  button: {
    padding: {
      sm: { mobile: "6px 12px", tablet: "8px 16px", desktop: "10px 20px", wide: "12px 24px" },
      md: { mobile: "8px 16px", tablet: "12px 24px", desktop: "16px 32px", wide: "20px 40px" },
      lg: { mobile: "12px 24px", tablet: "16px 32px", desktop: "20px 40px", wide: "24px 48px" },
    },
    // Larger fonts for better readability
    fontSize: {
      sm: { mobile: "14px", tablet: "16px", desktop: "16px", wide: "18px" },
      md: { mobile: "16px", tablet: "18px", desktop: "20px", wide: "22px" },
      lg: { mobile: "18px", tablet: "20px", desktop: "22px", wide: "24px" },
    },
  },
};

// App.tsx
<ResponsiveThemeProvider tokens={clientATheme}>
  <App />
</ResponsiveThemeProvider>
```

### Client B: Mobile-First SaaS
```typescript
// client-b-theme.ts
const clientBTheme = {
  breakpoints: {
    mobile: 0,
    phablet: 480,   // Additional mobile breakpoint
    tablet: 768,
    desktop: 1024
  },
  button: {
    // Optimized for touch with larger tap targets on mobile
    padding: {
      sm: { mobile: "8px 16px", phablet: "8px 16px", tablet: "6px 12px", desktop: "6px 12px" },
      md: { mobile: "12px 24px", phablet: "12px 24px", tablet: "10px 20px", desktop: "10px 20px" },
      lg: { mobile: "16px 32px", phablet: "16px 32px", tablet: "14px 28px", desktop: "14px 28px" },
    },
    minHeight: {
      sm: { mobile: "44px", phablet: "40px", tablet: "36px", desktop: "36px" },
      md: { mobile: "48px", phablet: "44px", tablet: "40px", desktop: "40px" },
      lg: { mobile: "56px", phablet: "52px", tablet: "48px", desktop: "48px" },
    },
  },
};
```

### Client C: Enterprise Dashboard
```typescript
// client-c-theme.ts
const clientCTheme = {
  breakpoints: {
    mobile: 0,
    tablet: 1024,    // Skip tablet, go straight to desktop
    desktop: 1024,
    ultrawide: 2560  // Support ultra-wide monitors
  },
  button: {
    // Compact design for data-dense interfaces
    padding: {
      sm: { mobile: "2px 6px", tablet: "3px 8px", desktop: "3px 8px", ultrawide: "4px 10px" },
      md: { mobile: "4px 10px", tablet: "5px 12px", desktop: "5px 12px", ultrawide: "6px 14px" },
      lg: { mobile: "6px 14px", tablet: "7px 16px", desktop: "7px 16px", ultrawide: "8px 18px" },
    },
  },
};
```

## Why This Approach is Best for White-Label

### 1. **Complete Customization**
- Clients can define their own breakpoints
- All responsive values can be overridden
- New breakpoints can be added without modifying library code

### 2. **Type Safety**
- TypeScript ensures correct token structure
- Autocomplete for available tokens
- Compile-time validation

### 3. **Performance**
- CSS is generated at build time
- No runtime calculations
- Minimal JavaScript overhead

### 4. **Maintainability**
- Single source of truth for responsive behavior
- Easy to update across all components
- Clear separation between library and client code

### 5. **Scalability**
- Easy to add new components
- Consistent patterns across the library
- Supports gradual migration

## Implementation Checklist

- [ ] Create responsive token interface
- [ ] Implement theme provider with token merging
- [ ] Update components to use theme tokens
- [ ] Create default token sets
- [ ] Document token structure for clients
- [ ] Provide migration guide for existing implementations
- [ ] Create example themes for different use cases
- [ ] Add TypeScript definitions for custom tokens
- [ ] Build token validation utilities
- [ ] Create visual token editor (optional)

## Best Practices for Clients

1. **Start with Defaults**: Use the default tokens and only override what's needed
2. **Document Changes**: Keep a record of why certain breakpoints were chosen
3. **Test Thoroughly**: Ensure responsive behavior works across all target devices
4. **Use Semantic Names**: Name breakpoints based on device categories, not pixel values
5. **Consider Performance**: Don't add too many breakpoints (3-5 is usually sufficient)

## Migration Path

For existing implementations:

```typescript
// Step 1: Wrap app with provider using default tokens
<ResponsiveThemeProvider>
  <App />
</ResponsiveThemeProvider>

// Step 2: Gradually customize tokens
const customTokens = {
  breakpoints: {
    tablet: 640, // Override just tablet breakpoint
  },
};

// Step 3: Add component-specific overrides as needed
const customTokens = {
  button: {
    padding: {
      md: { mobile: "8px 16px", tablet: "12px 24px", desktop: "16px 32px" },
    },
  },
};
```

## Conclusion

The token-based approach with theme override provides the perfect balance of:
- **Flexibility** for white-label clients
- **Consistency** within each implementation
- **Maintainability** for the library team
- **Performance** for end users

This approach is used successfully by major design systems like Material-UI, Ant Design, and Chakra UI for their enterprise white-label solutions.
