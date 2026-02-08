/**
 * XTerminal Block
 *
 * Terminal component for displaying command output and interactive sessions.
 * In production, this would connect to xterm.js or similar.
 */
import React from 'react';

export interface XTerminalProps {
  /** Terminal session ID */
  sessionId?: string;
  /** Working directory */
  cwd?: string;
  /** Initial command to run */
  initialCommand?: string;
  /** Callback when terminal output changes */
  onOutput?: (output: string) => void;
  /** Height of terminal */
  height?: string | number;
  /** Custom className */
  className?: string;
  /** ID for testing */
  id?: string;
  /** Project ID for context */
  projectId?: string;
  /** Whether terminal is active */
  isActive?: boolean;
  /** Close handler */
  onClose?: () => void;
}

export function XTerminal({
  sessionId,
  cwd = '~',
  initialCommand,
  height = 300,
  className = '',
  id,
  projectId,
  isActive = true,
}: XTerminalProps) {
  return (
    <div
      id={id}
      className={className}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        fontFamily: 'var(--ds-font-family-mono, monospace)',
        fontSize: '14px',
        padding: 'var(--ds-spacing-3)',
        borderRadius: 'var(--ds-border-radius-md)',
        overflow: 'auto',
        opacity: isActive ? 1 : 0.7,
      }}
    >
      <div style={{ opacity: 0.7, marginBottom: 'var(--ds-spacing-2)' }}>
        {cwd && <span style={{ color: '#4ec9b0' }}>{cwd}</span>}
        {sessionId && <span style={{ color: '#6a9955' }}> [{sessionId}]</span>}
        {projectId && <span style={{ color: '#569cd6' }}> ({projectId})</span>}
      </div>
      <div>
        <span style={{ color: '#dcdcaa' }}>$</span>{' '}
        <span style={{ color: '#9cdcfe' }}>
          {initialCommand || 'Terminal ready. Connect to backend for real terminal.'}
        </span>
      </div>
    </div>
  );
}

export default XTerminal;
