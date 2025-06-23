import { ColumnDefinition } from '../types';

export type TableCellProps<T extends Record<string, unknown>> = {
  column: ColumnDefinition<T>;
  row: T;
  isEditing: boolean;
  currentValue: unknown;
  width: string;
  onFieldChange: (value: unknown) => void;
}; 