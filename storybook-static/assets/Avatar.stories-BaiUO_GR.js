import{j as a}from"./jsx-runtime-BYYWji4R.js";import{A as r}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const sa={title:"Components/Avatar",component:r,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},"data-color":{control:"select",options:["neutral","accent"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}}}},i={render:()=>a.jsx(r,{"aria-label":"User avatar",children:"JD"})},t={render:()=>a.jsx(r,{"aria-label":"John Doe",children:"JD"})},s={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"aria-label":"John Doe",children:"JD"}),a.jsx(r,{"aria-label":"Alice Brown",children:"AB"}),a.jsx(r,{"aria-label":"Charlie Wilson",children:"CW"})]})},l={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(r,{"data-size":"sm","aria-label":"Small avatar",children:"SM"}),a.jsx(r,{"data-size":"md","aria-label":"Medium avatar",children:"MD"}),a.jsx(r,{"data-size":"lg","aria-label":"Large avatar",children:"LG"})]})},n={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"data-color":"neutral","aria-label":"Neutral avatar",children:"N"}),a.jsx(r,{"data-color":"accent","aria-label":"Accent avatar",children:"A"})]})},o={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{variant:"circle","aria-label":"Circle avatar",children:"C"}),a.jsx(r,{variant:"square","aria-label":"Square avatar",children:"S"})]})},c={render:()=>a.jsxs("div",{style:{display:"flex"},children:[a.jsx(r,{"aria-label":"User 1",children:"A"}),a.jsx(r,{"aria-label":"User 2",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"B"}),a.jsx(r,{"aria-label":"User 3",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"C"}),a.jsx(r,{"aria-label":"3 more users",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"+3"})]})},e={render:()=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Sizes"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(r,{"data-size":"sm","aria-label":"Small",children:"SM"}),a.jsx(r,{"data-size":"md","aria-label":"Medium",children:"MD"}),a.jsx(r,{"data-size":"lg","aria-label":"Large",children:"LG"})]})]}),a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Shapes"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{variant:"circle","aria-label":"Circle",children:"C"}),a.jsx(r,{variant:"square","aria-label":"Square",children:"S"})]})]}),a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Colors"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"data-color":"neutral","aria-label":"Neutral",children:"N"}),a.jsx(r,{"data-color":"accent","aria-label":"Accent",children:"A"})]})]}),a.jsxs("div",{children:[a.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Group"}),a.jsxs("div",{style:{display:"flex"},children:[a.jsx(r,{"aria-label":"Alice",children:"AB"}),a.jsx(r,{"aria-label":"Bob",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"BC"}),a.jsx(r,{"aria-label":"Charlie",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"CD"}),a.jsx(r,{"aria-label":"2 more",style:{marginLeft:"calc(-1 * var(--ds-spacing-2))"},children:"+2"})]})]})]})};var d,v,p;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Avatar aria-label="User avatar">JD</Avatar>
}`,...(p=(v=i.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var m,A,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <Avatar aria-label="John Doe">JD</Avatar>
}`,...(g=(A=t.parameters)==null?void 0:A.docs)==null?void 0:g.source}}};var h,u,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)'
  }}>
      <Avatar aria-label="John Doe">JD</Avatar>
      <Avatar aria-label="Alice Brown">AB</Avatar>
      <Avatar aria-label="Charlie Wilson">CW</Avatar>
    </div>
}`,...(b=(u=s.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var x,f,y;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
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
    </div>
}`,...(y=(f=l.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var j,S,z;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)'
  }}>
      <Avatar data-color="neutral" aria-label="Neutral avatar">
        N
      </Avatar>
      <Avatar data-color="accent" aria-label="Accent avatar">
        A
      </Avatar>
    </div>
}`,...(z=(S=n.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var D,C,B;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-2)'
  }}>
      <Avatar variant="circle" aria-label="Circle avatar">
        C
      </Avatar>
      <Avatar variant="square" aria-label="Square avatar">
        S
      </Avatar>
    </div>
}`,...(B=(C=o.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var J,L,w;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div style={{
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
    </div>
}`,...(w=(L=c.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var M,q,U,I,W;e.parameters={...e.parameters,docs:{...(M=e.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Sizes
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
          Shapes
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
          Colors
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
          Group
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
    </div>
}`,...(U=(q=e.parameters)==null?void 0:q.docs)==null?void 0:U.source},description:{story:"All variants overview",...(W=(I=e.parameters)==null?void 0:I.docs)==null?void 0:W.description}}};const la=["Default","WithInitials","Initials","Sizes","Colors","Variant","AvatarGroup","AllVariants"];export{e as AllVariants,c as AvatarGroup,n as Colors,i as Default,s as Initials,l as Sizes,o as Variant,t as WithInitials,la as __namedExportsOrder,sa as default};
//# sourceMappingURL=Avatar.stories-BaiUO_GR.js.map
