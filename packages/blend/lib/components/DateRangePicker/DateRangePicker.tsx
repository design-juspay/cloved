import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { styled } from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DateRangePickerProps, DateRangePreset, DateRange } from './types';
import {
  formatDate,
  getPresetDateRange,
  isValidDate,
  parseDate,
} from './utils';
import Button from '../Button/Button';
import { ButtonType, ButtonSize } from '../Button/types';
import CalendarGrid from './CalendarGrid';
import QuickRangeSelector from './QuickRangeSelector';
import TimeSelector from './TimeSelector';
import dateRangePickerTokens from './dateRangePicker.tokens';
import { SwitchSize } from '../Switch/types';
import { Switch } from '../Switch/Switch';
import { FOUNDATION_THEME } from '../../tokens';
import Block from '../Primitives/Block/Block';

const StyledContainer = styled(Block)<{ $isDisabled: boolean }>`
  ${dateRangePickerTokens.base.container}
  ${props => props.$isDisabled && dateRangePickerTokens.states.disabled}
`;

const StyledTrigger = styled.button<{ $isDisabled: boolean; $showPresets: boolean }>`
  ${dateRangePickerTokens.base.input}
  ${props => props.$isDisabled && dateRangePickerTokens.states.disabled}
  height: 40px;
  border-radius: ${props => props.$showPresets ? '0 6px 6px 0' : '6px'};
  
  @media (max-width: 639px) {
    border-radius: 6px;
  }
`;

const StyledCalendarContainer = styled(DropdownMenu.Content)`
  ${dateRangePickerTokens.calendar.container}
`;

const StyledInput = styled.input`
  ${dateRangePickerTokens.timePicker.input}
`;

const StyledTriggerContent = styled(Block)`
  ${dateRangePickerTokens.text.value}
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      onChange,
      showTimePicker = false,
      showPresets = true,
      isDisabled = false,
      className,
      dateFormat = 'dd/MM/yyyy',
      ariaLabel = 'Date range picker',
      allowSingleDateSelection = false,
      disableFutureDates = false,
      disablePastDates = false,
      triggerElement = null,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isQuickRangeOpen, setIsQuickRangeOpen] = useState(false);
    const [showTimePickerState, setShowTimePickerState] = useState(showTimePicker);

    const [selectedRange, setSelectedRange] = useState<DateRange>(
      value || getPresetDateRange(DateRangePreset.TODAY)
    );

    const [activePreset, setActivePreset] = useState<DateRangePreset>(DateRangePreset.TODAY);

    const [startTime, setStartTime] = useState(formatDate(selectedRange.startDate, 'HH:mm'));
    const [endTime, setEndTime] = useState(formatDate(selectedRange.endDate, 'HH:mm'));

    const [startDate, setStartDate] = useState(formatDate(selectedRange.startDate, dateFormat));
    const [endDate, setEndDate] = useState(formatDate(selectedRange.endDate, dateFormat));

    const quickRangeRef = useRef<HTMLDivElement>(null);

    const today = new Date();

    // Update state when value prop changes
    useEffect(() => {
      if (value) {
        setSelectedRange(value);
        setStartDate(formatDate(value.startDate, dateFormat));
        setEndDate(formatDate(value.endDate, dateFormat));
        setStartTime(formatDate(value.startDate, 'HH:mm'));
        setEndTime(formatDate(value.endDate, 'HH:mm'));
      }
    }, [value, dateFormat]);

    // Format the date display for the input
    const formatDateDisplay = () => {
      if (!selectedRange.startDate) {
        return 'Select date range';
      }

      const formatOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };

      const timeFormatOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };

      const startDateStr = selectedRange.startDate.toLocaleDateString('en-US', formatOptions);
      const startTimeStr = selectedRange.startDate.toLocaleTimeString('en-US', timeFormatOptions);

      if (
        !selectedRange.endDate ||
        (allowSingleDateSelection &&
          selectedRange.startDate.getTime() === selectedRange.endDate.getTime())
      ) {
        return `${startDateStr}, ${startTimeStr}`;
      }

      const endDateStr = selectedRange.endDate.toLocaleDateString('en-US', formatOptions);
      const endTimeStr = selectedRange.endDate.toLocaleTimeString('en-US', timeFormatOptions);

      return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`;
    };
    
    // Handle date selection from calendar
    const handleDateSelect = useCallback((range: DateRange) => {
      // Preserve time when selecting dates
      if (range.startDate) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        range.startDate.setHours(startHour, startMinute);
      }

      if (range.endDate) {
        const [endHour, endMinute] = endTime.split(':').map(Number);
        range.endDate.setHours(endHour, endMinute);
      }

      setSelectedRange(range);
      setStartDate(formatDate(range.startDate, dateFormat));
      setEndDate(formatDate(range.endDate, dateFormat));
      setActivePreset(DateRangePreset.CUSTOM);
    }, [startTime, endTime, dateFormat]);

    // Handle preset selection
    const handlePresetSelect = useCallback((preset: DateRangePreset) => {
      const range = getPresetDateRange(preset);
      setSelectedRange(range);
      setActivePreset(preset);
      setStartDate(formatDate(range.startDate, dateFormat));
      setEndDate(formatDate(range.endDate, dateFormat));
      setStartTime(formatDate(range.startDate, 'HH:mm'));
      setEndTime(formatDate(range.endDate, 'HH:mm'));
      
      if (preset !== DateRangePreset.CUSTOM) {
        onChange?.(range);
      }
    }, [dateFormat, onChange]);

    // Handle start date input change
    const handleStartDateChange = useCallback((value: string) => {
      setStartDate(value);

      const parsedDate = parseDate(value, dateFormat);
      if (parsedDate !== null && isValidDate(parsedDate)) {
        // Preserve time
        const [hours, minutes] = startTime.split(':').map(Number);
        parsedDate.setHours(hours, minutes);

        const newRange = { ...selectedRange, startDate: parsedDate };
        setSelectedRange(newRange);
        setActivePreset(DateRangePreset.CUSTOM);
      }
    }, [selectedRange, startTime, dateFormat]);

    // Handle end date input change
    const handleEndDateChange = useCallback((value: string) => {
      setEndDate(value);

      const parsedDate = parseDate(value, dateFormat);
      if (parsedDate !== null && isValidDate(parsedDate)) {
        // Preserve time
        const [hours, minutes] = endTime.split(':').map(Number);
        parsedDate.setHours(hours, minutes);

        const newRange = { ...selectedRange, endDate: parsedDate };
        setSelectedRange(newRange);
        setActivePreset(DateRangePreset.CUSTOM);
      }
    }, [selectedRange, endTime, dateFormat]);

    // Handle start time change
    const handleStartTimeChange = useCallback((time: string) => {
      setStartTime(time);
      if (selectedRange.startDate) {
        const [hours, minutes] = time.split(':').map(Number);
        const newStartDate = new Date(selectedRange.startDate);
        newStartDate.setHours(hours, minutes);
        setSelectedRange(prev => ({ ...prev, startDate: newStartDate }));
        setActivePreset(DateRangePreset.CUSTOM);
      }
    }, [selectedRange.startDate]);

    const handleEndTimeChange = useCallback((time: string) => {
      setEndTime(time);
      if (selectedRange.endDate) {
        const [hours, minutes] = time.split(':').map(Number);
        const newEndDate = new Date(selectedRange.endDate);
        newEndDate.setHours(hours, minutes);
        setSelectedRange(prev => ({ ...prev, endDate: newEndDate }));
        setActivePreset(DateRangePreset.CUSTOM);
      }
    }, [selectedRange.endDate]);

    // Handle apply button click
    const handleApply = () => {
      setIsOpen(false);
      onChange?.(selectedRange);
    };

    // Handle cancel button click
    const handleCancel = useCallback(() => {
      // Reset to the original value
      if (value) {
        setSelectedRange(value);
        setStartDate(formatDate(value.startDate, dateFormat));
        setEndDate(formatDate(value.endDate, dateFormat));
        setStartTime(formatDate(value.startDate, 'HH:mm'));
        setEndTime(formatDate(value.endDate, 'HH:mm'));
      }
      setIsOpen(false);
    }, [value, dateFormat]);

    // Close both dropdowns when disabled
    useEffect(() => {
      if (isDisabled) {
        setIsOpen(false);
        setIsQuickRangeOpen(false);
      }
    }, [isDisabled, isOpen]);

    const handleDateSelectCallback = useCallback(handleDateSelect, [handleDateSelect]);
    const handleStartTimeChangeCallback = useCallback(handleStartTimeChange, [handleStartTimeChange]);
    const handleEndTimeChangeCallback = useCallback(handleEndTimeChange, [handleEndTimeChange]);
    const handleStartDateChangeCallback = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      handleStartDateChange(e.target.value);
    }, [handleStartDateChange]);
    const handleEndDateChangeCallback = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      handleEndDateChange(e.target.value);
    }, [handleEndDateChange]);

    const renderTrigger = () => {
      if (triggerElement) {
        return (
          <DropdownMenu.Trigger asChild>
            <Block
              style={{ 
                opacity: isDisabled ? 0.5 : 1, 
                cursor: isDisabled ? 'not-allowed' : 'pointer' 
              }}
            >
              {triggerElement}
            </Block>
          </DropdownMenu.Trigger>
        );
      }

      return (
        <DropdownMenu.Trigger asChild>
          <StyledTrigger
            $isDisabled={isDisabled}
            $showPresets={showPresets}
            aria-label={ariaLabel}
            aria-expanded={isOpen}
            aria-disabled={isDisabled}
            disabled={isDisabled}
          >
            <StyledTriggerContent>
              <Block display='flex' alignItems='center'>
                <Calendar size={14} style={{ marginRight: '6px' }} />
                <span>{formatDateDisplay()}</span>
              </Block>
              {isOpen ? (
                <ChevronUp size={14} style={{ marginLeft: '8px' }} />
              ) : (
                <ChevronDown size={14} style={{ marginLeft: '8px' }} />
              )}
            </StyledTriggerContent>
          </StyledTrigger>
        </DropdownMenu.Trigger>
      );
    };

    return (
      <StyledContainer 
        ref={ref} 
        $isDisabled={isDisabled}
        className={className}
      >
        <Block display='flex'>
          {showPresets && (
            <Block width={132} ref={quickRangeRef}>
              <QuickRangeSelector
                isOpen={isQuickRangeOpen}
                onToggle={() => !isDisabled && setIsQuickRangeOpen(!isQuickRangeOpen)}
                activePreset={activePreset}
                onPresetSelect={handlePresetSelect}
                excludeCustom={true}
                disableFutureDates={disableFutureDates}
                disablePastDates={disablePastDates}
              />
            </Block>
          )}

          <Block minWidth={384}>
            <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
              {renderTrigger()}

              <DropdownMenu.Portal>
                <StyledCalendarContainer 
                  align="start" 
                  sideOffset={4}
                  onInteractOutside={(e) => {
                    if (quickRangeRef.current?.contains(e.target as Node)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Block>
                    <Block style={{padding: `${FOUNDATION_THEME.unit[16]}`}}>
                      <Block display='flex' gap={FOUNDATION_THEME.unit[8]} alignItems='center' marginBottom={FOUNDATION_THEME.unit[8]}>
                        <Block as='span' style={{...dateRangePickerTokens.text.label}} width={80}>Start</Block>
                        <StyledInput
                          type="text"
                          placeholder="DD/MM/YYYY"
                          value={startDate}
                          onChange={handleStartDateChangeCallback}
                        />
                        {showTimePickerState && (
                          <TimeSelector value={startTime} onChange={handleStartTimeChangeCallback} />
                        )}
                      </Block>

                      {(!allowSingleDateSelection || 
                          (allowSingleDateSelection && 
                          selectedRange.startDate.getTime() !== selectedRange.endDate.getTime())) && (
                        <Block display='flex' gap={FOUNDATION_THEME.unit[8]} alignItems='center' marginBottom={FOUNDATION_THEME.unit[8]}>
                          <Block as='span' style={{...dateRangePickerTokens.text.label}} width={80}>End</Block>
                          <StyledInput
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={endDate}
                            onChange={handleEndDateChangeCallback}
                          />
                          {showTimePickerState && (
                            <TimeSelector value={endTime} onChange={handleEndTimeChangeCallback} />
                          )}
                        </Block>
                      )}
                    </Block>

                    <Block 
                      style={{
                        marginTop: FOUNDATION_THEME.unit[16], 
                        maxHeight: '300px', 
                        overflowY: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }} 
                    >
                      <CalendarGrid
                        selectedRange={selectedRange}
                        onDateSelect={handleDateSelectCallback}
                        today={today}
                        allowSingleDateSelection={allowSingleDateSelection}
                        disableFutureDates={disableFutureDates}
                        disablePastDates={disablePastDates}
                      />
                    </Block>

                    <Block display='flex' alignItems='center' justifyContent='space-between' padding={FOUNDATION_THEME.unit[12]} borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`} marginTop={FOUNDATION_THEME.unit[16]}>
                      <Block display='flex' alignItems='center'>
                      <Switch
                          checked={showTimePickerState}
                          onChange={setShowTimePickerState}
                          size={SwitchSize.MEDIUM}
                        />
                        <Block as='span' marginLeft={FOUNDATION_THEME.unit[4]} style={{...dateRangePickerTokens.text.value}}>Time Ranges</Block>
                      </Block>

                      <Block display='flex' gap={FOUNDATION_THEME.unit[8]}>
                        <Button
                          buttonType={ButtonType.SECONDARY}
                          size={ButtonSize.SMALL}
                          onClick={handleCancel}
                          text="Cancel"
                        />    
                        <Button
                          buttonType={ButtonType.PRIMARY}
                          size={ButtonSize.SMALL}
                          onClick={handleApply}
                          text="Apply"
                        />
                      </Block>
                    </Block>
                  </Block>
                </StyledCalendarContainer>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </Block>
        </Block>
      </StyledContainer>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
