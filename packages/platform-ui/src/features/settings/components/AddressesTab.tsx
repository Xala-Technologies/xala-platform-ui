/**
 * AddressesTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/AddressesTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { AddressesTab as DSAddressesTab, type AddressData } from '../../../blocks/settings';

// Re-export the pure presentational component
export { AddressesTab } from '../../../blocks/settings';
export type { AddressesTabProps, AddressesTabLabels, AddressData, Address } from '../../../blocks/settings';

export default DSAddressesTab;
