/**
 * Localized documentation description component for Storybook meta
 *
 * This component provides localized markdown content for Storybook's docs.description.component
 *
 * @example
 * ```tsx
 * const meta: Meta = {
 *   title: 'Overview/Introduction',
 *   parameters: {
 *     docs: {
 *       description: {
 *         component: LocalizedDocsDescription,
 *       },
 *     },
 *   },
 * };
 * ```
 */
import React from 'react';

export interface LocalizedDocsDescriptionProps {
  /** Translation keys for the content sections */
  keys?: {
    title?: string;
    subtitle?: string;
    sections?: Array<{ heading?: string; content?: string; list?: string[] }>;
  };
}

/**
 * Default Introduction page content
 */
export function IntroductionDocsDescription() {
  const t = useT();

  return (
    <div>
      <h1>"Eksempel Tekst"</h1>
      <p>"Eksempel Tekst"</p>

      <h2>{t('storybook.demo.whatIsThis', 'What is This?')}</h2>
      <p>"Eksempel Tekst"</p>

      <h2>{t('storybook.demo.keyFeatures', 'Key Features')}</h2>
      <ul>
        <li>
          <strong>"Eksempel Tekst"</strong>:{' '}
          "Eksempel Tekst"
        </li>
        <li>
          <strong>"Eksempel Tekst"</strong>:{' '}
          "Eksempel Tekst"
        </li>
        <li>
          <strong>"Eksempel Tekst"</strong>:{' '}
          "Eksempel Tekst"
        </li>
        <li>
          <strong>"Eksempel Tekst"</strong>:{' '}
          "Eksempel Tekst"
        </li>
        <li>
          <strong>"Eksempel Tekst"</strong>:{' '}
          "Eksempel Tekst"
        </li>
        <li>
          <strong>"Eksempel Tekst"</strong>:{' '}
          "Eksempel Tekst"
        </li>
      </ul>

      <h2>{t('storybook.demo.builtWith', 'Built With')}</h2>
      <ul>
        <li>
          <a href="https://designsystemet.no/">Designsystemet</a> -{' '}
          {t('storybook.demo.norwegianDesignSystem', 'Norwegian Design System')}
        </li>
        <li>React + TypeScript</li>
        <li>{t('storybook.demo.viteForBuilds', 'Vite for blazing fast builds')}</li>
        <li>{t('storybook.demo.storybookForDocs', 'Storybook for documentation')}</li>
      </ul>
    </div>
  );
}

/**
 * Default Getting Started page content
 */
export function GettingStartedDocsDescription() {
  const t = useT();

  return (
    <div>
      <h1>"Eksempel Tekst"</h1>
      <p>
        {t(
          'storybook.gettingStarted.quickGuide',
          'Quick guide to start building with the Xala Platform Design System.'
        )}
      </p>

      <h2>"Eksempel Tekst"</h2>
      <pre>
        <code>pnpm add @xala-technologies/platform</code>
      </pre>

      <h2>"Eksempel Tekst"</h2>
      <ol>
        <li>{t('storybook.gettingStarted.importComponents', 'Import components')}</li>
        <li>"Eksempel Tekst"</li>
        <li>"Eksempel Tekst"</li>
        <li>{t('storybook.gettingStarted.startBuilding', 'Start building')}</li>
      </ol>

      <h2>{t('storybook.gettingStarted.firstSteps', 'First Steps')}</h2>
      <ul>
        <li>{t('storybook.gettingStarted.createFirstComponent', 'Create your first component')}</li>
        <li>{t('storybook.gettingStarted.useDesignTokens', 'Use design tokens')}</li>
        <li>
          {t('storybook.gettingStarted.followA11yGuidelines', 'Follow accessibility guidelines')}
        </li>
        <li>{t('storybook.gettingStarted.testInStorybook', 'Test in Storybook')}</li>
      </ul>
    </div>
  );
}
