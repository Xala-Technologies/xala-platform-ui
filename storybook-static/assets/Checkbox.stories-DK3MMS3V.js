import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as j}from"./index-ClcD9ViR.js";import{u as i}from"./index-bjNF47ar.js";import{C as t}from"./checkbox-CeN5g5X_.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import{V as ke}from"./index-Df4a1FH3.js";import{F as s}from"./radio-ER07BMpk.js";import{H as S}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const Ge={title:"Components/Checkbox",component:t,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the checkbox"},readOnly:{control:"boolean",description:"Makes checkbox read-only"}}},y={render:function(){const o=i();return e.jsx(t,{label:o("storybook.demo.acceptTermsAndConditions"),value:"accept"})}},v={render:function(){const o=i();return e.jsx(t,{label:o("storybook.demo.subscribeToNewsletter"),value:"newsletter",description:o("storybook.demo.unsubscribeAnytime")})}},x={render:function(){const o=i();return e.jsxs(s,{children:[e.jsx(s.Legend,{children:o("storybook.demo.selectAmenities")}),e.jsx(t,{label:o("storybook.demo.wifi"),value:"wifi"}),e.jsx(t,{label:o("storybook.demo.parking"),value:"parking"}),e.jsx(t,{label:o("storybook.demo.kitchen"),value:"kitchen"}),e.jsx(t,{label:o("storybook.demo.projector"),value:"projector"})]})}},f={render:function(){const o=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[e.jsx(t,{label:o("storybook.demo.disabledUnchecked"),value:"disabled1",disabled:!0}),e.jsx(t,{label:o("storybook.demo.disabledChecked"),value:"disabled2",disabled:!0,defaultChecked:!0})]})}},C={render:function(){const o=i();return e.jsxs(s,{children:[e.jsx(s.Legend,{children:o("storybook.demo.acceptTerms")}),e.jsx(t,{label:o("storybook.demo.iAcceptTheTerms"),value:"terms","aria-invalid":"true"}),e.jsx(ke,{children:o("storybook.demo.mustAcceptTermsToContinue")})]})}},b={render:function(){const o=i();return e.jsxs(s,{children:[e.jsx(s.Legend,{children:o("storybook.demo.confirmOver18")}),e.jsx(s.Description,{children:o("storybook.demo.legalAgeRequirement")}),e.jsx(t,{label:o("storybook.demo.iConfirmOver18"),value:"consent"})]})}},u={render:function(){const o=i(),[r,c]=j.useState(["email"]),d=(a,m)=>{c(m?[...r,a]:r.filter(l=>l!==a))};return e.jsxs(s,{children:[e.jsx(s.Legend,{children:o("storybook.demo.preferredContactMethod")}),e.jsx(s.Description,{children:o("storybook.demo.selectAllRelevantOptions")}),e.jsx(t,{label:o("storybook.demo.email"),value:"email",checked:r.includes("email"),onChange:a=>d("email",a.target.checked)}),e.jsx(t,{label:o("storybook.demo.phone"),value:"phone",checked:r.includes("phone"),onChange:a=>d("phone",a.target.checked)}),e.jsx(t,{label:o("storybook.demo.sms"),value:"sms",checked:r.includes("sms"),onChange:a=>d("sms",a.target.checked)}),e.jsxs("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("strong",{children:[o("storybook.demo.selected"),":"]})," ",r.length>0?r.join(", "):o("storybook.demo.none")]})]})}},p={render:function(){const o=i(),[r,c]=j.useState(["email"]),[d,a]=j.useState("");j.useEffect(()=>{r.length<2?a(o("storybook.demo.selectAtLeastTwo")):a("")},[r,o]);const m=(l,ge)=>{c(ge?[...r,l]:r.filter(ye=>ye!==l))};return e.jsxs(s,{children:[e.jsx(s.Legend,{children:o("storybook.demo.preferredContactMethod")}),e.jsx(s.Description,{children:o("storybook.demo.selectAllRelevantOptions")}),e.jsx(t,{label:o("storybook.demo.email"),value:"email",checked:r.includes("email"),onChange:l=>m("email",l.target.checked),"aria-invalid":!!d}),e.jsx(t,{label:o("storybook.demo.phone"),value:"phone",checked:r.includes("phone"),onChange:l=>m("phone",l.target.checked),"aria-invalid":!!d}),e.jsx(t,{label:o("storybook.demo.sms"),value:"sms",checked:r.includes("sms"),onChange:l=>m("sms",l.target.checked),"aria-invalid":!!d}),d&&e.jsx(ke,{children:d})]})}},h={render:function(){const o=i();return e.jsxs(s,{children:[e.jsx(s.Legend,{children:o("storybook.demo.yourSelectedPreferences")}),e.jsx(s.Description,{children:o("storybook.demo.preferencesSetByOrganization")}),e.jsx(t,{label:o("storybook.demo.emailNotifications"),value:"email",checked:!0,readOnly:!0}),e.jsx(t,{label:o("storybook.demo.phoneNotifications"),value:"phone",readOnly:!0}),e.jsx(t,{label:o("storybook.demo.smsNotifications"),value:"sms",checked:!0,readOnly:!0})]})}},k={render:function(){const o=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:o("storybook.demo.smallCheckbox"),value:"sm","data-size":"sm"}),e.jsx(t,{label:o("storybook.demo.mediumCheckbox"),value:"md","data-size":"md"}),e.jsx(t,{label:o("storybook.demo.largeCheckbox"),value:"lg","data-size":"lg"})]})}},g={render:function(){const o=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(S,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.states")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{label:o("storybook.story.default"),value:"default"}),e.jsx(t,{label:o("storybook.demo.checked"),value:"checked",defaultChecked:!0}),e.jsx(t,{label:o("storybook.demo.disabledUnchecked"),value:"disabled1",disabled:!0}),e.jsx(t,{label:o("storybook.demo.disabledChecked"),value:"disabled2",disabled:!0,defaultChecked:!0}),e.jsx(t,{label:o("storybook.demo.readOnlyChecked"),value:"readonly",checked:!0,readOnly:!0})]})]}),e.jsxs("div",{children:[e.jsx(S,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.sizes")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{label:o("storybook.story.small"),value:"sm","data-size":"sm"}),e.jsx(t,{label:o("storybook.story.medium"),value:"md","data-size":"md"}),e.jsx(t,{label:o("storybook.story.large"),value:"lg","data-size":"lg"})]})]}),e.jsxs("div",{children:[e.jsx(S,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.withDescription")}),e.jsx(t,{label:o("storybook.demo.subscribeToNewsletter"),value:"newsletter",description:o("storybook.demo.unsubscribeAnytime")})]})]})}};var F,R,D;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Checkbox label={t('storybook.demo.acceptTermsAndConditions')} value="accept" />;
  }
}`,...(D=(R=y.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var T,A,w;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Checkbox label={t('storybook.demo.subscribeToNewsletter')} value="newsletter" description={t('storybook.demo.unsubscribeAnytime')} />;
  }
}`,...(w=(A=v.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var L,z,O;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectAmenities')}</Fieldset.Legend>
        <Checkbox label={t('storybook.demo.wifi')} value="wifi" />
        <Checkbox label={t('storybook.demo.parking')} value="parking" />
        <Checkbox label={t('storybook.demo.kitchen')} value="kitchen" />
        <Checkbox label={t('storybook.demo.projector')} value="projector" />
      </Fieldset>;
  }
}`,...(O=(z=x.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var M,N,V;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-2)'
    }}>
        <Checkbox label={t('storybook.demo.disabledUnchecked')} value="disabled1" disabled />
        <Checkbox label={t('storybook.demo.disabledChecked')} value="disabled2" disabled defaultChecked />
      </div>;
  }
}`,...(V=(N=f.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var U,P,E;C.parameters={...C.parameters,docs:{...(U=C.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.acceptTerms')}</Fieldset.Legend>
        <Checkbox label={t('storybook.demo.iAcceptTheTerms')} value="terms" aria-invalid="true" />
        <ValidationMessage>{t('storybook.demo.mustAcceptTermsToContinue')}</ValidationMessage>
      </Fieldset>;
  }
}`,...(E=(P=C.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var I,W,q,B,G;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.confirmOver18')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.legalAgeRequirement')}</Fieldset.Description>
        <Checkbox label={t('storybook.demo.iConfirmOver18')} value="consent" />
      </Fieldset>;
  }
}`,...(q=(W=b.parameters)==null?void 0:W.docs)==null?void 0:q.source},description:{story:"Single confirmation checkbox - For consent or age verification",...(G=(B=b.parameters)==null?void 0:B.docs)==null?void 0:G.description}}};var H,K,_,X,Y;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<string[]>(['email']);
    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter(v => v !== value));
      }
    };
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.preferredContactMethod')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.selectAllRelevantOptions')}</Fieldset.Description>
        <Checkbox label={t('storybook.demo.email')} value="email" checked={selected.includes('email')} onChange={e => handleChange('email', e.target.checked)} />
        <Checkbox label={t('storybook.demo.phone')} value="phone" checked={selected.includes('phone')} onChange={e => handleChange('phone', e.target.checked)} />
        <Checkbox label={t('storybook.demo.sms')} value="sms" checked={selected.includes('sms')} onChange={e => handleChange('sms', e.target.checked)} />
        <div style={{
        marginTop: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <strong>{t('storybook.demo.selected')}:</strong>{' '}
          {selected.length > 0 ? selected.join(', ') : t('storybook.demo.none')}
        </div>
      </Fieldset>;
  }
}`,...(_=(K=u.parameters)==null?void 0:K.docs)==null?void 0:_.source},description:{story:"Interactive checkbox group with state management",...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var J,Q,Z,$,ee;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<string[]>(['email']);
    const [error, setError] = useState('');
    useEffect(() => {
      if (selected.length < 2) {
        setError(t('storybook.demo.selectAtLeastTwo'));
      } else {
        setError('');
      }
    }, [selected, t]);
    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter(v => v !== value));
      }
    };
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.preferredContactMethod')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.selectAllRelevantOptions')}</Fieldset.Description>
        <Checkbox label={t('storybook.demo.email')} value="email" checked={selected.includes('email')} onChange={e => handleChange('email', e.target.checked)} aria-invalid={!!error} />
        <Checkbox label={t('storybook.demo.phone')} value="phone" checked={selected.includes('phone')} onChange={e => handleChange('phone', e.target.checked)} aria-invalid={!!error} />
        <Checkbox label={t('storybook.demo.sms')} value="sms" checked={selected.includes('sms')} onChange={e => handleChange('sms', e.target.checked)} aria-invalid={!!error} />
        {error && <ValidationMessage>{error}</ValidationMessage>}
      </Fieldset>;
  }
}`,...(Z=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:Z.source},description:{story:"Checkbox group with validation",...(ee=($=p.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};var oe,te,se,re,ae;h.parameters={...h.parameters,docs:{...(oe=h.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.yourSelectedPreferences')}</Fieldset.Legend>
        <Fieldset.Description>
          {t('storybook.demo.preferencesSetByOrganization')}
        </Fieldset.Description>
        <Checkbox label={t('storybook.demo.emailNotifications')} value="email" checked readOnly />
        <Checkbox label={t('storybook.demo.phoneNotifications')} value="phone" readOnly />
        <Checkbox label={t('storybook.demo.smsNotifications')} value="sms" checked readOnly />
      </Fieldset>;
  }
}`,...(se=(te=h.parameters)==null?void 0:te.docs)==null?void 0:se.source},description:{story:"Read-only checkboxes - Avoid when possible",...(ae=(re=h.parameters)==null?void 0:re.docs)==null?void 0:ae.description}}};var ie,ne,le,de,ce;k.parameters={...k.parameters,docs:{...(ie=k.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Checkbox label={t('storybook.demo.smallCheckbox')} value="sm" data-size="sm" />
        <Checkbox label={t('storybook.demo.mediumCheckbox')} value="md" data-size="md" />
        <Checkbox label={t('storybook.demo.largeCheckbox')} value="lg" data-size="lg" />
      </div>;
  }
}`,...(le=(ne=k.parameters)==null?void 0:ne.docs)==null?void 0:le.source},description:{story:"Size variants",...(ce=(de=k.parameters)==null?void 0:de.docs)==null?void 0:ce.description}}};var me,be,ue,pe,he;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.states')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Checkbox label={t('storybook.story.default')} value="default" />
            <Checkbox label={t('storybook.demo.checked')} value="checked" defaultChecked />
            <Checkbox label={t('storybook.demo.disabledUnchecked')} value="disabled1" disabled />
            <Checkbox label={t('storybook.demo.disabledChecked')} value="disabled2" disabled defaultChecked />
            <Checkbox label={t('storybook.demo.readOnlyChecked')} value="readonly" checked readOnly />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.sizes')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Checkbox label={t('storybook.story.small')} value="sm" data-size="sm" />
            <Checkbox label={t('storybook.story.medium')} value="md" data-size="md" />
            <Checkbox label={t('storybook.story.large')} value="lg" data-size="lg" />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.withDescription')}
          </Heading>
          <Checkbox label={t('storybook.demo.subscribeToNewsletter')} value="newsletter" description={t('storybook.demo.unsubscribeAnytime')} />
        </div>
      </div>;
  }
}`,...(ue=(be=g.parameters)==null?void 0:be.docs)==null?void 0:ue.source},description:{story:"All variants overview",...(he=(pe=g.parameters)==null?void 0:pe.docs)==null?void 0:he.description}}};const He=["Default","WithDescription","CheckboxGroup","Disabled","WithError","SingleConfirmation","InteractiveGroup","WithValidation","ReadOnly","Sizes","AllVariants"];export{g as AllVariants,x as CheckboxGroup,y as Default,f as Disabled,u as InteractiveGroup,h as ReadOnly,b as SingleConfirmation,k as Sizes,v as WithDescription,C as WithError,p as WithValidation,He as __namedExportsOrder,Ge as default};
//# sourceMappingURL=Checkbox.stories-DK3MMS3V.js.map
