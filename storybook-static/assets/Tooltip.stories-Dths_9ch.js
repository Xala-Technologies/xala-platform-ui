import{j as t}from"./jsx-runtime-BYYWji4R.js";import{u as a}from"./index-bjNF47ar.js";import{g as e}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import{B as n}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const Y={title:"Components/Tooltip",parameters:{docs:{description:{component:`
Tooltip displays additional information when users hover over or focus on an element. It provides context without cluttering the interface.

## Variants

- **Default** - Standard tooltip
- **Placement variants** - top, bottom, left, right
- **Trigger variants** - hover, focus, click
- **Rich content** - HTML content support
- **Persistent** - Stays open until dismissed
- **Delayed** - Shows/hides with delay

## When to Use

- Additional context for icons or abbreviations
- Help text for form fields
- Action explanations for buttons
- Field format instructions
- Status indicators
- Feature descriptions

## Best Practices

### Do
- Keep tooltips brief and concise
- Use for non-critical information
- Provide keyboard access via focus
- Allow dismissal with Escape key
- Position tooltips appropriately
- Use clear, helpful text

### Don't
- Don't hide critical information in tooltips
- Don't use for long explanations
- Don't trigger on hover only
- Don't cover important content
- Don't use for navigation
- Don't make tooltips too small

## Usage Patterns

### Basic Tooltip
\`\`\`tsx
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>
\`\`\`

### Placement Variants
\`\`\`tsx
<Tooltip content="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Left tooltip" placement="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Right tooltip" placement="right">
  <Button>Right</Button>
</Tooltip>
\`\`\`

### On Icon
\`\`\`tsx
<Tooltip content="More information about this feature">
  <Button
    variant="tertiary"
    data-size="sm"
    aria-label="Information"
  >
    Info
  </Button>
</Tooltip>
\`\`\`

### Form Field Help
\`\`\`tsx
<Field>
  <Label>Phone number</Label>
  <Input aria-describedby="phone-help" />
  <Tooltip content="Format: +47 XXXXXXXX" placement="right">
    <Button variant="tertiary" data-size="sm" aria-label="Format help">
      ?
    </Button>
  </Tooltip>
</Field>
\`\`\`

### Rich Content
\`\`\`tsx
<Tooltip content={
  <div>
    <strong>Keyboard shortcut:</strong><br />
    Press Ctrl+S to save
  </div>
}>
  <Button>Save</Button>
</Tooltip>
\`\`\`

### With Delay
\`\`\`tsx
<Tooltip
  content="Delayed tooltip"
  delayShow={500}
  delayHide={200}
>
  <Button>Hover with delay</Button>
</Tooltip>
\`\`\`

## Anti-Patterns

### Anti-pattern: Critical Information
Hiding important information that users need to see.

### Anti-pattern: Long Tooltips
Using tooltips for lengthy explanations.

### Anti-pattern: Poor Positioning
Tooltips that cover important content.

### Anti-pattern: Hover Only
Not providing keyboard access to tooltips.

## Accessibility

### Screen Readers
- Content announced on focus
- Tooltip role identified
- Dismissal instructions provided
- Context clearly communicated
- State changes announced

### Keyboard Navigation
- Focus triggers tooltip display
- Escape key dismisses tooltip
- Tab moves through tooltip triggers
- Logical tab order maintained
- All tooltips accessible via keyboard

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All tooltips reachable via keyboard
- **Focus management**: Proper focus handling
- **Content announcement**: Tooltip content announced
- **Dismissal control**: Users can dismiss tooltips
- **Context preservation**: Page context remains

### ARIA Implementation
\`\`\`tsx
<button
  aria-describedby="tooltip-1"
  type="button"
>
  Info
</button>
<div id="tooltip-1" role="tooltip" hidden>
  Additional information here
</div>
\`\`\`

### Best Practice for Content
Use clear, concise text:
\`\`\`tsx
// Good
<Tooltip content="Press Ctrl+S to save">
  <Button>Save</Button>
</Tooltip>
<Tooltip content="Format: DD/MM/YYYY">
  <Input />
</Tooltip>

// Bad
<Tooltip content="This is a save button that you can click to save your work to the server. It uses keyboard shortcut Ctrl+S.">
  <Button>Save</Button>
</Tooltip>
\`\`\`

### Form Field Integration
\`\`\`tsx
const FormField = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Field>
      <Label>
        Password
        <Tooltip content="Must be at least 8 characters with numbers and symbols">
          <Button
            variant="tertiary"
            data-size="sm"
            aria-label="Password requirements"
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            ?
          </Button>
        </Tooltip>
      </Label>
      <Input type="password" />
    </Field>
  );
};
\`\`\`

### Dismissible Tooltip
\`\`\`tsx
<Tooltip
  content="Press Escape to close this tooltip"
  dismissible
  trigger="click"
>
  <Button>Click for help</Button>
</Tooltip>
\`\`\`
        `}}},tags:["autodocs"]},i={render:function(){const o=a();return t.jsx(e,{content:o("storybook.demo.thisIsATooltip"),children:t.jsx(n,{type:"button",children:o("storybook.demo.hoverMe")})})}},r={render:function(){const o=a();return t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"var(--ds-spacing-6)",padding:"var(--ds-spacing-10)",placeItems:"center"},children:[t.jsx("div",{}),t.jsx(e,{content:o("storybook.demo.topTooltip"),placement:"top",children:t.jsx(n,{variant:"secondary",type:"button",children:o("storybook.demo.top")})}),t.jsx("div",{}),t.jsx(e,{content:o("storybook.demo.leftTooltip"),placement:"left",children:t.jsx(n,{variant:"secondary",type:"button",children:o("storybook.demo.left")})}),t.jsx("div",{}),t.jsx(e,{content:o("storybook.demo.rightTooltip"),placement:"right",children:t.jsx(n,{variant:"secondary",type:"button",children:o("storybook.demo.right")})}),t.jsx("div",{}),t.jsx(e,{content:o("storybook.demo.bottomTooltip"),placement:"bottom",children:t.jsx(n,{variant:"secondary",type:"button",children:o("storybook.demo.bottom")})}),t.jsx("div",{})]})}},s={render:function(){const o=a();return t.jsx(e,{content:o("storybook.demo.moreInformationAboutFeature"),children:t.jsx(n,{variant:"tertiary","data-size":"sm","aria-label":o("storybook.demo.information"),type:"button",children:o("storybook.demo.info")})})}};var p,c,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Tooltip content={t('storybook.demo.thisIsATooltip')}>
        <Button type="button">{t('storybook.demo.hoverMe')}</Button>
      </Tooltip>;
  }
}`,...(d=(c=i.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,u,b;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--ds-spacing-6)',
      padding: 'var(--ds-spacing-10)',
      placeItems: 'center'
    }}>
        <div />
        <Tooltip content={t('storybook.demo.topTooltip')} placement="top">
          <Button variant="secondary" type="button">
            {t('storybook.demo.top')}
          </Button>
        </Tooltip>
        <div />

        <Tooltip content={t('storybook.demo.leftTooltip')} placement="left">
          <Button variant="secondary" type="button">
            {t('storybook.demo.left')}
          </Button>
        </Tooltip>
        <div />
        <Tooltip content={t('storybook.demo.rightTooltip')} placement="right">
          <Button variant="secondary" type="button">
            {t('storybook.demo.right')}
          </Button>
        </Tooltip>

        <div />
        <Tooltip content={t('storybook.demo.bottomTooltip')} placement="bottom">
          <Button variant="secondary" type="button">
            {t('storybook.demo.bottom')}
          </Button>
        </Tooltip>
        <div />
      </div>;
  }
}`,...(b=(u=r.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var y,T,h;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Tooltip content={t('storybook.demo.moreInformationAboutFeature')}>
        <Button variant="tertiary" data-size="sm" aria-label={t('storybook.demo.information')} type="button">
          {t('storybook.demo.info')}
        </Button>
      </Tooltip>;
  }
}`,...(h=(T=s.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};const W=["Default","Placements","OnIcon"];export{i as Default,s as OnIcon,r as Placements,W as __namedExportsOrder,Y as default};
//# sourceMappingURL=Tooltip.stories-Dths_9ch.js.map
