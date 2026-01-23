import{j as e}from"./jsx-runtime-BYYWji4R.js";import{a as r}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as o}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const _={title:"Components/Breadcrumbs",component:r,parameters:{docs:{description:{component:`
Breadcrumbs show the navigation hierarchy and help users understand their current location within the site structure. They provide quick navigation to parent pages.

## Variants

- **Default** - Standard breadcrumb navigation
- **With icons** - Icons for navigation items
- **Custom separator** - Custom separator character
- **Collapsed** - Collapsed for deep hierarchies

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Deep page hierarchies (3+ levels)
- Complex site structures
- Help users understand current location
- Enable quick navigation to parent pages
- Multi-level category navigation
- Step-based processes

## Best Practices

### Do
- Show current page as text (not clickable)
- Keep labels short and clear
- Use consistent separator throughout site
- Start with home or main section
- Use meaningful page names
- Keep breadcrumbs on a single line

### Don't
- Don't use for single-level navigation
- Don't make current page clickable
- Don't use overly long labels
- Don't use for primary navigation
- Don't hide breadcrumbs on mobile
- Don't use more than 5-6 levels

## Usage Patterns

### Basic Breadcrumbs
\`\`\`tsx
<Breadcrumbs>
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/products">Products</Breadcrumbs.Link>
  <span>Current Product</span>
</Breadcrumbs>
\`\`\`

### Three-Level Navigation
\`\`\`tsx
<Breadcrumbs>
  <Breadcrumbs.Link href="/">Dashboard</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/reports">Reports</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/reports/2024">2024</Breadcrumbs.Link>
  <span>January Report</span>
</Breadcrumbs>
\`\`\`

### Size Variants
\`\`\`tsx
<Breadcrumbs data-size="sm">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span>Page</span>
</Breadcrumbs>
<Breadcrumbs data-size="md">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span>Page</span>
</Breadcrumbs>
<Breadcrumbs data-size="lg">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span>Page</span>
</Breadcrumbs>
\`\`\`

## Anti-Patterns

### Anti-pattern: Single-Level Breadcrumbs
Breadcrumbs with only one level provide no value.

### Anti-pattern: Clickable Current Page
Making the current page clickable confuses navigation.

### Anti-pattern: Too Many Levels
More than 6 levels becomes overwhelming and hard to scan.

### Anti-pattern: Vague Labels
Using "Page" or "Section" doesn't help users understand location.

## Accessibility

### Screen Readers
- Uses nav landmark with navigation role
- Current page is properly indicated
- Links are announced with their destinations
- ARIA labels provide context
- Breadcrumb list structure is announced

### Keyboard Navigation
- Tab key navigates through breadcrumb links
- Enter key activates navigation
- Focus moves in logical order
- Current page (text) is skipped in tab order

### WCAG 2.1 AA Compliance
- **Navigation landmark**: Uses nav element with proper role
- **Current location**: Current page clearly indicated
- **Keyboard accessible**: All links reachable via keyboard
- **Focus management**: Logical tab order
- **Meaningful sequence**: Items read in correct order

### ARIA Implementation
\`\`\`tsx
<nav aria-label="Breadcrumb navigation">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/products">Products</a>
    </li>
    <li aria-current="page">
      <span>Current Product</span>
    </li>
  </ol>
</nav>
\`\`\`

### Best Practice for Current Page
Use aria-current="page" for the current location:
\`\`\`tsx
<Breadcrumbs>
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span aria-current="page">Current Page</span>
</Breadcrumbs>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant"}}},s={render:()=>e.jsxs(r,{children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx(r.Link,{href:"/listings",children:"Listings"}),e.jsx("span",{children:"Current Page"})]})},a={render:()=>e.jsxs(r,{children:[e.jsx(r.Link,{href:"/",children:"Dashboard"}),e.jsx(r.Link,{href:"/resourceRequests",children:"ResourceRequests"}),e.jsx(r.Link,{href:"/resourceRequests/2024",children:"2024"}),e.jsx("span",{children:"January"})]})},n={render:()=>e.jsxs(r,{children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx("span",{children:"Settings"})]})},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(r,{"data-size":"sm",children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx("span",{children:"Small"})]}),e.jsxs(r,{"data-size":"md",children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx("span",{children:"Medium"})]}),e.jsxs(r,{"data-size":"lg",children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx("span",{children:"Large"})]})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Two Levels"}),e.jsxs(r,{children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx("span",{children:"Settings"})]})]}),e.jsxs("div",{children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Three Levels"}),e.jsxs(r,{children:[e.jsx(r.Link,{href:"/",children:"Home"}),e.jsx(r.Link,{href:"/products",children:"Products"}),e.jsx("span",{children:"Details"})]})]}),e.jsxs("div",{children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Four Levels"}),e.jsxs(r,{children:[e.jsx(r.Link,{href:"/",children:"Dashboard"}),e.jsx(r.Link,{href:"/bookings",children:"Bookings"}),e.jsx(r.Link,{href:"/bookings/2024",children:"2024"}),e.jsx("span",{children:"January"})]})]})]})};var c,d,m;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
      <Breadcrumbs.Link href="/listings">Listings</Breadcrumbs.Link>
      <span>Current Page</span>
    </Breadcrumbs>
}`,...(m=(d=s.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var l,u,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <Breadcrumbs.Link href="/">Dashboard</Breadcrumbs.Link>
      <Breadcrumbs.Link href="/resourceRequests">ResourceRequests</Breadcrumbs.Link>
      <Breadcrumbs.Link href="/resourceRequests/2024">2024</Breadcrumbs.Link>
      <span>January</span>
    </Breadcrumbs>
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var h,b,g;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
      <span>Settings</span>
    </Breadcrumbs>
}`,...(g=(b=n.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var B,k,L;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Breadcrumbs data-size="sm">
        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        <span>Small</span>
      </Breadcrumbs>
      <Breadcrumbs data-size="md">
        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        <span>Medium</span>
      </Breadcrumbs>
      <Breadcrumbs data-size="lg">
        <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        <span>Large</span>
      </Breadcrumbs>
    </div>
}`,...(L=(k=i.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var v,f,x;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Two Levels
        </Heading>
        <Breadcrumbs>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          <span>Settings</span>
        </Breadcrumbs>
      </div>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Three Levels
        </Heading>
        <Breadcrumbs>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
          <Breadcrumbs.Link href="/products">Products</Breadcrumbs.Link>
          <span>Details</span>
        </Breadcrumbs>
      </div>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Four Levels
        </Heading>
        <Breadcrumbs>
          <Breadcrumbs.Link href="/">Dashboard</Breadcrumbs.Link>
          <Breadcrumbs.Link href="/bookings">Bookings</Breadcrumbs.Link>
          <Breadcrumbs.Link href="/bookings/2024">2024</Breadcrumbs.Link>
          <span>January</span>
        </Breadcrumbs>
      </div>
    </div>
}`,...(x=(f=t.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const G=["Default","ThreeLevels","TwoLevels","Sizes","AllVariants"];export{t as AllVariants,s as Default,i as Sizes,a as ThreeLevels,n as TwoLevels,G as __namedExportsOrder,_ as default};
//# sourceMappingURL=Breadcrumbs.stories-S3lRXsWG.js.map
