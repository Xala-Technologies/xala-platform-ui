import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as n}from"./index-bjNF47ar.js";import{T as t}from"./textarea-DMvw4dlU.js";import{F as r,V as z}from"./index-Df4a1FH3.js";import{L as s}from"./label-9E-twYNb.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";const Z={title:"Components/Textarea",component:t,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},d={render:function(){const o=n();return e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.description")}),e.jsx(t,{placeholder:o("storybook.demo.enterDescription")})]})}},i={render:function(){const o=n();return e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.additionalNotes")}),e.jsx(r.Description,{children:o("storybook.demo.includeSpecialRequirements")}),e.jsx(t,{placeholder:o("storybook.demo.enterNotes")})]})}},l={render:function(){const o=n();return e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.bio")}),e.jsx(r.Description,{children:o("storybook.demo.tellUsAboutYourself")}),e.jsx(t,{placeholder:o("storybook.demo.writeShortBio"),maxLength:200}),e.jsx(r.Counter,{limit:200})]})}},c={render:function(){const o=n();return e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.message")}),e.jsx(t,{placeholder:o("storybook.demo.enterYourMessage"),"aria-invalid":"true"}),e.jsx(z,{children:o("storybook.demo.messageIsRequired")})]})}},m={render:function(){const o=n();return e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.lockedContent")}),e.jsx(t,{defaultValue:o("storybook.demo.cannotBeEdited"),disabled:!0})]})}},u={render:function(){const o=n();return e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.termsAndConditions")}),e.jsx(t,{defaultValue:o("storybook.demo.loremIpsum"),readOnly:!0})]})}},p={render:function(){const o=n();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.small3Rows")}),e.jsx(t,{rows:3,placeholder:o("storybook.demo.threeRows")})]}),e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.medium5Rows")}),e.jsx(t,{rows:5,placeholder:o("storybook.demo.fiveRows")})]}),e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.large8Rows")}),e.jsx(t,{rows:8,placeholder:o("storybook.demo.eightRows")})]})]})}},b={render:function(){const o=n();return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.states")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.story.default")}),e.jsx(t,{placeholder:o("storybook.demo.enterText")})]}),e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.demo.withValue")}),e.jsx(t,{defaultValue:o("storybook.demo.someExistingContent")})]}),e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.story.disabled")}),e.jsx(t,{disabled:!0,defaultValue:o("storybook.demo.cannotEdit")})]}),e.jsxs(r,{children:[e.jsx(s,{children:o("storybook.story.readOnly")}),e.jsx(t,{readOnly:!0,defaultValue:o("storybook.demo.readOnlyContent")})]})]})]})})}};var y,x,h;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.description')}</Label>
        <Textarea placeholder={t('storybook.demo.enterDescription')} />
      </Field>;
  }
}`,...(h=(x=d.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var f,k,j;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.additionalNotes')}</Label>
        <Field.Description>{t('storybook.demo.includeSpecialRequirements')}</Field.Description>
        <Textarea placeholder={t('storybook.demo.enterNotes')} />
      </Field>;
  }
}`,...(j=(k=i.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var g,R,F;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.bio')}</Label>
        <Field.Description>{t('storybook.demo.tellUsAboutYourself')}</Field.Description>
        <Textarea placeholder={t('storybook.demo.writeShortBio')} maxLength={200} />
        <Field.Counter limit={200} />
      </Field>;
  }
}`,...(F=(R=l.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var L,v,T;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.message')}</Label>
        <Textarea placeholder={t('storybook.demo.enterYourMessage')} aria-invalid="true" />
        <ValidationMessage>{t('storybook.demo.messageIsRequired')}</ValidationMessage>
      </Field>;
  }
}`,...(T=(v=c.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var w,D,V;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.lockedContent')}</Label>
        <Textarea defaultValue={t('storybook.demo.cannotBeEdited')} disabled />
      </Field>;
  }
}`,...(V=(D=m.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var C,S,E;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.termsAndConditions')}</Label>
        <Textarea defaultValue={t('storybook.demo.loremIpsum')} readOnly />
      </Field>;
  }
}`,...(E=(S=u.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var O,A,B;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Field>
          <Label>{t('storybook.demo.small3Rows')}</Label>
          <Textarea rows={3} placeholder={t('storybook.demo.threeRows')} />
        </Field>
        <Field>
          <Label>{t('storybook.demo.medium5Rows')}</Label>
          <Textarea rows={5} placeholder={t('storybook.demo.fiveRows')} />
        </Field>
        <Field>
          <Label>{t('storybook.demo.large8Rows')}</Label>
          <Textarea rows={8} placeholder={t('storybook.demo.eightRows')} />
        </Field>
      </div>;
  }
}`,...(B=(A=p.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var W,M,q;b.parameters={...b.parameters,docs:{...(W=b.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
            {t('storybook.story.states')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)'
        }}>
            <Field>
              <Label>{t('storybook.story.default')}</Label>
              <Textarea placeholder={t('storybook.demo.enterText')} />
            </Field>
            <Field>
              <Label>{t('storybook.demo.withValue')}</Label>
              <Textarea defaultValue={t('storybook.demo.someExistingContent')} />
            </Field>
            <Field>
              <Label>{t('storybook.story.disabled')}</Label>
              <Textarea disabled defaultValue={t('storybook.demo.cannotEdit')} />
            </Field>
            <Field>
              <Label>{t('storybook.story.readOnly')}</Label>
              <Textarea readOnly defaultValue={t('storybook.demo.readOnlyContent')} />
            </Field>
          </div>
        </div>
      </div>;
  }
}`,...(q=(M=b.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};const $=["Default","WithDescription","WithCharacterCount","WithError","Disabled","ReadOnly","Rows","AllVariants"];export{b as AllVariants,d as Default,m as Disabled,u as ReadOnly,p as Rows,l as WithCharacterCount,i as WithDescription,c as WithError,$ as __namedExportsOrder,Z as default};
//# sourceMappingURL=Textarea.stories-BwCWRdNE.js.map
