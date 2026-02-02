/**
 * Registry Tests
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
    GazetteerRegistryImpl,
    getRegistry,
    resetRegistry,
    createRegistry,
} from '../registry'
import type { RouteSpec, PageSpec, ActionSpec } from '../../types'

describe('GazetteerRegistryImpl', () => {
    let registry: GazetteerRegistryImpl

    beforeEach(() => {
        registry = createRegistry()
    })

    describe('page registration', () => {
        it('should register a page', () => {
            const page: PageSpec = {
                pageId: 'test-page',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }

            registry.registerPage(page)

            expect(registry.getPage('test-page')).toEqual(page)
        })

        it('should return undefined for unregistered page', () => {
            expect(registry.getPage('nonexistent')).toBeUndefined()
        })

        it('should list all registered pages', () => {
            const page1: PageSpec = {
                pageId: 'page-1',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }
            const page2: PageSpec = {
                pageId: 'page-2',
                shellType: 'DashboardShell',
                layoutType: 'dashboard',
                controllerRefs: [],
                widgets: { content: [] },
            }

            registry.registerPage(page1)
            registry.registerPage(page2)

            const pages = registry.getAllPages()
            expect(pages).toHaveLength(2)
            expect(pages.map(p => p.pageId)).toContain('page-1')
            expect(pages.map(p => p.pageId)).toContain('page-2')
        })
    })

    describe('route registration', () => {
        it('should register a route', () => {
            const route: RouteSpec = {
                routeId: 'test-route',
                path: '/test',
                pageRef: 'test-page',
                navigation: { labelKey: 'nav.test', group: 'main' },
            }

            registry.registerRoute(route)

            expect(registry.getRoute('test-route')).toEqual(route)
        })

        it('should get route by path', () => {
            const route: RouteSpec = {
                routeId: 'test-route',
                path: '/test-path',
                pageRef: 'test-page',
                navigation: { labelKey: 'nav.test', group: 'main' },
            }

            registry.registerRoute(route)

            expect(registry.getRouteByPath('/test-path')).toEqual(route)
        })

        it('should list all registered routes', () => {
            const route1: RouteSpec = {
                routeId: 'route-1',
                path: '/path-1',
                pageRef: 'page-1',
                navigation: { labelKey: 'nav.1', group: 'main' },
            }
            const route2: RouteSpec = {
                routeId: 'route-2',
                path: '/path-2',
                pageRef: 'page-2',
                navigation: { labelKey: 'nav.2', group: 'settings' },
            }

            registry.registerRoute(route1)
            registry.registerRoute(route2)

            const routes = registry.getAllRoutes()
            expect(routes).toHaveLength(2)
        })
    })

    describe('action registration', () => {
        it('should register an action', () => {
            const action: ActionSpec = {
                actionId: 'test-action',
                label: 'Test Action',
                testId: 'test-action-btn',
                behavior: { type: 'NAVIGATE', target: '/test' },
            }

            registry.registerAction(action)

            expect(registry.getAction('test-action')).toEqual(action)
        })

        it('should list all registered actions', () => {
            const action: ActionSpec = {
                actionId: 'action-1',
                label: 'Action 1',
                testId: 'action-1-btn',
                behavior: { type: 'NAVIGATE', target: '/action1' },
            }

            registry.registerAction(action)

            const actions = registry.getAllActions()
            expect(actions).toHaveLength(1)
        })
    })

    describe('bulk registration', () => {
        it('should register multiple specs at once', () => {
            const page: PageSpec = {
                pageId: 'bulk-page',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }
            const route: RouteSpec = {
                routeId: 'bulk-route',
                path: '/bulk',
                pageRef: 'bulk-page',
                navigation: { labelKey: 'nav.bulk', group: 'main' },
            }

            registry.registerSpecs({
                pages: [page],
                routes: [route],
            })

            expect(registry.getPage('bulk-page')).toBeDefined()
            expect(registry.getRoute('bulk-route')).toBeDefined()
        })
    })

    describe('stats', () => {
        it('should return correct stats', () => {
            const page: PageSpec = {
                pageId: 'stats-page',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }
            const route: RouteSpec = {
                routeId: 'stats-route',
                path: '/stats',
                pageRef: 'stats-page',
                navigation: { labelKey: 'nav.stats', group: 'main' },
            }

            registry.registerPage(page)
            registry.registerRoute(route)

            const stats = registry.getStats()
            expect(stats.pages).toBe(1)
            expect(stats.routes).toBe(1)
            expect(stats.total).toBe(2)
        })
    })

    describe('clear', () => {
        it('should clear all registrations', () => {
            const page: PageSpec = {
                pageId: 'clear-page',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }

            registry.registerPage(page)
            registry.clear()

            expect(registry.getPage('clear-page')).toBeUndefined()
            expect(registry.getStats().total).toBe(0)
        })
    })
})

describe('getRegistry', () => {
    afterEach(() => {
        resetRegistry()
    })

    it('should return a singleton instance', () => {
        const reg1 = getRegistry()
        const reg2 = getRegistry()

        expect(reg1).toBe(reg2)
    })
})

describe('resetRegistry', () => {
    it('should reset the singleton instance', () => {
        const reg1 = getRegistry()
        reg1.registerPage({
            pageId: 'reset-test',
            shellType: 'DataPageShell',
            layoutType: 'list',
            controllerRefs: [],
            widgets: { content: [] },
        })

        resetRegistry()

        const reg2 = getRegistry()
        expect(reg2.getPage('reset-test')).toBeUndefined()
    })
})

describe('createRegistry', () => {
    it('should create a new registry instance', () => {
        const reg1 = createRegistry()
        const reg2 = createRegistry()

        expect(reg1).not.toBe(reg2)
    })
})
