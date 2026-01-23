/**
 * Command Registry
 * 
 * Registry for executable CLI commands.
 */

import { Command } from './types';

const INITIAL_COMMANDS: Command[] = [
    {
        id: 'scaffold-component',
        name: 'Scaffold Component',
        description: 'Scaffold a new React component structure',
        category: 'scaffold',
        executable: 'npx',
        args: ['xala-cli', 'generate', 'component'],
        workingDir: '${workspaceRoot}/packages/platform-ui',
        isLongRunning: false,
        riskLevel: 'low',
        inputSchema: {
            type: 'object',
            properties: {
                componentName: {
                    type: 'string',
                    description: 'Component name (e.g., ResourceCard)',
                },
                layer: {
                    type: 'string',
                    enum: ['primitives', 'composed', 'blocks', 'patterns', 'shells'],
                    description: 'Component layer',
                },
            },
            required: ['componentName', 'layer'],
        },
    },
    {
        id: 'validate-specs',
        name: 'Validate Specs',
        description: 'Validate component specifications against schema',
        category: 'validate',
        executable: 'npx',
        args: ['xala-cli', 'validate', 'specs'],
        isLongRunning: false,
        riskLevel: 'low',
    },
    {
        id: 'generate-stories',
        name: 'Generate Stories',
        description: 'Generate Storybook stories from specs',
        category: 'generate',
        executable: 'npx',
        args: ['xala-cli', 'generate', 'stories'],
        isLongRunning: true,
        riskLevel: 'low',
        inputSchema: {
            type: 'object',
            properties: {
                componentName: {
                    type: 'string',
                    description: 'Component name',
                },
                includeVariants: {
                    type: 'boolean',
                    description: 'Include all variants',
                    default: true,
                },
            },
            required: ['componentName'],
        },
    },
    {
        id: 'build-storybook',
        name: 'Build Storybook',
        description: 'Build Storybook static site',
        category: 'generate',
        executable: 'pnpm',
        args: ['storybook:build'],
        isLongRunning: true,
        riskLevel: 'low',
    },
];

export class CommandRegistry {
    private commands: Map<string, Command>;

    constructor() {
        this.commands = new Map();
        this.loadInitialCommands();
    }

    private loadInitialCommands() {
        INITIAL_COMMANDS.forEach(cmd => {
            this.commands.set(cmd.id, cmd);
        });
    }

    public getCommand(id: string): Command | undefined {
        return this.commands.get(id);
    }

    public getAllCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}

export const commandRegistry = new CommandRegistry();
