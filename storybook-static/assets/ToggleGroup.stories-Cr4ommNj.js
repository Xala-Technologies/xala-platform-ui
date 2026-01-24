import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as i}from"./index-bjNF47ar.js";import{f as o}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const q={title:"Components/ToggleGroup",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},r={render:function(){const t=i();return e.jsxs(o,{defaultValue:"list",name:"view",children:[e.jsx(o.Item,{value:"list",children:t("storybook.demo.list")}),e.jsx(o.Item,{value:"grid",children:t("storybook.demo.grid")}),e.jsx(o.Item,{value:"calendar",children:t("storybook.demo.calendar")})]})}},l={render:function(){const t=i();return e.jsxs(o,{defaultValue:"list",name:"view-icons",children:[e.jsx(o.Item,{value:"list",children:t("storybook.demo.list")}),e.jsx(o.Item,{value:"grid",children:t("storybook.demo.grid")}),e.jsx(o.Item,{value:"calendar",children:t("storybook.demo.calendar")})]})}},a={render:function(){const t=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(o,{defaultValue:"a",name:"size-sm","data-size":"sm",children:[e.jsxs(o.Item,{value:"a",children:[t("storybook.demo.small")," A"]}),e.jsxs(o.Item,{value:"b",children:[t("storybook.demo.small")," B"]})]}),e.jsxs(o,{defaultValue:"a",name:"size-md","data-size":"md",children:[e.jsxs(o.Item,{value:"a",children:[t("storybook.demo.medium")," A"]}),e.jsxs(o.Item,{value:"b",children:[t("storybook.demo.medium")," B"]})]}),e.jsxs(o,{defaultValue:"a",name:"size-lg","data-size":"lg",children:[e.jsxs(o.Item,{value:"a",children:[t("storybook.demo.large")," A"]}),e.jsxs(o.Item,{value:"b",children:[t("storybook.demo.large")," B"]})]})]})}},s={render:function(){const t=i();return e.jsxs(o,{defaultValue:"week",name:"time-filter",children:[e.jsx(o.Item,{value:"day",children:t("storybook.demo.today")}),e.jsx(o.Item,{value:"week",children:t("storybook.demo.thisWeek")}),e.jsx(o.Item,{value:"month",children:t("storybook.demo.thisMonth")}),e.jsx(o.Item,{value:"all",children:t("storybook.demo.allTime")})]})}};var u,n,m;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <ToggleGroup defaultValue="list" name="view">
        <ToggleGroup.Item value="list">{t('storybook.demo.list')}</ToggleGroup.Item>
        <ToggleGroup.Item value="grid">{t('storybook.demo.grid')}</ToggleGroup.Item>
        <ToggleGroup.Item value="calendar">{t('storybook.demo.calendar')}</ToggleGroup.Item>
      </ToggleGroup>;
  }
}`,...(m=(n=r.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var d,p,c;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <ToggleGroup defaultValue="list" name="view-icons">
        <ToggleGroup.Item value="list">{t('storybook.demo.list')}</ToggleGroup.Item>
        <ToggleGroup.Item value="grid">{t('storybook.demo.grid')}</ToggleGroup.Item>
        <ToggleGroup.Item value="calendar">{t('storybook.demo.calendar')}</ToggleGroup.Item>
      </ToggleGroup>;
  }
}`,...(c=(p=l.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var T,G,I;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <ToggleGroup defaultValue="a" name="size-sm" data-size="sm">
          <ToggleGroup.Item value="a">{t('storybook.demo.small')} A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">{t('storybook.demo.small')} B</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue="a" name="size-md" data-size="md">
          <ToggleGroup.Item value="a">{t('storybook.demo.medium')} A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">{t('storybook.demo.medium')} B</ToggleGroup.Item>
        </ToggleGroup>
        <ToggleGroup defaultValue="a" name="size-lg" data-size="lg">
          <ToggleGroup.Item value="a">{t('storybook.demo.large')} A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">{t('storybook.demo.large')} B</ToggleGroup.Item>
        </ToggleGroup>
      </div>;
  }
}`,...(I=(G=a.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var v,b,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <ToggleGroup defaultValue="week" name="time-filter">
        <ToggleGroup.Item value="day">{t('storybook.demo.today')}</ToggleGroup.Item>
        <ToggleGroup.Item value="week">{t('storybook.demo.thisWeek')}</ToggleGroup.Item>
        <ToggleGroup.Item value="month">{t('storybook.demo.thisMonth')}</ToggleGroup.Item>
        <ToggleGroup.Item value="all">{t('storybook.demo.allTime')}</ToggleGroup.Item>
      </ToggleGroup>;
  }
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const H=["Default","WithIcons","Sizes","TimeFilter"];export{r as Default,a as Sizes,s as TimeFilter,l as WithIcons,H as __namedExportsOrder,q as default};
//# sourceMappingURL=ToggleGroup.stories-Cr4ommNj.js.map
