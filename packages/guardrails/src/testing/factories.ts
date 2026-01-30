/**
 * Test Data Factories
 *
 * Reusable factory functions for creating mock data in tests.
 * These factories provide sensible defaults and allow overrides.
 */

/**
 * Create a mock booking with sensible defaults
 */
export function createMockBooking(overrides?: Partial<any>) {
  return {
    id: 'booking-1',
    tenantId: 'tenant-1',
    rentalObjectId: 'rental-1',
    userId: 'user-1',
    status: 'pending',
    paymentStatus: 'pending',
    startTime: '2024-01-20T14:00:00Z',
    endTime: '2024-01-20T16:00:00Z',
    totalPrice: '500',
    currency: 'NOK',
    version: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create a mock rental object with sensible defaults
 */
export function createMockRentalObject(overrides?: Partial<any>) {
  return {
    id: 'rental-1',
    tenantId: 'tenant-1',
    name: 'Conference Room A',
    description: 'A spacious conference room',
    status: 'active',
    type: 'room',
    capacity: 10,
    amenities: ['projector', 'whiteboard'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create a mock calendar event with sensible defaults
 */
export function createMockCalendarEvent(overrides?: Partial<any>) {
  return {
    id: 'event-1',
    rentalObjectId: 'rental-1',
    listingName: 'Conference Room A',
    title: 'Team Meeting',
    start: '2024-01-20T14:00:00Z',
    end: '2024-01-20T16:00:00Z',
    status: 'confirmed',
    userName: 'John Doe',
    ...overrides,
  };
}

/**
 * Create a mock message with sensible defaults
 */
export function createMockMessage(overrides?: Partial<any>) {
  return {
    id: 'message-1',
    tenantId: 'tenant-1',
    conversationId: 'conv-1',
    senderId: 'user-1',
    senderName: 'John Doe',
    content: 'Hello, this is a test message',
    status: 'sent',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create a mock GDPR request with sensible defaults
 */
export function createMockGdprRequest(overrides?: Partial<any>) {
  return {
    id: 'gdpr-1',
    tenantId: 'tenant-1',
    userId: 'user-1',
    type: 'data_export',
    status: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create a mock season with sensible defaults
 */
export function createMockSeason(overrides?: Partial<any>) {
  return {
    id: 'season-1',
    tenantId: 'tenant-1',
    name: 'Spring 2024',
    description: 'Spring season bookings',
    status: 'open',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    applicationDeadline: '2024-02-15',
    totalApplications: 10,
    approvedApplications: 5,
    allocatedApplications: 3,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create a mock organization with sensible defaults
 */
export function createMockOrganization(overrides?: Partial<any>) {
  return {
    id: 'org-1',
    tenantId: 'tenant-1',
    name: 'Acme Corporation',
    organizationNumber: '123456789',
    status: 'active',
    email: 'contact@acme.com',
    phone: '+4712345678',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create a mock user with sensible defaults
 */
export function createMockUser(overrides?: Partial<any>) {
  return {
    id: 'user-1',
    tenantId: 'tenant-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+4712345678',
    status: 'active',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    ...overrides,
  };
}

/**
 * Create multiple mock items with an incrementing ID
 */
export function createMockArray<T extends { id?: string }>(
  factory: (overrides?: Partial<T>) => T,
  count: number,
  baseOverrides?: Partial<T>
): T[] {
  return Array.from({ length: count }, (_, i) =>
    factory({ ...baseOverrides, id: `${baseOverrides?.id || 'item'}-${i + 1}` } as Partial<T>)
  );
}
