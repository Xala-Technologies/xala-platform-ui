import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as c}from"./index-ClcD9ViR.js";import{u as x}from"./index-bjNF47ar.js";import{B as h,V as j,I as te}from"./icons-CYjUz1aN.js";import{H as i}from"./heading-mzc2R_Ff.js";import{P as t}from"./paragraph-DDCpJsVw.js";import{A as Y}from"./alert-BzTWXKSs.js";import{B as f}from"./button-B6PgazAq.js";import{C as Z}from"./index-D1XdeRjR.js";import{T as k}from"./textfield-BCKd4uLT.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";const je={title:"Pages/LoginPage",parameters:{layout:"fullscreen",docs:{description:{component:`
Login page components for Norwegian municipal services.

## Components
- **LoginLayout**: Main layout with branding and feature panel
- **LoginOption**: Individual authentication provider buttons
- **DemoLoginDialog**: Dialog for demo/test authentication

## Authentication Providers
- ID-porten (national identity portal)
- BankID (bank-verified identity)
- Vipps (mobile payment identity)
- Demo login (for testing)
        `}}},tags:["autodocs"]};function g({icon:l,title:o,description:s,onClick:r,disabled:a}){const[b,d]=c.useState(!1);return e.jsxs("button",{type:"button",onClick:r,disabled:a,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-4)",width:"100%",padding:"var(--ds-spacing-4)",backgroundColor:b?"var(--ds-color-neutral-surface-hover)":"var(--ds-color-neutral-background-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-md)",cursor:a?"not-allowed":"pointer",opacity:a?.6:1,transition:"all 0.2s ease",textAlign:"left"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-12)",height:"var(--ds-spacing-12)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"var(--ds-border-radius-md)",backgroundColor:"var(--ds-color-neutral-surface-hover)"},children:l}),e.jsxs("div",{style:{flex:1},children:[e.jsx(t,{"data-size":"md",style:{margin:0,fontWeight:"var(--ds-font-weight-semibold)"},children:o}),e.jsx(t,{"data-size":"sm",style:{margin:0,color:"var(--ds-color-neutral-text-subtle)"},children:s})]})]})}const p={render:function(){const o=x();return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"100vh"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",padding:"var(--ds-spacing-8)",backgroundColor:"var(--ds-color-neutral-background-default)"},children:[e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-8)"},children:[e.jsx(i,{level:1,"data-size":"lg",style:{margin:0,color:"var(--ds-color-accent-base-default)"},children:"DIGILIST"}),e.jsx(t,{"data-size":"sm",style:{margin:0,color:"var(--ds-color-neutral-text-subtle)",letterSpacing:"0.1em"},children:o("storybook.login.simpleBooking")})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",maxWidth:"400px"},children:[e.jsx(i,{level:2,"data-size":"md",style:{margin:"0 0 var(--ds-spacing-2) 0"},children:o("platform.auth.login")}),e.jsx(t,{"data-size":"sm",style:{margin:"0 0 var(--ds-spacing-6) 0",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.chooseLoginMethod")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(g,{icon:e.jsx(h,{size:32}),title:"BankID",description:o("storybook.login.bankIdDescription"),onClick:()=>console.log("BankID login")}),e.jsx(g,{icon:e.jsx(j,{size:32}),title:"Vipps",description:o("storybook.login.vippsDescription"),onClick:()=>console.log("Vipps login")}),e.jsx(g,{icon:e.jsx(te,{size:32}),title:"ID-porten",description:o("storybook.login.idPortenDescription"),onClick:()=>console.log("ID-porten login")})]})]}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",marginTop:"var(--ds-spacing-8)"},children:[e.jsx("a",{href:"#",style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.privacy")}),e.jsx("a",{href:"#",style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.terms")}),e.jsx("a",{href:"#",style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.help")})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",padding:"var(--ds-spacing-8)",backgroundColor:"var(--ds-color-accent-surface-default)"},children:e.jsxs("div",{style:{maxWidth:"500px"},children:[e.jsx(i,{level:2,"data-size":"lg",style:{margin:"0 0 var(--ds-spacing-2) 0",color:"var(--ds-color-accent-text-default)"},children:o("storybook.login.backoffice")}),e.jsx(t,{"data-size":"md",style:{margin:"0 0 var(--ds-spacing-6) 0",color:"var(--ds-color-accent-text-default)"},children:o("storybook.login.manageBookingsAndRentals")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[{titleKey:"storybook.login.featureBookingAdmin",descriptionKey:"storybook.login.featureBookingAdminDesc"},{titleKey:"storybook.login.featureRentalObjects",descriptionKey:"storybook.login.featureRentalObjectsDesc"},{titleKey:"storybook.login.featureReports",descriptionKey:"storybook.login.featureReportsDesc"},{titleKey:"storybook.login.featureUserManagement",descriptionKey:"storybook.login.featureUserManagementDesc"}].map((s,r)=>e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"var(--ds-spacing-3)"},children:[e.jsx("div",{style:{width:"var(--ds-spacing-2)",height:"var(--ds-spacing-2)",borderRadius:"var(--ds-border-radius-full)",backgroundColor:"var(--ds-color-accent-base-default)",marginTop:"var(--ds-spacing-2)",flexShrink:0}}),e.jsxs("div",{children:[e.jsx(t,{"data-size":"sm",style:{margin:0,fontWeight:"var(--ds-font-weight-semibold)",color:"var(--ds-color-accent-text-default)"},children:o(s.titleKey)}),e.jsx(t,{"data-size":"sm",style:{margin:0,color:"var(--ds-color-accent-text-subtle)"},children:o(s.descriptionKey)})]})]},r))}),e.jsxs("div",{style:{marginTop:"var(--ds-spacing-8)"},children:[e.jsx(t,{"data-size":"xs",style:{margin:"0 0 var(--ds-spacing-2) 0",color:"var(--ds-color-accent-text-subtle)",textTransform:"uppercase",letterSpacing:"0.1em"},children:o("storybook.login.integrations")}),e.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:["FEIDE","BankID","Vipps","ID-porten"].map(s=>e.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-neutral-surface-subtle)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-accent-text-default)"},children:s},s))})]})]})})]})}},m={render:function(){const o=x(),[s,r]=c.useState(!0),[a,b]=c.useState(""),[d,$]=c.useState(""),[I,ee]=c.useState(""),[D,z]=c.useState(!1),oe=async()=>{z(!0),await new Promise(n=>setTimeout(n,1500)),z(!1),r(!1),console.log("Demo login:",{name:a,email:d,token:I})};return s?e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"var(--ds-color-neutral-background-backdrop)"},children:e.jsxs(Z,{style:{width:"100%",maxWidth:"420px",padding:"var(--ds-spacing-6)"},children:[e.jsx(i,{level:2,"data-size":"md",style:{margin:"0 0 var(--ds-spacing-2) 0"},children:o("storybook.login.demoLogin")}),e.jsx(t,{"data-size":"sm",style:{margin:"0 0 var(--ds-spacing-4) 0",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.demoLoginDescription")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-1)",fontSize:"var(--ds-font-size-sm)",fontWeight:"var(--ds-font-weight-medium)"},children:o("platform.common.name")}),e.jsx(k,{value:a,onChange:n=>b(n.target.value),placeholder:o("storybook.login.namePlaceholder")})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-1)",fontSize:"var(--ds-font-size-sm)",fontWeight:"var(--ds-font-weight-medium)"},children:o("platform.common.email")}),e.jsx(k,{type:"email",value:d,onChange:n=>$(n.target.value),placeholder:o("storybook.login.emailPlaceholder")})]}),e.jsxs("div",{children:[e.jsx("label",{style:{display:"block",marginBottom:"var(--ds-spacing-1)",fontSize:"var(--ds-font-size-sm)",fontWeight:"var(--ds-font-weight-medium)"},children:o("storybook.login.demoToken")}),e.jsx(k,{value:I,onChange:n=>ee(n.target.value),placeholder:o("storybook.login.demoTokenPlaceholder")}),e.jsx(t,{"data-size":"xs",style:{margin:"var(--ds-spacing-1) 0 0 0",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.demoTokenHint")})]})]}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",marginTop:"var(--ds-spacing-6)"},children:[e.jsx(f,{variant:"secondary",onClick:()=>r(!1),style:{flex:1},children:o("platform.common.cancel")}),e.jsx(f,{variant:"primary",onClick:oe,disabled:D||!a||!d,style:{flex:1},children:o(D?"storybook.login.loggingIn":"platform.auth.login")})]})]})}):e.jsxs("div",{style:{padding:"var(--ds-spacing-6)",textAlign:"center"},children:[e.jsx(Y,{"data-color":"success",children:e.jsxs(t,{style:{margin:0},children:[o("storybook.login.demoLoginCompleted")," ",e.jsx("strong",{children:a})]})}),e.jsx(f,{style:{marginTop:"var(--ds-spacing-4)"},onClick:()=>r(!0),children:o("storybook.login.showDialogAgain")})]})}},v={render:function(){const o=x();return e.jsxs("div",{style:{maxWidth:"var(--ds-sizing-94)",margin:"0 auto",minHeight:"100vh",backgroundColor:"var(--ds-color-neutral-background-default)"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-6)",textAlign:"center",backgroundColor:"var(--ds-color-accent-surface-default)"},children:[e.jsx(i,{level:1,"data-size":"md",style:{margin:0,color:"var(--ds-color-accent-base-default)"},children:"DIGILIST"}),e.jsx(t,{"data-size":"xs",style:{margin:0,color:"var(--ds-color-accent-text-subtle)",letterSpacing:"0.1em"},children:o("storybook.login.simpleBooking")})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(i,{level:2,"data-size":"sm",style:{margin:"0 0 var(--ds-spacing-4) 0"},children:o("platform.auth.login")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(g,{icon:e.jsx(h,{size:28}),title:"BankID",description:o("storybook.login.mobileOrCodeDevice"),onClick:()=>console.log("BankID")}),e.jsx(g,{icon:e.jsx(j,{size:28}),title:"Vipps",description:o("storybook.login.loginWithVipps"),onClick:()=>console.log("Vipps")})]})]})]})},parameters:{viewport:{defaultViewport:"mobile1"}}},u={render:function(){const o=x();return e.jsxs("div",{style:{maxWidth:"400px",margin:"0 auto",padding:"var(--ds-spacing-6)"},children:[e.jsx(i,{level:2,"data-size":"md",style:{margin:"0 0 var(--ds-spacing-4) 0"},children:o("platform.auth.login")}),e.jsx(Y,{"data-color":"danger",style:{marginBottom:"var(--ds-spacing-4)"},children:e.jsxs(t,{style:{margin:0},children:[e.jsx("strong",{children:o("storybook.login.loginFailed")}),e.jsx("br",{}),o("storybook.login.sessionExpired")]})}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:e.jsx(g,{icon:e.jsx(h,{size:28}),title:"BankID",description:o("storybook.login.tryAgainWithBankId"),onClick:()=>console.log("Retry BankID")})})]})}},y={render:function(){const o=x();return e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-background-subtle)"},children:e.jsxs(Z,{style:{width:"100%",maxWidth:"400px",padding:"var(--ds-spacing-6)",textAlign:"center"},children:[e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:[e.jsx(i,{level:1,"data-size":"md",style:{margin:0,color:"var(--ds-color-accent-base-default)"},children:"DIGILIST"}),e.jsx(t,{"data-size":"sm",style:{margin:"var(--ds-spacing-2) 0 0 0",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.loginToBook")})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs(f,{variant:"primary","data-size":"lg",style:{width:"100%"},children:[e.jsx(h,{size:20}),o("storybook.login.loginWithBankId")]}),e.jsxs(f,{variant:"secondary","data-size":"lg",style:{width:"100%"},children:[e.jsx(j,{size:20}),o("storybook.login.loginWithVipps")]})]}),e.jsx(t,{"data-size":"xs",style:{margin:"var(--ds-spacing-4) 0 0 0",color:"var(--ds-color-neutral-text-subtle)"},children:o("storybook.login.termsAgreement")})]})})}};var C,B,L,P,S;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '100vh'
    }}>
        {/* Left Panel - Login Options */}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--ds-spacing-8)',
        backgroundColor: 'var(--ds-color-neutral-background-default)'
      }}>
          {/* Logo and Branding */}
          <div style={{
          marginBottom: 'var(--ds-spacing-8)'
        }}>
            <Heading level={1} data-size="lg" style={{
            margin: 0,
            color: 'var(--ds-color-accent-base-default)'
          }}>
              DIGILIST
            </Heading>
            <Paragraph data-size="sm" style={{
            margin: 0,
            color: 'var(--ds-color-neutral-text-subtle)',
            letterSpacing: '0.1em'
          }}>
              {t('storybook.login.simpleBooking')}
            </Paragraph>
          </div>

          {/* Login Form */}
          <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '400px'
        }}>
            <Heading level={2} data-size="md" style={{
            margin: '0 0 var(--ds-spacing-2) 0'
          }}>
              {t('platform.auth.login')}
            </Heading>
            <Paragraph data-size="sm" style={{
            margin: '0 0 var(--ds-spacing-6) 0',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.login.chooseLoginMethod')}
            </Paragraph>

            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-3)'
          }}>
              <LoginOptionDemo icon={<BankIdIcon size={32} />} title="BankID" description={t('storybook.login.bankIdDescription')} onClick={() => console.log('BankID login')} />
              <LoginOptionDemo icon={<VippsIcon size={32} />} title="Vipps" description={t('storybook.login.vippsDescription')} onClick={() => console.log('Vipps login')} />
              <LoginOptionDemo icon={<IdPortenIcon size={32} />} title="ID-porten" description={t('storybook.login.idPortenDescription')} onClick={() => console.log('ID-porten login')} />
            </div>
          </div>

          {/* Footer Links */}
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)',
          marginTop: 'var(--ds-spacing-8)'
        }}>
            <a href="#" style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.login.privacy')}
            </a>
            <a href="#" style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.login.terms')}
            </a>
            <a href="#" style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.login.help')}
            </a>
          </div>
        </div>

        {/* Right Panel - Feature Panel */}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'var(--ds-spacing-8)',
        backgroundColor: 'var(--ds-color-accent-surface-default)'
      }}>
          <div style={{
          maxWidth: '500px'
        }}>
            <Heading level={2} data-size="lg" style={{
            margin: '0 0 var(--ds-spacing-2) 0',
            color: 'var(--ds-color-accent-text-default)'
          }}>
              {t('storybook.login.backoffice')}
            </Heading>
            <Paragraph data-size="md" style={{
            margin: '0 0 var(--ds-spacing-6) 0',
            color: 'var(--ds-color-accent-text-default)'
          }}>
              {t('storybook.login.manageBookingsAndRentals')}
            </Paragraph>

            {/* Features List */}
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-4)'
          }}>
              {[{
              titleKey: 'storybook.login.featureBookingAdmin',
              descriptionKey: 'storybook.login.featureBookingAdminDesc'
            }, {
              titleKey: 'storybook.login.featureRentalObjects',
              descriptionKey: 'storybook.login.featureRentalObjectsDesc'
            }, {
              titleKey: 'storybook.login.featureReports',
              descriptionKey: 'storybook.login.featureReportsDesc'
            }, {
              titleKey: 'storybook.login.featureUserManagement',
              descriptionKey: 'storybook.login.featureUserManagementDesc'
            }].map((feature, i) => <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--ds-spacing-3)'
            }}>
                  <div style={{
                width: 'var(--ds-spacing-2)',
                height: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: 'var(--ds-color-accent-base-default)',
                marginTop: 'var(--ds-spacing-2)',
                flexShrink: 0
              }} />
                  <div>
                    <Paragraph data-size="sm" style={{
                  margin: 0,
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  color: 'var(--ds-color-accent-text-default)'
                }}>
                      {t(feature.titleKey)}
                    </Paragraph>
                    <Paragraph data-size="sm" style={{
                  margin: 0,
                  color: 'var(--ds-color-accent-text-subtle)'
                }}>
                      {t(feature.descriptionKey)}
                    </Paragraph>
                  </div>
                </div>)}
            </div>

            {/* Integrations */}
            <div style={{
            marginTop: 'var(--ds-spacing-8)'
          }}>
              <Paragraph data-size="xs" style={{
              margin: '0 0 var(--ds-spacing-2) 0',
              color: 'var(--ds-color-accent-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
                {t('storybook.login.integrations')}
              </Paragraph>
              <div style={{
              display: 'flex',
              gap: 'var(--ds-spacing-2)'
            }}>
                {['FEIDE', 'BankID', 'Vipps', 'ID-porten'].map(name => <span key={name} style={{
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-accent-text-default)'
              }}>
                    {name}
                  </span>)}
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}`,...(L=(B=p.parameters)==null?void 0:B.docs)==null?void 0:L.source},description:{story:"Default login page layout",...(S=(P=p.parameters)==null?void 0:P.docs)==null?void 0:S.description}}};var T,w,W,H,R;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      setIsOpen(false);
      console.log('Demo login:', {
        name,
        email,
        token
      });
    };
    if (!isOpen) {
      return <div style={{
        padding: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
          <Alert data-color="success">
            <Paragraph style={{
            margin: 0
          }}>
              {t('storybook.login.demoLoginCompleted')} <strong>{name}</strong>
            </Paragraph>
          </Alert>
          <Button style={{
          marginTop: 'var(--ds-spacing-4)'
        }} onClick={() => setIsOpen(true)}>
            {t('storybook.login.showDialogAgain')}
          </Button>
        </div>;
    }
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--ds-color-neutral-background-backdrop)'
    }}>
        <Card style={{
        width: '100%',
        maxWidth: '420px',
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={2} data-size="md" style={{
          margin: '0 0 var(--ds-spacing-2) 0'
        }}>
            {t('storybook.login.demoLogin')}
          </Heading>
          <Paragraph data-size="sm" style={{
          margin: '0 0 var(--ds-spacing-4) 0',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.login.demoLoginDescription')}
          </Paragraph>

          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)'
        }}>
            <div>
              <label style={{
              display: 'block',
              marginBottom: 'var(--ds-spacing-1)',
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 'var(--ds-font-weight-medium)'
            }}>
                {t('platform.common.name')}
              </label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder={t('storybook.login.namePlaceholder')} />
            </div>
            <div>
              <label style={{
              display: 'block',
              marginBottom: 'var(--ds-spacing-1)',
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 'var(--ds-font-weight-medium)'
            }}>
                {t('platform.common.email')}
              </label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('storybook.login.emailPlaceholder')} />
            </div>
            <div>
              <label style={{
              display: 'block',
              marginBottom: 'var(--ds-spacing-1)',
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 'var(--ds-font-weight-medium)'
            }}>
                {t('storybook.login.demoToken')}
              </label>
              <Input value={token} onChange={e => setToken(e.target.value)} placeholder={t('storybook.login.demoTokenPlaceholder')} />
              <Paragraph data-size="xs" style={{
              margin: 'var(--ds-spacing-1) 0 0 0',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                {t('storybook.login.demoTokenHint')}
              </Paragraph>
            </div>
          </div>

          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-3)',
          marginTop: 'var(--ds-spacing-6)'
        }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)} style={{
            flex: 1
          }}>
              {t('platform.common.cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={isLoading || !name || !email} style={{
            flex: 1
          }}>
              {isLoading ? t('storybook.login.loggingIn') : t('platform.auth.login')}
            </Button>
          </div>
        </Card>
      </div>;
  }
}`,...(W=(w=m.parameters)==null?void 0:w.docs)==null?void 0:W.source},description:{story:"Demo login dialog for testing",...(R=(H=m.parameters)==null?void 0:H.docs)==null?void 0:R.description}}};var A,O,V,K,E;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      maxWidth: 'var(--ds-sizing-94)',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: 'var(--ds-color-neutral-background-default)'
    }}>
        {/* Mobile Header */}
        <div style={{
        padding: 'var(--ds-spacing-6)',
        textAlign: 'center',
        backgroundColor: 'var(--ds-color-accent-surface-default)'
      }}>
          <Heading level={1} data-size="md" style={{
          margin: 0,
          color: 'var(--ds-color-accent-base-default)'
        }}>
            DIGILIST
          </Heading>
          <Paragraph data-size="xs" style={{
          margin: 0,
          color: 'var(--ds-color-accent-text-subtle)',
          letterSpacing: '0.1em'
        }}>
            {t('storybook.login.simpleBooking')}
          </Paragraph>
        </div>

        {/* Login Options */}
        <div style={{
        padding: 'var(--ds-spacing-6)'
      }}>
          <Heading level={2} data-size="sm" style={{
          margin: '0 0 var(--ds-spacing-4) 0'
        }}>
            {t('platform.auth.login')}
          </Heading>

          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <LoginOptionDemo icon={<BankIdIcon size={28} />} title="BankID" description={t('storybook.login.mobileOrCodeDevice')} onClick={() => console.log('BankID')} />
            <LoginOptionDemo icon={<VippsIcon size={28} />} title="Vipps" description={t('storybook.login.loginWithVipps')} onClick={() => console.log('Vipps')} />
          </div>
        </div>
      </div>;
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(V=(O=v.parameters)==null?void 0:O.docs)==null?void 0:V.source},description:{story:"Mobile responsive login",...(E=(K=v.parameters)==null?void 0:K.docs)==null?void 0:E.description}}};var M,F,G,N,U;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: 'var(--ds-spacing-6)'
    }}>
        <Heading level={2} data-size="md" style={{
        margin: '0 0 var(--ds-spacing-4) 0'
      }}>
          {t('platform.auth.login')}
        </Heading>

        <Alert data-color="danger" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          <Paragraph style={{
          margin: 0
        }}>
            <strong>{t('storybook.login.loginFailed')}</strong>
            <br />
            {t('storybook.login.sessionExpired')}
          </Paragraph>
        </Alert>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)'
      }}>
          <LoginOptionDemo icon={<BankIdIcon size={28} />} title="BankID" description={t('storybook.login.tryAgainWithBankId')} onClick={() => console.log('Retry BankID')} />
        </div>
      </div>;
  }
}`,...(G=(F=u.parameters)==null?void 0:F.docs)==null?void 0:G.source},description:{story:"Login page with error state",...(U=(N=u.parameters)==null?void 0:N.docs)==null?void 0:U.description}}};var _,q,J,Q,X;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--ds-spacing-6)',
      backgroundColor: 'var(--ds-color-neutral-background-subtle)'
    }}>
        <Card style={{
        width: '100%',
        maxWidth: '400px',
        padding: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
          <div style={{
          marginBottom: 'var(--ds-spacing-6)'
        }}>
            <Heading level={1} data-size="md" style={{
            margin: 0,
            color: 'var(--ds-color-accent-base-default)'
          }}>
              DIGILIST
            </Heading>
            <Paragraph data-size="sm" style={{
            margin: 'var(--ds-spacing-2) 0 0 0',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.login.loginToBook')}
            </Paragraph>
          </div>

          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
            <Button variant="primary" data-size="lg" style={{
            width: '100%'
          }}>
              <BankIdIcon size={20} />
              {t('storybook.login.loginWithBankId')}
            </Button>
            <Button variant="secondary" data-size="lg" style={{
            width: '100%'
          }}>
              <VippsIcon size={20} />
              {t('storybook.login.loginWithVipps')}
            </Button>
          </div>

          <Paragraph data-size="xs" style={{
          margin: 'var(--ds-spacing-4) 0 0 0',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
            {t('storybook.login.termsAgreement')}
          </Paragraph>
        </Card>
      </div>;
  }
}`,...(J=(q=y.parameters)==null?void 0:q.docs)==null?void 0:J.source},description:{story:"Minimal login for public web",...(X=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};const Ie=["Default","DemoLoginDialog","MobileView","WithError","PublicWebLogin"];export{p as Default,m as DemoLoginDialog,v as MobileView,y as PublicWebLogin,u as WithError,Ie as __namedExportsOrder,je as default};
//# sourceMappingURL=LoginPage.stories-CKq8aQty.js.map
