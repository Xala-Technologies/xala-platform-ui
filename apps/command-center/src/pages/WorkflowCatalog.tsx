/**
 * Workflow Catalog Page
 *
 * Uses platform-ui composed components for proper page structure.
 * Data loaded from WorkflowRegistry.
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
import { workflowRegistry } from '../registry/workflow-registry';
import { useWorkflowSession } from '../context/WorkflowSessionContext';
import { useNavigate } from 'react-router-dom';

const WORKFLOW_STEPS = [
  { step: 1, name: 'Vision' },
  { step: 2, name: 'Roadmap' },
  { step: 3, name: 'Data Model' },
  { step: 4, name: 'Section Specs' },
  { step: 5, name: 'Export' },
];

export function WorkflowCatalog() {
  const navigate = useNavigate();
  const { startSession } = useWorkflowSession();
  const workflows = workflowRegistry.getAllWorkflows();

  const handleStartWorkflow = (id: string, command: string | undefined) => {
    if (command) {
      // Copy command logic preserved for CLI-based workflows
      navigator.clipboard.writeText(command);
    }

    // Start session
    startSession(id);
    navigate('/session');
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
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            name={workflow.name}
            description={workflow.description}
            command={workflow.command || ''}
            status={workflow.status}
            prerequisites={workflow.prerequisites}
            onCopyCommand={() => handleStartWorkflow(workflow.id, workflow.command)}
            onViewDocs={() => console.log('View docs', workflow.id)}
          />
        ))}
      </CardGrid>
    </PageContainer>
  );
}
