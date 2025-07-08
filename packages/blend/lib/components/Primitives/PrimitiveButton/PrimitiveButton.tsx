import React, { forwardRef } from "react";
import styled, { CSSObject, css } from "styled-components";
import { ResponsiveValue } from "../../../tokens/breakpoints.tokens";
import { createResponsiveStyles } from "../../../utils/responsive.utils";

// State-specific style overrides
type StateStyles = {
  _hover?: PrimitiveButtonProps;
  _focus?: PrimitiveButtonProps;
  _active?: PrimitiveButtonProps;
  _disabled?: PrimitiveButtonProps;
  _visited?: PrimitiveButtonProps;
  _focusVisible?: PrimitiveButtonProps;
  _focusWithin?: PrimitiveButtonProps;
};

// Base props type with responsive support
type PrimitiveButtonProps = StateStyles & {
  // Spacing
  padding?: ResponsiveValue<CSSObject["padding"]>;
  paddingX?: ResponsiveValue<CSSObject["padding"]>;
  paddingY?: ResponsiveValue<CSSObject["padding"]>;
  margin?: ResponsiveValue<CSSObject["margin"]>;
  marginX?: ResponsiveValue<CSSObject["margin"]>;
  marginY?: ResponsiveValue<CSSObject["margin"]>;

  // Layout
  display?: ResponsiveValue<CSSObject["display"]>;
  justifyContent?: ResponsiveValue<CSSObject["justifyContent"]>;
  alignItems?: ResponsiveValue<CSSObject["alignItems"]>;
  gap?: ResponsiveValue<CSSObject["gap"]>;
  contentCentered?: boolean;

  // Sizing
  width?: ResponsiveValue<CSSObject["width"]>;
  height?: ResponsiveValue<CSSObject["height"]>;
  size?: ResponsiveValue<CSSObject["width"] | CSSObject["height"]>;
  minWidth?: ResponsiveValue<CSSObject["minWidth"]>;
  maxWidth?: ResponsiveValue<CSSObject["maxWidth"]>;
  minHeight?: ResponsiveValue<CSSObject["minHeight"]>;
  maxHeight?: ResponsiveValue<CSSObject["maxHeight"]>;

  // Flex
  flexGrow?: ResponsiveValue<CSSObject["flexGrow"]>;
  flexShrink?: ResponsiveValue<CSSObject["flexShrink"]>;
  flexBasis?: ResponsiveValue<CSSObject["flexBasis"]>;

  // Positioning
  position?: ResponsiveValue<CSSObject["position"]>;
  top?: ResponsiveValue<CSSObject["top"]>;
  right?: ResponsiveValue<CSSObject["right"]>;
  bottom?: ResponsiveValue<CSSObject["bottom"]>;
  left?: ResponsiveValue<CSSObject["left"]>;
  zIndex?: ResponsiveValue<CSSObject["zIndex"]>;

  // Visual
  backgroundColor?: ResponsiveValue<CSSObject["backgroundColor"]>;
  background?: ResponsiveValue<CSSObject["background"]>;
  color?: ResponsiveValue<CSSObject["color"]>;
  border?: ResponsiveValue<CSSObject["border"]>;
  borderTop?: ResponsiveValue<CSSObject["borderTop"]>;
  borderRight?: ResponsiveValue<CSSObject["borderRight"]>;
  borderBottom?: ResponsiveValue<CSSObject["borderBottom"]>;
  borderLeft?: ResponsiveValue<CSSObject["borderLeft"]>;
  borderRadius?: ResponsiveValue<CSSObject["borderRadius"]>;
  boxShadow?: ResponsiveValue<CSSObject["boxShadow"]>;
  textAlign?: ResponsiveValue<CSSObject["textAlign"]>;
  whiteSpace?: ResponsiveValue<CSSObject["whiteSpace"]>;
  overflow?: ResponsiveValue<CSSObject["overflow"]>;
  overflowX?: ResponsiveValue<CSSObject["overflowX"]>;
  overflowY?: ResponsiveValue<CSSObject["overflowY"]>;
  cursor?: ResponsiveValue<CSSObject["cursor"]>;

  // Outline
  outline?: ResponsiveValue<CSSObject["outline"]>;
  outlineOffset?: ResponsiveValue<CSSObject["outlineOffset"]>;
  outlineStyle?: ResponsiveValue<CSSObject["outlineStyle"]>;
  outlineWidth?: ResponsiveValue<CSSObject["outlineWidth"]>;
  outlineColor?: ResponsiveValue<CSSObject["outlineColor"]>;

  // State
  disabled?: boolean;

  // Text
  fontWeight?: ResponsiveValue<CSSObject["fontWeight"]>;
  fontSize?: ResponsiveValue<CSSObject["fontSize"]>;
  fontFamily?: ResponsiveValue<CSSObject["fontFamily"]>;
  textDecoration?: ResponsiveValue<CSSObject["textDecoration"]>;
  textUnderlineOffset?: ResponsiveValue<CSSObject["textUnderlineOffset"]>;
  textTransform?: ResponsiveValue<CSSObject["textTransform"]>;
};

// Prevent these props from reaching the DOM
const blockedProps = [
  "padding",
  "paddingX",
  "paddingY",
  "margin",
  "marginX",
  "marginY",
  "display",
  "justifyContent",
  "alignItems",
  "gap",
  "contentCentered",
  "width",
  "height",
  "size",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "backgroundColor",
  "background",
  "color",
  "border",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderRadius",
  "boxShadow",
  "textAlign",
  "whiteSpace",
  "overflow",
  "overflowX",
  "overflowY",
  "cursor",
  "outline",
  "outlineOffset",
  "outlineStyle",
  "outlineWidth",
  "outlineColor",
  "variant",
  "_hover",
  "_focus",
  "_active",
  "_disabled",
  "_visited",
  "_focusVisible",
  "_focusWithin",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textDecoration",
  "textUnderlineOffset",
  "textTransform",
];

const shouldForwardProp = (prop: string) => !blockedProps.includes(prop);

// Convert props to CSSObject with responsive support
const getStyles = (props: PrimitiveButtonProps): CSSObject => {
  let styles: CSSObject = {
    appearance: "none",
    outline: "none",
    border: "none",
    font: "inherit",
    cursor: props.disabled ? "not-allowed" : "pointer",
    opacity: props.disabled ? 0.6 : 1,
  };

  // Handle cursor with responsive support
  if (props.cursor) {
    styles = { ...styles, ...createResponsiveStyles('cursor', props.cursor) };
  }

  // Layout
  if (props.contentCentered) {
    styles.display = "flex";
    styles.justifyContent = "center";
    styles.alignItems = "center";
    
    if (props.display) {
      styles = { ...styles, ...createResponsiveStyles('display', props.display) };
    }
    if (props.justifyContent) {
      styles = { ...styles, ...createResponsiveStyles('justifyContent', props.justifyContent) };
    }
    if (props.alignItems) {
      styles = { ...styles, ...createResponsiveStyles('alignItems', props.alignItems) };
    }
  } else {
    if (props.display) {
      styles = { ...styles, ...createResponsiveStyles('display', props.display) };
    }
    if (props.justifyContent) {
      styles = { ...styles, ...createResponsiveStyles('justifyContent', props.justifyContent) };
    }
    if (props.alignItems) {
      styles = { ...styles, ...createResponsiveStyles('alignItems', props.alignItems) };
    }
  }

  if (props.gap) {
    styles = { ...styles, ...createResponsiveStyles('gap', props.gap) };
  }

  // Spacing
  if (props.padding) {
    styles = { ...styles, ...createResponsiveStyles('padding', props.padding) };
  }
  if (props.paddingX) {
    styles = { ...styles, ...createResponsiveStyles('paddingLeft', props.paddingX) };
    styles = { ...styles, ...createResponsiveStyles('paddingRight', props.paddingX) };
  }
  if (props.paddingY) {
    styles = { ...styles, ...createResponsiveStyles('paddingTop', props.paddingY) };
    styles = { ...styles, ...createResponsiveStyles('paddingBottom', props.paddingY) };
  }
  if (props.margin) {
    styles = { ...styles, ...createResponsiveStyles('margin', props.margin) };
  }
  if (props.marginX) {
    styles = { ...styles, ...createResponsiveStyles('marginLeft', props.marginX) };
    styles = { ...styles, ...createResponsiveStyles('marginRight', props.marginX) };
  }
  if (props.marginY) {
    styles = { ...styles, ...createResponsiveStyles('marginTop', props.marginY) };
    styles = { ...styles, ...createResponsiveStyles('marginBottom', props.marginY) };
  }

  // Sizing
  if (props.size) {
    styles = { ...styles, ...createResponsiveStyles('width', props.size) };
    styles = { ...styles, ...createResponsiveStyles('height', props.size) };
  } else {
    if (props.width) {
      styles = { ...styles, ...createResponsiveStyles('width', props.width) };
    }
    if (props.height) {
      styles = { ...styles, ...createResponsiveStyles('height', props.height) };
    }
  }

  if (props.minWidth) {
    styles = { ...styles, ...createResponsiveStyles('minWidth', props.minWidth) };
  }
  if (props.maxWidth) {
    styles = { ...styles, ...createResponsiveStyles('maxWidth', props.maxWidth) };
  }
  if (props.minHeight) {
    styles = { ...styles, ...createResponsiveStyles('minHeight', props.minHeight) };
  }
  if (props.maxHeight) {
    styles = { ...styles, ...createResponsiveStyles('maxHeight', props.maxHeight) };
  }

  // Flex
  if (props.flexGrow) {
    styles = { ...styles, ...createResponsiveStyles('flexGrow', props.flexGrow) };
  }
  if (props.flexShrink) {
    styles = { ...styles, ...createResponsiveStyles('flexShrink', props.flexShrink) };
  }
  if (props.flexBasis) {
    styles = { ...styles, ...createResponsiveStyles('flexBasis', props.flexBasis) };
  }

  // Position
  if (props.position) {
    styles = { ...styles, ...createResponsiveStyles('position', props.position) };
  }
  if (props.top) {
    styles = { ...styles, ...createResponsiveStyles('top', props.top) };
  }
  if (props.right) {
    styles = { ...styles, ...createResponsiveStyles('right', props.right) };
  }
  if (props.bottom) {
    styles = { ...styles, ...createResponsiveStyles('bottom', props.bottom) };
  }
  if (props.left) {
    styles = { ...styles, ...createResponsiveStyles('left', props.left) };
  }
  if (props.zIndex) {
    styles = { ...styles, ...createResponsiveStyles('zIndex', props.zIndex) };
  }

  // Visual
  if (props.backgroundColor) {
    styles = { ...styles, ...createResponsiveStyles('backgroundColor', props.backgroundColor) };
  }
  if (props.background) {
    styles = { ...styles, ...createResponsiveStyles('background', props.background) };
  }
  if (props.color) {
    styles = { ...styles, ...createResponsiveStyles('color', props.color) };
  }
  if (props.border) {
    styles = { ...styles, ...createResponsiveStyles('border', props.border) };
  }
  if (props.borderTop) {
    styles = { ...styles, ...createResponsiveStyles('borderTop', props.borderTop) };
  }
  if (props.borderRight) {
    styles = { ...styles, ...createResponsiveStyles('borderRight', props.borderRight) };
  }
  if (props.borderBottom) {
    styles = { ...styles, ...createResponsiveStyles('borderBottom', props.borderBottom) };
  }
  if (props.borderLeft) {
    styles = { ...styles, ...createResponsiveStyles('borderLeft', props.borderLeft) };
  }
  if (props.borderRadius) {
    styles = { ...styles, ...createResponsiveStyles('borderRadius', props.borderRadius) };
  }
  if (props.boxShadow) {
    styles = { ...styles, ...createResponsiveStyles('boxShadow', props.boxShadow) };
  }
  if (props.textAlign) {
    styles = { ...styles, ...createResponsiveStyles('textAlign', props.textAlign) };
  }
  if (props.whiteSpace) {
    styles = { ...styles, ...createResponsiveStyles('whiteSpace', props.whiteSpace) };
  }
  if (props.overflow) {
    styles = { ...styles, ...createResponsiveStyles('overflow', props.overflow) };
  }
  if (props.overflowX) {
    styles = { ...styles, ...createResponsiveStyles('overflowX', props.overflowX) };
  }
  if (props.overflowY) {
    styles = { ...styles, ...createResponsiveStyles('overflowY', props.overflowY) };
  }

  // Outline
  if (props.outline) {
    styles = { ...styles, ...createResponsiveStyles('outline', props.outline) };
  }
  if (props.outlineOffset) {
    styles = { ...styles, ...createResponsiveStyles('outlineOffset', props.outlineOffset) };
  }
  if (props.outlineStyle) {
    styles = { ...styles, ...createResponsiveStyles('outlineStyle', props.outlineStyle) };
  }
  if (props.outlineWidth) {
    styles = { ...styles, ...createResponsiveStyles('outlineWidth', props.outlineWidth) };
  }
  if (props.outlineColor) {
    styles = { ...styles, ...createResponsiveStyles('outlineColor', props.outlineColor) };
  }

  // Text
  if (props.fontWeight) {
    styles = { ...styles, ...createResponsiveStyles('fontWeight', props.fontWeight) };
  }
  if (props.fontSize) {
    styles = { ...styles, ...createResponsiveStyles('fontSize', props.fontSize) };
  }
  if (props.fontFamily) {
    styles = { ...styles, ...createResponsiveStyles('fontFamily', props.fontFamily) };
  }
  if (props.textDecoration) {
    styles = { ...styles, ...createResponsiveStyles('textDecoration', props.textDecoration) };
  }
  if (props.textUnderlineOffset) {
    styles = { ...styles, ...createResponsiveStyles('textUnderlineOffset', props.textUnderlineOffset) };
  }
  if (props.textTransform) {
    styles = { ...styles, ...createResponsiveStyles('textTransform', props.textTransform) };
  }

  return styles;
};

// Map state props to CSS pseudo-selectors
const stateToSelector: Record<keyof StateStyles, string> = {
  _hover: "&:hover",
  _focus: "&:focus",
  _active: "&:active",
  _disabled: "&:disabled",
  _visited: "&:visited",
  _focusVisible: "&:focus-visible",
  _focusWithin: "&:focus-within",
};

// Styled button
const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})<PrimitiveButtonProps>`
  ${(props) => {
    const base = getStyles(props);
    const stateStyles = Object.entries(stateToSelector).reduce(
      (acc, [key, selector]) => {
        const stateProps = props[key as keyof StateStyles];
        if (stateProps) acc[selector] = getStyles(stateProps);
        return acc;
      },
      {} as CSSObject,
    );

    return css({ ...base, ...stateStyles });
  }}
`;

// Exported props
export type ButtonProps = PrimitiveButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    children?: React.ReactNode;
  };

// Component
const PrimitiveButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, cursor, ...rest }, ref) => {
    return (
      <StyledButton cursor={cursor} ref={ref} disabled={disabled} {...rest}>
        {children}
      </StyledButton>
    );
  },
);

PrimitiveButton.displayName = "PrimitiveButton";

export default PrimitiveButton;
