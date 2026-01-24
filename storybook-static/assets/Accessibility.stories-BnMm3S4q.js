import{j as a}from"./jsx-runtime-BYYWji4R.js";import{r as f}from"./index-ClcD9ViR.js";import{u as n}from"./index-bjNF47ar.js";import{C as t}from"./index-D1XdeRjR.js";import{H as s}from"./heading-mzc2R_Ff.js";import{P as o}from"./paragraph-DDCpJsVw.js";import{B as x}from"./button-B6PgazAq.js";import{T as k}from"./textfield-BCKd4uLT.js";import{C as oa}from"./checkbox-CeN5g5X_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";const Ca={title:"Fundamentals/Accessibility",parameters:{docs:{description:{component:`
# Accessibility (WCAG 2.1 AA)

All components are built to meet WCAG 2.1 Level AA standards.

## Key Principles
- **Perceivable**: Content is available to all senses
- **Operable**: Interface is keyboard accessible
- **Understandable**: Content and operation are clear
- **Robust**: Works with assistive technologies

## Best Practices
- Use semantic HTML
- Provide text alternatives
- Ensure keyboard navigation
- Maintain color contrast
- Support screen readers

## Reference
[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
        `}}},tags:["autodocs"]},y={render:function(){const r=n();return a.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"600px"},children:[a.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.keyboardNavigation")}),a.jsx(o,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.a11y.keyboardNavigationDescription")}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[a.jsx(x,{"data-variant":"primary",tabIndex:0,children:r("storybook.a11y.firstButton")}),a.jsx(x,{"data-variant":"secondary",tabIndex:0,children:r("storybook.a11y.secondButton")}),a.jsx(k,{label:r("storybook.a11y.textInput"),placeholder:r("storybook.a11y.typeHere"),tabIndex:0}),a.jsx(oa,{tabIndex:0,children:r("storybook.a11y.checkboxSpaceToggle")}),a.jsx("a",{href:"#",style:{color:"var(--ds-color-accent-text-default)",textDecoration:"underline"},tabIndex:0,children:r("storybook.a11y.linkEnterActivate")})]}),a.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:a.jsxs(o,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[a.jsxs("strong",{children:[r("storybook.a11y.good"),":"]})," ",r("storybook.a11y.allElementsTabIndex")]})})]})}},p={render:function(){const r=n();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[a.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[a.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.missingAria")}),a.jsx("button",{type:"button",style:{marginBottom:"var(--ds-spacing-2)"},children:"✓"}),a.jsx(o,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.a11y.iconOnlyNoLabel")})]}),a.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[a.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.properAria")}),a.jsx("button",{type:"button","aria-label":r("storybook.a11y.markAsComplete"),style:{marginBottom:"var(--ds-spacing-2)"},children:"✓"}),a.jsx(o,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.a11y.iconWithAriaLabel")})]})]})}},m={render:function(){const r=n();return a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[a.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[a.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.poorContrast")}),a.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"#E0E0E0",color:"#C0C0C0",borderRadius:"var(--ds-border-radius-md)"},children:r("storybook.a11y.hardToRead")})]}),a.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[a.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.goodContrast")}),a.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",color:"var(--ds-color-neutral-text-default)",borderRadius:"var(--ds-border-radius-md)"},children:r("storybook.a11y.easyToRead")})]})]})}},b={render:function(){const r=n();return a.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"600px"},children:[a.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.focusIndicators")}),a.jsx(o,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.a11y.tabThroughElements")}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[a.jsx(x,{"data-variant":"primary",style:{outline:"2px solid transparent",outlineOffset:"2px"},onFocus:e=>{e.currentTarget.style.outline="2px solid var(--ds-color-accent-border-strong)"},onBlur:e=>{e.currentTarget.style.outline="2px solid transparent"},children:r("storybook.a11y.buttonWithFocusRing")}),a.jsx(k,{label:r("storybook.a11y.inputField"),placeholder:r("storybook.a11y.focusToSeeOutline")}),a.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:a.jsxs(o,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[a.jsxs("strong",{children:[r("storybook.a11y.good"),":"]})," ",r("storybook.a11y.clearVisualIndicator")]})})]})]})}},g={render:function(){const r=n(),[e,c]=f.useState({name:"",email:"",subscribe:!1}),[i,h]=f.useState({});return a.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"500px"},children:[a.jsxs("form",{"aria-label":r("storybook.a11y.contactForm"),children:[a.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-6)"},children:r("storybook.a11y.accessibleForm")}),a.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[a.jsx(k,{label:r("storybook.a11y.name"),id:"name-input",value:e.name,onChange:d=>c({...e,name:d.target.value}),"aria-required":"true","aria-invalid":!!i.name,"aria-describedby":i.name?"name-error":void 0}),i.name&&a.jsx(o,{id:"name-error","data-size":"sm",role:"alert",style:{color:"var(--ds-color-danger-text-default)",marginTop:"var(--ds-spacing-1)"},children:i.name})]}),a.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[a.jsx(k,{label:r("platform.auth.email"),type:"email",id:"email-input",value:e.email,onChange:d=>c({...e,email:d.target.value}),"aria-required":"true","aria-invalid":!!i.email,"aria-describedby":"email-help"}),a.jsx(o,{id:"email-help","data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)",marginTop:"var(--ds-spacing-1)"},children:r("storybook.a11y.emailNeverShare")})]}),a.jsx("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:a.jsx(oa,{checked:e.subscribe,onChange:d=>c({...e,subscribe:d.target.checked}),"aria-label":r("storybook.a11y.subscribeNewsletter"),children:r("storybook.a11y.subscribeNewsletter")})}),a.jsx(x,{"data-variant":"primary",type:"submit",children:r("platform.common.submit")})]}),a.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:a.jsxs(o,{"data-size":"sm",style:{color:"var(--ds-color-success-text-default)"},children:[a.jsxs("strong",{children:[r("storybook.a11y.accessibleFeatures"),":"]}),a.jsx("br",{}),"• ",r("storybook.a11y.properLabelsHtmlFor"),a.jsx("br",{}),"• ",r("storybook.a11y.ariaRequiredFields"),a.jsx("br",{}),"• ",r("storybook.a11y.ariaInvalidValidation"),a.jsx("br",{}),"• ",r("storybook.a11y.ariaDescribedbyHelp"),a.jsx("br",{}),"• ",r("storybook.a11y.roleAlertErrors")]})})]})}},u={render:function(){const r=n();return a.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"600px"},children:[a.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.a11y.screenReaderOnlyText")}),a.jsx("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:a.jsxs("button",{type:"button",style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",border:"none",borderRadius:"var(--ds-border-radius-md)",cursor:"pointer"},children:[a.jsx("span",{style:{position:"absolute",width:"1px",height:"1px",padding:0,margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",border:0},children:r("storybook.a11y.closeDialog")}),"✕"]})}),a.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:a.jsxs(o,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[a.jsxs("strong",{children:[r("storybook.a11y.pattern"),":"]})," ",r("storybook.a11y.screenReaderPattern")]})})]})}},v={render:function(){const r=n(),e=[{category:r("storybook.a11y.keyboard"),items:[r("storybook.a11y.checklistKeyboardAccessible"),r("storybook.a11y.checklistTabOrder"),r("storybook.a11y.checklistFocusVisible"),r("storybook.a11y.checklistNoKeyboardTraps")]},{category:r("storybook.a11y.screenReaders"),items:[r("storybook.a11y.checklistAltText"),r("storybook.a11y.checklistFormLabels"),r("storybook.a11y.checklistAriaLabels"),r("storybook.a11y.checklistLandmarks")]},{category:r("storybook.a11y.visual"),items:[r("storybook.a11y.checklistContrastRatio"),r("storybook.a11y.checklistTextResizable"),r("storybook.a11y.checklistNoColorAlone"),r("storybook.a11y.checklistFocusClear")]},{category:r("storybook.a11y.content"),items:[r("storybook.a11y.checklistHeadingsHierarchy"),r("storybook.a11y.checklistLinksDescriptive"),r("storybook.a11y.checklistErrorsClear"),r("storybook.a11y.checklistInstructionsProvided")]}];return a.jsxs(t,{style:{padding:"var(--ds-spacing-6)"},children:[a.jsx(s,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:r("storybook.a11y.accessibilityChecklist")}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:e.map(({category:c,items:i})=>a.jsxs("div",{children:[a.jsx(s,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:c}),a.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:i.map((h,d)=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:d<i.length-1?"var(--ds-spacing-2)":0},children:[a.jsx("span",{style:{color:"var(--ds-color-success-text-default)"},children:"✓"}),a.jsx(o,{"data-size":"sm",children:h})]},d))})]},c))})]})}};var C,j,R,B,T;y.parameters={...y.parameters,docs:{...(C=y.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-6)',
      maxWidth: '600px'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.a11y.keyboardNavigation')}
        </Heading>
        <Paragraph style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.a11y.keyboardNavigationDescription')}
        </Paragraph>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Button data-variant="primary" tabIndex={0}>
            {t('storybook.a11y.firstButton')}
          </Button>
          <Button data-variant="secondary" tabIndex={0}>
            {t('storybook.a11y.secondButton')}
          </Button>
          <Textfield label={t('storybook.a11y.textInput')} placeholder={t('storybook.a11y.typeHere')} tabIndex={0} />
          <Checkbox tabIndex={0}>{t('storybook.a11y.checkboxSpaceToggle')}</Checkbox>
          <a href="#" style={{
          color: 'var(--ds-color-accent-text-default)',
          textDecoration: 'underline'
        }} tabIndex={0}>
            {t('storybook.a11y.linkEnterActivate')}
          </a>
        </div>

        <div style={{
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-info-text-default)'
        }}>
            <strong>{t('storybook.a11y.good')}:</strong> {t('storybook.a11y.allElementsTabIndex')}
          </Paragraph>
        </div>
      </Card>;
  }
}`,...(R=(j=y.parameters)==null?void 0:j.docs)==null?void 0:R.source},description:{story:`Example 1: Keyboard Navigation

All interactive elements must be keyboard accessible`,...(T=(B=y.parameters)==null?void 0:B.docs)==null?void 0:T.description}}};var A,z,F,H,P;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <Card style={{
        flex: 1,
        minWidth: '300px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.a11y.missingAria')}
          </Heading>
          <button type="button" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            ✓
          </button>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.a11y.iconOnlyNoLabel')}
          </Paragraph>
        </Card>

        {/* Good Example */}
        <Card style={{
        flex: 1,
        minWidth: '300px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.a11y.properAria')}
          </Heading>
          <button type="button" aria-label={t('storybook.a11y.markAsComplete')} style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            ✓
          </button>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.a11y.iconWithAriaLabel')}
          </Paragraph>
        </Card>
      </div>;
  }
}`,...(F=(z=p.parameters)==null?void 0:z.docs)==null?void 0:F.source},description:{story:`Example 2: ARIA Labels

Proper labeling for screen readers`,...(P=(H=p.parameters)==null?void 0:H.docs)==null?void 0:P.description}}};var D,E,I,W,S;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <Card style={{
        flex: 1,
        minWidth: '300px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.a11y.poorContrast')}
          </Heading>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: '#E0E0E0',
          color: '#C0C0C0',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            {t('storybook.a11y.hardToRead')}
          </div>
        </Card>

        {/* Good Example */}
        <Card style={{
        flex: 1,
        minWidth: '300px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.a11y.goodContrast')}
          </Heading>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          color: 'var(--ds-color-neutral-text-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            {t('storybook.a11y.easyToRead')}
          </div>
        </Card>
      </div>;
  }
}`,...(I=(E=m.parameters)==null?void 0:E.docs)==null?void 0:I.source},description:{story:`Example 3: Color Contrast

Minimum contrast ratio of 4.5:1 for normal text`,...(S=(W=m.parameters)==null?void 0:W.docs)==null?void 0:S.description}}};var w,L,N,O,K;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-6)',
      maxWidth: '600px'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.a11y.focusIndicators')}
        </Heading>
        <Paragraph style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.a11y.tabThroughElements')}
        </Paragraph>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Button data-variant="primary" style={{
          outline: '2px solid transparent',
          outlineOffset: '2px'
        }} onFocus={e => {
          e.currentTarget.style.outline = '2px solid var(--ds-color-accent-border-strong)';
        }} onBlur={e => {
          e.currentTarget.style.outline = '2px solid transparent';
        }}>
            {t('storybook.a11y.buttonWithFocusRing')}
          </Button>

          <Textfield label={t('storybook.a11y.inputField')} placeholder={t('storybook.a11y.focusToSeeOutline')} />

          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-info-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <Paragraph data-size="sm" style={{
            color: 'var(--ds-color-info-text-default)'
          }}>
              <strong>{t('storybook.a11y.good')}:</strong>{' '}
              {t('storybook.a11y.clearVisualIndicator')}
            </Paragraph>
          </div>
        </div>
      </Card>;
  }
}`,...(N=(L=b.parameters)==null?void 0:L.docs)==null?void 0:N.source},description:{story:`Example 4: Focus Indicators

Visible focus states for keyboard navigation`,...(K=(O=b.parameters)==null?void 0:O.docs)==null?void 0:K.description}}};var V,q,G,M,U;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subscribe: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    return <Card style={{
      padding: 'var(--ds-spacing-6)',
      maxWidth: '500px'
    }}>
        <form aria-label={t('storybook.a11y.contactForm')}>
          <Heading level={3} data-size="md" style={{
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            {t('storybook.a11y.accessibleForm')}
          </Heading>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label={t('storybook.a11y.name')} id="name-input" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <Paragraph id="name-error" data-size="sm" role="alert" style={{
            color: 'var(--ds-color-danger-text-default)',
            marginTop: 'var(--ds-spacing-1)'
          }}>
                {errors.name}
              </Paragraph>}
          </div>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label={t('platform.auth.email')} type="email" id="email-input" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-help" />
            <Paragraph id="email-help" data-size="sm" style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginTop: 'var(--ds-spacing-1)'
          }}>
              {t('storybook.a11y.emailNeverShare')}
            </Paragraph>
          </div>

          <div style={{
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            <Checkbox checked={formData.subscribe} onChange={e => setFormData({
            ...formData,
            subscribe: e.target.checked
          })} aria-label={t('storybook.a11y.subscribeNewsletter')}>
              {t('storybook.a11y.subscribeNewsletter')}
            </Checkbox>
          </div>

          <Button data-variant="primary" type="submit">
            {t('platform.common.submit')}
          </Button>
        </form>

        <div style={{
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-success-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)'
        }}>
            <strong>{t('storybook.a11y.accessibleFeatures')}:</strong>
            <br />• {t('storybook.a11y.properLabelsHtmlFor')}
            <br />• {t('storybook.a11y.ariaRequiredFields')}
            <br />• {t('storybook.a11y.ariaInvalidValidation')}
            <br />• {t('storybook.a11y.ariaDescribedbyHelp')}
            <br />• {t('storybook.a11y.roleAlertErrors')}
          </Paragraph>
        </div>
      </Card>;
  }
}`,...(G=(q=g.parameters)==null?void 0:q.docs)==null?void 0:G.source},description:{story:`Example 5: Form Accessibility

Complete accessible form pattern`,...(U=(M=g.parameters)==null?void 0:M.docs)==null?void 0:U.description}}};var _,J,Q,X,Y;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-6)',
      maxWidth: '600px'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.a11y.screenReaderOnlyText')}
        </Heading>

        <div style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          <button type="button" style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-accent-base-default)',
          color: 'var(--ds-color-accent-contrast-default)',
          border: 'none',
          borderRadius: 'var(--ds-border-radius-md)',
          cursor: 'pointer'
        }}>
            <span style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0
          }}>
              {t('storybook.a11y.closeDialog')}
            </span>
            ✕
          </button>
        </div>

        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-info-text-default)'
        }}>
            <strong>{t('storybook.a11y.pattern')}:</strong>{' '}
            {t('storybook.a11y.screenReaderPattern')}
          </Paragraph>
        </div>
      </Card>;
  }
}`,...(Q=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:`Example 6: Screen Reader Text

Visually hidden text for screen readers`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var Z,$,aa,ra,ea;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const checklistData = [{
      category: t('storybook.a11y.keyboard'),
      items: [t('storybook.a11y.checklistKeyboardAccessible'), t('storybook.a11y.checklistTabOrder'), t('storybook.a11y.checklistFocusVisible'), t('storybook.a11y.checklistNoKeyboardTraps')]
    }, {
      category: t('storybook.a11y.screenReaders'),
      items: [t('storybook.a11y.checklistAltText'), t('storybook.a11y.checklistFormLabels'), t('storybook.a11y.checklistAriaLabels'), t('storybook.a11y.checklistLandmarks')]
    }, {
      category: t('storybook.a11y.visual'),
      items: [t('storybook.a11y.checklistContrastRatio'), t('storybook.a11y.checklistTextResizable'), t('storybook.a11y.checklistNoColorAlone'), t('storybook.a11y.checklistFocusClear')]
    }, {
      category: t('storybook.a11y.content'),
      items: [t('storybook.a11y.checklistHeadingsHierarchy'), t('storybook.a11y.checklistLinksDescriptive'), t('storybook.a11y.checklistErrorsClear'), t('storybook.a11y.checklistInstructionsProvided')]
    }];
    return <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.a11y.accessibilityChecklist')}
        </Heading>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)'
      }}>
          {checklistData.map(({
          category,
          items
        }) => <div key={category}>
              <Heading level={3} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                {category}
              </Heading>
              <div style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)'
          }}>
                {items.map((item, index) => <div key={index} style={{
              display: 'flex',
              gap: 'var(--ds-spacing-2)',
              marginBottom: index < items.length - 1 ? 'var(--ds-spacing-2)' : 0
            }}>
                    <span style={{
                color: 'var(--ds-color-success-text-default)'
              }}>✓</span>
                    <Paragraph data-size="sm">{item}</Paragraph>
                  </div>)}
              </div>
            </div>)}
        </div>
      </Card>;
  }
}`,...(aa=($=v.parameters)==null?void 0:$.docs)==null?void 0:aa.source},description:{story:"Accessibility Checklist",...(ea=(ra=v.parameters)==null?void 0:ra.docs)==null?void 0:ea.description}}};const ja=["KeyboardNavigation","ARIALabels","ColorContrast","FocusIndicators","FormAccessibility","ScreenReaderText","Checklist"];export{p as ARIALabels,v as Checklist,m as ColorContrast,b as FocusIndicators,g as FormAccessibility,y as KeyboardNavigation,u as ScreenReaderText,ja as __namedExportsOrder,Ca as default};
//# sourceMappingURL=Accessibility.stories-BnMm3S4q.js.map
