import{j as a}from"./jsx-runtime-BYYWji4R.js";import{r as b}from"./index-ClcD9ViR.js";import{I as ba}from"./inbox-BN_FKUt2.js";import{c as Ca}from"./createLucideIcon-DXOARlW5.js";import{C as Ba}from"./circle-check-big-N58AFyrx.js";import{B as r}from"./button-B6PgazAq.js";import{C as o}from"./index-D1XdeRjR.js";import{H as d}from"./heading-mzc2R_Ff.js";import{P as c}from"./paragraph-DDCpJsVw.js";import{T as B}from"./textfield-BCKd4uLT.js";import{C as Sa}from"./checkbox-CeN5g5X_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],za=Ca("loader-circle",ja),_a={title:"Examples/Component Examples",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},l={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",flexWrap:"wrap"},children:[a.jsx(r,{"data-variant":"primary","data-size":"md",children:"Primary Action"}),a.jsx(r,{"data-variant":"secondary","data-size":"md",children:"Secondary Action"}),a.jsx(r,{"data-variant":"tertiary","data-size":"md",children:"Tertiary Action"})]}),parameters:{docs:{source:{code:`
// ✅ Good: Using design system components
<Button data-variant="primary" data-size="md">
  Primary Action
</Button>

// ❌ Bad: Custom button with hardcoded styles
<button style={{ 
  padding: '12px 24px', 
  backgroundColor: '#0066CC',
  color: 'white' 
}}>
  Primary Action
</button>
        `}}}},m={render:()=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",flexWrap:"wrap"},children:[a.jsxs(r,{"data-variant":"primary",children:[a.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"+"}),"Add Item"]}),a.jsxs(r,{"data-variant":"secondary",children:[a.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"💾"}),"Save"]}),a.jsxs(r,{"data-variant":"tertiary",children:[a.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"🗑️"}),"Delete"]})]})},p={render:()=>{const[e,s]=b.useState(!1),n=()=>{s(!0),setTimeout(()=>s(!1),2e3)};return a.jsx(r,{"data-variant":"primary",onClick:n,disabled:e,children:e?"Loading...":"Submit Form"})},parameters:{docs:{source:{code:`
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
        `}}}},g={render:()=>{const[e,s]=b.useState({name:"",email:"",terms:!1}),[n,C]=b.useState({}),i=()=>{const t={};return e.name||(t.name="Name is required"),e.email||(t.email="Email is required"),e.terms||(t.terms="You must accept terms"),C(t),Object.keys(t).length===0},ha=t=>{t.preventDefault(),i()&&alert("Form submitted!")};return a.jsx(o,{style:{maxWidth:"400px",padding:"var(--ds-spacing-6)"},children:a.jsxs("form",{onSubmit:ha,children:[a.jsx(d,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:"Sign Up"}),a.jsx("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:a.jsx(B,{label:"Name",value:e.name,onChange:t=>s({...e,name:t.target.value}),error:n.name})}),a.jsx("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:a.jsx(B,{label:"Email",type:"email",value:e.email,onChange:t=>s({...e,email:t.target.value}),error:n.email})}),a.jsxs("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:[a.jsx(Sa,{checked:e.terms,onChange:t=>s({...e,terms:t.target.checked}),children:"I accept the terms and conditions"}),n.terms&&a.jsx(c,{"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginTop:"var(--ds-spacing-1)"},children:n.terms})]}),a.jsx(r,{"data-variant":"primary",type:"submit",style:{width:"100%"},children:"Create Account"})]})})},parameters:{docs:{description:{story:`
**Key Patterns:**
- ✅ Controlled inputs with state
- ✅ Client-side validation
- ✅ Error display
- ✅ Accessible form structure
- ✅ Design tokens for spacing

**Accessibility:**
- Labels associated with inputs
- Error messages announced
- Keyboard navigation
- Focus management
        `}}}},u={render:()=>a.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)"},children:[1,2,3].map(e=>a.jsxs(o,{style:{padding:"var(--ds-spacing-6)"},children:[a.jsxs(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:["Card Title ",e]}),a.jsx(c,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:"This is a description of the card content. It provides context and information."}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"data-variant":"primary","data-size":"sm",children:"Action"}),a.jsx(r,{"data-variant":"tertiary","data-size":"sm",children:"Cancel"})]})]},e))}),parameters:{docs:{source:{code:`
// ✅ Good: Responsive grid with design tokens
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

// ❌ Bad: Fixed widths, hardcoded spacing
<div style={{ display: 'flex', gap: '16px' }}>
  <div style={{ width: '300px', padding: '24px' }}>
    <h3>Title</h3>
    <p>Content</p>
    <button>Action</button>
  </div>
</div>
        `}}}},v={render:()=>{const[e,s]=b.useState(null),n=["Dashboard","Projects","Team","Settings"];return a.jsxs(o,{style:{maxWidth:"300px",padding:"var(--ds-spacing-4)"},children:[a.jsx(d,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",paddingLeft:"var(--ds-spacing-3)"},children:"Navigation"}),a.jsx("div",{role:"list",children:n.map((C,i)=>a.jsx("button",{onClick:()=>s(i),style:{width:"100%",padding:"var(--ds-spacing-3)",textAlign:"left",border:"none",backgroundColor:e===i?"var(--ds-color-accent-surface-default)":"transparent",color:e===i?"var(--ds-color-accent-text-default)":"var(--ds-color-neutral-text-default)",borderRadius:"var(--ds-border-radius-md)",cursor:"pointer",fontSize:"var(--ds-font-size-sm)",fontWeight:e===i?600:400,transition:"all 0.2s"},type:"button",children:C},i))})]})}},y={render:()=>a.jsxs(o,{style:{padding:"var(--ds-spacing-12)",textAlign:"center"},children:[a.jsx(ba,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-neutral-text-subtle)"}}),a.jsx(d,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-2)"},children:"No items yet"}),a.jsx(c,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-6)"},children:"Get started by creating your first item"}),a.jsx(r,{"data-variant":"primary",children:"Create Item"})]})},f={render:()=>a.jsxs(o,{style:{padding:"var(--ds-spacing-6)",maxWidth:"400px",borderLeft:"4px solid var(--ds-color-danger-border-default)",backgroundColor:"var(--ds-color-danger-surface-default)"},children:[a.jsx(d,{level:3,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-2)"},children:"Error"}),a.jsx(c,{style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"Failed to load data. Please try again."}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(r,{"data-variant":"primary","data-size":"sm",children:"Retry"}),a.jsx(r,{"data-variant":"tertiary","data-size":"sm",children:"Cancel"})]})]})},x={render:()=>a.jsx(o,{style:{padding:"var(--ds-spacing-6)",borderLeft:"4px solid var(--ds-color-success-border-default)",backgroundColor:"var(--ds-color-success-surface-default)"},children:a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)"},children:[a.jsx(Ba,{size:24,style:{color:"var(--ds-color-success-base-default)"}}),a.jsxs("div",{children:[a.jsx(d,{level:3,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-1)"},children:"Success"}),a.jsx(c,{"data-size":"sm",style:{color:"var(--ds-color-success-text-default)"},children:"Your changes have been saved"})]})]})})},h={render:()=>a.jsxs(o,{style:{padding:"var(--ds-spacing-12)",textAlign:"center"},children:[a.jsx(za,{size:40,style:{margin:"0 auto var(--ds-spacing-4)",animation:"spin 1s linear infinite",color:"var(--ds-color-accent-base-default)"}}),a.jsx(c,{style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Loading..."}),a.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `})]})};var S,j,z,E,D;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-4)',
    flexWrap: 'wrap'
  }}>
      <Button data-variant="primary" data-size="md">
        Primary Action
      </Button>
      <Button data-variant="secondary" data-size="md">
        Secondary Action
      </Button>
      <Button data-variant="tertiary" data-size="md">
        Tertiary Action
      </Button>
    </div>,
  parameters: {
    docs: {
      source: {
        code: \`
// ✅ Good: Using design system components
<Button data-variant="primary" data-size="md">
  Primary Action
</Button>

// ❌ Bad: Custom button with hardcoded styles
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
}`,...(z=(j=l.parameters)==null?void 0:j.docs)==null?void 0:z.source},description:{story:`Example 1: Button - Basic Usage

Demonstrates: Primary action button
Use Case: Form submission, primary actions
Difficulty: Beginner`,...(D=(E=l.parameters)==null?void 0:E.docs)==null?void 0:D.description}}};var k,A,L,w,P;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--ds-spacing-4)',
    flexWrap: 'wrap'
  }}>
      <Button data-variant="primary">
        <span style={{
        marginRight: 'var(--ds-spacing-2)'
      }}>+</span>
        Add Item
      </Button>
      <Button data-variant="secondary">
        <span style={{
        marginRight: 'var(--ds-spacing-2)'
      }}>💾</span>
        Save
      </Button>
      <Button data-variant="tertiary">
        <span style={{
        marginRight: 'var(--ds-spacing-2)'
      }}>🗑️</span>
        Delete
      </Button>
    </div>
}`,...(L=(A=m.parameters)==null?void 0:A.docs)==null?void 0:L.source},description:{story:`Example 2: Button - With Icons

Demonstrates: Icon + text button pattern
Use Case: Actions with visual indicators
Difficulty: Beginner`,...(P=(w=m.parameters)==null?void 0:w.docs)==null?void 0:P.description}}};var I,F,T,W,H;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };
    return <Button data-variant="primary" onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Submit Form'}
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
}`,...(T=(F=p.parameters)==null?void 0:F.docs)==null?void 0:T.source},description:{story:`Example 3: Button - Loading States

Demonstrates: Async action feedback
Use Case: API calls, form submissions
Difficulty: Intermediate`,...(H=(W=p.parameters)==null?void 0:W.docs)==null?void 0:H.description}}};var U,R,N,G,q;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      terms: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.terms) newErrors.terms = 'You must accept terms';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        alert('Form submitted!');
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
            Sign Up
          </Heading>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label="Name" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} error={errors.name} />
          </div>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label="Email" type="email" value={formData.email} onChange={e => setFormData({
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
              I accept the terms and conditions
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
            Create Account
          </Button>
        </form>
      </Card>;
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Key Patterns:**
- ✅ Controlled inputs with state
- ✅ Client-side validation
- ✅ Error display
- ✅ Accessible form structure
- ✅ Design tokens for spacing

**Accessibility:**
- Labels associated with inputs
- Error messages announced
- Keyboard navigation
- Focus management
        \`
      }
    }
  }
}`,...(N=(R=g.parameters)==null?void 0:R.docs)==null?void 0:N.source},description:{story:`Example 4: Form - Complete Pattern

Demonstrates: Form with validation
Use Case: User input collection
Difficulty: Intermediate`,...(q=(G=g.parameters)==null?void 0:G.docs)==null?void 0:q.description}}};var K,Y,_,O,M;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div style={{
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
            Card Title {i}
          </Heading>
          <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-neutral-text-subtle)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
            This is a description of the card content. It provides context and information.
          </Paragraph>
          <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)'
      }}>
            <Button data-variant="primary" data-size="sm">
              Action
            </Button>
            <Button data-variant="tertiary" data-size="sm">
              Cancel
            </Button>
          </div>
        </Card>)}
    </div>,
  parameters: {
    docs: {
      source: {
        code: \`
// ✅ Good: Responsive grid with design tokens
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

// ❌ Bad: Fixed widths, hardcoded spacing
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
}`,...(_=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:_.source},description:{story:`Example 5: Card - Content Layout

Demonstrates: Structured card content
Use Case: Content display, dashboards
Difficulty: Beginner`,...(M=(O=u.parameters)==null?void 0:O.docs)==null?void 0:M.description}}};var V,J,Q,X,Z;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<number | null>(null);
    const items = ['Dashboard', 'Projects', 'Team', 'Settings'];
    return <Card style={{
      maxWidth: '300px',
      padding: 'var(--ds-spacing-4)'
    }}>
        <Heading level={3} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-3)',
        paddingLeft: 'var(--ds-spacing-3)'
      }}>
          Navigation
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
}`,...(Q=(J=v.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:`Example 6: List - Interactive Items

Demonstrates: Selectable list pattern
Use Case: Item selection, navigation
Difficulty: Intermediate`,...(Z=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var $,aa,ea,ta,ra;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Card style={{
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
        No items yet
      </Heading>
      <Paragraph style={{
      color: 'var(--ds-color-neutral-text-subtle)',
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Get started by creating your first item
      </Paragraph>
      <Button data-variant="primary">Create Item</Button>
    </Card>
}`,...(ea=(aa=y.parameters)==null?void 0:aa.docs)==null?void 0:ea.source},description:{story:`Example 7: Empty State

Demonstrates: No content feedback
Use Case: Empty lists, no results
Difficulty: Beginner`,...(ra=(ta=y.parameters)==null?void 0:ta.docs)==null?void 0:ra.description}}};var sa,na,ia,oa,da;f.parameters={...f.parameters,docs:{...(sa=f.parameters)==null?void 0:sa.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-6)',
    maxWidth: '400px',
    borderLeft: '4px solid var(--ds-color-danger-border-default)',
    backgroundColor: 'var(--ds-color-danger-surface-default)'
  }}>
      <Heading level={3} data-size="sm" style={{
      color: 'var(--ds-color-danger-text-default)',
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        Error
      </Heading>
      <Paragraph style={{
      color: 'var(--ds-color-danger-text-default)',
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Failed to load data. Please try again.
      </Paragraph>
      <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)'
    }}>
        <Button data-variant="primary" data-size="sm">
          Retry
        </Button>
        <Button data-variant="tertiary" data-size="sm">
          Cancel
        </Button>
      </div>
    </Card>
}`,...(ia=(na=f.parameters)==null?void 0:na.docs)==null?void 0:ia.source},description:{story:`Example 8: Error State

Demonstrates: Error feedback
Use Case: Failed operations, validation
Difficulty: Beginner`,...(da=(oa=f.parameters)==null?void 0:oa.docs)==null?void 0:da.description}}};var ca,la,ma,pa,ga;x.parameters={...x.parameters,docs:{...(ca=x.parameters)==null?void 0:ca.docs,source:{originalSource:`{
  render: () => <Card style={{
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
            Success
          </Heading>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)'
        }}>
            Your changes have been saved
          </Paragraph>
        </div>
      </div>
    </Card>
}`,...(ma=(la=x.parameters)==null?void 0:la.docs)==null?void 0:ma.source},description:{story:`Example 9: Success State

Demonstrates: Success feedback
Use Case: Confirmations, completions
Difficulty: Beginner`,...(ga=(pa=x.parameters)==null?void 0:pa.docs)==null?void 0:ga.description}}};var ua,va,ya,fa,xa;h.parameters={...h.parameters,docs:{...(ua=h.parameters)==null?void 0:ua.docs,source:{originalSource:`{
  render: () => <Card style={{
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
    }}>Loading...</Paragraph>
      <style>{\`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      \`}</style>
    </Card>
}`,...(ya=(va=h.parameters)==null?void 0:va.docs)==null?void 0:ya.source},description:{story:`Example 10: Loading State

Demonstrates: Loading feedback
Use Case: Async operations, data fetching
Difficulty: Beginner`,...(xa=(fa=h.parameters)==null?void 0:fa.docs)==null?void 0:xa.description}}};const Oa=["ButtonBasic","ButtonWithIcons","ButtonLoadingState","FormComplete","CardContentLayout","ListInteractive","EmptyState","ErrorState","SuccessState","LoadingState"];export{l as ButtonBasic,p as ButtonLoadingState,m as ButtonWithIcons,u as CardContentLayout,y as EmptyState,f as ErrorState,g as FormComplete,v as ListInteractive,h as LoadingState,x as SuccessState,Oa as __namedExportsOrder,_a as default};
//# sourceMappingURL=ComponentExamples.stories-k4h0l2Yh.js.map
