/**
 * AI Module Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
    AIGenerator,
    createAIGenerator,
    AI_VERSION,
} from '../index'

describe('AIGenerator', () => {
    let generator: AIGenerator

    beforeEach(() => {
        generator = createAIGenerator()
    })

    describe('generatePage', () => {
        it('should generate a page spec', async () => {
            const result = await generator.generatePage({
                description: 'A dashboard page with stats',
                pageId: 'dashboard',
                shellType: 'DashboardShell',
            })

            expect(result.success).toBe(true)
            expect(result.spec).toBeDefined()
            expect(result.spec?.pageId).toBe('dashboard')
            expect(result.spec?.shellType).toBe('DashboardShell')
        })

        it('should use default shell type if not specified', async () => {
            const result = await generator.generatePage({
                description: 'A simple page',
                pageId: 'simple',
            })

            expect(result.success).toBe(true)
            expect(result.spec?.shellType).toBe('DataPageShell')
        })

        it('should include metadata', async () => {
            const result = await generator.generatePage({
                description: 'Test page',
                pageId: 'test',
            })

            expect(result.metadata).toBeDefined()
            expect(result.metadata?.model).toBe('gpt-4')
            expect(result.metadata?.generationTimeMs).toBeGreaterThanOrEqual(0)
        })
    })

    describe('generateWidget', () => {
        it('should generate a widget spec', async () => {
            const result = await generator.generateWidget({
                description: 'A submit button',
                widgetType: 'Button',
                widgetId: 'submit-btn',
            })

            expect(result.success).toBe(true)
            expect(result.spec).toBeDefined()
            expect(result.spec?.widgetId).toBe('submit-btn')
            expect(result.spec?.type).toBe('Button')
        })

        it('should include empty visibility in generated widget', async () => {
            const result = await generator.generateWidget({
                description: 'A visible card',
                widgetType: 'StatsGrid',
                widgetId: 'card-1',
            })

            expect(result.spec?.visibility).toEqual({})
        })
    })

    describe('generateRoute', () => {
        it('should generate a route spec', async () => {
            const result = await generator.generateRoute({
                description: 'Home page route',
                routeId: 'home',
                path: '/',
            })

            expect(result.success).toBe(true)
            expect(result.spec).toBeDefined()
            expect(result.spec?.routeId).toBe('home')
            expect(result.spec?.path).toBe('/')
        })

        it('should generate navigation with labelKey from routeId', async () => {
            const result = await generator.generateRoute({
                description: 'Settings page',
                routeId: 'settings',
                path: '/settings',
            })

            expect(result.spec?.navigation.labelKey).toBe('routes.settings.label')
        })
    })

    describe('configuration', () => {
        it('should use custom model', async () => {
            const customGenerator = createAIGenerator({
                model: 'gpt-3.5-turbo',
            })

            const result = await customGenerator.generatePage({
                description: 'Test',
                pageId: 'test',
            })

            expect(result.metadata?.model).toBe('gpt-3.5-turbo')
        })

        it('should use default config values', () => {
            const generator = createAIGenerator()
            // Generator is created successfully with defaults
            expect(generator).toBeInstanceOf(AIGenerator)
        })
    })
})

describe('createAIGenerator', () => {
    it('should create an AIGenerator instance', () => {
        const generator = createAIGenerator()
        expect(generator).toBeInstanceOf(AIGenerator)
    })

    it('should accept configuration', () => {
        const generator = createAIGenerator({
            model: 'custom-model',
            temperature: 0.5,
            maxTokens: 1024,
        })
        expect(generator).toBeInstanceOf(AIGenerator)
    })
})

describe('AI_VERSION', () => {
    it('should be defined', () => {
        expect(AI_VERSION).toBe('1.0.0')
    })
})
