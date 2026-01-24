import{j as r}from"./jsx-runtime-BYYWji4R.js";import{u as o}from"./index-bjNF47ar.js";import{C as t}from"./index-D1XdeRjR.js";import{H as e}from"./heading-mzc2R_Ff.js";import{P as g}from"./paragraph-DDCpJsVw.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";const as={title:"Fundamentals/Best Practices",parameters:{docs:{description:{component:`
# Best Practices

Guidelines for building maintainable, scalable applications with the platform.

## Core Principles
- **Design Tokens First**: Always use tokens, never hardcode
- **Component Composition**: Build with platform components
- **Accessibility**: WCAG 2.1 AA compliance
- **i18n**: All text must be translatable
- **SDK-First**: Never bypass the SDK

## Architecture
- Thin app architecture
- Feature flags for domain logic
- Multi-tenancy support
- RBAC enforcement
        `}}},tags:["autodocs"]},n={render:function(){const s=o();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.dont")," ",s("storybook.bestPractices.hardcodedValues")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: '24px',
  color: '#333',
  fontSize: '16px'
}}>
  Content
</div>`})]}),r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.do")," ",s("storybook.bestPractices.designTokens")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: 'var(--ds-spacing-6)',
  color: 'var(--ds-color-neutral-text-default)',
  fontSize: 'var(--ds-font-size-md)'
}}>
  Content
</div>`})]})]})}},d={render:function(){const s=o();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.dont")," ",s("storybook.bestPractices.customImplementation")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div className="custom-button">
  Click me
</div>

// Custom CSS
.custom-button {
  padding: 12px 24px;
  background: blue;
}`})]}),r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.do")," ",s("storybook.bestPractices.platformComponents")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`import { Button } from '../../index';

<Button data-variant="primary">
  Click me
</Button>`})]})]})}},i={render:function(){const s=o();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.dont")," ",s("storybook.bestPractices.hardcodedText")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<Button>
  Save Changes
</Button>

<p>Welcome to the app</p>`})]}),r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.do")," ",s("storybook.bestPractices.translatedText")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`const { t } = useTranslation();

<Button>
  {t('common.saveChanges')}
</Button>

<p>{t('welcome.message')}</p>`})]})]})}},c={render:function(){const s=o();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.dont")," ",s("storybook.bestPractices.directApiCalls")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`const response = await fetch(
  '/api/users',
  {
    method: 'GET',
    headers: { ... }
  }
);`})]}),r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.do")," ",s("storybook.bestPractices.sdkMethods")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`import { sdk } from '@xala-technologies/platform/sdk';

const users = await sdk.users.list();`})]})]})}},l={render:function(){const s=o();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.dont")," ",s("storybook.bestPractices.noErrorHandling")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`const data = await sdk.users.list();
setUsers(data);`})]}),r.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[r.jsxs(e,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:[s("storybook.bestPractices.do")," ",s("storybook.bestPractices.properErrorHandling")]}),r.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`try {
  const data = await sdk.users.list();
  setUsers(data);
} catch (error) {
  console.error(error);
  showError(t('errors.loadFailed'));
}`})]})]})}},p={render:function(){const s=o(),_=[{title:s("storybook.bestPractices.designTokens"),dos:[s("storybook.bestPractices.useTokens"),s("storybook.bestPractices.consistentSpacing"),s("storybook.bestPractices.themeAwareStyling")],donts:[s("storybook.bestPractices.hardcodedPixels"),s("storybook.bestPractices.hexColors"),s("storybook.bestPractices.magicNumbers")]},{title:s("storybook.bestPractices.components"),dos:[s("storybook.bestPractices.usePlatformComponents"),s("storybook.bestPractices.composePatterns"),s("storybook.bestPractices.followDesignsystemet")],donts:[s("storybook.bestPractices.customImplementations"),s("storybook.bestPractices.inlineStyles"),s("storybook.bestPractices.rawHtmlElements")]},{title:s("storybook.a11y.title"),dos:[s("storybook.a11y.keyboardNavigation"),s("storybook.a11y.ariaLabels"),s("storybook.a11y.colorContrast")],donts:[s("storybook.bestPractices.mouseOnlyInteractions"),s("storybook.bestPractices.missingLabels"),s("storybook.bestPractices.poorContrast")]},{title:s("storybook.bestPractices.internationalization"),dos:[s("storybook.bestPractices.useTFunction"),s("storybook.bestPractices.supportRtl"),s("storybook.bestPractices.formatDatesNumbers")],donts:[s("storybook.bestPractices.hardcodedStrings"),s("storybook.bestPractices.englishOnly"),s("storybook.bestPractices.localeAssumptions")]}];return r.jsxs(t,{style:{padding:"var(--ds-spacing-8)",maxWidth:"800px"},children:[r.jsx(e,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:s("storybook.bestPractices.summary")}),r.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:_.map(({title:v,dos:q,donts:J})=>r.jsxs("div",{style:{padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-lg)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[r.jsx(e,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:v}),r.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[r.jsxs(g,{"data-size":"sm",style:{fontWeight:600,marginBottom:"var(--ds-spacing-2)",color:"var(--ds-color-success-text-default)"},children:[s("storybook.bestPractices.do"),":"]}),q.map((m,u)=>r.jsx(g,{"data-size":"sm",style:{marginLeft:"var(--ds-spacing-4)",marginBottom:"var(--ds-spacing-1)"},children:m},u))]}),r.jsxs("div",{children:[r.jsxs(g,{"data-size":"sm",style:{fontWeight:600,marginBottom:"var(--ds-spacing-2)",color:"var(--ds-color-danger-text-default)"},children:[s("storybook.bestPractices.dont"),":"]}),J.map((m,u)=>r.jsx(g,{"data-size":"sm",style:{marginLeft:"var(--ds-spacing-4)",marginBottom:"var(--ds-spacing-1)"},children:m},u))]})]},v))})]})}};var b,y,f,x,k;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.hardcodedValues')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div style={{
  padding: '24px',
  color: '#333',
  fontSize: '16px'
}}>
  Content
</div>\`}
          </pre>
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
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.designTokens')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div style={{
  padding: 'var(--ds-spacing-6)',
  color: 'var(--ds-color-neutral-text-default)',
  fontSize: 'var(--ds-font-size-md)'
}}>
  Content
</div>\`}
          </pre>
        </Card>
      </div>;
  }
}`,...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source},description:{story:"Best Practice 1: Design Tokens",...(k=(x=n.parameters)==null?void 0:x.docs)==null?void 0:k.description}}};var h,P,C,z,B;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.customImplementation')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div className="custom-button">
  Click me
</div>

// Custom CSS
.custom-button {
  padding: 12px 24px;
  background: blue;
}\`}
          </pre>
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
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.platformComponents')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`import { Button } from '../../index';

<Button data-variant="primary">
  Click me
</Button>\`}
          </pre>
        </Card>
      </div>;
  }
}`,...(C=(P=d.parameters)==null?void 0:P.docs)==null?void 0:C.source},description:{story:"Best Practice 2: Component Composition",...(B=(z=d.parameters)==null?void 0:z.docs)==null?void 0:B.description}}};var w,S,j,W,R;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.hardcodedText')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<Button>
  Save Changes
</Button>

<p>Welcome to the app</p>\`}
          </pre>
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
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.translatedText')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`const { t } = useTranslation();

<Button>
  {t('common.saveChanges')}
</Button>

<p>{t('welcome.message')}</p>\`}
          </pre>
        </Card>
      </div>;
  }
}`,...(j=(S=i.parameters)==null?void 0:S.docs)==null?void 0:j.source},description:{story:"Best Practice 3: i18n",...(R=(W=i.parameters)==null?void 0:W.docs)==null?void 0:R.description}}};var H,T,E,A,D;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.directApiCalls')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`const response = await fetch(
  '/api/users',
  {
    method: 'GET',
    headers: { ... }
  }
);\`}
          </pre>
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
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.sdkMethods')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`import { sdk } from '@xala-technologies/platform/sdk';

const users = await sdk.users.list();\`}
          </pre>
        </Card>
      </div>;
  }
}`,...(E=(T=c.parameters)==null?void 0:T.docs)==null?void 0:E.source},description:{story:"Best Practice 4: SDK-First",...(D=(A=c.parameters)==null?void 0:A.docs)==null?void 0:D.description}}};var F,N,I,L,K;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.noErrorHandling')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`const data = await sdk.users.list();
setUsers(data);\`}
          </pre>
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
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.properErrorHandling')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`try {
  const data = await sdk.users.list();
  setUsers(data);
} catch (error) {
  console.error(error);
  showError(t('errors.loadFailed'));
}\`}
          </pre>
        </Card>
      </div>;
  }
}`,...(I=(N=l.parameters)==null?void 0:N.docs)==null?void 0:I.source},description:{story:"Best Practice 5: Error Handling",...(K=(L=l.parameters)==null?void 0:L.docs)==null?void 0:K.description}}};var O,G,U,M,V;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const practices = [{
      title: t('storybook.bestPractices.designTokens'),
      dos: [t('storybook.bestPractices.useTokens'), t('storybook.bestPractices.consistentSpacing'), t('storybook.bestPractices.themeAwareStyling')],
      donts: [t('storybook.bestPractices.hardcodedPixels'), t('storybook.bestPractices.hexColors'), t('storybook.bestPractices.magicNumbers')]
    }, {
      title: t('storybook.bestPractices.components'),
      dos: [t('storybook.bestPractices.usePlatformComponents'), t('storybook.bestPractices.composePatterns'), t('storybook.bestPractices.followDesignsystemet')],
      donts: [t('storybook.bestPractices.customImplementations'), t('storybook.bestPractices.inlineStyles'), t('storybook.bestPractices.rawHtmlElements')]
    }, {
      title: t('storybook.a11y.title'),
      dos: [t('storybook.a11y.keyboardNavigation'), t('storybook.a11y.ariaLabels'), t('storybook.a11y.colorContrast')],
      donts: [t('storybook.bestPractices.mouseOnlyInteractions'), t('storybook.bestPractices.missingLabels'), t('storybook.bestPractices.poorContrast')]
    }, {
      title: t('storybook.bestPractices.internationalization'),
      dos: [t('storybook.bestPractices.useTFunction'), t('storybook.bestPractices.supportRtl'), t('storybook.bestPractices.formatDatesNumbers')],
      donts: [t('storybook.bestPractices.hardcodedStrings'), t('storybook.bestPractices.englishOnly'), t('storybook.bestPractices.localeAssumptions')]
    }];
    return <Card style={{
      padding: 'var(--ds-spacing-8)',
      maxWidth: '800px'
    }}>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.bestPractices.summary')}
        </Heading>

        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-6)'
      }}>
          {practices.map(({
          title,
          dos,
          donts
        }) => <div key={title} style={{
          padding: 'var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          border: '1px solid var(--ds-color-neutral-border-default)'
        }}>
              <Heading level={3} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-4)'
          }}>
                {title}
              </Heading>

              <div style={{
            marginBottom: 'var(--ds-spacing-4)'
          }}>
                <Paragraph data-size="sm" style={{
              fontWeight: 600,
              marginBottom: 'var(--ds-spacing-2)',
              color: 'var(--ds-color-success-text-default)'
            }}>
                  {t('storybook.bestPractices.do')}:
                </Paragraph>
                {dos.map((item, i) => <Paragraph key={i} data-size="sm" style={{
              marginLeft: 'var(--ds-spacing-4)',
              marginBottom: 'var(--ds-spacing-1)'
            }}>
                    {item}
                  </Paragraph>)}
              </div>

              <div>
                <Paragraph data-size="sm" style={{
              fontWeight: 600,
              marginBottom: 'var(--ds-spacing-2)',
              color: 'var(--ds-color-danger-text-default)'
            }}>
                  {t('storybook.bestPractices.dont')}:
                </Paragraph>
                {donts.map((item, i) => <Paragraph key={i} data-size="sm" style={{
              marginLeft: 'var(--ds-spacing-4)',
              marginBottom: 'var(--ds-spacing-1)'
            }}>
                    {item}
                  </Paragraph>)}
              </div>
            </div>)}
        </div>
      </Card>;
  }
}`,...(U=(G=p.parameters)==null?void 0:G.docs)==null?void 0:U.source},description:{story:"Best Practices Summary",...(V=(M=p.parameters)==null?void 0:M.docs)==null?void 0:V.description}}};const ns=["DesignTokens","ComponentComposition","Internationalization","SDKFirst","ErrorHandling","Summary"];export{d as ComponentComposition,n as DesignTokens,l as ErrorHandling,i as Internationalization,c as SDKFirst,p as Summary,ns as __namedExportsOrder,as as default};
//# sourceMappingURL=BestPractices.stories-VqPi6MBO.js.map
