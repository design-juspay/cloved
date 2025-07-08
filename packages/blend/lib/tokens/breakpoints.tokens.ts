/**
 * Breakpoint tokens for responsive design
 * Mobile-first approach with standard breakpoints
 */

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export const MEDIA_QUERIES = {
  mobile: `@media (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop}px)`,
  // Utility queries
  mobileOnly: `@media (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tabletOnly: `@media (min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  tabletAndUp: `@media (min-width: ${BREAKPOINTS.tablet}px)`,
  desktopOnly: `@media (min-width: ${BREAKPOINTS.desktop}px)`,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Helper to check if a value is responsive
 */
export const isResponsiveValue = <T>(value: unknown): value is Partial<Record<Breakpoint, T>> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    ('mobile' in value || 
     'tablet' in value || 
     'desktop' in value)
  );
};
