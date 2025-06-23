import styled, { css } from 'styled-components';
import { SwitchSize } from './types';
import { FOUNDATION_THEME } from '../../tokens';
import { useComponentToken } from "../../context/useComponentToken";
import { SwitchTokensType } from './switch.token';

export const StyledSwitchRoot = styled.button<{
  size: SwitchSize;
  $isDisabled: boolean;
  $isChecked: boolean;
  $error?: boolean;
}>`
  ${({ size, $isDisabled, $isChecked }) => {
    const tokens = useComponentToken('SWITCH') as SwitchTokensType;
    return css`
      position: relative;
      border-radius: ${tokens.borderRadius.base};
      border: none;
      outline: none;
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      transition: background-color ${tokens.transition.duration} ${tokens.transition.easing};
      
      /* Reset all margin and padding */
      margin: 0;
      padding: 0;
      margin-right: ${tokens.gap};
      
      /* Prevent any inherited spacing */
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      
      width: ${tokens.width[size]};
      height: ${tokens.height[size]};
      
      background-color: ${$isDisabled
        ? ($isChecked ? tokens.indicator.active.background.disabled : tokens.indicator.inactive.background.disabled)
        : ($isChecked ? tokens.indicator.active.background.default : tokens.indicator.inactive.background.default)
      };
      
      /* Improved focus styles for better accessibility */
      &:focus-visible {
        outline: ${tokens.focus.outline.width} solid ${tokens.focus.outline.color};
        outline-offset: ${tokens.focus.outline.offset};
        box-shadow: ${FOUNDATION_THEME.shadows.sm};
      }
      
      ${$isDisabled && css`opacity: 0.7;`}
      
      ${!$isDisabled && css`
        &:hover {
          opacity: 0.9;
        }
      `}
    `;
  }}
`;

export const StyledSwitchThumb = styled.div<{
  size: SwitchSize;
  $isChecked: boolean;
}>`
  ${({ size, $isChecked }) => {
    const tokens = useComponentToken('SWITCH') as SwitchTokensType;
    return css`
      position: absolute;
      top: ${tokens.thumb.size[size].top};
      border-radius: ${tokens.borderRadius.thumb};
      background-color: ${tokens.thumb.background};
      border: ${tokens.thumb.border.width} solid ${tokens.thumb.border.color};
      transition: transform ${tokens.transition.duration} ${tokens.transition.easing};
      
      width: ${tokens.thumb.size[size].width};
      height: ${tokens.thumb.size[size].height};
      
      transform: translateX(${$isChecked ? tokens.thumb.size[size].offset.active : tokens.thumb.size[size].offset.inactive});
    `;
  }}
`;

export const StyledSwitchLabel = styled.label<{
  $isDisabled: boolean;
  $error?: boolean;
}>`
  ${({ $isDisabled, $error }) => {
    const tokens = useComponentToken('SWITCH') as SwitchTokensType;
    return css`
      color: ${$error 
        ? tokens.content.label.color.error 
        : $isDisabled 
          ? tokens.content.label.color.disabled 
          : tokens.content.label.color.default};
      font-weight: ${tokens.content.label.font.md.fontWeight};
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
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
  }}
`;

export const StyledSwitchGroupLabel = styled.div`
  ${() => {
    const tokens = useComponentToken('SWITCH') as SwitchTokensType;
    return css`
      color: ${tokens.content.label.color.default};
      font-weight: ${tokens.content.label.font.md.fontWeight};
      margin-bottom: ${tokens.gap};
    `;
  }}
`;