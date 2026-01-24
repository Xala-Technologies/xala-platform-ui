import{j as a}from"./jsx-runtime-BYYWji4R.js";import{u as i}from"./index-bjNF47ar.js";import{S as J,a as Q}from"./Sparkles-B_SIt72B.js";import{S as Y}from"./ExclamationmarkTriangle-CLWBPwmI.js";import{r as Z,R as x}from"./index-ClcD9ViR.js";import{u as $}from"./useId-DmiD3Xrk.js";import{T as r}from"./tag-DS5F5fAT.js";import{H as d}from"./heading-mzc2R_Ff.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";var aa=function(t,e){var o={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(o[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(t);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(t,s[n])&&(o[s[n]]=t[s[n]]);return o};const ea=Z.forwardRef((t,e)=>{var{title:o,titleId:s}=t,n=aa(t,["title","titleId"]);let m=$();return m=o?s||"title-"+m:void 0,x.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:e,"aria-labelledby":m},n),o?x.createElement("title",{id:m},o):null,x.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 3.25a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75zm.75 16V4.75h14.5v14.5zM11 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0M10.5 10a.75.75 0 0 0 0 1.5h.75v4h-.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-.75v-4.75A.75.75 0 0 0 12 10z",clipRule:"evenodd"}))}),pa={title:"Components/Tag",component:r,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["accent","brand1","brand2","brand3","neutral","success","warning","danger","info"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}},"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}}}},p={render:function(){const e=i();return a.jsx(r,{children:e("storybook.demo.defaultTag")})}},u={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(r,{"data-color":"neutral",children:e("storybook.demo.neutral")}),a.jsx(r,{"data-color":"success",children:e("storybook.demo.success")}),a.jsx(r,{"data-color":"warning",children:e("storybook.demo.warning")}),a.jsx(r,{"data-color":"danger",children:e("storybook.demo.danger")}),a.jsx(r,{"data-color":"info",children:e("storybook.demo.info")})]})}},y={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(r,{"data-size":"sm",children:e("storybook.demo.small")}),a.jsx(r,{"data-size":"md",children:e("storybook.demo.medium")}),a.jsx(r,{"data-size":"lg",children:e("storybook.demo.large")})]})}},v={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(r,{"data-color":"success",children:e("platform.status.active")}),a.jsx(r,{"data-color":"warning",children:e("platform.status.pending")}),a.jsx(r,{"data-color":"danger",children:e("platform.status.cancelled")}),a.jsx(r,{"data-color":"neutral",children:e("storybook.demo.draft")}),a.jsx(r,{"data-color":"info",children:e("storybook.demo.processing")})]})}},f={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(r,{children:e("storybook.demo.meetingRoom")}),a.jsx(r,{children:e("storybook.demo.sportsHall")}),a.jsx(r,{children:e("storybook.demo.outdoor")}),a.jsx(r,{children:e("storybook.demo.equipment")})]})}},l={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsxs(r,{"data-color":"neutral","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(Q,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),e("storybook.demo.aiGenerated")]}),a.jsxs(r,{"data-color":"success","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(J,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),e("storybook.demo.verified")]}),a.jsxs(r,{"data-color":"warning","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(Y,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),e("storybook.demo.reviewNeeded")]}),a.jsxs(r,{"data-color":"info","data-size":"md",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(ea,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),e("storybook.demo.new")]})]})}},c={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[a.jsxs("div",{children:[a.jsx("h4",{style:{marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)"},children:e("storybook.demo.defaultFilled")}),a.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:["accent","brand1","brand2","brand3","neutral","success","warning","danger","info"].map(o=>a.jsx(r,{"data-color":o,variant:"default",children:o},o))})]}),a.jsxs("div",{children:[a.jsx("h4",{style:{marginBottom:"var(--ds-spacing-2)",fontSize:"var(--ds-font-size-sm)"},children:e("storybook.demo.outline")}),a.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:["accent","brand1","brand2","brand3","neutral","success","warning","danger","info"].map(o=>a.jsx(r,{"data-color":o,variant:"outline",children:o},o))})]})]})}},g={render:function(){const e=i();return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[a.jsxs("div",{children:[a.jsx(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.colors")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(r,{"data-color":"neutral",children:e("storybook.demo.neutral")}),a.jsx(r,{"data-color":"success",children:e("storybook.demo.success")}),a.jsx(r,{"data-color":"warning",children:e("storybook.demo.warning")}),a.jsx(r,{"data-color":"danger",children:e("storybook.demo.danger")}),a.jsx(r,{"data-color":"info",children:e("storybook.demo.info")}),a.jsx(r,{"data-color":"accent",children:e("storybook.demo.accent")})]})]}),a.jsxs("div",{children:[a.jsx(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.sizes")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(r,{"data-size":"sm",children:e("storybook.demo.small")}),a.jsx(r,{"data-size":"md",children:e("storybook.demo.medium")}),a.jsx(r,{"data-size":"lg",children:e("storybook.demo.large")})]})]}),a.jsxs("div",{children:[a.jsx(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.variants")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{variant:"default",children:e("storybook.story.default")}),a.jsx(r,{variant:"outline",children:e("storybook.demo.outline")})]})]}),a.jsxs("div",{children:[a.jsx(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.withIcons")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsxs(r,{"data-color":"success",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(J,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),e("storybook.demo.verified")]}),a.jsxs(r,{"data-color":"neutral",style:{paddingInlineStart:"var(--ds-spacing-1)"},children:[a.jsx(Q,{fontSize:"1rem","aria-hidden":!0,style:{marginInlineEnd:"var(--ds-spacing-1)"}}),e("storybook.demo.aiGenerated")]})]})]}),a.jsxs("div",{children:[a.jsx(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.statusExamples")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(r,{"data-color":"success",children:e("platform.status.active")}),a.jsx(r,{"data-color":"warning",children:e("platform.status.pending")}),a.jsx(r,{"data-color":"danger",children:e("platform.status.cancelled")}),a.jsx(r,{"data-color":"neutral",children:e("storybook.demo.draft")}),a.jsx(r,{"data-color":"info",children:e("storybook.demo.processing")})]})]})]})}};var h,T,b;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Tag>{t('storybook.demo.defaultTag')}</Tag>;
  }
}`,...(b=(T=p.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var k,j,z;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        <Tag data-color="neutral">{t('storybook.demo.neutral')}</Tag>
        <Tag data-color="success">{t('storybook.demo.success')}</Tag>
        <Tag data-color="warning">{t('storybook.demo.warning')}</Tag>
        <Tag data-color="danger">{t('storybook.demo.danger')}</Tag>
        <Tag data-color="info">{t('storybook.demo.info')}</Tag>
      </div>;
  }
}`,...(z=(j=u.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var w,S,I;y.parameters={...y.parameters,docs:{...(w=y.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      alignItems: 'center'
    }}>
        <Tag data-size="sm">{t('storybook.demo.small')}</Tag>
        <Tag data-size="md">{t('storybook.demo.medium')}</Tag>
        <Tag data-size="lg">{t('storybook.demo.large')}</Tag>
      </div>;
  }
}`,...(I=(S=y.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var C,R,W;v.parameters={...v.parameters,docs:{...(C=v.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        <Tag data-color="success">{t('platform.status.active')}</Tag>
        <Tag data-color="warning">{t('platform.status.pending')}</Tag>
        <Tag data-color="danger">{t('platform.status.cancelled')}</Tag>
        <Tag data-color="neutral">{t('storybook.demo.draft')}</Tag>
        <Tag data-color="info">{t('storybook.demo.processing')}</Tag>
      </div>;
  }
}`,...(W=(R=v.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var E,A,B;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      flexWrap: 'wrap'
    }}>
        <Tag>{t('storybook.demo.meetingRoom')}</Tag>
        <Tag>{t('storybook.demo.sportsHall')}</Tag>
        <Tag>{t('storybook.demo.outdoor')}</Tag>
        <Tag>{t('storybook.demo.equipment')}</Tag>
      </div>;
  }
}`,...(B=(A=f.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var O,D,H,V,M;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
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
          {t('storybook.demo.aiGenerated')}
        </Tag>
        <Tag data-color="success" data-size="md" style={{
        paddingInlineStart: 'var(--ds-spacing-1)'
      }}>
          <CheckmarkCircleIcon fontSize="1rem" aria-hidden style={{
          marginInlineEnd: 'var(--ds-spacing-1)'
        }} />
          {t('storybook.demo.verified')}
        </Tag>
        <Tag data-color="warning" data-size="md" style={{
        paddingInlineStart: 'var(--ds-spacing-1)'
      }}>
          <ExclamationmarkTriangleIcon fontSize="1rem" aria-hidden style={{
          marginInlineEnd: 'var(--ds-spacing-1)'
        }} />
          {t('storybook.demo.reviewNeeded')}
        </Tag>
        <Tag data-color="info" data-size="md" style={{
        paddingInlineStart: 'var(--ds-spacing-1)'
      }}>
          <InformationSquareIcon fontSize="1rem" aria-hidden style={{
          marginInlineEnd: 'var(--ds-spacing-1)'
        }} />
          {t('storybook.demo.new')}
        </Tag>
      </div>;
  }
}`,...(H=(D=l.parameters)==null?void 0:D.docs)==null?void 0:H.source},description:{story:"With icons - Add visual information",...(M=(V=l.parameters)==null?void 0:V.docs)==null?void 0:M.description}}};var P,U,G,_,q;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <div>
          <h4 style={{
          marginBottom: 'var(--ds-spacing-2)',
          fontSize: 'var(--ds-font-size-sm)'
        }}>
            {t('storybook.demo.defaultFilled')}
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
            {t('storybook.demo.outline')}
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
      </div>;
  }
}`,...(G=(U=c.parameters)==null?void 0:U.docs)==null?void 0:G.source},description:{story:"Variants - Default vs Outline",...(q=(_=c.parameters)==null?void 0:_.docs)==null?void 0:q.description}}};var F,K,L,N,X;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.colors')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Tag data-color="neutral">{t('storybook.demo.neutral')}</Tag>
            <Tag data-color="success">{t('storybook.demo.success')}</Tag>
            <Tag data-color="warning">{t('storybook.demo.warning')}</Tag>
            <Tag data-color="danger">{t('storybook.demo.danger')}</Tag>
            <Tag data-color="info">{t('storybook.demo.info')}</Tag>
            <Tag data-color="accent">{t('storybook.demo.accent')}</Tag>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.sizes')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          alignItems: 'center'
        }}>
            <Tag data-size="sm">{t('storybook.demo.small')}</Tag>
            <Tag data-size="md">{t('storybook.demo.medium')}</Tag>
            <Tag data-size="lg">{t('storybook.demo.large')}</Tag>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.variants')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)'
        }}>
            <Tag variant="default">{t('storybook.story.default')}</Tag>
            <Tag variant="outline">{t('storybook.demo.outline')}</Tag>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.withIcons')}
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
              {t('storybook.demo.verified')}
            </Tag>
            <Tag data-color="neutral" style={{
            paddingInlineStart: 'var(--ds-spacing-1)'
          }}>
              <SparklesIcon fontSize="1rem" aria-hidden style={{
              marginInlineEnd: 'var(--ds-spacing-1)'
            }} />
              {t('storybook.demo.aiGenerated')}
            </Tag>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.statusExamples')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Tag data-color="success">{t('platform.status.active')}</Tag>
            <Tag data-color="warning">{t('platform.status.pending')}</Tag>
            <Tag data-color="danger">{t('platform.status.cancelled')}</Tag>
            <Tag data-color="neutral">{t('storybook.demo.draft')}</Tag>
            <Tag data-color="info">{t('storybook.demo.processing')}</Tag>
          </div>
        </div>
      </div>;
  }
}`,...(L=(K=g.parameters)==null?void 0:K.docs)==null?void 0:L.source},description:{story:"All variants overview",...(X=(N=g.parameters)==null?void 0:N.docs)==null?void 0:X.description}}};const ua=["Default","Colors","Sizes","StatusTags","CategoryTags","WithIcons","Variants","AllVariants"];export{g as AllVariants,f as CategoryTags,u as Colors,p as Default,y as Sizes,v as StatusTags,c as Variants,l as WithIcons,ua as __namedExportsOrder,pa as default};
//# sourceMappingURL=Tag.stories-DeZQkC6H.js.map
