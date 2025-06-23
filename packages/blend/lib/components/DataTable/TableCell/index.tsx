import { forwardRef } from 'react';
import { styled } from 'styled-components';
import { TableCellProps } from './types';
import dataTableTokens from '../dataTable.tokens';
import Block from '../../Primitives/Block/Block';
import PrimitiveInput from '../../Primitives/PrimitiveInput/PrimitiveInput';
import { FOUNDATION_THEME } from '../../../tokens';

const StyledTableCell = styled.td<{ width?: string; $hasCustomContent?: boolean }>`
  ${dataTableTokens.td.base}
  ${props => props.width && `width: ${props.width};`}
  overflow: hidden;
  box-sizing: border-box;
  max-width: 0;
`;

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps<Record<string, unknown>>>(({
  column,
  row,
  isEditing,
  currentValue,
  width,
  onFieldChange,
}, ref) => {
  const renderContent = () => {
    if (isEditing && column.isEditable) {
      if (column.renderEditCell) {
        return column.renderEditCell(
          currentValue,
          row,
          onFieldChange
        );
      } else {
        return (
          <Block style={{ 
            width: '100%', 
            padding: '2px 0',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <PrimitiveInput
              value={String(currentValue || '')}
              onChange={(e) => onFieldChange(e.target.value)}
              style={{
                width: 'calc(100% - 8px)',
                height: `${FOUNDATION_THEME.unit[32]}`,
                border: `1px solid ${FOUNDATION_THEME.colors.gray[300]}`,
                borderRadius: '4px',
                padding: `${FOUNDATION_THEME.unit[0]} ${FOUNDATION_THEME.unit[8]}`,
                fontSize: FOUNDATION_THEME.font.size.body.md.fontSize,
                color: `${FOUNDATION_THEME.colors.gray[600]}`,
                fontWeight: FOUNDATION_THEME.font.weight[500],
                backgroundColor: `${FOUNDATION_THEME.colors.gray[0]}`,
                outline: 'none',
                boxSizing: 'border-box',
                margin: '0',
                minWidth: '0',
                maxWidth: '100%'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = `${FOUNDATION_THEME.colors.primary[600]}`;
                e.target.style.boxShadow = `0 0 0 1px ${FOUNDATION_THEME.colors.primary[100]}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = `${FOUNDATION_THEME.colors.gray[300]}`;
                e.target.style.boxShadow = 'none';
              }}
            />
          </Block>
        );
      }
    }

    if (column.renderCell) {
      return (
        <Block style={{ width: '100%' }}>
          {column.renderCell(currentValue, row)}
        </Block>
      );
    }

    return (
      <Block 
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
          lineHeight: '1.5'
        }}
        title={currentValue != null ? String(currentValue) : ''}
      >
        {currentValue != null ? String(currentValue) : ''}
      </Block>
    );
  };

  return (
    <StyledTableCell 
      ref={ref}
      width={width}
      $hasCustomContent={!!column.renderCell || (isEditing && column.isEditable)}
      style={{ 
        width: width,
        minWidth: width,
        maxWidth: width,
        verticalAlign: 'middle',
        position: 'relative'
      }}
    >
      <Block style={{ 
        width: '100%', 
        minHeight: `${FOUNDATION_THEME.unit[36]}`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {renderContent()}
      </Block>
    </StyledTableCell>
  );
});

TableCell.displayName = "TableCell";

export default TableCell; 