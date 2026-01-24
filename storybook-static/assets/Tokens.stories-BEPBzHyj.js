import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as g}from"./index-ClcD9ViR.js";import{u as a}from"./index-bjNF47ar.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";const oe={title:"Fundamentals/Tokens",parameters:{docs:{description:{component:`
Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure consistency and maintainability.

## Token Categories

- **Colors**: Semantic color tokens for backgrounds, text, borders (accent, neutral, success, warning, danger, info)
- **Spacing**: Consistent spacing scale from 1 (4px) to 16 (64px) for margins, padding, gaps
- **Typography**: Font sizes (xs to xl), weights (regular to bold), line heights
- **Borders**: Border radius (sm to full) and width tokens
- **Shadows**: Elevation tokens (xs to xl) for depth
- **Sizing**: Component dimensions and constraints

## Why Use Tokens?

- **Consistency**: Same values across all components
- **Maintainability**: Change once, update everywhere
- **Theming**: Easy theme switching and customization
- **Accessibility**: Built-in contrast and spacing standards

## Usage Guidelines

Always use design tokens instead of hardcoded values:

\`\`\`tsx
// Bad - Hardcoded values
<div style={{
  padding: '16px',
  color: '#0066CC',
  fontSize: '14px',
  borderRadius: '8px'
}} />

// Good - Design tokens
<div style={{
  padding: 'var(--ds-spacing-4)',
  color: 'var(--ds-color-accent-base-default)',
  fontSize: 'var(--ds-font-size-sm)',
  borderRadius: 'var(--ds-border-radius-md)'
}} />
\`\`\`

## Reference

- [Designsystemet Variables](https://designsystemet.no/en/fundamentals/design-elements/variables)
- [Theme Builder](https://theme.designsystemet.no/)
        `}}},tags:["autodocs"]},i={render:function(){const o=a();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.accentColors")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-color-accent-background-default",labelKey:"storybook.tokens.backgroundDefault"},{token:"--ds-color-accent-surface-default",labelKey:"storybook.tokens.surfaceDefault"},{token:"--ds-color-accent-surface-hover",labelKey:"storybook.tokens.surfaceHover"},{token:"--ds-color-accent-border-default",labelKey:"storybook.tokens.borderDefault"},{token:"--ds-color-accent-base-default",labelKey:"storybook.tokens.baseDefault"},{token:"--ds-color-accent-text-default",labelKey:"storybook.tokens.textDefault"}].map(({token:s,labelKey:n})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-12)",height:"var(--ds-spacing-12)",backgroundColor:`var(${s})`,borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)",flexShrink:0}}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,marginBottom:"var(--ds-spacing-1)"},children:o(n)}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)",wordBreak:"break-all"},children:s})]})]},s))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.neutralColors")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-color-neutral-background-default",labelKey:"storybook.tokens.backgroundDefault"},{token:"--ds-color-neutral-surface-default",labelKey:"storybook.tokens.surfaceDefault"},{token:"--ds-color-neutral-surface-hover",labelKey:"storybook.tokens.surfaceHover"},{token:"--ds-color-neutral-border-default",labelKey:"storybook.tokens.borderDefault"},{token:"--ds-color-neutral-text-default",labelKey:"storybook.tokens.textDefault"},{token:"--ds-color-neutral-text-subtle",labelKey:"storybook.tokens.textSubtle"}].map(({token:s,labelKey:n})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-12)",height:"var(--ds-spacing-12)",backgroundColor:`var(${s})`,borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)",flexShrink:0}}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,marginBottom:"var(--ds-spacing-1)"},children:o(n)}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)",wordBreak:"break-all"},children:s})]})]},s))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.semanticColors")}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"var(--ds-spacing-6)"},children:[{category:o("storybook.notifications.success"),colors:[{token:"--ds-color-success-surface-default",labelKey:"storybook.tokens.surface"},{token:"--ds-color-success-border-default",labelKey:"storybook.tokens.border"},{token:"--ds-color-success-text-default",labelKey:"storybook.tokens.text"}]},{category:o("storybook.notifications.warning"),colors:[{token:"--ds-color-warning-surface-default",labelKey:"storybook.tokens.surface"},{token:"--ds-color-warning-border-default",labelKey:"storybook.tokens.border"},{token:"--ds-color-warning-text-default",labelKey:"storybook.tokens.text"}]},{category:o("storybook.tokens.danger"),colors:[{token:"--ds-color-danger-surface-default",labelKey:"storybook.tokens.surface"},{token:"--ds-color-danger-border-default",labelKey:"storybook.tokens.border"},{token:"--ds-color-danger-text-default",labelKey:"storybook.tokens.text"}]},{category:o("storybook.tokens.info"),colors:[{token:"--ds-color-info-surface-default",labelKey:"storybook.tokens.surface"},{token:"--ds-color-info-border-default",labelKey:"storybook.tokens.border"},{token:"--ds-color-info-text-default",labelKey:"storybook.tokens.text"}]}].map(({category:s,colors:n})=>e.jsxs("div",{children:[e.jsx("h4",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:s}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:n.map(({token:r,labelKey:l})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",padding:"var(--ds-spacing-2)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-8)",height:"var(--ds-spacing-8)",backgroundColor:`var(${r})`,borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)",flexShrink:0}}),e.jsxs("div",{style:{minWidth:0,fontSize:"var(--ds-font-size-xs)"},children:[e.jsx("div",{style:{fontWeight:600},children:o(l)}),e.jsx("code",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:r})]})]},r))})]},s))})]})]})}},c={render:function(){const o=a();return e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.spacingScale")}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.tokens.spacingDescription")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[{token:"1",value:"4px",useKey:"storybook.tokens.tightSpacing"},{token:"2",value:"8px",useKey:"storybook.tokens.smallGaps"},{token:"3",value:"12px",useKey:"storybook.tokens.formFieldGaps"},{token:"4",value:"16px",useKey:"storybook.tokens.standardSpacing"},{token:"6",value:"24px",useKey:"storybook.tokens.cardPadding"},{token:"8",value:"32px",useKey:"storybook.tokens.largeSections"},{token:"12",value:"48px",useKey:"storybook.tokens.majorDivisions"},{token:"16",value:"64px",useKey:"storybook.tokens.pageSections"}].map(({token:s,value:n,useKey:r})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"150px 1fr 200px",gap:"var(--ds-spacing-4)",alignItems:"center",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("code",{style:{fontSize:"var(--ds-font-size-sm)"},children:["--ds-spacing-",s]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)"},children:[e.jsx("div",{style:{width:`var(--ds-spacing-${s})`,height:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-accent-base-default)",borderRadius:"var(--ds-border-radius-sm)"}}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:n})]}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:o(r)})]},s))})]})}},u={render:function(){const o=a(),s=o("storybook.tokens.sampleText");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.fontSizeTokens")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-font-size-xs",labelKey:"storybook.tokens.extraSmall"},{token:"--ds-font-size-sm",labelKey:"storybook.sizes.small"},{token:"--ds-font-size-md",labelKey:"storybook.sizes.medium"},{token:"--ds-font-size-lg",labelKey:"storybook.sizes.large"},{token:"--ds-font-size-xl",labelKey:"storybook.tokens.extraLarge"}].map(({token:n,labelKey:r})=>e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:n}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:o(r)})]}),e.jsx("div",{style:{fontSize:`var(${n})`},children:s})]},n))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.fontWeightTokens")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-font-weight-regular",value:"400",labelKey:"storybook.tokens.regular"},{token:"--ds-font-weight-medium",value:"500",labelKey:"storybook.tokens.medium"},{token:"--ds-font-weight-semibold",value:"600",labelKey:"storybook.tokens.semibold"},{token:"--ds-font-weight-bold",value:"700",labelKey:"storybook.tokens.bold"}].map(({token:n,value:r,labelKey:l})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("span",{style:{fontWeight:`var(${n})`,fontSize:"var(--ds-font-size-4)",minWidth:"150px"},children:[o(l)," (",r,")"]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:n})]},n))})]})]})}},v={render:function(){const o=a();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.borderRadiusTokens")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[{token:"--ds-border-radius-sm",labelKey:"storybook.sizes.small"},{token:"--ds-border-radius-md",labelKey:"storybook.sizes.medium"},{token:"--ds-border-radius-lg",labelKey:"storybook.sizes.large"},{token:"--ds-border-radius-xl",labelKey:"storybook.tokens.extraLarge"},{token:"--ds-border-radius-full",labelKey:"storybook.tokens.full"}].map(({token:s,labelKey:n})=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"100px",height:"100px",backgroundColor:"var(--ds-color-accent-background-default)",border:"2px solid var(--ds-color-accent-border-default)",borderRadius:`var(${s})`,marginBottom:"var(--ds-spacing-2)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,color:"var(--ds-color-accent-text-default)"},children:o(n)})}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:s})]},s))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.shadowTokens")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)",padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-background-subtle)",borderRadius:"var(--ds-border-radius-lg)"},children:["xs","sm","md","lg","xl"].map(s=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"120px",height:"100px",backgroundColor:"var(--ds-color-neutral-background-default)",borderRadius:"var(--ds-border-radius-md)",boxShadow:`var(--ds-shadow-${s})`,marginBottom:"var(--ds-spacing-2)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:s})}),e.jsxs("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:["--ds-shadow-",s]})]},s))})]})]})}},p={render:function(){const o=a(),[s,n]=g.useState("accent"),[r,l]=g.useState("4"),[y,q]=g.useState("md"),[f,J]=g.useState("md");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.interactiveExplorer")}),e.jsx("p",{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-6)"},children:o("storybook.tokens.experimentWithTokens")})]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:o("storybook.tokens.color")}),e.jsxs("select",{value:s,onChange:t=>n(t.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"accent",children:o("storybook.tokens.accent")}),e.jsx("option",{value:"neutral",children:o("storybook.tokens.neutral")}),e.jsx("option",{value:"success",children:o("storybook.notifications.success")}),e.jsx("option",{value:"warning",children:o("storybook.notifications.warning")}),e.jsx("option",{value:"danger",children:o("storybook.tokens.danger")}),e.jsx("option",{value:"info",children:o("storybook.tokens.info")})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:o("storybook.tokens.spacing")}),e.jsxs("select",{value:r,onChange:t=>l(t.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"2",children:"2 (8px)"}),e.jsx("option",{value:"4",children:"4 (16px)"}),e.jsx("option",{value:"6",children:"6 (24px)"}),e.jsx("option",{value:"8",children:"8 (32px)"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:o("storybook.tokens.borderRadius")}),e.jsxs("select",{value:y,onChange:t=>q(t.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"sm",children:o("storybook.sizes.small")}),e.jsx("option",{value:"md",children:o("storybook.sizes.medium")}),e.jsx("option",{value:"lg",children:o("storybook.sizes.large")}),e.jsx("option",{value:"xl",children:o("storybook.tokens.extraLarge")})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:o("storybook.tokens.shadow")}),e.jsxs("select",{value:f,onChange:t=>J(t.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"xs",children:o("storybook.tokens.extraSmall")}),e.jsx("option",{value:"sm",children:o("storybook.sizes.small")}),e.jsx("option",{value:"md",children:o("storybook.sizes.medium")}),e.jsx("option",{value:"lg",children:o("storybook.sizes.large")}),e.jsx("option",{value:"xl",children:o("storybook.tokens.extraLarge")})]})]})]}),e.jsxs("div",{style:{padding:`var(--ds-spacing-${r})`,backgroundColor:`var(--ds-color-${s}-surface-default)`,border:`2px solid var(--ds-color-${s}-border-default)`,borderRadius:`var(--ds-border-radius-${y})`,boxShadow:`var(--ds-shadow-${f})`,color:`var(--ds-color-${s}-text-default)`},children:[e.jsx("h4",{style:{fontSize:"var(--ds-font-size-4)",fontWeight:"var(--ds-font-weight-semibold)",marginBottom:"var(--ds-spacing-2)"},children:o("storybook.tokens.previewCard")}),e.jsx("p",{style:{fontSize:"var(--ds-font-size-sm)"},children:o("storybook.tokens.previewDescription")})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsxs("h4",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,marginBottom:"var(--ds-spacing-2)"},children:[o("storybook.tokens.generatedCSS"),":"]}),e.jsx("pre",{style:{fontSize:"var(--ds-font-size-xs)",margin:0,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:`padding: var(--ds-spacing-${r});
backgroundColor: var(--ds-color-${s}-surface-default);
border: 2px solid var(--ds-color-${s}-border-default);
borderRadius: var(--ds-border-radius-${y});
boxShadow: var(--ds-shadow-${f});
color: var(--ds-color-${s}-text-default);`})]})]})}},b={render:function(){const o=a();return e.jsxs("div",{style:{maxWidth:"600px"},children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:o("storybook.tokens.tokenUsageExample")}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.tokens.tokenUsageDescription")}),e.jsxs("div",{style:{backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-lg)",boxShadow:"var(--ds-shadow-md)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-6)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("h4",{style:{fontSize:"var(--ds-font-size-4)",fontWeight:"var(--ds-font-weight-semibold)",color:"var(--ds-color-neutral-text-default)",marginBottom:"var(--ds-spacing-2)"},children:o("storybook.sizes.cardTitle")}),e.jsx("p",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.tokens.cardTokensOnly")})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-6)"},children:[e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-4)"},children:[e.jsxs("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-3)",backgroundColor:"var(--ds-color-accent-surface-default)",color:"var(--ds-color-accent-text-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",fontWeight:"var(--ds-font-weight-medium)"},children:[o("storybook.sizes.tag")," 1"]}),e.jsxs("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-3)",backgroundColor:"var(--ds-color-success-surface-default)",color:"var(--ds-color-success-text-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",fontWeight:"var(--ds-font-weight-medium)"},children:[o("storybook.sizes.tag")," 2"]})]}),e.jsx("button",{style:{padding:"var(--ds-spacing-2) var(--ds-spacing-4)",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",border:"none",borderRadius:"var(--ds-border-radius-md)",fontSize:"var(--ds-font-size-sm)",fontWeight:"var(--ds-font-weight-medium)",cursor:"pointer"},type:"button",children:o("storybook.tokens.actionButton")})]})]}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)",borderLeft:"4px solid var(--ds-color-info-border-default)"},children:e.jsxs("p",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-info-text-default)",margin:0},children:[e.jsxs("strong",{children:[o("storybook.tokens.tokensUsed"),":"]})," ",o("storybook.tokens.tokensUsedList")]})})]})}};var k,x,m,h,z;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-8)'
    }}>
        {/* Accent Colors */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.accentColors')}
          </h3>
          <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-3)'
        }}>
            {[{
            token: '--ds-color-accent-background-default',
            labelKey: 'storybook.tokens.backgroundDefault'
          }, {
            token: '--ds-color-accent-surface-default',
            labelKey: 'storybook.tokens.surfaceDefault'
          }, {
            token: '--ds-color-accent-surface-hover',
            labelKey: 'storybook.tokens.surfaceHover'
          }, {
            token: '--ds-color-accent-border-default',
            labelKey: 'storybook.tokens.borderDefault'
          }, {
            token: '--ds-color-accent-base-default',
            labelKey: 'storybook.tokens.baseDefault'
          }, {
            token: '--ds-color-accent-text-default',
            labelKey: 'storybook.tokens.textDefault'
          }].map(({
            token,
            labelKey
          }) => <div key={token} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-subtle)'
          }}>
                <div style={{
              width: 'var(--ds-spacing-12)',
              height: 'var(--ds-spacing-12)',
              backgroundColor: \`var(\${token})\`,
              borderRadius: 'var(--ds-border-radius-sm)',
              border: '1px solid var(--ds-color-neutral-border-default)',
              flexShrink: 0
            }} />
                <div style={{
              minWidth: 0
            }}>
                  <div style={{
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
                marginBottom: 'var(--ds-spacing-1)'
              }}>
                    {t(labelKey)}
                  </div>
                  <code style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-neutral-text-subtle)',
                wordBreak: 'break-all'
              }}>
                    {token}
                  </code>
                </div>
              </div>)}
          </div>
        </div>

        {/* Neutral Colors */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.neutralColors')}
          </h3>
          <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-3)'
        }}>
            {[{
            token: '--ds-color-neutral-background-default',
            labelKey: 'storybook.tokens.backgroundDefault'
          }, {
            token: '--ds-color-neutral-surface-default',
            labelKey: 'storybook.tokens.surfaceDefault'
          }, {
            token: '--ds-color-neutral-surface-hover',
            labelKey: 'storybook.tokens.surfaceHover'
          }, {
            token: '--ds-color-neutral-border-default',
            labelKey: 'storybook.tokens.borderDefault'
          }, {
            token: '--ds-color-neutral-text-default',
            labelKey: 'storybook.tokens.textDefault'
          }, {
            token: '--ds-color-neutral-text-subtle',
            labelKey: 'storybook.tokens.textSubtle'
          }].map(({
            token,
            labelKey
          }) => <div key={token} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-subtle)'
          }}>
                <div style={{
              width: 'var(--ds-spacing-12)',
              height: 'var(--ds-spacing-12)',
              backgroundColor: \`var(\${token})\`,
              borderRadius: 'var(--ds-border-radius-sm)',
              border: '1px solid var(--ds-color-neutral-border-default)',
              flexShrink: 0
            }} />
                <div style={{
              minWidth: 0
            }}>
                  <div style={{
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
                marginBottom: 'var(--ds-spacing-1)'
              }}>
                    {t(labelKey)}
                  </div>
                  <code style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-neutral-text-subtle)',
                wordBreak: 'break-all'
              }}>
                    {token}
                  </code>
                </div>
              </div>)}
          </div>
        </div>

        {/* Semantic Colors */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.semanticColors')}
          </h3>
          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--ds-spacing-6)'
        }}>
            {[{
            category: t('storybook.notifications.success'),
            colors: [{
              token: '--ds-color-success-surface-default',
              labelKey: 'storybook.tokens.surface'
            }, {
              token: '--ds-color-success-border-default',
              labelKey: 'storybook.tokens.border'
            }, {
              token: '--ds-color-success-text-default',
              labelKey: 'storybook.tokens.text'
            }]
          }, {
            category: t('storybook.notifications.warning'),
            colors: [{
              token: '--ds-color-warning-surface-default',
              labelKey: 'storybook.tokens.surface'
            }, {
              token: '--ds-color-warning-border-default',
              labelKey: 'storybook.tokens.border'
            }, {
              token: '--ds-color-warning-text-default',
              labelKey: 'storybook.tokens.text'
            }]
          }, {
            category: t('storybook.tokens.danger'),
            colors: [{
              token: '--ds-color-danger-surface-default',
              labelKey: 'storybook.tokens.surface'
            }, {
              token: '--ds-color-danger-border-default',
              labelKey: 'storybook.tokens.border'
            }, {
              token: '--ds-color-danger-text-default',
              labelKey: 'storybook.tokens.text'
            }]
          }, {
            category: t('storybook.tokens.info'),
            colors: [{
              token: '--ds-color-info-surface-default',
              labelKey: 'storybook.tokens.surface'
            }, {
              token: '--ds-color-info-border-default',
              labelKey: 'storybook.tokens.border'
            }, {
              token: '--ds-color-info-text-default',
              labelKey: 'storybook.tokens.text'
            }]
          }].map(({
            category,
            colors
          }) => <div key={category}>
                <h4 style={{
              marginBottom: 'var(--ds-spacing-3)',
              fontSize: 'var(--ds-font-size-4)'
            }}>
                  {category}
                </h4>
                <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-2)'
            }}>
                  {colors.map(({
                token,
                labelKey
              }) => <div key={token} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
                padding: 'var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-sm)'
              }}>
                      <div style={{
                  width: 'var(--ds-spacing-8)',
                  height: 'var(--ds-spacing-8)',
                  backgroundColor: \`var(\${token})\`,
                  borderRadius: 'var(--ds-border-radius-sm)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  flexShrink: 0
                }} />
                      <div style={{
                  minWidth: 0,
                  fontSize: 'var(--ds-font-size-xs)'
                }}>
                        <div style={{
                    fontWeight: 600
                  }}>{t(labelKey)}</div>
                        <code style={{
                    color: 'var(--ds-color-neutral-text-subtle)'
                  }}>
                          {token}
                        </code>
                      </div>
                    </div>)}
                </div>
              </div>)}
          </div>
        </div>
      </div>;
  }
}`,...(m=(x=i.parameters)==null?void 0:x.docs)==null?void 0:m.source},description:{story:"Color tokens organized by semantic meaning",...(z=(h=i.parameters)==null?void 0:h.docs)==null?void 0:z.description}}};var S,j,w,K,C;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-4)',
        fontSize: 'var(--ds-font-size-5)'
      }}>
          {t('storybook.tokens.spacingScale')}
        </h3>
        <p style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.tokens.spacingDescription')}
        </p>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-2)'
      }}>
          {[{
          token: '1',
          value: '4px',
          useKey: 'storybook.tokens.tightSpacing'
        }, {
          token: '2',
          value: '8px',
          useKey: 'storybook.tokens.smallGaps'
        }, {
          token: '3',
          value: '12px',
          useKey: 'storybook.tokens.formFieldGaps'
        }, {
          token: '4',
          value: '16px',
          useKey: 'storybook.tokens.standardSpacing'
        }, {
          token: '6',
          value: '24px',
          useKey: 'storybook.tokens.cardPadding'
        }, {
          token: '8',
          value: '32px',
          useKey: 'storybook.tokens.largeSections'
        }, {
          token: '12',
          value: '48px',
          useKey: 'storybook.tokens.majorDivisions'
        }, {
          token: '16',
          value: '64px',
          useKey: 'storybook.tokens.pageSections'
        }].map(({
          token,
          value,
          useKey
        }) => <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr 200px',
          gap: 'var(--ds-spacing-4)',
          alignItems: 'center',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
              <code style={{
            fontSize: 'var(--ds-font-size-sm)'
          }}>--ds-spacing-{token}</code>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)'
          }}>
                <div style={{
              width: \`var(--ds-spacing-\${token})\`,
              height: 'var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-accent-base-default)',
              borderRadius: 'var(--ds-border-radius-sm)'
            }} />
                <span style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {value}
                </span>
              </div>
              <span style={{
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
                {t(useKey)}
              </span>
            </div>)}
        </div>
      </div>;
  }
}`,...(w=(j=c.parameters)==null?void 0:j.docs)==null?void 0:w.source},description:{story:"Spacing tokens for consistent rhythm",...(C=(K=c.parameters)==null?void 0:K.docs)==null?void 0:C.description}}};var R,B,W,T,D;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const sampleText = t('storybook.tokens.sampleText');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-8)'
    }}>
        {/* Font Sizes */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.fontSizeTokens')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            {[{
            token: '--ds-font-size-xs',
            labelKey: 'storybook.tokens.extraSmall'
          }, {
            token: '--ds-font-size-sm',
            labelKey: 'storybook.sizes.small'
          }, {
            token: '--ds-font-size-md',
            labelKey: 'storybook.sizes.medium'
          }, {
            token: '--ds-font-size-lg',
            labelKey: 'storybook.sizes.large'
          }, {
            token: '--ds-font-size-xl',
            labelKey: 'storybook.tokens.extraLarge'
          }].map(({
            token,
            labelKey
          }) => <div key={token} style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-subtle)'
          }}>
                <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--ds-spacing-2)'
            }}>
                  <code style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-neutral-text-subtle)'
              }}>
                    {token}
                  </code>
                  <span style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-neutral-text-subtle)'
              }}>
                    {t(labelKey)}
                  </span>
                </div>
                <div style={{
              fontSize: \`var(\${token})\`
            }}>{sampleText}</div>
              </div>)}
          </div>
        </div>

        {/* Font Weights */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.fontWeightTokens')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            {[{
            token: '--ds-font-weight-regular',
            value: '400',
            labelKey: 'storybook.tokens.regular'
          }, {
            token: '--ds-font-weight-medium',
            value: '500',
            labelKey: 'storybook.tokens.medium'
          }, {
            token: '--ds-font-weight-semibold',
            value: '600',
            labelKey: 'storybook.tokens.semibold'
          }, {
            token: '--ds-font-weight-bold',
            value: '700',
            labelKey: 'storybook.tokens.bold'
          }].map(({
            token,
            value,
            labelKey
          }) => <div key={token} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)'
          }}>
                <span style={{
              fontWeight: \`var(\${token})\`,
              fontSize: 'var(--ds-font-size-4)',
              minWidth: '150px'
            }}>
                  {t(labelKey)} ({value})
                </span>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {token}
                </code>
              </div>)}
          </div>
        </div>
      </div>;
  }
}`,...(W=(B=u.parameters)==null?void 0:B.docs)==null?void 0:W.source},description:{story:"Typography tokens for text styling",...(D=(T=u.parameters)==null?void 0:T.docs)==null?void 0:D.description}}};var $,I,E,L,U;v.parameters={...v.parameters,docs:{...($=v.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-8)'
    }}>
        {/* Border Radius */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.borderRadiusTokens')}
          </h3>
          <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-4)'
        }}>
            {[{
            token: '--ds-border-radius-sm',
            labelKey: 'storybook.sizes.small'
          }, {
            token: '--ds-border-radius-md',
            labelKey: 'storybook.sizes.medium'
          }, {
            token: '--ds-border-radius-lg',
            labelKey: 'storybook.sizes.large'
          }, {
            token: '--ds-border-radius-xl',
            labelKey: 'storybook.tokens.extraLarge'
          }, {
            token: '--ds-border-radius-full',
            labelKey: 'storybook.tokens.full'
          }].map(({
            token,
            labelKey
          }) => <div key={token} style={{
            textAlign: 'center'
          }}>
                <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--ds-color-accent-background-default)',
              border: '2px solid var(--ds-color-accent-border-default)',
              borderRadius: \`var(\${token})\`,
              marginBottom: 'var(--ds-spacing-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                  <span style={{
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
                color: 'var(--ds-color-accent-text-default)'
              }}>
                    {t(labelKey)}
                  </span>
                </div>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {token}
                </code>
              </div>)}
          </div>
        </div>

        {/* Shadows */}
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.shadowTokens')}
          </h3>
          <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-6)',
          padding: 'var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-background-subtle)',
          borderRadius: 'var(--ds-border-radius-lg)'
        }}>
            {['xs', 'sm', 'md', 'lg', 'xl'].map(size => <div key={size} style={{
            textAlign: 'center'
          }}>
                <div style={{
              width: '120px',
              height: '100px',
              backgroundColor: 'var(--ds-color-neutral-background-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              boxShadow: \`var(--ds-shadow-\${size})\`,
              marginBottom: 'var(--ds-spacing-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                  <span style={{
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600
              }}>
                    {size}
                  </span>
                </div>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  --ds-shadow-{size}
                </code>
              </div>)}
          </div>
        </div>
      </div>;
  }
}`,...(E=(I=v.parameters)==null?void 0:I.docs)==null?void 0:E.source},description:{story:"Border and shadow tokens",...(U=(L=v.parameters)==null?void 0:L.docs)==null?void 0:U.description}}};var A,F,G,H,O;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selectedColor, setSelectedColor] = useState('accent');
    const [selectedSpacing, setSelectedSpacing] = useState('4');
    const [selectedRadius, setSelectedRadius] = useState('md');
    const [selectedShadow, setSelectedShadow] = useState('md');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-4)',
          fontSize: 'var(--ds-font-size-5)'
        }}>
            {t('storybook.tokens.interactiveExplorer')}
          </h3>
          <p style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            {t('storybook.tokens.experimentWithTokens')}
          </p>
        </div>

        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-4)'
      }}>
          <div>
            <label style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 600
          }}>
              {t('storybook.tokens.color')}
            </label>
            <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="accent">{t('storybook.tokens.accent')}</option>
              <option value="neutral">{t('storybook.tokens.neutral')}</option>
              <option value="success">{t('storybook.notifications.success')}</option>
              <option value="warning">{t('storybook.notifications.warning')}</option>
              <option value="danger">{t('storybook.tokens.danger')}</option>
              <option value="info">{t('storybook.tokens.info')}</option>
            </select>
          </div>

          <div>
            <label style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 600
          }}>
              {t('storybook.tokens.spacing')}
            </label>
            <select value={selectedSpacing} onChange={e => setSelectedSpacing(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="2">2 (8px)</option>
              <option value="4">4 (16px)</option>
              <option value="6">6 (24px)</option>
              <option value="8">8 (32px)</option>
            </select>
          </div>

          <div>
            <label style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 600
          }}>
              {t('storybook.tokens.borderRadius')}
            </label>
            <select value={selectedRadius} onChange={e => setSelectedRadius(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="sm">{t('storybook.sizes.small')}</option>
              <option value="md">{t('storybook.sizes.medium')}</option>
              <option value="lg">{t('storybook.sizes.large')}</option>
              <option value="xl">{t('storybook.tokens.extraLarge')}</option>
            </select>
          </div>

          <div>
            <label style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 600
          }}>
              {t('storybook.tokens.shadow')}
            </label>
            <select value={selectedShadow} onChange={e => setSelectedShadow(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="xs">{t('storybook.tokens.extraSmall')}</option>
              <option value="sm">{t('storybook.sizes.small')}</option>
              <option value="md">{t('storybook.sizes.medium')}</option>
              <option value="lg">{t('storybook.sizes.large')}</option>
              <option value="xl">{t('storybook.tokens.extraLarge')}</option>
            </select>
          </div>
        </div>

        <div style={{
        padding: \`var(--ds-spacing-\${selectedSpacing})\`,
        backgroundColor: \`var(--ds-color-\${selectedColor}-surface-default)\`,
        border: \`2px solid var(--ds-color-\${selectedColor}-border-default)\`,
        borderRadius: \`var(--ds-border-radius-\${selectedRadius})\`,
        boxShadow: \`var(--ds-shadow-\${selectedShadow})\`,
        color: \`var(--ds-color-\${selectedColor}-text-default)\`
      }}>
          <h4 style={{
          fontSize: 'var(--ds-font-size-4)',
          fontWeight: 'var(--ds-font-weight-semibold)',
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.tokens.previewCard')}
          </h4>
          <p style={{
          fontSize: 'var(--ds-font-size-sm)'
        }}>
            {t('storybook.tokens.previewDescription')}
          </p>
        </div>

        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        border: '1px solid var(--ds-color-neutral-border-subtle)'
      }}>
          <h4 style={{
          fontSize: 'var(--ds-font-size-sm)',
          fontWeight: 600,
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.tokens.generatedCSS')}:
          </h4>
          <pre style={{
          fontSize: 'var(--ds-font-size-xs)',
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
            {\`padding: var(--ds-spacing-\${selectedSpacing});
backgroundColor: var(--ds-color-\${selectedColor}-surface-default);
border: 2px solid var(--ds-color-\${selectedColor}-border-default);
borderRadius: var(--ds-border-radius-\${selectedRadius});
boxShadow: var(--ds-shadow-\${selectedShadow});
color: var(--ds-color-\${selectedColor}-text-default);\`}
          </pre>
        </div>
      </div>;
  }
}`,...(G=(F=p.parameters)==null?void 0:F.docs)==null?void 0:G.source},description:{story:"Interactive token explorer - Test different token combinations",...(O=(H=p.parameters)==null?void 0:H.docs)==null?void 0:O.description}}};var P,_,M,N,V;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      maxWidth: '600px'
    }}>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-4)',
        fontSize: 'var(--ds-font-size-5)'
      }}>
          {t('storybook.tokens.tokenUsageExample')}
        </h3>
        <p style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.tokens.tokenUsageDescription')}
        </p>

        <div style={{
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        boxShadow: 'var(--ds-shadow-md)',
        overflow: 'hidden'
      }}>
          <div style={{
          padding: 'var(--ds-spacing-6)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
        }}>
            <h4 style={{
            fontSize: 'var(--ds-font-size-4)',
            fontWeight: 'var(--ds-font-weight-semibold)',
            color: 'var(--ds-color-neutral-text-default)',
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              {t('storybook.sizes.cardTitle')}
            </h4>
            <p style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.tokens.cardTokensOnly')}
            </p>
          </div>

          <div style={{
          padding: 'var(--ds-spacing-6)'
        }}>
            <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
              <span style={{
              padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              color: 'var(--ds-color-accent-text-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              fontWeight: 'var(--ds-font-weight-medium)'
            }}>
                {t('storybook.sizes.tag')} 1
              </span>
              <span style={{
              padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-success-surface-default)',
              color: 'var(--ds-color-success-text-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              fontWeight: 'var(--ds-font-weight-medium)'
            }}>
                {t('storybook.sizes.tag')} 2
              </span>
            </div>

            <button style={{
            padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-accent-base-default)',
            color: 'var(--ds-color-accent-contrast-default)',
            border: 'none',
            borderRadius: 'var(--ds-border-radius-md)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 'var(--ds-font-weight-medium)',
            cursor: 'pointer'
          }} type="button">
              {t('storybook.tokens.actionButton')}
            </button>
          </div>
        </div>

        <div style={{
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        borderLeft: '4px solid var(--ds-color-info-border-default)'
      }}>
          <p style={{
          fontSize: 'var(--ds-font-size-sm)',
          color: 'var(--ds-color-info-text-default)',
          margin: 0
        }}>
            <strong>{t('storybook.tokens.tokensUsed')}:</strong>{' '}
            {t('storybook.tokens.tokensUsedList')}
          </p>
        </div>
      </div>;
  }
}`,...(M=(_=b.parameters)==null?void 0:_.docs)==null?void 0:M.source},description:{story:"Complete token usage example",...(V=(N=b.parameters)==null?void 0:N.docs)==null?void 0:V.description}}};const se=["ColorTokens","SpacingTokens","TypographyTokens","BorderAndShadowTokens","InteractiveExplorer","TokenUsageExample"];export{v as BorderAndShadowTokens,i as ColorTokens,p as InteractiveExplorer,c as SpacingTokens,b as TokenUsageExample,u as TypographyTokens,se as __namedExportsOrder,oe as default};
//# sourceMappingURL=Tokens.stories-BEPBzHyj.js.map
