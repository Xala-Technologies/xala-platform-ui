import{j as r}from"./jsx-runtime-BYYWji4R.js";import{E as e}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const B={title:"Components/ErrorSummary",parameters:{docs:{description:{component:`
ErrorSummary displays a summary of form validation errors, helping users identify and fix multiple issues quickly.

## Variants

- **Default** - Standard error summary with heading and list
- **Single error** - Single error message
- **Multiple errors** - List of multiple validation errors
- **With field links** - Links directly to error fields
- **Inline** - Inline error display

## When to Use

- Form validation errors at the top of a form
- After form submission with errors
- To guide users to fix multiple errors
- Complex forms with validation requirements
- Multi-step forms with error collection
- Search results with no matches

## Best Practices

### Do
- Place at top of form after submission
- Use clear, actionable error messages
- Link directly to fields with errors
- Receive focus when displayed
- Use role="alert" for screen readers
- Group related errors together

### Don't
- Don't show before form submission
- Don't use technical jargon
- Don't hide error summary from users
- Don't use for single field errors (use inline)
- Don't overwhelm with too many errors
- Don't forget to update when errors are fixed

## Usage Patterns

### Basic Error Summary
\`\`\`tsx
<ErrorSummary>
  <ErrorSummary.Heading>Please fix the following errors:</ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#name">Name is required</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#email">Enter a valid email address</ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

### Single Error
\`\`\`tsx
<ErrorSummary>
  <ErrorSummary.Heading>Please fix the following error:</ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#date">Select a valid date</ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

### Multiple Errors
\`\`\`tsx
<ErrorSummary>
  <ErrorSummary.Heading>There are 4 errors in your form</ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#firstName">First name is required</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#lastName">Last name is required</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#phone">Phone number must be 8 digits</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#terms">You must accept the terms</ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

### With Error Count
\`\`\`tsx
const errors = [
  { id: '1', fieldId: 'firstName', message: 'First name is required' },
  { id: '2', fieldId: 'lastName', message: 'Last name is required' }
];
const errorCount = errors.length;

<ErrorSummary>
  <ErrorSummary.Heading>
    {errorCount === 1 
      ? 'There is 1 error in your form'
      : \`There are \${errorCount} errors in your form\`
    }
  </ErrorSummary.Heading>
  <ErrorSummary.List>
    {errors.map(error => (
      <ErrorSummary.Item key={error.id}>
        <ErrorSummary.Link href={\`#\${error.fieldId}\`}>
          {error.message}
        </ErrorSummary.Link>
      </ErrorSummary.Item>
    ))}
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

## Anti-Patterns

### Anti-pattern: Pre-submission Errors
Showing error summary before user submits the form.

### Anti-pattern: Vague Error Messages
Using generic text like "Invalid input" without context.

### Anti-pattern: No Field Links
Not providing links to the specific fields with errors.

### Anti-pattern: Persistent Errors
Not updating error summary when errors are fixed.

## Accessibility

### Screen Readers
- Role="alert" announces errors immediately
- Error count and messages announced
- Links provide navigation to error fields
- Focus management for error correction
- State changes communicated

### Keyboard Navigation
- Tab navigates through error links
- Enter activates error field links
- Focus moves to linked field
- Logical tab order maintained
- All errors accessible via keyboard

### WCAG 2.1 AA Compliance
- **Error identification**: Errors clearly identified
- **Error correction**: Suggestions for fixing errors
- **Error prevention**: Confirmation for important actions
- **Keyboard accessible**: All errors reachable via keyboard
- **Focus management**: Focus moves to error fields

### ARIA Implementation
\`\`\`tsx
<div role="alert" aria-labelledby="error-summary-heading">
  <h2 id="error-summary-heading">There are 2 errors</h2>
  <ul>
    <li>
      <a href="#field1" aria-describedby="field1-error">
        Name is required
      </a>
    </li>
    <li>
      <a href="#field2" aria-describedby="field2-error">
        Email is invalid
      </a>
    </li>
  </ul>
</div>
\`\`\`

### Best Practice for Error Messages
Use clear, actionable messages:
\`\`\`tsx
// Good
<ErrorSummary.Link href="#email">Enter a valid email address (e.g., name@example.com)</ErrorSummary.Link>

// Bad
<ErrorSummary.Link href="#email">Invalid input</ErrorSummary.Link>
\`\`\`

### Focus Management
\`\`\`tsx
const errorSummaryRef = useRef<HTMLDivElement>(null);

// After form validation with errors
if (hasErrors) {
  errorSummaryRef.current?.focus();
}
\`\`\`

### Link Implementation
Links should focus and scroll to error fields:
\`\`\`tsx
<ErrorSummary.Link 
  href="#email-field"
  onClick={(e) => {
    e.preventDefault();
    const field = document.getElementById('email-field');
    field?.focus();
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }}
>
  Email is required
</ErrorSummary.Link>
\`\`\`
        `}}},tags:["autodocs"]},m={render:()=>r.jsxs(e,{children:[r.jsx(e.Heading,{children:"Please fix the following errors:"}),r.jsxs(e.List,{children:[r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#name",children:"Name is required"})}),r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#email",children:"Enter a valid email address"})})]})]})},i={render:()=>r.jsxs(e,{children:[r.jsx(e.Heading,{children:"There are 4 errors in your form"}),r.jsxs(e.List,{children:[r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#firstName",children:"First name is required"})}),r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#lastName",children:"Last name is required"})}),r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#phone",children:"Phone number must be 8 digits"})}),r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#terms",children:"You must accept the terms"})})]})]})},a={render:()=>r.jsxs(e,{children:[r.jsx(e.Heading,{children:"Please fix the following error:"}),r.jsx(e.List,{children:r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#date",children:"Select a valid date"})})})]})},o={render:()=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[r.jsxs(e,{"data-size":"sm",children:[r.jsx(e.Heading,{children:"Small size"}),r.jsx(e.List,{children:r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#field1",children:"Error message"})})})]}),r.jsxs(e,{"data-size":"md",children:[r.jsx(e.Heading,{children:"Medium size (default)"}),r.jsx(e.List,{children:r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#field2",children:"Error message"})})})]}),r.jsxs(e,{"data-size":"lg",children:[r.jsx(e.Heading,{children:"Large size"}),r.jsx(e.List,{children:r.jsx(e.Item,{children:r.jsx(e.Link,{href:"#field3",children:"Error message"})})})]})]})};var s,t,n;m.parameters={...m.parameters,docs:{...(s=m.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <ErrorSummary>
      <ErrorSummary.Heading>Please fix the following errors:</ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#name">Name is required</ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#email">Enter a valid email address</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
}`,...(n=(t=m.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var u,d,l;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <ErrorSummary>
      <ErrorSummary.Heading>There are 4 errors in your form</ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#firstName">First name is required</ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#lastName">Last name is required</ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#phone">Phone number must be 8 digits</ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#terms">You must accept the terms</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
}`,...(l=(d=i.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var y,E,S;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <ErrorSummary>
      <ErrorSummary.Heading>Please fix the following error:</ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#date">Select a valid date</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
}`,...(S=(E=a.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var c,f,h;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <ErrorSummary data-size="sm">
        <ErrorSummary.Heading>Small size</ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#field1">Error message</ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
      <ErrorSummary data-size="md">
        <ErrorSummary.Heading>Medium size (default)</ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#field2">Error message</ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
      <ErrorSummary data-size="lg">
        <ErrorSummary.Heading>Large size</ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#field3">Error message</ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    </div>
}`,...(h=(f=o.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const W=["Default","MultipleErrors","SingleError","Sizes"];export{m as Default,i as MultipleErrors,a as SingleError,o as Sizes,W as __namedExportsOrder,B as default};
//# sourceMappingURL=ErrorSummary.stories-kJv4_L5w.js.map
