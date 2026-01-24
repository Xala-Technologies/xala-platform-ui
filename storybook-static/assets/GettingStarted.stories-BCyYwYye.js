import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as h}from"./index-ClcD9ViR.js";import{u as l}from"./index-bjNF47ar.js";import{C as de}from"./circle-check-big-N58AFyrx.js";import{c as le}from"./createLucideIcon-DXOARlW5.js";import{P as ce}from"./palette-CxSJKHIF.js";import{S as ge}from"./shield-B_O8GKm9.js";import{C as pe}from"./code-BBI_aUu7.js";import{H as o}from"./heading-mzc2R_Ff.js";import{C as d}from"./index-D1XdeRjR.js";import{B as k}from"./button-B6PgazAq.js";import{P as i}from"./paragraph-DDCpJsVw.js";import{T as me}from"./textfield-BCKd4uLT.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],ve=le("package",ue),We={title:"Overview/Getting Started",parameters:{docs:{description:{component:`
# Getting Started

Quick guide to start building with the Xala Platform Design System.

## Installation

\`\`\`bash
pnpm add @xala-technologies/platform
\`\`\`

## Setup

1. Import components
2. Configure theme
3. Add i18n
4. Start building

## First Steps

- Create your first component
- Use design tokens
- Follow accessibility guidelines
- Test in Storybook
        `}}},tags:["autodocs"]},g={render:()=>{const t=l(),r=[{step:1,titleKey:"storybook.gettingStarted.installPackage",command:"pnpm add @xala-technologies/platform",descriptionKey:"storybook.gettingStarted.installPackageDesc"},{step:2,titleKey:"storybook.gettingStarted.installPeerDeps",command:"pnpm add react react-dom",descriptionKey:"storybook.gettingStarted.installPeerDepsDesc"},{step:3,titleKey:"storybook.gettingStarted.importStyles",command:"import '@xala-technologies/platform/styles';",descriptionKey:"storybook.gettingStarted.importStylesDesc"}];return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.installation")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:r.map(({step:n,titleKey:a,command:s,descriptionKey:c})=>e.jsx(d,{style:{padding:"var(--ds-spacing-6)"},children:e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"flex-start"},children:[e.jsx("div",{style:{width:"40px",height:"40px",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",borderRadius:"var(--ds-border-radius-full)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"var(--ds-font-size-4)",fontWeight:600,flexShrink:0},children:n}),e.jsxs("div",{style:{flex:1},children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:t(a)}),e.jsx(i,{"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-neutral-text-subtle)"},children:t(c)}),e.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:s})]})]})},n))})]})}},p={render:()=>{const t=l();return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.setup")}),e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:[e.jsxs(o,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-3)"},children:["1. ",t("storybook.gettingStarted.configureTheme")]}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-sm)",marginBottom:"var(--ds-spacing-4)"},children:`import { ThemeProvider } from '@xala-technologies/platform/theme';

function App() {
  return (
    <ThemeProvider theme="digdir" colorScheme="auto">
      <YourApp />
    </ThemeProvider>
  );
}`})]}),e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-6)"},children:[e.jsxs(o,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-3)"},children:["2. ",t("storybook.gettingStarted.setupI18n")]}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-sm)",marginBottom:"var(--ds-spacing-4)"},children:`import { I18nProvider } from '@xala-technologies/platform/i18n';

function App() {
  return (
    <I18nProvider locale="nb">
      <YourApp />
    </I18nProvider>
  );
}`})]}),e.jsxs("div",{children:[e.jsxs(o,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-3)"},children:["3. ",t("storybook.gettingStarted.importComponents")]}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-sm)"},children:`import { Button, Card, Heading } from '../index';

export function MyComponent() {
  return (
    <Card>
      <Heading level={2}>Hello World</Heading>
      <Button data-variant="primary">Click me</Button>
    </Card>
  );
}`})]})]})}},m={render:()=>{const t=l();return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.yourFirstComponent")}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.gettingStarted.code")}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-xs)"},children:`import {
  Button,
  Card,
  Heading,
  Paragraph
} from '../index';
import { useTranslation } from '@xala-technologies/platform/i18n';

export function WelcomeCard() {
  const { t } = useTranslation();

  return (
    <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
      <Heading
        level={2}
        data-size="md"
        style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}
      >
        {t('welcome.title')}
      </Heading>

      <Paragraph
        style={{
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}
      >
        {t('welcome.description')}
      </Paragraph>

      <Button data-variant="primary">
        {t('common.getStarted')}
      </Button>
    </Card>
  );
}`})]}),e.jsxs("div",{children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.gettingStarted.preview")}),e.jsxs(d,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(o,{level:2,"data-size":"md",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.overview.welcome")}),e.jsx(i,{style:{marginBottom:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:t("storybook.overview.subtitle")}),e.jsx(k,{"data-variant":"primary",children:t("storybook.form.getStarted")})]})]})]}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(i,{"data-size":"sm",style:{color:"var(--ds-color-success-text-default)"},children:[e.jsxs("strong",{children:[t("storybook.gettingStarted.bestPractices"),":"]}),e.jsx("br",{}),"• ",t("storybook.gettingStarted.platformComponents"),e.jsx("br",{}),"• ",t("storybook.gettingStarted.designTokens"),e.jsx("br",{}),"• ",t("storybook.gettingStarted.i18nText"),e.jsx("br",{}),"• ",t("storybook.gettingStarted.semanticHtml"),e.jsx("br",{}),"• ",t("storybook.gettingStarted.accessibleProps")]})})]})}},u={render:()=>{const t=l(),r=[{titleKey:"storybook.gettingStarted.formValidation",code:`<Textfield
  label="Email"
  type="email"
  error={errors.email}
  required
/>`},{titleKey:"storybook.gettingStarted.loadingButton",code:`<Button
  data-variant="primary"
  disabled={loading}
>
  {loading ? 'Saving...' : 'Save'}
</Button>`},{titleKey:"storybook.gettingStarted.conditionalRendering",code:`{data ? (
  <DataTable data={data} />
) : (
  <EmptyState title="No data" />
)}`},{titleKey:"storybook.gettingStarted.errorHandling",code:`try {
  await sdk.users.create(data);
} catch (error) {
  showError(t('errors.saveFailed'));
}`}];return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.commonPatterns")}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:r.map(({titleKey:n,code:a})=>e.jsxs(d,{style:{padding:"var(--ds-spacing-5)"},children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t(n)}),e.jsx("pre",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:a})]},n))})]})}},v={render:()=>{const t=l(),[r,n]=h.useState("spacing"),a={spacing:[{token:"--ds-spacing-1",value:"4px",usageKey:"storybook.tokens.minimalGap"},{token:"--ds-spacing-2",value:"8px",usageKey:"storybook.tokens.smallSpacing"},{token:"--ds-spacing-4",value:"16px",usageKey:"storybook.tokens.defaultSpacing"},{token:"--ds-spacing-6",value:"24px",usageKey:"storybook.tokens.sectionSpacing"},{token:"--ds-spacing-8",value:"32px",usageKey:"storybook.tokens.largeSpacing"}],color:[{token:"--ds-color-accent-base-default",value:"#0066CC",usageKey:"storybook.tokens.primaryActions"},{token:"--ds-color-success-base-default",value:"#06A77D",usageKey:"storybook.tokens.successStates"},{token:"--ds-color-danger-base-default",value:"#E02E49",usageKey:"storybook.tokens.errorStates"},{token:"--ds-color-warning-base-default",value:"#FF9100",usageKey:"storybook.tokens.warningStates"},{token:"--ds-color-neutral-text-subtle",value:"#68707D",usageKey:"storybook.tokens.secondaryText"}],typography:[{token:"--ds-font-size-xs",value:"0.75rem",usageKey:"storybook.tokens.smallTextCaptions"},{token:"--ds-font-size-sm",value:"0.875rem",usageKey:"storybook.tokens.bodyTextSmall"},{token:"--ds-font-size-md",value:"1rem",usageKey:"storybook.tokens.bodyTextDefault"},{token:"--ds-font-size-lg",value:"1.125rem",usageKey:"storybook.tokens.emphasizedText"},{token:"--ds-font-size-xl",value:"1.5rem",usageKey:"storybook.tokens.headings"}]};return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.designTokensInAction")}),e.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",marginBottom:"var(--ds-spacing-6)"},children:["spacing","color","typography"].map(s=>e.jsx(k,{"data-variant":r===s?"primary":"tertiary","data-size":"sm",onClick:()=>n(s),children:t(`storybook.tokens.${s}`)},s))}),e.jsx(d,{style:{padding:"var(--ds-spacing-6)"},children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:a[r].map(({token:s,value:c,usageKey:x})=>e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",display:"grid",gridTemplateColumns:"1fr 100px 1fr",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsxs("code",{style:{fontSize:"var(--ds-font-size-xs)",fontWeight:600},children:["var(",s,")"]}),e.jsx("div",{style:{padding:"var(--ds-spacing-2)",backgroundColor:r==="spacing"?"var(--ds-color-accent-base-default)":r==="color"?`var(${s})`:"transparent",border:r==="color"?"1px solid var(--ds-color-neutral-border-default)":"none",borderRadius:"var(--ds-border-radius-sm)",textAlign:"center",fontSize:r==="typography"?`var(${s})`:"var(--ds-font-size-xs)",height:r==="spacing"?`var(${s})`:"auto",minHeight:r==="spacing"?"20px":"auto"},children:r==="typography"&&"Aa"}),e.jsx(i,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:t(x)})]},s))})}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(i,{"data-size":"sm",style:{color:"var(--ds-color-accent-text-default)"},children:[e.jsxs("strong",{children:[t("storybook.gettingStarted.proTip"),":"]})," ",t("storybook.gettingStarted.proTipText")]})})]})}},y={render:()=>{const t=l(),r=[{titleKey:"storybook.gettingStarted.formValidation",descriptionKey:"storybook.gettingStarted.formValidationDesc",code:`import { Textfield, Button } from '../index';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@xala-technologies/platform/i18n';

export function ContactForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await sdk.contacts.create(data);
      showSuccess(t('contact.created'));
    } catch (error) {
      showError(t('errors.saveFailed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textfield
        label={t('form.email')}
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: t('validation.required')
        })}
      />

      <Button
        data-variant="primary"
        type="submit"
      >
        {t('common.submit')}
      </Button>
    </form>
  );
}`},{titleKey:"storybook.gettingStarted.loadingStates",descriptionKey:"storybook.gettingStarted.loadingStatesDesc",code:`import { Button, Spinner } from '../index';
import { useState } from 'react';

export function SaveButton() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSave = async () => {
    setLoading(true);
    try {
      await sdk.data.save();
      showSuccess(t('common.saved'));
    } catch (error) {
      showError(t('errors.saveFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      data-variant="primary"
      disabled={loading}
      onClick={handleSave}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          {t('common.saving')}
        </>
      ) : (
        t('common.save')
      )}
    </Button>
  );
}`},{titleKey:"storybook.gettingStarted.conditionalRendering",descriptionKey:"storybook.gettingStarted.conditionalRenderingDesc",code:`import { DataTable, EmptyState, ErrorState } from '../index';
import { useQuery } from '@tanstack/react-query';

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => sdk.users.list(),
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        title={t('errors.loadFailed')}
        onRetry={() => queryClient.invalidateQueries(['users'])}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={t('users.empty')}
        action={<Button>{t('users.create')}</Button>}
      />
    );
  }

  return <DataTable data={data} columns={columns} />;
}`},{titleKey:"storybook.gettingStarted.responsiveLayout",descriptionKey:"storybook.gettingStarted.responsiveLayoutDesc",code:`import { Card, Heading } from '../index';

export function DashboardGrid() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)',
      padding: 'var(--ds-spacing-6)',
    }}>
      {widgets.map(widget => (
        <Card
          key={widget.id}
          style={{ padding: 'var(--ds-spacing-6)' }}
        >
          <Heading level={3} data-size="md">
            {widget.title}
          </Heading>
          {widget.content}
        </Card>
      ))}
    </div>
  );
}`}];return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.realWorldPatterns")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:r.map(({titleKey:n,descriptionKey:a,code:s})=>e.jsxs(d,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(o,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-2)"},children:t(n)}),e.jsx(i,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:t(a)})]}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-xs)",lineHeight:"1.6"},children:s})]},n))})]})}},b={render:()=>{const t=l(),[r,n]=h.useState(""),[a,s]=h.useState(1);return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.interactiveQuickStart")}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--ds-spacing-6)"},children:[e.jsx("div",{children:e.jsxs(d,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsx(o,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:t("storybook.gettingStarted.buildFirstComponent")}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:a>=1?"var(--ds-color-accent-surface-default)":"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",borderLeft:a===1?"4px solid var(--ds-color-accent-base-default)":"none"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx("div",{style:{width:"24px",height:"24px",backgroundColor:a>=1?"var(--ds-color-accent-base-default)":"var(--ds-color-neutral-border-default)",color:"white",borderRadius:"var(--ds-border-radius-full)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"var(--ds-font-size-xs)",fontWeight:600},children:"1"}),e.jsx("strong",{children:t("storybook.gettingStarted.enterYourName")})]}),e.jsx(me,{label:t("storybook.form.yourName"),value:r,onChange:c=>{n(c.target.value),c.target.value&&a===1&&s(2)},placeholder:t("storybook.form.enterName"),"data-size":"sm"})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:a>=2?"var(--ds-color-accent-surface-default)":"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",borderLeft:a===2?"4px solid var(--ds-color-accent-base-default)":"none",opacity:a>=2?1:.5},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx("div",{style:{width:"24px",height:"24px",backgroundColor:a>=2?"var(--ds-color-accent-base-default)":"var(--ds-color-neutral-border-default)",color:"white",borderRadius:"var(--ds-border-radius-full)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"var(--ds-font-size-xs)",fontWeight:600},children:"2"}),e.jsx("strong",{children:t("storybook.gettingStarted.seePreview")})]}),e.jsx(i,{"data-size":"sm",children:t("storybook.gettingStarted.componentUpdatesRealtime")})]}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:a>=3?"var(--ds-color-success-surface-default)":"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",opacity:a>=3?1:.5},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)"},children:[e.jsx(de,{size:24,style:{color:a>=3?"var(--ds-color-success-base-default)":"var(--ds-color-neutral-border-default)"}}),e.jsx("strong",{children:t("storybook.gettingStarted.readyToBuild")})]})})]}),a>=2&&e.jsx(k,{"data-variant":"primary",style:{width:"100%",marginTop:"var(--ds-spacing-4)"},onClick:()=>s(3),children:t("storybook.gettingStarted.completeTutorial")})]})}),e.jsx("div",{children:e.jsxs(d,{style:{padding:"var(--ds-spacing-6)",minHeight:"400px"},children:[e.jsx(o,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-4)"},children:t("storybook.gettingStarted.livePreview")}),r?e.jsxs(d,{style:{padding:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-surface-default)"},children:[e.jsx(o,{level:4,"data-size":"md",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.gettingStarted.welcomeName",{name:r})}),e.jsx(i,{style:{marginBottom:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:t("storybook.gettingStarted.buildingWith")}),e.jsx(k,{"data-variant":"primary",children:t("storybook.form.getStarted")})]}):e.jsx("div",{style:{padding:"var(--ds-spacing-8)",textAlign:"center",color:"var(--ds-color-neutral-text-subtle)"},children:e.jsx(i,{children:t("storybook.gettingStarted.enterNameToPreview")})}),r&&e.jsxs("div",{style:{marginTop:"var(--ds-spacing-6)"},children:[e.jsx(o,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:t("storybook.gettingStarted.theCode")}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",fontSize:"var(--ds-font-size-xs)",overflow:"auto"},children:`<Card style={{ padding: 'var(--ds-spacing-6)' }}>
  <Heading level={4} data-size="md">
    Welcome, ${r}!
  </Heading>
  <Paragraph>
    You're building with Xala Platform.
  </Paragraph>
  <Button data-variant="primary">
    Get Started
  </Button>
</Card>`})]})]})})]})]})}},f={render:()=>{const t=l(),r=[{Icon:ve,titleKey:"storybook.gettingStarted.exploreComponents",descriptionKey:"storybook.gettingStarted.exploreComponentsDesc",actionKey:"storybook.gettingStarted.viewComponents",link:"?path=/docs/components-button--docs"},{Icon:ce,titleKey:"storybook.gettingStarted.learnDesignTokens",descriptionKey:"storybook.gettingStarted.learnDesignTokensDesc",actionKey:"storybook.gettingStarted.viewTokens",link:"?path=/docs/fundamentals-tokens--docs"},{Icon:ge,titleKey:"storybook.gettingStarted.accessibilityGuide",descriptionKey:"storybook.gettingStarted.accessibilityGuideDesc",actionKey:"storybook.gettingStarted.viewGuide",link:"?path=/docs/fundamentals-accessibility--docs"},{Icon:pe,titleKey:"storybook.gettingStarted.viewExamples",descriptionKey:"storybook.gettingStarted.viewExamplesDesc",actionKey:"storybook.gettingStarted.viewExamplesAction",link:"?path=/docs/examples-component-examples--docs"}];return e.jsxs("div",{children:[e.jsx(o,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:t("storybook.gettingStarted.nextSteps")}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-5)"},children:r.map(({Icon:n,titleKey:a,descriptionKey:s,actionKey:c,link:x})=>e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",alignItems:"center"},children:[e.jsx(n,{size:32,style:{flexShrink:0,color:"var(--ds-color-accent-base-default)"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx(o,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-1)"},children:t(a)}),e.jsx(i,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:t(s)})]}),e.jsxs(k,{"data-variant":"tertiary","data-size":"sm",onClick:()=>window.location.href=x,children:[t(c)," →"]})]},a))})]})}};var S,C,z,B,j;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    const steps = [{
      step: 1,
      titleKey: 'storybook.gettingStarted.installPackage',
      command: 'pnpm add @xala-technologies/platform',
      descriptionKey: 'storybook.gettingStarted.installPackageDesc'
    }, {
      step: 2,
      titleKey: 'storybook.gettingStarted.installPeerDeps',
      command: 'pnpm add react react-dom',
      descriptionKey: 'storybook.gettingStarted.installPeerDepsDesc'
    }, {
      step: 3,
      titleKey: 'storybook.gettingStarted.importStyles',
      command: "import '@xala-technologies/platform/styles';",
      descriptionKey: 'storybook.gettingStarted.importStylesDesc'
    }];
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.installation')}
        </Heading>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)'
      }}>
          {steps.map(({
          step,
          titleKey,
          command,
          descriptionKey
        }) => <Card key={step} style={{
          padding: 'var(--ds-spacing-6)'
        }}>
              <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            alignItems: 'flex-start'
          }}>
                <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--ds-color-accent-base-default)',
              color: 'var(--ds-color-accent-contrast-default)',
              borderRadius: 'var(--ds-border-radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--ds-font-size-4)',
              fontWeight: 600,
              flexShrink: 0
            }}>
                  {step}
                </div>
                <div style={{
              flex: 1
            }}>
                  <Heading level={3} data-size="sm" style={{
                marginBottom: 'var(--ds-spacing-2)'
              }}>
                    {t(titleKey)}
                  </Heading>
                  <Paragraph data-size="sm" style={{
                marginBottom: 'var(--ds-spacing-3)',
                color: 'var(--ds-color-neutral-text-subtle)'
              }}>
                    {t(descriptionKey)}
                  </Paragraph>
                  <pre style={{
                padding: 'var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-xs)',
                overflow: 'auto'
              }}>
                    {command}
                  </pre>
                </div>
              </div>
            </Card>)}
        </div>
      </div>;
  }
}`,...(z=(C=g.parameters)==null?void 0:C.docs)==null?void 0:z.source},description:{story:"Installation Steps",...(j=(B=g.parameters)==null?void 0:B.docs)==null?void 0:j.description}}};var K,T,w,P,H;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.setup')}
        </Heading>

        <div style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          <Heading level={3} data-size="md" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            1. {t('storybook.gettingStarted.configureTheme')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ds-font-size-sm)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {\`import { ThemeProvider } from '@xala-technologies/platform/theme';

function App() {
  return (
    <ThemeProvider theme="digdir" colorScheme="auto">
      <YourApp />
    </ThemeProvider>
  );
}\`}
          </pre>
        </div>

        <div style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          <Heading level={3} data-size="md" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            2. {t('storybook.gettingStarted.setupI18n')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ds-font-size-sm)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            {\`import { I18nProvider } from '@xala-technologies/platform/i18n';

function App() {
  return (
    <I18nProvider locale="nb">
      <YourApp />
    </I18nProvider>
  );
}\`}
          </pre>
        </div>

        <div>
          <Heading level={3} data-size="md" style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}>
            3. {t('storybook.gettingStarted.importComponents')}
          </Heading>
          <pre style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ds-font-size-sm)'
        }}>
            {\`import { Button, Card, Heading } from '../index';

export function MyComponent() {
  return (
    <Card>
      <Heading level={2}>Hello World</Heading>
      <Button data-variant="primary">Click me</Button>
    </Card>
  );
}\`}
          </pre>
        </div>
      </div>;
  }
}`,...(w=(T=p.parameters)==null?void 0:T.docs)==null?void 0:w.source},description:{story:"Basic Setup",...(H=(P=p.parameters)==null?void 0:P.docs)==null?void 0:H.description}}};var D,R,I,E,F;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.yourFirstComponent')}
        </Heading>

        <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--ds-spacing-6)'
      }}>
          {/* Code */}
          <div>
            <Heading level={3} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
              {t('storybook.gettingStarted.code')}
            </Heading>
            <pre style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'auto',
            fontSize: 'var(--ds-font-size-xs)'
          }}>
              {\`import {
  Button,
  Card,
  Heading,
  Paragraph
} from '../index';
import { useTranslation } from '@xala-technologies/platform/i18n';

export function WelcomeCard() {
  const { t } = useTranslation();

  return (
    <Card style={{
      padding: 'var(--ds-spacing-6)'
    }}>
      <Heading
        level={2}
        data-size="md"
        style={{
          marginBottom: 'var(--ds-spacing-3)'
        }}
      >
        {t('welcome.title')}
      </Heading>

      <Paragraph
        style={{
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}
      >
        {t('welcome.description')}
      </Paragraph>

      <Button data-variant="primary">
        {t('common.getStarted')}
      </Button>
    </Card>
  );
}\`}
            </pre>
          </div>

          {/* Preview */}
          <div>
            <Heading level={3} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
              {t('storybook.gettingStarted.preview')}
            </Heading>
            <Card style={{
            padding: 'var(--ds-spacing-6)'
          }}>
              <Heading level={2} data-size="md" style={{
              marginBottom: 'var(--ds-spacing-3)'
            }}>
                {t('storybook.overview.welcome')}
              </Heading>
              <Paragraph style={{
              marginBottom: 'var(--ds-spacing-4)',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                {t('storybook.overview.subtitle')}
              </Paragraph>
              <Button data-variant="primary">{t('storybook.form.getStarted')}</Button>
            </Card>
          </div>
        </div>

        <div style={{
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-success-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-success-text-default)'
        }}>
            <strong>{t('storybook.gettingStarted.bestPractices')}:</strong>
            <br />• {t('storybook.gettingStarted.platformComponents')}
            <br />• {t('storybook.gettingStarted.designTokens')}
            <br />• {t('storybook.gettingStarted.i18nText')}
            <br />• {t('storybook.gettingStarted.semanticHtml')}
            <br />• {t('storybook.gettingStarted.accessibleProps')}
          </Paragraph>
        </div>
      </div>;
  }
}`,...(I=(R=m.parameters)==null?void 0:R.docs)==null?void 0:I.source},description:{story:"First Component",...(F=(E=m.parameters)==null?void 0:E.docs)==null?void 0:F.description}}};var A,W,L,N,q;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    const patterns = [{
      titleKey: 'storybook.gettingStarted.formValidation',
      code: \`<Textfield
  label="Email"
  type="email"
  error={errors.email}
  required
/>\`
    }, {
      titleKey: 'storybook.gettingStarted.loadingButton',
      code: \`<Button
  data-variant="primary"
  disabled={loading}
>
  {loading ? 'Saving...' : 'Save'}
</Button>\`
    }, {
      titleKey: 'storybook.gettingStarted.conditionalRendering',
      code: \`{data ? (
  <DataTable data={data} />
) : (
  <EmptyState title="No data" />
)}\`
    }, {
      titleKey: 'storybook.gettingStarted.errorHandling',
      code: \`try {
  await sdk.users.create(data);
} catch (error) {
  showError(t('errors.saveFailed'));
}\`
    }];
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.commonPatterns')}
        </Heading>

        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-6)'
      }}>
          {patterns.map(({
          titleKey,
          code
        }) => <Card key={titleKey} style={{
          padding: 'var(--ds-spacing-5)'
        }}>
              <Heading level={3} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                {t(titleKey)}
              </Heading>
              <pre style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto'
          }}>
                {code}
              </pre>
            </Card>)}
        </div>
      </div>;
  }
}`,...(L=(W=u.parameters)==null?void 0:W.docs)==null?void 0:L.source},description:{story:"Common Patterns",...(q=(N=u.parameters)==null?void 0:N.docs)==null?void 0:q.description}}};var G,Q,$,V,Y;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    const [selectedToken, setSelectedToken] = useState<'spacing' | 'color' | 'typography'>('spacing');
    const tokenExamples = {
      spacing: [{
        token: '--ds-spacing-1',
        value: '4px',
        usageKey: 'storybook.tokens.minimalGap'
      }, {
        token: '--ds-spacing-2',
        value: '8px',
        usageKey: 'storybook.tokens.smallSpacing'
      }, {
        token: '--ds-spacing-4',
        value: '16px',
        usageKey: 'storybook.tokens.defaultSpacing'
      }, {
        token: '--ds-spacing-6',
        value: '24px',
        usageKey: 'storybook.tokens.sectionSpacing'
      }, {
        token: '--ds-spacing-8',
        value: '32px',
        usageKey: 'storybook.tokens.largeSpacing'
      }],
      color: [{
        token: '--ds-color-accent-base-default',
        value: '#0066CC',
        usageKey: 'storybook.tokens.primaryActions'
      }, {
        token: '--ds-color-success-base-default',
        value: '#06A77D',
        usageKey: 'storybook.tokens.successStates'
      }, {
        token: '--ds-color-danger-base-default',
        value: '#E02E49',
        usageKey: 'storybook.tokens.errorStates'
      }, {
        token: '--ds-color-warning-base-default',
        value: '#FF9100',
        usageKey: 'storybook.tokens.warningStates'
      }, {
        token: '--ds-color-neutral-text-subtle',
        value: '#68707D',
        usageKey: 'storybook.tokens.secondaryText'
      }],
      typography: [{
        token: '--ds-font-size-xs',
        value: '0.75rem',
        usageKey: 'storybook.tokens.smallTextCaptions'
      }, {
        token: '--ds-font-size-sm',
        value: '0.875rem',
        usageKey: 'storybook.tokens.bodyTextSmall'
      }, {
        token: '--ds-font-size-md',
        value: '1rem',
        usageKey: 'storybook.tokens.bodyTextDefault'
      }, {
        token: '--ds-font-size-lg',
        value: '1.125rem',
        usageKey: 'storybook.tokens.emphasizedText'
      }, {
        token: '--ds-font-size-xl',
        value: '1.5rem',
        usageKey: 'storybook.tokens.headings'
      }]
    };
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.designTokensInAction')}
        </Heading>

        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {(['spacing', 'color', 'typography'] as const).map(type => <Button key={type} data-variant={selectedToken === type ? 'primary' : 'tertiary'} data-size="sm" onClick={() => setSelectedToken(type)}>
              {t(\`storybook.tokens.\${type}\`)}
            </Button>)}
        </div>

        <Card style={{
        padding: 'var(--ds-spacing-6)'
      }}>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)'
        }}>
            {tokenExamples[selectedToken].map(({
            token,
            value,
            usageKey
          }) => <div key={token} style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            display: 'grid',
            gridTemplateColumns: '1fr 100px 1fr',
            gap: 'var(--ds-spacing-4)',
            alignItems: 'center'
          }}>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              fontWeight: 600
            }}>
                  var({token})
                </code>
                <div style={{
              padding: 'var(--ds-spacing-2)',
              backgroundColor: selectedToken === 'spacing' ? 'var(--ds-color-accent-base-default)' : selectedToken === 'color' ? \`var(\${token})\` : 'transparent',
              border: selectedToken === 'color' ? '1px solid var(--ds-color-neutral-border-default)' : 'none',
              borderRadius: 'var(--ds-border-radius-sm)',
              textAlign: 'center',
              fontSize: selectedToken === 'typography' ? \`var(\${token})\` : 'var(--ds-font-size-xs)',
              height: selectedToken === 'spacing' ? \`var(\${token})\` : 'auto',
              minHeight: selectedToken === 'spacing' ? '20px' : 'auto'
            }}>
                  {selectedToken === 'typography' && 'Aa'}
                </div>
                <Paragraph data-size="sm" style={{
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {t(usageKey)}
                </Paragraph>
              </div>)}
          </div>
        </Card>

        <div style={{
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-accent-text-default)'
        }}>
            <strong>{t('storybook.gettingStarted.proTip')}:</strong>{' '}
            {t('storybook.gettingStarted.proTipText')}
          </Paragraph>
        </div>
      </div>;
  }
}`,...($=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:$.source},description:{story:"Design Tokens in Action",...(Y=(V=v.parameters)==null?void 0:V.docs)==null?void 0:Y.description}}};var U,M,_,X,O;y.parameters={...y.parameters,docs:{...(U=y.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    const patterns = [{
      titleKey: 'storybook.gettingStarted.formValidation',
      descriptionKey: 'storybook.gettingStarted.formValidationDesc',
      code: \`import { Textfield, Button } from '../index';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@xala-technologies/platform/i18n';

export function ContactForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await sdk.contacts.create(data);
      showSuccess(t('contact.created'));
    } catch (error) {
      showError(t('errors.saveFailed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textfield
        label={t('form.email')}
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: t('validation.required')
        })}
      />

      <Button
        data-variant="primary"
        type="submit"
      >
        {t('common.submit')}
      </Button>
    </form>
  );
}\`
    }, {
      titleKey: 'storybook.gettingStarted.loadingStates',
      descriptionKey: 'storybook.gettingStarted.loadingStatesDesc',
      code: \`import { Button, Spinner } from '../index';
import { useState } from 'react';

export function SaveButton() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSave = async () => {
    setLoading(true);
    try {
      await sdk.data.save();
      showSuccess(t('common.saved'));
    } catch (error) {
      showError(t('errors.saveFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      data-variant="primary"
      disabled={loading}
      onClick={handleSave}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          {t('common.saving')}
        </>
      ) : (
        t('common.save')
      )}
    </Button>
  );
}\`
    }, {
      titleKey: 'storybook.gettingStarted.conditionalRendering',
      descriptionKey: 'storybook.gettingStarted.conditionalRenderingDesc',
      code: \`import { DataTable, EmptyState, ErrorState } from '../index';
import { useQuery } from '@tanstack/react-query';

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => sdk.users.list(),
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        title={t('errors.loadFailed')}
        onRetry={() => queryClient.invalidateQueries(['users'])}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={t('users.empty')}
        action={<Button>{t('users.create')}</Button>}
      />
    );
  }

  return <DataTable data={data} columns={columns} />;
}\`
    }, {
      titleKey: 'storybook.gettingStarted.responsiveLayout',
      descriptionKey: 'storybook.gettingStarted.responsiveLayoutDesc',
      code: \`import { Card, Heading } from '../index';

export function DashboardGrid() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)',
      padding: 'var(--ds-spacing-6)',
    }}>
      {widgets.map(widget => (
        <Card
          key={widget.id}
          style={{ padding: 'var(--ds-spacing-6)' }}
        >
          <Heading level={3} data-size="md">
            {widget.title}
          </Heading>
          {widget.content}
        </Card>
      ))}
    </div>
  );
}\`
    }];
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.realWorldPatterns')}
        </Heading>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)'
      }}>
          {patterns.map(({
          titleKey,
          descriptionKey,
          code
        }) => <Card key={titleKey} style={{
          padding: 'var(--ds-spacing-6)'
        }}>
              <div style={{
            marginBottom: 'var(--ds-spacing-4)'
          }}>
                <Heading level={3} data-size="md" style={{
              marginBottom: 'var(--ds-spacing-2)'
            }}>
                  {t(titleKey)}
                </Heading>
                <Paragraph data-size="sm" style={{
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {t(descriptionKey)}
                </Paragraph>
              </div>

              <pre style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'auto',
            fontSize: 'var(--ds-font-size-xs)',
            lineHeight: '1.6'
          }}>
                {code}
              </pre>
            </Card>)}
        </div>
      </div>;
  }
}`,...(_=(M=y.parameters)==null?void 0:M.docs)==null?void 0:_.source},description:{story:"Real-World Patterns",...(O=(X=y.parameters)==null?void 0:X.docs)==null?void 0:O.description}}};var J,Z,ee,te,re;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.interactiveQuickStart')}
        </Heading>

        <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--ds-spacing-6)'
      }}>
          {/* Steps */}
          <div>
            <Card style={{
            padding: 'var(--ds-spacing-6)'
          }}>
              <Heading level={3} data-size="md" style={{
              marginBottom: 'var(--ds-spacing-4)'
            }}>
                {t('storybook.gettingStarted.buildFirstComponent')}
              </Heading>

              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-4)'
            }}>
                <div style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: step >= 1 ? 'var(--ds-color-accent-surface-default)' : 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                borderLeft: step === 1 ? '4px solid var(--ds-color-accent-base-default)' : 'none'
              }}>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  marginBottom: 'var(--ds-spacing-2)'
                }}>
                    <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: step >= 1 ? 'var(--ds-color-accent-base-default)' : 'var(--ds-color-neutral-border-default)',
                    color: 'white',
                    borderRadius: 'var(--ds-border-radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 600
                  }}>
                      1
                    </div>
                    <strong>{t('storybook.gettingStarted.enterYourName')}</strong>
                  </div>
                  <Textfield label={t('storybook.form.yourName')} value={name} onChange={e => {
                  setName(e.target.value);
                  if (e.target.value && step === 1) setStep(2);
                }} placeholder={t('storybook.form.enterName')} data-size="sm" />
                </div>

                <div style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: step >= 2 ? 'var(--ds-color-accent-surface-default)' : 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                borderLeft: step === 2 ? '4px solid var(--ds-color-accent-base-default)' : 'none',
                opacity: step >= 2 ? 1 : 0.5
              }}>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  marginBottom: 'var(--ds-spacing-2)'
                }}>
                    <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: step >= 2 ? 'var(--ds-color-accent-base-default)' : 'var(--ds-color-neutral-border-default)',
                    color: 'white',
                    borderRadius: 'var(--ds-border-radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 600
                  }}>
                      2
                    </div>
                    <strong>{t('storybook.gettingStarted.seePreview')}</strong>
                  </div>
                  <Paragraph data-size="sm">
                    {t('storybook.gettingStarted.componentUpdatesRealtime')}
                  </Paragraph>
                </div>

                <div style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: step >= 3 ? 'var(--ds-color-success-surface-default)' : 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                opacity: step >= 3 ? 1 : 0.5
              }}>
                  <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)'
                }}>
                    <CheckCircle size={24} style={{
                    color: step >= 3 ? 'var(--ds-color-success-base-default)' : 'var(--ds-color-neutral-border-default)'
                  }} />
                    <strong>{t('storybook.gettingStarted.readyToBuild')}</strong>
                  </div>
                </div>
              </div>

              {step >= 2 && <Button data-variant="primary" style={{
              width: '100%',
              marginTop: 'var(--ds-spacing-4)'
            }} onClick={() => setStep(3)}>
                  {t('storybook.gettingStarted.completeTutorial')}
                </Button>}
            </Card>
          </div>

          {/* Preview */}
          <div>
            <Card style={{
            padding: 'var(--ds-spacing-6)',
            minHeight: '400px'
          }}>
              <Heading level={3} data-size="md" style={{
              marginBottom: 'var(--ds-spacing-4)'
            }}>
                {t('storybook.gettingStarted.livePreview')}
              </Heading>

              {name ? <Card style={{
              padding: 'var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)'
            }}>
                  <Heading level={4} data-size="md" style={{
                marginBottom: 'var(--ds-spacing-3)'
              }}>
                    {t('storybook.gettingStarted.welcomeName', {
                  name
                })}
                  </Heading>
                  <Paragraph style={{
                marginBottom: 'var(--ds-spacing-4)',
                color: 'var(--ds-color-neutral-text-subtle)'
              }}>
                    {t('storybook.gettingStarted.buildingWith')}
                  </Paragraph>
                  <Button data-variant="primary">{t('storybook.form.getStarted')}</Button>
                </Card> : <div style={{
              padding: 'var(--ds-spacing-8)',
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  <Paragraph>{t('storybook.gettingStarted.enterNameToPreview')}</Paragraph>
                </div>}

              {name && <div style={{
              marginTop: 'var(--ds-spacing-6)'
            }}>
                  <Heading level={4} data-size="sm" style={{
                marginBottom: 'var(--ds-spacing-3)'
              }}>
                    {t('storybook.gettingStarted.theCode')}
                  </Heading>
                  <pre style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-md)',
                fontSize: 'var(--ds-font-size-xs)',
                overflow: 'auto'
              }}>
                    {\`<Card style={{ padding: 'var(--ds-spacing-6)' }}>
  <Heading level={4} data-size="md">
    Welcome, \${name}!
  </Heading>
  <Paragraph>
    You're building with Xala Platform.
  </Paragraph>
  <Button data-variant="primary">
    Get Started
  </Button>
</Card>\`}
                  </pre>
                </div>}
            </Card>
          </div>
        </div>
      </div>;
  }
}`,...(ee=(Z=b.parameters)==null?void 0:Z.docs)==null?void 0:ee.source},description:{story:"Interactive Quick Start",...(re=(te=b.parameters)==null?void 0:te.docs)==null?void 0:re.description}}};var ae,oe,se,ne,ie;f.parameters={...f.parameters,docs:{...(ae=f.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => {
    const t = useT();
    const nextSteps = [{
      Icon: Package,
      titleKey: 'storybook.gettingStarted.exploreComponents',
      descriptionKey: 'storybook.gettingStarted.exploreComponentsDesc',
      actionKey: 'storybook.gettingStarted.viewComponents',
      link: '?path=/docs/components-button--docs'
    }, {
      Icon: Palette,
      titleKey: 'storybook.gettingStarted.learnDesignTokens',
      descriptionKey: 'storybook.gettingStarted.learnDesignTokensDesc',
      actionKey: 'storybook.gettingStarted.viewTokens',
      link: '?path=/docs/fundamentals-tokens--docs'
    }, {
      Icon: Shield,
      titleKey: 'storybook.gettingStarted.accessibilityGuide',
      descriptionKey: 'storybook.gettingStarted.accessibilityGuideDesc',
      actionKey: 'storybook.gettingStarted.viewGuide',
      link: '?path=/docs/fundamentals-accessibility--docs'
    }, {
      Icon: Code,
      titleKey: 'storybook.gettingStarted.viewExamples',
      descriptionKey: 'storybook.gettingStarted.viewExamplesDesc',
      actionKey: 'storybook.gettingStarted.viewExamplesAction',
      link: '?path=/docs/examples-component-examples--docs'
    }];
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          {t('storybook.gettingStarted.nextSteps')}
        </Heading>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)'
      }}>
          {nextSteps.map(({
          Icon,
          titleKey,
          descriptionKey,
          actionKey,
          link
        }) => <div key={titleKey} style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)',
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          alignItems: 'center'
        }}>
              <Icon size={32} style={{
            flexShrink: 0,
            color: 'var(--ds-color-accent-base-default)'
          }} />
              <div style={{
            flex: 1
          }}>
                <Heading level={3} data-size="sm" style={{
              marginBottom: 'var(--ds-spacing-1)'
            }}>
                  {t(titleKey)}
                </Heading>
                <Paragraph data-size="sm" style={{
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {t(descriptionKey)}
                </Paragraph>
              </div>
              <Button data-variant="tertiary" data-size="sm" onClick={() => window.location.href = link}>
                {t(actionKey)} →
              </Button>
            </div>)}
        </div>
      </div>;
  }
}`,...(se=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:se.source},description:{story:"Next Steps",...(ie=(ne=f.parameters)==null?void 0:ne.docs)==null?void 0:ie.description}}};const Le=["InstallationSteps","BasicSetup","FirstComponent","CommonPatterns","DesignTokensInAction","RealWorldPatterns","InteractiveQuickStart","NextSteps"];export{p as BasicSetup,u as CommonPatterns,v as DesignTokensInAction,m as FirstComponent,g as InstallationSteps,b as InteractiveQuickStart,f as NextSteps,y as RealWorldPatterns,Le as __namedExportsOrder,We as default};
//# sourceMappingURL=GettingStarted.stories-BCyYwYye.js.map
