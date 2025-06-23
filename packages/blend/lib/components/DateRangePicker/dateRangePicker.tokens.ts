import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";

type DateRangePickerTokens = {
  base: {
    container: CSSObject;
    input: CSSObject;
  };
  input: {
    sizes: {
      sm: CSSObject;
      md: CSSObject;
      lg: CSSObject;
    };
  };
  states: {
    disabled: CSSObject;
    disabledDay: CSSObject;
  };
  calendar: {
    container: CSSObject;
    gridContainer: CSSObject;
    monthContainer: CSSObject;
    monthHeader: CSSObject;
    dayNamesContainer: CSSObject;
    dayName: CSSObject;
    weekRow: CSSObject;
    emptyCell: CSSObject;
    dayCell: CSSObject;
    startDate: CSSObject;
    endDate: CSSObject;
    singleDate: CSSObject;
    rangeDay: CSSObject;
    todayDay: CSSObject;
    todayIndicator: CSSObject;
    hoverState: CSSObject;
  };
  presets: {
    button: CSSObject;
    activeButton: CSSObject;
  };
  timePicker: {
    container: CSSObject;
    input: CSSObject;
  };
  text: {
    label: CSSObject;
    value: CSSObject;
    dayName: CSSObject;
    dayNumber: CSSObject;
    selectedDay: CSSObject;
    rangeDay: CSSObject;
    todayDay: CSSObject;
  };
  dropdown: {
    container: CSSObject;
    content: CSSObject;
    item: CSSObject;
    activeItem: CSSObject;
  };
  quickRange: {
    trigger: CSSObject;
  };
  toggle: {
    container: CSSObject;
    thumb: CSSObject;
    thumbActive: CSSObject;
  };
};

const dateRangePickerTokens: DateRangePickerTokens = {
  base: {
    container: {
      position: "relative",
      display: "inline-flex",
      width: "100%",
    },
    input: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`,
      border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[300]}`,
      borderRadius: FOUNDATION_THEME.border.radius[8],
      boxShadow: FOUNDATION_THEME.shadows.sm,
      backgroundColor: FOUNDATION_THEME.colors.gray[0],
      fontSize: `${FOUNDATION_THEME.font.size.body.md.fontSize}px`,
      color: FOUNDATION_THEME.colors.gray[700],
      cursor: "pointer",
    },
  },
  input: {
    sizes: {
      sm: {
        fontSize: `${FOUNDATION_THEME.font.size.body.sm.fontSize}px`,
        padding: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[8]}`,
      },
      md: {
        fontSize: `${FOUNDATION_THEME.font.size.body.md.fontSize}px`,
        padding: `${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`,
      },
      lg: {
        fontSize: `${FOUNDATION_THEME.font.size.body.lg.fontSize}px`,
        padding: `${FOUNDATION_THEME.unit[10]} ${FOUNDATION_THEME.unit[12]}`,
      },
    },
  },
  states: {
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
    disabledDay: {
      opacity: 0.4,
      cursor: "not-allowed",
      pointerEvents: "none",
    },
  },
  calendar: {
    container: {
      width: "auto",
      minWidth: '398px',
      backgroundColor: FOUNDATION_THEME.colors.gray[0],
      border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
      borderRadius: FOUNDATION_THEME.border.radius[8],
      boxShadow: FOUNDATION_THEME.shadows.lg,
      zIndex: 1000,
    },
    gridContainer: {
      maxHeight: '400px',
      overflowY: "auto",
      padding: FOUNDATION_THEME.unit[16],
    },
    monthContainer: {
      marginBottom: FOUNDATION_THEME.unit[24],
    },
    monthHeader: {
      fontSize: `${FOUNDATION_THEME.font.size.body.lg.fontSize}px`,
      fontWeight: 600,
      color: FOUNDATION_THEME.colors.gray[700],
      margin: `${FOUNDATION_THEME.unit[4]} 0`,
    },
    dayNamesContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      textAlign: "center",
      color: FOUNDATION_THEME.colors.gray[500],
    },
    dayName: {
      padding: FOUNDATION_THEME.unit[8],
      borderBottom: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[100]}`,
    },
    weekRow: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      padding: `${FOUNDATION_THEME.unit[4]} 0`,
    },
    emptyCell: {
      padding: FOUNDATION_THEME.unit[8],
    },
    dayCell: {
      cursor: "pointer",
      textAlign: "center",
      padding: FOUNDATION_THEME.unit[8],
      position: "relative",
      fontWeight: 500,
      boxSizing: "border-box",
    },
    startDate: {
      backgroundColor: FOUNDATION_THEME.colors.primary[500],
      borderTopLeftRadius: FOUNDATION_THEME.border.radius[8],
      borderBottomLeftRadius: FOUNDATION_THEME.border.radius[8],
    },
    endDate: {
      backgroundColor: FOUNDATION_THEME.colors.primary[500],
      borderTopRightRadius: FOUNDATION_THEME.border.radius[8],
      borderBottomRightRadius: FOUNDATION_THEME.border.radius[8],
    },
    singleDate: {
      backgroundColor: FOUNDATION_THEME.colors.primary[500],
      borderRadius: FOUNDATION_THEME.border.radius[8],
    },
    rangeDay: {
      backgroundColor: FOUNDATION_THEME.colors.primary[50],
    },
    todayDay: {
      fontWeight: 500,
    },
    todayIndicator: {
      position: "absolute",
      width: FOUNDATION_THEME.unit[4],
      height: FOUNDATION_THEME.unit[4],
      backgroundColor: FOUNDATION_THEME.colors.primary[500],
      borderRadius: FOUNDATION_THEME.border.radius.full,
      bottom: FOUNDATION_THEME.unit[4],
      left: "50%",
      transform: "translateX(-50%)",
    },
    hoverState: {
      "&:hover": {
        boxShadow: `inset 0 0 0 1px ${FOUNDATION_THEME.colors.primary[500]}`,
        borderRadius: FOUNDATION_THEME.border.radius[8],
      },
    },
  },
  presets: {
    button: {
      padding: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[12]}`,
      fontSize: `${FOUNDATION_THEME.font.size.body.sm.fontSize}px`,
      borderRadius: FOUNDATION_THEME.border.radius[6],
      border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
      },
      "&:focus": {
        outline: "none",
        boxShadow: `0 0 0 2px ${FOUNDATION_THEME.colors.primary[200]}`,
      },
    },
    activeButton: {
      backgroundColor: FOUNDATION_THEME.colors.primary[50],
      color: FOUNDATION_THEME.colors.primary[700],
    },
  },
  timePicker: {
    container: {
      padding: FOUNDATION_THEME.unit[16],
      borderTop: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
    },
    input: {
      width: "100%",
      padding: `${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`,
      border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[300]}`,
      borderRadius: FOUNDATION_THEME.border.radius[8],
      boxShadow: FOUNDATION_THEME.shadows.sm,
      color: FOUNDATION_THEME.colors.gray[700],
      "&:focus": {
        outline: "none",
        boxShadow: `0 0 0 2px ${FOUNDATION_THEME.colors.primary[200]}`,
      },
    },
  },
  text: {
    label: {
      color: FOUNDATION_THEME.colors.gray[400],
    },
    value: {
      color: FOUNDATION_THEME.colors.gray[600],
      fontWeight: 500,
      fontSize: `${FOUNDATION_THEME.font.size.body.md.fontSize}px`,
    },
    dayName: {
      color: FOUNDATION_THEME.colors.gray[400],
    },
    dayNumber: {
      color: FOUNDATION_THEME.colors.gray[600],
    },
    selectedDay: {
      color: FOUNDATION_THEME.colors.gray[0],
    },
    rangeDay: {
      color: FOUNDATION_THEME.colors.gray[600],
    },
    todayDay: {
      color: FOUNDATION_THEME.colors.primary[500],
    },
  },
  dropdown: {
    container: {
      position: "absolute",
      zIndex: 20,
      marginTop: FOUNDATION_THEME.unit[4],
      backgroundColor: FOUNDATION_THEME.colors.gray[0],
      borderRadius: FOUNDATION_THEME.border.radius[6],
      boxShadow: FOUNDATION_THEME.shadows.lg,
      border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
      width: "100%",
      maxHeight: '240px',
      overflowY: "auto",
    },
    content: {
      padding: FOUNDATION_THEME.unit[4],
      width: '100%',
      zIndex: 1000,
      backgroundColor: FOUNDATION_THEME.colors.gray[0],
      borderRadius: FOUNDATION_THEME.border.radius[6],
      boxShadow: FOUNDATION_THEME.shadows.lg,
      overflowY: "auto",
      overflowX: "hidden",
    },
    item: {
      width: "100%",
      textAlign: "left",
      padding: `${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`,
      borderRadius: FOUNDATION_THEME.border.radius[6],
      transition: "background-color 0.15s ease-in-out",
      cursor: "pointer",
      border: "none",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
      },
      "&:focus": {
        outline: "none",
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
      },
    },
    activeItem: {
      backgroundColor: FOUNDATION_THEME.colors.primary[50],
      color: FOUNDATION_THEME.colors.primary[700],
      fontWeight: 500,
    },
  },
  quickRange: {
    trigger: {
      height: FOUNDATION_THEME.unit[40],
      border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[300]}`,
      borderTopLeftRadius: FOUNDATION_THEME.border.radius[8],
      borderBottomLeftRadius: FOUNDATION_THEME.border.radius[8],
      padding: `${FOUNDATION_THEME.unit[10]} ${FOUNDATION_THEME.unit[12]}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      width: "100%",
    }
  },
  toggle: {
    container: {
      width: FOUNDATION_THEME.unit[40],
      height: FOUNDATION_THEME.unit[20],
      position: "relative",
      borderRadius: FOUNDATION_THEME.border.radius.full,
      transition: "background-color 0.2s ease-in-out",
      cursor: "pointer",
    },
    thumb: {
      position: "absolute",
      left: "2px",
      top: "2px",
      backgroundColor: FOUNDATION_THEME.colors.gray[0],
      width: FOUNDATION_THEME.unit[16],
      height: FOUNDATION_THEME.unit[16],
      borderRadius: FOUNDATION_THEME.border.radius.full,
      transition: "transform 0.2s ease-in-out",
    },
    thumbActive: {
      transform: "translateX(20px)",
    },
  },
};

export default dateRangePickerTokens; 