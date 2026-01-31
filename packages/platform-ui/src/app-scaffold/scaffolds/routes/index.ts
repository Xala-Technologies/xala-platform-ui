/**
 * Routes Scaffolds Index
 *
 * Re-exports all route scaffold utilities.
 */

export {
  createProtectedRoutes,
  createProtectedRouteWrapper,
  createRoleRoutes,
  createContextRoutes,
  mergeRoutes,
} from './protected-routes';

export type {
  RouteConfig,
  ProtectedRoutesConfig,
  RoleRoutesConfig,
  ContextRoutesConfig,
} from './protected-routes';
