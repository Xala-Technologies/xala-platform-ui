/**
 * SeasonCard Component Stories
 *
 * Demonstrates all states and variations of the pure SeasonCard component.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { SeasonCard } from '../../features/seasons';
import type { SeasonVM } from '../../features/seasons';

const meta: Meta<typeof SeasonCard> = {
  title: 'Features/Seasons/SeasonCard',
  component: SeasonCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pure presentational card component for displaying seasonal booking information. Fully controlled via props with no SDK or i18n dependencies.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeasonCard>;

// =============================================================================
// Mock Data
// =============================================================================

const mockSeasonOpen: SeasonVM = {
  id: '1',
  name: 'Summer Season 2025',
  description: 'Book your summer activities and venues for the upcoming season',
  status: 'open',
  startDate: '2025-06-01',
  endDate: '2025-08-31',
  applicationDeadline: '2025-05-15',
  totalApplications: 45,
  approvedApplications: 23,
};

const mockSeasonDraft: SeasonVM = {
  id: '2',
  name: 'Fall Season 2025',
  description: 'Autumn booking period - coming soon',
  status: 'draft',
  startDate: '2025-09-01',
  endDate: '2025-11-30',
  applicationDeadline: '2025-08-15',
};

const mockSeasonClosed: SeasonVM = {
  id: '3',
  name: 'Spring Season 2025',
  description: 'Spring booking period has ended',
  status: 'closed',
  startDate: '2025-03-01',
  endDate: '2025-05-31',
  applicationDeadline: '2025-02-15',
  totalApplications: 67,
  approvedApplications: 45,
};

const mockSeasonCompleted: SeasonVM = {
  id: '4',
  name: 'Winter Season 2024',
  description: 'Winter booking period - completed',
  status: 'completed',
  startDate: '2024-12-01',
  endDate: '2025-02-28',
  applicationDeadline: '2024-11-15',
  totalApplications: 89,
  approvedApplications: 67,
};

const mockSeasonCancelled: SeasonVM = {
  id: '5',
  name: 'Special Event Season',
  description: 'This season has been cancelled due to unforeseen circumstances',
  status: 'cancelled',
  startDate: '2025-07-01',
  endDate: '2025-07-31',
  applicationDeadline: '2025-06-15',
};

const defaultLabels = {
  periodLabel: 'Period',
  deadlineLabel: 'Application Deadline',
  viewDetailsLabel: 'View Details',
  applyLabel: 'Apply Now',
};

const norwegianLabels = {
  periodLabel: 'Periode',
  deadlineLabel: 'Søknadsfrist',
  viewDetailsLabel: 'Se detaljer',
  applyLabel: 'Søk nå',
};

const formatDateEnglish = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatDateNorwegian = (date: string) =>
  new Date(date).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

// =============================================================================
// Stories - Default States
// =============================================================================

export const OpenSeason: Story = {
  args: {
    season: mockSeasonOpen,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
    onApply: (id) => console.log('Apply to season:', id),
  },
};

export const DraftSeason: Story = {
  args: {
    season: mockSeasonDraft,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Draft',
      color: 'neutral',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
  },
};

export const ClosedSeason: Story = {
  args: {
    season: mockSeasonClosed,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Closed',
      color: 'warning',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
  },
};

export const CompletedSeason: Story = {
  args: {
    season: mockSeasonCompleted,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Completed',
      color: 'info',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
  },
};

export const CancelledSeason: Story = {
  args: {
    season: mockSeasonCancelled,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Cancelled',
      color: 'danger',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
  },
};

// =============================================================================
// Stories - Variations
// =============================================================================

export const NoDescription: Story = {
  args: {
    season: {
      ...mockSeasonOpen,
      description: undefined,
    },
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
    onApply: (id) => console.log('Apply to season:', id),
  },
};

export const NoActions: Story = {
  args: {
    season: mockSeasonOpen,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    showActions: false,
  },
};

export const ViewOnlyActions: Story = {
  args: {
    season: mockSeasonOpen,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
    // No onApply callback
  },
};

export const CustomApplyButtonVisibility: Story = {
  args: {
    season: mockSeasonClosed,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Closed',
      color: 'warning',
    },
    formatDate: formatDateEnglish,
    showApplyButton: true, // Force show apply button even though season is closed
    onViewDetails: (id) => console.log('View details:', id),
    onApply: (id) => console.log('Apply to season:', id),
  },
};

// =============================================================================
// Stories - Internationalization
// =============================================================================

export const NorwegianTranslation: Story = {
  args: {
    season: mockSeasonOpen,
    labels: norwegianLabels,
    statusDisplay: {
      label: 'Åpen for søknader',
      color: 'success',
    },
    formatDate: formatDateNorwegian,
    onViewDetails: (id) => console.log('Vis detaljer:', id),
    onApply: (id) => console.log('Søk til sesong:', id),
  },
};

// =============================================================================
// Stories - Interactive Examples
// =============================================================================

export const InteractiveExample: Story = {
  args: {
    season: mockSeasonOpen,
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => {
      alert(`Viewing details for season: ${id}`);
    },
    onApply: (id) => {
      alert(`Applying to season: ${id}`);
    },
  },
};

// =============================================================================
// Stories - Application Statistics
// =============================================================================

export const WithApplicationStats: Story = {
  args: {
    season: {
      ...mockSeasonOpen,
      totalApplications: 150,
      approvedApplications: 89,
    },
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
    onApply: (id) => console.log('Apply to season:', id),
  },
};

// =============================================================================
// Stories - Long Content
// =============================================================================

export const LongContent: Story = {
  args: {
    season: {
      ...mockSeasonOpen,
      name: 'Summer Season 2025 - Extended Community Activities and Cultural Events',
      description:
        'This is a comprehensive booking period for all summer activities, cultural events, community gatherings, and recreational facility rentals throughout the entire summer season.',
    },
    labels: defaultLabels,
    statusDisplay: {
      label: 'Open for Applications',
      color: 'success',
    },
    formatDate: formatDateEnglish,
    onViewDetails: (id) => console.log('View details:', id),
    onApply: (id) => console.log('Apply to season:', id),
  },
};
