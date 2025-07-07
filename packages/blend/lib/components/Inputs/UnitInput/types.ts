export enum UnitInputSize {
  MEDIUM = "md",
  LARGE = "lg",
}

export enum UnitPosition {
  LEFT = "left",
  RIGHT = "right",
}

export type UnitInputProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  size?: UnitInputSize;
  disabled?: boolean;
  placeholder?: string;
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  hintText?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  unit: string;
  unitPosition?: UnitPosition;
  name?: string;
};
