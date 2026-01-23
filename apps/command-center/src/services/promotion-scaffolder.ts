/**
 * Promotion Scaffolder Service
 * 
 * Scaffolds components, Storybook stories, and documentation into platform-ui package
 * when a revision is approved.
 */

import { Revision, PromotionResult, GeneratedArtifact } from '../registry/types';
import { revisionManager } from './revision-manager';

export class PromotionScaffolder {
    /**
     * Promote an approved revision into platform-ui
     */
    async promoteRevision(revisionId: string): Promise<PromotionResult> {
        const revision = revisionManager.getRevision(revisionId);
        if (!revision) {
            return {
                success: false,
                errors: [`Revision ${revisionId} not found`],
            };
        }

        if (revision.status !== 'approved') {
            return {
                success: false,
                errors: [`Revision ${revisionId} is not approved (status: ${revision.status})`],
            };
        }

        const errors: string[] = [];
        const warnings: string[] = [];

        // Extract component information from artifacts
        const composeArtifact = revision.outputs.find(a => a.path.includes('COMPOSE_'));
        const sectionArtifact = revision.outputs.find(a => a.path.includes('SECTION_'));

        if (!composeArtifact || !composeArtifact.content) {
            return {
                success: false,
                errors: ['COMPOSE_*.json artifact not found or empty'],
            };
        }

        try {
            const composeData = JSON.parse(composeArtifact.content);
            const componentName = composeData.componentName || 'Component';
            const layer = composeData.layer || 'blocks'; // Default to blocks

            // Scaffold component
            const componentPath = await this.scaffoldComponent(revision, composeData, layer, componentName);
            if (componentPath) {
                warnings.push(`Component scaffolded at ${componentPath}`);
            }

            // Scaffold Storybook story
            const storybookPath = await this.scaffoldStorybookStory(
                revision,
                composeData,
                layer,
                componentName
            );
            if (storybookPath) {
                warnings.push(`Storybook story scaffolded at ${storybookPath}`);
            }

            // Scaffold documentation
            const docsPath = await this.scaffoldDocumentation(revision, sectionArtifact, componentName);
            if (docsPath) {
                warnings.push(`Documentation scaffolded at ${docsPath}`);
            }

            // Update export files (would be done in real implementation)
            // await this.updateExports(layer, componentName);

            return {
                success: errors.length === 0,
                componentPath,
                storybookPath,
                docsPath,
                errors: errors.length > 0 ? errors : undefined,
                warnings: warnings.length > 0 ? warnings : undefined,
            };
        } catch (error) {
            return {
                success: false,
                errors: [`Failed to parse COMPOSE artifact: ${error instanceof Error ? error.message : 'Unknown error'}`],
            };
        }
    }

    /**
     * Scaffold component file
     */
    private async scaffoldComponent(
        _revision: Revision,
        composeData: any,
        layer: string,
        componentName: string
    ): Promise<string | undefined> {
        // In real implementation, this would write to filesystem
        // For now, return the path that would be created
        const componentPath = `packages/platform-ui/src/${layer}/${componentName}.tsx`;

        // Mock: In real implementation, would generate component code from composeData
        this.generateComponentCode(componentName, composeData);

        // Would write: await writeFile(componentPath, componentCode);
        console.log(`[MOCK] Would scaffold component at ${componentPath}`);

        return componentPath;
    }

    /**
     * Scaffold Storybook story
     */
    private async scaffoldStorybookStory(
        _revision: Revision,
        composeData: any,
        layer: string,
        componentName: string
    ): Promise<string | undefined> {
        const storyPath = `packages/platform-ui/src/stories/${this.getStoryCategory(layer)}/${componentName}.stories.tsx`;

        // Mock: In real implementation, would generate story code
        this.generateStorybookStoryCode(componentName, layer, composeData);

        // Would write: await writeFile(storyPath, storyCode);
        console.log(`[MOCK] Would scaffold story at ${storyPath}`);

        return storyPath;
    }

    /**
     * Scaffold documentation
     */
    private async scaffoldDocumentation(
        _revision: Revision,
        sectionArtifact: GeneratedArtifact | undefined,
        componentName: string
    ): Promise<string | undefined> {
        if (!sectionArtifact || !sectionArtifact.content) {
            return undefined;
        }

        const docsPath = `docs/components/${componentName}.md`;

        // Mock: In real implementation, would process sectionArtifact.content
        // Would write: await writeFile(docsPath, sectionArtifact.content);
        console.log(`[MOCK] Would scaffold docs at ${docsPath}`);

        return docsPath;
    }

    /**
     * Generate component code from compose data
     */
    private generateComponentCode(componentName: string, composeData: any): string {
        const props = composeData.props || {};
        const propsInterface = Object.keys(props)
            .map(key => `  ${key}${props[key].required ? '' : '?'}: ${props[key].type || 'any'};`)
            .join('\n');

        return `/**
 * ${componentName}
 *
 * ${composeData.description || 'Component description'}
 */
import * as React from 'react';
import { ... } from '@digdir/designsystemet-react';

export interface ${componentName}Props {
${propsInterface}
}

export function ${componentName}({ ... }: ${componentName}Props): React.ReactElement {
  return (
    // Component implementation
  );
}

export default ${componentName};
`;
    }

    /**
     * Generate Storybook story code
     */
    private generateStorybookStoryCode(componentName: string, layer: string, _composeData: any): string {
        return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '../../${layer}/${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${this.getStoryCategory(layer)}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    // Default props
  },
};
`;
    }

    /**
     * Get Storybook category from layer
     */
    private getStoryCategory(layer: string): string {
        const categoryMap: Record<string, string> = {
            primitives: 'Components',
            composed: 'Composed',
            blocks: 'Blocks',
            patterns: 'Patterns',
            shells: 'Shells',
        };
        return categoryMap[layer] || 'Components';
    }
}

export const promotionScaffolder = new PromotionScaffolder();
