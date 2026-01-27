/**
 * Digdir Primitive Wrappers - Index
 *
 * This is the SINGLE SOURCE OF TRUTH for all Digdir Designsystemet wrappers.
 * All components here are thin wrappers that:
 * - Normalize prop names for consistency
 * - Enforce accessibility defaults
 * - Provide i18n-ready labels where applicable
 * - Use design tokens for any custom styling
 *
 * @example
 * // Import from this module for all primitives
 * import { Button, Textfield, Select } from '../digdir';
 */

// =============================================================================
// Form Controls (Tier 1) - Custom wrappers with enhanced features
// =============================================================================
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Textfield, Input } from './Textfield';
export type { TextfieldProps } from './Textfield';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

export { Select } from './Select';
export type { SelectProps } from './Select';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { Radio } from './Radio';
export type { RadioProps } from './Radio';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

// =============================================================================
// Passthrough Components - Direct re-exports with stable API
// =============================================================================
export {
    // Typography
    Paragraph,
    Heading,
    Label,
    // Navigation
    Link,
    // Feedback
    Alert,
    Spinner,
    Tooltip,
    // Overlays
    Dialog,
    DialogTrigger,
    DialogTriggerContext,
    DialogBlock,
    // Data Display
    Tag,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderCell,
    TableFoot,
    Pagination,
    Breadcrumbs,
    BreadcrumbsLink,
    BreadcrumbsList,
    // Layout
    Card,
    CardBlock,
    Avatar,
    Chip,
    Divider,
    Details,
    DetailsSummary,
    DetailsContent,
    // Dropdowns
    Dropdown,
    DropdownTrigger,
    DropdownList,
    DropdownItem,
    DropdownHeading,
    // Lists
    List,
    ListItem,
    ListOrdered,
    ListUnordered,
    // Toggle & Tabs
    ToggleGroup,
    ToggleGroupItem,
    Tabs,
    TabsList,
    TabsTab,
    TabsPanel,
    // Form Utilities
    Combobox,
    Search,
    Field,
    Fieldset,
    ValidationMessage,
    // Error Handling
    ErrorSummary,
    ErrorSummaryHeading,
    ErrorSummaryList,
    ErrorSummaryItem,
    ErrorSummaryLink,
} from './passthrough';

export type {
    ParagraphProps,
    HeadingProps,
    LabelProps,
    LinkProps,
    AlertProps,
    SpinnerProps,
    TooltipProps,
    DialogProps,
    TagProps,
    TableProps,
    PaginationProps,
    BreadcrumbsProps,
    CardProps,
    AvatarProps,
    ChipProps,
    DividerProps,
    DetailsProps,
    DropdownProps,
    ListProps,
    ToggleGroupProps,
    TabsProps,
    ComboboxProps,
    SearchProps,
    FieldProps,
    FieldsetProps,
    ValidationMessageProps,
    ErrorSummaryProps,
} from './passthrough';
