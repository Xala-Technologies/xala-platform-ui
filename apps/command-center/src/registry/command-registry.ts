/**
 * Command Registry
 * 
 * Registry for executable CLI commands.
 */

import { Command } from './types';

const INITIAL_COMMANDS: Command[] = [
    {
        id: 'scaffold-component',
        description: 'Scaffold a new React component structure',
        executable: 'npx',
        args: ['xala-cli', 'generate', 'component'],
        workingDir: '${workspaceRoot}/packages/platform-ui',
        isLongRunning: false
    },
    {
        id: 'validate-specs',
        description: 'Validate component specifications against schema',
        executable: 'npx',
        args: ['xala-cli', 'validate', 'specs'],
        isLongRunning: false
    },
    {
        id: 'generate-stories',
        description: 'Generate Storybook stories from specs',
        executable: 'npx',
        args: ['xala-cli', 'generate', 'stories'],
        isLongRunning: true
    }
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
