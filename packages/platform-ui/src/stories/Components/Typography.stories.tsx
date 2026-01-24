import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Heading, Paragraph, Label, Link } from '../../index';

const meta: Meta = {
  title: 'Components/Typography',
  parameters: {
    docs: {
      description: {
        component: `
Typography components for text styling.

## Components
- **Heading**: Page and section headings (h1-h6)
- **Paragraph**: Body text
- **Label**: Form labels and captions
- **Link**: Inline links

## Best Practices
- Use semantic heading levels (h1 -> h2 -> h3)
- Don't skip heading levels
- Use data-size to adjust visual size
- Keep paragraphs concise
- Use lead paragraphs for introductions

## Accessibility
- Semantic heading levels
- Proper text hierarchy
- Link styling for visibility
- Sufficient contrast
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={1}>{t('storybook.demo.headingLevel')} 1</Heading>
        <Heading level={2}>{t('storybook.demo.headingLevel')} 2</Heading>
        <Heading level={3}>{t('storybook.demo.headingLevel')} 3</Heading>
        <Heading level={4}>{t('storybook.demo.headingLevel')} 4</Heading>
        <Heading level={5}>{t('storybook.demo.headingLevel')} 5</Heading>
        <Heading level={6}>{t('storybook.demo.headingLevel')} 6</Heading>
      </div>
    );
  },
};

export const HeadingSizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={2} data-size="2xs">
          2XS {t('storybook.demo.heading')}
        </Heading>
        <Heading level={2} data-size="xs">
          XS {t('storybook.demo.heading')}
        </Heading>
        <Heading level={2} data-size="sm">
          SM {t('storybook.demo.heading')}
        </Heading>
        <Heading level={2} data-size="md">
          MD {t('storybook.demo.heading')}
        </Heading>
        <Heading level={2} data-size="lg">
          LG {t('storybook.demo.heading')}
        </Heading>
        <Heading level={2} data-size="xl">
          XL {t('storybook.demo.heading')}
        </Heading>
        <Heading level={2} data-size="2xl">
          2XL {t('storybook.demo.heading')}
        </Heading>
      </div>
    );
  },
};

export const Paragraphs: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">
          {t('storybook.demo.smallParagraph')}. {t('storybook.demo.loremIpsum')}
        </Paragraph>
        <Paragraph data-size="md">
          {t('storybook.demo.mediumParagraphDefault')}. {t('storybook.demo.loremIpsum')}
        </Paragraph>
        <Paragraph data-size="lg">
          {t('storybook.demo.largeParagraph')}. {t('storybook.demo.loremIpsum')}
        </Paragraph>
      </div>
    );
  },
};

export const LeadParagraph: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={1}>{t('storybook.demo.articleTitle')}</Heading>
        <Paragraph data-size="lg">{t('storybook.demo.leadParagraphText')}</Paragraph>
        <Paragraph>{t('storybook.demo.regularParagraphText')}</Paragraph>
      </div>
    );
  },
};

export const Labels: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Label data-size="sm">{t('storybook.demo.smallLabel')}</Label>
        <Label data-size="md">{t('storybook.demo.mediumLabel')}</Label>
        <Label data-size="lg">{t('storybook.demo.largeLabel')}</Label>
      </div>
    );
  },
};

export const InlineLink: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Paragraph>
        {t('storybook.demo.readMoreAbout')}{' '}
        <Link href="#">{t('storybook.demo.bookingPolicies')}</Link> {t('storybook.demo.and')}{' '}
        <Link href="#">{t('storybook.demo.termsOfService')}</Link>{' '}
        {t('storybook.demo.beforeMakingReservation')}
      </Paragraph>
    );
  },
};

export const CombinedExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <article>
        <Heading level={1} data-size="xl">
          {t('storybook.demo.welcomeToThePlatform')}
        </Heading>
        <Paragraph data-size="lg">{t('storybook.demo.platformDescription')}</Paragraph>
        <Heading level={2} data-size="md">
          {t('storybook.demo.howItWorks')}
        </Heading>
        <Paragraph>
          {t('storybook.demo.browseAvailable')} <Link href="#">{t('storybook.demo.listings')}</Link>
          , {t('storybook.demo.selectPreferredDateAndTime')}.
        </Paragraph>
        <Heading level={2} data-size="md">
          {t('storybook.demo.getStarted')}
        </Heading>
        <Paragraph>
          {t('storybook.demo.createAccountToStart')}. {t('storybook.demo.needHelp')}{' '}
          <Link href="#">{t('storybook.demo.faq')}</Link> {t('storybook.demo.or')}{' '}
          <Link href="#">{t('storybook.demo.contactUs')}</Link>.
        </Paragraph>
      </article>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.headingLevels')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            <Heading level={1} data-size="lg">
              H1 {t('storybook.demo.heading')}
            </Heading>
            <Heading level={2} data-size="md">
              H2 {t('storybook.demo.heading')}
            </Heading>
            <Heading level={3} data-size="sm">
              H3 {t('storybook.demo.heading')}
            </Heading>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.paragraphSizes')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Paragraph data-size="sm">{t('storybook.demo.smallParagraphText')}</Paragraph>
            <Paragraph data-size="md">{t('storybook.demo.mediumParagraphTextDefault')}</Paragraph>
            <Paragraph data-size="lg">{t('storybook.demo.largeParagraphTextLead')}</Paragraph>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.labels')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            <Label data-size="sm">{t('storybook.demo.smallLabel')}</Label>
            <Label data-size="md">{t('storybook.demo.mediumLabel')}</Label>
            <Label data-size="lg">{t('storybook.demo.largeLabel')}</Label>
          </div>
        </div>
      </div>
    );
  },
};
