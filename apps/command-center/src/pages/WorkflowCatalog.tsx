import {
  Card,
  Heading,
  Paragraph,
  Button,
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
  { step: 1, name: 'Vision' },
  { step: 2, name: 'Roadmap' },
  { step: 3, name: 'Data Model' },
  { step: 4, name: 'Section Specs' },
  { step: 5, name: 'Export' },
];

export function WorkflowCatalog() {
  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          Workflow Catalog
        </Heading>
        <Paragraph data-size="md">
          AI-guided workflows for design specification and implementation
        </Paragraph>
      </div>

      {/* Workflow Pipeline */}
      <Card>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            Recommended Flow
          </Heading>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            {workflowSteps.map((step, index) => (
              <div key={step.step} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                    backgroundColor: 'var(--ds-color-accent-surface-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                  }}
                >
                  <span
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
                  </span>
                  <Paragraph data-size="sm">{step.name}</Paragraph>
                </div>
                {index < workflowSteps.length - 1 && (
                  <span style={{ margin: '0 var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Workflow Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <div style={{ padding: 'var(--ds-spacing-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--ds-spacing-3)' }}>
                <Heading level={3} data-size="sm">
                  {workflow.name}
                </Heading>
                <span
                  style={{
                    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-success-surface-default)',
                    color: 'var(--ds-color-success-text-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                  }}
                >
                  {workflow.status}
                </span>
              </div>

              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                {workflow.description}
              </Paragraph>

              <div
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
              </div>

              {workflow.prerequisites.length > 0 && (
                <Paragraph data-size="xs" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                  Prerequisites: {workflow.prerequisites.join(', ')}
                </Paragraph>
              )}

              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button variant="primary" data-size="sm" onClick={() => copyCommand(workflow.command)}>
                  Copy Command
                </Button>
                <Button variant="secondary" data-size="sm">
                  View Docs
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
