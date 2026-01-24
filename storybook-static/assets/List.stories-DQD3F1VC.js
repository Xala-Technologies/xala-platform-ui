import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as s}from"./index-bjNF47ar.js";import{L as t}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const X={title:"Components/List",component:t,parameters:{docs:{description:{component:`
List component for displaying ordered and unordered lists.

## When to Use
- Feature lists
- Navigation menus
- Step-by-step instructions
- Content summaries
- Nested hierarchies

## Best Practices
- Use ordered lists for sequences
- Use unordered lists for non-sequential items
- Keep list items concise
- Use nesting sparingly

## Accessibility
- Uses semantic list elements
- Proper list structure for screen readers
        `}}},tags:["autodocs"]},n={render:function(){const o=s();return e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:o("storybook.demo.freeCancellation24Hours")}),e.jsx(t.Item,{children:o("storybook.demo.equipmentIncluded")}),e.jsx(t.Item,{children:o("storybook.demo.changingRoomsAvailable")}),e.jsx(t.Item,{children:o("storybook.demo.parkingOnSite")})]})}},i={render:function(){const o=s();return e.jsxs(t.Ordered,{children:[e.jsx(t.Item,{children:o("storybook.demo.createAccount")}),e.jsx(t.Item,{children:o("storybook.demo.browseResources")}),e.jsx(t.Item,{children:o("storybook.demo.selectDateTime")}),e.jsx(t.Item,{children:o("storybook.demo.completeBooking")}),e.jsx(t.Item,{children:o("storybook.demo.receiveConfirmation")})]})}},d={render:function(){const o=s();return e.jsxs(t.Unordered,{children:[e.jsxs(t.Item,{children:[o("storybook.demo.indoorAmenities"),e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:o("storybook.demo.basketballCourt")}),e.jsx(t.Item,{children:o("storybook.demo.swimmingPool")}),e.jsx(t.Item,{children:o("storybook.demo.gym")})]})]}),e.jsxs(t.Item,{children:[o("storybook.demo.outdoorAmenities"),e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:o("storybook.demo.footballField")}),e.jsx(t.Item,{children:o("storybook.demo.tennisCourt")}),e.jsx(t.Item,{children:o("storybook.demo.runningTrack")})]})]})]})}},m={render:function(){const o=s();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t.Unordered,{"data-size":"sm",children:[e.jsxs(t.Item,{children:[o("storybook.demo.smallListItem")," 1"]}),e.jsxs(t.Item,{children:[o("storybook.demo.smallListItem")," 2"]})]}),e.jsxs(t.Unordered,{"data-size":"md",children:[e.jsxs(t.Item,{children:[o("storybook.demo.mediumListItem")," 1"]}),e.jsxs(t.Item,{children:[o("storybook.demo.mediumListItem")," 2"]})]}),e.jsxs(t.Unordered,{"data-size":"lg",children:[e.jsxs(t.Item,{children:[o("storybook.demo.largeListItem")," 1"]}),e.jsxs(t.Item,{children:[o("storybook.demo.largeListItem")," 2"]})]})]})}},c={render:function(){const o=s();return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.unorderedList")}),e.jsxs(t.Unordered,{children:[e.jsx(t.Item,{children:o("storybook.demo.firstItem")}),e.jsx(t.Item,{children:o("storybook.demo.secondItem")}),e.jsx(t.Item,{children:o("storybook.demo.thirdItem")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.orderedList")}),e.jsxs(t.Ordered,{children:[e.jsx(t.Item,{children:o("storybook.demo.stepOne")}),e.jsx(t.Item,{children:o("storybook.demo.stepTwo")}),e.jsx(t.Item,{children:o("storybook.demo.stepThree")})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:o("storybook.story.nestedList")}),e.jsx(t.Unordered,{children:e.jsxs(t.Item,{children:[o("storybook.demo.parentItem"),e.jsxs(t.Unordered,{children:[e.jsxs(t.Item,{children:[o("storybook.demo.childItem")," 1"]}),e.jsxs(t.Item,{children:[o("storybook.demo.childItem")," 2"]})]})]})})]})]})}};var a,l,I;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <List.Unordered>
        <List.Item>{t('storybook.demo.freeCancellation24Hours')}</List.Item>
        <List.Item>{t('storybook.demo.equipmentIncluded')}</List.Item>
        <List.Item>{t('storybook.demo.changingRoomsAvailable')}</List.Item>
        <List.Item>{t('storybook.demo.parkingOnSite')}</List.Item>
      </List.Unordered>;
  }
}`,...(I=(l=n.parameters)==null?void 0:l.docs)==null?void 0:I.source}}};var L,y,p;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <List.Ordered>
        <List.Item>{t('storybook.demo.createAccount')}</List.Item>
        <List.Item>{t('storybook.demo.browseResources')}</List.Item>
        <List.Item>{t('storybook.demo.selectDateTime')}</List.Item>
        <List.Item>{t('storybook.demo.completeBooking')}</List.Item>
        <List.Item>{t('storybook.demo.receiveConfirmation')}</List.Item>
      </List.Ordered>;
  }
}`,...(p=(y=i.parameters)==null?void 0:y.docs)==null?void 0:p.source}}};var u,b,k;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <List.Unordered>
        <List.Item>
          {t('storybook.demo.indoorAmenities')}
          <List.Unordered>
            <List.Item>{t('storybook.demo.basketballCourt')}</List.Item>
            <List.Item>{t('storybook.demo.swimmingPool')}</List.Item>
            <List.Item>{t('storybook.demo.gym')}</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          {t('storybook.demo.outdoorAmenities')}
          <List.Unordered>
            <List.Item>{t('storybook.demo.footballField')}</List.Item>
            <List.Item>{t('storybook.demo.tennisCourt')}</List.Item>
            <List.Item>{t('storybook.demo.runningTrack')}</List.Item>
          </List.Unordered>
        </List.Item>
      </List.Unordered>;
  }
}`,...(k=(b=d.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var h,x,j;m.parameters={...m.parameters,docs:{...(h=m.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <List.Unordered data-size="sm">
          <List.Item>{t('storybook.demo.smallListItem')} 1</List.Item>
          <List.Item>{t('storybook.demo.smallListItem')} 2</List.Item>
        </List.Unordered>
        <List.Unordered data-size="md">
          <List.Item>{t('storybook.demo.mediumListItem')} 1</List.Item>
          <List.Item>{t('storybook.demo.mediumListItem')} 2</List.Item>
        </List.Unordered>
        <List.Unordered data-size="lg">
          <List.Item>{t('storybook.demo.largeListItem')} 1</List.Item>
          <List.Item>{t('storybook.demo.largeListItem')} 2</List.Item>
        </List.Unordered>
      </div>;
  }
}`,...(j=(x=m.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var g,f,U;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
            {t('storybook.story.unorderedList')}
          </h3>
          <List.Unordered>
            <List.Item>{t('storybook.demo.firstItem')}</List.Item>
            <List.Item>{t('storybook.demo.secondItem')}</List.Item>
            <List.Item>{t('storybook.demo.thirdItem')}</List.Item>
          </List.Unordered>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.orderedList')}
          </h3>
          <List.Ordered>
            <List.Item>{t('storybook.demo.stepOne')}</List.Item>
            <List.Item>{t('storybook.demo.stepTwo')}</List.Item>
            <List.Item>{t('storybook.demo.stepThree')}</List.Item>
          </List.Ordered>
        </div>
        <div>
          <h3 style={{
          marginBottom: 'var(--ds-spacing-3)',
          fontSize: 'var(--ds-font-size-4)'
        }}>
            {t('storybook.story.nestedList')}
          </h3>
          <List.Unordered>
            <List.Item>
              {t('storybook.demo.parentItem')}
              <List.Unordered>
                <List.Item>{t('storybook.demo.childItem')} 1</List.Item>
                <List.Item>{t('storybook.demo.childItem')} 2</List.Item>
              </List.Unordered>
            </List.Item>
          </List.Unordered>
        </div>
      </div>;
  }
}`,...(U=(f=c.parameters)==null?void 0:f.docs)==null?void 0:U.source}}};const Y=["Unordered","Ordered","Nested","Sizes","AllVariants"];export{c as AllVariants,d as Nested,i as Ordered,m as Sizes,n as Unordered,Y as __namedExportsOrder,X as default};
//# sourceMappingURL=List.stories-DQD3F1VC.js.map
