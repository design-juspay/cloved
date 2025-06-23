import { CSSObject } from "styled-components"; // Removed css import
import { TabsVariant, TabsSize } from "./types";
import { TabsTokensType, TabsInteractionState } from "./tabs.token"; 
// import { foundationToken } from "../../tokens"; 

// Note: Most of these utility functions will be simplified or removed.
// Styles will be applied directly in StyledTabs.tsx using the new token structure.
// These are kept for reference during refactoring or if some complex logic remains.

export const getBaseTabsStyles = (tokens: TabsTokensType): CSSObject => ({
  width: tokens.rootLayout?.width || "100%",
});

export const getBaseTabsContentStyles = (tokens: TabsTokensType): CSSObject => ({
  width: "100%",
  outline: "none",
  // willChange: "none", // 'none' is not a valid value for will-change
  position: "relative",
  padding: tokens.content?.padding,
  marginTop: tokens.content?.marginTop,
  animationDuration: tokens.content?.animation?.duration,
  animationTimingFunction: tokens.content?.animation?.timingFunction,
});

export const getBaseTabsListStyles = (tokens: TabsTokensType, variant: TabsVariant): CSSObject => ({
  display: tokens.list.layout[variant]?.display || "flex",
  width: tokens.list.layout[variant]?.width || "100%",
  alignItems: tokens.list.layout[variant]?.alignItems || "center",
  gap: tokens.list.layout[variant]?.gap,
  border: "none", // Base, specific borders per variant
  position: "relative",
  padding: tokens.list.layout[variant]?.padding,
  backgroundColor: tokens.list.layout[variant]?.backgroundColor,
  borderRadius: tokens.list.layout[variant]?.borderRadius,
  borderBottomWidth: tokens.list.layout[variant]?.borderBottomWidth,
  borderBottomColor: tokens.list.layout[variant]?.borderBottomColor,
  // Add zIndex for underline variant if needed, directly in styled component
});


export const getTabsListExpandedStyles = (tokens: TabsTokensType, expanded: boolean): CSSObject => {
  if (!expanded) return {};
  return {
    justifyContent: tokens.list.expandedLayout?.justifyContent || "space-between",
    // Child flex styling will be handled in StyledTabsList directly
  };
};

export const getBaseTabsTriggerStyles = (tokens: TabsTokensType, variant: TabsVariant, size: TabsSize, state: TabsInteractionState = 'default'): CSSObject => {
  // Ensure state used for color/background is valid for those token properties
  const colorState: Extract<TabsInteractionState, 'default' | 'hover' | 'active' | 'disabled'> = 
    state === 'focus' ? 'default' : state; // Focus uses default color, focus styling is separate
  const bgState: Extract<TabsInteractionState, 'default' | 'hover' | 'active'> =
    state === 'focus' || state === 'disabled' ? 'default' : state; // Focus/disabled use default bg

  const currentVariantColor = tokens.trigger.color[variant];
  const currentFontVariant = tokens.trigger.font[variant];
  const currentBgVariant = tokens.trigger.background[variant];

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    padding: `0 ${tokens.trigger.size[size]?.paddingX || '0px'}`,
    fontSize: tokens.trigger.size[size]?.fontSize,
    fontWeight: currentFontVariant?.[state === 'active' ? 'active' : 'default']?.fontWeight,
    color: currentVariantColor?.[colorState],
    backgroundColor: currentBgVariant?.[bgState],
    transition: `all ${tokens.transition?.duration || '0.2s'} ${tokens.transition?.easing || 'ease-in-out'}`,
    outline: "none",
    position: "relative",
    border: "none", // Base, specific borders per variant/state
    borderRadius: tokens.trigger.border[variant]?.radius,
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: state === 'disabled' ? tokens.trigger.disabledOpacity : 1,
    // Active underline styles will be handled with ::after in StyledTabsTrigger
  };
};

// getTabsTriggerSizeStyles can be merged into getBaseTabsTriggerStyles or applied directly
// export const getTabsTriggerSizeStyles = (tokens: TabsTokensType, size: TabsSize): CSSObject => ({
//   height: tokens.trigger.size[size]?.height,
// });

export const getTabsTriggerFocusStyles = (tokens: TabsTokensType): CSSObject => ({
    // Using ring for focus as per original utils
    outline: 'none', // Important to reset default outline
    boxShadow: `0 0 0 ${tokens.trigger.focus?.ringWidth || '2px'} ${tokens.trigger.focus?.ringColor}`,
    // For ring-offset, it's better to use pseudo-elements or an extra wrapper if needed,
    // as 'ring-offset' is a Tailwind utility, not a standard CSS property.
    // Alternatively, use outline with outline-offset:
    // outline: `${tokens.trigger.focus?.outlineWidth} solid ${tokens.trigger.focus?.outlineColor}`,
    // outlineOffset: tokens.trigger.focus?.outlineOffset,
});

// getTabsTriggerDisabledStyles is now part of getBaseTabsTriggerStyles (opacity and pointer-events)

// getTabsTriggerVariantStyles will be largely handled by direct token access in StyledTabsTrigger
// This function might transform into a helper for complex conditional logic if any remains.

export const getIconContainerStyles = (tokens: TabsTokensType): CSSObject => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.trigger.iconSpacing?.gap, // This applies gap if IconContainer wraps icon + text
                                       // If IconContainer is just for the icon, margin is applied in TabsTrigger.tsx
});
