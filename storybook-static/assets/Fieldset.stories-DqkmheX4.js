import{j as e}from"./jsx-runtime-BYYWji4R.js";import{F as t,R as r}from"./radio-ER07BMpk.js";import"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import{C as s}from"./checkbox-CeN5g5X_.js";import{V as y}from"./index-Df4a1FH3.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const q={title:"Components/Fieldset",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},i={render:()=>e.jsxs(t,{children:[e.jsx(t.Legend,{children:"Select your interests"}),e.jsx(s,{label:"Sports",value:"sports"}),e.jsx(s,{label:"Music",value:"music"}),e.jsx(s,{label:"Technology",value:"tech"})]})},o={render:()=>e.jsxs(t,{children:[e.jsx(t.Legend,{children:"Contact preferences"}),e.jsx(t.Description,{children:"Choose how you want to be contacted."}),e.jsx(s,{label:"Email",value:"email"}),e.jsx(s,{label:"SMS",value:"sms"}),e.jsx(s,{label:"Phone",value:"phone"})]})},l={render:()=>e.jsxs(t,{children:[e.jsx(t.Legend,{children:"Select time slot"}),e.jsx(r,{label:"Morning (08:00 - 12:00)",name:"time",value:"morning"}),e.jsx(r,{label:"Afternoon (12:00 - 16:00)",name:"time",value:"afternoon"}),e.jsx(r,{label:"Evening (16:00 - 20:00)",name:"time",value:"evening"})]})},n={render:()=>e.jsxs(t,{children:[e.jsx(t.Legend,{children:"Accept terms"}),e.jsx(s,{label:"I accept the terms and conditions",value:"terms","aria-invalid":"true"}),e.jsx(y,{children:"You must accept the terms to continue"})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t,{"data-size":"sm",children:[e.jsx(t.Legend,{children:"Small fieldset"}),e.jsx(s,{label:"Option 1",value:"1"}),e.jsx(s,{label:"Option 2",value:"2"})]}),e.jsxs(t,{"data-size":"md",children:[e.jsx(t.Legend,{children:"Medium fieldset"}),e.jsx(s,{label:"Option 1",value:"1"}),e.jsx(s,{label:"Option 2",value:"2"})]}),e.jsxs(t,{"data-size":"lg",children:[e.jsx(t.Legend,{children:"Large fieldset"}),e.jsx(s,{label:"Option 1",value:"1"}),e.jsx(s,{label:"Option 2",value:"2"})]})]})};var d,c,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Select your interests</Fieldset.Legend>
      <Checkbox label="Sports" value="sports" />
      <Checkbox label="Music" value="music" />
      <Checkbox label="Technology" value="tech" />
    </Fieldset>
}`,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,m,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Contact preferences</Fieldset.Legend>
      <Fieldset.Description>Choose how you want to be contacted.</Fieldset.Description>
      <Checkbox label="Email" value="email" />
      <Checkbox label="SMS" value="sms" />
      <Checkbox label="Phone" value="phone" />
    </Fieldset>
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var b,h,F;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Select time slot</Fieldset.Legend>
      <Radio label="Morning (08:00 - 12:00)" name="time" value="morning" />
      <Radio label="Afternoon (12:00 - 16:00)" name="time" value="afternoon" />
      <Radio label="Evening (16:00 - 20:00)" name="time" value="evening" />
    </Fieldset>
}`,...(F=(h=l.parameters)==null?void 0:h.docs)==null?void 0:F.source}}};var x,v,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Accept terms</Fieldset.Legend>
      <Checkbox label="I accept the terms and conditions" value="terms" aria-invalid="true" />
      <ValidationMessage>You must accept the terms to continue</ValidationMessage>
    </Fieldset>
}`,...(f=(v=n.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var L,C,j;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <Fieldset data-size="sm">
        <Fieldset.Legend>Small fieldset</Fieldset.Legend>
        <Checkbox label="Option 1" value="1" />
        <Checkbox label="Option 2" value="2" />
      </Fieldset>
      <Fieldset data-size="md">
        <Fieldset.Legend>Medium fieldset</Fieldset.Legend>
        <Checkbox label="Option 1" value="1" />
        <Checkbox label="Option 2" value="2" />
      </Fieldset>
      <Fieldset data-size="lg">
        <Fieldset.Legend>Large fieldset</Fieldset.Legend>
        <Checkbox label="Option 1" value="1" />
        <Checkbox label="Option 2" value="2" />
      </Fieldset>
    </div>
}`,...(j=(C=a.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};const J=["Default","WithDescription","RadioGroup","WithError","Sizes"];export{i as Default,l as RadioGroup,a as Sizes,o as WithDescription,n as WithError,J as __namedExportsOrder,q as default};
//# sourceMappingURL=Fieldset.stories-DqkmheX4.js.map
