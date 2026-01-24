import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as _}from"./index-ClcD9ViR.js";import{u as s}from"./index-bjNF47ar.js";import{R as t,F as a}from"./radio-ER07BMpk.js";import{H as n}from"./heading-mzc2R_Ff.js";import{V as J}from"./index-Df4a1FH3.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./paragraph-DDCpJsVw.js";import"./label-9E-twYNb.js";import"./input-CMu9MsIQ.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";const ce={title:"Components/Radio",component:t,parameters:{docs:{description:{component:`
A Radio is an option the user can select. Use multiple Radio to show a list of options. Users can switch between the options, but can only select one.

## Variants

- **Vertical group** - Default stacked layout (recommended)
- **Horizontal group** - Side-by-side layout for 2-3 short options
- **With descriptions** - Additional context for each option
- **With error** - Validation errors on fieldset
- **Disabled** - Unavailable options
- **Read-only** - Non-editable but visible

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- User must select exactly one option from a list
- Options are mutually exclusive
- Small number of options (2-7 options)
- All options should be visible at once
- Use Select component for 8+ options
- Use Checkbox for multiple selections

## Best Practices

### Do
- Always use Fieldset with Legend to group related radios
- Use Legend to ask the question or describe the choice
- Sort options logically (alphabetically, by frequency, or importance)
- Use descriptions to clarify complex options
- Place vertically for easier scanning and accessibility
- Provide clear, concise labels for each option
- Make the entire label clickable for larger hit area

### Don't
- Don't use for multiple selections (use Checkbox instead)
- Don't use horizontal layout for more than 3 options
- Don't make labels too long (keep under 60 characters)
- Avoid pre-selecting options unless there's a clear default
- Don't use radio buttons for binary choices (use Switch instead)
- Don't disable without providing explanation

## Usage Patterns

### Basic Radio Group
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select time slot</Fieldset.Legend>
  <Radio label="Morning (08:00 - 12:00)" name="time" value="morning" />
  <Radio label="Afternoon (12:00 - 16:00)" name="time" value="afternoon" />
  <Radio label="Evening (16:00 - 20:00)" name="time" value="evening" />
</Fieldset>
\`\`\`

### With Descriptions
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select plan</Fieldset.Legend>
  <Radio
    label="Basic"
    name="plan"
    value="basic"
    description="Up to 5 bookings per month"
  />
  <Radio
    label="Pro"
    name="plan"
    value="pro"
    description="Unlimited bookings, priority support"
  />
</Fieldset>
\`\`\`

### With Error Validation
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select a category</Fieldset.Legend>
  <Radio label="Option 1" name="category" value="opt1" aria-invalid="true" />
  <Radio label="Option 2" name="category" value="opt2" aria-invalid="true" />
  <ValidationMessage>Please select a category</ValidationMessage>
</Fieldset>
\`\`\`

### Horizontal Layout (2-3 options only)
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Payment method</Fieldset.Legend>
  <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
    <Radio label="Card" name="payment" value="card" />
    <Radio label="Invoice" name="payment" value="invoice" />
  </div>
</Fieldset>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using Radio for Multiple Selections
If users can select more than one option, use Checkbox instead.

### Anti-pattern: Too Many Options Horizontally
Horizontal layout with 4+ options is hard to scan and not mobile-friendly.

### Anti-pattern: No Fieldset/Legend
Radio groups without Fieldset and Legend lack context for screen readers.

### Anti-pattern: Unclear Labels
Labels like "Option 1", "Choice A" don't provide meaningful information.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus into the radio group
- **Arrow keys** (Up/Down/Left/Right) navigate between radio options
- **Space** selects the focused radio option
- **Shift+Tab** moves focus out of the group

### Screen Readers
- Radio role is announced
- Label is read when focused
- Selected/unselected state is announced
- Fieldset Legend provides group context
- Description text provides additional information
- Total number of options in group is announced

### WCAG 2.1 AA Compliance
- **Label**: Every radio must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for radio border
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px including label
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **Group labels**: Use Fieldset and Legend for related radios
- **Keyboard navigation**: Arrow keys must navigate within group

### Required Radio Groups
For required selections:
\`\`\`tsx
<Fieldset required>
  <Fieldset.Legend>Select shipping method (required)</Fieldset.Legend>
  <Radio label="Standard" name="shipping" value="standard" required />
  <Radio label="Express" name="shipping" value="express" required />
</Fieldset>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the radio"},name:{control:"text",description:"Name attribute for radio group (required)"}}},p={render:function(){const o=s();return e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.selectTimeSlot")}),e.jsx(t,{label:o("storybook.demo.morning"),name:"time",value:"morning"}),e.jsx(t,{label:o("storybook.demo.afternoon"),name:"time",value:"afternoon"}),e.jsx(t,{label:o("storybook.demo.evening"),name:"time",value:"evening"})]})}},u={render:function(){const o=s();return e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.selectPlan")}),e.jsx(t,{label:o("storybook.demo.basic"),name:"plan",value:"basic",description:o("storybook.demo.basicPlanDescription")}),e.jsx(t,{label:o("storybook.demo.pro"),name:"plan",value:"pro",description:o("storybook.demo.proPlanDescription")}),e.jsx(t,{label:o("storybook.demo.enterprise"),name:"plan",value:"enterprise",description:o("storybook.demo.enterprisePlanDescription")})]})}},b={render:function(){const o=s();return e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.paymentMethod")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:o("storybook.demo.card"),name:"payment",value:"card"}),e.jsx(t,{label:o("storybook.demo.invoice"),name:"payment",value:"invoice"}),e.jsx(t,{label:o("storybook.demo.vipps"),name:"payment",value:"vipps"})]})]})}},v={render:function(){const o=s();return e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.status")}),e.jsx(t,{label:o("platform.status.active"),name:"status",value:"active",defaultChecked:!0}),e.jsx(t,{label:o("storybook.demo.inactiveUnavailable"),name:"status",value:"inactive",disabled:!0})]})}},y={render:function(){const o=s();return e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.selectCategory")}),e.jsx(t,{label:o("storybook.demo.venues"),name:"category",value:"lokaler","aria-invalid":"true"}),e.jsx(t,{label:o("storybook.demo.equipment"),name:"category",value:"utstyr","aria-invalid":"true"}),e.jsx(J,{children:o("storybook.demo.mustSelectCategory")})]})}},l={render:function(){const o=s(),[m,g]=_.useState("email");return e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.howToContactYou")}),e.jsx(a.Description,{children:o("storybook.demo.contactMethodDescription")}),e.jsx(t,{label:o("storybook.demo.email"),description:o("storybook.demo.emailContactDescription"),value:"email",name:"contact",checked:m==="email",onChange:r=>g(r.target.value)}),e.jsx(t,{label:o("storybook.demo.sms"),description:o("storybook.demo.smsContactDescription"),value:"sms",name:"contact",checked:m==="sms",onChange:r=>g(r.target.value)}),e.jsx(t,{label:o("storybook.demo.letter"),description:o("storybook.demo.letterContactDescription"),value:"letter",name:"contact",checked:m==="letter",onChange:r=>g(r.target.value)}),e.jsxs("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("strong",{children:[o("storybook.demo.selected"),":"]})," ",m]})]})}},d={render:function(){const o=s();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:o("storybook.demo.smallRadio"),name:"size-demo",value:"sm","data-size":"sm"}),e.jsx(t,{label:o("storybook.demo.mediumRadio"),name:"size-demo",value:"md","data-size":"md"}),e.jsx(t,{label:o("storybook.demo.largeRadio"),name:"size-demo",value:"lg","data-size":"lg"})]})}},c={render:function(){const o=s();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.verticalLayout")}),e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.selectTimeSlot")}),e.jsx(t,{label:o("storybook.demo.morning"),name:"time1",value:"morning"}),e.jsx(t,{label:o("storybook.demo.afternoon"),name:"time1",value:"afternoon"}),e.jsx(t,{label:o("storybook.demo.evening"),name:"time1",value:"evening"})]})]}),e.jsxs("div",{children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.horizontalLayout")}),e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.paymentMethod")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:o("storybook.demo.card"),name:"payment1",value:"card"}),e.jsx(t,{label:o("storybook.demo.invoice"),name:"payment1",value:"invoice"}),e.jsx(t,{label:o("storybook.demo.vipps"),name:"payment1",value:"vipps"})]})]})]}),e.jsxs("div",{children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.withDescriptions")}),e.jsxs(a,{children:[e.jsx(a.Legend,{children:o("storybook.demo.selectPlan")}),e.jsx(t,{label:o("storybook.demo.basic"),description:o("storybook.demo.upTo5BookingsPerMonth"),name:"plan1",value:"basic"}),e.jsx(t,{label:o("storybook.demo.pro"),description:o("storybook.demo.unlimitedBookings"),name:"plan1",value:"pro"})]})]}),e.jsxs("div",{children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.states")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{label:o("storybook.story.default"),name:"states",value:"default"}),e.jsx(t,{label:o("storybook.demo.selected"),name:"states",value:"selected",defaultChecked:!0}),e.jsx(t,{label:o("storybook.story.disabled"),name:"states",value:"disabled",disabled:!0})]})]}),e.jsxs("div",{children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:o("storybook.story.sizes")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{label:o("storybook.demo.small"),name:"sizes",value:"sm","data-size":"sm"}),e.jsx(t,{label:o("storybook.demo.medium"),name:"sizes",value:"md","data-size":"md"}),e.jsx(t,{label:o("storybook.demo.large"),name:"sizes",value:"lg","data-size":"lg"})]})]})]})}};var k,h,x;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectTimeSlot')}</Fieldset.Legend>
        <Radio label={t('storybook.demo.morning')} name="time" value="morning" />
        <Radio label={t('storybook.demo.afternoon')} name="time" value="afternoon" />
        <Radio label={t('storybook.demo.evening')} name="time" value="evening" />
      </Fieldset>;
  }
}`,...(x=(h=p.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var f,R,j;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectPlan')}</Fieldset.Legend>
        <Radio label={t('storybook.demo.basic')} name="plan" value="basic" description={t('storybook.demo.basicPlanDescription')} />
        <Radio label={t('storybook.demo.pro')} name="plan" value="pro" description={t('storybook.demo.proPlanDescription')} />
        <Radio label={t('storybook.demo.enterprise')} name="plan" value="enterprise" description={t('storybook.demo.enterprisePlanDescription')} />
      </Fieldset>;
  }
}`,...(j=(R=u.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var F,L,z;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.paymentMethod')}</Fieldset.Legend>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Radio label={t('storybook.demo.card')} name="payment" value="card" />
          <Radio label={t('storybook.demo.invoice')} name="payment" value="invoice" />
          <Radio label={t('storybook.demo.vipps')} name="payment" value="vipps" />
        </div>
      </Fieldset>;
  }
}`,...(z=(L=b.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var D,S,C;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.status')}</Fieldset.Legend>
        <Radio label={t('platform.status.active')} name="status" value="active" defaultChecked />
        <Radio label={t('storybook.demo.inactiveUnavailable')} name="status" value="inactive" disabled />
      </Fieldset>;
  }
}`,...(C=(S=v.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var T,A,w;y.parameters={...y.parameters,docs:{...(T=y.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectCategory')}</Fieldset.Legend>
        <Radio label={t('storybook.demo.venues')} name="category" value="lokaler" aria-invalid="true" />
        <Radio label={t('storybook.demo.equipment')} name="category" value="utstyr" aria-invalid="true" />
        <ValidationMessage>{t('storybook.demo.mustSelectCategory')}</ValidationMessage>
      </Fieldset>;
  }
}`,...(w=(A=y.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var P,M,H,U,B;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState('email');
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.howToContactYou')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.contactMethodDescription')}</Fieldset.Description>
        <Radio label={t('storybook.demo.email')} description={t('storybook.demo.emailContactDescription')} value="email" name="contact" checked={selected === 'email'} onChange={e => setSelected(e.target.value)} />
        <Radio label={t('storybook.demo.sms')} description={t('storybook.demo.smsContactDescription')} value="sms" name="contact" checked={selected === 'sms'} onChange={e => setSelected(e.target.value)} />
        <Radio label={t('storybook.demo.letter')} description={t('storybook.demo.letterContactDescription')} value="letter" name="contact" checked={selected === 'letter'} onChange={e => setSelected(e.target.value)} />
        <div style={{
        marginTop: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <strong>{t('storybook.demo.selected')}:</strong> {selected}
        </div>
      </Fieldset>;
  }
}`,...(H=(M=l.parameters)==null?void 0:M.docs)==null?void 0:H.source},description:{story:"Interactive radio group with state",...(B=(U=l.parameters)==null?void 0:U.docs)==null?void 0:B.description}}};var V,q,W,E,G;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Radio label={t('storybook.demo.smallRadio')} name="size-demo" value="sm" data-size="sm" />
        <Radio label={t('storybook.demo.mediumRadio')} name="size-demo" value="md" data-size="md" />
        <Radio label={t('storybook.demo.largeRadio')} name="size-demo" value="lg" data-size="lg" />
      </div>;
  }
}`,...(W=(q=d.parameters)==null?void 0:q.docs)==null?void 0:W.source},description:{story:"Size variants",...(G=(E=d.parameters)==null?void 0:E.docs)==null?void 0:G.description}}};var I,O,N,K,Y;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
            {t('storybook.story.verticalLayout')}
          </Heading>
          <Fieldset>
            <Fieldset.Legend>{t('storybook.demo.selectTimeSlot')}</Fieldset.Legend>
            <Radio label={t('storybook.demo.morning')} name="time1" value="morning" />
            <Radio label={t('storybook.demo.afternoon')} name="time1" value="afternoon" />
            <Radio label={t('storybook.demo.evening')} name="time1" value="evening" />
          </Fieldset>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.horizontalLayout')}
          </Heading>
          <Fieldset>
            <Fieldset.Legend>{t('storybook.demo.paymentMethod')}</Fieldset.Legend>
            <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)'
          }}>
              <Radio label={t('storybook.demo.card')} name="payment1" value="card" />
              <Radio label={t('storybook.demo.invoice')} name="payment1" value="invoice" />
              <Radio label={t('storybook.demo.vipps')} name="payment1" value="vipps" />
            </div>
          </Fieldset>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.withDescriptions')}
          </Heading>
          <Fieldset>
            <Fieldset.Legend>{t('storybook.demo.selectPlan')}</Fieldset.Legend>
            <Radio label={t('storybook.demo.basic')} description={t('storybook.demo.upTo5BookingsPerMonth')} name="plan1" value="basic" />
            <Radio label={t('storybook.demo.pro')} description={t('storybook.demo.unlimitedBookings')} name="plan1" value="pro" />
          </Fieldset>
        </div>

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
            <Radio label={t('storybook.story.default')} name="states" value="default" />
            <Radio label={t('storybook.demo.selected')} name="states" value="selected" defaultChecked />
            <Radio label={t('storybook.story.disabled')} name="states" value="disabled" disabled />
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
            <Radio label={t('storybook.demo.small')} name="sizes" value="sm" data-size="sm" />
            <Radio label={t('storybook.demo.medium')} name="sizes" value="md" data-size="md" />
            <Radio label={t('storybook.demo.large')} name="sizes" value="lg" data-size="lg" />
          </div>
        </div>
      </div>;
  }
}`,...(N=(O=c.parameters)==null?void 0:O.docs)==null?void 0:N.source},description:{story:"All variants overview",...(Y=(K=c.parameters)==null?void 0:K.docs)==null?void 0:Y.description}}};const me=["Default","WithDescription","Horizontal","Disabled","WithError","InteractiveGroup","Sizes","AllVariants"];export{c as AllVariants,p as Default,v as Disabled,b as Horizontal,l as InteractiveGroup,d as Sizes,u as WithDescription,y as WithError,me as __namedExportsOrder,ce as default};
//# sourceMappingURL=Radio.stories-NoNH-rnv.js.map
