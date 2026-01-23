/**
 * Workflow Catalog Page
 *
 * Uses platform-ui composed components for proper page structure.
 * Data loaded from WorkflowRegistry.
 */

import { useState } from 'react';
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
import { AgentWorkflowSession } from '../components/workflow/AgentWorkflowSession';
import { getAgentWorkflowSteps, isAgentWorkflow } from '../registry/agent-workflow-registry';
import { providerRegistry } from '../lib/ai';

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
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [showAgentSession, setShowAgentSession] = useState(false);

  const handleStartWorkflow = (id: string, command: string | undefined) => {
    // Check if this is an agent workflow
    if (isAgentWorkflow(id)) {
      // Check if API key is set
      if (!providerRegistry.isInitialized()) {
        // API key modal will be shown by Layout component
        return;
      }
      // Start agent workflow
      setSelectedWorkflowId(id);
      setShowAgentSession(true);
      return;
    }

    // Legacy CLI-based workflow
    if (command) {
      // Copy command logic preserved for CLI-based workflows
      navigator.clipboard.writeText(command);
    }

    // Start session
    startSession(id);
    navigate('/session');
  };

  const handleAgentSessionComplete = (session: any) => {
    console.log('Agent workflow completed:', session);
    setShowAgentSession(false);
    setSelectedWorkflowId(null);
    // Could navigate to revisions or show success message
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

      {/* Agent Workflow Session Modal */}
      {selectedWorkflowId && (
        <AgentWorkflowSession
          workflowId={selectedWorkflowId}
          workflowSteps={getAgentWorkflowSteps(selectedWorkflowId)}
          isOpen={showAgentSession}
          onClose={() => {
            setShowAgentSession(false);
            setSelectedWorkflowId(null);
          }}
          onComplete={handleAgentSessionComplete}
        />
      )}
    </PageContainer>
  );
}
