import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as u}from"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const Q={title:"Fundamentals/Tokens",parameters:{docs:{description:{component:`
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
// ❌ Bad - Hardcoded values
<div style={{ 
  padding: '16px', 
  color: '#0066CC',
  fontSize: '14px',
  borderRadius: '8px'
}} />

// ✅ Good - Design tokens
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
        `}}},tags:["autodocs"]},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Accent Colors"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-color-accent-background-default",label:"Background Default"},{token:"--ds-color-accent-surface-default",label:"Surface Default"},{token:"--ds-color-accent-surface-hover",label:"Surface Hover"},{token:"--ds-color-accent-border-default",label:"Border Default"},{token:"--ds-color-accent-base-default",label:"Base Default"},{token:"--ds-color-accent-text-default",label:"Text Default"}].map(({token:n,label:r})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-12)",height:"var(--ds-spacing-12)",backgroundColor:`var(${n})`,borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)",flexShrink:0}}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,marginBottom:"var(--ds-spacing-1)"},children:r}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)",wordBreak:"break-all"},children:n})]})]},n))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Neutral Colors"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-color-neutral-background-default",label:"Background Default"},{token:"--ds-color-neutral-surface-default",label:"Surface Default"},{token:"--ds-color-neutral-surface-hover",label:"Surface Hover"},{token:"--ds-color-neutral-border-default",label:"Border Default"},{token:"--ds-color-neutral-text-default",label:"Text Default"},{token:"--ds-color-neutral-text-subtle",label:"Text Subtle"}].map(({token:n,label:r})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-12)",height:"var(--ds-spacing-12)",backgroundColor:`var(${n})`,borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)",flexShrink:0}}),e.jsxs("div",{style:{minWidth:0},children:[e.jsx("div",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,marginBottom:"var(--ds-spacing-1)"},children:r}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)",wordBreak:"break-all"},children:n})]})]},n))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Semantic Colors"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"var(--ds-spacing-6)"},children:[{category:"Success",colors:[{token:"--ds-color-success-surface-default",label:"Surface"},{token:"--ds-color-success-border-default",label:"Border"},{token:"--ds-color-success-text-default",label:"Text"}]},{category:"Warning",colors:[{token:"--ds-color-warning-surface-default",label:"Surface"},{token:"--ds-color-warning-border-default",label:"Border"},{token:"--ds-color-warning-text-default",label:"Text"}]},{category:"Danger",colors:[{token:"--ds-color-danger-surface-default",label:"Surface"},{token:"--ds-color-danger-border-default",label:"Border"},{token:"--ds-color-danger-text-default",label:"Text"}]},{category:"Info",colors:[{token:"--ds-color-info-surface-default",label:"Surface"},{token:"--ds-color-info-border-default",label:"Border"},{token:"--ds-color-info-text-default",label:"Text"}]}].map(({category:n,colors:r})=>e.jsxs("div",{children:[e.jsx("h4",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:n}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:r.map(({token:s,label:v})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",padding:"var(--ds-spacing-2)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-8)",height:"var(--ds-spacing-8)",backgroundColor:`var(${s})`,borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)",flexShrink:0}}),e.jsxs("div",{style:{minWidth:0,fontSize:"var(--ds-font-size-xs)"},children:[e.jsx("div",{style:{fontWeight:600},children:v}),e.jsx("code",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:s})]})]},s))})]},n))})]})]})},d={render:()=>e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Spacing Scale"}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"Use spacing tokens for padding, margin, and gaps to maintain consistent rhythm."}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[{token:"1",value:"4px",use:"Tight spacing, icon gaps"},{token:"2",value:"8px",use:"Small gaps, compact layouts"},{token:"3",value:"12px",use:"Form field gaps"},{token:"4",value:"16px",use:"Standard spacing"},{token:"6",value:"24px",use:"Card padding, section gaps"},{token:"8",value:"32px",use:"Large sections"},{token:"12",value:"48px",use:"Major divisions"},{token:"16",value:"64px",use:"Page sections"}].map(({token:n,value:r,use:s})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"150px 1fr 200px",gap:"var(--ds-spacing-4)",alignItems:"center",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("code",{style:{fontSize:"var(--ds-font-size-sm)"},children:["--ds-spacing-",n]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)"},children:[e.jsx("div",{style:{width:`var(--ds-spacing-${n})`,height:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-accent-base-default)",borderRadius:"var(--ds-border-radius-sm)"}}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:r})]}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:s})]},n))})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Font Size Tokens"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-font-size-xs",label:"Extra Small",sample:"The quick brown fox"},{token:"--ds-font-size-sm",label:"Small",sample:"The quick brown fox"},{token:"--ds-font-size-md",label:"Medium",sample:"The quick brown fox"},{token:"--ds-font-size-lg",label:"Large",sample:"The quick brown fox"},{token:"--ds-font-size-xl",label:"Extra Large",sample:"The quick brown fox"}].map(({token:n,label:r,sample:s})=>e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:n}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:r})]}),e.jsx("div",{style:{fontSize:`var(${n})`},children:s})]},n))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Font Weight Tokens"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[{token:"--ds-font-weight-regular",value:"400",label:"Regular"},{token:"--ds-font-weight-medium",value:"500",label:"Medium"},{token:"--ds-font-weight-semibold",value:"600",label:"Semibold"},{token:"--ds-font-weight-bold",value:"700",label:"Bold"}].map(({token:n,value:r,label:s})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("span",{style:{fontWeight:`var(${n})`,fontSize:"var(--ds-font-size-4)",minWidth:"150px"},children:[s," (",r,")"]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:n})]},n))})]})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Border Radius Tokens"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[{token:"--ds-border-radius-sm",label:"Small"},{token:"--ds-border-radius-md",label:"Medium"},{token:"--ds-border-radius-lg",label:"Large"},{token:"--ds-border-radius-xl",label:"Extra Large"},{token:"--ds-border-radius-full",label:"Full"}].map(({token:n,label:r})=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"100px",height:"100px",backgroundColor:"var(--ds-color-accent-background-default)",border:"2px solid var(--ds-color-accent-border-default)",borderRadius:`var(${n})`,marginBottom:"var(--ds-spacing-2)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,color:"var(--ds-color-accent-text-default)"},children:r})}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:n})]},n))})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Shadow Tokens"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)",padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-background-subtle)",borderRadius:"var(--ds-border-radius-lg)"},children:["xs","sm","md","lg","xl"].map(n=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"120px",height:"100px",backgroundColor:"var(--ds-color-neutral-background-default)",borderRadius:"var(--ds-border-radius-md)",boxShadow:`var(--ds-shadow-${n})`,marginBottom:"var(--ds-spacing-2)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:n})}),e.jsxs("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:["--ds-shadow-",n]})]},n))})]})]})},i={render:()=>{const[n,r]=u.useState("accent"),[s,v]=u.useState("4"),[p,_]=u.useState("md"),[g,O]=u.useState("md");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Interactive Token Explorer"}),e.jsx("p",{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-6)"},children:"Experiment with different token combinations to see how they work together."})]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:"Color"}),e.jsxs("select",{value:n,onChange:a=>r(a.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"accent",children:"Accent"}),e.jsx("option",{value:"neutral",children:"Neutral"}),e.jsx("option",{value:"success",children:"Success"}),e.jsx("option",{value:"warning",children:"Warning"}),e.jsx("option",{value:"danger",children:"Danger"}),e.jsx("option",{value:"info",children:"Info"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:"Spacing"}),e.jsxs("select",{value:s,onChange:a=>v(a.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"2",children:"2 (8px)"}),e.jsx("option",{value:"4",children:"4 (16px)"}),e.jsx("option",{value:"6",children:"6 (24px)"}),e.jsx("option",{value:"8",children:"8 (32px)"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:"Border Radius"}),e.jsxs("select",{value:p,onChange:a=>_(a.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"sm",children:"Small"}),e.jsx("option",{value:"md",children:"Medium"}),e.jsx("option",{value:"lg",children:"Large"}),e.jsx("option",{value:"xl",children:"Extra Large"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:"Shadow"}),e.jsxs("select",{value:g,onChange:a=>O(a.target.value),style:{width:"100%",padding:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-sm)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[e.jsx("option",{value:"xs",children:"Extra Small"}),e.jsx("option",{value:"sm",children:"Small"}),e.jsx("option",{value:"md",children:"Medium"}),e.jsx("option",{value:"lg",children:"Large"}),e.jsx("option",{value:"xl",children:"Extra Large"})]})]})]}),e.jsxs("div",{style:{padding:`var(--ds-spacing-${s})`,backgroundColor:`var(--ds-color-${n}-surface-default)`,border:`2px solid var(--ds-color-${n}-border-default)`,borderRadius:`var(--ds-border-radius-${p})`,boxShadow:`var(--ds-shadow-${g})`,color:`var(--ds-color-${n}-text-default)`},children:[e.jsx("h4",{style:{fontSize:"var(--ds-font-size-4)",fontWeight:"var(--ds-font-weight-semibold)",marginBottom:"var(--ds-spacing-2)"},children:"Preview Card"}),e.jsx("p",{style:{fontSize:"var(--ds-font-size-sm)"},children:"This card updates in real-time as you change the token selections above."})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("h4",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600,marginBottom:"var(--ds-spacing-2)"},children:"Generated CSS:"}),e.jsx("pre",{style:{fontSize:"var(--ds-font-size-xs)",margin:0,whiteSpace:"pre-wrap",wordBreak:"break-all"},children:`padding: var(--ds-spacing-${s});
backgroundColor: var(--ds-color-${n}-surface-default);
border: 2px solid var(--ds-color-${n}-border-default);
borderRadius: var(--ds-border-radius-${p});
boxShadow: var(--ds-shadow-${g});
color: var(--ds-color-${n}-text-default);`})]})]})}},c={render:()=>e.jsxs("div",{style:{maxWidth:"600px"},children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-4)",fontSize:"var(--ds-font-size-5)"},children:"Token Usage Example"}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"This card demonstrates proper token usage for a complete component."}),e.jsxs("div",{style:{backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-lg)",boxShadow:"var(--ds-shadow-md)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-6)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:[e.jsx("h4",{style:{fontSize:"var(--ds-font-size-4)",fontWeight:"var(--ds-font-weight-semibold)",color:"var(--ds-color-neutral-text-default)",marginBottom:"var(--ds-spacing-2)"},children:"Card Title"}),e.jsx("p",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-neutral-text-subtle)"},children:"This card uses only design tokens for all styling."})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-6)"},children:[e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-4)"},children:[e.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-3)",backgroundColor:"var(--ds-color-accent-surface-default)",color:"var(--ds-color-accent-text-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",fontWeight:"var(--ds-font-weight-medium)"},children:"Tag 1"}),e.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-3)",backgroundColor:"var(--ds-color-success-surface-default)",color:"var(--ds-color-success-text-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",fontWeight:"var(--ds-font-weight-medium)"},children:"Tag 2"})]}),e.jsx("button",{style:{padding:"var(--ds-spacing-2) var(--ds-spacing-4)",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",border:"none",borderRadius:"var(--ds-border-radius-md)",fontSize:"var(--ds-font-size-sm)",fontWeight:"var(--ds-font-weight-medium)",cursor:"pointer"},type:"button",children:"Action Button"})]})]}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)",borderLeft:"4px solid var(--ds-color-info-border-default)"},children:e.jsxs("p",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-info-text-default)",margin:0},children:[e.jsx("strong",{children:"Tokens used:"})," Colors, spacing, typography, borders, and shadows — all from design tokens!"]})})]})};var f,b,x,m,h;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
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
          Accent Colors
        </h3>
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-3)'
      }}>
          {[{
          token: '--ds-color-accent-background-default',
          label: 'Background Default'
        }, {
          token: '--ds-color-accent-surface-default',
          label: 'Surface Default'
        }, {
          token: '--ds-color-accent-surface-hover',
          label: 'Surface Hover'
        }, {
          token: '--ds-color-accent-border-default',
          label: 'Border Default'
        }, {
          token: '--ds-color-accent-base-default',
          label: 'Base Default'
        }, {
          token: '--ds-color-accent-text-default',
          label: 'Text Default'
        }].map(({
          token,
          label
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
                  {label}
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
          Neutral Colors
        </h3>
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-3)'
      }}>
          {[{
          token: '--ds-color-neutral-background-default',
          label: 'Background Default'
        }, {
          token: '--ds-color-neutral-surface-default',
          label: 'Surface Default'
        }, {
          token: '--ds-color-neutral-surface-hover',
          label: 'Surface Hover'
        }, {
          token: '--ds-color-neutral-border-default',
          label: 'Border Default'
        }, {
          token: '--ds-color-neutral-text-default',
          label: 'Text Default'
        }, {
          token: '--ds-color-neutral-text-subtle',
          label: 'Text Subtle'
        }].map(({
          token,
          label
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
                  {label}
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
          Semantic Colors
        </h3>
        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--ds-spacing-6)'
      }}>
          {[{
          category: 'Success',
          colors: [{
            token: '--ds-color-success-surface-default',
            label: 'Surface'
          }, {
            token: '--ds-color-success-border-default',
            label: 'Border'
          }, {
            token: '--ds-color-success-text-default',
            label: 'Text'
          }]
        }, {
          category: 'Warning',
          colors: [{
            token: '--ds-color-warning-surface-default',
            label: 'Surface'
          }, {
            token: '--ds-color-warning-border-default',
            label: 'Border'
          }, {
            token: '--ds-color-warning-text-default',
            label: 'Text'
          }]
        }, {
          category: 'Danger',
          colors: [{
            token: '--ds-color-danger-surface-default',
            label: 'Surface'
          }, {
            token: '--ds-color-danger-border-default',
            label: 'Border'
          }, {
            token: '--ds-color-danger-text-default',
            label: 'Text'
          }]
        }, {
          category: 'Info',
          colors: [{
            token: '--ds-color-info-surface-default',
            label: 'Surface'
          }, {
            token: '--ds-color-info-border-default',
            label: 'Border'
          }, {
            token: '--ds-color-info-text-default',
            label: 'Text'
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
              label
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
                }}>{label}</div>
                      <code style={{
                  color: 'var(--ds-color-neutral-text-subtle)'
                }}>{token}</code>
                    </div>
                  </div>)}
              </div>
            </div>)}
        </div>
      </div>
    </div>
}`,...(x=(b=o.parameters)==null?void 0:b.docs)==null?void 0:x.source},description:{story:"Color tokens organized by semantic meaning",...(h=(m=o.parameters)==null?void 0:m.docs)==null?void 0:h.description}}};var y,k,S,z,j;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div>
      <h3 style={{
      marginBottom: 'var(--ds-spacing-4)',
      fontSize: 'var(--ds-font-size-5)'
    }}>
        Spacing Scale
      </h3>
      <p style={{
      marginBottom: 'var(--ds-spacing-6)',
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        Use spacing tokens for padding, margin, and gaps to maintain consistent rhythm.
      </p>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-2)'
    }}>
        {[{
        token: '1',
        value: '4px',
        use: 'Tight spacing, icon gaps'
      }, {
        token: '2',
        value: '8px',
        use: 'Small gaps, compact layouts'
      }, {
        token: '3',
        value: '12px',
        use: 'Form field gaps'
      }, {
        token: '4',
        value: '16px',
        use: 'Standard spacing'
      }, {
        token: '6',
        value: '24px',
        use: 'Card padding, section gaps'
      }, {
        token: '8',
        value: '32px',
        use: 'Large sections'
      }, {
        token: '12',
        value: '48px',
        use: 'Major divisions'
      }, {
        token: '16',
        value: '64px',
        use: 'Page sections'
      }].map(({
        token,
        value,
        use
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
              {use}
            </span>
          </div>)}
      </div>
    </div>
}`,...(S=(k=d.parameters)==null?void 0:k.docs)==null?void 0:S.source},description:{story:"Spacing tokens for consistent rhythm",...(j=(z=d.parameters)==null?void 0:z.docs)==null?void 0:j.description}}};var w,C,B,T,R;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
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
          Font Size Tokens
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          {[{
          token: '--ds-font-size-xs',
          label: 'Extra Small',
          sample: 'The quick brown fox'
        }, {
          token: '--ds-font-size-sm',
          label: 'Small',
          sample: 'The quick brown fox'
        }, {
          token: '--ds-font-size-md',
          label: 'Medium',
          sample: 'The quick brown fox'
        }, {
          token: '--ds-font-size-lg',
          label: 'Large',
          sample: 'The quick brown fox'
        }, {
          token: '--ds-font-size-xl',
          label: 'Extra Large',
          sample: 'The quick brown fox'
        }].map(({
          token,
          label,
          sample
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
                  {label}
                </span>
              </div>
              <div style={{
            fontSize: \`var(\${token})\`
          }}>{sample}</div>
            </div>)}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-4)',
        fontSize: 'var(--ds-font-size-5)'
      }}>
          Font Weight Tokens
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          {[{
          token: '--ds-font-weight-regular',
          value: '400',
          label: 'Regular'
        }, {
          token: '--ds-font-weight-medium',
          value: '500',
          label: 'Medium'
        }, {
          token: '--ds-font-weight-semibold',
          value: '600',
          label: 'Semibold'
        }, {
          token: '--ds-font-weight-bold',
          value: '700',
          label: 'Bold'
        }].map(({
          token,
          value,
          label
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
                {label} ({value})
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
    </div>
}`,...(B=(C=t.parameters)==null?void 0:C.docs)==null?void 0:B.source},description:{story:"Typography tokens for text styling",...(R=(T=t.parameters)==null?void 0:T.docs)==null?void 0:R.description}}};var W,D,$,E,I;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
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
          Border Radius Tokens
        </h3>
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-4)'
      }}>
          {[{
          token: '--ds-border-radius-sm',
          label: 'Small'
        }, {
          token: '--ds-border-radius-md',
          label: 'Medium'
        }, {
          token: '--ds-border-radius-lg',
          label: 'Large'
        }, {
          token: '--ds-border-radius-xl',
          label: 'Extra Large'
        }, {
          token: '--ds-border-radius-full',
          label: 'Full'
        }].map(({
          token,
          label
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
                  {label}
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
          Shadow Tokens
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
            }}>{size}</span>
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
    </div>
}`,...($=(D=l.parameters)==null?void 0:D.docs)==null?void 0:$.source},description:{story:"Border and shadow tokens",...(I=(E=l.parameters)==null?void 0:E.docs)==null?void 0:I.description}}};var L,A,M,F,q;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
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
            Interactive Token Explorer
          </h3>
          <p style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            Experiment with different token combinations to see how they work together.
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
              Color
            </label>
            <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="accent">Accent</option>
              <option value="neutral">Neutral</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div>
            <label style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 600
          }}>
              Spacing
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
              Border Radius
            </label>
            <select value={selectedRadius} onChange={e => setSelectedRadius(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>

          <div>
            <label style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 600
          }}>
              Shadow
            </label>
            <select value={selectedShadow} onChange={e => setSelectedShadow(e.target.value)} style={{
            width: '100%',
            padding: 'var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
            border: '1px solid var(--ds-color-neutral-border-default)'
          }}>
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
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
            Preview Card
          </h4>
          <p style={{
          fontSize: 'var(--ds-font-size-sm)'
        }}>
            This card updates in real-time as you change the token selections above.
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
            Generated CSS:
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
}`,...(M=(A=i.parameters)==null?void 0:A.docs)==null?void 0:M.source},description:{story:"Interactive token explorer - Test different token combinations",...(q=(F=i.parameters)==null?void 0:F.docs)==null?void 0:q.description}}};var U,H,N,G,P;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '600px'
  }}>
      <h3 style={{
      marginBottom: 'var(--ds-spacing-4)',
      fontSize: 'var(--ds-font-size-5)'
    }}>
        Token Usage Example
      </h3>
      <p style={{
      marginBottom: 'var(--ds-spacing-6)',
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        This card demonstrates proper token usage for a complete component.
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
            Card Title
          </h4>
          <p style={{
          fontSize: 'var(--ds-font-size-sm)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            This card uses only design tokens for all styling.
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
              Tag 1
            </span>
            <span style={{
            padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            color: 'var(--ds-color-success-text-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            fontWeight: 'var(--ds-font-weight-medium)'
          }}>
              Tag 2
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
            Action Button
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
          <strong>Tokens used:</strong> Colors, spacing, typography, borders, and shadows — all from
          design tokens!
        </p>
      </div>
    </div>
}`,...(N=(H=c.parameters)==null?void 0:H.docs)==null?void 0:N.source},description:{story:"Complete token usage example",...(P=(G=c.parameters)==null?void 0:G.docs)==null?void 0:P.description}}};const X=["ColorTokens","SpacingTokens","TypographyTokens","BorderAndShadowTokens","InteractiveExplorer","TokenUsageExample"];export{l as BorderAndShadowTokens,o as ColorTokens,i as InteractiveExplorer,d as SpacingTokens,c as TokenUsageExample,t as TypographyTokens,X as __namedExportsOrder,Q as default};
//# sourceMappingURL=Tokens.stories-CW-IIKnN.js.map
