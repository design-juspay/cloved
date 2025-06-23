import React from 'react';
import { RadioProps, RadioSize } from './types';
import { getRadioDataState } from './utils';
import { StyledRadioInput, StyledRadioLabel, StyledRadioText } from './StyledRadio';
import Block from '../Primitives/Block/Block';
import { RadioTokensType } from './radio.token';
import { useComponentToken } from '../../context/useComponentToken';

export const Radio = ({
  id,
  value,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  error = false,
  size = RadioSize.MEDIUM,
  children,
  subtext,
  slot,
  name,
}: RadioProps) => {
  const radioTokens = useComponentToken("RADIO") as RadioTokensType;
  const generatedId = React.useId();
  const uniqueId = id || generatedId;
  
  // Determine if this is a controlled component
  const isControlled = checked !== undefined;
  
  // For controlled components, use checked; for uncontrolled, use defaultChecked
  const inputProps = isControlled 
    ? { checked: checked } 
    : { defaultChecked: defaultChecked };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  // Get the current checked state for styling purposes
  const currentChecked = isControlled ? checked : defaultChecked;

  return (
    <Block display="flex" flexDirection="column" gap={radioTokens.gap}>
      <Block display="flex" alignItems={subtext ? "flex-start" : "center"} gap={radioTokens.slotGap}>
        <StyledRadioInput
          type="radio"
          id={uniqueId}
          name={name}
          value={value}
          {...inputProps}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          data-state={getRadioDataState(currentChecked || false)}
          size={size}
          $isDisabled={disabled}
          $isChecked={currentChecked || false}
          $error={error}
        />
        
        <Block display="flex" flexDirection="column" gap={radioTokens.gap}>
          {children && (
            <StyledRadioLabel
              htmlFor={uniqueId}
              $isDisabled={disabled}
              $error={error}
            >
              <StyledRadioText
                as="span"
                fontSize={radioTokens.content.label.font[size].fontSize}
                fontWeight={radioTokens.content.label.font[size].fontWeight}
                $isDisabled={disabled}
                $error={error}
              >
                {children}
                {required && (
                  <StyledRadioText
                    as="span"
                    $error={error}
                    $isDisabled={disabled}
                    $margin={`0 0 0 ${radioTokens.slotGap}`}
                  >
                    *
                  </StyledRadioText>
                )}
              </StyledRadioText>
            </StyledRadioLabel>
          )}
          {subtext && (
            <StyledRadioText
              as="span"
              fontSize={radioTokens.content.sublabel.font[size].fontSize}
              fontWeight={radioTokens.content.sublabel.font[size].fontWeight}
              $isDisabled={disabled}
              $error={error}
              $isSubtext={true}
            >
              {subtext}
            </StyledRadioText>
          )}
        </Block>
        {slot && (
          <Block 
            as="span" 
            width={radioTokens.slot.size[size]}
          >
            {slot}
          </Block>
        )}
      </Block>
    </Block>
  );
};

Radio.displayName = 'Radio';

export default Radio;
