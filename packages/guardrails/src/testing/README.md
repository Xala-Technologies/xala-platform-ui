# Testing Utilities

Shared testing utilities for all packages in the monorepo.

## 📦 What's Included

### 1. Test Data Factories (`factories.ts`)
Create mock data with sensible defaults:

```typescript
import { createMockBooking, createMockRentalObject } from '@xala-technologies/guardrails/testing';

const booking = createMockBooking({ status: 'confirmed' });
const rentalObject = createMockRentalObject({ name: 'Custom Room' });
```

**Available Factories:**
- `createMockBooking()` - Mock booking with defaults
- `createMockRentalObject()` - Mock rental object
- `createMockCalendarEvent()` - Mock calendar event
- `createMockMessage()` - Mock message
- `createMockGdprRequest()` - Mock GDPR request
- `createMockSeason()` - Mock season
- `createMockOrganization()` - Mock organization
- `createMockUser()` - Mock user
- `createMockArray()` - Create array of mocks with incrementing IDs

### 2. Shared Mocks (`mocks.ts`)
Commonly used mock data structures:

```typescript
import { mockRentalObjectNameMap, mockUserNameMap } from '@xala-technologies/guardrails/testing';

const vm = transformBooking(booking, {
  rentalObjectNameMap: mockRentalObjectNameMap,
  userNameMap: mockUserNameMap
});
```

**Available Mocks:**
- `mockRentalObjectNameMap` - Map of rental object IDs to names
- `mockUserNameMap` - Map of user IDs to names
- `mockOrganizationNameMap` - Map of organization IDs to names
- `mockLocales` - Common locale configurations
- `mockDates` - Consistent date values for testing
- `mockTransformOptions` - Preset adapter options
- `mockStatuses` - Status values for all entity types
- `mockCurrencies` - Common currency codes
- `mockAmenities` - Rental object amenities

### 3. Custom Matchers (`matchers.ts`)
Custom Vitest matchers for ViewModels:

```typescript
import { expect } from 'vitest';
import { extendMatchers } from '@xala-technologies/guardrails/testing';

// In vitest.setup.ts
extendMatchers(expect);

// In tests
expect(vm.statusDisplay).toBeValidStatusDisplay();
expect(vm.timeDisplay).toBeValidTimeDisplay();
expect(vm).toBeValidBookingVM();
```

**Available Matchers:**
- `toBeValidStatusDisplay()` - Check status display structure
- `toBeValidTimeDisplay()` - Check time display structure
- `toBeValidPaymentDisplay()` - Check payment display structure
- `toBeValidBookingVM()` - Check complete BookingVM structure
- `toBeValidViewModel(fields)` - Check generic ViewModel structure
- `toBeISODateString()` - Check ISO date format
- `toBeValidLocale()` - Check locale format

### 4. Compliance Tests (`index.ts`)
MANDATORY tests for apps using platform-ui:

```typescript
import { describe, test, expect } from 'vitest';
import { createViolationTests } from '@xala-technologies/guardrails/testing';

createViolationTests({
  srcDir: './src',
  describe,
  test,
  expect,
});
```

## 📁 Usage by Package

### In `client-sdk` Tests

```typescript
// packages/client-sdk/src/adapters/booking/booking.adapter.test.ts
import { describe, it, expect, vi } from 'vitest';
import {
  createMockBooking,
  mockRentalObjectNameMap,
  mockTransformOptions
} from '@xala-technologies/guardrails/testing';
import { transformBooking } from './booking.adapter';

describe('Booking Adapter', () => {
  it('should transform booking with name maps', () => {
    const booking = createMockBooking();
    const vm = transformBooking(booking, mockTransformOptions.default);

    expect(vm.rentalObjectDisplay.name).toBe('Conference Room A');
  });
});
```

### In `platform-ui` Tests

```typescript
// packages/platform-ui/src/blocks/BookingCard.test.tsx
import { render, screen } from '@testing-library/react';
import { createMockBooking } from '@xala-technologies/guardrails/testing';
import { BookingCard } from './BookingCard';

test('renders booking card', () => {
  const booking = createMockBooking({ status: 'confirmed' });
  render(<BookingCard booking={booking} />);
  expect(screen.getByText('Bekreftet')).toBeInTheDocument();
});
```

### In E2E Tests

```typescript
// packages/testing-e2e/suites/booking.e2e.ts
import { test, expect } from '@playwright/test';
import { createMockBooking, mockDates } from '@xala-technologies/guardrails/testing';

test('create new booking', async ({ page }) => {
  await page.goto('/bookings/new');
  // Use mock data for consistent testing
  await page.fill('[name="startTime"]', mockDates.future);
});
```

## 🎯 Benefits

1. **Consistency** - Same mock data across all tests
2. **Less Boilerplate** - Factories reduce repetitive setup
3. **Better Assertions** - Custom matchers make tests more readable
4. **Type Safety** - Full TypeScript support
5. **Maintainability** - Update mocks in one place

## 📝 Adding New Utilities

When adding new test utilities:

1. **Add to appropriate file:**
   - `factories.ts` - New mock data factories
   - `mocks.ts` - Shared mock data structures
   - `matchers.ts` - Custom Vitest matchers
   - `index.ts` - Compliance tests

2. **Export from index.ts:**
```typescript
export * from './factories';
export * from './mocks';
export * from './matchers';
```

3. **Document in this README:**
   - Add to list of available utilities
   - Provide usage example
   - Explain when to use it

## 🔗 Related

- [Adapter README](../../../../Digilist/packages/client-sdk/src/adapters/README.md)
- [MVVM Implementation Progress](../../../../Digilist/packages/client-sdk/MVVM_IMPLEMENTATION_PROGRESS.md)
