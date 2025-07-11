"use client";
import React from "react";
import Tooltip from "./Tooltip";
import { Info } from "lucide-react";

export type TableCell = {
  content: string | React.ReactNode;
  hintText?: string | React.ReactNode;
};

export type DocsTypeTableProps = {
  columns: string[];
  data: TableCell[][];
  isHoverable?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  className?: string;
  onRowClick?: (row: TableCell[], index: number) => void;
};

const TableHeader = ({ columns }: { columns: string[] }) => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <span>{column}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({
  data,
  isHoverable = false,
  onRowClick,
}: {
  data: TableCell[][];
  isHoverable?: boolean;
  onRowClick?: (row: TableCell[], index: number) => void;
}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={`
            ${isHoverable ? "hover:bg-gray-50" : ""}
            ${onRowClick ? "cursor-pointer" : ""}
          `}
          onClick={() => onRowClick?.(row, rowIndex)}
        >
          {row.map((cell, cellIndex) => {
            const hasTooltip = cell.hintText !== undefined;

            return (
              <td
                key={`${rowIndex}-${cellIndex}`}
                className="py-4 text-sm text-gray-900"
              >
                <div className="flex items-center gap-2 px-6">
                  <span className="block">{cell.content}</span>
                  {hasTooltip && (
                    <Tooltip content={cell.hintText!}>
                      <Info size={12} color="var(--muted-foreground)" />
                    </Tooltip>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

const DocsTypeTable = ({
  columns,
  data,
  isHoverable = true,
  isLoading = false,
  emptyMessage = "No data available",
  loadingMessage = "Loading...",
  className = "",
  onRowClick,
}: DocsTypeTableProps) => {
  if (isLoading) {
    return (
      <div
        className={`w-full overflow-hidden border border-gray-200 rounded-lg ${className}`}
      >
        <div className="p-6 text-center text-gray-500">{loadingMessage}</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className={`w-full overflow-hidden border border-gray-200 rounded-lg ${className}`}
      >
        <div className="p-6 text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div
      className={`w-full overflow-hidden border border-gray-200 rounded-lg ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <TableHeader columns={columns} />
          <TableBody
            data={data}
            isHoverable={isHoverable}
            onRowClick={onRowClick}
          />
        </table>
      </div>
    </div>
  );
};

export default DocsTypeTable;
