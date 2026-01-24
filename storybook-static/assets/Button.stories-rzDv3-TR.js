import{j as t}from"./jsx-runtime-BYYWji4R.js";import{within as Rt,expect as k,userEvent as Tt,fn as Lt}from"./index-CLEdRh-S.js";import{u as i}from"./index-bjNF47ar.js";import{S as Ht,a as Ot}from"./Trash-Dib-YGhY.js";import{r as Pt,R as j}from"./index-ClcD9ViR.js";import{u as Ut}from"./useId-DmiD3Xrk.js";import{S as At}from"./ArrowRight-DdD98ZtE.js";import{S as Et}from"./Pencil-hAdst9ll.js";import{B as o}from"./button-B6PgazAq.js";import{H as n}from"./heading-mzc2R_Ff.js";var Vt=function(a,e){var s={};for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&e.indexOf(r)<0&&(s[r]=a[r]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,r=Object.getOwnPropertySymbols(a);d<r.length;d++)e.indexOf(r[d])<0&&Object.prototype.propertyIsEnumerable.call(a,r[d])&&(s[r[d]]=a[r[d]]);return s};const w=Pt.forwardRef((a,e)=>{var{title:s,titleId:r}=a,d=Vt(a,["title","titleId"]);let B=Ut();return B=s?r||"title-"+B:void 0,j.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:e,"aria-labelledby":B},d),s?j.createElement("title",{id:B},s):null,j.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 3.25a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.22-.53l-2-2a.75.75 0 0 0-.53-.22zm15.25 3.06-1.56-1.56h-.94V7a.75.75 0 0 1-.75.75H8A.75.75 0 0 1 7.25 7V4.75h-2.5v14.5h1.5V11a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75v8.25h1.5zm-3 12.94h-8.5v-7.5h8.5zm-1-14.5v1.5h-6.5v-1.5zm-6 9.25a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75",clipRule:"evenodd"}))}),_t={title:"Components/Button",component:o,parameters:{docs:{description:{component:`
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
        `}}},args:{onClick:Lt()},argTypes:{variant:{control:"select",options:["primary","secondary","tertiary"],description:"Button emphasis level",table:{defaultValue:{summary:"primary"}}},"data-color":{control:"select",options:["accent","brand1","brand2","brand3","neutral","danger"],description:"Color variant from theme"},"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant"},disabled:{control:"boolean",description:"Disables the button"},loading:{control:"boolean",description:"Shows loading spinner"},icon:{control:"boolean",description:"Icon-only button (requires aria-label)"},asChild:{control:"boolean",description:"Render as child element (e.g., link)"}},tags:["autodocs"]},l={args:{children:"Button",variant:"primary"},play:async({canvasElement:a,args:e})=>{const r=Rt(a).getByRole("button",{name:"Button"});await k(r).toBeVisible(),await Tt.click(r),await k(e.onClick).toHaveBeenCalledTimes(1)}},c={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary",type:"button",children:e("storybook.demo.primary")}),t.jsx(o,{variant:"secondary",type:"button",children:e("storybook.demo.secondary")}),t.jsx(o,{variant:"tertiary",type:"button",children:e("storybook.demo.tertiary")})]})}},p={render:function(){const e=i();return t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary","data-color":"accent",type:"button",children:e("storybook.demo.accent")}),t.jsx(o,{variant:"primary","data-color":"brand1",type:"button",children:e("storybook.demo.brand1")}),t.jsx(o,{variant:"primary","data-color":"brand2",type:"button",children:e("storybook.demo.brand2")}),t.jsx(o,{variant:"primary","data-color":"brand3",type:"button",children:e("storybook.demo.brand3")}),t.jsx(o,{variant:"primary","data-color":"neutral",type:"button",children:e("storybook.demo.neutral")}),t.jsx(o,{variant:"primary","data-color":"danger",type:"button",children:e("storybook.demo.danger")})]})})}},u={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary","data-color":"neutral",type:"button",children:e("storybook.demo.publish")}),t.jsx(o,{variant:"secondary","data-color":"neutral",type:"button",children:e("storybook.demo.saveDraft")}),t.jsx(o,{variant:"tertiary","data-color":"danger",type:"button",children:e("platform.common.delete")})]})}},y={render:function(){const e=i();return t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsxs(o,{variant:"primary",type:"button",children:[t.jsx(Et,{"aria-hidden":!0,fontSize:"1.25rem"}),e("platform.common.edit")]}),t.jsxs(o,{variant:"secondary",type:"button",children:[t.jsx(w,{"aria-hidden":!0,fontSize:"1.25rem"}),e("platform.common.save")]}),t.jsxs(o,{variant:"tertiary",type:"button",children:[e("storybook.demo.start"),t.jsx(At,{"aria-hidden":!0,fontSize:"1.25rem"})]})]})})}},m={args:{children:"Disabled Button",disabled:!0},play:async({canvasElement:a,args:e})=>{const r=Rt(a).getByRole("button",{name:"Disabled Button"});await k(r).toBeDisabled(),await Tt.click(r),await k(e.onClick).not.toHaveBeenCalled()}},b={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsxs(o,{variant:"primary",loading:!0,type:"button",children:[e("platform.common.loading"),"..."]}),t.jsxs(o,{variant:"secondary",loading:!0,type:"button",children:[e("platform.common.loading"),"..."]}),t.jsxs(o,{variant:"tertiary",loading:!0,type:"button",children:[e("platform.common.loading"),"..."]})]})}},v={render:function(){return t.jsx(o,{asChild:!0,children:t.jsx("a",{href:"https://www.designsystemet.no",target:"_blank",rel:"noreferrer",children:"Go to designsystemet.no"})})}},g={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(o,{"data-size":"sm",type:"button",children:e("storybook.story.small")}),t.jsx(o,{"data-size":"md",type:"button",children:e("storybook.story.medium")}),t.jsx(o,{"data-size":"lg",type:"button",children:e("storybook.story.large")})]})}},h={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(o,{icon:!0,"aria-label":e("platform.common.add"),type:"button",children:t.jsx(Ht,{"aria-hidden":!0,fontSize:"1.25rem"})}),t.jsx(o,{icon:!0,variant:"secondary","aria-label":e("platform.common.save"),type:"button",children:t.jsx(w,{"aria-hidden":!0,fontSize:"1.25rem"})}),t.jsx(o,{icon:!0,variant:"tertiary","data-color":"danger","aria-label":e("platform.common.delete"),type:"button",children:t.jsx(Ot,{"aria-hidden":!0,fontSize:"1.25rem"})})]})}},f={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:e("storybook.story.doOnePrimaryButton")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary",type:"button",children:e("storybook.demo.saveChanges")}),t.jsx(o,{variant:"secondary",type:"button",children:e("platform.common.cancel")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:e("storybook.story.doSameColorExceptDanger")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary","data-color":"neutral",type:"button",children:e("storybook.demo.publish")}),t.jsx(o,{variant:"secondary","data-color":"neutral",type:"button",children:e("storybook.demo.saveDraft")}),t.jsx(o,{variant:"tertiary","data-color":"danger",type:"button",children:e("platform.common.delete")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-success-text-default)"},children:e("storybook.story.doClearLabels")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary",type:"button",children:e("storybook.demo.saveChanges")}),t.jsx(o,{variant:"secondary",type:"button",children:e("storybook.demo.discardChanges")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:e("storybook.story.dontMultiplePrimary")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap",opacity:.6},children:[t.jsx(o,{variant:"primary",type:"button",children:e("platform.common.save")}),t.jsx(o,{variant:"primary",type:"button",children:e("platform.common.submit")}),t.jsx(o,{variant:"primary",type:"button",children:e("storybook.demo.publish")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-danger-text-default)"},children:e("storybook.story.dontUnclearLabels")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap",opacity:.6},children:[t.jsx(o,{variant:"primary",type:"button",children:"OK"}),t.jsx(o,{variant:"secondary",type:"button",children:e("platform.common.cancel")})]})]})]})}},x={render:function(){const e=i();return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.emphasisLevels")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary",type:"button",children:e("storybook.demo.primary")}),t.jsx(o,{variant:"secondary",type:"button",children:e("storybook.demo.secondary")}),t.jsx(o,{variant:"tertiary",type:"button",children:e("storybook.demo.tertiary")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.allColors")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{"data-color":"accent",type:"button",children:e("storybook.demo.accent")}),t.jsx(o,{"data-color":"brand1",type:"button",children:e("storybook.demo.brand1")}),t.jsx(o,{"data-color":"brand2",type:"button",children:e("storybook.demo.brand2")}),t.jsx(o,{"data-color":"brand3",type:"button",children:e("storybook.demo.brand3")}),t.jsx(o,{"data-color":"neutral",type:"button",children:e("storybook.demo.neutral")}),t.jsx(o,{"data-color":"danger",type:"button",children:e("storybook.demo.danger")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.sizes")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",alignItems:"center",flexWrap:"wrap"},children:[t.jsx(o,{"data-size":"sm",type:"button",children:e("storybook.story.small")}),t.jsx(o,{"data-size":"md",type:"button",children:e("storybook.story.medium")}),t.jsx(o,{"data-size":"lg",type:"button",children:e("storybook.story.large")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.withIcons")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsxs(o,{type:"button",children:[t.jsx(Ht,{"aria-hidden":!0,fontSize:"1.25rem"}),e("platform.common.add")]}),t.jsxs(o,{type:"button",children:[t.jsx(w,{"aria-hidden":!0,fontSize:"1.25rem"}),e("platform.common.save")]}),t.jsxs(o,{type:"button",children:[e("storybook.demo.start"),t.jsx(At,{"aria-hidden":!0,fontSize:"1.25rem"})]}),t.jsx(o,{icon:!0,"aria-label":e("platform.common.edit"),type:"button",children:t.jsx(Et,{"aria-hidden":!0,fontSize:"1.25rem"})})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.states")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{type:"button",children:e("storybook.story.default")}),t.jsx(o,{loading:!0,type:"button",children:e("storybook.story.loading")}),t.jsx(o,{disabled:!0,type:"button",children:e("storybook.story.disabled")})]})]}),t.jsxs("div",{children:[t.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:e("storybook.story.combinedExample")}),t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[t.jsx(o,{variant:"primary","data-color":"neutral",type:"button",children:e("storybook.demo.publish")}),t.jsx(o,{variant:"secondary","data-color":"neutral",type:"button",children:e("storybook.demo.saveDraft")}),t.jsx(o,{variant:"tertiary","data-color":"danger",type:"button",children:e("platform.common.delete")})]})]})]})}};var z,S,I,C,D;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.source},description:{story:`Default button with primary variant.

This story includes an interaction test that verifies:
- Button is rendered and visible
- Button can be clicked
- Click handler is called`,...(D=(C=l.parameters)==null?void 0:C.docs)==null?void 0:D.description}}};var W,R,T,H,A;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" type="button">
          {t('storybook.demo.primary')}
        </Button>
        <Button variant="secondary" type="button">
          {t('storybook.demo.secondary')}
        </Button>
        <Button variant="tertiary" type="button">
          {t('storybook.demo.tertiary')}
        </Button>
      </div>;
  }
}`,...(T=(R=c.parameters)==null?void 0:R.docs)==null?void 0:T.source},description:{story:"Emphasis levels - Different button variants show action importance and help users prioritize.",...(A=(H=c.parameters)==null?void 0:H.docs)==null?void 0:A.description}}};var E,L,O,P,U;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
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
            {t('storybook.demo.accent')}
          </Button>
          <Button variant="primary" data-color="brand1" type="button">
            {t('storybook.demo.brand1')}
          </Button>
          <Button variant="primary" data-color="brand2" type="button">
            {t('storybook.demo.brand2')}
          </Button>
          <Button variant="primary" data-color="brand3" type="button">
            {t('storybook.demo.brand3')}
          </Button>
          <Button variant="primary" data-color="neutral" type="button">
            {t('storybook.demo.neutral')}
          </Button>
          <Button variant="primary" data-color="danger" type="button">
            {t('storybook.demo.danger')}
          </Button>
        </div>
      </div>;
  }
}`,...(O=(L=p.parameters)==null?void 0:L.docs)==null?void 0:O.source},description:{story:"All color variants - Available in all theme colors. Use same color in a group except danger for destructive actions.",...(U=(P=p.parameters)==null?void 0:P.docs)==null?void 0:U.description}}};var V,_,M,F,K;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" data-color="neutral" type="button">
          {t('storybook.demo.publish')}
        </Button>
        <Button variant="secondary" data-color="neutral" type="button">
          {t('storybook.demo.saveDraft')}
        </Button>
        <Button variant="tertiary" data-color="danger" type="button">
          {t('platform.common.delete')}
        </Button>
      </div>;
  }
}`,...(M=(_=u.parameters)==null?void 0:_.docs)==null?void 0:M.source},description:{story:"Combined colors example - Same color in group, except danger for destructive actions.",...(K=(F=u.parameters)==null?void 0:F.docs)==null?void 0:K.description}}};var N,G,q,Y,J;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
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
            {t('platform.common.edit')}
          </Button>
          <Button variant="secondary" type="button">
            <FloppydiskIcon aria-hidden fontSize="1.25rem" />
            {t('platform.common.save')}
          </Button>
          <Button variant="tertiary" type="button">
            {t('storybook.demo.start')}
            <ArrowRightIcon aria-hidden fontSize="1.25rem" />
          </Button>
        </div>
      </div>;
  }
}`,...(q=(G=y.parameters)==null?void 0:G.docs)==null?void 0:q.source},description:{story:"Icons - Buttons can have icons left or right of text. Icons automatically get spacing.",...(J=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:J.description}}};var Q,X,Z,$,tt;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Z=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:`Disabled state.

This story tests that disabled buttons:
- Have the disabled attribute
- Do not fire onClick when clicked`,...(tt=($=m.parameters)==null?void 0:$.docs)==null?void 0:tt.description}}};var et,ot,at,rt,nt;b.parameters={...b.parameters,docs:{...(et=b.parameters)==null?void 0:et.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" loading type="button">
          {t('platform.common.loading')}...
        </Button>
        <Button variant="secondary" loading type="button">
          {t('platform.common.loading')}...
        </Button>
        <Button variant="tertiary" loading type="button">
          {t('platform.common.loading')}...
        </Button>
      </div>;
  }
}`,...(at=(ot=b.parameters)==null?void 0:ot.docs)==null?void 0:at.source},description:{story:"Loading buttons - Show loading state with spinner. Combine with loading prop.",...(nt=(rt=b.parameters)==null?void 0:rt.docs)==null?void 0:nt.description}}};var st,it,dt,lt,ct;v.parameters={...v.parameters,docs:{...(st=v.parameters)==null?void 0:st.docs,source:{originalSource:`{
  render: function Render() {
    return <Button asChild>
        <a href="https://www.designsystemet.no" target="_blank" rel="noreferrer">
          Go to designsystemet.no
        </a>
      </Button>;
  }
}`,...(dt=(it=v.parameters)==null?void 0:it.docs)==null?void 0:dt.source},description:{story:"Button styled as link - Links can be styled as buttons using asChild prop.",...(ct=(lt=v.parameters)==null?void 0:lt.docs)==null?void 0:ct.description}}};var pt,ut,yt,mt,bt;g.parameters={...g.parameters,docs:{...(pt=g.parameters)==null?void 0:pt.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button data-size="sm" type="button">
          {t('storybook.story.small')}
        </Button>
        <Button data-size="md" type="button">
          {t('storybook.story.medium')}
        </Button>
        <Button data-size="lg" type="button">
          {t('storybook.story.large')}
        </Button>
      </div>;
  }
}`,...(yt=(ut=g.parameters)==null?void 0:ut.docs)==null?void 0:yt.source},description:{story:"Size variants - Buttons scale with data-size attribute.",...(bt=(mt=g.parameters)==null?void 0:mt.docs)==null?void 0:bt.description}}};var vt,gt,ht,ft,xt;h.parameters={...h.parameters,docs:{...(vt=h.parameters)==null?void 0:vt.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-3)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button icon aria-label={t('platform.common.add')} type="button">
          <PlusIcon aria-hidden fontSize="1.25rem" />
        </Button>
        <Button icon variant="secondary" aria-label={t('platform.common.save')} type="button">
          <FloppydiskIcon aria-hidden fontSize="1.25rem" />
        </Button>
        <Button icon variant="tertiary" data-color="danger" aria-label={t('platform.common.delete')} type="button">
          <TrashIcon aria-hidden fontSize="1.25rem" />
        </Button>
      </div>;
  }
}`,...(ht=(gt=h.parameters)==null?void 0:gt.docs)==null?void 0:ht.source},description:{story:`Icon-only buttons - Use only for well-known icons. Must have accessible label via aria-label or title.

Best practices:
- Only use for universally recognized icons (Close, Delete, Edit, etc.)
- Always provide aria-label describing the action
- Icon should have aria-hidden to prevent duplicate announcements
- Consider using Tooltip for additional context`,...(xt=(ft=h.parameters)==null?void 0:ft.docs)==null?void 0:xt.description}}};var Bt,kt,jt,wt,zt;f.parameters={...f.parameters,docs:{...(Bt=f.parameters)==null?void 0:Bt.docs,source:{originalSource:`{
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
            {t('storybook.story.doOnePrimaryButton')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary" type="button">
              {t('storybook.demo.saveChanges')}
            </Button>
            <Button variant="secondary" type="button">
              {t('platform.common.cancel')}
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-success-text-default)'
        }}>
            {t('storybook.story.doSameColorExceptDanger')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary" data-color="neutral" type="button">
              {t('storybook.demo.publish')}
            </Button>
            <Button variant="secondary" data-color="neutral" type="button">
              {t('storybook.demo.saveDraft')}
            </Button>
            <Button variant="tertiary" data-color="danger" type="button">
              {t('platform.common.delete')}
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-success-text-default)'
        }}>
            {t('storybook.story.doClearLabels')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary" type="button">
              {t('storybook.demo.saveChanges')}
            </Button>
            <Button variant="secondary" type="button">
              {t('storybook.demo.discardChanges')}
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-danger-text-default)'
        }}>
            {t('storybook.story.dontMultiplePrimary')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap',
          opacity: 0.6
        }}>
            <Button variant="primary" type="button">
              {t('platform.common.save')}
            </Button>
            <Button variant="primary" type="button">
              {t('platform.common.submit')}
            </Button>
            <Button variant="primary" type="button">
              {t('storybook.demo.publish')}
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)',
          color: 'var(--ds-color-danger-text-default)'
        }}>
            {t('storybook.story.dontUnclearLabels')}
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
              {t('platform.common.cancel')}
            </Button>
          </div>
        </div>
      </div>;
  }
}`,...(jt=(kt=f.parameters)==null?void 0:kt.docs)==null?void 0:jt.source},description:{story:"Best Practices - Examples of correct and incorrect button usage.",...(zt=(wt=f.parameters)==null?void 0:wt.docs)==null?void 0:zt.description}}};var St,It,Ct,Dt,Wt;x.parameters={...x.parameters,docs:{...(St=x.parameters)==null?void 0:St.docs,source:{originalSource:`{
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
            {t('storybook.story.emphasisLevels')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary" type="button">
              {t('storybook.demo.primary')}
            </Button>
            <Button variant="secondary" type="button">
              {t('storybook.demo.secondary')}
            </Button>
            <Button variant="tertiary" type="button">
              {t('storybook.demo.tertiary')}
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.allColors')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button data-color="accent" type="button">
              {t('storybook.demo.accent')}
            </Button>
            <Button data-color="brand1" type="button">
              {t('storybook.demo.brand1')}
            </Button>
            <Button data-color="brand2" type="button">
              {t('storybook.demo.brand2')}
            </Button>
            <Button data-color="brand3" type="button">
              {t('storybook.demo.brand3')}
            </Button>
            <Button data-color="neutral" type="button">
              {t('storybook.demo.neutral')}
            </Button>
            <Button data-color="danger" type="button">
              {t('storybook.demo.danger')}
            </Button>
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
          gap: 'var(--ds-spacing-3)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
            <Button data-size="sm" type="button">
              {t('storybook.story.small')}
            </Button>
            <Button data-size="md" type="button">
              {t('storybook.story.medium')}
            </Button>
            <Button data-size="lg" type="button">
              {t('storybook.story.large')}
            </Button>
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
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button type="button">
              <PlusIcon aria-hidden fontSize="1.25rem" />
              {t('platform.common.add')}
            </Button>
            <Button type="button">
              <FloppydiskIcon aria-hidden fontSize="1.25rem" />
              {t('platform.common.save')}
            </Button>
            <Button type="button">
              {t('storybook.demo.start')}
              <ArrowRightIcon aria-hidden fontSize="1.25rem" />
            </Button>
            <Button icon aria-label={t('platform.common.edit')} type="button">
              <PencilIcon aria-hidden fontSize="1.25rem" />
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.states')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button type="button">{t('storybook.story.default')}</Button>
            <Button loading type="button">
              {t('storybook.story.loading')}
            </Button>
            <Button disabled type="button">
              {t('storybook.story.disabled')}
            </Button>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.combinedExample')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          flexWrap: 'wrap'
        }}>
            <Button variant="primary" data-color="neutral" type="button">
              {t('storybook.demo.publish')}
            </Button>
            <Button variant="secondary" data-color="neutral" type="button">
              {t('storybook.demo.saveDraft')}
            </Button>
            <Button variant="tertiary" data-color="danger" type="button">
              {t('platform.common.delete')}
            </Button>
          </div>
        </div>
      </div>;
  }
}`,...(Ct=(It=x.parameters)==null?void 0:It.docs)==null?void 0:Ct.source},description:{story:"All variants overview - Complete showcase of all button variations.",...(Wt=(Dt=x.parameters)==null?void 0:Dt.docs)==null?void 0:Wt.description}}};const Mt=["Default","EmphasisLevels","Colors","CombinedColors","WithIcons","Disabled","Loading","AsLink","Sizes","IconOnly","BestPractices","AllVariants"],$t=Object.freeze(Object.defineProperty({__proto__:null,AllVariants:x,AsLink:v,BestPractices:f,Colors:p,CombinedColors:u,Default:l,Disabled:m,EmphasisLevels:c,IconOnly:h,Loading:b,Sizes:g,WithIcons:y,__namedExportsOrder:Mt,default:_t},Symbol.toStringTag,{value:"Module"}));export{x as A,$t as B,p as C,l as D,c as E,h as I,b as L,g as S,y as W,m as a};
//# sourceMappingURL=Button.stories-rzDv3-TR.js.map
