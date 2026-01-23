import{j as e}from"./jsx-runtime-BYYWji4R.js";import{T as a}from"./textarea-DMvw4dlU.js";import{F as r,V as A}from"./index-Df4a1FH3.js";import{L as s}from"./label-9E-twYNb.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";const K={title:"Components/Textarea",component:a,parameters:{docs:{description:{component:`
Textarea for multi-line text input.

## When to Use
- Long-form text input
- Comments or descriptions
- Messages
- Feedback forms

## Best Practices
- Always provide a label
- Use character counter for limits
- Set appropriate rows for context
- Provide helpful placeholder text

## Accessibility
- Label is required
- Error messages are announced
- Resize handle for user control
        `}}},tags:["autodocs"]},i={render:()=>e.jsxs(r,{children:[e.jsx(s,{children:"Description"}),e.jsx(a,{placeholder:"Enter a description..."})]})},l={render:()=>e.jsxs(r,{children:[e.jsx(s,{children:"Additional notes"}),e.jsx(r.Description,{children:"Include any special requirements or requests"}),e.jsx(a,{placeholder:"Enter notes..."})]})},t={render:()=>e.jsxs(r,{children:[e.jsx(s,{children:"Bio"}),e.jsx(r.Description,{children:"Tell us about yourself"}),e.jsx(a,{placeholder:"Write a short bio...",maxLength:200}),e.jsx(r.Counter,{limit:200})]})},o={render:()=>e.jsxs(r,{children:[e.jsx(s,{children:"Message"}),e.jsx(a,{placeholder:"Enter your message...","aria-invalid":"true"}),e.jsx(A,{children:"Message is required"})]})},n={render:()=>e.jsxs(r,{children:[e.jsx(s,{children:"Locked content"}),e.jsx(a,{defaultValue:"This content cannot be edited",disabled:!0})]})},d={render:()=>e.jsxs(r,{children:[e.jsx(s,{children:"Terms and conditions"}),e.jsx(a,{defaultValue:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",readOnly:!0})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(r,{children:[e.jsx(s,{children:"Small (3 rows)"}),e.jsx(a,{rows:3,placeholder:"3 rows..."})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Medium (5 rows)"}),e.jsx(a,{rows:5,placeholder:"5 rows..."})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Large (8 rows)"}),e.jsx(a,{rows:8,placeholder:"8 rows..."})]})]})},p={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"States"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(r,{children:[e.jsx(s,{children:"Default"}),e.jsx(a,{placeholder:"Enter text..."})]}),e.jsxs(r,{children:[e.jsx(s,{children:"With value"}),e.jsx(a,{defaultValue:"Some existing content"})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Disabled"}),e.jsx(a,{disabled:!0,defaultValue:"Cannot edit"})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Read-only"}),e.jsx(a,{readOnly:!0,defaultValue:"Read-only content"})]})]})]})})};var u,m,x;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Description</Label>
      <Textarea placeholder="Enter a description..." />
    </Field>
}`,...(x=(m=i.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var h,j,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Additional notes</Label>
      <Field.Description>Include any special requirements or requests</Field.Description>
      <Textarea placeholder="Enter notes..." />
    </Field>
}`,...(b=(j=l.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var g,f,L;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Bio</Label>
      <Field.Description>Tell us about yourself</Field.Description>
      <Textarea placeholder="Write a short bio..." maxLength={200} />
      <Field.Counter limit={200} />
    </Field>
}`,...(L=(f=t.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var F,y,v;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Message</Label>
      <Textarea placeholder="Enter your message..." aria-invalid="true" />
      <ValidationMessage>Message is required</ValidationMessage>
    </Field>
}`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var D,T,w;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Locked content</Label>
      <Textarea defaultValue="This content cannot be edited" disabled />
    </Field>
}`,...(w=(T=n.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var S,V,E;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Terms and conditions</Label>
      <Textarea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." readOnly />
    </Field>
}`,...(E=(V=d.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var C,W,M;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Field>
        <Label>Small (3 rows)</Label>
        <Textarea rows={3} placeholder="3 rows..." />
      </Field>
      <Field>
        <Label>Medium (5 rows)</Label>
        <Textarea rows={5} placeholder="5 rows..." />
      </Field>
      <Field>
        <Label>Large (8 rows)</Label>
        <Textarea rows={8} placeholder="8 rows..." />
      </Field>
    </div>
}`,...(M=(W=c.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var R,q,O;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
          States
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Field>
            <Label>Default</Label>
            <Textarea placeholder="Enter text..." />
          </Field>
          <Field>
            <Label>With value</Label>
            <Textarea defaultValue="Some existing content" />
          </Field>
          <Field>
            <Label>Disabled</Label>
            <Textarea disabled defaultValue="Cannot edit" />
          </Field>
          <Field>
            <Label>Read-only</Label>
            <Textarea readOnly defaultValue="Read-only content" />
          </Field>
        </div>
      </div>
    </div>
}`,...(O=(q=p.parameters)==null?void 0:q.docs)==null?void 0:O.source}}};const N=["Default","WithDescription","WithCharacterCount","WithError","Disabled","ReadOnly","Rows","AllVariants"];export{p as AllVariants,i as Default,n as Disabled,d as ReadOnly,c as Rows,t as WithCharacterCount,l as WithDescription,o as WithError,N as __namedExportsOrder,K as default};
//# sourceMappingURL=Textarea.stories-Cb8XYD2o.js.map
