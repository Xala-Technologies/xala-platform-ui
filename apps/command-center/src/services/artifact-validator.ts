/**
 * Artifact Validator Service
 * 
 * Validates generated artifacts against JSON schemas.
 * Uses SchemaValidator for JSON Schema validation.
 */

import { GeneratedArtifact, ValidationResult } from '../registry/types';
import { schemaValidator } from './schema-validator';

export class ArtifactValidator {
    /**
     * Validate an artifact against its schema
     */
    async validateArtifact(
        artifact: GeneratedArtifact,
        schema?: Record<string, any>
    ): Promise<ValidationResult> {
        // Use SchemaValidator for JSON Schema validation
        const schemaType = schema ? 'custom' : undefined;
        return schemaValidator.validateArtifact(artifact, schemaType);
    }

    /**
     * Validate multiple artifacts
     */
    async validateArtifacts(artifacts: GeneratedArtifact[]): Promise<ValidationResult[]> {
        return Promise.all(artifacts.map(a => this.validateArtifact(a)));
    }
}

export const artifactValidator = new ArtifactValidator();
