import{j as n}from"./jsx-runtime-BYYWji4R.js";import{useMDXComponents as r}from"./index-DUy19JZU.js";import{M as l,C as e,a as c}from"./index-BP-yttcE.js";import{B as a,D as s,E as d,C as h,S as x,W as j,a as u,L as p,I as m,A as f}from"./Button.stories-xHzzWA2a.js";import"./index-ClcD9ViR.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./iframe-DIW0rNz9.js";import"./index-BUAr5TKG.js";import"./index-Bhelpi4i.js";import"./index-DrFu-skq.js";import"./index-CLEdRh-S.js";import"./Trash-Dib-YGhY.js";import"./useId-DmiD3Xrk.js";import"./ArrowRight-DdD98ZtE.js";import"./Pencil-hAdst9ll.js";import"./button-B6PgazAq.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./roving-focus-item-DcdCcS0a.js";import"./heading-mzc2R_Ff.js";function o(t){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return n.jsxs(n.Fragment,{children:[`
`,`
`,n.jsx(l,{of:a}),`
`,n.jsx(i.h1,{id:"button",children:"Button"}),`
`,n.jsx(i.p,{children:"Buttons allow users to take actions with a single click or tap."}),`
`,n.jsx(e,{of:s}),`
`,n.jsx(i.h2,{id:"props",children:"Props"}),`
`,n.jsx(c,{of:s}),`
`,n.jsx(i.h2,{id:"variants",children:"Variants"}),`
`,n.jsx(i.p,{children:"Use variants to indicate the importance of an action:"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Primary"}),": Main action on the page"]}),`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Secondary"}),": Alternative or less important actions"]}),`
`,n.jsxs(i.li,{children:[n.jsx(i.strong,{children:"Tertiary"}),": Lowest emphasis actions"]}),`
`]}),`
`,n.jsx(e,{of:d}),`
`,n.jsx(i.h2,{id:"colors",children:"Colors"}),`
`,n.jsx(i.p,{children:"Available in all theme colors:"}),`
`,n.jsx(e,{of:h}),`
`,n.jsx(i.h2,{id:"sizes",children:"Sizes"}),`
`,n.jsx(i.p,{children:"Three sizes are available to fit different contexts:"}),`
`,n.jsx(e,{of:x}),`
`,n.jsx(i.h2,{id:"with-icons",children:"With Icons"}),`
`,n.jsx(i.p,{children:"Icons can be added to provide visual context. Always use DS icons from the icon registry."}),`
`,n.jsx(e,{of:j}),`
`,n.jsx(i.h2,{id:"states",children:"States"}),`
`,n.jsx(i.h3,{id:"disabled",children:"Disabled"}),`
`,n.jsx(i.p,{children:"Use sparingly. Prefer explaining why an action is unavailable."}),`
`,n.jsx(e,{of:u}),`
`,n.jsx(i.h3,{id:"loading",children:"Loading"}),`
`,n.jsx(i.p,{children:"Show loading state during async operations."}),`
`,n.jsx(e,{of:p}),`
`,n.jsx(i.h2,{id:"icon-only",children:"Icon Only"}),`
`,n.jsx(i.p,{children:"Icon-only buttons for well-known actions:"}),`
`,n.jsx(e,{of:m}),`
`,n.jsx(i.h2,{id:"all-variants",children:"All Variants"}),`
`,n.jsx(i.p,{children:"Complete overview of all button variations:"}),`
`,n.jsx(e,{of:f}),`
`,n.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,n.jsx(i.h3,{id:"keyboard-interaction",children:"Keyboard Interaction"}),`
`,n.jsxs(i.p,{children:[`| Key | Action |
|-----|--------|
| `,n.jsx(i.code,{children:"Tab"}),` | Move focus to button |
| `,n.jsx(i.code,{children:"Enter"}),` | Activate button |
| `,n.jsx(i.code,{children:"Space"})," | Activate button |"]}),`
`,n.jsx(i.h3,{id:"screen-reader",children:"Screen Reader"}),`
`,n.jsx(i.p,{children:'Buttons are announced as "button" role. Include descriptive text.'}),`
`,n.jsx(i.pre,{children:n.jsx(i.code,{className:"language-tsx",children:`// Good - clear action
<Button>Save Changes</Button>

// Avoid - unclear
<Button>Click Here</Button>
`})}),`
`,n.jsx(i.h3,{id:"focus",children:"Focus"}),`
`,n.jsx(i.p,{children:"Focus ring is visible on keyboard focus. Do not remove or hide it."}),`
`,n.jsx(i.h2,{id:"do-and-dont",children:"Do and Don't"}),`
`,n.jsx(i.h3,{id:"do",children:"Do"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:"Use action verbs (Save, Submit, Delete)"}),`
`,n.jsx(i.li,{children:"Keep text concise (2-3 words)"}),`
`,n.jsx(i.li,{children:"Use Primary for the main action"}),`
`,n.jsx(i.li,{children:"Add icons for visual clarity"}),`
`]}),`
`,n.jsx(i.h3,{id:"dont",children:"Don't"}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsx(i.li,{children:"Use multiple Primary buttons in one section"}),`
`,n.jsx(i.li,{children:"Disable without explanation"}),`
`,n.jsx(i.li,{children:'Use vague text like "Click Here"'}),`
`,n.jsx(i.li,{children:"Mix button styles inconsistently"}),`
`]}),`
`,n.jsx(i.h2,{id:"data-testid-convention",children:"data-testid Convention"}),`
`,n.jsx(i.pre,{children:n.jsx(i.code,{className:"language-tsx",children:`<Button data-testid="save-button">Save</Button>
<Button data-testid="delete-button">Delete</Button>
<Button data-testid="cancel-button">Cancel</Button>
`})}),`
`,n.jsx(i.h2,{id:"migration-notes",children:"Migration Notes"}),`
`,n.jsx(i.p,{children:"If migrating from custom buttons:"}),`
`,n.jsxs(i.ol,{children:[`
`,n.jsxs(i.li,{children:["Replace custom button components with DS ",n.jsx(i.code,{children:"Button"})]}),`
`,n.jsxs(i.li,{children:["Map old variants to ",n.jsx(i.code,{children:"primary"}),", ",n.jsx(i.code,{children:"secondary"}),", ",n.jsx(i.code,{children:"tertiary"})]}),`
`,n.jsx(i.li,{children:"Replace custom icons with DS icon registry"}),`
`,n.jsx(i.li,{children:"Remove any inline color styles"}),`
`]})]})}function K(t={}){const{wrapper:i}={...r(),...t.components};return i?n.jsx(i,{...t,children:n.jsx(o,{...t})}):o(t)}export{K as default};
//# sourceMappingURL=Button-DhGwPHoO.js.map
