/**
 * ClarificationPanel Block
 *
 * Q&A panel for workflow clarifications.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Textfield,
  Textarea,
  Select,
  Checkbox,
} from '../primitives';
import { Stack } from '../primitives';
import { QuestionmarkCircleIcon } from '@navikt/aksel-icons';
import { cn } from '../utils';

export interface ClarificationQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'boolean';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface ClarificationAnswer {
  questionId: string;
  value: string | boolean | string[];
}

export interface ClarificationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Intro text */
  intro?: string;
  /** Questions to answer */
  questions?: ClarificationQuestion[];
  /** Current answers */
  answers?: ClarificationAnswer[];
  /** Generic clarifications (for compatibility) */
  clarifications?: unknown[];
  /** Answer change callback */
  onAnswerChange?: (questionId: string, value: string | boolean | string[]) => void;
  /** Submit callback */
  onSubmit?: () => void;
  /** Loading state */
  isSubmitting?: boolean;
  /** Submit button label */
  submitLabel?: string;
}

export const ClarificationPanel = forwardRef<HTMLDivElement, ClarificationPanelProps>(
  (
    {
      intro,
      questions = [],
      answers = [],
      onAnswerChange,
      onSubmit,
      isSubmitting = false,
      submitLabel = 'Continue',
      className,
      ...props
    },
    ref
  ) => {
    const getAnswer = useCallback(
      (questionId: string) => {
        return answers.find((a) => a.questionId === questionId)?.value ?? '';
      },
      [answers]
    );

    const allRequiredAnswered = questions.every((q) => {
      if (!q.required) return true;
      const answer = getAnswer(q.id);
      if (Array.isArray(answer)) return answer.length > 0;
      if (typeof answer === 'boolean') return true;
      return answer !== '';
    });

    // Filter out data-size to avoid type conflict with Card
    const { 'data-size': _dataSize, ...cardProps } = props as Record<string, unknown>;

    return (
      <Card
        ref={ref}
        className={cn('ds-clarification-panel', className)}
        data-color="neutral"
        {...cardProps}
      >
        <Card.Block>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <QuestionmarkCircleIcon />
            <Heading level={3} data-size="sm">
              Clarifications Needed
            </Heading>
          </div>
          {intro && (
            <Paragraph data-size="md" style={{ marginTop: 'var(--ds-spacing-2)' }}>
              {intro}
            </Paragraph>
          )}
        </Card.Block>

        {questions.length === 0 ? (
          <Card.Block>
            <Paragraph data-size="sm" style={{ opacity: 0.5, textAlign: 'center' }}>
              No questions to answer
            </Paragraph>
          </Card.Block>
        ) : (
          <Card.Block>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
              {questions.map((q) => {
                const value = getAnswer(q.id);

                return (
                  <div key={q.id}>
                    <Paragraph
                      data-size="sm"
                      style={{ fontWeight: 500, marginBottom: 'var(--ds-spacing-1)' }}
                    >
                      {q.question}
                      {q.required && (
                        <span style={{ color: 'var(--ds-color-danger-base-default)' }}> *</span>
                      )}
                    </Paragraph>

                    {q.type === 'text' && (
                      <Textfield
                        label={q.question}
                        value={String(value)}
                        onChange={(e) => onAnswerChange?.(q.id, e.target.value)}
                        placeholder={q.placeholder}
                      />
                    )}

                    {q.type === 'textarea' && (
                      <Textarea
                        value={String(value)}
                        onChange={(e) => onAnswerChange?.(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        rows={3}
                      />
                    )}

                    {q.type === 'select' && q.options && (
                      <Select
                        value={String(value)}
                        onChange={(e) => onAnswerChange?.(q.id, e.target.value)}
                      >
                        <Select.Option value="">Select...</Select.Option>
                        {q.options.map((opt) => (
                          <Select.Option key={opt} value={opt}>
                            {opt}
                          </Select.Option>
                        ))}
                      </Select>
                    )}

                    {q.type === 'boolean' && (
                      <Checkbox
                        label="Yes"
                        checked={Boolean(value)}
                        onChange={(e) => onAnswerChange?.(q.id, e.target.checked)}
                      />
                    )}

                    {q.type === 'multiselect' && q.options && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--ds-spacing-1)',
                        }}
                      >
                        {q.options.map((opt) => {
                          const selected = Array.isArray(value) ? value.includes(opt) : false;
                          return (
                            <Checkbox
                              key={opt}
                              label={opt}
                              checked={selected}
                              onChange={(e) => {
                                const current = Array.isArray(value) ? value : [];
                                const next = e.target.checked
                                  ? [...current, opt]
                                  : current.filter((v) => v !== opt);
                                onAnswerChange?.(q.id, next);
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card.Block>
        )}

        <Card.Block>
          <Stack direction="horizontal" justify="end">
            <Button onClick={onSubmit} disabled={isSubmitting || !allRequiredAnswered}>
              {isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          </Stack>
        </Card.Block>
      </Card>
    );
  }
);

ClarificationPanel.displayName = 'ClarificationPanel';

export default ClarificationPanel;
