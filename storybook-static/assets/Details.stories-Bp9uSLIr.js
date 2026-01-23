import{j as e}from"./jsx-runtime-BYYWji4R.js";import{R as b}from"./index-ClcD9ViR.js";import{D as t}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as a}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const J={title:"Components/Details",parameters:{docs:{description:{component:`
Details (Accordion) provides collapsible content sections that users can expand or collapse to show or hide information.

## Variants

- **Default** - Standard collapsible section
- **Multiple** - Multiple accordion items
- **Controlled** - Programmatically controlled state
- **Nested** - Accordion within accordion
- **With icons** - Icons indicate expand/collapse state

## When to Use

- FAQ sections and help content
- Additional information that doesn't need to be visible by default
- Complex forms with optional sections
- Progressive disclosure of content
- Product specifications and details
- Terms and conditions sections

## Best Practices

### Do
- Use clear, descriptive summary text
- Keep content sections focused
- Allow only one section open at a time (when related)
- Provide smooth expand/collapse animations
- Use semantic heading structure
- Consider default state carefully

### Don't
- Don't nest accordions too deeply
- Don't use for critical information
- Don't make summaries too long
- Don't hide form validation errors
- Don't use for navigation
- Don't force all sections closed

## Usage Patterns

### Basic Details
\`\`\`tsx
<Details>
  <Details.Summary>Click to expand</Details.Summary>
  <Details.Content>
    <Paragraph>This content appears when expanded.</Paragraph>
  </Details.Content>
</Details>
\`\`\`

### Multiple Sections
\`\`\`tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
  <Details>
    <Details.Summary>Getting Started</Details.Summary>
    <Details.Content>
      <Paragraph>Learn how to set up your account.</Paragraph>
    </Details.Content>
  </Details>
  <Details>
    <Details.Summary>Managing ResourceRequests</Details.Summary>
    <Details.Content>
      <Paragraph>View, modify, and cancel resourceRequests.</Paragraph>
    </Details.Content>
  </Details>
</div>
\`\`\`

### Controlled State
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<Details open={isOpen} onToggle={setIsOpen}>
  <Details.Summary>Controlled accordion</Details.Summary>
  <Details.Content>
    <Paragraph>Content controlled by state.</Paragraph>
  </Details.Content>
</Details>
\`\`\`

### Open by Default
\`\`\`tsx
<Details defaultOpen>
  <Details.Summary>Already expanded</Details.Summary>
  <Details.Content>
    <Paragraph>This content is visible by default.</Paragraph>
  </Details.Content>
</Details>
\`\`\`

## Anti-Patterns

### Anti-pattern: Hiding Critical Information
Using accordions to hide important information users need to see.

### Anti-pattern: Too Much Nesting
Deep nesting creates confusing navigation patterns.

### Anti-pattern: Vague Summaries
Using generic text like "Click here" for summaries.

### Anti-pattern: All Sections Closed
Forcing users to open every section to find information.

## Accessibility

### Screen Readers
- Button role announced for summary
- Expanded/collapsed state communicated
- Content visibility changes announced
- Proper heading structure maintained
- State changes clearly indicated

### Keyboard Navigation
- Tab navigates to summary buttons
- Enter/Space toggles expand/collapse
- Focus stays on summary after toggle
- Logical tab order maintained
- All content accessible via keyboard

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All sections reachable via keyboard
- **State indication**: Expanded/collapsed state clearly shown
- **Focus management**: Focus stays on trigger
- **Semantic structure**: Proper heading hierarchy
- **Content discoverability**: All content can be accessed

### ARIA Implementation
\`\`\`tsx
<details>
  <summary 
    aria-expanded="false" 
    aria-controls="content-1"
    role="button"
    tabindex="0"
  >
    Section Title
  </summary>
  <div id="content-1" role="region" aria-labelledby="summary-1">
    <p>Content goes here.</p>
  </div>
</details>
\`\`\`

### Best Practice for Summaries
Use descriptive, action-oriented text:
\`\`\`tsx
<Details.Summary>View payment options</Details.Summary>
<Details.Summary>Learn about shipping</Details.Summary>
<Details.Summary>Read terms and conditions</Details.Summary>
\`\`\`

### Controlled Accordion Example
\`\`\`tsx
const AccordionGroup = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenSection(openSection === value ? null : value);
  };

  return (
    <div>
      <Details open={openSection === 'section1'} onToggle={() => handleToggle('section1')}>
        <Details.Summary>Section 1</Details.Summary>
        <Details.Content>Content 1</Details.Content>
      </Details>
      <Details open={openSection === 'section2'} onToggle={() => handleToggle('section2')}>
        <Details.Summary>Section 2</Details.Summary>
        <Details.Content>Content 2</Details.Content>
      </Details>
    </div>
  );
};
\`\`\`
        `}}},tags:["autodocs"]},n={render:()=>e.jsxs(t,{children:[e.jsx(t.Summary,{children:"Click to expand"}),e.jsx(t.Content,{children:e.jsx(a,{children:"This is the hidden content that appears when expanded."})})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[e.jsxs(t,{children:[e.jsx(t.Summary,{children:"Section 1: Getting Started"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Learn how to set up your account and make your first resourceRequest."})})]}),e.jsxs(t,{children:[e.jsx(t.Summary,{children:"Section 2: Managing ResourceRequests"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Learn how to view, modify, and cancel your resourceRequests."})})]}),e.jsxs(t,{children:[e.jsx(t.Summary,{children:"Section 3: Payment Options"}),e.jsx(t.Content,{children:e.jsx(a,{children:"We accept various payment methods including Vipps and credit cards."})})]})]})},i={render:function(){const[l,P]=b.useState(!0);return e.jsxs(t,{open:l,onToggle:()=>P(!l),children:[e.jsx(t.Summary,{children:"Already expanded"}),e.jsx(t.Content,{children:e.jsx(a,{children:"This content is visible by default because the details is open."})})]})}},r={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(t,{"data-size":"sm",children:[e.jsx(t.Summary,{children:"Small size"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Content for small details."})})]}),e.jsxs(t,{"data-size":"md",children:[e.jsx(t.Summary,{children:"Medium size (default)"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Content for medium details."})})]}),e.jsxs(t,{"data-size":"lg",children:[e.jsx(t.Summary,{children:"Large size"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Content for large details."})})]})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[e.jsxs(t,{children:[e.jsx(t.Summary,{children:"How do I cancel my resourceRequest?"}),e.jsx(t.Content,{children:e.jsx(a,{children:"You can cancel your resourceRequest up to 24 hours before the scheduled time. Go to My ResourceRequests, find the resourceRequest you want to cancel, and click the Cancel button."})})]}),e.jsxs(t,{children:[e.jsx(t.Summary,{children:"What is the refund policy?"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Cancellations made more than 48 hours in advance receive a full refund. Cancellations within 24-48 hours receive a 50% refund."})})]}),e.jsxs(t,{children:[e.jsx(t.Summary,{children:"Can I modify my resourceRequest?"}),e.jsx(t.Content,{children:e.jsx(a,{children:"Yes, you can modify your resourceRequest up to 24 hours before the scheduled time, subject to availability."})})]})]})};var c,d,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Details>
      <Details.Summary>Click to expand</Details.Summary>
      <Details.Content>
        <Paragraph>This is the hidden content that appears when expanded.</Paragraph>
      </Details.Content>
    </Details>
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,p,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)'
  }}>
      <Details>
        <Details.Summary>Section 1: Getting Started</Details.Summary>
        <Details.Content>
          <Paragraph>
            Learn how to set up your account and make your first resourceRequest.
          </Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>Section 2: Managing ResourceRequests</Details.Summary>
        <Details.Content>
          <Paragraph>Learn how to view, modify, and cancel your resourceRequests.</Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>Section 3: Payment Options</Details.Summary>
        <Details.Content>
          <Paragraph>We accept various payment methods including Vipps and credit cards.</Paragraph>
        </Details.Content>
      </Details>
    </div>
}`,...(h=(p=s.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var D,y,g;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const [open, setOpen] = React.useState(true);
    return <Details open={open} onToggle={() => setOpen(!open)}>
        <Details.Summary>Already expanded</Details.Summary>
        <Details.Content>
          <Paragraph>This content is visible by default because the details is open.</Paragraph>
        </Details.Content>
      </Details>;
  }
}`,...(g=(y=i.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var S,x,f;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Details data-size="sm">
        <Details.Summary>Small size</Details.Summary>
        <Details.Content>
          <Paragraph>Content for small details.</Paragraph>
        </Details.Content>
      </Details>
      <Details data-size="md">
        <Details.Summary>Medium size (default)</Details.Summary>
        <Details.Content>
          <Paragraph>Content for medium details.</Paragraph>
        </Details.Content>
      </Details>
      <Details data-size="lg">
        <Details.Summary>Large size</Details.Summary>
        <Details.Content>
          <Paragraph>Content for large details.</Paragraph>
        </Details.Content>
      </Details>
    </div>
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var C,v,j;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)'
  }}>
      <Details>
        <Details.Summary>How do I cancel my resourceRequest?</Details.Summary>
        <Details.Content>
          <Paragraph>
            You can cancel your resourceRequest up to 24 hours before the scheduled time. Go to My
            ResourceRequests, find the resourceRequest you want to cancel, and click the Cancel
            button.
          </Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>What is the refund policy?</Details.Summary>
        <Details.Content>
          <Paragraph>
            Cancellations made more than 48 hours in advance receive a full refund. Cancellations
            within 24-48 hours receive a 50% refund.
          </Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>Can I modify my resourceRequest?</Details.Summary>
        <Details.Content>
          <Paragraph>
            Yes, you can modify your resourceRequest up to 24 hours before the scheduled time,
            subject to availability.
          </Paragraph>
        </Details.Content>
      </Details>
    </div>
}`,...(j=(v=o.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};const X=["Default","Multiple","OpenByDefault","Sizes","FAQ"];export{n as Default,o as FAQ,s as Multiple,i as OpenByDefault,r as Sizes,X as __namedExportsOrder,J as default};
//# sourceMappingURL=Details.stories-Bp9uSLIr.js.map
