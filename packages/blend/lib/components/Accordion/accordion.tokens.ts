import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { AccordionType } from "./types";

type AccordionTokens = {
  base: {
    container: CSSObject;
    item: CSSObject;
    trigger: CSSObject;
    content: CSSObject;
    title: CSSObject;
    titleEnabled: CSSObject;
    titleDisabled: CSSObject;
    subtext: CSSObject;
    subtextEnabled: CSSObject;
    subtextDisabled: CSSObject;
    contentWrapper: CSSObject;
  };
  type: {
    [K in AccordionType]: {
      container: CSSObject;
      item: CSSObject;
      trigger: CSSObject;
      content: CSSObject;
      contentWrapper: CSSObject;
    };
  };
  layout: {
    leftSlot: CSSObject;
    rightSlot: CSSObject;
    headerRow: CSSObject;
    chevronRight: CSSObject;
    chevronLeft: CSSObject;
    chevronIcon: {
      default: CSSObject;
      enabled: CSSObject;
      disabled: CSSObject;
    };
  };
  states: {
    disabled: CSSObject;
    open: CSSObject;
  };
};

const accordionTokens: AccordionTokens = {
  base: {
    container: {
      width: "100%",
    },
    item: {
      borderBottom: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
    },
    trigger: {
      display: "flex",
      width: "100%",
      padding: `${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[12]}`,
      textAlign: "left",
      transition: "all 0.2s ease",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      
      "&:focusVisible": {
        outline: `${FOUNDATION_THEME.border.width[2]} solid ${FOUNDATION_THEME.colors.primary[500]}`,
        outlineOffset: FOUNDATION_THEME.unit[2],
      },
      
      "&:disabled": {
        cursor: "not-allowed",
      },
      
      "&:hover:not(:disabled)": {
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
      },
    },
    content: {
      overflow: "hidden",
      transition: "all 0.2s ease",
    },
    title: {
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      fontWeight: FOUNDATION_THEME.font.weight[600],
    },
    titleEnabled: {
      color: FOUNDATION_THEME.colors.gray[800],
    },
    titleDisabled: {
      color: FOUNDATION_THEME.colors.gray[500],
    },
    subtext: {
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      marginTop: FOUNDATION_THEME.unit[4],
      paddingLeft: FOUNDATION_THEME.unit[20],
    },
    subtextEnabled: {
      color: FOUNDATION_THEME.colors.gray[600],
    },
    subtextDisabled: {
      color: FOUNDATION_THEME.colors.gray[300],
    },
    contentWrapper: {
      padding: `${FOUNDATION_THEME.unit[20]} ${FOUNDATION_THEME.unit[12]}`,
    },
  },
  type: {
    [AccordionType.BORDER]: {
      container: {
        display: "flex",
        flexDirection: "column",
        gap: FOUNDATION_THEME.unit[24],
        borderRadius: FOUNDATION_THEME.border.radius[8],
      },
      item: {
        border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
        borderRadius: FOUNDATION_THEME.border.radius[8],
        overflow: "hidden",
        borderBottom: "none",
      },
      trigger: {
        padding: `${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[16]}`,
        
        "&:hover:not(:disabled)": {
          backgroundColor: FOUNDATION_THEME.colors.gray[50],
        },
        
        "&[dataState=open]": {
          backgroundColor: FOUNDATION_THEME.colors.gray[50],
        },
      },
      content: {
        padding: `${FOUNDATION_THEME.unit[2]} 0`,
      },
      contentWrapper: {
        padding: `${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[12]}`,
      },
    },
    [AccordionType.NO_BORDER]: {
      container: {
        display: "flex",
        flexDirection: "column",
      },
      item: {
        borderBottom: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
        
        "&:lastChild": {
          borderBottom: "none",
        },
      },
      trigger: {
        padding: `${FOUNDATION_THEME.unit[16]} ${FOUNDATION_THEME.unit[12]}`,
        
        "&:hover:not(:disabled)": {
          backgroundColor: FOUNDATION_THEME.colors.gray[50],
        },
      },
      content: {
        padding: "0",
      },
      contentWrapper: {
        borderTop: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
        padding: `${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[12]}`,
      },
    },
  },
  layout: {
    leftSlot: {
      marginRight: FOUNDATION_THEME.unit[8],
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rightSlot: {
      marginLeft: FOUNDATION_THEME.unit[8],
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      position: "relative",
    },
    chevronRight: {
      position: "absolute",
      right: 0,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    chevronLeft: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: FOUNDATION_THEME.unit[6],
      flexShrink: 0,
    },
    chevronIcon: {
      default: {
        width: FOUNDATION_THEME.unit[16],
        height: FOUNDATION_THEME.unit[16],
      },
      enabled: {
        color: FOUNDATION_THEME.colors.gray[500],
      },
      disabled: {
        color: FOUNDATION_THEME.colors.gray[300],
      },
    },
  },
  states: {
    disabled: {
      backgroundColor: FOUNDATION_THEME.colors.gray[50],
    },
    open: {
        borderBottom: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
      }
  },
};

export default accordionTokens; 