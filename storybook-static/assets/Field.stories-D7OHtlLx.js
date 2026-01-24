import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as a}from"./index-bjNF47ar.js";import{T as i}from"./textfield-BCKd4uLT.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import{F as t,V}from"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import{L as o}from"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import{S as n}from"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import{T as M}from"./textarea-DMvw4dlU.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const de={title:"Components/Field",parameters:{docs:{description:{component:`
Field component wraps form inputs with proper labeling, descriptions, and validation messages. It ensures accessibility and consistent form structure.

## Variants

- **Default** - Basic field with label and input
- **With description** - Includes helpful description text
- **With validation** - Shows error or success messages
- **With counter** - Character counter for text inputs
- **Required** - Indicates required fields
- **Disabled** - Disabled field state

## When to Use

- Form inputs requiring labels
- Inputs with descriptions or help text
- Inputs with validation messages
- Text inputs with character limits
- Required form fields
- Complex form layouts

## Best Practices

### Do
- Always provide labels for inputs
- Use descriptions for additional context
- Show validation messages clearly
- Connect error messages to inputs
- Use character counters when appropriate
- Mark required fields clearly

### Don't
- Don't use placeholder text as labels
- Don't hide validation messages
- Don't use fields without proper labeling
- Don't forget error state indicators
- Don't make descriptions too long
- Don't use multiple labels per input

## Usage Patterns

### Basic Field
\`\`\`tsx
<Field>
  <Label>Full name</Label>
  <Input aria-label="Full name" />
</Field>
\`\`\`

### With Description
\`\`\`tsx
<Field>
  <Label>Email address</Label>
  <Field.Description>We will never share your email with anyone.</Field.Description>
  <Input type="email" aria-label="Email address" />
</Field>
\`\`\`

### With Validation
\`\`\`tsx
<Field>
  <Label>Phone number</Label>
  <Input aria-invalid="true" />
  <ValidationMessage>Phone number must be 8 digits</ValidationMessage>
</Field>
\`\`\`

### With Textarea and Counter
\`\`\`tsx
<Field>
  <Label>Description</Label>
  <Field.Description>Max 500 characters</Field.Description>
  <Textarea rows={4} />
  <Field.Counter limit={500} />
</Field>
\`\`\`

### With Select
\`\`\`tsx
<Field>
  <Label>Country</Label>
  <Select>
    <Select.Option value="">Choose a country...</Select.Option>
    <Select.Option value="no">Norway</Select.Option>
    <Select.Option value="se">Sweden</Select.Option>
    <Select.Option value="dk">Denmark</Select.Option>
  </Select>
</Field>
\`\`\`

### Required Field
\`\`\`tsx
<Field>
  <Label required>Email address</Label>
  <Input type="email" required aria-required="true" aria-label="Email address" />
</Field>
\`\`\`

## Anti-Patterns

### Anti-pattern: Placeholder as Label
Using placeholder text instead of proper labels harms accessibility.

### Anti-pattern: Missing Error Association
Not connecting error messages to their inputs confuses users.

### Anti-pattern: Vague Descriptions
Using generic text that doesn't help users understand the field.

### Anti-pattern: Hidden Validation
Making validation messages hard to find or understand.

## Accessibility

### Screen Readers
- Label properly associated with input
- Description text announced
- Error messages connected to inputs
- Required state clearly indicated
- Character counts announced

### Keyboard Navigation
- Tab navigates to input field
- Focus moves to label first
- Error messages reachable via keyboard
- All interactive elements accessible

### WCAG 2.1 AA Compliance
- **Label association**: Labels properly connected to inputs
- **Error identification**: Errors clearly identified and described
- **Instructions**: Additional instructions provided when needed
- **Error prevention**: Validation helps prevent errors
- **Keyboard accessible**: All elements reachable via keyboard

### ARIA Implementation
\`\`\`tsx
<Field>
  <Label htmlFor="email">Email address</Label>
  <Field.Description id="email-desc">We'll never share your email.</Field.Description>
  <Input
    id="email"
    aria-describedby="email-desc email-error"
    aria-invalid="true"
    aria-required="true"
  />
  <ValidationMessage id="email-error" role="alert">
    Please enter a valid email
  </ValidationMessage>
</Field>
\`\`\`

### Best Practice for Labels
Use clear, descriptive labels:
\`\`\`tsx
// Good
<Label>First name</Label>
<Label>Email address</Label>
<Label>Phone number (optional)</Label>

// Bad
<Label>Name</Label>
<Label>Info</Label>
<Label>Enter text</Label>
\`\`\`

### Validation States
\`\`\`tsx
// Error state
<Field>
  <Label>Email</Label>
  <Input aria-invalid="true" />
  <ValidationMessage>Invalid email format</ValidationMessage>
</Field>

// Success state
<Field>
  <Label>Password</Label>
  <Input aria-invalid="false" />
  <ValidationMessage variant="success">Password strength: Strong</ValidationMessage>
</Field>
\`\`\`
        `}}},tags:["autodocs"]},l={render:function(){const r=a();return e.jsxs(t,{children:[e.jsx(o,{children:r("storybook.demo.fullName")}),e.jsx(i,{"aria-label":r("storybook.demo.fullName")})]})}},d={render:function(){const r=a();return e.jsxs(t,{children:[e.jsx(o,{children:r("storybook.demo.emailAddress")}),e.jsx(t.Description,{children:r("storybook.demo.neverShareEmail")}),e.jsx(i,{type:"email","aria-label":r("storybook.demo.emailAddress")})]})}},c={render:function(){const r=a();return e.jsxs(t,{children:[e.jsx(o,{children:r("storybook.demo.phoneNumber")}),e.jsx(i,{"aria-invalid":"true","aria-label":r("storybook.demo.phoneNumber")}),e.jsx(V,{children:r("storybook.demo.phoneMustBe8Digits")})]})}},m={render:function(){const r=a();return e.jsxs(t,{children:[e.jsx(o,{children:r("storybook.demo.description")}),e.jsx(t.Description,{children:r("storybook.demo.maxNCharacters",{count:500})}),e.jsx(M,{rows:4}),e.jsx(t.Counter,{limit:500})]})}},u={render:function(){const r=a();return e.jsxs(t,{children:[e.jsx(o,{children:r("storybook.demo.country")}),e.jsxs(n,{children:[e.jsx(n.Option,{value:"",children:r("storybook.demo.chooseCountry")}),e.jsx(n.Option,{value:"no",children:r("storybook.demo.norway")}),e.jsx(n.Option,{value:"se",children:r("storybook.demo.sweden")}),e.jsx(n.Option,{value:"dk",children:r("storybook.demo.denmark")})]})]})}},p={render:function(){const r=a();return e.jsxs(t,{children:[e.jsxs(o,{children:[r("storybook.demo.name")," ",e.jsx("span",{"aria-hidden":"true",children:"*"})]}),e.jsx(i,{required:!0,"aria-label":r("storybook.demo.name")})]})}},b={render:function(){const r=a();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t,{"data-size":"sm",children:[e.jsx(o,{children:r("storybook.demo.smallField")}),e.jsx(i,{"aria-label":r("storybook.demo.smallFieldInput")})]}),e.jsxs(t,{"data-size":"md",children:[e.jsx(o,{children:r("storybook.demo.mediumField")}),e.jsx(i,{"aria-label":r("storybook.demo.mediumFieldInput")})]}),e.jsxs(t,{"data-size":"lg",children:[e.jsx(o,{children:r("storybook.demo.largeField")}),e.jsx(i,{"aria-label":r("storybook.demo.largeFieldInput")})]})]})}};var h,y,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.fullName')}</Label>
        <Input aria-label={t('storybook.demo.fullName')} />
      </Field>;
  }
}`,...(x=(y=l.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var F,f,g;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.emailAddress')}</Label>
        <Field.Description>{t('storybook.demo.neverShareEmail')}</Field.Description>
        <Input type="email" aria-label={t('storybook.demo.emailAddress')} />
      </Field>;
  }
}`,...(g=(f=d.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var k,L,v;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.phoneNumber')}</Label>
        <Input aria-invalid="true" aria-label={t('storybook.demo.phoneNumber')} />
        <ValidationMessage>{t('storybook.demo.phoneMustBe8Digits')}</ValidationMessage>
      </Field>;
  }
}`,...(v=(L=c.parameters)==null?void 0:L.docs)==null?void 0:v.source}}};var S,j,D;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.description')}</Label>
        <Field.Description>{t('storybook.demo.maxNCharacters', {
          count: 500
        })}</Field.Description>
        <Textarea rows={4} />
        <Field.Counter limit={500} />
      </Field>;
  }
}`,...(D=(j=m.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var I,w,R;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.country')}</Label>
        <Select>
          <Select.Option value="">{t('storybook.demo.chooseCountry')}</Select.Option>
          <Select.Option value="no">{t('storybook.demo.norway')}</Select.Option>
          <Select.Option value="se">{t('storybook.demo.sweden')}</Select.Option>
          <Select.Option value="dk">{t('storybook.demo.denmark')}</Select.Option>
        </Select>
      </Field>;
  }
}`,...(R=(w=u.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var E,O,A;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>
          {t('storybook.demo.name')} <span aria-hidden="true">*</span>
        </Label>
        <Input required aria-label={t('storybook.demo.name')} />
      </Field>;
  }
}`,...(A=(O=p.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var C,T,W;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <Field data-size="sm">
          <Label>{t('storybook.demo.smallField')}</Label>
          <Input aria-label={t('storybook.demo.smallFieldInput')} />
        </Field>
        <Field data-size="md">
          <Label>{t('storybook.demo.mediumField')}</Label>
          <Input aria-label={t('storybook.demo.mediumFieldInput')} />
        </Field>
        <Field data-size="lg">
          <Label>{t('storybook.demo.largeField')}</Label>
          <Input aria-label={t('storybook.demo.largeFieldInput')} />
        </Field>
      </div>;
  }
}`,...(W=(T=b.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};const ce=["Default","WithDescription","WithError","WithTextarea","WithSelect","Required","Sizes"];export{l as Default,p as Required,b as Sizes,d as WithDescription,c as WithError,u as WithSelect,m as WithTextarea,ce as __namedExportsOrder,de as default};
//# sourceMappingURL=Field.stories-D7OHtlLx.js.map
