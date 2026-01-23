import{j as s}from"./jsx-runtime-BYYWji4R.js";import{C as a}from"./index-D1XdeRjR.js";import{H as r}from"./heading-mzc2R_Ff.js";import{P as l}from"./paragraph-DDCpJsVw.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";const $={title:"Fundamentals/Best Practices",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},e={render:()=>s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Hardcoded Values"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: '24px',
  color: '#333',
  fontSize: '16px'
}}>
  Content
</div>`})]}),s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Design Tokens"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div style={{
  padding: 'var(--ds-spacing-6)',
  color: 'var(--ds-color-neutral-text-default)',
  fontSize: 'var(--ds-font-size-md)'
}}>
  Content
</div>`})]})]})},n={render:()=>s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Custom Implementation"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<div className="custom-button">
  Click me
</div>

// Custom CSS
.custom-button {
  padding: 12px 24px;
  background: blue;
}`})]}),s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Platform Components"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`import { Button } from '../../index';

<Button data-variant="primary">
  Click me
</Button>`})]})]})},o={render:()=>s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Hardcoded Text"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<Button>
  Save Changes
</Button>

<p>Welcome to the app</p>`})]}),s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Translated Text"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`const { t } = useTranslation();

<Button>
  {t('common.saveChanges')}
</Button>

<p>{t('welcome.message')}</p>`})]})]})},d={render:()=>s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Direct API Calls"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`const response = await fetch(
  '/api/users',
  {
    method: 'GET',
    headers: { ... }
  }
);`})]}),s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ SDK Methods"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`import { sdk } from '@xala-technologies/platform/sdk';

const users = await sdk.users.list();`})]})]})},t={render:()=>s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ No Error Handling"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`const data = await sdk.users.list();
setUsers(data);`})]}),s.jsxs(a,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[s.jsx(r,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Proper Error Handling"}),s.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`try {
  const data = await sdk.users.list();
  setUsers(data);
} catch (error) {
  console.error(error);
  showError(t('errors.loadFailed'));
}`})]})]})},i={render:()=>s.jsxs(a,{style:{padding:"var(--ds-spacing-8)",maxWidth:"800px"},children:[s.jsx(r,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Best Practices Summary"}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:[{title:"Design Tokens",dos:["Use var(--ds-*) for all values","Consistent spacing/colors","Theme-aware styling"],donts:["Hardcoded pixels","Hex colors","Magic numbers"]},{title:"Components",dos:["Use platform components","Compose existing patterns","Follow Designsystemet"],donts:["Custom implementations","Inline styles","Raw HTML elements"]},{title:"Accessibility",dos:["Keyboard navigation","ARIA labels","Color contrast"],donts:["Mouse-only interactions","Missing labels","Poor contrast"]},{title:"Internationalization",dos:["Use t() for all text","Support RTL","Format dates/numbers"],donts:["Hardcoded strings","English-only","Locale assumptions"]}].map(({title:g,dos:G,donts:V})=>s.jsxs("div",{style:{padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-lg)",border:"1px solid var(--ds-color-neutral-border-default)"},children:[s.jsx(r,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:g}),s.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[s.jsx(l,{"data-size":"sm",style:{fontWeight:600,marginBottom:"var(--ds-spacing-2)",color:"var(--ds-color-success-text-default)"},children:"✅ Do:"}),G.map((c,p)=>s.jsxs(l,{"data-size":"sm",style:{marginLeft:"var(--ds-spacing-4)",marginBottom:"var(--ds-spacing-1)"},children:["• ",c]},p))]}),s.jsxs("div",{children:[s.jsx(l,{"data-size":"sm",style:{fontWeight:600,marginBottom:"var(--ds-spacing-2)",color:"var(--ds-color-danger-text-default)"},children:"❌ Don't:"}),V.map((c,p)=>s.jsxs(l,{"data-size":"sm",style:{marginLeft:"var(--ds-spacing-4)",marginBottom:"var(--ds-spacing-1)"},children:["• ",c]},p))]})]},g))})]})};var v,m,u,f,x;e.parameters={...e.parameters,docs:{...(v=e.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Hardcoded Values
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
          ✅ Design Tokens
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
    </div>
}`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source},description:{story:"Best Practice 1: Design Tokens",...(x=(f=e.parameters)==null?void 0:f.docs)==null?void 0:x.description}}};var y,h,b,C,z;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Custom Implementation
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
          ✅ Platform Components
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
    </div>
}`,...(b=(h=n.parameters)==null?void 0:h.docs)==null?void 0:b.source},description:{story:"Best Practice 2: Component Composition",...(z=(C=n.parameters)==null?void 0:C.docs)==null?void 0:z.description}}};var B,w,k,S,j;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Hardcoded Text
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
          ✅ Translated Text
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
    </div>
}`,...(k=(w=o.parameters)==null?void 0:w.docs)==null?void 0:k.source},description:{story:"Best Practice 3: i18n",...(j=(S=o.parameters)==null?void 0:S.docs)==null?void 0:j.description}}};var H,W,R,P,T;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Direct API Calls
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
          ✅ SDK Methods
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
    </div>
}`,...(R=(W=d.parameters)==null?void 0:W.docs)==null?void 0:R.source},description:{story:"Best Practice 4: SDK-First",...(T=(P=d.parameters)==null?void 0:P.docs)==null?void 0:T.description}}};var D,A,E,F,I;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ No Error Handling
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
          ✅ Proper Error Handling
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
    </div>
}`,...(E=(A=t.parameters)==null?void 0:A.docs)==null?void 0:E.source},description:{story:"Best Practice 5: Error Handling",...(I=(F=t.parameters)==null?void 0:F.docs)==null?void 0:I.description}}};var M,L,U,K,N;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-8)',
    maxWidth: '800px'
  }}>
      <Heading level={2} data-size="lg" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Best Practices Summary
      </Heading>

      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)'
    }}>
        {[{
        title: 'Design Tokens',
        dos: ['Use var(--ds-*) for all values', 'Consistent spacing/colors', 'Theme-aware styling'],
        donts: ['Hardcoded pixels', 'Hex colors', 'Magic numbers']
      }, {
        title: 'Components',
        dos: ['Use platform components', 'Compose existing patterns', 'Follow Designsystemet'],
        donts: ['Custom implementations', 'Inline styles', 'Raw HTML elements']
      }, {
        title: 'Accessibility',
        dos: ['Keyboard navigation', 'ARIA labels', 'Color contrast'],
        donts: ['Mouse-only interactions', 'Missing labels', 'Poor contrast']
      }, {
        title: 'Internationalization',
        dos: ['Use t() for all text', 'Support RTL', 'Format dates/numbers'],
        donts: ['Hardcoded strings', 'English-only', 'Locale assumptions']
      }].map(({
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
                ✅ Do:
              </Paragraph>
              {dos.map((item, i) => <Paragraph key={i} data-size="sm" style={{
            marginLeft: 'var(--ds-spacing-4)',
            marginBottom: 'var(--ds-spacing-1)'
          }}>
                  • {item}
                </Paragraph>)}
            </div>

            <div>
              <Paragraph data-size="sm" style={{
            fontWeight: 600,
            marginBottom: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-danger-text-default)'
          }}>
                ❌ Don't:
              </Paragraph>
              {donts.map((item, i) => <Paragraph key={i} data-size="sm" style={{
            marginLeft: 'var(--ds-spacing-4)',
            marginBottom: 'var(--ds-spacing-1)'
          }}>
                  • {item}
                </Paragraph>)}
            </div>
          </div>)}
      </div>
    </Card>
}`,...(U=(L=i.parameters)==null?void 0:L.docs)==null?void 0:U.source},description:{story:"Best Practices Summary",...(N=(K=i.parameters)==null?void 0:K.docs)==null?void 0:N.description}}};const ss=["DesignTokens","ComponentComposition","Internationalization","SDKFirst","ErrorHandling","Summary"];export{n as ComponentComposition,e as DesignTokens,t as ErrorHandling,o as Internationalization,d as SDKFirst,i as Summary,ss as __namedExportsOrder,$ as default};
//# sourceMappingURL=BestPractices.stories-BD2-ePWJ.js.map
