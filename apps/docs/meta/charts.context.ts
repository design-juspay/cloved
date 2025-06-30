import type { TableRow } from "@/components/ui/BlendTypeTable";

const charts: TableRow[] = [
  {
    propName: "chartType",
    propType: "ChartType",
    typeDefinition: `enum ChartType {
      LINE = "line",
      BAR = "bar",
      PIE = "pie",
    }`,
    propDescription: "The type of chart to render",
    llmContext: "The type of chart to render",
    propDefault: "ChartType.LINE",
  },
  {
    propName: "data",
    propType: "NewNestedDataPoint[]",
    typeDefinition: `type NewNestedDataPoint = {
      name: string;
      data: {
        [key: string]: DataPoint;
      };
    }
    
    type DataPoint = {
      primary: {
        label: string;
        val: number;
      };
      aux?: {
        label: string;
        val: number;
      }[];
    };
    `,
    propDescription: "Array of data points for chart visualization",
    llmContext: "Array of data points for chart visualization",
    propDefault: "-",
  },
  {
    propName: "xAxisLabel",
    propType: "string",
    typeDefinition: "string",
    propDescription: "Label for the X-axis",
    llmContext: "Label for the X-axis",
    propDefault: "-",
  },
  {
    propName: "yAxisLabel",
    propType: "string",
    typeDefinition: "string",
    propDescription: "Label for the Y-axis",
    llmContext: "Label for the Y-axis",
    propDefault: "-",
  },
  {
    propName: "colors",
    propType: "string[]",
    typeDefinition: "string[]",
    propDescription: "Array of colors for chart elements",
    llmContext: "Array of colors for chart elements",
    propDefault: "DEFAULT_COLORS",
  },
  {
    propName: "metrics",
    propType: "string[]",
    typeDefinition: "string[]",
    propDescription: "Array of metric names to display",
    llmContext: "Array of metric names to display",
    propDefault: "-",
  },
  {
    propName: "slot1",
    propType: "ReactNode",
    typeDefinition: "ReactNode",
    propDescription: "First slot for custom content in chart header",
    llmContext: "First slot for custom content in chart header",
    propDefault: "-",
  },
  {
    propName: "slot2",
    propType: "ReactNode",
    typeDefinition: "ReactNode",
    propDescription: "Second slot for custom content in chart header",
    llmContext: "Second slot for custom content in chart header",
    propDefault: "-",
  },
  {
    propName: "slot3",
    propType: "ReactNode",
    typeDefinition: "ReactNode",
    propDescription: "Third slot for custom content in chart header",
    llmContext: "Third slot for custom content in chart header",
    propDefault: "-",
  },
  {
    propName: "legendPosition",
    propType: "ChartLegendPosition",
    typeDefinition: `enum ChartLegendPosition {
      TOP = "top",
      RIGHT = "right",
    }`,
    propDescription: "Position of the chart legend",
    llmContext: "Position of the chart legend",
    propDefault: "ChartLegendPosition.TOP",
  },
  {
    propName: "chartHeaderSlot",
    propType: "ReactNode",
    typeDefinition: "ReactNode",
    propDescription: "Custom content for the chart header",
    llmContext: "Custom content for the chart header",
    propDefault: "-",
  },
];

export default charts;
