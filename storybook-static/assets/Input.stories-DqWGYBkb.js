import{j as o}from"./jsx-runtime-BYYWji4R.js";import{r as X}from"./index-ClcD9ViR.js";import{within as Ze,userEvent as Ke,expect as Je}from"./index-CLEdRh-S.js";import{u as s}from"./index-bjNF47ar.js";import{T as w}from"./tag-DS5F5fAT.js";import"./alert-BzTWXKSs.js";import"./tooltip-BO1LcXkK.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as a}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./textarea-DMvw4dlU.js";import{T as t}from"./textfield-BCKd4uLT.js";import"./roving-focus-item-DcdCcS0a.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";const Eo={title:"Components/Input",component:t,parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},type:{control:"select",options:["text","email","password","tel","number","url","search"],description:"Input type for validation and keyboard"},disabled:{control:"boolean",description:"Disables the input"},readOnly:{control:"boolean",description:"Makes input read-only"},error:{control:"text",description:"Error message"},multiline:{control:"boolean",description:"Converts to textarea"}}},i={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.name"),placeholder:e("storybook.demo.enterYourName")})},play:async({canvasElement:r})=>{const T=Ze(r).getByRole("textbox");await Ke.type(T,"Ola Nordmann"),await Je(T).toHaveValue("Ola Nordmann")}},d={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.email"),description:e("storybook.demo.neverShareEmail"),placeholder:"name@example.com",type:"email"})}},n={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.email"),error:e("platform.validation.email"),defaultValue:"invalid-email",type:"email"})}},c={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.username"),defaultValue:"john_doe",disabled:!0})}},m={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.accountId"),defaultValue:"ACC-12345-XYZ",readOnly:!0})}},p={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.password"),type:"password",placeholder:e("storybook.demo.enterYourPassword")})}},u={render:function(){const e=s();return o.jsx(t,{label:e("storybook.demo.comments"),multiline:!0,rows:4,placeholder:e("storybook.demo.enterYourComments")})}},y={render:function(){const e=s();return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[o.jsx(t,{prefix:"GBP",suffix:e("storybook.demo.perMonth"),label:e("storybook.demo.howMuchPerMonth")}),o.jsx(t,{prefix:"$",label:e("storybook.demo.price"),type:"number"}),o.jsx(t,{suffix:"kg",label:e("storybook.demo.weight"),type:"number"})]})}},b={render:function(){const e=s();return o.jsx(t,{counter:50,label:e("storybook.demo.shortDescription"),placeholder:e("storybook.demo.maxNCharacters",{count:50})})}},x={render:function(){const e=s();return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[o.jsx(t,{label:o.jsxs(o.Fragment,{children:[e("storybook.demo.whereDoYouLive"),o.jsx(w,{"data-color":"warning",style:{marginInlineStart:"var(--ds-spacing-2)"},children:e("platform.validation.required")})]}),required:!0}),o.jsx(t,{label:o.jsxs(o.Fragment,{children:[e("storybook.demo.middleName"),o.jsx(w,{"data-color":"neutral",style:{marginInlineStart:"var(--ds-spacing-2)"},children:e("storybook.demo.optional")})]})})]})}},f={render:function(){const e=s();return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[o.jsx(t,{label:e("storybook.demo.text"),type:"text",placeholder:e("storybook.demo.generalText")}),o.jsx(t,{label:e("storybook.demo.email"),type:"email",placeholder:"name@example.com"}),o.jsx(t,{label:e("storybook.demo.password"),type:"password",placeholder:e("storybook.demo.enterPassword")}),o.jsx(t,{label:e("storybook.demo.phone"),type:"tel",placeholder:"+47 XXX XX XXX"}),o.jsx(t,{label:e("storybook.demo.number"),type:"number",placeholder:"0"}),o.jsx(t,{label:e("storybook.demo.url"),type:"url",placeholder:"https://example.com"}),o.jsx(t,{label:e("platform.common.search"),type:"search",placeholder:e("platform.common.search")})]})}},h={render:function(){const e=s();return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[o.jsx(t,{label:e("storybook.story.small"),"data-size":"sm",placeholder:e("storybook.demo.smallInput")}),o.jsx(t,{label:e("storybook.story.medium"),"data-size":"md",placeholder:e("storybook.demo.mediumInput")}),o.jsx(t,{label:e("storybook.story.large"),"data-size":"lg",placeholder:e("storybook.demo.largeInput")})]})}},v={render:function(){const e=s(),[T,$e]=X.useState(""),[Ge,j]=X.useState(""),_e=l=>{l?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)?j(""):j(e("platform.validation.email")):j(e("platform.validation.required"))};return o.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)",maxWidth:"400px"},children:[o.jsx(t,{label:e("storybook.demo.firstName"),placeholder:e("storybook.demo.enterFirstName"),required:!0}),o.jsx(t,{label:e("storybook.demo.lastName"),placeholder:e("storybook.demo.enterLastName"),required:!0}),o.jsx(t,{label:e("storybook.demo.email"),type:"email",placeholder:"name@example.com",value:T,onChange:l=>{$e(l.target.value),_e(l.target.value)},error:Ge,required:!0}),o.jsx(t,{label:e("storybook.demo.phone"),type:"tel",placeholder:"+47 XXX XX XXX",description:e("storybook.demo.onlyForOrderUpdates")})]})}},g={render:function(){const e=s();return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:e("storybook.story.doProvideVisibleLabels")}),o.jsx(t,{label:e("storybook.demo.emailAddress"),type:"email",placeholder:"name@example.com"})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:e("storybook.story.doUseAppropriateInputTypes")}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[o.jsx(t,{label:e("storybook.demo.email"),type:"email",placeholder:"name@example.com"}),o.jsx(t,{label:e("storybook.demo.phone"),type:"tel",placeholder:"+47 XXX XX XXX"})]})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:e("storybook.story.doProvideClearErrorMessages")}),o.jsx(t,{label:e("storybook.demo.email"),type:"email",error:e("storybook.demo.pleaseEnterValidEmailExample"),defaultValue:"invalid"})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:e("storybook.story.dontUsePlaceholderAsLabel")}),o.jsx("div",{style:{opacity:.6},children:o.jsx(t,{"aria-label":e("storybook.demo.emailAddressBadExample"),placeholder:e("storybook.demo.enterYourEmailAddress")})})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:e("storybook.story.dontUseGenericErrorMessages")}),o.jsx("div",{style:{opacity:.6},children:o.jsx(t,{label:e("storybook.demo.email"),error:e("storybook.demo.invalidInput"),defaultValue:"test"})})]})]})}},k={render:function(){const e=s();return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.states")}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[o.jsx(t,{label:e("storybook.story.default"),placeholder:e("storybook.demo.enterText")}),o.jsx(t,{label:e("storybook.demo.withValue"),defaultValue:e("storybook.demo.someText")}),o.jsx(t,{label:e("storybook.story.withError"),error:e("platform.validation.required")}),o.jsx(t,{label:e("storybook.story.disabled"),defaultValue:e("storybook.demo.cannotEdit"),disabled:!0}),o.jsx(t,{label:e("storybook.demo.readOnly"),defaultValue:e("storybook.demo.canReadOnly"),readOnly:!0})]})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.sizes")}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[o.jsx(t,{label:e("storybook.story.small"),"data-size":"sm",placeholder:e("storybook.story.small")}),o.jsx(t,{label:e("storybook.story.medium"),"data-size":"md",placeholder:e("storybook.story.medium")}),o.jsx(t,{label:e("storybook.story.large"),"data-size":"lg",placeholder:e("storybook.story.large")})]})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.inputTypes")}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[o.jsx(t,{label:e("storybook.demo.text"),type:"text",placeholder:e("storybook.demo.generalText")}),o.jsx(t,{label:e("storybook.demo.email"),type:"email",placeholder:"name@example.com"}),o.jsx(t,{label:e("storybook.demo.password"),type:"password",placeholder:e("storybook.demo.enterPassword")}),o.jsx(t,{label:e("storybook.demo.phone"),type:"tel",placeholder:"+47 XXX XX XXX"}),o.jsx(t,{label:e("storybook.demo.number"),type:"number",placeholder:"0"})]})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.withAffixes")}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[o.jsx(t,{prefix:"$",label:e("storybook.demo.price"),type:"number"}),o.jsx(t,{suffix:"kg",label:e("storybook.demo.weight"),type:"number"}),o.jsx(t,{prefix:"https://",suffix:".com",label:e("storybook.demo.website")})]})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.withDescriptionAndCounter")}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[o.jsx(t,{label:e("storybook.demo.username"),description:e("storybook.demo.chooseUniqueUsername"),placeholder:"johndoe"}),o.jsx(t,{label:e("storybook.demo.bio"),counter:50,maxLength:50,placeholder:e("storybook.demo.shortBio")})]})]}),o.jsxs("div",{children:[o.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.requiredFields")}),o.jsx(t,{label:o.jsxs(o.Fragment,{children:[e("storybook.demo.emailAddress"),o.jsx(w,{"data-color":"warning",style:{marginInlineStart:"var(--ds-spacing-2)"},children:e("platform.validation.required")})]}),type:"email",required:!0})]})]})}};var E,D,R,z,S;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.name')} placeholder={t('storybook.demo.enterYourName')} />;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the input by role
    const input = canvas.getByRole('textbox');

    // Type into the input
    await userEvent.type(input, 'Ola Nordmann');

    // Verify value was typed
    await expect(input).toHaveValue('Ola Nordmann');
  }
}`,...(R=(D=i.parameters)==null?void 0:D.docs)==null?void 0:R.source},description:{story:`Default text input with typing interaction test.

This story tests:
- Input can be focused
- User can type into input
- Value updates correctly`,...(S=(z=i.parameters)==null?void 0:z.docs)==null?void 0:S.description}}};var P,A,B,q,I;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.email')} description={t('storybook.demo.neverShareEmail')} placeholder="name@example.com" type="email" />;
  }
}`,...(B=(A=d.parameters)==null?void 0:A.docs)==null?void 0:B.source},description:{story:"With description - Provide helpful context",...(I=(q=d.parameters)==null?void 0:q.docs)==null?void 0:I.description}}};var V,C,H,U,N;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.email')} error={t('platform.validation.email')} defaultValue="invalid-email" type="email" />;
  }
}`,...(H=(C=n.parameters)==null?void 0:C.docs)==null?void 0:H.source},description:{story:"Input with error",...(N=(U=n.parameters)==null?void 0:U.docs)==null?void 0:N.description}}};var M,O,W,L,F;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.username')} defaultValue="john_doe" disabled />;
  }
}`,...(W=(O=c.parameters)==null?void 0:O.docs)==null?void 0:W.source},description:{story:"Disabled input",...(F=(L=c.parameters)==null?void 0:L.docs)==null?void 0:F.description}}};var Y,$,G,_,Z;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.accountId')} defaultValue="ACC-12345-XYZ" readOnly />;
  }
}`,...(G=($=m.parameters)==null?void 0:$.docs)==null?void 0:G.source},description:{story:"Read-only input",...(Z=(_=m.parameters)==null?void 0:_.docs)==null?void 0:Z.description}}};var K,J,Q,ee,oe;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.password')} type="password" placeholder={t('storybook.demo.enterYourPassword')} />;
  }
}`,...(Q=(J=p.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Password input",...(oe=(ee=p.parameters)==null?void 0:ee.docs)==null?void 0:oe.description}}};var te,re,se,ae,le;u.parameters={...u.parameters,docs:{...(te=u.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield label={t('storybook.demo.comments')} multiline rows={4} placeholder={t('storybook.demo.enterYourComments')} />;
  }
}`,...(se=(re=u.parameters)==null?void 0:re.docs)==null?void 0:se.source},description:{story:"Multiline textarea - Use for longer text input",...(le=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:le.description}}};var ie,de,ne,ce,me;y.parameters={...y.parameters,docs:{...(ie=y.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Textfield prefix="GBP" suffix={t('storybook.demo.perMonth')} label={t('storybook.demo.howMuchPerMonth')} />
        <Textfield prefix="$" label={t('storybook.demo.price')} type="number" />
        <Textfield suffix="kg" label={t('storybook.demo.weight')} type="number" />
      </div>;
  }
}`,...(ne=(de=y.parameters)==null?void 0:de.docs)==null?void 0:ne.source},description:{story:"With prefix and suffix - Show units, currency, or context",...(me=(ce=y.parameters)==null?void 0:ce.docs)==null?void 0:me.description}}};var pe,ue,ye,be,xe;b.parameters={...b.parameters,docs:{...(pe=b.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Textfield counter={50} label={t('storybook.demo.shortDescription')} placeholder={t('storybook.demo.maxNCharacters', {
      count: 50
    })} />;
  }
}`,...(ye=(ue=b.parameters)==null?void 0:ue.docs)==null?void 0:ye.source},description:{story:"With character counter - Inform users about character limits",...(xe=(be=b.parameters)==null?void 0:be.docs)==null?void 0:xe.description}}};var fe,he,ve,ge,ke;x.parameters={...x.parameters,docs:{...(fe=x.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Textfield label={<>
              {t('storybook.demo.whereDoYouLive')}
              <Tag data-color="warning" style={{
          marginInlineStart: 'var(--ds-spacing-2)'
        }}>
                {t('platform.validation.required')}
              </Tag>
            </>} required />
        <Textfield label={<>
              {t('storybook.demo.middleName')}
              <Tag data-color="neutral" style={{
          marginInlineStart: 'var(--ds-spacing-2)'
        }}>
                {t('storybook.demo.optional')}
              </Tag>
            </>} />
      </div>;
  }
}`,...(ve=(he=x.parameters)==null?void 0:he.docs)==null?void 0:ve.source},description:{story:"Required and optional fields - Clear field requirements",...(ke=(ge=x.parameters)==null?void 0:ge.docs)==null?void 0:ke.description}}};var Te,je,we,Xe,Ee;f.parameters={...f.parameters,docs:{...(Te=f.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Textfield label={t('storybook.demo.text')} type="text" placeholder={t('storybook.demo.generalText')} />
        <Textfield label={t('storybook.demo.email')} type="email" placeholder="name@example.com" />
        <Textfield label={t('storybook.demo.password')} type="password" placeholder={t('storybook.demo.enterPassword')} />
        <Textfield label={t('storybook.demo.phone')} type="tel" placeholder="+47 XXX XX XXX" />
        <Textfield label={t('storybook.demo.number')} type="number" placeholder="0" />
        <Textfield label={t('storybook.demo.url')} type="url" placeholder="https://example.com" />
        <Textfield label={t('platform.common.search')} type="search" placeholder={t('platform.common.search')} />
      </div>;
  }
}`,...(we=(je=f.parameters)==null?void 0:je.docs)==null?void 0:we.source},description:{story:"Input types - Different input types for better UX",...(Ee=(Xe=f.parameters)==null?void 0:Xe.docs)==null?void 0:Ee.description}}};var De,Re,ze,Se,Pe;h.parameters={...h.parameters,docs:{...(De=h.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Textfield label={t('storybook.story.small')} data-size="sm" placeholder={t('storybook.demo.smallInput')} />
        <Textfield label={t('storybook.story.medium')} data-size="md" placeholder={t('storybook.demo.mediumInput')} />
        <Textfield label={t('storybook.story.large')} data-size="lg" placeholder={t('storybook.demo.largeInput')} />
      </div>;
  }
}`,...(ze=(Re=h.parameters)==null?void 0:Re.docs)==null?void 0:ze.source},description:{story:"Size variants - Different sizes for different contexts",...(Pe=(Se=h.parameters)==null?void 0:Se.docs)==null?void 0:Pe.description}}};var Ae,Be,qe,Ie,Ve;v.parameters={...v.parameters,docs:{...(Ae=v.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const validateEmail = (value: string) => {
      if (!value) {
        setEmailError(t('platform.validation.required'));
      } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
        setEmailError(t('platform.validation.email'));
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
        <Textfield label={t('storybook.demo.firstName')} placeholder={t('storybook.demo.enterFirstName')} required />
        <Textfield label={t('storybook.demo.lastName')} placeholder={t('storybook.demo.enterLastName')} required />
        <Textfield label={t('storybook.demo.email')} type="email" placeholder="name@example.com" value={email} onChange={e => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }} error={emailError} required />
        <Textfield label={t('storybook.demo.phone')} type="tel" placeholder="+47 XXX XX XXX" description={t('storybook.demo.onlyForOrderUpdates')} />
      </form>;
  }
}`,...(qe=(Be=v.parameters)==null?void 0:Be.docs)==null?void 0:qe.source},description:{story:"Form example with validation",...(Ve=(Ie=v.parameters)==null?void 0:Ie.docs)==null?void 0:Ve.description}}};var Ce,He,Ue,Ne,Me;g.parameters={...g.parameters,docs:{...(Ce=g.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-8)'
    }}>
        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-success-text-default)'
        }}>
            {t('storybook.story.doProvideVisibleLabels')}
          </Heading>
          <Textfield label={t('storybook.demo.emailAddress')} type="email" placeholder="name@example.com" />
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-success-text-default)'
        }}>
            {t('storybook.story.doUseAppropriateInputTypes')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Textfield label={t('storybook.demo.email')} type="email" placeholder="name@example.com" />
            <Textfield label={t('storybook.demo.phone')} type="tel" placeholder="+47 XXX XX XXX" />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-success-text-default)'
        }}>
            {t('storybook.story.doProvideClearErrorMessages')}
          </Heading>
          <Textfield label={t('storybook.demo.email')} type="email" error={t('storybook.demo.pleaseEnterValidEmailExample')} defaultValue="invalid" />
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-danger-text-default)'
        }}>
            {t('storybook.story.dontUsePlaceholderAsLabel')}
          </Heading>
          <div style={{
          opacity: 0.6
        }}>
            <Textfield aria-label={t('storybook.demo.emailAddressBadExample')} placeholder={t('storybook.demo.enterYourEmailAddress')} />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-danger-text-default)'
        }}>
            {t('storybook.story.dontUseGenericErrorMessages')}
          </Heading>
          <div style={{
          opacity: 0.6
        }}>
            <Textfield label={t('storybook.demo.email')} error={t('storybook.demo.invalidInput')} defaultValue="test" />
          </div>
        </div>
      </div>;
  }
}`,...(Ue=(He=g.parameters)==null?void 0:He.docs)==null?void 0:Ue.source},description:{story:"Best Practices - Examples of correct and incorrect input usage.",...(Me=(Ne=g.parameters)==null?void 0:Ne.docs)==null?void 0:Me.description}}};var Oe,We,Le,Fe,Ye;k.parameters={...k.parameters,docs:{...(Oe=k.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
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
            {t('storybook.story.states')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Textfield label={t('storybook.story.default')} placeholder={t('storybook.demo.enterText')} />
            <Textfield label={t('storybook.demo.withValue')} defaultValue={t('storybook.demo.someText')} />
            <Textfield label={t('storybook.story.withError')} error={t('platform.validation.required')} />
            <Textfield label={t('storybook.story.disabled')} defaultValue={t('storybook.demo.cannotEdit')} disabled />
            <Textfield label={t('storybook.demo.readOnly')} defaultValue={t('storybook.demo.canReadOnly')} readOnly />
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
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Textfield label={t('storybook.story.small')} data-size="sm" placeholder={t('storybook.story.small')} />
            <Textfield label={t('storybook.story.medium')} data-size="md" placeholder={t('storybook.story.medium')} />
            <Textfield label={t('storybook.story.large')} data-size="lg" placeholder={t('storybook.story.large')} />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.inputTypes')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Textfield label={t('storybook.demo.text')} type="text" placeholder={t('storybook.demo.generalText')} />
            <Textfield label={t('storybook.demo.email')} type="email" placeholder="name@example.com" />
            <Textfield label={t('storybook.demo.password')} type="password" placeholder={t('storybook.demo.enterPassword')} />
            <Textfield label={t('storybook.demo.phone')} type="tel" placeholder="+47 XXX XX XXX" />
            <Textfield label={t('storybook.demo.number')} type="number" placeholder="0" />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.withAffixes')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Textfield prefix="$" label={t('storybook.demo.price')} type="number" />
            <Textfield suffix="kg" label={t('storybook.demo.weight')} type="number" />
            <Textfield prefix="https://" suffix=".com" label={t('storybook.demo.website')} />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.withDescriptionAndCounter')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Textfield label={t('storybook.demo.username')} description={t('storybook.demo.chooseUniqueUsername')} placeholder="johndoe" />
            <Textfield label={t('storybook.demo.bio')} counter={50} maxLength={50} placeholder={t('storybook.demo.shortBio')} />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.requiredFields')}
          </Heading>
          <Textfield label={<>
                {t('storybook.demo.emailAddress')}
                <Tag data-color="warning" style={{
            marginInlineStart: 'var(--ds-spacing-2)'
          }}>
                  {t('platform.validation.required')}
                </Tag>
              </>} type="email" required />
        </div>
      </div>;
  }
}`,...(Le=(We=k.parameters)==null?void 0:We.docs)==null?void 0:Le.source},description:{story:"All variants overview - Complete showcase of all input variations.",...(Ye=(Fe=k.parameters)==null?void 0:Fe.docs)==null?void 0:Ye.description}}};const Do=["Default","WithDescription","WithError","Disabled","ReadOnly","Password","Multiline","WithPrefixSuffix","WithCounter","RequiredOptional","InputTypes","Sizes","FormExample","BestPractices","AllVariants"];export{k as AllVariants,g as BestPractices,i as Default,c as Disabled,v as FormExample,f as InputTypes,u as Multiline,p as Password,m as ReadOnly,x as RequiredOptional,h as Sizes,b as WithCounter,d as WithDescription,n as WithError,y as WithPrefixSuffix,Do as __namedExportsOrder,Eo as default};
//# sourceMappingURL=Input.stories-DqWGYBkb.js.map
