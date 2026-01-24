import{j as e}from"./jsx-runtime-BYYWji4R.js";import{R as E}from"./index-ClcD9ViR.js";import{u as a}from"./index-bjNF47ar.js";import{S as r,T as s}from"./SimpleTabs-ChkmmJ0q.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as h}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as t}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const je={title:"Composed/SimpleTabs",component:r,parameters:{layout:"centered",docs:{description:{component:`
## SimpleTabs

A simplified tabs abstraction that wraps Designsystemet's Tabs component with a more convenient API using TabItem children.

### Features
- Simple API with TabItem components
- Advanced API with Designsystemet compound components
- Size variants
- Controlled and uncontrolled modes

### Usage
\`\`\`tsx
// Simple API
<Tabs>
  <TabItem label="First Tab">Content 1</TabItem>
  <TabItem label="Second Tab">Content 2</TabItem>
</Tabs>

// Advanced API
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
</Tabs>
\`\`\`
        `}}},argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Tab size"}},tags:["autodocs"]},F=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{defaultValue:"tab1",children:[e.jsx(s,{label:o("storybook.demo.overview"),value:"tab1",children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.overviewTabContent")})}),e.jsx(s,{label:o("storybook.demo.details"),value:"tab2",children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.detailsTabContent")})}),e.jsx(s,{label:o("platform.nav.settings"),value:"tab3",children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.settingsTabContent")})})]})})},_=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{children:[e.jsx(s,{label:o("storybook.demo.firstTab"),children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.firstTabContentAuto")})}),e.jsx(s,{label:o("storybook.demo.secondTab"),children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.secondTabContent")})}),e.jsx(s,{label:o("storybook.demo.thirdTab"),children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.thirdTabContent")})})]})})},O=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{size:"sm",children:[e.jsx(s,{label:o("storybook.demo.tab1"),children:o("storybook.demo.content1")}),e.jsx(s,{label:o("storybook.demo.tab2"),children:o("storybook.demo.content2")})]})})},U=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{size:"md",children:[e.jsx(s,{label:o("storybook.demo.tab1"),children:o("storybook.demo.content1")}),e.jsx(s,{label:o("storybook.demo.tab2"),children:o("storybook.demo.content2")})]})})},q=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{size:"lg",children:[e.jsx(s,{label:o("storybook.demo.tab1"),children:o("storybook.demo.content1")}),e.jsx(s,{label:o("storybook.demo.tab2"),children:o("storybook.demo.content2")})]})})},B=()=>{const o=a(),[p,H]=E.useState("tab1");return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{value:p,onChange:H,children:[e.jsx(s,{label:o("storybook.demo.tab1"),value:"tab1",children:e.jsxs(t,{"data-size":"sm",children:[o("storybook.demo.controlledTab1")," ",p]})}),e.jsx(s,{label:o("storybook.demo.tab2"),value:"tab2",children:e.jsxs(t,{"data-size":"sm",children:[o("storybook.demo.controlledTab2")," ",p]})})]})})},G=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(r,{children:[e.jsx(s,{label:o("storybook.demo.overview"),children:e.jsxs("div",{children:[e.jsx(h,{level:3,"data-size":"sm",children:o("storybook.demo.overviewSection")}),e.jsx(t,{"data-size":"sm",children:o("storybook.demo.richContentDescription")})]})}),e.jsx(s,{label:o("storybook.demo.details"),children:e.jsxs("div",{children:[e.jsx(h,{level:3,"data-size":"sm",children:o("storybook.demo.detailsSection")}),e.jsx(t,{"data-size":"sm",children:o("storybook.demo.detailedInfoHere")})]})})]})})},n={render:()=>e.jsx(F,{})},d={render:()=>e.jsx(_,{})},i={render:()=>e.jsx(O,{})},l={render:()=>e.jsx(U,{})},m={render:()=>e.jsx(q,{})},c={render:()=>e.jsx(B,{})},b={render:()=>e.jsx(G,{})};var u,x,j;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <SimpleAPIDemo />
}`,...(j=(x=n.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var y,T,k;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <AutoValuesDemo />
}`,...(k=(T=d.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var v,S,g;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <SmallDemo />
}`,...(g=(S=i.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var C,z,A;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <MediumDemo />
}`,...(A=(z=l.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var D,I,w;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <LargeDemo />
}`,...(w=(I=m.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var f,P,R;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <ControlledDemo />
}`,...(R=(P=c.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var V,L,M;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <RichContentDemo />
}`,...(M=(L=b.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const ye=["SimpleAPI","AutoValues","Small","Medium","Large","Controlled","RichContent"];export{d as AutoValues,c as Controlled,m as Large,l as Medium,b as RichContent,n as SimpleAPI,i as Small,ye as __namedExportsOrder,je as default};
//# sourceMappingURL=SimpleTabs.stories-BR1Flf7m.js.map
