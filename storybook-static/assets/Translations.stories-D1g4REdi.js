import{j as a}from"./jsx-runtime-BYYWji4R.js";import{a as la,u as l}from"./index-bjNF47ar.js";import{S as j}from"./stack-MAf_EoFq.js";import{C as d}from"./index-D1XdeRjR.js";import{H as o}from"./heading-mzc2R_Ff.js";import{T as ca}from"./tag-DS5F5fAT.js";import{P as s}from"./paragraph-DDCpJsVw.js";import{B as n}from"./button-B6PgazAq.js";import{A as y}from"./alert-BzTWXKSs.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./utils-Dlkq94hl.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";const Ca={title:"Fundamentals/Translations",parameters:{docs:{description:{component:`
## Translation Support in Storybook

The StoryProvider integrates translations via \`@xala-technologies/i18n\` and \`@xala-technologies/i18n-platform\`.

### How It Works

1. **StoryProvider** wraps all stories and provides both I18nProvider and DesignsystemetProvider
2. Use the **locale toolbar** (globe icon) to switch between languages
3. Components can use \`useT()\` hook to access translations
4. RTL layout is automatically applied for Arabic locale

### Available Locales

- **nb** - Norwegian Bokmal (default)
- **en** - English
- **ar** - Arabic (RTL) - falls back to English translations

### Translation Patterns

**Pattern 1: Props-Based (Recommended)**
\`\`\`tsx
// Container translates, passes string to UI component
function MyContainer() {
  const t = useT();
  return <MyButton label={t('platform.common.save')} />;
}
\`\`\`

**Pattern 2: Hook-Based**
\`\`\`tsx
// Component translates internally
function StatusBadge({ status }: { status: string }) {
  const t = useT();
  return <Badge>{t(\`platform.status.\${status}\`)}</Badge>;
}
\`\`\`

### Available Translation Keys

From \`@xala-technologies/i18n-platform\`:

- \`platform.common.*\` - save, cancel, delete, edit, search, loading...
- \`platform.auth.*\` - login, logout, password...
- \`platform.validation.*\` - required, minLength, email...
- \`platform.errors.*\` - notFound, forbidden, serverError...
- \`platform.status.*\` - active, pending, completed...
- \`platform.nav.*\` - home, dashboard, settings...
        `}}},tags:["autodocs"]},p={render:function(){const{locale:e}=la(),r=l(),t=r("platform.common.save"),i=r("platform.nav.dashboard"),m=r("platform.status.active");return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Current Locale Information"}),a.jsxs(j,{gap:"4",children:[a.jsxs("div",{children:[a.jsxs(s,{"data-size":"sm",children:[a.jsx("strong",{children:"Active Locale:"})," ",e]}),a.jsxs(s,{"data-size":"sm",children:[a.jsx("strong",{children:"Direction:"})," ",e==="ar"?"RTL":"LTR"]})]}),a.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[a.jsx(o,{level:3,"data-size":"xs",children:"Translation Test"}),a.jsxs(s,{"data-size":"sm",children:[a.jsx("code",{children:"platform.common.save"})," → ",a.jsx("strong",{children:t}),e==="nb"&&t==="Lagre"&&" ✓",e==="en"&&t==="Save"&&" ✓"]}),a.jsxs(s,{"data-size":"sm",children:[a.jsx("code",{children:"platform.nav.dashboard"})," → ",a.jsx("strong",{children:i}),e==="nb"&&i==="Dashbord"&&" ✓",e==="en"&&i==="Dashboard"&&" ✓"]}),a.jsxs(s,{"data-size":"sm",children:[a.jsx("code",{children:"platform.status.active"})," → ",a.jsx("strong",{children:m}),e==="nb"&&m==="Aktiv"&&" ✓",e==="en"&&m==="Active"&&" ✓"]})]}),a.jsx(y,{"data-color":"info",children:a.jsx(s,{"data-size":"sm",children:"Use the locale toolbar (globe icon) to switch between nb, en, and ar."})})]})]})}},u={render:function(){const e=l();return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Common Actions"}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",flexWrap:"wrap"},children:[a.jsx(n,{"data-color":"accent",children:e("platform.common.save")}),a.jsx(n,{"data-color":"neutral",variant:"secondary",children:e("platform.common.cancel")}),a.jsx(n,{"data-color":"danger",variant:"secondary",children:e("platform.common.delete")}),a.jsx(n,{"data-color":"neutral",variant:"secondary",children:e("platform.common.edit")}),a.jsx(n,{"data-color":"neutral",variant:"secondary",children:e("platform.common.search")})]})]})}},g={render:function(){const e=l(),r=["active","pending","completed","cancelled"];return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Status Labels"}),a.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:r.map(t=>a.jsx(ca,{"data-color":t==="active"?"success":t==="pending"?"warning":t==="completed"?"info":"danger",children:e(`platform.status.${t}`)},t))})]})}},v={render:function(){const e=l(),r=["home","dashboard","settings","profile"];return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Navigation Items"}),a.jsx(j,{gap:"2",children:r.map(t=>a.jsx("div",{style:{padding:"var(--ds-spacing-2) var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:a.jsx(s,{"data-size":"sm",children:e(`platform.nav.${t}`)})},t))})]})}},h={render:function(){const e=l(),r=["required","email","minLength","maxLength"];return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Validation Messages"}),a.jsx(j,{gap:"2",children:r.map(t=>a.jsx(y,{"data-color":"danger","data-size":"sm",children:a.jsx(s,{"data-size":"sm",children:e(`platform.validation.${t}`)})},t))})]})}},f={render:function(){const e=l(),r={saveLabel:e("platform.common.save"),cancelLabel:e("platform.common.cancel"),title:e("platform.common.edit")},t=({saveLabel:i,cancelLabel:m})=>a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[a.jsx(n,{"data-color":"accent",children:i}),a.jsx(n,{"data-color":"neutral",variant:"secondary",children:m})]});return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Props-Based Pattern"}),a.jsx(s,{"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:"The container translates, child components receive strings as props."}),a.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:[a.jsx(o,{level:3,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-3)"},children:r.title}),a.jsx(t,{saveLabel:r.saveLabel,cancelLabel:r.cancelLabel})]}),a.jsx(y,{"data-color":"info",style:{marginTop:"var(--ds-spacing-4)"},children:a.jsx(s,{"data-size":"sm",children:"This pattern keeps UI components pure - they just render what they receive."})})]})}},x={render:function(){const e=l(),r=["notFound","forbidden","serverError","networkError"];return a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:2,"data-size":"sm",children:"Error Messages"}),a.jsx(j,{gap:"3",children:r.map(t=>a.jsxs(y,{"data-color":"danger",children:[a.jsx(o,{level:3,"data-size":"xs",children:t}),a.jsx(s,{"data-size":"sm",children:e(`platform.errors.${t}`)})]},t))})]})}},b={render:function(){const{locale:e}=la(),r=l();return a.jsxs(j,{gap:"4",children:[a.jsxs(d,{"data-color":"accent",children:[a.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[a.jsx(o,{level:2,"data-size":"sm",children:r("platform.nav.dashboard")}),a.jsx(ca,{"data-color":"success",children:r("platform.status.active")})]}),a.jsxs(s,{"data-size":"sm",children:["Locale: ",a.jsx("strong",{children:e})," | Direction:"," ",a.jsx("strong",{children:e==="ar"?"RTL":"LTR"})]})]}),a.jsxs(d,{"data-color":"neutral",children:[a.jsx(o,{level:3,"data-size":"xs",children:r("platform.common.actions")}),a.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:[a.jsx(n,{"data-color":"accent",children:r("platform.common.save")}),a.jsx(n,{"data-color":"neutral",variant:"secondary",children:r("platform.common.cancel")}),a.jsx(n,{"data-color":"danger",variant:"secondary",children:r("platform.common.delete")})]})]}),a.jsx(y,{"data-color":"success",children:a.jsxs(s,{"data-size":"sm",children:[r("platform.common.loading")," - ",r("platform.status.completed")]})})]})}};var T,z,L,P,C;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function Render() {
    const {
      locale
    } = useLocale();
    const t = useT();

    // Test translations
    const saveTranslation = t('platform.common.save');
    const dashboardTranslation = t('platform.nav.dashboard');
    const activeTranslation = t('platform.status.active');
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Current Locale Information
        </Heading>
        <Stack gap="4">
          <div>
            <Paragraph data-size="sm">
              <strong>Active Locale:</strong> {locale}
            </Paragraph>
            <Paragraph data-size="sm">
              <strong>Direction:</strong> {locale === 'ar' ? 'RTL' : 'LTR'}
            </Paragraph>
          </div>

          <div style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
            <Heading level={3} data-size="xs">
              Translation Test
            </Heading>
            <Paragraph data-size="sm">
              <code>platform.common.save</code> → <strong>{saveTranslation}</strong>
              {locale === 'nb' && saveTranslation === 'Lagre' && ' ✓'}
              {locale === 'en' && saveTranslation === 'Save' && ' ✓'}
            </Paragraph>
            <Paragraph data-size="sm">
              <code>platform.nav.dashboard</code> → <strong>{dashboardTranslation}</strong>
              {locale === 'nb' && dashboardTranslation === 'Dashbord' && ' ✓'}
              {locale === 'en' && dashboardTranslation === 'Dashboard' && ' ✓'}
            </Paragraph>
            <Paragraph data-size="sm">
              <code>platform.status.active</code> → <strong>{activeTranslation}</strong>
              {locale === 'nb' && activeTranslation === 'Aktiv' && ' ✓'}
              {locale === 'en' && activeTranslation === 'Active' && ' ✓'}
            </Paragraph>
          </div>

          <Alert data-color="info">
            <Paragraph data-size="sm">
              Use the locale toolbar (globe icon) to switch between nb, en, and ar.
            </Paragraph>
          </Alert>
        </Stack>
      </Card>;
  }
}`,...(L=(z=p.parameters)==null?void 0:z.docs)==null?void 0:L.source},description:{story:`Shows the current locale and demonstrates basic translation usage.
Switch the locale in the toolbar to see the translations change.`,...(C=(P=p.parameters)==null?void 0:P.docs)==null?void 0:C.description}}};var B,w,S,R,k;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Common Actions
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        flexWrap: 'wrap'
      }}>
          <Button data-color="accent">{t('platform.common.save')}</Button>
          <Button data-color="neutral" variant="secondary">
            {t('platform.common.cancel')}
          </Button>
          <Button data-color="danger" variant="secondary">
            {t('platform.common.delete')}
          </Button>
          <Button data-color="neutral" variant="secondary">
            {t('platform.common.edit')}
          </Button>
          <Button data-color="neutral" variant="secondary">
            {t('platform.common.search')}
          </Button>
        </div>
      </Card>;
  }
}`,...(S=(w=u.parameters)==null?void 0:w.docs)==null?void 0:S.source},description:{story:"Demonstrates common action buttons with translated labels.",...(k=(R=u.parameters)==null?void 0:R.docs)==null?void 0:k.description}}};var H,A,I,E,D;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const statuses = ['active', 'pending', 'completed', 'cancelled'] as const;
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Status Labels
        </Heading>
        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        flexWrap: 'wrap'
      }}>
          {statuses.map(status => <Tag key={status} data-color={status === 'active' ? 'success' : status === 'pending' ? 'warning' : status === 'completed' ? 'info' : 'danger'}>
              {t(\`platform.status.\${status}\`)}
            </Tag>)}
        </div>
      </Card>;
  }
}`,...(I=(A=g.parameters)==null?void 0:A.docs)==null?void 0:I.source},description:{story:"Shows status badges with translated status labels.",...(D=(E=g.parameters)==null?void 0:E.docs)==null?void 0:D.description}}};var M,$,F,U,W;v.parameters={...v.parameters,docs:{...(M=v.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const navItems = ['home', 'dashboard', 'settings', 'profile'] as const;
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Navigation Items
        </Heading>
        <Stack gap="2">
          {navItems.map(item => <div key={item} style={{
          padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)'
        }}>
              <Paragraph data-size="sm">{t(\`platform.nav.\${item}\`)}</Paragraph>
            </div>)}
        </Stack>
      </Card>;
  }
}`,...(F=($=v.parameters)==null?void 0:$.docs)==null?void 0:F.source},description:{story:"Shows navigation items with translated labels.",...(W=(U=v.parameters)==null?void 0:U.docs)==null?void 0:W.description}}};var N,V,q,_,K;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const validations = ['required', 'email', 'minLength', 'maxLength'] as const;
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Validation Messages
        </Heading>
        <Stack gap="2">
          {validations.map(validation => <Alert key={validation} data-color="danger" data-size="sm">
              <Paragraph data-size="sm">{t(\`platform.validation.\${validation}\`)}</Paragraph>
            </Alert>)}
        </Stack>
      </Card>;
  }
}`,...(q=(V=h.parameters)==null?void 0:V.docs)==null?void 0:q.source},description:{story:"Shows validation messages with translated text.",...(K=(_=h.parameters)==null?void 0:_.docs)==null?void 0:K.description}}};var O,G,J,Q,X;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();

    // This simulates a "container" that translates
    // In real apps, this would be a parent component or page
    const translatedProps = {
      saveLabel: t('platform.common.save'),
      cancelLabel: t('platform.common.cancel'),
      title: t('platform.common.edit')
    };

    // UI Component receives pre-translated strings
    const FormActions = ({
      saveLabel,
      cancelLabel
    }: {
      saveLabel: string;
      cancelLabel: string;
    }) => <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-2)'
    }}>
        <Button data-color="accent">{saveLabel}</Button>
        <Button data-color="neutral" variant="secondary">
          {cancelLabel}
        </Button>
      </div>;
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Props-Based Pattern
        </Heading>
        <Paragraph data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          The container translates, child components receive strings as props.
        </Paragraph>

        <div style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Heading level={3} data-size="xs" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            {translatedProps.title}
          </Heading>
          <FormActions saveLabel={translatedProps.saveLabel} cancelLabel={translatedProps.cancelLabel} />
        </div>

        <Alert data-color="info" style={{
        marginTop: 'var(--ds-spacing-4)'
      }}>
          <Paragraph data-size="sm">
            This pattern keeps UI components pure - they just render what they receive.
          </Paragraph>
        </Alert>
      </Card>;
  }
}`,...(J=(G=f.parameters)==null?void 0:G.docs)==null?void 0:J.source},description:{story:`Demonstrates the props-based translation pattern where
a container component translates and passes strings to children.`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};var Y,Z,aa,ea,ra;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const errors = ['notFound', 'forbidden', 'serverError', 'networkError'] as const;
    return <Card data-color="neutral">
        <Heading level={2} data-size="sm">
          Error Messages
        </Heading>
        <Stack gap="3">
          {errors.map(error => <Alert key={error} data-color="danger">
              <Heading level={3} data-size="xs">
                {error}
              </Heading>
              <Paragraph data-size="sm">{t(\`platform.errors.\${error}\`)}</Paragraph>
            </Alert>)}
        </Stack>
      </Card>;
  }
}`,...(aa=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:aa.source},description:{story:"Shows error messages with translated text.",...(ra=(ea=x.parameters)==null?void 0:ea.docs)==null?void 0:ra.description}}};var ta,sa,oa,na,da;b.parameters={...b.parameters,docs:{...(ta=b.parameters)==null?void 0:ta.docs,source:{originalSource:`{
  render: function Render() {
    const {
      locale
    } = useLocale();
    const t = useT();
    return <Stack gap="4">
        <Card data-color="accent">
          <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <Heading level={2} data-size="sm">
              {t('platform.nav.dashboard')}
            </Heading>
            <Tag data-color="success">{t('platform.status.active')}</Tag>
          </div>
          <Paragraph data-size="sm">
            Locale: <strong>{locale}</strong> | Direction:{' '}
            <strong>{locale === 'ar' ? 'RTL' : 'LTR'}</strong>
          </Paragraph>
        </Card>

        <Card data-color="neutral">
          <Heading level={3} data-size="xs">
            {t('platform.common.actions')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          flexWrap: 'wrap'
        }}>
            <Button data-color="accent">{t('platform.common.save')}</Button>
            <Button data-color="neutral" variant="secondary">
              {t('platform.common.cancel')}
            </Button>
            <Button data-color="danger" variant="secondary">
              {t('platform.common.delete')}
            </Button>
          </div>
        </Card>

        <Alert data-color="success">
          <Paragraph data-size="sm">
            {t('platform.common.loading')} - {t('platform.status.completed')}
          </Paragraph>
        </Alert>
      </Stack>;
  }
}`,...(oa=(sa=b.parameters)==null?void 0:sa.docs)==null?void 0:oa.source},description:{story:"Complete example showing multiple translation types together.",...(da=(na=b.parameters)==null?void 0:na.docs)==null?void 0:da.description}}};const Ba=["LocaleDisplay","TranslatedButtons","StatusTranslations","NavigationLabels","ValidationMessages","PropsBasedPattern","ErrorMessages","CompleteExample"];export{b as CompleteExample,x as ErrorMessages,p as LocaleDisplay,v as NavigationLabels,f as PropsBasedPattern,g as StatusTranslations,u as TranslatedButtons,h as ValidationMessages,Ba as __namedExportsOrder,Ca as default};
//# sourceMappingURL=Translations.stories-D1g4REdi.js.map
