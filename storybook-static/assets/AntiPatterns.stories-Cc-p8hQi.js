import{j as r}from"./jsx-runtime-BYYWji4R.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";const M={title:"Examples/Anti-Patterns",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},a={render:()=>r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"❌ Wrong"}),r.jsx("div",{style:{padding:"16px",backgroundColor:"#0066CC",color:"#FFFFFF",borderRadius:"8px"},children:"Hardcoded hex colors"}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  backgroundColor: '#0066CC',
  color: '#FFFFFF'
}}>
  Content
</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"✅ Correct"}),r.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",borderRadius:"var(--ds-border-radius-md)"},children:"Design token colors"}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  backgroundColor: 'var(--ds-color-accent-base-default)',
  color: 'var(--ds-color-accent-contrast-default)'
}}>
  Content
</div>`})]})]})},o={render:()=>r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"❌ Wrong"}),r.jsx("div",{style:{padding:"24px",margin:"16px 0",gap:"12px",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:"Hardcoded pixel values"}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: '24px',
  margin: '16px 0',
  gap: '12px'
}}>
  Content
</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"✅ Correct"}),r.jsx("div",{style:{padding:"var(--ds-spacing-6)",margin:"var(--ds-spacing-4) 0",gap:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:"Design token spacing"}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: 'var(--ds-spacing-6)',
  margin: 'var(--ds-spacing-4) 0',
  gap: 'var(--ds-spacing-3)'
}}>
  Content
</div>`})]})]})},e={render:()=>r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"❌ Wrong"}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsx("input",{type:"text",placeholder:"Enter name"}),r.jsx("div",{onClick:()=>alert("clicked"),style:{cursor:"pointer",marginTop:"var(--ds-spacing-2)"},children:"Click me"})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// No label, no ARIA
<input type="text" placeholder="Enter name" />

// div as button, not keyboard accessible
<div onClick={handleClick}>Click me</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"✅ Correct"}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsxs("label",{htmlFor:"name-input",children:["Name",r.jsx("input",{id:"name-input",type:"text","aria-label":"Enter your name",style:{display:"block",marginTop:"var(--ds-spacing-1)"}})]}),r.jsx("button",{type:"button",onClick:()=>alert("clicked"),style:{marginTop:"var(--ds-spacing-2)"},children:"Click me"})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Proper label association
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
</button>`})]})]})},n={render:()=>r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"❌ Wrong"}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsx("h3",{children:"Welcome"}),r.jsx("p",{children:"Click the button below to continue"}),r.jsx("button",{type:"button",children:"Continue"})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Hardcoded English text
<h3>Welcome</h3>
<p>Click the button below to continue</p>
<button>Continue</button>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"✅ Correct"}),r.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[r.jsx("h3",{children:"Welcome (from t())"}),r.jsx("p",{children:"Click the button below to continue (from t())"}),r.jsx("button",{type:"button",children:"Continue (from t())"})]}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Using i18n translation function
const { t } = useTranslation();

<h3>{t('welcome.title')}</h3>
<p>{t('welcome.description')}</p>
<button>{t('common.continue')}</button>`})]})]})},s={render:()=>r.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"❌ Wrong"}),r.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:r.jsx("div",{style:{padding:"12px 24px",backgroundColor:"#0066CC",color:"white",borderRadius:"4px",cursor:"pointer",display:"inline-block"},children:"Custom Button"})}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Custom button implementation
<div style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
}}>
  Custom Button
</div>`})]}),r.jsxs("div",{style:{flex:1,minWidth:"300px"},children:[r.jsx("h4",{style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-3)"},children:"✅ Correct"}),r.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:r.jsx("button",{className:"ds-button","data-variant":"primary","data-size":"md",type:"button",children:"Platform Button"})}),r.jsx("pre",{style:{marginTop:"var(--ds-spacing-2)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`// Using platform Button component
import { Button } from '../../index';

<Button data-variant="primary" data-size="md">
  Platform Button
</Button>`})]})]})},d={render:()=>r.jsxs("div",{style:{padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-lg)",borderLeft:"4px solid var(--ds-color-info-border-default)"},children:[r.jsx("h3",{style:{color:"var(--ds-color-info-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"Anti-Pattern Checklist"}),r.jsxs("div",{style:{color:"var(--ds-color-info-text-default)"},children:[r.jsx("p",{style:{marginBottom:"var(--ds-spacing-3)"},children:r.jsx("strong",{children:"Always avoid:"})}),r.jsxs("ul",{style:{marginLeft:"var(--ds-spacing-6)",marginBottom:"var(--ds-spacing-4)"},children:[r.jsx("li",{children:"❌ Hardcoded colors (hex, rgb, hsl)"}),r.jsx("li",{children:"❌ Hardcoded spacing (px values)"}),r.jsx("li",{children:"❌ Missing accessibility (labels, ARIA, keyboard)"}),r.jsx("li",{children:"❌ Hardcoded text (use i18n)"}),r.jsx("li",{children:"❌ Custom components (use platform)"}),r.jsx("li",{children:"❌ Direct fetch/axios (use SDK)"}),r.jsx("li",{children:"❌ Domain logic in platform apps"}),r.jsx("li",{children:"❌ Inline styles without tokens"})]}),r.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:r.jsx("strong",{children:"Always use:"})}),r.jsxs("ul",{style:{marginLeft:"var(--ds-spacing-6)"},children:[r.jsx("li",{children:"✅ Design tokens for all values"}),r.jsx("li",{children:"✅ Platform UI components"}),r.jsx("li",{children:"✅ Proper accessibility attributes"}),r.jsx("li",{children:"✅ i18n for all user-facing text"}),r.jsx("li",{children:"✅ SDK for all API calls"}),r.jsx("li",{children:"✅ Semantic HTML elements"}),r.jsx("li",{children:"✅ Feature flags for domain logic"})]})]})]})};var t,i,l,c,p;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Wrong
        </h4>
        <div style={{
        padding: '16px',
        backgroundColor: '#0066CC',
        color: '#FFFFFF',
        borderRadius: '8px'
      }}>
          Hardcoded hex colors
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
          ✅ Correct
        </h4>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-accent-base-default)',
        color: 'var(--ds-color-accent-contrast-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          Design token colors
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
    </div>
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source},description:{story:"Anti-Pattern 1: Hardcoded Colors",...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.description}}};var u,v,g,m,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Wrong
        </h4>
        <div style={{
        padding: '24px',
        margin: '16px 0',
        gap: '12px',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          Hardcoded pixel values
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
          ✅ Correct
        </h4>
        <div style={{
        padding: 'var(--ds-spacing-6)',
        margin: 'var(--ds-spacing-4) 0',
        gap: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          Design token spacing
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
    </div>
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source},description:{story:"Anti-Pattern 2: Hardcoded Spacing",...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.description}}};var b,f,h,y,C;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Wrong
        </h4>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <input type="text" placeholder="Enter name" />
          <div onClick={() => alert('clicked')} style={{
          cursor: 'pointer',
          marginTop: 'var(--ds-spacing-2)'
        }}>
            Click me
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
          ✅ Correct
        </h4>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <label htmlFor="name-input">
            Name
            <input id="name-input" type="text" aria-label="Enter your name" style={{
            display: 'block',
            marginTop: 'var(--ds-spacing-1)'
          }} />
          </label>
          <button type="button" onClick={() => alert('clicked')} style={{
          marginTop: 'var(--ds-spacing-2)'
        }}>
            Click me
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
    </div>
}`,...(h=(f=e.parameters)==null?void 0:f.docs)==null?void 0:h.source},description:{story:"Anti-Pattern 3: Missing Accessibility",...(C=(y=e.parameters)==null?void 0:y.docs)==null?void 0:C.description}}};var k,j,w,R,B;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Wrong
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
          ✅ Correct
        </h4>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <h3>Welcome (from t())</h3>
          <p>Click the button below to continue (from t())</p>
          <button type="button">Continue (from t())</button>
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
    </div>
}`,...(w=(j=n.parameters)==null?void 0:j.docs)==null?void 0:w.source},description:{story:"Anti-Pattern 4: Hardcoded Text (No i18n)",...(B=(R=n.parameters)==null?void 0:R.docs)==null?void 0:B.description}}};var W,z,S,T,A;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Wrong
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
            Custom Button
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
          ✅ Correct
        </h4>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <button className="ds-button" data-variant="primary" data-size="md" type="button">
            Platform Button
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
    </div>
}`,...(S=(z=s.parameters)==null?void 0:z.docs)==null?void 0:S.source},description:{story:"Anti-Pattern 5: Custom Components Instead of Platform",...(A=(T=s.parameters)==null?void 0:T.docs)==null?void 0:A.description}}};var F,H,E,P,D;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 'var(--ds-spacing-6)',
    backgroundColor: 'var(--ds-color-info-surface-default)',
    borderRadius: 'var(--ds-border-radius-lg)',
    borderLeft: '4px solid var(--ds-color-info-border-default)'
  }}>
      <h3 style={{
      color: 'var(--ds-color-info-text-default)',
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Anti-Pattern Checklist
      </h3>
      <div style={{
      color: 'var(--ds-color-info-text-default)'
    }}>
        <p style={{
        marginBottom: 'var(--ds-spacing-3)'
      }}>
          <strong>Always avoid:</strong>
        </p>
        <ul style={{
        marginLeft: 'var(--ds-spacing-6)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          <li>❌ Hardcoded colors (hex, rgb, hsl)</li>
          <li>❌ Hardcoded spacing (px values)</li>
          <li>❌ Missing accessibility (labels, ARIA, keyboard)</li>
          <li>❌ Hardcoded text (use i18n)</li>
          <li>❌ Custom components (use platform)</li>
          <li>❌ Direct fetch/axios (use SDK)</li>
          <li>❌ Domain logic in platform apps</li>
          <li>❌ Inline styles without tokens</li>
        </ul>
        <p style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>
          <strong>Always use:</strong>
        </p>
        <ul style={{
        marginLeft: 'var(--ds-spacing-6)'
      }}>
          <li>✅ Design tokens for all values</li>
          <li>✅ Platform UI components</li>
          <li>✅ Proper accessibility attributes</li>
          <li>✅ i18n for all user-facing text</li>
          <li>✅ SDK for all API calls</li>
          <li>✅ Semantic HTML elements</li>
          <li>✅ Feature flags for domain logic</li>
        </ul>
      </div>
    </div>
}`,...(E=(H=d.parameters)==null?void 0:H.docs)==null?void 0:E.source},description:{story:"Anti-Pattern Summary",...(D=(P=d.parameters)==null?void 0:P.docs)==null?void 0:D.description}}};const U=["HardcodedColors","HardcodedSpacing","MissingAccessibility","HardcodedText","CustomComponents","Summary"];export{s as CustomComponents,a as HardcodedColors,o as HardcodedSpacing,n as HardcodedText,e as MissingAccessibility,d as Summary,U as __namedExportsOrder,M as default};
//# sourceMappingURL=AntiPatterns.stories-Cc-p8hQi.js.map
