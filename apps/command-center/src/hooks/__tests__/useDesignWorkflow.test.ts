/**
 * useDesignWorkflow Hook Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDesignWorkflow } from '../useDesignWorkflow';

// Mock the AI provider
vi.mock('../../lib/ai', () => ({
    getCurrentProvider: vi.fn(() => ({
        createMessage: vi.fn().mockResolvedValue(JSON.stringify({
            name: 'Test Product',
            description: 'A test product',
            tagline: 'Testing is fun',
            problemStatement: 'We need tests',
            targetUsers: [],
            keyFeatures: [],
        })),
        isInitialized: vi.fn().mockReturnValue(true),
    })),
}));

describe('useDesignWorkflow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Initial State', () => {
        it('should initialize with product-planning phase', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [state] = result.current;

            expect(state.phase).toBe('product-planning');
            expect(state.currentStep).toBe('vision');
            expect(state.isLoading).toBe(false);
            expect(state.error).toBeNull();
        });

        it('should initialize with empty sections', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [state] = result.current;

            expect(state.sections).toEqual([]);
        });

        it('should initialize clarification state', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [state] = result.current;

            expect(state.clarificationMode).toBe('none');
            expect(state.clarificationQuestions).toEqual([]);
            expect(state.clarificationAnswers).toEqual([]);
        });
    });

    describe('Actions', () => {
        it('should provide generateVision action', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            expect(typeof actions.generateVision).toBe('function');
        });

        it('should provide generateRoadmap action', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            expect(typeof actions.generateRoadmap).toBe('function');
        });

        it('should provide generateDataModel action', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            expect(typeof actions.generateDataModel).toBe('function');
        });

        it('should provide exportProduct action', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            expect(typeof actions.exportProduct).toBe('function');
        });

        it('should provide clarification actions', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            expect(typeof actions.askClarifications).toBe('function');
            expect(typeof actions.setClarificationAnswer).toBe('function');
            expect(typeof actions.submitClarifications).toBe('function');
            expect(typeof actions.skipClarifications).toBe('function');
        });
    });

    describe('Phase Navigation', () => {
        it('should change phase with setPhase', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            act(() => {
                actions.setPhase('section-design');
            });

            const [state] = result.current;
            expect(state.phase).toBe('section-design');
            expect(state.currentStep).toBe('shape');
        });

        it('should reset state with reset action', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            // Change phase first
            act(() => {
                actions.setPhase('export');
            });

            // Then reset
            act(() => {
                actions.reset();
            });

            const [state] = result.current;
            expect(state.phase).toBe('product-planning');
            expect(state.currentStep).toBe('vision');
        });
    });

    describe('Clarification Flow', () => {
        it('should set clarification answer', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            act(() => {
                actions.setClarificationAnswer('q1', 'option-a');
            });

            const [state] = result.current;
            expect(state.clarificationAnswers).toContainEqual({
                questionId: 'q1',
                value: 'option-a',
            });
        });

        it('should update existing clarification answer', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            act(() => {
                actions.setClarificationAnswer('q1', 'option-a');
            });

            act(() => {
                actions.setClarificationAnswer('q1', 'option-b');
            });

            const [state] = result.current;
            expect(state.clarificationAnswers).toHaveLength(1);
            expect(state.clarificationAnswers[0].value).toBe('option-b');
        });

        it('should skip clarifications and reset state', () => {
            const { result } = renderHook(() => useDesignWorkflow());
            const [, actions] = result.current;

            // Set some answers first
            act(() => {
                actions.setClarificationAnswer('q1', 'option-a');
            });

            // Skip
            act(() => {
                actions.skipClarifications();
            });

            const [state] = result.current;
            expect(state.clarificationMode).toBe('none');
            expect(state.clarificationQuestions).toEqual([]);
            expect(state.clarificationAnswers).toEqual([]);
        });
    });
});
