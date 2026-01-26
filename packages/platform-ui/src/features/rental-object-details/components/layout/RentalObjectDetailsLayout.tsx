/** RentalObjectDetailsLayout - Refactored Pure UI */
import * as React from 'react';

export interface LayoutLabels {
  mainContentLabel: string;
  sidebarLabel: string;
}

export interface RentalObjectDetailsLayoutProps {
  header: React.ReactNode;
  mainContent: React.ReactNode;
  sidebar?: React.ReactNode;
  labels: LayoutLabels;
  className?: string;
}

export function RentalObjectDetailsLayout({
  header,
  mainContent,
  sidebar,
  className,
}: RentalObjectDetailsLayoutProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gap: 'var(--ds-spacing-6)',
        gridTemplateColumns: sidebar ? '1fr 300px' : '1fr',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {header}
        {mainContent}
      </div>
      {sidebar && <aside>{sidebar}</aside>}
    </div>
  );
}

export default RentalObjectDetailsLayout;
