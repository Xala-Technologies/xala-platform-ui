import type { Meta, StoryObj } from '@storybook/react';
import { FAQTab } from '../../blocks/FAQTab';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof FAQTab> = {
  title: 'Blocks/FAQTab',
  component: FAQTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FAQTab

Frequently asked questions with expandable answers. Uses Accordion component for question/answer format.

### Features
- Expandable questions/answers
- Multiple FAQ items
- Empty state handling
- Design token compliant

### Usage
\`\`\`tsx
<FAQTab
  items={[
    {
      id: '1',
      question: 'How do I book?',
      answer: 'You can book by selecting time slots...',
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

// Basic FAQ
export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'Hvordan booker jeg en ressurs?',
        answer: 'Du kan booke en ressurs ved å velge tidspunkter i kalenderen og fylle ut skjemaet.',
      },
      {
        id: '2',
        question: 'Hva er avbestillingsregler?',
        answer: 'Avbestilling må skje senest 24 timer før booket tidspunkt for å unngå gebyr.',
      },
      {
        id: '3',
        question: 'Kan jeg endre en eksisterende booking?',
        answer: 'Ja, du kan endre eller avbestille bookinger gjennom "Mine bookinger" i profilen din.',
      },
    ],
  },
};

// Single FAQ item
export const SingleItem: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'Hvordan booker jeg en ressurs?',
        answer: 'Du kan booke en ressurs ved å velge tidspunkter i kalenderen og fylle ut skjemaet.',
      },
    ],
  },
};

// Many FAQ items
export const ManyItems: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'Hvordan booker jeg en ressurs?',
        answer: 'Du kan booke en ressurs ved å velge tidspunkter i kalenderen og fylle ut skjemaet.',
      },
      {
        id: '2',
        question: 'Hva er avbestillingsregler?',
        answer: 'Avbestilling må skje senest 24 timer før booket tidspunkt for å unngå gebyr.',
      },
      {
        id: '3',
        question: 'Kan jeg endre en eksisterende booking?',
        answer: 'Ja, du kan endre eller avbestille bookinger gjennom "Mine bookinger" i profilen din.',
      },
      {
        id: '4',
        question: 'Hva skjer hvis jeg ikke møter opp?',
        answer: 'Hvis du ikke møter opp uten å avbestille, kan det påløpe gebyrer.',
      },
      {
        id: '5',
        question: 'Kan jeg booke på vegne av andre?',
        answer: 'Ja, hvis du har nødvendige tillatelser kan du booke ressurser på vegne av andre brukere.',
      },
    ],
  },
};

// With React node answer
export const WithReactNodeAnswer: Story = {
  args: {
    items: [
      {
        id: '1',
        question: 'Hvordan booker jeg en ressurs?',
        answer: (
          <div>
            <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Du kan booke en ressurs på flere måter:
            </Paragraph>
            <ul style={{ paddingLeft: 'var(--ds-spacing-4)', margin: 0 }}>
              <li>
                <Paragraph data-size="sm">Velg tidspunkt i kalenderen</Paragraph>
              </li>
              <li>
                <Paragraph data-size="sm">Fyll ut booking-skjemaet</Paragraph>
              </li>
              <li>
                <Paragraph data-size="sm">Bekreft booking</Paragraph>
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: '2',
        question: 'Hva er avbestillingsregler?',
        answer: 'Avbestilling må skje senest 24 timer før booket tidspunkt.',
      },
    ],
  },
};

// Empty state
export const Empty: Story = {
  args: {
    items: [],
  },
};
