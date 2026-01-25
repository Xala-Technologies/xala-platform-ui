import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContactPersonsEditor } from '../../composed/ContactPersonsEditor';
import type { ContactPerson } from '../../composed/ContactPersonsEditor';

const meta: Meta<typeof ContactPersonsEditor> = {
  title: 'Composed/ContactPersonsEditor',
  component: ContactPersonsEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ContactPersonsEditor

Add/edit/remove contact persons for a resource.
Each contact has name, role, phone, and email.

### Features
- Add/remove contact persons
- Primary contact designation
- Max contacts limit
- Full form validation

### Accessibility
- Fieldset with legend for grouping
- Labeled inputs via Textfield
- Keyboard navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper
function ControlledEditor({
  initialContacts,
  maxContacts,
  disabled = false,
}: {
  initialContacts: ContactPerson[];
  maxContacts?: number;
  disabled?: boolean;
}) {
  const [contacts, setContacts] = useState(initialContacts);

  return (
    <div style={{ width: 500 }}>
      <ContactPersonsEditor
        contacts={contacts}
        onChange={setContacts}
        maxContacts={maxContacts}
        disabled={disabled}
      />
    </div>
  );
}

// Empty
export const Empty: Story = {
  render: () => <ControlledEditor initialContacts={[]} />,
};

// Single contact
export const SingleContact: Story = {
  render: () => (
    <ControlledEditor
      initialContacts={[
        {
          id: '1',
          name: 'Ola Nordmann',
          role: 'Daglig leder',
          phone: '+47 123 45 678',
          email: 'ola@example.no',
          isPrimary: true,
        },
      ]}
    />
  ),
};

// Multiple contacts
export const MultipleContacts: Story = {
  render: () => (
    <ControlledEditor
      initialContacts={[
        {
          id: '1',
          name: 'Ola Nordmann',
          role: 'Daglig leder',
          phone: '+47 123 45 678',
          email: 'ola@example.no',
          isPrimary: true,
        },
        {
          id: '2',
          name: 'Kari Hansen',
          role: 'Vaktmester',
          phone: '+47 987 65 432',
          email: 'kari@example.no',
        },
        {
          id: '3',
          name: 'Per Olsen',
          role: 'Teknisk ansvarlig',
          phone: '+47 456 78 901',
          email: 'per@example.no',
        },
      ]}
    />
  ),
};

// Max 2 contacts
export const MaxTwoContacts: Story = {
  render: () => (
    <ControlledEditor
      initialContacts={[
        {
          id: '1',
          name: 'Ola Nordmann',
          role: 'Ansvarlig',
          isPrimary: true,
        },
      ]}
      maxContacts={2}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Limited to max 2 contacts.',
      },
    },
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <ControlledEditor
      initialContacts={[
        {
          id: '1',
          name: 'Ola Nordmann',
          role: 'Daglig leder',
          phone: '+47 123 45 678',
          email: 'ola@example.no',
          isPrimary: true,
        },
      ]}
      disabled
    />
  ),
};

// English labels
export const EnglishLabels: Story = {
  render: () => {
    function EnglishEditor() {
      const [contacts, setContacts] = useState<ContactPerson[]>([
        {
          id: '1',
          name: 'John Doe',
          role: 'Manager',
          phone: '+1 555 123 4567',
          email: 'john@example.com',
          isPrimary: true,
        },
      ]);

      return (
        <div style={{ width: 500 }}>
          <ContactPersonsEditor
            contacts={contacts}
            onChange={setContacts}
            labels={{
              legend: 'Contact Persons',
              helperText: 'Add contact persons for this resource',
              name: 'Name',
              role: 'Role',
              phone: 'Phone',
              email: 'Email',
              addContact: '+ Add Contact',
              remove: 'Remove',
              setPrimary: 'Set as Primary',
              namePlaceholder: 'Full name',
              rolePlaceholder: 'e.g. Manager, Technician',
              phonePlaceholder: '+1 555 123 4567',
              emailPlaceholder: 'name@example.com',
              emptyMessage: 'No contact persons added',
              primaryBadge: 'Primary Contact',
            }}
          />
        </div>
      );
    }

    return <EnglishEditor />;
  },
};
