import styled, { css } from 'styled-components';
import { RadioSize } from './types';

import { RadioTokensType } from './radio.token';
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText';
import { useComponentToken } from "../../context/useComponentToken";

export const StyledRadioInput = styled.input<{
  size: RadioSize;
  $isDisabled: boolean;
  $isChecked: boolean;
  $error?: boolean;
}>`
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  
  ${({ size, $isChecked, $isDisabled }) => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;
    const state = $isDisabled ? 'disabled' : 'default';
    const indicatorState = $isChecked ? 'active' : 'inactive';
    
    return css`
      background-color: ${radioTokens.indicator[indicatorState].background[state]};
      border: ${radioTokens.borderWidth[indicatorState][state]}px solid ${radioTokens.indicator[indicatorState].border[state]};
      width: ${radioTokens.height[size]};
      height: ${radioTokens.height[size]};
      
      &::after {
        content: '';
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: ${$isChecked ? radioTokens.activeIndicator.active.background[state] : 'transparent'};
        transform: ${$isChecked ? 'scale(1)' : 'scale(0)'};
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      &:focus-visible {
        outline: 2px solid ${radioTokens.indicator[indicatorState].border[state]};
        outline-offset: 2px;
      }
      
      &:not(:disabled):hover {
        background-color: ${radioTokens.indicator[indicatorState].background.hover};
        border-color: ${radioTokens.indicator[indicatorState].border.hover};
      }
      
      cursor: ${$isDisabled ? 'not-allowed' : 'pointer'};
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    `;
  }}
`;

export const StyledRadioLabel = styled.label<{
  $isDisabled: boolean;
  $error?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  min-height: ${() => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;
    return radioTokens.height.md;
  }};
  cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
  line-height: 1;
`;

export const StyledRadioText = styled(PrimitiveText)<{
  $isDisabled?: boolean;
  $error?: boolean;
  $isSubtext?: boolean;
  $margin?: string;
}>`
  ${({ $isDisabled, $error, $isSubtext, $margin }) => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;
    const state = $isDisabled ? 'disabled' : $error ? 'error' : 'default';
    
    return css`
      color: ${$isSubtext ? radioTokens.content.sublabel.color[state] : radioTokens.content.label.color[state]};
      margin: ${$margin || 0};
    `;
  }}
`;

export const StyledRadioGroupLabel = styled(PrimitiveText).attrs({ as: 'label' })`
  ${() => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;
    return css`
      color: ${radioTokens.content.label.color.default};
      margin-bottom: ${radioTokens.gap};
    `;
  }}
`; 