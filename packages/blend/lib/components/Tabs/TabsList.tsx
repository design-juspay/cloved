import { forwardRef } from 'react';
import { TabsListProps, TabsSize, TabsVariant } from './types';
import { StyledTabsList } from './StyledTabs';

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = TabsVariant.UNDERLINE, size = TabsSize.MD, expanded = false, ...props }, ref) => {
    return (
      <StyledTabsList
        ref={ref}
        className={className}
        $variant={variant}
        $size={size}
        $expanded={expanded}
        {...props}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

export default TabsList;