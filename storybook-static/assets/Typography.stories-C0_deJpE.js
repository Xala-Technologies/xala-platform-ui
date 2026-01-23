import{j as e}from"./jsx-runtime-BYYWji4R.js";import{H as a}from"./heading-mzc2R_Ff.js";import{P as r}from"./paragraph-DDCpJsVw.js";import{L as s}from"./label-9E-twYNb.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";const ve={title:"Fundamentals/Typography",parameters:{docs:{description:{component:`
Typography system from Designsystemet with Digilist theme.

## Type Scale
Based on a modular scale with responsive sizing via \`data-size\` attribute.

## Font
Uses Inter font family for optimal readability.

## Reference
[Designsystemet Typography](https://designsystemet.no/no/fundamentals/design-elements/typography)
        `}}},tags:["autodocs"]},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx(s,{style:{marginBottom:"var(--ds-spacing-2)"},children:"Default Font (Inter)"}),e.jsxs("div",{style:{fontFamily:"var(--ds-font-family-default, Inter, system-ui, sans-serif)",fontSize:"var(--ds-font-size-5)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:"abcdefghijklmnopqrstuvwxyz"}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:"0123456789"}),e.jsx("p",{children:"Digilist – ResourceRequest for alle"})]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)",marginTop:"var(--ds-spacing-2)",display:"block"},children:"font-family: var(--ds-font-family-default)"})]}),e.jsxs("div",{children:[e.jsx(s,{style:{marginBottom:"var(--ds-spacing-2)"},children:"Monospace Font (Code)"}),e.jsxs("div",{style:{fontFamily:"var(--ds-font-family-mono, ui-monospace, monospace)",fontSize:"var(--ds-font-size-3)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:"abcdefghijklmnopqrstuvwxyz"}),e.jsx("p",{style:{marginBottom:"var(--ds-spacing-2)"},children:"0123456789"}),e.jsx("p",{children:"const resourceRequest = await createResourceRequest(data);"})]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)",marginTop:"var(--ds-spacing-2)",display:"block"},children:"font-family: var(--ds-font-family-mono)"})]}),e.jsx("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-info-surface-default)",borderRadius:"var(--ds-border-radius-md)",borderLeft:"4px solid var(--ds-color-info-border-default)"},children:e.jsxs(r,{"data-size":"sm",children:[e.jsx("strong",{children:"Note:"})," Inter is loaded via Google Fonts or self-hosted. The system falls back to system-ui for optimal performance if Inter is unavailable."]})})]})},i={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[{weight:400,name:"Regular",variable:"--ds-font-weight-regular"},{weight:500,name:"Medium",variable:"--ds-font-weight-medium"},{weight:600,name:"Semibold",variable:"--ds-font-weight-semibold"},{weight:700,name:"Bold",variable:"--ds-font-weight-bold"}].map(({weight:m,name:ie,variable:ne})=>e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:"var(--ds-spacing-4)"},children:[e.jsxs("span",{style:{fontWeight:m,fontSize:"var(--ds-font-size-5)",minWidth:"var(--ds-size-50)"},children:[ie," (",m,")"]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-neutral-text-subtle)"},children:ne})]},m))})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsx(a,{level:1,"data-size":"2xl",children:"Heading 2XL (h1)"}),e.jsx(a,{level:1,"data-size":"xl",children:"Heading XL (h1)"}),e.jsx(a,{level:2,"data-size":"lg",children:"Heading LG (h2)"}),e.jsx(a,{level:2,"data-size":"md",children:"Heading MD (h2)"}),e.jsx(a,{level:3,"data-size":"sm",children:"Heading SM (h3)"}),e.jsx(a,{level:3,"data-size":"xs",children:"Heading XS (h3)"}),e.jsx(a,{level:4,"data-size":"2xs",children:"Heading 2XS (h4)"})]})},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)",maxWidth:"var(--ds-size-150)"},children:[e.jsxs("div",{children:[e.jsx(s,{children:"Body XL"}),e.jsx(r,{"data-size":"xl",children:"Dette er brødtekst i XL-størrelse. Brukes for fremhevet innhold."})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Body LG"}),e.jsx(r,{"data-size":"lg",children:"Dette er brødtekst i LG-størrelse. God for ingress og viktig informasjon."})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Body MD (default)"}),e.jsx(r,{"data-size":"md",children:"Dette er standard brødtekst. Den brukes for mesteparten av innholdet på siden. Lengre avsnitt bør bruke denne størrelsen for optimal lesbarhet."})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Body SM"}),e.jsx(r,{"data-size":"sm",children:"Dette er mindre brødtekst. Brukes for sekundært innhold, bildetekster, og metadata."})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Body XS"}),e.jsx(r,{"data-size":"xs",children:"Minste brødtekst. Brukes sparsommelig for fotnoter og juridisk tekst."})]})]})},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)",maxWidth:"var(--ds-size-175)"},children:[e.jsxs("div",{children:[e.jsx(s,{style:{marginBottom:"var(--ds-spacing-2)"},children:"Short (compact line-height)"}),e.jsx(r,{variant:"short",children:"Kort variant har tettere linjeavstand og passer for UI-tekst, knapper, og korte beskrivelser hvor kompakthet er ønsket."})]}),e.jsxs("div",{children:[e.jsx(s,{style:{marginBottom:"var(--ds-spacing-2)"},children:"Long (relaxed line-height)"}),e.jsx(r,{variant:"long",children:"Lang variant har romsligere linjeavstand og er ideell for lengre tekster som artikler og dokumentasjon. Den økte linjeavstanden gjør det lettere å følge teksten over flere linjer og forbedrer lesbarheten betydelig for omfattende innhold."})]})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)",maxWidth:"var(--ds-size-100)"},children:[e.jsxs("div",{children:[e.jsx(s,{"data-size":"lg",children:"Large Label"}),e.jsx(r,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Description text for the field"})]}),e.jsxs("div",{children:[e.jsx(s,{"data-size":"md",children:"Medium Label (default)"}),e.jsx(r,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Helper text explaining the field"})]}),e.jsxs("div",{children:[e.jsx(s,{"data-size":"sm",children:"Small Label"}),e.jsx(r,{"data-size":"xs",style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Compact helper text"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Field with Error"}),e.jsx(r,{"data-size":"sm",style:{color:"var(--ds-color-danger-text-default)"},children:"This field is required"})]})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{"data-size":"sm",style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:3,"data-size":"sm",children:"Small Size Context"}),e.jsx(r,{children:"All text in this container uses small size tokens."})]}),e.jsxs("div",{"data-size":"md",style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:3,"data-size":"sm",children:"Medium Size Context (default)"}),e.jsx(r,{children:"All text in this container uses medium size tokens."})]}),e.jsxs("div",{"data-size":"lg",style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)"},children:[e.jsx(a,{level:3,"data-size":"sm",children:"Large Size Context"}),e.jsx(r,{children:"All text in this container uses large size tokens."})]})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsx(r,{style:{color:"var(--ds-color-neutral-text-default)"},children:"Default text color - primary content"}),e.jsx(r,{style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Subtle text color - secondary content, descriptions"}),e.jsx(r,{style:{color:"var(--ds-color-accent-text-default)"},children:"Accent text color - links, interactive elements"}),e.jsx(r,{style:{color:"var(--ds-color-success-text-default)"},children:"Success text color - positive feedback"}),e.jsx(r,{style:{color:"var(--ds-color-warning-text-default)"},children:"Warning text color - cautionary messages"}),e.jsx(r,{style:{color:"var(--ds-color-danger-text-default)"},children:"Danger text color - errors, destructive actions"})]})},p={render:()=>e.jsxs("article",{style:{maxWidth:"var(--ds-size-175)"},children:[e.jsx(a,{level:1,"data-size":"xl",style:{marginBottom:"var(--ds-spacing-4)"},children:"Velkommen til Digilist"}),e.jsx(r,{"data-size":"lg",variant:"short",style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"En moderne plattform for resourceRequest og utleie av lokaler og ressurser."}),e.jsx(a,{level:2,"data-size":"md",style:{marginBottom:"var(--ds-spacing-3)"},children:"Slik fungerer det"}),e.jsx(r,{variant:"long",style:{marginBottom:"var(--ds-spacing-4)"},children:"Digilist gjør det enkelt å finne og reservere lokaler i din kommune. Søk blant tilgjengelige rom, sjekk ledighet i sanntid, og book direkte. Alt fra møterom til idrettshaller er samlet på ett sted."}),e.jsx(a,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:"For utleiere"}),e.jsx(r,{"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:"Administrer dine lokaler effektivt med full oversikt over resourceRequester, tilgjengelighet og inntekter."}),e.jsx(r,{"data-size":"xs",style:{color:"var(--ds-color-neutral-text-subtle)"},children:"Sist oppdatert: Januar 2026"})]})};var v,h,u,x,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <Label style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>Default Font (Inter)</Label>
        <div style={{
        fontFamily: 'var(--ds-font-family-default, Inter, system-ui, sans-serif)',
        fontSize: 'var(--ds-font-size-5)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>abcdefghijklmnopqrstuvwxyz</p>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>0123456789</p>
          <p>Digilist – ResourceRequest for alle</p>
        </div>
        <code style={{
        fontSize: 'var(--ds-font-size-xs)',
        color: 'var(--ds-color-neutral-text-subtle)',
        marginTop: 'var(--ds-spacing-2)',
        display: 'block'
      }}>
          font-family: var(--ds-font-family-default)
        </code>
      </div>

      <div>
        <Label style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>Monospace Font (Code)</Label>
        <div style={{
        fontFamily: 'var(--ds-font-family-mono, ui-monospace, monospace)',
        fontSize: 'var(--ds-font-size-3)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>abcdefghijklmnopqrstuvwxyz</p>
          <p style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>0123456789</p>
          <p>{\`const resourceRequest = await createResourceRequest(data);\`}</p>
        </div>
        <code style={{
        fontSize: 'var(--ds-font-size-xs)',
        color: 'var(--ds-color-neutral-text-subtle)',
        marginTop: 'var(--ds-spacing-2)',
        display: 'block'
      }}>
          font-family: var(--ds-font-family-mono)
        </code>
      </div>

      <div style={{
      padding: 'var(--ds-spacing-4)',
      backgroundColor: 'var(--ds-color-info-surface-default)',
      borderRadius: 'var(--ds-border-radius-md)',
      borderLeft: '4px solid var(--ds-color-info-border-default)'
    }}>
        <Paragraph data-size="sm">
          <strong>Note:</strong> Inter is loaded via Google Fonts or self-hosted. The system falls
          back to system-ui for optimal performance if Inter is unavailable.
        </Paragraph>
      </div>
    </div>
}`,...(u=(h=t.parameters)==null?void 0:h.docs)==null?void 0:u.source},description:{story:"Font families used in the design system",...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.description}}};var y,b,j,z,k;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)'
  }}>
      {[{
      weight: 400,
      name: 'Regular',
      variable: '--ds-font-weight-regular'
    }, {
      weight: 500,
      name: 'Medium',
      variable: '--ds-font-weight-medium'
    }, {
      weight: 600,
      name: 'Semibold',
      variable: '--ds-font-weight-semibold'
    }, {
      weight: 700,
      name: 'Bold',
      variable: '--ds-font-weight-bold'
    }].map(({
      weight,
      name,
      variable
    }) => <div key={weight} style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--ds-spacing-4)'
    }}>
          <span style={{
        fontWeight: weight,
        fontSize: 'var(--ds-font-size-5)',
        minWidth: 'var(--ds-size-50)'
      }}>
            {name} ({weight})
          </span>
          <code style={{
        fontSize: 'var(--ds-font-size-xs)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
            {variable}
          </code>
        </div>)}
    </div>
}`,...(j=(b=i.parameters)==null?void 0:b.docs)==null?void 0:j.source},description:{story:"Font weights",...(k=(z=i.parameters)==null?void 0:z.docs)==null?void 0:k.description}}};var L,S,P,B,D;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Heading level={1} data-size="2xl">
        Heading 2XL (h1)
      </Heading>
      <Heading level={1} data-size="xl">
        Heading XL (h1)
      </Heading>
      <Heading level={2} data-size="lg">
        Heading LG (h2)
      </Heading>
      <Heading level={2} data-size="md">
        Heading MD (h2)
      </Heading>
      <Heading level={3} data-size="sm">
        Heading SM (h3)
      </Heading>
      <Heading level={3} data-size="xs">
        Heading XS (h3)
      </Heading>
      <Heading level={4} data-size="2xs">
        Heading 2XS (h4)
      </Heading>
    </div>
}`,...(P=(S=n.parameters)==null?void 0:S.docs)==null?void 0:P.source},description:{story:"Heading sizes from 2xl to 2xs",...(D=(B=n.parameters)==null?void 0:B.docs)==null?void 0:D.description}}};var H,R,w,F,C;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)',
    maxWidth: 'var(--ds-size-150)'
  }}>
      <div>
        <Label>Body XL</Label>
        <Paragraph data-size="xl">
          Dette er brødtekst i XL-størrelse. Brukes for fremhevet innhold.
        </Paragraph>
      </div>
      <div>
        <Label>Body LG</Label>
        <Paragraph data-size="lg">
          Dette er brødtekst i LG-størrelse. God for ingress og viktig informasjon.
        </Paragraph>
      </div>
      <div>
        <Label>Body MD (default)</Label>
        <Paragraph data-size="md">
          Dette er standard brødtekst. Den brukes for mesteparten av innholdet på siden. Lengre
          avsnitt bør bruke denne størrelsen for optimal lesbarhet.
        </Paragraph>
      </div>
      <div>
        <Label>Body SM</Label>
        <Paragraph data-size="sm">
          Dette er mindre brødtekst. Brukes for sekundært innhold, bildetekster, og metadata.
        </Paragraph>
      </div>
      <div>
        <Label>Body XS</Label>
        <Paragraph data-size="xs">
          Minste brødtekst. Brukes sparsommelig for fotnoter og juridisk tekst.
        </Paragraph>
      </div>
    </div>
}`,...(w=(R=d.parameters)==null?void 0:R.docs)==null?void 0:w.source},description:{story:"Body text variants",...(C=(F=d.parameters)==null?void 0:F.docs)==null?void 0:C.description}}};var M,T,W,A,X;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)',
    maxWidth: 'var(--ds-size-175)'
  }}>
      <div>
        <Label style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>Short (compact line-height)</Label>
        <Paragraph variant="short">
          Kort variant har tettere linjeavstand og passer for UI-tekst, knapper, og korte
          beskrivelser hvor kompakthet er ønsket.
        </Paragraph>
      </div>
      <div>
        <Label style={{
        marginBottom: 'var(--ds-spacing-2)'
      }}>Long (relaxed line-height)</Label>
        <Paragraph variant="long">
          Lang variant har romsligere linjeavstand og er ideell for lengre tekster som artikler og
          dokumentasjon. Den økte linjeavstanden gjør det lettere å følge teksten over flere linjer
          og forbedrer lesbarheten betydelig for omfattende innhold.
        </Paragraph>
      </div>
    </div>
}`,...(W=(T=o.parameters)==null?void 0:T.docs)==null?void 0:W.source},description:{story:"Paragraph variants (short vs long)",...(X=(A=o.parameters)==null?void 0:A.docs)==null?void 0:X.description}}};var I,q,G,E,V;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)',
    maxWidth: 'var(--ds-size-100)'
  }}>
      <div>
        <Label data-size="lg">Large Label</Label>
        <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Description text for the field
        </Paragraph>
      </div>
      <div>
        <Label data-size="md">Medium Label (default)</Label>
        <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Helper text explaining the field
        </Paragraph>
      </div>
      <div>
        <Label data-size="sm">Small Label</Label>
        <Paragraph data-size="xs" style={{
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Compact helper text
        </Paragraph>
      </div>
      <div>
        <Label>Field with Error</Label>
        <Paragraph data-size="sm" style={{
        color: 'var(--ds-color-danger-text-default)'
      }}>
          This field is required
        </Paragraph>
      </div>
    </div>
}`,...(G=(q=l.parameters)==null?void 0:q.docs)==null?void 0:G.source},description:{story:"Labels and form typography",...(V=(E=l.parameters)==null?void 0:E.docs)==null?void 0:V.description}}};var U,J,K,N,O;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div data-size="sm" style={{
      padding: 'var(--ds-spacing-4)',
      backgroundColor: 'var(--ds-color-neutral-surface-hover)',
      borderRadius: 'var(--ds-border-radius-md)'
    }}>
        <Heading level={3} data-size="sm">
          Small Size Context
        </Heading>
        <Paragraph>All text in this container uses small size tokens.</Paragraph>
      </div>
      <div data-size="md" style={{
      padding: 'var(--ds-spacing-4)',
      backgroundColor: 'var(--ds-color-neutral-surface-hover)',
      borderRadius: 'var(--ds-border-radius-md)'
    }}>
        <Heading level={3} data-size="sm">
          Medium Size Context (default)
        </Heading>
        <Paragraph>All text in this container uses medium size tokens.</Paragraph>
      </div>
      <div data-size="lg" style={{
      padding: 'var(--ds-spacing-4)',
      backgroundColor: 'var(--ds-color-neutral-surface-hover)',
      borderRadius: 'var(--ds-border-radius-md)'
    }}>
        <Heading level={3} data-size="sm">
          Large Size Context
        </Heading>
        <Paragraph>All text in this container uses large size tokens.</Paragraph>
      </div>
    </div>
}`,...(K=(J=c.parameters)==null?void 0:J.docs)==null?void 0:K.source},description:{story:"Responsive sizes via data-size attribute",...(O=(N=c.parameters)==null?void 0:N.docs)==null?void 0:O.description}}};var Q,Y,Z,_,$;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)'
  }}>
      <Paragraph style={{
      color: 'var(--ds-color-neutral-text-default)'
    }}>
        Default text color - primary content
      </Paragraph>
      <Paragraph style={{
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        Subtle text color - secondary content, descriptions
      </Paragraph>
      <Paragraph style={{
      color: 'var(--ds-color-accent-text-default)'
    }}>
        Accent text color - links, interactive elements
      </Paragraph>
      <Paragraph style={{
      color: 'var(--ds-color-success-text-default)'
    }}>
        Success text color - positive feedback
      </Paragraph>
      <Paragraph style={{
      color: 'var(--ds-color-warning-text-default)'
    }}>
        Warning text color - cautionary messages
      </Paragraph>
      <Paragraph style={{
      color: 'var(--ds-color-danger-text-default)'
    }}>
        Danger text color - errors, destructive actions
      </Paragraph>
    </div>
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Typography with semantic colors",...($=(_=g.parameters)==null?void 0:_.docs)==null?void 0:$.description}}};var ee,re,ae,se,te;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <article style={{
    maxWidth: 'var(--ds-size-175)'
  }}>
      <Heading level={1} data-size="xl" style={{
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Velkommen til Digilist
      </Heading>
      <Paragraph data-size="lg" variant="short" style={{
      marginBottom: 'var(--ds-spacing-6)',
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        En moderne plattform for resourceRequest og utleie av lokaler og ressurser.
      </Paragraph>

      <Heading level={2} data-size="md" style={{
      marginBottom: 'var(--ds-spacing-3)'
    }}>
        Slik fungerer det
      </Heading>
      <Paragraph variant="long" style={{
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Digilist gjør det enkelt å finne og reservere lokaler i din kommune. Søk blant tilgjengelige
        rom, sjekk ledighet i sanntid, og book direkte. Alt fra møterom til idrettshaller er samlet
        på ett sted.
      </Paragraph>

      <Heading level={3} data-size="sm" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        For utleiere
      </Heading>
      <Paragraph data-size="sm" style={{
      marginBottom: 'var(--ds-spacing-4)'
    }}>
        Administrer dine lokaler effektivt med full oversikt over resourceRequester, tilgjengelighet
        og inntekter.
      </Paragraph>

      <Paragraph data-size="xs" style={{
      color: 'var(--ds-color-neutral-text-subtle)'
    }}>
        Sist oppdatert: Januar 2026
      </Paragraph>
    </article>
}`,...(ae=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ae.source},description:{story:"Complete typography example",...(te=(se=p.parameters)==null?void 0:se.docs)==null?void 0:te.description}}};const he=["FontFamilies","FontWeights","Headings","BodyText","ParagraphVariants","FormTypography","ResponsiveSizes","SemanticColors","ArticleExample"];export{p as ArticleExample,d as BodyText,t as FontFamilies,i as FontWeights,l as FormTypography,n as Headings,o as ParagraphVariants,c as ResponsiveSizes,g as SemanticColors,he as __namedExportsOrder,ve as default};
//# sourceMappingURL=Typography.stories-C0_deJpE.js.map
