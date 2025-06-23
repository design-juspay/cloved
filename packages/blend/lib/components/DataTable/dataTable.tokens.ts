import { FOUNDATION_THEME } from "../../tokens";
import { CSSObject } from "styled-components";
import { FoundationTokenType } from "../../tokens/theme.token";

type DataTableToken = {
  container: CSSObject;
  header: {
    container: CSSObject;
    title: CSSObject;
    description: CSSObject;
  };
  filters: {
    container: CSSObject;
  };
  table: {
    base: CSSObject;
  };
  thead: {
    base: CSSObject;
  };
  th: {
    base: CSSObject;
    sortable: CSSObject;
  };
  tbody: CSSObject;
  tr: {
    base: CSSObject;
  };
  td: {
    base: CSSObject;
  };
  pagination: {
    container: CSSObject;
    text: CSSObject;
    button: {
      base: CSSObject;
      enabled: CSSObject;
      disabled: CSSObject;
    };
  };
  sortIcon: {
    base: CSSObject;
    active: CSSObject;
  };
};

const dataTableTokens: DataTableToken = {
  container: {
    width: "100%",
    maxHeight: "calc(100vh - 2rem)",
    maxWidth: "calc(100vw - 2rem)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: FOUNDATION_THEME.unit[16],
      gap: FOUNDATION_THEME.unit[20],
      maxWidth: "100vw",
      overflowX: "auto",
      "@media (min-width: 768px)": {
        flexDirection: "row",
      },
    },
    title: {
      fontSize: FOUNDATION_THEME.font.size.heading.md.fontSize,
      fontWeight: 600,
      color: FOUNDATION_THEME.colors.gray[800],
    },
    description: {
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      color: FOUNDATION_THEME.colors.gray[500],
    },
  },
  filters: {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: FOUNDATION_THEME.unit[8],
      alignItems: "center",
    },
  },
  table: {
    base: {
      width: "100%",
      tableLayout: "auto",
      borderCollapse: "separate",
      borderSpacing: 0,
      position: "relative",
      minWidth: "max-content",
    }
  },
  thead: {
    base: {
      backgroundColor: FOUNDATION_THEME.colors.gray[25],
      borderBottom: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
      height: FOUNDATION_THEME.unit[40],
    },
  },
  th: {
    base: {
      padding: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[8]}`,
      textAlign: "left",
      fontWeight: 600,
      color: FOUNDATION_THEME.colors.gray[400],
      fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
    },
    sortable: {
      cursor: "pointer",
      userSelect: "none",
    },
  },
  tbody: {
  },
  tr: {
    base: {
      height: FOUNDATION_THEME.unit[56],
      "&:hover": {
        backgroundColor: FOUNDATION_THEME.colors.gray[50],
      },
    },
  },
  td: {
    base: {
      padding: `${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[12]}`,
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      color: FOUNDATION_THEME.colors.gray[500],
      fontWeight: FOUNDATION_THEME.font.weight[500],
      borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
    },
  },
  pagination: {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[16]}`,
      borderTop: `1px solid ${FOUNDATION_THEME.colors.gray[150]}`,
      height: FOUNDATION_THEME.unit[48],
      position: "sticky",
      bottom: 0,
      backgroundColor: FOUNDATION_THEME.colors.gray[25],
      zIndex: 0,
    },
    text: {
      fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
      color: FOUNDATION_THEME.colors.gray[600],
      display: "flex",
      alignItems: "center",
      gap: FOUNDATION_THEME.unit[8],
    },
    button: {
      base: {
        padding: FOUNDATION_THEME.unit[4],
        borderRadius: FOUNDATION_THEME.border.radius[2],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        background: "none",
        cursor: "pointer",
      },
      enabled: {
        "&:hover": {
          backgroundColor: FOUNDATION_THEME.colors.gray[100],
        },
        color: FOUNDATION_THEME.colors.gray[700],
      },
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        color: FOUNDATION_THEME.colors.gray[400],
      },
    },
  },
  sortIcon: {
    base: {
      marginLeft: FOUNDATION_THEME.unit[4],
      height: FOUNDATION_THEME.unit[16],
      width: FOUNDATION_THEME.unit[16],
      color: FOUNDATION_THEME.colors.gray[400],
    },
    active: {
      color: FOUNDATION_THEME.colors.gray[800],
    },
  },
};


export type TableTokenType = {
  padding: CSSObject["padding"];
  width: CSSObject["width"];
  display: CSSObject["display"];
  flexDirection: CSSObject["flexDirection"];
  position: CSSObject["position"];
  header: {
    display: CSSObject["display"];
    justifyContent: CSSObject["justifyContent"];
    alignItems: CSSObject["alignItems"];
    marginBottom: CSSObject["marginBottom"];
    gap: CSSObject["gap"];
    maxWidth: CSSObject["maxWidth"];
    overflowX: CSSObject["overflowX"];
    title: CSSObject;
    description: CSSObject;
  };
};

export const tableToken: TableTokenType = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: FOUNDATION_THEME.unit[2],
  position: "relative",
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: FOUNDATION_THEME.unit[16],
    gap: FOUNDATION_THEME.unit[20],
    maxWidth: "100vw",
    overflowX: "auto",
    title: {
      fontSize: FOUNDATION_THEME.font.size.heading.md.fontSize,
      fontWeight: 600,
      color: FOUNDATION_THEME.colors.gray[800],
    },
    description: {
      fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
      color: FOUNDATION_THEME.colors.gray[500],
      lineHeight: FOUNDATION_THEME.unit[20],
      maxWidth: "70%",
    },
  },
}

export const getTableToken = (foundationToken:  FoundationTokenType )  : TableTokenType => { 
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: foundationToken.unit[2],
    position: "relative",
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: foundationToken.unit[16],
      gap: foundationToken.unit[20],
      maxWidth: "100vw",
      overflowX: "auto",
      title: {
        fontSize: foundationToken.font.size.heading.md.fontSize,
        fontWeight: 600,
        color: foundationToken.colors.gray[800],
      },
      description: {
        fontSize: foundationToken.font.size.body.md.fontSize,
        color: foundationToken.colors.gray[500],
        lineHeight: foundationToken.unit[20],
        maxWidth: "70%",
      },
    },
  }
}

export default dataTableTokens; 