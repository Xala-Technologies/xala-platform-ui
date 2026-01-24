import{j as o}from"./jsx-runtime-BYYWji4R.js";import{u as v}from"./index-bjNF47ar.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import{S as x}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";function a(){var e="/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/composed/LoadingFallback.tsx",c="7fc8e0029bafa646461dd8b797076f053e98c8ef",t=globalThis,m="__coverage__",k={path:"/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/composed/LoadingFallback.tsx",statementMap:{0:{start:{line:4,column:2},end:{line:20,column:4}},1:{start:{line:22,column:0},end:{line:28,column:50}},2:{start:{line:24,column:4},end:{line:24,column:52}},3:{start:{line:26,column:4},end:{line:26,column:622}}},fnMap:{0:{name:"LoadingFallback",decl:{start:{line:3,column:16},end:{line:3,column:31}},loc:{start:{line:3,column:77},end:{line:21,column:1}},line:3}},branchMap:{0:{loc:{start:{line:3,column:34},end:{line:3,column:55}},type:"default-arg",locations:[{start:{line:3,column:44},end:{line:3,column:55}}],line:3}},s:{0:0,1:0,2:0,3:0},f:{0:0},b:{0:[0]},inputSourceMap:{version:3,file:null,sources:["/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/composed/LoadingFallback.tsx"],names:[],mappings:"AAiDM;AA7BN;AAcO;AACL;AACE;AAAC;AAAA;AACC;AACO;AACI;AACM;AACC;AACJ;AACJ;AACH;AACY;AACd;AACL;AAE6C;AAAA;AAGnD;"},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"7fc8e0029bafa646461dd8b797076f053e98c8ef"},r=t[m]||(t[m]={});(!r[e]||r[e].hash!==c)&&(r[e]=k);var p=r[e];return a=function(){return p},p}a();function s({message:e=(a().b[0][0]++,"Laster..."),className:c,style:t}){return a().f[0]++,a().s[0]++,o.jsx("div",{className:c,style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",gap:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-background-default)",...t},children:o.jsx(x,{"aria-label":e,"data-size":"lg"})})}a().s[1]++;try{a().s[2]++,s.displayName="LoadingFallback",a().s[3]++,s.__docgenInfo={description:"LoadingFallback displays a centered spinner with optional message",displayName:"LoadingFallback",props:{message:{defaultValue:{value:"Laster..."},description:"Loading message to display",name:"message",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"Custom class name",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"Custom styles",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const W={title:"Composed/LoadingFallback",component:s,parameters:{layout:"fullscreen",docs:{description:{component:`
## LoadingFallback

Full-page loading state for lazy-loaded components. Used with React.Suspense.

### Features
- Centered spinner
- Optional loading message
- Full viewport height
- SSR-safe

### Usage
\`\`\`tsx
import { Suspense } from 'react';
import { LoadingFallback } from '@xala-technologies/platform-ui';

<Suspense fallback={<LoadingFallback />}>
  <LazyComponent />
</Suspense>
\`\`\`
        `}}},argTypes:{message:{control:"text",description:"Loading message"}},tags:["autodocs"]},y=()=>{const e=v();return o.jsx(s,{message:e("platform.common.loading")})},n={render:()=>o.jsx(y,{})},S=()=>{const e=v();return o.jsx(s,{message:e("storybook.demo.loadingContent")})},l={render:()=>o.jsx(S,{})},i={args:{message:"Loading..."}};var d,u,g;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <DefaultLoadingFallback />
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var A,f,b;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <CustomMessageLoadingFallback />
}`,...(b=(f=l.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var C,L,h;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    message: 'Loading...'
  }
}`,...(h=(L=i.parameters)==null?void 0:L.docs)==null?void 0:h.source}}};const Z=["Default","CustomMessage","EnglishMessage"];export{l as CustomMessage,n as Default,i as EnglishMessage,Z as __namedExportsOrder,W as default};
//# sourceMappingURL=LoadingFallback.stories-Cqkcmi2D.js.map
