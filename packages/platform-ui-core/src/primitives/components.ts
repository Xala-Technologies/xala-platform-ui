/**
 * @digdir/designsystemet-react Component Re-exports
 *
 * This is the SINGLE SOURCE OF TRUTH for all @digdir base components.
 * Import from here instead of directly from @digdir/designsystemet-react.
 *
 * Form controls are re-exported from src/digdir/ wrappers.
 * Other components are re-exported directly from Digdir or passthrough.
 *
 * @example
 * // Inside platform/ui modules:
 * import { Button, Paragraph } from '../primitives/components';
 *
 * // From apps:
 * import { Button, Paragraph } from '@xala-technologies/platform/ui';
 */

// =============================================================================
// Form Controls (via src/digdir/ wrappers)
// These wrappers add Xala-specific features: loading state, a11y, etc.
// =============================================================================
export {
  Button,
  type ButtonProps,
  Textfield,
  Input, // Alias for Textfield
  type TextfieldProps,
  Textarea,
  type TextareaProps,
  Checkbox,
  type CheckboxProps,
  Radio,
  type RadioProps,
  Switch,
  type SwitchProps,
  Select,
  type SelectProps,
} from '../digdir';

// =============================================================================
// Typography (passthrough from src/digdir/)
// =============================================================================
export { Paragraph, Heading, Label } from '../digdir';
export type { ParagraphProps, HeadingProps, LabelProps } from '../digdir';

// =============================================================================
// Form Utilities (passthrough from src/digdir/)
// =============================================================================
export { Combobox, Search, Field, Fieldset, ValidationMessage } from '../digdir';
export type {
  ComboboxProps,
  SearchProps,
  FieldProps,
  FieldsetProps,
  ValidationMessageProps,
} from '../digdir';

// =============================================================================
// Feedback (passthrough from src/digdir/)
// =============================================================================
export { Alert, Spinner, Tooltip } from '../digdir';
export type { AlertProps, SpinnerProps, TooltipProps } from '../digdir';

// =============================================================================
// Overlays (passthrough from src/digdir/)
// =============================================================================
export { Dialog, DialogTrigger, DialogTriggerContext, DialogBlock } from '../digdir';
export type { DialogProps } from '../digdir';

// =============================================================================
// Data Display (passthrough from src/digdir/)
// =============================================================================
export { Tag, Table, Pagination, Breadcrumbs } from '../digdir';
export type { TagProps, TableProps, PaginationProps } from '../digdir';
// Note: BreadcrumbsProps exported elsewhere, avoid duplicate

// Table compound components
export {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableFoot,
} from '../digdir';

// Breadcrumbs compound components
export { BreadcrumbsLink, BreadcrumbsList } from '../digdir';

// =============================================================================
// Layout (passthrough from src/digdir/)
// =============================================================================
export { Card, CardBlock, Avatar, Chip, Divider, Details, Link, List } from '../digdir';
export type { CardProps, AvatarProps, ChipProps, DividerProps, DetailsProps, ListProps } from '../digdir';

// Details compound components
export { DetailsSummary, DetailsContent } from '../digdir';

// List compound components
export { ListItem, ListOrdered, ListUnordered } from '../digdir';

// =============================================================================
// Navigation (passthrough from src/digdir/)
// =============================================================================
export { Dropdown, ToggleGroup } from '../digdir';
export type { DropdownProps, ToggleGroupProps } from '../digdir';
// Note: Tabs exported as DSTabs below to avoid conflict

// Dropdown compound components
export { DropdownTrigger, DropdownList, DropdownItem, DropdownHeading } from '../digdir';

// ToggleGroup compound components
export { ToggleGroupItem } from '../digdir';

// Tabs compound components - DSTabs is the raw Digdir Tabs (SimpleTabs exported as Tabs from composed/)
import { Tabs as TabsComponent, TabsList as TabsListComp, TabsTab as TabsTabComp, TabsPanel as TabsPanelComp } from '../digdir';
export { TabsComponent as DSTabs };
export { TabsListComp as TabsList, TabsTabComp as TabsTab, TabsPanelComp as TabsPanel };

// =============================================================================
// Error Handling (passthrough from src/digdir/)
// =============================================================================
export { ErrorSummary, ErrorSummaryHeading, ErrorSummaryList, ErrorSummaryItem, ErrorSummaryLink } from '../digdir';
export type { ErrorSummaryProps } from '../digdir';

// Note: Custom Badge, Tag, Avatar, Tooltip implementations in composed/ are deprecated
// Use official Designsystemet components exported above instead
