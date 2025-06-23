import { TextInputSize } from "../TextInput/types";

import { SelectMenuGroupType } from "../../Select/types";

export enum DropdownInputSize {
  MD = "md",
  LG = "lg",
}

export enum DropdownInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
  DISABLED = "disabled",
}

export type DropdownInputProps = {
  label: string;
  sublabel?: string;
  disabled?: boolean;
  helpIconHintText?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  hintText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  slot?: React.ReactNode;
  size?: TextInputSize;
  placeholder?: string;
  dropDownValue?: string;
  onDropDownChange?: (value: string) => void;
  dropDownItems: SelectMenuGroupType[];
};
