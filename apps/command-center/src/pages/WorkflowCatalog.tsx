/**
 * Workflow Catalog Page
 *
 * Uses platform-ui composed components for proper page structure.
 * Data is extracted to src/data/workflows.ts (SRP).
 */

import {
  DashboardPageHeader,
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  Paragraph,
  Button,
  ArrowRightIcon,
  Heading,
  Card,
  PageContainer,
} from '@xala-technologies/platform-ui';
import { WORKFLOWS, WORKFLOW_STEPS } from '../data';

export function WorkflowCatalog() {
  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
  };

  return (
    <PageContainer>
      <DashboardPageHeader
        title="Workflow Catalog"
        subtitle="AI-guided workflows for design specification and implementation"
      />

      <SectionCard>
        <SectionCardHeader
          title="Recommended Flow"
          description="Follow these steps in order for best results"
        />
        <SectionCardContent>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              flexWrap: 'wrap',
            }}
          >
            {WORKFLOW_STEPS.map((step, index) => (
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
                  <div
                    style={{
                      width: 'var(--ds-spacing-6)',
                      height: 'var(--ds-spacing-6)',
                      borderRadius: 'var(--ds-border-radius-full)',
                      backgroundColor: 'var(--ds-color-accent-base-default)',
                      color: 'var(--ds-color-accent-contrast-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--ds-font-size-xs)',
                      fontWeight: 'var(--ds-font-weight-semibold)',
                    }}
                  >
                    {step.step}
                  </div>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {step.name}
                  </Paragraph>
                </div>
                {index < WORKFLOW_STEPS.length - 1 && (
                  <div
                    style={{
                      margin: '0 var(--ds-spacing-1)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <ArrowRightIcon size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCardContent>
      </SectionCard>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(var(--ds-sizing-80), 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {WORKFLOWS.map((workflow) => (
          <Card key={workflow.id}>
            <div style={{ padding: 'var(--ds-spacing-4)' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 'var(--ds-spacing-3)',
                }}
              >
                <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                  {workflow.name}
                </Heading>
                <div
                  style={{
                    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                    backgroundColor: 'var(--ds-color-success-surface-default)',
                    color: 'var(--ds-color-success-text-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 'var(--ds-font-weight-medium)',
                  }}
                >
                  {workflow.status}
                </div>
              </div>

              <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                {workflow.description}
              </Paragraph>

              <div
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontFamily: 'var(--ds-font-family-mono, monospace)',
                  fontSize: 'var(--ds-font-size-sm)',
                  marginBottom: 'var(--ds-spacing-3)',
                }}
              >
                {workflow.command}
              </div>

              {workflow.prerequisites.length > 0 && (
                <Paragraph
                  data-size="xs"
                  style={{
                    marginBottom: 'var(--ds-spacing-3)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  Prerequisites: {workflow.prerequisites.join(', ')}
                </Paragraph>
              )}

              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button
                  variant="primary"
                  data-size="sm"
                  onClick={() => copyCommand(workflow.command)}
                >
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
    </PageContainer>
  );
}
