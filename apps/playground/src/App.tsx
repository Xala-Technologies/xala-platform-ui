import { useState } from 'react';
import {
  Box,
  Card,
  Heading,
  Paragraph,
  Button,
  Select,
  Chip,
  Tabs,
} from '@digdir/designsystemet-react';

// Component categories from platform-ui
const componentCatalog = {
  primitives: [
    { name: 'Button', description: 'Interactive button component' },
    { name: 'Card', description: 'Content container with borders' },
    { name: 'Badge', description: 'Status indicator' },
    { name: 'Chip', description: 'Tag or filter element' },
    { name: 'TextField', description: 'Text input field' },
    { name: 'Select', description: 'Dropdown selection' },
    { name: 'Checkbox', description: 'Boolean input' },
    { name: 'Radio', description: 'Single choice input' },
    { name: 'Switch', description: 'Toggle control' },
  ],
  composed: [
    { name: 'DataTable', description: 'Sortable, filterable table' },
    { name: 'Modal', description: 'Dialog overlay' },
    { name: 'Drawer', description: 'Side panel overlay' },
    { name: 'Tabs', description: 'Tabbed content navigation' },
    { name: 'Accordion', description: 'Collapsible sections' },
    { name: 'Breadcrumbs', description: 'Navigation trail' },
  ],
  blocks: [
    { name: 'NotificationBell', description: 'Notification indicator' },
    { name: 'UserMenu', description: 'User account menu' },
    { name: 'SearchBar', description: 'Search input with suggestions' },
    { name: 'FilterPanel', description: 'Filter controls' },
  ],
  patterns: [
    { name: 'ResourceCard', description: 'Display resource information' },
    { name: 'ResourceGrid', description: 'Grid of resource cards' },
    { name: 'SlotCalendar', description: 'Time slot selection' },
    { name: 'PricingSummary', description: 'Price breakdown display' },
  ],
  shells: [
    { name: 'AppLayout', description: 'Main application layout' },
    { name: 'DashboardLayout', description: 'Dashboard with sidebar' },
    { name: 'DashboardSidebar', description: 'Sidebar navigation' },
  ],
};

const themes = [
  { value: 'xala', label: 'Xala (Default)' },
  { value: 'digdir', label: 'Digdir' },
  { value: 'dark', label: 'Dark Mode' },
];

const sizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const colors = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'accent', label: 'Accent' },
  { value: 'brand1', label: 'Brand 1' },
  { value: 'brand2', label: 'Brand 2' },
  { value: 'brand3', label: 'Brand 3' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('primitives');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [theme, setTheme] = useState('xala');
  const [size, setSize] = useState('medium');
  const [color, setColor] = useState('neutral');

  const components = componentCatalog[selectedCategory as keyof typeof componentCatalog] || [];

  return (
    <Box data-color="neutral" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box
        data-color="brand1"
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-border-default)',
        }}
      >
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Heading level={1} data-size="medium">
              Xala UI Playground
            </Heading>
            <Paragraph data-size="small">
              Visual QA Sandbox for Component Testing
            </Paragraph>
          </Box>
          <Box style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
            <Select
              label="Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              data-size="small"
            >
              {themes.map((t) => (
                <Select.Option key={t.value} value={t.value}>
                  {t.label}
                </Select.Option>
              ))}
            </Select>
            <Select
              label="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              data-size="small"
            >
              {sizes.map((s) => (
                <Select.Option key={s.value} value={s.value}>
                  {s.label}
                </Select.Option>
              ))}
            </Select>
            <Select
              label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              data-size="small"
            >
              {colors.map((c) => (
                <Select.Option key={c.value} value={c.value}>
                  {c.label}
                </Select.Option>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>

      <Box style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        {/* Component Navigator */}
        <Box
          style={{
            width: '280px',
            borderRight: '1px solid var(--ds-color-border-default)',
            padding: 'var(--ds-spacing-4)',
            overflow: 'auto',
          }}
        >
          <Heading level={2} data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Components
          </Heading>

          <Tabs
            defaultValue="primitives"
            onValueChange={setSelectedCategory}
          >
            <Tabs.List>
              {Object.keys(componentCatalog).map((category) => (
                <Tabs.Tab key={category} value={category} data-size="small">
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>

          <Box style={{ marginTop: 'var(--ds-spacing-4)' }}>
            {components.map((comp) => (
              <Box
                key={comp.name}
                onClick={() => setSelectedComponent(comp.name)}
                style={{
                  padding: 'var(--ds-spacing-3)',
                  marginBottom: 'var(--ds-spacing-2)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  cursor: 'pointer',
                  backgroundColor:
                    selectedComponent === comp.name
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'transparent',
                  border:
                    selectedComponent === comp.name
                      ? '1px solid var(--ds-color-accent-border-default)'
                      : '1px solid transparent',
                }}
              >
                <Paragraph data-size="small" style={{ fontWeight: '500' }}>
                  {comp.name}
                </Paragraph>
                <Paragraph data-size="xsmall" data-color="subtle">
                  {comp.description}
                </Paragraph>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Preview Area */}
        <Box style={{ flex: 1, padding: 'var(--ds-spacing-6)' }}>
          {selectedComponent ? (
            <Box>
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ds-spacing-4)' }}>
                <Box>
                  <Heading level={2} data-size="large">
                    {selectedComponent}
                  </Heading>
                  <Paragraph data-size="small" data-color="subtle">
                    {selectedCategory} / {selectedComponent}
                  </Paragraph>
                </Box>
                <Box style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                  <Chip data-size="small" data-color="info">
                    {selectedCategory}
                  </Chip>
                  <Chip data-size="small" data-color="neutral">
                    {size}
                  </Chip>
                  <Chip data-size="small" data-color="neutral">
                    {color}
                  </Chip>
                </Box>
              </Box>

              {/* Preview Card */}
              <Card data-color="neutral" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                <Box
                  style={{
                    padding: 'var(--ds-spacing-8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '300px',
                    backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                  }}
                  data-size={size}
                  data-color={color}
                >
                  {/* Component Preview Placeholder */}
                  <Box style={{ textAlign: 'center' }}>
                    <Paragraph data-size="medium" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                      {selectedComponent} Preview
                    </Paragraph>
                    <Paragraph data-size="small" data-color="subtle">
                      Component would render here with current props
                    </Paragraph>
                    <Box style={{ marginTop: 'var(--ds-spacing-4)' }}>
                      <Button variant="primary" data-size={size} data-color={color}>
                        Example Button
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>

              {/* Props Panel */}
              <Card data-color="neutral">
                <Box style={{ padding: 'var(--ds-spacing-4)' }}>
                  <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                    Props
                  </Heading>
                  <Box
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--ds-spacing-4)',
                    }}
                  >
                    <Box>
                      <Paragraph data-size="xsmall" data-color="subtle" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                        data-size
                      </Paragraph>
                      <Select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        data-size="small"
                      >
                        {sizes.map((s) => (
                          <Select.Option key={s.value} value={s.value}>
                            {s.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <Paragraph data-size="xsmall" data-color="subtle" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                        data-color
                      </Paragraph>
                      <Select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        data-size="small"
                      >
                        {colors.map((c) => (
                          <Select.Option key={c.value} value={c.value}>
                            {c.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <Paragraph data-size="xsmall" data-color="subtle" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                        variant
                      </Paragraph>
                      <Select data-size="small" defaultValue="primary">
                        <Select.Option value="primary">Primary</Select.Option>
                        <Select.Option value="secondary">Secondary</Select.Option>
                        <Select.Option value="tertiary">Tertiary</Select.Option>
                      </Select>
                    </Box>
                    <Box>
                      <Paragraph data-size="xsmall" data-color="subtle" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                        disabled
                      </Paragraph>
                      <Select data-size="small" defaultValue="false">
                        <Select.Option value="false">false</Select.Option>
                        <Select.Option value="true">true</Select.Option>
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          ) : (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Box>
                <Heading level={2} data-size="large" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                  Select a Component
                </Heading>
                <Paragraph data-size="medium" data-color="subtle">
                  Choose a component from the sidebar to preview it
                </Paragraph>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
