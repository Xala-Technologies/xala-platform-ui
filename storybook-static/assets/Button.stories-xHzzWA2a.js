import{j as t}from"./jsx-runtime-BYYWji4R.js";import{within as At,expect as B,userEvent as kt,fn as Et}from"./index-CLEdRh-S.js";import{S as Lt,a as Tt}from"./Trash-Dib-YGhY.js";import{r as Ot,R as j}from"./index-ClcD9ViR.js";import{u as Rt}from"./useId-DmiD3Xrk.js";import{S as Pt}from"./ArrowRight-DdD98ZtE.js";import{S as Ht}from"./Pencil-hAdst9ll.js";import{B as e}from"./button-B6PgazAq.js";import{H as r}from"./heading-mzc2R_Ff.js";var Ut=function(n,o){var i={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&o.indexOf(a)<0&&(i[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,a=Object.getOwnPropertySymbols(n);s<a.length;s++)o.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(n,a[s])&&(i[a[s]]=n[a[s]]);return i};const S=Ot.forwardRef((n,o)=>{var{title:i,titleId:a}=n,s=Ut(n,["title","titleId"]);let f=Rt();return f=i?a||"title-"+f:void 0,j.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":f},s),i?j.createElement("title",{id:f},i):null,j.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 3.25a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.22-.53l-2-2a.75.75 0 0 0-.53-.22zm15.25 3.06-1.56-1.56h-.94V7a.75.75 0 0 1-.75.75H8A.75.75 0 0 1 7.25 7V4.75h-2.5v14.5h1.5V11a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75v8.25h1.5zm-3 12.94h-8.5v-7.5h8.5zm-1-14.5v1.5h-6.5v-1.5zm-6 9.25a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75",clipRule:"evenodd"}))}),Mt={title:"Components/Button",component:e,parameters:{docs:{description:{component:`
Buttons have an important function and are directly tied to an action. They give the user the ability to complete tasks.

## Emphasis Levels

We use different button variants to emphasise certain actions. The primary, secondary and tertiary variants show how important the action is, and help users understand what should be prioritised.

### Primary
Used for the most important action for the user, for example "Save", "Next" or "Submit". **There should normally only be one primary button per page.**

### Secondary
Used for actions that are not the main action. It often appears next to a primary button — if the primary button is "Save", the secondary button might be "Cancel".

### Tertiary
More discreet than the secondary button. Often used together with a primary or secondary button for less important actions. If used alone, it should include an icon, otherwise it may be difficult to recognise as a button.

## Colors

The button is available in all colors from your theme: **accent**, **brand1**, **brand2**, **brand3**, **neutral**, **danger**.

**Important:** A group of buttons should use the same colour variant. The exception is when you want to highlight an action that cannot be undone, such as "Delete". Otherwise, different colour variants should normally not be combined.

## Icons

Button can have an icon placed either to the left or the right of the text. As a general rule, we recommend placing the icon on the left. Icons inside buttons automatically get spacing to the text.

### Icon Placement
- In most cases, **left** is the best placement
- If the button says "Start" and has an arrow pointing right, it is natural for the arrow to be on the right
- If the button is fixed on the right side of the interface, placing the icon on the right can be more intuitive
- **Use only one icon per button**

### Icon-only Buttons
Use icon-only buttons only for well-known icons such as "Close" and "Delete". When the button has no text, you must add an accessible label describing what it does via \`aria-label\` or \`title\`.

### Icons with Text
When using an icon together with text, the icon should have \`aria-hidden\` so screen readers don't read unnecessary content.

## Best Practices

### Do
- Use one primary button per page to indicate the main action
- Use same color variant in a button group (except danger for destructive actions)
- Place the most important action on the right in a button group
- Use clear, action-oriented labels ("Save changes" not "OK")
- Add \`aria-label\` or \`title\` to icon-only buttons
- Add \`aria-hidden\` to icons when used with text
- Use loading state for async operations
- Disable buttons during processing to prevent double-submission

### Don't
- Don't use multiple primary buttons on the same page
- Don't mix different color variants in a group (except danger)
- Don't use multiple icons in the same button
- Don't use icon-only buttons for uncommon actions
- Don't use buttons for navigation (use Link instead)
- Don't make buttons too small (minimum 44x44px for touch targets)

## Usage Patterns

### Form Actions
\`\`\`tsx
<div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
  <Button variant="primary" type="submit">Save changes</Button>
  <Button variant="secondary" type="button">Cancel</Button>
</div>
\`\`\`

### Destructive Actions
\`\`\`tsx
<div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
  <Button variant="primary" data-color="neutral">Keep</Button>
  <Button variant="tertiary" data-color="danger">Delete</Button>
</div>
\`\`\`

### With Loading State
\`\`\`tsx
<Button variant="primary" loading={isLoading} disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
\`\`\`

## Anti-Patterns

### Anti-pattern: Multiple Primary Buttons
Having multiple primary buttons confuses users about which action is most important.

### Anti-pattern: Unclear Labels
Labels like "OK", "Yes", "No" don't provide context. Use specific action verbs instead.

### Anti-pattern: Buttons for Navigation
Buttons should trigger actions, not navigate. Use Link component for navigation.

### Anti-pattern: Tiny Touch Targets
Buttons smaller than 44x44px are difficult to tap on mobile devices.

## Accessibility

### Keyboard Navigation
- **Enter** or **Space** activates the button
- **Tab** moves focus to the button
- Visible focus ring indicates keyboard focus

### Screen Readers
- Button role is automatically announced
- Button label is read (text content or aria-label)
- Disabled state is announced
- Loading state should be communicated via aria-live or status text

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for UI components
- **Touch target size**: Minimum 44x44px
- **Focus visible**: Clear focus indicator (2px outline)
- **Name, Role, Value**: Proper semantic HTML and ARIA

### Icon-only Buttons
Must have accessible label via \`aria-label\`, \`title\`, or Tooltip:
\`\`\`tsx
<Button icon aria-label="Delete item">
  <Trash aria-hidden />
</Button>
\`\`\`

### Icons with Text
Icons should be hidden from screen readers:
\`\`\`tsx
<Button>
  <Save aria-hidden />
  Save changes
</Button>
\`\`\`
        `}}},args:{onClick:Et()},argTypes:{variant:{control:"select",options:["primary","secondary","tertiary"],description:"Button emphasis level",table:{defaultValue:{summary:"primary"}}},"data-color":{control:"select",options:["accent","brand1","brand2","brand3","neutral","danger"],description:"Color variant from theme"},"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant"},disabled:{control:"boolean",description:"Disables the button"},loading:{control:"boolean",description:"Shows loading spinner"},icon:{control:"boolean",description:"Icon-only button (requires aria-label)"},asChild:{control:"boolean",description:"Render as child element (e.g., link)"}},tags:["autodocs"]},l={args:{children:"Button",variant:"primary"},play:async({canvasElement:n,args:o})=>{const a=At(n).getByRole("button",{name:"Button"});await B(a).toBeVisible(),await kt.click(a),await B(o.onClick).toHaveBeenCalledTimes(1)}},d={render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary",type:"button",children:"Primary"}),t.jsx(e,{variant:"secondary",type:"button",children:"Secondary"}),t.jsx(e,{variant:"tertiary",type:"button",children:"Tertiary"})]})},c={render:()=>t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary","data-color":"accent",type:"button",children:"Accent"}),t.jsx(e,{variant:"primary","data-color":"brand1",type:"button",children:"Brand 1"}),t.jsx(e,{variant:"primary","data-color":"brand2",type:"button",children:"Brand 2"}),t.jsx(e,{variant:"primary","data-color":"brand3",type:"button",children:"Brand 3"}),t.jsx(e,{variant:"primary","data-color":"neutral",type:"button",children:"Neutral"}),t.jsx(e,{variant:"primary","data-color":"danger",type:"button",children:"Danger"})]})})},p={render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary","data-color":"neutral",type:"button",children:"Publish"}),t.jsx(e,{variant:"secondary","data-color":"neutral",type:"button",children:"Save draft"}),t.jsx(e,{variant:"tertiary","data-color":"danger",type:"button",children:"Delete"})]})},u={render:()=>t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsxs(e,{variant:"primary",type:"button",children:[t.jsx(Ht,{"aria-hidden":!0,fontSize:"1.25rem"}),"Edit"]}),t.jsxs(e,{variant:"secondary",type:"button",children:[t.jsx(S,{"aria-hidden":!0,fontSize:"1.25rem"}),"Save"]}),t.jsxs(e,{variant:"tertiary",type:"button",children:["Start",t.jsx(Pt,{"aria-hidden":!0,fontSize:"1.25rem"})]})]})})},y={args:{children:"Disabled Button",disabled:!0},play:async({canvasElement:n,args:o})=>{const a=At(n).getByRole("button",{name:"Disabled Button"});await B(a).toBeDisabled(),await kt.click(a),await B(o.onClick).not.toHaveBeenCalled()}},v={render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary",loading:!0,type:"button",children:"Loading..."}),t.jsx(e,{variant:"secondary",loading:!0,type:"button",children:"Loading..."}),t.jsx(e,{variant:"tertiary",loading:!0,type:"button",children:"Loading..."})]})},m={render:()=>t.jsx(e,{asChild:!0,children:t.jsx("a",{href:"https://www.designsystemet.no",target:"_blank",rel:"noreferrer",children:"Go to designsystemet.no"})})},g={render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(e,{"data-size":"sm",type:"button",children:"Small"}),t.jsx(e,{"data-size":"md",type:"button",children:"Medium"}),t.jsx(e,{"data-size":"lg",type:"button",children:"Large"})]})},h={render:()=>t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(e,{icon:!0,"aria-label":"Add item",type:"button",children:t.jsx(Lt,{"aria-hidden":!0,fontSize:"1.25rem"})}),t.jsx(e,{icon:!0,variant:"secondary","aria-label":"Save",type:"button",children:t.jsx(S,{"aria-hidden":!0,fontSize:"1.25rem"})}),t.jsx(e,{icon:!0,variant:"tertiary","data-color":"danger","aria-label":"Delete",type:"button",children:t.jsx(Tt,{"aria-hidden":!0,fontSize:"1.25rem"})})]})},b={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:"Do: One primary button per page"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary",type:"button",children:"Save changes"}),t.jsx(e,{variant:"secondary",type:"button",children:"Cancel"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:"Do: Same color in group, except danger"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary","data-color":"neutral",type:"button",children:"Publish"}),t.jsx(e,{variant:"secondary","data-color":"neutral",type:"button",children:"Save draft"}),t.jsx(e,{variant:"tertiary","data-color":"danger",type:"button",children:"Delete"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:"Do: Clear, action-oriented labels"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary",type:"button",children:"Save changes"}),t.jsx(e,{variant:"secondary",type:"button",children:"Discard changes"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:"Don't: Multiple primary buttons"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap",opacity:.6},children:[t.jsx(e,{variant:"primary",type:"button",children:"Save"}),t.jsx(e,{variant:"primary",type:"button",children:"Submit"}),t.jsx(e,{variant:"primary",type:"button",children:"Publish"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:"Don't: Unclear labels"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap",opacity:.6},children:[t.jsx(e,{variant:"primary",type:"button",children:"OK"}),t.jsx(e,{variant:"secondary",type:"button",children:"Cancel"})]})]})]})},x={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Emphasis Levels"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary",type:"button",children:"Primary"}),t.jsx(e,{variant:"secondary",type:"button",children:"Secondary"}),t.jsx(e,{variant:"tertiary",type:"button",children:"Tertiary"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"All Colors"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{"data-color":"accent",type:"button",children:"Accent"}),t.jsx(e,{"data-color":"brand1",type:"button",children:"Brand 1"}),t.jsx(e,{"data-color":"brand2",type:"button",children:"Brand 2"}),t.jsx(e,{"data-color":"brand3",type:"button",children:"Brand 3"}),t.jsx(e,{"data-color":"neutral",type:"button",children:"Neutral"}),t.jsx(e,{"data-color":"danger",type:"button",children:"Danger"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Sizes"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(e,{"data-size":"sm",type:"button",children:"Small"}),t.jsx(e,{"data-size":"md",type:"button",children:"Medium"}),t.jsx(e,{"data-size":"lg",type:"button",children:"Large"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"With Icons"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsxs(e,{type:"button",children:[t.jsx(Lt,{"aria-hidden":!0,fontSize:"1.25rem"}),"Add"]}),t.jsxs(e,{type:"button",children:[t.jsx(S,{"aria-hidden":!0,fontSize:"1.25rem"}),"Save"]}),t.jsxs(e,{type:"button",children:["Start",t.jsx(Pt,{"aria-hidden":!0,fontSize:"1.25rem"})]}),t.jsx(e,{icon:!0,"aria-label":"Edit",type:"button",children:t.jsx(Ht,{"aria-hidden":!0,fontSize:"1.25rem"})})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"States"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{type:"button",children:"Default"}),t.jsx(e,{loading:!0,type:"button",children:"Loading"}),t.jsx(e,{disabled:!0,type:"button",children:"Disabled"})]})]}),t.jsxs("div",{children:[t.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Combined Example"}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(e,{variant:"primary","data-color":"neutral",type:"button",children:"Publish"}),t.jsx(e,{variant:"secondary","data-color":"neutral",type:"button",children:"Save draft"}),t.jsx(e,{variant:"tertiary","data-color":"danger",type:"button",children:"Delete"})]})]})]})};var w,z,D,I,C;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Button',
    variant: 'primary'
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button', {
      name: 'Button'
    });

    // Verify button is visible
    await expect(button).toBeVisible();

    // Click the button
    await userEvent.click(button);

    // Verify onClick was called
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
}`,...(D=(z=l.parameters)==null?void 0:z.docs)==null?void 0:D.source},description:{story:`Default button with primary variant.

This story includes an interaction test that verifies:
- Button is rendered and visible
- Button can be clicked
- Click handler is called`,...(C=(I=l.parameters)==null?void 0:I.docs)==null?void 0:C.description}}};var W,A,k,L,P;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary" type="button">
        Primary
      </Button>
      <Button variant="secondary" type="button">
        Secondary
      </Button>
      <Button variant="tertiary" type="button">
        Tertiary
      </Button>
    </div>
}`,...(k=(A=d.parameters)==null?void 0:A.docs)==null?void 0:k.source},description:{story:"Emphasis levels - Different button variants show action importance and help users prioritize.",...(P=(L=d.parameters)==null?void 0:L.docs)==null?void 0:P.description}}};var H,E,T,O,R;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" data-color="accent" type="button">
          Accent
        </Button>
        <Button variant="primary" data-color="brand1" type="button">
          Brand 1
        </Button>
        <Button variant="primary" data-color="brand2" type="button">
          Brand 2
        </Button>
        <Button variant="primary" data-color="brand3" type="button">
          Brand 3
        </Button>
        <Button variant="primary" data-color="neutral" type="button">
          Neutral
        </Button>
        <Button variant="primary" data-color="danger" type="button">
          Danger
        </Button>
      </div>
    </div>
}`,...(T=(E=c.parameters)==null?void 0:E.docs)==null?void 0:T.source},description:{story:"All color variants - Available in all theme colors. Use same color in a group except danger for destructive actions.",...(R=(O=c.parameters)==null?void 0:O.docs)==null?void 0:R.description}}};var U,M,V,_,N;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary" data-color="neutral" type="button">
        Publish
      </Button>
      <Button variant="secondary" data-color="neutral" type="button">
        Save draft
      </Button>
      <Button variant="tertiary" data-color="danger" type="button">
        Delete
      </Button>
    </div>
}`,...(V=(M=p.parameters)==null?void 0:M.docs)==null?void 0:V.source},description:{story:"Combined colors example - Same color in group, except danger for destructive actions.",...(N=(_=p.parameters)==null?void 0:_.docs)==null?void 0:N.description}}};var F,K,G,q,Y;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" type="button">
          <PencilIcon aria-hidden fontSize="1.25rem" />
          Edit
        </Button>
        <Button variant="secondary" type="button">
          <FloppydiskIcon aria-hidden fontSize="1.25rem" />
          Save
        </Button>
        <Button variant="tertiary" type="button">
          Start
          <ArrowRightIcon aria-hidden fontSize="1.25rem" />
        </Button>
      </div>
    </div>
}`,...(G=(K=u.parameters)==null?void 0:K.docs)==null?void 0:G.source},description:{story:"Icons - Buttons can have icons left or right of text. Icons automatically get spacing.",...(Y=(q=u.parameters)==null?void 0:q.docs)==null?void 0:Y.description}}};var J,Q,X,Z,$;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  },
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Disabled Button'
    });

    // Verify button has disabled attribute
    await expect(button).toBeDisabled();

    // Try to click the button (should not trigger onClick)
    await userEvent.click(button);

    // onClick should NOT have been called because button is disabled
    await expect(args.onClick).not.toHaveBeenCalled();
  }
}`,...(X=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:`Disabled state.

This story tests that disabled buttons:
- Have the disabled attribute
- Do not fire onClick when clicked`,...($=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};var tt,et,at,nt,rt;v.parameters={...v.parameters,docs:{...(tt=v.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button variant="primary" loading type="button">
        Loading...
      </Button>
      <Button variant="secondary" loading type="button">
        Loading...
      </Button>
      <Button variant="tertiary" loading type="button">
        Loading...
      </Button>
    </div>
}`,...(at=(et=v.parameters)==null?void 0:et.docs)==null?void 0:at.source},description:{story:"Loading buttons - Show loading state with spinner. Combine with loading prop.",...(rt=(nt=v.parameters)==null?void 0:nt.docs)==null?void 0:rt.description}}};var it,ot,st,lt,dt;m.parameters={...m.parameters,docs:{...(it=m.parameters)==null?void 0:it.docs,source:{originalSource:`{
  render: () => <Button asChild>
      <a href="https://www.designsystemet.no" target="_blank" rel="noreferrer">
        Go to designsystemet.no
      </a>
    </Button>
}`,...(st=(ot=m.parameters)==null?void 0:ot.docs)==null?void 0:st.source},description:{story:"Button styled as link - Links can be styled as buttons using asChild prop.",...(dt=(lt=m.parameters)==null?void 0:lt.docs)==null?void 0:dt.description}}};var ct,pt,ut,yt,vt;g.parameters={...g.parameters,docs:{...(ct=g.parameters)==null?void 0:ct.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button data-size="sm" type="button">
        Small
      </Button>
      <Button data-size="md" type="button">
        Medium
      </Button>
      <Button data-size="lg" type="button">
        Large
      </Button>
    </div>
}`,...(ut=(pt=g.parameters)==null?void 0:pt.docs)==null?void 0:ut.source},description:{story:"Size variants - Buttons scale with data-size attribute.",...(vt=(yt=g.parameters)==null?void 0:yt.docs)==null?void 0:vt.description}}};var mt,gt,ht,bt,xt;h.parameters={...h.parameters,docs:{...(mt=h.parameters)==null?void 0:mt.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button icon aria-label="Add item" type="button">
        <PlusIcon aria-hidden fontSize="1.25rem" />
      </Button>
      <Button icon variant="secondary" aria-label="Save" type="button">
        <FloppydiskIcon aria-hidden fontSize="1.25rem" />
      </Button>
      <Button icon variant="tertiary" data-color="danger" aria-label="Delete" type="button">
        <TrashIcon aria-hidden fontSize="1.25rem" />
      </Button>
    </div>
}`,...(ht=(gt=h.parameters)==null?void 0:gt.docs)==null?void 0:ht.source},description:{story:`Icon-only buttons - Use only for well-known icons. Must have accessible label via aria-label or title.

Best practices:
- Only use for universally recognized icons (Close, Delete, Edit, etc.)
- Always provide aria-label describing the action
- Icon should have aria-hidden to prevent duplicate announcements
- Consider using Tooltip for additional context`,...(xt=(bt=h.parameters)==null?void 0:bt.docs)==null?void 0:xt.description}}};var ft,Bt,jt,St,wt;b.parameters={...b.parameters,docs:{...(ft=b.parameters)==null?void 0:ft.docs,source:{originalSource:`{
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
          Do: One primary button per page
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" type="button">
            Save changes
          </Button>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-success-text-default)'
      }}>
          Do: Same color in group, except danger
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" data-color="neutral" type="button">
            Publish
          </Button>
          <Button variant="secondary" data-color="neutral" type="button">
            Save draft
          </Button>
          <Button variant="tertiary" data-color="danger" type="button">
            Delete
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-success-text-default)'
      }}>
          Do: Clear, action-oriented labels
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" type="button">
            Save changes
          </Button>
          <Button variant="secondary" type="button">
            Discard changes
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-danger-text-default)'
      }}>
          Don't: Multiple primary buttons
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap',
        opacity: 0.6
      }}>
          <Button variant="primary" type="button">
            Save
          </Button>
          <Button variant="primary" type="button">
            Submit
          </Button>
          <Button variant="primary" type="button">
            Publish
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        color: 'var(--ds-color-danger-text-default)'
      }}>
          Don't: Unclear labels
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap',
        opacity: 0.6
      }}>
          <Button variant="primary" type="button">
            OK
          </Button>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </div>
    </div>
}`,...(jt=(Bt=b.parameters)==null?void 0:Bt.docs)==null?void 0:jt.source},description:{story:"Best Practices - Examples of correct and incorrect button usage.",...(wt=(St=b.parameters)==null?void 0:St.docs)==null?void 0:wt.description}}};var zt,Dt,It,Ct,Wt;x.parameters={...x.parameters,docs:{...(zt=x.parameters)==null?void 0:zt.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Emphasis Levels
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" type="button">
            Primary
          </Button>
          <Button variant="secondary" type="button">
            Secondary
          </Button>
          <Button variant="tertiary" type="button">
            Tertiary
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          All Colors
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button data-color="accent" type="button">
            Accent
          </Button>
          <Button data-color="brand1" type="button">
            Brand 1
          </Button>
          <Button data-color="brand2" type="button">
            Brand 2
          </Button>
          <Button data-color="brand3" type="button">
            Brand 3
          </Button>
          <Button data-color="neutral" type="button">
            Neutral
          </Button>
          <Button data-color="danger" type="button">
            Danger
          </Button>
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
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
          <Button data-size="sm" type="button">
            Small
          </Button>
          <Button data-size="md" type="button">
            Medium
          </Button>
          <Button data-size="lg" type="button">
            Large
          </Button>
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
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button type="button">
            <PlusIcon aria-hidden fontSize="1.25rem" />
            Add
          </Button>
          <Button type="button">
            <FloppydiskIcon aria-hidden fontSize="1.25rem" />
            Save
          </Button>
          <Button type="button">
            Start
            <ArrowRightIcon aria-hidden fontSize="1.25rem" />
          </Button>
          <Button icon aria-label="Edit" type="button">
            <PencilIcon aria-hidden fontSize="1.25rem" />
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          States
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button type="button">Default</Button>
          <Button loading type="button">
            Loading
          </Button>
          <Button disabled type="button">
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          Combined Example
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" data-color="neutral" type="button">
            Publish
          </Button>
          <Button variant="secondary" data-color="neutral" type="button">
            Save draft
          </Button>
          <Button variant="tertiary" data-color="danger" type="button">
            Delete
          </Button>
        </div>
      </div>
    </div>
}`,...(It=(Dt=x.parameters)==null?void 0:Dt.docs)==null?void 0:It.source},description:{story:"All variants overview - Complete showcase of all button variations.",...(Wt=(Ct=x.parameters)==null?void 0:Ct.docs)==null?void 0:Wt.description}}};const Vt=["Default","EmphasisLevels","Colors","CombinedColors","WithIcons","Disabled","Loading","AsLink","Sizes","IconOnly","BestPractices","AllVariants"],Xt=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:x,AsLink:m,BestPractices:b,Colors:c,CombinedColors:p,Default:l,Disabled:y,EmphasisLevels:d,IconOnly:h,Loading:v,Sizes:g,WithIcons:u,__namedExportsOrder:Vt,default:Mt},Symbol.toStringTag,{value:"Module"}));export{x as A,Xt as B,c as C,l as D,d as E,h as I,v as L,g as S,u as W,y as a};
//# sourceMappingURL=Button.stories-xHzzWA2a.js.map
