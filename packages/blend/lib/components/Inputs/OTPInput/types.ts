export type OTPProps = {
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  name?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  hintText?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  form?: string;
};
