import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { AccountSelectionModal } from '../../blocks/account/AccountSelectionModal';
import type { BaseOrganization } from '../../blocks/account/AccountSelectionModal';

const meta: Meta<typeof AccountSelectionModal> = {
  title: 'Blocks/AccountSelectionModal',
  component: AccountSelectionModal,
  parameters: {
    layout: 'centered',
    docs: {
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

// Basic modal
export const Default: Story = {
  args: {
    open: true,
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <AccountSelectionModal
          {...args}
          open={isOpen}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
          onPersonalSelect={() => setIsOpen(false)}
          onOrganizationSelect={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// Loading organizations
export const Loading: Story = {
  args: {
    open: true,
    organizations: [],
    isLoadingOrganizations: true,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <AccountSelectionModal
          {...args}
          open={isOpen}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
          onPersonalSelect={() => setIsOpen(false)}
          onOrganizationSelect={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// No organizations
export const NoOrganizations: Story = {
  args: {
    open: true,
    organizations: [],
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <AccountSelectionModal
          {...args}
          open={isOpen}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
          onPersonalSelect={() => setIsOpen(false)}
          onOrganizationSelect={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// Many organizations
export const ManyOrganizations: Story = {
  args: {
    open: true,
    organizations: Array.from({ length: 10 }, (_, i) => ({
      id: `org-${i}`,
      name: `Organization ${i + 1}`,
      organizationNumber: `${100000000 + i}`,
    })),
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <AccountSelectionModal
          {...args}
          open={isOpen}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
          onPersonalSelect={() => setIsOpen(false)}
          onOrganizationSelect={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    open: true,
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
  render: function Render(args) {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <AccountSelectionModal
          {...args}
          open={isOpen}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
          onPersonalSelect={() => setIsOpen(false)}
          onOrganizationSelect={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// Closed state
export const Closed: Story = {
  args: {
    open: false,
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <AccountSelectionModal {...args} />
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>{t('storybook.demo.sampleText')}</p>
        </div>
      </div>
    );
  },
};
