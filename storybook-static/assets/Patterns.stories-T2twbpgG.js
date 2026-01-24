import{j as t}from"./jsx-runtime-BYYWji4R.js";import{u as c}from"./index-bjNF47ar.js";import{r as k}from"./index-ClcD9ViR.js";import{I as st}from"./inbox-BN_FKUt2.js";import{S as ot}from"./search-CYObfgOQ.js";import{C as nt}from"./circle-alert-BRqVkw9I.js";import{C as o}from"./index-D1XdeRjR.js";import{H as e}from"./heading-mzc2R_Ff.js";import{P as s}from"./paragraph-DDCpJsVw.js";import{B as g}from"./button-B6PgazAq.js";import{T as i}from"./textfield-BCKd4uLT.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./createLucideIcon-DXOARlW5.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";const Ht={title:"Fundamentals/Patterns",parameters:{docs:{description:{component:`
# Design Patterns

Reusable solutions to common design problems. These patterns create consistent, recognizable user experiences.

## Categories
- **Form Patterns**: Validation, required fields, error handling
- **Navigation Patterns**: Menus, breadcrumbs, wizards
- **Feedback Patterns**: Notifications, loading states, empty states
- **Data Patterns**: Tables, lists, filtering, pagination

## Reference
[Designsystemet Patterns](https://designsystemet.no/no/patterns)
        `}}},tags:["autodocs"]},m={render:function(){const r=c();return t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[t.jsxs(o,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[t.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[r("storybook.bestPractices.dont")," ",r("storybook.patterns.wrongPattern")]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[t.jsx(i,{label:`${r("platform.common.name")} *`,required:!0}),t.jsx(i,{label:`${r("platform.common.email")} *`,type:"email",required:!0}),t.jsx(i,{label:r("storybook.demo.phone"),type:"tel"})]}),t.jsx(s,{"data-size":"sm",style:{marginTop:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.patterns.asterisksClutter")})]}),t.jsxs(o,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[t.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[r("storybook.bestPractices.do")," ",r("storybook.patterns.correctPattern")]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[t.jsx(i,{label:r("platform.common.name"),required:!0}),t.jsx(i,{label:r("platform.common.email"),type:"email",required:!0}),t.jsx(i,{label:`${r("storybook.demo.phone")} (${r("storybook.patterns.optional")})`,type:"tel"})]}),t.jsx(s,{"data-size":"sm",style:{marginTop:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.patterns.markOptional")})]})]})}},v={render:function(){const r=c(),[a,n]=k.useState(""),[d,l]=k.useState(!1),h=d&&!a.includes("@")?r("storybook.patterns.invalidEmail"):void 0;return t.jsxs(o,{style:{padding:"var(--ds-spacing-6)"},children:[t.jsx(e,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.patterns.userTriggeredValidation")}),t.jsx(s,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:r("storybook.patterns.errorOnBlur")}),t.jsx(i,{label:r("platform.common.email"),type:"email",value:a,onChange:at=>n(at.target.value),onBlur:()=>l(!0),error:h}),t.jsx("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:t.jsxs(s,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[t.jsxs("strong",{children:[r("storybook.patterns.pattern"),":"]})," ",r("storybook.patterns.validateOnBlur")]})})]})}},u={render:function(){const r=c(),[a,n]=k.useState(1),d=3;return t.jsxs(o,{style:{padding:"var(--ds-spacing-6)"},children:[t.jsx(e,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-6)"},children:r("storybook.patterns.multiStepWizard")}),t.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-8)"},children:[1,2,3].map(l=>t.jsxs("div",{style:{flex:1},children:[t.jsx("div",{style:{height:"var(--ds-spacing-1)",backgroundColor:l<=a?"var(--ds-color-accent-base-default)":"var(--ds-color-neutral-border-subtle)",borderRadius:"var(--ds-border-radius-full)"}}),t.jsxs(s,{"data-size":"xs",style:{marginTop:"var(--ds-spacing-1)",textAlign:"center",color:l<=a?"var(--ds-color-accent-text-default)":"var(--ds-color-neutral-text-subtle)"},children:[r("storybook.patterns.step")," ",l]})]},l))}),t.jsxs("div",{style:{minHeight:"200px",marginBottom:"var(--ds-spacing-6)"},children:[a===1&&t.jsxs("div",{children:[t.jsxs(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:[r("storybook.patterns.step")," 1: ",r("storybook.patterns.basicInfo")]}),t.jsx(i,{label:r("platform.common.name")})]}),a===2&&t.jsxs("div",{children:[t.jsxs(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:[r("storybook.patterns.step")," 2: ",r("storybook.patterns.contactDetails")]}),t.jsx(i,{label:r("platform.common.email"),type:"email"})]}),a===3&&t.jsxs("div",{children:[t.jsxs(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:[r("storybook.patterns.step")," 3: ",r("storybook.patterns.confirmation")]}),t.jsx(s,{children:r("storybook.patterns.reviewConfirm")})]})]}),t.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[t.jsx(g,{"data-variant":"tertiary",onClick:()=>n(Math.max(1,a-1)),disabled:a===1,children:r("storybook.patterns.previous")}),t.jsx(g,{"data-variant":"primary",onClick:()=>n(Math.min(d,a+1)),disabled:a===d,children:r(a===d?"storybook.patterns.complete":"storybook.patterns.next")})]})]})}},y={render:function(){const r=c();return t.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:[t.jsxs(o,{style:{padding:"var(--ds-spacing-8)",textAlign:"center"},children:[t.jsx(st,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-neutral-text-subtle)"}}),t.jsx(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:r("storybook.patterns.noItemsYet")}),t.jsx(s,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.patterns.getStarted")}),t.jsx(g,{"data-variant":"primary",children:r("storybook.patterns.createItem")})]}),t.jsxs(o,{style:{padding:"var(--ds-spacing-8)",textAlign:"center"},children:[t.jsx(ot,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-neutral-text-subtle)"}}),t.jsx(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:r("storybook.patterns.noResultsFound")}),t.jsx(s,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.patterns.adjustSearch")}),t.jsx(g,{"data-variant":"secondary",children:r("storybook.patterns.clearFilters")})]}),t.jsxs(o,{style:{padding:"var(--ds-spacing-8)",textAlign:"center"},children:[t.jsx(nt,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-warning-base-default)"}}),t.jsx(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:r("storybook.patterns.somethingWentWrong")}),t.jsx(s,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:r("storybook.patterns.couldntLoadContent")}),t.jsx(g,{"data-variant":"secondary",children:r("storybook.patterns.tryAgain")})]})]})}},b={render:function(){const r=c();return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[t.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-success-surface-default)",borderLeft:"4px solid var(--ds-color-success-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-2)"},children:r("storybook.notifications.success")}),t.jsx(s,{style:{color:"var(--ds-color-success-text-default)"},children:r("storybook.notifications.changesSaved")})]}),t.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-warning-surface-default)",borderLeft:"4px solid var(--ds-color-warning-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-warning-text-default)",marginBottom:"var(--ds-spacing-2)"},children:r("storybook.notifications.warning")}),t.jsx(s,{style:{color:"var(--ds-color-warning-text-default)"},children:r("storybook.notifications.sessionExpiring")})]}),t.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-danger-surface-default)",borderLeft:"4px solid var(--ds-color-danger-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-2)"},children:r("storybook.notifications.error")}),t.jsx(s,{style:{color:"var(--ds-color-danger-text-default)"},children:r("storybook.notifications.saveFailed")})]}),t.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderLeft:"4px solid var(--ds-color-info-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-info-text-default)",marginBottom:"var(--ds-spacing-2)"},children:r("storybook.notifications.information")}),t.jsx(s,{style:{color:"var(--ds-color-info-text-default)"},children:r("storybook.notifications.scheduledMaintenance")})]})]})}},f={render:function(){const r=c();return t.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:[t.jsxs(o,{style:{padding:"var(--ds-spacing-6)"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.loading.buttonLoading")}),t.jsxs(g,{"data-variant":"primary",disabled:!0,children:[t.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"..."}),r("storybook.loading.saving")]})]}),t.jsxs(o,{style:{padding:"var(--ds-spacing-6)",textAlign:"center"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.loading.spinner")}),t.jsx("div",{style:{width:"40px",height:"40px",border:"4px solid var(--ds-color-neutral-border-subtle)",borderTop:"4px solid var(--ds-color-accent-base-default)",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto"}}),t.jsx("style",{children:"@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"})]}),t.jsxs(o,{style:{padding:"var(--ds-spacing-6)"},children:[t.jsx(e,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:r("storybook.loading.skeleton")}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[100,80,90].map((a,n)=>t.jsx("div",{style:{height:"16px",width:`${a}%`,backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",animation:"pulse 1.5s ease-in-out infinite"}},n))}),t.jsx("style",{children:"@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }"})]})]})}},x={render:function(){const r=c(),a=[{title:r("storybook.patterns.formPatterns"),patterns:[r("storybook.patterns.markOptionalFields"),r("storybook.patterns.validateOnBlurPattern"),r("storybook.patterns.showErrorsAfterInteraction"),r("storybook.patterns.clearErrorMessages")]},{title:r("storybook.patterns.feedbackPatterns"),patterns:[r("storybook.patterns.useSemanticColors"),r("storybook.patterns.provideLoadingStates"),r("storybook.patterns.showEmptyStates"),r("storybook.patterns.consistentNotifications")]},{title:r("storybook.patterns.navigationPatterns"),patterns:[r("storybook.patterns.showProgress"),r("storybook.patterns.clearNavigation"),r("storybook.patterns.indicateLocation"),r("storybook.patterns.enableKeyboardNav")]}];return t.jsxs(o,{style:{padding:"var(--ds-spacing-8)"},children:[t.jsx(e,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:r("storybook.patterns.summary")}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:a.map(({title:n,patterns:d})=>t.jsxs("div",{children:[t.jsx(e,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:n}),t.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:d.map((l,h)=>t.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:h<d.length-1?"var(--ds-spacing-2)":0},children:[t.jsx("span",{style:{color:"var(--ds-color-success-text-default)"},children:"✓"}),t.jsx(s,{"data-size":"sm",children:l})]},h))})]},n))})]})}};var j,B,C,P,z;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        <Card style={{
        flex: 1,
        minWidth: '300px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.bestPractices.dont')} {t('storybook.patterns.wrongPattern')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)'
        }}>
            <Textfield label={\`\${t('platform.common.name')} *\`} required />
            <Textfield label={\`\${t('platform.common.email')} *\`} type="email" required />
            <Textfield label={t('storybook.demo.phone')} type="tel" />
          </div>
          <Paragraph data-size="sm" style={{
          marginTop: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.patterns.asterisksClutter')}
          </Paragraph>
        </Card>

        <Card style={{
        flex: 1,
        minWidth: '300px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.bestPractices.do')} {t('storybook.patterns.correctPattern')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)'
        }}>
            <Textfield label={t('platform.common.name')} required />
            <Textfield label={t('platform.common.email')} type="email" required />
            <Textfield label={\`\${t('storybook.demo.phone')} (\${t('storybook.patterns.optional')})\`} type="tel" />
          </div>
          <Paragraph data-size="sm" style={{
          marginTop: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.patterns.markOptional')}
          </Paragraph>
        </Card>
      </div>;
  }
}`,...(C=(B=m.parameters)==null?void 0:B.docs)==null?void 0:C.source},description:{story:`Pattern 1: Required vs Optional Fields

Mark optional fields, not required ones`,...(z=(P=m.parameters)==null?void 0:P.docs)==null?void 0:z.description}}};var S,H,R,T,w;v.parameters={...v.parameters,docs:{...(S=v.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState(false);
    const error = touched && !email.includes('@') ? t('storybook.patterns.invalidEmail') : undefined;
    return <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.patterns.userTriggeredValidation')}
        </Heading>
        <Paragraph style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.patterns.errorOnBlur')}
        </Paragraph>

        <Textfield label={t('platform.common.email')} type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(true)} error={error} />

        <div style={{
        marginTop: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-sm)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-info-text-default)'
        }}>
            <strong>{t('storybook.patterns.pattern')}:</strong>{' '}
            {t('storybook.patterns.validateOnBlur')}
          </Paragraph>
        </div>
      </Card>;
  }
}`,...(R=(H=v.parameters)==null?void 0:H.docs)==null?void 0:R.source},description:{story:`Pattern 2: User-Triggered Validation

Show errors after user interaction, not on load`,...(w=(T=v.parameters)==null?void 0:T.docs)==null?void 0:w.description}}};var E,L,W,A,D;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    return <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.patterns.multiStepWizard')}
        </Heading>

        {/* Progress Indicator */}
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        marginBottom: 'var(--ds-spacing-8)'
      }}>
          {[1, 2, 3].map(num => <div key={num} style={{
          flex: 1
        }}>
              <div style={{
            height: 'var(--ds-spacing-1)',
            backgroundColor: num <= step ? 'var(--ds-color-accent-base-default)' : 'var(--ds-color-neutral-border-subtle)',
            borderRadius: 'var(--ds-border-radius-full)'
          }} />
              <Paragraph data-size="xs" style={{
            marginTop: 'var(--ds-spacing-1)',
            textAlign: 'center',
            color: num <= step ? 'var(--ds-color-accent-text-default)' : 'var(--ds-color-neutral-text-subtle)'
          }}>
                {t('storybook.patterns.step')} {num}
              </Paragraph>
            </div>)}
        </div>

        {/* Step Content */}
        <div style={{
        minHeight: '200px',
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {step === 1 && <div>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                {t('storybook.patterns.step')} 1: {t('storybook.patterns.basicInfo')}
              </Heading>
              <Textfield label={t('platform.common.name')} />
            </div>}
          {step === 2 && <div>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                {t('storybook.patterns.step')} 2: {t('storybook.patterns.contactDetails')}
              </Heading>
              <Textfield label={t('platform.common.email')} type="email" />
            </div>}
          {step === 3 && <div>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                {t('storybook.patterns.step')} 3: {t('storybook.patterns.confirmation')}
              </Heading>
              <Paragraph>{t('storybook.patterns.reviewConfirm')}</Paragraph>
            </div>}
        </div>

        {/* Navigation */}
        <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
          <Button data-variant="tertiary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            {t('storybook.patterns.previous')}
          </Button>
          <Button data-variant="primary" onClick={() => setStep(Math.min(totalSteps, step + 1))} disabled={step === totalSteps}>
            {step === totalSteps ? t('storybook.patterns.complete') : t('storybook.patterns.next')}
          </Button>
        </div>
      </Card>;
  }
}`,...(W=(L=u.parameters)==null?void 0:L.docs)==null?void 0:W.source},description:{story:`Pattern 3: Multi-Step Wizard

Clear progress indication and navigation`,...(D=(A=u.parameters)==null?void 0:A.docs)==null?void 0:D.description}}};var F,N,O,q,I;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)'
    }}>
        {/* No Data */}
        <Card style={{
        padding: 'var(--ds-spacing-8)',
        textAlign: 'center'
      }}>
          <Inbox size={48} style={{
          marginBottom: 'var(--ds-spacing-4)',
          margin: '0 auto',
          color: 'var(--ds-color-neutral-text-subtle)'
        }} />
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.patterns.noItemsYet')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.patterns.getStarted')}
          </Paragraph>
          <Button data-variant="primary">{t('storybook.patterns.createItem')}</Button>
        </Card>

        {/* No Results */}
        <Card style={{
        padding: 'var(--ds-spacing-8)',
        textAlign: 'center'
      }}>
          <Search size={48} style={{
          marginBottom: 'var(--ds-spacing-4)',
          margin: '0 auto',
          color: 'var(--ds-color-neutral-text-subtle)'
        }} />
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.patterns.noResultsFound')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.patterns.adjustSearch')}
          </Paragraph>
          <Button data-variant="secondary">{t('storybook.patterns.clearFilters')}</Button>
        </Card>

        {/* Error State */}
        <Card style={{
        padding: 'var(--ds-spacing-8)',
        textAlign: 'center'
      }}>
          <AlertCircle size={48} style={{
          marginBottom: 'var(--ds-spacing-4)',
          margin: '0 auto',
          color: 'var(--ds-color-warning-base-default)'
        }} />
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.patterns.somethingWentWrong')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.patterns.couldntLoadContent')}
          </Paragraph>
          <Button data-variant="secondary">{t('storybook.patterns.tryAgain')}</Button>
        </Card>
      </div>;
  }
}`,...(O=(N=y.parameters)==null?void 0:N.docs)==null?void 0:O.source},description:{story:`Pattern 4: Empty State

Helpful guidance when no content exists`,...(I=(q=y.parameters)==null?void 0:q.docs)==null?void 0:I.description}}};var M,$,V,U,K;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        {/* Success */}
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-success-surface-default)',
        borderLeft: '4px solid var(--ds-color-success-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.notifications.success')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-success-text-default)'
        }}>
            {t('storybook.notifications.changesSaved')}
          </Paragraph>
        </div>

        {/* Warning */}
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-warning-surface-default)',
        borderLeft: '4px solid var(--ds-color-warning-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-warning-text-default)',
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.notifications.warning')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-warning-text-default)'
        }}>
            {t('storybook.notifications.sessionExpiring')}
          </Paragraph>
        </div>

        {/* Error */}
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-danger-surface-default)',
        borderLeft: '4px solid var(--ds-color-danger-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.notifications.error')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-danger-text-default)'
        }}>
            {t('storybook.notifications.saveFailed')}
          </Paragraph>
        </div>

        {/* Info */}
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderLeft: '4px solid var(--ds-color-info-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Heading level={4} data-size="sm" style={{
          color: 'var(--ds-color-info-text-default)',
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.notifications.information')}
          </Heading>
          <Paragraph style={{
          color: 'var(--ds-color-info-text-default)'
        }}>
            {t('storybook.notifications.scheduledMaintenance')}
          </Paragraph>
        </div>
      </div>;
  }
}`,...(V=($=b.parameters)==null?void 0:$.docs)==null?void 0:V.source},description:{story:`Pattern 5: Notification Types

Consistent feedback for different scenarios`,...(K=(U=b.parameters)==null?void 0:U.docs)==null?void 0:K.description}}};var Y,_,G,J,Q;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)'
    }}>
        {/* Button Loading */}
        <Card style={{
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.loading.buttonLoading')}
          </Heading>
          <Button data-variant="primary" disabled>
            <span style={{
            marginRight: 'var(--ds-spacing-2)'
          }}>...</span>
            {t('storybook.loading.saving')}
          </Button>
        </Card>

        {/* Spinner */}
        <Card style={{
        padding: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.loading.spinner')}
          </Heading>
          <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--ds-color-neutral-border-subtle)',
          borderTop: '4px solid var(--ds-color-accent-base-default)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
          <style>{\`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\`}</style>
        </Card>

        {/* Skeleton */}
        <Card style={{
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.loading.skeleton')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-2)'
        }}>
            {[100, 80, 90].map((width, i) => <div key={i} style={{
            height: '16px',
            width: \`\${width}%\`,
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />)}
          </div>
          <style>{\`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }\`}</style>
        </Card>
      </div>;
  }
}`,...(G=(_=f.parameters)==null?void 0:_.docs)==null?void 0:G.source},description:{story:`Pattern 6: Loading States

Clear feedback during async operations`,...(Q=(J=f.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};var X,Z,tt,rt,et;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const patternCategories = [{
      title: t('storybook.patterns.formPatterns'),
      patterns: [t('storybook.patterns.markOptionalFields'), t('storybook.patterns.validateOnBlurPattern'), t('storybook.patterns.showErrorsAfterInteraction'), t('storybook.patterns.clearErrorMessages')]
    }, {
      title: t('storybook.patterns.feedbackPatterns'),
      patterns: [t('storybook.patterns.useSemanticColors'), t('storybook.patterns.provideLoadingStates'), t('storybook.patterns.showEmptyStates'), t('storybook.patterns.consistentNotifications')]
    }, {
      title: t('storybook.patterns.navigationPatterns'),
      patterns: [t('storybook.patterns.showProgress'), t('storybook.patterns.clearNavigation'), t('storybook.patterns.indicateLocation'), t('storybook.patterns.enableKeyboardNav')]
    }];
    return <Card style={{
      padding: 'var(--ds-spacing-8)'
    }}>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.patterns.summary')}
        </Heading>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)'
      }}>
          {patternCategories.map(({
          title,
          patterns
        }) => <div key={title}>
              <Heading level={3} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                {title}
              </Heading>
              <div style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)'
          }}>
                {patterns.map((pattern, i) => <div key={i} style={{
              display: 'flex',
              gap: 'var(--ds-spacing-2)',
              marginBottom: i < patterns.length - 1 ? 'var(--ds-spacing-2)' : 0
            }}>
                    <span style={{
                color: 'var(--ds-color-success-text-default)'
              }}>✓</span>
                    <Paragraph data-size="sm">{pattern}</Paragraph>
                  </div>)}
              </div>
            </div>)}
        </div>
      </Card>;
  }
}`,...(tt=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:tt.source},description:{story:"Patterns Summary",...(et=(rt=x.parameters)==null?void 0:rt.docs)==null?void 0:et.description}}};const Rt=["RequiredOptionalFields","UserTriggeredValidation","MultiStepWizard","EmptyStatePattern","NotificationTypes","LoadingStates","Summary"];export{y as EmptyStatePattern,f as LoadingStates,u as MultiStepWizard,b as NotificationTypes,m as RequiredOptionalFields,x as Summary,v as UserTriggeredValidation,Rt as __namedExportsOrder,Ht as default};
//# sourceMappingURL=Patterns.stories-T2twbpgG.js.map
