/**
 * Component Layer Definitions
 *
 * Single source of truth for platform-ui component hierarchy.
 * Used by SpecEditor and governance workflows.
 */

export interface LayerDefinition {
  value: string;
  label: string;
  level: number;
  description: string;
}

export const COMPONENT_LAYERS: LayerDefinition[] = [
  {
    value: 'primitives',
    label: 'Primitives (Level 0)',
    level: 0,
    description: 'Thin Designsystemet wrappers (Button, Card, Input)',
  },
  {
    value: 'composed',
    label: 'Composed (Level 1)',
    level: 1,
    description: 'Multi-component compositions (DataTable, Modal, Tabs)',
  },
  {
    value: 'blocks',
    label: 'Blocks (Level 2)',
    level: 2,
    description: 'Feature-specific UI blocks (NotificationBell, UserMenu)',
  },
  {
    value: 'patterns',
    label: 'Patterns (Level 3)',
    level: 3,
    description: 'Reusable UI patterns (ResourceCard, SlotCalendar)',
  },
  {
    value: 'shells',
    label: 'Shells (Level 4)',
    level: 4,
    description: 'Layout components (AppLayout, DashboardLayout)',
  },
  {
    value: 'pages',
    label: 'Pages (Level 5)',
    level: 5,
    description: 'Page-level components',
  },
];

/** Get layer by value */
export const getLayer = (value: string): LayerDefinition | undefined =>
  COMPONENT_LAYERS.find((l) => l.value === value);

/** Get layer select options (value/label pairs) */
export const getLayerOptions = () =>
  COMPONENT_LAYERS.map(({ value, label }) => ({ value, label }));
