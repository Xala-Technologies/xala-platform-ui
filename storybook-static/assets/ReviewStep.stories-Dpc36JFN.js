import{j as e}from"./jsx-runtime-BYYWji4R.js";import{fn as t}from"./index-CLEdRh-S.js";import{R as Y}from"./ReviewStep-AbCwfP5v.js";import{c}from"./createLucideIcon-DXOARlW5.js";import{C as $}from"./calendar-CWfpjoEz.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./alert-BzTWXKSs.js";import"./index-CHmPfjQK.js";import"./tooltip-oTYV5y50.js";import"./link-DlTbUgI1.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./paragraph-DDCpJsVw.js";import"./button-B6PgazAq.js";import"./label-9E-twYNb.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./radio-ER07BMpk.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],J=c("clock",z);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],_=c("credit-card",B);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],j=c("map-pin",W);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],U=c("users",F),fe={title:"Patterns/ReviewStep",component:Y,parameters:{layout:"centered",docs:{description:{component:`
## ReviewStep

A domain-neutral review/confirmation step component for displaying summary sections before final submission.

### Features
- Optional header with icon, title, and message
- Multiple review sections with edit capability
- Key-value item display with optional icons
- Terms checkbox with validation
- Additional content slot

### Usage
\`\`\`tsx
import { ReviewStep } from '@xala-technologies/platform-ui/patterns';

<ReviewStep
  title="Review Your Booking"
  message="Please verify all details before confirming."
  sections={[
    {
      id: 'resource',
      title: 'Selected Resource',
      items: [
        { label: 'Venue', value: 'Main Court' },
        { label: 'Date', value: 'January 25, 2026' },
      ],
      onEdit: () => goToStep(0),
      editLabel: 'Change',
    },
  ]}
  terms={{
    label: 'I agree to the terms and conditions',
    checked: termsAccepted,
    onChange: setTermsAccepted,
  }}
/>
\`\`\`
        `}}},tags:["autodocs"]},N=[{id:"venue",title:"Venue Details",icon:e.jsx(j,{size:16}),items:[{label:"Name",value:"Main Basketball Court"},{label:"Location",value:"Building A, Floor 2"},{label:"Type",value:"Indoor Court"}],onEdit:t(),editLabel:"Change"},{id:"schedule",title:"Date & Time",icon:e.jsx($,{size:16}),items:[{label:"Date",value:"Saturday, January 25, 2026"},{label:"Time",value:"10:00 AM - 12:00 PM"},{label:"Duration",value:"2 hours"}],onEdit:t(),editLabel:"Change"},{id:"payment",title:"Payment Summary",icon:e.jsx(_,{size:16}),items:[{label:"Court rental",value:"$60.00"},{label:"Equipment",value:"$20.00"},{label:"Total",value:"$80.00"}]}],n={args:{title:"Review Your Booking",message:"Please verify all details below before confirming your reservation.",sections:N}},a={args:{sections:N}},i={args:{title:"Confirm Your Order",message:"Review your order details and accept the terms to proceed.",sections:[{id:"order",title:"Order Summary",items:[{label:"Product",value:"Annual Membership"},{label:"Plan",value:"Premium"},{label:"Billing",value:"Monthly ($49/mo)"}],onEdit:t(),editLabel:"Edit"},{id:"total",title:"Payment",items:[{label:"First payment",value:"$49.00"},{label:"Due today",value:"$49.00"}]}],terms:{label:"I agree to the Terms of Service and Privacy Policy",checked:!1,onChange:t()}}},o={args:{title:"Complete Registration",message:"Review your information and accept the terms.",sections:[{id:"profile",title:"Profile Information",items:[{label:"Name",value:"John Smith"},{label:"Email",value:"john.smith@example.com"},{label:"Phone",value:"+1 (555) 123-4567"}],onEdit:t(),editLabel:"Edit"}],terms:{label:"I have read and agree to the Terms of Service",checked:!1,onChange:t(),error:"You must accept the terms to continue"}}},l={args:{sections:[{id:"shipping",title:"Shipping Address",items:[{label:"Name",value:"Jane Doe"},{label:"Street",value:"123 Main Street"},{label:"City",value:"New York, NY 10001"},{label:"Country",value:"United States"}],onEdit:t(),editLabel:"Edit"},{id:"billing",title:"Billing Information",items:[{label:"Card",value:"**** **** **** 4242"},{label:"Expires",value:"12/28"}],onEdit:t(),editLabel:"Change"},{id:"delivery",title:"Delivery Options",items:[{label:"Method",value:"Express Shipping"},{label:"Estimated",value:"2-3 business days"},{label:"Cost",value:"$15.00"}],onEdit:t(),editLabel:"Change"}]}},r={args:{title:"Appointment Summary",message:"Your appointment has been scheduled.",sections:[{id:"appointment",title:"Appointment Details",items:[{label:"Date",value:"Friday, January 24, 2026",icon:e.jsx($,{size:14})},{label:"Time",value:"2:30 PM - 3:30 PM",icon:e.jsx(J,{size:14})},{label:"Location",value:"Office A, Room 102",icon:e.jsx(j,{size:14})},{label:"Attendees",value:"2 people",icon:e.jsx(U,{size:14})}]}]}},s={args:{title:"Order Complete",message:"Thank you! Your order has been placed successfully.",icon:e.jsxs("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),sections:[{id:"order",title:"Order Details",items:[{label:"Order Number",value:"#ORD-2026-0125"},{label:"Items",value:"3 products"},{label:"Total",value:"$156.99"}]},{id:"shipping",title:"Shipping",items:[{label:"Method",value:"Standard Delivery"},{label:"Expected",value:"Jan 28 - Jan 30, 2026"}]}]}},m={args:{sections:[{id:"summary",title:"Quick Summary",items:[{label:"Item",value:"Monthly Subscription"},{label:"Amount",value:"$29.99/month"}]}],terms:{label:"I accept the subscription terms",checked:!0,onChange:t()}}};var d,u,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    title: 'Review Your Booking',
    message: 'Please verify all details below before confirming your reservation.',
    sections: bookingSections
  }
}`,...(p=(u=n.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var b,v,h;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    sections: bookingSections
  }
}`,...(h=(v=a.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var g,y,f;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: 'Confirm Your Order',
    message: 'Review your order details and accept the terms to proceed.',
    sections: [{
      id: 'order',
      title: 'Order Summary',
      items: [{
        label: 'Product',
        value: 'Annual Membership'
      }, {
        label: 'Plan',
        value: 'Premium'
      }, {
        label: 'Billing',
        value: 'Monthly ($49/mo)'
      }],
      onEdit: fn(),
      editLabel: 'Edit'
    }, {
      id: 'total',
      title: 'Payment',
      items: [{
        label: 'First payment',
        value: '$49.00'
      }, {
        label: 'Due today',
        value: '$49.00'
      }]
    }],
    terms: {
      label: 'I agree to the Terms of Service and Privacy Policy',
      checked: false,
      onChange: fn()
    }
  }
}`,...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var S,k,C;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    title: 'Complete Registration',
    message: 'Review your information and accept the terms.',
    sections: [{
      id: 'profile',
      title: 'Profile Information',
      items: [{
        label: 'Name',
        value: 'John Smith'
      }, {
        label: 'Email',
        value: 'john.smith@example.com'
      }, {
        label: 'Phone',
        value: '+1 (555) 123-4567'
      }],
      onEdit: fn(),
      editLabel: 'Edit'
    }],
    terms: {
      label: 'I have read and agree to the Terms of Service',
      checked: false,
      onChange: fn(),
      error: 'You must accept the terms to continue'
    }
  }
}`,...(C=(k=o.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var x,E,M;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    sections: [{
      id: 'shipping',
      title: 'Shipping Address',
      items: [{
        label: 'Name',
        value: 'Jane Doe'
      }, {
        label: 'Street',
        value: '123 Main Street'
      }, {
        label: 'City',
        value: 'New York, NY 10001'
      }, {
        label: 'Country',
        value: 'United States'
      }],
      onEdit: fn(),
      editLabel: 'Edit'
    }, {
      id: 'billing',
      title: 'Billing Information',
      items: [{
        label: 'Card',
        value: '**** **** **** 4242'
      }, {
        label: 'Expires',
        value: '12/28'
      }],
      onEdit: fn(),
      editLabel: 'Change'
    }, {
      id: 'delivery',
      title: 'Delivery Options',
      items: [{
        label: 'Method',
        value: 'Express Shipping'
      }, {
        label: 'Estimated',
        value: '2-3 business days'
      }, {
        label: 'Cost',
        value: '$15.00'
      }],
      onEdit: fn(),
      editLabel: 'Change'
    }]
  }
}`,...(M=(E=l.parameters)==null?void 0:E.docs)==null?void 0:M.source}}};var w,P,D;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: 'Appointment Summary',
    message: 'Your appointment has been scheduled.',
    sections: [{
      id: 'appointment',
      title: 'Appointment Details',
      items: [{
        label: 'Date',
        value: 'Friday, January 24, 2026',
        icon: <Calendar size={14} />
      }, {
        label: 'Time',
        value: '2:30 PM - 3:30 PM',
        icon: <Clock size={14} />
      }, {
        label: 'Location',
        value: 'Office A, Room 102',
        icon: <MapPin size={14} />
      }, {
        label: 'Attendees',
        value: '2 people',
        icon: <Users size={14} />
      }]
    }]
  }
}`,...(D=(P=r.parameters)==null?void 0:P.docs)==null?void 0:D.source}}};var I,R,L;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: 'Order Complete',
    message: 'Thank you! Your order has been placed successfully.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>,
    sections: [{
      id: 'order',
      title: 'Order Details',
      items: [{
        label: 'Order Number',
        value: '#ORD-2026-0125'
      }, {
        label: 'Items',
        value: '3 products'
      }, {
        label: 'Total',
        value: '$156.99'
      }]
    }, {
      id: 'shipping',
      title: 'Shipping',
      items: [{
        label: 'Method',
        value: 'Standard Delivery'
      }, {
        label: 'Expected',
        value: 'Jan 28 - Jan 30, 2026'
      }]
    }]
  }
}`,...(L=(R=s.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var T,A,O;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    sections: [{
      id: 'summary',
      title: 'Quick Summary',
      items: [{
        label: 'Item',
        value: 'Monthly Subscription'
      }, {
        label: 'Amount',
        value: '$29.99/month'
      }]
    }],
    terms: {
      label: 'I accept the subscription terms',
      checked: true,
      onChange: fn()
    }
  }
}`,...(O=(A=m.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};const Se=["Default","SectionsOnly","WithTermsCheckbox","WithTermsError","EditableSections","WithItemIcons","CustomIcon","SimpleReview"];export{s as CustomIcon,n as Default,l as EditableSections,a as SectionsOnly,m as SimpleReview,r as WithItemIcons,i as WithTermsCheckbox,o as WithTermsError,Se as __namedExportsOrder,fe as default};
//# sourceMappingURL=ReviewStep.stories-Dpc36JFN.js.map
