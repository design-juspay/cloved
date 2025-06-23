import { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { styled } from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DateRangePreset } from './types';
import { getPresetLabel } from './utils';
import dateRangePickerTokens from './dateRangePicker.tokens';
import Block from '../Primitives/Block/Block';

type QuickRangeSelectorProps = {
  isOpen: boolean;
  onToggle: () => void;
  activePreset: DateRangePreset;
  onPresetSelect: (preset: DateRangePreset) => void;
  excludeCustom?: boolean;
  className?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
}

const StyledTrigger = styled.button<{ $isOpen: boolean }>`
  ${dateRangePickerTokens.quickRange.trigger}
  width: 100%;
  background: transparent;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:focus {
    outline: none;
  }
`;

const StyledContent = styled(DropdownMenu.Content)`
  ${dateRangePickerTokens.dropdown.content}

`;

const StyledItem = styled(DropdownMenu.Item)<{ $isActive: boolean }>`
  ${dateRangePickerTokens.dropdown.item}
  ${dateRangePickerTokens.text.value}
  ${props => props.$isActive && dateRangePickerTokens.dropdown.activeItem}
  
  display: block;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 3px;
  
  &:focus {
    outline: none;
  }
  
  &[data-highlighted] {
    ${props => !props.$isActive && `
      background-color: rgba(0, 0, 0, 0.05);
    `}
  }
`;

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
  (
    {
      isOpen,
      onToggle,
      activePreset,
      onPresetSelect,
      excludeCustom = false,
      className,
      disableFutureDates = false,
      disablePastDates = false,
    },
    ref
  ) => {
    const activePresetLabel = getPresetLabel(activePreset);

    const getFilteredPresets = () => {
      const pastPresets = [
        DateRangePreset.YESTERDAY,
        DateRangePreset.LAST_1_HOUR,
        DateRangePreset.LAST_6_HOURS,
        DateRangePreset.LAST_7_DAYS,
        DateRangePreset.LAST_30_DAYS,
        DateRangePreset.LAST_3_MONTHS,
        DateRangePreset.LAST_12_MONTHS,
      ];

      const futurePresets = [
        DateRangePreset.TOMORROW,
        DateRangePreset.NEXT_7_DAYS,
        DateRangePreset.NEXT_30_DAYS,
        DateRangePreset.NEXT_3_MONTHS,
        DateRangePreset.NEXT_12_MONTHS,
      ];

      const neutralPresets = [DateRangePreset.TODAY];

      let availablePresets = [...neutralPresets];

      if (!disablePastDates) {
        availablePresets = [...availablePresets, ...pastPresets];
      }

      if (!disableFutureDates) {
        availablePresets = [...availablePresets, ...futurePresets];
      }

      if (!excludeCustom) {
        availablePresets.push(DateRangePreset.CUSTOM);
      }

      return availablePresets;
    };

    const filteredPresets = getFilteredPresets();

    const handlePresetSelect = (preset: DateRangePreset) => {
      onPresetSelect(preset);
    };

    return (
      <Block position='relative' width='100%' ref={ref} className={className}>
        <DropdownMenu.Root open={isOpen} onOpenChange={onToggle}>
          <DropdownMenu.Trigger asChild>
            <StyledTrigger $isOpen={isOpen}>
              <Block as='span' style={{...dateRangePickerTokens.text.value}}>
                {activePresetLabel}
              </Block>
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </StyledTrigger>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <StyledContent align="start" sideOffset={4}>
              {filteredPresets.map((preset) => (
                <StyledItem
                  key={preset}
                  $isActive={preset === activePreset}
                  onSelect={() => handlePresetSelect(preset)}
                >
                  {getPresetLabel(preset)}
                </StyledItem>
              ))}
            </StyledContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Block>
    );
  }
);

QuickRangeSelector.displayName = 'QuickRangeSelector';

export default QuickRangeSelector;
