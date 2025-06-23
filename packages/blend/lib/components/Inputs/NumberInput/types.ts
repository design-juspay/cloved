export enum NumberInputSize {
  MEDIUM = "md",
  LARGE = "lg",
}

export type NumberInputProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  size?: NumberInputSize;
  disabled?: boolean;
  placeholder?: string;
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  hintText?: string;
  name?: string;
};