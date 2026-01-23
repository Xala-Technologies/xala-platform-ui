import{j as e}from"./jsx-runtime-BYYWji4R.js";import{S as a,B as F}from"./button-B6PgazAq.js";import"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const ne={title:"Components/Spinner",component:a,parameters:{docs:{description:{component:`
Spinner is a loading indicator that shows users that content is being loaded or processed. It provides visual feedback during asynchronous operations.

## Variants

- **Default** - Standard spinner
- **With label** - Spinner with descriptive text
- **Inline** - Small spinner for inline loading states
- **Full page** - Centered spinner for page-level loading

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## Colors

Available colors: **neutral**, **accent**.

## When to Use

- Loading data from API or server
- Processing user actions or form submissions
- Waiting for async operations to complete
- Initial page or component load
- Refreshing or updating content
- File uploads or downloads

## Best Practices

### Do
- Always include descriptive aria-label
- Pair with loading text when space allows
- Use appropriate size for context
- Show spinner only when necessary
- Remove spinner when content loads
- Use consistent spinner placement
- Provide estimated time for long operations

### Don't
- Don't use spinner without aria-label
- Don't show spinner for very fast operations (< 300ms)
- Don't use multiple spinners in same view
- Don't block entire interface unnecessarily
- Don't use spinner as decoration
- Don't forget to remove spinner on error

## Usage Patterns

### Basic Spinner
\`\`\`tsx
<Spinner aria-label="Loading content" />
\`\`\`

### Spinner with Text
\`\`\`tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
  <Spinner data-size="sm" aria-label="Loading" />
  <span>Loading content...</span>
</div>
\`\`\`

### Inline Spinner (in button)
\`\`\`tsx
<Button disabled>
  <Spinner data-size="sm" aria-label="Saving" />
  Saving...
</Button>
\`\`\`

### Full Page Loading
\`\`\`tsx
<div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  minHeight: '400px'
}}>
  <Spinner data-size="lg" aria-label="Loading page" />
</div>
\`\`\`

### Size Variants
\`\`\`tsx
<Spinner data-size="sm" aria-label="Loading" />
<Spinner data-size="md" aria-label="Loading" />
<Spinner data-size="lg" aria-label="Loading" />
\`\`\`

## Anti-Patterns

### Anti-pattern: No Accessible Label
Spinners without aria-label leave screen reader users without feedback.

### Anti-pattern: Spinner for Fast Operations
Showing spinner for operations under 300ms creates unnecessary visual noise.

### Anti-pattern: Multiple Spinners
Multiple spinners in one view confuses users about what's loading.

### Anti-pattern: Permanent Spinners
Forgetting to remove spinner on completion or error frustrates users.

## Accessibility

### Screen Readers
- Spinner role is announced as "loading" or "busy"
- aria-label provides context about what's loading
- Loading state is announced to screen readers
- Completion should be announced via aria-live region

### WCAG 2.1 AA Compliance
- **Text alternative**: aria-label required for all spinners
- **Status messages**: Loading state communicated to assistive technology
- **Focus management**: Focus should not be trapped during loading
- **Timeout**: Provide way to cancel long operations
- **Color not sole indicator**: Animation provides loading indication

### Spinner with Context
Provide specific loading context:
\`\`\`tsx
<Spinner aria-label="Loading user profile data" />
\`\`\`

### Announcing Completion
Announce when loading completes:
\`\`\`tsx
{isLoading ? (
  <Spinner aria-label="Loading content" />
) : (
  <div role="status" aria-live="polite">
    Content loaded successfully
  </div>
)}
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},"data-color":{control:"select",options:["neutral","accent"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}}}},r={render:()=>e.jsx(a,{"aria-label":"Loading"})},i={render:()=>e.jsx(a,{"aria-label":"Loading content..."})},s={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(a,{"data-size":"sm","aria-label":"Loading"}),e.jsx(a,{"data-size":"md","aria-label":"Loading"}),e.jsx(a,{"data-size":"lg","aria-label":"Loading"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(a,{"data-color":"neutral","aria-label":"Loading"}),e.jsx(a,{"data-color":"accent","aria-label":"Loading"})]})},o={render:()=>e.jsx(F,{loading:!0,disabled:!0,type:"button",children:"Loading..."})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"var(--ds-spacing-4)",padding:"var(--ds-spacing-10)",border:"1px dashed var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-lg)"},children:[e.jsx(a,{"data-size":"lg","aria-label":"Loading data"}),e.jsx("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Loading data..."})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(a,{"data-size":"sm","aria-label":"Small spinner"}),e.jsx(a,{"data-size":"md","aria-label":"Medium spinner"}),e.jsx(a,{"data-size":"lg","aria-label":"Large spinner"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Colors"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(a,{"data-color":"neutral","aria-label":"Neutral spinner"}),e.jsx(a,{"data-color":"accent","aria-label":"Accent spinner"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"In Button"}),e.jsx(F,{loading:!0,disabled:!0,type:"button",children:"Loading..."})]})]})};var d,p,c;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Spinner aria-label="Loading" />
}`,...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var g,m,u;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Spinner aria-label="Loading content..." />
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var v,b,x;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-4)',
    alignItems: 'center'
  }}>
      <Spinner data-size="sm" aria-label="Loading" />
      <Spinner data-size="md" aria-label="Loading" />
      <Spinner data-size="lg" aria-label="Loading" />
    </div>
}`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var S,f,y;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-4)',
    alignItems: 'center'
  }}>
      <Spinner data-color="neutral" aria-label="Loading" />
      <Spinner data-color="accent" aria-label="Loading" />
    </div>
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var h,L,z;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Button loading disabled type="button">
      Loading...
    </Button>
}`,...(z=(L=o.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var j,w,A;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--ds-spacing-4)',
    padding: 'var(--ds-spacing-10)',
    border: '1px dashed var(--ds-color-neutral-border-default)',
    borderRadius: 'var(--ds-border-radius-lg)'
  }}>
      <Spinner data-size="lg" aria-label="Loading data" />
      <span style={{
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>Loading data...</span>
    </div>
}`,...(A=(w=l.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var I,B,C,D,P;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Sizes
        </h3>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'center'
      }}>
          <Spinner data-size="sm" aria-label="Small spinner" />
          <Spinner data-size="md" aria-label="Medium spinner" />
          <Spinner data-size="lg" aria-label="Large spinner" />
        </div>
      </div>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Colors
        </h3>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'center'
      }}>
          <Spinner data-color="neutral" aria-label="Neutral spinner" />
          <Spinner data-color="accent" aria-label="Accent spinner" />
        </div>
      </div>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          In Button
        </h3>
        <Button loading disabled type="button">
          Loading...
        </Button>
      </div>
    </div>
}`,...(C=(B=n.parameters)==null?void 0:B.docs)==null?void 0:C.source},description:{story:"All variants overview",...(P=(D=n.parameters)==null?void 0:D.docs)==null?void 0:P.description}}};const re=["Default","WithLabel","Sizes","Colors","InButton","LoadingState","AllVariants"];export{n as AllVariants,t as Colors,r as Default,o as InButton,l as LoadingState,s as Sizes,i as WithLabel,re as __namedExportsOrder,ne as default};
//# sourceMappingURL=Spinner.stories-8lGMk_5P.js.map
