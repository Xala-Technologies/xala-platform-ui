import{j as r}from"./jsx-runtime-BYYWji4R.js";import{r as w}from"./index-ClcD9ViR.js";import{D as g,a as i,b as t}from"./Drawer-BXA89Wpx.js";import{B as x}from"./button-B6PgazAq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BUAr5TKG.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";const O={title:"Composed/Drawer",component:g,parameters:{layout:"fullscreen"},tags:["autodocs"]},D=e=>{const[h,a]=w.useState(!1);return r.jsxs("div",{style:{padding:"2rem"},children:[r.jsx(x,{onClick:()=>a(!0),children:"Open Drawer"}),r.jsxs(g,{...e,isOpen:h,onClose:()=>a(!1),children:[r.jsxs(i,{title:"Section 1",children:[r.jsx(t,{onClick:()=>console.log("Item 1"),children:"Item 1"}),r.jsx(t,{onClick:()=>console.log("Item 2"),children:"Item 2"})]}),r.jsxs(i,{title:"Section 2",children:[r.jsx(t,{onClick:()=>console.log("Item 3"),children:"Item 3"}),r.jsx(t,{onClick:()=>console.log("Item 4"),children:"Item 4"})]})]})]})},s={render:e=>r.jsx(D,{...e}),args:{position:"right",title:"Drawer Title"}},o={render:e=>r.jsx(D,{...e}),args:{position:"left",title:"Left Drawer"}};var n,c,l;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => <DrawerWithTrigger {...args} />,
  args: {
    position: 'right',
    title: 'Drawer Title'
  }
}`,...(l=(c=s.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,p,d;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <DrawerWithTrigger {...args} />,
  args: {
    position: 'left',
    title: 'Left Drawer'
  }
}`,...(d=(p=o.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const E=["RightDrawer","LeftDrawer"];export{o as LeftDrawer,s as RightDrawer,E as __namedExportsOrder,O as default};
//# sourceMappingURL=Drawer.stories-COgbMuCq.js.map
