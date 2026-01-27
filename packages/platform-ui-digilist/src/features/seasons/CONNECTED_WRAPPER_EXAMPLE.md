# Connected Wrapper Example - Seasons Feature

This guide shows how to create connected wrappers for the pure presentational seasons components in your application.

## Overview

The seasons components (`SeasonCard`, `VenueCard`, `SeasonStatusBadge`) are now pure presentational components. They receive all data via props and have no SDK, i18n, or routing dependencies.

Your application needs to create "connected wrappers" that:

1. Fetch data from the SDK
2. Provide i18n translations
3. Handle routing and navigation
4. Pass all necessary props to the pure components

---

## File Structure

Recommended structure in your application:

```
app/
  features/
    seasons/
      ConnectedSeasonCard.tsx      # Wrapper for SeasonCard
      ConnectedVenueCard.tsx        # Wrapper for VenueCard
      ConnectedSeasonsList.tsx      # Full list with data fetching
      index.ts                      # Exports
```

---

## Example 1: ConnectedSeasonCard

```typescript
// app/features/seasons/ConnectedSeasonCard.tsx
import {
  SeasonCard,
  mapSeasonDTOToVM,
  getSeasonStatusColor,
  type SeasonCardLabels,
} from '@xala-technologies/platform-ui/features/seasons';
import type { Season } from '@digilist/client-sdk/types';
import { useT } from '@xala-technologies/platform/i18n';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

interface ConnectedSeasonCardProps {
  /** Season data from SDK */
  season: Season;
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Custom base path for navigation */
  basePath?: string;
  /** Custom apply handler (optional) */
  onApplyOverride?: (seasonId: string) => void;
}

/**
 * Connected wrapper for SeasonCard that handles:
 * - SDK data mapping
 * - i18n translations
 * - Routing and navigation
 * - Date formatting
 */
export function ConnectedSeasonCard({
  season,
  showActions = true,
  basePath = '/seasons',
  onApplyOverride,
}: ConnectedSeasonCardProps) {
  const t = useT();
  const navigate = useNavigate();

  // Map SDK Season to SeasonVM
  const seasonVM = useMemo(() => mapSeasonDTOToVM(season), [season]);

  // Get i18n labels
  const labels: SeasonCardLabels = useMemo(
    () => ({
      periodLabel: t('seasons.period'),
      deadlineLabel: t('seasons.applicationDeadline'),
      viewDetailsLabel: t('seasons.viewDetails'),
      applyLabel: t('seasons.applyNow'),
    }),
    [t]
  );

  // Get status display
  const statusDisplay = useMemo(
    () => ({
      label: t(`seasons.status.${seasonVM.status}`),
      color: getSeasonStatusColor(seasonVM.status),
    }),
    [t, seasonVM.status]
  );

  // Format date in Norwegian locale
  const formatDate = useCallback(
    (date: string) =>
      new Date(date).toLocaleDateString('nb-NO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    []
  );

  // Handle view details
  const handleViewDetails = useCallback(
    (id: string) => {
      navigate(`${basePath}/${id}`);
    },
    [navigate, basePath]
  );

  // Handle apply
  const handleApply = useCallback(
    (id: string) => {
      if (onApplyOverride) {
        onApplyOverride(id);
      } else {
        navigate(`${basePath}/${id}/apply`);
      }
    },
    [navigate, basePath, onApplyOverride]
  );

  return (
    <SeasonCard
      season={seasonVM}
      labels={labels}
      statusDisplay={statusDisplay}
      formatDate={formatDate}
      showActions={showActions}
      onViewDetails={handleViewDetails}
      onApply={handleApply}
    />
  );
}
```

---

## Example 2: ConnectedVenueCard

```typescript
// app/features/seasons/ConnectedVenueCard.tsx
import {
  VenueCard,
  mapVenueDTOToVM,
  type VenueCardLabels,
} from '@xala-technologies/platform-ui/features/seasons';
import type { RentalObject } from '@digilist/client-sdk/types';
import { useT } from '@xala-technologies/platform/i18n';
import { useMemo, useCallback } from 'react';

interface ConnectedVenueCardProps {
  /** Venue (rental object) from SDK */
  venue: RentalObject;
  /** Callback when apply is clicked */
  onApply?: (venueId: string) => void;
  /** Whether to show apply button */
  showApplyButton?: boolean;
  /** Max categories to display */
  maxCategories?: number;
}

/**
 * Connected wrapper for VenueCard that handles:
 * - SDK data mapping
 * - i18n translations
 * - Apply callback
 */
export function ConnectedVenueCard({
  venue,
  onApply,
  showApplyButton = true,
  maxCategories,
}: ConnectedVenueCardProps) {
  const t = useT();

  // Map SDK RentalObject to VenueVM
  const venueVM = useMemo(() => mapVenueDTOToVM(venue), [venue]);

  // Get i18n labels
  const labels: VenueCardLabels = useMemo(
    () => ({
      capacityLabel: t('common.capacity'),
      applyLabel: t('common.apply'),
    }),
    [t]
  );

  // Handle apply with callback
  const handleApply = useCallback(
    (id: string) => {
      onApply?.(id);
    },
    [onApply]
  );

  return (
    <VenueCard
      venue={venueVM}
      labels={labels}
      onApply={handleApply}
      showApplyButton={showApplyButton}
      maxCategories={maxCategories}
    />
  );
}
```

---

## Example 3: ConnectedSeasonsList (Full Page)

```typescript
// app/features/seasons/ConnectedSeasonsList.tsx
import { ConnectedSeasonCard } from './ConnectedSeasonCard';
import { useSeasons } from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';
import { Spinner, Heading, Paragraph } from '@xala-technologies/platform-ui/primitives';
import { useState, useCallback } from 'react';

/**
 * Full page component that:
 * - Fetches seasons from SDK
 * - Handles loading/error states
 * - Renders list of ConnectedSeasonCards
 */
export function ConnectedSeasonsList() {
  const t = useT();
  const { data: seasons, isLoading, error } = useSeasons();
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  const handleApply = useCallback((seasonId: string) => {
    setApplyingTo(seasonId);
    // TODO: Open application modal or navigate to application form
    console.log('Apply to season:', seasonId);
  }, []);

  if (error) {
    return (
      <div>
        <Heading level={2}>{t('common.error')}</Heading>
        <Paragraph>{error.message}</Paragraph>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner data-title={t('common.loading')} />;
  }

  if (!seasons || seasons.length === 0) {
    return (
      <div>
        <Heading level={2}>{t('seasons.empty.title')}</Heading>
        <Paragraph>{t('seasons.empty.message')}</Paragraph>
      </div>
    );
  }

  return (
    <div>
      <Heading level={1} style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        {t('seasons.title')}
      </Heading>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {seasons.map((season) => (
          <ConnectedSeasonCard
            key={season.id}
            season={season}
            onApplyOverride={handleApply}
          />
        ))}
      </div>

      {applyingTo && (
        <div>{/* Application modal or form */}</div>
      )}
    </div>
  );
}
```

---

## Example 4: With React Query and Error Handling

```typescript
// app/features/seasons/ConnectedSeasonCard.tsx (with enhanced error handling)
import {
  SeasonCard,
  mapSeasonDTOToVM,
  getSeasonStatusColor,
} from '@xala-technologies/platform-ui/features/seasons';
import type { Season } from '@digilist/client-sdk/types';
import { useT } from '@xala-technologies/platform/i18n';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@xala-technologies/platform/runtime';
import { useMutation } from '@tanstack/react-query';
import { applyToSeason } from '@digilist/client-sdk';

export function ConnectedSeasonCardWithMutation({ season }: { season: Season }) {
  const t = useT();
  const navigate = useNavigate();
  const toast = useToast();

  const seasonVM = mapSeasonDTOToVM(season);

  // Mutation for applying to season
  const applyMutation = useMutation({
    mutationFn: (seasonId: string) => applyToSeason(seasonId),
    onSuccess: () => {
      toast.success(t('seasons.applySuccess'));
      navigate('/applications');
    },
    onError: (error) => {
      toast.error(t('seasons.applyError', { error: error.message }));
    },
  });

  const labels = {
    periodLabel: t('seasons.period'),
    deadlineLabel: t('seasons.applicationDeadline'),
    viewDetailsLabel: t('seasons.viewDetails'),
    applyLabel: applyMutation.isPending ? t('common.applying') : t('seasons.applyNow'),
  };

  const statusDisplay = {
    label: t(`seasons.status.${seasonVM.status}`),
    color: getSeasonStatusColor(seasonVM.status),
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <SeasonCard
      season={seasonVM}
      labels={labels}
      statusDisplay={statusDisplay}
      formatDate={formatDate}
      onViewDetails={(id) => navigate(`/seasons/${id}`)}
      onApply={(id) => applyMutation.mutate(id)}
      showApplyButton={!applyMutation.isPending}
    />
  );
}
```

---

## Example 5: Custom Status Badge with i18n

```typescript
// app/components/SeasonStatusBadgeConnected.tsx
import {
  SeasonStatusBadge,
  getSeasonStatusColor,
  type SeasonStatus,
} from '@xala-technologies/platform-ui/features/seasons';
import { useT } from '@xala-technologies/platform/i18n';
import { useMemo } from 'react';

interface ConnectedSeasonStatusBadgeProps {
  status: SeasonStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function ConnectedSeasonStatusBadge({
  status,
  size = 'sm',
}: ConnectedSeasonStatusBadgeProps) {
  const t = useT();

  const label = useMemo(() => t(`seasons.status.${status}`), [t, status]);
  const color = useMemo(() => getSeasonStatusColor(status), [status]);

  return <SeasonStatusBadge label={label} color={color} size={size} />;
}
```

---

## Example 6: With Filter and Search

```typescript
// app/features/seasons/ConnectedSeasonsListWithFilters.tsx
import { ConnectedSeasonCard } from './ConnectedSeasonCard';
import { useSeasons } from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';
import {
  filterSeasonsByStatus,
  getActiveSeasons,
  type SeasonStatus,
  type SeasonVM,
} from '@xala-technologies/platform-ui/features/seasons';
import { useState, useMemo } from 'react';
import { Input, Select, Stack } from '@xala-technologies/platform-ui/primitives';

export function ConnectedSeasonsListWithFilters() {
  const t = useT();
  const { data: seasons, isLoading } = useSeasons();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SeasonStatus | 'all' | 'active'>('all');

  // Filter and search logic
  const filteredSeasons = useMemo(() => {
    if (!seasons) return [];

    let result: SeasonVM[] = seasons.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      status: s.status as SeasonStatus,
      startDate: s.startDate,
      endDate: s.endDate,
      applicationDeadline: s.applicationDeadline,
      totalApplications: s.totalApplications,
      approvedApplications: s.approvedApplications,
    }));

    // Filter by status
    if (statusFilter === 'active') {
      result = getActiveSeasons(result);
    } else if (statusFilter !== 'all') {
      result = filterSeasonsByStatus(result, [statusFilter]);
    }

    // Search by name
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(query));
    }

    return result;
  }, [seasons, statusFilter, searchQuery]);

  if (isLoading) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div>
      <Stack spacing="4" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        <Input
          placeholder={t('seasons.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as SeasonStatus | 'all' | 'active')}
        >
          <option value="all">{t('common.all')}</option>
          <option value="active">{t('seasons.filter.active')}</option>
          <option value="open">{t('seasons.filter.open')}</option>
          <option value="draft">{t('seasons.filter.draft')}</option>
          <option value="closed">{t('seasons.filter.closed')}</option>
          <option value="completed">{t('seasons.filter.completed')}</option>
          <option value="cancelled">{t('seasons.filter.cancelled')}</option>
        </Select>
      </Stack>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {filteredSeasons.map((season) => (
          <ConnectedSeasonCard key={season.id} season={season} />
        ))}
      </div>

      {filteredSeasons.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--ds-spacing-8)' }}>
          {t('seasons.noResults')}
        </div>
      )}
    </div>
  );
}
```

---

## i18n Translation Keys

Add these translation keys to your i18n files:

```json
{
  "seasons": {
    "title": "Seasons",
    "period": "Period",
    "applicationDeadline": "Application Deadline",
    "viewDetails": "View Details",
    "applyNow": "Apply Now",
    "applySuccess": "Application submitted successfully",
    "applyError": "Failed to submit application: {error}",
    "searchPlaceholder": "Search seasons...",
    "noResults": "No seasons found",
    "status": {
      "draft": "Draft",
      "open": "Open for Applications",
      "closed": "Closed",
      "completed": "Completed",
      "cancelled": "Cancelled"
    },
    "filter": {
      "active": "Active (Accepting Applications)",
      "open": "Open",
      "draft": "Draft",
      "closed": "Closed",
      "completed": "Completed",
      "cancelled": "Cancelled"
    },
    "empty": {
      "title": "No Seasons Available",
      "message": "There are currently no seasons available for booking."
    }
  },
  "common": {
    "capacity": "Capacity",
    "apply": "Apply",
    "applying": "Applying...",
    "all": "All",
    "loading": "Loading...",
    "error": "Error"
  }
}
```

---

## Testing Connected Wrappers

```typescript
// app/features/seasons/__tests__/ConnectedSeasonCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ConnectedSeasonCard } from '../ConnectedSeasonCard';
import { mockSeason } from './__mocks__/seasons';
import { BrowserRouter } from 'react-router-dom';

// Mock i18n
jest.mock('@xala-technologies/platform/i18n', () => ({
  useT: () => (key: string) => key,
}));

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ConnectedSeasonCard', () => {
  it('renders season information', () => {
    render(
      <BrowserRouter>
        <ConnectedSeasonCard season={mockSeason} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockSeason.name)).toBeInTheDocument();
  });

  it('navigates to details on click', () => {
    render(
      <BrowserRouter>
        <ConnectedSeasonCard season={mockSeason} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('seasons.viewDetails'));
    expect(mockNavigate).toHaveBeenCalledWith(`/seasons/${mockSeason.id}`);
  });
});
```

---

## Summary

**Key Patterns:**

1. **Data Mapping**: Use `mapSeasonDTOToVM()` and `mapVenueDTOToVM()` to convert SDK data to ViewModels
2. **i18n**: Use `useT()` in connected wrapper, pass translated strings as props
3. **Navigation**: Use `useNavigate()` in connected wrapper, pass callbacks as props
4. **Date Formatting**: Create locale-specific formatter function, pass as prop
5. **Status Display**: Use `getSeasonStatusColor()` helper + i18n for status badge
6. **Error Handling**: Use mutations and toasts in connected wrapper
7. **State Management**: Keep application state in connected wrapper, pass via props

**Benefits:**

- ✅ Pure components are testable without mocking SDK/i18n
- ✅ Connected wrappers can be tested with MSW for API mocking
- ✅ Clear separation of concerns (UI vs data/logic)
- ✅ Reusable pure components across different applications
- ✅ Easy to swap out SDK or i18n implementation
- ✅ Type-safe with full TypeScript support

**Next Steps:**

1. Copy one of these examples to your application
2. Customize for your specific needs
3. Add translations to your i18n files
4. Replace deprecated `SeasonCardConnected` and `VenueCardConnected` imports
5. Test with your real SDK and data
