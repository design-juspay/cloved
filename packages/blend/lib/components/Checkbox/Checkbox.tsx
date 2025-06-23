import React from 'react';
import { Check, Minus } from 'lucide-react';
import { CheckboxProps, CheckboxSize } from './types';
import { 
  getCheckboxDataState, 
  extractPixelValue
} from './checkboxUtils';
import {
  StyledCheckboxRoot,
  StyledCheckboxIndicator,
  StyledLabel
} from './StyledCheckbox';
import Block from '../Primitives/Block/Block';
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText';
import { useComponentToken } from '../../context/useComponentToken'; // Or '../../context/ThemeContext'
import { CheckboxTokensType } from './checkbox.token';

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      id,
      value,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      error = false,

      size = CheckboxSize.MEDIUM,
      children,
      subtext,
      slot,
    },
    ref
  ) => {
    const tokens = useComponentToken("CHECKBOX") as CheckboxTokensType;
    // TODO: This is a temporary fix to avoid the warning about useId.
    // We need to find a better solution to handle the id.
    const generatedId = React.useId();
    const uniqueId = id || generatedId;
    
    // Determine if this is a controlled component
    const isControlled = checked !== undefined;
    
    // For controlled components, use checked; for uncontrolled, use defaultChecked
    const inputProps = isControlled 
      ? { checked: checked === 'indeterminate' ? false : checked } 
      : { defaultChecked: defaultChecked };

    // Get the current checked state for styling and data purposes
    const currentChecked = isControlled ? checked : defaultChecked;

    const getIconColor = () => {
      if (disabled) {
        return currentChecked === 'indeterminate' 
          ? tokens.icon.color.indeterminate?.disabled 
          : tokens.icon.color.checked?.disabled;
      }
      return currentChecked === 'indeterminate'
        ? tokens.icon.color.indeterminate?.default
        : tokens.icon.color.checked?.default;
    };

    return (
      <Block display="flex" flexDirection="column">
        <Block display="flex" alignItems="center">
          <StyledCheckboxRoot
            ref={ref}
            id={uniqueId}
            {...inputProps}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            required={required}
            value={value}
            data-state={getCheckboxDataState(currentChecked || false)}
            data-error={error}
            size={size}
            $isDisabled={disabled}
            $checked={currentChecked || false}
            $error={error}
          >
            <StyledCheckboxIndicator
              forceMount={checked === 'indeterminate' ? true : undefined}
              size={size}
            >
              {currentChecked && (
                <Block 
                  as="span" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                >
                  {currentChecked === 'indeterminate' ? (
                    <Minus 
                      size={extractPixelValue(tokens.icon.size[size].width)}
                      color={getIconColor()}
                      strokeWidth={tokens.icon.size[size].strokeWidth}
                    />
                  ) : (
                    <Check 
                      size={extractPixelValue(tokens.icon.size[size].width)}
                      color={getIconColor()}
                      strokeWidth={tokens.icon.size[size].strokeWidth}
                    />
                  )}
                </Block>
              )}
            </StyledCheckboxIndicator>
          </StyledCheckboxRoot>
          
          {children && (
            <StyledLabel
              htmlFor={uniqueId}
              $isDisabled={disabled}
              $error={error}
            >
              <PrimitiveText
                as="span"
                fontSize={tokens.content.label.font[size].fontSize}
                fontWeight={tokens.content.label.font[size].fontWeight}
              >
                {children}
                {required && (
                  <PrimitiveText
                    as="span"
                    color={tokens.required.color}
                    margin={`0 0 0 ${tokens.required.spacing}`}
                  >
                    *
                  </PrimitiveText>
                )}
              </PrimitiveText>
            </StyledLabel>
          )}
          {slot && (
            <Block as="span" marginLeft={tokens.slotGap}>
              {slot}
            </Block>
          )}
        </Block>

        {subtext && (
          <Block 
            marginLeft={tokens.content.subtext.spacing.left[size]}
            marginTop={tokens.content.subtext.spacing.top}
          >
            <PrimitiveText
              as="span"
              color={disabled ? tokens.content.subtext.color.disabled : 
                     error ? tokens.content.subtext.color.error : 
                     tokens.content.subtext.color.default}
              fontSize={tokens.content.subtext.font[size].fontSize}
            >
              {subtext}
            </PrimitiveText>
          </Block>
        )}
      </Block>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
