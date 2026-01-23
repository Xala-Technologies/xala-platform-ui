import{j as t}from"./jsx-runtime-BYYWji4R.js";import{f as o}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import{B as e}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const U={title:"Components/Tooltip",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},n={render:()=>t.jsx(o,{content:"This is a tooltip",children:t.jsx(e,{type:"button",children:"Hover me"})})},i={render:()=>t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"var(--ds-spacing-6)",padding:"var(--ds-spacing-10)",placeItems:"center"},children:[t.jsx("div",{}),t.jsx(o,{content:"Top tooltip",placement:"top",children:t.jsx(e,{variant:"secondary",type:"button",children:"Top"})}),t.jsx("div",{}),t.jsx(o,{content:"Left tooltip",placement:"left",children:t.jsx(e,{variant:"secondary",type:"button",children:"Left"})}),t.jsx("div",{}),t.jsx(o,{content:"Right tooltip",placement:"right",children:t.jsx(e,{variant:"secondary",type:"button",children:"Right"})}),t.jsx("div",{}),t.jsx(o,{content:"Bottom tooltip",placement:"bottom",children:t.jsx(e,{variant:"secondary",type:"button",children:"Bottom"})}),t.jsx("div",{})]})},a={render:()=>t.jsx(o,{content:"More information about this feature",children:t.jsx(e,{variant:"tertiary","data-size":"sm","aria-label":"Information",type:"button",children:"Info"})})};var r,s,l;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => <Tooltip content="This is a tooltip">
      <Button type="button">Hover me</Button>
    </Tooltip>
}`,...(l=(s=n.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var p,c,d;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--ds-spacing-6)',
    padding: 'var(--ds-spacing-10)',
    placeItems: 'center'
  }}>
      <div />
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="secondary" type="button">
          Top
        </Button>
      </Tooltip>
      <div />

      <Tooltip content="Left tooltip" placement="left">
        <Button variant="secondary" type="button">
          Left
        </Button>
      </Tooltip>
      <div />
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="secondary" type="button">
          Right
        </Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="secondary" type="button">
          Bottom
        </Button>
      </Tooltip>
      <div />
    </div>
}`,...(d=(c=i.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,u,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <Tooltip content="More information about this feature">
      <Button variant="tertiary" data-size="sm" aria-label="Information" type="button">
        Info
      </Button>
    </Tooltip>
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const z=["Default","Placements","OnIcon"];export{n as Default,a as OnIcon,i as Placements,z as __namedExportsOrder,U as default};
//# sourceMappingURL=Tooltip.stories-BDTuJIYi.js.map
