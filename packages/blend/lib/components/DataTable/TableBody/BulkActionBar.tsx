import { forwardRef } from 'react';
import { Download, X } from 'lucide-react';
import Button from '../../Button/Button';
import { ButtonSize, ButtonType } from '../../Button/types';
import Block from '../../Primitives/Block/Block';
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText';
import { FOUNDATION_THEME } from '../../../tokens';

export type BulkActionBarProps = {
  selectedCount: number;
  onExport: () => void;
  onDeselectAll: () => void;
  customActions?: React.ReactNode;
};

const BulkActionBar = forwardRef<HTMLDivElement, BulkActionBarProps>(({
  selectedCount,
  onExport,
  onDeselectAll,
  customActions,
}, ref) => {
  if (selectedCount === 0) return null;

  return (
    <Block
      ref={ref}
      style={{
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: FOUNDATION_THEME.colors.gray[0],
        color: FOUNDATION_THEME.colors.gray[700],
        borderRadius: `${FOUNDATION_THEME.border.radius[12]}`,
        padding: `${FOUNDATION_THEME.unit[8]} ${FOUNDATION_THEME.unit[16]}`,
        boxShadow: FOUNDATION_THEME.shadows.lg,
        display: 'flex',
        alignItems: 'center',
        gap: FOUNDATION_THEME.unit[12],
        minWidth: '320px',
        border: `${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`,
      }}
    >
      <PrimitiveText
        style={{
          fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
          fontWeight: FOUNDATION_THEME.font.weight[500],
          flex: 1,        }}
      >
        {selectedCount} selected
      </PrimitiveText>

      <Block display='flex' alignItems='center' gap={FOUNDATION_THEME.unit[8]}>
        <Button
          buttonType={ButtonType.SECONDARY}
          leadingIcon={Download}
          size={ButtonSize.SMALL}
          onClick={onExport}
        >
          Export
        </Button>

        {customActions}

        <Button
          buttonType={ButtonType.SECONDARY}
          leadingIcon={X}
          size={ButtonSize.SMALL}
          onClick={onDeselectAll}
        />
      </Block>
    </Block>
  );
});

BulkActionBar.displayName = "BulkActionBar";

export default BulkActionBar;