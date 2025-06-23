import { CSSObject } from "styled-components";
import { FOUNDATION_THEME, ThemeType } from "../../tokens";
import { TabsVariant, TabsSize } from "./types";

export type TabsInteractionState =
  | "default"
  | "hover"
  | "active"
  | "focus"
  | "disabled";

export type TabsTokensType = Readonly<{
  rootLayout?: {
    width?: CSSObject["width"];
  };

  list: {
    layout: {
      [key in TabsVariant]?: {
        display?: CSSObject["display"];
        width?: CSSObject["width"];
        alignItems?: CSSObject["alignItems"];
        gap?: CSSObject["gap"];
        padding?: CSSObject["padding"];
        borderBottomWidth?: CSSObject["borderWidth"];
        borderBottomColor?: CSSObject["borderColor"];
        backgroundColor?: CSSObject["backgroundColor"];
        borderRadius?: CSSObject["borderRadius"];
      };
    };
    expandedLayout?: {
      justifyContent?: CSSObject["justifyContent"];
    };
    size?: {
      [key in TabsSize]?: {
        height?: CSSObject["height"];
      };
    };
  };

  trigger: {
    size: {
      [key in TabsSize]: {
        height: CSSObject["height"];
        paddingX: CSSObject["paddingLeft"];
        fontSize: CSSObject["fontSize"];
      };
    };
    font: {
      [key in TabsVariant]?: {
        [key in Extract<TabsInteractionState, "default" | "active">]?: {
          fontWeight: CSSObject["fontWeight"];
        };
      };
    };
    color: {
      [key in TabsVariant]?: {
        [key in Extract<
          TabsInteractionState,
          "default" | "hover" | "active" | "disabled"
        >]?: CSSObject["color"];
      };
    };
    background: {
      [key in TabsVariant]?: {
        [key in Extract<
          TabsInteractionState,
          "default" | "hover" | "active"
        >]?: CSSObject["backgroundColor"];
      };
    };
    border: {
      [key in TabsVariant]?: {
        radius?: CSSObject["borderRadius"];
        underlineHeight?: CSSObject["height"];
        underlineColor?: CSSObject["borderColor"];
      };
    };
    shadow?: {
      [key in Extract<TabsVariant, "boxed">]?: {
        [key in Extract<
          TabsInteractionState,
          "active"
        >]?: CSSObject["boxShadow"];
      };
    };
    iconSpacing?: {
      gap?: CSSObject["gap"];
    };
    focus?: {
      outlineColor?: CSSObject["borderColor"];
      outlineWidth?: CSSObject["borderWidth"];
      outlineOffset?: CSSObject["outlineOffset"];
      ringWidth?: CSSObject["string"];
      ringColor?: CSSObject["borderColor"];
      ringOffset?: CSSObject["string"];
    };
    disabledOpacity?: CSSObject["opacity"];
  };

  content: {
    padding?: CSSObject["padding"];
    marginTop?: CSSObject["marginTop"];
    animation?: {
      duration?: CSSObject["transitionDuration"];
      timingFunction?: CSSObject["transitionTimingFunction"];
    };
  };

  transition?: {
    duration?: CSSObject["transitionDuration"];
    easing?: CSSObject["transitionTimingFunction"];
  };
}>;

export const getTabsTokens = (foundationToken: ThemeType): TabsTokensType => {
  const underlineBorderColor = foundationToken.colors.gray[700];
  const underlineBorderWidth = foundationToken.border.width[2];
  const listBottomBorderColor = foundationToken.colors.gray[200];

  return {
    rootLayout: {
      width: "100%",
    },
    list: {
      layout: {
        underline: {
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: foundationToken.unit[12],
          borderBottomWidth: foundationToken.border.width[1],
          borderBottomColor: listBottomBorderColor,
        },
        boxed: {
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: foundationToken.unit[4],
          backgroundColor: foundationToken.colors.gray[50],
          padding: foundationToken.unit[4],
          borderRadius: foundationToken.border.radius[8],
        },
        floating: {
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: foundationToken.unit[8],
        },
      },
      expandedLayout: {
        justifyContent: "space-between",
      },
      size: {
        lg: { height: foundationToken.unit[48] },
      },
    },
    trigger: {
      size: {
        md: {
          height: foundationToken.unit[36],
          paddingX: foundationToken.unit[12],
          fontSize: foundationToken.font.size.body.md.fontSize,
        },
        lg: {
          height: foundationToken.unit[40],
          paddingX: foundationToken.unit[12],
          fontSize: foundationToken.font.size.body.md.fontSize,
        },
      },
      font: {
        underline: {
          default: { fontWeight: foundationToken.font.weight[500] },
          active: { fontWeight: foundationToken.font.weight[600] },
        },
        boxed: {
          default: { fontWeight: foundationToken.font.weight[500] },
          active: { fontWeight: foundationToken.font.weight[600] },
        },
        floating: {
          default: { fontWeight: foundationToken.font.weight[500] },
          active: { fontWeight: foundationToken.font.weight[600] },
        },
      },
      color: {
        underline: {
          default: foundationToken.colors.gray[500],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[700],
          disabled: foundationToken.colors.gray[400],
        },
        boxed: {
          default: foundationToken.colors.gray[500],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[700],
          disabled: foundationToken.colors.gray[400],
        },
        floating: {
          default: foundationToken.colors.gray[500],
          hover: foundationToken.colors.gray[700],
          active: foundationToken.colors.gray[700],
          disabled: foundationToken.colors.gray[400],
        },
      },
      background: {
        underline: {
          default: "transparent",
          hover: "transparent",
          active: "transparent",
        },
        boxed: {
          default: "transparent",
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
        },
        floating: {
          default: "transparent",
          hover: foundationToken.colors.gray[50],
          active: foundationToken.colors.gray[100],
        },
      },
      border: {
        underline: {
          underlineHeight: underlineBorderWidth,
          underlineColor: underlineBorderColor,
        },
        boxed: {
          radius: foundationToken.border.radius[8],
        },
        floating: {
          radius: foundationToken.border.radius[8],
        },
      },
      shadow: {
        boxed: {
          active: foundationToken.shadows.sm,
        },
      },
      iconSpacing: {
        gap: foundationToken.unit[8],
      },
      focus: {
        ringWidth: foundationToken.border.width[2],
        ringColor: foundationToken.colors.primary[500],
        ringOffset: foundationToken.unit[2],
      },
      disabledOpacity: foundationToken.opacity[50],
    },
    content: {
      padding: foundationToken.unit[16],
      marginTop: foundationToken.unit[16],
      animation: {
        duration: "0.2s",
        timingFunction: "ease-in-out",
      },
    },
    transition: {
      duration: "0.2s",
      easing: "ease-in-out",
    },
  };
};

const tabsTokens: TabsTokensType = getTabsTokens(FOUNDATION_THEME);

export default tabsTokens;
