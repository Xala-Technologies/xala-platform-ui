/**
 * AddressesTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/AddressesTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { AddressesTab as DSAddressesTab, type AddressData } from '@xala-technologies/platform-ui-core';

// Re-export the pure presentational component
export { AddressesTab } from '@xala-technologies/platform-ui-core';
export type {
  AddressesTabProps,
  AddressesTabLabels,
  AddressData,
  Address,
} from '@xala-technologies/platform-ui-core';

export default DSAddressesTab;
