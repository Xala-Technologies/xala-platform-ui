import{j as a}from"./jsx-runtime-BYYWji4R.js";import{u as p}from"./index-bjNF47ar.js";import{B as e}from"./tooltip-BO1LcXkK.js";import"./alert-BzTWXKSs.js";import{B as g}from"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as r}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const na={title:"Components/Badge",component:e,parameters:{docs:{description:{component:`
**IMPORTANT**: Badge is for numbers and counts only. Use Tag component for text labels.

Badge displays numeric counts and status indicators with two variants: base (solid) and tinted (subtle).

## Key Properties

- count: Numeric value to display
- maxCount: Maximum before showing "99+" (default 99)
- data-color: Color variant (neutral, accent, success, warning, danger, info)
- data-size: Size variant (sm, md, lg)

## When to Use Badge

- Notification counts (unread messages, alerts)
- Numeric indicators on buttons or tabs
- Status dots with accompanying text labels
- Quantity badges

## When to Use Tag Instead

- Status labels like "Active", "Pending", "Draft"
- Category labels like "Bug", "Feature"
- Metadata tags like "Premium", "New", "Beta"
- Any text-based labels

## Best Practices

Do:
- Use count prop for numeric values
- Use maxCount to cap large numbers
- Place notification badges consistently
- Use status dots with text labels nearby
- Use semantic colors appropriately

Don't:
- Don't use text in Badge (use Tag instead)
- Don't use Badge for status words
- Don't rely on color alone
- Don't use for interactive elements

## Accessibility

- Badge counts are announced by screen readers
- Color meaning supplemented with text
- Minimum 4.5:1 color contrast
- Context clear from surrounding content
        `}}},tags:["autodocs"],argTypes:{"data-size":{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},"data-color":{control:"select",options:["neutral","accent","success","warning","danger","info"],description:"Color variant",table:{defaultValue:{summary:"neutral"}}}}},o={render:()=>a.jsx(e,{count:5})},i={render:function(){return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[a.jsx(e,{count:5,"data-color":"neutral"}),a.jsx(e,{count:12,"data-color":"accent"}),a.jsx(e,{count:3,"data-color":"success"}),a.jsx(e,{count:7,"data-color":"warning"}),a.jsx(e,{count:99,"data-color":"danger"}),a.jsx(e,{count:42,"data-color":"info"})]})}},d={render:function(){return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[a.jsx(e,{count:5,"data-size":"sm"}),a.jsx(e,{count:15,"data-size":"md"}),a.jsx(e,{count:99,"data-size":"lg"})]})}},c={render:function(){return p(),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[a.jsxs(g,{variant:"secondary",type:"button",children:["Notifications",a.jsx(e,{count:3,"data-color":"danger","data-size":"sm",style:{marginLeft:"var(--ds-spacing-2)"}})]}),a.jsxs(g,{variant:"secondary",type:"button",children:["Messages",a.jsx(e,{count:150,maxCount:99,"data-color":"info","data-size":"sm",style:{marginLeft:"var(--ds-spacing-2)"}})]})]})}},l={render:function(){const t=p();return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"success",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),t("platform.status.active")]}),a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"warning",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),t("platform.status.pending")]}),a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"danger",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),t("platform.status.cancelled")]}),a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"neutral",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),"Draft"]})]})}},s={render:function(){const t=p();return a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[a.jsxs("div",{children:[a.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.variants")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(e,{count:5,"data-color":"neutral"}),a.jsx(e,{count:12,"data-color":"accent"}),a.jsx(e,{count:3,"data-color":"success"}),a.jsx(e,{count:7,"data-color":"warning"}),a.jsx(e,{count:99,"data-color":"danger"}),a.jsx(e,{count:42,"data-color":"info"})]})]}),a.jsxs("div",{children:[a.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.sizes")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[a.jsx(e,{count:5,"data-size":"sm"}),a.jsx(e,{count:15,"data-size":"md"}),a.jsx(e,{count:99,"data-size":"lg"})]})]}),a.jsxs("div",{children:[a.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.interactive")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)"},children:[a.jsxs(g,{variant:"secondary",type:"button",children:["Notifications",a.jsx(e,{count:5,"data-color":"danger","data-size":"sm",style:{marginLeft:"var(--ds-spacing-2)"}})]}),a.jsxs(g,{variant:"secondary",type:"button",children:["Messages",a.jsx(e,{count:150,maxCount:99,"data-color":"info","data-size":"sm",style:{marginLeft:"var(--ds-spacing-2)"}})]})]})]}),a.jsxs("div",{children:[a.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.story.states")}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"success",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),t("platform.status.active")]}),a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"warning",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),t("platform.status.pending")]}),a.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[a.jsx(e,{"data-color":"danger",style:{marginInlineEnd:"var(--ds-spacing-2)"}}),t("storybook.story.error")]})]})]})]})}};var u,m,y;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Badge count={5} />
}`,...(y=(m=o.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var v,x,f;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      alignItems: 'center'
    }}>
      <Badge count={5} data-color="neutral" />
      <Badge count={12} data-color="accent" />
      <Badge count={3} data-color="success" />
      <Badge count={7} data-color="warning" />
      <Badge count={99} data-color="danger" />
      <Badge count={42} data-color="info" />
    </div>;
  }
}`,...(f=(x=i.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var B,j,b;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function Render() {
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      alignItems: 'center'
    }}>
      <Badge count={5} data-size="sm" />
      <Badge count={15} data-size="md" />
      <Badge count={99} data-size="lg" />
    </div>;
  }
}`,...(b=(j=d.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var I,h,z;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      alignItems: 'center'
    }}>
        <Button variant="secondary" type="button">
          Notifications
          <Badge count={3} data-color="danger" data-size="sm" style={{
          marginLeft: 'var(--ds-spacing-2)'
        }} />
        </Button>
        <Button variant="secondary" type="button">
          Messages
          <Badge count={150} maxCount={99} data-color="info" data-size="sm" style={{
          marginLeft: 'var(--ds-spacing-2)'
        }} />
        </Button>
      </div>;
  }
}`,...(z=(h=c.parameters)==null?void 0:h.docs)==null?void 0:z.source}}};var w,D,E;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-3)'
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
          <Badge data-color="success" style={{
          marginInlineEnd: 'var(--ds-spacing-2)'
        }} />
          {t('platform.status.active')}
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
          <Badge data-color="warning" style={{
          marginInlineEnd: 'var(--ds-spacing-2)'
        }} />
          {t('platform.status.pending')}
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
          <Badge data-color="danger" style={{
          marginInlineEnd: 'var(--ds-spacing-2)'
        }} />
          {t('platform.status.cancelled')}
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
          <Badge data-color="neutral" style={{
          marginInlineEnd: 'var(--ds-spacing-2)'
        }} />
          Draft
        </div>
      </div>;
  }
}`,...(E=(D=l.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var C,S,k,R,H;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
            {t('storybook.story.variants')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Badge count={5} data-color="neutral" />
            <Badge count={12} data-color="accent" />
            <Badge count={3} data-color="success" />
            <Badge count={7} data-color="warning" />
            <Badge count={99} data-color="danger" />
            <Badge count={42} data-color="info" />
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
            <Badge count={5} data-size="sm" />
            <Badge count={15} data-size="md" />
            <Badge count={99} data-size="lg" />
          </div>
        </div>
        <div>
          <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.story.interactive')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Button variant="secondary" type="button">
              Notifications
              <Badge count={5} data-color="danger" data-size="sm" style={{
              marginLeft: 'var(--ds-spacing-2)'
            }} />
            </Button>
            <Button variant="secondary" type="button">
              Messages
              <Badge count={150} maxCount={99} data-color="info" data-size="sm" style={{
              marginLeft: 'var(--ds-spacing-2)'
            }} />
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
          flexDirection: 'column',
          gap: 'var(--ds-spacing-2)'
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
              <Badge data-color="success" style={{
              marginInlineEnd: 'var(--ds-spacing-2)'
            }} />
              {t('platform.status.active')}
            </div>
            <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
              <Badge data-color="warning" style={{
              marginInlineEnd: 'var(--ds-spacing-2)'
            }} />
              {t('platform.status.pending')}
            </div>
            <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
              <Badge data-color="danger" style={{
              marginInlineEnd: 'var(--ds-spacing-2)'
            }} />
              {t('storybook.story.error')}
            </div>
          </div>
        </div>
      </div>;
  }
}`,...(k=(S=s.parameters)==null?void 0:S.docs)==null?void 0:k.source},description:{story:"All variants overview",...(H=(R=s.parameters)==null?void 0:R.docs)==null?void 0:H.description}}};const ra=["Default","Colors","Sizes","WithButton","StatusDots","AllVariants"];export{s as AllVariants,i as Colors,o as Default,d as Sizes,l as StatusDots,c as WithButton,ra as __namedExportsOrder,na as default};
//# sourceMappingURL=Badge.stories-COp5yd6w.js.map
