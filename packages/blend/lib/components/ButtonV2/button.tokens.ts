import { CSSObject } from "styled-components";
import { FOUNDATION_THEME } from "../../tokens";
import { ButtonSizeV2, ButtonSubTypeV2, ButtonTypeV2 } from "./types";
import { FoundationTokenType } from "../../tokens/theme.token";
import { ResponsiveValue } from "../../tokens/breakpoints.tokens";

export type ButtonState = "default" | "hover" | "active" | "disabled";

export type ButtonTokensType = {
  gap: ResponsiveValue<CSSObject["gap"]>;
  backgroundColor: {
    [key in ButtonTypeV2]: {
      [key in ButtonSubTypeV2]: {
        [key in ButtonState]: CSSObject["background"];
      };
    };
  };
  color: {
    [key in ButtonTypeV2]: {
      [key in ButtonSubTypeV2]: {
        [key in ButtonState]: CSSObject["color"];
      };
    };
  };
  borderRadius: {
    [key in ButtonTypeV2]: {
      [key in ButtonSubTypeV2]: {
        [key in ButtonState]: ResponsiveValue<CSSObject["borderRadius"]>;
      };
    };
  };
  padding: {
    [key in ButtonSizeV2]: {
      [key in ButtonSubTypeV2]: ResponsiveValue<CSSObject["padding"]>;
    };
  };
  border: {
    [key in ButtonTypeV2]: {
      [key in ButtonSubTypeV2]: {
        [key in ButtonState]: CSSObject["border"];
      };
    };
  };
  shadow: {
    [key in ButtonTypeV2]: {
      [key in ButtonSubTypeV2]: {
        [key in ButtonState]: CSSObject["boxShadow"];
      };
    };
  };
  outline: {
    [key in ButtonTypeV2]: {
      [key in ButtonSubTypeV2]: {
        [key in ButtonState]: CSSObject["outline"];
      };
    };
  };
  minHeight: {
    [key in ButtonSizeV2]: {
      [key in ButtonSubTypeV2]: ResponsiveValue<CSSObject["minHeight"]>;
    };
  };
  fontSize: {
    [key in ButtonSizeV2]: ResponsiveValue<CSSObject["fontSize"]>;
  };
};

const buttonTokens: ButtonTokensType = {
  gap: FOUNDATION_THEME.unit[6],
  backgroundColor: {
    primary: {
      default: {
        default: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.primary[600]} -5%, ${FOUNDATION_THEME.colors.primary[500]} 107.5%)`,
        hover: FOUNDATION_THEME.colors.primary[500],
        active: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.primary[600]} -5%, ${FOUNDATION_THEME.colors.primary[500]} 107.5%)`,
        disabled: FOUNDATION_THEME.colors.primary[300],
      },
      iconOnly: {
        default: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.primary[600]} -5%, ${FOUNDATION_THEME.colors.primary[500]} 107.5%)`,
        hover: FOUNDATION_THEME.colors.primary[500],
        active: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.primary[600]} -5%, ${FOUNDATION_THEME.colors.primary[500]} 107.5%)`,
        disabled: FOUNDATION_THEME.colors.primary[300],
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
    secondary: {
      default: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[50],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[150],
      },
      iconOnly: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[50],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[150],
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
    danger: {
      default: {
        default: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.red[600]} 0%, ${FOUNDATION_THEME.colors.red[500]} 93.75%)`,
        hover: FOUNDATION_THEME.colors.red[500],
        active: FOUNDATION_THEME.colors.red[500],
        disabled: FOUNDATION_THEME.colors.red[300],
      },
      iconOnly: {
        default: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.red[600]} 0%, ${FOUNDATION_THEME.colors.red[500]} 93.75%)`,
        hover: FOUNDATION_THEME.colors.red[500],
        active: FOUNDATION_THEME.colors.red[500],
        disabled: FOUNDATION_THEME.colors.red[300],
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
    success: {
      default: {
        default: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.green[600]} 0%, ${FOUNDATION_THEME.colors.green[500]} 100%)`,
        hover: FOUNDATION_THEME.colors.green[500],
        active: FOUNDATION_THEME.colors.green[600],
        disabled: FOUNDATION_THEME.colors.green[300],
      },
      iconOnly: {
        default: `linear-gradient(180deg, ${FOUNDATION_THEME.colors.green[600]} 0%, ${FOUNDATION_THEME.colors.green[500]} 100%)`,
        hover: FOUNDATION_THEME.colors.green[500],
        active: FOUNDATION_THEME.colors.green[600],
        disabled: FOUNDATION_THEME.colors.green[300],
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
  },
  color: {
    primary: {
      default: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[0],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[0],
      },
      iconOnly: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[0],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[0],
      },
      inline: {
        default: FOUNDATION_THEME.colors.primary[600],
        hover: FOUNDATION_THEME.colors.primary[600],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.primary[300],
      },
    },
    secondary: {
      default: {
        default: FOUNDATION_THEME.colors.gray[600],
        hover: FOUNDATION_THEME.colors.gray[600],
        active: FOUNDATION_THEME.colors.gray[600],
        disabled: FOUNDATION_THEME.colors.gray[300],
      },
      iconOnly: {
        default: FOUNDATION_THEME.colors.gray[600],
        hover: FOUNDATION_THEME.colors.gray[600],
        active: FOUNDATION_THEME.colors.gray[600],
        disabled: FOUNDATION_THEME.colors.gray[400],
      },
      inline: {
        default: FOUNDATION_THEME.colors.gray[600],
        hover: FOUNDATION_THEME.colors.gray[600],
        active: FOUNDATION_THEME.colors.gray[600],
        disabled: FOUNDATION_THEME.colors.gray[400],
      },
    },
    danger: {
      default: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[0],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[0],
      },
      iconOnly: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[0],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[0],
      },
      inline: {
        default: FOUNDATION_THEME.colors.red[600],
        hover: FOUNDATION_THEME.colors.red[600],
        active: FOUNDATION_THEME.colors.red[600],
        disabled: FOUNDATION_THEME.colors.red[400],
      },
    },
    success: {
      default: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[0],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[0],
      },
      iconOnly: {
        default: FOUNDATION_THEME.colors.gray[0],
        hover: FOUNDATION_THEME.colors.gray[0],
        active: FOUNDATION_THEME.colors.gray[0],
        disabled: FOUNDATION_THEME.colors.gray[0],
      },
      inline: {
        default: FOUNDATION_THEME.colors.green[600],
        hover: FOUNDATION_THEME.colors.green[600],
        active: FOUNDATION_THEME.colors.green[600],
        disabled: FOUNDATION_THEME.colors.green[400],
      },
    },
  },
  borderRadius: {
    primary: {
      default: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      iconOnly: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      inline: {
        default: FOUNDATION_THEME.border.radius[6],
        hover: FOUNDATION_THEME.border.radius[6],
        active: FOUNDATION_THEME.border.radius[6],
        disabled: FOUNDATION_THEME.border.radius[6],
      },
    },
    secondary: {
      default: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      iconOnly: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      inline: {
        default: FOUNDATION_THEME.border.radius[6],
        hover: FOUNDATION_THEME.border.radius[6],
        active: FOUNDATION_THEME.border.radius[6],
        disabled: FOUNDATION_THEME.border.radius[6],
      },
    },
    danger: {
      default: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      iconOnly: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      inline: {
        default: FOUNDATION_THEME.border.radius[6],
        hover: FOUNDATION_THEME.border.radius[6],
        active: FOUNDATION_THEME.border.radius[6],
        disabled: FOUNDATION_THEME.border.radius[6],
      },
    },
    success: {
      default: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      iconOnly: {
        default: FOUNDATION_THEME.border.radius[10],
        hover: FOUNDATION_THEME.border.radius[10],
        active: FOUNDATION_THEME.border.radius[10],
        disabled: FOUNDATION_THEME.border.radius[10],
      },
      inline: {
        default: FOUNDATION_THEME.border.radius[6],
        hover: FOUNDATION_THEME.border.radius[6],
        active: FOUNDATION_THEME.border.radius[6],
        disabled: FOUNDATION_THEME.border.radius[6],
      },
    },
  },
  padding: {
    sm: {
      default: {
        mobile: "4px 8px",
        tablet: "6px 16px",
        desktop: "8px 20px"
      },
      iconOnly: {
        mobile: "6px 6px",
        tablet: "8px 8px",
        desktop: "10px 10px"
      },
      inline: `${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[0]}`,
    },
    md: {
      default: {
        mobile: "6px 12px",
        tablet: "10px 20px",
        desktop: "12px 24px"
      },
      iconOnly: {
        mobile: "8px 8px",
        tablet: "10px 10px",
        desktop: "12px 12px"
      },
      inline: `${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[0]}`,
    },
    lg: {
      default: {
        mobile: "8px 16px",
        tablet: "12px 24px",
        desktop: "16px 32px"
      },
      iconOnly: {
        mobile: "10px 10px",
        tablet: "14px 14px",
        desktop: "16px 16px"
      },
      inline: `${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[0]}`,
    },
  },
  minHeight: {
    sm: {
      default: {
        mobile: "32px",
        tablet: "36px",
        desktop: "40px"
      },
      iconOnly: {
        mobile: "32px",
        tablet: "36px",
        desktop: "40px"
      },
      inline: "auto",
    },
    md: {
      default: {
        mobile: "36px",
        tablet: "44px",
        desktop: "48px"
      },
      iconOnly: {
        mobile: "36px",
        tablet: "44px",
        desktop: "48px"
      },
      inline: "auto",
    },
    lg: {
      default: {
        mobile: "40px",
        tablet: "48px",
        desktop: "56px"
      },
      iconOnly: {
        mobile: "40px",
        tablet: "48px",
        desktop: "56px"
      },
      inline: "auto",
    },
  },
  fontSize: {
    sm: {
      mobile: "12px",
      tablet: "14px",
      desktop: "14px"
    },
    md: {
      mobile: "14px",
      tablet: "16px",
      desktop: "18px"
    },
    lg: {
      mobile: "16px",
      tablet: "18px",
      desktop: "20px"
    },
  },
  border: {
    primary: {
      default: {
        default: `1.5px solid ${FOUNDATION_THEME.colors.primary[600]}`,
        hover: `1.5px solid ${FOUNDATION_THEME.colors.primary[500]}`,
        active: `1.5px solid ${FOUNDATION_THEME.colors.primary[600]}`,
        disabled: `1.5px solid ${FOUNDATION_THEME.colors.primary[300]}`,
      },
      iconOnly: {
        default: `1.5px solid ${FOUNDATION_THEME.colors.primary[600]}`,
        hover: `1.5px solid ${FOUNDATION_THEME.colors.primary[500]}`,
        active: `1.5px solid ${FOUNDATION_THEME.colors.primary[600]}`,
        disabled: `1.5px solid ${FOUNDATION_THEME.colors.primary[300]}`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `none`,
        disabled: `none`,
      },
    },
    secondary: {
      default: {
        default: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        hover: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
        active: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        disabled: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
      },
      iconOnly: {
        default: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        hover: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
        active: `1px solid ${FOUNDATION_THEME.colors.gray[200]}`,
        disabled: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `none`,
        disabled: `none`,
      },
    },
    danger: {
      default: {
        default: `1.5px solid ${FOUNDATION_THEME.colors.red[600]}`,
        hover: `1.5px solid ${FOUNDATION_THEME.colors.red[500]}`,
        active: `1.5px solid ${FOUNDATION_THEME.colors.red[500]}`,
        disabled: `1.5px solid ${FOUNDATION_THEME.colors.red[300]}`,
      },
      iconOnly: {
        default: `1.5px solid ${FOUNDATION_THEME.colors.red[600]}`,
        hover: `1.5px solid ${FOUNDATION_THEME.colors.red[500]}`,
        active: `1.5px solid ${FOUNDATION_THEME.colors.red[500]}`,
        disabled: `1.5px solid ${FOUNDATION_THEME.colors.red[300]}`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `none`,
        disabled: `none`,
      },
    },
    success: {
      default: {
        default: `1.5px solid ${FOUNDATION_THEME.colors.green[600]}`,
        hover: `1.5px solid ${FOUNDATION_THEME.colors.green[500]}`,
        active: `1.5px solid ${FOUNDATION_THEME.colors.green[600]}`,
        disabled: `1.5px solid ${FOUNDATION_THEME.colors.green[300]}`,
      },
      iconOnly: {
        default: `1.5px solid ${FOUNDATION_THEME.colors.green[600]}`,
        hover: `1.5px solid ${FOUNDATION_THEME.colors.green[500]}`,
        active: `1.5px solid ${FOUNDATION_THEME.colors.green[600]}`,
        disabled: `1.5px solid ${FOUNDATION_THEME.colors.green[300]}`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `none`,
        disabled: `none`,
      },
    },
  },
  shadow: {
    primary: {
      default: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      iconOnly: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
    secondary: {
      default: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      iconOnly: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
    danger: {
      default: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      iconOnly: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
    success: {
      default: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      iconOnly: {
        default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
      },
      inline: {
        default: "none",
        hover: "none",
        active: "none",
        disabled: "none",
      },
    },
  },
  outline: {
    primary: {
      default: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.primary[200]}`,
        disabled: `none`,
      },
      iconOnly: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.primary[200]}`,
        disabled: `none`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `1px solid ${FOUNDATION_THEME.colors.primary[500]}`,
        disabled: `none`,
      },
    },
    secondary: {
      default: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.gray[100]}`,
        disabled: `none`,
      },
      iconOnly: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.gray[100]}`,
        disabled: `none`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.gray[100]}`,
        disabled: `none`,
      },
    },
    danger: {
      default: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.red[200]}`,
        disabled: `none`,
      },
      iconOnly: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.red[200]}`,
        disabled: `none`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.red[200]}`,
        disabled: `none`,
      },
    },
    success: {
      default: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.green[200]}`,
        disabled: `none`,
      },
      iconOnly: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.green[200]}`,
        disabled: `none`,
      },
      inline: {
        default: `none`,
        hover: `none`,
        active: `3px solid ${FOUNDATION_THEME.colors.green[200]}`,
        disabled: `none`,
      },
    },
  },
};

export const getButtonTokens = (
  foundationToken: FoundationTokenType,
): ButtonTokensType => {
  return {
    gap: FOUNDATION_THEME.unit[6],
    backgroundColor: {
      primary: {
        default: {
          default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
          hover: foundationToken.colors.primary[500],
          active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
          disabled: foundationToken.colors.primary[300],
        },
        iconOnly: {
          default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
          hover: foundationToken.colors.primary[500],
          active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
          disabled: foundationToken.colors.primary[300],
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
      secondary: {
        default: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[50],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[150],
        },
        iconOnly: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[50],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[150],
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
      danger: {
        default: {
          default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
          hover: foundationToken.colors.red[500],
          active: foundationToken.colors.red[500],
          disabled: foundationToken.colors.red[300],
        },
        iconOnly: {
          default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
          hover: foundationToken.colors.red[500],
          active: foundationToken.colors.red[500],
          disabled: foundationToken.colors.red[300],
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
      success: {
        default: {
          default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
          hover: foundationToken.colors.green[500],
          active: foundationToken.colors.green[600],
          disabled: foundationToken.colors.green[300],
        },
        iconOnly: {
          default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
          hover: foundationToken.colors.green[500],
          active: foundationToken.colors.green[600],
          disabled: foundationToken.colors.green[300],
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
    },
    color: {
      primary: {
        default: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        iconOnly: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        inline: {
          default: foundationToken.colors.primary[600],
          hover: foundationToken.colors.primary[600],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.primary[300],
        },
      },
      secondary: {
        default: {
          default: foundationToken.colors.gray[600],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[600],
          disabled: foundationToken.colors.gray[300],
        },
        iconOnly: {
          default: foundationToken.colors.gray[600],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[600],
          disabled: foundationToken.colors.gray[400],
        },
        inline: {
          default: foundationToken.colors.gray[600],
          hover: foundationToken.colors.gray[600],
          active: foundationToken.colors.gray[600],
          disabled: foundationToken.colors.gray[400],
        },
      },
      danger: {
        default: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        iconOnly: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        inline: {
          default: foundationToken.colors.red[600],
          hover: foundationToken.colors.red[600],
          active: foundationToken.colors.red[600],
          disabled: foundationToken.colors.red[400],
        },
      },
      success: {
        default: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        iconOnly: {
          default: foundationToken.colors.gray[0],
          hover: foundationToken.colors.gray[0],
          active: foundationToken.colors.gray[0],
          disabled: foundationToken.colors.gray[0],
        },
        inline: {
          default: foundationToken.colors.green[600],
          hover: foundationToken.colors.green[600],
          active: foundationToken.colors.green[600],
          disabled: foundationToken.colors.green[400],
        },
      },
    },
    borderRadius: {
      primary: {
        default: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        iconOnly: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        inline: {
          default: foundationToken.border.radius[6],
          hover: foundationToken.border.radius[6],
          active: foundationToken.border.radius[6],
          disabled: foundationToken.border.radius[6],
        },
      },
      secondary: {
        default: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        iconOnly: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        inline: {
          default: foundationToken.border.radius[6],
          hover: foundationToken.border.radius[6],
          active: foundationToken.border.radius[6],
          disabled: foundationToken.border.radius[6],
        },
      },
      danger: {
        default: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        iconOnly: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        inline: {
          default: foundationToken.border.radius[6],
          hover: foundationToken.border.radius[6],
          active: foundationToken.border.radius[6],
          disabled: foundationToken.border.radius[6],
        },
      },
      success: {
        default: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        iconOnly: {
          default: foundationToken.border.radius[10],
          hover: foundationToken.border.radius[10],
          active: foundationToken.border.radius[10],
          disabled: foundationToken.border.radius[10],
        },
        inline: {
          default: foundationToken.border.radius[6],
          hover: foundationToken.border.radius[6],
          active: foundationToken.border.radius[6],
          disabled: foundationToken.border.radius[6],
        },
      },
    },
    padding: {
      sm: {
        default: {
          mobile: "4px 8px",
          tablet: "6px 16px",
          desktop: "8px 20px"
        },
        iconOnly: {
          mobile: "6px 6px",
          tablet: "8px 8px",
          desktop: "10px 10px"
        },
        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
      },
      md: {
        default: {
          mobile: "6px 12px",
          tablet: "10px 20px",
          desktop: "12px 24px"
        },
        iconOnly: {
          mobile: "8px 8px",
          tablet: "10px 10px",
          desktop: "12px 12px"
        },
        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
      },
      lg: {
        default: {
          mobile: "8px 16px",
          tablet: "12px 24px",
          desktop: "16px 32px"
        },
        iconOnly: {
          mobile: "10px 10px",
          tablet: "14px 14px",
          desktop: "16px 16px"
        },
        inline: `${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
      },
    },
    minHeight: {
      sm: {
        default: {
          mobile: "32px",
          tablet: "36px",
          desktop: "40px"
        },
        iconOnly: {
          mobile: "32px",
          tablet: "36px",
          desktop: "40px"
        },
        inline: "auto",
      },
      md: {
        default: {
          mobile: "36px",
          tablet: "44px",
          desktop: "48px"
        },
        iconOnly: {
          mobile: "36px",
          tablet: "44px",
          desktop: "48px"
        },
        inline: "auto",
      },
      lg: {
        default: {
          mobile: "40px",
          tablet: "48px",
          desktop: "56px"
        },
        iconOnly: {
          mobile: "40px",
          tablet: "48px",
          desktop: "56px"
        },
        inline: "auto",
      },
    },
    fontSize: {
      sm: {
        mobile: "12px",
        tablet: "14px",
        desktop: "14px"
      },
      md: {
        mobile: "14px",
        tablet: "16px",
        desktop: "18px"
      },
      lg: {
        mobile: "16px",
        tablet: "18px",
        desktop: "20px"
      },
    },
    border: {
      primary: {
        default: {
          default: `1.5px solid ${foundationToken.colors.primary[600]}`,
          hover: `1.5px solid ${foundationToken.colors.primary[500]}`,
          active: `1.5px solid ${foundationToken.colors.primary[600]}`,
          disabled: `1.5px solid ${foundationToken.colors.primary[300]}`,
        },
        iconOnly: {
          default: `1.5px solid ${foundationToken.colors.primary[600]}`,
          hover: `1.5px solid ${foundationToken.colors.primary[500]}`,
          active: `1.5px solid ${foundationToken.colors.primary[600]}`,
          disabled: `1.5px solid ${foundationToken.colors.primary[300]}`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `none`,
          disabled: `none`,
        },
      },
      secondary: {
        default: {
          default: `1px solid ${foundationToken.colors.gray[200]}`,
          hover: `1px solid ${foundationToken.colors.gray[150]}`,
          active: `1px solid ${foundationToken.colors.gray[200]}`,
          disabled: `1px solid ${foundationToken.colors.gray[150]}`,
        },
        iconOnly: {
          default: `1px solid ${foundationToken.colors.gray[200]}`,
          hover: `1px solid ${foundationToken.colors.gray[150]}`,
          active: `1px solid ${foundationToken.colors.gray[200]}`,
          disabled: `1px solid ${foundationToken.colors.gray[150]}`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `none`,
          disabled: `none`,
        },
      },
      danger: {
        default: {
          default: `1.5px solid ${foundationToken.colors.red[600]}`,
          hover: `1.5px solid ${foundationToken.colors.red[500]}`,
          active: `1.5px solid ${foundationToken.colors.red[500]}`,
          disabled: `1.5px solid ${foundationToken.colors.red[300]}`,
        },
        iconOnly: {
          default: `1.5px solid ${foundationToken.colors.red[600]}`,
          hover: `1.5px solid ${foundationToken.colors.red[500]}`,
          active: `1.5px solid ${foundationToken.colors.red[500]}`,
          disabled: `1.5px solid ${foundationToken.colors.red[300]}`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `none`,
          disabled: `none`,
        },
      },
      success: {
        default: {
          default: `1.5px solid ${foundationToken.colors.green[600]}`,
          hover: `1.5px solid ${foundationToken.colors.green[500]}`,
          active: `1.5px solid ${foundationToken.colors.green[600]}`,
          disabled: `1.5px solid ${foundationToken.colors.green[300]}`,
        },
        iconOnly: {
          default: `1.5px solid ${foundationToken.colors.green[600]}`,
          hover: `1.5px solid ${foundationToken.colors.green[500]}`,
          active: `1.5px solid ${foundationToken.colors.green[600]}`,
          disabled: `1.5px solid ${foundationToken.colors.green[300]}`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `none`,
          disabled: `none`,
        },
      },
    },
    shadow: {
      primary: {
        default: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        iconOnly: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
      secondary: {
        default: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        iconOnly: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
      danger: {
        default: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        iconOnly: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
      success: {
        default: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        iconOnly: {
          default: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          hover: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          active: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
          disabled: "0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset",
        },
        inline: {
          default: "none",
          hover: "none",
          active: "none",
          disabled: "none",
        },
      },
    },
    outline: {
      primary: {
        default: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.primary[200]}`,
          disabled: `none`,
        },
        iconOnly: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.primary[200]}`,
          disabled: `none`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `1px solid ${foundationToken.colors.primary[500]}`,
          disabled: `none`,
        },
      },
      secondary: {
        default: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.gray[100]}`,
          disabled: `none`,
        },
        iconOnly: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.gray[100]}`,
          disabled: `none`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.gray[100]}`,
          disabled: `none`,
        },
      },
      danger: {
        default: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.red[200]}`,
          disabled: `none`,
        },
        iconOnly: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.red[200]}`,
          disabled: `none`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.red[200]}`,
          disabled: `none`,
        },
      },
      success: {
        default: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.green[200]}`,
          disabled: `none`,
        },
        iconOnly: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.green[200]}`,
          disabled: `none`,
        },
        inline: {
          default: `none`,
          hover: `none`,
          active: `3px solid ${foundationToken.colors.green[200]}`,
          disabled: `none`,
        },
      },
    },
  };
};

export default buttonTokens;
