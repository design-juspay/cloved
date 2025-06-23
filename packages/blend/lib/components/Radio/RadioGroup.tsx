import React, { forwardRef } from "react";
import { RadioGroupProps, RadioProps } from "./types";
import Block from "../Primitives/Block/Block";
import PrimitiveText from "../Primitives/PrimitiveText/PrimitiveText";
import Radio from "./Radio";
import { RadioTokensType } from "./radio.token";
import { useComponentToken } from "../../context/useComponentToken";

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, label, name, value, defaultValue, onChange, disabled }, ref) => {
    const radioTokens = useComponentToken("RADIO") as RadioTokensType;

    const handleChange = (isChecked: boolean, childValue: string) => {
      if (isChecked && onChange) {
        onChange(childValue);
      }
    };

    // Type guard to check if child is a Radio component
    const isRadioElement = (child: React.ReactElement): child is React.ReactElement<RadioProps> => {
      return child.type === Radio;
    };

    // Clone children with additional props
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || !isRadioElement(child)) return null;

      const childValue = child.props.value;
      if (typeof childValue !== 'string') return null;

      const isControlled = value !== undefined;
      const isChecked = isControlled ? value === childValue : defaultValue === childValue;

      return React.cloneElement(child, {
        name,
        checked: isChecked,
        onChange: (checked: boolean) => {
          if (checked) {
            handleChange(checked, childValue);
          }
        },
        disabled: disabled || child.props.disabled,
      });
    });

    return (
      <Block ref={ref} display="flex" flexDirection="column" gap={radioTokens.gap}>
        {label && (
          <PrimitiveText
            as="label"
            fontSize={radioTokens.content.label.font.md.fontSize}
            fontWeight={radioTokens.content.label.font.md.fontWeight}
            color={radioTokens.content.label.color.default}
          >
            {label}
          </PrimitiveText>
        )}
        <Block display="flex" flexDirection="column" gap={radioTokens.gap}>
          {enhancedChildren}
        </Block>
      </Block>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
