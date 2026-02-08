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
import { useT } from '@xala-technologies/i18n';

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
      <h1>{t('storybook.overview.welcome')}</h1>
      <p>{t('storybook.overview.subtitle')}</p>

      <h2>{t('storybook.demo.whatIsThis', 'What is This?')}</h2>
      <p>{t('storybook.overview.subtitle')}</p>

      <h2>{t('storybook.demo.keyFeatures', 'Key Features')}</h2>
      <ul>
        <li>
          <strong>{t('storybook.overview.accessibilityFirst')}</strong>:{' '}
          {t('storybook.overview.accessibilityFirstDesc')}
        </li>
        <li>
          <strong>{t('storybook.overview.designTokens')}</strong>:{' '}
          {t('storybook.overview.designTokensDesc')}
        </li>
        <li>
          <strong>{t('storybook.overview.components')}</strong>:{' '}
          {t('storybook.overview.componentsDesc')}
        </li>
        <li>
          <strong>{t('storybook.overview.multiTenancy')}</strong>:{' '}
          {t('storybook.overview.multiTenancyDesc')}
        </li>
        <li>
          <strong>{t('storybook.overview.internationalization')}</strong>:{' '}
          {t('storybook.overview.i18nDesc')}
        </li>
        <li>
          <strong>{t('storybook.overview.themeSupport')}</strong>:{' '}
          {t('storybook.overview.themeSupportDesc')}
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
      <h1>{t('storybook.gettingStarted.title')}</h1>
      <p>
        {t(
          'storybook.gettingStarted.quickGuide',
          'Quick guide to start building with the Xala Platform Design System.'
        )}
      </p>

      <h2>{t('storybook.gettingStarted.installation')}</h2>
      <pre>
        <code>pnpm add @xala-technologies/platform</code>
      </pre>

      <h2>{t('storybook.gettingStarted.setup')}</h2>
      <ol>
        <li>{t('storybook.gettingStarted.importComponents', 'Import components')}</li>
        <li>{t('storybook.gettingStarted.configureTheme')}</li>
        <li>{t('storybook.gettingStarted.setupI18n')}</li>
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
