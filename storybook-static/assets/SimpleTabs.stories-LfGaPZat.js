import{j as e}from"./jsx-runtime-BYYWji4R.js";import{R as E}from"./index-ClcD9ViR.js";import{u as n}from"./index-bjNF47ar.js";import{S as s,T as r}from"./SimpleTabs-ChkmmJ0q.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as p}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as t}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const je={title:"Composed/SimpleTabs",component:s,parameters:{layout:"centered",docs:{description:{component:`
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
        `}}},argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Tab size"}},tags:["autodocs"]},F=()=>{const o=n();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{defaultValue:"tab1",children:[e.jsx(r,{label:o("storybook.demo.overview"),value:"tab1",children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.overviewTabContent")})}),e.jsx(r,{label:o("storybook.demo.details"),value:"tab2",children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.detailsTabContent")})}),e.jsx(r,{label:o("platform.nav.settings"),value:"tab3",children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.settingsTabContent")})})]})})},_=()=>{const o=n();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{children:[e.jsx(r,{label:o("storybook.demo.firstTab"),children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.firstTabContentAuto")})}),e.jsx(r,{label:o("storybook.demo.secondTab"),children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.secondTabContent")})}),e.jsx(r,{label:o("storybook.demo.thirdTab"),children:e.jsx(t,{"data-size":"sm",children:o("storybook.demo.thirdTabContent")})})]})})},O=()=>{const o=n();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{size:"sm",children:[e.jsx(r,{label:o("storybook.demo.tab1"),children:o("storybook.demo.content1")}),e.jsx(r,{label:o("storybook.demo.tab2"),children:o("storybook.demo.content2")})]})})},U=()=>{const o=n();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{size:"md",children:[e.jsx(r,{label:o("storybook.demo.tab1"),children:o("storybook.demo.content1")}),e.jsx(r,{label:o("storybook.demo.tab2"),children:o("storybook.demo.content2")})]})})},q=()=>{const o=n();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{size:"lg",children:[e.jsx(r,{label:o("storybook.demo.tab1"),children:o("storybook.demo.content1")}),e.jsx(r,{label:o("storybook.demo.tab2"),children:o("storybook.demo.content2")})]})})},B=()=>{const o=n(),[u,H]=E.useState("tab1");return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{value:u,onChange:H,children:[e.jsx(r,{label:o("storybook.demo.tab1"),value:"tab1",children:e.jsxs(t,{"data-size":"sm",children:[o("storybook.demo.controlledTab1")," ",u]})}),e.jsx(r,{label:o("storybook.demo.tab2"),value:"tab2",children:e.jsxs(t,{"data-size":"sm",children:[o("storybook.demo.controlledTab2")," ",u]})})]})})},G=()=>{const o=n();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{children:[e.jsx(r,{label:o("storybook.demo.overview"),children:e.jsxs("div",{children:[e.jsx(p,{level:3,"data-size":"sm",children:o("storybook.demo.overviewSection")}),e.jsx(t,{"data-size":"sm",children:o("storybook.demo.richContentDescription")})]})}),e.jsx(r,{label:o("storybook.demo.details"),children:e.jsxs("div",{children:[e.jsx(p,{level:3,"data-size":"sm",children:o("storybook.demo.detailsSection")}),e.jsx(t,{"data-size":"sm",children:o("storybook.demo.detailedInfoHere")})]})})]})})},a={render:function(){return e.jsx(F,{})}},d={render:function(){return e.jsx(_,{})}},i={render:function(){return e.jsx(O,{})}},l={render:function(){return e.jsx(U,{})}},m={render:function(){return e.jsx(q,{})}},c={render:function(){return e.jsx(B,{})}},b={render:function(){return e.jsx(G,{})}};var h,x,j;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    return <SimpleAPIDemo />;
  }
}`,...(j=(x=a.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var y,T,k;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    return <AutoValuesDemo />;
  }
}`,...(k=(T=d.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var v,f,S;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: function Render() {
    return <SmallDemo />;
  }
}`,...(S=(f=i.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var g,C,R;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    return <MediumDemo />;
  }
}`,...(R=(C=l.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var z,A,D;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function Render() {
    return <LargeDemo />;
  }
}`,...(D=(A=m.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var I,w,P;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    return <ControlledDemo />;
  }
}`,...(P=(w=c.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};var V,L,M;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: function Render() {
    return <RichContentDemo />;
  }
}`,...(M=(L=b.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const ye=["SimpleAPI","AutoValues","Small","Medium","Large","Controlled","RichContent"];export{d as AutoValues,c as Controlled,m as Large,l as Medium,b as RichContent,a as SimpleAPI,i as Small,ye as __namedExportsOrder,je as default};
//# sourceMappingURL=SimpleTabs.stories-LfGaPZat.js.map
