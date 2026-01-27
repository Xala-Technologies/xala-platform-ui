import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  ClarificationPanel,
  type ClarificationQuestion,
  type ClarificationAnswer,
  Stack,
} from '../../index';

/**
 * ClarificationPanel provides a Q&A panel for workflow clarifications.
 *
 * ## Features
 * - Multiple question types (text, textarea, select, multiselect, boolean)
 * - Required field validation
 * - Answer management
 * - Submit functionality
 *
 * ## When to Use
 * - Workflow clarifications
 * - Additional information requests
 * - Q&A forms
 */
const meta: Meta<typeof ClarificationPanel> = {
  title: 'Blocks/ClarificationPanel',
  component: ClarificationPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ClarificationPanel provides a Q&A panel for workflow clarifications.

## Features
- Multiple question types (text, textarea, select, multiselect, boolean)
- Required field validation
- Answer management
- Submit functionality

## When to Use
- Workflow clarifications
- Additional information requests
- Q&A forms
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClarificationPanel>;

// Sample questions
const useSampleQuestions = (): ClarificationQuestion[] => {
  const t = useT();
  return [
    {
      id: '1',
      question: t('storybook.clarificationPanel.question1'),
      type: 'text',
      required: true,
      placeholder: t('storybook.clarificationPanel.enterAnswer'),
    },
    {
      id: '2',
      question: t('storybook.clarificationPanel.question2'),
      type: 'textarea',
      required: true,
      placeholder: t('storybook.clarificationPanel.enterDetails'),
    },
    {
      id: '3',
      question: t('storybook.clarificationPanel.question3'),
      type: 'select',
      options: [
        t('storybook.clarificationPanel.option1'),
        t('storybook.clarificationPanel.option2'),
        t('storybook.clarificationPanel.option3'),
      ],
      required: false,
    },
  ];
};

/**
 * Default clarification panel
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [answers, setAnswers] = useState<ClarificationAnswer[]>([]);
    const questions = useSampleQuestions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <ClarificationPanel
          intro={t('storybook.clarificationPanel.intro')}
          questions={questions}
          answers={answers}
          onAnswerChange={(questionId, value) => {
            setAnswers(
              answers.filter((a) => a.questionId !== questionId).concat({ questionId, value })
            );
          }}
          onSubmit={() => console.log('Submitted:', answers)}
          submitLabel={t('storybook.clarificationPanel.submit')}
        />
      </Stack>
    );
  },
};

/**
 * Clarification panel with initial answers
 */
export const WithAnswers: Story = {
  render: function Render() {
    const t = useT();
    const [answers, setAnswers] = useState<ClarificationAnswer[]>([
      { questionId: '1', value: t('storybook.clarificationPanel.sampleAnswer') },
      { questionId: '2', value: t('storybook.clarificationPanel.sampleDetails') },
    ]);
    const questions = useSampleQuestions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <ClarificationPanel
          intro={t('storybook.clarificationPanel.intro')}
          questions={questions}
          answers={answers}
          onAnswerChange={(questionId, value) => {
            setAnswers(
              answers.filter((a) => a.questionId !== questionId).concat({ questionId, value })
            );
          }}
          onSubmit={() => console.log('Submitted:', answers)}
          submitLabel={t('storybook.clarificationPanel.submit')}
        />
      </Stack>
    );
  },
};

/**
 * Clarification panel with boolean question
 */
export const WithBoolean: Story = {
  render: function Render() {
    const t = useT();
    const [answers, setAnswers] = useState<ClarificationAnswer[]>([]);
    const questions: ClarificationQuestion[] = [
      {
        id: '1',
        question: t('storybook.clarificationPanel.booleanQuestion'),
        type: 'boolean',
        required: true,
      },
    ];
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <ClarificationPanel
          intro={t('storybook.clarificationPanel.intro')}
          questions={questions}
          answers={answers}
          onAnswerChange={(questionId, value) => {
            setAnswers(
              answers.filter((a) => a.questionId !== questionId).concat({ questionId, value })
            );
          }}
          onSubmit={() => console.log('Submitted:', answers)}
          submitLabel={t('storybook.clarificationPanel.submit')}
        />
      </Stack>
    );
  },
};

/**
 * Clarification panel with loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    const [answers, setAnswers] = useState<ClarificationAnswer[]>([]);
    const questions = useSampleQuestions();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <ClarificationPanel
          intro={t('storybook.clarificationPanel.intro')}
          questions={questions}
          answers={answers}
          onAnswerChange={(questionId, value) => {
            setAnswers(
              answers.filter((a) => a.questionId !== questionId).concat({ questionId, value })
            );
          }}
          onSubmit={() => console.log('Submitted:', answers)}
          isSubmitting
          submitLabel={t('storybook.clarificationPanel.submit')}
        />
      </Stack>
    );
  },
};
