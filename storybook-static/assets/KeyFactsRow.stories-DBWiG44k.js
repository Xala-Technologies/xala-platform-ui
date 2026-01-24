import{K as j}from"./KeyFactsRow-JbcgI4Hq.js";import"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./utils-Dlkq94hl.js";import"./icons-CYjUz1aN.js";const _={title:"Blocks/KeyFactsRow",component:j,parameters:{layout:"centered",docs:{description:{component:`
## KeyFactsRow

Displays key resource facts as a horizontal row of badges/chips. Adapts based on resource type to show relevant information.

### Features
- Multiple fact types (capacity, area, duration, quantity, etc.)
- Automatic icon selection based on type
- Custom icons support
- Variants (default, compact, prominent)
- Max visible with overflow
- Tooltip support

### Usage
\`\`\`tsx
<KeyFactsRow
  facts={[
    { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
    { type: 'area', label: 'Areal', value: '120 m2' },
  ]}
  variant="default"
/>
\`\`\`
        `}}},argTypes:{variant:{control:"select",options:["default","compact","prominent"],description:"Visual variant"},maxVisible:{control:"number",description:"Maximum facts to show before collapse"}},tags:["autodocs"]},e={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer"},{type:"area",label:"Areal",value:"120 m2"},{type:"duration",label:"Varighet",value:"2 timer"}],variant:"default"}},a={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer"},{type:"area",label:"Areal",value:"120 m2"},{type:"duration",label:"Varighet",value:"2 timer"},{type:"quantity",label:"Antall",value:"10 enheter"},{type:"resourceRequestMode",label:"Modus",value:"Booking"},{type:"accessibility",label:"Tilgjengelighet",value:"Rullestol"},{type:"custom",label:"Egendefinert",value:"Verdi"}],variant:"default"}},t={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25"},{type:"area",label:"Areal",value:"120 m2"},{type:"duration",label:"Varighet",value:"2t"}],variant:"compact"}},l={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer"},{type:"area",label:"Areal",value:"120 m2"},{type:"duration",label:"Varighet",value:"2 timer"}],variant:"prominent"}},n={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer"},{type:"area",label:"Areal",value:"120 m2"},{type:"duration",label:"Varighet",value:"2 timer"},{type:"quantity",label:"Antall",value:"10 enheter"},{type:"accessibility",label:"Tilgjengelighet",value:"Rullestol"}],variant:"default",maxVisible:3}},r={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer",tooltip:"Maksimalt antall personer"},{type:"area",label:"Areal",value:"120 m2",tooltip:"Total areal i kvadratmeter"},{type:"duration",label:"Varighet",value:"2 timer",tooltip:"Standard varighet"}],variant:"default"}},s={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer"}],variant:"default"}},i={args:{facts:[{type:"capacity",label:"Kapasitet",value:"25 personer"},{type:"area",label:"Areal",value:"120 m2"},{type:"duration",label:"Varighet",value:"2 timer"},{type:"quantity",label:"Antall",value:"10 enheter"},{type:"resourceRequestMode",label:"Modus",value:"Booking"},{type:"accessibility",label:"Tilgjengelighet",value:"Rullestol"},{type:"custom",label:"Egendefinert",value:"Verdi"},{type:"capacity",label:"Kapasitet 2",value:"50 personer"}],variant:"default"}};var o,p,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2 timer'
    }],
    variant: 'default'
  }
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,y,m;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2 timer'
    }, {
      type: 'quantity',
      label: 'Antall',
      value: '10 enheter'
    }, {
      type: 'resourceRequestMode',
      label: 'Modus',
      value: 'Booking'
    }, {
      type: 'accessibility',
      label: 'Tilgjengelighet',
      value: 'Rullestol'
    }, {
      type: 'custom',
      label: 'Egendefinert',
      value: 'Verdi'
    }],
    variant: 'default'
  }
}`,...(m=(y=a.parameters)==null?void 0:y.docs)==null?void 0:m.source}}};var v,d,b;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2t'
    }],
    variant: 'compact'
  }
}`,...(b=(d=t.parameters)==null?void 0:d.docs)==null?void 0:b.source}}};var g,f,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2 timer'
    }],
    variant: 'prominent'
  }
}`,...(h=(f=l.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var A,V,K;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2 timer'
    }, {
      type: 'quantity',
      label: 'Antall',
      value: '10 enheter'
    }, {
      type: 'accessibility',
      label: 'Tilgjengelighet',
      value: 'Rullestol'
    }],
    variant: 'default',
    maxVisible: 3
  }
}`,...(K=(V=n.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var M,R,T;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer',
      tooltip: 'Maksimalt antall personer'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2',
      tooltip: 'Total areal i kvadratmeter'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2 timer',
      tooltip: 'Standard varighet'
    }],
    variant: 'default'
  }
}`,...(T=(R=r.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var S,q,k;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer'
    }],
    variant: 'default'
  }
}`,...(k=(q=s.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};var x,w,F;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    facts: [{
      type: 'capacity',
      label: 'Kapasitet',
      value: '25 personer'
    }, {
      type: 'area',
      label: 'Areal',
      value: '120 m2'
    }, {
      type: 'duration',
      label: 'Varighet',
      value: '2 timer'
    }, {
      type: 'quantity',
      label: 'Antall',
      value: '10 enheter'
    }, {
      type: 'resourceRequestMode',
      label: 'Modus',
      value: 'Booking'
    }, {
      type: 'accessibility',
      label: 'Tilgjengelighet',
      value: 'Rullestol'
    }, {
      type: 'custom',
      label: 'Egendefinert',
      value: 'Verdi'
    }, {
      type: 'capacity',
      label: 'Kapasitet 2',
      value: '50 personer'
    }],
    variant: 'default'
  }
}`,...(F=(w=i.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};const z=["Default","AllTypes","Compact","Prominent","WithMaxVisible","WithTooltips","SingleFact","ManyFacts"];export{a as AllTypes,t as Compact,e as Default,i as ManyFacts,l as Prominent,s as SingleFact,n as WithMaxVisible,r as WithTooltips,z as __namedExportsOrder,_ as default};
//# sourceMappingURL=KeyFactsRow.stories-DBWiG44k.js.map
