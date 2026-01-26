/**
 * Shared Mock Data
 *
 * Commonly used mock data structures for tests.
 * These are reusable across all packages.
 */

/**
 * Mock rental object name mappings
 */
export const mockRentalObjectNameMap = new Map([
  ['rental-1', 'Conference Room A'],
  ['rental-2', 'Conference Room B'],
  ['rental-3', 'Meeting Room 1'],
  ['rental-4', 'Meeting Room 2'],
  ['rental-5', 'Auditorium'],
]);

/**
 * Mock user name mappings
 */
export const mockUserNameMap = new Map([
  ['user-1', 'John Doe'],
  ['user-2', 'Jane Smith'],
  ['user-3', 'Bob Johnson'],
  ['user-4', 'Alice Williams'],
  ['user-5', 'Charlie Brown'],
]);

/**
 * Mock organization name mappings
 */
export const mockOrganizationNameMap = new Map([
  ['org-1', 'Acme Corporation'],
  ['org-2', 'TechStart AS'],
  ['org-3', 'Nordic Solutions'],
  ['org-4', 'Innovation Hub'],
  ['org-5', 'Digital Ventures'],
]);

/**
 * Mock locale configurations
 */
export const mockLocales = {
  norwegian: 'nb-NO',
  english: 'en-US',
  swedish: 'sv-SE',
  danish: 'da-DK',
};

/**
 * Mock date/time values for consistent testing
 */
export const mockDates = {
  now: '2024-01-15T10:00:00Z',
  yesterday: '2024-01-14T10:00:00Z',
  tomorrow: '2024-01-16T10:00:00Z',
  lastWeek: '2024-01-08T10:00:00Z',
  nextWeek: '2024-01-22T10:00:00Z',
  lastMonth: '2023-12-15T10:00:00Z',
  nextMonth: '2024-02-15T10:00:00Z',
  past: '2024-01-10T14:00:00Z',
  future: '2024-01-20T14:00:00Z',
};

/**
 * Mock transform options for adapters
 */
export const mockTransformOptions = {
  default: {
    locale: 'nb-NO',
    rentalObjectNameMap: mockRentalObjectNameMap,
    userNameMap: mockUserNameMap,
    organizationNameMap: mockOrganizationNameMap,
  },
  minimal: {
    locale: 'nb-NO',
  },
  english: {
    locale: 'en-US',
    rentalObjectNameMap: mockRentalObjectNameMap,
    userNameMap: mockUserNameMap,
  },
};

/**
 * Mock status values for testing
 */
export const mockStatuses = {
  booking: [
    'pending',
    'pending_approval',
    'approved',
    'confirmed',
    'rejected',
    'cancelled',
    'completed',
    'no_show',
  ],
  rentalObject: ['draft', 'active', 'inactive', 'archived', 'maintenance'],
  message: ['sent', 'delivered', 'read', 'failed', 'pending'],
  gdpr: ['pending', 'in_progress', 'completed', 'rejected', 'cancelled'],
  season: ['draft', 'open', 'closed', 'active', 'completed', 'cancelled'],
  organization: ['active', 'inactive', 'suspended', 'archived'],
  payment: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
};

/**
 * Mock currencies for testing
 */
export const mockCurrencies = ['NOK', 'EUR', 'USD', 'SEK', 'DKK'];

/**
 * Mock amenities for rental objects
 */
export const mockAmenities = [
  'projector',
  'whiteboard',
  'video_conference',
  'wifi',
  'coffee_machine',
  'kitchen',
  'parking',
  'accessible',
];

/**
 * Create a mock name map from an array of IDs
 */
export function createMockNameMap(ids: string[], namePrefix: string): Map<string, string> {
  return new Map(ids.map((id, index) => [id, `${namePrefix} ${index + 1}`]));
}

/**
 * Merge mock maps for testing
 */
export function mergeMockMaps<K, V>(...maps: Map<K, V>[]): Map<K, V> {
  const merged = new Map<K, V>();
  maps.forEach((map) => {
    map.forEach((value, key) => merged.set(key, value));
  });
  return merged;
}
