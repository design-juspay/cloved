import { forwardRef, useMemo } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { styled } from 'styled-components';
import dateRangePickerTokens from './dateRangePicker.tokens';
import { FOUNDATION_THEME } from '../../tokens';

type TimeSelectorProps = {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

const StyledTrigger = styled(DropdownMenu.Trigger)`
  ${dateRangePickerTokens.timePicker.input}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  white-space: nowrap;
  min-width: 100px;
  background-color: ${FOUNDATION_THEME.colors.gray[0]};
  cursor: pointer;
  color: ${FOUNDATION_THEME.colors.gray[700]};
  width: 50%;
`;

const StyledContent = styled(DropdownMenu.Content)`
  background: ${FOUNDATION_THEME.colors.gray[0]};
  border: 1px solid ${FOUNDATION_THEME.colors.gray[200]};
  border-radius: ${FOUNDATION_THEME.border.radius[8]};
  padding: ${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[8]};
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  min-width: 100px;
`;

const StyledItem = styled(DropdownMenu.Item)<{ $isSelected: boolean }>`
  ${dateRangePickerTokens.dropdown.item}
  ${props => props.$isSelected && dateRangePickerTokens.dropdown.activeItem}
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  
  &:hover, &:focus {
    background-color: #f3f4f6;
  }
  
  ${props => props.$isSelected && `
    background-color: ${FOUNDATION_THEME.colors.primary[50]};
    color: ${FOUNDATION_THEME.colors.primary[500]};
    font-weight: 500;
  `}
`;

const TimeSelector = forwardRef<HTMLButtonElement, TimeSelectorProps>(
  ({ value, onChange, className }, ref) => {
    // Convert 24h format to 12h format for display
    const formatTimeFor12Hour = (hour: number, minute: number): string => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedHour = displayHour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute} ${period}`;
    };

    // Parse the current value
    const [hour, minute] = value.split(':').map(Number);
    const displayTime = formatTimeFor12Hour(hour, minute);

    // Generate time options with 15-minute intervals
    const timeOptions = useMemo(() => {
      const options = [];
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
          const timeValue = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          const display = formatTimeFor12Hour(h, m);
          options.push({ value: timeValue, display });
        }
      }
      return options;
    }, []);

    const handleTimeSelect = (timeValue: string) => {
      onChange(timeValue);
    };

    return (
      <DropdownMenu.Root>
        <StyledTrigger
          ref={ref}
          className={className}
          aria-label="Select time"
        >
          <span>{displayTime}</span>
          <ChevronDown size={14} />
        </StyledTrigger>

        <DropdownMenu.Portal>
          <StyledContent sideOffset={4} align="start">
            {timeOptions.map(({ value: timeValue, display }) => (
              <StyledItem
                key={timeValue}
                $isSelected={value === timeValue}
                onSelect={() => handleTimeSelect(timeValue)}
              >
                {display}
              </StyledItem>
            ))}
          </StyledContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);

TimeSelector.displayName = 'TimeSelector';

export default TimeSelector;
