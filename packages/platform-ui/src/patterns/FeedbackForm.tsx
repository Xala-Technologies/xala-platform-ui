/* eslint-disable no-restricted-syntax */
/**
 * FeedbackForm
 *
 * A domain-neutral form component for collecting user feedback and reviews.
 * Includes star rating input, text fields, and optional file upload.
 *
 * NOTE: Uses raw <button> elements for interactive star rating input.
 *
 * @example
 * ```tsx
 * <FeedbackForm
 *   onSubmit={handleSubmit}
 *   labels={{
 *     title: 'Share your experience',
 *     ratingLabel: 'Your rating',
 *     titlePlaceholder: 'Give your review a title',
 *     contentPlaceholder: 'Tell us about your experience...',
 *     submit: 'Submit review',
 *   }}
 *   maxRating={5}
 *   showTitle={true}
 *   minContentLength={20}
 * />
 * ```
 */
import * as React from 'react';
import { useState } from 'react';
import {
  Heading,
  Paragraph,
  Button,
  Textfield,
  Textarea,
  Checkbox,
  Field,
  Label,
} from '@digdir/designsystemet-react';

// ============================================================================
// Types
// ============================================================================

/** Form submission data */
export interface FeedbackFormData {
  /** Star rating */
  rating: number;
  /** Review title (optional) */
  title?: string;
  /** Review content */
  content: string;
  /** Anonymous submission */
  anonymous?: boolean;
}

/** Validation errors */
export interface FeedbackFormErrors {
  rating?: string;
  title?: string;
  content?: string;
}

/** Localized labels */
export interface FeedbackFormLabels {
  /** Form title */
  title?: string;
  /** Form subtitle/description */
  subtitle?: string;
  /** Rating input label */
  ratingLabel?: string;
  /** Rating descriptions per star (optional) */
  ratingDescriptions?: { [key: number]: string };
  /** Title field label */
  titleLabel?: string;
  /** Title field placeholder */
  titlePlaceholder?: string;
  /** Content field label */
  contentLabel?: string;
  /** Content field placeholder */
  contentPlaceholder?: string;
  /** Character count template "{count} / {max}" */
  characterCount?: string;
  /** Minimum characters warning */
  minCharacters?: string;
  /** Anonymous checkbox label */
  anonymousLabel?: string;
  /** Anonymous checkbox description */
  anonymousDescription?: string;
  /** Submit button label */
  submit?: string;
  /** Cancel button label */
  cancel?: string;
  /** Required field indicator */
  required?: string;
  /** Validation error messages */
  errors?: {
    ratingRequired?: string;
    contentRequired?: string;
    contentTooShort?: string;
  };
}

/** FeedbackForm props interface */
export interface FeedbackFormProps {
  /** Initial form values */
  initialValues?: Partial<FeedbackFormData>;

  /** Callback when form is submitted */
  onSubmit: (data: FeedbackFormData) => void | Promise<void>;

  /** Callback when form is cancelled */
  onCancel?: () => void;

  /** Maximum rating (default: 5) */
  maxRating?: number;

  /** Show title field */
  showTitle?: boolean;

  /** Show anonymous checkbox */
  showAnonymous?: boolean;

  /** Minimum content length */
  minContentLength?: number;

  /** Maximum content length */
  maxContentLength?: number;

  /** Loading state */
  loading?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** External validation errors */
  errors?: FeedbackFormErrors;

  /** Localized labels */
  labels?: FeedbackFormLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const StarIcon = ({ filled = false, size = 24 }: { filled?: boolean; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

/** Concatenate class names, filtering out falsy values */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================================
// Sub-components
// ============================================================================

/** Interactive star rating input */
interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  maxRating: number;
  disabled?: boolean;
  size?: number;
  descriptions?: { [key: number]: string };
}

function StarRatingInput({
  value,
  onChange,
  maxRating,
  disabled,
  size = 32,
  descriptions,
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || value;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-spacing-1)',
        }}
        role="radiogroup"
        aria-label="Rating"
      >
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={starValue === value}
              aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
              disabled={disabled}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => !disabled && setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                padding: 'var(--ds-spacing-1)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                color: isFilled
                  ? 'var(--ds-color-warning-base-default)'
                  : 'var(--ds-color-neutral-border-default)',
                transition: 'all 0.15s ease',
                transform: hoverRating === starValue ? 'scale(1.15)' : 'scale(1)',
                opacity: disabled ? 0.5 : 1,
              }}
            >
              <StarIcon filled={isFilled} size={size} />
            </button>
          );
        })}
      </div>
      {descriptions && displayRating > 0 && descriptions[displayRating] && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-neutral-text-subtle)',
            fontStyle: 'italic',
          }}
        >
          {descriptions[displayRating]}
        </Paragraph>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function FeedbackForm({
  initialValues,
  onSubmit,
  onCancel,
  maxRating = 5,
  showTitle = true,
  showAnonymous = false,
  minContentLength = 0,
  maxContentLength = 2000,
  loading = false,
  disabled = false,
  errors: externalErrors,
  labels = {},
  className,
  'data-testid': testId = 'feedback-form',
}: FeedbackFormProps): React.ReactElement {
  // Form state
  const [rating, setRating] = useState(initialValues?.rating || 0);
  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [anonymous, setAnonymous] = useState(initialValues?.anonymous || false);
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Default labels
  const defaultLabels: Required<FeedbackFormLabels> = {
    title: 'Share your feedback',
    subtitle: 'Your feedback helps others make informed decisions',
    ratingLabel: 'Your rating',
    ratingDescriptions: {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very good',
      5: 'Excellent',
    },
    titleLabel: 'Title',
    titlePlaceholder: 'Summarize your experience',
    contentLabel: 'Your review',
    contentPlaceholder: 'Share the details of your experience...',
    characterCount: '{count} / {max} characters',
    minCharacters: 'Minimum {min} characters',
    anonymousLabel: 'Post anonymously',
    anonymousDescription: 'Your name will not be displayed with this review',
    submit: 'Submit',
    cancel: 'Cancel',
    required: '*',
    errors: {
      ratingRequired: 'Please select a rating',
      contentRequired: 'Please enter your review',
      contentTooShort: 'Review must be at least {min} characters',
    },
  };

  const mergedLabels: Required<FeedbackFormLabels> = {
    ...defaultLabels,
    ...labels,
    ratingDescriptions: { ...defaultLabels.ratingDescriptions, ...labels.ratingDescriptions },
    errors: { ...defaultLabels.errors, ...labels.errors },
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: FeedbackFormErrors = {};

    if (rating === 0) {
      newErrors.rating = mergedLabels.errors.ratingRequired;
    }

    if (!content.trim()) {
      newErrors.content = mergedLabels.errors.contentRequired;
    } else if (minContentLength > 0 && content.trim().length < minContentLength) {
      newErrors.content = mergedLabels.errors.contentTooShort?.replace(
        '{min}',
        String(minContentLength)
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ rating: true, title: true, content: true });

    if (!validate()) {
      return;
    }

    const data: FeedbackFormData = {
      rating,
      content: content.trim(),
      ...(showTitle && title.trim() ? { title: title.trim() } : {}),
      ...(showAnonymous ? { anonymous } : {}),
    };

    await onSubmit(data);
  };

  // Combine internal and external errors
  const displayErrors = { ...errors, ...externalErrors };

  const isDisabled = disabled || loading;

  return (
    <form
      className={cn('feedback-form', className)}
      data-testid={testId}
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)',
      }}
    >
      {/* Header */}
      <div>
        <Heading level={2} data-size="md" style={{ margin: 0 }}>
          {mergedLabels.title}
        </Heading>
        {mergedLabels.subtitle && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {mergedLabels.subtitle}
          </Paragraph>
        )}
      </div>

      {/* Rating */}
      <div>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-2)',
            fontWeight: 500,
          }}
        >
          {mergedLabels.ratingLabel}
          <span style={{ color: 'var(--ds-color-danger-text-default)', marginLeft: '2px' }}>
            {mergedLabels.required}
          </span>
        </Paragraph>
        <StarRatingInput
          value={rating}
          onChange={(r) => {
            setRating(r);
            setTouched((t) => ({ ...t, rating: true }));
          }}
          maxRating={maxRating}
          disabled={isDisabled}
          descriptions={mergedLabels.ratingDescriptions}
        />
        {touched.rating && displayErrors.rating && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              color: 'var(--ds-color-danger-text-default)',
            }}
          >
            {displayErrors.rating}
          </Paragraph>
        )}
      </div>

      {/* Title field */}
      {showTitle && (
        <Textfield
          label={mergedLabels.titleLabel}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          placeholder={mergedLabels.titlePlaceholder}
          disabled={isDisabled}
          error={touched.title ? displayErrors.title : undefined}
        />
      )}

      {/* Content field */}
      <div>
        <Field>
          <Label>
            {mergedLabels.contentLabel}
            <span style={{ color: 'var(--ds-color-danger-text-default)', marginLeft: '2px' }}>
              {mergedLabels.required}
            </span>
          </Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, content: true }))}
            placeholder={mergedLabels.contentPlaceholder}
            disabled={isDisabled}
            rows={4}
            aria-invalid={touched.content && displayErrors.content ? true : undefined}
          />
          {touched.content && displayErrors.content && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-danger-text-default)',
              }}
            >
              {displayErrors.content}
            </Paragraph>
          )}
        </Field>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'var(--ds-spacing-1)',
          }}
        >
          {minContentLength > 0 && content.length < minContentLength && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {mergedLabels.minCharacters.replace('{min}', String(minContentLength))}
            </Paragraph>
          )}
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              marginLeft: 'auto',
              color:
                content.length > maxContentLength
                  ? 'var(--ds-color-danger-text-default)'
                  : 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {mergedLabels.characterCount
              .replace('{count}', String(content.length))
              .replace('{max}', String(maxContentLength))}
          </Paragraph>
        </div>
      </div>

      {/* Anonymous option */}
      {showAnonymous && (
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Checkbox
            value="anonymous"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            disabled={isDisabled}
            label={mergedLabels.anonymousLabel}
          />
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              marginLeft: 'var(--ds-spacing-6)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {mergedLabels.anonymousDescription}
          </Paragraph>
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          justifyContent: 'flex-end',
          paddingTop: 'var(--ds-spacing-3)',
          borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        {onCancel && (
          <Button type="button" variant="tertiary" onClick={onCancel} disabled={loading}>
            {mergedLabels.cancel}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          data-color="accent"
          disabled={isDisabled || rating === 0}
        >
          {loading ? '...' : mergedLabels.submit}
        </Button>
      </div>
    </form>
  );
}

export default FeedbackForm;
