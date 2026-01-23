import{j as e}from"./jsx-runtime-BYYWji4R.js";import{F as a,V}from"./index-Df4a1FH3.js";import"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import{L as i}from"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import{S as t}from"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import{T as P}from"./textarea-DMvw4dlU.js";import{T as r}from"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const te={title:"Components/Field",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},s={render:()=>e.jsxs(a,{children:[e.jsx(i,{children:"Full name"}),e.jsx(r,{"aria-label":"Full name"})]})},l={render:()=>e.jsxs(a,{children:[e.jsx(i,{children:"Email address"}),e.jsx(a.Description,{children:"We will never share your email with anyone."}),e.jsx(r,{type:"email","aria-label":"Email address"})]})},n={render:()=>e.jsxs(a,{children:[e.jsx(i,{children:"Phone number"}),e.jsx(r,{"aria-invalid":"true","aria-label":"Phone number"}),e.jsx(V,{children:"Phone number must be 8 digits"})]})},o={render:()=>e.jsxs(a,{children:[e.jsx(i,{children:"Description"}),e.jsx(a.Description,{children:"Max 500 characters"}),e.jsx(P,{rows:4}),e.jsx(a.Counter,{limit:500})]})},d={render:()=>e.jsxs(a,{children:[e.jsx(i,{children:"Country"}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:"Choose a country..."}),e.jsx(t.Option,{value:"no",children:"Norway"}),e.jsx(t.Option,{value:"se",children:"Sweden"}),e.jsx(t.Option,{value:"dk",children:"Denmark"})]})]})},c={render:()=>e.jsxs(a,{children:[e.jsxs(i,{children:["Name ",e.jsx("span",{"aria-hidden":"true",children:"*"})]}),e.jsx(r,{required:!0,"aria-label":"Name"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs(a,{"data-size":"sm",children:[e.jsx(i,{children:"Small field"}),e.jsx(r,{"aria-label":"Small field input"})]}),e.jsxs(a,{"data-size":"md",children:[e.jsx(i,{children:"Medium field"}),e.jsx(r,{"aria-label":"Medium field input"})]}),e.jsxs(a,{"data-size":"lg",children:[e.jsx(i,{children:"Large field"}),e.jsx(r,{"aria-label":"Large field input"})]})]})};var u,m,b;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Full name</Label>
      <Input aria-label="Full name" />
    </Field>
}`,...(b=(m=s.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var h,x,F;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Email address</Label>
      <Field.Description>We will never share your email with anyone.</Field.Description>
      <Input type="email" aria-label="Email address" />
    </Field>
}`,...(F=(x=l.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var g,L,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Phone number</Label>
      <Input aria-invalid="true" aria-label="Phone number" />
      <ValidationMessage>Phone number must be 8 digits</ValidationMessage>
    </Field>
}`,...(f=(L=n.parameters)==null?void 0:L.docs)==null?void 0:f.source}}};var v,S,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Description</Label>
      <Field.Description>Max 500 characters</Field.Description>
      <Textarea rows={4} />
      <Field.Counter limit={500} />
    </Field>
}`,...(y=(S=o.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var j,D,w;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Country</Label>
      <Select>
        <Select.Option value="">Choose a country...</Select.Option>
        <Select.Option value="no">Norway</Select.Option>
        <Select.Option value="se">Sweden</Select.Option>
        <Select.Option value="dk">Denmark</Select.Option>
      </Select>
    </Field>
}`,...(w=(D=d.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var I,E,M;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>
        Name <span aria-hidden="true">*</span>
      </Label>
      <Input required aria-label="Name" />
    </Field>
}`,...(M=(E=c.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var O,W,C;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <Field data-size="sm">
        <Label>Small field</Label>
        <Input aria-label="Small field input" />
      </Field>
      <Field data-size="md">
        <Label>Medium field</Label>
        <Input aria-label="Medium field input" />
      </Field>
      <Field data-size="lg">
        <Label>Large field</Label>
        <Input aria-label="Large field input" />
      </Field>
    </div>
}`,...(C=(W=p.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};const se=["Default","WithDescription","WithError","WithTextarea","WithSelect","Required","Sizes"];export{s as Default,c as Required,p as Sizes,l as WithDescription,n as WithError,d as WithSelect,o as WithTextarea,se as __namedExportsOrder,te as default};
//# sourceMappingURL=Field.stories-LI8M3I_w.js.map
