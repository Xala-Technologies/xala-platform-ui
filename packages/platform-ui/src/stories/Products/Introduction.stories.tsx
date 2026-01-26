import type { Meta, StoryObj } from '@storybook/react';
import { Card, Heading, Paragraph, Stack } from '../../index';

/**
 * # Products - Domain Extensions
 *
 * Products are domain-specific component implementations that extend platform-ui
 * for specific verticals like rental/booking platforms.
 *
 * ## Architecture
 *
 * ```
 * @xala-technologies/platform-ui (base)
 * ├── primitives/   - Core building blocks
 * ├── composed/     - Composite components
 * ├── blocks/       - Feature blocks
 * ├── patterns/     - Reusable patterns
 * └── shells/       - Layout shells
 *
 * @digilist/ui (domain extension)
 * └── features/
 *     ├── rental-objects/  - Listing management
 *     ├── booking/         - Booking engine
 *     ├── calendar/        - Availability
 *     └── seasons/         - Seasonal booking
 * ```
 *
 * ## Usage Pattern
 *
 * Domain packages like `@digilist/ui` import from platform-ui and add
 * domain-specific logic, types, and SDK connections.
 *
 * ```tsx
 * // In @digilist/ui - uses platform-ui components internally
 * import { Card, Heading } from '@xala-technologies/platform-ui';
 *
 * export function RentalObjectCard({ rentalObject }) {
 *   return (
 *     <Card>
 *       <Heading>{rentalObject.name}</Heading>
 *       ...
 *     </Card>
 *   );
 * }
 * ```
 *
 * ## Available Products
 *
 * | Product | Package | Description |
 * |---------|---------|-------------|
 * | Rental Objects | `@digilist/ui/features/rental-objects` | Listing management |
 * | Booking | `@digilist/ui/features/booking` | Booking engine |
 * | Calendar | `@digilist/ui/features/calendar` | Availability calendar |
 * | Seasons | `@digilist/ui/features/seasons` | Seasonal booking |
 */

function ProductsIntroduction() {
  return (
    <Stack spacing="6">
      <Card data-color="neutral">
        <Stack spacing="4">
          <Heading level={2} data-size="md">
            Products Overview
          </Heading>
          <Paragraph>
            Products are domain-specific extensions built on top of platform-ui. They combine base
            components with domain logic for specific verticals.
          </Paragraph>
        </Stack>
      </Card>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        <Card data-color="accent">
          <Stack spacing="2">
            <Heading level={3} data-size="sm">
              Rental Objects
            </Heading>
            <Paragraph data-size="sm">
              Components for displaying and managing rental listings.
            </Paragraph>
          </Stack>
        </Card>

        <Card data-color="accent">
          <Stack spacing="2">
            <Heading level={3} data-size="sm">
              Booking Engine
            </Heading>
            <Paragraph data-size="sm">Multi-step booking flow with mode support.</Paragraph>
          </Stack>
        </Card>

        <Card data-color="accent">
          <Stack spacing="2">
            <Heading level={3} data-size="sm">
              Calendar
            </Heading>
            <Paragraph data-size="sm">Availability calendar and timeline views.</Paragraph>
          </Stack>
        </Card>

        <Card data-color="accent">
          <Stack spacing="2">
            <Heading level={3} data-size="sm">
              Seasons
            </Heading>
            <Paragraph data-size="sm">Seasonal booking period management.</Paragraph>
          </Stack>
        </Card>
      </div>
    </Stack>
  );
}

const meta: Meta<typeof ProductsIntroduction> = {
  title: 'Products/Introduction',
  component: ProductsIntroduction,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Overview of domain-specific product extensions for platform-ui.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductsIntroduction>;

export const Overview: Story = {};
