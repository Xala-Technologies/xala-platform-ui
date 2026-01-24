import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as r}from"./index-bjNF47ar.js";import{S as n,B as F}from"./button-B6PgazAq.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const ie={title:"Components/Spinner",component:n,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},"data-color":{control:"select",options:["neutral","accent"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}}}},s={render:function(){const a=r();return e.jsx(n,{"aria-label":a("platform.common.loading")})}},i={render:function(){const a=r();return e.jsx(n,{"aria-label":a("storybook.demo.loadingContent")})}},l={render:function(){const a=r();return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(n,{"data-size":"sm","aria-label":a("platform.common.loading")}),e.jsx(n,{"data-size":"md","aria-label":a("platform.common.loading")}),e.jsx(n,{"data-size":"lg","aria-label":a("platform.common.loading")})]})}},d={render:function(){const a=r();return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(n,{"data-color":"neutral","aria-label":a("platform.common.loading")}),e.jsx(n,{"data-color":"accent","aria-label":a("platform.common.loading")})]})}},c={render:function(){const a=r();return e.jsxs(F,{loading:!0,disabled:!0,type:"button",children:[a("platform.common.loading"),"..."]})}},p={render:function(){const a=r();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"var(--ds-spacing-4)",padding:"var(--ds-spacing-10)",border:"1px dashed var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-lg)"},children:[e.jsx(n,{"data-size":"lg","aria-label":a("storybook.demo.loadingData")}),e.jsxs("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:[a("storybook.demo.loadingData"),"..."]})]})}},o={render:function(){const a=r();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:a("storybook.story.sizes")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(n,{"data-size":"sm","aria-label":a("storybook.demo.smallSpinner")}),e.jsx(n,{"data-size":"md","aria-label":a("storybook.demo.mediumSpinner")}),e.jsx(n,{"data-size":"lg","aria-label":a("storybook.demo.largeSpinner")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:a("storybook.story.colors")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(n,{"data-color":"neutral","aria-label":a("storybook.demo.neutralSpinner")}),e.jsx(n,{"data-color":"accent","aria-label":a("storybook.demo.accentSpinner")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:a("storybook.story.inButton")}),e.jsxs(F,{loading:!0,disabled:!0,type:"button",children:[a("platform.common.loading"),"..."]})]})]})}};var m,u,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Spinner aria-label={t('platform.common.loading')} />;
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var b,v,f;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Spinner aria-label={t('storybook.demo.loadingContent')} />;
  }
}`,...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var y,S,x;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      alignItems: 'center'
    }}>
        <Spinner data-size="sm" aria-label={t('platform.common.loading')} />
        <Spinner data-size="md" aria-label={t('platform.common.loading')} />
        <Spinner data-size="lg" aria-label={t('platform.common.loading')} />
      </div>;
  }
}`,...(x=(S=l.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var h,z,j;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      alignItems: 'center'
    }}>
        <Spinner data-color="neutral" aria-label={t('platform.common.loading')} />
        <Spinner data-color="accent" aria-label={t('platform.common.loading')} />
      </div>;
  }
}`,...(j=(z=d.parameters)==null?void 0:z.docs)==null?void 0:j.source}}};var k,w,A;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Button loading disabled type="button">
        {t('platform.common.loading')}...
      </Button>;
  }
}`,...(A=(w=c.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var B,R,D;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--ds-spacing-4)',
      padding: 'var(--ds-spacing-10)',
      border: '1px dashed var(--ds-color-neutral-border-default)',
      borderRadius: 'var(--ds-border-radius-lg)'
    }}>
        <Spinner data-size="lg" aria-label={t('storybook.demo.loadingData')} />
        <span style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.demo.loadingData')}...
        </span>
      </div>;
  }
}`,...(D=(R=p.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var I,L,C,T,P;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.sizes')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)',
          alignItems: 'center'
        }}>
            <Spinner data-size="sm" aria-label={t('storybook.demo.smallSpinner')} />
            <Spinner data-size="md" aria-label={t('storybook.demo.mediumSpinner')} />
            <Spinner data-size="lg" aria-label={t('storybook.demo.largeSpinner')} />
          </div>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.colors')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)',
          alignItems: 'center'
        }}>
            <Spinner data-color="neutral" aria-label={t('storybook.demo.neutralSpinner')} />
            <Spinner data-color="accent" aria-label={t('storybook.demo.accentSpinner')} />
          </div>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.inButton')}
          </h3>
          <Button loading disabled type="button">
            {t('platform.common.loading')}...
          </Button>
        </div>
      </div>;
  }
}`,...(C=(L=o.parameters)==null?void 0:L.docs)==null?void 0:C.source},description:{story:"All variants overview",...(P=(T=o.parameters)==null?void 0:T.docs)==null?void 0:P.description}}};const le=["Default","WithLabel","Sizes","Colors","InButton","LoadingState","AllVariants"];export{o as AllVariants,d as Colors,s as Default,c as InButton,p as LoadingState,l as Sizes,i as WithLabel,le as __namedExportsOrder,ie as default};
//# sourceMappingURL=Spinner.stories-ktMGXHO0.js.map
