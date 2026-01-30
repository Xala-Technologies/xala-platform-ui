import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect, useRef } from 'react';
import { useT } from '@xala-technologies/i18n';
import { SearchableSelect, type SelectOption, Stack, Card, Heading, Paragraph } from '../../index';

/**
 * SearchableSelect provides a searchable dropdown with filtering and multi-select.
 *
 * ## Features
 * - Search/filter options
 * - Single and multi-select
 * - Async loading support
 * - Creatable options
 * - Clearable
 *
 * ## When to Use
 * - Large option lists
 * - Searchable dropdowns
 * - Multi-select scenarios
 */
const meta: Meta<typeof SearchableSelect> = {
  title: 'Composed/SearchableSelect',
  component: SearchableSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
SearchableSelect provides a searchable dropdown with filtering and multi-select.

## Features
- Search/filter options
- Single and multi-select
- Async loading support
- Creatable options
- Clearable

## When to Use
- Large option lists
- Searchable dropdowns
- Multi-select scenarios
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

// Sample options
const useSampleOptions = (): SelectOption[] => {
  const t = useT();
  return [
    { value: 'no', label: t('storybook.searchableSelect.norway') },
    { value: 'se', label: t('storybook.searchableSelect.sweden') },
    { value: 'dk', label: t('storybook.searchableSelect.denmark') },
    { value: 'fi', label: t('storybook.searchableSelect.finland') },
    { value: 'is', label: t('storybook.searchableSelect.iceland') },
  ];
};

/**
 * Default searchable select
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Searchable select with label
 */
export const WithLabel: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          label={t('storybook.searchableSelect.country')}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Multi-select
 */
export const MultiSelect: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string[]>([]);
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          multiple
          placeholder={t('storybook.searchableSelect.selectCountries')}
        />
      </Stack>
    );
  },
};

/**
 * With clearable
 */
export const Clearable: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string>('no');
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          clearable
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * With loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          loading
          placeholder={t('storybook.searchableSelect.loading')}
        />
      </Stack>
    );
  },
};

/**
 * Async loading with debounce
 * Simulates fetching options from an API with 300ms debounce
 */
export const AsyncLoading: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Mock API data
    const mockCountries: SelectOption[] = [
      { value: 'no', label: t('storybook.searchableSelect.norway') },
      { value: 'se', label: t('storybook.searchableSelect.sweden') },
      { value: 'dk', label: t('storybook.searchableSelect.denmark') },
      { value: 'fi', label: t('storybook.searchableSelect.finland') },
      { value: 'is', label: t('storybook.searchableSelect.iceland') },
      { value: 'nl', label: 'Netherlands' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
    ];

    // Simulate async API call with delay
    const fetchOptions = async (query: string) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const filtered = mockCountries.filter((country) =>
        country.label.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(filtered);
      setLoading(false);
    };

    // Debounced search handler
    useEffect(() => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        fetchOptions(searchQuery);
      }, 300);

      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, [searchQuery]);

    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          onSearch={setSearchQuery}
          loading={loading}
          label={t('storybook.searchableSelect.country')}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * With error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          error={t('storybook.searchableSelect.countryRequired')}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string>('no');
    const options = useSampleOptions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          disabled
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Custom render prop for options
 */
export const CustomRender: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options: SelectOption[] = [
      {
        value: 'no',
        label: t('storybook.searchableSelect.norway'),
        description: 'Population: 5.5M',
      },
      {
        value: 'se',
        label: t('storybook.searchableSelect.sweden'),
        description: 'Population: 10.5M',
      },
      {
        value: 'dk',
        label: t('storybook.searchableSelect.denmark'),
        description: 'Population: 5.9M',
      },
      {
        value: 'fi',
        label: t('storybook.searchableSelect.finland'),
        description: 'Population: 5.6M',
      },
      {
        value: 'is',
        label: t('storybook.searchableSelect.iceland'),
        description: 'Population: 0.4M',
      },
    ];
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          label={t('storybook.searchableSelect.country')}
          placeholder={t('storybook.searchableSelect.selectCountry')}
          renderOption={(option, { isSelected, isFocused }) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: 'var(--ds-spacing-6)',
                  height: 'var(--ds-spacing-6)',
                  borderRadius: 'var(--ds-border-radius-full)',
                  backgroundColor: isSelected
                    ? 'var(--ds-color-accent-background-default)'
                    : 'var(--ds-color-neutral-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--ds-font-size-xs)',
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  color: isSelected
                    ? 'var(--ds-color-neutral-text-on-inverted)'
                    : 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {option.value.toString().toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: isSelected
                      ? 'var(--ds-font-weight-semibold)'
                      : 'var(--ds-font-weight-regular)',
                    color: isFocused
                      ? 'var(--ds-color-accent-text-default)'
                      : 'var(--ds-color-neutral-text-default)',
                  }}
                >
                  {option.label}
                </div>
                {option.description && (
                  <div
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {option.description}
                  </div>
                )}
              </div>
              {isSelected && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  style={{ color: 'var(--ds-color-accent-text-default)' }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          )}
        />
      </Stack>
    );
  },
};

/**
 * Large dataset with virtual scrolling
 * Demonstrates performance with 1000+ options
 */
export const LargeDataset: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);

    // Generate 1000+ options
    const generateLargeDataset = (): SelectOption[] => {
      const options: SelectOption[] = [];
      const categories = ['Customer', 'Supplier', 'Partner', 'Employee', 'Contractor'];
      const statuses = ['Active', 'Pending', 'Inactive', 'Archived'];

      for (let i = 1; i <= 1000; i++) {
        const category = categories[i % categories.length];
        const status = statuses[i % statuses.length];
        options.push({
          value: `item-${i}`,
          label: `${category} ${i.toString().padStart(4, '0')}`,
          description: `Status: ${status} | ID: ${i}`,
        });
      }

      return options;
    };

    const options = generateLargeDataset();

    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          label="Select from 1000+ items"
          placeholder="Search to filter options..."
          clearable
        />
        <div
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          Total options: {options.length}
        </div>
      </Stack>
    );
  },
};

/**
 * Keyboard Navigation & Accessibility
 *
 * Demonstrates full keyboard support and accessibility features
 */
export const KeyboardNavigation: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();

    return (
      <Stack
        spacing="var(--ds-spacing-6)"
        style={{ maxWidth: '700px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            {t('storybook.searchableSelect.keyboardNavigation')}
          </Heading>
          <Paragraph
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.searchableSelect.keyboardNavigationDescription')}
          </Paragraph>

          <div
            style={{
              marginBottom: 'var(--ds-spacing-6)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-info-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {t('storybook.searchableSelect.keyboardShortcuts')}
            </Heading>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-spacing-2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <code
                  style={{
                    padding: '0 var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'monospace',
                    minWidth: '80px',
                  }}
                >
                  Tab
                </code>
                <Paragraph data-size="sm">
                  {t('storybook.searchableSelect.tabDescription')}
                </Paragraph>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <code
                  style={{
                    padding: '0 var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'monospace',
                    minWidth: '80px',
                  }}
                >
                  Enter/Space
                </code>
                <Paragraph data-size="sm">
                  {t('storybook.searchableSelect.enterDescription')}
                </Paragraph>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <code
                  style={{
                    padding: '0 var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'monospace',
                    minWidth: '80px',
                  }}
                >
                  ↑ ↓
                </code>
                <Paragraph data-size="sm">
                  {t('storybook.searchableSelect.arrowDescription')}
                </Paragraph>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <code
                  style={{
                    padding: '0 var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'monospace',
                    minWidth: '80px',
                  }}
                >
                  Escape
                </code>
                <Paragraph data-size="sm">
                  {t('storybook.searchableSelect.escapeDescription')}
                </Paragraph>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                <code
                  style={{
                    padding: '0 var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontFamily: 'monospace',
                    minWidth: '80px',
                  }}
                >
                  Type
                </code>
                <Paragraph data-size="sm">
                  {t('storybook.searchableSelect.typeDescription')}
                </Paragraph>
              </div>
            </div>
          </div>

          <SearchableSelect
            options={options}
            value={value}
            onChange={setValue}
            label={t('storybook.searchableSelect.country')}
            placeholder={t('storybook.searchableSelect.selectCountry')}
            clearable
          />

          {value && (
            <div
              style={{
                marginTop: 'var(--ds-spacing-4)',
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-success-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
                <strong>{t('storybook.searchableSelect.selected')}:</strong>{' '}
                {options.find((opt) => opt.value === value)?.label}
              </Paragraph>
            </div>
          )}
        </Card>

        <Card
          style={{
            padding: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-success-surface-subtle)',
          }}
        >
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.searchableSelect.accessibilityFeatures')}
          </Heading>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-2)',
            }}
          >
            <Paragraph data-size="sm">✓ {t('storybook.searchableSelect.ariaLabels')}</Paragraph>
            <Paragraph data-size="sm">
              ✓ {t('storybook.searchableSelect.screenReaderSupport')}
            </Paragraph>
            <Paragraph data-size="sm">✓ {t('storybook.searchableSelect.keyboardOnly')}</Paragraph>
            <Paragraph data-size="sm">
              ✓ {t('storybook.searchableSelect.focusManagement')}
            </Paragraph>
            <Paragraph data-size="sm">✓ {t('storybook.searchableSelect.highContrast')}</Paragraph>
          </div>
        </Card>
      </Stack>
    );
  },
};
