/**
 * Custom Vitest Matchers
 *
 * Custom matchers for testing ViewModels and adapters.
 */

/**
 * Check if a value is a valid status display
 */
export function isValidStatusDisplay(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.label === 'string' &&
    ['success', 'warning', 'error', 'info', 'neutral'].includes(value.variant)
  );
}

/**
 * Check if a value is a valid time display
 */
export function isValidTimeDisplay(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.startFormatted === 'string' &&
    typeof value.endFormatted === 'string' &&
    typeof value.duration === 'string' &&
    typeof value.relativeStart === 'string' &&
    typeof value.isUpcoming === 'boolean' &&
    typeof value.isPast === 'boolean' &&
    typeof value.isToday === 'boolean'
  );
}

/**
 * Check if a value is a valid payment display
 */
export function isValidPaymentDisplay(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.total === 'number' &&
    typeof value.totalFormatted === 'string' &&
    typeof value.currency === 'string' &&
    typeof value.isPaid === 'boolean'
  );
}

/**
 * Check if a value is a valid actions object
 */
export function isValidActions(value: any, requiredActions: string[]): boolean {
  if (!value || typeof value !== 'object') return false;

  return requiredActions.every((action) => typeof value[action] === 'boolean');
}

/**
 * Check if a BookingVM has all required fields
 */
export function isValidBookingVM(value: any): boolean {
  if (!value || typeof value !== 'object') return false;

  const hasRequiredFields =
    typeof value.id === 'string' &&
    isValidStatusDisplay(value.statusDisplay) &&
    isValidTimeDisplay(value.timeDisplay) &&
    value.rentalObjectDisplay &&
    value.guestDisplay &&
    isValidPaymentDisplay(value.paymentDisplay) &&
    isValidActions(value.actions, ['canConfirm', 'canCancel', 'canEdit', 'canComplete']);

  return hasRequiredFields;
}

/**
 * Check if a value is a valid ViewModel (has id and proper structure)
 */
export function isValidViewModel(value: any, requiredFields: string[]): boolean {
  if (!value || typeof value !== 'object') return false;
  if (typeof value.id !== 'string') return false;

  return requiredFields.every((field) => value[field] !== undefined);
}

/**
 * Check if a date string is in ISO format
 */
export function isISODateString(value: any): boolean {
  if (typeof value !== 'string') return false;
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return isoRegex.test(value);
}

/**
 * Check if a value is a valid locale string
 */
export function isValidLocale(value: any): boolean {
  if (typeof value !== 'string') return false;
  const localeRegex = /^[a-z]{2}-[A-Z]{2}$/;
  return localeRegex.test(value);
}

/**
 * Assert that all items in array are valid ViewModels
 */
export function assertValidViewModels(items: any[], validator: (item: any) => boolean): void {
  items.forEach((item, index) => {
    if (!validator(item)) {
      throw new Error(`Item at index ${index} is not a valid ViewModel: ${JSON.stringify(item)}`);
    }
  });
}

/**
 * Custom matcher type definitions for TypeScript
 */
export interface CustomMatchers<R = unknown> {
  toBeValidStatusDisplay(): R;
  toBeValidTimeDisplay(): R;
  toBeValidPaymentDisplay(): R;
  toBeValidBookingVM(): R;
  toBeValidViewModel(requiredFields: string[]): R;
  toBeISODateString(): R;
  toBeValidLocale(): R;
}

/**
 * Extend Vitest matchers
 *
 * Usage in vitest.setup.ts:
 * ```typescript
 * import { expect } from 'vitest';
 * import { extendMatchers } from '@xala-technologies/guardrails/testing';
 *
 * extendMatchers(expect);
 * ```
 */
export function extendMatchers(expect: any) {
  expect.extend({
    toBeValidStatusDisplay(received: any) {
      const pass = isValidStatusDisplay(received);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be a valid status display`
            : `Expected value to be a valid status display with label (string) and variant (success|warning|error|info|neutral)`,
      };
    },
    toBeValidTimeDisplay(received: any) {
      const pass = isValidTimeDisplay(received);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be a valid time display`
            : `Expected value to be a valid time display with all required time fields`,
      };
    },
    toBeValidPaymentDisplay(received: any) {
      const pass = isValidPaymentDisplay(received);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be a valid payment display`
            : `Expected value to be a valid payment display with total, totalFormatted, currency, and isPaid`,
      };
    },
    toBeValidBookingVM(received: any) {
      const pass = isValidBookingVM(received);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be a valid BookingVM`
            : `Expected value to be a valid BookingVM with all required fields`,
      };
    },
    toBeValidViewModel(received: any, requiredFields: string[]) {
      const pass = isValidViewModel(received, requiredFields);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be a valid ViewModel`
            : `Expected value to be a valid ViewModel with fields: ${requiredFields.join(', ')}`,
      };
    },
    toBeISODateString(received: any) {
      const pass = isISODateString(received);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be an ISO date string`
            : `Expected value to be an ISO date string (YYYY-MM-DDTHH:mm:ss.sssZ)`,
      };
    },
    toBeValidLocale(received: any) {
      const pass = isValidLocale(received);
      return {
        pass,
        message: () =>
          pass
            ? `Expected value not to be a valid locale`
            : `Expected value to be a valid locale string (e.g., nb-NO, en-US)`,
      };
    },
  });
}
