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
  render: () => (
    <WorkflowCard
      name="Product Vision"
      description="Define the product vision, goals, and target users"
      command="/product-vision"
      status="available"
      onCopyCommand={() => alert('Copied!')}
      onViewDocs={() => alert('View docs')}
    />
  ),
};

export const ComingSoonWorkflow: StoryObj<typeof WorkflowCard> = {
  render: () => (
    <WorkflowCard
      name="Advanced Export"
      description="Export with custom templates and formats"
      command="/export --advanced"
      status="coming_soon"
      prerequisites={['product-vision', 'section-spec']}
    />
  ),
};

export const DeprecatedWorkflow: StoryObj<typeof WorkflowCard> = {
  render: () => (
    <WorkflowCard
      name="Legacy Export"
      description="Old export format (use new export instead)"
      command="/export-v1"
      status="deprecated"
    />
  ),
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
  render: () => (
    <CardGrid>
      <WorkflowCard
        name="Product Vision"
        description="Define the product vision"
        command="/product-vision"
        status="available"
      />
      <WorkflowCard
        name="Product Roadmap"
        description="Break product into phases"
        command="/product-roadmap"
        status="available"
      />
      <WorkflowCard
        name="Data Model"
        description="Define entities and relationships"
        command="/data-model"
        status="available"
      />
    </CardGrid>
  ),
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
  render: () => (
    <ButtonGroup>
      <Button variant="primary" data-size="sm">
        Save
      </Button>
      <Button variant="secondary" data-size="sm">
        Cancel
      </Button>
    </ButtonGroup>
  ),
};

export const CenteredButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: () => (
    <ButtonGroup align="center">
      <Button variant="secondary" data-size="sm">
        Previous
      </Button>
      <Button variant="primary" data-size="sm">
        Next
      </Button>
    </ButtonGroup>
  ),
};

export const EndAlignedButtonGroup: StoryObj<typeof ButtonGroup> = {
  render: () => (
    <ButtonGroup align="end">
      <Button variant="tertiary" data-size="sm">
        Skip
      </Button>
      <Button variant="secondary" data-size="sm">
        Back
      </Button>
      <Button variant="primary" data-size="sm">
        Continue
      </Button>
    </ButtonGroup>
  ),
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
  render: () => (
    <FormGrid columns={2}>
      <Textfield label="First Name" placeholder="Enter first name" />
      <Textfield label="Last Name" placeholder="Enter last name" />
      <Textfield label="Email" placeholder="Enter email" />
      <Textfield label="Phone" placeholder="Enter phone" />
    </FormGrid>
  ),
};

export const ThreeColumnForm: StoryObj<typeof FormGrid> = {
  render: () => (
    <FormGrid columns={3}>
      <Textfield label="City" placeholder="City" />
      <Field>
        <Label>Country</Label>
        <Select>
          <Select.Option value="no">Norway</Select.Option>
          <Select.Option value="se">Sweden</Select.Option>
          <Select.Option value="dk">Denmark</Select.Option>
        </Select>
      </Field>
      <Textfield label="Postal Code" placeholder="Postal code" />
    </FormGrid>
  ),
};

export const SingleColumnForm: StoryObj<typeof FormGrid> = {
  render: () => (
    <FormGrid columns={1}>
      <Textfield label="Full Name" placeholder="Enter your full name" />
      <Textfield label="Description" placeholder="Describe yourself" />
    </FormGrid>
  ),
};
