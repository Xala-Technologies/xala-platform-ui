/**
 * Binding Resolver Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
    BindingResolver,
    createBindingResolver,
    type BindingContext,
} from '../binding-resolver'

describe('BindingResolver', () => {
    let context: BindingContext
    let resolver: BindingResolver

    beforeEach(() => {
        context = {
            vm: {
                user: { name: 'John', role: 'admin' },
                items: [1, 2, 3],
                loading: false,
            },
            route: {
                id: '123',
                tab: 'settings',
            },
            i18n: (key: string) => `translated:${key}`,
        }
        resolver = new BindingResolver(context)
    })

    describe('resolve', () => {
        it('should resolve constant bindings', () => {
            const result = resolver.resolve({
                type: 'constant',
                value: 'test-value',
            })

            expect(result.value).toBe('test-value')
            expect(result.error).toBeUndefined()
        })

        it('should resolve route param bindings', () => {
            const result = resolver.resolve({
                type: 'routeParam',
                param: 'id',
            })

            expect(result.value).toBe('123')
        })

        it('should use default for missing route param', () => {
            const result = resolver.resolve({
                type: 'routeParam',
                param: 'missing',
                default: 'fallback',
            })

            expect(result.value).toBe('fallback')
        })

        it('should resolve context bindings', () => {
            const result = resolver.resolve({
                type: 'context',
                path: 'vm.user.name',
            })

            expect(result.value).toBe('John')
        })

        it('should use default for missing context path', () => {
            const result = resolver.resolve({
                type: 'context',
                path: 'vm.missing.path',
                default: 'default-value',
            })

            expect(result.value).toBe('default-value')
        })
    })

    describe('resolvePath', () => {
        it('should resolve vm paths', () => {
            const value = resolver.resolvePath('vm.user.name')
            expect(value).toBe('John')
        })

        it('should resolve nested paths', () => {
            const value = resolver.resolvePath('vm.user.role')
            expect(value).toBe('admin')
        })

        it('should resolve route paths', () => {
            const value = resolver.resolvePath('route.id')
            expect(value).toBe('123')
        })

        it('should return default for missing paths', () => {
            const value = resolver.resolvePath('vm.nonexistent', 'default')
            expect(value).toBe('default')
        })

        it('should throw for invalid binding paths', () => {
            expect(() => resolver.resolvePath('invalid.path')).toThrow('Invalid binding path')
        })
    })

    describe('setContext', () => {
        it('should update context', () => {
            resolver.setContext({ vm: { updated: true } })
            const value = resolver.resolvePath('vm.updated')
            expect(value).toBe(true)
        })
    })

    describe('applyTransform', () => {
        it('should return array unchanged with none transform', () => {
            const result = resolver.applyTransform([1, 2, 3], 'none')
            expect(result).toEqual([1, 2, 3])
        })

        it('should return first element', () => {
            const result = resolver.applyTransform([1, 2, 3], 'first')
            expect(result).toBe(1)
        })

        it('should return last element', () => {
            const result = resolver.applyTransform([1, 2, 3], 'last')
            expect(result).toBe(3)
        })

        it('should return count', () => {
            const result = resolver.applyTransform([1, 2, 3], 'count')
            expect(result).toBe(3)
        })

        it('should return sum', () => {
            const result = resolver.applyTransform([1, 2, 3], 'sum')
            expect(result).toBe(6)
        })

        it('should return average', () => {
            const result = resolver.applyTransform([1, 2, 3], 'avg')
            expect(result).toBe(2)
        })

        it('should return min', () => {
            const result = resolver.applyTransform([5, 2, 8], 'min')
            expect(result).toBe(2)
        })

        it('should return max', () => {
            const result = resolver.applyTransform([5, 2, 8], 'max')
            expect(result).toBe(8)
        })
    })
})

describe('createBindingResolver', () => {
    it('should create a BindingResolver instance', () => {
        const resolver = createBindingResolver({})
        expect(resolver).toBeInstanceOf(BindingResolver)
    })

    it('should accept config with context', () => {
        const resolver = createBindingResolver({ vm: { test: true } })
        expect(resolver).toBeInstanceOf(BindingResolver)
        expect(resolver.resolvePath('vm.test')).toBe(true)
    })
})
