import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as k}from"./index-ClcD9ViR.js";import{u as n}from"./index-bjNF47ar.js";import{S as t}from"./index-iTq-tUBJ.js";import{F as s,V as ee}from"./index-Df4a1FH3.js";import{L as r}from"./label-9E-twYNb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";const Se={title:"Components/Select",component:t,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the select"},readOnly:{control:"boolean",description:"Makes select read-only"},required:{control:"boolean",description:"Marks select as required"}}},u={render:function(){const o=n();return e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.selectCountry")}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),e.jsx(t.Option,{value:"no",children:o("storybook.demo.norway")}),e.jsx(t.Option,{value:"se",children:o("storybook.demo.sweden")}),e.jsx(t.Option,{value:"dk",children:o("storybook.demo.denmark")})]})]})}},m={render:function(){const o=n();return e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.preferredLanguage")}),e.jsx(s.Description,{children:o("storybook.demo.languageDescription")}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),e.jsx(t.Option,{value:"nb",children:o("storybook.demo.norwegianBokmal")}),e.jsx(t.Option,{value:"nn",children:o("storybook.demo.norwegianNynorsk")}),e.jsx(t.Option,{value:"en",children:o("storybook.demo.english")})]})]})}},b={render:function(){const o=n();return e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.category")}),e.jsxs(t,{"aria-invalid":"true",children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),e.jsx(t.Option,{value:"lokaler",children:o("storybook.demo.venuesAndCourts")}),e.jsx(t.Option,{value:"utstyr",children:o("storybook.demo.equipmentAndInventory")})]}),e.jsx(ee,{children:o("storybook.demo.pleaseSelectCategory")})]})}},y={render:function(){const o=n();return e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.status")}),e.jsx(t,{disabled:!0,children:e.jsx(t.Option,{value:"active",children:o("platform.status.active")})})]})}},S={render:function(){const o=n();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.small")}),e.jsxs(t,{"data-size":"sm",children:[e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]}),e.jsxs(t.Option,{value:"2",children:[o("storybook.demo.option")," 2"]})]})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.medium")}),e.jsxs(t,{"data-size":"md",children:[e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]}),e.jsxs(t.Option,{value:"2",children:[o("storybook.demo.option")," 2"]})]})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.large")}),e.jsxs(t,{"data-size":"lg",children:[e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]}),e.jsxs(t.Option,{value:"2",children:[o("storybook.demo.option")," 2"]})]})]})]})}},a={render:function(){const o=n();return e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.country")}),e.jsx(t,{readOnly:!0,value:"no",children:e.jsx(t.Option,{value:"no",children:o("storybook.demo.norway")})})]})}},d={render:function(){const o=n();return e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.selectPark")}),e.jsxs(t,{children:[e.jsxs(t.Optgroup,{label:o("storybook.demo.grunerlokka"),children:[e.jsx(t.Option,{value:"sofienbergparken",children:o("storybook.demo.sofienbergPark")}),e.jsx(t.Option,{value:"birkelunden",children:o("storybook.demo.birkelunden")}),e.jsx(t.Option,{value:"olafryesplass",children:o("storybook.demo.olafRyesPlass")})]}),e.jsxs(t.Optgroup,{label:o("storybook.demo.cityCentre"),children:[e.jsx(t.Option,{value:"slottsparken",children:o("storybook.demo.palacePark")}),e.jsx(t.Option,{value:"studenterlunden",children:o("storybook.demo.studenterlunden")})]}),e.jsxs(t.Optgroup,{label:o("storybook.demo.oldOslo"),children:[e.jsx(t.Option,{value:"botsparken",children:o("storybook.demo.botsparken")}),e.jsx(t.Option,{value:"klosterenga",children:o("storybook.demo.klosterengaPark")})]})]})]})}},c={render:function(){const o=n(),[l,oe]=k.useState(""),[te,se]=k.useState("");return e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)",maxWidth:"400px"},children:[e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.country")}),e.jsx(s.Description,{children:o("storybook.demo.selectCountryOfResidence")}),e.jsxs(t,{value:l,onChange:h=>oe(h.target.value),children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),e.jsx(t.Option,{value:"no",children:o("storybook.demo.norway")}),e.jsx(t.Option,{value:"se",children:o("storybook.demo.sweden")}),e.jsx(t.Option,{value:"dk",children:o("storybook.demo.denmark")}),e.jsx(t.Option,{value:"fi",children:o("storybook.demo.finland")})]})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.city")}),e.jsxs(t,{value:te,onChange:h=>se(h.target.value),disabled:!l,children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),l==="no"&&e.jsxs(e.Fragment,{children:[e.jsx(t.Option,{value:"oslo",children:o("storybook.demo.oslo")}),e.jsx(t.Option,{value:"bergen",children:o("storybook.demo.bergen")}),e.jsx(t.Option,{value:"trondheim",children:o("storybook.demo.trondheim")})]}),l==="se"&&e.jsxs(e.Fragment,{children:[e.jsx(t.Option,{value:"stockholm",children:o("storybook.demo.stockholm")}),e.jsx(t.Option,{value:"gothenburg",children:o("storybook.demo.gothenburg")})]})]}),!l&&e.jsx(s.Description,{children:o("storybook.demo.selectCountryFirst")})]})]})}},p={render:function(){const o=n();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.states")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.story.default")}),e.jsxs(t,{children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]}),e.jsxs(t.Option,{value:"2",children:[o("storybook.demo.option")," 2"]})]})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.story.withError")}),e.jsxs(t,{"aria-invalid":"true",children:[e.jsx(t.Option,{value:"",children:o("storybook.demo.choose")}),e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]})]}),e.jsx(ee,{children:o("storybook.demo.pleaseSelectOption")})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.story.disabled")}),e.jsx(t,{disabled:!0,children:e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]})})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.story.readOnly")}),e.jsx(t,{readOnly:!0,value:"1",children:e.jsx(t.Option,{value:"1",children:o("storybook.demo.selectedOption")})})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.sizes")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.small")}),e.jsx(t,{"data-size":"sm",children:e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]})})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.medium")}),e.jsx(t,{"data-size":"md",children:e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]})})]}),e.jsxs(s,{children:[e.jsx(r,{children:o("storybook.demo.large")}),e.jsx(t,{"data-size":"lg",children:e.jsxs(t.Option,{value:"1",children:[o("storybook.demo.option")," 1"]})})]})]})]})]})}};var O,v,x;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.selectCountry')}</Label>
        <Select>
          <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
          <Select.Option value="no">{t('storybook.demo.norway')}</Select.Option>
          <Select.Option value="se">{t('storybook.demo.sweden')}</Select.Option>
          <Select.Option value="dk">{t('storybook.demo.denmark')}</Select.Option>
        </Select>
      </Field>;
  }
}`,...(x=(v=u.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var g,j,f;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.preferredLanguage')}</Label>
        <Field.Description>{t('storybook.demo.languageDescription')}</Field.Description>
        <Select>
          <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
          <Select.Option value="nb">{t('storybook.demo.norwegianBokmal')}</Select.Option>
          <Select.Option value="nn">{t('storybook.demo.norwegianNynorsk')}</Select.Option>
          <Select.Option value="en">{t('storybook.demo.english')}</Select.Option>
        </Select>
      </Field>;
  }
}`,...(f=(j=m.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};var F,L,D;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.category')}</Label>
        <Select aria-invalid="true">
          <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
          <Select.Option value="lokaler">{t('storybook.demo.venuesAndCourts')}</Select.Option>
          <Select.Option value="utstyr">{t('storybook.demo.equipmentAndInventory')}</Select.Option>
        </Select>
        <ValidationMessage>{t('storybook.demo.pleaseSelectCategory')}</ValidationMessage>
      </Field>;
  }
}`,...(D=(L=b.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var w,C,R;y.parameters={...y.parameters,docs:{...(w=y.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.status')}</Label>
        <Select disabled>
          <Select.Option value="active">{t('platform.status.active')}</Select.Option>
        </Select>
      </Field>;
  }
}`,...(R=(C=y.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var z,A,P;S.parameters={...S.parameters,docs:{...(z=S.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Field>
          <Label>{t('storybook.demo.small')}</Label>
          <Select data-size="sm">
            <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
            <Select.Option value="2">{t('storybook.demo.option')} 2</Select.Option>
          </Select>
        </Field>
        <Field>
          <Label>{t('storybook.demo.medium')}</Label>
          <Select data-size="md">
            <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
            <Select.Option value="2">{t('storybook.demo.option')} 2</Select.Option>
          </Select>
        </Field>
        <Field>
          <Label>{t('storybook.demo.large')}</Label>
          <Select data-size="lg">
            <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
            <Select.Option value="2">{t('storybook.demo.option')} 2</Select.Option>
          </Select>
        </Field>
      </div>;
  }
}`,...(P=(A=S.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var E,M,T,V,W;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.country')}</Label>
        <Select readOnly value="no">
          <Select.Option value="no">{t('storybook.demo.norway')}</Select.Option>
        </Select>
      </Field>;
  }
}`,...(T=(M=a.parameters)==null?void 0:M.docs)==null?void 0:T.source},description:{story:"Read-only select - Show preselected value without editing",...(W=(V=a.parameters)==null?void 0:V.docs)==null?void 0:W.description}}};var q,B,N,U,I;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Field>
        <Label>{t('storybook.demo.selectPark')}</Label>
        <Select>
          <Select.Optgroup label={t('storybook.demo.grunerlokka')}>
            <Select.Option value="sofienbergparken">
              {t('storybook.demo.sofienbergPark')}
            </Select.Option>
            <Select.Option value="birkelunden">{t('storybook.demo.birkelunden')}</Select.Option>
            <Select.Option value="olafryesplass">{t('storybook.demo.olafRyesPlass')}</Select.Option>
          </Select.Optgroup>
          <Select.Optgroup label={t('storybook.demo.cityCentre')}>
            <Select.Option value="slottsparken">{t('storybook.demo.palacePark')}</Select.Option>
            <Select.Option value="studenterlunden">
              {t('storybook.demo.studenterlunden')}
            </Select.Option>
          </Select.Optgroup>
          <Select.Optgroup label={t('storybook.demo.oldOslo')}>
            <Select.Option value="botsparken">{t('storybook.demo.botsparken')}</Select.Option>
            <Select.Option value="klosterenga">{t('storybook.demo.klosterengaPark')}</Select.Option>
          </Select.Optgroup>
        </Select>
      </Field>;
  }
}`,...(N=(B=d.parameters)==null?void 0:B.docs)==null?void 0:N.source},description:{story:"Option groups - Organize options into categories",...(I=(U=d.parameters)==null?void 0:U.docs)==null?void 0:I.description}}};var G,H,K,_,J;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    return <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)',
      maxWidth: '400px'
    }}>
        <Field>
          <Label>{t('storybook.demo.country')}</Label>
          <Field.Description>{t('storybook.demo.selectCountryOfResidence')}</Field.Description>
          <Select value={country} onChange={e => setCountry(e.target.value)}>
            <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
            <Select.Option value="no">{t('storybook.demo.norway')}</Select.Option>
            <Select.Option value="se">{t('storybook.demo.sweden')}</Select.Option>
            <Select.Option value="dk">{t('storybook.demo.denmark')}</Select.Option>
            <Select.Option value="fi">{t('storybook.demo.finland')}</Select.Option>
          </Select>
        </Field>

        <Field>
          <Label>{t('storybook.demo.city')}</Label>
          <Select value={city} onChange={e => setCity(e.target.value)} disabled={!country}>
            <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
            {country === 'no' && <>
                <Select.Option value="oslo">{t('storybook.demo.oslo')}</Select.Option>
                <Select.Option value="bergen">{t('storybook.demo.bergen')}</Select.Option>
                <Select.Option value="trondheim">{t('storybook.demo.trondheim')}</Select.Option>
              </>}
            {country === 'se' && <>
                <Select.Option value="stockholm">{t('storybook.demo.stockholm')}</Select.Option>
                <Select.Option value="gothenburg">{t('storybook.demo.gothenburg')}</Select.Option>
              </>}
          </Select>
          {!country && <Field.Description>{t('storybook.demo.selectCountryFirst')}</Field.Description>}
        </Field>
      </form>;
  }
}`,...(K=(H=c.parameters)==null?void 0:H.docs)==null?void 0:K.source},description:{story:"Multiple selects in a form",...(J=(_=c.parameters)==null?void 0:_.docs)==null?void 0:J.description}}};var Q,X,Y,Z,$;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
            {t('storybook.story.states')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Field>
              <Label>{t('storybook.story.default')}</Label>
              <Select>
                <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
                <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
                <Select.Option value="2">{t('storybook.demo.option')} 2</Select.Option>
              </Select>
            </Field>
            <Field>
              <Label>{t('storybook.story.withError')}</Label>
              <Select aria-invalid="true">
                <Select.Option value="">{t('storybook.demo.choose')}</Select.Option>
                <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
              </Select>
              <ValidationMessage>{t('storybook.demo.pleaseSelectOption')}</ValidationMessage>
            </Field>
            <Field>
              <Label>{t('storybook.story.disabled')}</Label>
              <Select disabled>
                <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
              </Select>
            </Field>
            <Field>
              <Label>{t('storybook.story.readOnly')}</Label>
              <Select readOnly value="1">
                <Select.Option value="1">{t('storybook.demo.selectedOption')}</Select.Option>
              </Select>
            </Field>
          </div>
        </div>

        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.sizes')}
          </h3>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Field>
              <Label>{t('storybook.demo.small')}</Label>
              <Select data-size="sm">
                <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
              </Select>
            </Field>
            <Field>
              <Label>{t('storybook.demo.medium')}</Label>
              <Select data-size="md">
                <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
              </Select>
            </Field>
            <Field>
              <Label>{t('storybook.demo.large')}</Label>
              <Select data-size="lg">
                <Select.Option value="1">{t('storybook.demo.option')} 1</Select.Option>
              </Select>
            </Field>
          </div>
        </div>
      </div>;
  }
}`,...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"All variants overview",...($=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};const he=["Default","WithDescription","WithError","Disabled","Sizes","ReadOnly","OptionGroups","FormExample","AllVariants"];export{p as AllVariants,u as Default,y as Disabled,c as FormExample,d as OptionGroups,a as ReadOnly,S as Sizes,m as WithDescription,b as WithError,he as __namedExportsOrder,Se as default};
//# sourceMappingURL=Select.stories-DyM5n1Xj.js.map
