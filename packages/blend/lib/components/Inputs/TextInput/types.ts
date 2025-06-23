export enum TextInputSize {
  MEDIUM = "md",
  LARGE = "lg",
}

// export enum InputVariant {
//   SEARCH = "search",
//   TEXT = "text",
// }

export enum TextInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
  DISABLED = "disabled",
}


export type InputProps = {
  required?: boolean;
  label: string;
  sublabel?: string;
  hintText?: string;
  helpIconHintText?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  size?: TextInputSize;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
};
