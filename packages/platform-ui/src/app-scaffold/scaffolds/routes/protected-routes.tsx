/**
 * Protected Routes Scaffold
 *
 * Creates route wrappers for protected and role-based routing.
 */

import React from 'react';
import type { RouteObject } from 'react-router-dom';

export interface RouteConfig {
  /** Route path */
  path: string;
  /** Route element */
  element: React.ReactElement;
  /** Nested routes */
  children?: RouteConfig[];
  /** Required role for access */
  requiredRole?: string;
  /** Required context for access */
  requiredContext?: string;
  /** Route index */
  index?: boolean;
}

export interface ProtectedRoutesConfig {
  /** Routes to protect */
  routes: RouteConfig[];
  /** Login page path */
  loginPath?: string;
  /** Loading fallback */
  fallback?: React.ReactNode;
  /** Auth check function - provided by consumer */
  isAuthenticated?: () => boolean;
  /** Role check function - provided by consumer */
  hasRole?: (role: string) => boolean;
}

export interface RoleRoutesConfig {
  /** Routes organized by role */
  roles: Record<string, RouteConfig[]>;
  /** Default role if none match */
  defaultRole?: string;
}

export interface ContextRoutesConfig {
  /** Routes organized by context */
  contexts: Record<string, RouteConfig[]>;
  /** Default context if none match */
  defaultContext?: string;
}

/**
 * Convert RouteConfig to RouteObject
 */
function configToRoute(config: RouteConfig): RouteObject {
  const route: RouteObject = {
    path: config.path,
    element: config.element,
    index: config.index,
  };
  
  if (config.children) {
    route.children = config.children.map(configToRoute);
  }
  
  return route;
}

/**
 * Create protected route wrapper
 * This is a helper that consumers use to wrap their routes with protection logic
 */
export function createProtectedRouteWrapper(
  ProtectedComponent: React.ComponentType<{ children: React.ReactNode; requiredRole?: string }>
) {
  return function wrapRoute(config: RouteConfig): RouteObject {
    const wrappedElement = React.createElement(
      ProtectedComponent,
      { requiredRole: config.requiredRole, children: config.element }
    );

    
    const route: RouteObject = {
      path: config.path,
      element: wrappedElement,
      index: config.index,
    };
    
    if (config.children) {
      route.children = config.children.map(child => wrapRoute(child));
    }
    
    return route;
  };
}

/**
 * Create protected routes from configuration
 * Returns RouteObject array for use with react-router
 */
export function createProtectedRoutes(config: ProtectedRoutesConfig): RouteObject[] {
  return config.routes.map(configToRoute);
}

/**
 * Create role-based routes from configuration
 * Flattens role-organized routes into a single array
 */
export function createRoleRoutes(config: RoleRoutesConfig): RouteObject[] {
  const allRoutes: RouteObject[] = [];
  
  for (const [role, routes] of Object.entries(config.roles)) {
    routes.forEach(route => {
      allRoutes.push({
        ...configToRoute(route),
        // Store role in handle for access in route components
        handle: { requiredRole: role },
      });
    });
  }
  
  return allRoutes;
}

/**
 * Create context-based routes from configuration
 * Flattens context-organized routes into a single array
 */
export function createContextRoutes(config: ContextRoutesConfig): RouteObject[] {
  const allRoutes: RouteObject[] = [];
  
  for (const [context, routes] of Object.entries(config.contexts)) {
    routes.forEach(route => {
      allRoutes.push({
        ...configToRoute(route),
        // Store context in handle for access in route components
        handle: { requiredContext: context },
      });
    });
  }
  
  return allRoutes;
}

/**
 * Merge multiple route arrays
 */
export function mergeRoutes(...routeArrays: RouteObject[][]): RouteObject[] {
  return routeArrays.flat();
}
