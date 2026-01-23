/**
 * ArtifactValidationPanel Stories
 *
 * Storybook stories for the ArtifactValidationPanel component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ArtifactValidationPanel } from '../components/artifacts/ArtifactValidationPanel';
import type { ValidationResult } from '../registry/types';

const meta: Meta<typeof ArtifactValidationPanel> = {
  title: 'CommandCenter/Artifacts/ArtifactValidationPanel',
  component: ArtifactValidationPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArtifactValidationPanel>;

const validResult: ValidationResult = {
  artifactId: '1',
  artifactPath: '/generated/COMPOSE_ResourceCard.json',
  schema: 'compose',
  valid: true,
  errors: [],
  warnings: [],
};

const invalidResult: ValidationResult = {
  artifactId: '1',
  artifactPath: '/generated/COMPOSE_ResourceCard.json',
  schema: 'compose',
  valid: false,
  errors: [
    {
      path: '/componentName',
      message: 'componentName is required',
      code: 'MISSING_FIELD',
    },
    {
      path: '/props',
      message: 'props must be an object',
      code: 'INVALID_TYPE',
      suggestedFix: 'Ensure props is an object with prop definitions',
    },
  ],
  warnings: [
    {
      path: '/props/title/type',
      message: 'Prop title should have a type',
      code: 'MISSING_PROP_TYPE',
    },
  ],
};

const withWarningsResult: ValidationResult = {
  artifactId: '1',
  artifactPath: '/generated/COMPOSE_ResourceCard.json',
  schema: 'compose',
  valid: true,
  errors: [],
  warnings: [
    {
      path: '/props/title/type',
      message: 'Prop title should have a type',
      code: 'MISSING_PROP_TYPE',
    },
  ],
};

export const Valid: Story = {
  args: {
    validationResult: validResult,
  },
};

export const Invalid: Story = {
  args: {
    validationResult: invalidResult,
  },
};

export const WithWarnings: Story = {
  args: {
    validationResult: withWarningsResult,
  },
};
