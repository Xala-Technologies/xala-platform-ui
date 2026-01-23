import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as w}from"./index-ClcD9ViR.js";import{within as _e,expect as D,userEvent as Ye}from"./index-CLEdRh-S.js";import{T as a}from"./textfield-BCKd4uLT.js";import"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as r}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import{T}from"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const ba={title:"Components/Input",component:a,parameters:{docs:{description:{component:`
Textfield allows users to enter free text or numbers. It is one of the most commonly used form components.

## Variants

- **Single-line** - Default text input for short text
- **Multiline** - Textarea for longer text (use Textarea component instead)
- **With prefix/suffix** - Show units, currency, or context
- **With counter** - Character count feedback for length limits
- **Required/Optional** - Clear field requirements with visual indicators

## Input Types

Use appropriate input types for better mobile keyboards and validation:

- **text** - General text input (default)
- **email** - Email addresses with @ keyboard
- **password** - Password fields with hidden characters
- **tel** - Phone numbers with numeric keyboard
- **number** - Numeric input with increment/decrement
- **url** - URLs with .com keyboard shortcuts
- **search** - Search fields with clear button

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## Best Practices

### Do
- Always provide a visible label (required for accessibility)
- Use appropriate input types for better UX and validation
- Adjust width to match expected input length
- Provide clear, helpful error messages
- Use description text for additional context
- Mark required fields clearly with visual indicators
- Allow copy and paste functionality
- Show character counter for length-limited fields
- Use prefix/suffix for units or currency

### Don't
- Don't rely only on placeholder text (it disappears on input)
- Don't make inputs too narrow (minimum 20 characters visible)
- Don't use generic error messages like "Invalid input"
- Don't disable paste functionality
- Don't use input type="number" for IDs or codes (use type="text")
- Don't make labels too long (keep under 40 characters)

## Usage Patterns

### Basic Input with Label
\`\`\`tsx
<Textfield 
  label="Email address" 
  type="email"
  placeholder="name@example.com"
/>
\`\`\`

### With Description
\`\`\`tsx
<Textfield 
  label="Username" 
  description="Choose a unique username (3-20 characters)"
  minLength={3}
  maxLength={20}
/>
\`\`\`

### With Error
\`\`\`tsx
<Textfield 
  label="Email" 
  type="email"
  error="Please enter a valid email address"
  defaultValue="invalid-email"
/>
\`\`\`

### With Prefix/Suffix
\`\`\`tsx
<Textfield 
  label="Price" 
  type="number"
  prefix="$"
  suffix="USD"
/>
\`\`\`

### With Character Counter
\`\`\`tsx
<Textfield 
  label="Bio" 
  counter={160}
  maxLength={160}
  description="Brief description for your profile"
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Placeholder as Label
Placeholders disappear when user starts typing, making it hard to remember what the field is for.

### Anti-pattern: No Error Messages
Showing only a red border without explaining what's wrong frustrates users.

### Anti-pattern: Wrong Input Type
Using type="number" for credit cards or phone numbers causes issues with leading zeros and formatting.

### Anti-pattern: Disabled Paste
Preventing paste makes it harder for users with password managers and reduces security.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to the input
- **Shift+Tab** moves focus to previous element
- **Arrow keys** move cursor within text
- **Home/End** jump to start/end of text

### Screen Readers
- Label is announced when input receives focus
- Description text provides additional context
- Error messages are announced via aria-describedby
- Required state is announced
- Input type affects how value is read

### WCAG 2.1 AA Compliance
- **Label**: Every input must have a visible label (not just placeholder)
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for borders
- **Focus visible**: Clear focus indicator (2px outline)
- **Error identification**: Errors clearly identified with text (not just color)
- **Touch target**: Minimum 44x44px for mobile
- **Name, Role, Value**: Proper semantic HTML and ARIA attributes

### Required Fields
Mark required fields clearly:
\`\`\`tsx
<Textfield
  label={<>
    Email address
    <Tag data-color="warning" style={{ marginInlineStart: 'var(--ds-spacing-2)' }}>
      Required
    </Tag>
  </>}
  type="email"
  required
/>
\`\`\`
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},type:{control:"select",options:["text","email","password","tel","number","url","search"],description:"Input type for validation and keyboard"},disabled:{control:"boolean",description:"Disables the input"},readOnly:{control:"boolean",description:"Makes input read-only"},error:{control:"text",description:"Error message"},multiline:{control:"boolean",description:"Converts to textarea"}}},s={render:()=>e.jsx(a,{label:"Name",placeholder:"Enter your name"}),play:async({canvasElement:b})=>{const l=_e(b).getByLabelText("Name");await D(l).toHaveAttribute("placeholder","Enter your name"),await Ye.type(l,"Ola Nordmann"),await D(l).toHaveValue("Ola Nordmann")}},i={render:()=>e.jsx(a,{label:"Email",description:"We will never share your email with anyone",placeholder:"name@example.com",type:"email"})},o={render:()=>e.jsx(a,{label:"Email",error:"Please enter a valid email address",defaultValue:"invalid-email",type:"email"})},d={render:()=>e.jsx(a,{label:"Username",defaultValue:"john_doe",disabled:!0})},n={render:()=>e.jsx(a,{label:"Account ID",defaultValue:"ACC-12345-XYZ",readOnly:!0})},c={render:()=>e.jsx(a,{label:"Password",type:"password",placeholder:"Enter your password"})},p={render:()=>e.jsx(a,{label:"Comments",multiline:!0,rows:4,placeholder:"Enter your comments here..."})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{prefix:"GBP",suffix:"per month",label:"How much does it cost per month?"}),e.jsx(a,{prefix:"$",label:"Price",type:"number"}),e.jsx(a,{suffix:"kg",label:"Weight",type:"number"})]})},u={render:()=>e.jsx(a,{counter:50,label:"Short description",placeholder:"Max 50 characters"})},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:e.jsxs(e.Fragment,{children:["Where do you live?",e.jsx(T,{"data-color":"warning",style:{marginInlineStart:"var(--ds-spacing-2)"},children:"Required"})]}),required:!0}),e.jsx(a,{label:e.jsxs(e.Fragment,{children:["Middle name",e.jsx(T,{"data-color":"neutral",style:{marginInlineStart:"var(--ds-spacing-2)"},children:"Optional"})]})})]})},f={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:"Text",type:"text",placeholder:"General text"}),e.jsx(a,{label:"Email",type:"email",placeholder:"name@example.com"}),e.jsx(a,{label:"Password",type:"password",placeholder:"Enter password"}),e.jsx(a,{label:"Phone",type:"tel",placeholder:"+47 XXX XX XXX"}),e.jsx(a,{label:"Number",type:"number",placeholder:"0"}),e.jsx(a,{label:"URL",type:"url",placeholder:"https://example.com"}),e.jsx(a,{label:"Search",type:"search",placeholder:"Search..."})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{label:"Small","data-size":"sm",placeholder:"Small input"}),e.jsx(a,{label:"Medium","data-size":"md",placeholder:"Medium input"}),e.jsx(a,{label:"Large","data-size":"lg",placeholder:"Large input"})]})},y={render:()=>{const[b,E]=w.useState(""),[l,j]=w.useState(""),$e=t=>{t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?j(""):j("Please enter a valid email address"):j("Email is required")};return e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)",maxWidth:"400px"},children:[e.jsx(a,{label:"First Name",placeholder:"Enter first name",required:!0}),e.jsx(a,{label:"Last Name",placeholder:"Enter last name",required:!0}),e.jsx(a,{label:"Email",type:"email",placeholder:"name@example.com",value:b,onChange:t=>{E(t.target.value),$e(t.target.value)},error:l,required:!0}),e.jsx(a,{label:"Phone",type:"tel",placeholder:"+47 XXX XX XXX",description:"We'll only use this for order updates"})]})}},v={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:"Do: Always provide visible labels"}),e.jsx(a,{label:"Email address",type:"email",placeholder:"name@example.com"})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:"Do: Use appropriate input types"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Email",type:"email",placeholder:"name@example.com"}),e.jsx(a,{label:"Phone",type:"tel",placeholder:"+47 XXX XX XXX"})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:"Do: Provide clear error messages"}),e.jsx(a,{label:"Email",type:"email",error:"Please enter a valid email address (e.g., name@example.com)",defaultValue:"invalid"})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:"Don't: Use placeholder as label"}),e.jsx("div",{style:{opacity:.6},children:e.jsx(a,{"aria-label":"Email address (bad example)",placeholder:"Enter your email address"})})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:"Don't: Use generic error messages"}),e.jsx("div",{style:{opacity:.6},children:e.jsx(a,{label:"Email",error:"Invalid input",defaultValue:"test"})})]})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"States"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Default",placeholder:"Enter text"}),e.jsx(a,{label:"With value",defaultValue:"Some text"}),e.jsx(a,{label:"With error",error:"This field is required"}),e.jsx(a,{label:"Disabled",defaultValue:"Cannot edit",disabled:!0}),e.jsx(a,{label:"Read-only",defaultValue:"Can read only",readOnly:!0})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Small","data-size":"sm",placeholder:"Small"}),e.jsx(a,{label:"Medium","data-size":"md",placeholder:"Medium"}),e.jsx(a,{label:"Large","data-size":"lg",placeholder:"Large"})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Input Types"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Text",type:"text",placeholder:"General text"}),e.jsx(a,{label:"Email",type:"email",placeholder:"name@example.com"}),e.jsx(a,{label:"Password",type:"password",placeholder:"Enter password"}),e.jsx(a,{label:"Phone",type:"tel",placeholder:"+47 XXX XX XXX"}),e.jsx(a,{label:"Number",type:"number",placeholder:"0"})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Affixes"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{prefix:"$",label:"Price",type:"number"}),e.jsx(a,{suffix:"kg",label:"Weight",type:"number"}),e.jsx(a,{prefix:"https://",suffix:".com",label:"Website"})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Description & Counter"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(a,{label:"Username",description:"Choose a unique username",placeholder:"johndoe"}),e.jsx(a,{label:"Bio",counter:50,maxLength:50,placeholder:"Short bio"})]})]}),e.jsxs("div",{children:[e.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Required Fields"}),e.jsx(a,{label:e.jsxs(e.Fragment,{children:["Email address",e.jsx(T,{"data-color":"warning",style:{marginInlineStart:"var(--ds-spacing-2)"},children:"Required"})]}),type:"email",required:!0})]})]})};var X,S,P,z,W;s.parameters={...s.parameters,docs:{...(X=s.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <Textfield label="Name" placeholder="Enter your name" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the input by label
    const input = canvas.getByLabelText('Name');

    // Verify placeholder
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');

    // Type into the input
    await userEvent.type(input, 'Ola Nordmann');

    // Verify value was typed
    await expect(input).toHaveValue('Ola Nordmann');
  }
}`,...(P=(S=s.parameters)==null?void 0:S.docs)==null?void 0:P.source},description:{story:`Default text input with typing interaction test.

This story tests:
- Input can be focused
- User can type into input
- Value updates correctly`,...(W=(z=s.parameters)==null?void 0:z.docs)==null?void 0:W.description}}};var q,B,H,C,A;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Textfield label="Email" description="We will never share your email with anyone" placeholder="name@example.com" type="email" />
}`,...(H=(B=i.parameters)==null?void 0:B.docs)==null?void 0:H.source},description:{story:"With description - Provide helpful context",...(A=(C=i.parameters)==null?void 0:C.docs)==null?void 0:A.description}}};var I,V,L,R,U;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Textfield label="Email" error="Please enter a valid email address" defaultValue="invalid-email" type="email" />
}`,...(L=(V=o.parameters)==null?void 0:V.docs)==null?void 0:L.source},description:{story:"Input with error",...(U=(R=o.parameters)==null?void 0:R.docs)==null?void 0:U.description}}};var M,k,N,O,F;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <Textfield label="Username" defaultValue="john_doe" disabled />
}`,...(N=(k=d.parameters)==null?void 0:k.docs)==null?void 0:N.source},description:{story:"Disabled input",...(F=(O=d.parameters)==null?void 0:O.docs)==null?void 0:F.description}}};var G,$,_,Y,Z;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <Textfield label="Account ID" defaultValue="ACC-12345-XYZ" readOnly />
}`,...(_=($=n.parameters)==null?void 0:$.docs)==null?void 0:_.source},description:{story:"Read-only input",...(Z=(Y=n.parameters)==null?void 0:Y.docs)==null?void 0:Z.description}}};var K,J,Q,ee,ae;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <Textfield label="Password" type="password" placeholder="Enter your password" />
}`,...(Q=(J=c.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Password input",...(ae=(ee=c.parameters)==null?void 0:ee.docs)==null?void 0:ae.description}}};var re,le,te,se,ie;p.parameters={...p.parameters,docs:{...(re=p.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <Textfield label="Comments" multiline rows={4} placeholder="Enter your comments here..." />
}`,...(te=(le=p.parameters)==null?void 0:le.docs)==null?void 0:te.source},description:{story:"Multiline textarea - Use for longer text input",...(ie=(se=p.parameters)==null?void 0:se.docs)==null?void 0:ie.description}}};var oe,de,ne,ce,pe;m.parameters={...m.parameters,docs:{...(oe=m.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Textfield prefix="GBP" suffix="per month" label="How much does it cost per month?" />
      <Textfield prefix="$" label="Price" type="number" />
      <Textfield suffix="kg" label="Weight" type="number" />
    </div>
}`,...(ne=(de=m.parameters)==null?void 0:de.docs)==null?void 0:ne.source},description:{story:"With prefix and suffix - Show units, currency, or context",...(pe=(ce=m.parameters)==null?void 0:ce.docs)==null?void 0:pe.description}}};var me,ue,xe,fe,he;u.parameters={...u.parameters,docs:{...(me=u.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <Textfield counter={50} label="Short description" placeholder="Max 50 characters" />
}`,...(xe=(ue=u.parameters)==null?void 0:ue.docs)==null?void 0:xe.source},description:{story:"With character counter - Inform users about character limits",...(he=(fe=u.parameters)==null?void 0:fe.docs)==null?void 0:he.description}}};var ye,ve,ge,be,je;x.parameters={...x.parameters,docs:{...(ye=x.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Textfield label={<>
            Where do you live?
            <Tag data-color="warning" style={{
        marginInlineStart: 'var(--ds-spacing-2)'
      }}>
              Required
            </Tag>
          </>} required />
      <Textfield label={<>
            Middle name
            <Tag data-color="neutral" style={{
        marginInlineStart: 'var(--ds-spacing-2)'
      }}>
              Optional
            </Tag>
          </>} />
    </div>
}`,...(ge=(ve=x.parameters)==null?void 0:ve.docs)==null?void 0:ge.source},description:{story:"Required and optional fields - Clear field requirements",...(je=(be=x.parameters)==null?void 0:be.docs)==null?void 0:je.description}}};var Te,Ee,we,De,Xe;f.parameters={...f.parameters,docs:{...(Te=f.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Textfield label="Text" type="text" placeholder="General text" />
      <Textfield label="Email" type="email" placeholder="name@example.com" />
      <Textfield label="Password" type="password" placeholder="Enter password" />
      <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" />
      <Textfield label="Number" type="number" placeholder="0" />
      <Textfield label="URL" type="url" placeholder="https://example.com" />
      <Textfield label="Search" type="search" placeholder="Search..." />
    </div>
}`,...(we=(Ee=f.parameters)==null?void 0:Ee.docs)==null?void 0:we.source},description:{story:"Input types - Different input types for better UX",...(Xe=(De=f.parameters)==null?void 0:De.docs)==null?void 0:Xe.description}}};var Se,Pe,ze,We,qe;h.parameters={...h.parameters,docs:{...(Se=h.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Textfield label="Small" data-size="sm" placeholder="Small input" />
      <Textfield label="Medium" data-size="md" placeholder="Medium input" />
      <Textfield label="Large" data-size="lg" placeholder="Large input" />
    </div>
}`,...(ze=(Pe=h.parameters)==null?void 0:Pe.docs)==null?void 0:ze.source},description:{story:"Size variants - Different sizes for different contexts",...(qe=(We=h.parameters)==null?void 0:We.docs)==null?void 0:qe.description}}};var Be,He,Ce,Ae,Ie;y.parameters={...y.parameters,docs:{...(Be=y.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  render: () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const validateEmail = (value: string) => {
      if (!value) {
        setEmailError('Email is required');
      } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };
    return <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)',
      maxWidth: '400px'
    }}>
        <Textfield label="First Name" placeholder="Enter first name" required />
        <Textfield label="Last Name" placeholder="Enter last name" required />
        <Textfield label="Email" type="email" placeholder="name@example.com" value={email} onChange={e => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }} error={emailError} required />
        <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" description="We'll only use this for order updates" />
      </form>;
  }
}`,...(Ce=(He=y.parameters)==null?void 0:He.docs)==null?void 0:Ce.source},description:{story:"Form example with validation",...(Ie=(Ae=y.parameters)==null?void 0:Ae.docs)==null?void 0:Ie.description}}};var Ve,Le,Re,Ue,Me;v.parameters={...v.parameters,docs:{...(Ve=v.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-8)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-success-text-default)'
      }}>
          Do: Always provide visible labels
        </Heading>
        <Textfield label="Email address" type="email" placeholder="name@example.com" />
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-success-text-default)'
      }}>
          Do: Use appropriate input types
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Textfield label="Email" type="email" placeholder="name@example.com" />
          <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-success-text-default)'
      }}>
          Do: Provide clear error messages
        </Heading>
        <Textfield label="Email" type="email" error="Please enter a valid email address (e.g., name@example.com)" defaultValue="invalid" />
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-danger-text-default)'
      }}>
          Don't: Use placeholder as label
        </Heading>
        <div style={{
        opacity: 0.6
      }}>
          <Textfield aria-label="Email address (bad example)" placeholder="Enter your email address" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-danger-text-default)'
      }}>
          Don't: Use generic error messages
        </Heading>
        <div style={{
        opacity: 0.6
      }}>
          <Textfield label="Email" error="Invalid input" defaultValue="test" />
        </div>
      </div>
    </div>
}`,...(Re=(Le=v.parameters)==null?void 0:Le.docs)==null?void 0:Re.source},description:{story:"Best Practices - Examples of correct and incorrect input usage.",...(Me=(Ue=v.parameters)==null?void 0:Ue.docs)==null?void 0:Me.description}}};var ke,Ne,Oe,Fe,Ge;g.parameters={...g.parameters,docs:{...(ke=g.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          States
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Textfield label="Default" placeholder="Enter text" />
          <Textfield label="With value" defaultValue="Some text" />
          <Textfield label="With error" error="This field is required" />
          <Textfield label="Disabled" defaultValue="Cannot edit" disabled />
          <Textfield label="Read-only" defaultValue="Can read only" readOnly />
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
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Textfield label="Small" data-size="sm" placeholder="Small" />
          <Textfield label="Medium" data-size="md" placeholder="Medium" />
          <Textfield label="Large" data-size="lg" placeholder="Large" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Input Types
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Textfield label="Text" type="text" placeholder="General text" />
          <Textfield label="Email" type="email" placeholder="name@example.com" />
          <Textfield label="Password" type="password" placeholder="Enter password" />
          <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" />
          <Textfield label="Number" type="number" placeholder="0" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          With Affixes
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Textfield prefix="$" label="Price" type="number" />
          <Textfield suffix="kg" label="Weight" type="number" />
          <Textfield prefix="https://" suffix=".com" label="Website" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          With Description & Counter
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <Textfield label="Username" description="Choose a unique username" placeholder="johndoe" />
          <Textfield label="Bio" counter={50} maxLength={50} placeholder="Short bio" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Required Fields
        </Heading>
        <Textfield label={<>
              Email address
              <Tag data-color="warning" style={{
          marginInlineStart: 'var(--ds-spacing-2)'
        }}>
                Required
              </Tag>
            </>} type="email" required />
      </div>
    </div>
}`,...(Oe=(Ne=g.parameters)==null?void 0:Ne.docs)==null?void 0:Oe.source},description:{story:"All variants overview - Complete showcase of all input variations.",...(Ge=(Fe=g.parameters)==null?void 0:Fe.docs)==null?void 0:Ge.description}}};const ja=["Default","WithDescription","WithError","Disabled","ReadOnly","Password","Multiline","WithPrefixSuffix","WithCounter","RequiredOptional","InputTypes","Sizes","FormExample","BestPractices","AllVariants"];export{g as AllVariants,v as BestPractices,s as Default,d as Disabled,y as FormExample,f as InputTypes,p as Multiline,c as Password,n as ReadOnly,x as RequiredOptional,h as Sizes,u as WithCounter,i as WithDescription,o as WithError,m as WithPrefixSuffix,ja as __namedExportsOrder,ba as default};
//# sourceMappingURL=Input.stories-DVbQLrTA.js.map
