import styled, { css } from 'styled-components';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckboxSize, CheckboxCheckedState, CheckboxInteractionState } from './types';
import { useComponentToken } from '../../context/useComponentToken'; // Or '../../context/ThemeContext'
import { CheckboxTokensType } from './checkbox.token';

const getInteractionState = (
  isDisabled: boolean, 
  error?: boolean
  // isHovered is not used here as hover styles are applied directly in &:hover
): Exclude<CheckboxInteractionState, 'hover'> => {
  if (isDisabled) return 'disabled';
  if (error) return 'error';
  // Note: hover state for background/border is handled separately in &:hover
  return 'default';
};


export const StyledCheckboxRoot = styled(CheckboxPrimitive.Root)<{
  size: CheckboxSize;
  $isDisabled: boolean;
  $checked: boolean | 'indeterminate';
  $error?: boolean;
}>`
  all: unset; /* Reset all styles for better cross-browser consistency */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  ${({ size, $isDisabled, $checked, $error }) => {
    const tokens = useComponentToken("CHECKBOX") as CheckboxTokensType;
    const currentCheckedState: CheckboxCheckedState = $checked === 'indeterminate' ? 'indeterminate' : $checked ? 'checked' : 'unchecked';
    const currentInteractionState = getInteractionState($isDisabled, $error);
    
    return css`
      border-radius: ${tokens.indicator.border.radius};
      background-color: ${tokens.indicator.background[currentCheckedState]?.[currentInteractionState]};
      border-width: ${tokens.indicator.border.width};
      border-style: solid;
      border-color: ${tokens.indicator.border.color[currentCheckedState]?.[currentInteractionState]};
      width: ${tokens.indicator.size[size].width};
      height: ${tokens.indicator.size[size].height};
      margin: 0;
      padding: 0;
      margin-right: ${tokens.checkboxMarginRight};
      flex-shrink: 0;
      transition: all ${tokens.transition.duration} ${tokens.transition.easing};

      &:focus-visible {
        outline: ${tokens.indicator.focus.outlineWidth} solid ${tokens.indicator.focus.outlineColor};
        outline-offset: ${tokens.indicator.focus.outlineOffset};
        box-shadow: ${tokens.indicator.focus.boxShadow};
      }

      &:not([disabled]):hover {
        background-color: ${tokens.indicator.background[currentCheckedState]?.hover};
        border-color: ${tokens.indicator.border.color[currentCheckedState]?.hover};
      }

      ${$isDisabled && css`
        opacity: 0.7; // Or use token: tokens.opacity.disabled or similar if available
        cursor: not-allowed;
      `}

      ${!$isDisabled && css`
        cursor: pointer;
      `}
    `;
  }}
`;

export const StyledCheckboxIndicator = styled(CheckboxPrimitive.Indicator)<{
  size: CheckboxSize; // size might be used if indicator has size-specific styles not covered by root
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* Icon color is set in Checkbox.tsx as it depends on more states */
  
  ${() => { // Removed 'theme' as it's not used and useComponentToken is used instead
    const tokens = useComponentToken("CHECKBOX") as CheckboxTokensType;
    return css`
      &[data-state="checked"], &[data-state="indeterminate"] {
        animation: scale-in ${tokens.transition.duration} ${tokens.transition.easing};
      }
      
      &[data-state="unchecked"] {
        animation: scale-out ${tokens.transition.duration} ${tokens.transition.easing};
      }
    `;
  }}
  
  @keyframes scale-in {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes scale-out {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(0.8);
      opacity: 0;
    }
  }
`;

export const StyledLabel = styled.label<{
  $isDisabled: boolean;
  $error?: boolean;
}>`
  color: ${({ $isDisabled, $error }) => {
    const tokens = useComponentToken("CHECKBOX") as CheckboxTokensType;
    const interactionState = getInteractionState($isDisabled, $error);
    return tokens.content.label.color[interactionState];
  }};
  /* Font weight and size are applied in Checkbox.tsx via PrimitiveText */
  cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  
  /* Reset any inherited spacing that could affect alignment */
  & > span {
    line-height: 1;
    display: block;
    margin: 0;
    padding: 0;
  }
  
  /* Reset any nested spans as well */
  & span {
    margin: 0 !important;
    padding: 0 !important;
  }
`;
