import{j as e}from"./jsx-runtime-BYYWji4R.js";import{e as o}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const E={title:"Components/ToggleGroup",parameters:{docs:{description:{component:`
ToggleGroup allows users to select between mutually exclusive options in a compact, button-style interface. It's ideal for view modes or settings.

## Variants

- **Default** - Standard toggle group
- **With icons** - Icons for visual context
- **Size variants** - sm, md (default), lg
- **Controlled** - Programmatically controlled state
- **Disabled** - Disabled toggle group
- **Vertical** - Vertical orientation

## When to Use

- View toggles (list/grid/calendar)
- Mode selection (edit/preview)
- Single option from small set (2-5 items)
- Filter options
- Sort preferences
- Display settings

## Best Practices

### Do
- Use clear, concise labels
- Limit to 2-5 options maximum
- Provide visual feedback for selection
- Use icons when they add meaning
- Ensure adequate touch targets
- Maintain logical order

### Don't
- Don't use for more than 5 options
- Don't use for navigation
- Don't nest within other toggles
- Don't disable without explanation
- Don't use for unrelated options
- Don't make labels too long

## Usage Patterns

### Basic ToggleGroup
\`\`\`tsx
<ToggleGroup defaultValue="list" name="view">
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
  <ToggleGroup.Item value="calendar">Calendar</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### With Icons
\`\`\`tsx
<ToggleGroup defaultValue="list" name="view-icons">
  <ToggleGroup.Item value="list">List View</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid View</ToggleGroup.Item>
  <ToggleGroup.Item value="calendar">Calendar View</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Size Variants
\`\`\`tsx
<ToggleGroup data-size="sm" defaultValue="a" name="size-sm">
  <ToggleGroup.Item value="a">Small A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">Small B</ToggleGroup.Item>
</ToggleGroup>
<ToggleGroup data-size="lg" defaultValue="a" name="size-lg">
  <ToggleGroup.Item value="a">Large A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">Large B</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Time Filter
\`\`\`tsx
<ToggleGroup defaultValue="week" name="time-filter">
  <ToggleGroup.Item value="day">Today</ToggleGroup.Item>
  <ToggleGroup.Item value="week">This Week</ToggleGroup.Item>
  <ToggleGroup.Item value="month">This Month</ToggleGroup.Item>
  <ToggleGroup.Item value="all">All Time</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Controlled State
\`\`\`tsx
const [selectedView, setSelectedView] = useState('list');

<ToggleGroup value={selectedView} onValueChange={setSelectedView} name="view">
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Sort Options
\`\`\`tsx
<ToggleGroup defaultValue="newest" name="sort">
  <ToggleGroup.Item value="newest">Newest</ToggleGroup.Item>
  <ToggleGroup.Item value="oldest">Oldest</ToggleGroup.Item>
  <ToggleGroup.Item value="popular">Popular</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

## Anti-Patterns

### Anti-pattern: Too Many Options
More than 5 options makes the group hard to use.

### Anti-pattern: Long Labels
Text that wraps breaks the visual rhythm.

### Anti-pattern: Navigation Use
Using toggle groups for page navigation.

### Anti-pattern: Unclear Icons
Icons without text labels can be ambiguous.

## Accessibility

### Screen Readers
- Radio group role announced
- Selected option clearly communicated
- Group label provides context
- Option count and position announced
- State changes announced

### Keyboard Navigation
- Arrow keys navigate between options
- Tab enters/exits the group
- Enter/Space selects options
- Focus stays within group
- Logical navigation order

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All options reachable via keyboard
- **Focus management**: Clear focus indicators
- **ARIA attributes**: Proper roles and states
- **Group labeling**: Descriptive group labels
- **State indication**: Selection clearly shown

### ARIA Implementation
\`\`\`tsx
<div role="radiogroup" aria-labelledby="view-label">
  <div id="view-label">View mode</div>
  <button 
    role="radio" 
    aria-checked="true" 
    aria-label="List view"
    type="button"
  >
    List
  </button>
  <button 
    role="radio" 
    aria-checked="false" 
    aria-label="Grid view"
    type="button"
  >
    Grid
  </button>
</div>
\`\`\`

### Best Practice for Labels
Use clear, concise labels:
\`\`\`tsx
// Good
<ToggleGroup.Item value="list">List View</ToggleGroup.Item>
<ToggleGroup.Item value="grid">Grid View</ToggleGroup.Item>
<ToggleGroup.Item value="day">Today</ToggleGroup.Item>

// Bad
<ToggleGroup.Item value="1">Option 1</ToggleGroup.Item>
<ToggleGroup.Item value="2">Option 2</ToggleGroup.Item>
<ToggleGroup.Item value="all">Show All Items In The List</ToggleGroup.Item>
\`\`\`

### Controlled ToggleGroup Example
\`\`\`tsx
const ViewToggle = () => {
  const [view, setView] = useState('list');
  
  return (
    <>
      <ToggleGroup value={view} onValueChange={setView} name="view-mode">
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
        <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      </ToggleGroup>
      
      {view === 'list' && <ListView />}
      {view === 'grid' && <GridView />}
    </>
  );
};
\`\`\`
        `}}},tags:["autodocs"]},t={render:()=>e.jsxs(o,{defaultValue:"list",name:"view",children:[e.jsx(o.Item,{value:"list",children:"List"}),e.jsx(o.Item,{value:"grid",children:"Grid"}),e.jsx(o.Item,{value:"calendar",children:"Calendar"})]})},l={render:()=>e.jsxs(o,{defaultValue:"list",name:"view-icons",children:[e.jsx(o.Item,{value:"list",children:"List"}),e.jsx(o.Item,{value:"grid",children:"Grid"}),e.jsx(o.Item,{value:"calendar",children:"Calendar"})]})},a={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(o,{defaultValue:"a",name:"size-sm","data-size":"sm",children:[e.jsx(o.Item,{value:"a",children:"Small A"}),e.jsx(o.Item,{value:"b",children:"Small B"})]}),e.jsxs(o,{defaultValue:"a",name:"size-md","data-size":"md",children:[e.jsx(o.Item,{value:"a",children:"Medium A"}),e.jsx(o.Item,{value:"b",children:"Medium B"})]}),e.jsxs(o,{defaultValue:"a",name:"size-lg","data-size":"lg",children:[e.jsx(o.Item,{value:"a",children:"Large A"}),e.jsx(o.Item,{value:"b",children:"Large B"})]})]})},r={render:()=>e.jsxs(o,{defaultValue:"week",name:"time-filter",children:[e.jsx(o.Item,{value:"day",children:"Today"}),e.jsx(o.Item,{value:"week",children:"This Week"}),e.jsx(o.Item,{value:"month",children:"This Month"}),e.jsx(o.Item,{value:"all",children:"All Time"})]})};var i,g,u;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <ToggleGroup defaultValue="list" name="view">
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="calendar">Calendar</ToggleGroup.Item>
    </ToggleGroup>
}`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var s,n,m;l.parameters={...l.parameters,docs:{...(s=l.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <ToggleGroup defaultValue="list" name="view-icons">
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="calendar">Calendar</ToggleGroup.Item>
    </ToggleGroup>
}`,...(m=(n=l.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var p,d,c;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <ToggleGroup defaultValue="a" name="size-sm" data-size="sm">
        <ToggleGroup.Item value="a">Small A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">Small B</ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" name="size-md" data-size="md">
        <ToggleGroup.Item value="a">Medium A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">Medium B</ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" name="size-lg" data-size="lg">
        <ToggleGroup.Item value="a">Large A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">Large B</ToggleGroup.Item>
      </ToggleGroup>
    </div>
}`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var T,G,I;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <ToggleGroup defaultValue="week" name="time-filter">
      <ToggleGroup.Item value="day">Today</ToggleGroup.Item>
      <ToggleGroup.Item value="week">This Week</ToggleGroup.Item>
      <ToggleGroup.Item value="month">This Month</ToggleGroup.Item>
      <ToggleGroup.Item value="all">All Time</ToggleGroup.Item>
    </ToggleGroup>
}`,...(I=(G=r.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};const R=["Default","WithIcons","Sizes","TimeFilter"];export{t as Default,a as Sizes,r as TimeFilter,l as WithIcons,R as __namedExportsOrder,E as default};
//# sourceMappingURL=ToggleGroup.stories-BgzMYgjH.js.map
