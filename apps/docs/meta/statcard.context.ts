import type { TableRow } from "@/components/ui/BlendTypeTable";

const statcard: TableRow[] = [
  {
    propName: "title",
    propType: "string",
    typeDefinition: "string",
    propDescription: "The title of the stat card",
    llmContext: "The title of the stat card",
    propDefault: "-",
  },
  {
    propName: "value",
    propType: "string | number",
    typeDefinition: "string | number",
    propDescription: "The main value to display in the stat card",
    llmContext: "The main value to display in the stat card",
    propDefault: "-",
  },
  {
    propName: "change",
    propType: "StatCardChange",
    typeDefinition: `type StatCardChange = {
        value: number;
        type: ChangeType;
    }`,
    propDescription: "Change indicator showing increase or decrease with value",
    llmContext: "Change indicator showing increase or decrease with value",
    propDefault: "-",
  },
  {
    propName: "subtitle",
    propType: "string",
    typeDefinition: "string",
    propDescription: "Optional subtitle text for the stat card",
    llmContext: "Optional subtitle text for the stat card",
    propDefault: "-",
  },
  {
    propName: "variant",
    propType: "StatCardVariant",
    typeDefinition: `enum StatCardVariant {
      LINE = "line",
      PROGRESS_BAR = "progress",
      BAR = "bar",
      NUMBER = "number",
    }`,
    propDescription: "The visual variant of the stat card",
    llmContext: "The visual variant of the stat card",
    propDefault: "StatCardVariant.NUMBER",
  },
  {
    propName: "chartData",
    propType: "ChartDataPoint[]",
    typeDefinition: `type ChartDataPoint = {
      value: number;
      label: string;
      date?: string;
    }`,
    propDescription: "Array of data points for chart visualization",
    llmContext: "Array of data points for chart visualization",
    propDefault: "-",
  },
  {
    propName: "progressValue",
    propType: "number",
    typeDefinition: "number",
    propDescription: "Progress value for progress bar variant (0-100)",
    llmContext: "Progress value for progress bar variant (0-100)",
    propDefault: "-",
  },
  {
    propName: "titleIcon",
    propType: "React.ReactNode",
    typeDefinition: "React.ReactNode",
    propDescription: "Icon to display next to the title",
    llmContext: "Icon to display next to the title",
    propDefault: "-",
  },
  {
    propName: "actionIcon",
    propType: "React.ReactNode",
    typeDefinition: "React.ReactNode",
    propDescription: "Icon for action button in the stat card",
    llmContext: "Icon for action button in the stat card",
    propDefault: "-",
  },
  {
    propName: "helpIconText",
    propType: "string",
    typeDefinition: "string",
    propDescription: "Text to display in help tooltip",
    llmContext: "Text to display in help tooltip",
    propDefault: "-",
  },
];

export default statcard;
