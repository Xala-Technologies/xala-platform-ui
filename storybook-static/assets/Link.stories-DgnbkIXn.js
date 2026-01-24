import{j as r}from"./jsx-runtime-BYYWji4R.js";import{u as d}from"./index-bjNF47ar.js";import{r as q,R as l}from"./index-ClcD9ViR.js";import{u as K}from"./useId-DmiD3Xrk.js";import{S as $}from"./ArrowRight-DdD98ZtE.js";import{L as n}from"./link-DlTbUgI1.js";import{P as J}from"./paragraph-DDCpJsVw.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";var X=function(o,e){var s={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(s[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(o);i<t.length;i++)e.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(o,t[i])&&(s[t[i]]=o[t[i]]);return s};const Y=q.forwardRef((o,e)=>{var{title:s,titleId:t}=o,i=X(o,["title","titleId"]);let a=K();return a=s?t||"title-"+a:void 0,l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:e,"aria-labelledby":a},i),s?l.createElement("title",{id:a},s):null,l.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 2.75a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.5a.75.75 0 0 1 .75-.75M4.75 15.5a.75.75 0 0 0-1.5 0V19c0 .966.784 1.75 1.75 1.75h14A1.75 1.75 0 0 0 20.75 19v-3.5a.75.75 0 0 0-1.5 0V19a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25z",clipRule:"evenodd"}))});var Z=function(o,e){var s={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(s[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(o);i<t.length;i++)e.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(o,t[i])&&(s[t[i]]=o[t[i]]);return s};const Q=q.forwardRef((o,e)=>{var{title:s,titleId:t}=o,i=Z(o,["title","titleId"]);let a=K();return a=s?t||"title-"+a:void 0,l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:e,"aria-labelledby":a},i),s?l.createElement("title",{id:a},s):null,l.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M20.532 3.471A.75.75 0 0 1 20.75 4v7.5a.75.75 0 0 1-1.5 0V5.81l-8.72 8.72a.75.75 0 1 1-1.06-1.06l8.72-8.72H12.5a.75.75 0 0 1 0-1.5H20c.206 0 .393.083.529.218l.001.002zM4.75 9A.25.25 0 0 1 5 8.75h7a.75.75 0 0 0 0-1.5H5A1.75 1.75 0 0 0 3.25 9v10c0 .966.784 1.75 1.75 1.75h10A1.75 1.75 0 0 0 16.75 19v-7a.75.75 0 0 0-1.5 0v7a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25z",clipRule:"evenodd"}))}),ce={title:"Components/Link",component:n,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["accent","neutral","inverted"],description:"Color variant"}}},u={render:function(){const e=d();return r.jsx(n,{href:"#",children:e("storybook.demo.defaultLink")})}},m={render:function(){const e=d();return r.jsxs(J,{children:[e("storybook.demo.readMoreAbout")," ",r.jsx(n,{href:"#",children:e("storybook.demo.bookingPolicies")})," ",e("storybook.demo.and")," ",r.jsx(n,{href:"#",children:e("storybook.demo.termsOfService")})," ",e("storybook.demo.beforeMakingReservation")]})}},h={render:function(){const e=d();return r.jsxs(n,{href:"https://designsystemet.no",target:"_blank",rel:"noopener noreferrer",children:[e("storybook.demo.designsystemetDocumentation")," ↗"]})}},c={render:function(){const e=d();return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[r.jsxs(n,{href:"https://designsystemet.no/slack",children:[r.jsx(Q,{fontSize:"1.25rem","aria-hidden":!0}),r.jsx("span",{children:e("storybook.demo.talkToUsOnSlack")})]}),r.jsxs(n,{href:"#",children:[r.jsx(Y,{fontSize:"1.25rem","aria-hidden":!0}),r.jsx("span",{children:e("storybook.demo.downloadReport")})]}),r.jsxs(n,{href:"#",children:[r.jsx("span",{children:e("storybook.demo.continueReading")}),r.jsx($,{fontSize:"1.25rem","aria-hidden":!0})]})]})}},k={render:function(){const e=d();return r.jsx(n,{href:"#","data-color":"neutral",children:e("storybook.demo.privacyPolicy")})}},p={render:function(){const e=d();return r.jsx("div",{style:{backgroundColor:"var(--ds-color-accent-base-default)",padding:"var(--ds-spacing-4)",borderRadius:"var(--ds-border-radius-md)"},children:r.jsx(n,{href:"#","data-color":"inverted",children:e("storybook.demo.invertedLinkOnDarkBackground")})})}},f={render:function(){const e=d();return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[r.jsxs("div",{children:[r.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:e("storybook.story.colors")}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[r.jsx(n,{href:"#",children:e("storybook.demo.defaultAccent")}),r.jsx(n,{href:"#","data-color":"neutral",children:e("storybook.demo.neutral")}),r.jsx("div",{style:{backgroundColor:"var(--ds-color-accent-base-default)",padding:"var(--ds-spacing-3)",borderRadius:"var(--ds-border-radius-md)"},children:r.jsx(n,{href:"#","data-color":"inverted",children:e("storybook.demo.inverted")})})]})]}),r.jsxs("div",{children:[r.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:e("storybook.story.withIcons")}),r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[r.jsxs(n,{href:"#",children:[r.jsx(Q,{fontSize:"1.25rem","aria-hidden":!0}),r.jsx("span",{children:e("storybook.demo.iconOnLeft")})]}),r.jsxs(n,{href:"#",children:[r.jsx("span",{children:e("storybook.demo.iconOnRight")}),r.jsx($,{fontSize:"1.25rem","aria-hidden":!0})]})]})]}),r.jsxs("div",{children:[r.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:e("storybook.story.inText")}),r.jsxs(J,{children:[e("storybook.demo.paragraphWithInlineLink")," ",r.jsx(n,{href:"#",children:e("storybook.demo.inlineLink")})," ",e("storybook.demo.thatDemonstratesLinks")," ",r.jsx(n,{href:"#",children:e("storybook.demo.multipleLinks")})," ",e("storybook.demo.inSameParagraph")]})]}),r.jsxs("div",{children:[r.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:e("storybook.story.externalLinks")}),r.jsx(n,{href:"https://designsystemet.no",target:"_blank",rel:"noopener noreferrer",children:e("storybook.demo.visitDesignsystemet")})]})]})}};var g,v,y;u.parameters={...u.parameters,docs:{...(g=u.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Link href="#">{t('storybook.demo.defaultLink')}</Link>;
  }
}`,...(y=(v=u.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var b,x,L;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Paragraph>
        {t('storybook.demo.readMoreAbout')}{' '}
        <Link href="#">{t('storybook.demo.bookingPolicies')}</Link> {t('storybook.demo.and')}{' '}
        <Link href="#">{t('storybook.demo.termsOfService')}</Link>{' '}
        {t('storybook.demo.beforeMakingReservation')}
      </Paragraph>;
  }
}`,...(L=(x=m.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var w,j,S;h.parameters={...h.parameters,docs:{...(w=h.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
        {t('storybook.demo.designsystemetDocumentation')} ↗
      </Link>;
  }
}`,...(S=(j=h.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var R,D,I,O,A;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-3)'
    }}>
        <Link href="https://designsystemet.no/slack">
          <ExternalLinkIcon fontSize="1.25rem" aria-hidden />
          <span>{t('storybook.demo.talkToUsOnSlack')}</span>
        </Link>
        <Link href="#">
          <DownloadIcon fontSize="1.25rem" aria-hidden />
          <span>{t('storybook.demo.downloadReport')}</span>
        </Link>
        <Link href="#">
          <span>{t('storybook.demo.continueReading')}</span>
          <ArrowRightIcon fontSize="1.25rem" aria-hidden />
        </Link>
      </div>;
  }
}`,...(I=(D=c.parameters)==null?void 0:D.docs)==null?void 0:I.source},description:{story:"With icon - Icons can be placed left or right",...(A=(O=c.parameters)==null?void 0:O.docs)==null?void 0:A.description}}};var z,P,E,T,_;k.parameters={...k.parameters,docs:{...(z=k.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Link href="#" data-color="neutral">
        {t('storybook.demo.privacyPolicy')}
      </Link>;
  }
}`,...(E=(P=k.parameters)==null?void 0:P.docs)==null?void 0:E.source},description:{story:"Neutral color - For special backgrounds",...(_=(T=k.parameters)==null?void 0:T.docs)==null?void 0:_.description}}};var C,B,N,U,M;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      backgroundColor: 'var(--ds-color-accent-base-default)',
      padding: 'var(--ds-spacing-4)',
      borderRadius: 'var(--ds-border-radius-md)'
    }}>
        <Link href="#" data-color="inverted">
          {t('storybook.demo.invertedLinkOnDarkBackground')}
        </Link>
      </div>;
  }
}`,...(N=(B=p.parameters)==null?void 0:B.docs)==null?void 0:N.source},description:{story:"Inverted - For dark backgrounds",...(M=(U=p.parameters)==null?void 0:U.docs)==null?void 0:M.description}}};var V,W,F,H,G;f.parameters={...f.parameters,docs:{...(V=f.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
            {t('storybook.story.colors')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Link href="#">{t('storybook.demo.defaultAccent')}</Link>
            <Link href="#" data-color="neutral">
              {t('storybook.demo.neutral')}
            </Link>
            <div style={{
            backgroundColor: 'var(--ds-color-accent-base-default)',
            padding: 'var(--ds-spacing-3)',
            borderRadius: 'var(--ds-border-radius-md)'
          }}>
              <Link href="#" data-color="inverted">
                {t('storybook.demo.inverted')}
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.withIcons')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Link href="#">
              <ExternalLinkIcon fontSize="1.25rem" aria-hidden />
              <span>{t('storybook.demo.iconOnLeft')}</span>
            </Link>
            <Link href="#">
              <span>{t('storybook.demo.iconOnRight')}</span>
              <ArrowRightIcon fontSize="1.25rem" aria-hidden />
            </Link>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.inText')}
          </h3>
          <Paragraph>
            {t('storybook.demo.paragraphWithInlineLink')}{' '}
            <Link href="#">{t('storybook.demo.inlineLink')}</Link>{' '}
            {t('storybook.demo.thatDemonstratesLinks')}{' '}
            <Link href="#">{t('storybook.demo.multipleLinks')}</Link>{' '}
            {t('storybook.demo.inSameParagraph')}
          </Paragraph>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.externalLinks')}
          </h3>
          <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
            {t('storybook.demo.visitDesignsystemet')}
          </Link>
        </div>
      </div>;
  }
}`,...(F=(W=f.parameters)==null?void 0:W.docs)==null?void 0:F.source},description:{story:"All variants overview",...(G=(H=f.parameters)==null?void 0:H.docs)==null?void 0:G.description}}};const ke=["Default","InText","External","WithIcon","Neutral","Inverted","AllVariants"];export{f as AllVariants,u as Default,h as External,m as InText,p as Inverted,k as Neutral,c as WithIcon,ke as __namedExportsOrder,ce as default};
//# sourceMappingURL=Link.stories-DgnbkIXn.js.map
