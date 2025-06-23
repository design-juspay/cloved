import { forwardRef, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { DateRange } from './types';
import dateRangePickerTokens from './dateRangePicker.tokens';
import Block from '../Primitives/Block/Block';

type CalendarGridProps = {
  selectedRange: DateRange;
  onDateSelect: (range: DateRange) => void;
  today: Date;
  allowSingleDateSelection?: boolean;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
}

const StyledDayCell = styled(Block)<{
  $isStart: boolean;
  $isEnd: boolean;
  $isRangeDay: boolean;
  $isTodayDay: boolean;
  $isSingleDate: boolean;
  $isDisabled: boolean;
}>`
  ${dateRangePickerTokens.calendar.dayCell}
  ${dateRangePickerTokens.calendar.hoverState}
  
  ${props => props.$isSingleDate && dateRangePickerTokens.calendar.singleDate}
  ${props => props.$isStart && !props.$isSingleDate && dateRangePickerTokens.calendar.startDate}
  ${props => props.$isEnd && !props.$isSingleDate && dateRangePickerTokens.calendar.endDate}
  ${props => props.$isRangeDay && !props.$isStart && !props.$isEnd && dateRangePickerTokens.calendar.rangeDay}
  ${props => props.$isTodayDay && !props.$isStart && !props.$isEnd && dateRangePickerTokens.calendar.todayDay}
  ${props => props.$isDisabled && dateRangePickerTokens.states.disabledDay}
  
  color: ${props => {
    if (props.$isStart || props.$isEnd || props.$isSingleDate) {
      return dateRangePickerTokens.text.selectedDay.color;
    }
    if (props.$isTodayDay && !props.$isRangeDay) {
      return dateRangePickerTokens.text.todayDay.color;
    }
    return dateRangePickerTokens.text.dayNumber.color;
  }};
`;

const StyledTodayIndicator = styled(Block)`
  ${dateRangePickerTokens.calendar.todayIndicator}
`;

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  (
    {
      selectedRange,
      onDateSelect,
      today,
      allowSingleDateSelection = false,
      disableFutureDates = false,
      disablePastDates = false,
    },
    ref
  ) => {
    const currentMonthRef = useRef<HTMLDivElement>(null);

    // Scroll to current month when component mounts
    useEffect(() => {
      if (currentMonthRef.current) {
        currentMonthRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, []);

    // Generate months to display - from Jan 2012 to 5 years in the future
    const months = [];
    const startYear = 2012;
    const startMonth = 0;
    const currentDate = new Date();
    const endYear = currentDate.getFullYear() + 5;

    for (let year = startYear; year <= endYear; year++) {
      const monthStart = year === startYear ? startMonth : 0;
      for (let month = monthStart; month <= 11; month++) {
        months.push({ month, year });
      }
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const isStartDate = (date: Date): boolean => {
      if (!selectedRange.startDate) return false;
      return (
        date.getDate() === selectedRange.startDate.getDate() &&
        date.getMonth() === selectedRange.startDate.getMonth() &&
        date.getFullYear() === selectedRange.startDate.getFullYear()
      );
    };

    const isEndDate = (date: Date): boolean => {
      if (!selectedRange.endDate) return false;
      return (
        date.getDate() === selectedRange.endDate.getDate() &&
        date.getMonth() === selectedRange.endDate.getMonth() &&
        date.getFullYear() === selectedRange.endDate.getFullYear()
      );
    };

    const isInRange = (date: Date): boolean => {
      if (!selectedRange.startDate || !selectedRange.endDate) return false;
      return date > selectedRange.startDate && date < selectedRange.endDate;
    };

    const isToday = (date: Date): boolean => {
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    };

    const handleDateClick = (year: number, month: number, day: number) => {
      const clickedDate = new Date(year, month, day);

      // Don't allow selecting disabled dates
      if (
        (disableFutureDates && clickedDate > today) ||
        (disablePastDates && clickedDate < today)
      ) {
        return;
      }

      let newRange: DateRange;

      if (!selectedRange.startDate || allowSingleDateSelection) {
        // If no start date is selected or single date selection is allowed, set both start and end to the clicked date
        newRange = {
          startDate: clickedDate,
          endDate: clickedDate,
        };
      } else if (!selectedRange.endDate || clickedDate < selectedRange.startDate) {
        // If no end date is selected or clicked date is before start date, set clicked date as start date
        newRange = {
          startDate: clickedDate,
          endDate: selectedRange.endDate || clickedDate,
        };
      } else {
        // Otherwise, set clicked date as end date
        newRange = {
          startDate: selectedRange.startDate,
          endDate: clickedDate,
        };
      }

      onDateSelect(newRange);
    };

    const renderMonthCalendar = (year: number, month: number) => {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();

      let firstDayOfWeek = firstDayOfMonth.getDay();
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

      // Create a 2D array for the calendar grid
      const weeks = [];
      let week = Array(7).fill(null);
      let dayCounter = 1;

      for (let i = firstDayOfWeek; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter++;
      }
      weeks.push(week);

      while (dayCounter <= daysInMonth) {
        week = Array(7).fill(null);
        for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
          week[i] = dayCounter++;
        }
        weeks.push(week);
      }

      const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

      return (
        <Block style={{...dateRangePickerTokens.calendar.gridContainer}}
          key={`month-${year}-${month}`}
          data-month={`${month}-${year}`}
          data-current-month={isCurrentMonth ? 'true' : 'false'}
          ref={isCurrentMonth ? currentMonthRef : null}
        >
          <Block style={{...dateRangePickerTokens.calendar.monthHeader}}>
            {monthNames[month]} {year}
          </Block>

          <Block style={{...dateRangePickerTokens.calendar.dayNamesContainer}}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <Block style={{...dateRangePickerTokens.calendar.dayName}}>
                {day}
              </Block>
            ))}
          </Block>

          {weeks.map((week, weekIndex) => (
            <Block style={{...dateRangePickerTokens.calendar.weekRow}} key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return <Block style={{...dateRangePickerTokens.calendar.emptyCell}} key={dayIndex} />;
                }

                const date = new Date(year, month, day);
                const isRangeDay = isInRange(date);
                const isStart = isStartDate(date);
                const isEnd = isEndDate(date);
                const isTodayDay = isToday(date);
                const isSingleDate = isStart && isEnd;
                const isDisabled = Boolean(
                  (disableFutureDates && date > today) || (disablePastDates && date < today)
                );

                return (
                  <StyledDayCell
                    key={`${year}-${month}-${day}`}
                    onClick={() => handleDateClick(year, month, day)}
                    $isStart={isStart}
                    $isEnd={isEnd}
                    $isRangeDay={isRangeDay}
                    $isTodayDay={isTodayDay}
                    $isSingleDate={isSingleDate}
                    $isDisabled={isDisabled}
                  >
                    {day}
                    {isTodayDay && !isStart && !isEnd && !isRangeDay && (
                      <StyledTodayIndicator />
                    )}
                  </StyledDayCell>
                );
              })}
            </Block>
          ))}
        </Block>
      );
    };

    return (
      <Block style={{...dateRangePickerTokens.calendar.gridContainer}} ref={ref}>
        {months.map(({ year, month }) => renderMonthCalendar(year, month))}
      </Block>
    );
  }
);

CalendarGrid.displayName = 'CalendarGrid';

export default CalendarGrid;
