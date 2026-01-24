/**
 * Type declarations for virtual CSS modules.
 * These modules are resolved by the bundleCssPlugin in tsup.config.ts
 * and export the CSS content as a string.
 *
 * Virtual modules allow us to bundle CSS from node_modules directly
 * into the platform-ui package, so consuming apps don't need to
 * install @digdir/designsystemet-css or @fontsource/inter.
 */

declare module 'virtual:inter-400' {
  const content: string;
  export default content;
}

declare module 'virtual:inter-500' {
  const content: string;
  export default content;
}

declare module 'virtual:inter-600' {
  const content: string;
  export default content;
}

declare module 'virtual:inter-700' {
  const content: string;
  export default content;
}

declare module 'virtual:designsystemet-css' {
  const content: string;
  export default content;
}

declare module 'virtual:designsystemet-theme' {
  const content: string;
  export default content;
}
