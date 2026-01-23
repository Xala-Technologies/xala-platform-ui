/**
 * Command Executor Service
 * 
 * Mock implementation of a remote command runner.
 * Simulates streaming output and artifact generation.
 */

import { Command, CommandResult, GeneratedArtifact } from '../registry/types';

export class CommandExecutor {
    /**
     * Execute a command and stream output
     * @param command The command definition
     * @param args Runtime arguments
     * @param onOutput Callback for stdout/stderr lines
     */
    async execute(
        command: Command,
        _args: Record<string, string>,
        onOutput: (line: string) => void
    ): Promise<CommandResult> {
        onOutput(`[EXECUTOR] Starting command: ${command.id}`);
        onOutput(`[EXECUTOR] Working directory: ${command.workingDir || '.'}`);
        onOutput(`[EXECUTOR] Executing: ${command.executable} ${command.args?.join(' ')}`);

        // Simulate delay and logging
        await this.delay(800);
        onOutput(`[INFO] Initializing ${command.id}...`);

        await this.delay(1000);
        onOutput(`[INFO] Validating inputs...`);
        onOutput(`[INFO] Inputs valid.`);

        if (command.isLongRunning) {
            for (let i = 0; i < 5; i++) {
                await this.delay(800);
                onOutput(`[PROGRESS] Step ${i + 1}/5 completed...`);
            }
        } else {
            await this.delay(500);
        }

        onOutput(`[SUCCESS] Command completed successfully.`);

        // Mock artifact generation
        const artifacts: GeneratedArtifact[] = [
            {
                id: crypto.randomUUID(),
                type: 'file',
                path: `/generated/${command.id}/output.json`,
                content: JSON.stringify({ status: 'success', timestamp: new Date() }, null, 2)
            }
        ];

        return {
            commandId: command.id,
            exitCode: 0,
            stdout: 'Command executed successfully',
            stderr: '',
            artifacts
        };
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const commandExecutor = new CommandExecutor();
