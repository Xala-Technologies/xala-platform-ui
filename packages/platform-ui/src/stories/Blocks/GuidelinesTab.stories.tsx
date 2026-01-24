import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
      content: 'Avbestilling ma skje senest 24 timer for...',
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
          'Avbestilling ma skje senest 24 timer for booket tidspunkt. Ved sen avbestilling kan det palope gebyrer.',
      },
      {
        id: 'damages',
        title: 'Skader',
        content:
          'Ved skader pa utstyr eller lokale ma dette rapporteres umiddelbart. Brukeren er ansvarlig for skader forarsaket av uaktsomhet.',
      },
      {
        id: 'usage',
        title: 'Bruksregler',
        content:
          'Ressursen skal brukes i henhold til formalet. Misbruk kan fore til suspensjon av bookingrettigheter.',
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
          'Avbestilling ma skje senest 24 timer for booket tidspunkt. Ved sen avbestilling kan det palope gebyrer.',
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
          'Avbestilling ma skje senest 24 timer for booket tidspunkt. Ved sen avbestilling kan det palope gebyrer.',
      },
      {
        id: 'damages',
        title: 'Skader',
        content:
          'Ved skader pa utstyr eller lokale ma dette rapporteres umiddelbart. Brukeren er ansvarlig for skader forarsaket av uaktsomhet.',
      },
      {
        id: 'usage',
        title: 'Bruksregler',
        content:
          'Ressursen skal brukes i henhold til formalet. Misbruk kan fore til suspensjon av bookingrettigheter.',
      },
      {
        id: 'access',
        title: 'Tilgang',
        content:
          'Kun autoriserte brukere har tilgang til ressursen. Tilgangskort eller nokkel ma hentes ved resepsjonen.',
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
                <Paragraph data-size="sm">24 timer for: Ingen gebyr</Paragraph>
              </li>
              <li>
                <Paragraph data-size="sm">12-24 timer for: 50% gebyr</Paragraph>
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
          'Ved skader pa utstyr eller lokale ma dette rapporteres umiddelbart. Brukeren er ansvarlig for skader forarsaket av uaktsomhet.',
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
