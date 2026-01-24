import{j as r}from"./jsx-runtime-BYYWji4R.js";import{u as n}from"./index-bjNF47ar.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";const Y={title:"Examples/Anti-Patterns",parameters:{docs:{description:{component:`
# Anti-Patterns - What NOT to Do

Learn from common mistakes. Each example shows the **wrong way** and the **correct way**.

## Categories
- **Hardcoded Values**: Using pixels/hex instead of tokens
- **Inline Styles**: Custom styles instead of components
- **Accessibility**: Missing ARIA, labels, keyboard support
- **Architecture**: Domain logic in platform, SDK bypass
- **i18n**: Hardcoded text instead of translations

## For AI Agents
Use these examples to:
- Detect anti-patterns in code
- Suggest corrections
- Validate against best practices
- Learn what to avoid
        `}}},tags:["autodocs"]},t={render:function(){const o=n();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.dont")}),r.jsx("div",{style:{padding:"16px",backgroundColor:"#0066CC",color:"#FFFFFF",borderRadius:"8px"},children:o("storybook.antiPatterns.hardcodedHexColors")}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  backgroundColor: '#0066CC',
  color: '#FFFFFF'
}}>
  Content
</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.do")}),r.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",borderRadius:"var(--ds-border-radius-md)"},children:o("storybook.antiPatterns.designTokenColors")}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  backgroundColor: 'var(--ds-color-accent-base-default)',
  color: 'var(--ds-color-accent-contrast-default)'
}}>
  Content
</div>`})]})]})}},s={render:function(){const o=n();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.dont")}),r.jsx("div",{style:{padding:"24px",margin:"16px 0",gap:"12px",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:o("storybook.antiPatterns.hardcodedPixelValues")}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: '24px',
  margin: '16px 0',
  gap: '12px'
}}>
  Content
</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.do")}),r.jsx("div",{style:{padding:"var(--ds-spacing-6)",margin:"var(--ds-spacing-4) 0",gap:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:o("storybook.antiPatterns.designTokenSpacing")}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: 'var(--ds-spacing-6)',
  margin: 'var(--ds-spacing-4) 0',
  gap: 'var(--ds-spacing-3)'
}}>
  Content
</div>`})]})]})}},e={render:function(){const o=n();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.dont")}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsx("input",{type:"text",placeholder:o("storybook.antiPatterns.enterName")}),r.jsx("div",{onClick:()=>alert("clicked"),style:{cursor:"pointer",marginTop:"var(--ds-spacing-2)"},children:o("storybook.antiPatterns.clickMe")})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// No label, no ARIA
<input type="text" placeholder="Enter name" />

// div as button, not keyboard accessible
<div onClick={handleClick}>Click me</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.do")}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsxs("label",{htmlFor:"name-input",children:[o("platform.common.name"),r.jsx("input",{id:"name-input",type:"text","aria-label":o("storybook.antiPatterns.enterYourName"),style:{display:"block",marginTop:"var(--ds-spacing-1)"}})]}),r.jsx("button",{type:"button",onClick:()=>alert("clicked"),style:{marginTop:"var(--ds-spacing-2)"},children:o("storybook.antiPatterns.clickMe")})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Proper label association
<label htmlFor="name-input">
  Name
  <input
    id="name-input"
    type="text"
    aria-label="Enter your name"
  />
</label>

// Semantic button element
<button type="button" onClick={handleClick}>
  Click me
</button>`})]})]})}},d={render:function(){const o=n();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.dont")}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsx("h3",{children:"Welcome"}),r.jsx("p",{children:"Click the button below to continue"}),r.jsx("button",{type:"button",children:"Continue"})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Hardcoded English text
<h3>Welcome</h3>
<p>Click the button below to continue</p>
<button>Continue</button>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.do")}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsxs("h3",{children:[o("storybook.demo.welcome")," (from t())"]}),r.jsxs("p",{children:[o("storybook.demo.clickToContinue")," (from t())"]}),r.jsxs("button",{type:"button",children:[o("platform.common.continue")," (from t())"]})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Using i18n translation function
const { t } = useTranslation();

<h3>{t('welcome.title')}</h3>
<p>{t('welcome.description')}</p>
<button>{t('common.continue')}</button>`})]})]})}},i={render:function(){const o=n();return r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.dont")}),r.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:r.jsx("div",{style:{padding:"12px 24px",backgroundColor:"#0066CC",color:"white",borderRadius:"4px",cursor:"pointer",display:"inline-block"},children:o("storybook.antiPatterns.customButton")})}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Custom button implementation
<div style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
}}>
  Custom Button
</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:o("storybook.bestPractices.do")}),r.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:r.jsx("button",{className:"ds-button","data-variant":"primary","data-size":"md",type:"button",children:o("storybook.antiPatterns.platformButton")})}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Using platform Button component
import { Button } from '../../index';

<Button data-variant="primary" data-size="md">
  Platform Button
</Button>`})]})]})}},l={render:function(){const o=n();return r.jsxs("div",{style:{padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-lg)",borderLeft:"4px solid var(--ds-color-info-border-default)"},children:[r.jsx("h3",{style:{color:"var(--ds-color-info-text-default)",marginBottom:"var(--ds-spacing-4)"},children:o("storybook.antiPatterns.checklist")}),r.jsxs("div",{style:{color:"var(--ds-color-info-text-default)"},children:[r.jsx("p",{style:{marginBottom:"var(--ds-spacing-3)"},children:r.jsxs("strong",{children:[o("storybook.antiPatterns.alwaysAvoid"),":"]})}),r.jsxs("ul",{style:{marginLeft:"var(--ds-spacing-6)",marginBottom:"var(--ds-spacing-4)"},children:[r.jsx("li",{children:o("storybook.antiPatterns.avoidHardcodedColors")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidHardcodedSpacing")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidMissingA11y")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidHardcodedText")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidCustomComponents")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidDirectFetch")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidDomainLogic")}),r.jsx("li",{children:o("storybook.antiPatterns.avoidInlineStyles")})]}),r.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:r.jsxs("strong",{children:[o("storybook.antiPatterns.alwaysUse"),":"]})}),r.jsxs("ul",{style:{marginLeft:"var(--ds-spacing-6)"},children:[r.jsx("li",{children:o("storybook.antiPatterns.useDesignTokens")}),r.jsx("li",{children:o("storybook.antiPatterns.usePlatformUI")}),r.jsx("li",{children:o("storybook.antiPatterns.useA11yAttributes")}),r.jsx("li",{children:o("storybook.antiPatterns.useI18n")}),r.jsx("li",{children:o("storybook.antiPatterns.useSdk")}),r.jsx("li",{children:o("storybook.antiPatterns.useSemanticHtml")}),r.jsx("li",{children:o("storybook.antiPatterns.useFeatureFlags")})]})]})]})}};var c,u,p,v,g;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.dont')}
          </h4>
          <div style={{
          padding: '16px',
          backgroundColor: '#0066CC',
          color: '#FFFFFF',
          borderRadius: '8px'
        }}>
            {t('storybook.antiPatterns.hardcodedHexColors')}
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div style={{
  backgroundColor: '#0066CC',
  color: '#FFFFFF'
}}>
  Content
</div>\`}
          </pre>
        </div>

        {/* Good Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.do')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-accent-base-default)',
          color: 'var(--ds-color-accent-contrast-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            {t('storybook.antiPatterns.designTokenColors')}
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div style={{
  backgroundColor: 'var(--ds-color-accent-base-default)',
  color: 'var(--ds-color-accent-contrast-default)'
}}>
  Content
</div>\`}
          </pre>
        </div>
      </div>;
  }
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source},description:{story:"Anti-Pattern 1: Hardcoded Colors",...(g=(v=t.parameters)==null?void 0:v.docs)==null?void 0:g.description}}};var b,m,x,y,f;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.dont')}
          </h4>
          <div style={{
          padding: '24px',
          margin: '16px 0',
          gap: '12px',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            {t('storybook.antiPatterns.hardcodedPixelValues')}
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div style={{
  padding: '24px',
  margin: '16px 0',
  gap: '12px'
}}>
  Content
</div>\`}
          </pre>
        </div>

        {/* Good Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.do')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-6)',
          margin: 'var(--ds-spacing-4) 0',
          gap: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            {t('storybook.antiPatterns.designTokenSpacing')}
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`<div style={{
  padding: 'var(--ds-spacing-6)',
  margin: 'var(--ds-spacing-4) 0',
  gap: 'var(--ds-spacing-3)'
}}>
  Content
</div>\`}
          </pre>
        </div>
      </div>;
  }
}`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source},description:{story:"Anti-Pattern 2: Hardcoded Spacing",...(f=(y=s.parameters)==null?void 0:y.docs)==null?void 0:f.description}}};var h,k,C,P,j;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.dont')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <input type="text" placeholder={t('storybook.antiPatterns.enterName')} />
            <div onClick={() => alert('clicked')} style={{
            cursor: 'pointer',
            marginTop: 'var(--ds-spacing-2)'
          }}>
              {t('storybook.antiPatterns.clickMe')}
            </div>
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`// No label, no ARIA
<input type="text" placeholder="Enter name" />

// div as button, not keyboard accessible
<div onClick={handleClick}>Click me</div>\`}
          </pre>
        </div>

        {/* Good Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.do')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <label htmlFor="name-input">
              {t('platform.common.name')}
              <input id="name-input" type="text" aria-label={t('storybook.antiPatterns.enterYourName')} style={{
              display: 'block',
              marginTop: 'var(--ds-spacing-1)'
            }} />
            </label>
            <button type="button" onClick={() => alert('clicked')} style={{
            marginTop: 'var(--ds-spacing-2)'
          }}>
              {t('storybook.antiPatterns.clickMe')}
            </button>
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`// Proper label association
<label htmlFor="name-input">
  Name
  <input
    id="name-input"
    type="text"
    aria-label="Enter your name"
  />
</label>

// Semantic button element
<button type="button" onClick={handleClick}>
  Click me
</button>\`}
          </pre>
        </div>
      </div>;
  }
}`,...(C=(k=e.parameters)==null?void 0:k.docs)==null?void 0:C.source},description:{story:"Anti-Pattern 3: Missing Accessibility",...(j=(P=e.parameters)==null?void 0:P.docs)==null?void 0:j.description}}};var R,w,B,T,S;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.dont')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <h3>Welcome</h3>
            <p>Click the button below to continue</p>
            <button type="button">Continue</button>
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`// Hardcoded English text
<h3>Welcome</h3>
<p>Click the button below to continue</p>
<button>Continue</button>\`}
          </pre>
        </div>

        {/* Good Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.do')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <h3>{t('storybook.demo.welcome')} (from t())</h3>
            <p>{t('storybook.demo.clickToContinue')} (from t())</p>
            <button type="button">{t('platform.common.continue')} (from t())</button>
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`// Using i18n translation function
const { t } = useTranslation();

<h3>{t('welcome.title')}</h3>
<p>{t('welcome.description')}</p>
<button>{t('common.continue')}</button>\`}
          </pre>
        </div>
      </div>;
  }
}`,...(B=(w=d.parameters)==null?void 0:w.docs)==null?void 0:B.source},description:{story:"Anti-Pattern 4: Hardcoded Text (No i18n)",...(S=(T=d.parameters)==null?void 0:T.docs)==null?void 0:S.description}}};var z,F,W,A,H;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-6)',
      flexWrap: 'wrap'
    }}>
        {/* Bad Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.dont')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <div style={{
            padding: '12px 24px',
            backgroundColor: '#0066CC',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'inline-block'
          }}>
              {t('storybook.antiPatterns.customButton')}
            </div>
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`// Custom button implementation
<div style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
}}>
  Custom Button
</div>\`}
          </pre>
        </div>

        {/* Good Example */}
        <div style={{
        flex: 1,
        minWidth: '300px'
      }}>
          <h4 style={{
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {t('storybook.bestPractices.do')}
          </h4>
          <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          border: '1px solid var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <button className="ds-button" data-variant="primary" data-size="md" type="button">
              {t('storybook.antiPatterns.platformButton')}
            </button>
          </div>
          <pre style={{
          marginTop: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto'
        }}>
            {\`// Using platform Button component
import { Button } from '../../index';

<Button data-variant="primary" data-size="md">
  Platform Button
</Button>\`}
          </pre>
        </div>
      </div>;
  }
}`,...(W=(F=i.parameters)==null?void 0:F.docs)==null?void 0:W.source},description:{story:"Anti-Pattern 5: Custom Components Instead of Platform",...(H=(A=i.parameters)==null?void 0:A.docs)==null?void 0:H.description}}};var E,I,N,D,L;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      padding: 'var(--ds-spacing-6)',
      backgroundColor: 'var(--ds-color-info-surface-default)',
      borderRadius: 'var(--ds-border-radius-lg)',
      borderLeft: '4px solid var(--ds-color-info-border-default)'
    }}>
        <h3 style={{
        color: 'var(--ds-color-info-text-default)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.antiPatterns.checklist')}
        </h3>
        <div style={{
        color: 'var(--ds-color-info-text-default)'
      }}>
          <p style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            <strong>{t('storybook.antiPatterns.alwaysAvoid')}:</strong>
          </p>
          <ul style={{
          marginLeft: 'var(--ds-spacing-6)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <li>{t('storybook.antiPatterns.avoidHardcodedColors')}</li>
            <li>{t('storybook.antiPatterns.avoidHardcodedSpacing')}</li>
            <li>{t('storybook.antiPatterns.avoidMissingA11y')}</li>
            <li>{t('storybook.antiPatterns.avoidHardcodedText')}</li>
            <li>{t('storybook.antiPatterns.avoidCustomComponents')}</li>
            <li>{t('storybook.antiPatterns.avoidDirectFetch')}</li>
            <li>{t('storybook.antiPatterns.avoidDomainLogic')}</li>
            <li>{t('storybook.antiPatterns.avoidInlineStyles')}</li>
          </ul>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            <strong>{t('storybook.antiPatterns.alwaysUse')}:</strong>
          </p>
          <ul style={{
          marginLeft: 'var(--ds-spacing-6)'
        }}>
            <li>{t('storybook.antiPatterns.useDesignTokens')}</li>
            <li>{t('storybook.antiPatterns.usePlatformUI')}</li>
            <li>{t('storybook.antiPatterns.useA11yAttributes')}</li>
            <li>{t('storybook.antiPatterns.useI18n')}</li>
            <li>{t('storybook.antiPatterns.useSdk')}</li>
            <li>{t('storybook.antiPatterns.useSemanticHtml')}</li>
            <li>{t('storybook.antiPatterns.useFeatureFlags')}</li>
          </ul>
        </div>
      </div>;
  }
}`,...(N=(I=l.parameters)==null?void 0:I.docs)==null?void 0:N.source},description:{story:"Anti-Pattern Summary",...(L=(D=l.parameters)==null?void 0:D.docs)==null?void 0:L.description}}};const _=["HardcodedColors","HardcodedSpacing","MissingAccessibility","HardcodedText","CustomComponents","Summary"];export{i as CustomComponents,t as HardcodedColors,s as HardcodedSpacing,d as HardcodedText,e as MissingAccessibility,l as Summary,_ as __namedExportsOrder,Y as default};
//# sourceMappingURL=AntiPatterns.stories-DbnFPydp.js.map
