import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { TaskCard } from '../../index';

/**
 * TaskCard displays a task with status, priority, phase, and complexity.
 *
 * ## Features
 * - Task status badges
 * - Priority indicators
 * - Complexity levels
 * - Phase tracking
 * - Progress indicators
 * - Category icons
 *
 * ## When to Use
 * - Kanban boards
 * - Task lists
 * - Project management UIs
 */
const meta: Meta<typeof TaskCard> = {
  title: 'Blocks/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
TaskCard displays a task with status, priority, phase, and complexity.

## Features
- Task status badges (backlog, todo, in_progress, review, done, blocked)
- Priority indicators (low, medium, high, critical)
- Complexity levels (trivial, simple, moderate, complex, epic)
- Phase tracking (design, development, testing, deployment, maintenance)
- Progress indicators
- Category icons (feature, bug, refactor, docs, test, chore)

## When to Use
- Kanban boards
- Task lists
- Project management UIs
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

/**
 * Default task card
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.implementUserAuth')}
          description={t('storybook.taskCard.implementUserAuthDescription')}
          status="in_progress"
          priority="high"
          complexity="moderate"
          phase="development"
          category="feature"
        />
      </div>
    );
  },
};

/**
 * Task card with all details
 */
export const WithAllDetails: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.fixLoginBug')}
          description={t('storybook.taskCard.fixLoginBugDescription')}
          status="todo"
          priority="critical"
          complexity="simple"
          phase="testing"
          category="bug"
          assignee={t('storybook.taskCard.johnDoe')}
          dueDate={new Date(2026, 1, 15)}
          progress={75}
          tags={[t('storybook.taskCard.frontend'), t('storybook.taskCard.authentication')]}
        />
      </div>
    );
  },
};

/**
 * Task card - done status
 */
export const Done: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.updateDocumentation')}
          description={t('storybook.taskCard.updateDocumentationDescription')}
          status="done"
          priority="low"
          complexity="simple"
          phase="maintenance"
          category="docs"
          progress={100}
        />
      </div>
    );
  },
};

/**
 * Task card - blocked status
 */
export const Blocked: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.refactorApi')}
          description={t('storybook.taskCard.refactorApiDescription')}
          status="blocked"
          priority="high"
          complexity="complex"
          phase="development"
          category="refactor"
        />
      </div>
    );
  },
};

/**
 * Task card - in review
 */
export const InReview: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.addNewFeature')}
          description={t('storybook.taskCard.addNewFeatureDescription')}
          status="review"
          priority="medium"
          complexity="moderate"
          phase="testing"
          category="feature"
          progress={90}
        />
      </div>
    );
  },
};

/**
 * Task card - backlog
 */
export const Backlog: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.improvePerformance')}
          description={t('storybook.taskCard.improvePerformanceDescription')}
          status="backlog"
          priority="low"
          complexity="epic"
          phase="design"
          category="feature"
        />
      </div>
    );
  },
};

/**
 * Task card - selected state
 */
export const Selected: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.implementUserAuth')}
          description={t('storybook.taskCard.implementUserAuthDescription')}
          status="in_progress"
          priority="high"
          complexity="moderate"
          phase="development"
          category="feature"
          selected
        />
      </div>
    );
  },
};

/**
 * Task card - minimal
 */
export const Minimal: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px' }}>
        <TaskCard
          title={t('storybook.taskCard.simpleTask')}
          status="todo"
          priority="low"
        />
      </div>
    );
  },
};
