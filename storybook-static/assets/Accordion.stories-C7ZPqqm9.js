import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u}from"./index-bjNF47ar.js";import{A as f,C as F}from"./Accordion-CiwYvsQ9.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as o}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import{I as K}from"./info-CgVVLXYL.js";import{S as x}from"./settings-D0B-rPE5.js";import{U as q}from"./user-N2ADiiI-.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./createLucideIcon-DXOARlW5.js";const ye={title:"Composed/Accordion",component:f,parameters:{layout:"centered",docs:{description:{component:`
## Accordion & Collapsible

Expandable content sections for organizing information. Supports single or multiple expanded items.

### Features
- Single or multiple expansion modes
- Variant styles (default, bordered, separated)
- Icon support
- Disabled state
- Keyboard navigation
- SSR-safe with 'use client' directive

### Usage
\`\`\`tsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content 1</p> },
    { id: '2', title: 'Section 2', content: <p>Content 2</p> },
  ]}
  allowMultiple={false}
/>
\`\`\`
        `}}},argTypes:{variant:{control:"select",options:["default","bordered","separated"],description:"Visual variant"},allowMultiple:{control:"boolean",description:"Allow multiple items to be expanded"}},tags:["autodocs"]},s=t=>{const r=u(),g=[{id:"1",title:r("storybook.demo.gettingStarted"),content:e.jsx(o,{"data-size":"sm",children:r("storybook.demo.gettingStartedDescription")}),icon:e.jsx(K,{size:20})},{id:"2",title:r("platform.nav.settings"),content:e.jsx(o,{"data-size":"sm",children:r("storybook.demo.settingsDescription")}),icon:e.jsx(x,{size:20})},{id:"3",title:r("platform.nav.profile"),content:e.jsx(o,{"data-size":"sm",children:r("storybook.demo.profileDescription")}),icon:e.jsx(q,{size:20})}];return e.jsx(f,{...t,items:t.items||g})},a={render:t=>e.jsx(s,{...t}),args:{allowMultiple:!1,variant:"default"}},i={render:t=>e.jsx(s,{...t}),args:{allowMultiple:!0,variant:"default"}},n={render:t=>e.jsx(s,{...t}),args:{allowMultiple:!1,variant:"bordered"}},l={render:t=>e.jsx(s,{...t}),args:{allowMultiple:!0,variant:"separated"}},d={render:t=>e.jsx(s,{...t}),args:{allowMultiple:!1,variant:"default",defaultExpanded:["1"]}},G=t=>{const r=u(),g=[{id:"1",title:r("storybook.demo.gettingStarted"),content:e.jsx(o,{"data-size":"sm",children:r("storybook.demo.gettingStartedDescription")}),icon:e.jsx(K,{size:20})},{id:"2",title:r("platform.nav.settings"),content:e.jsx(o,{"data-size":"sm",children:r("storybook.demo.settingsDescription")}),icon:e.jsx(x,{size:20})},{id:"3",title:r("platform.nav.profile"),content:e.jsx(o,{"data-size":"sm",children:r("storybook.demo.profileDescription")}),icon:e.jsx(q,{size:20}),disabled:!0}];return e.jsx(f,{...t,items:g})},p={render:t=>e.jsx(G,{...t}),args:{allowMultiple:!1,variant:"default"}},H=()=>{const t=u();return e.jsx(F,{title:t("storybook.demo.clickToExpand"),defaultOpen:!1,children:e.jsx(o,{"data-size":"sm",children:t("storybook.demo.collapsibleDescription")})})},c={name:"CollapsibleExample",render:()=>e.jsx(H,{})},J=()=>{const t=u();return e.jsx(F,{title:t("platform.nav.settings"),icon:e.jsx(x,{size:20}),defaultOpen:!1,children:e.jsx(o,{"data-size":"sm",children:t("storybook.demo.collapsibleIconDescription")})})},m={render:()=>e.jsx(J,{})};var b,j,h;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: false,
    variant: 'default'
  }
}`,...(h=(j=a.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};var S,v,w;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: true,
    variant: 'default'
  }
}`,...(w=(v=i.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var y,D,z;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: false,
    variant: 'bordered'
  }
}`,...(z=(D=n.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var A,C,E;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: true,
    variant: 'separated'
  }
}`,...(E=(C=l.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var M,I,W;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: false,
    variant: 'default',
    defaultExpanded: ['1']
  }
}`,...(W=(I=d.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var k,O,T;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <AccordionWithDisabled {...args} />,
  args: {
    allowMultiple: false,
    variant: 'default'
  }
}`,...(T=(O=p.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var U,B,P;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: 'CollapsibleExample',
  render: () => <CollapsibleExample />
}`,...(P=(B=c.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var R,V,_;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <CollapsibleWithIconExample />
}`,...(_=(V=m.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};const De=["Default","AllowMultiple","Bordered","Separated","DefaultExpanded","WithDisabled","CollapsibleExampleStory","CollapsibleWithIcon"];export{i as AllowMultiple,n as Bordered,c as CollapsibleExampleStory,m as CollapsibleWithIcon,a as Default,d as DefaultExpanded,l as Separated,p as WithDisabled,De as __namedExportsOrder,ye as default};
//# sourceMappingURL=Accordion.stories-C7ZPqqm9.js.map
