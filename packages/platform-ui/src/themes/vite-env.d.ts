/// <reference types="vite/client" />

// CSS imports as raw strings
declare module '*.css?raw' {
  const content: string;
  export default content;
}

declare module './xala.css?raw' {
  const content: string;
  export default content;
}

declare module './xala-extensions.css?raw' {
  const content: string;
  export default content;
}

// Legacy theme module declarations (for reference)
declare module '@digdir/designsystemet-theme/digdir.css' {
  const content: string;
  export default content;
}

declare module '@digdir/designsystemet-theme/altinn.css' {
  const content: string;
  export default content;
}

declare module '@digdir/designsystemet-theme/uutilsynet.css' {
  const content: string;
  export default content;
}

declare module '@digdir/designsystemet-theme/portal.css' {
  const content: string;
  export default content;
}
