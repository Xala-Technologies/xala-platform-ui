import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  OpeningHoursEditor,
  defaultWeekdaySchedule,
  emptySchedule,
  validateSchedule,
} from '../../composed/OpeningHoursEditor';
import type { WeekdaySchedule } from '../../composed/OpeningHoursEditor';

const meta: Meta<typeof OpeningHoursEditor> = {
  title: 'Composed/OpeningHoursEditor',
  component: OpeningHoursEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## OpeningHoursEditor

Editable weekly schedule with day checkboxes and from/to time inputs.
Used in admin wizards for defining availability/opening hours.

### Features
- 7-day week schedule
- Enable/disable individual days
- Time inputs with validation
- Error display per day
- Preset schedules (weekdays, empty)
- Validation helper included

### Accessibility
- Fieldset with legend for grouping
- Time inputs with proper labels (visually hidden)
- Keyboard navigation between rows
- Error messages linked with aria-describedby
        `,
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable all inputs',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for controlled stories
function ControlledEditor({
  initialValue,
  ...props
}: {
  initialValue: WeekdaySchedule;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const errors = validateSchedule(value, { invalidTimeRange: 'Sluttid må være etter starttid' });

  return (
    <div style={{ width: 480 }}>
      <OpeningHoursEditor {...props} value={value} onChange={setValue} errors={errors} />
    </div>
  );
}

// Default with standard weekday hours
export const Default: Story = {
  render: () => <ControlledEditor initialValue={defaultWeekdaySchedule} />,
};

// Empty schedule (all disabled)
export const Empty: Story = {
  render: () => <ControlledEditor initialValue={emptySchedule} />,
  parameters: {
    docs: {
      description: {
        story: 'All days disabled. Use this as a starting point.',
      },
    },
  },
};

// Weekend only
export const WeekendOnly: Story = {
  render: () => (
    <ControlledEditor
      initialValue={{
        monday: { enabled: false },
        tuesday: { enabled: false },
        wednesday: { enabled: false },
        thursday: { enabled: false },
        friday: { enabled: false },
        saturday: { enabled: true, openTime: '10:00', closeTime: '18:00' },
        sunday: { enabled: true, openTime: '12:00', closeTime: '16:00' },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Only weekend days enabled.',
      },
    },
  },
};

// With validation errors
export const WithErrors: Story = {
  render: () => (
    <ControlledEditor
      initialValue={{
        monday: { enabled: true, openTime: '16:00', closeTime: '08:00' }, // Invalid!
        tuesday: { enabled: true, openTime: '08:00', closeTime: '08:00' }, // Invalid!
        wednesday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
        thursday: { enabled: false },
        friday: { enabled: false },
        saturday: { enabled: false },
        sunday: { enabled: false },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Schedule with invalid time ranges that trigger validation errors.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => <ControlledEditor initialValue={defaultWeekdaySchedule} disabled />,
  parameters: {
    docs: {
      description: {
        story: 'All inputs disabled.',
      },
    },
  },
};

// Extended hours
export const ExtendedHours: Story = {
  render: () => (
    <ControlledEditor
      initialValue={{
        monday: { enabled: true, openTime: '06:00', closeTime: '23:00' },
        tuesday: { enabled: true, openTime: '06:00', closeTime: '23:00' },
        wednesday: { enabled: true, openTime: '06:00', closeTime: '23:00' },
        thursday: { enabled: true, openTime: '06:00', closeTime: '23:00' },
        friday: { enabled: true, openTime: '06:00', closeTime: '01:00' },
        saturday: { enabled: true, openTime: '08:00', closeTime: '01:00' },
        sunday: { enabled: true, openTime: '10:00', closeTime: '22:00' },
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Extended hours facility with early opening.',
      },
    },
  },
};

// English labels
export const EnglishLabels: Story = {
  render: () => {
    function EnglishEditor() {
      const [value, setValue] = useState(defaultWeekdaySchedule);
      const errors = validateSchedule(value, {
        invalidTimeRange: 'End time must be after start time',
      });

      return (
        <div style={{ width: 480 }}>
          <OpeningHoursEditor
            value={value}
            onChange={setValue}
            errors={errors}
            labels={{
              legend: 'Opening Hours',
              monday: 'Monday',
              tuesday: 'Tuesday',
              wednesday: 'Wednesday',
              thursday: 'Thursday',
              friday: 'Friday',
              saturday: 'Saturday',
              sunday: 'Sunday',
              from: 'From',
              to: 'To',
              invalidTimeRange: 'End time must be after start time',
              helperText: 'Select which days are available and set opening hours',
            }}
          />
        </div>
      );
    }

    return <EnglishEditor />;
  },
  parameters: {
    docs: {
      description: {
        story: 'English localization via labels prop.',
      },
    },
  },
};
