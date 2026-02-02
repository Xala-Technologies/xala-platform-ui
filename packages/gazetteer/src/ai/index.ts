/**
 * Gazetteer - AI Module
 *
 * AI-assisted gazetteer generation utilities for creating
 * page specs, widget specs, and route specs from natural language.
 */

import type {
    PageSpec,
    WidgetSpec,
    RouteSpec,
    ShellType,
    PageLayoutType,
} from '../types'

// =============================================================================
// Types
// =============================================================================

export interface AIGenerationConfig {
    /** Model to use for generation */
    model?: string
    /** Temperature for generation (0-1) */
    temperature?: number
    /** Maximum tokens to generate */
    maxTokens?: number
}

export interface PageGenerationRequest {
    /** Natural language description of the page */
    description: string
    /** Page ID to generate */
    pageId: string
    /** Shell type to use */
    shellType?: ShellType
    /** Layout type */
    layoutType?: PageLayoutType
    /** Available widget types to use */
    availableWidgets?: string[]
    /** Generation config */
    config?: AIGenerationConfig
}

export interface WidgetGenerationRequest {
    /** Natural language description of the widget */
    description: string
    /** Widget type */
    widgetType: string
    /** Widget ID */
    widgetId: string
    /** Generation config */
    config?: AIGenerationConfig
}

export interface RouteGenerationRequest {
    /** Natural language description of the route */
    description: string
    /** Route ID */
    routeId: string
    /** Path pattern */
    path: string
    /** Generation config */
    config?: AIGenerationConfig
}

export interface GenerationResult<T> {
    /** Whether generation succeeded */
    success: boolean
    /** Generated spec */
    spec?: T
    /** Error message if failed */
    error?: string
    /** Generation metadata */
    metadata?: {
        model: string
        tokensUsed: number
        generationTimeMs: number
    }
}

// =============================================================================
// AI Generator
// =============================================================================

export class AIGenerator {
    private config: AIGenerationConfig

    constructor(config: AIGenerationConfig = {}) {
        this.config = {
            model: config.model ?? 'gpt-4',
            temperature: config.temperature ?? 0.7,
            maxTokens: config.maxTokens ?? 2048,
        }
    }

    /**
     * Generate a page spec from natural language description
     */
    async generatePage(request: PageGenerationRequest): Promise<GenerationResult<PageSpec>> {
        const startTime = Date.now()

        try {
            // Build prompt for page generation
            const prompt = this.buildPagePrompt(request)

            // In a real implementation, this would call an AI API
            // For now, return a basic template
            const spec: PageSpec = {
                pageId: request.pageId,
                shellType: request.shellType ?? 'DataPageShell',
                layoutType: request.layoutType ?? 'list',
                controllerRefs: [],
                widgets: {
                    content: [],
                },
            }

            return {
                success: true,
                spec,
                metadata: {
                    model: this.config.model!,
                    tokensUsed: prompt.length,
                    generationTimeMs: Date.now() - startTime,
                },
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Generation failed',
            }
        }
    }

    /**
     * Generate a widget spec from natural language description
     */
    async generateWidget(request: WidgetGenerationRequest): Promise<GenerationResult<WidgetSpec>> {
        const startTime = Date.now()

        try {
            const spec: WidgetSpec = {
                widgetId: request.widgetId,
                type: request.widgetType,
                props: {},
                bindings: {},
                visibility: {},
            }

            return {
                success: true,
                spec,
                metadata: {
                    model: this.config.model!,
                    tokensUsed: request.description.length,
                    generationTimeMs: Date.now() - startTime,
                },
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Generation failed',
            }
        }
    }

    /**
     * Generate a route spec from natural language description
     */
    async generateRoute(request: RouteGenerationRequest): Promise<GenerationResult<RouteSpec>> {
        const startTime = Date.now()

        try {
            const spec: RouteSpec = {
                routeId: request.routeId,
                path: request.path,
                pageRef: request.routeId,
                navigation: {
                    labelKey: `routes.${request.routeId}.label`,
                    group: 'main',
                },
            }

            return {
                success: true,
                spec,
                metadata: {
                    model: this.config.model!,
                    tokensUsed: request.description.length,
                    generationTimeMs: Date.now() - startTime,
                },
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Generation failed',
            }
        }
    }

    /**
     * Build a prompt for page generation
     */
    private buildPagePrompt(request: PageGenerationRequest): string {
        return `Generate a Gazetteer PageSpec for:
Description: ${request.description}
Page ID: ${request.pageId}
Shell Type: ${request.shellType ?? 'DataPageShell'}
Available Widgets: ${request.availableWidgets?.join(', ') ?? 'any'}

Return a valid JSON PageSpec.`
    }
}

// =============================================================================
// Factory Functions
// =============================================================================

/**
 * Create an AI generator instance
 */
export function createAIGenerator(config?: AIGenerationConfig): AIGenerator {
    return new AIGenerator(config)
}

// =============================================================================
// Version
// =============================================================================

export const AI_VERSION = '1.0.0'
