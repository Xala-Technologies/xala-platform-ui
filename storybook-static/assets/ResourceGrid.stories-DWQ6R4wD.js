import{j as n}from"./jsx-runtime-BYYWji4R.js";import{u as F}from"./index-bjNF47ar.js";import{c as O}from"./utils-Dlkq94hl.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import{C as P}from"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import{P as X}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";function a(){var r="/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/blocks/ResourceGrid.tsx",i="b06f1334203fbcfab973d1c66b6af47e434a2cc2",e=globalThis,t="__coverage__",x={path:"/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/blocks/ResourceGrid.tsx",statementMap:{0:{start:{line:10,column:19},end:{line:10,column:108}},1:{start:{line:11,column:30},end:{line:11,column:211}},2:{start:{line:12,column:2},end:{line:29,column:4}},3:{start:{line:32,column:0},end:{line:38,column:50}},4:{start:{line:34,column:4},end:{line:34,column:46}},5:{start:{line:36,column:4},end:{line:36,column:1076}}},fnMap:{0:{name:"ResourceGrid",decl:{start:{line:3,column:16},end:{line:3,column:28}},loc:{start:{line:9,column:3},end:{line:30,column:1}},line:9}},branchMap:{0:{loc:{start:{line:5,column:2},end:{line:5,column:20}},type:"default-arg",locations:[{start:{line:5,column:17},end:{line:5,column:20}}],line:5},1:{loc:{start:{line:6,column:2},end:{line:6,column:16}},type:"default-arg",locations:[{start:{line:6,column:15},end:{line:6,column:16}}],line:6},2:{loc:{start:{line:10,column:19},end:{line:10,column:108}},type:"cond-expr",locations:[{start:{line:10,column:36},end:{line:10,column:78}},{start:{line:10,column:81},end:{line:10,column:108}}],line:10},3:{loc:{start:{line:10,column:36},end:{line:10,column:78}},type:"cond-expr",locations:[{start:{line:10,column:62},end:{line:10,column:72}},{start:{line:10,column:75},end:{line:10,column:78}}],line:10},4:{loc:{start:{line:11,column:30},end:{line:11,column:211}},type:"cond-expr",locations:[{start:{line:11,column:49},end:{line:11,column:180}},{start:{line:11,column:183},end:{line:11,column:211}}],line:11}},s:{0:0,1:0,2:0,3:0,4:0,5:0},f:{0:0},b:{0:[0],1:[0],2:[0,0],3:[0,0],4:[0,0]},inputSourceMap:{version:3,file:null,sources:["/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/blocks/ResourceGrid.tsx"],names:[],mappings:"AAyCI;AAlCJ;AAeO;AAAsB;AAC3B;AACe;AACF;AACb;AAEF;AACE;AAMA;AAKA;AACE;AAAC;AAAA;AACgD;AAC7B;AAEhB;AACgC;AAC0B;AAClB;AAC7B;AACJ;AACL;AACO;AAAA;AACT;AAGD;AAAA;AAGP;AAEA;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"b06f1334203fbcfab973d1c66b6af47e434a2cc2"},o=e[t]||(e[t]={});(!o[r]||o[r].hash!==i)&&(o[r]=x);var l=o[r];return a=function(){return l},l}a();function s({gap:r,minCardWidth:i=(a().b[0][0]++,280),maxColumns:e=(a().b[1][0]++,3),children:t,className:x}){a().f[0]++;const o=(a().s[0]++,r!==void 0?(a().b[2][0]++,typeof r=="number"?(a().b[3][0]++,`${r}px`):(a().b[3][1]++,r)):(a().b[2][1]++,"var(--ds-spacing-6, 24px)")),l=(a().s[1]++,e===3?(a().b[4][0]++,`repeat(auto-fill, minmax(min(max(${i}px, calc((100% - ${e-1} * ${o}) / ${e})), 100%), 1fr))`):(a().b[4][1]++,`repeat(${e}, 1fr)`));return a().s[2]++,n.jsx("div",{className:O("resource-object-grid",x),"data-max-columns":e,style:{"--resource-object-grid-gap":o,"--resource-object-grid-min-card-width":`${i}px`,"--resource-object-grid-max-columns":e,display:"grid",gap:o,gridTemplateColumns:l,width:"100%"},children:t})}a().s[3]++;try{a().s[4]++,s.displayName="ResourceGrid",a().s[5]++,s.__docgenInfo={description:"",displayName:"ResourceGrid",props:{gap:{defaultValue:null,description:"Gap between cards - number (px) or CSS value (default: uses size mode token)",name:"gap",required:!1,type:{name:"string | number"}},minCardWidth:{defaultValue:{value:"280"},description:"Minimum card width for auto-fill grid (default: 280)",name:"minCardWidth",required:!1,type:{name:"number"}},maxColumns:{defaultValue:{value:"3"},description:"Maximum columns (default: 3) - enforces 3/2/1 responsive pattern",name:"maxColumns",required:!1,type:{name:"enum",value:[{value:"1"},{value:"2"},{value:"3"}]}},children:{defaultValue:null,description:"Grid children (ResourceCard components)",name:"children",required:!0,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Custom class name",name:"className",required:!1,type:{name:"string"}}}}}catch{}const Ce={title:"Blocks/ResourceGrid",component:s,parameters:{layout:"fullscreen",docs:{description:{component:`
## ResourceGrid

A responsive grid component for displaying resource cards. Strict responsive rules: 3 columns (large), 2 columns (tablet), 1 column (mobile).

### Features
- Responsive grid layout
- Configurable gap
- Minimum card width
- Maximum columns (1, 2, or 3)
- Design token compliant

### Usage
\`\`\`tsx
<ResourceGrid gap={24} minCardWidth={280} maxColumns={3}>
  <ResourceCard />
  <ResourceCard />
</ResourceGrid>
\`\`\`
        `}}},argTypes:{maxColumns:{control:"select",options:[1,2,3],description:"Maximum columns"},gap:{control:"number",description:"Gap between cards (px)"},minCardWidth:{control:"number",description:"Minimum card width (px)"}},tags:["autodocs"]},d=({index:r})=>{const i=F();return n.jsx(P,{"data-color":"neutral","data-size":"medium",style:{padding:"var(--ds-spacing-4)"},children:n.jsxs(X,{"data-size":"sm",children:[i("storybook.demo.cardTitle")," ",r+1]})})},c={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:24,minCardWidth:280,maxColumns:3,children:Array.from({length:6},(i,e)=>n.jsx(d,{index:e},e))})})}},m={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:24,minCardWidth:280,maxColumns:2,children:Array.from({length:4},(i,e)=>n.jsx(d,{index:e},e))})})}},u={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:24,minCardWidth:280,maxColumns:1,children:Array.from({length:3},(i,e)=>n.jsx(d,{index:e},e))})})}},p={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:32,minCardWidth:280,maxColumns:3,children:Array.from({length:6},(i,e)=>n.jsx(d,{index:e},e))})})}},g={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:24,minCardWidth:280,maxColumns:3,children:Array.from({length:12},(i,e)=>n.jsx(d,{index:e},e))})})}},h={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:12,minCardWidth:280,maxColumns:3,children:Array.from({length:6},(i,e)=>n.jsx(d,{index:e},e))})})}},A={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:24,minCardWidth:320,maxColumns:3,children:Array.from({length:6},(i,e)=>n.jsx(d,{index:e},e))})})}},f={render:function(){return n.jsx("div",{style:{padding:"var(--ds-spacing-4)",width:"100%"},children:n.jsx(s,{gap:"var(--ds-spacing-6)",minCardWidth:280,maxColumns:3,children:Array.from({length:6},(i,e)=>n.jsx(d,{index:e},e))})})}};var C,v,y;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={3}>
        {Array.from({
          length: 6
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(y=(v=c.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var R,b,G;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={2}>
        {Array.from({
          length: 4
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(G=(b=m.parameters)==null?void 0:b.docs)==null?void 0:G.source}}};var j,S,_;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={1}>
        {Array.from({
          length: 3
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(_=(S=u.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};var w,W,k;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={32} minCardWidth={280} maxColumns={3}>
        {Array.from({
          length: 6
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(k=(W=p.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var M,T,V;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={24} minCardWidth={280} maxColumns={3}>
        {Array.from({
          length: 12
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(V=(T=g.parameters)==null?void 0:T.docs)==null?void 0:V.source}}};var B,E,$;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={12} minCardWidth={280} maxColumns={3}>
        {Array.from({
          length: 6
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...($=(E=h.parameters)==null?void 0:E.docs)==null?void 0:$.source}}};var D,N,q;A.parameters={...A.parameters,docs:{...(D=A.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap={24} minCardWidth={320} maxColumns={3}>
        {Array.from({
          length: 6
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(q=(N=A.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var I,L,z;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      padding: 'var(--ds-spacing-4)',
      width: '100%'
    }}>
      <ResourceGrid gap="var(--ds-spacing-6)" minCardWidth={280} maxColumns={3}>
        {Array.from({
          length: 6
        }, (_, i) => <SampleCard key={i} index={i} />)}
      </ResourceGrid>
    </div>;
  }
}`,...(z=(L=f.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};const ve=["ThreeColumns","TwoColumns","SingleColumn","CustomGap","ManyItems","SmallGap","CustomMinCardWidth","WithDesignTokenGap"];export{p as CustomGap,A as CustomMinCardWidth,g as ManyItems,u as SingleColumn,h as SmallGap,c as ThreeColumns,m as TwoColumns,f as WithDesignTokenGap,ve as __namedExportsOrder,Ce as default};
//# sourceMappingURL=ResourceGrid.stories-DWQ6R4wD.js.map
