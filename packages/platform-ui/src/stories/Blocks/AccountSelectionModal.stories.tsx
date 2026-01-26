import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { Button } from '@digdir/designsystemet-react';
import { AccountSelectionModal } from '../../blocks/account/AccountSelectionModal';
import type { BaseOrganization } from '../../blocks/account/AccountSelectionModal';

const meta: Meta<typeof AccountSelectionModal> = {
  title: 'Blocks/AccountSelectionModal',
  component: AccountSelectionModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false,
      iframeHeight: 600,
      source: {
        type: 'code',
        state: 'closed',
      },
      description: {
        component: `
## AccountSelectionModal

Post-login modal for selecting account type (personal or organization). Domain-agnostic - receives organization data via generic props.

### Features
- Two-step selection (account type, then organization)
- Loading states
- Remember choice checkbox
- Customizable labels

### Usage
\`\`\`tsx
<AccountSelectionModal
  open={true}
  organizations={organizations}
  isLoadingOrganizations={false}
  onPersonalSelect={handlePersonal}
  onOrganizationSelect={handleOrg}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onPersonalSelect: fn(),
    onOrganizationSelect: fn(),
    onRememberChoiceChange: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample organizations
const sampleOrganizations: BaseOrganization[] = [
  { id: '1', name: 'Acme Corp', organizationNumber: '123456789' },
  { id: '2', name: 'Tech Solutions AS', organizationNumber: '987654321' },
  { id: '3', name: 'Design Studio', organizationNumber: '456789123' },
];

// Helper component with trigger button
function ModalWithTrigger(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Account Selection</Button>
      <AccountSelectionModal
        {...args}
        open={isOpen}
        rememberChoice={rememberChoice}
        onRememberChoiceChange={setRememberChoice}
        onPersonalSelect={() => setIsOpen(false)}
        onOrganizationSelect={() => setIsOpen(false)}
      />
    </>
  );
}

// Basic modal
export const Default: Story = {
  args: {
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Loading organizations
export const Loading: Story = {
  args: {
    organizations: [],
    isLoadingOrganizations: true,
    rememberChoice: false,
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// No organizations
export const NoOrganizations: Story = {
  args: {
    organizations: [],
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Many organizations
export const ManyOrganizations: Story = {
  args: {
    organizations: Array.from({ length: 10 }, (_, i) => ({
      id: `org-${i}`,
      name: `Organization ${i + 1}`,
      organizationNumber: `${100000000 + i}`,
    })),
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    rememberChoice: false,
    labels: {
      title: 'Select Account Type',
      subtitle: 'How would you like to use the service?',
      personalAccount: 'Personal Account',
      organizationAccount: 'Organization Account',
      rememberChoice: 'Remember my choice',
    },
  },
  render: (args) => <ModalWithTrigger {...args} />,
};
