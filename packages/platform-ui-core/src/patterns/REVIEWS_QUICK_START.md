# Reviews Components - Quick Start Guide

## Installation

```bash
npm install @xala-technologies/platform-ui
# or
pnpm add @xala-technologies/platform-ui
```

## Available Components

### 1. ReviewCard - Display a Single Review

```typescript
import { ReviewCard } from '@xala-technologies/platform-ui/patterns';

function MyComponent() {
  return (
    <ReviewCard
      author={{ name: 'John Doe', verified: true }}
      rating={4}
      content="Great product!"
      date="2 days ago"
      labels={{
        helpful: 'Helpful',
        verified: 'Verified Buyer',
      }}
    />
  );
}
```

### 2. ReviewList - Display Multiple Reviews

```typescript
import { ReviewList } from '@xala-technologies/platform-ui/patterns';

function ProductReviews({ productId }) {
  const reviews = [
    {
      id: '1',
      author: { name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
      rating: 5,
      content: 'Excellent!',
      date: '1 week ago',
    },
    // ... more reviews
  ];

  const summary = {
    average: 4.5,
    total: 128,
    distribution: { 5: 80, 4: 30, 3: 10, 2: 5, 1: 3 },
  };

  return (
    <ReviewList
      reviews={reviews}
      summary={summary}
      labels={{
        reviews: 'reviews',
        sortBy: 'Sort by',
        showMore: 'Show more',
      }}
    />
  );
}
```

### 3. FeedbackForm - Collect New Reviews

```typescript
import { FeedbackForm } from '@xala-technologies/platform-ui/patterns';

function WriteReview({ onSubmit }) {
  const handleSubmit = async (data) => {
    await submitReview(data);
  };

  return (
    <FeedbackForm
      onSubmit={handleSubmit}
      maxRating={5}
      showTitle={true}
      minContentLength={20}
      labels={{
        title: 'Write a Review',
        ratingLabel: 'Your rating',
        contentLabel: 'Your review',
        submit: 'Submit Review',
      }}
    />
  );
}
```

### 4. ReviewStep - Review/Confirmation Step

```typescript
import { ReviewStep } from '@xala-technologies/platform-ui/patterns';

function BookingReview({ data, onEdit }) {
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const sections = [
    {
      id: 'details',
      title: 'Booking Details',
      items: [
        { label: 'Resource', value: data.resourceName },
        { label: 'Date', value: data.date },
        { label: 'Time', value: data.time },
      ],
      onEdit: () => onEdit('details'),
      editLabel: 'Change',
    },
  ];

  return (
    <ReviewStep
      title="Review Your Booking"
      message="Please verify all details"
      sections={sections}
      terms={{
        label: 'I agree to the terms and conditions',
        checked: termsAccepted,
        onChange: setTermsAccepted,
      }}
    />
  );
}
```

## Full Example with i18n

```typescript
import { ReviewList, type ReviewListLabels } from '@xala-technologies/platform-ui/patterns';
import { useTranslation } from 'your-i18n-library';

function ProductReviewsConnected({ productId }) {
  const { t } = useTranslation();
  const { data, loading } = useProductReviews(productId);

  const labels: ReviewListLabels = {
    reviews: t('reviews.count'),
    sortBy: t('reviews.sortBy'),
    showMore: t('reviews.showMore'),
    noReviews: t('reviews.empty.title'),
    beFirst: t('reviews.empty.description'),
    writeReview: t('reviews.write'),
    helpful: t('reviews.helpful'),
    helpfulCount: t('reviews.helpfulCount'),
    verified: t('reviews.verified'),
    status: {
      approved: t('reviews.status.approved'),
      pending: t('reviews.status.pending'),
      rejected: t('reviews.status.rejected'),
      flagged: t('reviews.status.flagged'),
    },
  };

  const handleSort = (sortId: string) => {
    // Update sort
  };

  const handleMarkHelpful = (reviewId: string) => {
    // Mark review as helpful
  };

  const handleWriteReview = () => {
    // Open write review modal
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ReviewList
      reviews={data.reviews}
      summary={data.summary}
      sortOptions={[
        { id: 'newest', label: t('reviews.sort.newest') },
        { id: 'highest', label: t('reviews.sort.highest') },
        { id: 'helpful', label: t('reviews.sort.helpful') },
      ]}
      onSortChange={handleSort}
      onMarkHelpful={handleMarkHelpful}
      onWriteReview={handleWriteReview}
      labels={labels}
    />
  );
}
```

## TypeScript Types

All components are fully typed. Import types alongside components:

```typescript
import {
  ReviewCard,
  ReviewList,
  FeedbackForm,
  ReviewStep,
  type ReviewCardProps,
  type ReviewCardLabels,
  type ReviewListProps,
  type ReviewListLabels,
  type FeedbackFormProps,
  type FeedbackFormLabels,
  type ReviewStepProps,
  type ReviewStepTerms,
} from '@xala-technologies/platform-ui/patterns';
```

## Common Patterns

### Modal with Feedback Form

```typescript
import { FeedbackForm } from '@xala-technologies/platform-ui/patterns';
import { Modal } from '@xala-technologies/platform-ui/composed';

function ReviewModal({ isOpen, onClose, onSubmit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FeedbackForm
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
        onCancel={onClose}
        labels={{
          title: 'Write a Review',
          submit: 'Submit',
          cancel: 'Cancel',
        }}
      />
    </Modal>
  );
}
```

### Reviews with Pagination

```typescript
function PaginatedReviews({ productId }) {
  const [page, setPage] = useState(1);
  const { data, hasMore } = useReviews(productId, page);

  return (
    <ReviewList
      reviews={data}
      hasMore={hasMore}
      onShowMore={() => setPage(p => p + 1)}
      labels={{ showMore: 'Load more reviews' }}
    />
  );
}
```

### Moderated Reviews Admin View

```typescript
function AdminReviews() {
  const { reviews } = usePendingReviews();

  return (
    <ReviewList
      reviews={reviews.map(r => ({
        ...r,
        showStatus: true,
        status: r.moderationStatus,
        moderatorNotes: r.notes,
      }))}
      labels={{
        status: {
          approved: 'Approved',
          pending: 'Pending Review',
          rejected: 'Rejected',
          flagged: 'Flagged',
        },
      }}
    />
  );
}
```

## Styling

All components use Designsystemet tokens and can be customized via:

1. **CSS Custom Properties** (design tokens)
2. **className prop** for additional styling
3. **Designsystemet theme** configuration

```typescript
<ReviewCard
  className="my-custom-review"
  // ... props
/>
```

```css
.my-custom-review {
  border: 2px solid var(--ds-color-accent-border-default);
}
```

## Accessibility

All components are accessible by default:

- Proper ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management

## Need Help?

- See comprehensive documentation: `REVIEWS_REFACTORING_SUMMARY.md`
- Check Storybook stories for interactive examples
- Review TypeScript types for all available props
