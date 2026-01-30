import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'schemas/index': 'src/schemas/index.ts',
    'eslint/index': 'src/eslint/index.ts',
    'eslint/element-mappings': 'src/eslint/element-mappings.ts',
    'testing/index': 'src/testing/index.ts',
    'compliance/index': 'src/compliance/index.ts',
    'compliance/provider-check': 'src/compliance/provider-check.ts',
    'install/index': 'src/install/index.ts',
    'install/cli-installer': 'src/install/cli-installer.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
});
