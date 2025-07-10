# Progress: Storybook Implementation

## Completed ✅

- **Button**: Complete story with all variants, controls, and examples
- **ButtonV2**: Complete story with modern token-based styling, all button types, sizes, sub-types, icons, states, full-width, button group positioning, and comprehensive showcase
- **ButtonGroup**: Complete story with grouping modes (Single Primary, All Secondary, No Transform), stacked/non-stacked layouts, sizes, icons, and common use cases
- **ButtonGroupV2**: Complete story with automatic positioning, stacked/non-stacked layouts, button types, sizes, icons, icon-only variants, states, and comprehensive examples
- **Alert**: Complete story with variants, styles, icons, actions, and examples
- **Avatar**: Complete story with sizes, shapes, states, fallbacks, and slots
- **Checkbox**: Complete story with sizes, states, controlled/uncontrolled modes, indeterminate, errors, and form integration
- **Radio**: Complete story with sizes, states, RadioGroup functionality, controlled/uncontrolled modes, validation, and complex forms
- **Switch**: Complete story with sizes, states, SwitchGroup functionality, controlled/uncontrolled modes, validation, and comprehensive settings examples
- **Tooltip**: Complete story with all positioning, sizing, alignment, rich content, slots, controlled modes, timing, and accessibility examples
- **Breadcrumb**: Complete story with navigation hierarchies, overflow handling, icons, badges, and real-world examples
- **Inputs**: Complete story with TextInput, NumberInput, SearchInput, TextArea, sizes, states, validation, slots, and comprehensive form integration
- **Select**: Complete story with Menu (generic), SingleSelect, MultiSelect components, all sizes, states, positioning, validation, and comprehensive form integration
- **DateRangePicker**: Complete story with calendar interface, time selection, presets, constraints, formatting, and real-world examples
- **Modal**: Complete story with 9 comprehensive patterns, form integration, custom headers/footers, and optimized Storybook layout
- **Accordion**: Complete story with 9 comprehensive patterns, single/multiple expansion, controlled state, slots, chevron positioning, and real-world FAQ example
- **Tabs**: Complete story with all variants (Boxed, Floating, Underline), sizes (Medium, Large), icons, expanded/fit-content layouts, interactive controls, and comprehensive examples
- **Popover**: Complete story with enhanced UI design, all positioning options (top, right, bottom, left), sizes (Small, Medium), modal mode, action buttons, rich content examples, and improved spacing/typography
- **Charts**: Complete story with all chart types (Line, Bar, Pie), interactive legends, custom colors, complex data examples, responsive design, and animations disabled for Storybook
- **Tags**: Complete story with all variants, colors, sizes, shapes, icons, interactive examples, split tag functionality, and real-world use cases. Organized in Tags folder.
- **SplitTag**: Complete story with primary/secondary tag combinations, all sizes/shapes, icons, interactive examples, and comprehensive real-world scenarios. Organized in Tags folder with Tag component.
- **Snackbar**: Complete story with all variants (Info, Success, Warning, Error), action buttons, close callbacks, multiple stacking, real-world examples, and descriptive trigger buttons with icons
- **DataTable**: Complete story with all column types, sorting, filtering, pagination, search, inline editing, row expansion, server-side operations, custom actions, loading/empty states, and comprehensive examples
- **Dropdown**: Complete story with 10 variants including icons, groups, sub-labels, actions, disabled items, multiple slots, theme selector, and complex nested menus
- **Accordion**: Complete story with 11 variants including border styles, multiple expansion, icons, subtext, chevron positioning, disabled items, complex content, FAQ example, and controlled state
- **AvatarGroup**: Complete story with all features including sizes, shapes, max display count, overflow handling, custom overflow content, and real-world examples
- **Menu**: Complete story with 10 variants including search functionality, sub-labels, multiple slots, action variants, disabled items, positioning examples, settings menu, file browser menu, and complex dashboard navigation
- **StatCard**: Complete story with 7 variants including number, line chart, bar chart, progress bar variants, change indicators, icons, help tooltips, action icons, and dashboard example
- **Sidebar**: Complete story with 4 comprehensive examples including default, e-commerce, analytics dashboard, and admin panel layouts with multi-tenant support, merchant switching, and integrated directory navigation
- **SingleSelect**: Complete story with 8 examples including default, search, sizes, no-container variant, form integration, custom slot, disabled state, and complex task management example
- **MultiSelect**: Complete story with 9 examples including default, count/text display, sizes, no-container variant, form integration, custom slot, pre-selected values, and complex user management dashboard

## Skipped 🚫

- **Text**: Skipped per user request
- **Primitives**: Skipped per user request

## Phase 2: COMPLETE! ✅

## Phase 3: COMPLETE! ✅

## Phase 4: IN PROGRESS 🚧

## Phase 5: IN PROGRESS 🚧

## In Progress 🚧

- Continue with Phase 4 complex components
- Continue with Phase 5 specialized components

## Not Started ❌

### Phase 4: Complex Components (1 remaining)

- [✅] DataTable
- [✅] Charts
- [✅] Menu
- [✅] SingleSelect
- [✅] MultiSelect
- [✅] Sidebar
- [ ] Directory
- [✅] Tabs
- [✅] Popover
- [✅] Accordion

### Phase 5: Specialized Components (1 remaining)

- [✅] AvatarGroup
- [✅] Snackbar
- [✅] SplitTag
- [✅] Tags
- [✅] StatCard
- [ ] GradientBlur
- [🚫] Primitives (skipped)

## Progress Metrics

- **Total Components**: 35
- **Completed**: 31 (89%)
- **Skipped**: 2 (6%)
- **Remaining**: 2 (6%)
- **Phase 2**: COMPLETE ✅
- **Phase 3**: COMPLETE ✅
- **Phase 4**: IN PROGRESS 🚧
- **Phase 5**: IN PROGRESS 🚧

## Current Blockers

- None identified

## Next Immediate Actions

1. ✅ **SingleSelect & MultiSelect Components Complete!** - Replaced Dropdown with dedicated single and multi-select components
2. 🚧 **Phase 4 & 5 Progress** - Nearing completion with only 2 components remaining
3. Focus on Directory (Phase 4)
4. Focus on GradientBlur (Phase 5)

## Quality Checks for DataTable ✅

- [x] Each story includes Default and comprehensive variant examples (10 total stories)
- [x] All props are exposed in controls (data, columns, idField, title, description, enableSearch, etc.)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (ColumnDefinition, ColumnType, SortDirection, FilterType, etc.)
- [x] All column types demonstrated (Text, Number, Date, Avatar, Tag, Select, MultiSelect, Custom)
- [x] Sorting and filtering functionality with column-specific controls
- [x] Pagination with customizable page sizes and navigation
- [x] Universal search functionality across all columns
- [x] Inline editing capabilities with save/cancel callbacks
- [x] Row expansion with custom render functions
- [x] Column management for show/hide functionality
- [x] Bulk actions support with selection management
- [x] Custom cell rendering with formatted displays
- [x] Loading states with skeleton placeholders
- [x] Empty state handling with descriptive messages
- [x] Server-side operations (pagination, sorting, search) with simulated API calls
- [x] Custom header slots for actions and controls
- [x] Real-world example with user management data
- [x] Complex example combining all features
- [x] Proper Button component integration with correct props
- [x] Type safety with Record<string, unknown> constraints
- [x] AvatarData includes required 'id' property

## Quality Checks for Snackbar ✅

- [x] Each story includes Default and comprehensive variant examples (7 total stories)
- [x] All props are exposed in controls through addSnackbar function
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (SnackbarVariant)
- [x] All variants demonstrated (Info, Success, Warning, Error)
- [x] Action button functionality with interactive callbacks
- [x] Close callback tracking for analytics/cleanup
- [x] Multiple snackbar stacking demonstration
- [x] Real-world examples (save success, network error, copy to clipboard, session warning)
- [x] Header-only variants for brief notifications
- [x] Trigger buttons with descriptive text using `text` prop
- [x] Relevant icons added using `leadingIcon` prop (Info, CheckCircle, AlertTriangle, XCircle, etc.)
- [x] Container height adjusted to prevent scrolling (minHeight: 250px)
- [x] Padding comes from component's internal design tokens (not added by story)

## Quality Checks for Tags ✅

- [x] Each story includes Default and comprehensive variant examples (10 total stories)
- [x] All props are exposed in controls (text, variant, color, size, shape, leftSlot, rightSlot, onClick, splitTagPosition)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (TagVariant, TagColor, TagSize, TagShape)
- [x] All variants demonstrated (No Fill, Attentive, Subtle)
- [x] All colors demonstrated (Neutral, Primary, Success, Error, Warning, Purple)
- [x] All sizes demonstrated (XS, SM, MD, LG)
- [x] All shapes demonstrated (Rounded, Squarical)
- [x] Icon support with appropriate sizing for each tag size
- [x] Interactive examples with state management
- [x] Split tag functionality demonstrated
- [x] Real-world examples (e-commerce, blog, task management, user roles)
- [x] Organized in Tags folder with proper title structure

## Quality Checks for SplitTag ✅

- [x] Each story includes Default and comprehensive variant examples (9 total stories)
- [x] All props are exposed in controls (primaryTag, secondaryTag, size, shape, leadingSlot, trailingSlot)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (shared with Tag component)
- [x] Automatic styling applied (primary: no-fill, secondary: attentive)
- [x] All sizes and shapes supported
- [x] Icon support in both primary and secondary tags
- [x] Interactive examples with click handlers
- [x] Real-world examples (version info, monitoring, e-commerce, project management)
- [x] Color combinations showcase
- [x] Comprehensive grid layout showcase
- [x] Organized in Tags folder alongside Tag component

## Quality Checks for Charts ✅

- [x] Each story includes Default and comprehensive variant examples (10 total stories)
- [x] All props are exposed in controls (chartType, data, xAxisLabel, yAxisLabel, colors, legendPosition, chartHeaderSlot, slot1, slot2, slot3)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (ChartType, ChartLegendPosition, NewNestedDataPoint)
- [x] All chart types demonstrated (Line, Bar, Pie)
- [x] Interactive legends with hover and click functionality
- [x] Custom color schemes and styling options
- [x] Complex multi-series data examples
- [x] Responsive design demonstrations
- [x] Empty state handling
- [x] Rich header content with slots
- [x] Sample data generators for realistic examples
- [x] Animations disabled in Storybook to prevent left-to-right growing effect

## Quality Checks for Button Components ✅

- [x] **Button (v1)**: Complete story with all variants, controls, and examples
- [x] **ButtonV2**: Modern token-based styling, all button types (Primary, Secondary, Danger, Success), sizes (Small, Medium, Large), sub-types (Default, Icon Only, Inline), icons, states, full-width, button group positioning, content alignment, and comprehensive showcase
- [x] **ButtonGroup (v1)**: Grouping modes (Single Primary, All Secondary, No Transform), stacked/non-stacked layouts, sizes, icons, common use cases, and comprehensive examples
- [x] **ButtonGroupV2**: Automatic positioning, stacked/non-stacked layouts, button types, sizes, icons, icon-only variants, states (loading, disabled), and comprehensive examples
- [x] **Folder Organization**: All Button components organized in `apps/storybook/stories/components/Button/` with proper titles
- [x] **Story Structure**: Each story follows established patterns with Default, variants, examples, and comprehensive showcases
- [x] **Documentation**: Complete component descriptions, usage examples, and feature lists
- [x] **TypeScript**: Proper typing with all enums and interfaces correctly imported and used
- [x] **Icons**: Proper Lucide React icon integration with correct sizing and positioning
- [x] **Real-world Examples**: Common use cases like form actions, modal actions, navigation, toolbars, and CRUD operations

## Quality Checks for Select ✅

- [x] Each story includes Default and Playground variants
- [x] All Select components covered (Menu, SingleSelect, MultiSelect)
- [x] All props are exposed in controls for Menu component
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (MultiSelectSelectionTagType, MultiSelectMenuSize, etc.)
- [x] Real-world examples demonstrate practical usage (form integration, validation)
- [x] Both controlled and uncontrolled modes demonstrated for form components
- [x] All sizes and states shown (Small, Medium, Large, Container, No-Container variants)
- [x] Form integration with comprehensive validation and error handling
- [x] Search functionality and positioning options demonstrated
- [x] Multi-selection with both count and text tag displays

## Quality Checks for Inputs ✅

- [x] Each story includes Default and Playground variants
- [x] All input types covered (TextInput, NumberInput, SearchInput, TextArea)
- [x] All props are exposed in controls (label, placeholder, size, required, error, disabled, etc.)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (TextInputSize, NumberInputSize)
- [x] Real-world examples demonstrate practical usage (form integration, validation)
- [x] Both controlled and uncontrolled modes demonstrated
- [x] All sizes and states shown (Medium, Large, error, disabled, required)
- [x] Slot functionality demonstrated with icons and interactive elements
- [x] Form integration with comprehensive validation and error handling
- [x] Search input variations for different use cases
- [x] TextArea variations with different configurations and resize options

## Quality Checks for Breadcrumb ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls (items array with label, href, leftSlot, rightSlot)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (BreadcrumbItemType)
- [x] Real-world examples demonstrate practical usage (e-commerce, docs, admin, file management)
- [x] Overflow handling demonstrated with ellipsis menu for >4 items
- [x] Icon and badge slots shown with various combinations
- [x] Active state indication for current page (last item)
- [x] Navigation hierarchy examples from simple to complex

## Quality Checks for Tooltip ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls (content, open, side, align, showArrow, size, slot, slotDirection, delayDuration, offset)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used
- [x] Real-world examples demonstrate practical usage (tooltips for buttons, help text, status indicators)
- [x] Both controlled and uncontrolled modes demonstrated
- [x] All positioning and alignment combinations shown
- [x] Rich content and slot functionality demonstrated
- [x] Timing and delay variations covered
- [x] Accessibility features highlighted with keyboard navigation examples

## Quality Checks for Switch ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls (checked, size, disabled, required, error, label, subtext, slot, value, name)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used
- [x] Real-world examples demonstrate practical usage (app settings, network controls)
- [x] Both controlled and uncontrolled modes demonstrated
- [x] SwitchGroup functionality with multiple switch coordination
- [x] Error handling and validation patterns shown
- [x] Form integration with comprehensive settings and validation

## Quality Checks for Radio ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls (checked, size, disabled, required, error, subtext, slot, value, name)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used
- [x] Real-world examples demonstrate practical usage (payment methods, subscription forms)
- [x] Both controlled and uncontrolled RadioGroup modes demonstrated
- [x] Error handling and validation patterns shown
- [x] Complex form integration with multiple radio groups

## Quality Checks for Checkbox ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls (checked, size, disabled, required, error, subtext, slot)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used
- [x] Real-world examples demonstrate practical usage (form integration)
- [x] Both controlled and uncontrolled modes demonstrated
- [x] Indeterminate state with select-all functionality
- [x] Error handling and validation patterns shown

## Quality Checks for Avatar ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls (src, alt, size, shape, online, fallback)
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used
- [x] Real-world examples demonstrate practical usage
- [x] Error handling scenarios are covered
- [x] All size and shape combinations are shown

## Quality Checks for Alert ✅

- [x] Each story includes Default and Playground variants
- [x] All props are exposed in controls
- [x] Documentation is comprehensive and accurate
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used
- [x] Icons and examples are relevant and helpful

## Quality Checks for Tabs ✅

- [x] Each story includes Default and comprehensive variant examples
- [x] All props are exposed in interactive controls (variant, size, defaultValue, value, onValueChange)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and fully functional
- [x] TypeScript types are properly used (TabsVariant, TabsSize)
- [x] All variants demonstrated (Boxed, Floating, Underline)
- [x] All sizes demonstrated (Medium, Large)
- [x] Icon support shown with leftSlot and rightSlot functionality
- [x] Advanced features covered (expanded, fitContent layouts)
- [x] Interactive controls work across all stories
- [x] Real-world examples with rich content and complex layouts
- [x] Proper props passing to TabsList and TabsTrigger components
- [x] Complex example with badges, icons, and dashboard-style content

## Quality Checks for Popover ✅

- [x] Each story includes Default and comprehensive variant examples (8 total stories)
- [x] All props are exposed in interactive controls (heading, description, size, side, align, sideOffset, alignOffset, showCloseButton, asModal, open, width, minWidth, maxWidth, onOpenChange, onClose)
- [x] Documentation is comprehensive and accurate with usage examples and feature descriptions
- [x] Stories are visually appealing and fully functional with enhanced UI design
- [x] TypeScript types are properly used (PopoverSize, ButtonTypeV2, ButtonSizeV2)
- [x] All sizes demonstrated (Small, Medium) with optimized spacing
- [x] All positioning options demonstrated (top, right, bottom, left) with proper alignment
- [x] Enhanced UI design with improved spacing (18-20px padding), typography (#475569 colors), and line heights (1.5-1.6)
- [x] Modal mode functionality demonstrated with background interaction blocking
- [x] Action buttons integration with primary/secondary actions using proper ButtonV2 props
- [x] Rich content examples (user profiles, forms, filter controls, sharing menus, help interfaces)
- [x] Content variations covering info displays, filter forms, and action menus
- [x] Header and headerless variants for different use cases
- [x] Complex examples with professional styling and real-world scenarios
- [x] Proper ButtonV2 integration with correct props (buttonType, text, leadingIcon instead of type, children, leftSlot)
- [x] Consistent visual hierarchy and professional color palette throughout all examples

## Quality Checks for Dropdown ✅

- [x] Each story includes Default and comprehensive variant examples (10 total stories)
- [x] All props are exposed in controls (trigger, items, align, side, sideOffset, alignOffset)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (DropdownMenuItem interface)
- [x] All features demonstrated (icons, groups, sub-labels, actions, disabled items)
- [x] Icon support in both trigger and menu items with proper sizing
- [x] Group functionality with labels and separators
- [x] Sub-labels for additional context (e.g., pricing plans, keyboard shortcuts)
- [x] Action variants including danger actions (delete, remove)
- [x] Disabled state functionality for locked/unavailable items
- [x] Multiple slots support for complex layouts
- [x] Theme selector example with practical implementation
- [x] Complex nested menus with sub-groups and multiple sections
- [x] Real-world examples (file actions, user menus, settings)
- [x] Proper integration with Radix UI DropdownMenu
- [x] Consistent styling with design system tokens

## Quality Checks for Accordion ✅

- [x] Each story includes Default and comprehensive variant examples (11 total stories)
- [x] All props are exposed in controls (accordionType, isMultiple, defaultValue, value, onValueChange)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (AccordionType, AccordionChevronPosition)
- [x] All accordion types demonstrated (Border, No Border)
- [x] Single and multiple expansion modes with proper controls
- [x] Icon support with leftSlot functionality
- [x] Subtext and additional slots for rich content
- [x] Chevron positioning options (left, right)
- [x] Disabled items functionality for locked content
- [x] Complex content layouts with progress bars and device lists
- [x] FAQ example with practical implementation
- [x] Controlled state management demonstration
- [x] Interactive props controls that work across all stories
- [x] Smooth animations and transitions
- [x] Keyboard navigation support
- [x] Real-world examples (settings, FAQs, storage usage)
- [x] Proper integration with Radix UI Accordion
- [x] Fixed render functions to accept and use args for interactive controls

## Quality Checks for Menu ✅

- [x] Each story includes Default and comprehensive variant examples (10 total stories)
- [x] All props are exposed in controls (trigger, items, alignment, side, sideOffset, alignOffset, asModal, enableSearch, searchPlaceholder, minWidth, maxWidth, maxHeight)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (MenuAlignment, MenuSide, MenuItemV2Variant, MenuItemV2ActionType, MenuV2GroupType)
- [x] Search functionality with filtering across menu items
- [x] Grouped items with labels and separators
- [x] Sub-labels for additional context and information
- [x] Multiple slots (slot1-4) for complex layouts
- [x] Action variants (primary, danger) for important operations
- [x] Disabled state support for unavailable items
- [x] All positioning options demonstrated (alignment and side combinations)
- [x] Settings menu example with comprehensive organization
- [x] File browser menu with sorting and view options
- [x] Complex dashboard menu with sub-menus and notifications
- [x] Keyboard shortcuts displayed in slot2
- [x] Status indicators and badges integration
- [x] Avatar/icon support in slot1
- [x] Real-world examples (team management, file actions, settings)
- [x] Proper integration with Radix UI DropdownMenu
- [x] ButtonV2 integration with correct props (size instead of buttonSize)
- [x] All required Lucide icons imported (Building, Type, DollarSign, TrendingUp)

## Quality Checks for StatCard ✅

- [x] Each story includes Default and comprehensive variant examples (7 total stories)
- [x] All props are exposed in controls (title, value, subtitle, variant, change, progressValue, helpIconText)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional
- [x] TypeScript types are properly used (StatCardVariant, ChangeType, ChartDataPoint)
- [x] All variants demonstrated (Number, Line Chart, Bar Chart, Progress Bar)
- [x] Change indicators with increase/decrease arrows and percentage values
- [x] Title and action icon support for additional functionality
- [x] Help tooltips for contextual information
- [x] Animated charts with interactive hover tooltips
- [x] Automatic trend detection for line charts (up/down colors)
- [x] Progress bar with percentage display and pattern fill
- [x] Dashboard example with mixed stat card types
- [x] Sample data generator for realistic chart data
- [x] Responsive grid layouts for different screen sizes
- [x] Real-world examples (revenue, users, conversion rates, system metrics)
- [x] Proper integration with Recharts library
- [x] Custom tooltip component with trend information
- [x] All required Lucide icons imported (TrendingUp, Users, DollarSign, Activity, etc.)

## Quality Checks for Sidebar ✅

- [x] Each story includes comprehensive examples (4 total stories)
- [x] All props are exposed in controls (tenants, merchants, data, topbar, activeTenant, activeMerchant, footer)
- [x] Documentation is comprehensive and accurate with usage examples
- [x] Stories are visually appealing and functional with fullscreen layout
- [x] TypeScript types are properly defined (DirectoryData, NavbarItem interfaces)
- [x] Multi-tenant support with icon-based tenant switcher
- [x] Merchant dropdown selector for multiple merchants
- [x] Collapsible/expandable sidebar with smooth animations
- [x] Integrated Directory component for hierarchical navigation
- [x] Sticky header and footer sections
- [x] Customizable topbar with search and action buttons
- [x] Responsive design with proper scrolling
- [x] Support for nested navigation items
- [x] Icon and badge support in navigation items
- [x] Default story with basic commerce navigation
- [x] E-commerce example with comprehensive product catalog
- [x] Analytics dashboard with data sources and insights
- [x] Admin panel with user management and security settings
- [x] Real-world navigation patterns (sections, groups, nested items)
- [x] Interactive elements (search bars, buttons, avatars)
- [x] Proper state management for active tenant/merchant
- [x] Footer with user profile and logout functionality
- [x] All required Lucide icons imported (100+ icons for various use cases)
- [x] Consistent styling with design system tokens
- [x] Avatar shapes correctly using CIRCULAR and ROUNDED values
