import{j as a}from"./jsx-runtime-BYYWji4R.js";import{P as s}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as w}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const q={title:"Components/Pagination",component:s,parameters:{docs:{description:{component:`
Pagination allows users to navigate through large amounts of content that is split across multiple pages. It provides controls to move between pages efficiently.

## Variants

- **Standard** - Full pagination with page numbers
- **Compact** - Minimal pagination for tight spaces
- **With ellipsis** - Shows ellipsis for many pages
- **With info** - Shows current/total information

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Large data sets split across pages
- Search results with many items
- Tables with many rows
- List views with 20+ items
- Gallery or grid layouts
- Article or blog post listings

## Best Practices

### Do
- Show total pages or items when possible
- Provide first/last page navigation
- Indicate current page clearly
- Use appropriate size for context
- Include previous/next navigation
- Show page numbers when practical

### Don't
- Don't hide pagination without indication
- Don't use for small data sets (< 10 items)
- Don't make current page clickable
- Don't show too many page numbers at once
- Don't use pagination without clear context
- Don't forget to maintain state on page change

## Usage Patterns

### Basic Pagination
\`\`\`tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  aria-label="Pagination navigation"
/>
\`\`\`

### Size Variants
\`\`\`tsx
<Pagination data-size="sm" currentPage={1} totalPages={10} />
<Pagination data-size="md" currentPage={1} totalPages={10} />
<Pagination data-size="lg" currentPage={1} totalPages={10} />
\`\`\`

### With Information
\`\`\`tsx
<Pagination
  currentPage={3}
  totalPages={50}
  totalItems={500}
  itemsPerPage={10}
  onPageChange={handlePageChange}
/>
\`\`\`

### Compact Pagination
\`\`\`tsx
<Pagination
  variant="compact"
  currentPage={1}
  totalPages={10}
  showPageNumbers={false}
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Pagination for Small Sets
Using pagination for fewer than 10 items is unnecessary.

### Anti-pattern: No Current Page Indication
Not clearly showing which page is active confuses users.

### Anti-pattern: Too Many Page Numbers
Showing all 100 page numbers at once is overwhelming.

### Anti-pattern: No Previous/Next
Missing previous/next buttons requires extra clicks.

## Accessibility

### Screen Readers
- ARIA labels describe navigation purpose
- Current page is properly announced
- Page numbers are read as links
- Total pages/items information is provided
- Navigation state is communicated

### Keyboard Navigation
- Tab key navigates through pagination controls
- Enter key activates page navigation
- Arrow keys may navigate page numbers
- Focus stays within pagination component
- Logical tab order maintained

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All controls reachable via keyboard
- **Focus management**: Clear focus indicators
- **ARIA labels**: Descriptive labels for navigation
- **Current state**: Current page clearly indicated
- **Predictable**: Navigation behaves as expected

### ARIA Implementation
\`\`\`tsx
<nav aria-label="Pagination navigation" role="navigation">
  <button aria-label="Previous page" disabled>Previous</button>
  <ul>
    <li><a href="?page=1" aria-label="Page 1" aria-current="page">1</a></li>
    <li><a href="?page=2" aria-label="Page 2">2</a></li>
  </ul>
  <button aria-label="Next page">Next</button>
</nav>
\`\`\`

### Best Practice for Current Page
Use aria-current="page" for the current page:
\`\`\`tsx
<a href="?page=3" aria-current="page" aria-label="Current page, page 3">
  3
</a>
\`\`\`

### Pagination with Information
Provide context about total items:
\`\`\`tsx
<div aria-live="polite">
  Showing 21-30 of 500 items
</div>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant"}}},e={args:{"aria-label":"Pagination navigation"}},i={args:{"data-size":"sm","aria-label":"Small pagination"}},t={args:{"data-size":"md","aria-label":"Medium pagination"}},n={args:{"data-size":"lg","aria-label":"Large pagination"}},r={render:()=>a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:a.jsxs("div",{children:[a.jsx(w,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[a.jsx(s,{"data-size":"sm","aria-label":"Small pagination"}),a.jsx(s,{"data-size":"md","aria-label":"Medium pagination"}),a.jsx(s,{"data-size":"lg","aria-label":"Large pagination"})]})]})})};var o,l,g;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Pagination navigation'
  }
}`,...(g=(l=e.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var p,c,m;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    'data-size': 'sm',
    'aria-label': 'Small pagination'
  }
}`,...(m=(c=i.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var d,u,v;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    'data-size': 'md',
    'aria-label': 'Medium pagination'
  }
}`,...(v=(u=t.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var b,P,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    'data-size': 'lg',
    'aria-label': 'Large pagination'
  }
}`,...(h=(P=n.parameters)==null?void 0:P.docs)==null?void 0:h.source}}};var f,x,y;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Sizes
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Pagination data-size="sm" aria-label="Small pagination" />
          <Pagination data-size="md" aria-label="Medium pagination" />
          <Pagination data-size="lg" aria-label="Large pagination" />
        </div>
      </div>
    </div>
}`,...(y=(x=r.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};const O=["Default","Small","Medium","Large","AllVariants"];export{r as AllVariants,e as Default,n as Large,t as Medium,i as Small,O as __namedExportsOrder,q as default};
//# sourceMappingURL=Pagination.stories-C1-0qa40.js.map
