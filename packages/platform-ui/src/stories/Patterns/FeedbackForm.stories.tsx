/**
 * FeedbackForm Stories
 *
 * Form component for collecting user feedback and reviews.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  FeedbackForm,
  type FeedbackFormProps,
  type FeedbackFormData,
} from '../../patterns/FeedbackForm';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof FeedbackForm> = {
  title: 'Patterns/FeedbackForm',
  component: FeedbackForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FeedbackForm

A domain-neutral form component for collecting user feedback and reviews.

### Features
- Interactive star rating input
- Title field (optional)
- Content textarea with character count
- Anonymous submission option
- Validation with error messages
- Loading state
- Pre-localized labels

### Usage

\`\`\`tsx
<FeedbackForm
  onSubmit={async (data) => {
    await submitReview(data);
  }}
  labels={{
    title: 'Share your experience',
    ratingLabel: 'Your rating',
    submit: 'Submit review',
  }}
  maxRating={5}
  minContentLength={20}
/>
\`\`\`

### Accessibility
- Star rating uses radiogroup role
- Required fields are properly labeled
- Error messages are associated with inputs
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeedbackForm>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    onSubmit: (data: FeedbackFormData) => {
      console.log('Submitted:', data);
      alert(`Review submitted!\nRating: ${data.rating}\nContent: ${data.content}`);
    },
  },
};

export const WithTitle: Story = {
  name: 'With Title Field',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showTitle: true,
  },
};

export const WithoutTitle: Story = {
  name: 'Without Title Field',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showTitle: false,
  },
};

export const WithAnonymous: Story = {
  name: 'With Anonymous Option',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showAnonymous: true,
  },
};

export const WithMinLength: Story = {
  name: 'With Minimum Length',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    minContentLength: 50,
    labels: {
      subtitle: 'Please provide at least 50 characters of feedback',
    },
  },
};

export const WithMaxLength: Story = {
  name: 'With Maximum Length',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    maxContentLength: 500,
  },
};

export const WithCancelButton: Story = {
  name: 'With Cancel Button',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    onCancel: () => console.log('Cancelled'),
  },
};

export const PrefilledValues: Story = {
  name: 'Prefilled Values (Edit Mode)',
  args: {
    initialValues: {
      rating: 4,
      title: 'Great experience overall',
      content:
        'The venue was well-maintained and the staff was helpful. Would recommend to others.',
    },
    onSubmit: (data: FeedbackFormData) => console.log('Updated:', data),
    onCancel: () => console.log('Cancelled'),
    labels: {
      title: 'Edit your review',
      submit: 'Update review',
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    initialValues: {
      rating: 5,
      content: 'Submitting this review...',
    },
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    loading: true,
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    disabled: true,
  },
};

export const WithExternalErrors: Story = {
  name: 'With External Errors',
  args: {
    initialValues: {
      rating: 4,
      content: 'My review content',
    },
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    errors: {
      content: 'This review contains inappropriate content. Please revise.',
    },
  },
};

export const TenStarRating: Story = {
  name: 'Ten Star Rating',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    maxRating: 10,
    labels: {
      ratingDescriptions: {
        1: 'Terrible',
        2: 'Very bad',
        3: 'Bad',
        4: 'Poor',
        5: 'Average',
        6: 'Acceptable',
        7: 'Good',
        8: 'Very good',
        9: 'Excellent',
        10: 'Perfect',
      },
    },
  },
};

export const CustomRatingDescriptions: Story = {
  name: 'Custom Rating Descriptions',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    labels: {
      ratingDescriptions: {
        1: 'I regret this experience',
        2: 'Below expectations',
        3: 'Met basic expectations',
        4: 'Exceeded expectations',
        5: 'Outstanding experience!',
      },
    },
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showTitle: true,
    showAnonymous: true,
    minContentLength: 20,
    labels: {
      title: 'Del din opplevelse',
      subtitle: 'Din tilbakemelding hjelper andre med å ta informerte beslutninger',
      ratingLabel: 'Din vurdering',
      ratingDescriptions: {
        1: 'Dårlig',
        2: 'Under gjennomsnittet',
        3: 'Grei',
        4: 'Veldig bra',
        5: 'Utmerket',
      },
      titleLabel: 'Tittel',
      titlePlaceholder: 'Oppsummer din opplevelse',
      contentLabel: 'Din anmeldelse',
      contentPlaceholder: 'Fortell oss om din opplevelse...',
      characterCount: '{count} / {max} tegn',
      minCharacters: 'Minimum {min} tegn',
      anonymousLabel: 'Publiser anonymt',
      anonymousDescription: 'Navnet ditt vil ikke vises med denne anmeldelsen',
      submit: 'Send inn',
      cancel: 'Avbryt',
      required: '*',
      errors: {
        ratingRequired: 'Vennligst velg en vurdering',
        contentRequired: 'Vennligst skriv din anmeldelse',
        contentTooShort: 'Anmeldelsen må være minst {min} tegn',
      },
    },
    onCancel: () => console.log('Cancelled'),
  },
};

export const ProductReview: Story = {
  name: 'Domain Example: Product Review',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showTitle: true,
    minContentLength: 30,
    labels: {
      title: 'Write a product review',
      subtitle: 'Help other customers by sharing your experience with this product',
      ratingLabel: 'How would you rate this product?',
      titleLabel: 'Review headline',
      titlePlaceholder: 'What is most important to know?',
      contentLabel: 'Written review',
      contentPlaceholder:
        'What did you like or dislike? How did the product perform? Would you recommend it?',
      submit: 'Submit review',
    },
  },
};

export const VenueReview: Story = {
  name: 'Domain Example: Venue Review',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showTitle: true,
    showAnonymous: true,
    minContentLength: 50,
    labels: {
      title: 'Review this venue',
      subtitle: 'Share your experience to help others find the perfect space',
      ratingLabel: 'Overall experience',
      titleLabel: 'Summary',
      titlePlaceholder: 'e.g., "Perfect for corporate events"',
      contentLabel: 'Your review',
      contentPlaceholder:
        'Tell us about the facilities, staff, location, and anything else that stood out...',
      submit: 'Post review',
    },
  },
};

export const QuickFeedback: Story = {
  name: 'Domain Example: Quick Feedback',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    showTitle: false,
    showAnonymous: false,
    maxContentLength: 280,
    labels: {
      title: 'How was your experience?',
      subtitle: 'Your feedback helps us improve',
      contentPlaceholder: 'Quick thoughts on your recent visit...',
      submit: 'Send feedback',
    },
  },
};

export const FullFeatures: Story = {
  name: 'All Features Enabled',
  args: {
    onSubmit: (data: FeedbackFormData) => console.log('Submitted:', data),
    onCancel: () => console.log('Cancelled'),
    showTitle: true,
    showAnonymous: true,
    minContentLength: 20,
    maxContentLength: 1000,
    labels: {
      title: 'Share your feedback',
      subtitle: 'We value your honest opinion',
    },
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: () => {
    const [submitted, setSubmitted] = React.useState<FeedbackFormData | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (data: FeedbackFormData) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      setSubmitted(data);
    };

    if (submitted) {
      return (
        <div
          style={{
            padding: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            textAlign: 'center',
          }}
        >
          <Paragraph data-size="lg" style={{ margin: 0, fontWeight: 600 }}>
            Thank you for your feedback!
          </Paragraph>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-2)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            Rating: {submitted.rating}/5 stars
          </Paragraph>
          <button
            type="button"
            onClick={() => setSubmitted(null)}
            style={{
              marginTop: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-accent-base-default)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--ds-border-radius-md)',
              cursor: 'pointer',
            }}
          >
            Write another review
          </button>
        </div>
      );
    }

    return (
      <FeedbackForm
        onSubmit={handleSubmit}
        loading={loading}
        showTitle={true}
        showAnonymous={true}
        minContentLength={20}
        labels={{
          title: 'How was your experience?',
          subtitle: 'Your feedback helps us improve our service',
        }}
      />
    );
  },
};
