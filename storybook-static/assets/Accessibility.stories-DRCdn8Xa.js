import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as y}from"./index-ClcD9ViR.js";import{C as t}from"./index-D1XdeRjR.js";import{H as s}from"./heading-mzc2R_Ff.js";import{P as r}from"./paragraph-DDCpJsVw.js";import{B as v}from"./button-B6PgazAq.js";import{T as b}from"./textfield-BCKd4uLT.js";import{C as ee}from"./checkbox-CeN5g5X_.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";const xe={title:"Fundamentals/Accessibility",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},n={render:()=>e.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"600px"},children:[e.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:"Keyboard Navigation Demo"}),e.jsx(r,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"Try navigating with Tab, Shift+Tab, Enter, and Space keys"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(v,{"data-variant":"primary",tabIndex:0,children:"First Button (Tab to focus)"}),e.jsx(v,{"data-variant":"secondary",tabIndex:0,children:"Second Button"}),e.jsx(b,{label:"Text Input",placeholder:"Type here",tabIndex:0}),e.jsx(ee,{tabIndex:0,children:"Checkbox (Space to toggle)"}),e.jsx("a",{href:"#",style:{color:"var(--ds-color-accent-text-default)",textDecoration:"underline"},tabIndex:0,children:"Link (Enter to activate)"})]}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(r,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[e.jsx("strong",{children:"✅ Good:"})," All elements have tabIndex and respond to keyboard"]})})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[e.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[e.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Missing ARIA"}),e.jsx("button",{type:"button",style:{marginBottom:"var(--ds-spacing-2)"},children:"✓"}),e.jsx(r,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Icon-only button with no label - screen readers can't understand it"})]}),e.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[e.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Proper ARIA"}),e.jsx("button",{type:"button","aria-label":"Mark as complete",style:{marginBottom:"var(--ds-spacing-2)"},children:"✓"}),e.jsx(r,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:'Icon button with aria-label - screen readers announce "Mark as complete"'})]})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[e.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[e.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Poor Contrast"}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"#E0E0E0",color:"#C0C0C0",borderRadius:"var(--ds-border-radius-md)"},children:"This text is hard to read (contrast ratio < 3:1)"})]}),e.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[e.jsx(s,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Good Contrast"}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",color:"var(--ds-color-neutral-text-default)",borderRadius:"var(--ds-border-radius-md)"},children:"This text is easy to read (contrast ratio > 4.5:1)"})]})]})},p={render:()=>e.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"600px"},children:[e.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:"Focus Indicators"}),e.jsx(r,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"Tab through these elements to see focus indicators"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(v,{"data-variant":"primary",style:{outline:"2px solid transparent",outlineOffset:"2px"},onFocus:a=>{a.currentTarget.style.outline="2px solid var(--ds-color-accent-border-strong)"},onBlur:a=>{a.currentTarget.style.outline="2px solid transparent"},children:"Button with focus ring"}),e.jsx(b,{label:"Input Field",placeholder:"Focus to see outline"}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(r,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[e.jsx("strong",{children:"✅ Good:"})," Clear visual indicator when element has focus"]})})]})]})},m={render:()=>{const[a,i]=y.useState({name:"",email:"",subscribe:!1}),[o,x]=y.useState({});return e.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"500px"},children:[e.jsxs("form",{"aria-label":"Contact form",children:[e.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-6)"},children:"Accessible Form"}),e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(b,{label:"Name",id:"name-input",value:a.name,onChange:d=>i({...a,name:d.target.value}),"aria-required":"true","aria-invalid":!!o.name,"aria-describedby":o.name?"name-error":void 0}),o.name&&e.jsx(r,{id:"name-error","data-size":"sm",role:"alert",style:{color:"var(--ds-color-danger-text-default)",marginTop:"var(--ds-spacing-1)"},children:o.name})]}),e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(b,{label:"Email",type:"email",id:"email-input",value:a.email,onChange:d=>i({...a,email:d.target.value}),"aria-required":"true","aria-invalid":!!o.email,"aria-describedby":"email-help"}),e.jsx(r,{id:"email-help","data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)",marginTop:"var(--ds-spacing-1)"},children:"We'll never share your email"})]}),e.jsx("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:e.jsx(ee,{checked:a.subscribe,onChange:d=>i({...a,subscribe:d.target.checked}),"aria-label":"Subscribe to newsletter",children:"Subscribe to newsletter"})}),e.jsx(v,{"data-variant":"primary",type:"submit",children:"Submit"})]}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(r,{"data-size":"sm",style:{color:"var(--ds-color-success-text-default)"},children:[e.jsx("strong",{children:"✅ Accessible features:"}),e.jsx("br",{}),"• Proper labels with htmlFor",e.jsx("br",{}),"• aria-required for required fields",e.jsx("br",{}),"• aria-invalid for validation",e.jsx("br",{}),"• aria-describedby for help text",e.jsx("br",{}),'• role="alert" for errors']})})]})}},g={render:()=>e.jsxs(t,{style:{padding:"var(--ds-spacing-6)",maxWidth:"600px"},children:[e.jsx(s,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:"Screen Reader Only Text"}),e.jsx("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:e.jsxs("button",{type:"button",style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",border:"none",borderRadius:"var(--ds-border-radius-md)",cursor:"pointer"},children:[e.jsx("span",{style:{position:"absolute",width:"1px",height:"1px",padding:0,margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",border:0},children:"Close dialog"}),"✕"]})}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(r,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[e.jsx("strong",{children:"Pattern:"}),' The "✕" is visible, but screen readers announce "Close dialog"']})})]})},u={render:()=>e.jsxs(t,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(s,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Accessibility Checklist"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[{category:"Keyboard",items:["All interactive elements are keyboard accessible","Tab order is logical","Focus indicators are visible","No keyboard traps"]},{category:"Screen Readers",items:["All images have alt text","Form inputs have labels","ARIA labels for icon buttons","Landmarks for page regions"]},{category:"Visual",items:["Color contrast meets 4.5:1 ratio","Text is resizable to 200%","No information by color alone","Focus indicators are clear"]},{category:"Content",items:["Headings are hierarchical","Links are descriptive","Error messages are clear","Instructions are provided"]}].map(({category:a,items:i})=>e.jsxs("div",{children:[e.jsx(s,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:a}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:i.map((o,x)=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:x<i.length-1?"var(--ds-spacing-2)":0},children:[e.jsx("span",{style:{color:"var(--ds-color-success-text-default)"},children:"✓"}),e.jsx(r,{"data-size":"sm",children:o})]},x))})]},a))})]})};var h,f,C,j,B;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-6)',
    maxWidth: '600px'
  }}>
      <Heading level={3} data-size="md" style={{
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Keyboard Navigation Demo
      </Heading>
      <Paragraph style={{
      marginBottom: 'var(--ds-spacing-6)',
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        Try navigating with Tab, Shift+Tab, Enter, and Space keys
      </Paragraph>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        <Button data-variant="primary" tabIndex={0}>
          First Button (Tab to focus)
        </Button>
        <Button data-variant="secondary" tabIndex={0}>
          Second Button
        </Button>
        <Textfield label="Text Input" placeholder="Type here" tabIndex={0} />
        <Checkbox tabIndex={0}>Checkbox (Space to toggle)</Checkbox>
        <a href="#" style={{
        color: 'var(--ds-color-accent-text-default)',
        textDecoration: 'underline'
      }} tabIndex={0}>
          Link (Enter to activate)
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
          <strong>✅ Good:</strong> All elements have tabIndex and respond to keyboard
        </Paragraph>
      </div>
    </Card>
}`,...(C=(f=n.parameters)==null?void 0:f.docs)==null?void 0:C.source},description:{story:`Example 1: Keyboard Navigation

All interactive elements must be keyboard accessible`,...(B=(j=n.parameters)==null?void 0:j.docs)==null?void 0:B.description}}};var k,T,A,z,I;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Missing ARIA
        </Heading>
        <button type="button" style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>
          ✓
        </button>
        <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Icon-only button with no label - screen readers can't understand it
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
          ✅ Proper ARIA
        </Heading>
        <button type="button" aria-label="Mark as complete" style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>
          ✓
        </button>
        <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Icon button with aria-label - screen readers announce "Mark as complete"
        </Paragraph>
      </Card>
    </div>
}`,...(A=(T=l.parameters)==null?void 0:T.docs)==null?void 0:A.source},description:{story:`Example 2: ARIA Labels

Proper labeling for screen readers`,...(I=(z=l.parameters)==null?void 0:z.docs)==null?void 0:I.description}}};var P,R,S,w,F;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ❌ Poor Contrast
        </Heading>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: '#E0E0E0',
        color: '#C0C0C0',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          This text is hard to read (contrast ratio &lt; 3:1)
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
          ✅ Good Contrast
        </Heading>
        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        color: 'var(--ds-color-neutral-text-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          This text is easy to read (contrast ratio &gt; 4.5:1)
        </div>
      </Card>
    </div>
}`,...(S=(R=c.parameters)==null?void 0:R.docs)==null?void 0:S.source},description:{story:`Example 3: Color Contrast

Minimum contrast ratio of 4.5:1 for normal text`,...(F=(w=c.parameters)==null?void 0:w.docs)==null?void 0:F.description}}};var E,W,H,D,G;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-6)',
    maxWidth: '600px'
  }}>
      <Heading level={3} data-size="md" style={{
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Focus Indicators
      </Heading>
      <Paragraph style={{
      marginBottom: 'var(--ds-spacing-6)',
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        Tab through these elements to see focus indicators
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
          Button with focus ring
        </Button>

        <Textfield label="Input Field" placeholder="Focus to see outline" />

        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-info-text-default)'
        }}>
            <strong>✅ Good:</strong> Clear visual indicator when element has focus
          </Paragraph>
        </div>
      </div>
    </Card>
}`,...(H=(W=p.parameters)==null?void 0:W.docs)==null?void 0:H.source},description:{story:`Example 4: Focus Indicators

Visible focus states for keyboard navigation`,...(G=(D=p.parameters)==null?void 0:D.docs)==null?void 0:G.description}}};var L,N,q,M,K;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
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
        <form aria-label="Contact form">
          <Heading level={3} data-size="md" style={{
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            Accessible Form
          </Heading>

          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <Textfield label="Name" id="name-input" value={formData.name} onChange={e => setFormData({
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
            <Textfield label="Email" type="email" id="email-input" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} aria-required="true" aria-invalid={!!errors.email} aria-describedby="email-help" />
            <Paragraph id="email-help" data-size="sm" style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginTop: 'var(--ds-spacing-1)'
          }}>
              We'll never share your email
            </Paragraph>
          </div>

          <div style={{
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            <Checkbox checked={formData.subscribe} onChange={e => setFormData({
            ...formData,
            subscribe: e.target.checked
          })} aria-label="Subscribe to newsletter">
              Subscribe to newsletter
            </Checkbox>
          </div>

          <Button data-variant="primary" type="submit">
            Submit
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
            <strong>✅ Accessible features:</strong>
            <br />• Proper labels with htmlFor
            <br />• aria-required for required fields
            <br />• aria-invalid for validation
            <br />• aria-describedby for help text
            <br />• role="alert" for errors
          </Paragraph>
        </div>
      </Card>;
  }
}`,...(q=(N=m.parameters)==null?void 0:N.docs)==null?void 0:q.source},description:{story:`Example 5: Form Accessibility

Complete accessible form pattern`,...(K=(M=m.parameters)==null?void 0:M.docs)==null?void 0:K.description}}};var O,V,U,_,J;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-6)',
    maxWidth: '600px'
  }}>
      <Heading level={3} data-size="md" style={{
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Screen Reader Only Text
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
            Close dialog
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
          <strong>Pattern:</strong> The "✕" is visible, but screen readers announce "Close dialog"
        </Paragraph>
      </div>
    </Card>
}`,...(U=(V=g.parameters)==null?void 0:V.docs)==null?void 0:U.source},description:{story:`Example 6: Screen Reader Text

Visually hidden text for screen readers`,...(J=(_=g.parameters)==null?void 0:_.docs)==null?void 0:J.description}}};var Q,X,Y,Z,$;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-6)'
  }}>
      <Heading level={2} data-size="lg" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Accessibility Checklist
      </Heading>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        {[{
        category: 'Keyboard',
        items: ['All interactive elements are keyboard accessible', 'Tab order is logical', 'Focus indicators are visible', 'No keyboard traps']
      }, {
        category: 'Screen Readers',
        items: ['All images have alt text', 'Form inputs have labels', 'ARIA labels for icon buttons', 'Landmarks for page regions']
      }, {
        category: 'Visual',
        items: ['Color contrast meets 4.5:1 ratio', 'Text is resizable to 200%', 'No information by color alone', 'Focus indicators are clear']
      }, {
        category: 'Content',
        items: ['Headings are hierarchical', 'Links are descriptive', 'Error messages are clear', 'Instructions are provided']
      }].map(({
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
    </Card>
}`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"Accessibility Checklist",...($=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};const ye=["KeyboardNavigation","ARIALabels","ColorContrast","FocusIndicators","FormAccessibility","ScreenReaderText","Checklist"];export{l as ARIALabels,u as Checklist,c as ColorContrast,p as FocusIndicators,m as FormAccessibility,n as KeyboardNavigation,g as ScreenReaderText,ye as __namedExportsOrder,xe as default};
//# sourceMappingURL=Accessibility.stories-DRCdn8Xa.js.map
