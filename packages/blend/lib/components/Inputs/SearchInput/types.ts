export type SearchInputProps = {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  error?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};
