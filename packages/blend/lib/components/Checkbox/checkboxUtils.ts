// import { CheckboxSize } from './types'; // Not strictly needed if getSpacingBySize etc. are removed
// import { FOUNDATION_THEME } from '../../tokens'; // Not needed if token-specific utils are removed

export const getCheckboxDataState = (checked: boolean | 'indeterminate'): string => {
  if (checked === 'indeterminate') return 'indeterminate';
  return checked ? 'checked' : 'unchecked';
};

export const extractPixelValue = (tokenValue: string | number | undefined): number => {
  if (typeof tokenValue === 'number') return tokenValue;
  if (typeof tokenValue === 'string') {
    if (tokenValue.endsWith('px')) {
      return parseInt(tokenValue.replace('px', ''), 10);
    } else if (tokenValue.endsWith('rem')) {
      return parseInt(tokenValue.replace('rem', ''), 10) * 16; // Assuming 1rem = 16px
    } else if (tokenValue.endsWith('em')) {
      return parseInt(tokenValue.replace('em', ''), 10) * 16; // Assuming 1em = 16px for base
    }
    // Attempt to parse as a number if no unit, or if it's just a number string
    const parsedAsNumber = parseInt(tokenValue, 10);
    if (!isNaN(parsedAsNumber)) {
      return parsedAsNumber;
    }
  }
  return 0; // fallback for undefined or unparsable
};

// This function is not currently used in Checkbox.tsx but kept for potential future use.
// If it were to be used with the new token system, it would likely need access to the `tokens` object.
export const getAccessibilityAttributes = (uniqueId: string, isIndeterminate: boolean) => {
  return {
    role: "checkbox",
    "aria-checked": isIndeterminate ? "mixed" : undefined,
    "aria-labelledby": `${uniqueId}-label`,
    "aria-describedby": `${uniqueId}-description` // Assuming a description element exists
  };
};

// getIconSize is now handled by tokens.indicator.iconSize
// getSpacingBySize is now handled by tokens.subtext.spacing and tokens.slotGap
// getFocusRingStyles is now handled by tokens.root.focus
