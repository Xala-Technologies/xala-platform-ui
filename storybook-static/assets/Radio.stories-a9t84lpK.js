import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as N}from"./index-ClcD9ViR.js";import{R as a,F as i}from"./radio-ER07BMpk.js";import{H as t}from"./heading-mzc2R_Ff.js";import{V as K}from"./index-Df4a1FH3.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./paragraph-DDCpJsVw.js";import"./label-9E-twYNb.js";import"./input-CMu9MsIQ.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";const le={title:"Components/Radio",component:a,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the radio"},name:{control:"text",description:"Name attribute for radio group (required)"}}},d={render:()=>e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Select time slot"}),e.jsx(a,{label:"Morning (08:00 - 12:00)",name:"time",value:"morning"}),e.jsx(a,{label:"Afternoon (12:00 - 16:00)",name:"time",value:"afternoon"}),e.jsx(a,{label:"Evening (16:00 - 20:00)",name:"time",value:"evening"})]})},c={render:()=>e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Select plan"}),e.jsx(a,{label:"Basic",name:"plan",value:"basic",description:"Up to 5 resourceRequests per month"}),e.jsx(a,{label:"Pro",name:"plan",value:"pro",description:"Unlimited resourceRequests, priority support"}),e.jsx(a,{label:"Enterprise",name:"plan",value:"enterprise",description:"Custom features, dedicated support"})]})},m={render:()=>e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Payment method"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:"Card",name:"payment",value:"card"}),e.jsx(a,{label:"Invoice",name:"payment",value:"invoice"}),e.jsx(a,{label:"Vipps",name:"payment",value:"vipps"})]})]})},p={render:()=>e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Status"}),e.jsx(a,{label:"Active",name:"status",value:"active",defaultChecked:!0}),e.jsx(a,{label:"Inactive (unavailable)",name:"status",value:"inactive",disabled:!0})]})},u={render:()=>e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Select a category"}),e.jsx(a,{label:"Lokaler",name:"category",value:"lokaler","aria-invalid":"true"}),e.jsx(a,{label:"Utstyr",name:"category",value:"utstyr","aria-invalid":"true"}),e.jsx(K,{children:"You must select a category"})]})},l={render:()=>{const[r,v]=N.useState("email");return e.jsxs(i,{children:[e.jsx(i.Legend,{children:"How would you like us to contact you?"}),e.jsx(i.Description,{children:"Choose the method that works best for you. We use this only to send important updates about your case."}),e.jsx(a,{label:"Email",description:"We will use the email address you provided earlier (name@example.com)",value:"email",name:"contact",checked:r==="email",onChange:s=>v(s.target.value)}),e.jsx(a,{label:"SMS",description:"We will use the phone number you provided earlier (99 99 99 99)",value:"sms",name:"contact",checked:r==="sms",onChange:s=>v(s.target.value)}),e.jsx(a,{label:"Letter",description:"Delivery may take 3-5 working days, depending on the postal service.",value:"letter",name:"contact",checked:r==="letter",onChange:s=>v(s.target.value)}),e.jsxs("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx("strong",{children:"Selected:"})," ",r]})]})}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:"Small radio",name:"size-demo",value:"sm","data-size":"sm"}),e.jsx(a,{label:"Medium radio",name:"size-demo",value:"md","data-size":"md"}),e.jsx(a,{label:"Large radio",name:"size-demo",value:"lg","data-size":"lg"})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Vertical Layout"}),e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Select time slot"}),e.jsx(a,{label:"Morning",name:"time1",value:"morning"}),e.jsx(a,{label:"Afternoon",name:"time1",value:"afternoon"}),e.jsx(a,{label:"Evening",name:"time1",value:"evening"})]})]}),e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Horizontal Layout"}),e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Payment method"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:"Card",name:"payment1",value:"card"}),e.jsx(a,{label:"Invoice",name:"payment1",value:"invoice"}),e.jsx(a,{label:"Vipps",name:"payment1",value:"vipps"})]})]})]}),e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Descriptions"}),e.jsxs(i,{children:[e.jsx(i.Legend,{children:"Select plan"}),e.jsx(a,{label:"Basic",description:"Up to 5 bookings per month",name:"plan1",value:"basic"}),e.jsx(a,{label:"Pro",description:"Unlimited bookings",name:"plan1",value:"pro"})]})]}),e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"States"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Default",name:"states",value:"default"}),e.jsx(a,{label:"Selected",name:"states",value:"selected",defaultChecked:!0}),e.jsx(a,{label:"Disabled",name:"states",value:"disabled",disabled:!0})]})]}),e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Small",name:"sizes",value:"sm","data-size":"sm"}),e.jsx(a,{label:"Medium",name:"sizes",value:"md","data-size":"md"}),e.jsx(a,{label:"Large",name:"sizes",value:"lg","data-size":"lg"})]})]})]})};var g,b,h;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Select time slot</Fieldset.Legend>
      <Radio label="Morning (08:00 - 12:00)" name="time" value="morning" />
      <Radio label="Afternoon (12:00 - 16:00)" name="time" value="afternoon" />
      <Radio label="Evening (16:00 - 20:00)" name="time" value="evening" />
    </Fieldset>
}`,...(h=(b=d.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var y,x,f;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Select plan</Fieldset.Legend>
      <Radio label="Basic" name="plan" value="basic" description="Up to 5 resourceRequests per month" />
      <Radio label="Pro" name="plan" value="pro" description="Unlimited resourceRequests, priority support" />
      <Radio label="Enterprise" name="plan" value="enterprise" description="Custom features, dedicated support" />
    </Fieldset>
}`,...(f=(x=c.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var j,F,R;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Payment method</Fieldset.Legend>
      <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Radio label="Card" name="payment" value="card" />
        <Radio label="Invoice" name="payment" value="invoice" />
        <Radio label="Vipps" name="payment" value="vipps" />
      </div>
    </Fieldset>
}`,...(R=(F=m.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var S,L,z;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Status</Fieldset.Legend>
      <Radio label="Active" name="status" value="active" defaultChecked />
      <Radio label="Inactive (unavailable)" name="status" value="inactive" disabled />
    </Fieldset>
}`,...(z=(L=p.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var k,D,C;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Select a category</Fieldset.Legend>
      <Radio label="Lokaler" name="category" value="lokaler" aria-invalid="true" />
      <Radio label="Utstyr" name="category" value="utstyr" aria-invalid="true" />
      <ValidationMessage>You must select a category</ValidationMessage>
    </Fieldset>
}`,...(C=(D=u.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var A,w,U,H,M;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState('email');
    return <Fieldset>
        <Fieldset.Legend>How would you like us to contact you?</Fieldset.Legend>
        <Fieldset.Description>
          Choose the method that works best for you. We use this only to send important updates
          about your case.
        </Fieldset.Description>
        <Radio label="Email" description="We will use the email address you provided earlier (name@example.com)" value="email" name="contact" checked={selected === 'email'} onChange={e => setSelected(e.target.value)} />
        <Radio label="SMS" description="We will use the phone number you provided earlier (99 99 99 99)" value="sms" name="contact" checked={selected === 'sms'} onChange={e => setSelected(e.target.value)} />
        <Radio label="Letter" description="Delivery may take 3-5 working days, depending on the postal service." value="letter" name="contact" checked={selected === 'letter'} onChange={e => setSelected(e.target.value)} />
        <div style={{
        marginTop: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <strong>Selected:</strong> {selected}
        </div>
      </Fieldset>;
  }
}`,...(U=(w=l.parameters)==null?void 0:w.docs)==null?void 0:U.source},description:{story:"Interactive radio group with state",...(M=(H=l.parameters)==null?void 0:H.docs)==null?void 0:M.description}}};var V,W,B,E,P;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Radio label="Small radio" name="size-demo" value="sm" data-size="sm" />
      <Radio label="Medium radio" name="size-demo" value="md" data-size="md" />
      <Radio label="Large radio" name="size-demo" value="lg" data-size="lg" />
    </div>
}`,...(B=(W=n.parameters)==null?void 0:W.docs)==null?void 0:B.source},description:{story:"Size variants",...(P=(E=n.parameters)==null?void 0:E.docs)==null?void 0:P.description}}};var q,I,T,G,O;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Vertical Layout
        </Heading>
        <Fieldset>
          <Fieldset.Legend>Select time slot</Fieldset.Legend>
          <Radio label="Morning" name="time1" value="morning" />
          <Radio label="Afternoon" name="time1" value="afternoon" />
          <Radio label="Evening" name="time1" value="evening" />
        </Fieldset>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Horizontal Layout
        </Heading>
        <Fieldset>
          <Fieldset.Legend>Payment method</Fieldset.Legend>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)'
        }}>
            <Radio label="Card" name="payment1" value="card" />
            <Radio label="Invoice" name="payment1" value="invoice" />
            <Radio label="Vipps" name="payment1" value="vipps" />
          </div>
        </Fieldset>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          With Descriptions
        </Heading>
        <Fieldset>
          <Fieldset.Legend>Select plan</Fieldset.Legend>
          <Radio label="Basic" description="Up to 5 bookings per month" name="plan1" value="basic" />
          <Radio label="Pro" description="Unlimited bookings" name="plan1" value="pro" />
        </Fieldset>
      </div>

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
          <Radio label="Default" name="states" value="default" />
          <Radio label="Selected" name="states" value="selected" defaultChecked />
          <Radio label="Disabled" name="states" value="disabled" disabled />
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
          <Radio label="Small" name="sizes" value="sm" data-size="sm" />
          <Radio label="Medium" name="sizes" value="md" data-size="md" />
          <Radio label="Large" name="sizes" value="lg" data-size="lg" />
        </div>
      </div>
    </div>
}`,...(T=(I=o.parameters)==null?void 0:I.docs)==null?void 0:T.source},description:{story:"All variants overview",...(O=(G=o.parameters)==null?void 0:G.docs)==null?void 0:O.description}}};const ne=["Default","WithDescription","Horizontal","Disabled","WithError","InteractiveGroup","Sizes","AllVariants"];export{o as AllVariants,d as Default,p as Disabled,m as Horizontal,l as InteractiveGroup,n as Sizes,c as WithDescription,u as WithError,ne as __namedExportsOrder,le as default};
//# sourceMappingURL=Radio.stories-a9t84lpK.js.map
