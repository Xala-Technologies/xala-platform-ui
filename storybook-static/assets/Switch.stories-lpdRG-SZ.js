import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as _}from"./index-ClcD9ViR.js";import{d as t}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import{F as s}from"./radio-ER07BMpk.js";import{H as p}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const xe={title:"Components/Switch",component:t,parameters:{docs:{description:{component:`
Switch gives users a choice between two alternatives. The switch can either be turned off or on and must always be set with a default choice.

## Variants

- **Default** - Standard switch (off by default)
- **Checked** - Switch in on state
- **With description** - Additional context below label
- **Grouped** - Multiple switches in fieldset
- **Disabled** - Not interactive
- **Read-only** - Visible but not editable

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Binary settings (on/off, enabled/disabled, yes/no)
- Immediate effect settings that take effect instantly
- Preferences that don't require form submission
- Toggle features or functionality on/off
- Use Checkbox for selections that require form submission
- Use Radio for mutually exclusive options

## Best Practices

### Do
- Always set a default state (checked or unchecked)
- Use for immediate actions that take effect instantly
- Provide clear, descriptive labels
- Use descriptions for complex or unclear settings
- Group related switches with Fieldset and Legend
- Make labels clickable for larger hit area
- Use positive language ("Enable notifications" not "Disable notifications")

### Don't
- Don't use for form submissions (use Checkbox instead)
- Don't use for mutually exclusive options (use Radio instead)
- Don't change state without user action
- Don't use ambiguous labels
- Don't disable without explanation
- Don't use for destructive actions without confirmation

## Usage Patterns

### Basic Switch
\`\`\`tsx
<Switch label="Enable notifications" />
\`\`\`

### With Description
\`\`\`tsx
<Switch 
  label="Dark mode"
  description="Switch between light and dark theme"
/>
\`\`\`

### Checked by Default
\`\`\`tsx
<Switch 
  label="Email notifications" 
  defaultChecked 
/>
\`\`\`

### Grouped Switches
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Notification preferences</Fieldset.Legend>
  <Switch label="Email notifications" defaultChecked />
  <Switch label="SMS notifications" />
  <Switch label="Push notifications" defaultChecked />
</Fieldset>
\`\`\`

### Controlled Switch
\`\`\`tsx
const [enabled, setEnabled] = useState(false);

<Switch 
  label="Feature enabled"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using Switch for Form Submission
Switches are for immediate effects. Use Checkbox for form submissions.

### Anti-pattern: Negative Labels
Labels like "Disable notifications" are confusing. Use positive language.

### Anti-pattern: No Default State
Switches must always have a default state. Never leave them indeterminate.

### Anti-pattern: Destructive Actions Without Confirmation
Don't use switches for destructive actions like "Delete account" without confirmation.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to the switch
- **Space** toggles the switch state
- **Shift+Tab** moves focus to previous element
- Focus indicator must be visible

### Screen Readers
- Switch role is announced
- Label is read when focused
- State is announced (on/off, checked/unchecked)
- Description text provides additional context
- State changes are announced immediately

### WCAG 2.1 AA Compliance
- **Label**: Every switch must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for switch border
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px including label
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **State indication**: Visual state must not rely on color alone
- **Keyboard accessible**: Full keyboard control

### Required Switches
For required settings:
\`\`\`tsx
<Switch 
  label="Accept terms and conditions"
  required
  aria-required="true"
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the switch"},readOnly:{control:"boolean",description:"Makes switch read-only"},checked:{control:"boolean",description:"Controlled checked state"},defaultChecked:{control:"boolean",description:"Default checked state (uncontrolled)"}}},n={render:()=>e.jsx(t,{label:"Enable notifications"})},r={render:()=>e.jsx(t,{label:"Dark mode",description:"Switch between light and dark theme"})},d={render:()=>e.jsx(t,{label:"Email notifications",defaultChecked:!0})},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:"Disabled off",disabled:!0}),e.jsx(t,{label:"Disabled on",disabled:!0,defaultChecked:!0})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:"Read-only off",readOnly:!0}),e.jsx(t,{label:"Read-only on",readOnly:!0,defaultChecked:!0})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(t,{label:"Small switch","data-size":"sm"}),e.jsx(t,{label:"Medium switch","data-size":"md"}),e.jsx(t,{label:"Large switch","data-size":"lg"})]})},m={render:()=>e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Turn lights on/off"}),e.jsx(t,{label:"Living room",defaultChecked:!0}),e.jsx(t,{label:"Kitchen"}),e.jsx(t,{label:"Bathroom"}),e.jsx(t,{label:"Bedroom",description:"Unable to connect to the light bulbs",readOnly:!0})]})},o={render:function(){const[a,f]=_.useState({email:!0,sms:!1,push:!0});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Notification preferences"}),e.jsx(t,{label:"Email notifications",checked:a.email,onChange:i=>f({...a,email:i.target.checked})}),e.jsx(t,{label:"SMS notifications",checked:a.sms,onChange:i=>f({...a,sms:i.target.checked})}),e.jsx(t,{label:"Push notifications",checked:a.push,onChange:i=>f({...a,push:i.target.checked})})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx("strong",{children:"Active notifications:"})," ",Object.entries(a).filter(([,i])=>i).map(([i])=>i).join(", ")||"None"]})]})}},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(p,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"States"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{label:"Default (off)"}),e.jsx(t,{label:"Checked (on)",defaultChecked:!0}),e.jsx(t,{label:"With description",description:"Additional context for this setting"}),e.jsx(t,{label:"Disabled off",disabled:!0}),e.jsx(t,{label:"Disabled on",disabled:!0,defaultChecked:!0}),e.jsx(t,{label:"Read-only off",readOnly:!0}),e.jsx(t,{label:"Read-only on",readOnly:!0,defaultChecked:!0})]})]}),e.jsxs("div",{children:[e.jsx(p,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(t,{label:"Small","data-size":"sm"}),e.jsx(t,{label:"Medium","data-size":"md"}),e.jsx(t,{label:"Large","data-size":"lg"})]})]}),e.jsxs("div",{children:[e.jsx(p,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Grouped"}),e.jsxs(s,{children:[e.jsx(s.Legend,{children:"Settings"}),e.jsx(t,{label:"Option 1",defaultChecked:!0}),e.jsx(t,{label:"Option 2"}),e.jsx(t,{label:"Option 3",defaultChecked:!0})]})]})]})};var b,g,x;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Switch label="Enable notifications" />
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var v,S,w;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Switch label="Dark mode" description="Switch between light and dark theme" />
}`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var y,k,j;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Switch label="Email notifications" defaultChecked />
}`,...(j=(k=d.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var D,C,z;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
}`,...(z=(C=c.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var F,A,L;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Switch label="Read-only off" readOnly />
      <Switch label="Read-only on" readOnly defaultChecked />
    </div>
}`,...(L=(A=u.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var O,R,E;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Switch label="Small switch" data-size="sm" />
      <Switch label="Medium switch" data-size="md" />
      <Switch label="Large switch" data-size="lg" />
    </div>
}`,...(E=(R=h.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var N,B,M;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Fieldset>
      <Fieldset.Legend>Turn lights on/off</Fieldset.Legend>
      <Switch label="Living room" defaultChecked />
      <Switch label="Kitchen" />
      <Switch label="Bathroom" />
      <Switch label="Bedroom" description="Unable to connect to the light bulbs" readOnly />
    </Fieldset>
}`,...(M=(B=m.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var U,H,P,T,W;o.parameters={...o.parameters,docs:{...(U=o.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function Render() {
    const [notifications, setNotifications] = useState({
      email: true,
      sms: false,
      push: true
    });
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Fieldset>
          <Fieldset.Legend>Notification preferences</Fieldset.Legend>
          <Switch label="Email notifications" checked={notifications.email} onChange={e => setNotifications({
          ...notifications,
          email: e.target.checked
        })} />
          <Switch label="SMS notifications" checked={notifications.sms} onChange={e => setNotifications({
          ...notifications,
          sms: e.target.checked
        })} />
          <Switch label="Push notifications" checked={notifications.push} onChange={e => setNotifications({
          ...notifications,
          push: e.target.checked
        })} />
        </Fieldset>
        <div style={{
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <strong>Active notifications:</strong>{' '}
          {Object.entries(notifications).filter(([, v]) => v).map(([k]) => k).join(', ') || 'None'}
        </div>
      </div>;
  }
}`,...(P=(H=o.parameters)==null?void 0:H.docs)==null?void 0:P.source},description:{story:"Interactive switch with state",...(W=(T=o.parameters)==null?void 0:T.docs)==null?void 0:W.description}}};var G,V,q,I,K;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
          <Switch label="Default (off)" />
          <Switch label="Checked (on)" defaultChecked />
          <Switch label="With description" description="Additional context for this setting" />
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
          <Switch label="Read-only off" readOnly />
          <Switch label="Read-only on" readOnly defaultChecked />
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
          <Switch label="Small" data-size="sm" />
          <Switch label="Medium" data-size="md" />
          <Switch label="Large" data-size="lg" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Grouped
        </Heading>
        <Fieldset>
          <Fieldset.Legend>Settings</Fieldset.Legend>
          <Switch label="Option 1" defaultChecked />
          <Switch label="Option 2" />
          <Switch label="Option 3" defaultChecked />
        </Fieldset>
      </div>
    </div>
}`,...(q=(V=l.parameters)==null?void 0:V.docs)==null?void 0:q.source},description:{story:"All variants overview",...(K=(I=l.parameters)==null?void 0:I.docs)==null?void 0:K.description}}};const ve=["Default","WithDescription","Checked","Disabled","ReadOnly","Sizes","SwitchGroup","Interactive","AllVariants"];export{l as AllVariants,d as Checked,n as Default,c as Disabled,o as Interactive,u as ReadOnly,h as Sizes,m as SwitchGroup,r as WithDescription,ve as __namedExportsOrder,xe as default};
//# sourceMappingURL=Switch.stories-lpdRG-SZ.js.map
