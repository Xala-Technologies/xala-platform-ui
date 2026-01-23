/**
 * Spec Editor Page
 *
 * Uses platform-ui composed components for proper page structure.
 * Layer definitions extracted to src/constants/layers.ts (OCP).
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DashboardPageHeader,
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  Paragraph,
  Button,
  Textfield,
  Select,
  Tabs,
  Field,
  Label,
  List,
  CodeBlock,
  PageContainer,
  FormGrid,
  ButtonGroup,
  Stack,
  Drawer,
} from '@xala-technologies/platform-ui';
import { getLayerOptions } from '../constants';
import { CompositionPreview } from '../components/preview/CompositionPreview';
import { TESTIDS } from '../constants/testids';

/** WCAG accessibility requirements for component specs */
const ACCESSIBILITY_REQUIREMENTS = [
  '1.1.1 Non-text Content - All images have alt text',
  '1.3.1 Info and Relationships - Semantic HTML structure',
  '1.4.3 Contrast - Minimum 4.5:1 text contrast',
  '2.1.1 Keyboard - All interactive elements keyboard accessible',
];

export function SpecEditor() {
  const { componentName } = useParams();
  const [formData, setFormData] = useState({
    name: componentName || '',
    layer: 'blocks',
    description: '',
    purpose: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const componentNameSafe = formData.name || 'Component';
  const componentNameLower = componentNameSafe.toLowerCase();

  const propsCode = `export interface ${componentNameSafe}Props {
  children?: React.ReactNode;
  variant?: 'default' | 'compact' | 'expanded';
  size?: 'small' | 'medium' | 'large';
}`;

  const testIdsCode = `{
  "root": "${componentNameLower}-root",
  "title": "${componentNameLower}-title"
}`;

  const layers = getLayerOptions();

  return (
    <PageContainer>
      <DashboardPageHeader
        title={componentName ? `Edit: ${componentName}` : 'New Component Spec'}
        subtitle="Define component specifications using design workflow templates"
        secondaryAction={
          <Button
            variant="secondary"
            data-size="sm"
            onClick={() => setShowPreview(true)}
            data-testid={TESTIDS.specEditor.previewBtn}
          >
            Preview
          </Button>
        }
        primaryAction={
          <Button variant="primary" data-size="sm">
            Save Spec
          </Button>
        }
      />

      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="props">Props</Tabs.Tab>
          <Tabs.Tab value="composition">Composition</Tabs.Tab>
          <Tabs.Tab value="accessibility">Accessibility</Tabs.Tab>
          <Tabs.Tab value="testids">Test IDs</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <SectionCard>
            <SectionCardContent>
              <Stack spacing="var(--ds-spacing-4)">
                <FormGrid columns={2}>
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
                </FormGrid>
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
              </Stack>
            </SectionCardContent>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="props">
          <SectionCard>
            <SectionCardHeader title="Props Definition" />
            <SectionCardContent>
              <Stack spacing="var(--ds-spacing-4)">
                <CodeBlock code={propsCode} language="typescript" />
                <Button variant="secondary" data-size="sm">
                  + Add Prop
                </Button>
              </Stack>
            </SectionCardContent>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="composition">
          <SectionCard>
            <SectionCardHeader
              title="Component Composition"
              description="Define which Designsystemet and internal components make up this component."
            />
            <SectionCardContent>
              <ButtonGroup>
                {['Card', 'Heading', 'Paragraph', 'Button'].map((comp) => (
                  <Button key={comp} variant="secondary" data-size="sm">
                    {comp}
                  </Button>
                ))}
                <Button variant="tertiary" data-size="sm">
                  + Add
                </Button>
              </ButtonGroup>
            </SectionCardContent>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="accessibility">
          <SectionCard>
            <SectionCardHeader title="Accessibility Requirements" />
            <SectionCardContent>
              <List.Unordered>
                {ACCESSIBILITY_REQUIREMENTS.map((req, i) => (
                  <List.Item key={i}>
                    <Paragraph data-size="sm">{req}</Paragraph>
                  </List.Item>
                ))}
              </List.Unordered>
            </SectionCardContent>
          </SectionCard>
        </Tabs.Panel>

        <Tabs.Panel value="testids">
          <SectionCard>
            <SectionCardHeader title="Test ID Registry" />
            <SectionCardContent>
              <CodeBlock code={testIdsCode} language="json" />
            </SectionCardContent>
          </SectionCard>
        </Tabs.Panel>
      </Tabs>

      {/* Preview Drawer */}
      {showPreview && (
        <Drawer
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title={`Preview: ${componentNameSafe}`}
          size="lg"
        >
          <CompositionPreview
            componentName={componentNameSafe}
            composeData={{
              componentName: componentNameSafe,
              layer: formData.layer,
              description: formData.description,
              props: {
                // Would parse from props tab
              },
            }}
            data-testid={TESTIDS.preview.root}
          />
        </Drawer>
      )}
    </PageContainer>
  );
}
