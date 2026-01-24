import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as T}from"./index-bjNF47ar.js";import{S as W,P as t,R as a,a as r,U as p}from"./StatusBadges-Dm3MSSna.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./utils-Dlkq94hl.js";const z={title:"Blocks/Status Badges",component:W,parameters:{layout:"centered"},tags:["autodocs"]},u={render:function(){const q=T();return e.jsx(W,{color:"success",children:q("platform.status.active")})}},d={render:function(){return e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(t,{status:"paid"}),e.jsx(t,{status:"unpaid"}),e.jsx(t,{status:"partial"}),e.jsx(t,{status:"refunded"})]})}},n={render:function(){return e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(r,{status:"published"}),e.jsx(r,{status:"draft"}),e.jsx(r,{status:"archived"}),e.jsx(r,{status:"maintenance"})]})}},o={render:function(){return e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(a,{status:"pending"}),e.jsx(a,{status:"needs_info"}),e.jsx(a,{status:"approved"}),e.jsx(a,{status:"rejected"})]})}},c={render:function(){return e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx(p,{status:"active"}),e.jsx(p,{status:"inactive"}),e.jsx(p,{status:"suspended"})]})}};var i,l,m;u.parameters={...u.parameters,docs:{...(i=u.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <StatusTag color="success">{t('platform.status.active')}</StatusTag>;
  }
}`,...(m=(l=u.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var g,f,x;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
        <PaymentStatusBadge status="paid" />
        <PaymentStatusBadge status="unpaid" />
        <PaymentStatusBadge status="partial" />
        <PaymentStatusBadge status="refunded" />
      </div>;
  }
}`,...(x=(f=d.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var S,R,j;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
        <ResourceStatusBadge status="published" />
        <ResourceStatusBadge status="draft" />
        <ResourceStatusBadge status="archived" />
        <ResourceStatusBadge status="maintenance" />
      </div>;
  }
}`,...(j=(R=n.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var y,v,B;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
        <RequestStatusBadge status="pending" />
        <RequestStatusBadge status="needs_info" />
        <RequestStatusBadge status="approved" />
        <RequestStatusBadge status="rejected" />
      </div>;
  }
}`,...(B=(v=o.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var h,w,P;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }}>
        <UserStatusBadge status="active" />
        <UserStatusBadge status="inactive" />
        <UserStatusBadge status="suspended" />
      </div>;
  }
}`,...(P=(w=c.parameters)==null?void 0:w.docs)==null?void 0:P.source}}};const A=["StatusTagDefault","PaymentStatuses","ResourceStatuses","RequestStatuses","UserStatuses"];export{d as PaymentStatuses,o as RequestStatuses,n as ResourceStatuses,u as StatusTagDefault,c as UserStatuses,A as __namedExportsOrder,z as default};
//# sourceMappingURL=StatusBadges.stories-kU5uCblw.js.map
