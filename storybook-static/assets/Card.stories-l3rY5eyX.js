import{j as e}from"./jsx-runtime-BYYWji4R.js";import{C as a}from"./index-D1XdeRjR.js";import"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import{B as v}from"./button-B6PgazAq.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as r}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import{L as ye}from"./link-DlTbUgI1.js";import{P as t}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const Fe={title:"Components/Card",component:a,parameters:{docs:{description:{component:`
Card highlights information or tasks that are related. The component comes in two variants and can contain text, images, buttons, and links.

## Variants

- **Default** - Standard card with white background
- **Tinted** - Colored background variant
- **With sections** - Card.Block for divided content
- **Link card** - Navigation to another page (use asChild with anchor)
- **Button card** - Triggers action on same page (use asChild with button)
- **Horizontal** - Side-by-side layout using grid

## Colors

Available in all theme colors: **accent**, **brand1**, **brand2**, **brand3**, **neutral**.

## When to Use

- Displaying grouped related information
- List items with multiple data points
- Interactive content blocks that navigate or trigger actions
- Navigation cards to other pages
- Media content with descriptions
- Dashboard widgets and summaries

## Best Practices

### Do
- Use Card.Block to divide content into logical sections
- Keep content concise and scannable
- Use appropriate heading levels (h2, h3, h4)
- Ensure interactive cards are keyboard accessible
- Use asChild with semantic HTML (button for actions, anchor for navigation)
- Provide clear visual hierarchy
- Use consistent card sizes in grids
- Add hover states for interactive cards

### Don't
- Don't nest cards inside cards
- Don't use cards for single pieces of information (use other components)
- Don't make cards too tall (keep content focused)
- Don't use onClick without proper semantic HTML
- Don't mix interactive and non-interactive cards in same context
- Don't use cards for form inputs

## Usage Patterns

### Basic Card
\`\`\`tsx
<Card>
  <Heading level={3} data-size="sm">Card Title</Heading>
  <Paragraph>
    Card content goes here. Keep it concise and scannable.
  </Paragraph>
</Card>
\`\`\`

### Card with Sections
\`\`\`tsx
<Card data-color="neutral">
  <Card.Block>
    <Heading level={3} data-size="md">Section 1</Heading>
    <Paragraph>First section content</Paragraph>
  </Card.Block>
  <Card.Block>
    <Heading level={4} data-size="sm">Section 2</Heading>
    <Paragraph>Second section content</Paragraph>
  </Card.Block>
</Card>
\`\`\`

### Interactive Card as Link
\`\`\`tsx
<Card asChild data-color="neutral">
  <a href="/details">
    <Card.Block>
      <Heading level={3} data-size="md">View Details</Heading>
      <Paragraph>Click to navigate to details page</Paragraph>
    </Card.Block>
  </a>
</Card>
\`\`\`

### Interactive Card as Button
\`\`\`tsx
<Card asChild data-color="neutral">
  <button type="button" onClick={handleAction}>
    <Card.Block>
      <Heading level={3} data-size="md">Settings</Heading>
      <Paragraph>Click to open settings dialog</Paragraph>
    </Card.Block>
  </button>
</Card>
\`\`\`

### Card with Actions
\`\`\`tsx
<Card>
  <Heading level={3} data-size="sm">Request</Heading>
  <Paragraph>John Doe has requested access.</Paragraph>
  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-4)' }}>
    <Button variant="secondary" type="button">Decline</Button>
    <Button variant="primary" type="button">Approve</Button>
  </div>
</Card>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using onClick Without Semantic HTML
Don't use onClick directly on Card. Use asChild with button or anchor instead.

### Anti-pattern: Nested Cards
Cards inside cards create confusing visual hierarchy and poor accessibility.

### Anti-pattern: Cards for Everything
Not all content needs a card. Use cards for grouped, related information only.

### Anti-pattern: Inconsistent Card Heights in Grids
Cards in the same grid should have consistent heights for visual harmony.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to interactive elements inside card
- **Enter** or **Space** activates interactive cards (when using asChild with button)
- **Enter** follows links (when using asChild with anchor)
- Focus indicators must be visible on interactive cards

### Screen Readers
- Card content structure is announced
- Heading hierarchy provides context
- Interactive cards announce role (button or link)
- Card.Block sections are properly separated
- Images require alt text

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for text
- **Focus visible**: Clear focus indicator on interactive cards
- **Touch target**: Minimum 44x44px for interactive elements
- **Semantic HTML**: Use asChild with button/anchor for interactive cards
- **Heading hierarchy**: Proper heading levels (h2, h3, h4)
- **Keyboard accessible**: All interactive elements reachable via keyboard

### Interactive Cards
Always use semantic HTML for interactive cards:
\`\`\`tsx
// For navigation
<Card asChild>
  <a href="/page" aria-label="View details">
    <Card.Block>Content</Card.Block>
  </a>
</Card>

// For actions
<Card asChild>
  <button type="button" aria-label="Open settings">
    <Card.Block>Content</Card.Block>
  </button>
</Card>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["accent","brand1","brand2","brand3","neutral"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}},asChild:{control:"boolean",description:"Render as child element (button/link)"}}},i={render:()=>e.jsxs(a,{children:[e.jsx(r,{level:3,"data-size":"sm",children:"Card Title"}),e.jsx(t,{children:"This is a basic card with some content. Cards are used to group related information."})]})},n={render:()=>e.jsxs(a,{children:[e.jsx(r,{level:3,"data-size":"sm",children:"ResourceRequest Request"}),e.jsx(t,{children:"John Doe has requested to book Meeting Room A for December 15, 2024."}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginTop:"var(--ds-spacing-4)"},children:[e.jsx(v,{variant:"secondary",type:"button",children:"Decline"}),e.jsx(v,{variant:"primary",type:"button",children:"Approve"})]})]})},o={render:()=>e.jsxs(a,{style:{cursor:"pointer"},onClick:()=>{},children:[e.jsx(r,{level:3,"data-size":"sm",children:"Click to View Details"}),e.jsx(t,{children:"This entire card is clickable. Use onClick for interactivity."})]})},d={render:()=>e.jsxs(a,{style:{overflow:"hidden"},children:[e.jsx("div",{style:{aspectRatio:"16/9",backgroundColor:"var(--ds-color-neutral-surface-default)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Image Placeholder"})}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)"},children:[e.jsx(r,{level:3,"data-size":"sm",children:"Featured Resource"}),e.jsx(t,{children:"A beautiful meeting space in the city center."})]})]})},l={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:["accent","brand1","brand2","brand3","neutral"].map(s=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{"data-color":s,"data-variant":"default",style:{flex:1},children:e.jsx(a.Block,{children:e.jsxs(t,{children:["default: ",s]})})}),e.jsx(a,{"data-color":s,"data-variant":"tinted",style:{flex:1},children:e.jsx(a.Block,{children:e.jsxs(t,{children:["tinted: ",s]})})})]},s))})},c={render:()=>e.jsxs(a,{"data-color":"neutral",style:{maxWidth:"380px"},children:[e.jsx(a.Block,{children:e.jsx("div",{style:{aspectRatio:"16/9",backgroundColor:"var(--ds-color-neutral-surface-default)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Video/Image Placeholder"})})}),e.jsxs(a.Block,{children:[e.jsx(r,{level:3,"data-size":"md",children:"About Designsystemet"}),e.jsx(t,{children:"This card demonstrates how to divide content into sections using Card.Block. Each block gets automatic dividers."})]})]})},p={render:()=>e.jsx(a,{"data-color":"neutral",children:e.jsxs(a.Block,{children:[e.jsx(r,{level:3,"data-size":"md",children:e.jsx(ye,{href:"https://designsystemet.no",target:"_blank",rel:"noopener noreferrer",children:"Visit Designsystemet"})}),e.jsx(t,{children:"The Designsystemet provides components, guidelines, and tools for building accessible Norwegian public services."}),e.jsx(t,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Norwegian Digitalisation Agency"})]})})},h={render:()=>e.jsx(a,{asChild:!0,"data-color":"neutral",children:e.jsxs("button",{type:"button",onClick:()=>{},children:[e.jsx(a.Block,{children:e.jsx(r,{level:3,"data-size":"md",children:"Settings and privacy"})}),e.jsx(a.Block,{children:e.jsx(t,{children:"This opens a dialogue where you can update your privacy choices, adjust settings, and customize how the service handles your information."})})]})})},g={render:()=>e.jsxs(a,{"data-color":"neutral",style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0},children:[e.jsx(a.Block,{children:e.jsx(r,{level:3,"data-size":"md",children:"Wanderlust"})}),e.jsx(a.Block,{children:e.jsx(t,{children:"Symptoms may include restlessness, heightened awareness, and a tendency to constantly look over your shoulder. The condition usually subsides after a good meal and a safe place to rest."})})]})},u={render:()=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[1,2,3,4].map(s=>e.jsx(a,{"data-color":"neutral",children:e.jsxs(a.Block,{children:[e.jsxs(r,{level:3,"data-size":"sm",children:["Card ",s]}),e.jsxs(t,{children:["Content for card ",s,". Each card can contain different information and actions."]}),e.jsx(v,{variant:"secondary",type:"button",style:{marginTop:"var(--ds-spacing-3)"},children:"Learn more"})]})},s))})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Default vs Tinted"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{"data-variant":"default",style:{flex:1},children:e.jsxs(a.Block,{children:[e.jsx(r,{level:4,"data-size":"sm",children:"Default"}),e.jsx(t,{children:"White background"})]})}),e.jsx(a,{"data-variant":"tinted","data-color":"accent",style:{flex:1},children:e.jsxs(a.Block,{children:[e.jsx(r,{level:4,"data-size":"sm",children:"Tinted"}),e.jsx(t,{children:"Colored background"})]})})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Sections"}),e.jsxs(a,{"data-color":"neutral",style:{maxWidth:"300px"},children:[e.jsx(a.Block,{children:e.jsx(r,{level:4,"data-size":"sm",children:"Section 1"})}),e.jsx(a.Block,{children:e.jsx(t,{children:"Section 2 with divider"})})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Interactive Cards"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{style:{cursor:"pointer",flex:1},onClick:()=>{},children:e.jsxs(a.Block,{children:[e.jsx(r,{level:4,"data-size":"sm",children:"Clickable"}),e.jsx(t,{children:"With onClick"})]})}),e.jsx(a,{asChild:!0,style:{flex:1},children:e.jsx("button",{type:"button",children:e.jsxs(a.Block,{children:[e.jsx(r,{level:4,"data-size":"sm",children:"As Button"}),e.jsx(t,{children:"Semantic button"})]})})})]})]})]})};var C,y,x,f,k;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card>
      <Heading level={3} data-size="sm">
        Card Title
      </Heading>
      <Paragraph>
        This is a basic card with some content. Cards are used to group related information.
      </Paragraph>
    </Card>
}`,...(x=(y=i.parameters)==null?void 0:y.docs)==null?void 0:x.source},description:{story:"Default card",...(k=(f=i.parameters)==null?void 0:f.docs)==null?void 0:k.description}}};var b,j,B,H,P;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Card>
      <Heading level={3} data-size="sm">
        ResourceRequest Request
      </Heading>
      <Paragraph>John Doe has requested to book Meeting Room A for December 15, 2024.</Paragraph>
      <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      marginTop: 'var(--ds-spacing-4)'
    }}>
        <Button variant="secondary" type="button">
          Decline
        </Button>
        <Button variant="primary" type="button">
          Approve
        </Button>
      </div>
    </Card>
}`,...(B=(j=n.parameters)==null?void 0:j.docs)==null?void 0:B.source},description:{story:"Card with actions",...(P=(H=n.parameters)==null?void 0:H.docs)==null?void 0:P.description}}};var z,w,D,A,S;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Card style={{
    cursor: 'pointer'
  }} onClick={() => {}}>
      <Heading level={3} data-size="sm">
        Click to View Details
      </Heading>
      <Paragraph>This entire card is clickable. Use onClick for interactivity.</Paragraph>
    </Card>
}`,...(D=(w=o.parameters)==null?void 0:w.docs)==null?void 0:D.source},description:{story:"Card as clickable",...(S=(A=o.parameters)==null?void 0:A.docs)==null?void 0:S.description}}};var T,W,I,R,L;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Card style={{
    overflow: 'hidden'
  }}>
      <div style={{
      aspectRatio: '16/9',
      backgroundColor: 'var(--ds-color-neutral-surface-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <span style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>Image Placeholder</span>
      </div>
      <div style={{
      padding: 'var(--ds-spacing-4)'
    }}>
        <Heading level={3} data-size="sm">
          Featured Resource
        </Heading>
        <Paragraph>A beautiful meeting space in the city center.</Paragraph>
      </div>
    </Card>
}`,...(I=(W=d.parameters)==null?void 0:W.docs)==null?void 0:I.source},description:{story:"Card with image",...(L=(R=d.parameters)==null?void 0:R.docs)==null?void 0:L.description}}};var U,V,M,E,q;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      {['accent', 'brand1', 'brand2', 'brand3', 'neutral'].map(color => <div key={color} style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)'
    }}>
          <Card data-color={color as any} data-variant="default" style={{
        flex: 1
      }}>
            <Card.Block>
              <Paragraph>default: {color}</Paragraph>
            </Card.Block>
          </Card>
          <Card data-color={color as any} data-variant="tinted" style={{
        flex: 1
      }}>
            <Card.Block>
              <Paragraph>tinted: {color}</Paragraph>
            </Card.Block>
          </Card>
        </div>)}
    </div>
}`,...(M=(V=l.parameters)==null?void 0:V.docs)==null?void 0:M.source},description:{story:"Color variants - Available in all theme colors",...(q=(E=l.parameters)==null?void 0:E.docs)==null?void 0:q.description}}};var F,N,G,K,_;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Card data-color="neutral" style={{
    maxWidth: '380px'
  }}>
      <Card.Block>
        <div style={{
        aspectRatio: '16/9',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
          <span style={{
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            Video/Image Placeholder
          </span>
        </div>
      </Card.Block>
      <Card.Block>
        <Heading level={3} data-size="md">
          About Designsystemet
        </Heading>
        <Paragraph>
          This card demonstrates how to divide content into sections using Card.Block. Each block
          gets automatic dividers.
        </Paragraph>
      </Card.Block>
    </Card>
}`,...(G=(N=c.parameters)==null?void 0:N.docs)==null?void 0:G.source},description:{story:"With sections - Use Card.Block to divide content",...(_=(K=c.parameters)==null?void 0:K.docs)==null?void 0:_.description}}};var J,O,Q,X,Y;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <Card data-color="neutral">
      <Card.Block>
        <Heading level={3} data-size="md">
          <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
            Visit Designsystemet
          </Link>
        </Heading>
        <Paragraph>
          The Designsystemet provides components, guidelines, and tools for building accessible
          Norwegian public services.
        </Paragraph>
        <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Norwegian Digitalisation Agency
        </Paragraph>
      </Card.Block>
    </Card>
}`,...(Q=(O=p.parameters)==null?void 0:O.docs)==null?void 0:Q.source},description:{story:"Link card - For navigation",...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var Z,$,ee,ae,re;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <Card asChild data-color="neutral">
      <button type="button" onClick={() => {}}>
        <Card.Block>
          <Heading level={3} data-size="md">
            Settings and privacy
          </Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>
            This opens a dialogue where you can update your privacy choices, adjust settings, and
            customize how the service handles your information.
          </Paragraph>
        </Card.Block>
      </button>
    </Card>
}`,...(ee=($=h.parameters)==null?void 0:$.docs)==null?void 0:ee.source},description:{story:"Card as button - For actions on same page",...(re=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:re.description}}};var te,se,ie,ne,oe;g.parameters={...g.parameters,docs:{...(te=g.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <Card data-color="neutral" style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 0
  }}>
      <Card.Block>
        <Heading level={3} data-size="md">
          Wanderlust
        </Heading>
      </Card.Block>
      <Card.Block>
        <Paragraph>
          Symptoms may include restlessness, heightened awareness, and a tendency to constantly look
          over your shoulder. The condition usually subsides after a good meal and a safe place to
          rest.
        </Paragraph>
      </Card.Block>
    </Card>
}`,...(ie=(se=g.parameters)==null?void 0:se.docs)==null?void 0:ie.source},description:{story:"Horizontal layout - Side-by-side content",...(oe=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:oe.description}}};var de,le,ce,pe,he;u.parameters={...u.parameters,docs:{...(de=u.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--ds-spacing-4)'
  }}>
      {[1, 2, 3, 4].map(i => <Card key={i} data-color="neutral">
          <Card.Block>
            <Heading level={3} data-size="sm">
              Card {i}
            </Heading>
            <Paragraph>
              Content for card {i}. Each card can contain different information and actions.
            </Paragraph>
            <Button variant="secondary" type="button" style={{
          marginTop: 'var(--ds-spacing-3)'
        }}>
              Learn more
            </Button>
          </Card.Block>
        </Card>)}
    </div>
}`,...(ce=(le=u.parameters)==null?void 0:le.docs)==null?void 0:ce.source},description:{story:"Multiple cards in grid",...(he=(pe=u.parameters)==null?void 0:pe.docs)==null?void 0:he.description}}};var ge,ue,me,ve,Ce;m.parameters={...m.parameters,docs:{...(ge=m.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Default vs Tinted
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Card data-variant="default" style={{
          flex: 1
        }}>
            <Card.Block>
              <Heading level={4} data-size="sm">
                Default
              </Heading>
              <Paragraph>White background</Paragraph>
            </Card.Block>
          </Card>
          <Card data-variant="tinted" data-color="accent" style={{
          flex: 1
        }}>
            <Card.Block>
              <Heading level={4} data-size="sm">
                Tinted
              </Heading>
              <Paragraph>Colored background</Paragraph>
            </Card.Block>
          </Card>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          With Sections
        </Heading>
        <Card data-color="neutral" style={{
        maxWidth: '300px'
      }}>
          <Card.Block>
            <Heading level={4} data-size="sm">
              Section 1
            </Heading>
          </Card.Block>
          <Card.Block>
            <Paragraph>Section 2 with divider</Paragraph>
          </Card.Block>
        </Card>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Interactive Cards
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Card style={{
          cursor: 'pointer',
          flex: 1
        }} onClick={() => {}}>
            <Card.Block>
              <Heading level={4} data-size="sm">
                Clickable
              </Heading>
              <Paragraph>With onClick</Paragraph>
            </Card.Block>
          </Card>
          <Card asChild style={{
          flex: 1
        }}>
            <button type="button">
              <Card.Block>
                <Heading level={4} data-size="sm">
                  As Button
                </Heading>
                <Paragraph>Semantic button</Paragraph>
              </Card.Block>
            </button>
          </Card>
        </div>
      </div>
    </div>
}`,...(me=(ue=m.parameters)==null?void 0:ue.docs)==null?void 0:me.source},description:{story:"All variants overview",...(Ce=(ve=m.parameters)==null?void 0:ve.docs)==null?void 0:Ce.description}}};const Ne=["Default","WithActions","AsClickable","WithImage","Colors","WithSections","LinkCard","AsButton","Horizontal","CardGrid","AllVariants"];export{m as AllVariants,h as AsButton,o as AsClickable,u as CardGrid,l as Colors,i as Default,g as Horizontal,p as LinkCard,n as WithActions,d as WithImage,c as WithSections,Ne as __namedExportsOrder,Fe as default};
//# sourceMappingURL=Card.stories-l3rY5eyX.js.map
