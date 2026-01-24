import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as n}from"./index-bjNF47ar.js";import{C as a}from"./index-D1XdeRjR.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import{B as C}from"./button-B6PgazAq.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as t}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import{L as xe}from"./link-DlTbUgI1.js";import{P as o}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const _e={title:"Components/Card",component:a,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["accent","brand1","brand2","brand3","neutral"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}},asChild:{control:"boolean",description:"Render as child element (button/link)"}}},i={render:function(){const r=n();return e.jsxs(a,{children:[e.jsx(t,{level:3,"data-size":"sm",children:r("storybook.demo.cardTitle")}),e.jsx(o,{children:r("storybook.demo.cardDescription")})]})}},d={render:function(){const r=n();return e.jsxs(a,{children:[e.jsx(t,{level:3,"data-size":"sm",children:r("storybook.demo.resourceRequest")}),e.jsx(o,{children:r("storybook.demo.bookingRequestDescription")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginTop:"var(--ds-spacing-4)"},children:[e.jsx(C,{variant:"secondary",type:"button",children:r("storybook.demo.decline")}),e.jsx(C,{variant:"primary",type:"button",children:r("storybook.demo.approve")})]})]})}},c={render:function(){const r=n();return e.jsxs(a,{style:{cursor:"pointer"},onClick:()=>{},children:[e.jsx(t,{level:3,"data-size":"sm",children:r("storybook.demo.clickToViewDetails")}),e.jsx(o,{children:r("storybook.demo.clickableCardDescription")})]})}},l={render:function(){const r=n();return e.jsxs(a,{style:{overflow:"hidden"},children:[e.jsx("div",{style:{aspectRatio:"16/9",backgroundColor:"var(--ds-color-neutral-surface-default)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.demo.imagePlaceholder")})}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)"},children:[e.jsx(t,{level:3,"data-size":"sm",children:r("storybook.demo.featuredResource")}),e.jsx(o,{children:r("storybook.demo.meetingSpaceDescription")})]})]})}},p={render:function(){return e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:["accent","brand1","brand2","brand3","neutral"].map(r=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{"data-color":r,"data-variant":"default",style:{flex:1},children:e.jsx(a.Block,{children:e.jsxs(o,{children:["default: ",r]})})}),e.jsx(a,{"data-color":r,"data-variant":"tinted",style:{flex:1},children:e.jsx(a.Block,{children:e.jsxs(o,{children:["tinted: ",r]})})})]},r))})}},m={render:function(){const r=n();return e.jsxs(a,{"data-color":"neutral",style:{maxWidth:"380px"},children:[e.jsx(a.Block,{children:e.jsx("div",{style:{aspectRatio:"16/9",backgroundColor:"var(--ds-color-neutral-surface-default)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.demo.videoImagePlaceholder")})})}),e.jsxs(a.Block,{children:[e.jsx(t,{level:3,"data-size":"md",children:r("storybook.demo.aboutDesignsystemet")}),e.jsx(o,{children:r("storybook.demo.cardBlockDescription")})]})]})}},u={render:function(){const r=n();return e.jsx(a,{"data-color":"neutral",children:e.jsxs(a.Block,{children:[e.jsx(t,{level:3,"data-size":"md",children:e.jsx(xe,{href:"https://designsystemet.no",target:"_blank",rel:"noopener noreferrer",children:r("storybook.demo.visitDesignsystemet")})}),e.jsx(o,{children:r("storybook.demo.designsystemetDescription")}),e.jsx(o,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.demo.norwegianDigitalisationAgency")})]})})}},g={render:function(){const r=n();return e.jsx(a,{asChild:!0,"data-color":"neutral",children:e.jsxs("button",{type:"button",onClick:()=>{},children:[e.jsx(a.Block,{children:e.jsx(t,{level:3,"data-size":"md",children:r("storybook.demo.settingsAndPrivacy")})}),e.jsx(a.Block,{children:e.jsx(o,{children:r("storybook.demo.settingsDialogDescription")})})]})})}},h={render:function(){const r=n();return e.jsxs(a,{"data-color":"neutral",style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0},children:[e.jsx(a.Block,{children:e.jsx(t,{level:3,"data-size":"md",children:r("storybook.demo.wanderlust")})}),e.jsx(a.Block,{children:e.jsx(o,{children:r("storybook.demo.wanderlustDescription")})})]})}},y={render:function(){const r=n();return e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[1,2,3,4].map(k=>e.jsx(a,{"data-color":"neutral",children:e.jsxs(a.Block,{children:[e.jsxs(t,{level:3,"data-size":"sm",children:[r("storybook.demo.card")," ",k]}),e.jsxs(o,{children:[r("storybook.demo.cardContentFor")," ",k,"."," ",r("storybook.demo.eachCardCanContainDifferentInfo")]}),e.jsx(C,{variant:"secondary",type:"button",style:{marginTop:"var(--ds-spacing-3)"},children:r("storybook.demo.learnMore")})]})},k))})}},v={render:function(){const r=n();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:r("storybook.story.defaultVsTinted")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{"data-variant":"default",style:{flex:1},children:e.jsxs(a.Block,{children:[e.jsx(t,{level:4,"data-size":"sm",children:r("storybook.story.default")}),e.jsx(o,{children:r("storybook.demo.whiteBackground")})]})}),e.jsx(a,{"data-variant":"tinted","data-color":"accent",style:{flex:1},children:e.jsxs(a.Block,{children:[e.jsx(t,{level:4,"data-size":"sm",children:r("storybook.demo.tinted")}),e.jsx(o,{children:r("storybook.demo.coloredBackground")})]})})]})]}),e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:r("storybook.story.withSections")}),e.jsxs(a,{"data-color":"neutral",style:{maxWidth:"300px"},children:[e.jsx(a.Block,{children:e.jsxs(t,{level:4,"data-size":"sm",children:[r("storybook.demo.section")," 1"]})}),e.jsx(a.Block,{children:e.jsx(o,{children:r("storybook.demo.sectionWithDivider")})})]})]}),e.jsxs("div",{children:[e.jsx(t,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:r("storybook.story.interactiveCards")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{style:{cursor:"pointer",flex:1},onClick:()=>{},children:e.jsxs(a.Block,{children:[e.jsx(t,{level:4,"data-size":"sm",children:r("storybook.demo.clickable")}),e.jsx(o,{children:r("storybook.demo.withOnClick")})]})}),e.jsx(a,{asChild:!0,style:{flex:1},children:e.jsx("button",{type:"button",children:e.jsxs(a.Block,{children:[e.jsx(t,{level:4,"data-size":"sm",children:r("storybook.demo.asButton")}),e.jsx(o,{children:r("storybook.demo.semanticButton")})]})})})]})]})]})}};var b,x,f,B,j;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.cardTitle')}
        </Heading>
        <Paragraph>{t('storybook.demo.cardDescription')}</Paragraph>
      </Card>;
  }
}`,...(f=(x=i.parameters)==null?void 0:x.docs)==null?void 0:f.source},description:{story:"Default card",...(j=(B=i.parameters)==null?void 0:B.docs)==null?void 0:j.description}}};var H,P,D,z,w;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.resourceRequest')}
        </Heading>
        <Paragraph>{t('storybook.demo.bookingRequestDescription')}</Paragraph>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        marginTop: 'var(--ds-spacing-4)'
      }}>
          <Button variant="secondary" type="button">
            {t('storybook.demo.decline')}
          </Button>
          <Button variant="primary" type="button">
            {t('storybook.demo.approve')}
          </Button>
        </div>
      </Card>;
  }
}`,...(D=(P=d.parameters)==null?void 0:P.docs)==null?void 0:D.source},description:{story:"Card with actions",...(w=(z=d.parameters)==null?void 0:z.docs)==null?void 0:w.description}}};var R,T,A,S,W;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      cursor: 'pointer'
    }} onClick={() => {}}>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.clickToViewDetails')}
        </Heading>
        <Paragraph>{t('storybook.demo.clickableCardDescription')}</Paragraph>
      </Card>;
  }
}`,...(A=(T=c.parameters)==null?void 0:T.docs)==null?void 0:A.source},description:{story:"Card as clickable",...(W=(S=c.parameters)==null?void 0:S.docs)==null?void 0:W.description}}};var I,L,M,U,V;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
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
        }}>
            {t('storybook.demo.imagePlaceholder')}
          </span>
        </div>
        <div style={{
        padding: 'var(--ds-spacing-4)'
      }}>
          <Heading level={3} data-size="sm">
            {t('storybook.demo.featuredResource')}
          </Heading>
          <Paragraph>{t('storybook.demo.meetingSpaceDescription')}</Paragraph>
        </div>
      </Card>;
  }
}`,...(M=(L=l.parameters)==null?void 0:L.docs)==null?void 0:M.source},description:{story:"Card with image",...(V=(U=l.parameters)==null?void 0:U.docs)==null?void 0:V.description}}};var F,q,E,N,G;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
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
      </div>;
  }
}`,...(E=(q=p.parameters)==null?void 0:q.docs)==null?void 0:E.source},description:{story:"Color variants - Available in all theme colors",...(G=(N=p.parameters)==null?void 0:N.docs)==null?void 0:G.description}}};var K,O,_,J,Q;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card data-color="neutral" style={{
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
              {t('storybook.demo.videoImagePlaceholder')}
            </span>
          </div>
        </Card.Block>
        <Card.Block>
          <Heading level={3} data-size="md">
            {t('storybook.demo.aboutDesignsystemet')}
          </Heading>
          <Paragraph>{t('storybook.demo.cardBlockDescription')}</Paragraph>
        </Card.Block>
      </Card>;
  }
}`,...(_=(O=m.parameters)==null?void 0:O.docs)==null?void 0:_.source},description:{story:"With sections - Use Card.Block to divide content",...(Q=(J=m.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};var X,Y,Z,$,ee;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card data-color="neutral">
        <Card.Block>
          <Heading level={3} data-size="md">
            <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
              {t('storybook.demo.visitDesignsystemet')}
            </Link>
          </Heading>
          <Paragraph>{t('storybook.demo.designsystemetDescription')}</Paragraph>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.demo.norwegianDigitalisationAgency')}
          </Paragraph>
        </Card.Block>
      </Card>;
  }
}`,...(Z=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Link card - For navigation",...(ee=($=u.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};var re,ae,te,oe,se;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card asChild data-color="neutral">
        <button type="button" onClick={() => {}}>
          <Card.Block>
            <Heading level={3} data-size="md">
              {t('storybook.demo.settingsAndPrivacy')}
            </Heading>
          </Card.Block>
          <Card.Block>
            <Paragraph>{t('storybook.demo.settingsDialogDescription')}</Paragraph>
          </Card.Block>
        </button>
      </Card>;
  }
}`,...(te=(ae=g.parameters)==null?void 0:ae.docs)==null?void 0:te.source},description:{story:"Card as button - For actions on same page",...(se=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:se.description}}};var ne,ie,de,ce,le;h.parameters={...h.parameters,docs:{...(ne=h.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card data-color="neutral" style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0
    }}>
        <Card.Block>
          <Heading level={3} data-size="md">
            {t('storybook.demo.wanderlust')}
          </Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>{t('storybook.demo.wanderlustDescription')}</Paragraph>
        </Card.Block>
      </Card>;
  }
}`,...(de=(ie=h.parameters)==null?void 0:ie.docs)==null?void 0:de.source},description:{story:"Horizontal layout - Side-by-side content",...(le=(ce=h.parameters)==null?void 0:ce.docs)==null?void 0:le.description}}};var pe,me,ue,ge,he;y.parameters={...y.parameters,docs:{...(pe=y.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-4)'
    }}>
        {[1, 2, 3, 4].map(i => <Card key={i} data-color="neutral">
            <Card.Block>
              <Heading level={3} data-size="sm">
                {t('storybook.demo.card')} {i}
              </Heading>
              <Paragraph>
                {t('storybook.demo.cardContentFor')} {i}.{' '}
                {t('storybook.demo.eachCardCanContainDifferentInfo')}
              </Paragraph>
              <Button variant="secondary" type="button" style={{
            marginTop: 'var(--ds-spacing-3)'
          }}>
                {t('storybook.demo.learnMore')}
              </Button>
            </Card.Block>
          </Card>)}
      </div>;
  }
}`,...(ue=(me=y.parameters)==null?void 0:me.docs)==null?void 0:ue.source},description:{story:"Multiple cards in grid",...(he=(ge=y.parameters)==null?void 0:ge.docs)==null?void 0:he.description}}};var ye,ve,ke,Ce,be;v.parameters={...v.parameters,docs:{...(ye=v.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
            {t('storybook.story.defaultVsTinted')}
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
                  {t('storybook.story.default')}
                </Heading>
                <Paragraph>{t('storybook.demo.whiteBackground')}</Paragraph>
              </Card.Block>
            </Card>
            <Card data-variant="tinted" data-color="accent" style={{
            flex: 1
          }}>
              <Card.Block>
                <Heading level={4} data-size="sm">
                  {t('storybook.demo.tinted')}
                </Heading>
                <Paragraph>{t('storybook.demo.coloredBackground')}</Paragraph>
              </Card.Block>
            </Card>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.withSections')}
          </Heading>
          <Card data-color="neutral" style={{
          maxWidth: '300px'
        }}>
            <Card.Block>
              <Heading level={4} data-size="sm">
                {t('storybook.demo.section')} 1
              </Heading>
            </Card.Block>
            <Card.Block>
              <Paragraph>{t('storybook.demo.sectionWithDivider')}</Paragraph>
            </Card.Block>
          </Card>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.interactiveCards')}
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
                  {t('storybook.demo.clickable')}
                </Heading>
                <Paragraph>{t('storybook.demo.withOnClick')}</Paragraph>
              </Card.Block>
            </Card>
            <Card asChild style={{
            flex: 1
          }}>
              <button type="button">
                <Card.Block>
                  <Heading level={4} data-size="sm">
                    {t('storybook.demo.asButton')}
                  </Heading>
                  <Paragraph>{t('storybook.demo.semanticButton')}</Paragraph>
                </Card.Block>
              </button>
            </Card>
          </div>
        </div>
      </div>;
  }
}`,...(ke=(ve=v.parameters)==null?void 0:ve.docs)==null?void 0:ke.source},description:{story:"All variants overview",...(be=(Ce=v.parameters)==null?void 0:Ce.docs)==null?void 0:be.description}}};const Je=["Default","WithActions","AsClickable","WithImage","Colors","WithSections","LinkCard","AsButton","Horizontal","CardGrid","AllVariants"];export{v as AllVariants,g as AsButton,c as AsClickable,y as CardGrid,p as Colors,i as Default,h as Horizontal,u as LinkCard,d as WithActions,l as WithImage,m as WithSections,Je as __namedExportsOrder,_e as default};
//# sourceMappingURL=Card.stories-YIWYrmxR.js.map
