import type { TableRow } from "@/components/ui/BlendTypeTable";

const button: TableRow[] = [
  {
    propName: "buttonType",
    propType: "ButtonTypeV2",
    typeDefinition: `enum ButtonTypeV2 {
      PRIMARY = "primary",
      SECONDARY = "secondary",
      DANGER = "danger",
      SUCCESS = "success",
    }`,
    propDescription: "The type of button to use",
    llmContext: "The type of button to use",
    propDefault: "ButtonTypeV2.PRIMARY",
  },
  {
    propName: "size",
    propType: "ButtonSizeV2",
    typeDefinition: `enum ButtonSizeV2 {
      SMALL = "sm",
      MEDIUM = "md",
      LARGE = "lg",
    }`,
    propDescription: "The size of the button",
    llmContext: "The size of the button",
    propDefault: "ButtonSizeV2.MEDIUM",
  },
  {
    propName: "subType",
    propType: "ButtonSubTypeV2",
    typeDefinition: `enum ButtonSubTypeV2 {
      DEFAULT = "default",
      ICON_ONLY = "iconOnly",
      INLINE = "inline",
    }`,
    propDescription: "The subtype of the button",
    llmContext: "The subtype of the button",
    propDefault: "ButtonSubTypeV2.DEFAULT",
  },
  {
    propName: "text",
    propType: "string",
    typeDefinition: "string",
    propDescription: "The text content of the button",
    llmContext: "The text content of the button",
    propDefault: "undefined",
  },
  {
    propName: "leadingIcon",
    propType: "React.ReactNode",
    typeDefinition: "React.ReactNode",
    propDescription: "Icon to display before the button text",
    llmContext: "Icon to display before the button text",
    propDefault: "undefined",
  },
  {
    propName: "trailingIcon",
    propType: "React.ReactNode",
    typeDefinition: "React.ReactNode",
    propDescription: "Icon to display after the button text",
    llmContext: "Icon to display after the button text",
    propDefault: "undefined",
  },
  {
    propName: "disabled",
    propType: "boolean",
    typeDefinition: "boolean",
    propDescription: "Whether the button is disabled",
    llmContext: "Whether the button is disabled",
    propDefault: "false",
  },
  {
    propName: "onClick",
    propType: "function",
    typeDefinition: "() => void",
    propDescription: "Callback function called when button is clicked",
    llmContext: "Callback function called when button is clicked",
    propDefault: "undefined",
  },
  {
    propName: "loading",
    propType: "boolean",
    typeDefinition: "boolean",
    propDescription: "Whether the button is in loading state",
    llmContext: "Whether the button is in loading state",
    propDefault: "false",
  },
  {
    propName: "buttonGroupPosition",
    propType: "'center' | 'left' | 'right'",
    typeDefinition: "'center' | 'left' | 'right'",
    propDescription: "Position of the button within a button group",
    llmContext: "Position of the button within a button group",
    propDefault: "undefined",
  },
  {
    propName: "fullWidth",
    propType: "boolean",
    typeDefinition: "boolean",
    propDescription:
      "Whether the button should take full width of its container",
    llmContext: "Whether the button should take full width of its container",
    propDefault: "false",
  },
  {
    propName: "justifyContent",
    propType: "CSSObject['justifyContent']",
    typeDefinition: "CSSObject['justifyContent']",
    propDescription:
      "CSS justify-content property for button content alignment",
    llmContext: "CSS justify-content property for button content alignment",
    propDefault: "undefined",
  },
];

export default button;
