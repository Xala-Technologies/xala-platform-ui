import{j as s}from"./jsx-runtime-BYYWji4R.js";import{u as o}from"./index-bjNF47ar.js";import{C as J}from"./index-D1XdeRjR.js";import{H as n}from"./heading-mzc2R_Ff.js";import{P as b}from"./paragraph-DDCpJsVw.js";import{B as g}from"./button-B6PgazAq.js";import{T as m}from"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-Df4a1FH3.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./textarea-DMvw4dlU.js";const ps={title:"Fundamentals/Sizes and Spacing",parameters:{docs:{description:{component:`
Sizes and spacing system from Designsystemet.

## Size Modes
Components can be rendered in three size modes using \`data-size\`:
- **sm** - Small/compact
- **md** - Medium (default)
- **lg** - Large/comfortable

## Spacing Scale
Uses \`--ds-spacing-*\` tokens for consistent rhythm.

## Reference
[Designsystemet Sizes and Spacing](https://designsystemet.no/no/fundamentals/design-elements/sizes-and-spacing)
        `}}},tags:["autodocs"]},t={render:function(){const e=o();return s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[s.jsxs("div",{"data-size":"sm",children:[s.jsxs(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:[e("storybook.sizes.small"),' (data-size="sm")']}),s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[s.jsx(g,{"data-variant":"primary","data-size":"sm",children:e("storybook.sizes.button")}),s.jsx(m,{placeholder:e("storybook.sizes.inputField"),"data-size":"sm",style:{flex:1}}),s.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-sm)"},children:e("storybook.sizes.tag")})]})]}),s.jsxs("div",{"data-size":"md",children:[s.jsxs(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:[e("storybook.sizes.medium"),' (data-size="md") - ',e("storybook.sizes.default")]}),s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[s.jsx(g,{"data-variant":"primary","data-size":"md",children:e("storybook.sizes.button")}),s.jsx(m,{placeholder:e("storybook.sizes.inputField"),"data-size":"md",style:{flex:1}}),s.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-sm)"},children:e("storybook.sizes.tag")})]})]}),s.jsxs("div",{"data-size":"lg",children:[s.jsxs(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:[e("storybook.sizes.large"),' (data-size="lg")']}),s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",alignItems:"center"},children:[s.jsx(g,{"data-variant":"primary","data-size":"lg",children:e("storybook.sizes.button")}),s.jsx(m,{placeholder:e("storybook.sizes.inputField"),"data-size":"lg",style:{flex:1}}),s.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-sm)"},children:e("storybook.sizes.tag")})]})]})]})}},i={render:function(){const e=o(),a=[{token:"0",value:"0"},{token:"1",value:"4px / 0.25rem"},{token:"2",value:"8px / 0.5rem"},{token:"3",value:"12px / 0.75rem"},{token:"4",value:"16px / 1rem"},{token:"5",value:"20px / 1.25rem"},{token:"6",value:"24px / 1.5rem"},{token:"7",value:"28px / 1.75rem"},{token:"8",value:"32px / 2rem"},{token:"9",value:"36px / 2.25rem"},{token:"10",value:"40px / 2.5rem"},{token:"11",value:"44px / 2.75rem"},{token:"12",value:"var(--ds-spacing-12) / 3rem"},{token:"14",value:"56px / 3.5rem"},{token:"16",value:"64px / 4rem"},{token:"18",value:"var(--ds-spacing-18) / 4.5rem"},{token:"20",value:"80px / 5rem"}];return s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-1)"},children:[s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"180px 1fr 120px",gap:"var(--ds-spacing-2)",padding:"var(--ds-spacing-2)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",fontWeight:"var(--ds-font-weight-semibold)",fontSize:"var(--ds-font-size-sm)"},children:[s.jsx("span",{children:e("storybook.sizes.token")}),s.jsx("span",{children:e("storybook.sizes.visual")}),s.jsx("span",{children:e("storybook.sizes.value")})]}),a.map(({token:r,value:u})=>s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"180px 1fr 120px",gap:"var(--ds-spacing-2)",alignItems:"center",padding:"var(--ds-spacing-2)"},children:[s.jsxs("code",{style:{fontSize:"var(--ds-font-size-sm)"},children:["--ds-spacing-",r]}),s.jsx("div",{style:{height:"var(--ds-spacing-6)",display:"flex",alignItems:"center"},children:s.jsx("div",{style:{width:`var(--ds-spacing-${r})`,height:"var(--ds-spacing-6)",backgroundColor:"var(--ds-color-accent-base-default)",borderRadius:"var(--ds-border-radius-sm)",minWidth:r==="0"?"2px":void 0}})}),s.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:u})]},r))]})}},l={render:function(){const e=o();return s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[s.jsxs("div",{children:[s.jsx(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:e("storybook.sizes.paddingExamples")}),s.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",flexWrap:"wrap"},children:["2","4","6","8"].map(a=>s.jsx("div",{style:{backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:s.jsx("div",{style:{padding:`var(--ds-spacing-${a})`,backgroundColor:"var(--ds-color-neutral-background-default)",borderRadius:"var(--ds-border-radius-md)",border:"1px dashed var(--ds-color-accent-border-default)"},children:s.jsxs("code",{style:{fontSize:"var(--ds-font-size-xs)"},children:["padding: spacing-",a]})})},a))})]}),s.jsxs("div",{children:[s.jsx(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:e("storybook.sizes.gapExamples")}),s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:["2","4","6"].map(a=>s.jsxs("div",{children:[s.jsxs("code",{style:{fontSize:"var(--ds-font-size-xs)",marginBottom:"var(--ds-spacing-1)",display:"block"},children:["gap: spacing-",a]}),s.jsx("div",{style:{display:"flex",gap:`var(--ds-spacing-${a})`},children:[1,2,3,4].map(r=>s.jsx("div",{style:{width:"var(--ds-spacing-12)",height:"var(--ds-spacing-12)",backgroundColor:"var(--ds-color-accent-base-default)",borderRadius:"var(--ds-border-radius-md)"}},r))})]},a))})]})]})}},c={render:function(){const e=o(),a=[{token:"0",value:"0"},{token:"1",value:"4px"},{token:"2",value:"var(--ds-spacing-2)"},{token:"3",value:"12px"},{token:"4",value:"var(--ds-spacing-4)"},{token:"5",value:"20px"},{token:"6",value:"var(--ds-spacing-6)"},{token:"7",value:"28px"},{token:"8",value:"var(--ds-spacing-8)"},{token:"9",value:"36px"},{token:"10",value:"40px"},{token:"11",value:"var(--ds-spacing-11)"},{token:"12",value:"var(--ds-spacing-12)"}];return s.jsxs("div",{children:[s.jsxs(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:[e("storybook.sizes.sizeTokens")," (--ds-size-*)"]}),s.jsx(b,{"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:e("storybook.sizes.sizeTokensDescription")}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-4)",alignItems:"flex-end"},children:a.slice(4).map(({token:r,value:u})=>s.jsxs("div",{style:{textAlign:"center"},children:[s.jsx("div",{style:{width:`var(--ds-size-${r})`,height:`var(--ds-size-${r})`,backgroundColor:"var(--ds-color-accent-base-default)",borderRadius:"var(--ds-border-radius-md)",marginBottom:"var(--ds-spacing-2)"}}),s.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",display:"block"},children:r}),s.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:u})]},r))})]})}},p={render:function(){const e=o();return s.jsxs("div",{children:[s.jsx(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:e("storybook.sizes.whenToUseWhichSpacing")}),s.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"var(--ds-font-size-sm)"},children:[s.jsx("thead",{children:s.jsxs("tr",{style:{backgroundColor:"var(--ds-color-neutral-surface-hover)"},children:[s.jsx("th",{style:{padding:"var(--ds-spacing-3)",textAlign:"left",borderBottom:"1px solid var(--ds-color-neutral-border-default)"},children:e("storybook.sizes.useCase")}),s.jsx("th",{style:{padding:"var(--ds-spacing-3)",textAlign:"left",borderBottom:"1px solid var(--ds-color-neutral-border-default)"},children:e("storybook.sizes.token")})]})}),s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:e("storybook.sizes.inlineElements")}),s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:s.jsx("code",{children:"spacing-1, spacing-2"})})]}),s.jsxs("tr",{children:[s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:e("storybook.sizes.formFieldGaps")}),s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:s.jsx("code",{children:"spacing-3, spacing-4"})})]}),s.jsxs("tr",{children:[s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:e("storybook.sizes.cardPadding")}),s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:s.jsx("code",{children:"spacing-5, spacing-6"})})]}),s.jsxs("tr",{children:[s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:e("storybook.sizes.pageSections")}),s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:s.jsx("code",{children:"spacing-8, spacing-10"})})]}),s.jsxs("tr",{children:[s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:e("storybook.sizes.majorDivisions")}),s.jsx("td",{style:{padding:"var(--ds-spacing-3)",borderBottom:"1px solid var(--ds-color-neutral-border-subtle)"},children:s.jsx("code",{children:"spacing-12+"})})]})]})]})]})}},v={render:function(){const e=o();return s.jsxs(J,{children:[s.jsxs("div",{style:{backgroundColor:"var(--ds-color-neutral-surface-default)",border:"1px solid var(--ds-color-neutral-border-default)",borderRadius:"var(--ds-border-radius-lg)",overflow:"hidden"},children:[s.jsx("div",{style:{height:"var(--ds-spacing-20)",backgroundColor:"var(--ds-color-accent-surface-default)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--ds-color-accent-text-default)"},children:e("storybook.sizes.imageArea")}),s.jsxs("div",{style:{padding:"var(--ds-spacing-6)"},children:[s.jsx(n,{level:3,"data-size":"md",style:{marginBottom:"var(--ds-spacing-2)"},children:e("storybook.sizes.cardTitle")}),s.jsx(b,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)",marginBottom:"var(--ds-spacing-4)"},children:e("storybook.sizes.descriptionText")}),s.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-4)"},children:[s.jsxs("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-2)"},children:[e("storybook.sizes.tag")," 1"]}),s.jsxs("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-accent-surface-default)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-2)"},children:[e("storybook.sizes.tag")," 2"]})]})]}),s.jsxs("div",{style:{padding:"var(--ds-spacing-4) var(--ds-spacing-6)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderTop:"1px solid var(--ds-color-neutral-border-subtle)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("span",{style:{fontSize:"var(--ds-font-size-2)",color:"var(--ds-color-neutral-text-subtle)"},children:e("storybook.sizes.metaInfo")}),s.jsx(g,{"data-variant":"primary","data-size":"sm",children:e("storybook.examples.action")})]})]}),s.jsxs(b,{"data-size":"xs",style:{marginTop:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:[s.jsxs("strong",{children:[e("storybook.sizes.spacingUsed"),":"]})," spacing-1 (",e("storybook.sizes.tags"),"), spacing-2 (",e("storybook.sizes.gaps"),"), spacing-4 (",e("storybook.sizes.sections"),"), spacing-6 (",e("storybook.sizes.cardPaddingLabel"),")"]})]})}};var y,x,f,z,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-8)'
    }}>
        <div data-size="sm">
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.sizes.small')} (data-size="sm")
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          alignItems: 'center'
        }}>
            <Button data-variant="primary" data-size="sm">
              {t('storybook.sizes.button')}
            </Button>
            <Textfield placeholder={t('storybook.sizes.inputField')} data-size="sm" style={{
            flex: 1
          }} />
            <span style={{
            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-sm)'
          }}>
              {t('storybook.sizes.tag')}
            </span>
          </div>
        </div>

        <div data-size="md">
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.sizes.medium')} (data-size="md") - {t('storybook.sizes.default')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          alignItems: 'center'
        }}>
            <Button data-variant="primary" data-size="md">
              {t('storybook.sizes.button')}
            </Button>
            <Textfield placeholder={t('storybook.sizes.inputField')} data-size="md" style={{
            flex: 1
          }} />
            <span style={{
            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-sm)'
          }}>
              {t('storybook.sizes.tag')}
            </span>
          </div>
        </div>

        <div data-size="lg">
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.sizes.large')} (data-size="lg")
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          alignItems: 'center'
        }}>
            <Button data-variant="primary" data-size="lg">
              {t('storybook.sizes.button')}
            </Button>
            <Textfield placeholder={t('storybook.sizes.inputField')} data-size="lg" style={{
            flex: 1
          }} />
            <span style={{
            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-sm)'
          }}>
              {t('storybook.sizes.tag')}
            </span>
          </div>
        </div>
      </div>;
  }
}`,...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source},description:{story:"Size modes affect component dimensions",...(k=(z=t.parameters)==null?void 0:z.docs)==null?void 0:k.description}}};var h,j,S,B,C;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const spacings = [{
      token: '0',
      value: '0'
    }, {
      token: '1',
      value: '4px / 0.25rem'
    }, {
      token: '2',
      value: '8px / 0.5rem'
    }, {
      token: '3',
      value: '12px / 0.75rem'
    }, {
      token: '4',
      value: '16px / 1rem'
    }, {
      token: '5',
      value: '20px / 1.25rem'
    }, {
      token: '6',
      value: '24px / 1.5rem'
    }, {
      token: '7',
      value: '28px / 1.75rem'
    }, {
      token: '8',
      value: '32px / 2rem'
    }, {
      token: '9',
      value: '36px / 2.25rem'
    }, {
      token: '10',
      value: '40px / 2.5rem'
    }, {
      token: '11',
      value: '44px / 2.75rem'
    }, {
      token: '12',
      value: 'var(--ds-spacing-12) / 3rem'
    }, {
      token: '14',
      value: '56px / 3.5rem'
    }, {
      token: '16',
      value: '64px / 4rem'
    }, {
      token: '18',
      value: 'var(--ds-spacing-18) / 4.5rem'
    }, {
      token: '20',
      value: '80px / 5rem'
    }];
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-1)'
    }}>
        <div style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr 120px',
        gap: 'var(--ds-spacing-2)',
        padding: 'var(--ds-spacing-2)',
        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        borderRadius: 'var(--ds-border-radius-md)',
        fontWeight: 'var(--ds-font-weight-semibold)',
        fontSize: 'var(--ds-font-size-sm)'
      }}>
          <span>{t('storybook.sizes.token')}</span>
          <span>{t('storybook.sizes.visual')}</span>
          <span>{t('storybook.sizes.value')}</span>
        </div>
        {spacings.map(({
        token,
        value
      }) => <div key={token} style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr 120px',
        gap: 'var(--ds-spacing-2)',
        alignItems: 'center',
        padding: 'var(--ds-spacing-2)'
      }}>
            <code style={{
          fontSize: 'var(--ds-font-size-sm)'
        }}>--ds-spacing-{token}</code>
            <div style={{
          height: 'var(--ds-spacing-6)',
          display: 'flex',
          alignItems: 'center'
        }}>
              <div style={{
            width: \`var(--ds-spacing-\${token})\`,
            height: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-accent-base-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
            minWidth: token === '0' ? '2px' : undefined
          }} />
            </div>
            <span style={{
          fontSize: 'var(--ds-font-size-xs)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
              {value}
            </span>
          </div>)}
      </div>;
  }
}`,...(S=(j=i.parameters)==null?void 0:j.docs)==null?void 0:S.source},description:{story:"Visual spacing scale",...(C=(B=i.parameters)==null?void 0:B.docs)==null?void 0:C.description}}};var R,T,w,I,H;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        <div>
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.sizes.paddingExamples')}
          </Heading>
          <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)',
          flexWrap: 'wrap'
        }}>
            {['2', '4', '6', '8'].map(size => <div key={size} style={{
            backgroundColor: 'var(--ds-color-accent-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)'
          }}>
                <div style={{
              padding: \`var(--ds-spacing-\${size})\`,
              backgroundColor: 'var(--ds-color-neutral-background-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: '1px dashed var(--ds-color-accent-border-default)'
            }}>
                  <code style={{
                fontSize: 'var(--ds-font-size-xs)'
              }}>
                    padding: spacing-{size}
                  </code>
                </div>
              </div>)}
          </div>
        </div>

        <div>
          <Heading level={4} data-size="sm" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            {t('storybook.sizes.gapExamples')}
          </Heading>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)'
        }}>
            {['2', '4', '6'].map(size => <div key={size}>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              marginBottom: 'var(--ds-spacing-1)',
              display: 'block'
            }}>
                  gap: spacing-{size}
                </code>
                <div style={{
              display: 'flex',
              gap: \`var(--ds-spacing-\${size})\`
            }}>
                  {[1, 2, 3, 4].map(i => <div key={i} style={{
                width: 'var(--ds-spacing-12)',
                height: 'var(--ds-spacing-12)',
                backgroundColor: 'var(--ds-color-accent-base-default)',
                borderRadius: 'var(--ds-border-radius-md)'
              }} />)}
                </div>
              </div>)}
          </div>
        </div>
      </div>;
  }
}`,...(w=(T=l.parameters)==null?void 0:T.docs)==null?void 0:w.source},description:{story:"Spacing in practice - padding and margins",...(H=(I=l.parameters)==null?void 0:I.docs)==null?void 0:H.description}}};var D,P,E,W,$;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const sizings = [{
      token: '0',
      value: '0'
    }, {
      token: '1',
      value: '4px'
    }, {
      token: '2',
      value: 'var(--ds-spacing-2)'
    }, {
      token: '3',
      value: '12px'
    }, {
      token: '4',
      value: 'var(--ds-spacing-4)'
    }, {
      token: '5',
      value: '20px'
    }, {
      token: '6',
      value: 'var(--ds-spacing-6)'
    }, {
      token: '7',
      value: '28px'
    }, {
      token: '8',
      value: 'var(--ds-spacing-8)'
    }, {
      token: '9',
      value: '36px'
    }, {
      token: '10',
      value: '40px'
    }, {
      token: '11',
      value: 'var(--ds-spacing-11)'
    }, {
      token: '12',
      value: 'var(--ds-spacing-12)'
    }];
    return <div>
        <Heading level={4} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.sizes.sizeTokens')} (--ds-size-*)
        </Heading>
        <Paragraph data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-4)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          {t('storybook.sizes.sizeTokensDescription')}
        </Paragraph>
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-4)',
        alignItems: 'flex-end'
      }}>
          {sizings.slice(4).map(({
          token,
          value
        }) => <div key={token} style={{
          textAlign: 'center'
        }}>
              <div style={{
            width: \`var(--ds-size-\${token})\`,
            height: \`var(--ds-size-\${token})\`,
            backgroundColor: 'var(--ds-color-accent-base-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginBottom: 'var(--ds-spacing-2)'
          }} />
              <code style={{
            fontSize: 'var(--ds-font-size-xs)',
            display: 'block'
          }}>{token}</code>
              <span style={{
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
                {value}
              </span>
            </div>)}
        </div>
      </div>;
  }
}`,...(E=(P=c.parameters)==null?void 0:P.docs)==null?void 0:E.source},description:{story:"Component sizing tokens",...($=(W=c.parameters)==null?void 0:W.docs)==null?void 0:$.description}}};var F,A,U,L,M;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div>
        <Heading level={4} data-size="sm" style={{
        marginBottom: 'var(--ds-spacing-4)'
      }}>
          {t('storybook.sizes.whenToUseWhichSpacing')}
        </Heading>

        <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--ds-font-size-sm)'
      }}>
          <thead>
            <tr style={{
            backgroundColor: 'var(--ds-color-neutral-surface-hover)'
          }}>
              <th style={{
              padding: 'var(--ds-spacing-3)',
              textAlign: 'left',
              borderBottom: '1px solid var(--ds-color-neutral-border-default)'
            }}>
                {t('storybook.sizes.useCase')}
              </th>
              <th style={{
              padding: 'var(--ds-spacing-3)',
              textAlign: 'left',
              borderBottom: '1px solid var(--ds-color-neutral-border-default)'
            }}>
                {t('storybook.sizes.token')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                {t('storybook.sizes.inlineElements')}
              </td>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                <code>spacing-1, spacing-2</code>
              </td>
            </tr>
            <tr>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                {t('storybook.sizes.formFieldGaps')}
              </td>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                <code>spacing-3, spacing-4</code>
              </td>
            </tr>
            <tr>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                {t('storybook.sizes.cardPadding')}
              </td>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                <code>spacing-5, spacing-6</code>
              </td>
            </tr>
            <tr>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                {t('storybook.sizes.pageSections')}
              </td>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                <code>spacing-8, spacing-10</code>
              </td>
            </tr>
            <tr>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                {t('storybook.sizes.majorDivisions')}
              </td>
              <td style={{
              padding: 'var(--ds-spacing-3)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)'
            }}>
                <code>spacing-12+</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>;
  }
}`,...(U=(A=p.parameters)==null?void 0:A.docs)==null?void 0:U.source},description:{story:"Semantic spacing usage",...(M=(L=p.parameters)==null?void 0:L.docs)==null?void 0:M.description}}};var G,_,O,V,q;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <Card>
        <div style={{
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        overflow: 'hidden'
      }}>
          <div style={{
          height: 'var(--ds-spacing-20)',
          backgroundColor: 'var(--ds-color-accent-surface-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ds-color-accent-text-default)'
        }}>
            {t('storybook.sizes.imageArea')}
          </div>

          <div style={{
          padding: 'var(--ds-spacing-6)'
        }}>
            <Heading level={3} data-size="md" style={{
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              {t('storybook.sizes.cardTitle')}
            </Heading>

            <Paragraph data-size="sm" style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
              {t('storybook.sizes.descriptionText')}
            </Paragraph>

            <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
              <span style={{
              padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-2)'
            }}>
                {t('storybook.sizes.tag')} 1
              </span>
              <span style={{
              padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-2)'
            }}>
                {t('storybook.sizes.tag')} 2
              </span>
            </div>
          </div>

          <div style={{
          padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
            <span style={{
            fontSize: 'var(--ds-font-size-2)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
              {t('storybook.sizes.metaInfo')}
            </span>
            <Button data-variant="primary" data-size="sm">
              {t('storybook.examples.action')}
            </Button>
          </div>
        </div>

        <Paragraph data-size="xs" style={{
        marginTop: 'var(--ds-spacing-4)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          <strong>{t('storybook.sizes.spacingUsed')}:</strong> spacing-1 (
          {t('storybook.sizes.tags')}
          ), spacing-2 ({t('storybook.sizes.gaps')}), spacing-4 ({t('storybook.sizes.sections')}),
          spacing-6 ({t('storybook.sizes.cardPaddingLabel')})
        </Paragraph>
      </Card>;
  }
}`,...(O=(_=v.parameters)==null?void 0:_.docs)==null?void 0:O.source},description:{story:"Card layout example with proper spacing",...(q=(V=v.parameters)==null?void 0:V.docs)==null?void 0:q.description}}};const vs=["SizeModes","SpacingScale","SpacingInPractice","ComponentSizing","SemanticUsage","CardLayoutExample"];export{v as CardLayoutExample,c as ComponentSizing,p as SemanticUsage,t as SizeModes,l as SpacingInPractice,i as SpacingScale,vs as __namedExportsOrder,ps as default};
//# sourceMappingURL=SizesAndSpacing.stories-DElcAaqD.js.map
