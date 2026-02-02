/**
 * Action Engine Tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    ActionEngine,
    createActionEngine,
    noopHandlers,
    type ActionHandlers,
} from '../action-engine'

describe('ActionEngine', () => {
    let mockHandlers: ActionHandlers

    beforeEach(() => {
        mockHandlers = {
            navigate: vi.fn(),
            openDrawer: vi.fn(),
            closeDrawer: vi.fn(),
            openModal: vi.fn(),
            closeModal: vi.fn(),
            callController: vi.fn().mockResolvedValue({ success: true }),
            download: vi.fn(),
            toast: vi.fn(),
            translate: vi.fn((key) => key),
        }
    })

    describe('executeBehavior', () => {
        it('should execute navigate behavior', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.executeBehavior({
                type: 'NAVIGATE',
                target: '/bookings',
            })

            expect(result.success).toBe(true)
            expect(mockHandlers.navigate).toHaveBeenCalledWith('/bookings', undefined, undefined)
        })

        it('should execute open drawer behavior', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.executeBehavior({
                type: 'OPEN_DRAWER',
                drawerId: 'booking-form',
            })

            expect(result.success).toBe(true)
            expect(mockHandlers.openDrawer).toHaveBeenCalledWith('booking-form', undefined)
        })

        it('should execute close drawer behavior', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.executeBehavior({
                type: 'CLOSE_DRAWER',
                drawerId: 'booking-form',
            })

            expect(result.success).toBe(true)
            expect(mockHandlers.closeDrawer).toHaveBeenCalledWith('booking-form')
        })

        it('should execute toast behavior', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.executeBehavior({
                type: 'TOAST',
                messageKey: 'success.saved',
                variant: 'success',
            })

            expect(result.success).toBe(true)
            expect(mockHandlers.toast).toHaveBeenCalled()
        })

        it('should return error for unknown behavior type', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.executeBehavior({
                type: 'UNKNOWN' as any,
            })

            expect(result.success).toBe(false)
            expect(result.error).toContain('Unknown behavior type')
        })

        it('should block javascript: URLs', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.executeBehavior({
                type: 'NAVIGATE',
                target: 'javascript:alert(1)',
            })

            expect(result.success).toBe(false)
            expect(result.error).toContain('Blocked URL scheme')
        })

        it('should block controller calls when registry denies', async () => {
            const engine = new ActionEngine({
                handlers: mockHandlers,
                // Default registry denies all
            })
            
            const result = await engine.executeBehavior({
                type: 'CALL_CONTROLLER',
                controllerRef: 'bookings',
                method: 'delete',
            })

            expect(result.success).toBe(false)
            expect(result.error).toContain('Unauthorized controller call')
        })

        it('should allow controller calls when registry allows', async () => {
            const engine = new ActionEngine({
                handlers: mockHandlers,
                controllerRegistry: {
                    isAllowed: () => true,
                    getAllowedMethods: () => ['list', 'create'],
                },
            })
            
            const result = await engine.executeBehavior({
                type: 'CALL_CONTROLLER',
                controllerRef: 'bookings',
                method: 'list',
            })

            expect(result.success).toBe(true)
            expect(mockHandlers.callController).toHaveBeenCalledWith('bookings', 'list', undefined)
        })
    })

    describe('execute', () => {
        it('should return error for unregistered action', async () => {
            const engine = new ActionEngine({ handlers: mockHandlers })
            
            const result = await engine.execute('nonexistent-action')

            expect(result.success).toBe(false)
            expect(result.error).toContain('Action not found')
        })
    })
})

describe('noopHandlers', () => {
    it('should provide handler functions', () => {
        expect(typeof noopHandlers.navigate).toBe('function')
        expect(typeof noopHandlers.openDrawer).toBe('function')
        expect(typeof noopHandlers.closeDrawer).toBe('function')
        expect(typeof noopHandlers.openModal).toBe('function')
        expect(typeof noopHandlers.closeModal).toBe('function')
        expect(typeof noopHandlers.callController).toBe('function')
        expect(typeof noopHandlers.download).toBe('function')
        expect(typeof noopHandlers.toast).toBe('function')
        expect(typeof noopHandlers.translate).toBe('function')
    })

    it('should not throw when called', () => {
        expect(() => noopHandlers.navigate('/', {})).not.toThrow()
        expect(() => noopHandlers.openDrawer('test')).not.toThrow()
        expect(() => noopHandlers.toast('message')).not.toThrow()
    })

    it('should return key for translate', () => {
        expect(noopHandlers.translate('test.key')).toBe('test.key')
    })
})

describe('createActionEngine', () => {
    it('should create an ActionEngine instance', () => {
        const engine = createActionEngine({ handlers: noopHandlers })
        expect(engine).toBeInstanceOf(ActionEngine)
    })

    it('should accept config with handlers', () => {
        const engine = createActionEngine({
            handlers: noopHandlers,
            controllerRegistry: {
                isAllowed: () => true,
                getAllowedMethods: () => [],
            },
        })
        expect(engine).toBeInstanceOf(ActionEngine)
    })
})
