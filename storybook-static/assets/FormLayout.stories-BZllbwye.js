import{j as e}from"./jsx-runtime-BYYWji4R.js";import{fn as n}from"./index-CLEdRh-S.js";import{u as a}from"./index-bjNF47ar.js";import{F as s,a as r,b as k,c as re,d as i}from"./FormLayout-8yMsHnug.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import{B as l}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import{S as w}from"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import{T as te}from"./textarea-DMvw4dlU.js";import{T as t}from"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const Ke={title:"Composed/FormLayout",component:s,parameters:{layout:"centered",docs:{description:{component:`
## FormLayout Components

Form sections, actions, and layout helpers for consistent form structure.

### Features
- FormSection with collapsible support
- FormActions with alignment options
- FormRow with grid layout
- FormField with label and error handling
- FormDivider for visual separation

### Usage
\`\`\`tsx
<FormSection title="Personal Information" description="Enter your details">
  <FormRow columns={2}>
    <FormField label="First Name" required>
      <Textfield />
    </FormField>
  </FormRow>
</FormSection>
\`\`\`
        `}}},tags:["autodocs"]},se=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.personalInformation"),description:o("storybook.demo.enterPersonalDetails"),children:[e.jsx(r,{label:o("storybook.demo.fullName"),required:!0,children:e.jsx(t,{placeholder:"John Doe"})}),e.jsx(r,{label:o("platform.auth.email"),required:!0,children:e.jsx(t,{type:"email",placeholder:"john@example.com"})})]})})},d={render:function(){return e.jsx(se,{})}},ne=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.advancedSettings"),description:o("storybook.demo.optionalAdvancedConfig"),collapsible:!0,defaultCollapsed:!0,children:[e.jsx(r,{label:o("storybook.demo.apiKey"),children:e.jsx(t,{placeholder:o("storybook.demo.enterApiKey")})}),e.jsx(r,{label:o("storybook.demo.webhookUrl"),children:e.jsx(t,{placeholder:"https://example.com/webhook"})})]})})},c={render:function(){return e.jsx(ne,{})}},le=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.contactInformation"),children:[e.jsxs(k,{columns:2,children:[e.jsx(r,{label:o("storybook.demo.firstName"),required:!0,children:e.jsx(t,{placeholder:"John"})}),e.jsx(r,{label:o("storybook.demo.lastName"),required:!0,children:e.jsx(t,{placeholder:"Doe"})})]}),e.jsxs(k,{columns:2,children:[e.jsx(r,{label:o("storybook.demo.phone"),children:e.jsx(t,{type:"tel",placeholder:"+47 12 34 56 78"})}),e.jsx(r,{label:o("platform.auth.email"),required:!0,children:e.jsx(t,{type:"email",placeholder:"john@example.com"})})]})]})})},m={render:function(){return e.jsx(le,{})}},ae=()=>{const o=a();return e.jsx("div",{style:{width:"800px"},children:e.jsx(s,{title:o("storybook.demo.address"),children:e.jsxs(k,{columns:3,children:[e.jsx(r,{label:o("storybook.demo.street"),children:e.jsx(t,{placeholder:"Storgata 1"})}),e.jsx(r,{label:o("storybook.demo.postalCode"),children:e.jsx(t,{placeholder:"0155"})}),e.jsx(r,{label:o("storybook.demo.city"),children:e.jsx(t,{placeholder:"Oslo"})})]})})})},p={render:function(){return e.jsx(ae,{})}},ie=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.validationExample"),children:[e.jsx(r,{label:o("platform.auth.email"),required:!0,error:o("storybook.demo.invalidEmailError"),children:e.jsx(t,{type:"email",placeholder:"invalid-email"})}),e.jsx(r,{label:o("platform.auth.password"),required:!0,helperText:o("storybook.demo.passwordRequirements"),children:e.jsx(t,{type:"password"})})]})})},u={render:function(){return e.jsx(ie,{})}},de=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.formWithActions"),children:[e.jsx(r,{label:o("storybook.demo.name"),children:e.jsx(t,{placeholder:o("storybook.demo.enterName")})}),e.jsxs(i,{align:"right",children:[e.jsx(l,{onClick:n(),"data-color":"neutral","data-size":"medium",children:o("platform.common.cancel")}),e.jsx(l,{onClick:n(),"data-color":"accent","data-size":"medium",children:o("platform.common.save")})]})]})})},x={render:function(){return e.jsx(de,{})}},ce=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.formWithLeftActions"),children:[e.jsx(r,{label:o("storybook.demo.name"),children:e.jsx(t,{placeholder:o("storybook.demo.enterName")})}),e.jsxs(i,{align:"left",children:[e.jsx(l,{onClick:n(),"data-color":"accent","data-size":"medium",children:o("platform.common.save")}),e.jsx(l,{onClick:n(),"data-color":"neutral","data-size":"medium",children:o("platform.common.cancel")})]})]})})},h={render:function(){return e.jsx(ce,{})}},me=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.formWithBetweenActions"),children:[e.jsx(r,{label:o("storybook.demo.name"),children:e.jsx(t,{placeholder:o("storybook.demo.enterName")})}),e.jsxs(i,{align:"between",children:[e.jsx(l,{onClick:n(),"data-color":"neutral","data-size":"medium",children:o("platform.common.delete")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[e.jsx(l,{onClick:n(),"data-color":"neutral","data-size":"medium",children:o("platform.common.cancel")}),e.jsx(l,{onClick:n(),"data-color":"accent","data-size":"medium",children:o("platform.common.save")})]})]})]})})},j={render:function(){return e.jsx(me,{})}},pe=()=>{const o=a();return e.jsx("div",{style:{width:"600px",height:"400px",overflow:"auto",border:"1px solid var(--ds-color-neutral-border-subtle)"},children:e.jsxs(s,{title:o("storybook.demo.longForm"),children:[Array.from({length:10},(he,F)=>e.jsx(r,{label:`${o("storybook.demo.field")} ${F+1}`,children:e.jsx(t,{placeholder:`${o("storybook.demo.enterValue")} ${F+1}`})},F)),e.jsxs(i,{align:"right",sticky:!0,children:[e.jsx(l,{onClick:n(),"data-color":"neutral","data-size":"medium",children:o("platform.common.cancel")}),e.jsx(l,{onClick:n(),"data-color":"accent","data-size":"medium",children:o("platform.common.save")})]})]})})},b={render:function(){return e.jsx(pe,{})}},ue=()=>{const o=a();return e.jsx("div",{style:{width:"600px"},children:e.jsxs(s,{title:o("storybook.demo.formSections"),children:[e.jsx(r,{label:o("storybook.demo.firstSectionField"),children:e.jsx(t,{placeholder:o("storybook.demo.value",{number:1})})}),e.jsx(re,{label:o("storybook.demo.or")}),e.jsx(r,{label:o("storybook.demo.secondSectionField"),children:e.jsx(t,{placeholder:o("storybook.demo.value",{number:2})})})]})})},y={name:"FormDividerExample",render:function(){return e.jsx(ue,{})}},xe=()=>{const o=a();return e.jsxs("div",{style:{width:"600px"},children:[e.jsxs(s,{title:o("storybook.demo.personalInformation"),description:o("storybook.demo.tellUsAboutYourself"),children:[e.jsxs(k,{columns:2,children:[e.jsx(r,{label:o("storybook.demo.firstName"),required:!0,children:e.jsx(t,{placeholder:"John"})}),e.jsx(r,{label:o("storybook.demo.lastName"),required:!0,children:e.jsx(t,{placeholder:"Doe"})})]}),e.jsx(r,{label:o("platform.auth.email"),required:!0,helperText:o("storybook.demo.neverShareEmail"),children:e.jsx(t,{type:"email",placeholder:"john@example.com"})}),e.jsx(r,{label:o("storybook.demo.bio"),children:e.jsx(te,{placeholder:o("storybook.demo.tellUsAboutYourself"),rows:4})})]}),e.jsx(re,{}),e.jsxs(s,{title:o("storybook.demo.preferences"),collapsible:!0,defaultCollapsed:!0,children:[e.jsx(r,{label:o("storybook.demo.language"),children:e.jsxs(w,{children:[e.jsx("option",{value:"en",children:"English"}),e.jsx("option",{value:"no",children:"Norwegian"})]})}),e.jsx(r,{label:o("storybook.demo.theme"),children:e.jsxs(w,{children:[e.jsx("option",{value:"light",children:o("storybook.demo.light")}),e.jsx("option",{value:"dark",children:o("storybook.demo.dark")}),e.jsx("option",{value:"auto",children:o("storybook.demo.auto")})]})})]}),e.jsxs(i,{align:"right",children:[e.jsx(l,{onClick:n(),"data-color":"neutral","data-size":"medium",children:o("platform.common.cancel")}),e.jsx(l,{onClick:n(),"data-color":"accent","data-size":"medium",children:o("storybook.demo.saveChanges")})]})]})},f={render:function(){return e.jsx(xe,{})}};var g,v,R;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    return <BasicSectionExample />;
  }
}`,...(R=(v=d.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var E,S,C;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    return <CollapsibleSectionExample />;
  }
}`,...(C=(S=c.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var A,T,q;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    return <FormRowTwoColumnsExample />;
  }
}`,...(q=(T=m.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var D,z,B;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    return <FormRowThreeColumnsExample />;
  }
}`,...(B=(z=p.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var N,L,W;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: function Render() {
    return <FormFieldWithErrorExample />;
  }
}`,...(W=(L=u.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var I,U,$;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    return <FormActionsRightExample />;
  }
}`,...($=(U=x.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var J,_,K;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: function Render() {
    return <FormActionsLeftExample />;
  }
}`,...(K=(_=h.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var O,P,Y;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    return <FormActionsBetweenExample />;
  }
}`,...(Y=(P=j.parameters)==null?void 0:P.docs)==null?void 0:Y.source}}};var V,G,H;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: function Render() {
    return <FormActionsStickyExample />;
  }
}`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var M,Q,X;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: 'FormDividerExample',
  render: function Render() {
    return <FormDividerExample />;
  }
}`,...(X=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Z,ee,oe;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: function Render() {
    return <CompleteFormExample />;
  }
}`,...(oe=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:oe.source}}};const Oe=["BasicSection","CollapsibleSection","FormRowTwoColumns","FormRowThreeColumns","FormFieldWithError","FormActionsRight","FormActionsLeft","FormActionsBetween","FormActionsSticky","FormDividerExampleStory","CompleteForm"];export{d as BasicSection,c as CollapsibleSection,f as CompleteForm,j as FormActionsBetween,h as FormActionsLeft,x as FormActionsRight,b as FormActionsSticky,y as FormDividerExampleStory,u as FormFieldWithError,p as FormRowThreeColumns,m as FormRowTwoColumns,Oe as __namedExportsOrder,Ke as default};
//# sourceMappingURL=FormLayout.stories-BZllbwye.js.map
