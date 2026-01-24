import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as c}from"./index-bjNF47ar.js";import{c as o}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as d}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as r}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const K={title:"Components/Divider",component:o,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},i={render:function(){const t=c();return e.jsxs("div",{children:[e.jsx(r,{children:t("storybook.demo.contentAboveDivider")}),e.jsx(o,{}),e.jsx(r,{children:t("storybook.demo.contentBelowDivider")})]})}},s={render:function(){const t=c();return e.jsxs("div",{children:[e.jsxs(d,{level:3,"data-size":"sm",children:[t("storybook.demo.section")," 1"]}),e.jsx(r,{children:t("storybook.demo.firstSectionContent")}),e.jsx(o,{style:{margin:"var(--ds-spacing-6) 0"}}),e.jsxs(d,{level:3,"data-size":"sm",children:[t("storybook.demo.section")," 2"]}),e.jsx(r,{children:t("storybook.demo.secondSectionContent")})]})}},a={render:function(){const t=c();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{children:[e.jsx(r,{children:t("storybook.demo.defaultDivider")}),e.jsx(o,{})]}),e.jsxs("div",{children:[e.jsx(r,{children:t("storybook.demo.subtleDivider")}),e.jsx(o,{"data-color":"subtle"})]})]})}},n={render:function(){const t=c();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:t("storybook.story.basicUsage")}),e.jsx(r,{children:t("storybook.demo.contentAbove")}),e.jsx(o,{}),e.jsx(r,{children:t("storybook.demo.contentBelow")})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:t("storybook.story.withSpacing")}),e.jsxs(d,{level:4,"data-size":"sm",children:[t("storybook.demo.section")," 1"]}),e.jsx(r,{children:t("storybook.demo.firstSection")}),e.jsx(o,{style:{margin:"var(--ds-spacing-6) 0"}}),e.jsxs(d,{level:4,"data-size":"sm",children:[t("storybook.demo.section")," 2"]}),e.jsx(r,{children:t("storybook.demo.secondSection")})]})]})}};var p,v,m;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div>
        <Paragraph>{t('storybook.demo.contentAboveDivider')}</Paragraph>
        <Divider />
        <Paragraph>{t('storybook.demo.contentBelowDivider')}</Paragraph>
      </div>;
  }
}`,...(m=(v=i.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};var u,g,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.section')} 1
        </Heading>
        <Paragraph>{t('storybook.demo.firstSectionContent')}</Paragraph>
        <Divider style={{
        margin: 'var(--ds-spacing-6) 0'
      }} />
        <Heading level={3} data-size="sm">
          {t('storybook.demo.section')} 2
        </Heading>
        <Paragraph>{t('storybook.demo.secondSectionContent')}</Paragraph>
      </div>;
  }
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,f,b;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <div>
          <Paragraph>{t('storybook.demo.defaultDivider')}</Paragraph>
          <Divider />
        </div>
        <div>
          <Paragraph>{t('storybook.demo.subtleDivider')}</Paragraph>
          <Divider data-color="subtle" />
        </div>
      </div>;
  }
}`,...(b=(f=a.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var x,D,k;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
            {t('storybook.story.basicUsage')}
          </h3>
          <Paragraph>{t('storybook.demo.contentAbove')}</Paragraph>
          <Divider />
          <Paragraph>{t('storybook.demo.contentBelow')}</Paragraph>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.withSpacing')}
          </h3>
          <Heading level={4} data-size="sm">
            {t('storybook.demo.section')} 1
          </Heading>
          <Paragraph>{t('storybook.demo.firstSection')}</Paragraph>
          <Divider style={{
          margin: 'var(--ds-spacing-6) 0'
        }} />
          <Heading level={4} data-size="sm">
            {t('storybook.demo.section')} 2
          </Heading>
          <Paragraph>{t('storybook.demo.secondSection')}</Paragraph>
        </div>
      </div>;
  }
}`,...(k=(D=n.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};const Q=["Default","WithSpacing","Colors","AllVariants"];export{n as AllVariants,a as Colors,i as Default,s as WithSpacing,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=Divider.stories-C8tD9nil.js.map
