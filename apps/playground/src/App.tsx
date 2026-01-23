/**
 * Xala UI Playground
 *
 * Visual QA Sandbox using platform-ui shell components.
 * 100% platform-ui compliant - no raw HTML or inline styles.
 */

import { useState } from 'react';
import {
  Heading,
  Paragraph,
  Button,
  Select,
  Tabs,
  Field,
  Label,
  HorizontalLayout,
  SimpleSidebar,
  SidebarHeaderArea,
  SidebarPanel,
  SidebarScrollArea,
  MainContent,
  Center,
  Stack,
  ExplorerItem,
  PreviewArea,
} from '@xala-technologies/platform-ui';

const componentCatalog = {
  primitives: [
    { name: 'Button', description: 'Interactive button component' },
    { name: 'Card', description: 'Content container with borders' },
    { name: 'TextField', description: 'Text input field' },
    { name: 'Select', description: 'Dropdown selection' },
    { name: 'Checkbox', description: 'Boolean input' },
  ],
  composed: [
    { name: 'DataTable', description: 'Sortable, filterable table' },
    { name: 'Modal', description: 'Dialog overlay' },
    { name: 'Drawer', description: 'Side panel overlay' },
    { name: 'Tabs', description: 'Tabbed content navigation' },
  ],
  blocks: [
    { name: 'NotificationBell', description: 'Notification indicator' },
    { name: 'UserMenu', description: 'User account menu' },
    { name: 'SearchBar', description: 'Search input with suggestions' },
  ],
  patterns: [
    { name: 'ResourceCard', description: 'Display resource information' },
    { name: 'SlotCalendar', description: 'Time slot selection' },
  ],
  shells: [
    { name: 'AppLayout', description: 'Main application layout' },
    { name: 'DashboardLayout', description: 'Dashboard with sidebar' },
  ],
};

const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('primitives');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [size, setSize] = useState('md');

  const components = componentCatalog[selectedCategory as keyof typeof componentCatalog] || [];

  return (
    <HorizontalLayout>
      <SimpleSidebar>
        <SidebarHeaderArea>
          <Heading level={1} data-size="md">
            Xala UI Playground
          </Heading>
          <Paragraph data-size="sm">Visual QA Sandbox</Paragraph>
        </SidebarHeaderArea>

        <SidebarPanel bordered>
          <Field data-size="sm">
            <Label>Component Size</Label>
            <Select value={size} onChange={(e) => setSize(e.target.value)}>
              {sizes.map((s) => (
                <Select.Option key={s.value} value={s.value}>
                  {s.label}
                </Select.Option>
              ))}
            </Select>
          </Field>
        </SidebarPanel>

        <SidebarPanel>
          <Tabs
            defaultValue="primitives"
            onChange={(value: string) => {
              setSelectedCategory(value);
              setSelectedComponent(null);
            }}
          >
            <Tabs.List>
              {Object.keys(componentCatalog).map((category) => (
                <Tabs.Tab key={category} value={category} data-size="sm">
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </SidebarPanel>

        <SidebarScrollArea>
          {components.map((comp) => (
            <ExplorerItem
              key={comp.name}
              title={comp.name}
              description={comp.description}
              selected={selectedComponent === comp.name}
              onClick={() => setSelectedComponent(comp.name)}
            />
          ))}
        </SidebarScrollArea>
      </SimpleSidebar>

      <MainContent>
        {selectedComponent ? (
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={2} data-size="lg">
              {selectedComponent}
            </Heading>
            <PreviewArea>
              <Stack spacing="var(--ds-spacing-2)" align="center">
                <Paragraph data-size="md">{selectedComponent} Preview</Paragraph>
                <Paragraph data-size="sm">
                  Component would render here with current props
                </Paragraph>
                <Button variant="primary" data-size={size as 'sm' | 'md' | 'lg'}>
                  Example Button
                </Button>
              </Stack>
            </PreviewArea>
          </Stack>
        ) : (
          <Center>
            <Stack spacing="var(--ds-spacing-2)" align="center">
              <Heading level={2} data-size="lg">
                Select a Component
              </Heading>
              <Paragraph data-size="md">
                Choose a component from the sidebar to preview it
              </Paragraph>
            </Stack>
          </Center>
        )}
      </MainContent>
    </HorizontalLayout>
  );
}

export default App;
