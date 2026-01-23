import{j as e}from"./jsx-runtime-BYYWji4R.js";import{L as t}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const K={title:"Components/List",component:t,parameters:{docs:{description:{component:`
List component for displaying ordered and unordered lists.

## When to Use
- Feature lists
- Navigation menus
- Step-by-step instructions
- Content summaries
- Nested hierarchies

## Best Practices
- Use ordered lists for sequences
- Use unordered lists for non-sequential items
- Keep list items concise
- Use nesting sparingly

## Accessibility
- Uses semantic list elements
- Proper list structure for screen readers
        `}}},tags:["autodocs"]},s={render:()=>e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:"Free cancellation up to 24 hours before"}),e.jsx(t.Item,{children:"Equipment included in the price"}),e.jsx(t.Item,{children:"Changing rooms available"}),e.jsx(t.Item,{children:"Parking on site"})]})},i={render:()=>e.jsxs(t.Ordered,{children:[e.jsx(t.Item,{children:"Create an account"}),e.jsx(t.Item,{children:"Browse available resources"}),e.jsx(t.Item,{children:"Select a date and time"}),e.jsx(t.Item,{children:"Complete your resourceRequest"}),e.jsx(t.Item,{children:"Receive confirmation email"})]})},r={render:()=>e.jsxs(t.Unordered,{children:[e.jsxs(t.Item,{children:["Indoor amenities",e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:"Basketball court"}),e.jsx(t.Item,{children:"Swimming pool"}),e.jsx(t.Item,{children:"Gym"})]})]}),e.jsxs(t.Item,{children:["Outdoor amenities",e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:"Football field"}),e.jsx(t.Item,{children:"Tennis court"}),e.jsx(t.Item,{children:"Running track"})]})]})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t.Unordered,{"data-size":"sm",children:[e.jsx(t.Item,{children:"Small list item 1"}),e.jsx(t.Item,{children:"Small list item 2"})]}),e.jsxs(t.Unordered,{"data-size":"md",children:[e.jsx(t.Item,{children:"Medium list item 1"}),e.jsx(t.Item,{children:"Medium list item 2"})]}),e.jsxs(t.Unordered,{"data-size":"lg",children:[e.jsx(t.Item,{children:"Large list item 1"}),e.jsx(t.Item,{children:"Large list item 2"})]})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Unordered List"}),e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:"First item"}),e.jsx(t.Item,{children:"Second item"}),e.jsx(t.Item,{children:"Third item"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Ordered List"}),e.jsxs(t.Ordered,{children:[e.jsx(t.Item,{children:"Step one"}),e.jsx(t.Item,{children:"Step two"}),e.jsx(t.Item,{children:"Step three"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Nested List"}),e.jsx(t.Unordered,{children:e.jsxs(t.Item,{children:["Parent item",e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:"Child item 1"}),e.jsx(t.Item,{children:"Child item 2"})]})]})})]})]})};var m,o,a;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <List.Unordered>
      <List.Item>Free cancellation up to 24 hours before</List.Item>
      <List.Item>Equipment included in the price</List.Item>
      <List.Item>Changing rooms available</List.Item>
      <List.Item>Parking on site</List.Item>
    </List.Unordered>
}`,...(a=(o=s.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var l,c,L;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <List.Ordered>
      <List.Item>Create an account</List.Item>
      <List.Item>Browse available resources</List.Item>
      <List.Item>Select a date and time</List.Item>
      <List.Item>Complete your resourceRequest</List.Item>
      <List.Item>Receive confirmation email</List.Item>
    </List.Ordered>
}`,...(L=(c=i.parameters)==null?void 0:c.docs)==null?void 0:L.source}}};var I,p,h;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <List.Unordered>
      <List.Item>
        Indoor amenities
        <List.Unordered>
          <List.Item>Basketball court</List.Item>
          <List.Item>Swimming pool</List.Item>
          <List.Item>Gym</List.Item>
        </List.Unordered>
      </List.Item>
      <List.Item>
        Outdoor amenities
        <List.Unordered>
          <List.Item>Football field</List.Item>
          <List.Item>Tennis court</List.Item>
          <List.Item>Running track</List.Item>
        </List.Unordered>
      </List.Item>
    </List.Unordered>
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var x,u,j;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <List.Unordered data-size="sm">
        <List.Item>Small list item 1</List.Item>
        <List.Item>Small list item 2</List.Item>
      </List.Unordered>
      <List.Unordered data-size="md">
        <List.Item>Medium list item 1</List.Item>
        <List.Item>Medium list item 2</List.Item>
      </List.Unordered>
      <List.Unordered data-size="lg">
        <List.Item>Large list item 1</List.Item>
        <List.Item>Large list item 2</List.Item>
      </List.Unordered>
    </div>
}`,...(j=(u=n.parameters)==null?void 0:u.docs)==null?void 0:j.source}}};var g,U,v;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Unordered List
        </h3>
        <List.Unordered>
          <List.Item>First item</List.Item>
          <List.Item>Second item</List.Item>
          <List.Item>Third item</List.Item>
        </List.Unordered>
      </div>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Ordered List
        </h3>
        <List.Ordered>
          <List.Item>Step one</List.Item>
          <List.Item>Step two</List.Item>
          <List.Item>Step three</List.Item>
        </List.Ordered>
      </div>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Nested List
        </h3>
        <List.Unordered>
          <List.Item>
            Parent item
            <List.Unordered>
              <List.Item>Child item 1</List.Item>
              <List.Item>Child item 2</List.Item>
            </List.Unordered>
          </List.Item>
        </List.Unordered>
      </div>
    </div>
}`,...(v=(U=d.parameters)==null?void 0:U.docs)==null?void 0:v.source}}};const W=["Unordered","Ordered","Nested","Sizes","AllVariants"];export{d as AllVariants,r as Nested,i as Ordered,n as Sizes,s as Unordered,W as __namedExportsOrder,K as default};
//# sourceMappingURL=List.stories-D41-A3Yl.js.map
