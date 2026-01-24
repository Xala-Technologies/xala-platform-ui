/**
 * WorkflowComponents Stories
 *
 * Storybook stories for workflow-related block components.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  WorkflowStep,
  WorkflowPipeline,
  WorkflowCard,
  CardGrid,
  ButtonGroup,
  FormGrid,
  Button,
  Textfield,
  Field,
  Label,
  Select,
} from '../../index';

// =============================================================================
// WorkflowStep Stories
// =============================================================================

const workflowStepMeta: Meta<typeof WorkflowStep> = {
  title: 'Blocks/Workflow/WorkflowStep',
  component: WorkflowStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default workflowStepMeta;

type WorkflowStepStory = StoryObj<typeof WorkflowStep>;

export const Default: WorkflowStepStory = {
  args: {
    step: 1,
    name: 'Vision',
  },
};

export const ActiveStep: WorkflowStepStory = {
  args: {
    step: 2,
    name: 'Roadmap',
    active: true,
  },
};

// =============================================================================
// WorkflowPipeline Stories
// =============================================================================

const pipelineMeta: Meta<typeof WorkflowPipeline> = {
  title: 'Blocks/Workflow/WorkflowPipeline',
  component: WorkflowPipeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Pipeline: StoryObj<typeof WorkflowPipeline> = {
  render: () => (
    <WorkflowPipeline
      steps={[
        { step: 1, name: 'Vision' },
        { step: 2, name: 'Roadmap' },
        { step: 3, name: 'Data Model' },
        { step: 4, name: 'Section Specs' },
        { step: 5, name: 'Export' },
      ]}
      activeStep={3}
    />
  ),
};

// =============================================================================
// WorkflowCard Stories
// =============================================================================

const cardMeta: Meta<typeof WorkflowCard> = {
  title: 'Blocks/Workflow/WorkflowCard',
  component: WorkflowCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const AvailableWorkflow: StoryObj<typeof WorkflowCard> = {
  render: () => {
    const t = useT();
    return (
      <WorkflowCard
        name={t('storybook.demo.cardTitle')}
        description={t('storybook.demo.cardDescription')}
        command="/product-vision"
        status="available"
        onCopyCommand={() => alert('Copied!')}
        onViewDocs={() => alert('View docs')}
      />
    );
  },
};

export const ComingSoonWorkflow: StoryObj<typeof WorkflowCard> = {
  render: () => {
    const t = useT();
    return (
      <WorkflowCard
        name={t('storybook.demo.cardTitle')}
        description={t('storybook.demo.cardDescription')}
        command="/export --advanced"
        status="coming_soon"
        prerequisites={['product-vision', 'section-spec']}
      />
    );
  },
};

export const DeprecatedWorkflow: StoryObj<typeof WorkflowCard> = {
  render: () => {
    const t = useT();
    return (
      <WorkflowCard
        name={t('storybook.demo.cardTitle')}
        description={t('storybook.demo.cardDescription')}
        command="/export-v1"
        status="deprecated"
      />
    );
  },
};

// =============================================================================
// CardGrid Stories
// =============================================================================

const cardGridMeta: Meta<typeof CardGrid> = {
  title: 'Blocks/Workflow/CardGrid',
  component: CardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const WorkflowCardGrid: StoryObj<typeof CardGrid> = {
  render: () => {
    const t = useT();
    return (
      <CardGrid>
        <WorkflowCard
          name={t('storybook.demo.cardTitle')}
          description={t('storybook.demo.cardDescription')}
          command="/product-vision"
          status="available"
        />
        <WorkflowCard
          name={t('storybook.demo.cardTitle')}
          description={t('storybook.demo.cardDescription')}
          command="/product-roadmap"
          status="available"
        />
        <WorkflowCard
          name={t('storybook.demo.cardTitle')}
          description={t('storybook.demo.cardDescription')}
          command="/data-model"
          status="available"
        />
      </CardGrid>
    );
  },
};

// =============================================================================
// ButtonGroup Stories
// =============================================================================

const buttonGroupMeta: Meta<typeof ButtonGroup> = {
  title: 'Blocks/Workflow/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const DefaultButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: () => {
    const t = useT();
    return (
      <ButtonGroup>
        <Button variant="primary" data-size="sm">
          {t('platform.common.save')}
        </Button>
        <Button variant="secondary" data-size="sm">
          {t('platform.common.cancel')}
        </Button>
      </ButtonGroup>
    );
  },
};

export const CenteredButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: () => {
    const t = useT();
    return (
      <ButtonGroup align="center">
        <Button variant="secondary" data-size="sm">
          {t('platform.common.back')}
        </Button>
        <Button variant="primary" data-size="sm">
          {t('platform.common.next')}
        </Button>
      </ButtonGroup>
    );
  },
};

export const EndAlignedButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: () => {
    const t = useT();
    return (
      <ButtonGroup align="end">
        <Button variant="tertiary" data-size="sm">
          {t('platform.common.cancel')}
        </Button>
        <Button variant="secondary" data-size="sm">
          {t('platform.common.back')}
        </Button>
        <Button variant="primary" data-size="sm">
          {t('platform.common.confirm')}
        </Button>
      </ButtonGroup>
    );
  },
};

// =============================================================================
// FormGrid Stories
// =============================================================================

const formGridMeta: Meta<typeof FormGrid> = {
  title: 'Blocks/Workflow/FormGrid',
  component: FormGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const TwoColumnForm: StoryObj<typeof FormGrid> = {
  render: () => {
    const t = useT();
    return (
      <FormGrid columns={2}>
        <Textfield label={t('platform.nav.profile')} placeholder={t('storybook.demo.sampleText')} />
        <Textfield label={t('platform.nav.profile')} placeholder={t('storybook.demo.sampleText')} />
        <Textfield label={t('platform.auth.email')} placeholder={t('storybook.demo.sampleText')} />
        <Textfield
          label={t('platform.common.details')}
          placeholder={t('storybook.demo.sampleText')}
        />
      </FormGrid>
    );
  },
};

export const ThreeColumnForm: StoryObj<typeof FormGrid> = {
  render: () => {
    const t = useT();
    return (
      <FormGrid columns={3}>
        <Textfield
          label={t('platform.common.details')}
          placeholder={t('storybook.demo.sampleText')}
        />
        <Field>
          <Label>{t('platform.common.details')}</Label>
          <Select>
            <Select.Option value="no">Norway</Select.Option>
            <Select.Option value="se">Sweden</Select.Option>
            <Select.Option value="dk">Denmark</Select.Option>
          </Select>
        </Field>
        <Textfield
          label={t('platform.common.details')}
          placeholder={t('storybook.demo.sampleText')}
        />
      </FormGrid>
    );
  },
};

export const SingleColumnForm: StoryObj<typeof FormGrid> = {
  render: () => {
    const t = useT();
    return (
      <FormGrid columns={1}>
        <Textfield label={t('platform.nav.profile')} placeholder={t('storybook.demo.sampleText')} />
        <Textfield
          label={t('platform.common.details')}
          placeholder={t('storybook.demo.sampleText')}
        />
      </FormGrid>
    );
  },
};
