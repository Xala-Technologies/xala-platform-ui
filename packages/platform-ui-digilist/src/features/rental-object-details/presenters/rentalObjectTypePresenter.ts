/**
 * Rental Object Type Presenter
 *
 * Configuration-driven presenter that controls how each rental object type
 * is displayed. This enables dynamic, type-specific rendering without
 * hardcoding logic in components.
 *
 * @module @xala-technologies/platform-ui/features/rental-object-details/presenters
 */

import type { KeyFacts, BookingMode } from '../types';

// Local type definition to avoid workspace import issues
export type RentalObjectType = 'SPACE' | 'RESOURCE' | 'EVENT' | 'SERVICE' | 'VEHICLE' | 'OTHER';

// =============================================================================
// Presenter Configuration Types
// =============================================================================

export interface KeyFactConfig {
  key: keyof KeyFacts;
  icon: string;
  labelKey: string;
  format?: (value: unknown, keyFacts: KeyFacts) => string;
  show: (keyFacts: KeyFacts) => boolean;
  priority: number;
}

export interface ActivityTabConfig {
  labelKey: string;
  type: 'events' | 'rentals' | 'sessions';
  showCalendar: boolean;
  showTimeline: boolean;
  emptyStateKey: string;
}

export interface RentalObjectTypeConfig {
  type: RentalObjectType;
  labelKey: string;
  iconName: string;
  keyFacts: KeyFactConfig[];
  activityTab: ActivityTabConfig;
  showOpeningHours: boolean;
  showCapacity: boolean;
  showArea: boolean;
  amenityCategories: string[];
  defaultBookingMode: BookingMode;
  emptyStates: {
    description: string;
    amenities: string;
    rules: string;
    faq: string;
    activity: string;
  };
}

// =============================================================================
// Key Fact Formatters
// =============================================================================

const formatCapacity = (value: unknown, keyFacts: KeyFacts): string => {
  const capacity = value as number;
  const label = keyFacts.capacityLabel || 'personer';
  return `${capacity} ${label}`;
};

const formatArea = (value: unknown, keyFacts: KeyFacts): string => {
  const area = value as number;
  const unit = keyFacts.areaUnit === 'sqft' ? 'sq ft' : 'm²';
  return `${area} ${unit}`;
};

const formatQuantity = (value: unknown, keyFacts: KeyFacts): string => {
  const qty = value as number;
  const label = keyFacts.unitLabel || 'enheter';
  return `${qty} ${label}`;
};

const formatDuration = (value: unknown): string => {
  return value as string;
};

const formatAccessibility = (value: unknown): string => {
  return value ? 'Universell utforming' : '';
};

const formatBookingMode = (v: unknown): string => {
  const modes: Record<string, string> = {
    SINGLE_SLOT: 'Timebasert',
    IN_GAME: 'Live booking',
    RECURRING: 'Gjentakende',
  };
  return modes[v as string] || '';
};

const formatCondition = (v: unknown): string => {
  const conditions: Record<string, string> = {
    new: 'Ny',
    good: 'God stand',
    fair: 'Brukbar stand',
  };
  return conditions[v as string] || '';
};

// =============================================================================
// Presenter Configurations per Type
// =============================================================================

const spaceConfig: RentalObjectTypeConfig = {
  type: 'SPACE',
  labelKey: 'listingTypes.space',
  iconName: 'building',
  keyFacts: [
    {
      key: 'capacity',
      icon: 'users',
      labelKey: 'keyFacts.capacity',
      format: formatCapacity,
      show: (kf) => !!kf.capacity && kf.capacity > 0,
      priority: 1,
    },
    {
      key: 'area',
      icon: 'maximize',
      labelKey: 'keyFacts.area',
      format: formatArea,
      show: (kf) => !!kf.area && kf.area > 0,
      priority: 2,
    },
    {
      key: 'bookingMode',
      icon: 'calendar',
      labelKey: 'keyFacts.bookingMode',
      format: formatBookingMode,
      show: (kf) => !!kf.bookingMode,
      priority: 3,
    },
    {
      key: 'wheelchairAccessible',
      icon: 'accessibility',
      labelKey: 'keyFacts.accessibility',
      format: formatAccessibility,
      show: (kf) => !!kf.wheelchairAccessible,
      priority: 4,
    },
  ],
  activityTab: {
    labelKey: 'activity.calendar',
    type: 'events',
    showCalendar: true,
    showTimeline: true,
    emptyStateKey: 'empty.noEvents',
  },
  showOpeningHours: true,
  showCapacity: true,
  showArea: true,
  amenityCategories: ['equipment', 'comfort', 'technology', 'accessibility'],
  defaultBookingMode: 'SINGLE_SLOT',
  emptyStates: {
    description: 'rentalObject.emptyState.description',
    amenities: 'rentalObject.emptyState.amenities.space',
    rules: 'rentalObject.emptyState.rules.space',
    faq: 'rentalObject.emptyState.faq',
    activity: 'rentalObject.emptyState.activity.space',
  },
};

const resourceConfig: RentalObjectTypeConfig = {
  type: 'RESOURCE',
  labelKey: 'listingTypes.resource',
  iconName: 'tool',
  keyFacts: [
    {
      key: 'quantity',
      icon: 'package',
      labelKey: 'keyFacts.quantity',
      format: formatQuantity,
      show: (kf) => !!kf.quantity && kf.quantity > 0,
      priority: 1,
    },
    {
      key: 'condition',
      icon: 'check-circle',
      labelKey: 'keyFacts.condition',
      format: formatCondition,
      show: (kf) => !!kf.condition,
      priority: 2,
    },
    {
      key: 'bookingMode',
      icon: 'calendar',
      labelKey: 'keyFacts.bookingMode',
      format: formatBookingMode,
      show: (kf) => !!kf.bookingMode,
      priority: 3,
    },
  ],
  activityTab: {
    labelKey: 'activity.history',
    type: 'rentals',
    showCalendar: false,
    showTimeline: true,
    emptyStateKey: 'empty.noRentals',
  },
  showOpeningHours: false,
  showCapacity: false,
  showArea: false,
  amenityCategories: ['included', 'accessories'],
  defaultBookingMode: 'SINGLE_SLOT',
  emptyStates: {
    description: 'rentalObject.emptyState.description',
    amenities: 'rentalObject.emptyState.amenities.resource',
    rules: 'rentalObject.emptyState.rules.resource',
    faq: 'rentalObject.emptyState.faq',
    activity: 'rentalObject.emptyState.activity.resource',
  },
};

const eventConfig: RentalObjectTypeConfig = {
  type: 'EVENT',
  labelKey: 'listingTypes.event',
  iconName: 'calendar-event',
  keyFacts: [
    {
      key: 'capacity',
      icon: 'users',
      labelKey: 'keyFacts.seats',
      format: (v, kf) => `${v} ${kf.capacityLabel || 'plasser'}`,
      show: (kf) => !!kf.capacity && kf.capacity > 0,
      priority: 1,
    },
    {
      key: 'duration',
      icon: 'clock',
      labelKey: 'keyFacts.duration',
      format: formatDuration,
      show: (kf) => !!kf.duration,
      priority: 2,
    },
    {
      key: 'sessions',
      icon: 'repeat',
      labelKey: 'keyFacts.sessions',
      format: (v) => `${v} økter`,
      show: (kf) => !!kf.sessions && kf.sessions > 1,
      priority: 3,
    },
    {
      key: 'wheelchairAccessible',
      icon: 'accessibility',
      labelKey: 'keyFacts.accessibility',
      format: formatAccessibility,
      show: (kf) => !!kf.wheelchairAccessible,
      priority: 4,
    },
  ],
  activityTab: {
    labelKey: 'activity.sessions',
    type: 'sessions',
    showCalendar: true,
    showTimeline: false,
    emptyStateKey: 'empty.noSessions',
  },
  showOpeningHours: false,
  showCapacity: true,
  showArea: false,
  amenityCategories: ['included', 'accessibility'],
  defaultBookingMode: 'SINGLE_SLOT',
  emptyStates: {
    description: 'rentalObject.emptyState.description',
    amenities: 'rentalObject.emptyState.amenities.event',
    rules: 'rentalObject.emptyState.rules.event',
    faq: 'rentalObject.emptyState.faq',
    activity: 'rentalObject.emptyState.activity.event',
  },
};

const serviceConfig: RentalObjectTypeConfig = {
  type: 'SERVICE',
  labelKey: 'listingTypes.service',
  iconName: 'briefcase',
  keyFacts: [
    {
      key: 'duration',
      icon: 'clock',
      labelKey: 'keyFacts.duration',
      format: formatDuration,
      show: (kf) => !!kf.duration,
      priority: 1,
    },
    {
      key: 'capacity',
      icon: 'users',
      labelKey: 'keyFacts.capacity',
      format: formatCapacity,
      show: (kf) => !!kf.capacity && kf.capacity > 0,
      priority: 2,
    },
  ],
  activityTab: {
    labelKey: 'activity.bookings',
    type: 'rentals',
    showCalendar: true,
    showTimeline: false,
    emptyStateKey: 'empty.noBookings',
  },
  showOpeningHours: true,
  showCapacity: true,
  showArea: false,
  amenityCategories: ['included'],
  defaultBookingMode: 'SINGLE_SLOT',
  emptyStates: {
    description: 'rentalObject.emptyState.description',
    amenities: 'rentalObject.emptyState.amenities.service',
    rules: 'rentalObject.emptyState.rules.service',
    faq: 'rentalObject.emptyState.faq',
    activity: 'rentalObject.emptyState.activity.service',
  },
};

const vehicleConfig: RentalObjectTypeConfig = {
  type: 'VEHICLE',
  labelKey: 'listingTypes.vehicle',
  iconName: 'car',
  keyFacts: [
    {
      key: 'capacity',
      icon: 'users',
      labelKey: 'keyFacts.seats',
      format: (v, kf) => `${v} ${kf.capacityLabel || 'seter'}`,
      show: (kf) => !!kf.capacity && kf.capacity > 0,
      priority: 1,
    },
    {
      key: 'condition',
      icon: 'check-circle',
      labelKey: 'keyFacts.condition',
      format: formatCondition,
      show: (kf) => !!kf.condition,
      priority: 2,
    },
  ],
  activityTab: {
    labelKey: 'activity.rentals',
    type: 'rentals',
    showCalendar: true,
    showTimeline: true,
    emptyStateKey: 'empty.noRentals',
  },
  showOpeningHours: false,
  showCapacity: true,
  showArea: false,
  amenityCategories: ['features', 'accessories'],
  defaultBookingMode: 'SINGLE_SLOT',
  emptyStates: {
    description: 'rentalObject.emptyState.description',
    amenities: 'rentalObject.emptyState.amenities.vehicle',
    rules: 'rentalObject.emptyState.rules.vehicle',
    faq: 'rentalObject.emptyState.faq',
    activity: 'rentalObject.emptyState.activity.vehicle',
  },
};

const otherConfig: RentalObjectTypeConfig = {
  type: 'OTHER',
  labelKey: 'listingTypes.other',
  iconName: 'grid',
  keyFacts: [
    {
      key: 'capacity',
      icon: 'users',
      labelKey: 'keyFacts.capacity',
      format: formatCapacity,
      show: (kf) => !!kf.capacity && kf.capacity > 0,
      priority: 1,
    },
    {
      key: 'quantity',
      icon: 'package',
      labelKey: 'keyFacts.quantity',
      format: formatQuantity,
      show: (kf) => !!kf.quantity && kf.quantity > 0,
      priority: 2,
    },
    {
      key: 'bookingMode',
      icon: 'calendar',
      labelKey: 'keyFacts.bookingMode',
      format: formatBookingMode,
      show: (kf) => !!kf.bookingMode,
      priority: 3,
    },
  ],
  activityTab: {
    labelKey: 'activity.calendar',
    type: 'rentals',
    showCalendar: true,
    showTimeline: true,
    emptyStateKey: 'empty.noHistory',
  },
  showOpeningHours: true,
  showCapacity: true,
  showArea: true,
  amenityCategories: ['general'],
  defaultBookingMode: 'SINGLE_SLOT',
  emptyStates: {
    description: 'rentalObject.emptyState.description',
    amenities: 'rentalObject.emptyState.amenities.other',
    rules: 'rentalObject.emptyState.rules.other',
    faq: 'rentalObject.emptyState.faq',
    activity: 'rentalObject.emptyState.activity.other',
  },
};

// =============================================================================
// Configuration Map
// =============================================================================

const configMap: Record<RentalObjectType, RentalObjectTypeConfig> = {
  SPACE: spaceConfig,
  RESOURCE: resourceConfig,
  EVENT: eventConfig,
  SERVICE: serviceConfig,
  VEHICLE: vehicleConfig,
  OTHER: otherConfig,
};

// =============================================================================
// Presenter Class
// =============================================================================

export class RentalObjectTypePresenter {
  private config: RentalObjectTypeConfig;

  constructor(rentalObjectType: RentalObjectType) {
    this.config = configMap[rentalObjectType] || configMap.OTHER;
  }

  get type(): RentalObjectType {
    return this.config.type;
  }

  get labelKey(): string {
    return this.config.labelKey;
  }

  get iconName(): string {
    return this.config.iconName;
  }

  get showOpeningHours(): boolean {
    return this.config.showOpeningHours;
  }

  get activityTabConfig(): ActivityTabConfig {
    return this.config.activityTab;
  }

  get amenityCategories(): string[] {
    return this.config.amenityCategories;
  }

  get defaultBookingMode(): BookingMode {
    return this.config.defaultBookingMode;
  }

  /**
   * Get the key facts to display, sorted by priority
   */
  getKeyFacts(keyFacts: KeyFacts): Array<{
    key: string;
    icon: string;
    label: string;
    value: string;
  }> {
    return this.config.keyFacts
      .filter((config) => config.show(keyFacts))
      .sort((a, b) => a.priority - b.priority)
      .map((config) => ({
        key: config.key,
        icon: config.icon,
        label: config.labelKey,
        value: config.format
          ? config.format(keyFacts[config.key], keyFacts)
          : String(keyFacts[config.key] || ''),
      }));
  }

  /**
   * Get empty state message for a section
   */
  getEmptyState(section: keyof RentalObjectTypeConfig['emptyStates']): string {
    return this.config.emptyStates[section];
  }

  /**
   * Check if a specific feature should be shown
   */
  shouldShow(feature: 'openingHours' | 'capacity' | 'area'): boolean {
    switch (feature) {
      case 'openingHours':
        return this.config.showOpeningHours;
      case 'capacity':
        return this.config.showCapacity;
      case 'area':
        return this.config.showArea;
      default:
        return false;
    }
  }
}

// =============================================================================
// Factory Function
// =============================================================================

export function createPresenter(rentalObjectType: RentalObjectType): RentalObjectTypePresenter {
  return new RentalObjectTypePresenter(rentalObjectType);
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get rental object type label
 */
export function getRentalObjectTypeLabel(type: RentalObjectType): string {
  const labels: Record<RentalObjectType, string> = {
    SPACE: 'Lokale',
    RESOURCE: 'Utstyr',
    EVENT: 'Arrangement',
    SERVICE: 'Tjeneste',
    VEHICLE: 'Kjøretøy',
    OTHER: 'Annet',
  };
  return labels[type] || labels.OTHER;
}

/**
 * Get booking mode label
 */
export function getBookingModeLabel(mode: BookingMode): string {
  const labels: Record<BookingMode, string> = {
    SINGLE_SLOT: 'Enkeltbooking',
    IN_GAME: 'Live booking',
    RECURRING: 'Gjentakende',
  };
  return labels[mode] || '';
}
