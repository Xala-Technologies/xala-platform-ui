import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as l}from"./index-ClcD9ViR.js";import{u as C}from"./index-bjNF47ar.js";import"./alert-BzTWXKSs.js";import{C as t}from"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const ue={title:"Components/Chip",component:t,parameters:{docs:{description:{component:`
Chip are small, interactive components that allow users to control how they want to see content. They are commonly used for filtering categories, showing active filters, and making selections.

## Variants

- **Chip.Radio** - Single selection (mutually exclusive, like radio buttons)
- **Chip.Checkbox** - Multiple selection (can select multiple, like checkboxes)
- **Chip.Removable** - Dismissible chips with remove button for active filters
- **Chip.Button** - Clickable action chips (alternative to buttons)
- **Chip.Input** - Editable chips for dynamic content

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Filtering search results or lists
- Showing active filters
- Tag selection and categorization
- Quick actions and shortcuts
- Category selection
- Input tags and keywords
- Status indicators

## Best Practices

### Do
- Use for filtering and selection tasks
- Keep labels short and clear (1-3 words)
- Use Chip.Removable for active filters
- Use Chip.Checkbox for multiple selections
- Use Chip.Radio for single selection
- Group related chips together
- Provide clear visual feedback for selection

### Don't
- Don't use for navigation (use links instead)
- Don't use very long text in chips
- Don't mix chip types in same group
- Don't use chips for critical actions
- Don't create too many options in one group
- Don't rely on color alone for selection state

## Usage Patterns

### Radio Chips (Single Selection)
\`\`\`tsx
<Chip.Radio name="category" value="all" checked>
  All Categories
</Chip.Radio>
<Chip.Radio name="category" value="tech">
  Technology
</Chip.Radio>
<Chip.Radio name="category" value="design">
  Design
</Chip.Radio>
\`\`\`

### Checkbox Chips (Multiple Selection)
\`\`\`tsx
<Chip.Checkbox value="frontend" checked>
  Frontend
</Chip.Checkbox>
<Chip.Checkbox value="backend">
  Backend
</Chip.Checkbox>
<Chip.Checkbox value="design">
  Design
</Chip.Checkbox>
\`\`\`

### Removable Chips (Active Filters)
\`\`\`tsx
<Chip.Removable onRemove={() => removeFilter('tech')}>
  Technology
</Chip.Removable>
<Chip.Removable onRemove={() => removeFilter('design')}>
  Design
</Chip.Removable>
\`\`\`

### Action Chips
\`\`\`tsx
<Chip.Button onClick={handleAction}>
  Quick Action
</Chip.Button>
\`\`\`

### Size Variants
\`\`\`tsx
<Chip data-size="sm">Small</Chip>
<Chip data-size="md">Medium</Chip>
<Chip data-size="lg">Large</Chip>
\`\`\`

## Anti-Patterns

### Anti-pattern: Chips for Navigation
Using chips for navigation instead of proper links or buttons.

### Anti-pattern: Too Many Options
Presenting 10+ chip options becomes overwhelming to scan.

### Anti-pattern: Long Text in Chips
Chips with long text become unwieldy and hard to scan.

### Anti-pattern: Mixed Selection Types
Mixing radio and checkbox chips in the same group.

## Accessibility

### Screen Readers
- Proper ARIA roles for each chip type
- Selection state is clearly announced
- Remove actions are announced for removable chips
- Group labels provide context
- Focus management within chip groups

### Keyboard Navigation
- Tab key navigates between chips
- Space/Enter selects/deselects chips
- Escape may close removable chips
- Arrow keys navigate within chip groups
- Focus stays within logical group

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All chips reachable via keyboard
- **Focus indicators**: Visible focus states
- **ARIA roles**: Proper roles for chip types
- **Selection state**: Clear indication of selected state
- **Touch targets**: Minimum 44x44px for touch

### Radio Chips Implementation
\`\`\`tsx
<div role="radiogroup" aria-label="Category filter">
  <Chip.Radio
    name="category"
    value="all"
    checked={selected === 'all'}
    onChange={() => setSelected('all')}
    aria-checked={selected === 'all'}
  >
    All Categories
  </Chip.Radio>
</div>
\`\`\`

### Checkbox Chips Implementation
\`\`\`tsx
<div role="group" aria-label="Filter options">
  <Chip.Checkbox
    value="frontend"
    checked={filters.includes('frontend')}
    onChange={(checked) => updateFilter('frontend', checked)}
    aria-checked={filters.includes('frontend')}
  >
    Frontend
  </Chip.Checkbox>
</div>
\`\`\`

### Removable Chips
\`\`\`tsx
<Chip.Removable
  onRemove={() => removeFilter('tech')}
  aria-label="Remove Technology filter"
>
  Technology
</Chip.Removable>
\`\`\`

### Best Practice for Groups
Always provide group labels:
\`\`\`tsx
<fieldset>
  <legend>Filter by category</legend>
  <div role="group">
    <Chip.Radio name="category" value="all">All</Chip.Radio>
    <Chip.Radio name="category" value="tech">Tech</Chip.Radio>
  </div>
</fieldset>
\`\`\`
        `}}},tags:["autodocs"]},u={render:function(){const o=C(),[i,s]=l.useState("option1");return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Radio,{name:"filter",value:"option1",checked:i==="option1",onChange:()=>s("option1"),children:o("storybook.demo.all")}),e.jsx(t.Radio,{name:"filter",value:"option2",checked:i==="option2",onChange:()=>s("option2"),children:o("platform.status.active")}),e.jsx(t.Radio,{name:"filter",value:"option3",checked:i==="option3",onChange:()=>s("option3"),children:o("platform.status.completed")})]})}},g={render:function(){const o=C(),[i,s]=l.useState(["tag1"]),a=n=>{s(c=>c.includes(n)?c.filter(b=>b!==n):[...c,n])};return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Checkbox,{name:"tags",checked:i.includes("tag1"),onChange:()=>a("tag1"),children:o("storybook.demo.indoor")}),e.jsx(t.Checkbox,{name:"tags",checked:i.includes("tag2"),onChange:()=>a("tag2"),children:o("storybook.demo.outdoor")}),e.jsx(t.Checkbox,{name:"tags",checked:i.includes("tag3"),onChange:()=>a("tag3"),children:o("storybook.demo.accessible")})]})}},v={render:function(){const[o,i]=l.useState(["Oslo","Bergen","Trondheim"]);return e.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:o.map(s=>e.jsx(t.Removable,{onClick:()=>i(a=>a.filter(n=>n!==s)),children:s},s))})}},x={render:function(){const o=C();return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Button,{onClick:()=>{},children:o("platform.common.clearAll")}),e.jsx(t.Button,{onClick:()=>{},children:o("storybook.demo.apply")}),e.jsx(t.Button,{onClick:()=>{},children:o("storybook.demo.reset")})]})}},h={render:function(){const o=C();return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Checkbox,{"data-size":"sm",children:o("storybook.story.small")}),e.jsx(t.Checkbox,{"data-size":"md",children:o("storybook.story.medium")}),e.jsx(t.Checkbox,{"data-size":"lg",children:o("storybook.story.large")})]})})}},m={render:function(){const o=C(),[i,s]=l.useState("all"),[a,n]=l.useState(["indoor"]),[c,b]=l.useState(["Oslo","Bergen"]),k=r=>{n(p=>p.includes(r)?p.filter(y=>y!==r):[...p,r])};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.radioChips")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Radio,{name:"status",value:"all",checked:i==="all",onChange:()=>s("all"),children:o("storybook.demo.all")}),e.jsx(t.Radio,{name:"status",value:"active",checked:i==="active",onChange:()=>s("active"),children:o("platform.status.active")}),e.jsx(t.Radio,{name:"status",value:"completed",checked:i==="completed",onChange:()=>s("completed"),children:o("platform.status.completed")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.checkboxChips")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Checkbox,{name:"features",checked:a.includes("indoor"),onChange:()=>k("indoor"),children:o("storybook.demo.indoor")}),e.jsx(t.Checkbox,{name:"features",checked:a.includes("outdoor"),onChange:()=>k("outdoor"),children:o("storybook.demo.outdoor")}),e.jsx(t.Checkbox,{name:"features",checked:a.includes("accessible"),onChange:()=>k("accessible"),children:o("storybook.demo.accessible")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.removableChips")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[c.map(r=>e.jsx(t.Removable,{"aria-label":`${o("platform.common.remove")} ${r}`,onClick:()=>b(p=>p.filter(y=>y!==r)),children:r},r)),c.length===0&&e.jsx("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.demo.noActiveFilters")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.buttonChips")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[e.jsx(t.Button,{onClick:()=>{},children:o("platform.common.clearAll")}),e.jsx(t.Button,{onClick:()=>{},children:o("storybook.demo.apply")})]})]})]})}};var f,R,S;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState('option1');
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        <Chip.Radio name="filter" value="option1" checked={selected === 'option1'} onChange={() => setSelected('option1')}>
          {t('storybook.demo.all')}
        </Chip.Radio>
        <Chip.Radio name="filter" value="option2" checked={selected === 'option2'} onChange={() => setSelected('option2')}>
          {t('platform.status.active')}
        </Chip.Radio>
        <Chip.Radio name="filter" value="option3" checked={selected === 'option3'} onChange={() => setSelected('option3')}>
          {t('platform.status.completed')}
        </Chip.Radio>
      </div>;
  }
}`,...(S=(R=u.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var j,w,B;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<string[]>(['tag1']);
    const toggle = (tag: string) => {
      setSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        <Chip.Checkbox name="tags" checked={selected.includes('tag1')} onChange={() => toggle('tag1')}>
          {t('storybook.demo.indoor')}
        </Chip.Checkbox>
        <Chip.Checkbox name="tags" checked={selected.includes('tag2')} onChange={() => toggle('tag2')}>
          {t('storybook.demo.outdoor')}
        </Chip.Checkbox>
        <Chip.Checkbox name="tags" checked={selected.includes('tag3')} onChange={() => toggle('tag3')}>
          {t('storybook.demo.accessible')}
        </Chip.Checkbox>
      </div>;
  }
}`,...(B=(w=g.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var A,z,T;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    const [chips, setChips] = useState(['Oslo', 'Bergen', 'Trondheim']);
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        {chips.map(chip => <Chip.Removable key={chip} onClick={() => setChips(prev => prev.filter(c => c !== chip))}>
            {chip}
          </Chip.Removable>)}
      </div>;
  }
}`,...(T=(z=v.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var W,D,F;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        <Chip.Button onClick={() => {}}>{t('platform.common.clearAll')}</Chip.Button>
        <Chip.Button onClick={() => {}}>{t('storybook.demo.apply')}</Chip.Button>
        <Chip.Button onClick={() => {}}>{t('storybook.demo.reset')}</Chip.Button>
      </div>;
  }
}`,...(F=(D=x.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var P,M,U,E,I;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          <Chip.Checkbox data-size="sm">{t('storybook.story.small')}</Chip.Checkbox>
          <Chip.Checkbox data-size="md">{t('storybook.story.medium')}</Chip.Checkbox>
          <Chip.Checkbox data-size="lg">{t('storybook.story.large')}</Chip.Checkbox>
        </div>
      </div>;
  }
}`,...(U=(M=h.parameters)==null?void 0:M.docs)==null?void 0:U.source},description:{story:"Size variants",...(I=(E=h.parameters)==null?void 0:E.docs)==null?void 0:I.description}}};var O,V,G,$,K;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [radioSelected, setRadioSelected] = useState('all');
    const [checkboxSelected, setCheckboxSelected] = useState<string[]>(['indoor']);
    const [removableChips, setRemovableChips] = useState(['Oslo', 'Bergen']);
    const toggleCheckbox = (value: string) => {
      setCheckboxSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };
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
            {t('storybook.story.radioChips')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Chip.Radio name="status" value="all" checked={radioSelected === 'all'} onChange={() => setRadioSelected('all')}>
              {t('storybook.demo.all')}
            </Chip.Radio>
            <Chip.Radio name="status" value="active" checked={radioSelected === 'active'} onChange={() => setRadioSelected('active')}>
              {t('platform.status.active')}
            </Chip.Radio>
            <Chip.Radio name="status" value="completed" checked={radioSelected === 'completed'} onChange={() => setRadioSelected('completed')}>
              {t('platform.status.completed')}
            </Chip.Radio>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.checkboxChips')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Chip.Checkbox name="features" checked={checkboxSelected.includes('indoor')} onChange={() => toggleCheckbox('indoor')}>
              {t('storybook.demo.indoor')}
            </Chip.Checkbox>
            <Chip.Checkbox name="features" checked={checkboxSelected.includes('outdoor')} onChange={() => toggleCheckbox('outdoor')}>
              {t('storybook.demo.outdoor')}
            </Chip.Checkbox>
            <Chip.Checkbox name="features" checked={checkboxSelected.includes('accessible')} onChange={() => toggleCheckbox('accessible')}>
              {t('storybook.demo.accessible')}
            </Chip.Checkbox>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.removableChips')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            {removableChips.map(chip => <Chip.Removable key={chip} aria-label={\`\${t('platform.common.remove')} \${chip}\`} onClick={() => setRemovableChips(prev => prev.filter(c => c !== chip))}>
                {chip}
              </Chip.Removable>)}
            {removableChips.length === 0 && <span style={{
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
                {t('storybook.demo.noActiveFilters')}
              </span>}
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.buttonChips')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Chip.Button onClick={() => {}}>{t('platform.common.clearAll')}</Chip.Button>
            <Chip.Button onClick={() => {}}>{t('storybook.demo.apply')}</Chip.Button>
          </div>
        </div>
      </div>;
  }
}`,...(G=(V=m.parameters)==null?void 0:V.docs)==null?void 0:G.source},description:{story:"All variants overview",...(K=($=m.parameters)==null?void 0:$.docs)==null?void 0:K.description}}};const ge=["RadioChips","CheckboxChips","RemovableChips","ButtonChips","Sizes","AllVariants"];export{m as AllVariants,x as ButtonChips,g as CheckboxChips,u as RadioChips,v as RemovableChips,h as Sizes,ge as __namedExportsOrder,ue as default};
//# sourceMappingURL=Chip.stories-BkAwRGRy.js.map
