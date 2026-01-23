import{j as e}from"./jsx-runtime-BYYWji4R.js";import{c as t}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as o}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as i}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const T={title:"Components/Divider",component:t,parameters:{docs:{description:{component:`
Divider creates a visual separation between content sections. It helps organize information and establish visual hierarchy without affecting navigation or document structure.

## Variants

- **Horizontal** - Standard horizontal divider
- **Vertical** - Vertical divider for side-by-side content
- **With text** - Divider with centered text
- **Subtle** - Lighter divider for less separation

## Colors

Available colors: **default**, **subtle**.

## When to Use

- Separating distinct content sections
- Between list items or table rows
- Creating visual hierarchy
- Grouping related content
- Separating form sections
- Visual breaks in long content

## Best Practices

### Do
- Use sparingly for maximum clarity
- Add appropriate spacing around dividers
- Use subtle dividers for less important separations
- Maintain consistent divider usage
- Use to break up long content sections
- Consider vertical dividers for side-by-side layouts

### Don't
- Don't overuse in dense layouts
- Don't use dividers instead of proper headings
- Don't place dividers too close to content
- Don't use for decorative purposes only
- Don't rely on dividers for structure
- Don't use without clear purpose

## Usage Patterns

### Basic Divider
\`\`\`tsx
<Divider />
\`\`\`

### With Spacing
\`\`\`tsx
<Divider style={{ margin: 'var(--ds-spacing-6) 0' }} />
\`\`\`

### Color Variants
\`\`\`tsx
<Divider data-color="default" />
<Divider data-color="subtle" />
\`\`\`

### Vertical Divider
\`\`\`tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-4)' }}>
  <span>Left content</span>
  <Divider data-variant="vertical" />
  <span>Right content</span>
</div>
\`\`\`

### Divider with Text
\`\`\`tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-4)' }}>
  <Divider style={{ flex: 1 }} />
  <span>OR</span>
  <Divider style={{ flex: 1 }} />
</div>
\`\`\`

## Anti-Patterns

### Anti-pattern: Divider Overuse
Using too many dividers creates visual noise and clutter.

### Anti-pattern: Divider as Heading
Using dividers instead of proper headings creates structure issues.

### Anti-pattern: No Spacing
Placing dividers too close to content creates visual tension.

### Anti-pattern: Decorative Only
Using dividers purely for decoration without content separation.

## Accessibility

### Screen Readers
- Role="separator" indicates visual separation
- Does not affect document structure
- Announced as "separator" by screen readers
- Does not interrupt content flow
- Invisible to assistive technology when decorative

### Visual Accessibility
- Sufficient contrast for visibility
- Does not rely on color alone
- Clear visual separation
- Consistent appearance

### WCAG 2.1 AA Compliance
- **Decorative element**: Properly marked as presentational
- **Color contrast**: Visible to users with low vision
- **Structure**: Does not affect document outline
- **Navigation**: Does not interfere with keyboard navigation

### Semantic Divider
Use role="separator" for semantic meaning:
\`\`\`tsx
<hr role="separator" aria-orientation="horizontal" />
\`\`\`

### Decorative Divider
For purely decorative dividers:
\`\`\`tsx
<div role="presentation" aria-hidden="true">
  <Divider />
</div>
\`\`\`

### Vertical Divider
Specify orientation for vertical dividers:
\`\`\`tsx
<div role="separator" aria-orientation="vertical" />
\`\`\`

### Best Practice
Use dividers to enhance, not replace, proper content structure:
\`\`\`tsx
<section>
  <h2>Section Title</h2>
  <p>Section content...</p>
</section>
<Divider />
<section>
  <h2>Next Section</h2>
  <p>Next section content...</p>
</section>
\`\`\`
        `}}},tags:["autodocs"]},r={render:()=>e.jsxs("div",{children:[e.jsx(i,{children:"Content above the divider"}),e.jsx(t,{}),e.jsx(i,{children:"Content below the divider"})]})},a={render:()=>e.jsxs("div",{children:[e.jsx(o,{level:3,"data-size":"sm",children:"Section 1"}),e.jsx(i,{children:"First section content."}),e.jsx(t,{style:{margin:"var(--ds-spacing-6) 0"}}),e.jsx(o,{level:3,"data-size":"sm",children:"Section 2"}),e.jsx(i,{children:"Second section content."})]})},s={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{children:[e.jsx(i,{children:"Default divider"}),e.jsx(t,{})]}),e.jsxs("div",{children:[e.jsx(i,{children:"Subtle divider"}),e.jsx(t,{"data-color":"subtle"})]})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Basic Usage"}),e.jsx(i,{children:"Content above"}),e.jsx(t,{}),e.jsx(i,{children:"Content below"})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"With Spacing"}),e.jsx(o,{level:4,"data-size":"sm",children:"Section 1"}),e.jsx(i,{children:"First section"}),e.jsx(t,{style:{margin:"var(--ds-spacing-6) 0"}}),e.jsx(o,{level:4,"data-size":"sm",children:"Section 2"}),e.jsx(i,{children:"Second section"})]})]})};var d,c,l;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div>
      <Paragraph>Content above the divider</Paragraph>
      <Divider />
      <Paragraph>Content below the divider</Paragraph>
    </div>
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,v,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div>
      <Heading level={3} data-size="sm">
        Section 1
      </Heading>
      <Paragraph>First section content.</Paragraph>
      <Divider style={{
      margin: 'var(--ds-spacing-6) 0'
    }} />
      <Heading level={3} data-size="sm">
        Section 2
      </Heading>
      <Paragraph>Second section content.</Paragraph>
    </div>
}`,...(g=(v=a.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var m,h,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <div>
        <Paragraph>Default divider</Paragraph>
        <Divider />
      </div>
      <div>
        <Paragraph>Subtle divider</Paragraph>
        <Divider data-color="subtle" />
      </div>
    </div>
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var x,f,D;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
          Basic Usage
        </h3>
        <Paragraph>Content above</Paragraph>
        <Divider />
        <Paragraph>Content below</Paragraph>
      </div>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          With Spacing
        </h3>
        <Heading level={4} data-size="sm">
          Section 1
        </Heading>
        <Paragraph>First section</Paragraph>
        <Divider style={{
        margin: 'var(--ds-spacing-6) 0'
      }} />
        <Heading level={4} data-size="sm">
          Section 2
        </Heading>
        <Paragraph>Second section</Paragraph>
      </div>
    </div>
}`,...(D=(f=n.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};const _=["Default","WithSpacing","Colors","AllVariants"];export{n as AllVariants,s as Colors,r as Default,a as WithSpacing,_ as __namedExportsOrder,T as default};
//# sourceMappingURL=Divider.stories-4IDv57UH.js.map
