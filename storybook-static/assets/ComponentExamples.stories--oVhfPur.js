import{j as e}from"./jsx-runtime-BYYWji4R.js";import{u as o}from"./index-bjNF47ar.js";import{r as B}from"./index-ClcD9ViR.js";import{I as Be}from"./inbox-BN_FKUt2.js";import{c as Se}from"./createLucideIcon-DXOARlW5.js";import{C as je}from"./circle-check-big-N58AFyrx.js";import{B as s}from"./button-B6PgazAq.js";import{C as l}from"./index-D1XdeRjR.js";import{H as m}from"./heading-mzc2R_Ff.js";import{P as p}from"./paragraph-DDCpJsVw.js";import{T as j}from"./textfield-BCKd4uLT.js";import{C as ze}from"./checkbox-CeN5g5X_.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Ee=Se("loader-circle",De),Qe={title:"Examples/Component Examples",parameters:{docs:{description:{component:`
# Component Examples Library

Comprehensive examples demonstrating proper component usage patterns.

## Categories
- **Basic Usage**: Simple, common patterns
- **Advanced Patterns**: Complex compositions
- **Accessibility**: WCAG-compliant examples
- **State Management**: Interactive examples
- **Error Handling**: Validation and feedback

## For AI Agents
These examples serve as training data for:
- Pattern recognition
- Code generation
- Validation
- Best practice enforcement
        `}}},tags:["autodocs"]},u={render:function(){const t=o();return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",flexWrap:"wrap"},children:[e.jsx(s,{"data-variant":"primary","data-size":"md",children:t("storybook.examples.primaryAction")}),e.jsx(s,{"data-variant":"secondary","data-size":"md",children:t("storybook.examples.secondaryAction")}),e.jsx(s,{"data-variant":"tertiary","data-size":"md",children:t("storybook.examples.tertiaryAction")})]})},parameters:{docs:{source:{code:`
// Good: Using design system components
<Button data-variant="primary" data-size="md">
  Primary Action
</Button>

// Bad: Custom button with hardcoded styles
<button style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white'
}}>
  Primary Action
</button>
        `}}}},g={render:function(){const t=o();return e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",flexWrap:"wrap"},children:[e.jsxs(s,{"data-variant":"primary",children:[e.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"+"}),t("platform.common.add")]}),e.jsxs(s,{"data-variant":"secondary",children:[e.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"💾"}),t("platform.common.save")]}),e.jsxs(s,{"data-variant":"tertiary",children:[e.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"🗑️"}),t("platform.common.delete")]})]})}},y={render:function(){const t=o(),[a,i]=B.useState(!1),d=()=>{i(!0),setTimeout(()=>i(!1),2e3)};return e.jsx(s,{"data-variant":"primary",onClick:d,disabled:a,children:t(a?"storybook.loading.loading":"storybook.examples.submitForm")})},parameters:{docs:{source:{code:`
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.submitForm(data);
  } finally {
    setLoading(false);
  }
};

return (
  <Button
    data-variant="primary"
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading ? 'Submitting...' : 'Submit'}
  </Button>
);
        `}}}},v={render:function(){const t=o(),[a,i]=B.useState({name:"",email:"",terms:!1}),[d,S]=B.useState({}),c=()=>{const r={};return a.name||(r.name=t("storybook.examples.nameRequired")),a.email||(r.email=t("storybook.examples.emailRequired")),a.terms||(r.terms=t("storybook.examples.termsRequired")),S(r),Object.keys(r).length===0},Ce=r=>{r.preventDefault(),c()&&alert(t("storybook.examples.formSubmitted"))};return e.jsx(l,{style:{maxWidth:"400px",padding:"var(--ds-spacing-6)"},children:e.jsxs("form",{onSubmit:Ce,children:[e.jsx(m,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:t("storybook.examples.signUp")}),e.jsx("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:e.jsx(j,{label:t("platform.common.name"),value:a.name,onChange:r=>i({...a,name:r.target.value}),error:d.name})}),e.jsx("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:e.jsx(j,{label:t("platform.common.email"),type:"email",value:a.email,onChange:r=>i({...a,email:r.target.value}),error:d.email})}),e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:[e.jsx(ze,{checked:a.terms,onChange:r=>i({...a,terms:r.target.checked}),children:t("storybook.examples.acceptTerms")}),d.terms&&e.jsx(p,{"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginTop:"var(--ds-spacing-1)"},children:d.terms})]}),e.jsx(s,{"data-variant":"primary",type:"submit",style:{width:"100%"},children:t("storybook.examples.createAccount")})]})})},parameters:{docs:{description:{story:`
**Key Patterns:**
- Controlled inputs with state
- Client-side validation
- Error display
- Accessible form structure
- Design tokens for spacing

**Accessibility:**
- Labels associated with inputs
- Error messages announced
- Keyboard navigation
- Focus management
        `}}}},f={render:function(){const t=o();return e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[1,2,3].map(a=>e.jsxs(l,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsxs(m,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:[t("storybook.examples.cardTitle")," ",a]}),e.jsx(p,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:t("storybook.examples.cardDescription")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[e.jsx(s,{"data-variant":"primary","data-size":"sm",children:t("storybook.examples.action")}),e.jsx(s,{"data-variant":"tertiary","data-size":"sm",children:t("platform.common.cancel")})]})]},a))})},parameters:{docs:{source:{code:`
// Good: Responsive grid with design tokens
<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ds-spacing-4)'
}}>
  <Card style={{ padding: 'var(--ds-spacing-6)' }}>
    <Heading level={3} data-size="sm">Title</Heading>
    <Paragraph>Content</Paragraph>
    <Button>Action</Button>
  </Card>
</div>

// Bad: Fixed widths, hardcoded spacing
<div style={{ display: 'flex', gap: '16px' }}>
  <div style={{ width: '300px', padding: '24px' }}>
    <h3>Title</h3>
    <p>Content</p>
    <button>Action</button>
  </div>
</div>
        `}}}},x={render:function(){const t=o(),[a,i]=B.useState(null),d=[t("platform.nav.dashboard"),t("storybook.examples.projects"),t("storybook.examples.team"),t("platform.common.settings")];return e.jsxs(l,{style:{maxWidth:"300px",padding:"var(--ds-spacing-4)"},children:[e.jsx(m,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",paddingLeft:"var(--ds-spacing-3)"},children:t("storybook.examples.navigation")}),e.jsx("div",{role:"list",children:d.map((S,c)=>e.jsx("button",{onClick:()=>i(c),style:{width:"100%",padding:"var(--ds-spacing-3)",textAlign:"left",border:"none",backgroundColor:a===c?"var(--ds-color-accent-surface-default)":"transparent",color:a===c?"var(--ds-color-accent-text-default)":"var(--ds-color-neutral-text-default)",borderRadius:"var(--ds-border-radius-md)",cursor:"pointer",fontSize:"var(--ds-font-size-sm)",fontWeight:a===c?600:400,transition:"all 0.2s"},type:"button",children:S},c))})]})}},b={render:function(){const t=o();return e.jsxs(l,{style:{padding:"var(--ds-spacing-12)",textAlign:"center"},children:[e.jsx(Be,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-neutral-text-subtle)"}}),e.jsx(m,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-2)"},children:t("storybook.patterns.noItemsYet")}),e.jsx(p,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-6)"},children:t("storybook.patterns.getStarted")}),e.jsx(s,{"data-variant":"primary",children:t("storybook.patterns.createItem")})]})}},h={render:function(){const t=o();return e.jsxs(l,{style:{padding:"var(--ds-spacing-6)",maxWidth:"400px",borderLeft:"4px solid var(--ds-color-danger-border-default)",backgroundColor:"var(--ds-color-danger-surface-default)"},children:[e.jsx(m,{level:3,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-2)"},children:t("storybook.notifications.error")}),e.jsx(p,{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:t("storybook.examples.failedToLoadData")}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[e.jsx(s,{"data-variant":"primary","data-size":"sm",children:t("storybook.examples.retry")}),e.jsx(s,{"data-variant":"tertiary","data-size":"sm",children:t("platform.common.cancel")})]})]})}},k={render:function(){const t=o();return e.jsx(l,{style:{padding:"var(--ds-spacing-6)",borderLeft:"4px solid var(--ds-color-success-border-default)",backgroundColor:"var(--ds-color-success-surface-default)"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)"},children:[e.jsx(je,{size:24,style:{color:"var(--ds-color-success-base-default)"}}),e.jsxs("div",{children:[e.jsx(m,{level:3,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-1)"},children:t("storybook.notifications.success")}),e.jsx(p,{"data-size":"sm",style:{color:"var(--ds-color-success-text-default)"},children:t("storybook.notifications.changesSaved")})]})]})})}},C={render:function(){const t=o();return e.jsxs(l,{style:{padding:"var(--ds-spacing-12)",textAlign:"center"},children:[e.jsx(Ee,{size:40,style:{margin:"0 auto var(--ds-spacing-4)",animation:"spin 1s linear infinite",color:"var(--ds-color-accent-base-default)"}}),e.jsx(p,{style:{color:"var(--ds-color-neutral-text-subtle)"},children:t("storybook.loading.loading")}),e.jsx("style",{children:`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `})]})}};var z,D,E,R,w;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      flexWrap: 'wrap'
    }}>
        <Button data-variant="primary" data-size="md">
          {t('storybook.examples.primaryAction')}
        </Button>
        <Button data-variant="secondary" data-size="md">
          {t('storybook.examples.secondaryAction')}
        </Button>
        <Button data-variant="tertiary" data-size="md">
          {t('storybook.examples.tertiaryAction')}
        </Button>
      </div>;
  },
  parameters: {
    docs: {
      source: {
        code: \`
// Good: Using design system components
<Button data-variant="primary" data-size="md">
  Primary Action
</Button>

// Bad: Custom button with hardcoded styles
<button style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white'
}}>
  Primary Action
</button>
        \`
      }
    }
  }
}`,...(E=(D=u.parameters)==null?void 0:D.docs)==null?void 0:E.source},description:{story:`Example 1: Button - Basic Usage

Demonstrates: Primary action button
Use Case: Form submission, primary actions
Difficulty: Beginner`,...(w=(R=u.parameters)==null?void 0:R.docs)==null?void 0:w.description}}};var L,A,T,P,I;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      flexWrap: 'wrap'
    }}>
        <Button data-variant="primary">
          <span style={{
          marginRight: 'var(--ds-spacing-2)'
        }}>+</span>
          {t('platform.common.add')}
        </Button>
        <Button data-variant="secondary">
          <span style={{
          marginRight: 'var(--ds-spacing-2)'
        }}>💾</span>
          {t('platform.common.save')}
        </Button>
        <Button data-variant="tertiary">
          <span style={{
          marginRight: 'var(--ds-spacing-2)'
        }}>🗑️</span>
          {t('platform.common.delete')}
        </Button>
      </div>;
  }
}`,...(T=(A=g.parameters)==null?void 0:A.docs)==null?void 0:T.source},description:{story:`Example 2: Button - With Icons

Demonstrates: Icon + text button pattern
Use Case: Actions with visual indicators
Difficulty: Beginner`,...(I=(P=g.parameters)==null?void 0:P.docs)==null?void 0:I.description}}};var F,W,H,U,q;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };
    return <Button data-variant="primary" onClick={handleClick} disabled={loading}>
        {loading ? t('storybook.loading.loading') : t('storybook.examples.submitForm')}
      </Button>;
  },
  parameters: {
    docs: {
      source: {
        code: \`
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.submitForm(data);
  } finally {
    setLoading(false);
  }
};

return (
  <Button
    data-variant="primary"
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading ? 'Submitting...' : 'Submit'}
  </Button>
);
        \`
      }
    }
  }
}`,...(H=(W=y.parameters)==null?void 0:W.docs)==null?void 0:H.source},description:{story:`Example 3: Button - Loading States

Demonstrates: Async action feedback
Use Case: API calls, form submissions
Difficulty: Intermediate`,...(q=(U=y.parameters)==null?void 0:U.docs)==null?void 0:q.description}}};var G,K,_,O,M;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      terms: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.name) newErrors.name = t('storybook.examples.nameRequired');
      if (!formData.email) newErrors.email = t('storybook.examples.emailRequired');
      if (!formData.terms) newErrors.terms = t('storybook.examples.termsRequired');
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        alert(t('storybook.examples.formSubmitted'));
      }
    };
    return <Card style={{
      maxWidth: '400px',
      padding: 'var(--ds-spacing-6)'
    }}>
        <form onSubmit={handleSubmit}>
          <Heading level={3} data-size="md" style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {t('storybook.examples.signUp')}
          </Heading>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label={t('platform.common.name')} value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} error={errors.name} />
          </div>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label={t('platform.common.email')} type="email" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} error={errors.email} />
          </div>

          <div style={{
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            <Checkbox checked={formData.terms} onChange={e => setFormData({
            ...formData,
            terms: e.target.checked
          })}>
              {t('storybook.examples.acceptTerms')}
            </Checkbox>
            {errors.terms && <Paragraph data-size="sm" style={{
            color: 'var(--ds-color-danger-text-default)',
            marginTop: 'var(--ds-spacing-1)'
          }}>
                {errors.terms}
              </Paragraph>}
          </div>

          <Button data-variant="primary" type="submit" style={{
          width: '100%'
        }}>
            {t('storybook.examples.createAccount')}
          </Button>
        </form>
      </Card>;
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Key Patterns:**
- Controlled inputs with state
- Client-side validation
- Error display
- Accessible form structure
- Design tokens for spacing

**Accessibility:**
- Labels associated with inputs
- Error messages announced
- Keyboard navigation
- Focus management
        \`
      }
    }
  }
}`,...(_=(K=v.parameters)==null?void 0:K.docs)==null?void 0:_.source},description:{story:`Example 4: Form - Complete Pattern

Demonstrates: Form with validation
Use Case: User input collection
Difficulty: Intermediate`,...(M=(O=v.parameters)==null?void 0:O.docs)==null?void 0:M.description}}};var N,V,Y,J,Q;f.parameters={...f.parameters,docs:{...(N=f.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-4)'
    }}>
        {[1, 2, 3].map(i => <Card key={i} style={{
        padding: 'var(--ds-spacing-6)'
      }}>
            <Heading level={3} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
              {t('storybook.examples.cardTitle')} {i}
            </Heading>
            <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
              {t('storybook.examples.cardDescription')}
            </Paragraph>
            <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)'
        }}>
              <Button data-variant="primary" data-size="sm">
                {t('storybook.examples.action')}
              </Button>
              <Button data-variant="tertiary" data-size="sm">
                {t('platform.common.cancel')}
              </Button>
            </div>
          </Card>)}
      </div>;
  },
  parameters: {
    docs: {
      source: {
        code: \`
// Good: Responsive grid with design tokens
<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ds-spacing-4)'
}}>
  <Card style={{ padding: 'var(--ds-spacing-6)' }}>
    <Heading level={3} data-size="sm">Title</Heading>
    <Paragraph>Content</Paragraph>
    <Button>Action</Button>
  </Card>
</div>

// Bad: Fixed widths, hardcoded spacing
<div style={{ display: 'flex', gap: '16px' }}>
  <div style={{ width: '300px', padding: '24px' }}>
    <h3>Title</h3>
    <p>Content</p>
    <button>Action</button>
  </div>
</div>
        \`
      }
    }
  }
}`,...(Y=(V=f.parameters)==null?void 0:V.docs)==null?void 0:Y.source},description:{story:`Example 5: Card - Content Layout

Demonstrates: Structured card content
Use Case: Content display, dashboards
Difficulty: Beginner`,...(Q=(J=f.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};var X,Z,$,ee,te;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<number | null>(null);
    const items = [t('platform.nav.dashboard'), t('storybook.examples.projects'), t('storybook.examples.team'), t('platform.common.settings')];
    return <Card style={{
      maxWidth: '300px',
      padding: 'var(--ds-spacing-4)'
    }}>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        paddingLeft: 'var(--ds-spacing-3)'
      }}>
          {t('storybook.examples.navigation')}
        </Heading>
        <div role="list">
          {items.map((item, index) => <button key={index} onClick={() => setSelected(index)} style={{
          width: '100%',
          padding: 'var(--ds-spacing-3)',
          textAlign: 'left',
          border: 'none',
          backgroundColor: selected === index ? 'var(--ds-color-accent-surface-default)' : 'transparent',
          color: selected === index ? 'var(--ds-color-accent-text-default)' : 'var(--ds-color-neutral-text-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          cursor: 'pointer',
          fontSize: 'var(--ds-font-size-sm)',
          fontWeight: selected === index ? 600 : 400,
          transition: 'all 0.2s'
        }} type="button">
              {item}
            </button>)}
        </div>
      </Card>;
  }
}`,...($=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:$.source},description:{story:`Example 6: List - Interactive Items

Demonstrates: Selectable list pattern
Use Case: Item selection, navigation
Difficulty: Intermediate`,...(te=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:te.description}}};var ae,re,se,oe,ne;b.parameters={...b.parameters,docs:{...(ae=b.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-12)',
      textAlign: 'center'
    }}>
        <Inbox size={48} style={{
        marginBottom: 'var(--ds-spacing-4)',
        margin: '0 auto',
        color: 'var(--ds-color-neutral-text-subtle)'
      }} />
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>
          {t('storybook.patterns.noItemsYet')}
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-neutral-text-subtle)',
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.patterns.getStarted')}
        </Paragraph>
        <Button data-variant="primary">{t('storybook.patterns.createItem')}</Button>
      </Card>;
  }
}`,...(se=(re=b.parameters)==null?void 0:re.docs)==null?void 0:se.source},description:{story:`Example 7: Empty State

Demonstrates: No content feedback
Use Case: Empty lists, no results
Difficulty: Beginner`,...(ne=(oe=b.parameters)==null?void 0:oe.docs)==null?void 0:ne.description}}};var ie,de,ce,le,me;h.parameters={...h.parameters,docs:{...(ie=h.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-6)',
      maxWidth: '400px',
      borderLeft: '4px solid var(--ds-color-danger-border-default)',
      backgroundColor: 'var(--ds-color-danger-surface-default)'
    }}>
        <Heading level={3} data-size="sm" style={{
        color: 'var(--ds-color-danger-text-default)',
        marginBottom: 'var(--ds-spacing-2)'
      }}>
          {t('storybook.notifications.error')}
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-danger-text-default)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.examples.failedToLoadData')}
        </Paragraph>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)'
      }}>
          <Button data-variant="primary" data-size="sm">
            {t('storybook.examples.retry')}
          </Button>
          <Button data-variant="tertiary" data-size="sm">
            {t('platform.common.cancel')}
          </Button>
        </div>
      </Card>;
  }
}`,...(ce=(de=h.parameters)==null?void 0:de.docs)==null?void 0:ce.source},description:{story:`Example 8: Error State

Demonstrates: Error feedback
Use Case: Failed operations, validation
Difficulty: Beginner`,...(me=(le=h.parameters)==null?void 0:le.docs)==null?void 0:me.description}}};var pe,ue,ge,ye,ve;k.parameters={...k.parameters,docs:{...(pe=k.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-6)',
      borderLeft: '4px solid var(--ds-color-success-border-default)',
      backgroundColor: 'var(--ds-color-success-surface-default)'
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-3)'
      }}>
          <CheckCircle size={24} style={{
          color: 'var(--ds-color-success-base-default)'
        }} />
          <div>
            <Heading level={3} data-size="sm" style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-1)'
          }}>
              {t('storybook.notifications.success')}
            </Heading>
            <Paragraph data-size="sm" style={{
            color: 'var(--ds-color-success-text-default)'
          }}>
              {t('storybook.notifications.changesSaved')}
            </Paragraph>
          </div>
        </div>
      </Card>;
  }
}`,...(ge=(ue=k.parameters)==null?void 0:ue.docs)==null?void 0:ge.source},description:{story:`Example 9: Success State

Demonstrates: Success feedback
Use Case: Confirmations, completions
Difficulty: Beginner`,...(ve=(ye=k.parameters)==null?void 0:ye.docs)==null?void 0:ve.description}}};var fe,xe,be,he,ke;C.parameters={...C.parameters,docs:{...(fe=C.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card style={{
      padding: 'var(--ds-spacing-12)',
      textAlign: 'center'
    }}>
        <Loader2 size={40} style={{
        margin: '0 auto var(--ds-spacing-4)',
        animation: 'spin 1s linear infinite',
        color: 'var(--ds-color-accent-base-default)'
      }} />
        <Paragraph style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.loading.loading')}
        </Paragraph>
        <style>{\`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        \`}</style>
      </Card>;
  }
}`,...(be=(xe=C.parameters)==null?void 0:xe.docs)==null?void 0:be.source},description:{story:`Example 10: Loading State

Demonstrates: Loading feedback
Use Case: Async operations, data fetching
Difficulty: Beginner`,...(ke=(he=C.parameters)==null?void 0:he.docs)==null?void 0:ke.description}}};const Xe=["ButtonBasic","ButtonWithIcons","ButtonLoadingState","FormComplete","CardContentLayout","ListInteractive","EmptyState","ErrorState","SuccessState","LoadingState"];export{u as ButtonBasic,y as ButtonLoadingState,g as ButtonWithIcons,f as CardContentLayout,b as EmptyState,h as ErrorState,v as FormComplete,x as ListInteractive,C as LoadingState,k as SuccessState,Xe as __namedExportsOrder,Qe as default};
//# sourceMappingURL=ComponentExamples.stories--oVhfPur.js.map
