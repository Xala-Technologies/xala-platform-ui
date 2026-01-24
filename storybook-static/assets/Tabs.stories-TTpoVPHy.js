import{j as a}from"./jsx-runtime-BYYWji4R.js";import{u as i}from"./index-bjNF47ar.js";import{S as e}from"./SimpleTabs-ChkmmJ0q.js";import{P as s}from"./paragraph-DDCpJsVw.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";const F={title:"Components/Tabs",parameters:{docs:{description:{component:`
Tabs organize content into different views within the same context. They allow users to switch between related content sections without navigation.

## Variants

- **Default** - Standard horizontal tabs
- **Vertical** - Tabs on the left side
- **With icons** - Icons for visual context
- **Overflow** - Scrollable tabs for many items
- **Controlled** - Programmatically controlled tabs

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Multiple related views in same context
- When users need to switch between content
- For navigation within a section
- Content categorization
- Step-by-step processes
- Settings or configuration panels

## Best Practices

### Do
- Use clear, concise tab labels
- Keep tab order logical
- Show active tab clearly
- Use icons when they add meaning
- Ensure content fits within tab panels
- Provide keyboard navigation

### Don't
- Don't use for page navigation
- Don't nest tabs within tabs
- Don't use too many tabs (5-7 max)
- Don't disable tabs without reason
- Don't use tabs for unrelated content
- Don't hide tabs on mobile

## Usage Patterns

### Basic Tabs
\`\`\`tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">
    <Paragraph>Overview content</Paragraph>
  </Tabs.Panel>
  <Tabs.Panel value="details">
    <Paragraph>Details content</Paragraph>
  </Tabs.Panel>
  <Tabs.Panel value="settings">
    <Paragraph>Settings content</Paragraph>
  </Tabs.Panel>
</Tabs>
\`\`\`

### Size Variants
\`\`\`tsx
<Tabs data-size="sm" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Small</Tabs.Tab>
    <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
  </Tabs.List>
</Tabs>
<Tabs data-size="lg" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Large</Tabs.Tab>
    <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
  </Tabs.List>
</Tabs>
\`\`\`

### Controlled Tabs
\`\`\`tsx
const [activeTab, setActiveTab] = useState('overview');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">
    <Paragraph>Overview content</Paragraph>
  </Tabs.Panel>
  <Tabs.Panel value="details">
    <Paragraph>Details content</Paragraph>
  </Tabs.Panel>
</Tabs>
\`\`\`

## Anti-Patterns

### Anti-pattern: Too Many Tabs
More than 7 tabs becomes hard to scan and navigate.

### Anti-pattern: Nested Tabs
Tabs within tabs create confusing navigation patterns.

### Anti-pattern: Disabled Tabs
Disabling tabs without explanation frustrates users.

### Anti-pattern: Empty Tab Panels
Tabs without content provide no value to users.

## Accessibility

### Screen Readers
- Tab role announced with tablist context
- Selected tab state clearly communicated
- Panel content associated with tabs
- Navigation instructions provided
- Tab count and position announced

### Keyboard Navigation
- Arrow keys navigate between tabs
- Tab key moves to panel content
- Enter/Space activates tabs
- Focus stays within tab component
- Logical tab order maintained

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All tabs reachable via keyboard
- **Focus management**: Clear focus indicators
- **ARIA attributes**: Proper roles and states
- **Content association**: Tabs linked to panels
- **Navigation predictability**: Expected keyboard behavior

### ARIA Implementation
\`\`\`tsx
<div role="tablist" aria-label="Content sections">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    Overview
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Details
  </button>
</div>
<div role="tabpanel" aria-labelledby="tab1" id="panel1">
  Overview content
</div>
<div role="tabpanel" aria-labelledby="tab2" id="panel2" hidden>
  Details content
</div>
\`\`\`

### Best Practice for Tab Labels
Use descriptive, concise labels:
\`\`\`tsx
<Tabs.Tab value="overview">Overview</Tabs.Tab>
<Tabs.Tab value="user-settings">User Settings</Tabs.Tab>
<Tabs.Tab value="billing-info">Billing Information</Tabs.Tab>
\`\`\`
        `}}},tags:["autodocs"]},o={render:function(){const t=i();return a.jsxs(e,{defaultValue:"overview",children:[a.jsxs(e.List,{children:[a.jsx(e.Tab,{value:"overview",children:t("storybook.demo.overview")}),a.jsx(e.Tab,{value:"details",children:t("storybook.demo.details")}),a.jsx(e.Tab,{value:"settings",children:t("storybook.demo.settings")})]}),a.jsx(e.Panel,{value:"overview",children:a.jsx(s,{children:t("storybook.demo.overviewContentGoesHere")})}),a.jsx(e.Panel,{value:"details",children:a.jsx(s,{children:t("storybook.demo.detailsContentGoesHere")})}),a.jsx(e.Panel,{value:"settings",children:a.jsx(s,{children:t("storybook.demo.settingsContentGoesHere")})})]})}},r={render:function(){const t=i();return a.jsxs(e,{defaultValue:"bookings",children:[a.jsxs(e.List,{children:[a.jsx(e.Tab,{value:"bookings",children:t("storybook.demo.bookings")}),a.jsx(e.Tab,{value:"listings",children:t("storybook.demo.listings")}),a.jsx(e.Tab,{value:"users",children:t("storybook.demo.users")})]}),a.jsx(e.Panel,{value:"bookings",children:a.jsx(s,{children:t("storybook.demo.manageBookingsHere")})}),a.jsx(e.Panel,{value:"listings",children:a.jsx(s,{children:t("storybook.demo.viewAndEditListings")})}),a.jsx(e.Panel,{value:"users",children:a.jsx(s,{children:t("storybook.demo.userManagementSection")})})]})}},n={render:function(){const t=i();return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[a.jsxs(e,{defaultValue:"tab1","data-size":"sm",children:[a.jsxs(e.List,{children:[a.jsx(e.Tab,{value:"tab1",children:t("storybook.demo.small")}),a.jsx(e.Tab,{value:"tab2",children:t("storybook.demo.tabs")})]}),a.jsx(e.Panel,{value:"tab1",children:a.jsx(s,{children:t("storybook.demo.smallTabsContent")})}),a.jsx(e.Panel,{value:"tab2",children:a.jsx(s,{children:t("storybook.demo.tab2Content")})})]}),a.jsxs(e,{defaultValue:"tab1","data-size":"md",children:[a.jsxs(e.List,{children:[a.jsx(e.Tab,{value:"tab1",children:t("storybook.demo.medium")}),a.jsx(e.Tab,{value:"tab2",children:t("storybook.demo.tabs")})]}),a.jsx(e.Panel,{value:"tab1",children:a.jsx(s,{children:t("storybook.demo.mediumTabsContent")})}),a.jsx(e.Panel,{value:"tab2",children:a.jsx(s,{children:t("storybook.demo.tab2Content")})})]}),a.jsxs(e,{defaultValue:"tab1","data-size":"lg",children:[a.jsxs(e.List,{children:[a.jsx(e.Tab,{value:"tab1",children:t("storybook.demo.large")}),a.jsx(e.Tab,{value:"tab2",children:t("storybook.demo.tabs")})]}),a.jsx(e.Panel,{value:"tab1",children:a.jsx(s,{children:t("storybook.demo.largeTabsContent")})}),a.jsx(e.Panel,{value:"tab2",children:a.jsx(s,{children:t("storybook.demo.tab2Content")})})]})]})}};var l,d,T;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">{t('storybook.demo.overview')}</Tabs.Tab>
          <Tabs.Tab value="details">{t('storybook.demo.details')}</Tabs.Tab>
          <Tabs.Tab value="settings">{t('storybook.demo.settings')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <Paragraph>{t('storybook.demo.overviewContentGoesHere')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="details">
          <Paragraph>{t('storybook.demo.detailsContentGoesHere')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <Paragraph>{t('storybook.demo.settingsContentGoesHere')}</Paragraph>
        </Tabs.Panel>
      </Tabs>;
  }
}`,...(T=(d=o.parameters)==null?void 0:d.docs)==null?void 0:T.source}}};var c,u,v;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Tabs defaultValue="bookings">
        <Tabs.List>
          <Tabs.Tab value="bookings">{t('storybook.demo.bookings')}</Tabs.Tab>
          <Tabs.Tab value="listings">{t('storybook.demo.listings')}</Tabs.Tab>
          <Tabs.Tab value="users">{t('storybook.demo.users')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="bookings">
          <Paragraph>{t('storybook.demo.manageBookingsHere')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="listings">
          <Paragraph>{t('storybook.demo.viewAndEditListings')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="users">
          <Paragraph>{t('storybook.demo.userManagementSection')}</Paragraph>
        </Tabs.Panel>
      </Tabs>;
  }
}`,...(v=(u=r.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var m,p,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <Tabs defaultValue="tab1" data-size="sm">
          <Tabs.List>
            <Tabs.Tab value="tab1">{t('storybook.demo.small')}</Tabs.Tab>
            <Tabs.Tab value="tab2">{t('storybook.demo.tabs')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <Paragraph>{t('storybook.demo.smallTabsContent')}</Paragraph>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <Paragraph>{t('storybook.demo.tab2Content')}</Paragraph>
          </Tabs.Panel>
        </Tabs>

        <Tabs defaultValue="tab1" data-size="md">
          <Tabs.List>
            <Tabs.Tab value="tab1">{t('storybook.demo.medium')}</Tabs.Tab>
            <Tabs.Tab value="tab2">{t('storybook.demo.tabs')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <Paragraph>{t('storybook.demo.mediumTabsContent')}</Paragraph>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <Paragraph>{t('storybook.demo.tab2Content')}</Paragraph>
          </Tabs.Panel>
        </Tabs>

        <Tabs defaultValue="tab1" data-size="lg">
          <Tabs.List>
            <Tabs.Tab value="tab1">{t('storybook.demo.large')}</Tabs.Tab>
            <Tabs.Tab value="tab2">{t('storybook.demo.tabs')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <Paragraph>{t('storybook.demo.largeTabsContent')}</Paragraph>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <Paragraph>{t('storybook.demo.tab2Content')}</Paragraph>
          </Tabs.Panel>
        </Tabs>
      </div>;
  }
}`,...(h=(p=n.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const K=["Default","WithIcons","Sizes"];export{o as Default,n as Sizes,r as WithIcons,K as __namedExportsOrder,F as default};
//# sourceMappingURL=Tabs.stories-TTpoVPHy.js.map
