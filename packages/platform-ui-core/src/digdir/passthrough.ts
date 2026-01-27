/**
 * Typography and Layout Passthrough Wrappers
 *
 * These are direct re-exports from Digdir with consistent naming.
 * They provide a stable API surface while allowing future customization.
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
import type { HTMLAttributes, FC, PropsWithChildren } from 'react';

// =============================================================================
// Typography
// =============================================================================
export const Paragraph = DigdirParagraph;
export type ParagraphProps = Parameters<typeof DigdirParagraph>[0];

export const Heading = DigdirHeading;
export type HeadingProps = Parameters<typeof DigdirHeading>[0];

export const Label = DigdirLabel;
export type LabelProps = Parameters<typeof DigdirLabel>[0];

// =============================================================================
// Navigation & Links
// =============================================================================
export const Link = DigdirLink;
export type LinkProps = Parameters<typeof DigdirLink>[0];

// =============================================================================
// Feedback
// =============================================================================
export const Alert = DigdirAlert;
export type AlertProps = Parameters<typeof DigdirAlert>[0];

export const Spinner = DigdirSpinner;
export type SpinnerProps = Parameters<typeof DigdirSpinner>[0];

export const Tooltip = DigdirTooltip;
export type TooltipProps = Parameters<typeof DigdirTooltip>[0];

// =============================================================================
// Overlays
// =============================================================================
export const Dialog = DigdirDialog;
export type DialogProps = Parameters<typeof DigdirDialog>[0];

// Dialog compound parts
export const DialogTrigger = DigdirDialog.Trigger;
export const DialogTriggerContext = DigdirDialog.TriggerContext;
export const DialogBlock = DigdirDialog.Block;

// =============================================================================
// Data Display
// =============================================================================
export const Tag = DigdirTag;
export type TagProps = Parameters<typeof DigdirTag>[0];

export const Table = DigdirTable;
export type TableProps = Parameters<typeof DigdirTable>[0];

// Table compound parts
export const TableHead = DigdirTable.Head;
export const TableBody = DigdirTable.Body;
export const TableRow = DigdirTable.Row;
export const TableCell = DigdirTable.Cell;
export const TableHeaderCell = DigdirTable.HeaderCell;
export const TableFoot = DigdirTable.Foot;

export const Pagination = DigdirPagination;
export type PaginationProps = Parameters<typeof DigdirPagination>[0];

export const Breadcrumbs = DigdirBreadcrumbs;
export type BreadcrumbsProps = Parameters<typeof DigdirBreadcrumbs>[0];

// Breadcrumbs compound parts
export const BreadcrumbsLink = DigdirBreadcrumbs.Link;
export const BreadcrumbsList = DigdirBreadcrumbs.List;

// =============================================================================
// Layout
// =============================================================================
export const Card = DigdirCard;
export type CardProps = Parameters<typeof DigdirCard>[0];

// Card compound parts
export const CardBlock = DigdirCard.Block;

export const Avatar = DigdirAvatar;
export type AvatarProps = Parameters<typeof DigdirAvatar>[0];

// Chip is a compound component - export directly
export const Chip: typeof DigdirChip = DigdirChip;
export type ChipProps = HTMLAttributes<HTMLButtonElement>;

export const Divider = DigdirDivider;
export type DividerProps = Parameters<typeof DigdirDivider>[0];

export const Details = DigdirDetails;
export type DetailsProps = Parameters<typeof DigdirDetails>[0];

// Details compound parts
export const DetailsSummary = DigdirDetails.Summary;
export const DetailsContent = DigdirDetails.Content;

// =============================================================================
// Dropdowns & Menus
// =============================================================================
// Dropdown is complex - export with explicit type annotation
export const Dropdown: typeof DigdirDropdown = DigdirDropdown;
export type DropdownProps = HTMLAttributes<HTMLDivElement>;

// Dropdown compound parts
export const DropdownTrigger = DigdirDropdown.Trigger;
export const DropdownList = DigdirDropdown.List;
export const DropdownItem = DigdirDropdown.Item;
export const DropdownHeading = DigdirDropdown.Heading;

// =============================================================================
// Lists
// =============================================================================
// List is a compound component - export with explicit type annotation
export const List: typeof DigdirList = DigdirList;
export type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement>;

// List compound parts
export const ListItem = DigdirList.Item;
export const ListOrdered = DigdirList.Ordered;
export const ListUnordered = DigdirList.Unordered;

// =============================================================================
// Toggle & Tabs
// =============================================================================
export const ToggleGroup = DigdirToggleGroup;
export type ToggleGroupProps = Parameters<typeof DigdirToggleGroup>[0];

// ToggleGroup compound parts
export const ToggleGroupItem = DigdirToggleGroup.Item;

export const Tabs = DigdirTabs;
export type TabsProps = Parameters<typeof DigdirTabs>[0];

// Tabs compound parts
export const TabsList = DigdirTabs.List;
export const TabsTab = DigdirTabs.Tab;
export const TabsPanel = DigdirTabs.Panel;

// =============================================================================
// Form Utilities
// =============================================================================
export const Combobox = DigdirCombobox;
export type ComboboxProps = Parameters<typeof DigdirCombobox>[0];

export const Search = DigdirSearch;
export type SearchProps = Parameters<typeof DigdirSearch>[0];

export const Field = DigdirField;
export type FieldProps = Parameters<typeof DigdirField>[0];

export const Fieldset = DigdirFieldset;
export type FieldsetProps = Parameters<typeof DigdirFieldset>[0];

export const ValidationMessage = DigdirValidationMessage;
export type ValidationMessageProps = Parameters<typeof DigdirValidationMessage>[0];

// =============================================================================
// Error Handling
// =============================================================================
export const ErrorSummary = DigdirErrorSummary;
export type ErrorSummaryProps = Parameters<typeof DigdirErrorSummary>[0];

// ErrorSummary compound parts
export const ErrorSummaryHeading = DigdirErrorSummary.Heading;
export const ErrorSummaryList = DigdirErrorSummary.List;
export const ErrorSummaryItem = DigdirErrorSummary.Item;
export const ErrorSummaryLink = DigdirErrorSummary.Link;
