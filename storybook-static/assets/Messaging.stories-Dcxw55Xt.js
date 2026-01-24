import{j as e}from"./jsx-runtime-BYYWji4R.js";import{fn as a}from"./index-CLEdRh-S.js";import{r as u}from"./index-ClcD9ViR.js";import{u as n}from"./index-bjNF47ar.js";import{N as c,C as G,a as I,b as S,M as w}from"./messaging-D4A0x4io.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-DMXJFGWX-CI_CoAy0.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";const Ie={title:"Blocks/Messaging",component:c,parameters:{layout:"centered",docs:{description:{component:`
## Messaging Components

Reusable components for chat/messaging functionality including notification bell, conversation lists, and chat threads.

### Features
- Notification bell with badge count
- Conversation list with search
- Message bubbles with read receipts
- Chat thread with input

### Usage
\`\`\`tsx
<NotificationBell count={5} onClick={handleClick} />
<ConversationList conversations={conversations} onSelect={handleSelect} />
<ChatThread messages={messages} onSend={handleSend} />
\`\`\`
        `}}},tags:["autodocs"]},l=[{id:"1",userName:"John Doe",subject:"Booking inquiry",lastMessage:"Thank you for your response!",lastMessageTime:new Date(Date.now()-1e3*60*5).toISOString(),unreadCount:2,status:"active",isOnline:!0},{id:"2",userName:"Jane Smith",subject:"Resource availability",lastMessage:"When will the room be available?",lastMessageTime:new Date(Date.now()-1e3*60*30).toISOString(),unreadCount:0,status:"pending",isOnline:!1},{id:"3",userName:"Bob Johnson",subject:"Payment confirmation",lastMessage:"Payment has been received.",lastMessageTime:new Date(Date.now()-1e3*60*60).toISOString(),unreadCount:1,status:"resolved",isOnline:!0}],b=[{id:"1",content:"Hello, I have a question about the booking.",senderId:"user-1",senderName:"John Doe",createdAt:new Date(Date.now()-1e3*60*60).toISOString(),isRead:!0,isFromCurrentUser:!1},{id:"2",content:"Sure, how can I help you?",senderId:"current-user",senderName:"You",createdAt:new Date(Date.now()-1e3*60*55).toISOString(),isRead:!0,isFromCurrentUser:!0},{id:"3",content:"When is the earliest I can book?",senderId:"user-1",senderName:"John Doe",createdAt:new Date(Date.now()-1e3*60*50).toISOString(),isRead:!0,isFromCurrentUser:!1},{id:"4",content:"You can book starting from next week.",senderId:"current-user",senderName:"You",createdAt:new Date(Date.now()-1e3*60*45).toISOString(),isRead:!1,isFromCurrentUser:!0}],m={render:function(){return n(),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",alignItems:"center"},children:[e.jsx(c,{count:0,onClick:a()}),e.jsx(c,{count:5,onClick:a()}),e.jsx(c,{count:99,onClick:a()}),e.jsx(c,{count:150,onClick:a(),maxCount:99})]})}},p={render:function(){return n(),e.jsxs("div",{style:{width:"300px"},children:[e.jsx(S,{conversation:l[0],isSelected:!1,onClick:a()}),e.jsx(S,{conversation:l[1],isSelected:!0,onClick:a()}),e.jsx(S,{conversation:l[2],isSelected:!1,onClick:a()})]})}},g={render:function(){n();const[t,s]=u.useState(null);return e.jsx("div",{style:{width:"350px",height:"500px",border:"1px solid var(--ds-color-neutral-border-default)"},children:e.jsx(I,{conversations:l,selectedId:t,onSelect:o=>s(o)})})}},h={render:function(){const t=n(),[s,o]=u.useState(null),[i,d]=u.useState("all");return e.jsx("div",{style:{width:"350px",height:"500px",border:"1px solid var(--ds-color-neutral-border-default)"},children:e.jsx(I,{conversations:l,selectedId:s,onSelect:K=>o(K),filterTabs:[{id:"all",label:"All",count:3},{id:"active",label:t("platform.status.active"),count:1},{id:"pending",label:t("platform.status.pending"),count:1}],activeFilter:i,onFilterChange:d})})}},v={render:function(){const t=n();return e.jsx("div",{style:{width:"350px",height:"500px",border:"1px solid var(--ds-color-neutral-border-default)"},children:e.jsx(I,{conversations:[],emptyMessage:t("storybook.demo.sampleText")})})}},f={render:function(){return n(),e.jsxs("div",{style:{width:"400px",display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:[e.jsx(w,{message:b[0],isFromCurrentUser:!1,showReadReceipt:!0}),e.jsx(w,{message:b[1],isFromCurrentUser:!0,showReadReceipt:!0}),e.jsx(w,{message:b[3],isFromCurrentUser:!0,showReadReceipt:!0})]})}},x={render:function(){const t=n(),[s,o]=u.useState(b);return e.jsx("div",{style:{width:"500px",height:"600px",border:"1px solid var(--ds-color-neutral-border-default)"},children:e.jsx(G,{messages:s,currentUserId:"current-user",onSend:i=>{const d={id:`msg-${Date.now()}`,content:i,senderId:"current-user",senderName:"You",createdAt:new Date().toISOString(),isRead:!1,isFromCurrentUser:!0};o([...s,d])},placeholder:t("storybook.demo.sampleText")})})}},C={render:function(){const t=n(),[s,o]=u.useState([]);return e.jsx("div",{style:{width:"500px",height:"600px",border:"1px solid var(--ds-color-neutral-border-default)"},children:e.jsx(G,{messages:s,currentUserId:"current-user",onSend:i=>{const d={id:`msg-${Date.now()}`,content:i,senderId:"current-user",senderName:"You",createdAt:new Date().toISOString(),isRead:!1,isFromCurrentUser:!0};o([d])},placeholder:t("storybook.demo.sampleText")})})}};var y,R,M;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      display: 'flex',
      gap: 'var(--ds-spacing-4)',
      alignItems: 'center'
    }}>
        <NotificationBell count={0} onClick={fn()} />
        <NotificationBell count={5} onClick={fn()} />
        <NotificationBell count={99} onClick={fn()} />
        <NotificationBell count={150} onClick={fn()} maxCount={99} />
      </div>;
  }
}`,...(M=(R=m.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var D,k,T;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      width: '300px'
    }}>
        <ConversationListItem conversation={sampleConversations[0]} isSelected={false} onClick={fn()} />
        <ConversationListItem conversation={sampleConversations[1]} isSelected={true} onClick={fn()} />
        <ConversationListItem conversation={sampleConversations[2]} isSelected={false} onClick={fn()} />
      </div>;
  }
}`,...(T=(k=p.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var j,F,N;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return <div style={{
      width: '350px',
      height: '500px',
      border: '1px solid var(--ds-color-neutral-border-default)'
    }}>
        <ConversationList conversations={sampleConversations} selectedId={selectedId} onSelect={id => setSelectedId(id)} />
      </div>;
  }
}`,...(N=(F=g.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var U,B,L;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    return <div style={{
      width: '350px',
      height: '500px',
      border: '1px solid var(--ds-color-neutral-border-default)'
    }}>
        <ConversationList conversations={sampleConversations} selectedId={selectedId} onSelect={id => setSelectedId(id)} filterTabs={[{
        id: 'all',
        label: 'All',
        count: 3
      }, {
        id: 'active',
        label: t('platform.status.active'),
        count: 1
      }, {
        id: 'pending',
        label: t('platform.status.pending'),
        count: 1
      }]} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>;
  }
}`,...(L=(B=h.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var O,A,E;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      width: '350px',
      height: '500px',
      border: '1px solid var(--ds-color-neutral-border-default)'
    }}>
        <ConversationList conversations={[]} emptyMessage={t('storybook.demo.sampleText')} />
      </div>;
  }
}`,...(E=(A=v.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var Y,J,W;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    return <div style={{
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-2)'
    }}>
        <MessageBubble message={sampleMessages[0]} isFromCurrentUser={false} showReadReceipt={true} />
        <MessageBubble message={sampleMessages[1]} isFromCurrentUser={true} showReadReceipt={true} />
        <MessageBubble message={sampleMessages[3]} isFromCurrentUser={true} showReadReceipt={true} />
      </div>;
  }
}`,...(W=(J=f.parameters)==null?void 0:J.docs)==null?void 0:W.source}}};var $,q,P;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [messages, setMessages] = useState(sampleMessages);
    return <div style={{
      width: '500px',
      height: '600px',
      border: '1px solid var(--ds-color-neutral-border-default)'
    }}>
        <ChatThread messages={messages} currentUserId="current-user" onSend={content => {
        const newMessage: MessageItem = {
          id: \`msg-\${Date.now()}\`,
          content,
          senderId: 'current-user',
          senderName: 'You',
          createdAt: new Date().toISOString(),
          isRead: false,
          isFromCurrentUser: true
        };
        setMessages([...messages, newMessage]);
      }} placeholder={t('storybook.demo.sampleText')} />
      </div>;
  }
}`,...(P=(q=x.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var _,H,z;C.parameters={...C.parameters,docs:{...(_=C.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: function Render() {
    const t = useT();
    const [messages, setMessages] = useState<MessageItem[]>([]);
    return <div style={{
      width: '500px',
      height: '600px',
      border: '1px solid var(--ds-color-neutral-border-default)'
    }}>
        <ChatThread messages={messages} currentUserId="current-user" onSend={content => {
        const newMessage: MessageItem = {
          id: \`msg-\${Date.now()}\`,
          content,
          senderId: 'current-user',
          senderName: 'You',
          createdAt: new Date().toISOString(),
          isRead: false,
          isFromCurrentUser: true
        };
        setMessages([newMessage]);
      }} placeholder={t('storybook.demo.sampleText')} />
      </div>;
  }
}`,...(z=(H=C.parameters)==null?void 0:H.docs)==null?void 0:z.source}}};const ye=["NotificationBellDefault","ConversationListItemDefault","ConversationListDefault","ConversationListWithFilters","ConversationListEmpty","MessageBubbleDefault","ChatThreadDefault","ChatThreadEmpty"];export{x as ChatThreadDefault,C as ChatThreadEmpty,g as ConversationListDefault,v as ConversationListEmpty,p as ConversationListItemDefault,h as ConversationListWithFilters,f as MessageBubbleDefault,m as NotificationBellDefault,ye as __namedExportsOrder,Ie as default};
//# sourceMappingURL=Messaging.stories-Dcxw55Xt.js.map
