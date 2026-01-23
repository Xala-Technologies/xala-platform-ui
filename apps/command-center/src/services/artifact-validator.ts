/**
 * Artifact Validator Service
 * 
 * Validates generated artifacts against JSON schemas.
 * Currently uses mock validation - in production, would use ajv or similar.
 */

import { GeneratedArtifact, ValidationResult, ValidationError, ValidationWarning } from '../registry/types';

export class ArtifactValidator {
    /**
     * Validate an artifact against its schema
     */
    async validateArtifact(
        artifact: GeneratedArtifact,
        schema?: Record<string, any>
    ): Promise<ValidationResult> {
        // Mock validation - in production, use ajv or similar JSON Schema validator
        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        // Basic validation based on artifact type
        if (artifact.type === 'json') {
            try {
                if (artifact.content) {
                    JSON.parse(artifact.content);
                } else {
                    errors.push({
                        path: '/',
                        message: 'JSON artifact must have content',
                        code: 'MISSING_CONTENT',
                    });
                }
            } catch (e) {
                errors.push({
                    path: '/',
                    message: `Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`,
                    code: 'INVALID_JSON',
                    suggestedFix: 'Check JSON syntax and ensure all brackets/quotes are properly closed',
                });
            }
        }

        // Validate COMPOSE_*.json schema structure
        if (artifact.path.includes('COMPOSE_') && artifact.type === 'json') {
            const validation = this.validateComposeSchema(artifact);
            errors.push(...validation.errors);
            warnings.push(...validation.warnings);
        }

        // Validate TESTIDS_*.json schema structure
        if (artifact.path.includes('TESTIDS_') && artifact.type === 'json') {
            const validation = this.validateTestIdsSchema(artifact);
            errors.push(...validation.errors);
            warnings.push(...validation.warnings);
        }

        return {
            artifactId: artifact.id,
            artifactPath: artifact.path,
            schema: schema ? 'custom' : 'default',
            valid: errors.length === 0,
            errors,
            warnings,
        };
    }

    /**
     * Validate multiple artifacts
     */
    async validateArtifacts(artifacts: GeneratedArtifact[]): Promise<ValidationResult[]> {
        return Promise.all(artifacts.map(a => this.validateArtifact(a)));
    }

    /**
     * Validate COMPOSE_*.json schema
     */
    private validateComposeSchema(artifact: GeneratedArtifact): {
        errors: ValidationError[];
        warnings: ValidationWarning[];
    } {
        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        if (!artifact.content) {
            return { errors, warnings };
        }

        try {
            const data = JSON.parse(artifact.content);

            // Check required fields
            if (!data.componentName) {
                errors.push({
                    path: '/componentName',
                    message: 'componentName is required',
                    code: 'MISSING_FIELD',
                });
            }

            if (!data.props || typeof data.props !== 'object') {
                errors.push({
                    path: '/props',
                    message: 'props must be an object',
                    code: 'INVALID_TYPE',
                });
            }

            // Check prop structure
            if (data.props && typeof data.props === 'object') {
                for (const [propName, propDef] of Object.entries(data.props)) {
                    if (typeof propDef !== 'object' || propDef === null) {
                        errors.push({
                            path: `/props/${propName}`,
                            message: `Prop ${propName} must be an object`,
                            code: 'INVALID_PROP_TYPE',
                        });
                    } else {
                        if (!propDef.type) {
                            warnings.push({
                                path: `/props/${propName}/type`,
                                message: `Prop ${propName} should have a type`,
                                code: 'MISSING_PROP_TYPE',
                            });
                        }
                    }
                }
            }
        } catch (e) {
            // JSON parse error already handled in main validation
        }

        return { errors, warnings };
    }

    /**
     * Validate TESTIDS_*.json schema
     */
    private validateTestIdsSchema(artifact: GeneratedArtifact): {
        errors: ValidationError[];
        warnings: ValidationWarning[];
    } {
        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        if (!artifact.content) {
            return { errors, warnings };
        }

        try {
            const data = JSON.parse(artifact.content);

            // Check structure
            if (typeof data !== 'object' || data === null) {
                errors.push({
                    path: '/',
                    message: 'TESTIDS must be an object',
                    code: 'INVALID_TYPE',
                });
                return { errors, warnings };
            }

            // Check testid naming convention
            const testIdPattern = /^cc-[a-z-]+$/;
            for (const [key, value] of Object.entries(data)) {
                if (typeof value === 'object' && value !== null) {
                    // Recursively check nested objects
                    this.validateTestIdObject(value, `/${key}`, testIdPattern, errors, warnings);
                } else if (typeof value === 'string') {
                    if (!testIdPattern.test(value)) {
                        errors.push({
                            path: `/${key}`,
                            message: `TestID "${value}" does not follow naming convention (cc-{page}-{component}-{action})`,
                            code: 'INVALID_TESTID_FORMAT',
                            suggestedFix: 'Use format: cc-{page}-{component}-{action}',
                        });
                    }
                }
            }
        } catch (e) {
            // JSON parse error already handled in main validation
        }

        return { errors, warnings };
    }

    /**
     * Recursively validate test ID object structure
     */
    private validateTestIdObject(
        obj: Record<string, any>,
        path: string,
        pattern: RegExp,
        errors: ValidationError[],
        warnings: ValidationWarning[]
    ): void {
        for (const [key, value] of Object.entries(obj)) {
            const currentPath = `${path}/${key}`;
            if (typeof value === 'object' && value !== null) {
                this.validateTestIdObject(value, currentPath, pattern, errors, warnings);
            } else if (typeof value === 'string') {
                if (!pattern.test(value)) {
                    errors.push({
                        path: currentPath,
                        message: `TestID "${value}" does not follow naming convention`,
                        code: 'INVALID_TESTID_FORMAT',
                    });
                }
            }
        }
    }
}

export const artifactValidator = new ArtifactValidator();
