/**
 * BookingEngine i18n Examples
 *
 * Demonstrates how to provide internationalization support to BookingEngine
 * using the i18n prop injection pattern.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { BookingEngine } from '../../features/booking/engine/BookingEngine';
import type {
  BookingEngineI18n,
  BookingConfig,
} from '../../features/booking/engine/BookingEngine';

/**
 * BookingEngine i18n Integration
 *
 * ## Overview
 * This component demonstrates the i18n prop injection pattern for the BookingEngine.
 * Instead of calling translation functions directly, BookingEngine accepts all
 * translatable strings via the `i18n` prop.
 *
 * ## Pattern
 * Components accept translation strings via props rather than calling i18n functions
 * directly, maintaining the UI-only principle.
 *
 * ## Usage
 * ```tsx
 * import { useT } from '@xala-technologies/i18n';
 * import { BookingEngine } from '@xala-technologies/platform-ui';
 *
 * function MyBookingPage() {
 *   const t = useT();
 *
 *   const i18n: BookingEngineI18n = {
 *     steps: {
 *       selectTime: t('booking.steps.selectTime'),
 *       yourDetails: t('booking.steps.yourDetails'),
 *       review: t('booking.steps.review'),
 *       confirmation: t('booking.steps.confirmation'),
 *     },
 *     priceFrom: t('booking.priceFrom'),
 *     stepProgress: t('booking.stepProgress'),
 *     navigation: {
 *       previousWeek: t('booking.navigation.previousWeek'),
 *       nextWeek: t('booking.navigation.nextWeek'),
 *       remove: t('booking.navigation.remove'),
 *     },
 *   };
 *
 *   return <BookingEngine config={config} i18n={i18n} />;
 * }
 * ```
 */
const meta: Meta<typeof BookingEngine> = {
  title: 'Features/BookingEngine/i18n Integration',
  component: BookingEngine,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
BookingEngine i18n integration demonstrates the prop injection pattern for internationalization.

## Features
- All UI text configurable via i18n prop
- Step labels
- Navigation labels
- Price formatting text
- Progress indicators

## When to Use
- Multi-language applications
- Applications requiring custom terminology
- Branded booking experiences with custom labels
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BookingEngine>;

// =============================================================================
// Mock Configuration
// =============================================================================

const mockConfig: BookingConfig = {
  mode: 'slot',
  bookingType: 'slot-based',
  slotDuration: 60,
  minSlots: 1,
  maxSlots: 4,
  requireApproval: false,
  allowRecurring: false,
  pricing: {
    basePrice: 500,
    currency: 'NOK',
    unit: 'hour',
  },
};

const mockConfigWithApproval: BookingConfig = {
  ...mockConfig,
  requireApproval: true,
};

// =============================================================================
// Stories - Default (No i18n)
// =============================================================================

/**
 * Default behavior without i18n prop.
 * Shows fallback English text.
 */
export const DefaultNoI18n: Story = {
  args: {
    config: mockConfig,
    rentalObjectName: 'Conference Room A',
    rentalObjectImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    availableSlots: [],
  },
};

// =============================================================================
// Stories - English Translation
// =============================================================================

/**
 * English translation using i18n prop with useT hook.
 * Demonstrates the recommended integration pattern.
 */
export const EnglishTranslation: Story = {
  render: function Render() {
    const t = useT();

    const i18n: BookingEngineI18n = {
      steps: {
        selectTime: t('booking.steps.selectTime') || 'Select Time',
        yourDetails: t('booking.steps.yourDetails') || 'Your Details',
        review: t('booking.steps.review') || 'Review',
        confirmation: t('booking.steps.confirmation') || 'Confirmation',
      },
      priceFrom: t('booking.priceFrom') || 'from',
      stepProgress: t('booking.stepProgress') || 'Step {current} of {total}',
      navigation: {
        previousWeek: t('booking.navigation.previousWeek') || 'Previous Week',
        nextWeek: t('booking.navigation.nextWeek') || 'Next Week',
        remove: t('booking.navigation.remove') || 'Remove',
      },
    };

    return (
      <BookingEngine
        config={mockConfig}
        rentalObjectName="Conference Room A"
        rentalObjectImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
        availableSlots={[]}
        i18n={i18n}
      />
    );
  },
};

// =============================================================================
// Stories - Norwegian Translation
// =============================================================================

/**
 * Norwegian translation demonstrating full i18n support.
 */
export const NorwegianTranslation: Story = {
  render: function Render() {
    // Simulating Norwegian translations
    const i18n: BookingEngineI18n = {
      steps: {
        selectTime: 'Velg tid',
        yourDetails: 'Dine detaljer',
        review: 'Gjennomgå',
        confirmation: 'Bekreftelse',
      },
      priceFrom: 'fra',
      stepProgress: 'Steg {current} av {total}',
      navigation: {
        previousWeek: 'Forrige uke',
        nextWeek: 'Neste uke',
        remove: 'Fjern',
      },
    };

    return (
      <BookingEngine
        config={mockConfig}
        rentalObjectName="Konferanserom A"
        rentalObjectImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
        availableSlots={[]}
        i18n={i18n}
      />
    );
  },
};

// =============================================================================
// Stories - With Approval Step
// =============================================================================

/**
 * Booking with approval step enabled.
 * Shows how review step label is used when requireApproval is true.
 */
export const WithApprovalStep: Story = {
  render: function Render() {
    const i18n: BookingEngineI18n = {
      steps: {
        selectTime: 'Select Time',
        yourDetails: 'Your Details',
        review: 'Review Booking',
        confirmation: 'Confirmation',
      },
      priceFrom: 'from',
      stepProgress: 'Step {current} of {total}',
      navigation: {
        previousWeek: 'Previous Week',
        nextWeek: 'Next Week',
        remove: 'Remove',
      },
    };

    return (
      <BookingEngine
        config={mockConfigWithApproval}
        rentalObjectName="Conference Room A"
        rentalObjectImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
        availableSlots={[]}
        i18n={i18n}
      />
    );
  },
};

// =============================================================================
// Stories - Custom Terminology
// =============================================================================

/**
 * Custom terminology for branded experience.
 * Demonstrates flexibility of i18n prop for custom labels.
 */
export const CustomTerminology: Story = {
  render: function Render() {
    const i18n: BookingEngineI18n = {
      steps: {
        selectTime: 'Choose Your Slot',
        yourDetails: 'Contact Information',
        review: 'Confirm Your Booking',
        confirmation: 'Success!',
      },
      priceFrom: 'starting at',
      stepProgress: '{current} / {total}',
      navigation: {
        previousWeek: '← Previous',
        nextWeek: 'Next →',
        remove: '✕ Delete',
      },
    };

    return (
      <BookingEngine
        config={mockConfig}
        rentalObjectName="Premium Meeting Space"
        rentalObjectImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
        availableSlots={[]}
        i18n={i18n}
      />
    );
  },
};

// =============================================================================
// Stories - Comparison
// =============================================================================

/**
 * Side-by-side comparison of different translations.
 * Shows English and Norwegian versions together.
 */
export const ComparisonExample: Story = {
  render: function Render() {
    const englishI18n: BookingEngineI18n = {
      steps: {
        selectTime: 'Select Time',
        yourDetails: 'Your Details',
        review: 'Review',
        confirmation: 'Confirmation',
      },
      priceFrom: 'from',
      stepProgress: 'Step {current} of {total}',
      navigation: {
        previousWeek: 'Previous Week',
        nextWeek: 'Next Week',
        remove: 'Remove',
      },
    };

    const norwegianI18n: BookingEngineI18n = {
      steps: {
        selectTime: 'Velg tid',
        yourDetails: 'Dine detaljer',
        review: 'Gjennomgå',
        confirmation: 'Bekreftelse',
      },
      priceFrom: 'fra',
      stepProgress: 'Steg {current} av {total}',
      navigation: {
        previousWeek: 'Forrige uke',
        nextWeek: 'Neste uke',
        remove: 'Fjern',
      },
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>English</h3>
          <BookingEngine
            config={mockConfig}
            rentalObjectName="Conference Room A"
            rentalObjectImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
            availableSlots={[]}
            i18n={englishI18n}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Norwegian</h3>
          <BookingEngine
            config={mockConfig}
            rentalObjectName="Konferanserom A"
            rentalObjectImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
            availableSlots={[]}
            i18n={norwegianI18n}
          />
        </div>
      </div>
    );
  },
};
