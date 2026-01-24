import{j as a}from"./jsx-runtime-BYYWji4R.js";import{fn as e}from"./index-CLEdRh-S.js";import{u as L}from"./index-bjNF47ar.js";import{S as r}from"./ShareButton-OQSCdFFj.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./utils-Dlkq94hl.js";import"./icons-CYjUz1aN.js";const ha={title:"Blocks/ShareButton",component:r,parameters:{layout:"centered",docs:{description:{component:`
## ShareButton

Button for sharing resources with support for native share API, clipboard copy, and social media sharing options.

### Features
- Native share API support
- Social media platforms (Facebook, Twitter, LinkedIn, WhatsApp)
- Email sharing
- Clipboard copy
- UTM parameter support
- Icon and button variants

### Usage
\`\`\`tsx
<ShareButton
  shareData={{
    url: 'https://example.com/resource',
    title: 'Resource Title',
    description: 'Check out this resource'
  }}
  variant="icon"
  size="md"
/>
\`\`\`
        `}}},args:{onShare:e(),shareData:{url:"https://example.com/resource",title:"Amazing Resource",description:"Check out this amazing resource"}},argTypes:{variant:{control:"select",options:["icon","button"],description:"Visual variant"},size:{control:"select",options:["sm","md","lg"],description:"Button size"},disabled:{control:"boolean",description:"Disabled state"}},tags:["autodocs"]},t={args:{variant:"icon",size:"md",disabled:!1}},o={args:{variant:"button",size:"md",disabled:!1}},i={args:{variant:"icon",size:"sm",disabled:!1}},n={args:{variant:"icon",size:"lg",disabled:!1}},c={args:{variant:"icon",size:"md",disabled:!0}},m={args:{variant:"icon",size:"md",disabled:!1,utmParams:{source:"storybook",medium:"web",campaign:"test",content:"share-button"}}},d={args:{variant:"icon",size:"md",disabled:!1,platforms:["copy","email","twitter"]}},p={render:function(){const l=L(),s={url:"https://example.com/resource",title:l("storybook.demo.cardTitle"),description:l("storybook.demo.cardDescription")};return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[a.jsx(r,{shareData:s,variant:"icon",size:"sm",onShare:e()}),a.jsx(r,{shareData:s,variant:"icon",size:"md",onShare:e()}),a.jsx(r,{shareData:s,variant:"icon",size:"lg",onShare:e()})]}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[a.jsx(r,{shareData:s,variant:"button",size:"sm",onShare:e()}),a.jsx(r,{shareData:s,variant:"button",size:"md",onShare:e()}),a.jsx(r,{shareData:s,variant:"button",size:"lg",onShare:e()})]})]})}};var u,h,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    size: 'md',
    disabled: false
  }
}`,...(g=(h=t.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var v,b,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'button',
    size: 'md',
    disabled: false
  }
}`,...(f=(b=o.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var S,z,x;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    size: 'sm',
    disabled: false
  }
}`,...(x=(z=i.parameters)==null?void 0:z.docs)==null?void 0:x.source}}};var y,D,B;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    size: 'lg',
    disabled: false
  }
}`,...(B=(D=n.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var j,k,I;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    size: 'md',
    disabled: true
  }
}`,...(I=(k=c.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var T,P,V;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    size: 'md',
    disabled: false,
    utmParams: {
      source: 'storybook',
      medium: 'web',
      campaign: 'test',
      content: 'share-button'
    }
  }
}`,...(V=(P=m.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var w,A,C;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'icon',
    size: 'md',
    disabled: false,
    platforms: ['copy', 'email', 'twitter']
  }
}`,...(C=(A=d.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var R,U,E;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const shareData = {
      url: 'https://example.com/resource',
      title: t('storybook.demo.cardTitle'),
      description: t('storybook.demo.cardDescription')
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'center'
      }}>
          <ShareButton shareData={shareData} variant="icon" size="sm" onShare={fn()} />
          <ShareButton shareData={shareData} variant="icon" size="md" onShare={fn()} />
          <ShareButton shareData={shareData} variant="icon" size="lg" onShare={fn()} />
        </div>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'center'
      }}>
          <ShareButton shareData={shareData} variant="button" size="sm" onShare={fn()} />
          <ShareButton shareData={shareData} variant="button" size="md" onShare={fn()} />
          <ShareButton shareData={shareData} variant="button" size="lg" onShare={fn()} />
        </div>
      </div>;
  }
}`,...(E=(U=p.parameters)==null?void 0:U.docs)==null?void 0:E.source}}};const ga=["IconVariant","ButtonVariant","SmallSize","LargeSize","Disabled","WithUTMParams","CustomPlatforms","AllVariants"];export{p as AllVariants,o as ButtonVariant,d as CustomPlatforms,c as Disabled,t as IconVariant,n as LargeSize,i as SmallSize,m as WithUTMParams,ga as __namedExportsOrder,ha as default};
//# sourceMappingURL=ShareButton.stories-BDNN71Fk.js.map
