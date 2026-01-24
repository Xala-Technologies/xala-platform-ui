import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as r}from"./index-bjNF47ar.js";import{F as t,R as m}from"./radio-ER07BMpk.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import{C as s}from"./checkbox-CeN5g5X_.js";import{V as D}from"./index-Df4a1FH3.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const $={title:"Components/Fieldset",parameters:{docs:{description:{component:`
Fieldset groups related form controls under a common legend, providing semantic structure and improved accessibility for complex forms.

## Variants

- **Default** - Standard fieldset with legend
- **With description** - Includes description text
- **Checkbox group** - Groups multiple checkboxes
- **Radio group** - Groups radio buttons
- **Error state** - Fieldset with validation errors
- **Size variants** - sm, md (default), lg

## When to Use

- Grouping related form controls
- Checkbox and radio button groups
- Form sections with related fields
- Address or contact information blocks
- Preference settings
- Multi-step form sections

## Best Practices

### Do
- Use descriptive legends for groups
- Group logically related controls
- Provide descriptions when needed
- Use proper radio/checkbox naming
- Show validation errors clearly
- Consider size for content density

### Don't
- Don't nest fieldsets too deeply
- Don't use fieldsets for single fields
- Don't make legends too long
- Don't forget proper field association
- Don't group unrelated controls
- Don't use for decorative purposes

## Usage Patterns

### Basic Fieldset
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select your interests</Fieldset.Legend>
  <Checkbox label="Sports" value="sports" />
  <Checkbox label="Music" value="music" />
  <Checkbox label="Technology" value="tech" />
</Fieldset>
\`\`\`

### With Description
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Contact preferences</Fieldset.Legend>
  <Fieldset.Description>Choose how you want to be contacted.</Fieldset.Description>
  <Checkbox label="Email" value="email" />
  <Checkbox label="SMS" value="sms" />
  <Checkbox label="Phone" value="phone" />
</Fieldset>
\`\`\`

### Radio Group
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select time slot</Fieldset.Legend>
  <Radio label="Morning (08:00 - 12:00)" name="time" value="morning" />
  <Radio label="Afternoon (12:00 - 16:00)" name="time" value="afternoon" />
  <Radio label="Evening (16:00 - 20:00)" name="time" value="evening" />
</Fieldset>
\`\`\`

### With Error
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Accept terms</Fieldset.Legend>
  <Checkbox label="I accept the terms and conditions" value="terms" aria-invalid="true" />
  <ValidationMessage>You must accept the terms to continue</ValidationMessage>
</Fieldset>
\`\`\`

### Size Variants
\`\`\`tsx
<Fieldset data-size="sm">
  <Fieldset.Legend>Small fieldset</Fieldset.Legend>
  <Checkbox label="Option 1" value="1" />
  <Checkbox label="Option 2" value="2" />
</Fieldset>
<Fieldset data-size="lg">
  <Fieldset.Legend>Large fieldset</Fieldset.Legend>
  <Checkbox label="Option 1" value="1" />
  <Checkbox label="Option 2" value="2" />
</Fieldset>
\`\`\`

### Address Form
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Address Information</Fieldset.Legend>
  <Field>
    <Label>Street address</Label>
    <Input />
  </Field>
  <Field>
    <Label>City</Label>
    <Input />
  </Field>
  <Field>
    <Label>Postal code</Label>
    <Input />
  </Field>
</Fieldset>
\`\`\`

## Anti-Patterns

### Anti-pattern: Unrelated Grouping
Grouping unrelated controls confuses users.

### Anti-pattern: Vague Legends
Using generic text like "Information" for legends.

### Anti-pattern: Deep Nesting
Nesting fieldsets creates confusing structure.

### Anti-pattern: Missing Legends
Fieldsets without legends provide no context.

## Accessibility

### Screen Readers
- Fieldset groups related controls
- Legend provides group context
- Description text announced
- Error states clearly communicated
- Proper form structure maintained

### Keyboard Navigation
- Tab navigates through grouped controls
- Logical tab order within groups
- Error messages accessible
- All controls reachable via keyboard

### WCAG 2.1 AA Compliance
- **Grouping**: Related controls properly grouped
- **Labels**: Descriptive legends provided
- **Instructions**: Additional instructions available
- **Error identification**: Group errors identified
- **Keyboard accessible**: All elements reachable

### ARIA Implementation
\`\`\`tsx
<fieldset aria-describedby="group-desc">
  <legend>Contact preferences</legend>
  <p id="group-desc">Choose how you want to be contacted.</p>
  <div role="group" aria-labelledby="contact-group">
    <input type="checkbox" id="email" name="contact" value="email" />
    <label for="email">Email</label>
  </div>
</fieldset>
\`\`\`

### Best Practice for Legends
Use clear, descriptive legends:
\`\`\`tsx
// Good
<Fieldset.Legend>Delivery address</Fieldset.Legend>
<Fieldset.Legend>Payment method</Fieldset.Legend>
<Fieldset.Legend>Notification preferences</Fieldset.Legend>

// Bad
<Fieldset.Legend>Info</Fieldset.Legend>
<Fieldset.Legend>Options</Fieldset.Legend>
<Fieldset.Legend>Settings</Fieldset.Legend>
\`\`\`

### Radio Button Group
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Preferred contact method</Fieldset.Legend>
  <Fieldset.Description>How should we reach you?</Fieldset.Description>
  <Radio
    label="Email"
    name="contact"
    value="email"
    aria-describedby="contact-desc"
  />
  <Radio
    label="Phone"
    name="contact"
    value="phone"
    aria-describedby="contact-desc"
  />
  <Radio
    label="SMS"
    name="contact"
    value="sms"
    aria-describedby="contact-desc"
  />
</Fieldset>
\`\`\`
        `}}},tags:["autodocs"]},l={render:function(){const o=r();return e.jsxs(t,{children:[e.jsx(t.Legend,{children:o("storybook.demo.selectYourInterests")}),e.jsx(s,{label:o("storybook.demo.sports"),value:"sports"}),e.jsx(s,{label:o("storybook.demo.music"),value:"music"}),e.jsx(s,{label:o("storybook.demo.technology"),value:"tech"})]})}},d={render:function(){const o=r();return e.jsxs(t,{children:[e.jsx(t.Legend,{children:o("storybook.demo.contactPreferences")}),e.jsx(t.Description,{children:o("storybook.demo.chooseHowToBeContacted")}),e.jsx(s,{label:o("storybook.demo.email"),value:"email"}),e.jsx(s,{label:o("storybook.demo.sms"),value:"sms"}),e.jsx(s,{label:o("storybook.demo.phone"),value:"phone"})]})}},n={render:function(){const o=r();return e.jsxs(t,{children:[e.jsx(t.Legend,{children:o("storybook.demo.selectTimeSlot")}),e.jsx(m,{label:o("storybook.demo.morning"),name:"time",value:"morning"}),e.jsx(m,{label:o("storybook.demo.afternoon"),name:"time",value:"afternoon"}),e.jsx(m,{label:o("storybook.demo.evening"),name:"time",value:"evening"})]})}},a={render:function(){const o=r();return e.jsxs(t,{children:[e.jsx(t.Legend,{children:o("storybook.demo.acceptTerms")}),e.jsx(s,{label:o("storybook.demo.iAcceptTheTerms"),value:"terms","aria-invalid":"true"}),e.jsx(D,{children:o("storybook.demo.mustAcceptTermsToContinue")})]})}},c={render:function(){const o=r();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t,{"data-size":"sm",children:[e.jsx(t.Legend,{children:o("storybook.demo.smallFieldset")}),e.jsx(s,{label:o("storybook.demo.option"),value:"1"}),e.jsx(s,{label:o("storybook.demo.option"),value:"2"})]}),e.jsxs(t,{"data-size":"md",children:[e.jsx(t.Legend,{children:o("storybook.demo.mediumFieldset")}),e.jsx(s,{label:o("storybook.demo.option"),value:"1"}),e.jsx(s,{label:o("storybook.demo.option"),value:"2"})]}),e.jsxs(t,{"data-size":"lg",children:[e.jsx(t.Legend,{children:o("storybook.demo.largeFieldset")}),e.jsx(s,{label:o("storybook.demo.option"),value:"1"}),e.jsx(s,{label:o("storybook.demo.option"),value:"2"})]})]})}};var u,p,b;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectYourInterests')}</Fieldset.Legend>
        <Checkbox label={t('storybook.demo.sports')} value="sports" />
        <Checkbox label={t('storybook.demo.music')} value="music" />
        <Checkbox label={t('storybook.demo.technology')} value="tech" />
      </Fieldset>;
  }
}`,...(b=(p=l.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var g,F,h;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.contactPreferences')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.chooseHowToBeContacted')}</Fieldset.Description>
        <Checkbox label={t('storybook.demo.email')} value="email" />
        <Checkbox label={t('storybook.demo.sms')} value="sms" />
        <Checkbox label={t('storybook.demo.phone')} value="phone" />
      </Fieldset>;
  }
}`,...(h=(F=d.parameters)==null?void 0:F.docs)==null?void 0:h.source}}};var x,k,v;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectTimeSlot')}</Fieldset.Legend>
        <Radio label={t('storybook.demo.morning')} name="time" value="morning" />
        <Radio label={t('storybook.demo.afternoon')} name="time" value="afternoon" />
        <Radio label={t('storybook.demo.evening')} name="time" value="evening" />
      </Fieldset>;
  }
}`,...(v=(k=n.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var y,f,L;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.acceptTerms')}</Fieldset.Legend>
        <Checkbox label={t('storybook.demo.iAcceptTheTerms')} value="terms" aria-invalid="true" />
        <ValidationMessage>{t('storybook.demo.mustAcceptTermsToContinue')}</ValidationMessage>
      </Fieldset>;
  }
}`,...(L=(f=a.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var C,j,R;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <Fieldset data-size="sm">
          <Fieldset.Legend>{t('storybook.demo.smallFieldset')}</Fieldset.Legend>
          <Checkbox label={t('storybook.demo.option')} value="1" />
          <Checkbox label={t('storybook.demo.option')} value="2" />
        </Fieldset>
        <Fieldset data-size="md">
          <Fieldset.Legend>{t('storybook.demo.mediumFieldset')}</Fieldset.Legend>
          <Checkbox label={t('storybook.demo.option')} value="1" />
          <Checkbox label={t('storybook.demo.option')} value="2" />
        </Fieldset>
        <Fieldset data-size="lg">
          <Fieldset.Legend>{t('storybook.demo.largeFieldset')}</Fieldset.Legend>
          <Checkbox label={t('storybook.demo.option')} value="1" />
          <Checkbox label={t('storybook.demo.option')} value="2" />
        </Fieldset>
      </div>;
  }
}`,...(R=(j=c.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};const ee=["Default","WithDescription","RadioGroup","WithError","Sizes"];export{l as Default,n as RadioGroup,c as Sizes,d as WithDescription,a as WithError,ee as __namedExportsOrder,$ as default};
//# sourceMappingURL=Fieldset.stories-C2Ex9Plg.js.map
