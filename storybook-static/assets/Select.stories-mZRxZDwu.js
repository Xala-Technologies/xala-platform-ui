import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as h}from"./index-ClcD9ViR.js";import{S as t}from"./index-iTq-tUBJ.js";import{F as l,V as Y}from"./index-Df4a1FH3.js";import{L as i}from"./label-9E-twYNb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";const pe={title:"Components/Select",component:t,parameters:{docs:{description:{component:`
Select allows users to choose an option from a list. It is best suited for longer lists of options where space is limited.

## Variants

- **Default** - Standard select dropdown
- **With description** - Additional context below label
- **With grouping** - Organize options into categories using optgroup
- **With error** - Validation errors
- **Disabled** - Not editable (avoid if possible)
- **Read-only** - Show preselected value without editing

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Many options (8+) to choose from
- Single selection required from predefined list
- Options are predefined and limited
- Space is limited (compared to radio buttons)
- Use Radio buttons for 2-7 options
- Use Combobox for searchable lists

## Best Practices

### Do
- Always provide a visible label using Field and Label components
- Include a default "Choose..." or "Select..." option
- Group related options with Select.Optgroup
- Sort options logically (alphabetically or by frequency)
- Use descriptions to provide additional context
- Provide clear error messages with ValidationMessage
- Make labels concise and descriptive

### Don't
- Don't use for 2-7 options (use Radio buttons instead)
- Don't disable without explaining why
- Don't use vague labels like "Select" or "Choose"
- Don't pre-select options unless there's a clear default
- Don't use for actions (use Button or Link instead)
- Don't nest optgroups (not supported)

## Usage Patterns

### Basic Select
\`\`\`tsx
<Field>
  <Label>Select a country</Label>
  <Select>
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="no">Norway</Select.Option>
    <Select.Option value="se">Sweden</Select.Option>
    <Select.Option value="dk">Denmark</Select.Option>
  </Select>
</Field>
\`\`\`

### With Description
\`\`\`tsx
<Field>
  <Label>Preferred language</Label>
  <Field.Description>This will be used for all communications</Field.Description>
  <Select>
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="nb">Norwegian (Bokmål)</Select.Option>
    <Select.Option value="en">English</Select.Option>
  </Select>
</Field>
\`\`\`

### With Error Validation
\`\`\`tsx
<Field>
  <Label>Category</Label>
  <Select aria-invalid="true">
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="cat1">Category 1</Select.Option>
  </Select>
  <ValidationMessage>Please select a category</ValidationMessage>
</Field>
\`\`\`

### With Option Groups
\`\`\`tsx
<Field>
  <Label>Select a park</Label>
  <Select>
    <Select.Optgroup label="City Centre">
      <Select.Option value="park1">Central Park</Select.Option>
      <Select.Option value="park2">Palace Park</Select.Option>
    </Select.Optgroup>
    <Select.Optgroup label="Suburbs">
      <Select.Option value="park3">North Park</Select.Option>
    </Select.Optgroup>
  </Select>
</Field>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using Select for Few Options
If you have 2-7 options, use Radio buttons instead for better visibility and accessibility.

### Anti-pattern: No Default Option
Without a "Choose..." option, users can't tell if a value was pre-selected or if they selected it.

### Anti-pattern: Using Select for Actions
Select is for choosing data, not triggering actions. Use Button or Link for actions.

### Anti-pattern: Disabling Without Explanation
Disabled selects without context confuse users. Provide explanation via description text.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to the select
- **Space** or **Enter** opens the dropdown
- **Arrow keys** (Up/Down) navigate options
- **Home/End** jump to first/last option
- **Escape** closes dropdown without selecting
- **Enter** selects focused option and closes dropdown

### Screen Readers
- Select role is announced
- Label is read when focused
- Current selection is announced
- Optgroup labels provide context
- Total number of options announced
- Disabled state is announced

### WCAG 2.1 AA Compliance
- **Label**: Every select must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for borders
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px for mobile
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **Error identification**: Errors clearly identified with text
- **Keyboard accessible**: Full keyboard navigation support

### Required Selects
For required selections:
\`\`\`tsx
<Field>
  <Label>Country (required)</Label>
  <Select required aria-required="true">
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="no">Norway</Select.Option>
  </Select>
</Field>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the select"},readOnly:{control:"boolean",description:"Makes select read-only"},required:{control:"boolean",description:"Marks select as required"}}},c={render:()=>e.jsxs(l,{children:[e.jsx(i,{children:"Select a country"}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:"Choose..."}),e.jsx(t.Option,{value:"no",children:"Norway"}),e.jsx(t.Option,{value:"se",children:"Sweden"}),e.jsx(t.Option,{value:"dk",children:"Denmark"})]})]})},d={render:()=>e.jsxs(l,{children:[e.jsx(i,{children:"Preferred language"}),e.jsx(l.Description,{children:"This will be used for all communications"}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:"Choose..."}),e.jsx(t.Option,{value:"nb",children:"Norwegian (Bokmal)"}),e.jsx(t.Option,{value:"nn",children:"Norwegian (Nynorsk)"}),e.jsx(t.Option,{value:"en",children:"English"})]})]})},p={render:()=>e.jsxs(l,{children:[e.jsx(i,{children:"Category"}),e.jsxs(t,{"aria-invalid":"true",children:[e.jsx(t.Option,{value:"",children:"Choose..."}),e.jsx(t.Option,{value:"lokaler",children:"Lokaler og baner"}),e.jsx(t.Option,{value:"utstyr",children:"Utstyr og inventar"})]}),e.jsx(Y,{children:"Please select a category"})]})},u={render:()=>e.jsxs(l,{children:[e.jsx(i,{children:"Status"}),e.jsx(t,{disabled:!0,children:e.jsx(t.Option,{value:"active",children:"Active"})})]})},S={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(l,{children:[e.jsx(i,{children:"Small"}),e.jsxs(t,{"data-size":"sm",children:[e.jsx(t.Option,{value:"1",children:"Option 1"}),e.jsx(t.Option,{value:"2",children:"Option 2"})]})]}),e.jsxs(l,{children:[e.jsx(i,{children:"Medium"}),e.jsxs(t,{"data-size":"md",children:[e.jsx(t.Option,{value:"1",children:"Option 1"}),e.jsx(t.Option,{value:"2",children:"Option 2"})]})]}),e.jsxs(l,{children:[e.jsx(i,{children:"Large"}),e.jsxs(t,{"data-size":"lg",children:[e.jsx(t.Option,{value:"1",children:"Option 1"}),e.jsx(t.Option,{value:"2",children:"Option 2"})]})]})]})},o={render:()=>e.jsxs(l,{children:[e.jsx(i,{children:"Country"}),e.jsx(t,{readOnly:!0,value:"no",children:e.jsx(t.Option,{value:"no",children:"Norway"})})]})},a={render:()=>e.jsxs(l,{children:[e.jsx(i,{children:"Select a park"}),e.jsxs(t,{children:[e.jsxs(t.Optgroup,{label:"Grünerløkka",children:[e.jsx(t.Option,{value:"sofienbergparken",children:"Sofienberg Park"}),e.jsx(t.Option,{value:"birkelunden",children:"Birkelunden"}),e.jsx(t.Option,{value:"olafryesplass",children:"Olaf Ryes Plass"})]}),e.jsxs(t.Optgroup,{label:"City centre",children:[e.jsx(t.Option,{value:"slottsparken",children:"The Palace Park"}),e.jsx(t.Option,{value:"studenterlunden",children:"Studenterlunden"})]}),e.jsxs(t.Optgroup,{label:"Old Oslo",children:[e.jsx(t.Option,{value:"botsparken",children:"Botsparken"}),e.jsx(t.Option,{value:"klosterenga",children:"Klosterenga Park"})]})]})]})},r={render:()=>{const[n,Z]=h.useState(""),[$,ee]=h.useState("");return e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)",maxWidth:"400px"},children:[e.jsxs(l,{children:[e.jsx(i,{children:"Country"}),e.jsx(l.Description,{children:"Select your country of residence"}),e.jsxs(t,{value:n,onChange:O=>Z(O.target.value),children:[e.jsx(t.Option,{value:"",children:"Choose..."}),e.jsx(t.Option,{value:"no",children:"Norway"}),e.jsx(t.Option,{value:"se",children:"Sweden"}),e.jsx(t.Option,{value:"dk",children:"Denmark"}),e.jsx(t.Option,{value:"fi",children:"Finland"})]})]}),e.jsxs(l,{children:[e.jsx(i,{children:"City"}),e.jsxs(t,{value:$,onChange:O=>ee(O.target.value),disabled:!n,children:[e.jsx(t.Option,{value:"",children:"Choose..."}),n==="no"&&e.jsxs(e.Fragment,{children:[e.jsx(t.Option,{value:"oslo",children:"Oslo"}),e.jsx(t.Option,{value:"bergen",children:"Bergen"}),e.jsx(t.Option,{value:"trondheim",children:"Trondheim"})]}),n==="se"&&e.jsxs(e.Fragment,{children:[e.jsx(t.Option,{value:"stockholm",children:"Stockholm"}),e.jsx(t.Option,{value:"gothenburg",children:"Gothenburg"})]})]}),!n&&e.jsx(l.Description,{children:"Select a country first"})]})]})}},s={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"States"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(l,{children:[e.jsx(i,{children:"Default"}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:"Choose..."}),e.jsx(t.Option,{value:"1",children:"Option 1"}),e.jsx(t.Option,{value:"2",children:"Option 2"})]})]}),e.jsxs(l,{children:[e.jsx(i,{children:"With error"}),e.jsxs(t,{"aria-invalid":"true",children:[e.jsx(t.Option,{value:"",children:"Choose..."}),e.jsx(t.Option,{value:"1",children:"Option 1"})]}),e.jsx(Y,{children:"Please select an option"})]}),e.jsxs(l,{children:[e.jsx(i,{children:"Disabled"}),e.jsx(t,{disabled:!0,children:e.jsx(t.Option,{value:"1",children:"Option 1"})})]}),e.jsxs(l,{children:[e.jsx(i,{children:"Read-only"}),e.jsx(t,{readOnly:!0,value:"1",children:e.jsx(t.Option,{value:"1",children:"Selected Option"})})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(l,{children:[e.jsx(i,{children:"Small"}),e.jsx(t,{"data-size":"sm",children:e.jsx(t.Option,{value:"1",children:"Option 1"})})]}),e.jsxs(l,{children:[e.jsx(i,{children:"Medium"}),e.jsx(t,{"data-size":"md",children:e.jsx(t.Option,{value:"1",children:"Option 1"})})]}),e.jsxs(l,{children:[e.jsx(i,{children:"Large"}),e.jsx(t,{"data-size":"lg",children:e.jsx(t.Option,{value:"1",children:"Option 1"})})]})]})]})]})};var v,x,m;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Select a country</Label>
      <Select>
        <Select.Option value="">Choose...</Select.Option>
        <Select.Option value="no">Norway</Select.Option>
        <Select.Option value="se">Sweden</Select.Option>
        <Select.Option value="dk">Denmark</Select.Option>
      </Select>
    </Field>
}`,...(m=(x=c.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var g,b,j;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Preferred language</Label>
      <Field.Description>This will be used for all communications</Field.Description>
      <Select>
        <Select.Option value="">Choose...</Select.Option>
        <Select.Option value="nb">Norwegian (Bokmal)</Select.Option>
        <Select.Option value="nn">Norwegian (Nynorsk)</Select.Option>
        <Select.Option value="en">English</Select.Option>
      </Select>
    </Field>
}`,...(j=(b=d.parameters)==null?void 0:b.docs)==null?void 0:j.source}}};var y,f,F;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Category</Label>
      <Select aria-invalid="true">
        <Select.Option value="">Choose...</Select.Option>
        <Select.Option value="lokaler">Lokaler og baner</Select.Option>
        <Select.Option value="utstyr">Utstyr og inventar</Select.Option>
      </Select>
      <ValidationMessage>Please select a category</ValidationMessage>
    </Field>
}`,...(F=(f=p.parameters)==null?void 0:f.docs)==null?void 0:F.source}}};var k,L,C;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Status</Label>
      <Select disabled>
        <Select.Option value="active">Active</Select.Option>
      </Select>
    </Field>
}`,...(C=(L=u.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var D,w,z;S.parameters={...S.parameters,docs:{...(D=S.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Field>
        <Label>Small</Label>
        <Select data-size="sm">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Field>
      <Field>
        <Label>Medium</Label>
        <Select data-size="md">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Field>
      <Field>
        <Label>Large</Label>
        <Select data-size="lg">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Field>
    </div>
}`,...(z=(w=S.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var P,A,M,N,E;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Country</Label>
      <Select readOnly value="no">
        <Select.Option value="no">Norway</Select.Option>
      </Select>
    </Field>
}`,...(M=(A=o.parameters)==null?void 0:A.docs)==null?void 0:M.source},description:{story:"Read-only select - Show preselected value without editing",...(E=(N=o.parameters)==null?void 0:N.docs)==null?void 0:E.description}}};var W,B,R,V,T;a.parameters={...a.parameters,docs:{...(W=a.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <Field>
      <Label>Select a park</Label>
      <Select>
        <Select.Optgroup label="Grünerløkka">
          <Select.Option value="sofienbergparken">Sofienberg Park</Select.Option>
          <Select.Option value="birkelunden">Birkelunden</Select.Option>
          <Select.Option value="olafryesplass">Olaf Ryes Plass</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="City centre">
          <Select.Option value="slottsparken">The Palace Park</Select.Option>
          <Select.Option value="studenterlunden">Studenterlunden</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="Old Oslo">
          <Select.Option value="botsparken">Botsparken</Select.Option>
          <Select.Option value="klosterenga">Klosterenga Park</Select.Option>
        </Select.Optgroup>
      </Select>
    </Field>
}`,...(R=(B=a.parameters)==null?void 0:B.docs)==null?void 0:R.source},description:{story:"Option groups - Organize options into categories",...(T=(V=a.parameters)==null?void 0:V.docs)==null?void 0:T.description}}};var U,q,G,I,K;r.parameters={...r.parameters,docs:{...(U=r.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    return <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)',
      maxWidth: '400px'
    }}>
        <Field>
          <Label>Country</Label>
          <Field.Description>Select your country of residence</Field.Description>
          <Select value={country} onChange={e => setCountry(e.target.value)}>
            <Select.Option value="">Choose...</Select.Option>
            <Select.Option value="no">Norway</Select.Option>
            <Select.Option value="se">Sweden</Select.Option>
            <Select.Option value="dk">Denmark</Select.Option>
            <Select.Option value="fi">Finland</Select.Option>
          </Select>
        </Field>

        <Field>
          <Label>City</Label>
          <Select value={city} onChange={e => setCity(e.target.value)} disabled={!country}>
            <Select.Option value="">Choose...</Select.Option>
            {country === 'no' && <>
                <Select.Option value="oslo">Oslo</Select.Option>
                <Select.Option value="bergen">Bergen</Select.Option>
                <Select.Option value="trondheim">Trondheim</Select.Option>
              </>}
            {country === 'se' && <>
                <Select.Option value="stockholm">Stockholm</Select.Option>
                <Select.Option value="gothenburg">Gothenburg</Select.Option>
              </>}
          </Select>
          {!country && <Field.Description>Select a country first</Field.Description>}
        </Field>
      </form>;
  }
}`,...(G=(q=r.parameters)==null?void 0:q.docs)==null?void 0:G.source},description:{story:"Multiple selects in a form",...(K=(I=r.parameters)==null?void 0:I.docs)==null?void 0:K.description}}};var H,_,J,Q,X;s.parameters={...s.parameters,docs:{...(H=s.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
          States
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Field>
            <Label>Default</Label>
            <Select>
              <Select.Option value="">Choose...</Select.Option>
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>With error</Label>
            <Select aria-invalid="true">
              <Select.Option value="">Choose...</Select.Option>
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
            <ValidationMessage>Please select an option</ValidationMessage>
          </Field>
          <Field>
            <Label>Disabled</Label>
            <Select disabled>
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>Read-only</Label>
            <Select readOnly value="1">
              <Select.Option value="1">Selected Option</Select.Option>
            </Select>
          </Field>
        </div>
      </div>

      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Sizes
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Field>
            <Label>Small</Label>
            <Select data-size="sm">
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>Medium</Label>
            <Select data-size="md">
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>Large</Label>
            <Select data-size="lg">
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
        </div>
      </div>
    </div>
}`,...(J=(_=s.parameters)==null?void 0:_.docs)==null?void 0:J.source},description:{story:"All variants overview",...(X=(Q=s.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};const ue=["Default","WithDescription","WithError","Disabled","Sizes","ReadOnly","OptionGroups","FormExample","AllVariants"];export{s as AllVariants,c as Default,u as Disabled,r as FormExample,a as OptionGroups,o as ReadOnly,S as Sizes,d as WithDescription,p as WithError,ue as __namedExportsOrder,pe as default};
//# sourceMappingURL=Select.stories-mZRxZDwu.js.map
