import{j as e}from"./jsx-runtime-BYYWji4R.js";import{fn as a}from"./index-CLEdRh-S.js";import{u as re}from"./index-bjNF47ar.js";import{F as t}from"./FavoriteButton-CjF4o47X.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./utils-Dlkq94hl.js";import"./icons-CYjUz1aN.js";const qe={title:"Blocks/FavoriteButton",component:t,parameters:{layout:"centered",docs:{description:{component:`
## FavoriteButton

Interactive button for favoriting/unfavoriting resources. Supports auth gating with callback for unauthenticated users.

### Features
- Three variants: icon, button, compact
- Size variants (sm, md, lg)
- Loading state
- Favorite count display
- Authentication gating
- Disabled state

### Usage
\`\`\`tsx
<FavoriteButton
  isFavorited={false}
  isAuthenticated={true}
  onToggle={handleToggle}
  variant="icon"
  size="md"
/>
\`\`\`
        `}}},args:{onToggle:a(),onAuthRequired:a()},argTypes:{variant:{control:"select",options:["icon","button","compact"],description:"Visual variant"},size:{control:"select",options:["sm","md","lg"],description:"Button size"},isFavorited:{control:"boolean",description:"Whether item is favorited"},isAuthenticated:{control:"boolean",description:"Whether user is authenticated"},showCount:{control:"boolean",description:"Show favorite count"},isLoading:{control:"boolean",description:"Loading state"},disabled:{control:"boolean",description:"Disabled state"}},tags:["autodocs"]},s={args:{isFavorited:!1,isAuthenticated:!0,variant:"icon",size:"md",isLoading:!1,disabled:!1}},i={args:{isFavorited:!0,isAuthenticated:!0,variant:"icon",size:"md",isLoading:!1,disabled:!1}},r={args:{isFavorited:!1,isAuthenticated:!0,variant:"icon",size:"md",isLoading:!0,disabled:!1}},n={args:{isFavorited:!1,isAuthenticated:!1,variant:"icon",size:"md",isLoading:!1,disabled:!1,onAuthRequired:a()}},o={args:{isFavorited:!1,isAuthenticated:!0,variant:"button",size:"md",isLoading:!1,disabled:!1}},d={args:{isFavorited:!0,isAuthenticated:!0,variant:"button",size:"md",isLoading:!1,disabled:!1}},c={args:{isFavorited:!1,isAuthenticated:!0,variant:"compact",size:"sm",isLoading:!1,disabled:!1}},l={args:{isFavorited:!1,isAuthenticated:!0,variant:"compact",size:"sm",favoriteCount:42,showCount:!0,isLoading:!1,disabled:!1}},u={args:{isFavorited:!0,isAuthenticated:!0,variant:"button",size:"md",favoriteCount:128,showCount:!0,isLoading:!1,disabled:!1}},m={args:{isFavorited:!1,isAuthenticated:!0,variant:"icon",size:"sm",isLoading:!1,disabled:!1}},p={args:{isFavorited:!1,isAuthenticated:!0,variant:"icon",size:"md",isLoading:!1,disabled:!1}},g={args:{isFavorited:!1,isAuthenticated:!0,variant:"icon",size:"lg",isLoading:!1,disabled:!1}},v={args:{isFavorited:!1,isAuthenticated:!0,variant:"icon",size:"md",isLoading:!1,disabled:!0}},f={render:function(){return re(),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(t,{variant:"icon",size:"md",isFavorited:!1,onToggle:a()}),e.jsx(t,{variant:"icon",size:"md",isFavorited:!0,onToggle:a()})]}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(t,{variant:"compact",size:"sm",isFavorited:!1,onToggle:a()}),e.jsx(t,{variant:"compact",size:"sm",isFavorited:!0,favoriteCount:42,showCount:!0,onToggle:a()})]}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(t,{variant:"button",size:"md",isFavorited:!1,onToggle:a()}),e.jsx(t,{variant:"button",size:"md",isFavorited:!0,favoriteCount:128,showCount:!0,onToggle:a()})]})]})}};var h,F,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false
  }
}`,...(b=(F=s.parameters)==null?void 0:F.docs)==null?void 0:b.source}}};var z,A,L;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    isFavorited: true,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false
  }
}`,...(L=(A=i.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var x,C,S;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: true,
    disabled: false
  }
}`,...(S=(C=r.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var y,T,B;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: false,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false,
    onAuthRequired: fn()
  }
}`,...(B=(T=n.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var I,j,w;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'button',
    size: 'md',
    isLoading: false,
    disabled: false
  }
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var D,R,W;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    isFavorited: true,
    isAuthenticated: true,
    variant: 'button',
    size: 'md',
    isLoading: false,
    disabled: false
  }
}`,...(W=(R=d.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var V,q,U;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'compact',
    size: 'sm',
    isLoading: false,
    disabled: false
  }
}`,...(U=(q=c.parameters)==null?void 0:q.docs)==null?void 0:U.source}}};var k,E,M;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'compact',
    size: 'sm',
    favoriteCount: 42,
    showCount: true,
    isLoading: false,
    disabled: false
  }
}`,...(M=(E=l.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var N,_,O;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    isFavorited: true,
    isAuthenticated: true,
    variant: 'button',
    size: 'md',
    favoriteCount: 128,
    showCount: true,
    isLoading: false,
    disabled: false
  }
}`,...(O=(_=u.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var G,H,J;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'sm',
    isLoading: false,
    disabled: false
  }
}`,...(J=(H=m.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var K,P,Q;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: false
  }
}`,...(Q=(P=p.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'lg',
    isLoading: false,
    disabled: false
  }
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ae;v.parameters={...v.parameters,docs:{...($=v.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    isFavorited: false,
    isAuthenticated: true,
    variant: 'icon',
    size: 'md',
    isLoading: false,
    disabled: true
  }
}`,...(ae=(ee=v.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,se,ie;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
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
          <FavoriteButton variant="icon" size="md" isFavorited={false} onToggle={fn()} />
          <FavoriteButton variant="icon" size="md" isFavorited={true} onToggle={fn()} />
        </div>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'center'
      }}>
          <FavoriteButton variant="compact" size="sm" isFavorited={false} onToggle={fn()} />
          <FavoriteButton variant="compact" size="sm" isFavorited={true} favoriteCount={42} showCount onToggle={fn()} />
        </div>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'center'
      }}>
          <FavoriteButton variant="button" size="md" isFavorited={false} onToggle={fn()} />
          <FavoriteButton variant="button" size="md" isFavorited={true} favoriteCount={128} showCount onToggle={fn()} />
        </div>
      </div>;
  }
}`,...(ie=(se=f.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};const Ue=["IconNotFavorited","IconFavorited","IconLoading","IconUnauthenticated","ButtonVariant","ButtonFavorited","Compact","CompactWithCount","ButtonWithCount","SmallSize","MediumSize","LargeSize","Disabled","AllVariants"];export{f as AllVariants,d as ButtonFavorited,o as ButtonVariant,u as ButtonWithCount,c as Compact,l as CompactWithCount,v as Disabled,i as IconFavorited,r as IconLoading,s as IconNotFavorited,n as IconUnauthenticated,g as LargeSize,p as MediumSize,m as SmallSize,Ue as __namedExportsOrder,qe as default};
//# sourceMappingURL=FavoriteButton.stories-DQky7Pkb.js.map
