import {
  Box,
  Card,
  Heading,
  Paragraph,
  Button,
  Chip,
} from '@digdir/designsystemet-react';

const workflows = [
  {
    id: 'product-vision',
    name: 'Product Vision',
    description: 'Define the product vision, goals, and target users',
    command: '/product-vision',
    status: 'available',
    prerequisites: [],
  },
  {
    id: 'product-roadmap',
    name: 'Product Roadmap',
    description: 'Break the product into phases and sections',
    command: '/product-roadmap',
    status: 'available',
    prerequisites: ['product-vision'],
  },
  {
    id: 'data-model',
    name: 'Data Model',
    description: 'Define entities, fields, and relationships',
    command: '/data-model',
    status: 'available',
    prerequisites: ['product-vision', 'product-roadmap'],
  },
  {
    id: 'section-spec',
    name: 'Section Spec',
    description: 'Specify individual sections with components and states',
    command: '/section-spec [name]',
    status: 'available',
    prerequisites: ['data-model'],
  },
  {
    id: 'export',
    name: 'Export',
    description: 'Generate implementation prompts (oneshot or incremental)',
    command: '/export --mode [oneshot|incremental]',
    status: 'available',
    prerequisites: ['section-spec'],
  },
];

const workflowSteps = [
  { step: 1, name: 'Vision', workflow: 'product-vision' },
  { step: 2, name: 'Roadmap', workflow: 'product-roadmap' },
  { step: 3, name: 'Data Model', workflow: 'data-model' },
  { step: 4, name: 'Section Specs', workflow: 'section-spec' },
  { step: 5, name: 'Export', workflow: 'export' },
];

export function WorkflowCatalog() {
  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    // In a real app, show a toast notification
  };

  return (
    <Box>
      <Heading level={2} data-size="large" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        Workflow Catalog
      </Heading>
      <Paragraph data-size="medium" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        AI-guided workflows for design specification and implementation
      </Paragraph>

      {/* Workflow Pipeline */}
      <Card data-color="neutral" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        <Box style={{ padding: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Recommended Flow
          </Heading>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              flexWrap: 'wrap',
            }}
          >
            {workflowSteps.map((step, index) => (
              <Box key={step.step} style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                    backgroundColor: 'var(--ds-color-accent-surface-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                  }}
                >
                  <Box
                    as="span"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ds-color-accent-base-default)',
                      color: 'var(--ds-color-accent-contrast-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    {step.step}
                  </Box>
                  <Paragraph data-size="small">{step.name}</Paragraph>
                </Box>
                {index < workflowSteps.length - 1 && (
                  <Box as="span" style={{ margin: '0 var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                    →
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Card>

      {/* Workflow Cards */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {workflows.map((workflow) => (
          <Card key={workflow.id} data-color="neutral">
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--ds-spacing-3)' }}>
                <Heading level={3} data-size="small">
                  {workflow.name}
                </Heading>
                <Chip data-size="small" data-color="success">
                  {workflow.status}
                </Chip>
              </Box>

              <Paragraph data-size="small" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                {workflow.description}
              </Paragraph>

              <Box
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--ds-spacing-3)',
                }}
              >
                {workflow.command}
              </Box>

              {workflow.prerequisites.length > 0 && (
                <Box style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                  <Paragraph data-size="xsmall" data-color="subtle">
                    Prerequisites: {workflow.prerequisites.join(', ')}
                  </Paragraph>
                </Box>
              )}

              <Box style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button
                  variant="primary"
                  data-size="small"
                  onClick={() => copyCommand(workflow.command)}
                >
                  Copy Command
                </Button>
                <Button variant="secondary" data-size="small">
                  View Docs
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Usage Instructions */}
      <Card data-color="neutral" style={{ marginTop: 'var(--ds-spacing-6)' }}>
        <Box style={{ padding: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="small" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            How to Use
          </Heading>
          <Box as="ol" style={{ margin: 0, paddingLeft: 'var(--ds-spacing-5)' }}>
            <Box as="li" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              <Paragraph data-size="small">
                Open Claude Code in your terminal
              </Paragraph>
            </Box>
            <Box as="li" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              <Paragraph data-size="small">
                Type the slash command (e.g., <code>/product-vision</code>)
              </Paragraph>
            </Box>
            <Box as="li" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              <Paragraph data-size="small">
                Follow the guided Q&A to generate your specification
              </Paragraph>
            </Box>
            <Box as="li">
              <Paragraph data-size="small">
                Review the generated YAML/JSON artifacts in the product/ directory
              </Paragraph>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
