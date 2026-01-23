import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as f}from"./index-ClcD9ViR.js";import{C as a}from"./checkbox-CeN5g5X_.js";import"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import{V as pe}from"./index-Df4a1FH3.js";import{F as s}from"./radio-ER07BMpk.js";import{H as y}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const Te={title:"Components/Checkbox",component:a,parameters:{docs:{description:{component:`
Checkbox allows users to select one or more options. It can also be used in situations where the user needs to confirm something.

## Variants

- **Single confirmation** - Standalone checkbox for consent/confirmation
- **Grouped** - Multiple checkboxes in a fieldset
- **With description** - Additional context for each option
- **With error** - Validation errors on fieldset
- **Indeterminate** - Partially selected state (parent checkbox)
- **Read-only** - Non-editable but visible
- **Disabled** - Not interactive

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Multiple options can be selected simultaneously
- Toggle a single option on/off
- Accepting terms and conditions
- Confirming user is over age limit
- Selecting preferences or features
- Filtering content with multiple criteria

## Best Practices

### Do
- Use Fieldset with Legend for groups of checkboxes
- Sort options logically (alphabetically, by frequency, or importance)
- Provide clear, concise labels
- Use descriptions for additional context when needed
- Place error messages on Fieldset for groups
- Make labels clickable for larger hit area
- Use indeterminate state for parent checkboxes when some children are selected

### Don't
- **Never preselect consent checkboxes** (GDPR requirement)
- Don't use for mutually exclusive options (use Radio instead)
- Don't use read-only unless absolutely necessary (confusing UX)
- Don't use too many checkboxes (consider alternative UI)
- Don't make labels too long (keep under 60 characters)
- Don't disable without explanation

## Usage Patterns

### Single Confirmation
\`\`\`tsx
<Checkbox 
  label="I accept the terms and conditions" 
  value="accept"
  required
/>
\`\`\`

### Grouped Checkboxes
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select amenities</Fieldset.Legend>
  <Checkbox label="WiFi" value="wifi" />
  <Checkbox label="Parking" value="parking" />
  <Checkbox label="Kitchen" value="kitchen" />
</Fieldset>
\`\`\`

### With Error Validation
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Required selections</Fieldset.Legend>
  <Checkbox label="Option 1" value="opt1" />
  <Checkbox label="Option 2" value="opt2" />
  <ValidationMessage>Please select at least one option</ValidationMessage>
</Fieldset>
\`\`\`

### Indeterminate State
\`\`\`tsx
<Checkbox 
  label="Select all" 
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Preselected Consent
Never preselect checkboxes for consent, subscriptions, or data sharing. This violates GDPR and user trust.

### Anti-pattern: Using Checkbox for Single Choice
If only one option can be selected, use Radio buttons instead.

### Anti-pattern: Too Many Options
More than 10 checkboxes becomes overwhelming. Consider categorization or alternative UI.

### Anti-pattern: Unclear Labels
Labels like "Yes" or "Option 1" don't provide context. Be specific.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to next checkbox
- **Shift+Tab** moves focus to previous checkbox
- **Space** toggles checkbox state
- Arrow keys do NOT navigate between checkboxes (unlike Radio)

### Screen Readers
- Checkbox role is announced
- Label is read when focused
- Checked/unchecked state is announced
- Indeterminate state is announced as "mixed"
- Fieldset Legend provides group context
- Description text provides additional information

### WCAG 2.1 AA Compliance
- **Label**: Every checkbox must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for checkbox border
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px including label
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **Group labels**: Use Fieldset and Legend for related checkboxes

### Required Checkboxes
For consent or required selections:
\`\`\`tsx
<Checkbox 
  label="I accept the terms and conditions" 
  value="accept"
  required
  aria-required="true"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the checkbox"},readOnly:{control:"boolean",description:"Makes checkbox read-only"}}},b={render:()=>e.jsx(a,{label:"I accept the terms and conditions",value:"accept"})},g={render:()=>e.jsx(a,{label:"Subscribe to newsletter",value:"newsletter",description:"You can unsubscribe at any time"})},v={render:()=>e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Select amenities"}),e.jsx(a,{label:"WiFi",value:"wifi"}),e.jsx(a,{label:"Parking",value:"parking"}),e.jsx(a,{label:"Kitchen",value:"kitchen"}),e.jsx(a,{label:"Projector",value:"projector"})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[e.jsx(a,{label:"Disabled unchecked",value:"disabled1",disabled:!0}),e.jsx(a,{label:"Disabled checked",value:"disabled2",disabled:!0,defaultChecked:!0})]})},k={render:()=>e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Accept terms"}),e.jsx(a,{label:"I accept the terms",value:"terms","aria-invalid":"true"}),e.jsx(pe,{children:"You must accept the terms to continue"})]})},c={render:()=>e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Confirm you are over 18 years old"}),e.jsx(s.Description,{children:"To receive the information you are requesting, you must confirm that you are of legal age."}),e.jsx(a,{label:"I confirm that I am over 18 years old",value:"consent"})]})},d={render:()=>{const[t,o]=f.useState(["email"]),r=(i,n)=>{o(n?[...t,i]:t.filter(l=>l!==i))};return e.jsxs(s,{children:[e.jsx(s.Legend,{children:"How would you prefer us to contact you?"}),e.jsx(s.Description,{children:"Select all options that are relevant to you."}),e.jsx(a,{label:"Email",value:"email",checked:t.includes("email"),onChange:i=>r("email",i.target.checked)}),e.jsx(a,{label:"Phone",value:"phone",checked:t.includes("phone"),onChange:i=>r("phone",i.target.checked)}),e.jsx(a,{label:"SMS",value:"sms",checked:t.includes("sms"),onChange:i=>r("sms",i.target.checked)}),e.jsxs("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx("strong",{children:"Selected:"})," ",t.length>0?t.join(", "):"None"]})]})}},u={render:()=>{const[t,o]=f.useState(["email"]),[r,i]=f.useState("");f.useEffect(()=>{t.length<2?i("You must select at least two options"):i("")},[t]);const n=(l,me)=>{o(me?[...t,l]:t.filter(be=>be!==l))};return e.jsxs(s,{children:[e.jsx(s.Legend,{children:"How would you prefer us to contact you?"}),e.jsx(s.Description,{children:"Select all options that are relevant to you."}),e.jsx(a,{label:"Email",value:"email",checked:t.includes("email"),onChange:l=>n("email",l.target.checked),"aria-invalid":!!r}),e.jsx(a,{label:"Phone",value:"phone",checked:t.includes("phone"),onChange:l=>n("phone",l.target.checked),"aria-invalid":!!r}),e.jsx(a,{label:"SMS",value:"sms",checked:t.includes("sms"),onChange:l=>n("sms",l.target.checked),"aria-invalid":!!r}),r&&e.jsx(pe,{children:r})]})}},h={render:()=>e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Your selected preferences"}),e.jsx(s.Description,{children:"These preferences are set by your organization."}),e.jsx(a,{label:"Email notifications",value:"email",checked:!0,readOnly:!0}),e.jsx(a,{label:"Phone notifications",value:"phone",readOnly:!0}),e.jsx(a,{label:"SMS notifications",value:"sms",checked:!0,readOnly:!0})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:"Small checkbox",value:"sm","data-size":"sm"}),e.jsx(a,{label:"Medium checkbox",value:"md","data-size":"md"}),e.jsx(a,{label:"Large checkbox",value:"lg","data-size":"lg"})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(y,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"States"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Default",value:"default"}),e.jsx(a,{label:"Checked",value:"checked",defaultChecked:!0}),e.jsx(a,{label:"Disabled unchecked",value:"disabled1",disabled:!0}),e.jsx(a,{label:"Disabled checked",value:"disabled2",disabled:!0,defaultChecked:!0}),e.jsx(a,{label:"Read-only checked",value:"readonly",checked:!0,readOnly:!0})]})]}),e.jsxs("div",{children:[e.jsx(y,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Small",value:"sm","data-size":"sm"}),e.jsx(a,{label:"Medium",value:"md","data-size":"md"}),e.jsx(a,{label:"Large",value:"lg","data-size":"lg"})]})]}),e.jsxs("div",{children:[e.jsx(y,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Description"}),e.jsx(a,{label:"Subscribe to newsletter",value:"newsletter",description:"You can unsubscribe at any time"})]})]})};var C,S,j;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Checkbox label="I accept the terms and conditions" value="accept" />
}`,...(j=(S=b.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var F,D,w;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Checkbox label="Subscribe to newsletter" value="newsletter" description="You can unsubscribe at any time" />
}`,...(w=(D=g.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var L,z,M;v.parameters={...v.parameters,docs:{...(L=v.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Select amenities</Fieldset.Legend>
      <Checkbox label="WiFi" value="wifi" />
      <Checkbox label="Parking" value="parking" />
      <Checkbox label="Kitchen" value="kitchen" />
      <Checkbox label="Projector" value="projector" />
    </Fieldset>
}`,...(M=(z=v.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var P,A,I;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)'
  }}>
      <Checkbox label="Disabled unchecked" value="disabled1" disabled />
      <Checkbox label="Disabled checked" value="disabled2" disabled defaultChecked />
    </div>
}`,...(I=(A=x.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var E,R,O;k.parameters={...k.parameters,docs:{...(E=k.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Accept terms</Fieldset.Legend>
      <Checkbox label="I accept the terms" value="terms" aria-invalid="true" />
      <ValidationMessage>You must accept the terms to continue</ValidationMessage>
    </Fieldset>
}`,...(O=(R=k.parameters)==null?void 0:R.docs)==null?void 0:O.source}}};var V,W,T,H,U;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Confirm you are over 18 years old</Fieldset.Legend>
      <Fieldset.Description>
        To receive the information you are requesting, you must confirm that you are of legal age.
      </Fieldset.Description>
      <Checkbox label="I confirm that I am over 18 years old" value="consent" />
    </Fieldset>
}`,...(T=(W=c.parameters)==null?void 0:W.docs)==null?void 0:T.source},description:{story:"Single confirmation checkbox - For consent or age verification",...(U=(H=c.parameters)==null?void 0:H.docs)==null?void 0:U.description}}};var Y,q,G,N,B;d.parameters={...d.parameters,docs:{...(Y=d.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email']);
    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter(v => v !== value));
      }
    };
    return <Fieldset>
        <Fieldset.Legend>How would you prefer us to contact you?</Fieldset.Legend>
        <Fieldset.Description>Select all options that are relevant to you.</Fieldset.Description>
        <Checkbox label="Email" value="email" checked={selected.includes('email')} onChange={e => handleChange('email', e.target.checked)} />
        <Checkbox label="Phone" value="phone" checked={selected.includes('phone')} onChange={e => handleChange('phone', e.target.checked)} />
        <Checkbox label="SMS" value="sms" checked={selected.includes('sms')} onChange={e => handleChange('sms', e.target.checked)} />
        <div style={{
        marginTop: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <strong>Selected:</strong> {selected.length > 0 ? selected.join(', ') : 'None'}
        </div>
      </Fieldset>;
  }
}`,...(G=(q=d.parameters)==null?void 0:q.docs)==null?void 0:G.source},description:{story:"Interactive checkbox group with state management",...(B=(N=d.parameters)==null?void 0:N.docs)==null?void 0:B.description}}};var K,_,X,J,Q;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email']);
    const [error, setError] = useState('');
    useEffect(() => {
      if (selected.length < 2) {
        setError('You must select at least two options');
      } else {
        setError('');
      }
    }, [selected]);
    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter(v => v !== value));
      }
    };
    return <Fieldset>
        <Fieldset.Legend>How would you prefer us to contact you?</Fieldset.Legend>
        <Fieldset.Description>Select all options that are relevant to you.</Fieldset.Description>
        <Checkbox label="Email" value="email" checked={selected.includes('email')} onChange={e => handleChange('email', e.target.checked)} aria-invalid={!!error} />
        <Checkbox label="Phone" value="phone" checked={selected.includes('phone')} onChange={e => handleChange('phone', e.target.checked)} aria-invalid={!!error} />
        <Checkbox label="SMS" value="sms" checked={selected.includes('sms')} onChange={e => handleChange('sms', e.target.checked)} aria-invalid={!!error} />
        {error && <ValidationMessage>{error}</ValidationMessage>}
      </Fieldset>;
  }
}`,...(X=(_=u.parameters)==null?void 0:_.docs)==null?void 0:X.source},description:{story:"Checkbox group with validation",...(Q=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};var Z,$,ee,ae,se;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Your selected preferences</Fieldset.Legend>
      <Fieldset.Description>These preferences are set by your organization.</Fieldset.Description>
      <Checkbox label="Email notifications" value="email" checked readOnly />
      <Checkbox label="Phone notifications" value="phone" readOnly />
      <Checkbox label="SMS notifications" value="sms" checked readOnly />
    </Fieldset>
}`,...(ee=($=h.parameters)==null?void 0:$.docs)==null?void 0:ee.source},description:{story:"Read-only checkboxes - Avoid when possible",...(se=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:se.description}}};var te,ie,le,re,oe;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Checkbox label="Small checkbox" value="sm" data-size="sm" />
      <Checkbox label="Medium checkbox" value="md" data-size="md" />
      <Checkbox label="Large checkbox" value="lg" data-size="lg" />
    </div>
}`,...(le=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:le.source},description:{story:"Size variants",...(oe=(re=p.parameters)==null?void 0:re.docs)==null?void 0:oe.description}}};var ne,ce,de,ue,he;m.parameters={...m.parameters,docs:{...(ne=m.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          States
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Checkbox label="Default" value="default" />
          <Checkbox label="Checked" value="checked" defaultChecked />
          <Checkbox label="Disabled unchecked" value="disabled1" disabled />
          <Checkbox label="Disabled checked" value="disabled2" disabled defaultChecked />
          <Checkbox label="Read-only checked" value="readonly" checked readOnly />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Sizes
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Checkbox label="Small" value="sm" data-size="sm" />
          <Checkbox label="Medium" value="md" data-size="md" />
          <Checkbox label="Large" value="lg" data-size="lg" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          With Description
        </Heading>
        <Checkbox label="Subscribe to newsletter" value="newsletter" description="You can unsubscribe at any time" />
      </div>
    </div>
}`,...(de=(ce=m.parameters)==null?void 0:ce.docs)==null?void 0:de.source},description:{story:"All variants overview",...(he=(ue=m.parameters)==null?void 0:ue.docs)==null?void 0:he.description}}};const He=["Default","WithDescription","CheckboxGroup","Disabled","WithError","SingleConfirmation","InteractiveGroup","WithValidation","ReadOnly","Sizes","AllVariants"];export{m as AllVariants,v as CheckboxGroup,b as Default,x as Disabled,d as InteractiveGroup,h as ReadOnly,c as SingleConfirmation,p as Sizes,g as WithDescription,k as WithError,u as WithValidation,He as __namedExportsOrder,Te as default};
//# sourceMappingURL=Checkbox.stories-CRGBr28O.js.map
