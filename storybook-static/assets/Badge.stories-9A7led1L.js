import{j as e}from"./jsx-runtime-BYYWji4R.js";import{fn as Te}from"./index-CLEdRh-S.js";import{u as n}from"./index-bjNF47ar.js";import{B as a,N as s,T as D}from"./Badge-BL5YKrbx.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import{B as o}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import{C as ye}from"./circle-check-big-N58AFyrx.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./createLucideIcon-DXOARlW5.js";const ir={title:"Composed/Badge",component:a,parameters:{layout:"centered",docs:{description:{component:`
## Badge & Tag Components

Status badges, notification counts, and tags for displaying labels and counts.

### Features
- Multiple variants (default, success, warning, danger, info, accent)
- Size variants (sm, md, lg)
- Dot badge variant
- Pill shape option
- Outline variant
- Removable tags
- Notification badges with count

### Usage
\`\`\`tsx
<Badge variant="success" size="md">Active</Badge>
<Tag variant="info" removable onRemove={handleRemove}>Tag</Tag>
<NotificationBadge count={5}>
  <Button>Notifications</Button>
</NotificationBadge>
\`\`\`
        `}}},argTypes:{variant:{control:"select",options:["default","success","warning","danger","info","accent"],description:"Badge variant"},size:{control:"select",options:["sm","md","lg"],description:"Badge size"},dot:{control:"boolean",description:"Show as dot only"},pill:{control:"boolean",description:"Pill shape"},outline:{control:"boolean",description:"Outline variant"}},tags:["autodocs"]},ke=()=>{const r=n();return e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-2)"},children:[e.jsx(a,{variant:"default",children:r("storybook.demo.default")}),e.jsx(a,{variant:"success",children:r("storybook.story.success")}),e.jsx(a,{variant:"warning",children:r("storybook.demo.warning")}),e.jsx(a,{variant:"danger",children:r("storybook.demo.danger")}),e.jsx(a,{variant:"info",children:r("storybook.demo.info")}),e.jsx(a,{variant:"accent",children:r("storybook.demo.accent")})]})},We=()=>{const r=n();return e.jsx(D,{variant:"default",size:"md",children:r("storybook.demo.tag")})},Ie=()=>{const r=n();return e.jsx(D,{variant:"info",size:"md",removable:!0,onRemove:Te(),children:r("storybook.demo.removableTag")})},we=()=>{const r=n();return e.jsx(D,{variant:"success",size:"md",icon:e.jsx(ye,{size:14}),children:r("storybook.demo.tagWithIcon")})},Ne=()=>{const r=n();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(s,{count:5,children:e.jsx(o,{"data-color":"neutral","data-size":"medium",children:r("storybook.demo.notifications")})}),e.jsx(s,{count:99,children:e.jsx(o,{"data-color":"neutral","data-size":"medium",children:r("storybook.demo.messages")})}),e.jsx(s,{count:150,max:99,children:e.jsx(o,{"data-color":"neutral","data-size":"medium",children:r("storybook.demo.overflow")})}),e.jsx(s,{count:0,showZero:!0,children:e.jsx(o,{"data-color":"neutral","data-size":"medium",children:r("storybook.demo.zeroCount")})}),e.jsx(s,{count:3,dot:!0,children:e.jsx(o,{"data-color":"neutral","data-size":"medium",children:r("storybook.demo.dotBadge")})})]})},t={args:{children:"Badge",variant:"default",size:"md"}},i={args:{children:"Success",variant:"success",size:"md"}},c={args:{children:"Warning",variant:"warning",size:"md"}},d={args:{children:"Danger",variant:"danger",size:"md"}},m={args:{children:"Info",variant:"info",size:"md"}},l={args:{children:"Accent",variant:"accent",size:"md"}},u={args:{children:"Small",variant:"default",size:"sm"}},p={args:{children:"Medium",variant:"default",size:"md"}},g={args:{children:"Large",variant:"default",size:"lg"}},h={args:{children:"With Icon",variant:"success",size:"md",icon:e.jsx(ye,{size:14})}},v={args:{variant:"success",dot:!0}},f={args:{children:"Pill Badge",variant:"accent",size:"md",pill:!0}},x={args:{children:"Outline",variant:"info",size:"md",outline:!0}},z={render:()=>e.jsx(ke,{})},j={render:()=>e.jsx(We,{})},b={render:()=>e.jsx(Ie,{})},S={render:()=>e.jsx(we,{})},B={render:()=>e.jsx(Ne,{})};var y,T,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  }
}`,...(k=(T=t.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var W,I,w;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'Success',
    variant: 'success',
    size: 'md'
  }
}`,...(w=(I=i.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var N,A,R;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'md'
  }
}`,...(R=(A=c.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};var C,O,P;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Danger',
    variant: 'danger',
    size: 'md'
  }
}`,...(P=(O=d.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var V,M,E;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    children: 'Info',
    variant: 'info',
    size: 'md'
  }
}`,...(E=(M=m.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};var L,_,F;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    children: 'Accent',
    variant: 'accent',
    size: 'md'
  }
}`,...(F=(_=l.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var U,Z,q;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'Small',
    variant: 'default',
    size: 'sm'
  }
}`,...(q=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:q.source}}};var G,H,J;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'Medium',
    variant: 'default',
    size: 'md'
  }
}`,...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,Q,X;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: 'Large',
    variant: 'default',
    size: 'lg'
  }
}`,...(X=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,$,ee;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: 'With Icon',
    variant: 'success',
    size: 'md',
    icon: <CheckCircle size={14} />
  }
}`,...(ee=($=h.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ae,se;v.parameters={...v.parameters,docs:{...(re=v.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    dot: true
  }
}`,...(se=(ae=v.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var oe,ne,te;f.parameters={...f.parameters,docs:{...(oe=f.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    children: 'Pill Badge',
    variant: 'accent',
    size: 'md',
    pill: true
  }
}`,...(te=(ne=f.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var ie,ce,de;x.parameters={...x.parameters,docs:{...(ie=x.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    children: 'Outline',
    variant: 'info',
    size: 'md',
    outline: true
  }
}`,...(de=(ce=x.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var me,le,ue;z.parameters={...z.parameters,docs:{...(me=z.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <AllVariantsDemo />
}`,...(ue=(le=z.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var pe,ge,he;j.parameters={...j.parameters,docs:{...(pe=j.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <TagDefaultDemo />
}`,...(he=(ge=j.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var ve,fe,xe;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => <TagRemovableDemo />
}`,...(xe=(fe=b.parameters)==null?void 0:fe.docs)==null?void 0:xe.source}}};var ze,je,be;S.parameters={...S.parameters,docs:{...(ze=S.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  render: () => <TagWithIconDemo />
}`,...(be=(je=S.parameters)==null?void 0:je.docs)==null?void 0:be.source}}};var Se,Be,De;B.parameters={...B.parameters,docs:{...(Se=B.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: () => <NotificationBadgeDemo />
}`,...(De=(Be=B.parameters)==null?void 0:Be.docs)==null?void 0:De.source}}};const cr=["Default","Success","Warning","Danger","InfoVariant","Accent","Small","Medium","Large","WithIcon","Dot","Pill","Outline","AllVariants","TagDefault","TagRemovable","TagWithIcon","NotificationBadgeExample"];export{l as Accent,z as AllVariants,d as Danger,t as Default,v as Dot,m as InfoVariant,g as Large,p as Medium,B as NotificationBadgeExample,x as Outline,f as Pill,u as Small,i as Success,j as TagDefault,b as TagRemovable,S as TagWithIcon,c as Warning,h as WithIcon,cr as __namedExportsOrder,ir as default};
//# sourceMappingURL=Badge.stories-9A7led1L.js.map
