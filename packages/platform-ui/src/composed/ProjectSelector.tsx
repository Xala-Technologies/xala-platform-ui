/**
 * ProjectSelector Component
 *
 * A reusable project/workspace selector dropdown.
 * Uses only inline styles with Designsystemet tokens - NO CSS files.
 *
 * @example
 * ```tsx
 * import { ProjectSelector } from '@xala-technologies/platform-ui';
 *
 * <ProjectSelector
 *   projects={[{ id: '1', name: 'my-project', path: '/path' }]}
 *   selectedId="1"
 *   onSelect={(p) => console.log(p)}
 * />
 * ```
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@digdir/designsystemet-react';
import { Popover } from './Popover';
import { CheckIcon } from '../primitives/icons';

// ============================================================================
// Types
// ============================================================================

export interface ProjectItem {
  id: string;
  name: string;
  path?: string;
  iconUrl?: string;
}

export interface ProjectSelectorProps {
  projects: ProjectItem[];
  selectedId?: string;
  onSelect?: (project: ProjectItem) => void;
  label?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// Styles using design tokens
// ============================================================================

const styles = {
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-2)',
    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
  } as React.CSSProperties,

  triggerAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: 'var(--ds-border-radius-md)',
    backgroundColor: 'var(--ds-color-accent-surface-default)',
    color: 'var(--ds-color-accent-base-default)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--ds-font-size-1)',
    fontWeight: 600,
  } as React.CSSProperties,

  triggerName: {
    fontWeight: 500,
  } as React.CSSProperties,

  dropdown: {
    minWidth: '280px',
  } as React.CSSProperties,

  header: {
    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
    borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
  } as React.CSSProperties,

  label: {
    fontSize: 'var(--ds-font-size-1)',
    color: 'var(--ds-color-neutral-text-subtle)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  } as React.CSSProperties,

  list: {
    maxHeight: '300px',
    overflowY: 'auto',
  } as React.CSSProperties,

  option: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-3)',
    width: '100%',
    padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    color: 'inherit',
  } as React.CSSProperties,

  optionSelected: {
    backgroundColor: 'var(--ds-color-accent-surface-hover)',
  } as React.CSSProperties,

  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: 'var(--ds-border-radius-md)',
    backgroundColor: 'var(--ds-color-accent-surface-default)',
    color: 'var(--ds-color-accent-base-default)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--ds-font-size-1)',
    fontWeight: 600,
    flexShrink: 0,
  } as React.CSSProperties,

  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    objectFit: 'cover',
  } as React.CSSProperties,

  info: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  name: {
    fontWeight: 500,
    fontSize: 'var(--ds-font-size-2)',
    color: 'var(--ds-color-neutral-text-default)',
  } as React.CSSProperties,

  path: {
    fontSize: 'var(--ds-font-size-1)',
    color: 'var(--ds-color-neutral-text-subtle)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  check: {
    color: 'var(--ds-color-accent-base-default)',
    flexShrink: 0,
  } as React.CSSProperties,
};

// ============================================================================
// Component
// ============================================================================

export function ProjectSelector({
  projects,
  selectedId,
  onSelect,
  label = 'Projects',
  placeholder = 'Select project',
  size = 'sm',
}: ProjectSelectorProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedId);

  const handleSelect = useCallback(
    (project: ProjectItem) => {
      onSelect?.(project);
      setIsOpen(false);
    },
    [onSelect]
  );

  const dropdownContent = (
    <div style={styles.dropdown}>
      <div style={styles.header}>
        <span style={styles.label}>{label}</span>
      </div>
      <div style={styles.list}>
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => handleSelect(project)}
            style={{
              ...styles.option,
              ...(selectedId === project.id ? styles.optionSelected : {}),
            }}
          >
            <div style={styles.avatar}>
              {project.iconUrl ? (
                <img src={project.iconUrl} alt="" style={styles.avatarImg} />
              ) : (
                project.name.charAt(0).toUpperCase()
              )}
            </div>
            <div style={styles.info}>
              <div style={styles.name}>{project.name}</div>
              {project.path && (
                <div style={styles.path}>{project.path.split('/').slice(-2).join('/')}</div>
              )}
            </div>
            {selectedId === project.id && <CheckIcon size={16} style={styles.check} />}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Popover
      content={dropdownContent}
      open={isOpen}
      onOpenChange={setIsOpen}
      position="bottom-start"
    >
      <Button
        variant="tertiary"
        data-size={size}
        onClick={() => setIsOpen(!isOpen)}
        style={styles.trigger}
      >
        <div style={styles.triggerAvatar}>
          {selectedProject?.name.charAt(0).toUpperCase() ?? '?'}
        </div>
        <span style={styles.triggerName}>{selectedProject?.name ?? placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Button>
    </Popover>
  );
}

export default ProjectSelector;
