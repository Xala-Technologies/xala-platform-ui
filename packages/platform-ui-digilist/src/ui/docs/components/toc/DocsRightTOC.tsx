/**
 * DocsRightTOC Component
 *
 * Right sidebar Table of Contents with:
 * - Auto-generated from H2/H3 headings
 * - Active section highlighting on scroll (IntersectionObserver)
 * - Smooth scroll on click
 *
 * Similar to TailwindCSS docs right TOC.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Paragraph } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import type { TocItem } from '../../types';

interface DocsRightTOCProps {
  items: TocItem[];
  /** Optional callback when TOC item is clicked */
  onItemClick?: (id: string) => void;
}

export function DocsRightTOC({ items, onItemClick }: DocsRightTOCProps) {
  const t = useT();
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
        top: 'var(--ds-spacing-8)',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        paddingRight: 'var(--ds-spacing-4)',
      }}
      aria-label={t('docs.toc.label') || 'Innholdsfortegnelse'}
    >
      <Paragraph
        data-size="sm"
        style={{
          margin: 0,
          marginBottom: 'var(--ds-spacing-3)',
          fontWeight: 'var(--ds-font-weight-semibold)',
          color: 'var(--ds-color-neutral-text-subtle)',
          textTransform: 'uppercase',
          fontSize: 'var(--ds-font-size-xs)',
          letterSpacing: '0.05em',
        }}
      >
        {t('docs.toc.page.title') || 'På denne siden'}
      </Paragraph>

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          borderLeft: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        {items.map((item) => (
          <li key={item.id} style={{ margin: 0 }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              style={{
                display: 'block',
                padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
                paddingLeft: item.level === 3 ? 'var(--ds-spacing-6)' : 'var(--ds-spacing-4)',
                fontSize: 'var(--ds-font-size-sm)',
                color: activeId === item.id
                  ? 'var(--ds-color-accent-base-default)'
                  : 'var(--ds-color-neutral-text-subtle)',
                textDecoration: 'none',
                borderLeft: activeId === item.id
                  ? '2px solid var(--ds-color-accent-base-default)'
                  : '2px solid transparent',
                marginLeft: '-1px',
                transition: 'all 0.15s ease',
              }}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DocsRightTOC;
