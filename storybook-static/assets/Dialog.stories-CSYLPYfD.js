import{j as e}from"./jsx-runtime-BYYWji4R.js";import{within as m,userEvent as f,waitFor as y,expect as c}from"./index-CLEdRh-S.js";import{r as d}from"./index-ClcD9ViR.js";import{b as g}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import{B as a}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as u}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as p}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const $={title:"Components/Dialog",parameters:{docs:{description:{component:`
Dialog (Modal) displays important interactions that require user attention. It appears as an overlay that blocks interaction with the rest of the page.

## Variants

- **Default** - Standard modal dialog
- **Confirmation** - Yes/No confirmation dialog
- **Alert** - Alert with single action
- **Form dialog** - Dialog containing form
- **Fullscreen** - Full screen on mobile
- **Scrollable** - Content can scroll

## When to Use

- Confirmations and critical decisions
- Important forms requiring focus
- Alerts requiring user action
- Focused workflows or wizards
- Error messages requiring acknowledgment
- Complex information display

## Best Practices

### Do
- Use clear, descriptive titles
- Provide primary and secondary actions
- Trap focus within dialog
- Return focus to trigger on close
- Allow Escape key to close
- Make background content inert

### Don't
- Don't use for non-critical information
- Don't nest dialogs within dialogs
- Don't disable close without reason
- Don't use for navigation
- Don't show too many dialogs in sequence
- Don't make content scrollable horizontally

## Usage Patterns

### Basic Dialog
\`\`\`tsx
<Dialog ref={dialogRef}>
  <Heading level={2} data-size="sm">Dialog Title</Heading>
  <Paragraph>Dialog content goes here.</Paragraph>
  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-4)' }}>
    <Button variant="secondary" onClick={() => dialogRef.current?.close()}>
      Cancel
    </Button>
    <Button variant="primary" onClick={() => dialogRef.current?.close()}>
      Confirm
    </Button>
  </div>
</Dialog>
\`\`\`

### Confirmation Dialog
\`\`\`tsx
<Dialog ref={dialogRef}>
  <Heading level={2} data-size="sm">Delete Item</Heading>
  <Paragraph>Are you sure you want to delete this item? This action cannot be undone.</Paragraph>
  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-4)' }}>
    <Button variant="secondary" onClick={() => dialogRef.current?.close()}>
      Cancel
    </Button>
    <Button variant="danger" onClick={() => dialogRef.current?.close()}>
      Delete
    </Button>
  </div>
</Dialog>
\`\`\`

### Form Dialog
\`\`\`tsx
<Dialog ref={dialogRef}>
  <Heading level={2} data-size="sm">Edit Profile</Heading>
  <form onSubmit={handleSubmit}>
    <Field>
      <Label htmlFor="name">Name</Label>
      <Input id="name" name="name" />
    </Field>
    <Field>
      <Label htmlFor="email">Email</Label>
      <Input id="email" name="email" type="email" />
    </Field>
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-4)' }}>
      <Button variant="secondary" type="button" onClick={() => dialogRef.current?.close()}>
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </div>
  </form>
</Dialog>
\`\`\`

## Anti-Patterns

### Anti-pattern: Dialog Overuse
Using dialogs for simple notifications or non-critical information.

### Anti-pattern: Nested Dialogs
Opening dialogs from within other dialogs creates confusion.

### Anti-pattern: No Escape Route
Disabling all ways to close the dialog traps users.

### Anti-pattern: Overwhelming Content
Putting too much content in dialogs makes them hard to use.

## Accessibility

### Screen Readers
- Dialog role announced when opened
- Title and description provided
- Focus trapped within dialog
- Background content marked as inert
- Close actions announced

### Keyboard Navigation
- Focus trapped inside dialog
- Tab cycles through focusable elements
- Escape key closes dialog
- Focus returns to trigger on close
- Logical tab order maintained

### WCAG 2.1 AA Compliance
- **Keyboard trap**: Focus stays within dialog
- **Focus management**: Proper focus handling
- **Return focus**: Focus returns to trigger
- **Escape key**: Dialog closes on Escape
- **Background inert**: Page content inaccessible

### ARIA Implementation
\`\`\`tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog description</p>
  <button aria-label="Close dialog">×</button>
</div>
\`\`\`

### Focus Management
\`\`\`tsx
const dialogRef = useRef<HTMLDialogElement>(null);
const triggerRef = useRef<HTMLButtonElement>(null);

const openDialog = () => {
  dialogRef.current?.showModal();
  // Focus automatically moves to first focusable element
};

const closeDialog = () => {
  dialogRef.current?.close();
  triggerRef.current?.focus(); // Return focus
};
\`\`\`

### Best Practice for Titles
Always provide descriptive titles:
\`\`\`tsx
<Dialog ref={dialogRef}>
  <Heading level={2} data-size="sm">Delete Confirmation</Heading>
  <Paragraph>Are you sure you want to delete this item?</Paragraph>
</Dialog>
\`\`\`
        `}}},tags:["autodocs"]},n={render:function(){const t=d.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(a,{onClick:()=>{var o;return(o=t.current)==null?void 0:o.showModal()},type:"button",children:"Open Dialog"}),e.jsxs(g,{ref:t,children:[e.jsx(u,{level:2,"data-size":"sm",children:"Dialog Title"}),e.jsx(p,{children:"This is the dialog content. You can put any content here."}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginTop:"var(--ds-spacing-4)"},children:[e.jsx(a,{variant:"secondary",onClick:()=>{var o;return(o=t.current)==null?void 0:o.close()},type:"button",children:"Cancel"}),e.jsx(a,{variant:"primary",onClick:()=>{var o;return(o=t.current)==null?void 0:o.close()},type:"button",children:"Confirm"})]})]})]})},play:async({canvasElement:i})=>{const o=m(i).getByRole("button",{name:"Open Dialog"});await f.click(o);const r=m(document.body);await y(()=>{c(r.getByRole("dialog")).toBeVisible()}),c(r.getByRole("heading",{name:"Dialog Title"})).toBeInTheDocument();const j=r.getByRole("button",{name:"Cancel"});await f.click(j),await y(()=>{c(r.queryByRole("dialog")).not.toBeVisible()})}},l={render:function(){const t=d.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(a,{"data-color":"danger",onClick:()=>{var o;return(o=t.current)==null?void 0:o.showModal()},type:"button",children:"Delete Item"}),e.jsxs(g,{ref:t,children:[e.jsx(u,{level:2,"data-size":"sm",children:"Delete Confirmation"}),e.jsx(p,{children:"Are you sure you want to delete this item? This action cannot be undone."}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginTop:"var(--ds-spacing-4)"},children:[e.jsx(a,{variant:"secondary",onClick:()=>{var o;return(o=t.current)==null?void 0:o.close()},type:"button",children:"Cancel"}),e.jsx(a,{"data-color":"danger",onClick:()=>{var o;return(o=t.current)==null?void 0:o.close()},type:"button",children:"Delete"})]})]})]})}},s={render:function(){const t=d.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(a,{variant:"secondary",onClick:()=>{var o;return(o=t.current)==null?void 0:o.showModal()},type:"button",children:"Show Info"}),e.jsxs(g,{ref:t,children:[e.jsx(u,{level:2,"data-size":"sm",children:"Information"}),e.jsx(p,{children:"Your resourceRequest has been successfully created. You will receive a confirmation email shortly."}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"var(--ds-spacing-4)"},children:e.jsx(a,{variant:"primary",onClick:()=>{var o;return(o=t.current)==null?void 0:o.close()},type:"button",children:"OK"})})]})]})}};var h,v,b,D,R;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return <>
        <Button onClick={() => dialogRef.current?.showModal()} type="button">
          Open Dialog
        </Button>
        <Dialog ref={dialogRef}>
          <Heading level={2} data-size="sm">
            Dialog Title
          </Heading>
          <Paragraph>This is the dialog content. You can put any content here.</Paragraph>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          marginTop: 'var(--ds-spacing-4)'
        }}>
            <Button variant="secondary" onClick={() => dialogRef.current?.close()} type="button">
              Cancel
            </Button>
            <Button variant="primary" onClick={() => dialogRef.current?.close()} type="button">
              Confirm
            </Button>
          </div>
        </Dialog>
      </>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Click button to open dialog
    const openButton = canvas.getByRole('button', {
      name: 'Open Dialog'
    });
    await userEvent.click(openButton);

    // Wait for dialog to be visible (use document.body since dialog is portal)
    const body = within(document.body);
    await waitFor(() => {
      expect(body.getByRole('dialog')).toBeVisible();
    });

    // Verify dialog content
    expect(body.getByRole('heading', {
      name: 'Dialog Title'
    })).toBeInTheDocument();

    // Close dialog with Cancel
    const cancelButton = body.getByRole('button', {
      name: 'Cancel'
    });
    await userEvent.click(cancelButton);

    // Dialog should be closed
    await waitFor(() => {
      expect(body.queryByRole('dialog')).not.toBeVisible();
    });
  }
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source},description:{story:`Default dialog with open/close interaction test.

This story tests:
- Dialog opens when trigger button is clicked
- Dialog contains expected content
- Dialog closes when Cancel or Confirm is clicked`,...(R=(D=n.parameters)==null?void 0:D.docs)==null?void 0:R.description}}};var B,C,w;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function Render() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return <>
        <Button data-color="danger" onClick={() => dialogRef.current?.showModal()} type="button">
          Delete Item
        </Button>
        <Dialog ref={dialogRef}>
          <Heading level={2} data-size="sm">
            Delete Confirmation
          </Heading>
          <Paragraph>
            Are you sure you want to delete this item? This action cannot be undone.
          </Paragraph>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          marginTop: 'var(--ds-spacing-4)'
        }}>
            <Button variant="secondary" onClick={() => dialogRef.current?.close()} type="button">
              Cancel
            </Button>
            <Button data-color="danger" onClick={() => dialogRef.current?.close()} type="button">
              Delete
            </Button>
          </div>
        </Dialog>
      </>;
  }
}`,...(w=(C=l.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var x,k,T;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: function Render() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    return <>
        <Button variant="secondary" onClick={() => dialogRef.current?.showModal()} type="button">
          Show Info
        </Button>
        <Dialog ref={dialogRef}>
          <Heading level={2} data-size="sm">
            Information
          </Heading>
          <Paragraph>
            Your resourceRequest has been successfully created. You will receive a confirmation
            email shortly.
          </Paragraph>
          <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 'var(--ds-spacing-4)'
        }}>
            <Button variant="primary" onClick={() => dialogRef.current?.close()} type="button">
              OK
            </Button>
          </div>
        </Dialog>
      </>;
  }
}`,...(T=(k=s.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const ee=["Default","Confirmation","Information"];export{l as Confirmation,n as Default,s as Information,ee as __namedExportsOrder,$ as default};
//# sourceMappingURL=Dialog.stories-CSYLPYfD.js.map
