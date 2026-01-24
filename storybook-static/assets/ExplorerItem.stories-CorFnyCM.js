import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as B}from"./index-ClcD9ViR.js";import{u as w}from"./index-bjNF47ar.js";import{E as z}from"./ExplorerItem-BVQJgyUH.js";import{F as c,S as F,C as j}from"./icons-CYjUz1aN.js";import{S as O}from"./stack-MAf_EoFq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./utils-Dlkq94hl.js";const pt={title:"Blocks/ExplorerItem",component:z,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{selected:{control:"boolean",description:"Whether the item is currently selected"}}},r={args:{title:"Button",description:"Interactive button component"}},i={args:{title:"Button",description:"Interactive button component",selected:!0}},o={args:{title:"Dashboard",description:"Overview and metrics",icon:t.jsx(j,{size:20})}},n={args:{title:"Dashboard",description:"Overview and metrics",icon:t.jsx(j,{size:20}),selected:!0}},s={render:function(){const C=w(),[T,D]=B.useState("button"),k=[{id:"button",title:"Button",description:"Interactive button component",icon:t.jsx(c,{size:18})},{id:"card",title:"Card",description:"Content container with borders",icon:t.jsx(c,{size:18})},{id:"table",title:"DataTable",description:"Sortable, filterable table",icon:t.jsx(c,{size:18})},{id:"settings",title:C("platform.nav.settings"),description:"Application configuration",icon:t.jsx(F,{size:18})}];return t.jsx(O,{spacing:"0",children:k.map(e=>t.jsx(z,{title:e.title,description:e.description,icon:e.icon,selected:T===e.id,onClick:()=>D(e.id)},e.id))})}};var a,p,d;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    title: 'Button',
    description: 'Interactive button component'
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,m,u;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    title: 'Button',
    description: 'Interactive button component',
    selected: true
  }
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var b,g,x;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard',
    description: 'Overview and metrics',
    icon: <ChartIcon size={20} />
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var S,I,f;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard',
    description: 'Overview and metrics',
    icon: <ChartIcon size={20} />,
    selected: true
  }
}`,...(f=(I=n.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var h,v,E;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function ExplorerListExample() {
    const t = useT();
    const [selected, setSelected] = useState<string | null>('button');
    const items = [{
      id: 'button',
      title: 'Button',
      description: 'Interactive button component',
      icon: <FileTextIcon size={18} />
    }, {
      id: 'card',
      title: 'Card',
      description: 'Content container with borders',
      icon: <FileTextIcon size={18} />
    }, {
      id: 'table',
      title: 'DataTable',
      description: 'Sortable, filterable table',
      icon: <FileTextIcon size={18} />
    }, {
      id: 'settings',
      title: t('platform.nav.settings'),
      description: 'Application configuration',
      icon: <SettingsIcon size={18} />
    }];
    return <Stack spacing="0">
        {items.map(item => <ExplorerItem key={item.id} title={item.title} description={item.description} icon={item.icon} selected={selected === item.id} onClick={() => setSelected(item.id)} />)}
      </Stack>;
  }
}`,...(E=(v=s.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};const dt=["Default","Selected","WithIcon","WithIconSelected","ExplorerList"];export{r as Default,s as ExplorerList,i as Selected,o as WithIcon,n as WithIconSelected,dt as __namedExportsOrder,pt as default};
//# sourceMappingURL=ExplorerItem.stories-CorFnyCM.js.map
