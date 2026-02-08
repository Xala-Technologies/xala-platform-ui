/**
 * WorkflowComponents Stories
 *
 * Storybook stories for workflow-related block components.
 */

import type { Meta, StoryObj } from '@storybook/react';
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
  render: function Render() {
    return (
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
    );
  },
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
  render: function Render() {
    return (
      <WorkflowCard
        name="Eksempel Tekst"
        description="Eksempel Tekst"
        command="/product-vision"
        status="available"
        onCopyCommand={() => alert('Copied!')}
        onViewDocs={() => alert('View docs')}
      />
    );
  },
};

export const ComingSoonWorkflow: StoryObj<typeof WorkflowCard> = {
  render: function Render() {
    return (
      <WorkflowCard
        name="Eksempel Tekst"
        description="Eksempel Tekst"
        command="/export --advanced"
        status="coming_soon"
        prerequisites={['product-vision', 'section-spec']}
      />
    );
  },
};

export const DeprecatedWorkflow: StoryObj<typeof WorkflowCard> = {
  render: function Render() {
    return (
      <WorkflowCard
        name="Eksempel Tekst"
        description="Eksempel Tekst"
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
  render: function Render() {
    return (
      <CardGrid>
        <WorkflowCard
          name="Eksempel Tekst"
          description="Eksempel Tekst"
          command="/product-vision"
          status="available"
        />
        <WorkflowCard
          name="Eksempel Tekst"
          description="Eksempel Tekst"
          command="/product-roadmap"
          status="available"
        />
        <WorkflowCard
          name="Eksempel Tekst"
          description="Eksempel Tekst"
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
  render: function Render() {
    return (
      <ButtonGroup>
        <Button variant="primary" data-size="sm">
          "Eksempel Tekst"
        </Button>
        <Button variant="secondary" data-size="sm">
          "Eksempel Tekst"
        </Button>
      </ButtonGroup>
    );
  },
};

export const CenteredButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: function Render() {
    return (
      <ButtonGroup align="center">
        <Button variant="secondary" data-size="sm">
          "Eksempel Tekst"
        </Button>
        <Button variant="primary" data-size="sm">
          "Eksempel Tekst"
        </Button>
      </ButtonGroup>
    );
  },
};

export const EndAlignedButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: function Render() {
    return (
      <ButtonGroup align="end">
        <Button variant="tertiary" data-size="sm">
          "Eksempel Tekst"
        </Button>
        <Button variant="secondary" data-size="sm">
          "Eksempel Tekst"
        </Button>
        <Button variant="primary" data-size="sm">
          "Eksempel Tekst"
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
  render: function Render() {
    return (
      <FormGrid columns={2}>
        <Textfield label="Eksempel Tekst" placeholder="Eksempel Tekst" />
        <Textfield label="Eksempel Tekst" placeholder="Eksempel Tekst" />
        <Textfield label="Eksempel Tekst" placeholder="Eksempel Tekst" />
        <Textfield
          label="Eksempel Tekst"
          placeholder="Eksempel Tekst"
        />
      </FormGrid>
    );
  },
};

export const ThreeColumnForm: StoryObj<typeof FormGrid> = {
  render: function Render() {
    return (
      <FormGrid columns={3}>
        <Textfield
          label="Eksempel Tekst"
          placeholder="Eksempel Tekst"
        />
        <Field>
          <Label>"Eksempel Tekst"</Label>
          <Select>
            <Select.Option value="no">Norway</Select.Option>
            <Select.Option value="se">Sweden</Select.Option>
            <Select.Option value="dk">Denmark</Select.Option>
          </Select>
        </Field>
        <Textfield
          label="Eksempel Tekst"
          placeholder="Eksempel Tekst"
        />
      </FormGrid>
    );
  },
};

export const SingleColumnForm: StoryObj<typeof FormGrid> = {
  render: function Render() {
    return (
      <FormGrid columns={1}>
        <Textfield label="Eksempel Tekst" placeholder="Eksempel Tekst" />
        <Textfield
          label="Eksempel Tekst"
          placeholder="Eksempel Tekst"
        />
      </FormGrid>
    );
  },
};
