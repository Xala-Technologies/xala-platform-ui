import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as X}from"./index-ClcD9ViR.js";import{u as i}from"./index-bjNF47ar.js";import{d as o}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import{F as r}from"./radio-ER07BMpk.js";import{H as k}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const we={title:"Components/Switch",component:o,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Disables the switch"},readOnly:{control:"boolean",description:"Makes switch read-only"},checked:{control:"boolean",description:"Controlled checked state"},defaultChecked:{control:"boolean",description:"Default checked state (uncontrolled)"}}},c={render:function(){const t=i();return e.jsx(o,{label:t("storybook.demo.enableNotifications")})}},m={render:function(){const t=i();return e.jsx(o,{label:t("storybook.demo.darkMode"),description:t("storybook.demo.darkModeDescription")})}},u={render:function(){const t=i();return e.jsx(o,{label:t("storybook.demo.emailNotifications"),defaultChecked:!0})}},b={render:function(){const t=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(o,{label:t("storybook.demo.disabledOff"),disabled:!0}),e.jsx(o,{label:t("storybook.demo.disabledOn"),disabled:!0,defaultChecked:!0})]})}},f={render:function(){const t=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(o,{label:t("storybook.demo.readOnlyOff"),readOnly:!0}),e.jsx(o,{label:t("storybook.demo.readOnlyOn"),readOnly:!0,defaultChecked:!0})]})}},h={render:function(){const t=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(o,{label:t("storybook.demo.smallSwitch"),"data-size":"sm"}),e.jsx(o,{label:t("storybook.demo.mediumSwitch"),"data-size":"md"}),e.jsx(o,{label:t("storybook.demo.largeSwitch"),"data-size":"lg"})]})}},p={render:function(){const t=i();return e.jsxs(r,{children:[e.jsx(r.Legend,{children:t("storybook.demo.turnLightsOnOff")}),e.jsx(o,{label:t("storybook.demo.livingRoom"),defaultChecked:!0}),e.jsx(o,{label:t("storybook.demo.kitchen")}),e.jsx(o,{label:t("storybook.demo.bathroom")}),e.jsx(o,{label:t("storybook.demo.bedroom"),description:t("storybook.demo.unableToConnectToLightBulbs"),readOnly:!0})]})}},d={render:function(){const t=i(),[n,y]=X.useState({email:!0,sms:!1,push:!0});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(r,{children:[e.jsx(r.Legend,{children:t("storybook.demo.notificationPreferences")}),e.jsx(o,{label:t("storybook.demo.emailNotifications"),checked:n.email,onChange:s=>y({...n,email:s.target.checked})}),e.jsx(o,{label:t("storybook.demo.smsNotifications"),checked:n.sms,onChange:s=>y({...n,sms:s.target.checked})}),e.jsx(o,{label:t("storybook.demo.pushNotifications"),checked:n.push,onChange:s=>y({...n,push:s.target.checked})})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsxs("strong",{children:[t("storybook.demo.activeNotifications"),":"]})," ",Object.entries(n).filter(([,s])=>s).map(([s])=>s).join(", ")||t("storybook.demo.none")]})]})}},l={render:function(){const t=i();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(k,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.states")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(o,{label:t("storybook.demo.defaultOff")}),e.jsx(o,{label:t("storybook.demo.checkedOn"),defaultChecked:!0}),e.jsx(o,{label:t("storybook.demo.withDescription"),description:t("storybook.demo.additionalContextForSetting")}),e.jsx(o,{label:t("storybook.demo.disabledOff"),disabled:!0}),e.jsx(o,{label:t("storybook.demo.disabledOn"),disabled:!0,defaultChecked:!0}),e.jsx(o,{label:t("storybook.demo.readOnlyOff"),readOnly:!0}),e.jsx(o,{label:t("storybook.demo.readOnlyOn"),readOnly:!0,defaultChecked:!0})]})]}),e.jsxs("div",{children:[e.jsx(k,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.sizes")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(o,{label:t("storybook.demo.small"),"data-size":"sm"}),e.jsx(o,{label:t("storybook.demo.medium"),"data-size":"md"}),e.jsx(o,{label:t("storybook.demo.large"),"data-size":"lg"})]})]}),e.jsxs("div",{children:[e.jsx(k,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.grouped")}),e.jsxs(r,{children:[e.jsx(r.Legend,{children:t("storybook.demo.settings")}),e.jsx(o,{label:t("storybook.demo.option")+" 1",defaultChecked:!0}),e.jsx(o,{label:t("storybook.demo.option")+" 2"}),e.jsx(o,{label:t("storybook.demo.option")+" 3",defaultChecked:!0})]})]})]})}};var g,x,v;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Switch label={t('storybook.demo.enableNotifications')} />;
  }
}`,...(v=(x=c.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var w,S,j;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Switch label={t('storybook.demo.darkMode')} description={t('storybook.demo.darkModeDescription')} />;
  }
}`,...(j=(S=m.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var C,O,D;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Switch label={t('storybook.demo.emailNotifications')} defaultChecked />;
  }
}`,...(D=(O=u.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};var R,F,z;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Switch label={t('storybook.demo.disabledOff')} disabled />
        <Switch label={t('storybook.demo.disabledOn')} disabled defaultChecked />
      </div>;
  }
}`,...(z=(F=b.parameters)==null?void 0:F.docs)==null?void 0:z.source}}};var N,L,T;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Switch label={t('storybook.demo.readOnlyOff')} readOnly />
        <Switch label={t('storybook.demo.readOnlyOn')} readOnly defaultChecked />
      </div>;
  }
}`,...(T=(L=f.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var A,B,M;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Switch label={t('storybook.demo.smallSwitch')} data-size="sm" />
        <Switch label={t('storybook.demo.mediumSwitch')} data-size="md" />
        <Switch label={t('storybook.demo.largeSwitch')} data-size="lg" />
      </div>;
  }
}`,...(M=(B=h.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var E,U,H;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.turnLightsOnOff')}</Fieldset.Legend>
        <Switch label={t('storybook.demo.livingRoom')} defaultChecked />
        <Switch label={t('storybook.demo.kitchen')} />
        <Switch label={t('storybook.demo.bathroom')} />
        <Switch label={t('storybook.demo.bedroom')} description={t('storybook.demo.unableToConnectToLightBulbs')} readOnly />
      </Fieldset>;
  }
}`,...(H=(U=p.parameters)==null?void 0:U.docs)==null?void 0:H.source}}};var P,V,W,q,G;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
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
          <Fieldset.Legend>{t('storybook.demo.notificationPreferences')}</Fieldset.Legend>
          <Switch label={t('storybook.demo.emailNotifications')} checked={notifications.email} onChange={e => setNotifications({
          ...notifications,
          email: e.target.checked
        })} />
          <Switch label={t('storybook.demo.smsNotifications')} checked={notifications.sms} onChange={e => setNotifications({
          ...notifications,
          sms: e.target.checked
        })} />
          <Switch label={t('storybook.demo.pushNotifications')} checked={notifications.push} onChange={e => setNotifications({
          ...notifications,
          push: e.target.checked
        })} />
        </Fieldset>
        <div style={{
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <strong>{t('storybook.demo.activeNotifications')}:</strong>{' '}
          {Object.entries(notifications).filter(([, v]) => v).map(([k]) => k).join(', ') || t('storybook.demo.none')}
        </div>
      </div>;
  }
}`,...(W=(V=d.parameters)==null?void 0:V.docs)==null?void 0:W.source},description:{story:"Interactive switch with state",...(G=(q=d.parameters)==null?void 0:q.docs)==null?void 0:G.description}}};var I,K,_,J,Q;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
            <Switch label={t('storybook.demo.defaultOff')} />
            <Switch label={t('storybook.demo.checkedOn')} defaultChecked />
            <Switch label={t('storybook.demo.withDescription')} description={t('storybook.demo.additionalContextForSetting')} />
            <Switch label={t('storybook.demo.disabledOff')} disabled />
            <Switch label={t('storybook.demo.disabledOn')} disabled defaultChecked />
            <Switch label={t('storybook.demo.readOnlyOff')} readOnly />
            <Switch label={t('storybook.demo.readOnlyOn')} readOnly defaultChecked />
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
            <Switch label={t('storybook.demo.small')} data-size="sm" />
            <Switch label={t('storybook.demo.medium')} data-size="md" />
            <Switch label={t('storybook.demo.large')} data-size="lg" />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.grouped')}
          </Heading>
          <Fieldset>
            <Fieldset.Legend>{t('storybook.demo.settings')}</Fieldset.Legend>
            <Switch label={t('storybook.demo.option') + ' 1'} defaultChecked />
            <Switch label={t('storybook.demo.option') + ' 2'} />
            <Switch label={t('storybook.demo.option') + ' 3'} defaultChecked />
          </Fieldset>
        </div>
      </div>;
  }
}`,...(_=(K=l.parameters)==null?void 0:K.docs)==null?void 0:_.source},description:{story:"All variants overview",...(Q=(J=l.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};const Se=["Default","WithDescription","Checked","Disabled","ReadOnly","Sizes","SwitchGroup","Interactive","AllVariants"];export{l as AllVariants,u as Checked,c as Default,b as Disabled,d as Interactive,f as ReadOnly,h as Sizes,p as SwitchGroup,m as WithDescription,Se as __namedExportsOrder,we as default};
//# sourceMappingURL=Switch.stories-BZiIkiz-.js.map
