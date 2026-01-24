import{j as M}from"./jsx-runtime-BYYWji4R.js";import{R as Ve}from"./ReviewCard-BhTs13Dw.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-BO1LcXkK.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";const aa={title:"Patterns/ReviewCard",component:Ve,parameters:{layout:"centered",docs:{description:{component:`
## ReviewCard

A domain-neutral card component for displaying user reviews and feedback.

### Features
- Star rating display
- Author info with avatar
- Verified badge support
- "Helpful" action with count
- Compact variant
- Status badges (moderation)
- Custom badges

### Usage

\`\`\`tsx
<ReviewCard
  author={{ name: 'John Doe', avatar: '/avatars/john.jpg', verified: true }}
  rating={4}
  maxRating={5}
  content="Great experience! The service was excellent."
  date="2 days ago"
  helpfulCount={12}
  onMarkHelpful={() => handleHelpful(reviewId)}
/>
\`\`\`

### Accessibility
- Star rating with aria-label
- Proper button roles
- Screen reader announcements for helpful counts
        `}}},tags:["autodocs"],decorators:[C=>M.jsx("div",{style:{padding:"2rem",maxWidth:"500px"},children:M.jsx(C,{})})]},e={name:"Anna Johansen",avatar:"https://i.pravatar.cc/150?img=1",verified:!0},b={name:"Erik Larsen",verified:!1},a={args:{id:"1",author:e,rating:4,maxRating:5,content:"Great experience! The meeting room was clean, well-equipped, and the booking process was seamless. Would definitely recommend.",date:"2 days ago",helpfulCount:12,onMarkHelpful:()=>console.log("Marked helpful")}},n={name:"With Review Title",args:{id:"2",author:e,rating:5,title:"Exceptional Quality and Service",content:"This was my third time using this facility and it continues to exceed expectations. The staff is incredibly helpful and the amenities are top-notch.",date:"Jan 15, 2026",helpfulCount:24,onMarkHelpful:()=>console.log("Marked helpful")}},t={name:"Without Avatar (Initials)",args:{id:"3",author:b,rating:3,content:"Decent experience overall. The location was convenient but the equipment could use some updates.",date:"1 week ago",helpfulCount:5,onMarkHelpful:()=>console.log("Marked helpful")}},r={name:"Compact Variant",args:{id:"4",author:e,rating:4,content:"Quick and easy booking process. Good value for money.",date:"3 days ago",variant:"compact"}},o={name:"Verified Author",args:{id:"5",author:{...e,verified:!0},rating:5,content:"Outstanding experience from start to finish!",date:"Yesterday",helpfulCount:8,onMarkHelpful:()=>console.log("Marked helpful")}},i={name:"Unverified Author",args:{id:"6",author:{...e,verified:!1},rating:4,content:"Very nice space, will come back.",date:"5 days ago"}},s={name:"High Rating (5 Stars)",args:{id:"7",author:e,rating:5,maxRating:5,title:"Perfect!",content:"Could not have asked for a better experience. Everything was perfect.",date:"Jan 10, 2026",helpfulCount:42,onMarkHelpful:()=>console.log("Marked helpful")}},l={name:"Low Rating (1 Star)",args:{id:"8",author:b,rating:1,maxRating:5,title:"Disappointed",content:"The room was not as described. Very disappointed with the experience.",date:"2 weeks ago",helpfulCount:3,onMarkHelpful:()=>console.log("Marked helpful")}},u={name:"With Badges",args:{id:"9",author:e,rating:5,content:"Excellent venue for our corporate event!",date:"Dec 20, 2025",badges:[{label:"Top Reviewer",variant:"accent"},{label:"Premium",variant:"success"}],helpfulCount:18,onMarkHelpful:()=>console.log("Marked helpful")}},c={name:"With Moderation Status",args:{id:"10",author:b,rating:2,content:"This review contains some feedback that may need moderation.",date:"1 day ago",status:"pending",showStatus:!0,moderatorNotes:"Review is pending approval due to policy check."}},d={name:"Approved Status",args:{id:"11",author:e,rating:4,content:"Great space for our team meeting.",date:"3 days ago",status:"approved",showStatus:!0}},p={name:"Flagged Status",args:{id:"12",author:b,rating:1,content:"This review has been flagged for review.",date:"1 week ago",status:"flagged",showStatus:!0,moderatorNotes:"Review contains inappropriate language."}},m={name:"Already Marked Helpful",args:{id:"13",author:e,rating:5,content:"Fantastic experience! Highly recommend.",date:"4 days ago",helpfulCount:15,isHelpful:!0,onMarkHelpful:()=>console.log("Toggle helpful")}},g={name:"Without Helpful Section",args:{id:"14",author:e,rating:4,content:"Good experience overall.",date:"1 week ago",showHelpful:!1}},h={name:"Clickable Card",args:{id:"15",author:e,rating:4,content:"Click this card to see more details.",date:"2 days ago",onClick:C=>console.log("Card clicked:",C)}},f={name:"Long Content",args:{id:"16",author:e,rating:4,title:"Comprehensive Review",content:`This is a detailed review of my experience.

The venue was excellent for our corporate retreat. Here are the highlights:

• Spacious meeting room with modern AV equipment
• Comfortable seating for 20+ people
• Great natural lighting
• Helpful on-site staff

The only minor issue was the parking situation, which could be improved. Overall, I would highly recommend this venue for any business event or team meeting.

We will definitely be booking again for our next quarterly meeting.`,date:"Jan 5, 2026",helpfulCount:35,onMarkHelpful:()=>console.log("Marked helpful")}},v={name:"Norwegian Labels (i18n)",args:{id:"17",author:{name:"Kari Nordmann",verified:!0},rating:5,content:"Fantastisk opplevelse! Lokalet var perfekt for vårt arrangement.",date:"for 2 dager siden",helpfulCount:8,onMarkHelpful:()=>console.log("Marked helpful"),labels:{helpful:"Nyttig",helpfulCount:"{count} fant dette nyttig",verified:"Verifisert"}}},w={name:"Domain Example: Product Review",args:{id:"18",author:{name:"Sarah M.",avatar:"https://i.pravatar.cc/150?img=5",verified:!0},rating:5,title:"Best office chair I have ever owned",content:"After 6 months of daily use, this chair is still as comfortable as day one. The lumbar support is excellent and the build quality is top-notch.",date:"Dec 15, 2025",badges:[{label:"Verified Purchase",variant:"success"}],helpfulCount:156,onMarkHelpful:()=>console.log("Marked helpful")}},k={name:"Domain Example: Venue Review",args:{id:"19",author:{name:"Tech Corp Inc."},rating:4,title:"Great venue for our annual conference",content:"We hosted our annual company conference here with 200 attendees. The event spaces were well-maintained, catering was excellent, and the technical support team was very helpful.",date:"Jan 8, 2026",badges:[{label:"Corporate Event",variant:"info"},{label:"200+ Attendees",variant:"neutral"}],helpfulCount:23,onMarkHelpful:()=>console.log("Marked helpful")}},y={name:"Minimal (Rating Only)",args:{id:"20",author:{name:"Quick Reviewer"},rating:5,date:"Just now"}};var S,x,A;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    id: '1',
    author: sampleAuthor,
    rating: 4,
    maxRating: 5,
    content: 'Great experience! The meeting room was clean, well-equipped, and the booking process was seamless. Would definitely recommend.',
    date: '2 days ago',
    helpfulCount: 12,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(A=(x=a.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var H,R,T;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'With Review Title',
  args: {
    id: '2',
    author: sampleAuthor,
    rating: 5,
    title: 'Exceptional Quality and Service',
    content: 'This was my third time using this facility and it continues to exceed expectations. The staff is incredibly helpful and the amenities are top-notch.',
    date: 'Jan 15, 2026',
    helpfulCount: 24,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(T=(R=n.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var V,W,N;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`{
  name: 'Without Avatar (Initials)',
  args: {
    id: '3',
    author: sampleAuthorNoAvatar,
    rating: 3,
    content: 'Decent experience overall. The location was convenient but the equipment could use some updates.',
    date: '1 week ago',
    helpfulCount: 5,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(N=(W=t.parameters)==null?void 0:W.docs)==null?void 0:N.source}}};var D,E,L;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Compact Variant',
  args: {
    id: '4',
    author: sampleAuthor,
    rating: 4,
    content: 'Quick and easy booking process. Good value for money.',
    date: '3 days ago',
    variant: 'compact'
  }
}`,...(L=(E=r.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var G,J,P;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: 'Verified Author',
  args: {
    id: '5',
    author: {
      ...sampleAuthor,
      verified: true
    },
    rating: 5,
    content: 'Outstanding experience from start to finish!',
    date: 'Yesterday',
    helpfulCount: 8,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(P=(J=o.parameters)==null?void 0:J.docs)==null?void 0:P.source}}};var q,F,I;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  name: 'Unverified Author',
  args: {
    id: '6',
    author: {
      ...sampleAuthor,
      verified: false
    },
    rating: 4,
    content: 'Very nice space, will come back.',
    date: '5 days ago'
  }
}`,...(I=(F=i.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var O,j,B;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`{
  name: 'High Rating (5 Stars)',
  args: {
    id: '7',
    author: sampleAuthor,
    rating: 5,
    maxRating: 5,
    title: 'Perfect!',
    content: 'Could not have asked for a better experience. Everything was perfect.',
    date: 'Jan 10, 2026',
    helpfulCount: 42,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(B=(j=s.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var Q,U,K;l.parameters={...l.parameters,docs:{...(Q=l.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'Low Rating (1 Star)',
  args: {
    id: '8',
    author: sampleAuthorNoAvatar,
    rating: 1,
    maxRating: 5,
    title: 'Disappointed',
    content: 'The room was not as described. Very disappointed with the experience.',
    date: '2 weeks ago',
    helpfulCount: 3,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(K=(U=l.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var Y,_,z;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'With Badges',
  args: {
    id: '9',
    author: sampleAuthor,
    rating: 5,
    content: 'Excellent venue for our corporate event!',
    date: 'Dec 20, 2025',
    badges: [{
      label: 'Top Reviewer',
      variant: 'accent'
    }, {
      label: 'Premium',
      variant: 'success'
    }],
    helpfulCount: 18,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(z=(_=u.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var X,Z,$;c.parameters={...c.parameters,docs:{...(X=c.parameters)==null?void 0:X.docs,source:{originalSource:`{
  name: 'With Moderation Status',
  args: {
    id: '10',
    author: sampleAuthorNoAvatar,
    rating: 2,
    content: 'This review contains some feedback that may need moderation.',
    date: '1 day ago',
    status: 'pending',
    showStatus: true,
    moderatorNotes: 'Review is pending approval due to policy check.'
  }
}`,...($=(Z=c.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ae,ne;d.parameters={...d.parameters,docs:{...(ee=d.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: 'Approved Status',
  args: {
    id: '11',
    author: sampleAuthor,
    rating: 4,
    content: 'Great space for our team meeting.',
    date: '3 days ago',
    status: 'approved',
    showStatus: true
  }
}`,...(ne=(ae=d.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var te,re,oe;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  name: 'Flagged Status',
  args: {
    id: '12',
    author: sampleAuthorNoAvatar,
    rating: 1,
    content: 'This review has been flagged for review.',
    date: '1 week ago',
    status: 'flagged',
    showStatus: true,
    moderatorNotes: 'Review contains inappropriate language.'
  }
}`,...(oe=(re=p.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ie,se,le;m.parameters={...m.parameters,docs:{...(ie=m.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  name: 'Already Marked Helpful',
  args: {
    id: '13',
    author: sampleAuthor,
    rating: 5,
    content: 'Fantastic experience! Highly recommend.',
    date: '4 days ago',
    helpfulCount: 15,
    isHelpful: true,
    onMarkHelpful: () => console.log('Toggle helpful')
  }
}`,...(le=(se=m.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var ue,ce,de;g.parameters={...g.parameters,docs:{...(ue=g.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  name: 'Without Helpful Section',
  args: {
    id: '14',
    author: sampleAuthor,
    rating: 4,
    content: 'Good experience overall.',
    date: '1 week ago',
    showHelpful: false
  }
}`,...(de=(ce=g.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var pe,me,ge;h.parameters={...h.parameters,docs:{...(pe=h.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  name: 'Clickable Card',
  args: {
    id: '15',
    author: sampleAuthor,
    rating: 4,
    content: 'Click this card to see more details.',
    date: '2 days ago',
    onClick: id => console.log('Card clicked:', id)
  }
}`,...(ge=(me=h.parameters)==null?void 0:me.docs)==null?void 0:ge.source}}};var he,fe,ve;f.parameters={...f.parameters,docs:{...(he=f.parameters)==null?void 0:he.docs,source:{originalSource:`{
  name: 'Long Content',
  args: {
    id: '16',
    author: sampleAuthor,
    rating: 4,
    title: 'Comprehensive Review',
    content: \`This is a detailed review of my experience.

The venue was excellent for our corporate retreat. Here are the highlights:

• Spacious meeting room with modern AV equipment
• Comfortable seating for 20+ people
• Great natural lighting
• Helpful on-site staff

The only minor issue was the parking situation, which could be improved. Overall, I would highly recommend this venue for any business event or team meeting.

We will definitely be booking again for our next quarterly meeting.\`,
    date: 'Jan 5, 2026',
    helpfulCount: 35,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(ve=(fe=f.parameters)==null?void 0:fe.docs)==null?void 0:ve.source}}};var we,ke,ye;v.parameters={...v.parameters,docs:{...(we=v.parameters)==null?void 0:we.docs,source:{originalSource:`{
  name: 'Norwegian Labels (i18n)',
  args: {
    id: '17',
    author: {
      name: 'Kari Nordmann',
      verified: true
    },
    rating: 5,
    content: 'Fantastisk opplevelse! Lokalet var perfekt for vårt arrangement.',
    date: 'for 2 dager siden',
    helpfulCount: 8,
    onMarkHelpful: () => console.log('Marked helpful'),
    labels: {
      helpful: 'Nyttig',
      helpfulCount: '{count} fant dette nyttig',
      verified: 'Verifisert'
    }
  }
}`,...(ye=(ke=v.parameters)==null?void 0:ke.docs)==null?void 0:ye.source}}};var be,Ce,Me;w.parameters={...w.parameters,docs:{...(be=w.parameters)==null?void 0:be.docs,source:{originalSource:`{
  name: 'Domain Example: Product Review',
  args: {
    id: '18',
    author: {
      name: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: true
    },
    rating: 5,
    title: 'Best office chair I have ever owned',
    content: 'After 6 months of daily use, this chair is still as comfortable as day one. The lumbar support is excellent and the build quality is top-notch.',
    date: 'Dec 15, 2025',
    badges: [{
      label: 'Verified Purchase',
      variant: 'success'
    }],
    helpfulCount: 156,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(Me=(Ce=w.parameters)==null?void 0:Ce.docs)==null?void 0:Me.source}}};var Se,xe,Ae;k.parameters={...k.parameters,docs:{...(Se=k.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  name: 'Domain Example: Venue Review',
  args: {
    id: '19',
    author: {
      name: 'Tech Corp Inc.'
    },
    rating: 4,
    title: 'Great venue for our annual conference',
    content: 'We hosted our annual company conference here with 200 attendees. The event spaces were well-maintained, catering was excellent, and the technical support team was very helpful.',
    date: 'Jan 8, 2026',
    badges: [{
      label: 'Corporate Event',
      variant: 'info'
    }, {
      label: '200+ Attendees',
      variant: 'neutral'
    }],
    helpfulCount: 23,
    onMarkHelpful: () => console.log('Marked helpful')
  }
}`,...(Ae=(xe=k.parameters)==null?void 0:xe.docs)==null?void 0:Ae.source}}};var He,Re,Te;y.parameters={...y.parameters,docs:{...(He=y.parameters)==null?void 0:He.docs,source:{originalSource:`{
  name: 'Minimal (Rating Only)',
  args: {
    id: '20',
    author: {
      name: 'Quick Reviewer'
    },
    rating: 5,
    date: 'Just now'
  }
}`,...(Te=(Re=y.parameters)==null?void 0:Re.docs)==null?void 0:Te.source}}};const na=["Default","WithTitle","NoAvatar","CompactVariant","VerifiedAuthor","UnverifiedAuthor","HighRating","LowRating","WithBadges","WithStatus","ApprovedStatus","FlaggedStatus","MarkedHelpful","NoHelpfulSection","Clickable","LongContent","NorwegianLabels","ProductReview","VenueReview","MinimalReview"];export{d as ApprovedStatus,h as Clickable,r as CompactVariant,a as Default,p as FlaggedStatus,s as HighRating,f as LongContent,l as LowRating,m as MarkedHelpful,y as MinimalReview,t as NoAvatar,g as NoHelpfulSection,v as NorwegianLabels,w as ProductReview,i as UnverifiedAuthor,k as VenueReview,o as VerifiedAuthor,u as WithBadges,c as WithStatus,n as WithTitle,na as __namedExportsOrder,aa as default};
//# sourceMappingURL=ReviewCard.stories-XATmM-if.js.map
