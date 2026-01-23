/**
 * ApprovalGate Stories
 *
 * Storybook stories for the ApprovalGate component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalGate } from '../components/approval/ApprovalGate';
import type { ApprovalGate as ApprovalGateType } from '../registry/types';

const meta: Meta<typeof ApprovalGate> = {
  title: 'CommandCenter/Approval/ApprovalGate',
  component: ApprovalGate,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ApprovalGate>;

const passGate: ApprovalGateType = {
  id: 'schema-validation',
  name: 'Schema Validation',
  description: 'All artifacts must pass schema validation',
  status: 'pass',
  required: true,
  details: 'All artifacts validated successfully',
};

const failGate: ApprovalGateType = {
  id: 'schema-validation',
  name: 'Schema Validation',
  description: 'All artifacts must pass schema validation',
  status: 'fail',
  required: true,
  details: '2 artifact(s) failed validation',
};

const pendingGate: ApprovalGateType = {
  id: 'schema-validation',
  name: 'Schema Validation',
  description: 'All artifacts must pass schema validation',
  status: 'pending',
  required: true,
};

const optionalGate: ApprovalGateType = {
  id: 'code-reviewed',
  name: 'Code Reviewed',
  description: 'Code has been reviewed (optional)',
  status: 'pass',
  required: false,
  details: 'Code reviewed by team lead',
};

export const Pass: Story = {
  args: {
    gate: passGate,
  },
};

export const Fail: Story = {
  args: {
    gate: failGate,
  },
};

export const Pending: Story = {
  args: {
    gate: pendingGate,
  },
};

export const Optional: Story = {
  args: {
    gate: optionalGate,
  },
};
