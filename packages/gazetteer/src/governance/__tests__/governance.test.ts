/**
 * Governance Module Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
    GovernanceValidator,
    createValidator,
    createRule,
    GOVERNANCE_VERSION,
} from '../index'
import type { PageSpec, WidgetSpec, RouteSpec } from '../../types'

describe('GovernanceValidator', () => {
    let validator: GovernanceValidator

    beforeEach(() => {
        validator = createValidator()
    })

    describe('validatePage', () => {
        it('should pass validation for a valid page spec', () => {
            const page: PageSpec = {
                pageId: 'test-page',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: ['test.controller'],
                widgets: { content: [] },
                i18nRequiredKeys: ['pages.test.title'],
            }

            const result = validator.validatePage(page)

            expect(result.valid).toBe(true)
            expect(result.stats.errorCount).toBe(0)
        })

        it('should fail validation for page without pageId', () => {
            const page = {
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            } as unknown as PageSpec

            const result = validator.validatePage(page)

            expect(result.valid).toBe(false)
            expect(result.errors.some(e => e.rule === 'page-id-required')).toBe(true)
        })

        it('should warn when i18nRequiredKeys is empty', () => {
            const page: PageSpec = {
                pageId: 'test-page',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }

            const result = validator.validatePage(page)

            expect(result.valid).toBe(true) // warnings don't fail validation
            expect(result.stats.warningCount).toBeGreaterThan(0)
        })
    })

    describe('validateWidget', () => {
        it('should pass validation for a valid widget spec', () => {
            const widget: WidgetSpec = {
                widgetId: 'test-widget',
                type: 'DashboardHeader',
                props: {},
                bindings: {},
            }

            const result = validator.validateWidget(widget)

            expect(result.valid).toBe(true)
        })

        it('should fail validation for widget without widgetId', () => {
            const widget = {
                type: 'DashboardHeader',
                props: {},
            } as unknown as WidgetSpec

            const result = validator.validateWidget(widget)

            expect(result.valid).toBe(false)
            expect(result.errors.some(e => e.rule === 'widget-id-required')).toBe(true)
        })
    })

    describe('validateRoute', () => {
        it('should pass validation for a valid route spec', () => {
            const route: RouteSpec = {
                routeId: 'test-route',
                path: '/test',
                pageRef: 'test-page',
                navigation: {
                    labelKey: 'routes.test.label',
                    group: 'main',
                },
            }

            const result = validator.validateRoute(route)

            expect(result.valid).toBe(true)
        })

        it('should fail validation for route with invalid path', () => {
            const route: RouteSpec = {
                routeId: 'test-route',
                path: 'test', // missing leading /
                pageRef: 'test-page',
                navigation: {
                    labelKey: 'routes.test.label',
                    group: 'main',
                },
            }

            const result = validator.validateRoute(route)

            expect(result.valid).toBe(false)
            expect(result.errors.some(e => e.rule === 'route-path-format')).toBe(true)
        })

        it('should add info when access control is missing', () => {
            const route: RouteSpec = {
                routeId: 'test-route',
                path: '/test',
                pageRef: 'test-page',
                navigation: {
                    labelKey: 'routes.test.label',
                    group: 'main',
                },
            }

            const result = validator.validateRoute(route)

            expect(result.stats.infoCount).toBeGreaterThan(0)
        })
    })

    describe('custom rules', () => {
        it('should allow adding custom rules', () => {
            const customRule = createRule(
                'custom-rule',
                'Custom Rule',
                'error',
                (spec) => {
                    const page = spec as PageSpec
                    if (page.pageId === 'forbidden') {
                        return [{
                            path: 'pageId',
                            message: 'Forbidden page ID',
                            severity: 'error',
                            rule: 'custom-rule',
                        }]
                    }
                    return []
                }
            )

            validator.addRule(customRule)

            const page: PageSpec = {
                pageId: 'forbidden',
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            }

            const result = validator.validatePage(page)

            expect(result.valid).toBe(false)
            expect(result.errors.some(e => e.rule === 'custom-rule')).toBe(true)
        })

        it('should allow removing rules', () => {
            validator.removeRule('page-id-required')

            const page = {
                shellType: 'DataPageShell',
                layoutType: 'list',
                controllerRefs: [],
                widgets: { content: [] },
            } as unknown as PageSpec

            const result = validator.validatePage(page)

            expect(result.errors.some(e => e.rule === 'page-id-required')).toBe(false)
        })
    })

    describe('getRules', () => {
        it('should return all registered rules', () => {
            const rules = validator.getRules()

            expect(rules.length).toBeGreaterThan(0)
            expect(rules.some(r => r.id === 'page-id-required')).toBe(true)
        })
    })
})

describe('createValidator', () => {
    it('should create validator with built-in rules by default', () => {
        const validator = createValidator()
        const rules = validator.getRules()

        expect(rules.length).toBeGreaterThan(0)
    })

    it('should create validator without built-in rules when specified', () => {
        const validator = createValidator(false)
        const rules = validator.getRules()

        expect(rules.length).toBe(0)
    })
})

describe('GOVERNANCE_VERSION', () => {
    it('should be defined', () => {
        expect(GOVERNANCE_VERSION).toBe('1.0.0')
    })
})
