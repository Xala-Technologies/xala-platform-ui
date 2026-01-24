import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { List } from '../../index';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: `
List component for displaying ordered and unordered lists.

## When to Use
- Feature lists
- Navigation menus
- Step-by-step instructions
- Content summaries
- Nested hierarchies

## Best Practices
- Use ordered lists for sequences
- Use unordered lists for non-sequential items
- Keep list items concise
- Use nesting sparingly

## Accessibility
- Uses semantic list elements
- Proper list structure for screen readers
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Unordered: Story = {
  render: function Render() {
    const t = useT();
    return (
      <List.Unordered>
        <List.Item>{t('storybook.demo.freeCancellation24Hours')}</List.Item>
        <List.Item>{t('storybook.demo.equipmentIncluded')}</List.Item>
        <List.Item>{t('storybook.demo.changingRoomsAvailable')}</List.Item>
        <List.Item>{t('storybook.demo.parkingOnSite')}</List.Item>
      </List.Unordered>
    );
  },
};

export const Ordered: Story = {
  render: function Render() {
    const t = useT();
    return (
      <List.Ordered>
        <List.Item>{t('storybook.demo.createAccount')}</List.Item>
        <List.Item>{t('storybook.demo.browseResources')}</List.Item>
        <List.Item>{t('storybook.demo.selectDateTime')}</List.Item>
        <List.Item>{t('storybook.demo.completeBooking')}</List.Item>
        <List.Item>{t('storybook.demo.receiveConfirmation')}</List.Item>
      </List.Ordered>
    );
  },
};

export const Nested: Story = {
  render: function Render() {
    const t = useT();
    return (
      <List.Unordered>
        <List.Item>
          {t('storybook.demo.indoorAmenities')}
          <List.Unordered>
            <List.Item>{t('storybook.demo.basketballCourt')}</List.Item>
            <List.Item>{t('storybook.demo.swimmingPool')}</List.Item>
            <List.Item>{t('storybook.demo.gym')}</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          {t('storybook.demo.outdoorAmenities')}
          <List.Unordered>
            <List.Item>{t('storybook.demo.footballField')}</List.Item>
            <List.Item>{t('storybook.demo.tennisCourt')}</List.Item>
            <List.Item>{t('storybook.demo.runningTrack')}</List.Item>
          </List.Unordered>
        </List.Item>
      </List.Unordered>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <List.Unordered data-size="sm">
          <List.Item>{t('storybook.demo.smallListItem')} 1</List.Item>
          <List.Item>{t('storybook.demo.smallListItem')} 2</List.Item>
        </List.Unordered>
        <List.Unordered data-size="md">
          <List.Item>{t('storybook.demo.mediumListItem')} 1</List.Item>
          <List.Item>{t('storybook.demo.mediumListItem')} 2</List.Item>
        </List.Unordered>
        <List.Unordered data-size="lg">
          <List.Item>{t('storybook.demo.largeListItem')} 1</List.Item>
          <List.Item>{t('storybook.demo.largeListItem')} 2</List.Item>
        </List.Unordered>
      </div>
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
            {t('storybook.story.unorderedList')}
          </h3>
          <List.Unordered>
            <List.Item>{t('storybook.demo.firstItem')}</List.Item>
            <List.Item>{t('storybook.demo.secondItem')}</List.Item>
            <List.Item>{t('storybook.demo.thirdItem')}</List.Item>
          </List.Unordered>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.orderedList')}
          </h3>
          <List.Ordered>
            <List.Item>{t('storybook.demo.stepOne')}</List.Item>
            <List.Item>{t('storybook.demo.stepTwo')}</List.Item>
            <List.Item>{t('storybook.demo.stepThree')}</List.Item>
          </List.Ordered>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.nestedList')}
          </h3>
          <List.Unordered>
            <List.Item>
              {t('storybook.demo.parentItem')}
              <List.Unordered>
                <List.Item>{t('storybook.demo.childItem')} 1</List.Item>
                <List.Item>{t('storybook.demo.childItem')} 2</List.Item>
              </List.Unordered>
            </List.Item>
          </List.Unordered>
        </div>
      </div>
    );
  },
};
