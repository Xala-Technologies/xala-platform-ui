/**
 * BookingPage
 *
 * Thin route component using the "Headless Domain" pattern.
 * Uses bookingFeature module for state management.
 *
 * Hook count: 4 (useFeature, useRentalObjectAvailability, useCreateBooking, useT)
 *
 * @module @xala-technologies/platform-ui/booking-engine
 */

import { useEffect, useMemo } from 'react';
import {
  useFeature,
  bookingFeature,
  type BookingSelection,
  type AvailabilitySlot,
  type DayAvailability,
} from '@digilist/client-sdk';
import { useRentalObjectAvailability, useCreateBooking } from '@digilist/client-sdk/hooks';
import type { BookingConfig, AdditionalService, BookingFormData } from '@digilist/contracts';
import { BookingEngine } from './BookingEngine';

/**
 * Props for the BookingPage
 */
export interface BookingPageProps {
  /** Rental object ID to book */
  rentalObjectId: string;
  /** Rental object name for display */
  rentalObjectName: string;
  /** Rental object image URL */
  rentalObjectImage?: string;
  /** Booking configuration */
  config: BookingConfig;
  /** Available additional services */
  additionalServices?: AdditionalService[];
  /** Callback when booking is successfully submitted */
  onBookingSuccess?: (bookingId: string) => void;
  /** Callback when booking is cancelled */
  onCancel?: () => void;
  /** Custom class name */
  className?: string;
}

/**
 * BookingPage - Production component using feature module pattern.
 *
 * Benefits:
 * - State management centralized in feature module
 * - View models provide pure data transformation
 * - Easy to test and maintain
 */
export function BookingPage({
  rentalObjectId,
  rentalObjectName,
  rentalObjectImage,
  config,
  additionalServices = [],
  onBookingSuccess,
  onCancel: _onCancel,
  className,
}: BookingPageProps) {
  // TODO: Inject t() via runtime/props instead of placeholder
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _t = (_key: string, _params?: unknown): string => _key;

  // Feature module provides state, selectors, and commands
  const { state, commands } = useFeature(bookingFeature);

  // Calculate availability date range based on booking mode
  const availabilityParams = useMemo(() => {
    const startDate = state.calendarDate || new Date();
    const endDate = new Date(startDate);

    switch (config.mode) {
      case 'slots':
        endDate.setDate(endDate.getDate() + 6);
        break;
      case 'daily':
      case 'dateRange':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      default:
        endDate.setDate(endDate.getDate() + 30);
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }, [state.calendarDate, config.mode]);

  // Fetch availability data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: availabilityData, isLoading: _isLoadingAvailability } = useRentalObjectAvailability(
    rentalObjectId,
    availabilityParams
  );

  // Booking mutation
  const createBookingMutation = useCreateBooking();

  // Initialize feature with config on mount
  useEffect(() => {
    commands.setConfig(config);
  }, [config, commands]);

  // Transform and sync availability data to feature state
  useEffect(() => {
    if (availabilityData?.data) {
      // Transform blocked slots to availability slots for the feature module
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _blockedSlots = availabilityData.data.blockedSlots || [];

      // The feature module expects slots in a different format
      // We'll generate available slots based on the blocked slots and config
      const slots: AvailabilitySlot[] = [];
      const dayAvailability: DayAvailability[] = [];

      // For now, pass empty arrays - the BookingEngine component
      // should handle availability display based on its own logic
      // This is a placeholder for proper transformation
      commands.setAvailableSlots(slots);
      commands.setDayAvailability(dayAvailability);
    }
  }, [availabilityData, commands]);

  // Handle step change
  const handleStepChange = (stepIndex: number) => {
    if (stepIndex < state.currentStep) {
      commands.previousStep(undefined);
    } else if (stepIndex === state.currentStep + 1) {
      commands.nextStep(undefined);
    } else {
      commands.goToStep(stepIndex);
    }
  };

  // Handle selection change from BookingEngine
  const handleSelectionChange = (selection: BookingSelection) => {
    // Update slots
    if (selection.slots) {
      // Clear current selection and set new ones
      const currentSlots = state.selectedSlots || [];
      currentSlots.forEach((slot: AvailabilitySlot) => {
        if (!selection.slots.find((s: AvailabilitySlot) => s.id === slot.id)) {
          commands.removeSlot(slot.id);
        }
      });
      selection.slots.forEach((slot: AvailabilitySlot) => {
        if (!currentSlots.find((s: AvailabilitySlot) => s.id === slot.id)) {
          commands.addSlot(slot);
        }
      });
    }

    // Update date range
    if (selection.dateRange) {
      commands.setDateRange({
        start: selection.dateRange.start,
        end: selection.dateRange.end,
      });
    }

    // Update tickets
    if (selection.tickets !== undefined) {
      commands.setTickets(selection.tickets);
    }
  };

  // Handle form submission
  const handleSubmit = async (selection: BookingSelection, formData: BookingFormData) => {
    try {
      commands.submitStart(undefined);

      // Extract start/end times from selection
      let startTime: string;
      let endTime: string;

      if (selection.slots.length > 0) {
        // Sort slots by date and time to get range
        const sortedSlots = [...selection.slots].sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          if (aDate.getTime() !== bDate.getTime()) {
            return aDate.getTime() - bDate.getTime();
          }
          return a.startTime.localeCompare(b.startTime);
        });

        const firstSlot = sortedSlots[0];
        const lastSlot = sortedSlots[sortedSlots.length - 1];

        const firstDate = new Date(firstSlot.date);
        const lastDate = new Date(lastSlot.date);

        startTime = `${firstDate.toISOString().split('T')[0]}T${firstSlot.startTime}:00`;
        endTime = `${lastDate.toISOString().split('T')[0]}T${lastSlot.endTime}:00`;
      } else if (selection.dateRange) {
        startTime = selection.dateRange.start.toISOString();
        endTime = selection.dateRange.end.toISOString();
      } else {
        // Instant booking - use current time
        startTime = new Date().toISOString();
        endTime = new Date().toISOString();
      }

      // Create booking note with customer details if provided
      const bookingNotes = [
        formData.notes,
        formData.name && `Contact: ${formData.name}`,
        formData.email && `Email: ${formData.email}`,
        formData.phone && `Phone: ${formData.phone}`,
      ]
        .filter(Boolean)
        .join('\n');

      const result = await createBookingMutation.mutateAsync({
        rentalObjectId,
        startTime,
        endTime,
        purpose: formData.purpose || '',
        notes: bookingNotes || undefined,
        attendees: formData.numberOfPeople || 1,
        additionalServices: formData.additionalServices,
      });

      commands.submitSuccess(undefined);
      onBookingSuccess?.(result.data.id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('booking.errors.submitFailed');
      commands.submitError(errorMessage);
    }
  };

  // Map state to BookingEngine props
  // Transform feature state slots to contracts-compatible format
  const mapSlotToContracts = (slot: AvailabilitySlot) => ({
    ...slot,
    date: typeof slot.date === 'string' ? new Date(slot.date) : slot.date,
  });

  const engineAvailableSlots = state.availableSlots.map(mapSlotToContracts);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _engineSelectedSlots = (state.selectedSlots || []).map(mapSlotToContracts);

  // Transform day availability to contracts format
  const engineDayAvailability = (state.dayAvailability || []).map((day) => ({
    date: typeof day.date === 'string' ? new Date(day.date) : day.date,
    isAvailable: day.isAvailable,
    availableSlots: day.availableSlots,
    totalSlots: day.totalSlots,
    minPrice: day.minPrice,
    maxPrice: day.maxPrice,
    status: day.status,
  }));

  return (
    <BookingEngine
      config={config}
      rentalObjectName={rentalObjectName}
      rentalObjectImage={rentalObjectImage}
      availableSlots={engineAvailableSlots}
      dayAvailability={engineDayAvailability}
      additionalServices={additionalServices}
      currentStep={state.currentStep}
      onStepChange={handleStepChange}
      onSubmit={handleSubmit}
      onSelectionChange={handleSelectionChange}
      className={className}
    />
  );
}

export default BookingPage;
