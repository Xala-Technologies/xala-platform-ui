import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ApprovalFlow, type ApprovalItem, type ChecklistItem, Stack } from '../../index';

/**
 * ApprovalFlow provides a workflow approval panel with approve/reject actions.
 *
 * ## Features
 * - Approval/reject actions
 * - Checklist support
 * - Item display
 * - Loading states
 *
 * ## When to Use
 * - Workflow approvals
 * - Review processes
 * - Approval workflows
 */
const meta: Meta<typeof ApprovalFlow> = {
  title: 'Blocks/ApprovalFlow',
  component: ApprovalFlow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ApprovalFlow provides a workflow approval panel with approve/reject actions.

## Features
- Approval/reject actions
- Checklist support
- Item display
- Loading states

## When to Use
- Workflow approvals
- Review processes
- Approval workflows
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ApprovalFlow>;

// Sample approval items
const useSampleItems = (): ApprovalItem[] => {
  const t = useT();
  return [
    {
      id: '1',
      title: t('storybook.approvalFlow.item1'),
      description: t('storybook.approvalFlow.item1Description'),
      type: 'component',
    },
    {
      id: '2',
      title: t('storybook.approvalFlow.item2'),
      description: t('storybook.approvalFlow.item2Description'),
      type: 'change',
    },
  ];
};

// Sample checklist items
const useSampleChecklist = (): ChecklistItem[] => {
  const t = useT();
  return [
    {
      id: '1',
      label: t('storybook.approvalFlow.checklist1'),
      checked: true,
      required: true,
    },
    {
      id: '2',
      label: t('storybook.approvalFlow.checklist2'),
      checked: false,
      required: true,
    },
    {
      id: '3',
      label: t('storybook.approvalFlow.checklist3'),
      checked: false,
      required: false,
    },
  ];
};

/**
 * Default approval flow
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [checklist, setChecklist] = useState(useSampleChecklist());
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ApprovalFlow
          items={items}
          checklistItems={checklist}
          onChecklistChange={(id, checked) => {
            setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked } : item)));
          }}
          onApprove={() => console.log('Approved')}
          onReject={(reason) => console.log('Rejected:', reason)}
          labels={{
            approve: t('storybook.approvalFlow.approve'),
            reject: t('storybook.approvalFlow.reject'),
            checklist: t('storybook.approvalFlow.checklist'),
            reasonPlaceholder: t('storybook.approvalFlow.reasonPlaceholder'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Approval flow without checklist
 */
export const WithoutChecklist: Story = {
  render: function Render() {
    const t = useT();
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ApprovalFlow
          items={items}
          onApprove={() => console.log('Approved')}
          onReject={(reason) => console.log('Rejected:', reason)}
          labels={{
            approve: t('storybook.approvalFlow.approve'),
            reject: t('storybook.approvalFlow.reject'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Approval flow with loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    const [checklist, setChecklist] = useState(useSampleChecklist());
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ApprovalFlow
          items={items}
          checklistItems={checklist}
          isLoading
          onChecklistChange={(id, checked) => {
            setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked } : item)));
          }}
          onApprove={() => console.log('Approved')}
          onReject={(reason) => console.log('Rejected:', reason)}
          labels={{
            approve: t('storybook.approvalFlow.approve'),
            reject: t('storybook.approvalFlow.reject'),
            checklist: t('storybook.approvalFlow.checklist'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Approval flow with many items
 */
export const ManyItems: Story = {
  render: function Render() {
    const t = useT();
    const [checklist, setChecklist] = useState(useSampleChecklist());
    const items: ApprovalItem[] = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      title: t('storybook.approvalFlow.itemNumber', { number: i + 1 }),
      type: i % 2 === 0 ? 'component' : 'change',
    }));
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ApprovalFlow
          items={items}
          checklistItems={checklist}
          onChecklistChange={(id, checked) => {
            setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked } : item)));
          }}
          onApprove={() => console.log('Approved')}
          onReject={(reason) => console.log('Rejected:', reason)}
          labels={{
            approve: t('storybook.approvalFlow.approve'),
            reject: t('storybook.approvalFlow.reject'),
            checklist: t('storybook.approvalFlow.checklist'),
          }}
        />
      </Stack>
    );
  },
};
