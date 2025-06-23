import { forwardRef } from 'react';
import { TabsTriggerProps, TabsVariant, TabsSize } from './types';
import { StyledTabsTrigger, IconContainer } from './StyledTabs';
import { useComponentToken } from '../../context/useComponentToken'; // Import hook
import { TabsTokensType } from './tabs.token'; // Import token type

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      className,
      value,
      variant = TabsVariant.UNDERLINE,
      size = TabsSize.MD,
      children,
      leftSlot,
      rightSlot,
      ...props
    },
    ref
  ) => {
    const tokens = useComponentToken("TABS") as TabsTokensType; // Use hook

    return (
      <StyledTabsTrigger
        ref={ref}
        value={value}
        $variant={variant}
        $size={size}
        className={className}
        {...props}
      >
        {leftSlot && <IconContainer style={{ marginRight: tokens.trigger.iconSpacing?.gap }}>{leftSlot}</IconContainer>}
        {children}
        {rightSlot && <IconContainer style={{ marginLeft: tokens.trigger.iconSpacing?.gap }}>{rightSlot}</IconContainer>}
      </StyledTabsTrigger>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
