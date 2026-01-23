/**
 * ClarificationPanel Component
 * 
 * Renders AI-generated clarification questions with interactive inputs.
 * Uses platform-ui primitives exclusively for DS compliance.
 */

import {
    Stack,
    Card,
    Paragraph,
    Field,
    Textarea,
    NativeSelect,
    Button,
    Alert,
    Checkbox,
    Label,
    Radio,
    Fieldset,
    HorizontalLayout,
} from '@xala-technologies/platform-ui';
import type {
    ClarificationQuestion,
    ClarificationAnswer,
} from '../../types/clarification';

// ============================================
// Props
// ============================================

export interface ClarificationPanelProps {
    /** Intro message from AI */
    intro?: string;
    /** Questions to display */
    questions: ClarificationQuestion[];
    /** Current answers */
    answers: ClarificationAnswer[];
    /** Answer change handler */
    onAnswerChange: (questionId: string, value: string | string[] | number) => void;
    /** Submit handler */
    onSubmit: () => void;
    /** Whether submission is in progress */
    isSubmitting?: boolean;
    /** Submit button label */
    submitLabel?: string;
}

// ============================================
// Component
// ============================================

export function ClarificationPanel({
    intro,
    questions,
    answers,
    onAnswerChange,
    onSubmit,
    isSubmitting = false,
    submitLabel = 'Continue',
}: ClarificationPanelProps) {
    // Check if all required questions are answered
    const allRequiredAnswered = questions
        .filter((q) => q.required !== false)
        .every((q) => {
            const answer = answers.find((a) => a.questionId === q.id);
            if (!answer) return false;
            if (Array.isArray(answer.value)) return answer.value.length > 0;
            return answer.value !== '' && answer.value !== undefined;
        });

    return (
        <Card data-color="neutral">
            <Stack>
                {/* Intro Message */}
                {intro && (
                    <Alert data-color="info">
                        <Paragraph data-size="sm">{intro}</Paragraph>
                    </Alert>
                )}

                {/* Questions */}
                {questions.map((question, index) => (
                    <QuestionRenderer
                        key={question.id}
                        question={question}
                        index={index}
                        value={answers.find((a) => a.questionId === question.id)?.value}
                        onChange={(value) => onAnswerChange(question.id, value)}
                    />
                ))}

                {/* Submit Button */}
                <HorizontalLayout justify="flex-end">
                    <Button
                        data-color="accent"
                        onClick={onSubmit}
                        disabled={!allRequiredAnswered || isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : submitLabel}
                    </Button>
                </HorizontalLayout>
            </Stack>
        </Card>
    );
}

// ============================================
// Question Renderer
// ============================================

interface QuestionRendererProps {
    question: ClarificationQuestion;
    index: number;
    value: string | string[] | number | undefined;
    onChange: (value: string | string[] | number) => void;
}

function QuestionRenderer({ question, index, value, onChange }: QuestionRendererProps) {
    const { type, id, options = [] } = question;
    const labelId = `question-${id}-label`;

    return (
        <Fieldset>
            <Fieldset.Legend>
                {index + 1}. {question.question}
                {question.required !== false && ' *'}
            </Fieldset.Legend>

            {question.description && (
                <Fieldset.Description>
                    {question.description}
                </Fieldset.Description>
            )}

            {/* Radio Group */}
            {type === 'radio' && (
                <Stack>
                    {options.map((opt) => {
                        const optLabelId = `${id}-${opt.id}-label`;
                        return (
                            <HorizontalLayout key={opt.id} align="flex-start" gap="var(--ds-spacing-3)">
                                <Radio
                                    name={id}
                                    value={opt.id}
                                    checked={value === opt.id}
                                    onChange={() => onChange(opt.id)}
                                    aria-labelledby={optLabelId}
                                />
                                <Label id={optLabelId} htmlFor={`${id}-${opt.id}`}>
                                    <Stack>
                                        {opt.label}
                                        {opt.description && (
                                            <Paragraph data-size="sm" data-color="subtle">
                                                {opt.description}
                                            </Paragraph>
                                        )}
                                    </Stack>
                                </Label>
                            </HorizontalLayout>
                        );
                    })}
                </Stack>
            )}

            {/* Checkbox Group */}
            {type === 'checkbox' && (
                <Stack>
                    {options.map((opt) => {
                        const selectedValues = Array.isArray(value) ? value : [];
                        const isChecked = selectedValues.includes(opt.id);
                        const optLabelId = `${id}-${opt.id}-label`;

                        return (
                            <HorizontalLayout key={opt.id} align="flex-start" gap="var(--ds-spacing-3)">
                                <Checkbox
                                    id={`${id}-${opt.id}`}
                                    checked={isChecked}
                                    onChange={() => {
                                        const newValues = isChecked
                                            ? selectedValues.filter((v) => v !== opt.id)
                                            : [...selectedValues, opt.id];
                                        onChange(newValues);
                                    }}
                                    value={opt.id}
                                    aria-labelledby={optLabelId}
                                />
                                <Label id={optLabelId} htmlFor={`${id}-${opt.id}`}>
                                    <Stack>
                                        {opt.label}
                                        {opt.description && (
                                            <Paragraph data-size="sm" data-color="subtle">
                                                {opt.description}
                                            </Paragraph>
                                        )}
                                    </Stack>
                                </Label>
                            </HorizontalLayout>
                        );
                    })}
                </Stack>
            )}

            {/* Select Dropdown */}
            {type === 'select' && (
                <Field>
                    <Label id={labelId}>Select an option</Label>
                    <NativeSelect
                        aria-labelledby={labelId}
                        value={value as string || ''}
                        onChange={(e) => onChange(e.target.value)}
                    >
                        <option value="">Select an option...</option>
                        {options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.label}
                            </option>
                        ))}
                    </NativeSelect>
                </Field>
            )}

            {/* Text Input */}
            {type === 'text' && (
                <Field>
                    <Textarea
                        aria-labelledby={labelId}
                        value={value as string || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Enter your response..."
                        rows={3}
                    />
                </Field>
            )}

            {/* Number/Scale - using Radio for DS compliance */}
            {(type === 'number' || type === 'scale') && (
                <HorizontalLayout gap="var(--ds-spacing-2)">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <HorizontalLayout key={num} align="center" gap="var(--ds-spacing-1)">
                            <Radio
                                name={`${id}-scale`}
                                value={String(num)}
                                checked={value === num}
                                onChange={() => onChange(num)}
                                aria-label={`${num}`}
                            />
                            <Label htmlFor={`${id}-scale-${num}`}>{num}</Label>
                        </HorizontalLayout>
                    ))}
                </HorizontalLayout>
            )}
        </Fieldset>
    );
}
