import { forwardRef, useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, ArrowUp, ArrowDown } from 'lucide-react';
import { styled } from 'styled-components';
import { TableHeaderProps } from './types';
import { FilterType, ColumnDefinition } from '../types';
import dataTableTokens from '../dataTable.tokens';
import { Checkbox } from '../../../main';
import { CheckboxSize } from '../../Checkbox/types';
import { ColumnManager } from '../ColumnManager';
import Block from '../../Primitives/Block/Block';
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText';
import { FOUNDATION_THEME } from '../../../tokens';
import { Popover } from '../../Popover';
import { PopoverSize } from '../../Popover/types';
import { ColumnType, getColumnTypeConfig } from '../columnTypes';
import { getUniqueColumnValues } from '../utils';
import { SearchInput } from '../../Inputs/SearchInput';
import MultiSelectMenu from '../../MultiSelect/MultiSelectMenu';
import SingleSelectMenu from '../../SingleSelect/SingleSelectMenu';
import { SelectMenuGroupType } from '../../Select/types';

const TableHead = styled.thead`
  ${dataTableTokens.thead.base}
  background-color: ${FOUNDATION_THEME.colors.gray[25]};
`;

const TableHeaderCell = styled.th<{ $isSortable?: boolean; width?: string }>`
  ${dataTableTokens.th.base}
  ${props => props.$isSortable && dataTableTokens.th.sortable}
  ${props => props.width && `width: ${props.width};`}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
`;

const TableRow = styled.tr`
  ${dataTableTokens.tr.base}
`;

const MoreIcon = styled(MoreVertical)`
  cursor: pointer;
  color: ${FOUNDATION_THEME.colors.gray[400]};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${FOUNDATION_THEME.colors.gray[600]};
  }
`;

const EditIcon = styled(Edit2)`
  cursor: pointer;
  color: ${FOUNDATION_THEME.colors.gray[500]};
  
  &:hover {
    color: ${FOUNDATION_THEME.colors.primary[600]};
  }
`;

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps<Record<string, unknown>>>(({
  visibleColumns,
  initialColumns,
  selectAll,
  enableInlineEdit = false,
  enableColumnManager = true,
  enableRowExpansion = false,
  data,
  onSort,
  onSelectAll,
  onColumnChange,
  onHeaderChange,
  onColumnFilter,
  getColumnWidth,
}, ref) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [localColumns, setLocalColumns] = useState(visibleColumns);
  const [columnSearchValues, setColumnSearchValues] = useState<Record<string, string>>({});
  const [columnSelectedValues, setColumnSelectedValues] = useState<Record<string, string[]>>({});
  const [selectMenuStates, setSelectMenuStates] = useState<Record<string, boolean>>({});
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalColumns(visibleColumns);
  }, [visibleColumns]);

  useEffect(() => {
    if (editingField && editableRef.current) {
      editableRef.current.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [editingField]);

  const handleHeaderEdit = (field: string) => {
    setEditingField(field);
  };

  const handleHeaderSave = (field: string, newValue?: string) => {
    const valueToSave = newValue || editableRef.current?.textContent || '';
    const trimmedValue = valueToSave.trim();
    const currentColumn = localColumns.find(col => String(col.field) === field);
    
    if (currentColumn && trimmedValue !== currentColumn.header) {
      const updatedColumns = localColumns.map(col => 
        String(col.field) === field 
          ? { ...col, header: trimmedValue }
          : col
      );
      setLocalColumns(updatedColumns);
      
      onHeaderChange?.(field as keyof Record<string, unknown>, trimmedValue);
      onColumnChange?.(updatedColumns);
    }
    setEditingField(null);
  };

  const handleHeaderKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleHeaderSave(field, e.currentTarget.textContent || '');
    } else if (e.key === 'Escape') {
      setEditingField(null);
    }
  };

  const handleSort = (field: string) => {
    onSort(field as keyof Record<string, unknown>);
  };

  const getFilterOptions = (column: ColumnDefinition<Record<string, unknown>>) => {
    if (column.filterOptions) {
      return column.filterOptions;
    }
    
    if (!data) return [];
    const uniqueValues = getUniqueColumnValues(data, column.field);
    return uniqueValues.map((val: unknown) => ({
      id: String(val),
      label: String(val),
      value: String(val)
    }));
  };

  const getMenuItems = (column: ColumnDefinition<Record<string, unknown>>): SelectMenuGroupType[] => {
    const filterOptions = getFilterOptions(column);
    return [
      {
        groupLabel: `${column.header} Options`,
        items: filterOptions.map((option) => ({
          label: option.label,
          value: option.value,
          onClick: () => {}
        })),
        showSeparator: false
      }
    ];
  };

  const renderColumnFilter = (column: ColumnDefinition<Record<string, unknown>>) => {
    const columnConfig = getColumnTypeConfig(column.type || ColumnType.TEXT);
    const fieldKey = String(column.field);

    if (!columnConfig.supportsFiltering) {
      return (
        <Block padding={FOUNDATION_THEME.unit[12]}>
          <PrimitiveText style={{ 
            fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
            color: FOUNDATION_THEME.colors.gray[500]
          }}>
            No filters available for this column
          </PrimitiveText>
        </Block>
      );
    }

    return (
      <Block display="flex" flexDirection="column" gap={FOUNDATION_THEME.unit[8]} minWidth="250px" padding={FOUNDATION_THEME.unit[4]}>

        {columnConfig.supportsSorting && (
          <Block display="flex" flexDirection="column" gap={FOUNDATION_THEME.unit[4]}>
            <Block
              display="flex"
              alignItems="center"
              gap={FOUNDATION_THEME.unit[8]}
              padding={FOUNDATION_THEME.unit[8]}
              borderRadius={FOUNDATION_THEME.border.radius[4]}
              cursor="pointer"
              _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50]
              }}
              onClick={() => {
                handleSort(fieldKey);
              }}
            >
              <ArrowUp size={16} color={FOUNDATION_THEME.colors.gray[600]} />
              <PrimitiveText style={{ fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize }}>
                Sort Ascending
              </PrimitiveText>
            </Block>
            <Block
              display="flex"
              alignItems="center"
              gap={FOUNDATION_THEME.unit[8]}
              padding={FOUNDATION_THEME.unit[8]}
              borderRadius={FOUNDATION_THEME.border.radius[4]}
              cursor="pointer"
              _hover={{
                backgroundColor: FOUNDATION_THEME.colors.gray[50]
              }}
              onClick={() => {
                handleSort(fieldKey);
              }}
            >
              <ArrowDown size={16} color={FOUNDATION_THEME.colors.gray[600]} />
              <PrimitiveText style={{ fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize }}>
                Sort Descending
              </PrimitiveText>
            </Block>
          </Block>
        )}

        {/* Filter Section */}
        <Block 
          height="1px" 
          backgroundColor={FOUNDATION_THEME.colors.gray[200]} 
          marginY={FOUNDATION_THEME.unit[8]}
        />

        <Block display="flex" alignItems="center" justifyContent="space-between">
          <PrimitiveText style={{ 
            fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize, 
            fontWeight: FOUNDATION_THEME.font.weight[600] 
          }}>
            Filter {column.header}
          </PrimitiveText>
          {((columnSearchValues[fieldKey] && columnSearchValues[fieldKey] !== '') || 
            (columnSelectedValues[fieldKey] && columnSelectedValues[fieldKey].length > 0)) && (
            <PrimitiveText
              onClick={() => {
                setColumnSearchValues(prev => ({ ...prev, [fieldKey]: '' }));
                setColumnSelectedValues(prev => ({ ...prev, [fieldKey]: [] }));
                onColumnFilter?.(column.field, FilterType.TEXT, '', 'equals');
              }}
              style={{
                fontSize: FOUNDATION_THEME.font.size.body.xs.fontSize,
                color: FOUNDATION_THEME.colors.primary[600],
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear
            </PrimitiveText>
          )}
        </Block>

        {/* Search Filter */}
        {columnConfig.filterComponent === 'search' && (
          <SearchInput
            placeholder={`Search ${column.header}...`}
            value={columnSearchValues[fieldKey] || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setColumnSearchValues(prev => ({ ...prev, [fieldKey]: value }));
              onColumnFilter?.(column.field, FilterType.TEXT, value, 'contains');
            }}
          />
        )}

        {columnConfig.filterComponent === 'select' && (
          <SingleSelectMenu
            items={getMenuItems(column)}
            selected={columnSelectedValues[fieldKey]?.[0] || ''}
            onSelect={(value) => {
              setColumnSelectedValues(prev => ({ ...prev, [fieldKey]: [value] }));
              onColumnFilter?.(column.field, FilterType.SELECT, value, 'equals');
            }}
            open={selectMenuStates[`${fieldKey}_single`] || false}
            onOpenChange={(open) => {
              setSelectMenuStates(prev => ({ ...prev, [`${fieldKey}_single`]: open }));
            }}
            enableSearch={true}
            trigger={
              <Block
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`}
                border={`1px solid ${FOUNDATION_THEME.colors.gray[300]}`}
                borderRadius={FOUNDATION_THEME.border.radius[8]}
                backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                cursor="pointer"
                _hover={{
                  backgroundColor: FOUNDATION_THEME.colors.gray[25]
                }}
              >
                <PrimitiveText style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                  color: columnSelectedValues[fieldKey]?.[0] ? FOUNDATION_THEME.colors.gray[700] : FOUNDATION_THEME.colors.gray[400]
                }}>
                  {columnSelectedValues[fieldKey]?.[0] || 'Select option...'}
                </PrimitiveText>
                <PrimitiveText style={{ fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize }}>
                  ▼
                </PrimitiveText>
              </Block>
            }
          />
        )}

        {columnConfig.filterComponent === 'multiselect' && (
          <MultiSelectMenu
            items={getMenuItems(column)}
            selected={columnSelectedValues[fieldKey] || []}
            onSelect={(value) => {
              const currentSelected = columnSelectedValues[fieldKey] || [];
              let newSelected = [...currentSelected];
              if (newSelected.includes(value)) {
                newSelected = newSelected.filter(v => v !== value);
              } else {
                newSelected.push(value);
              }
              setColumnSelectedValues(prev => ({ ...prev, [fieldKey]: newSelected }));
              onColumnFilter?.(column.field, FilterType.MULTISELECT, newSelected, 'equals');
            }}
            open={selectMenuStates[`${fieldKey}_multi`] || false}
            onOpenChange={(open) => {
              setSelectMenuStates(prev => ({ ...prev, [`${fieldKey}_multi`]: open }));
            }}
            trigger={
              <Block
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={`${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[12]}`}
                border={`1px solid ${FOUNDATION_THEME.colors.gray[300]}`}
                borderRadius={FOUNDATION_THEME.border.radius[8]}
                backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                cursor="pointer"
                _hover={{
                  backgroundColor: FOUNDATION_THEME.colors.gray[25]
                }}
              >
                <PrimitiveText style={{
                  fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                  color: (columnSelectedValues[fieldKey]?.length || 0) > 0 ? FOUNDATION_THEME.colors.gray[700] : FOUNDATION_THEME.colors.gray[400]
                }}>
                  {(columnSelectedValues[fieldKey]?.length || 0) > 0 ? 
                    `${columnSelectedValues[fieldKey]?.length} selected` :
                    'Select options...'
                  }
                </PrimitiveText>
                <PrimitiveText style={{ fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize }}>
                  ▼
                </PrimitiveText>
              </Block>
            }
          />
        )}

        {(columnConfig.filterComponent === 'dateRange' || columnConfig.filterComponent === 'numberRange') && (
          <Block display="flex" flexDirection="column" gap={FOUNDATION_THEME.unit[4]}>
            <PrimitiveText style={{ 
              fontSize: FOUNDATION_THEME.font.size.body.xs.fontSize,
              color: FOUNDATION_THEME.colors.gray[600]
            }}>
              {columnConfig.filterComponent === 'dateRange' ? 'Date range filtering coming soon...' : 'Number range filtering coming soon...'}
            </PrimitiveText>
          </Block>
        )}
      </Block>
    );
  };

  return (
    <TableHead ref={ref} style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <TableRow>
        {enableRowExpansion && (
          <TableHeaderCell $isSortable={false} width="50px" style={{ minWidth: '50px', maxWidth: '50px' }}>
            <Block display='flex' alignItems='center' justifyContent='center'>
            </Block>
          </TableHeaderCell>
        )}
        
        <TableHeaderCell $isSortable={false} width="60px" style={{ minWidth: '60px', maxWidth: '60px' }}>
          <Block display='flex' alignItems='center' justifyContent='center' width={FOUNDATION_THEME.unit[40]}>
            <Checkbox
              checked={selectAll}
              onCheckedChange={onSelectAll}
              size={CheckboxSize.MEDIUM}
            />
          </Block>
        </TableHeaderCell>

        {localColumns.map((column, index) => {
          const columnWidth = getColumnWidth(column, index);
          const isEditing = editingField === String(column.field);
          const columnConfig = getColumnTypeConfig(column.type || ColumnType.TEXT);
          
          return (
            <TableHeaderCell
              key={String(column.field)}
              $isSortable={!!column.isSortable}
              width={columnWidth}
              style={{ 
                width: columnWidth,
                minWidth: columnWidth,
                maxWidth: columnWidth
              }}
            >
              <Block
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                gap='8px'
                width='100%'
                minWidth={0}
                onMouseEnter={() => setHoveredField(String(column.field))}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Block 
                  display='flex' 
                  alignItems='center' 
                  minWidth={0}
                  flexGrow={1}
                  overflow='hidden'
                >
                  {isEditing ? (
                    <Block
                      ref={editableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleHeaderSave(String(column.field), e.currentTarget.textContent || '')}
                      onKeyDown={(e) => handleHeaderKeyDown(e, String(column.field))}
                      style={{
                        minWidth: 0,
                        flex: 1,
                        outline: 'none',
                        cursor: 'text',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {column.header}
                    </Block>
                  ) : (
                    <Block
                      display='flex'
                      alignItems='center'
                      minWidth={0}
                      flexGrow={1}
                      position='relative'
                    >
                      <PrimitiveText
                        title={column.header}
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                          flex: 1
                        }}
                      >
                        {column.header}
                      </PrimitiveText>
                      {enableInlineEdit && (
                        <Block
                          as='span'
                          className="edit-icon-wrapper"
                          display='flex'
                          alignItems='center'
                          marginLeft='4px'
                          opacity={hoveredField === String(column.field) ? 1 : 0}
                          transition='opacity 0.2s'
                          zIndex={2}
                          flexShrink={0}
                        >
                          <EditIcon 
                            size={14} 
                            onClick={() => handleHeaderEdit(String(column.field))}
                          />
                        </Block>
                      )}
                    </Block>
                  )}
                </Block>

                {(columnConfig.supportsSorting || columnConfig.supportsFiltering) && (
                  <Block
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexShrink={0}
                    width='16px'
                    height='16px'
                  >
                    <Popover
                      trigger={<MoreIcon size={16} />}
                      heading={`${column.header} Options`}
                      size={PopoverSize.SMALL}
                    >
                      {renderColumnFilter(column)}
                    </Popover>
                  </Block>
                )}
              </Block>
            </TableHeaderCell>
          );
        })}

        {enableInlineEdit && (
          <TableHeaderCell $isSortable={false} width="100px" style={{ minWidth: '100px', maxWidth: '100px' }}>
            <Block display='flex' alignItems='center' justifyContent='center'>
              <PrimitiveText as='span' style={{ fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize }}>
                Actions
              </PrimitiveText>
            </Block>
          </TableHeaderCell>
        )}

        {enableColumnManager && (
          <TableHeaderCell $isSortable={false} width="50px" style={{ minWidth: '50px', maxWidth: '50px' }}>
            <Block position='relative'>
              <ColumnManager
                columns={initialColumns}
                visibleColumns={localColumns}
                onColumnChange={onColumnChange}
              />
            </Block>
          </TableHeaderCell>
        )}
      </TableRow>
    </TableHead>
  );
});

TableHeader.displayName = "TableHeader";

export default TableHeader;