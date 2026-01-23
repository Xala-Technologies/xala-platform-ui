import{j as a}from"./jsx-runtime-BYYWji4R.js";import{S as X,a as J}from"./Sparkles-B_SIt72B.js";import{S as Q}from"./ExclamationmarkTriangle-CLWBPwmI.js";import{r as Y,R as x}from"./index-ClcD9ViR.js";import{u as Z}from"./useId-DmiD3Xrk.js";import{T as e}from"./tag-DS5F5fAT.js";import{H as t}from"./heading-mzc2R_Ff.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";var $=function(r,c){var i={};for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&c.indexOf(s)<0&&(i[s]=r[s]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(r);n<s.length;n++)c.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(r,s[n])&&(i[s[n]]=r[s[n]]);return i};const aa=Y.forwardRef((r,c)=>{var{title:i,titleId:s}=r,n=$(r,["title","titleId"]);let g=Z();return g=i?s||"title-"+g:void 0,x.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:c,"aria-labelledby":g},n),i?x.createElement("title",{id:g},i):null,x.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 3.25a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75zm.75 16V4.75h14.5v14.5zM11 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0M10.5 10a.75.75 0 0 0 0 1.5h.75v4h-.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-.75v-4.75A.75.75 0 0 0 12 10z",clipRule:"evenodd"}))}),ca={title:"Components/Tag",component:e,parameters:{docs:{description:{component:`
Tag is a label that can be used to categorize items or communicate progress, status, or process. Tags provide users with a quicker overview of content.

## Variants

- **Default** - Filled background (standard)
- **Outline** - Outlined border (more visible on colored backgrounds)
- **With icons** - Add visual information and context
- **Removable** - Interactive tags with remove button

## Colors

Available in all theme colors: **accent**, **brand1**, **brand2**, **brand3**, **neutral**, **success**, **warning**, **danger**, **info**.

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Categorizing and labeling items
- Showing status, type, or state
- Active filter indicators
- Metadata and attribute display
- Progress or process communication
- Keyword or topic tags

## Best Practices

### Do
- Keep text short and clear (1-3 words)
- Use consistent colors for same meanings across application
- Use icons to add visual clarity when helpful
- Choose variant based on background (outline for colored backgrounds)
- Group related tags together
- Use semantic colors (success for positive, danger for negative)

### Don't
- Don't use long text (keep under 20 characters)
- Don't use too many different colors in one context
- Don't make tags interactive unless necessary (use Button instead)
- Don't rely on color alone to convey meaning
- Don't use for critical information that must be read

## Usage Patterns

### Basic Tag
\`\`\`tsx
<Tag>Category</Tag>
\`\`\`

### Status Tags
\`\`\`tsx
<Tag data-color="success">Active</Tag>
<Tag data-color="warning">Pending</Tag>
<Tag data-color="danger">Inactive</Tag>
\`\`\`

### Tags with Icons
\`\`\`tsx
<Tag data-color="success">
  <CheckCircle aria-hidden size={16} />
  Verified
</Tag>
<Tag data-color="warning">
  <AlertTriangle aria-hidden size={16} />
  Warning
</Tag>
\`\`\`

### Outline Variant
\`\`\`tsx
<Tag variant="outline" data-color="neutral">Outlined</Tag>
\`\`\`

### Size Variants
\`\`\`tsx
<Tag data-size="sm">Small</Tag>
<Tag data-size="md">Medium</Tag>
<Tag data-size="lg">Large</Tag>
\`\`\`

## Anti-Patterns

### Anti-pattern: Long Text in Tags
Tags are for short labels. Use other components for longer content.

### Anti-pattern: Too Many Colors
Using many different colors in one area creates visual confusion.

### Anti-pattern: Interactive Tags Without Proper Semantics
If tags need to be clickable, use proper button semantics or Button component.

### Anti-pattern: Color as Only Indicator
Don't rely solely on color. Include text or icons for meaning.

## Accessibility

### Screen Readers
- Tag content is read by screen readers
- Icons should have aria-hidden attribute
- Color meaning should be supplemented with text
- Context should be clear from surrounding content

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for text
- **Color not sole indicator**: Meaning conveyed through text, not just color
- **Text alternative**: Tag content provides meaning
- **Readable text**: Sufficient size and contrast
- **Touch target**: Minimum 44x44px for interactive tags

### Tags with Icons
Icons should be decorative:
\`\`\`tsx
<Tag data-color="success">
  <CheckCircle aria-hidden size={16} />
  Verified
</Tag>
\`\`\`

### Interactive Tags
If tags are interactive, use proper semantics:
\`\`\`tsx
<Tag asChild>
  <button type="button" onClick={handleRemove} aria-label="Remove category tag">
    Category
    <XIcon aria-hidden size={16} />
  </button>
</Tag>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["accent","brand1","brand2","brand3","neutral","success","warning","danger","info"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}},"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}}}},p={render:()=>a.jsx(e,{children:"Default tag"})},m={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(e,{"data-color":"neutral",children:"Neutral"}),a.jsx(e,{"data-color":"success",children:"Success"}),a.jsx(e,{"data-color":"warning",children:"Warning"}),a.jsx(e,{"data-color":"danger",children:"Danger"}),a.jsx(e,{"data-color":"info",children:"Info"})]})},v={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(e,{"data-size":"sm",children:"Small"}),a.jsx(e,{"data-size":"md",children:"Medium"}),a.jsx(e,{"data-size":"lg",children:"Large"})]})},u={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(e,{"data-color":"success",children:"Active"}),a.jsx(e,{"data-color":"warning",children:"Pending"}),a.jsx(e,{"data-color":"danger",children:"Cancelled"}),a.jsx(e,{"data-color":"neutral",children:"Draft"}),a.jsx(e,{"data-color":"info",children:"Processing"})]})},f={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(e,{children:"Meeting Room"}),a.jsx(e,{children:"Sports Hall"}),a.jsx(e,{children:"Outdoor"}),a.jsx(e,{children:"Equipment"})]})},d={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsxs(e,{"data-color":"neutral","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(J,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),"AI-generated"]}),a.jsxs(e,{"data-color":"success","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(X,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),"Verified"]}),a.jsxs(e,{"data-color":"warning","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(Q,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),"Review needed"]}),a.jsxs(e,{"data-color":"info","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(aa,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),"New"]})]})},o={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[a.jsxs("div",{children:[a.jsx("h4",{style:{marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)"},children:"Default (filled)"}),a.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:["accent","brand1","brand2","brand3","neutral","success","warning","danger","info"].map(r=>a.jsx(e,{"data-color":r,variant:"default",children:r},r))})]}),a.jsxs("div",{children:[a.jsx("h4",{style:{marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)"},children:"Outline"}),a.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:["accent","brand1","brand2","brand3","neutral","success","warning","danger","info"].map(r=>a.jsx(e,{"data-color":r,variant:"outline",children:r},r))})]})]})},l={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[a.jsxs("div",{children:[a.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Colors"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(e,{"data-color":"neutral",children:"Neutral"}),a.jsx(e,{"data-color":"success",children:"Success"}),a.jsx(e,{"data-color":"warning",children:"Warning"}),a.jsx(e,{"data-color":"danger",children:"Danger"}),a.jsx(e,{"data-color":"info",children:"Info"}),a.jsx(e,{"data-color":"accent",children:"Accent"})]})]}),a.jsxs("div",{children:[a.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(e,{"data-size":"sm",children:"Small"}),a.jsx(e,{"data-size":"md",children:"Medium"}),a.jsx(e,{"data-size":"lg",children:"Large"})]})]}),a.jsxs("div",{children:[a.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Variants"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(e,{variant:"default",children:"Default"}),a.jsx(e,{variant:"outline",children:"Outline"})]})]}),a.jsxs("div",{children:[a.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Icons"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsxs(e,{"data-color":"success",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(X,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),"Verified"]}),a.jsxs(e,{"data-color":"neutral",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(J,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),"AI-generated"]})]})]}),a.jsxs("div",{children:[a.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Status Examples"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(e,{"data-color":"success",children:"Active"}),a.jsx(e,{"data-color":"warning",children:"Pending"}),a.jsx(e,{"data-color":"danger",children:"Cancelled"}),a.jsx(e,{"data-color":"neutral",children:"Draft"}),a.jsx(e,{"data-color":"info",children:"Processing"})]})]})]})};var h,y,T;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Tag>Default tag</Tag>
}`,...(T=(y=p.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var j,S,z;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    flexWrap: 'wrap'
  }}>
      <Tag data-color="neutral">Neutral</Tag>
      <Tag data-color="success">Success</Tag>
      <Tag data-color="warning">Warning</Tag>
      <Tag data-color="danger">Danger</Tag>
      <Tag data-color="info">Info</Tag>
    </div>
}`,...(z=(S=m.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var I,b,w;v.parameters={...v.parameters,docs:{...(I=v.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    alignItems: 'center'
  }}>
      <Tag data-size="sm">Small</Tag>
      <Tag data-size="md">Medium</Tag>
      <Tag data-size="lg">Large</Tag>
    </div>
}`,...(w=(b=v.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var C,W,A;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    flexWrap: 'wrap'
  }}>
      <Tag data-color="success">Active</Tag>
      <Tag data-color="warning">Pending</Tag>
      <Tag data-color="danger">Cancelled</Tag>
      <Tag data-color="neutral">Draft</Tag>
      <Tag data-color="info">Processing</Tag>
    </div>
}`,...(A=(W=u.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var D,E,k;f.parameters={...f.parameters,docs:{...(D=f.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    flexWrap: 'wrap'
  }}>
      <Tag>Meeting Room</Tag>
      <Tag>Sports Hall</Tag>
      <Tag>Outdoor</Tag>
      <Tag>Equipment</Tag>
    </div>
}`,...(k=(E=f.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var O,V,B,P,M;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    flexWrap: 'wrap'
  }}>
      <Tag data-color="neutral" data-size="md" style={{
      paddingInlineStart: 'var(--ds-spacing-1)'
    }}>
        <SparklesIcon fontSize="1rem" aria-hidden style={{
        marginInlineEnd: 'var(--ds-spacing-1)'
      }} />
        AI-generated
      </Tag>
      <Tag data-color="success" data-size="md" style={{
      paddingInlineStart: 'var(--ds-spacing-1)'
    }}>
        <CheckmarkCircleIcon fontSize="1rem" aria-hidden style={{
        marginInlineEnd: 'var(--ds-spacing-1)'
      }} />
        Verified
      </Tag>
      <Tag data-color="warning" data-size="md" style={{
      paddingInlineStart: 'var(--ds-spacing-1)'
    }}>
        <ExclamationmarkTriangleIcon fontSize="1rem" aria-hidden style={{
        marginInlineEnd: 'var(--ds-spacing-1)'
      }} />
        Review needed
      </Tag>
      <Tag data-color="info" data-size="md" style={{
      paddingInlineStart: 'var(--ds-spacing-1)'
    }}>
        <InformationSquareIcon fontSize="1rem" aria-hidden style={{
        marginInlineEnd: 'var(--ds-spacing-1)'
      }} />
        New
      </Tag>
    </div>
}`,...(B=(V=d.parameters)==null?void 0:V.docs)==null?void 0:B.source},description:{story:"With icons - Add visual information",...(M=(P=d.parameters)==null?void 0:P.docs)==null?void 0:M.description}}};var R,H,U,L,N;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <div>
        <h4 style={{
        marginBottom: 'var(--ds-spacing-2)',
        fontSize: 'var(--ds-font-size-sm)'
      }}>
          Default (filled)
        </h4>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          {['accent', 'brand1', 'brand2', 'brand3', 'neutral', 'success', 'warning', 'danger', 'info'].map(color => <Tag key={color} data-color={color as any} variant="default">
              {color}
            </Tag>)}
        </div>
      </div>
      <div>
        <h4 style={{
        marginBottom: 'var(--ds-spacing-2)',
        fontSize: 'var(--ds-font-size-sm)'
      }}>
          Outline
        </h4>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          {['accent', 'brand1', 'brand2', 'brand3', 'neutral', 'success', 'warning', 'danger', 'info'].map(color => <Tag key={color} data-color={color as any} variant="outline">
              {color}
            </Tag>)}
        </div>
      </div>
    </div>
}`,...(U=(H=o.parameters)==null?void 0:H.docs)==null?void 0:U.source},description:{story:"Variants - Default vs Outline",...(N=(L=o.parameters)==null?void 0:L.docs)==null?void 0:N.description}}};var _,q,G,K,F;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Colors
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          <Tag data-color="neutral">Neutral</Tag>
          <Tag data-color="success">Success</Tag>
          <Tag data-color="warning">Warning</Tag>
          <Tag data-color="danger">Danger</Tag>
          <Tag data-color="info">Info</Tag>
          <Tag data-color="accent">Accent</Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Sizes
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        alignItems: 'center'
      }}>
          <Tag data-size="sm">Small</Tag>
          <Tag data-size="md">Medium</Tag>
          <Tag data-size="lg">Large</Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Variants
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)'
      }}>
          <Tag variant="default">Default</Tag>
          <Tag variant="outline">Outline</Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          With Icons
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          <Tag data-color="success" style={{
          paddingInlineStart: 'var(--ds-spacing-1)'
        }}>
            <CheckmarkCircleIcon fontSize="1rem" aria-hidden style={{
            marginInlineEnd: 'var(--ds-spacing-1)'
          }} />
            Verified
          </Tag>
          <Tag data-color="neutral" style={{
          paddingInlineStart: 'var(--ds-spacing-1)'
        }}>
            <SparklesIcon fontSize="1rem" aria-hidden style={{
            marginInlineEnd: 'var(--ds-spacing-1)'
          }} />
            AI-generated
          </Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Status Examples
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          <Tag data-color="success">Active</Tag>
          <Tag data-color="warning">Pending</Tag>
          <Tag data-color="danger">Cancelled</Tag>
          <Tag data-color="neutral">Draft</Tag>
          <Tag data-color="info">Processing</Tag>
        </div>
      </div>
    </div>
}`,...(G=(q=l.parameters)==null?void 0:q.docs)==null?void 0:G.source},description:{story:"All variants overview",...(F=(K=l.parameters)==null?void 0:K.docs)==null?void 0:F.description}}};const ga=["Default","Colors","Sizes","StatusTags","CategoryTags","WithIcons","Variants","AllVariants"];export{l as AllVariants,f as CategoryTags,m as Colors,p as Default,v as Sizes,u as StatusTags,o as Variants,d as WithIcons,ga as __namedExportsOrder,ca as default};
//# sourceMappingURL=Tag.stories-FX3Uto2z.js.map
