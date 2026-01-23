import{j as e}from"./jsx-runtime-BYYWji4R.js";import{A as a}from"./alert-BzTWXKSs.js";import"./tooltip-oTYV5y50.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import{H as t}from"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import{L as Z}from"./link-DlTbUgI1.js";import{P as r}from"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const ke={title:"Components/Alert",component:a,parameters:{docs:{description:{component:`
Alert provides users with information that is especially important for them to see and understand. The component is designed to capture users' attention. The text in the alert should be short and clear.

## Variants

- **Info** (data-color="info") - Neutral and useful information
- **Success** (data-color="success") - Confirm task completion
- **Warning** (data-color="warning") - Important actions or warnings
- **Danger** (data-color="danger") - Critical information or errors

## When to Use

- **Info**: Provide neutral and useful information
- **Success**: Confirm that the user has completed a task successfully
- **Warning**: User needs to take a specific action or be warned about something important
- **Danger**: Critical information that prevents the user from moving forward

## Best Practices

- Keep text short and clear
- Use headings for longer messages (more than one sentence)
- Only include links when absolutely necessary
- Choose correct heading level based on page structure

## Accessibility

- Screen readers: Alert role announced
- Color: Not sole indicator of meaning
- Semantic HTML with proper heading levels
        `}}},tags:["autodocs"],argTypes:{"data-color":{control:"select",options:["info","success","warning","danger"],description:"Color variant of the alert"}}},s={render:()=>e.jsxs(a,{"data-color":"info",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Have you remembered to book a passport appointment?"}),e.jsx(r,{children:"There are long queues for booking a passport these days, so it may be wise to book well in advance of your trip."})]})},o={render:()=>e.jsxs(a,{"data-color":"success",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Congratulations! You can now start your company"}),e.jsx(r,{children:"It looks like the numbers add up, and that you have what it takes to start your company."})]})},i={render:()=>e.jsxs(a,{"data-color":"warning",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"We are experiencing technical issues"}),e.jsx(r,{children:"This means you may be interrupted while filling in the form. We are working to fix the issues."})]})},n={render:()=>e.jsxs(a,{"data-color":"danger",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"An error has occurred"}),e.jsx(r,{children:"We are unable to retrieve the information you are looking for right now. Please try again later. If we still cannot show the information you need, please contact customer service on telephone 85 44 32 66."})]})},l={render:()=>e.jsxs(a,{children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Have you remembered to book a passport appointment?"}),e.jsx(r,{children:"There are long queues for booking a passport these days, so it may be wise to book well in advance if you need a passport for the summer."})]})},d={render:()=>e.jsx(a,{"data-color":"warning",children:e.jsx(r,{children:"You have 7 days left to complete the application."})})},c={render:()=>e.jsxs(a,{"data-color":"warning",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"The application deadline is in 3 days"}),e.jsxs(r,{children:["The deadline for applying for admission to education is 15 April."," ",e.jsx(Z,{href:"#",children:"Apply now"})]})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"Color Variants"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(a,{"data-color":"info",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Information"}),e.jsx(r,{children:"This is neutral and useful information for the user."})]}),e.jsxs(a,{"data-color":"success",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Success"}),e.jsx(r,{children:"The task has been completed successfully."})]}),e.jsxs(a,{"data-color":"warning",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Warning"}),e.jsx(r,{children:"Important information that requires attention."})]}),e.jsxs(a,{"data-color":"danger",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Error"}),e.jsx(r,{children:"Critical information that prevents moving forward."})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"With and Without Heading"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(a,{"data-color":"info",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"With heading (longer message)"}),e.jsx(r,{children:"If the message is longer than a sentence, use a heading to highlight the most important thing."})]}),e.jsx(a,{"data-color":"warning",children:e.jsx(r,{children:"Without heading - simple sentence for short messages."})})]})]}),e.jsxs("div",{children:[e.jsx("h3",{style:{marginBottom:"var(--ds-spacing-3)",fontSize:"var(--ds-font-size-4)"},children:"With Link"}),e.jsxs(a,{"data-color":"warning",children:[e.jsx(t,{level:2,"data-size":"xs",style:{marginBottom:"var(--ds-spacing-2)"},children:"Action required"}),e.jsxs(r,{children:["Use links only when absolutely necessary. ",e.jsx(Z,{href:"#",children:"Take action"})]})]})]})]})};var h,m,g,u,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <Alert data-color="info">
      <Heading level={2} data-size="xs" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        Have you remembered to book a passport appointment?
      </Heading>
      <Paragraph>
        There are long queues for booking a passport these days, so it may be wise to book well in
        advance of your trip.
      </Paragraph>
    </Alert>
}`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source},description:{story:"Info alert - Use when you want to provide the user with neutral and useful information.",...(f=(u=s.parameters)==null?void 0:u.docs)==null?void 0:f.description}}};var v,y,x,w,j;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Alert data-color="success">
      <Heading level={2} data-size="xs" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        Congratulations! You can now start your company
      </Heading>
      <Paragraph>
        It looks like the numbers add up, and that you have what it takes to start your company.
      </Paragraph>
    </Alert>
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source},description:{story:"Success alert - Use when you want to confirm that the user has completed a task, that the action was successful.",...(j=(w=o.parameters)==null?void 0:w.docs)==null?void 0:j.description}}};var k,A,b,H,z;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Alert data-color="warning">
      <Heading level={2} data-size="xs" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        We are experiencing technical issues
      </Heading>
      <Paragraph>
        This means you may be interrupted while filling in the form. We are working to fix the
        issues.
      </Paragraph>
    </Alert>
}`,...(b=(A=i.parameters)==null?void 0:A.docs)==null?void 0:b.source},description:{story:"Warning alert - Use when you want the user to take a specific action or to warn them about something important.",...(z=(H=i.parameters)==null?void 0:H.docs)==null?void 0:z.description}}};var P,B,W,S,T;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <Alert data-color="danger">
      <Heading level={2} data-size="xs" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        An error has occurred
      </Heading>
      <Paragraph>
        We are unable to retrieve the information you are looking for right now. Please try again
        later. If we still cannot show the information you need, please contact customer service on
        telephone 85 44 32 66.
      </Paragraph>
    </Alert>
}`,...(W=(B=n.parameters)==null?void 0:B.docs)==null?void 0:W.source},description:{story:"Danger alert - Use to inform about something that is critical or that prevents the user from moving forward.",...(T=(S=n.parameters)==null?void 0:S.docs)==null?void 0:T.description}}};var I,C,D,L,U;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Alert>
      <Heading level={2} data-size="xs" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        Have you remembered to book a passport appointment?
      </Heading>
      <Paragraph>
        There are long queues for booking a passport these days, so it may be wise to book well in
        advance if you need a passport for the summer.
      </Paragraph>
    </Alert>
}`,...(D=(C=l.parameters)==null?void 0:C.docs)==null?void 0:D.source},description:{story:"Alert with heading - If the message is longer than a sentence, use a heading to highlight the most important thing.",...(U=(L=l.parameters)==null?void 0:L.docs)==null?void 0:U.description}}};var q,V,Y,E,O;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Alert data-color="warning">
      <Paragraph>You have 7 days left to complete the application.</Paragraph>
    </Alert>
}`,...(Y=(V=d.parameters)==null?void 0:V.docs)==null?void 0:Y.source},description:{story:"Alert without heading - If the title and description repeat the same thing, use a simple sentence without a heading.",...(O=(E=d.parameters)==null?void 0:E.docs)==null?void 0:O.description}}};var N,_,K,M,R;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Alert data-color="warning">
      <Heading level={2} data-size="xs" style={{
      marginBottom: 'var(--ds-spacing-2)'
    }}>
        The application deadline is in 3 days
      </Heading>
      <Paragraph>
        The deadline for applying for admission to education is 15 April.{' '}
        <Link href="#">Apply now</Link>
      </Paragraph>
    </Alert>
}`,...(K=(_=c.parameters)==null?void 0:_.docs)==null?void 0:K.source},description:{story:`Alert with link - You can have a link in the Alert if it helps the user solve the task.
Be aware that a link takes the user out of the service, so use links only when absolutely necessary.`,...(R=(M=c.parameters)==null?void 0:M.docs)==null?void 0:R.description}}};var F,G,J,Q,X;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-6)'
  }}>
      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          Color Variants
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Alert data-color="info">
            <Heading level={2} data-size="xs" style={{
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              Information
            </Heading>
            <Paragraph>This is neutral and useful information for the user.</Paragraph>
          </Alert>

          <Alert data-color="success">
            <Heading level={2} data-size="xs" style={{
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              Success
            </Heading>
            <Paragraph>The task has been completed successfully.</Paragraph>
          </Alert>

          <Alert data-color="warning">
            <Heading level={2} data-size="xs" style={{
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              Warning
            </Heading>
            <Paragraph>Important information that requires attention.</Paragraph>
          </Alert>

          <Alert data-color="danger">
            <Heading level={2} data-size="xs" style={{
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              Error
            </Heading>
            <Paragraph>Critical information that prevents moving forward.</Paragraph>
          </Alert>
        </div>
      </div>

      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          With and Without Heading
        </h3>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          <Alert data-color="info">
            <Heading level={2} data-size="xs" style={{
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              With heading (longer message)
            </Heading>
            <Paragraph>
              If the message is longer than a sentence, use a heading to highlight the most
              important thing.
            </Paragraph>
          </Alert>

          <Alert data-color="warning">
            <Paragraph>Without heading - simple sentence for short messages.</Paragraph>
          </Alert>
        </div>
      </div>

      <div>
        <h3 style={{
        marginBottom: 'var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-4)'
      }}>
          With Link
        </h3>
        <Alert data-color="warning">
          <Heading level={2} data-size="xs" style={{
          marginBottom: 'var(--ds-spacing-2)'
        }}>
            Action required
          </Heading>
          <Paragraph>
            Use links only when absolutely necessary. <Link href="#">Take action</Link>
          </Paragraph>
        </Alert>
      </div>
    </div>
}`,...(J=(G=p.parameters)==null?void 0:G.docs)==null?void 0:J.source},description:{story:"All color variants - Overview of all available alert colors",...(X=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};const Ae=["Information","Success","Warning","Danger","WithHeading","WithoutHeading","WithLink","AllVariants"];export{p as AllVariants,n as Danger,s as Information,o as Success,i as Warning,l as WithHeading,c as WithLink,d as WithoutHeading,Ae as __namedExportsOrder,ke as default};
//# sourceMappingURL=Alert.stories-CGVGnbBO.js.map
