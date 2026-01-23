import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  Heading,
  Paragraph,
  Button,
  Textfield,
  Select,
  Tabs,
} from '@digdir/designsystemet-react';

const layers = [
  { value: 'primitives', label: 'Primitives (Level 0)' },
  { value: 'composed', label: 'Composed (Level 1)' },
  { value: 'blocks', label: 'Blocks (Level 2)' },
  { value: 'patterns', label: 'Patterns (Level 3)' },
  { value: 'shells', label: 'Shells (Level 4)' },
  { value: 'pages', label: 'Pages (Level 5)' },
];

export function SpecEditor() {
  const { componentName } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: componentName || '',
    layer: 'blocks',
    description: '',
    purpose: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ds-spacing-6)' }}>
        <Box>
          <Heading level={2} data-size="large">
            {componentName ? `Edit: ${componentName}` : 'New Component Spec'}
          </Heading>
          <Paragraph data-size="small" data-color="subtle">
            Define component specifications using design workflow templates
          </Paragraph>
        </Box>
        <Box style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button variant="secondary" data-size="small">
            Preview
          </Button>
          <Button variant="primary" data-size="small">
            Save Spec
          </Button>
        </Box>
      </Box>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="props">Props</Tabs.Tab>
          <Tabs.Tab value="composition">Composition</Tabs.Tab>
          <Tabs.Tab value="accessibility">Accessibility</Tabs.Tab>
          <Tabs.Tab value="testids">Test IDs</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-4)' }}>
                <Textfield
                  label="Component Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., ResourceCard"
                />
                <Select
                  label="Layer"
                  value={formData.layer}
                  onChange={(e) => handleInputChange('layer', e.target.value)}
                >
                  {layers.map((layer) => (
                    <Select.Option key={layer.value} value={layer.value}>
                      {layer.label}
                    </Select.Option>
                  ))}
                </Select>
              </Box>

              <Textfield
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the component"
                style={{ marginBottom: 'var(--ds-spacing-4)' }}
              />

              <Textfield
                label="Purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="Why does this component exist?"
              />

              <Heading level={4} data-size="xsmall" style={{ marginTop: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-3)' }}>
                User Stories
              </Heading>

              <Card data-color="subtle">
                <Box style={{ padding: 'var(--ds-spacing-3)' }}>
                  <Box style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' }}>
                    <Paragraph data-size="xsmall" data-color="subtle">Priority</Paragraph>
                    <Paragraph data-size="xsmall" data-color="subtle">As a...</Paragraph>
                    <Paragraph data-size="xsmall" data-color="subtle">I want to... so that...</Paragraph>
                  </Box>
                  <Box style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 'var(--ds-spacing-2)' }}>
                    <Select data-size="small" defaultValue="high">
                      <Select.Option value="high">High</Select.Option>
                      <Select.Option value="medium">Medium</Select.Option>
                      <Select.Option value="low">Low</Select.Option>
                    </Select>
                    <Textfield data-size="small" placeholder="user role" />
                    <Textfield data-size="small" placeholder="action and benefit" />
                  </Box>
                  <Button variant="tertiary" data-size="small" style={{ marginTop: 'var(--ds-spacing-2)' }}>
                    + Add User Story
                  </Button>
                </Box>
              </Card>
            </Box>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="props">
          <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Props Definition
              </Heading>

              <Box
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--ds-spacing-4)',
                }}
              >
                <pre style={{ margin: 0 }}>
{`export interface ${formData.name || 'Component'}Props {
  /**
   * Primary content
   */
  children?: React.ReactNode;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'expanded';

  /**
   * Component size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}`}
                </pre>
              </Box>

              <Button variant="secondary" data-size="small">
                + Add Prop
              </Button>
            </Box>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="composition">
          <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Component Composition
              </Heading>

              <Paragraph data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Define which Designsystemet and internal components make up this component.
              </Paragraph>

              <Box style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                <Heading level={4} data-size="xsmall" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                  Designsystemet Components
                </Heading>
                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-2)' }}>
                  {['Card', 'Heading', 'Paragraph', 'Button', 'Box'].map((comp) => (
                    <Button key={comp} variant="secondary" data-size="small">
                      {comp}
                    </Button>
                  ))}
                  <Button variant="tertiary" data-size="small">
                    + Add
                  </Button>
                </Box>
              </Box>

              <Box>
                <Heading level={4} data-size="xsmall" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                  Internal Components
                </Heading>
                <Paragraph data-size="small" data-color="subtle">
                  No internal components added yet.
                </Paragraph>
              </Box>
            </Box>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="accessibility">
          <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Accessibility Requirements
              </Heading>

              <Box as="ul" style={{ margin: 0, paddingLeft: 'var(--ds-spacing-5)' }}>
                {[
                  '1.1.1 Non-text Content - All images have alt text',
                  '1.3.1 Info and Relationships - Semantic HTML structure',
                  '1.4.3 Contrast - Minimum 4.5:1 text contrast',
                  '2.1.1 Keyboard - All interactive elements keyboard accessible',
                  '2.4.3 Focus Order - Logical tab order',
                  '2.4.7 Focus Visible - Clear focus indicators',
                  '4.1.2 Name, Role, Value - ARIA attributes correct',
                ].map((req, i) => (
                  <Box as="li" key={i} style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                    <Paragraph data-size="small">{req}</Paragraph>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="testids">
          <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Test ID Registry
              </Heading>

              <Box
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                <pre style={{ margin: 0 }}>
{`{
  "root": "${(formData.name || 'component').toLowerCase()}-root",
  "title": "${(formData.name || 'component').toLowerCase()}-title",
  "description": "${(formData.name || 'component').toLowerCase()}-description",
  "primaryAction": "${(formData.name || 'component').toLowerCase()}-primary-action"
}`}
                </pre>
              </Box>
            </Box>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
