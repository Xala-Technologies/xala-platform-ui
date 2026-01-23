import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as q,R as l}from"./index-ClcD9ViR.js";import{u as G}from"./useId-DmiD3Xrk.js";import{S as K}from"./ArrowRight-DdD98ZtE.js";import{L as t}from"./link-DlTbUgI1.js";import{P as Y}from"./paragraph-DDCpJsVw.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";var J=function(n,o){var i={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&o.indexOf(r)<0&&(i[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(n);a<r.length;a++)o.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(n,r[a])&&(i[r[a]]=n[r[a]]);return i};const Q=q.forwardRef((n,o)=>{var{title:i,titleId:r}=n,a=J(n,["title","titleId"]);let s=G();return s=i?r||"title-"+s:void 0,l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":s},a),i?l.createElement("title",{id:s},i):null,l.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 2.75a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.5a.75.75 0 0 1 .75-.75M4.75 15.5a.75.75 0 0 0-1.5 0V19c0 .966.784 1.75 1.75 1.75h14A1.75 1.75 0 0 0 20.75 19v-3.5a.75.75 0 0 0-1.5 0V19a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25z",clipRule:"evenodd"}))});var X=function(n,o){var i={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&o.indexOf(r)<0&&(i[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(n);a<r.length;a++)o.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(n,r[a])&&(i[r[a]]=n[r[a]]);return i};const $=q.forwardRef((n,o)=>{var{title:i,titleId:r}=n,a=X(n,["title","titleId"]);let s=G();return s=i?r||"title-"+s:void 0,l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":s},a),i?l.createElement("title",{id:s},i):null,l.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M20.532 3.471A.75.75 0 0 1 20.75 4v7.5a.75.75 0 0 1-1.5 0V5.81l-8.72 8.72a.75.75 0 1 1-1.06-1.06l8.72-8.72H12.5a.75.75 0 0 1 0-1.5H20c.206 0 .393.083.529.218l.001.002zM4.75 9A.25.25 0 0 1 5 8.75h7a.75.75 0 0 0 0-1.5H5A1.75 1.75 0 0 0 3.25 9v10c0 .966.784 1.75 1.75 1.75h10A1.75 1.75 0 0 0 16.75 19v-7a.75.75 0 0 0-1.5 0v7a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25z",clipRule:"evenodd"}))}),se={title:"Components/Link",component:t,parameters:{docs:{description:{component:`
Link is clickable text or graphics that take the user to other pages or documents. Links provide navigation and access to additional content.

## Variants

- **Default** - Standard link (accent color)
- **Neutral** - Neutral color for special backgrounds
- **Inverted** - For dark backgrounds
- **With icon** - Icon on left or right for visual context
- **In text** - Inline with paragraph text
- **External** - Links to external websites
- **Download** - Links to downloadable content

## Colors

Available colors: **accent**, **neutral**, **inverted**.

## When to Use

- Navigation to other pages or sections
- External resources and references
- In-page anchor links
- Download links for files
- Actions that navigate away
- Email and contact links

## Best Practices

### Do
- Use descriptive link text (not "click here" or "read more")
- Place icons on the left as a general rule
- Make link text meaningful out of context
- Use appropriate link colors for background
- Provide hover and focus states
- Use semantic anchor elements

### Don't
- Don't use generic text like "click here"
- Don't open links in new tabs without user consent
- Don't use external link icons (redundant with proper styling)
- Don't underline non-link text
- Don't use links for actions that don't navigate
- Don't create very long link text

## Usage Patterns

### Basic Link
\`\`\`tsx
<Link href="/page">Navigate to page</Link>
\`\`\`

### Link with Icon
\`\`\`tsx
<Link href="#">
  <ArrowRight aria-hidden />
  Continue
</Link>
\`\`\`

### External Link
\`\`\`tsx
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External resource
</Link>
\`\`\`

### Download Link
\`\`\`tsx
<Link href="/file.pdf" download>
  <Download aria-hidden />
  Download PDF
</Link>
\`\`\`

### Inline Link
\`\`\`tsx
<Paragraph>
  Read more about our <Link href="#">policies</Link> and{' '}
  <Link href="#">terms of service</Link> before continuing.
</Paragraph>
\`\`\`

### Color Variants
\`\`\`tsx
<Link href="#" data-color="accent">Accent link</Link>
<Link href="#" data-color="neutral">Neutral link</Link>
<Link href="#" data-color="inverted">Inverted link</Link>
\`\`\`

## Anti-Patterns

### Anti-pattern: Generic Link Text
Links like "click here" or "read more" don't provide context.

### Anti-pattern: Unnecessary New Tabs
Opening links in new tabs without user expectation breaks navigation flow.

### Anti-pattern: Links for Actions
Using links for actions like "Save" or "Submit" instead of buttons.

### Anti-pattern: Underlined Non-Links
Underlining text that isn't a link confuses users.

## Accessibility

### Screen Readers
- Link text is announced with "link" role
- Purpose should be clear from text alone
- External links are announced when target="_blank"
- Download links are announced when download attribute present

### Keyboard Navigation
- Tab key navigates to links
- Enter key activates link
- Focus indicator is clearly visible
- Tab order follows logical sequence

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for link text
- **Focus indicator**: Visible focus state required
- **Link purpose**: Clear from text or context
- **Keyboard accessible**: All links reachable via keyboard
- **External links**: Warned when opening new windows

### External Links
Always include rel attributes for security:
\`\`\`tsx
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External resource
</Link>
\`\`\`

### Descriptive Link Text
Good: "View all user settings"
Bad: "Click here"

### Links with Icons
Icons should be decorative:
\`\`\`tsx
<Link href="#">
  <Download aria-hidden />
  Download report
</Link>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["accent","neutral","inverted"],description:"Color variant"}}},f={render:()=>e.jsx(t,{href:"#",children:"Default link"})},u={render:()=>e.jsxs(Y,{children:["Read more about our ",e.jsx(t,{href:"#",children:"resourceRequest policies"})," and"," ",e.jsx(t,{href:"#",children:"terms of service"})," before making a reservation."]})},k={render:()=>e.jsx(t,{href:"https://designsystemet.no",target:"_blank",rel:"noopener noreferrer",children:"Designsystemet documentation ↗"})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(t,{href:"https://designsystemet.no/slack",children:[e.jsx($,{fontSize:"1.25rem","aria-hidden":!0}),e.jsx("span",{children:"Talk to us on Slack"})]}),e.jsxs(t,{href:"#",children:[e.jsx(Q,{fontSize:"1.25rem","aria-hidden":!0}),e.jsx("span",{children:"Download report"})]}),e.jsxs(t,{href:"#",children:[e.jsx("span",{children:"Continue reading"}),e.jsx(K,{fontSize:"1.25rem","aria-hidden":!0})]})]})},c={render:()=>e.jsx(t,{href:"#","data-color":"neutral",children:"Privacy Policy"})},p={render:()=>e.jsx("div",{style:{backgroundColor:"var(--ds-color-accent-base-default)",padding:"var(--ds-spacing-4)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsx(t,{href:"#","data-color":"inverted",children:"Inverted link on dark background"})})},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Colors"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{href:"#",children:"Default (accent)"}),e.jsx(t,{href:"#","data-color":"neutral",children:"Neutral"}),e.jsx("div",{style:{backgroundColor:"var(--ds-color-accent-base-default)",padding:"var(--ds-spacing-3)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsx(t,{href:"#","data-color":"inverted",children:"Inverted"})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"With Icons"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(t,{href:"#",children:[e.jsx($,{fontSize:"1.25rem","aria-hidden":!0}),e.jsx("span",{children:"Icon on left"})]}),e.jsxs(t,{href:"#",children:[e.jsx("span",{children:"Icon on right"}),e.jsx(K,{fontSize:"1.25rem","aria-hidden":!0})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"In Text"}),e.jsxs(Y,{children:["This is a paragraph with an ",e.jsx(t,{href:"#",children:"inline link"})," that demonstrates how links appear within body text. You can have ",e.jsx(t,{href:"#",children:"multiple links"})," in the same paragraph."]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"External Links"}),e.jsx(t,{href:"https://designsystemet.no",target:"_blank",rel:"noopener noreferrer",children:"Visit Designsystemet"})]})]})};var m,g,v;f.parameters={...f.parameters,docs:{...(m=f.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <Link href="#">Default link</Link>
}`,...(v=(g=f.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var x,b,y;u.parameters={...u.parameters,docs:{...(x=u.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Paragraph>
      Read more about our <Link href="#">resourceRequest policies</Link> and{' '}
      <Link href="#">terms of service</Link> before making a reservation.
    </Paragraph>
}`,...(y=(b=u.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var L,w,j;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
      Designsystemet documentation ↗
    </Link>
}`,...(j=(w=k.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var I,D,S,z,E;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)'
  }}>
      <Link href="https://designsystemet.no/slack">
        <ExternalLinkIcon fontSize="1.25rem" aria-hidden />
        <span>Talk to us on Slack</span>
      </Link>
      <Link href="#">
        <DownloadIcon fontSize="1.25rem" aria-hidden />
        <span>Download report</span>
      </Link>
      <Link href="#">
        <span>Continue reading</span>
        <ArrowRightIcon fontSize="1.25rem" aria-hidden />
      </Link>
    </div>
}`,...(S=(D=d.parameters)==null?void 0:D.docs)==null?void 0:S.source},description:{story:"With icon - Icons can be placed left or right",...(E=(z=d.parameters)==null?void 0:z.docs)==null?void 0:E.description}}};var A,P,R,O,C;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <Link href="#" data-color="neutral">
      Privacy Policy
    </Link>
}`,...(R=(P=c.parameters)==null?void 0:P.docs)==null?void 0:R.source},description:{story:"Neutral color - For special backgrounds",...(C=(O=c.parameters)==null?void 0:O.docs)==null?void 0:C.description}}};var _,T,B,N,V;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div style={{
    backgroundColor: 'var(--ds-color-accent-base-default)',
    padding: 'var(--ds-spacing-4)',
    borderRadius: 'var(--ds-border-radius-md)'
  }}>
      <Link href="#" data-color="inverted">
        Inverted link on dark background
      </Link>
    </div>
}`,...(B=(T=p.parameters)==null?void 0:T.docs)==null?void 0:B.source},description:{story:"Inverted - For dark backgrounds",...(V=(N=p.parameters)==null?void 0:N.docs)==null?void 0:V.description}}};var U,W,F,M,H;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
          Colors
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Link href="#">Default (accent)</Link>
          <Link href="#" data-color="neutral">
            Neutral
          </Link>
          <div style={{
          backgroundColor: 'var(--ds-color-accent-base-default)',
          padding: 'var(--ds-spacing-3)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <Link href="#" data-color="inverted">
              Inverted
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          With Icons
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Link href="#">
            <ExternalLinkIcon fontSize="1.25rem" aria-hidden />
            <span>Icon on left</span>
          </Link>
          <Link href="#">
            <span>Icon on right</span>
            <ArrowRightIcon fontSize="1.25rem" aria-hidden />
          </Link>
        </div>
      </div>

      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          In Text
        </h3>
        <Paragraph>
          This is a paragraph with an <Link href="#">inline link</Link> that demonstrates how links
          appear within body text. You can have <Link href="#">multiple links</Link> in the same
          paragraph.
        </Paragraph>
      </div>

      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          External Links
        </h3>
        <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
          Visit Designsystemet
        </Link>
      </div>
    </div>
}`,...(F=(W=h.parameters)==null?void 0:W.docs)==null?void 0:F.source},description:{story:"All variants overview",...(H=(M=h.parameters)==null?void 0:M.docs)==null?void 0:H.description}}};const le=["Default","InText","External","WithIcon","Neutral","Inverted","AllVariants"];export{h as AllVariants,f as Default,k as External,u as InText,p as Inverted,c as Neutral,d as WithIcon,le as __namedExportsOrder,se as default};
//# sourceMappingURL=Link.stories-Bz5SelxN.js.map
