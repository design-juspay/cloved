import { CSSObject } from "styled-components";
import { MEDIA_QUERIES, ResponsiveValue, isResponsiveValue, Breakpoint } from "../tokens/breakpoints.tokens";

/**
 * Creates responsive CSS styles for a given property and value
 * Supports both single values and responsive objects
 * 
 * @example
 * createResponsiveStyles('padding', { mobile: '12px', desktop: '24px' })
 * // Returns:
 * // {
 * //   padding: '12px',
 * //   '@media (min-width: 1024px)': { padding: '24px' }
 * // }
 */
export const createResponsiveStyles = (
  propName: string,
  value: ResponsiveValue<unknown>
): CSSObject => {
  if (!isResponsiveValue(value)) {
    // Single value - apply to all breakpoints
    return { [propName]: value } as CSSObject;
  }

  const styles: CSSObject = {};
  
  // Mobile-first approach: mobile is the default
  if ('mobile' in value && value.mobile !== undefined) {
    (styles as Record<string, unknown>)[propName] = value.mobile;
  }
  
  // Tablet override - applies to tablet and up
  if ('tablet' in value && value.tablet !== undefined) {
    styles[MEDIA_QUERIES.tabletAndUp] = {
      ...(styles[MEDIA_QUERIES.tabletAndUp] as CSSObject || {}),
      [propName]: value.tablet
    } as CSSObject;
  }
  
  // Desktop override - applies to desktop and up
  if ('desktop' in value && value.desktop !== undefined) {
    styles[MEDIA_QUERIES.desktop] = {
      ...(styles[MEDIA_QUERIES.desktop] as CSSObject || {}),
      [propName]: value.desktop
    } as CSSObject;
  }
  
  return styles;
};

/**
 * Creates responsive styles for multiple properties at once
 * 
 * @example
 * createResponsiveStylesMultiple({
 *   padding: { mobile: '12px', desktop: '24px' },
 *   fontSize: { mobile: '14px', desktop: '16px' }
 * })
 */
export const createResponsiveStylesMultiple = (
  props: Record<string, ResponsiveValue<unknown>>
): CSSObject => {
  const combinedStyles: CSSObject = {};
  
  Object.entries(props).forEach(([propName, value]) => {
    if (value !== undefined) {
      const responsiveStyles = createResponsiveStyles(propName, value);
      
      // Merge styles, combining media queries
      Object.entries(responsiveStyles).forEach(([key, styleValue]) => {
        if (key.startsWith('@media')) {
          combinedStyles[key] = {
            ...(combinedStyles[key] as CSSObject || {}),
            ...(styleValue as CSSObject)
          };
        } else {
          combinedStyles[key] = styleValue;
        }
      });
    }
  });
  
  return combinedStyles;
};

/**
 * Helper to get the current breakpoint value from a responsive value
 * Useful for runtime calculations
 */
export const getBreakpointValue = <T>(
  value: ResponsiveValue<T>,
  breakpoint: Breakpoint
): T | undefined => {
  if (!isResponsiveValue(value)) {
    return value;
  }
  
  // Return the value for the specific breakpoint, or fall back to smaller breakpoints
  if (breakpoint === 'desktop' && value.desktop !== undefined) return value.desktop;
  if (breakpoint === 'desktop' && value.tablet !== undefined) return value.tablet;
  if (breakpoint === 'desktop' && value.mobile !== undefined) return value.mobile;
  
  if (breakpoint === 'tablet' && value.tablet !== undefined) return value.tablet;
  if (breakpoint === 'tablet' && value.mobile !== undefined) return value.mobile;
  
  if (breakpoint === 'mobile' && value.mobile !== undefined) return value.mobile;
  
  return undefined;
};

/**
 * Converts a single value to a responsive value object
 * Useful for backward compatibility
 */
export const toResponsiveValue = <T>(value: ResponsiveValue<T>): Partial<Record<Breakpoint, T>> => {
  if (isResponsiveValue(value)) {
    return value;
  }
  
  // Apply the single value to all breakpoints
  return {
    mobile: value,
    tablet: value,
    desktop: value
  };
};
