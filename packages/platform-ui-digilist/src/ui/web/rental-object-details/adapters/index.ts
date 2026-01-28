/**
 * Adapters for the rental object details feature.
 * These adapters provide integration with external services.
 */

// Favorites Provider
export {
  getFavoritesProvider,
  setFavoritesProvider,
  useFavorites,
  type FavoritesProvider,
  type UseFavoritesResult,
} from './favoritesProvider';

// Audit Provider
export {
  getAuditProvider,
  setAuditProvider,
  logAuditEvent,
  logError,
  logWarning,
  generateUUID,
  type AuditProvider,
} from './auditProvider';

// Share Tracker
export {
  buildShareUrl,
  isNativeShareAvailable,
  shareNative,
  shareCopyLink,
  shareEmail,
  shareWhatsApp,
  shareFacebook,
  shareTwitter,
  shareLinkedIn,
  shareWithAudit,
  type ShareMedium,
  type ShareData,
  type ShareResult,
} from './shareTracker';

// Realtime Client
export {
  getRealtimeClient,
  setRealtimeClient,
  useRealtimeUpdates,
  type RealtimeClient,
  type RealtimeEvent,
  type RealtimeEventHandler,
  type UseRealtimeResult,
} from './realtimeClient';
