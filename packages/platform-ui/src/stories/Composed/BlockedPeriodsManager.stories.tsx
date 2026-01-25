import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BlockedPeriodsManager, validateBlockedPeriods } from '../../composed/BlockedPeriodsManager';
import type { BlockedPeriod } from '../../composed/BlockedPeriodsManager';

const meta: Meta<typeof BlockedPeriodsManager> = {
    title: 'Composed/BlockedPeriodsManager',
    component: BlockedPeriodsManager,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## BlockedPeriodsManager

Add/remove blocked periods (date ranges) for unavailability.
Used in admin wizard for schedule configuration.

### Features
- Add/remove date range periods
- Optional reason per period
- Validation helper included
- Error display per period

### Accessibility
- Fieldset with legend for grouping
- Labeled date inputs
- Error messages linked via aria-describedby
        `,
            },
        },
    },
    argTypes: {
        disabled: {
            control: 'boolean',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper
function ControlledManager({
    initialPeriods,
    disabled = false,
    showValidation = false,
}: {
    initialPeriods: BlockedPeriod[];
    disabled?: boolean;
    showValidation?: boolean;
}) {
    const [periods, setPeriods] = useState(initialPeriods);
    const errors = showValidation
        ? validateBlockedPeriods(periods, { invalidDateRange: 'Sluttdato må være etter startdato' })
        : {};

    return (
        <div style={{ width: 500 }}>
            <BlockedPeriodsManager
                periods={periods}
                onChange={setPeriods}
                disabled={disabled}
                errors={errors}
            />
        </div>
    );
}

// Empty
export const Empty: Story = {
    render: () => <ControlledManager initialPeriods={[]} />,
};

// With periods
export const WithPeriods: Story = {
    render: () => (
        <ControlledManager
            initialPeriods={[
                { id: '1', startDate: '2024-12-24', endDate: '2024-12-26', reason: 'Juleferien' },
                { id: '2', startDate: '2025-01-01', endDate: '2025-01-01', reason: 'Nyttårsdag' },
            ]}
        />
    ),
};

// With validation error
export const WithValidationError: Story = {
    render: () => (
        <ControlledManager
            initialPeriods={[
                { id: '1', startDate: '2024-12-26', endDate: '2024-12-24', reason: 'Invalid dates' },
                { id: '2', startDate: '2025-01-01', endDate: '2025-01-05', reason: 'Valid period' },
            ]}
            showValidation
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'First period has end date before start date, triggering validation error.',
            },
        },
    },
};

// Many periods
export const ManyPeriods: Story = {
    render: () => (
        <ControlledManager
            initialPeriods={[
                { id: '1', startDate: '2024-12-24', endDate: '2024-12-26', reason: 'Jul' },
                { id: '2', startDate: '2025-01-01', endDate: '2025-01-01', reason: 'Nyttår' },
                { id: '3', startDate: '2025-04-14', endDate: '2025-04-21', reason: 'Påskeferie' },
                { id: '4', startDate: '2025-05-01', endDate: '2025-05-01', reason: '1. mai' },
                { id: '5', startDate: '2025-05-17', endDate: '2025-05-17', reason: '17. mai' },
                { id: '6', startDate: '2025-07-01', endDate: '2025-07-31', reason: 'Sommerstengt' },
            ]}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Many Norwegian holidays blocked.',
            },
        },
    },
};

// Disabled
export const Disabled: Story = {
    render: () => (
        <ControlledManager
            initialPeriods={[
                { id: '1', startDate: '2024-12-24', endDate: '2024-12-26', reason: 'Juleferien' },
            ]}
            disabled
        />
    ),
};

// English labels
export const EnglishLabels: Story = {
    render: () => {
        function EnglishManager() {
            const [periods, setPeriods] = useState<BlockedPeriod[]>([
                { id: '1', startDate: '2024-12-25', endDate: '2024-12-26', reason: 'Christmas' },
            ]);

            return (
                <div style={{ width: 500 }}>
                    <BlockedPeriodsManager
                        periods={periods}
                        onChange={setPeriods}
                        labels={{
                            legend: 'Blocked Periods',
                            helperText: 'Add periods when the resource is unavailable',
                            startDate: 'From Date',
                            endDate: 'To Date',
                            reason: 'Reason',
                            addPeriod: '+ Add Block',
                            remove: 'Remove',
                            reasonPlaceholder: 'e.g. Holiday, Maintenance',
                            emptyMessage: 'No blocked periods added',
                            invalidDateRange: 'End date must be after start date',
                        }}
                    />
                </div>
            );
        }

        return <EnglishManager />;
    },
};
