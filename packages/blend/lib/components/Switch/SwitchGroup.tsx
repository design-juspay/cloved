import React, { forwardRef, useState } from 'react';
import { SwitchGroupProps, SwitchProps } from './types';
import { StyledSwitchGroupLabel } from './StyledSwitch';
import Block from '../Primitives/Block/Block';
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText';
import { Switch } from './Switch';
import { useComponentToken } from "../../context/useComponentToken";
import { SwitchTokensType } from './switch.token';

const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(
  (
    {
      id,
      label,
      name,
      defaultValue = [],
      value: controlledValue,
      children,
      onChange,
      disabled = false,
    },
    ref
  ) => {
    const tokens = useComponentToken('SWITCH') as SwitchTokensType;
    const [internalValues, setInternalValues] = useState<string[]>(defaultValue);

    const isControlled = controlledValue !== undefined;
    const values = isControlled ? controlledValue : internalValues;

    const isSwitchElement = (
      child: React.ReactElement
    ): child is React.ReactElement<SwitchProps> => {
      return child.type === Switch;
    };

    const enhancedChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;

      if (isSwitchElement(child)) {
        const childValue = child.props.value;

        if (!childValue) return child;

        return React.cloneElement(child, {
          checked: values.includes(childValue),
          onChange: (checked: boolean) => {
            let newValues: string[];

            if (checked) {
              newValues = [...values, childValue];
            } else {
              newValues = values.filter(v => v !== childValue);
            }

            if (!isControlled) {
              setInternalValues(newValues);
            }

            if (child.props.onChange) {
              child.props.onChange(checked);
            }

            if (onChange) {
              onChange(newValues);
            }
          },
          name: name,
          disabled: disabled || child.props.disabled,
        });
      }

      return child;
    });

    return (
      <Block 
        ref={ref} 
        role="group" 
        id={id}
        display="flex"
        flexDirection="column"
        gap={tokens.gap}
      >
        {label && (
          <StyledSwitchGroupLabel>
            <PrimitiveText
              as="span"
              fontSize={tokens.content.label.font.md.fontSize}
              fontWeight={tokens.content.label.font.md.fontWeight}
            >
              {label}
            </PrimitiveText>
          </StyledSwitchGroupLabel>
        )}
        <Block display="flex" flexDirection="column" gap={tokens.gap}>
          {enhancedChildren}
        </Block>
      </Block>
    );
  }
);

SwitchGroup.displayName = 'SwitchGroup';

export default SwitchGroup;
