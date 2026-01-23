import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as x}from"./index-ClcD9ViR.js";import{I as ae}from"./inbox-BN_FKUt2.js";import{S as re,C as se}from"./search-bfoblFXp.js";import{C as t}from"./index-D1XdeRjR.js";import{H as a}from"./heading-mzc2R_Ff.js";import{P as s}from"./paragraph-DDCpJsVw.js";import{B as l}from"./button-B6PgazAq.js";import{T as o}from"./textfield-BCKd4uLT.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./createLucideIcon-DXOARlW5.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";const Be={title:"Fundamentals/Patterns",parameters:{docs:{description:{component:`
# Design Patterns

Reusable solutions to common design problems. These patterns create consistent, recognizable user experiences.

## Categories
- **Form Patterns**: Validation, required fields, error handling
- **Navigation Patterns**: Menus, breadcrumbs, wizards
- **Feedback Patterns**: Notifications, loading states, empty states
- **Data Patterns**: Tables, lists, filtering, pagination

## Reference
[Designsystemet Patterns](https://designsystemet.no/no/patterns)
        `}}},tags:["autodocs"]},c={render:()=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[e.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"❌ Wrong Pattern"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(o,{label:"Name *",required:!0}),e.jsx(o,{label:"Email *",type:"email",required:!0}),e.jsx(o,{label:"Phone",type:"tel"})]}),e.jsx(s,{"data-size":"sm",style:{marginTop:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:"Asterisks create visual clutter"})]}),e.jsxs(t,{style:{flex:1,minWidth:"300px",padding:"var(--ds-spacing-6)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-4)"},children:"✅ Correct Pattern"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(o,{label:"Name",required:!0}),e.jsx(o,{label:"Email",type:"email",required:!0}),e.jsx(o,{label:"Phone (optional)",type:"tel"})]}),e.jsx(s,{"data-size":"sm",style:{marginTop:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:"Mark only optional fields"})]})]})},p={render:()=>{const[r,i]=x.useState(""),[n,d]=x.useState(!1),Z=n&&!r.includes("@")?"Please enter a valid email":void 0;return e.jsxs(t,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(a,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:"User-Triggered Validation"}),e.jsx(s,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"Error appears only after you leave the field (onBlur)"}),e.jsx(o,{label:"Email",type:"email",value:r,onChange:ee=>i(ee.target.value),onBlur:()=>d(!0),error:Z}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:e.jsxs(s,{"data-size":"sm",style:{color:"var(--ds-color-info-text-default)"},children:[e.jsx("strong",{children:"Pattern:"})," Validate onBlur, not onChange"]})})]})}},g={render:()=>{const[r,i]=x.useState(1),n=3;return e.jsxs(t,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(a,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-6)"},children:"Multi-Step Wizard"}),e.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-8)"},children:[1,2,3].map(d=>e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{height:"var(--ds-spacing-1)",backgroundColor:d<=r?"var(--ds-color-accent-base-default)":"var(--ds-color-neutral-border-subtle)",borderRadius:"var(--ds-border-radius-full)"}}),e.jsxs(s,{"data-size":"xs",style:{marginTop:"var(--ds-spacing-1)",textAlign:"center",color:d<=r?"var(--ds-color-accent-text-default)":"var(--ds-color-neutral-text-subtle)"},children:["Step ",d]})]},d))}),e.jsxs("div",{style:{minHeight:"200px",marginBottom:"var(--ds-spacing-6)"},children:[r===1&&e.jsxs("div",{children:[e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Step 1: Basic Information"}),e.jsx(o,{label:"Name"})]}),r===2&&e.jsxs("div",{children:[e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Step 2: Contact Details"}),e.jsx(o,{label:"Email",type:"email"})]}),r===3&&e.jsxs("div",{children:[e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Step 3: Confirmation"}),e.jsx(s,{children:"Review and confirm your information"})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx(l,{"data-variant":"tertiary",onClick:()=>i(Math.max(1,r-1)),disabled:r===1,children:"Previous"}),e.jsx(l,{"data-variant":"primary",onClick:()=>i(Math.min(n,r+1)),disabled:r===n,children:r===n?"Complete":"Next"})]})]})}},m={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t,{style:{padding:"var(--ds-spacing-8)",textAlign:"center"},children:[e.jsx(ae,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-neutral-text-subtle)"}}),e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:"No items yet"}),e.jsx(s,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:"Get started by creating your first item"}),e.jsx(l,{"data-variant":"primary",children:"Create Item"})]}),e.jsxs(t,{style:{padding:"var(--ds-spacing-8)",textAlign:"center"},children:[e.jsx(re,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-neutral-text-subtle)"}}),e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:"No results found"}),e.jsx(s,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:"Try adjusting your search or filters"}),e.jsx(l,{"data-variant":"secondary",children:"Clear Filters"})]}),e.jsxs(t,{style:{padding:"var(--ds-spacing-8)",textAlign:"center"},children:[e.jsx(se,{size:48,style:{marginBottom:"var(--ds-spacing-4)",margin:"0 auto",color:"var(--ds-color-warning-base-default)"}}),e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:"Something went wrong"}),e.jsx(s,{style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:"We couldn't load the content"}),e.jsx(l,{"data-variant":"secondary",children:"Try Again"})]})]})},v={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-success-surface-default)",borderLeft:"4px solid var(--ds-color-success-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{color:"var(--ds-color-success-text-default)",marginBottom:"var(--ds-spacing-2)"},children:"✓ Success"}),e.jsx(s,{style:{color:"var(--ds-color-success-text-default)"},children:"Your changes have been saved successfully"})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-warning-surface-default)",borderLeft:"4px solid var(--ds-color-warning-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{color:"var(--ds-color-warning-text-default)",marginBottom:"var(--ds-spacing-2)"},children:"⚠ Warning"}),e.jsx(s,{style:{color:"var(--ds-color-warning-text-default)"},children:"Your session will expire in 5 minutes"})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-danger-surface-default)",borderLeft:"4px solid var(--ds-color-danger-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)",marginBottom:"var(--ds-spacing-2)"},children:"✕ Error"}),e.jsx(s,{style:{color:"var(--ds-color-danger-text-default)"},children:"Failed to save changes. Please try again"})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderLeft:"4px solid var(--ds-color-info-border-default)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{color:"var(--ds-color-info-text-default)",marginBottom:"var(--ds-spacing-2)"},children:"ℹ Information"}),e.jsx(s,{style:{color:"var(--ds-color-info-text-default)"},children:"Scheduled maintenance on Saturday 02:00-04:00"})]})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:[e.jsxs(t,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:"Button Loading"}),e.jsxs(l,{"data-variant":"primary",disabled:!0,children:[e.jsx("span",{style:{marginRight:"var(--ds-spacing-2)"},children:"⏳"}),"Saving..."]})]}),e.jsxs(t,{style:{padding:"var(--ds-spacing-6)",textAlign:"center"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:"Spinner"}),e.jsx("div",{style:{width:"40px",height:"40px",border:"4px solid var(--ds-color-neutral-border-subtle)",borderTop:"4px solid var(--ds-color-accent-base-default)",borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto"}}),e.jsx("style",{children:"@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"})]}),e.jsxs(t,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(a,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:"Skeleton"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[100,80,90].map((r,i)=>e.jsx("div",{style:{height:"16px",width:`${r}%`,backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",animation:"pulse 1.5s ease-in-out infinite"}},i))}),e.jsx("style",{children:"@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }"})]})]})},y={render:()=>e.jsxs(t,{style:{padding:"var(--ds-spacing-8)"},children:[e.jsx(a,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Design Patterns Summary"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[{title:"Form Patterns",patterns:["Mark optional fields, not required","Validate on blur, not on change","Show errors after user interaction","Provide clear error messages"]},{title:"Feedback Patterns",patterns:["Use semantic colors (success, warning, error, info)","Provide loading states for async operations","Show empty states with helpful guidance","Use consistent notification styles"]},{title:"Navigation Patterns",patterns:["Show progress in multi-step flows","Provide clear back/next navigation","Indicate current location","Enable keyboard navigation"]}].map(({title:r,patterns:i})=>e.jsxs("div",{children:[e.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:r}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:i.map((n,d)=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:d<i.length-1?"var(--ds-spacing-2)":0},children:[e.jsx("span",{style:{color:"var(--ds-color-success-text-default)"},children:"✓"}),e.jsx(s,{"data-size":"sm",children:n})]},d))})]},r))})]})};var f,h,b,j,B;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
          ❌ Wrong Pattern
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Textfield label="Name *" required />
          <Textfield label="Email *" type="email" required />
          <Textfield label="Phone" type="tel" />
        </div>
        <Paragraph data-size="sm" style={{
        marginTop: 'var(--ds-spacing-4)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Asterisks create visual clutter
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
          ✅ Correct Pattern
        </Heading>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Textfield label="Name" required />
          <Textfield label="Email" type="email" required />
          <Textfield label="Phone (optional)" type="tel" />
        </div>
        <Paragraph data-size="sm" style={{
        marginTop: 'var(--ds-spacing-4)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Mark only optional fields
        </Paragraph>
      </Card>
    </div>
}`,...(b=(h=c.parameters)==null?void 0:h.docs)==null?void 0:b.source},description:{story:`Pattern 1: Required vs Optional Fields

Mark optional fields, not required ones`,...(B=(j=c.parameters)==null?void 0:j.docs)==null?void 0:B.description}}};var P,S,C,z,k;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState(false);
    const error = touched && !email.includes('@') ? 'Please enter a valid email' : undefined;
    return <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          User-Triggered Validation
        </Heading>
        <Paragraph style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Error appears only after you leave the field (onBlur)
        </Paragraph>

        <Textfield label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(true)} error={error} />

        <div style={{
        marginTop: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-sm)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-info-text-default)'
        }}>
            <strong>Pattern:</strong> Validate onBlur, not onChange
          </Paragraph>
        </div>
      </Card>;
  }
}`,...(C=(S=p.parameters)==null?void 0:S.docs)==null?void 0:C.source},description:{story:`Pattern 2: User-Triggered Validation

Show errors after user interaction, not on load`,...(k=(z=p.parameters)==null?void 0:z.docs)==null?void 0:k.description}}};var w,H,T,R,E;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    return <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
        <Heading level={3} data-size="md" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          Multi-Step Wizard
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
                Step {num}
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
                Step 1: Basic Information
              </Heading>
              <Textfield label="Name" />
            </div>}
          {step === 2 && <div>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                Step 2: Contact Details
              </Heading>
              <Textfield label="Email" type="email" />
            </div>}
          {step === 3 && <div>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                Step 3: Confirmation
              </Heading>
              <Paragraph>Review and confirm your information</Paragraph>
            </div>}
        </div>

        {/* Navigation */}
        <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
          <Button data-variant="tertiary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
            Previous
          </Button>
          <Button data-variant="primary" onClick={() => setStep(Math.min(totalSteps, step + 1))} disabled={step === totalSteps}>
            {step === totalSteps ? 'Complete' : 'Next'}
          </Button>
        </div>
      </Card>;
  }
}`,...(T=(H=g.parameters)==null?void 0:H.docs)==null?void 0:T.source},description:{story:`Pattern 3: Multi-Step Wizard

Clear progress indication and navigation`,...(E=(R=g.parameters)==null?void 0:R.docs)==null?void 0:E.description}}};var N,W,D,A,q;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div style={{
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
          No items yet
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-neutral-text-subtle)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          Get started by creating your first item
        </Paragraph>
        <Button data-variant="primary">Create Item</Button>
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
          No results found
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-neutral-text-subtle)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          Try adjusting your search or filters
        </Paragraph>
        <Button data-variant="secondary">Clear Filters</Button>
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
          Something went wrong
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-neutral-text-subtle)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          We couldn't load the content
        </Paragraph>
        <Button data-variant="secondary">Try Again</Button>
      </Card>
    </div>
}`,...(D=(W=m.parameters)==null?void 0:W.docs)==null?void 0:D.source},description:{story:`Pattern 4: Empty State

Helpful guidance when no content exists`,...(q=(A=m.parameters)==null?void 0:A.docs)==null?void 0:q.description}}};var M,F,L,I,V;v.parameters={...v.parameters,docs:{...(M=v.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
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
          ✓ Success
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-success-text-default)'
      }}>
          Your changes have been saved successfully
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
          ⚠ Warning
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-warning-text-default)'
      }}>
          Your session will expire in 5 minutes
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
          ✕ Error
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-danger-text-default)'
      }}>
          Failed to save changes. Please try again
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
          ℹ Information
        </Heading>
        <Paragraph style={{
        color: 'var(--ds-color-info-text-default)'
      }}>
          Scheduled maintenance on Saturday 02:00-04:00
        </Paragraph>
      </div>
    </div>
}`,...(L=(F=v.parameters)==null?void 0:F.docs)==null?void 0:L.source},description:{story:`Pattern 5: Notification Types

Consistent feedback for different scenarios`,...(V=(I=v.parameters)==null?void 0:I.docs)==null?void 0:V.description}}};var U,O,Y,G,_;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
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
          Button Loading
        </Heading>
        <Button data-variant="primary" disabled>
          <span style={{
          marginRight: 'var(--ds-spacing-2)'
        }}>⏳</span>
          Saving...
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
          Spinner
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
          Skeleton
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
    </div>
}`,...(Y=(O=u.parameters)==null?void 0:O.docs)==null?void 0:Y.source},description:{story:`Pattern 6: Loading States

Clear feedback during async operations`,...(_=(G=u.parameters)==null?void 0:G.docs)==null?void 0:_.description}}};var $,J,K,Q,X;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Card style={{
    padding: 'var(--ds-spacing-8)'
  }}>
      <Heading level={2} data-size="lg" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Design Patterns Summary
      </Heading>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        {[{
        title: 'Form Patterns',
        patterns: ['Mark optional fields, not required', 'Validate on blur, not on change', 'Show errors after user interaction', 'Provide clear error messages']
      }, {
        title: 'Feedback Patterns',
        patterns: ['Use semantic colors (success, warning, error, info)', 'Provide loading states for async operations', 'Show empty states with helpful guidance', 'Use consistent notification styles']
      }, {
        title: 'Navigation Patterns',
        patterns: ['Show progress in multi-step flows', 'Provide clear back/next navigation', 'Indicate current location', 'Enable keyboard navigation']
      }].map(({
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
    </Card>
}`,...(K=(J=y.parameters)==null?void 0:J.docs)==null?void 0:K.source},description:{story:"Patterns Summary",...(X=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};const Pe=["RequiredOptionalFields","UserTriggeredValidation","MultiStepWizard","EmptyStatePattern","NotificationTypes","LoadingStates","Summary"];export{m as EmptyStatePattern,u as LoadingStates,g as MultiStepWizard,v as NotificationTypes,c as RequiredOptionalFields,y as Summary,p as UserTriggeredValidation,Pe as __namedExportsOrder,Be as default};
//# sourceMappingURL=Patterns.stories-XYx1xaTK.js.map
