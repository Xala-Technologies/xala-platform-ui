import{j as a}from"./jsx-runtime-BYYWji4R.js";import{u as G}from"./index-bjNF47ar.js";import{A as r}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const da={title:"Components/Avatar",component:r,parameters:{docs:{description:{component:`
Avatar is used to represent users or entities with profile images or initials. Avatars help users quickly identify people in the interface.

## Variants

- **Circle** - Default rounded shape (recommended for people)
- **Square** - Square with rounded corners (for organizations or objects)
- **With image** - Profile photo
- **With initials** - Text fallback when no image available
- **Avatar group** - Multiple overlapping avatars

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## Colors

Available colors: **neutral**, **accent**.

## When to Use

- User profile representations
- Comment or post authors
- Contact and user lists
- Team member displays
- Chat participants
- Avatar groups showing multiple users

## Best Practices

### Do
- Use 2 initials (first name + last name initial)
- Always provide aria-label describing the person
- Use consistent sizes within the same context
- Use circle variant for people
- Use square variant for organizations or objects
- Provide alt text for images
- Overlap avatars in groups with negative margin

### Don't
- Don't use more than 2 initials
- Don't use avatars without accessible labels
- Don't mix circle and square variants in same context
- Don't use inconsistent sizes in groups
- Don't use avatars for decorative purposes
- Don't show more than 5-6 avatars in a group

## Usage Patterns

### Avatar with Initials
\`\`\`tsx
<Avatar aria-label="John Doe">JD</Avatar>
\`\`\`

### Avatar with Image
\`\`\`tsx
<Avatar aria-label="John Doe">
  <img src="/avatar.jpg" alt="" />
</Avatar>
\`\`\`

### Size Variants
\`\`\`tsx
<Avatar data-size="sm" aria-label="John Doe">JD</Avatar>
<Avatar data-size="md" aria-label="John Doe">JD</Avatar>
<Avatar data-size="lg" aria-label="John Doe">JD</Avatar>
\`\`\`

### Avatar Group
\`\`\`tsx
<div style={{ display: 'flex' }}>
  <Avatar aria-label="John Doe" style={{ marginLeft: '-8px' }}>JD</Avatar>
  <Avatar aria-label="Alice Brown" style={{ marginLeft: '-8px' }}>AB</Avatar>
  <Avatar aria-label="Charlie Wilson" style={{ marginLeft: '-8px' }}>CW</Avatar>
</div>
\`\`\`

### Square Variant (for organizations)
\`\`\`tsx
<Avatar variant="square" aria-label="Acme Corporation">AC</Avatar>
\`\`\`

## Anti-Patterns

### Anti-pattern: Too Many Initials
Using 3+ initials makes avatars hard to read. Stick to 2 characters.

### Anti-pattern: No Accessible Label
Avatars without aria-label are not accessible to screen reader users.

### Anti-pattern: Mixing Shapes
Mixing circle and square avatars in the same context creates visual inconsistency.

### Anti-pattern: Too Many Avatars in Group
Showing 7+ avatars becomes cluttered. Show first 5 and indicate "+N more".

## Accessibility

### Screen Readers
- Avatar content (initials or image) is announced
- aria-label provides person's full name
- Images should have empty alt attribute (name in aria-label)
- Avatar groups should have descriptive labels

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for initials
- **Text alternative**: aria-label required for all avatars
- **Meaningful sequence**: Avatar groups read in logical order
- **Readable text**: Initials are clear and legible

### Avatar with Image
Images should have empty alt since aria-label provides context:
\`\`\`tsx
<Avatar aria-label="John Doe">
  <img src="/avatar.jpg" alt="" />
</Avatar>
\`\`\`

### Avatar Groups
Provide context for groups:
\`\`\`tsx
<div role="group" aria-label="Team members: John Doe, Alice Brown, Charlie Wilson">
  <Avatar aria-label="John Doe">JD</Avatar>
  <Avatar aria-label="Alice Brown">AB</Avatar>
  <Avatar aria-label="Charlie Wilson">CW</Avatar>
</div>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},"data-color":{control:"select",options:["neutral","accent"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}}}},s={render:function(){return a.jsx(r,{"aria-label":"User avatar",children:"JD"})}},l={render:function(){return a.jsx(r,{"aria-label":"John Doe",children:"JD"})}},n={render:function(){return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"aria-label":"John Doe",children:"JD"}),a.jsx(r,{"aria-label":"Alice Brown",children:"AB"}),a.jsx(r,{"aria-label":"Charlie Wilson",children:"CW"})]})}},o={render:function(){return G(),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(r,{"data-size":"sm","aria-label":"Small avatar",children:"SM"}),a.jsx(r,{"data-size":"md","aria-label":"Medium avatar",children:"MD"}),a.jsx(r,{"data-size":"lg","aria-label":"Large avatar",children:"LG"})]})}},c={render:function(){return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"data-color":"neutral","aria-label":"Neutral avatar",children:"N"}),a.jsx(r,{"data-color":"accent","aria-label":"Accent avatar",children:"A"})]})}},d={render:function(){return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{variant:"circle","aria-label":"Circle avatar",children:"C"}),a.jsx(r,{variant:"square","aria-label":"Square avatar",children:"S"})]})}},v={render:function(){return a.jsxs("div",{style:{display:"flex"},children:[a.jsx(r,{"aria-label":"User 1",children:"A"}),a.jsx(r,{"aria-label":"User 2",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"B"}),a.jsx(r,{"aria-label":"User 3",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"C"}),a.jsx(r,{"aria-label":"3 more users",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"+3"})]})}},t={render:function(){const i=G();return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:i("storybook.story.sizes")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(r,{"data-size":"sm","aria-label":"Small",children:"SM"}),a.jsx(r,{"data-size":"md","aria-label":"Medium",children:"MD"}),a.jsx(r,{"data-size":"lg","aria-label":"Large",children:"LG"})]})]}),a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:i("storybook.story.variants")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{variant:"circle","aria-label":"Circle",children:"C"}),a.jsx(r,{variant:"square","aria-label":"Square",children:"S"})]})]}),a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:i("storybook.story.states")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"data-color":"neutral","aria-label":"Neutral",children:"N"}),a.jsx(r,{"data-color":"accent","aria-label":"Accent",children:"A"})]})]}),a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:i("storybook.story.interactive")}),a.jsxs("div",{style:{display:"flex"},children:[a.jsx(r,{"aria-label":"Alice",children:"AB"}),a.jsx(r,{"aria-label":"Bob",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"BC"}),a.jsx(r,{"aria-label":"Charlie",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"CD"}),a.jsx(r,{"aria-label":"2 more",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"+2"})]})]})]})}};var p,m,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: function Render() {
    return <Avatar aria-label="User avatar">JD</Avatar>;
  }
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var A,g,h;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    return <Avatar aria-label="John Doe">JD</Avatar>;
  }
}`,...(h=(g=l.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var b,f,y;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)'
    }}>
        <Avatar aria-label="John Doe">JD</Avatar>
        <Avatar aria-label="Alice Brown">AB</Avatar>
        <Avatar aria-label="Charlie Wilson">CW</Avatar>
      </div>;
  }
}`,...(y=(f=n.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var x,j,z;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)',
      alignItems: 'center'
    }}>
        <Avatar data-size="sm" aria-label="Small avatar">
          SM
        </Avatar>
        <Avatar data-size="md" aria-label="Medium avatar">
          MD
        </Avatar>
        <Avatar data-size="lg" aria-label="Large avatar">
          LG
        </Avatar>
      </div>;
  }
}`,...(z=(j=o.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var S,D,C;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)'
    }}>
        <Avatar data-color="neutral" aria-label="Neutral avatar">
          N
        </Avatar>
        <Avatar data-color="accent" aria-label="Accent avatar">
          A
        </Avatar>
      </div>;
  }
}`,...(C=(D=c.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var B,J,L;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)'
    }}>
        <Avatar variant="circle" aria-label="Circle avatar">
          C
        </Avatar>
        <Avatar variant="square" aria-label="Square avatar">
          S
        </Avatar>
      </div>;
  }
}`,...(L=(J=d.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};var w,M,R;v.parameters={...v.parameters,docs:{...(w=v.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex'
    }}>
        <Avatar aria-label="User 1">A</Avatar>
        <Avatar aria-label="User 2" style={{
        marginLeft: 'calc(-1 * var(--ds-spacing-2))'
      }}>
          B
        </Avatar>
        <Avatar aria-label="User 3" style={{
        marginLeft: 'calc(-1 * var(--ds-spacing-2))'
      }}>
          C
        </Avatar>
        <Avatar aria-label="3 more users" style={{
        marginLeft: 'calc(-1 * var(--ds-spacing-2))'
      }}>
          +3
        </Avatar>
      </div>;
  }
}`,...(R=(M=v.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var q,U,I,W,k;t.parameters={...t.parameters,docs:{...(q=t.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.sizes')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          alignItems: 'center'
        }}>
            <Avatar data-size="sm" aria-label="Small">
              SM
            </Avatar>
            <Avatar data-size="md" aria-label="Medium">
              MD
            </Avatar>
            <Avatar data-size="lg" aria-label="Large">
              LG
            </Avatar>
          </div>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.variants')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)'
        }}>
            <Avatar variant="circle" aria-label="Circle">
              C
            </Avatar>
            <Avatar variant="square" aria-label="Square">
              S
            </Avatar>
          </div>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.states')}
          </h3>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)'
        }}>
            <Avatar data-color="neutral" aria-label="Neutral">
              N
            </Avatar>
            <Avatar data-color="accent" aria-label="Accent">
              A
            </Avatar>
          </div>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.interactive')}
          </h3>
          <div style={{
          display: 'flex'
        }}>
            <Avatar aria-label="Alice">AB</Avatar>
            <Avatar aria-label="Bob" style={{
            marginLeft: 'calc(-1 * var(--ds-spacing-2))'
          }}>
              BC
            </Avatar>
            <Avatar aria-label="Charlie" style={{
            marginLeft: 'calc(-1 * var(--ds-spacing-2))'
          }}>
              CD
            </Avatar>
            <Avatar aria-label="2 more" style={{
            marginLeft: 'calc(-1 * var(--ds-spacing-2))'
          }}>
              +2
            </Avatar>
          </div>
        </div>
      </div>;
  }
}`,...(I=(U=t.parameters)==null?void 0:U.docs)==null?void 0:I.source},description:{story:"All variants overview",...(k=(W=t.parameters)==null?void 0:W.docs)==null?void 0:k.description}}};const va=["Default","WithInitials","Initials","Sizes","Colors","Variant","AvatarGroup","AllVariants"];export{t as AllVariants,v as AvatarGroup,c as Colors,s as Default,n as Initials,o as Sizes,d as Variant,l as WithInitials,va as __namedExportsOrder,da as default};
//# sourceMappingURL=Avatar.stories-Zubud1Xn.js.map
