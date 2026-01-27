/**
 * Typography and Layout Passthrough Wrappers
 *
 * These are direct re-exports from Digdir with consistent naming.
 * They provide a stable API surface while allowing future customization.
 * 
 * NOTE: All exports use explicit `typeof` type annotations to ensure
 * portable types when consumed from other packages.
 */
import {
    Paragraph as DigdirParagraph,
    Heading as DigdirHeading,
    Label as DigdirLabel,
    Link as DigdirLink,
    Alert as DigdirAlert,
    Spinner as DigdirSpinner,
    Tooltip as DigdirTooltip,
    Dialog as DigdirDialog,
    Tag as DigdirTag,
    Table as DigdirTable,
    Pagination as DigdirPagination,
    Breadcrumbs as DigdirBreadcrumbs,
    Card as DigdirCard,
    Avatar as DigdirAvatar,
    Chip as DigdirChip,
    Divider as DigdirDivider,
    Details as DigdirDetails,
    Dropdown as DigdirDropdown,
    List as DigdirList,
    ToggleGroup as DigdirToggleGroup,
    Tabs as DigdirTabs,
    Combobox as DigdirCombobox,
    Search as DigdirSearch,
    Field as DigdirField,
    Fieldset as DigdirFieldset,
    ValidationMessage as DigdirValidationMessage,
    ErrorSummary as DigdirErrorSummary,
} from '@digdir/designsystemet-react';
import type { HTMLAttributes, ComponentType } from 'react';

// =============================================================================
// Typography
// =============================================================================
export const Paragraph: typeof DigdirParagraph = DigdirParagraph;
export type ParagraphProps = Parameters<typeof DigdirParagraph>[0];

export const Heading: typeof DigdirHeading = DigdirHeading;
export type HeadingProps = Parameters<typeof DigdirHeading>[0];

export const Label: typeof DigdirLabel = DigdirLabel;
export type LabelProps = Parameters<typeof DigdirLabel>[0];

// =============================================================================
// Navigation & Links
// =============================================================================
export const Link: typeof DigdirLink = DigdirLink;
export type LinkProps = Parameters<typeof DigdirLink>[0];

// =============================================================================
// Feedback
// =============================================================================
export const Alert: typeof DigdirAlert = DigdirAlert;
export type AlertProps = Parameters<typeof DigdirAlert>[0];

export const Spinner: typeof DigdirSpinner = DigdirSpinner;
export type SpinnerProps = Parameters<typeof DigdirSpinner>[0];

export const Tooltip: typeof DigdirTooltip = DigdirTooltip;
export type TooltipProps = Parameters<typeof DigdirTooltip>[0];

// =============================================================================
// Overlays
// =============================================================================
export const Dialog: typeof DigdirDialog = DigdirDialog;
export type DialogProps = Parameters<typeof DigdirDialog>[0];

// Dialog compound parts - typed as the component type
export const DialogTrigger: typeof DigdirDialog.Trigger = DigdirDialog.Trigger;
export const DialogTriggerContext: typeof DigdirDialog.TriggerContext = DigdirDialog.TriggerContext;
export const DialogBlock: typeof DigdirDialog.Block = DigdirDialog.Block;

// =============================================================================
// Data Display
// =============================================================================
export const Tag: typeof DigdirTag = DigdirTag;
export type TagProps = Parameters<typeof DigdirTag>[0];

export const Table: typeof DigdirTable = DigdirTable;
export type TableProps = Parameters<typeof DigdirTable>[0];

// Table compound parts
export const TableHead: typeof DigdirTable.Head = DigdirTable.Head;
export const TableBody: typeof DigdirTable.Body = DigdirTable.Body;
export const TableRow: typeof DigdirTable.Row = DigdirTable.Row;
export const TableCell: typeof DigdirTable.Cell = DigdirTable.Cell;
export const TableHeaderCell: typeof DigdirTable.HeaderCell = DigdirTable.HeaderCell;
export const TableFoot: typeof DigdirTable.Foot = DigdirTable.Foot;

export const Pagination: typeof DigdirPagination = DigdirPagination;
export type PaginationProps = Parameters<typeof DigdirPagination>[0];

export const Breadcrumbs: typeof DigdirBreadcrumbs = DigdirBreadcrumbs;
export type BreadcrumbsProps = Parameters<typeof DigdirBreadcrumbs>[0];

// Breadcrumbs compound parts
export const BreadcrumbsLink: typeof DigdirBreadcrumbs.Link = DigdirBreadcrumbs.Link;
export const BreadcrumbsList: typeof DigdirBreadcrumbs.List = DigdirBreadcrumbs.List;

// =============================================================================
// Layout
// =============================================================================
export const Card: typeof DigdirCard = DigdirCard;
export type CardProps = Parameters<typeof DigdirCard>[0];

// Card compound parts
export const CardBlock: typeof DigdirCard.Block = DigdirCard.Block;

export const Avatar: typeof DigdirAvatar = DigdirAvatar;
export type AvatarProps = Parameters<typeof DigdirAvatar>[0];

// Chip is a compound component - export with explicit type
export const Chip: typeof DigdirChip = DigdirChip;
export type ChipProps = HTMLAttributes<HTMLButtonElement>;

export const Divider: typeof DigdirDivider = DigdirDivider;
export type DividerProps = Parameters<typeof DigdirDivider>[0];

export const Details: typeof DigdirDetails = DigdirDetails;
export type DetailsProps = Parameters<typeof DigdirDetails>[0];

// Details compound parts
export const DetailsSummary: typeof DigdirDetails.Summary = DigdirDetails.Summary;
export const DetailsContent: typeof DigdirDetails.Content = DigdirDetails.Content;

// =============================================================================
// Dropdowns & Menus
// =============================================================================
export const Dropdown: typeof DigdirDropdown = DigdirDropdown;
export type DropdownProps = HTMLAttributes<HTMLDivElement>;

// Dropdown compound parts
export const DropdownTrigger: typeof DigdirDropdown.Trigger = DigdirDropdown.Trigger;
export const DropdownList: typeof DigdirDropdown.List = DigdirDropdown.List;
export const DropdownItem: typeof DigdirDropdown.Item = DigdirDropdown.Item;
export const DropdownHeading: typeof DigdirDropdown.Heading = DigdirDropdown.Heading;

// =============================================================================
// Lists
// =============================================================================
export const List: typeof DigdirList = DigdirList;
export type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement>;

// List compound parts
export const ListItem: typeof DigdirList.Item = DigdirList.Item;
export const ListOrdered: typeof DigdirList.Ordered = DigdirList.Ordered;
export const ListUnordered: typeof DigdirList.Unordered = DigdirList.Unordered;

// =============================================================================
// Toggle & Tabs
// =============================================================================
export const ToggleGroup: typeof DigdirToggleGroup = DigdirToggleGroup;
export type ToggleGroupProps = Parameters<typeof DigdirToggleGroup>[0];

// ToggleGroup compound parts
export const ToggleGroupItem: typeof DigdirToggleGroup.Item = DigdirToggleGroup.Item;

export const Tabs: typeof DigdirTabs = DigdirTabs;
export type TabsProps = Parameters<typeof DigdirTabs>[0];

// Tabs compound parts
export const TabsList: typeof DigdirTabs.List = DigdirTabs.List;
export const TabsTab: typeof DigdirTabs.Tab = DigdirTabs.Tab;
export const TabsPanel: typeof DigdirTabs.Panel = DigdirTabs.Panel;

// =============================================================================
// Form Utilities
// =============================================================================
export const Combobox: typeof DigdirCombobox = DigdirCombobox;
export type ComboboxProps = Parameters<typeof DigdirCombobox>[0];

export const Search: typeof DigdirSearch = DigdirSearch;
export type SearchProps = Parameters<typeof DigdirSearch>[0];

export const Field: typeof DigdirField = DigdirField;
export type FieldProps = Parameters<typeof DigdirField>[0];

export const Fieldset: typeof DigdirFieldset = DigdirFieldset;
export type FieldsetProps = Parameters<typeof DigdirFieldset>[0];

export const ValidationMessage: typeof DigdirValidationMessage = DigdirValidationMessage;
export type ValidationMessageProps = Parameters<typeof DigdirValidationMessage>[0];

// =============================================================================
// Error Handling
// =============================================================================
export const ErrorSummary: typeof DigdirErrorSummary = DigdirErrorSummary;
export type ErrorSummaryProps = Parameters<typeof DigdirErrorSummary>[0];

// ErrorSummary compound parts
export const ErrorSummaryHeading: typeof DigdirErrorSummary.Heading = DigdirErrorSummary.Heading;
export const ErrorSummaryList: typeof DigdirErrorSummary.List = DigdirErrorSummary.List;
export const ErrorSummaryItem: typeof DigdirErrorSummary.Item = DigdirErrorSummary.Item;
export const ErrorSummaryLink: typeof DigdirErrorSummary.Link = DigdirErrorSummary.Link;
