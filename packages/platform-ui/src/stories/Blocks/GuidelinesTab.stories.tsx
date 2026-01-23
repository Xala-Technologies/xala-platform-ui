import type { Meta, StoryObj } from '@storybook/react';
import { GuidelinesTab } from '../../blocks/GuidelinesTab';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof GuidelinesTab> = {
  title: 'Blocks/GuidelinesTab',
  component: GuidelinesTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## GuidelinesTab

Accordion-style expandable rules and policies. Each section expands to show detailed policy text.

### Features
- Expandable guideline sections
- Multiple sections
- Empty state handling
- Design token compliant

### Usage
\`\`\`tsx
<GuidelinesTab
  sections={[
    {
      id: 'cancellation',
      title: 'Avbestilling',
      content: 'Avbestilling må skje senest 24 timer før...',
    },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic guidelines
export const Default: Story = {
  args: {
    sections: [
      {
        id: 'cancellation',
        title: 'Avbestilling',
        content:
          'Avbestilling må skje senest 24 timer før booket tidspunkt. Ved sen avbestilling kan det påløpe gebyrer.',
      },
      {
        id: 'damages',
        title: 'Skader',
        content:
          'Ved skader på utstyr eller lokale må dette rapporteres umiddelbart. Brukeren er ansvarlig for skader forårsaket av uaktsomhet.',
      },
      {
        id: 'usage',
        title: 'Bruksregler',
        content:
          'Ressursen skal brukes i henhold til formålet. Misbruk kan føre til suspensjon av bookingrettigheter.',
      },
    ],
  },
};

// Single section
export const SingleSection: Story = {
  args: {
    sections: [
      {
        id: 'cancellation',
        title: 'Avbestilling',
        content:
          'Avbestilling må skje senest 24 timer før booket tidspunkt. Ved sen avbestilling kan det påløpe gebyrer.',
      },
    ],
  },
};

// Many sections
export const ManySections: Story = {
  args: {
    sections: [
      {
        id: 'cancellation',
        title: 'Avbestilling',
        content:
          'Avbestilling må skje senest 24 timer før booket tidspunkt. Ved sen avbestilling kan det påløpe gebyrer.',
      },
      {
        id: 'damages',
        title: 'Skader',
        content:
          'Ved skader på utstyr eller lokale må dette rapporteres umiddelbart. Brukeren er ansvarlig for skader forårsaket av uaktsomhet.',
      },
      {
        id: 'usage',
        title: 'Bruksregler',
        content:
          'Ressursen skal brukes i henhold til formålet. Misbruk kan føre til suspensjon av bookingrettigheter.',
      },
      {
        id: 'access',
        title: 'Tilgang',
        content:
          'Kun autoriserte brukere har tilgang til ressursen. Tilgangskort eller nøkkel må hentes ved resepsjonen.',
      },
      {
        id: 'cleanup',
        title: 'Opprydding',
        content:
          'Ressursen skal etterlates i samme tilstand som ved ankomst. Opprydding er brukerens ansvar.',
      },
    ],
  },
};

// With React node content
export const WithReactNodeContent: Story = {
  args: {
    sections: [
      {
        id: 'cancellation',
        title: 'Avbestilling',
        content: (
          <div>
            <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Avbestillingsregler:
            </Paragraph>
            <ul style={{ paddingLeft: 'var(--ds-spacing-4)', margin: 0 }}>
              <li>
                <Paragraph data-size="sm">24 timer før: Ingen gebyr</Paragraph>
              </li>
              <li>
                <Paragraph data-size="sm">12-24 timer før: 50% gebyr</Paragraph>
              </li>
              <li>
                <Paragraph data-size="sm">Mindre enn 12 timer: Fullt gebyr</Paragraph>
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: 'damages',
        title: 'Skader',
        content:
          'Ved skader på utstyr eller lokale må dette rapporteres umiddelbart. Brukeren er ansvarlig for skader forårsaket av uaktsomhet.',
      },
    ],
  },
};

// Empty state
export const Empty: Story = {
  args: {
    sections: [],
  },
};
