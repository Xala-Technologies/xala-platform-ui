'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Home page - redirects to /stories
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/stories');
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      <p style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
        Redirecting to Story Explorer...
      </p>
    </div>
  );
}
