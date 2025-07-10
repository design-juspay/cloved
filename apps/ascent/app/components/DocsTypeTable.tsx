"use client";
import React from "react";

export enum ColumnType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  BOOLEAN = "boolean",
  CUSTOM = "custom",
}

export type ColumnDefinition<T extends Record<string, unknown>> = {
  field: keyof T;
  header: string;
  type: ColumnType;
  minWidth?: string;
  maxWidth?: string;
  isVisible?: boolean;
  className?: string;
  renderCell?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  renderHeader?: (header: string) => React.ReactNode;
};

export type DocsTypeTableProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  idField: keyof T;
  isHoverable?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
};

const TableHeader = <T extends Record<string, unknown>>({
  columns,
}: {
  columns: ColumnDefinition<T>[];
}) => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.field)}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ""}`}
            style={{
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
            }}
          >
            <div className="flex items-center gap-2">
              {column.renderHeader ? (
                column.renderHeader(column.header)
              ) : (
                <span>{column.header}</span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = <T extends Record<string, unknown>>({
  data,
  columns,
  idField,
  isHoverable = false,
  onRowClick,
}: {
  data: T[];
  columns: ColumnDefinition<T>[];
  idField: keyof T;
  isHoverable?: boolean;
  onRowClick?: (row: T, index: number) => void;
}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, index) => (
        <tr
          key={String(row[idField])}
          className={`
            ${isHoverable ? "hover:bg-gray-50" : ""}
            ${onRowClick ? "cursor-pointer" : ""}
          `}
          onClick={() => onRowClick?.(row, index)}
        >
          {columns.map((column) => (
            <td
              key={`${String(row[idField])}-${String(column.field)}`}
              className="py-4 text-sm text-gray-900"
              style={{
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
            >
              <span className="block px-6">
                {String(row[column.field] ?? "")}
              </span>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const DocsTypeTable = <T extends Record<string, unknown>>({
  data,
  columns: initialColumns,
  idField,
  isHoverable = true,
  onRowClick,
}: DocsTypeTableProps<T>) => {
  const visibleColumns = React.useMemo(() => {
    return initialColumns.filter((col) => col.isVisible !== false);
  }, [initialColumns]);

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <TableHeader columns={visibleColumns} />

          <TableBody
            data={data}
            columns={visibleColumns}
            idField={idField}
            isHoverable={isHoverable}
            onRowClick={onRowClick}
          />
        </table>
      </div>
    </div>
  );
};

export default DocsTypeTable;
