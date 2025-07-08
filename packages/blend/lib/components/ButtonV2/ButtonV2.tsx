import { forwardRef } from "react";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";
import Block from "../Primitives/Block/Block";
import {
  ButtonV2Props,
  ButtonSizeV2,
  ButtonSubTypeV2,
  ButtonTypeV2,
} from "./types";
import { ButtonTokensType } from "./button.tokens";
import Text from "../Text/Text";
import { useComponentToken } from "../../context/useComponentToken";
import { LoaderCircle } from "lucide-react";

const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>(
  (
    {
      buttonType = ButtonTypeV2.PRIMARY,
      size = ButtonSizeV2.SMALL,
      subType = ButtonSubTypeV2.DEFAULT,
      text,
      leadingIcon,
      trailingIcon,
      disabled,
      onClick,
      loading,
      fullWidth,
      justifyContent = "center",
      ...htmlProps
    },
    ref,
  ) => {
    const buttonTokens = useComponentToken("BUTTON") as ButtonTokensType;

    return (
      <PrimitiveButton
        ref={ref}
        onClick={onClick}
        display="flex"
        alignItems="center"
        justifyContent={justifyContent}
        width={fullWidth ? "100%" : "fit-content"}
        minHeight={buttonTokens.minHeight?.[size]?.[subType] || (subType === ButtonSubTypeV2.INLINE ? "auto" : undefined)}
        height={buttonTokens.minHeight?.[size]?.[subType] || (subType === ButtonSubTypeV2.INLINE ? "auto" : undefined)}
        gap={buttonTokens.gap}
        background={buttonTokens.backgroundColor[buttonType][subType].default}
        disabled={disabled}
        color={buttonTokens.color[buttonType][subType].default}
        borderRadius={buttonTokens.borderRadius[buttonType][subType].default}
        padding={buttonTokens.padding[size][subType]}
        border={buttonTokens.border[buttonType][subType].default}
        outline={buttonTokens.outline[buttonType][subType].default}
        fontSize={buttonTokens.fontSize?.[size]}
        _active={
          !disabled
            ? {
                background:
                  buttonTokens.backgroundColor[buttonType][subType].active,
                border: buttonTokens.border[buttonType][subType].active,
                boxShadow: buttonTokens.shadow[buttonType][subType].active,
              }
            : undefined
        }
        _hover={{
          border: buttonTokens.border[buttonType][subType].hover,
          background: buttonTokens.backgroundColor[buttonType][subType].hover,
          outline: buttonTokens.outline[buttonType][subType].hover,
          color: buttonTokens.color[buttonType][subType].hover,
        }}
        _focusVisible={{
          border: buttonTokens.border[buttonType][subType].default,
          outline: buttonTokens.outline[buttonType][subType].active,
        }}
        _disabled={{
          background:
            buttonTokens.backgroundColor[buttonType][subType].disabled,
          border: buttonTokens.border[buttonType][subType].disabled,
          color: buttonTokens.color[buttonType][subType].disabled,
          cursor: "not-allowed",
        }}
        {...htmlProps}
      >
        {loading ? (
          <LoaderCircle
            size={16}
            color={buttonTokens.color[buttonType][subType].default}
            style={{
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <>
            {leadingIcon && (
              <Block as="span" contentCentered>
                {leadingIcon}
              </Block>
            )}
            {text && (
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 'inherit',
                  lineHeight: 'inherit'
                }}
                as="span"
                color="inherit"
              >
                {text}
              </Text>
            )}
            {trailingIcon && (
              <Block as="span" contentCentered>
                {trailingIcon}
              </Block>
            )}
          </>
        )}
      </PrimitiveButton>
    );
  },
);

ButtonV2.displayName = "ButtonV2";

export default ButtonV2;
