/**
 * DocsRightTOC Component
 *
 * Right sidebar Table of Contents with:
 * - Auto-generated from H2/H3 headings
 * - Active section highlighting on scroll (IntersectionObserver)
 * - Smooth scroll on click
 *
 * Pure presentational component - receives data via props and emits events via callbacks.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Paragraph } from '../../../../primitives';
import type { DocsTocItem } from '../../types';

export interface DocsRightTOCLabels {
  tocLabel: string;
  tocTitle: string;
}

export interface DocsRightTOCProps {
  /** TOC items to display */
  items: DocsTocItem[];
  /** Labels for text content */
  labels: DocsRightTOCLabels;
  /** Optional callback when TOC item is clicked */
  onItemClick?: (id: string) => void;
}

export function DocsRightTOC({ items, labels, onItemClick }: DocsRightTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up IntersectionObserver to track which heading is in view
  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            // Sort by vertical position
            const rectA = a.target.getBoundingClientRect();
            const rectB = b.target.getBoundingClientRect();
            return rectA.top - rectB.top;
          });

        if (intersecting.length > 0 && intersecting[0]?.target) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-80px 0px -70% 0px', // Top offset for header, bottom threshold
        threshold: 0,
      }
    );

    headingElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();

      const element = document.getElementById(id);
      if (element) {
        // Smooth scroll to element with offset for header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Update URL hash without jumping
        window.history.pushState(null, '', `#${id}`);

        // Update active state immediately
        setActiveId(id);

        // Callback if provided
        onItemClick?.(id);
      }
    },
    [onItemClick]
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 'var(--ds-spacing-6)',
        maxHeight: 'calc(100vh - var(--ds-spacing-12))',
        overflowY: 'auto',
        padding: 'var(--ds-spacing-4)',
        borderLeft: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
      aria-label={labels.tocLabel}
    >
      <Paragraph
        data-size="sm"
        style={{
          fontWeight: 600,
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-neutral-text-default)',
        }}
      >
        {labels.tocTitle}
      </Paragraph>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-1)',
        }}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isLevel3 = item.level === 3;

          return (
            <li
              key={item.id}
              style={{
                paddingLeft: isLevel3 ? 'var(--ds-spacing-4)' : '0',
              }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                style={{
                  display: 'block',
                  padding: 'var(--ds-spacing-2)',
                  fontSize: isLevel3 ? 'var(--ds-font-size-sm)' : 'var(--ds-font-size-md)',
                  color: isActive
                    ? 'var(--ds-color-accent-text-default)'
                    : 'var(--ds-color-neutral-text-subtle)',
                  textDecoration: 'none',
                  borderLeft: '2px solid',
                  borderColor: isActive
                    ? 'var(--ds-color-accent-border-default)'
                    : 'transparent',
                  paddingLeft: 'var(--ds-spacing-3)',
                  marginLeft: '-2px',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? 500 : 400,
                }}
                aria-current={isActive ? 'location' : undefined}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--ds-color-neutral-text-default)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--ds-color-neutral-text-subtle)';
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default DocsRightTOC;
