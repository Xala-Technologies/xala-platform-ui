import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Textfield,
  Select,
  Tabs,
  Field,
  Label,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={2} data-size="lg">
            {componentName ? `Edit: ${componentName}` : 'New Component Spec'}
          </Heading>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            Define component specifications using design workflow templates
          </Paragraph>
        </div>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button variant="secondary" data-size="sm">Preview</Button>
          <Button variant="primary" data-size="sm">Save Spec</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="props">Props</Tabs.Tab>
          <Tabs.Tab value="composition">Composition</Tabs.Tab>
          <Tabs.Tab value="accessibility">Accessibility</Tabs.Tab>
          <Tabs.Tab value="testids">Test IDs</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <Card style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <div style={{ padding: 'var(--ds-spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--ds-spacing-4)' }}>
                <Textfield
                  label="Component Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., ResourceCard"
                />
                <Field>
                  <Label>Layer</Label>
                  <Select
                    value={formData.layer}
                    onChange={(e) => handleInputChange('layer', e.target.value)}
                  >
                    {layers.map((layer) => (
                      <Select.Option key={layer.value} value={layer.value}>
                        {layer.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Field>
              </div>
              <Textfield
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the component"
              />
              <Textfield
                label="Purpose"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="Why does this component exist?"
              />
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="props">
          <Card style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <div style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Props Definition
              </Heading>
              <pre
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontSize: '0.875rem',
                  overflow: 'auto',
                }}
              >
{`export interface ${formData.name || 'Component'}Props {
  children?: React.ReactNode;
  variant?: 'default' | 'compact' | 'expanded';
  size?: 'small' | 'medium' | 'large';
}`}
              </pre>
              <Button variant="secondary" data-size="sm" style={{ marginTop: 'var(--ds-spacing-4)' }}>
                + Add Prop
              </Button>
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="composition">
          <Card style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <div style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Component Composition
              </Heading>
              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Define which Designsystemet and internal components make up this component.
              </Paragraph>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-2)' }}>
                {['Card', 'Heading', 'Paragraph', 'Button'].map((comp) => (
                  <Button key={comp} variant="secondary" data-size="sm">{comp}</Button>
                ))}
                <Button variant="tertiary" data-size="sm">+ Add</Button>
              </div>
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="accessibility">
          <Card style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <div style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Accessibility Requirements
              </Heading>
              <ul style={{ margin: 0, paddingLeft: 'var(--ds-spacing-5)' }}>
                {[
                  '1.1.1 Non-text Content - All images have alt text',
                  '1.3.1 Info and Relationships - Semantic HTML structure',
                  '1.4.3 Contrast - Minimum 4.5:1 text contrast',
                  '2.1.1 Keyboard - All interactive elements keyboard accessible',
                ].map((req, i) => (
                  <li key={i} style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                    <Paragraph data-size="sm">{req}</Paragraph>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="testids">
          <Card style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <div style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Test ID Registry
              </Heading>
              <pre
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  padding: 'var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontSize: '0.875rem',
                }}
              >
{`{
  "root": "${(formData.name || 'component').toLowerCase()}-root",
  "title": "${(formData.name || 'component').toLowerCase()}-title"
}`}
              </pre>
            </div>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
