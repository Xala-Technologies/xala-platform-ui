/**
 * ApprovalChecklist Stories
 *
 * Storybook stories for the ApprovalChecklist component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalChecklist } from '../components/approval/ApprovalChecklist';
import type { ApprovalChecklistItem } from '../registry/types';
import { fn } from '@storybook/test';

const meta: Meta<typeof ApprovalChecklist> = {
  title: 'CommandCenter/Approval/ApprovalChecklist',
  component: ApprovalChecklist,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ApprovalChecklist>;

const sampleItems: ApprovalChecklistItem[] = [
  {
    id: 'artifacts-validated',
    label: 'All artifacts validated successfully',
    checked: true,
    required: true,
    checkedBy: 'Admin User',
    checkedAt: new Date().toISOString(),
  },
  {
    id: 'component-follows-design-system',
    label: 'Component follows design system guidelines',
    checked: true,
    required: true,
    checkedBy: 'Admin User',
    checkedAt: new Date().toISOString(),
  },
  {
    id: 'storybook-story-exists',
    label: 'Storybook story exists (or will be generated)',
    checked: false,
    required: true,
  },
  {
    id: 'documentation-exists',
    label: 'Documentation exists',
    checked: true,
    required: true,
  },
  {
    id: 'testids-added',
    label: 'Test IDs added',
    checked: false,
    required: true,
  },
  {
    id: 'accessibility-tested',
    label: 'Accessibility tested',
    checked: false,
    required: true,
  },
  {
    id: 'code-reviewed',
    label: 'Code reviewed (if applicable)',
    checked: false,
    required: false,
  },
];

const allCheckedItems: ApprovalChecklistItem[] = sampleItems.map(item => ({
  ...item,
  checked: true,
  checkedBy: 'Admin User',
  checkedAt: new Date().toISOString(),
}));

export const Default: Story = {
  args: {
    items: sampleItems,
    onItemChange: fn(),
  },
};

export const AllChecked: Story = {
  args: {
    items: allCheckedItems,
    onItemChange: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    items: sampleItems,
    readOnly: true,
  },
};
