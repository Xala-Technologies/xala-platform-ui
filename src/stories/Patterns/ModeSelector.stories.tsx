/**
 * ModeSelector Stories
 *
 * Mode/option selection component with tabs, buttons, and cards variants.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import { ModeSelector, type ModeSelectorProps, type ModeOption } from '../../patterns/ModeSelector';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof ModeSelector> = {
  title: 'Patterns/ModeSelector',
  component: ModeSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ModeSelector

A domain-neutral component for selecting between multiple modes or options.

### Features
- Three variants: tabs, buttons, cards
- Size variants (sm, md, lg)
- Icon support
- Optional descriptions (cards variant)
- Disabled options support
- Full-width option

### Usage

\`\`\`tsx
<ModeSelector
  options={[
    { id: 'single', label: 'Single' },
    { id: 'recurring', label: 'Recurring' },
    { id: 'series', label: 'Series' },
  ]}
  value="single"
  onChange={(id) => setMode(id)}
  variant="tabs"
/>
\`\`\`

### Accessibility
- Uses role="tablist" for tabs variant
- Uses role="group" with aria-pressed for buttons/cards
- Keyboard navigable
- Disabled state properly announced
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ModeSelector>;

// =============================================================================
// Sample Icons (inline SVG)
// =============================================================================

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const RepeatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const basicOptions: ModeOption[] = [
  { id: 'single', label: 'Single' },
  { id: 'recurring', label: 'Recurring' },
  { id: 'series', label: 'Series' },
];

const optionsWithIcons: ModeOption[] = [
  { id: 'single', label: 'Single', icon: <CalendarIcon /> },
  { id: 'recurring', label: 'Recurring', icon: <RepeatIcon /> },
  { id: 'series', label: 'Series', icon: <ListIcon /> },
];

const optionsWithDescriptions: ModeOption[] = [
  {
    id: 'single',
    label: 'Single Booking',
    description: 'One-time reservation for a specific date',
    icon: <CalendarIcon />,
  },
  {
    id: 'recurring',
    label: 'Recurring Booking',
    description: 'Repeat on a schedule (weekly, monthly)',
    icon: <RepeatIcon />,
  },
  {
    id: 'series',
    label: 'Series Booking',
    description: 'Multiple custom dates',
    icon: <ListIcon />,
  },
];

const viewOptions: ModeOption[] = [
  { id: 'list', label: 'List', icon: <ListIcon /> },
  { id: 'grid', label: 'Grid', icon: <GridIcon /> },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    options: basicOptions,
    value: 'single',
    variant: 'tabs',
  },
};

export const TabsVariant: Story = {
  name: 'Tabs Variant',
  args: {
    options: optionsWithIcons,
    value: 'single',
    variant: 'tabs',
    size: 'md',
  },
};

export const ButtonsVariant: Story = {
  name: 'Buttons Variant',
  args: {
    options: optionsWithIcons,
    value: 'recurring',
    variant: 'buttons',
    size: 'md',
  },
};

export const CardsVariant: Story = {
  name: 'Cards Variant',
  args: {
    options: optionsWithDescriptions,
    value: 'single',
    variant: 'cards',
    direction: 'horizontal',
  },
};

export const CardsVertical: Story = {
  name: 'Cards Variant (Vertical)',
  args: {
    options: optionsWithDescriptions,
    value: 'recurring',
    variant: 'cards',
    direction: 'vertical',
    fullWidth: true,
  },
};

export const WithLabel: Story = {
  name: 'With Label',
  args: {
    options: basicOptions,
    value: 'single',
    variant: 'tabs',
    label: 'Booking Type',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    options: optionsWithIcons,
    value: 'single',
    variant: 'tabs',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    options: optionsWithIcons,
    value: 'single',
    variant: 'tabs',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    options: basicOptions,
    value: 'single',
    variant: 'tabs',
    fullWidth: true,
  },
};

export const WithDisabledOption: Story = {
  name: 'With Disabled Option',
  args: {
    options: [
      { id: 'single', label: 'Single' },
      { id: 'recurring', label: 'Recurring' },
      { id: 'series', label: 'Series', disabled: true },
    ],
    value: 'single',
    variant: 'tabs',
  },
};

export const TwoOptions: Story = {
  name: 'Two Options (Toggle)',
  args: {
    options: viewOptions,
    value: 'list',
    variant: 'buttons',
    size: 'sm',
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    options: [
      { id: 'single', label: 'Enkelt', icon: <CalendarIcon /> },
      { id: 'recurring', label: 'Gjentakende', icon: <RepeatIcon /> },
      { id: 'series', label: 'Serie', icon: <ListIcon /> },
    ],
    value: 'single',
    variant: 'tabs',
    label: 'Bestillingstype',
  },
};

export const BookingModeSelector: Story = {
  name: 'Domain Example: Booking Mode',
  args: {
    options: optionsWithDescriptions,
    value: 'single',
    variant: 'cards',
    direction: 'vertical',
    fullWidth: true,
    label: 'How would you like to book?',
  },
};

export const ViewToggle: Story = {
  name: 'Domain Example: View Toggle',
  args: {
    options: viewOptions,
    value: 'grid',
    variant: 'buttons',
    size: 'sm',
  },
};

export const VariantComparison: Story = {
  name: 'Variant Comparison',
  render: function Render() {
    const t = useT();
    const [value, setValue] = React.useState('single');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <Paragraph data-size="md" style={{ marginBottom: '1rem', fontWeight: 600 }}>
            {t('storybook.patterns.variantTabs')}
          </Paragraph>
          <ModeSelector
            options={optionsWithIcons}
            value={value}
            onChange={setValue}
            variant="tabs"
          />
        </div>
        <div>
          <Paragraph data-size="md" style={{ marginBottom: '1rem', fontWeight: 600 }}>
            {t('storybook.patterns.variantButtons')}
          </Paragraph>
          <ModeSelector
            options={optionsWithIcons}
            value={value}
            onChange={setValue}
            variant="buttons"
          />
        </div>
        <div>
          <Paragraph data-size="md" style={{ marginBottom: '1rem', fontWeight: 600 }}>
            {t('storybook.patterns.variantCards')}
          </Paragraph>
          <ModeSelector
            options={optionsWithDescriptions}
            value={value}
            onChange={setValue}
            variant="cards"
            direction="horizontal"
          />
        </div>
      </div>
    );
  },
};

export const SizeComparison: Story = {
  name: 'Size Comparison',
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <Paragraph data-size="sm" style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeSmall')}
          </Paragraph>
          <ModeSelector options={optionsWithIcons} value="single" onChange={() => {}} size="sm" />
        </div>
        <div>
          <Paragraph data-size="sm" style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeMedium')}
          </Paragraph>
          <ModeSelector options={optionsWithIcons} value="single" onChange={() => {}} size="md" />
        </div>
        <div>
          <Paragraph data-size="sm" style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeLarge')}
          </Paragraph>
          <ModeSelector options={optionsWithIcons} value="single" onChange={() => {}} size="lg" />
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: function Render() {
    const t = useT();
    const [mode, setMode] = React.useState('single');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <ModeSelector
          options={optionsWithIcons}
          value={mode}
          onChange={setMode}
          variant="tabs"
          label="Select booking mode"
        />
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {t('storybook.patterns.selectedMode')}: <strong>{mode}</strong>
          </Paragraph>
        </div>
      </div>
    );
  },
};
