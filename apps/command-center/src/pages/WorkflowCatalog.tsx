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
  PageContainer,
  WorkflowPipeline,
  WorkflowCard,
  CardGrid,
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
          <WorkflowPipeline steps={WORKFLOW_STEPS} />
        </SectionCardContent>
      </SectionCard>

      <CardGrid>
        {WORKFLOWS.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            name={workflow.name}
            description={workflow.description}
            command={workflow.command}
            status={workflow.status}
            prerequisites={workflow.prerequisites}
            onCopyCommand={() => copyCommand(workflow.command)}
          />
        ))}
      </CardGrid>
    </PageContainer>
  );
}
