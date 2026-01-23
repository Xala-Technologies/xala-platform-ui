/**
 * Workflow Session Context
 * 
 * Manages the state of an active workflow session.
 * Handles navigation, data accumulation, and persistence.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WorkflowSession, Workflow } from '../registry/types';
import { workflowRegistry } from '../registry/workflow-registry';

interface WorkflowSessionContextType {
    session: WorkflowSession | null;
    activeWorkflow: Workflow | null;
    activeStepIndex: number;
    startSession: (workflowId: string) => void;
    submitStep: (stepId: string, data: Record<string, any>) => void;
    nextStep: () => void;
    prevStep: () => void;
    cancelSession: () => void;
    completeSession: () => void;
}

const WorkflowSessionContext = createContext<WorkflowSessionContextType | undefined>(undefined);

export function WorkflowSessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<WorkflowSession | null>(() => {
        // Try to restore from localStorage
        const saved = localStorage.getItem('xala_cc_session');
        return saved ? JSON.parse(saved) : null;
    });

    const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);

    // Sync active workflow when session changes
    useEffect(() => {
        if (session) {
            const workflow = workflowRegistry.getWorkflow(session.workflowId);
            if (workflow) {
                setActiveWorkflow(workflow);
            } else {
                // Workflow not found, clear invalid session
                setSession(null);
                localStorage.removeItem('xala_cc_session');
            }
        } else {
            setActiveWorkflow(null);
        }
    }, [session?.workflowId]);

    // Persist session changes
    useEffect(() => {
        if (session) {
            localStorage.setItem('xala_cc_session', JSON.stringify(session));
        } else {
            localStorage.removeItem('xala_cc_session');
        }
    }, [session]);

    const startSession = (workflowId: string) => {
        const workflow = workflowRegistry.getWorkflow(workflowId);
        if (!workflow) {
            console.error(`Workflow ${workflowId} not found`);
            return;
        }

        const newSession: WorkflowSession = {
            id: crypto.randomUUID(),
            workflowId,
            startedAt: new Date().toISOString(),
            currentStepIndex: 0,
            data: {},
            status: 'active',
            artifacts: []
        };

        setSession(newSession);
    };

    const submitStep = (stepId: string, stepData: Record<string, any>) => {
        if (!session) return;

        setSession(prev => {
            if (!prev) return null;
            return {
                ...prev,
                data: {
                    ...prev.data,
                    [stepId]: stepData
                }
            };
        });
    };

    const nextStep = () => {
        if (!session || !activeWorkflow) return;

        if (session.currentStepIndex < activeWorkflow.steps.length - 1) {
            setSession(prev => prev ? { ...prev, currentStepIndex: prev.currentStepIndex + 1 } : null);
        } else {
            completeSession();
        }
    };

    const prevStep = () => {
        if (!session) return;
        if (session.currentStepIndex > 0) {
            setSession(prev => prev ? { ...prev, currentStepIndex: prev.currentStepIndex - 1 } : null);
        }
    };

    const cancelSession = () => {
        setSession(null);
    };

    const completeSession = () => {
        setSession(prev => prev ? { ...prev, status: 'completed' } : null);
        // In real app: save session to history/backend
    };

    return (
        <WorkflowSessionContext.Provider value={{
            session,
            activeWorkflow,
            activeStepIndex: session?.currentStepIndex ?? -1,
            startSession,
            submitStep,
            nextStep,
            prevStep,
            cancelSession,
            completeSession
        }}>
            {children}
        </WorkflowSessionContext.Provider>
    );
}

export function useWorkflowSession() {
    const context = useContext(WorkflowSessionContext);
    if (context === undefined) {
        throw new Error('useWorkflowSession must be used within a WorkflowSessionProvider');
    }
    return context;
}
