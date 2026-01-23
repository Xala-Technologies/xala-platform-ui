/**
 * Schema Validator Service
 * 
 * Validates JSON artifacts against JSON Schemas.
 * Currently uses basic validation - can be enhanced with ajv in the future.
 */

import { GeneratedArtifact, ValidationResult, ValidationError, ValidationWarning } from '../registry/types';

// JSON Schema definitions for artifact types
const COMPOSE_SCHEMA = {
    type: 'object',
    required: ['componentName'],
    properties: {
        componentName: {
            type: 'string',
            description: 'Component name (PascalCase)',
        },
        layer: {
            type: 'string',
            enum: ['primitives', 'composed', 'blocks', 'patterns', 'shells'],
            description: 'Component layer',
        },
        description: {
            type: 'string',
            description: 'Component description',
        },
        props: {
            type: 'object',
            description: 'Component props definition',
            additionalProperties: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        description: 'Prop type (string, number, boolean, etc.)',
                    },
                    required: {
                        type: 'boolean',
                        description: 'Whether prop is required',
                    },
                    description: {
                        type: 'string',
                        description: 'Prop description',
                    },
                    enum: {
                        type: 'array',
                        description: 'Allowed values for enum types',
                    },
                    default: {
                        description: 'Default value',
                    },
                },
            },
        },
    },
};

const TESTIDS_SCHEMA = {
    type: 'object',
    description: 'Test ID mapping object',
    additionalProperties: {
        oneOf: [
            { type: 'string' },
            { type: 'object' },
        ],
    },
};

export class SchemaValidator {
    /**
     * Validate artifact against its schema type
     */
    validateArtifact(artifact: GeneratedArtifact, schemaType?: string): ValidationResult {
        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        if (!artifact.content) {
            errors.push({
                path: '/',
                message: 'Artifact content is empty',
                code: 'EMPTY_CONTENT',
            });
            return {
                artifactId: artifact.id,
                artifactPath: artifact.path,
                schema: schemaType || 'unknown',
                valid: false,
                errors,
                warnings,
            };
        }

        // Determine schema type from artifact path
        const detectedSchemaType = schemaType || this.detectSchemaType(artifact.path);

        try {
            const data = JSON.parse(artifact.content);

            // Validate based on schema type
            switch (detectedSchemaType) {
                case 'compose':
                    this.validateCompose(data, errors, warnings);
                    break;
                case 'testids':
                    this.validateTestIds(data, errors, warnings);
                    break;
                default:
                    // Basic JSON validation
                    this.validateJSON(data, errors, warnings);
            }
        } catch (e) {
            errors.push({
                path: '/',
                message: `Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`,
                code: 'INVALID_JSON',
                suggestedFix: 'Check JSON syntax and ensure all brackets/quotes are properly closed',
            });
        }

        return {
            artifactId: artifact.id,
            artifactPath: artifact.path,
            schema: detectedSchemaType,
            valid: errors.length === 0,
            errors,
            warnings,
        };
    }

    /**
     * Detect schema type from artifact path
     */
    private detectSchemaType(path: string): string {
        if (path.includes('COMPOSE_')) return 'compose';
        if (path.includes('TESTIDS_')) return 'testids';
        if (path.endsWith('.json')) return 'json';
        return 'unknown';
    }

    /**
     * Validate COMPOSE_*.json schema
     */
    private validateCompose(
        data: any,
        errors: ValidationError[],
        warnings: ValidationWarning[]
    ): void {
        const schema = COMPOSE_SCHEMA;

        // Check required fields
        if (!data.componentName) {
            errors.push({
                path: '/componentName',
                message: 'componentName is required',
                code: 'MISSING_REQUIRED_FIELD',
            });
        } else if (typeof data.componentName !== 'string') {
            errors.push({
                path: '/componentName',
                message: 'componentName must be a string',
                code: 'INVALID_TYPE',
            });
        }

        // Check layer
        if (data.layer && !schema.properties.layer.enum.includes(data.layer)) {
            errors.push({
                path: '/layer',
                message: `layer must be one of: ${schema.properties.layer.enum.join(', ')}`,
                code: 'INVALID_ENUM_VALUE',
            });
        }

        // Check props
        if (data.props !== undefined) {
            if (typeof data.props !== 'object' || data.props === null || Array.isArray(data.props)) {
                errors.push({
                    path: '/props',
                    message: 'props must be an object',
                    code: 'INVALID_TYPE',
                    suggestedFix: 'Ensure props is an object with prop definitions',
                });
            } else {
                // Validate each prop
                for (const [propName, propDef] of Object.entries(data.props)) {
                    if (typeof propDef !== 'object' || propDef === null) {
                        errors.push({
                            path: `/props/${propName}`,
                            message: `Prop ${propName} must be an object`,
                            code: 'INVALID_PROP_TYPE',
                        });
                    } else {
                        const prop = propDef as any;
                        if (!prop.type) {
                            warnings.push({
                                path: `/props/${propName}/type`,
                                message: `Prop ${propName} should have a type`,
                                code: 'MISSING_PROP_TYPE',
                            });
                        }
                    }
                }
            }
        }
    }

    /**
     * Validate TESTIDS_*.json schema
     */
    private validateTestIds(
        data: any,
        errors: ValidationError[],
        warnings: ValidationWarning[]
    ): void {
        if (typeof data !== 'object' || data === null) {
            errors.push({
                path: '/',
                message: 'TESTIDS must be an object',
                code: 'INVALID_TYPE',
            });
            return;
        }

        const testIdPattern = /^cc-[a-z-]+$/;
        this.validateTestIdObject(data, '/', testIdPattern, errors, warnings);
    }

    /**
     * Recursively validate test ID object
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
                        message: `TestID "${value}" does not follow naming convention (cc-{page}-{component}-{action})`,
                        code: 'INVALID_TESTID_FORMAT',
                        suggestedFix: 'Use format: cc-{page}-{component}-{action}',
                    });
                }
            }
        }
    }

    /**
     * Basic JSON validation
     */
    private validateJSON(
        data: any,
        errors: ValidationError[],
        warnings: ValidationWarning[]
    ): void {
        // Basic validation - JSON is already parsed
        if (data === null || data === undefined) {
            warnings.push({
                path: '/',
                message: 'JSON data is null or undefined',
                code: 'NULL_DATA',
            });
        }
    }
}

export const schemaValidator = new SchemaValidator();
