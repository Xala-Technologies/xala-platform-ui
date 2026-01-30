# Internationalization (i18n) Integration Guide

This guide explains how to integrate internationalization support with `@xala-technologies/platform-ui` components using the prop injection pattern.

## Table of Contents

- [Overview](#overview)
- [Design Principle](#design-principle)
- [Integration Patterns](#integration-patterns)
  - [Structured i18n Object Pattern](#structured-i18n-object-pattern)
  - [Translation Function Pattern](#translation-function-pattern)
- [Usage Examples](#usage-examples)
  - [BookingEngine Integration](#bookingengine-integration)
  - [Sidebar Components Integration](#sidebar-components-integration)
  - [Multi-Language Applications](#multi-language-applications)
- [TypeScript Support](#typescript-support)
- [Best Practices](#best-practices)
- [Testing i18n Integration](#testing-i18n-integration)

## Overview

`@xala-technologies/platform-ui` is a **UI-only component library** that does not include any business logic, API calls, or internationalization libraries. Instead, components accept translated strings via props, allowing consuming applications to handle i18n in their preferred way.

This approach provides:

- **Framework agnostic**: Works with any i18n library (react-i18next, FormatJS, custom solutions)
- **Type safety**: Full TypeScript support for required translations
- **Flexibility**: Applications control translation loading, fallbacks, and locale switching
- **No dependencies**: Library remains lightweight with no i18n library dependencies

## Design Principle

### ✅ Correct: Prop Injection Pattern

Components accept translation strings via props:

```tsx
import { BookingEngine } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

function MyBookingPage() {
  const t = useT();

  const i18n = {
    steps: {
      selectTime: t('booking.steps.selectTime'),
      yourDetails: t('booking.steps.yourDetails'),
      review: t('booking.steps.review'),
      confirmation: t('booking.steps.confirmation'),
    },
    priceFrom: t('booking.priceFrom'),
    stepProgress: t('booking.stepProgress'),
    navigation: {
      previousWeek: t('booking.navigation.previousWeek'),
      nextWeek: t('booking.navigation.nextWeek'),
      remove: t('booking.navigation.remove'),
    },
  };

  return <BookingEngine config={config} i18n={i18n} />;
}
```

### ❌ Incorrect: Direct i18n Calls

Platform-ui components **do not** call i18n functions internally:

```tsx
// ❌ This does NOT exist in platform-ui
function BookingEngine() {
  const t = useTranslation(); // Not in platform-ui
  return <div>{t('booking.title')}</div>;
}
```

## Integration Patterns

Platform-ui uses two complementary patterns for i18n integration depending on the component's complexity.

### Structured i18n Object Pattern

**Used by:** Complex components with many translatable strings (e.g., `BookingEngine`, `BookingPage`)

**How it works:** Components accept a structured interface containing all required translations organized by category.

**TypeScript Interface:**

```tsx
export interface BookingEngineI18n {
  /** Step labels */
  steps: {
    selectTime: string;
    yourDetails: string;
    review: string;
    confirmation: string;
  };
  /** "from" text in price display */
  priceFrom: string;
  /** Step progress format string - use {current} and {total} as placeholders */
  stepProgress: string;
  /** Navigation and action labels */
  navigation: {
    previousWeek: string;
    nextWeek: string;
    remove: string;
  };
}
```

**Usage:**

```tsx
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

function MyComponent() {
  const t = useT();

  // Build structured i18n object
  const i18n: BookingEngineI18n = {
    steps: {
      selectTime: t('booking.steps.selectTime'),
      yourDetails: t('booking.steps.yourDetails'),
      review: t('booking.steps.review'),
      confirmation: t('booking.steps.confirmation'),
    },
    priceFrom: t('booking.priceFrom'),
    stepProgress: t('booking.stepProgress'), // "Step {current} of {total}"
    navigation: {
      previousWeek: t('booking.navigation.previousWeek'),
      nextWeek: t('booking.navigation.nextWeek'),
      remove: t('booking.navigation.remove'),
    },
  };

  return <BookingEngine config={config} i18n={i18n} />;
}
```

**Advantages:**

- **Discoverable**: TypeScript shows exactly what translations are needed
- **Type-safe**: Compiler catches missing translations
- **Structured**: Related translations grouped logically
- **Self-documenting**: Interface serves as translation key reference

### Translation Function Pattern

**Used by:** Simpler components or components with dynamic translation needs (e.g., sidebar components)

**How it works:** Components accept an optional translation function and call it with translation keys.

**TypeScript Signature:**

```tsx
export interface ComponentProps {
  /** Translation function for i18n */
  t?: (key: string, params?: unknown) => string;
  // ... other props
}
```

**Usage:**

```tsx
import { BookingCartSidebar } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

function MyComponent() {
  const t = useT();

  return (
    <BookingCartSidebar
      selectedSlots={slots}
      slotDetails={details}
      weekStart={weekStart}
      onRemoveSlot={handleRemove}
      t={t} // Pass translation function directly
    />
  );
}
```

**Internal Implementation Pattern:**

Components wrap the provided `t` function with a fallback:

```tsx
function BookingCartSidebar({ t: tProp, ...props }: BookingCartSidebarProps) {
  // Wrapper with fallback to key if no translation function provided
  const t = React.useCallback(
    (key: string, params?: unknown): string => (tProp ? tProp(key, params) : key),
    [tProp],
  );

  // Use t() throughout the component
  return <div>{t('cart.title')}</div>;
}
```

**Advantages:**

- **Flexible**: Works with any translation key structure
- **Simple**: Just pass the translation function
- **Dynamic**: Supports parameterized translations
- **Graceful**: Falls back to translation key if no function provided

## Usage Examples

### BookingEngine Integration

#### Basic Integration with react-i18next

```tsx
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';
import { useTranslation } from 'react-i18next';

function BookingPage() {
  const { t } = useTranslation('booking');

  const i18n: BookingEngineI18n = {
    steps: {
      selectTime: t('steps.selectTime'),
      yourDetails: t('steps.yourDetails'),
      review: t('steps.review'),
      confirmation: t('steps.confirmation'),
    },
    priceFrom: t('priceFrom'),
    stepProgress: t('stepProgress'),
    navigation: {
      previousWeek: t('navigation.previousWeek'),
      nextWeek: t('navigation.nextWeek'),
      remove: t('navigation.remove'),
    },
  };

  return (
    <BookingEngine
      config={bookingConfig}
      rentalObjectName="Conference Room"
      i18n={i18n}
    />
  );
}
```

#### Integration with Custom i18n Solution

```tsx
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';
import { useLocale } from './i18n/useLocale';

const translations = {
  en: {
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
  },
  no: {
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
  },
};

function BookingPage() {
  const { locale } = useLocale();
  const i18n = translations[locale];

  return <BookingEngine config={config} i18n={i18n} />;
}
```

#### Static Translations (Single Language)

```tsx
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';

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

function BookingPage() {
  return <BookingEngine config={config} i18n={norwegianI18n} />;
}
```

### Sidebar Components Integration

#### Using @xala-technologies/i18n

```tsx
import { BookingCartSidebar } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

function CartView() {
  const t = useT();

  return (
    <BookingCartSidebar
      selectedSlots={selectedSlots}
      slotDetails={slotDetails}
      weekStart={weekStart}
      onRemoveSlot={handleRemoveSlot}
      t={t} // Pass translation function
    />
  );
}
```

#### Custom Translation Function

```tsx
import { BookingCartSidebar } from '@xala-technologies/platform-ui';

function CartView() {
  const translations = {
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    // ... more translations
  };

  const t = (key: string, params?: unknown): string => {
    let text = translations[key] || key;

    // Simple parameter interpolation
    if (params && typeof params === 'object') {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }

    return text;
  };

  return <BookingCartSidebar {...props} t={t} />;
}
```

#### Without i18n (Development/Fallback)

```tsx
import { BookingCartSidebar } from '@xala-technologies/platform-ui';

function CartView() {
  // Component will use translation keys as fallback text
  return <BookingCartSidebar {...props} />;
}
```

### Multi-Language Applications

#### Full Application Example

```tsx
// App.tsx
import { useState } from 'react';
import { I18nProvider } from '@xala-technologies/i18n';
import { BookingPage } from './pages/BookingPage';

function App() {
  const [locale, setLocale] = useState('en');

  return (
    <I18nProvider locale={locale}>
      <header>
        <button onClick={() => setLocale('en')}>English</button>
        <button onClick={() => setLocale('no')}>Norsk</button>
      </header>
      <BookingPage />
    </I18nProvider>
  );
}
```

```tsx
// pages/BookingPage.tsx
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/i18n';

export function BookingPage() {
  const t = useT();

  const i18n: BookingEngineI18n = {
    steps: {
      selectTime: t('booking.steps.selectTime'),
      yourDetails: t('booking.steps.yourDetails'),
      review: t('booking.steps.review'),
      confirmation: t('booking.steps.confirmation'),
    },
    priceFrom: t('booking.priceFrom'),
    stepProgress: t('booking.stepProgress'),
    navigation: {
      previousWeek: t('booking.navigation.previousWeek'),
      nextWeek: t('booking.navigation.nextWeek'),
      remove: t('booking.navigation.remove'),
    },
  };

  return <BookingEngine config={config} i18n={i18n} />;
}
```

## TypeScript Support

### Importing i18n Types

All components with structured i18n support export their interface:

```tsx
import type { BookingEngineI18n } from '@xala-technologies/platform-ui';
import type { BookingPageI18n } from '@xala-technologies/platform-ui';
```

### Creating Reusable Translation Builders

```tsx
import type { BookingEngineI18n } from '@xala-technologies/platform-ui';

type TranslationFunction = (key: string, params?: unknown) => string;

export function buildBookingEngineI18n(t: TranslationFunction): BookingEngineI18n {
  return {
    steps: {
      selectTime: t('booking.steps.selectTime'),
      yourDetails: t('booking.steps.yourDetails'),
      review: t('booking.steps.review'),
      confirmation: t('booking.steps.confirmation'),
    },
    priceFrom: t('booking.priceFrom'),
    stepProgress: t('booking.stepProgress'),
    navigation: {
      previousWeek: t('booking.navigation.previousWeek'),
      nextWeek: t('booking.navigation.nextWeek'),
      remove: t('booking.navigation.remove'),
    },
  };
}

// Usage
const i18n = buildBookingEngineI18n(t);
```

### Type-Safe Translation Keys

```tsx
// Define your translation keys as const
const bookingKeys = {
  steps: {
    selectTime: 'booking.steps.selectTime',
    yourDetails: 'booking.steps.yourDetails',
    review: 'booking.steps.review',
    confirmation: 'booking.steps.confirmation',
  },
  priceFrom: 'booking.priceFrom',
  stepProgress: 'booking.stepProgress',
  navigation: {
    previousWeek: 'booking.navigation.previousWeek',
    nextWeek: 'booking.navigation.nextWeek',
    remove: 'booking.navigation.remove',
  },
} as const;

// Build i18n object with type safety
const i18n: BookingEngineI18n = {
  steps: {
    selectTime: t(bookingKeys.steps.selectTime),
    yourDetails: t(bookingKeys.steps.yourDetails),
    review: t(bookingKeys.steps.review),
    confirmation: t(bookingKeys.steps.confirmation),
  },
  priceFrom: t(bookingKeys.priceFrom),
  stepProgress: t(bookingKeys.stepProgress),
  navigation: {
    previousWeek: t(bookingKeys.navigation.previousWeek),
    nextWeek: t(bookingKeys.navigation.nextWeek),
    remove: t(bookingKeys.navigation.remove),
  },
};
```

## Best Practices

### 1. Centralize Translation Key Definitions

```tsx
// i18n/keys/booking.ts
export const BOOKING_KEYS = {
  STEPS_SELECT_TIME: 'booking.steps.selectTime',
  STEPS_YOUR_DETAILS: 'booking.steps.yourDetails',
  STEPS_REVIEW: 'booking.steps.review',
  STEPS_CONFIRMATION: 'booking.steps.confirmation',
  PRICE_FROM: 'booking.priceFrom',
  STEP_PROGRESS: 'booking.stepProgress',
  NAV_PREVIOUS_WEEK: 'booking.navigation.previousWeek',
  NAV_NEXT_WEEK: 'booking.navigation.nextWeek',
  NAV_REMOVE: 'booking.navigation.remove',
} as const;
```

### 2. Create Reusable Builders

```tsx
// i18n/builders/bookingEngine.ts
import type { BookingEngineI18n } from '@xala-technologies/platform-ui';
import { BOOKING_KEYS } from '../keys/booking';

export function buildBookingEngineI18n(
  t: (key: string) => string,
): BookingEngineI18n {
  return {
    steps: {
      selectTime: t(BOOKING_KEYS.STEPS_SELECT_TIME),
      yourDetails: t(BOOKING_KEYS.STEPS_YOUR_DETAILS),
      review: t(BOOKING_KEYS.STEPS_REVIEW),
      confirmation: t(BOOKING_KEYS.STEPS_CONFIRMATION),
    },
    priceFrom: t(BOOKING_KEYS.PRICE_FROM),
    stepProgress: t(BOOKING_KEYS.STEP_PROGRESS),
    navigation: {
      previousWeek: t(BOOKING_KEYS.NAV_PREVIOUS_WEEK),
      nextWeek: t(BOOKING_KEYS.NAV_NEXT_WEEK),
      remove: t(BOOKING_KEYS.NAV_REMOVE),
    },
  };
}
```

### 3. Provide Fallback Values

Always provide fallback values in your translation calls:

```tsx
const i18n: BookingEngineI18n = {
  steps: {
    selectTime: t('booking.steps.selectTime') || 'Select Time',
    yourDetails: t('booking.steps.yourDetails') || 'Your Details',
    review: t('booking.steps.review') || 'Review',
    confirmation: t('booking.steps.confirmation') || 'Confirmation',
  },
  // ...
};
```

### 4. Handle Parameterized Translations

For strings with placeholders, ensure your translation function handles parameters:

```tsx
// Component expects: "Step {current} of {total}"
stepProgress: t('booking.stepProgress', { current: 1, total: 4 })
```

### 5. Document Required Translation Keys

Maintain a reference of required translation keys for each component:

```tsx
/**
 * BookingEngine Required Translations
 *
 * @requires booking.steps.selectTime - "Select Time"
 * @requires booking.steps.yourDetails - "Your Details"
 * @requires booking.steps.review - "Review"
 * @requires booking.steps.confirmation - "Confirmation"
 * @requires booking.priceFrom - "from"
 * @requires booking.stepProgress - "Step {current} of {total}" (params: current, total)
 * @requires booking.navigation.previousWeek - "Previous Week"
 * @requires booking.navigation.nextWeek - "Next Week"
 * @requires booking.navigation.remove - "Remove"
 */
```

### 6. Test with Multiple Languages

Always test components with at least two languages during development:

```tsx
// Storybook example
export const EnglishVersion: Story = {
  args: { i18n: englishI18n },
};

export const NorwegianVersion: Story = {
  args: { i18n: norwegianI18n },
};
```

## Testing i18n Integration

### Unit Testing with Jest

```tsx
import { render, screen } from '@testing-library/react';
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';

describe('BookingEngine i18n', () => {
  const mockI18n: BookingEngineI18n = {
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

  it('renders with Norwegian translations', () => {
    render(<BookingEngine config={mockConfig} i18n={mockI18n} />);

    expect(screen.getByText('Velg tid')).toBeInTheDocument();
    expect(screen.getByText('Dine detaljer')).toBeInTheDocument();
  });

  it('uses fallback when i18n not provided', () => {
    render(<BookingEngine config={mockConfig} />);

    // Should use default English text
    expect(screen.getByText('Select Time')).toBeInTheDocument();
  });
});
```

### Storybook Testing

See example in `src/stories/Features/BookingEngineI18n.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BookingEngine, type BookingEngineI18n } from '@xala-technologies/platform-ui';

export const NorwegianTranslation: Story = {
  render: () => {
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

    return <BookingEngine config={mockConfig} i18n={i18n} />;
  },
};
```

## Summary

The i18n prop injection pattern in `@xala-technologies/platform-ui` provides:

- ✅ **Framework Flexibility** - Works with any i18n library or custom solution
- ✅ **Type Safety** - Full TypeScript support for required translations
- ✅ **Zero Dependencies** - Library remains lightweight
- ✅ **Testability** - Easy to test with different languages
- ✅ **Developer Experience** - Clear interfaces and discoverable API

For complex components like `BookingEngine`, use the **structured i18n object pattern** for better type safety and discoverability.

For simpler components, use the **translation function pattern** for flexibility and ease of use.

Both patterns maintain the core principle: **UI components accept translations via props, business logic components handle i18n**.
