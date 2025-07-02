"use client";
import React from "react";
import Tooltip from "./Tooltip";
import { InfoIcon } from "lucide-react";

export type TableRow = {
  propName: string;
  propType: string;
  propDescription: string;
  propDefault: string;
  typeDefinition?: string;
  llmContext?: string;
  // New fields for MCP functionality
  category?: string; // For prop grouping (e.g., "Styling", "Behavior", "Content")
  required?: boolean; // Whether prop is required
};

export type ExampleUsage = {
  title: string;
  description?: string;
  code: string;
};

export type ComponentMeta = {
  componentName: string;
  componentDescription?: string;
  features?: string[];
  usageExamples?: ExampleUsage[];
  props: TableRow[];
};

const BlendTypeTable = ({ componentMeta, tableRows }: { componentMeta?: ComponentMeta; tableRows?: TableRow[] }) => {
  // Use componentMeta.props if available, otherwise fall back to tableRows
  const propsToRender = componentMeta?.props || tableRows || [];
  
  // Group props by category
  const groupedProps = propsToRender.reduce((acc, prop) => {
    const category = prop.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(prop);
    return acc;
  }, {} as Record<string, TableRow[]>);

  const categories = Object.keys(groupedProps).sort();

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            {category}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Prop Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Required
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    Default
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {groupedProps[category].map((row) => (
                  <tr key={row.propName} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm font-mono text-blue-600 dark:text-blue-400">
                      {row.propName}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                          {row.propType}
                        </code>
                        {row.typeDefinition && (
                          <Tooltip content={row.typeDefinition} side="right">
                            <InfoIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.required 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>
                        {row.required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {row.propDescription}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {row.propDefault}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export { BlendTypeTable };
export default BlendTypeTable;
