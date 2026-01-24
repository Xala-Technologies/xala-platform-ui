import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { AccountSelector } from '../../blocks/account/AccountSelector';
import type { BaseOrganization } from '../../blocks/account/AccountSelector';

const meta: Meta<typeof AccountSelector> = {
  title: 'Blocks/AccountSelector',
  component: AccountSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AccountSelector

Two-step account selection component for choosing between personal and organization accounts. Domain-agnostic - receives organization data via generic props.

### Features
- Choose between personal and organization accounts
- Organization list with loading state
- Remember choice checkbox
- Customizable labels

### Usage
\`\`\`tsx
<AccountSelector
  organizations={organizations}
  isLoadingOrganizations={false}
  onPersonalSelect={handlePersonal}
  onOrganizationSelect={handleOrg}
  showRememberChoice={true}
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

// Basic selector
export const Default: Story = {
  args: {
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    showRememberChoice: true,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '500px' }}>
        <AccountSelector
          {...args}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
        />
      </div>
    );
  },
};

// Loading organizations
export const Loading: Story = {
  args: {
    organizations: [],
    isLoadingOrganizations: true,
    showRememberChoice: true,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '500px' }}>
        <AccountSelector
          {...args}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
        />
      </div>
    );
  },
};

// No organizations
export const NoOrganizations: Story = {
  args: {
    organizations: [],
    isLoadingOrganizations: false,
    showRememberChoice: true,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '500px' }}>
        <AccountSelector
          {...args}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
        />
      </div>
    );
  },
};

// Without remember choice
export const WithoutRememberChoice: Story = {
  args: {
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    showRememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <AccountSelector {...args} />
      </div>
    );
  },
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
    showRememberChoice: true,
    rememberChoice: false,
  },
  render: function Render(args) {
    const t = useT();
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '500px' }}>
        <AccountSelector
          {...args}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
        />
      </div>
    );
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    organizations: sampleOrganizations,
    isLoadingOrganizations: false,
    showRememberChoice: true,
    rememberChoice: false,
    labels: {
      personalTitle: 'Personal Account',
      personalDescription: 'Use the service as an individual',
      organizationTitle: 'Organization Account',
      organizationDescription: 'Use the service on behalf of your organization',
      rememberChoice: 'Remember my choice',
    },
  },
  render: function Render(args) {
    const t = useT();
    const [rememberChoice, setRememberChoice] = useState(false);
    return (
      <div style={{ width: '500px' }}>
        <AccountSelector
          {...args}
          rememberChoice={rememberChoice}
          onRememberChoiceChange={setRememberChoice}
        />
      </div>
    );
  },
};
