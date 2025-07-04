import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { 
  DateRangePicker,
  Button,
  ButtonType,
  TextInput
} from 'blend-v1';

// Import types that might not be exported from main
type DateRange = {
  startDate: Date;
  endDate: Date;
  showTimePicker?: boolean;
};
import { 
  Calendar,
  CalendarDays,
  Clock,
  Settings,
  Filter,
  TrendingUp,
  Download,
  BarChart,
  Users,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DateRangePicker Component

A comprehensive date range picker component with calendar interface, time selection, preset ranges, and flexible configuration options for selecting date and time ranges.

## Features:
- Interactive calendar grid for date selection
- Optional time picker for precise time selection
- Quick preset ranges (today, yesterday, last 7 days, etc.)
- Custom date range selection
- Min/max date constraints
- Future/past date restrictions
- Single date selection mode
- Custom trigger element support
- Accessible keyboard navigation
- Customizable date formatting
- Disabled state support

## Use Cases:
- Analytics dashboards and date filtering
- Report generation with time periods
- Event scheduling and booking systems
- Financial data analysis
- User activity tracking
- Content management systems

## Documentation
[View complete documentation →](http://localhost:3000/docs/components/DateRangePicker)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Default story - Basic date range picker
export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    return (
      <div style={{ width: '400px' }}>
        <DateRangePicker 
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select date range"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic DateRangePicker with default settings and controlled state management.',
      },
    },
  },
};

// Date range picker with time selection
export const WithTimePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      showTimePicker: true
    });
    
    return (
      <div style={{ width: '450px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Date Range with Time Selection</h4>
        <DateRangePicker 
          value={dateRange}
          onChange={setDateRange}
          showTimePicker={true}
          showPresets={true}
          placeholder="Select date and time range"
          icon={React.createElement(Clock, { size: 16 })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker with time selection enabled for precise date and time range selection.',
      },
    },
  },
};

// Date range picker with presets
export const WithPresets: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>With Quick Preset Ranges</h4>
        <DateRangePicker 
          value={dateRange}
          onChange={setDateRange}
          showPresets={true}
          placeholder="Choose time period"
          icon={React.createElement(CalendarDays, { size: 16 })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker with quick preset ranges for common time periods like "Last 7 days", "Last 30 days", etc.',
      },
    },
  },
};

// Date range picker without presets
export const WithoutPresets: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Calendar Only (No Presets)</h4>
        <DateRangePicker 
          value={dateRange}
          onChange={setDateRange}
          showPresets={false}
          placeholder="Custom date range selection"
          icon={React.createElement(Calendar, { size: 16 })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker with presets disabled, allowing only custom calendar-based date selection.',
      },
    },
  },
};

// Date range picker with constraints
export const WithConstraints: Story = {
  render: () => {
    const [pastRange, setPastRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    const [futureRange, setFutureRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });
    
    const [constrainedRange, setConstrainedRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Disable Future Dates</h4>
          <DateRangePicker 
            value={pastRange}
            onChange={setPastRange}
            disableFutureDates={true}
            showPresets={true}
            placeholder="Historical data only"
            icon={React.createElement(BarChart, { size: 16 })}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Disable Past Dates</h4>
          <DateRangePicker 
            value={futureRange}
            onChange={setFutureRange}
            disablePastDates={true}
            showPresets={true}
            placeholder="Future events only"
            icon={React.createElement(Calendar, { size: 16 })}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Min/Max Date Range</h4>
          <DateRangePicker 
            value={constrainedRange}
            onChange={setConstrainedRange}
            minDate={new Date('2024-01-01')}
            maxDate={new Date('2024-12-31')}
            showPresets={true}
            placeholder="2024 data only"
            icon={React.createElement(Filter, { size: 16 })}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker with various date constraints: disable future dates, disable past dates, and min/max date boundaries.',
      },
    },
  },
};

// Single date selection mode
export const SingleDateSelection: Story = {
  render: () => {
    const [singleDate, setSingleDate] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date()
    });
    
    return (
      <div style={{ width: '400px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Single Date Selection</h4>
        <DateRangePicker 
          value={singleDate}
          onChange={setSingleDate}
          allowSingleDateSelection={true}
          showPresets={false}
          placeholder="Pick a single date"
          icon={React.createElement(CalendarDays, { size: 16 })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker configured for single date selection instead of date ranges.',
      },
    },
  },
};

// Custom trigger elements
export const CustomTriggers: Story = {
  render: () => {
    const [primaryRange, setPrimaryRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    const [secondaryRange, setSecondaryRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    
    const [analyticsRange, setAnalyticsRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Primary Button Trigger</h4>
          <DateRangePicker 
            value={primaryRange}
            onChange={setPrimaryRange}
            triggerElement={
              <Button 
                buttonType={ButtonType.PRIMARY}
                text="Select Date Range"
                leadingIcon={Calendar}
                trailingIcon={CalendarDays}
              />
            }
            showPresets={true}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Secondary Button Trigger</h4>
          <DateRangePicker 
            value={secondaryRange}
            onChange={setSecondaryRange}
            triggerElement={
              <Button 
                buttonType={ButtonType.SECONDARY}
                text="Choose Dates"
                leadingIcon={CalendarDays}
              />
            }
            showPresets={true}
            showTimePicker={true}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Analytics Dashboard Style</h4>
          <DateRangePicker 
            value={analyticsRange}
            onChange={setAnalyticsRange}
            triggerElement={
              <Button 
                buttonType={ButtonType.SECONDARY}
                text={`${analyticsRange.startDate.toLocaleDateString()} - ${analyticsRange.endDate.toLocaleDateString()}`}
                leadingIcon={TrendingUp}
                trailingIcon={Filter}
              />
            }
            showPresets={true}
            disableFutureDates={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker with custom trigger elements including different button styles and dynamic content.',
      },
    },
  },
};

// Different states
export const DatePickerStates: Story = {
  render: () => {
    const [normalRange, setNormalRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    const [disabledRange, setDisabledRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Normal State</h4>
          <DateRangePicker 
            value={normalRange}
            onChange={setNormalRange}
            showPresets={true}
            placeholder="Select date range"
            icon={React.createElement(Calendar, { size: 16 })}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Disabled State</h4>
          <DateRangePicker 
            value={disabledRange}
            onChange={setDisabledRange}
            isDisabled={true}
            showPresets={true}
            placeholder="Date range locked"
            icon={React.createElement(AlertCircle, { size: 16 })}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker in different states: normal interactive state and disabled state.',
      },
    },
  },
};

// Custom date formatting
export const CustomFormatting: Story = {
  render: () => {
    const [usFormatRange, setUsFormatRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });
    
    const [isoFormatRange, setIsoFormatRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });
    
    const [customFormatRange, setCustomFormatRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>US Format (MM/dd/yyyy)</h4>
          <DateRangePicker 
            value={usFormatRange}
            onChange={setUsFormatRange}
            dateFormat="MM/dd/yyyy"
            showPresets={true}
            placeholder="US date format"
            icon={React.createElement(Calendar, { size: 16 })}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>ISO Format (yyyy-MM-dd)</h4>
          <DateRangePicker 
            value={isoFormatRange}
            onChange={setIsoFormatRange}
            dateFormat="yyyy-MM-dd"
            showPresets={true}
            placeholder="ISO date format"
            icon={React.createElement(Calendar, { size: 16 })}
          />
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Custom Format (dd MMM yyyy)</h4>
          <DateRangePicker 
            value={customFormatRange}
            onChange={setCustomFormatRange}
            dateFormat="dd MMM yyyy"
            showPresets={true}
            placeholder="Custom date format"
            icon={React.createElement(Calendar, { size: 16 })}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DateRangePicker with different date formatting options: US format, ISO format, and custom format.',
      },
    },
  },
};

// Real-world use cases
export const RealWorldExamples: Story = {
  render: () => {
    const [analyticsRange, setAnalyticsRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    const [reportRange, setReportRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date()
    });
    
    const [eventRange, setEventRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    
    const [financialRange, setFinancialRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      showTimePicker: false
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '500px' }}>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} />
            Analytics Dashboard
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            Filter website analytics data by date range
          </p>
          <DateRangePicker 
            value={analyticsRange}
            onChange={setAnalyticsRange}
            showPresets={true}
            disableFutureDates={true}
            placeholder="Select analytics period"
            icon={React.createElement(BarChart, { size: 16 })}
            triggerElement={
              <Button 
                buttonType={ButtonType.SECONDARY}
                text={`Analytics: ${analyticsRange.startDate.toLocaleDateString()} - ${analyticsRange.endDate.toLocaleDateString()}`}
                leadingIcon={TrendingUp}
              />
            }
          />
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} />
            Report Generation
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            Generate reports for specific time periods
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <DateRangePicker 
                value={reportRange}
                onChange={setReportRange}
                showPresets={true}
                disableFutureDates={true}
                placeholder="Report period"
                icon={React.createElement(FileText, { size: 16 })}
              />
            </div>
            <Button 
              buttonType={ButtonType.PRIMARY}
              text="Generate"
              leadingIcon={Download}
            />
          </div>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} />
            Event Scheduling
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            Schedule events and meetings for future dates
          </p>
          <DateRangePicker 
            value={eventRange}
            onChange={setEventRange}
            showTimePicker={true}
            disablePastDates={true}
            showPresets={false}
            placeholder="Event time period"
            icon={React.createElement(Calendar, { size: 16 })}
            allowSingleDateSelection={true}
          />
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={20} />
            Financial Reports
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b' }}>
            View financial data for accounting periods
          </p>
          <DateRangePicker 
            value={financialRange}
            onChange={setFinancialRange}
            showPresets={true}
            disableFutureDates={true}
            minDate={new Date('2024-01-01')}
            maxDate={new Date()}
            placeholder="Financial period"
            icon={React.createElement(DollarSign, { size: 16 })}
            dateFormat="MMM dd, yyyy"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of DateRangePicker usage in different application contexts: analytics, reports, events, and financial data.',
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      projectName: '',
      projectPeriod: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      } as DateRange,
      budgetPeriod: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      } as DateRange,
      reportingSchedule: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      } as DateRange
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      
      if (!formData.projectName.trim()) {
        newErrors.projectName = 'Project name is required';
      }
      
      if (!formData.projectPeriod.startDate || !formData.projectPeriod.endDate) {
        newErrors.projectPeriod = 'Project period is required';
      }
      
      if (formData.projectPeriod.startDate >= formData.projectPeriod.endDate) {
        newErrors.projectPeriod = 'End date must be after start date';
      }
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Project created successfully!');
        console.log('Form data:', formData);
      }
    };
    
    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={20} />
            Project Setup Form
          </h3>
          
          <div>
            <TextInput
              label="Project Name"
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="Enter project name"
              error={!!errors.projectName}
              errorMessage={errors.projectName}
              required={true}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Project Timeline *
            </label>
            <DateRangePicker 
              value={formData.projectPeriod}
              onChange={(range) => setFormData(prev => ({ ...prev, projectPeriod: range }))}
              showPresets={true}
              disablePastDates={true}
              placeholder="Select project duration"
              icon={React.createElement(Calendar, { size: 16 })}
            />
            {errors.projectPeriod && (
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={12} />
                {errors.projectPeriod}
              </div>
            )}
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Budget Period
            </label>
            <DateRangePicker 
              value={formData.budgetPeriod}
              onChange={(range) => setFormData(prev => ({ ...prev, budgetPeriod: range }))}
              showPresets={true}
              placeholder="Budget allocation period"
              icon={React.createElement(DollarSign, { size: 16 })}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              Reporting Schedule
            </label>
            <DateRangePicker 
              value={formData.reportingSchedule}
              onChange={(range) => setFormData(prev => ({ ...prev, reportingSchedule: range }))}
              showPresets={true}
              showTimePicker={true}
              placeholder="Reporting frequency"
              icon={React.createElement(FileText, { size: 16 })}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button 
              buttonType={ButtonType.SECONDARY} 
              text="Cancel"
              onClick={() => {
                setFormData({
                  projectName: '',
                  projectPeriod: {
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  },
                  budgetPeriod: {
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                  },
                  reportingSchedule: {
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                  }
                });
                setErrors({});
              }}
            />
            <Button 
              buttonType={ButtonType.PRIMARY} 
              text="Create Project"
              type="submit"
              leadingIcon={CheckCircle}
            />
          </div>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete form integration example with DateRangePicker components, validation, error handling, and form submission.',
      },
    },
  },
};

// Playground for testing all props
export const Playground: Story = {
  args: {
    value: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    showTimePicker: false,
    showPresets: true,
    placeholder: 'Select date range',
    isDisabled: false,
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    dateFormat: 'MM/dd/yyyy'
  },
  argTypes: {
    value: {
      control: 'object',
      description: 'The selected date range value'
    },
    showTimePicker: {
      control: 'boolean',
      description: 'Whether to show time selection in addition to date selection'
    },
    showPresets: {
      control: 'boolean',
      description: 'Whether to show quick preset range options'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the date range input'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the date range picker is disabled'
    },
    allowSingleDateSelection: {
      control: 'boolean',
      description: 'Whether to allow selecting a single date instead of a range'
    },
    disableFutureDates: {
      control: 'boolean',
      description: 'Whether to disable selection of future dates'
    },
    disablePastDates: {
      control: 'boolean',
      description: 'Whether to disable selection of past dates'
    },
    dateFormat: {
      control: 'text',
      description: 'Format string for displaying dates'
    }
  },
  render: (args) => {
    const [dateRange, setDateRange] = useState<DateRange>(args.value || {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    return (
      <div style={{ width: '400px' }}>
        <DateRangePicker 
          {...args}
          value={dateRange}
          onChange={setDateRange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing all DateRangePicker props and configurations.',
      },
    },
  },
};
