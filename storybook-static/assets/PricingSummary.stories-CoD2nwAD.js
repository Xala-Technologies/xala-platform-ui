import{j as s}from"./jsx-runtime-BYYWji4R.js";import{P as B}from"./PricingSummary-BRHFJYPI.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";const en={title:"Patterns/PricingSummary",component:B,parameters:{layout:"centered",docs:{description:{component:`
## PricingSummary

A pattern component for displaying pricing breakdowns in booking and checkout flows.

### Features
- Line items with labels and amounts
- Support for discounts and fees
- Total calculation
- Currency formatting
- Loading state support

### Usage

\`\`\`tsx
<PricingSummary
  lineItems={[
    { id: '1', label: 'Room booking (3 hours)', amount: 1500 },
    { id: '2', label: 'Catering service', amount: 500 },
    { id: '3', label: 'Member discount', amount: -200, isDiscount: true },
  ]}
  total={1800}
  currency="kr"
  currencyPosition="suffix"
/>
\`\`\`
        `}}},tags:["autodocs"],decorators:[E=>s.jsx("div",{style:{padding:"2rem",maxWidth:"400px"},children:s.jsx(E,{})})]},n={args:{lineItems:[{id:"1",label:"Room booking (3 hours)",amount:1500},{id:"2",label:"Equipment rental",amount:300},{id:"3",label:"Service fee",amount:100}],total:1900,currency:"kr",currencyPosition:"suffix"}},e={name:"With Discount",args:{lineItems:[{id:"1",label:"Conference room (full day)",amount:5e3},{id:"2",label:"Catering (25 persons)",amount:2500},{id:"3",label:"AV Equipment",amount:800},{id:"4",label:"Member discount (10%)",amount:-830,isDiscount:!0}],total:7470,currency:"kr",currencyPosition:"suffix"}},r={name:"Simple Booking",args:{lineItems:[{id:"1",label:"Meeting room (1 hour)",amount:500}],total:500,currency:"kr",currencyPosition:"suffix"}},o={name:"With Subtotal & Taxes",args:{lineItems:[{id:"1",label:"Workshop space (4 hours)",amount:3200},{id:"2",label:"Projector rental",amount:400}],subtotal:3600,taxes:[{id:"vat",label:"MVA (25%)",amount:900}],total:4500,currency:"kr",currencyPosition:"suffix"}},t={args:{lineItems:[],total:0,isLoading:!0,currency:"kr"}},a={name:"USD Currency (Prefix)",args:{lineItems:[{id:"1",label:"Meeting room (2 hours)",amount:150},{id:"2",label:"Refreshments",amount:25}],total:175,currency:"$",currencyPosition:"prefix"}},i={name:"Comprehensive Booking",args:{title:"Booking Summary",lineItems:[{id:"1",label:"Storsal Sentrum (Full day)",amount:15e3},{id:"2",label:"Technical equipment package",amount:2500},{id:"3",label:"Catering - Lunch (50 guests)",amount:7500},{id:"4",label:"Catering - Coffee breaks (2x)",amount:2e3},{id:"5",label:"Cleaning service",amount:1500},{id:"6",label:"Early bird discount",amount:-2850,isDiscount:!0}],subtotal:25650,taxes:[{id:"vat",label:"MVA (25%)",amount:6412}],total:32062,currency:"kr",currencyPosition:"suffix",showCurrencyCode:!0}};var u,m,l;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    lineItems: [{
      id: '1',
      label: 'Room booking (3 hours)',
      amount: 1500
    }, {
      id: '2',
      label: 'Equipment rental',
      amount: 300
    }, {
      id: '3',
      label: 'Service fee',
      amount: 100
    }],
    total: 1900,
    currency: 'kr',
    currencyPosition: 'suffix'
  }
}`,...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var c,d,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  name: 'With Discount',
  args: {
    lineItems: [{
      id: '1',
      label: 'Conference room (full day)',
      amount: 5000
    }, {
      id: '2',
      label: 'Catering (25 persons)',
      amount: 2500
    }, {
      id: '3',
      label: 'AV Equipment',
      amount: 800
    }, {
      id: '4',
      label: 'Member discount (10%)',
      amount: -830,
      isDiscount: true
    }],
    total: 7470,
    currency: 'kr',
    currencyPosition: 'suffix'
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var g,b,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Simple Booking',
  args: {
    lineItems: [{
      id: '1',
      label: 'Meeting room (1 hour)',
      amount: 500
    }],
    total: 500,
    currency: 'kr',
    currencyPosition: 'suffix'
  }
}`,...(y=(b=r.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var f,h,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'With Subtotal & Taxes',
  args: {
    lineItems: [{
      id: '1',
      label: 'Workshop space (4 hours)',
      amount: 3200
    }, {
      id: '2',
      label: 'Projector rental',
      amount: 400
    }],
    subtotal: 3600,
    taxes: [{
      id: 'vat',
      label: 'MVA (25%)',
      amount: 900
    }],
    total: 4500,
    currency: 'kr',
    currencyPosition: 'suffix'
  }
}`,...(x=(h=o.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var k,S,C;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    lineItems: [],
    total: 0,
    isLoading: true,
    currency: 'kr'
  }
}`,...(C=(S=t.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var P,D,I;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'USD Currency (Prefix)',
  args: {
    lineItems: [{
      id: '1',
      label: 'Meeting room (2 hours)',
      amount: 150
    }, {
      id: '2',
      label: 'Refreshments',
      amount: 25
    }],
    total: 175,
    currency: '$',
    currencyPosition: 'prefix'
  }
}`,...(I=(D=a.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var v,M,W;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Comprehensive Booking',
  args: {
    title: 'Booking Summary',
    lineItems: [{
      id: '1',
      label: 'Storsal Sentrum (Full day)',
      amount: 15000
    }, {
      id: '2',
      label: 'Technical equipment package',
      amount: 2500
    }, {
      id: '3',
      label: 'Catering - Lunch (50 guests)',
      amount: 7500
    }, {
      id: '4',
      label: 'Catering - Coffee breaks (2x)',
      amount: 2000
    }, {
      id: '5',
      label: 'Cleaning service',
      amount: 1500
    }, {
      id: '6',
      label: 'Early bird discount',
      amount: -2850,
      isDiscount: true
    }],
    subtotal: 25650,
    taxes: [{
      id: 'vat',
      label: 'MVA (25%)',
      amount: 6412
    }],
    total: 32062,
    currency: 'kr',
    currencyPosition: 'suffix',
    showCurrencyCode: true
  }
}`,...(W=(M=i.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};const rn=["Default","WithDiscount","SimpleBooking","WithSubtotal","Loading","DollarCurrency","ComprehensiveExample"];export{i as ComprehensiveExample,n as Default,a as DollarCurrency,t as Loading,r as SimpleBooking,e as WithDiscount,o as WithSubtotal,rn as __namedExportsOrder,en as default};
//# sourceMappingURL=PricingSummary.stories-CoD2nwAD.js.map
