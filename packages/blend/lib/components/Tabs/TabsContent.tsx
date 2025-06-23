import { forwardRef } from 'react';
import { TabsContentProps } from './types';
import { StyledTabsContent } from './StyledTabs';

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, ...props }, ref) => (
    <StyledTabsContent 
      ref={ref} 
      className={className} 
      {...props}
    >
      {children}
    </StyledTabsContent>
  )
);

TabsContent.displayName = 'TabsContent';

export default TabsContent;