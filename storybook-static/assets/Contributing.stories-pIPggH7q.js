import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as z,R as ie}from"./index-ClcD9ViR.js";import{c as k}from"./createLucideIcon-DXOARlW5.js";import{C as u}from"./circle-check-big-N58AFyrx.js";import{C as ne}from"./code-BBI_aUu7.js";import{S as se}from"./shield-B_O8GKm9.js";import{Z as de}from"./zap-cfbYCEHi.js";import{H as n}from"./heading-mzc2R_Ff.js";import{C as v}from"./index-D1XdeRjR.js";import{P as p}from"./paragraph-DDCpJsVw.js";import{C as te}from"./checkbox-CeN5g5X_.js";import{B as S}from"./button-B6PgazAq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-Df4a1FH3.js";import"./roving-focus-item-DcdCcS0a.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],ae=k("book-open",le);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],re=k("circle-x",ce);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]],me=k("file-code",pe);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2",key:"125lnx"}],["path",{d:"M8.5 2h7",key:"csnxdl"}],["path",{d:"M14.5 16h-5",key:"1ox875"}]],oe=k("test-tube",ge);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ue=k("triangle-alert",ve),De={title:"Overview/Contributing",parameters:{docs:{description:{component:`
# Contributing to Xala Platform

Learn how to contribute components, follow best practices, and maintain quality standards.

## Key Principles
- Domain agnostic components
- Token-driven styling
- Accessibility first
- Comprehensive testing
        `}}},tags:["autodocs"]},y={render:()=>e.jsxs("div",{children:[e.jsx(n,{level:1,"data-size":"2xl",style:{marginBottom:"var(--ds-spacing-6)"},children:"Design System Principles"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:[{Icon:se,title:"Domain Agnostic",description:"Components must be domain-blind with no business logic or domain-specific terms.",bad:"<BookingCard listing={listing} />",good:"<ResourceCard resource={resource} />",color:"var(--ds-color-accent-base-default)"},{Icon:de,title:"Token-Driven",description:"All styling uses design tokens. No hard-coded values allowed.",bad:"padding: '16px', color: '#1E40AF'",good:"padding: 'var(--ds-spacing-4)', color: 'var(--ds-color-accent-base-default)'",color:"var(--ds-color-warning-base-default)"},{Icon:u,title:"Accessibility First",description:"WCAG 2.1 AA compliant with keyboard navigation, screen readers, and proper ARIA.",requirements:["Keyboard navigation","Screen reader support","Focus management","ARIA attributes","Color contrast"],color:"var(--ds-color-success-base-default)"}].map(({Icon:s,title:o,description:a,bad:d,good:i,requirements:l,color:r})=>e.jsxs(v,{style:{padding:"var(--ds-spacing-6)",borderLeft:`4px solid ${r}`,flex:"1 1 300px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(s,{size:32,style:{color:r}}),e.jsx(n,{level:3,"data-size":"md",children:o})]}),e.jsx(p,{style:{marginBottom:"var(--ds-spacing-4)",color:"var(--ds-color-neutral-text-subtle)"},children:a}),d&&i&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-danger-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx(re,{size:16,style:{color:"var(--ds-color-danger-base-default)"}}),e.jsx("strong",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-danger-text-default)"},children:"Bad"})]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-danger-text-default)"},children:d})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx(u,{size:16,style:{color:"var(--ds-color-success-base-default)"}}),e.jsx("strong",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-success-text-default)"},children:"Good"})]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-success-text-default)"},children:i})]})]}),l&&e.jsx("div",{style:{marginTop:"var(--ds-spacing-3)"},children:l.map((t,c)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-1)"},children:[e.jsx(u,{size:14,style:{color:r}}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-sm)"},children:t})]},c))})]},o))})]})},f={render:()=>e.jsxs("div",{children:[e.jsx(n,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Component Layer Architecture"}),e.jsxs(v,{style:{padding:"var(--ds-spacing-8)"},children:[e.jsx(p,{style:{marginBottom:"var(--ds-spacing-6)",color:"var(--ds-color-neutral-text-subtle)"},children:"Components follow a strict hierarchy. Lower layers cannot import from higher layers."}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[{layer:"Primitives",level:1,canImport:"Designsystemet only",examples:["Button","Input","Checkbox","Radio"],description:"Basic building blocks wrapping Designsystemet components"},{layer:"Blocks",level:2,canImport:"Primitives",examples:["Card","Alert","Badge","Avatar"],description:"Simple compositions of primitives"},{layer:"Composed",level:3,canImport:"Blocks, Primitives",examples:["DataTable","Form","Modal","Drawer"],description:"Complex components combining multiple blocks"},{layer:"Patterns",level:4,canImport:"Composed, Blocks, Primitives",examples:["Wizard","EmptyState","ErrorBoundary"],description:"Reusable UI patterns and templates"},{layer:"Shells",level:5,canImport:"Patterns, Composed, Blocks, Primitives",examples:["DashboardShell","SidebarLayout"],description:"Page-level layout shells"},{layer:"Pages",level:6,canImport:"All above layers",examples:["LoginPage","DashboardPage"],description:"Complete page implementations"}].map(({layer:s,level:o,canImport:a,examples:d,description:i})=>e.jsxs("div",{style:{padding:"var(--ds-spacing-5)",backgroundColor:"var(--ds-color-neutral-surface-default)",borderRadius:"var(--ds-border-radius-md)",borderLeft:"4px solid var(--ds-color-accent-base-default)",opacity:1-(o-1)*.1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",marginBottom:"var(--ds-spacing-3)"},children:[e.jsx("div",{style:{width:"32px",height:"32px",backgroundColor:"var(--ds-color-accent-base-default)",color:"var(--ds-color-accent-contrast-default)",borderRadius:"var(--ds-border-radius-full)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:o}),e.jsx(n,{level:3,"data-size":"sm",children:s})]}),e.jsx(p,{"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)",color:"var(--ds-color-neutral-text-subtle)"},children:i}),e.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-4)",flexWrap:"wrap",marginBottom:"var(--ds-spacing-3)"},children:e.jsxs("div",{children:[e.jsx("strong",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-accent-text-default)"},children:"Can import:"}),e.jsx("span",{style:{fontSize:"var(--ds-font-size-xs)",marginLeft:"var(--ds-spacing-2)"},children:a})]})}),e.jsx("div",{style:{display:"flex",gap:"var(--ds-spacing-2)",flexWrap:"wrap"},children:d.map(l=>e.jsx("span",{style:{padding:"var(--ds-spacing-1) var(--ds-spacing-2)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)",fontSize:"var(--ds-font-size-xs)",fontFamily:"monospace"},children:l},l))})]},s))}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-6)",padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-warning-surface-default)",borderRadius:"var(--ds-border-radius-md)"},children:e.jsxs(p,{"data-size":"sm",style:{color:"var(--ds-color-warning-text-default)"},children:[e.jsx("strong",{children:"Critical Rule:"})," Lower layers cannot import from higher layers. This prevents circular dependencies and maintains clear separation of concerns."]})})]})]})},x={render:()=>{const[s,o]=z.useState(0),[a,d]=z.useState([]),i=[{title:"Create Component File",icon:me,code:`// src/ui/primitives/MyComponent.tsx
import React from 'react';

export interface MyComponentProps {
  /** Component description */
  label: string;
  /** Optional variant */
  variant?: 'primary' | 'secondary';
}

/**
 * MyComponent - Brief description
 * 
 * @example
 * \`\`\`tsx
 * <MyComponent label="Hello" variant="primary" />
 * \`\`\`
 */
export const MyComponent: React.FC<MyComponentProps> = ({ 
  label, 
  variant = 'primary' 
}) => {
  return (
    <div 
      data-variant={variant}
      style={{ 
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}
    >
      {label}
    </div>
  );
};`},{title:"Export from Index",icon:ne,code:`// src/ui/primitives/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';`},{title:"Create Storybook Story",icon:ae,code:`// src/ui/stories/Primitives/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../../primitives/MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Primitives/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    label: 'Hello World',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Hello World',
    variant: 'secondary',
  },
};`},{title:"Add Unit Tests",icon:oe,code:`// src/ui/primitives/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders label', () => {
    render(<MyComponent label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant', () => {
    const { container } = render(
      <MyComponent label="Test" variant="secondary" />
    );
    expect(container.firstChild).toHaveAttribute(
      'data-variant', 
      'secondary'
    );
  });

  it('uses default variant', () => {
    const { container } = render(<MyComponent label="Test" />);
    expect(container.firstChild).toHaveAttribute(
      'data-variant', 
      'primary'
    );
  });
});`}],l=r=>{a.includes(r)?d(a.filter(t=>t!==r)):d([...a,r])};return e.jsxs("div",{children:[e.jsx(n,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Component Creation Guide"}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-6)",flexWrap:"wrap"},children:[e.jsx("div",{children:e.jsxs(v,{style:{padding:"var(--ds-spacing-4)"},children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-4)"},children:"Steps"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:i.map((r,t)=>{const c=r.icon,g=s===t,m=a.includes(t);return e.jsxs("div",{onClick:()=>o(t),style:{padding:"var(--ds-spacing-3)",backgroundColor:g?"var(--ds-color-accent-surface-default)":"transparent",borderRadius:"var(--ds-border-radius-sm)",cursor:"pointer",display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",border:g?"1px solid var(--ds-color-accent-border-default)":"1px solid transparent"},children:[m?e.jsx(u,{size:20,style:{color:"var(--ds-color-success-base-default)"}}):e.jsx(c,{size:20,style:{color:g?"var(--ds-color-accent-base-default)":"var(--ds-color-neutral-text-subtle)"}}),e.jsxs("span",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:g?600:400,color:g?"var(--ds-color-accent-text-default)":"inherit"},children:[t+1,". ",r.title]})]},t)})}),e.jsx("div",{style:{marginTop:"var(--ds-spacing-4)",padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:e.jsxs(p,{"data-size":"sm",style:{color:"var(--ds-color-success-text-default)"},children:[e.jsxs("strong",{children:[a.length," of ",i.length]})," ","steps completed"]})})]})}),e.jsxs(v,{style:{padding:"var(--ds-spacing-6)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",marginBottom:"var(--ds-spacing-4)"},children:[ie.createElement(i[s].icon,{size:32,style:{color:"var(--ds-color-accent-base-default)"}}),e.jsxs(n,{level:3,"data-size":"md",children:["Step ",s+1,": ",i[s].title]})]}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-xs)",lineHeight:"1.6",marginBottom:"var(--ds-spacing-4)"},children:i[s].code}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-3)",justifyContent:"space-between"},children:[e.jsx("div",{children:e.jsx(te,{checked:a.includes(s),onChange:()=>l(s),"aria-label":"Mark step as completed",children:"Mark as completed"})}),e.jsxs("div",{style:{display:"flex",gap:"var(--ds-spacing-2)"},children:[e.jsx(S,{"data-variant":"tertiary","data-size":"sm",disabled:s===0,onClick:()=>o(s-1),children:"← Previous"}),e.jsx(S,{"data-variant":"primary","data-size":"sm",disabled:s===i.length-1,onClick:()=>o(s+1),children:"Next →"})]})]})]})]})]})}},b={render:()=>{const[s,o]=z.useState([]),a=[{category:"Code Quality",items:[{id:"typescript",label:"Full TypeScript definitions with JSDoc"},{id:"tokens",label:"Uses design tokens, no hard-coded values"},{id:"domain",label:"Domain agnostic - no business logic"},{id:"layers",label:"Follows layer hierarchy rules"}]},{category:"Accessibility",items:[{id:"wcag",label:"WCAG 2.1 AA compliant"},{id:"keyboard",label:"Keyboard navigation support"},{id:"screen-reader",label:"Screen reader compatible"},{id:"aria",label:"Proper ARIA attributes"},{id:"contrast",label:"Color contrast ratios met"}]},{category:"Documentation",items:[{id:"jsdoc",label:"JSDoc with examples"},{id:"stories",label:"At least 2 story variants"},{id:"props",label:"All props documented"}]},{category:"Testing",items:[{id:"unit",label:"Unit tests with >80% coverage"},{id:"interaction",label:"Storybook interaction tests"},{id:"a11y-test",label:"Accessibility tests"}]}],d=t=>{s.includes(t)?o(s.filter(c=>c!==t)):o([...s,t])},i=a.reduce((t,c)=>t+c.items.length,0),l=s.length,r=Math.round(l/i*100);return e.jsxs("div",{children:[e.jsx(n,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Quality Checklist"}),e.jsxs(v,{style:{padding:"var(--ds-spacing-6)",marginBottom:"var(--ds-spacing-6)"},children:[e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx(p,{"data-size":"sm",style:{fontWeight:600},children:"Overall Progress"}),e.jsxs(p,{"data-size":"sm",style:{color:"var(--ds-color-accent-text-default)",fontWeight:600},children:[l," / ",i," (",r,"%)"]})]}),e.jsx("div",{style:{height:"8px",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-full)",overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${r}%`,backgroundColor:r===100?"var(--ds-color-success-base-default)":"var(--ds-color-accent-base-default)",transition:"width 0.3s ease"}})})]}),r===100&&e.jsxs("div",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-md)",display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)"},children:[e.jsx(u,{size:24,style:{color:"var(--ds-color-success-base-default)"}}),e.jsxs(p,{style:{color:"var(--ds-color-success-text-default)"},children:[e.jsx("strong",{children:"Ready to submit!"})," Your component meets all quality standards."]})]})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"var(--ds-spacing-6)"},children:a.map(({category:t,items:c})=>{const g=c.filter(m=>s.includes(m.id)).length;return Math.round(g/c.length*100),e.jsxs(v,{style:{padding:"var(--ds-spacing-5)",flex:"1 1 300px"},children:[e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(n,{level:3,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-2)"},children:t}),e.jsxs(p,{"data-size":"xs",style:{color:"var(--ds-color-accent-text-default)"},children:[g," / ",c.length," completed"]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)"},children:c.map(m=>e.jsx(te,{checked:s.includes(m.id),onChange:()=>d(m.id),"aria-label":m.label,children:m.label},m.id))})]},t)})})]})}},h={render:()=>e.jsxs("div",{children:[e.jsx(n,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Testing Best Practices"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-6)"},children:[{title:"Unit Tests",icon:oe,description:"Test component behavior in isolation",commands:[{cmd:"pnpm test",desc:"Run all unit tests"},{cmd:"pnpm test:watch",desc:"Watch mode for development"},{cmd:"pnpm test:coverage",desc:"Generate coverage report"}],example:`describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <Button data-variant="primary">Button</Button>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', 'primary');
  });
});`},{title:"Storybook Tests",icon:ae,description:"Test component interactions in Storybook",commands:[{cmd:"pnpm test:storybook",desc:"Run Storybook tests"},{cmd:"pnpm storybook",desc:"Start Storybook dev server"}],example:`export const WithInteraction: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};`},{title:"Accessibility Tests",icon:se,description:"Ensure WCAG 2.1 AA compliance",commands:[{cmd:"pnpm test:a11y",desc:"Run accessibility tests"}],example:`it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('is keyboard accessible', async () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button');
  
  button.focus();
  expect(button).toHaveFocus();
  
  await userEvent.keyboard('{Enter}');
  // Verify action occurred
});`}].map(({title:s,icon:o,description:a,commands:d,example:i})=>e.jsxs(v,{style:{padding:"var(--ds-spacing-6)",flex:"1 1 350px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-3)",marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(o,{size:28,style:{color:"var(--ds-color-accent-base-default)"}}),e.jsxs("div",{children:[e.jsx(n,{level:3,"data-size":"md",children:s}),e.jsx(p,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:a})]})]}),e.jsxs("div",{style:{marginBottom:"var(--ds-spacing-4)"},children:[e.jsx(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Commands"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-2)"},children:d.map(({cmd:l,desc:r})=>e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsx("code",{style:{fontSize:"var(--ds-font-size-sm)",fontWeight:600},children:l}),e.jsx(p,{"data-size":"xs",style:{marginTop:"var(--ds-spacing-1)",color:"var(--ds-color-neutral-text-subtle)"},children:r})]},l))})]}),e.jsxs("div",{children:[e.jsx(n,{level:4,"data-size":"sm",style:{marginBottom:"var(--ds-spacing-3)"},children:"Example"}),e.jsx("pre",{style:{padding:"var(--ds-spacing-4)",backgroundColor:"var(--ds-color-neutral-surface-hover)",borderRadius:"var(--ds-border-radius-md)",overflow:"auto",fontSize:"var(--ds-font-size-xs)",lineHeight:"1.6"},children:i})]})]},s))})]})},C={render:()=>e.jsxs("div",{children:[e.jsx(n,{level:2,"data-size":"lg",style:{marginBottom:"var(--ds-spacing-6)"},children:"Common Pitfalls to Avoid"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[{title:"Hardcoding Design Values",bad:"style={{ padding: '16px', color: '#1E40AF' }}",good:"style={{ padding: 'var(--ds-spacing-4)', color: 'var(--ds-color-accent-base-default)' }}",why:"Design tokens ensure consistency and enable theming"},{title:"Domain-Specific Logic",bad:"<BookingCard booking={booking} onBook={handleBook} />",good:"<ResourceCard resource={resource} onAction={handleAction} />",why:"Components must be reusable across different domains"},{title:"Missing Accessibility",bad:"<div onClick={handleClick}>Click me</div>",good:'<button onClick={handleClick} aria-label="Submit form">Click me</button>',why:"Proper semantic HTML and ARIA ensure accessibility"},{title:"Circular Dependencies",bad:"primitives/Button imports from blocks/Card",good:"blocks/Card imports from primitives/Button",why:"Lower layers cannot import from higher layers"},{title:"Inline Styles Without Tokens",bad:"<div style={{ marginTop: 20, fontSize: 14 }}>",good:"<div style={{ marginTop: 'var(--ds-spacing-5)', fontSize: 'var(--ds-font-size-sm)' }}>",why:"All styling must use design tokens for consistency"},{title:"Missing TypeScript Types",bad:"export const MyComponent = ({ data }) => { ... }",good:"export const MyComponent: React.FC<MyComponentProps> = ({ data }) => { ... }",why:"Full type safety prevents runtime errors"}].map(({title:s,bad:o,good:a,why:d})=>e.jsxs(v,{style:{padding:"var(--ds-spacing-5)",borderLeft:"4px solid var(--ds-color-warning-base-default)",flex:"1 1 350px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-3)"},children:[e.jsx(ue,{size:20,style:{color:"var(--ds-color-warning-base-default)"}}),e.jsx(n,{level:3,"data-size":"sm",children:s})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-3)",marginBottom:"var(--ds-spacing-3)"},children:[e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-danger-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx(re,{size:16,style:{color:"var(--ds-color-danger-base-default)"}}),e.jsx("strong",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-danger-text-default)"},children:"Bad"})]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-danger-text-default)"},children:o})]}),e.jsxs("div",{style:{padding:"var(--ds-spacing-3)",backgroundColor:"var(--ds-color-success-surface-default)",borderRadius:"var(--ds-border-radius-sm)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--ds-spacing-2)",marginBottom:"var(--ds-spacing-2)"},children:[e.jsx(u,{size:16,style:{color:"var(--ds-color-success-base-default)"}}),e.jsx("strong",{style:{fontSize:"var(--ds-font-size-sm)",color:"var(--ds-color-success-text-default)"},children:"Good"})]}),e.jsx("code",{style:{fontSize:"var(--ds-font-size-xs)",color:"var(--ds-color-success-text-default)"},children:a})]})]}),e.jsxs(p,{"data-size":"sm",style:{color:"var(--ds-color-neutral-text-subtle)"},children:[e.jsx("strong",{children:"Why:"})," ",d]})]},s))})]})};var B,j,I,w,A;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div>
      <Heading level={1} data-size="2xl" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Design System Principles
      </Heading>

      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)'
    }}>
        {[{
        Icon: Shield,
        title: 'Domain Agnostic',
        description: 'Components must be domain-blind with no business logic or domain-specific terms.',
        bad: '<BookingCard listing={listing} />',
        good: '<ResourceCard resource={resource} />',
        color: 'var(--ds-color-accent-base-default)'
      }, {
        Icon: Zap,
        title: 'Token-Driven',
        description: 'All styling uses design tokens. No hard-coded values allowed.',
        bad: "padding: '16px', color: '#1E40AF'",
        good: "padding: 'var(--ds-spacing-4)', color: 'var(--ds-color-accent-base-default)'",
        color: 'var(--ds-color-warning-base-default)'
      }, {
        Icon: CheckCircle,
        title: 'Accessibility First',
        description: 'WCAG 2.1 AA compliant with keyboard navigation, screen readers, and proper ARIA.',
        requirements: ['Keyboard navigation', 'Screen reader support', 'Focus management', 'ARIA attributes', 'Color contrast'],
        color: 'var(--ds-color-success-base-default)'
      }].map(({
        Icon,
        title,
        description,
        bad,
        good,
        requirements,
        color
      }) => <Card key={title} style={{
        padding: 'var(--ds-spacing-6)',
        borderLeft: \`4px solid \${color}\`,
        flex: '1 1 300px'
      }}>
            <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-3)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
              <Icon size={32} style={{
            color
          }} />
              <Heading level={3} data-size="md">
                {title}
              </Heading>
            </div>

            <Paragraph style={{
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
              {description}
            </Paragraph>

            {bad && good && <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)'
        }}>
                <div style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-danger-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)'
          }}>
                  <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginBottom: 'var(--ds-spacing-2)'
            }}>
                    <XCircle size={16} style={{
                color: 'var(--ds-color-danger-base-default)'
              }} />
                    <strong style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-danger-text-default)'
              }}>
                      Bad
                    </strong>
                  </div>
                  <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-danger-text-default)'
            }}>
                    {bad}
                  </code>
                </div>

                <div style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)'
          }}>
                  <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginBottom: 'var(--ds-spacing-2)'
            }}>
                    <CheckCircle size={16} style={{
                color: 'var(--ds-color-success-base-default)'
              }} />
                    <strong style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-success-text-default)'
              }}>
                      Good
                    </strong>
                  </div>
                  <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-success-text-default)'
            }}>
                    {good}
                  </code>
                </div>
              </div>}

            {requirements && <div style={{
          marginTop: 'var(--ds-spacing-3)'
        }}>
                {requirements.map((req, i) => <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-1)'
          }}>
                    <CheckCircle size={14} style={{
              color
            }} />
                    <span style={{
              fontSize: 'var(--ds-font-size-sm)'
            }}>{req}</span>
                  </div>)}
              </div>}
          </Card>)}
      </div>
    </div>
}`,...(I=(j=y.parameters)==null?void 0:j.docs)==null?void 0:I.source},description:{story:"Design Principles Overview",...(A=(w=y.parameters)==null?void 0:w.docs)==null?void 0:A.description}}};var P,M,T,R,H;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div>
      <Heading level={2} data-size="lg" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Component Layer Architecture
      </Heading>

      <Card style={{
      padding: 'var(--ds-spacing-8)'
    }}>
        <Paragraph style={{
        marginBottom: 'var(--ds-spacing-6)',
        color: 'var(--ds-color-neutral-text-subtle)'
      }}>
          Components follow a strict hierarchy. Lower layers cannot import from higher layers.
        </Paragraph>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)'
      }}>
          {[{
          layer: 'Primitives',
          level: 1,
          canImport: 'Designsystemet only',
          examples: ['Button', 'Input', 'Checkbox', 'Radio'],
          description: 'Basic building blocks wrapping Designsystemet components'
        }, {
          layer: 'Blocks',
          level: 2,
          canImport: 'Primitives',
          examples: ['Card', 'Alert', 'Badge', 'Avatar'],
          description: 'Simple compositions of primitives'
        }, {
          layer: 'Composed',
          level: 3,
          canImport: 'Blocks, Primitives',
          examples: ['DataTable', 'Form', 'Modal', 'Drawer'],
          description: 'Complex components combining multiple blocks'
        }, {
          layer: 'Patterns',
          level: 4,
          canImport: 'Composed, Blocks, Primitives',
          examples: ['Wizard', 'EmptyState', 'ErrorBoundary'],
          description: 'Reusable UI patterns and templates'
        }, {
          layer: 'Shells',
          level: 5,
          canImport: 'Patterns, Composed, Blocks, Primitives',
          examples: ['DashboardShell', 'SidebarLayout'],
          description: 'Page-level layout shells'
        }, {
          layer: 'Pages',
          level: 6,
          canImport: 'All above layers',
          examples: ['LoginPage', 'DashboardPage'],
          description: 'Complete page implementations'
        }].map(({
          layer,
          level,
          canImport,
          examples,
          description
        }) => <div key={layer} style={{
          padding: 'var(--ds-spacing-5)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          borderLeft: \`4px solid var(--ds-color-accent-base-default)\`,
          opacity: 1 - (level - 1) * 0.1
        }}>
              <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--ds-color-accent-base-default)',
              color: 'var(--ds-color-accent-contrast-default)',
              borderRadius: 'var(--ds-border-radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 600
            }}>
                  {level}
                </div>
                <Heading level={3} data-size="sm">
                  {layer}
                </Heading>
              </div>

              <Paragraph data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)',
            color: 'var(--ds-color-neutral-text-subtle)'
          }}>
                {description}
              </Paragraph>

              <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                <div>
                  <strong style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-accent-text-default)'
              }}>
                    Can import:
                  </strong>
                  <span style={{
                fontSize: 'var(--ds-font-size-xs)',
                marginLeft: 'var(--ds-spacing-2)'
              }}>
                    {canImport}
                  </span>
                </div>
              </div>

              <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            flexWrap: 'wrap'
          }}>
                {examples.map(example => <span key={example} style={{
              padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              fontFamily: 'monospace'
            }}>
                    {example}
                  </span>)}
              </div>
            </div>)}
        </div>

        <div style={{
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-warning-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)'
      }}>
          <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-warning-text-default)'
        }}>
            <strong>Critical Rule:</strong> Lower layers cannot import from higher layers. This
            prevents circular dependencies and maintains clear separation of concerns.
          </Paragraph>
        </div>
      </Card>
    </div>
}`,...(T=(M=f.parameters)==null?void 0:M.docs)==null?void 0:T.source},description:{story:"Component Layer Architecture",...(H=(R=f.parameters)==null?void 0:R.docs)==null?void 0:H.description}}};var D,W,E,F,L;x.parameters={...x.parameters,docs:{...(D=x.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const steps = [{
      title: 'Create Component File',
      icon: FileCode,
      code: \`// src/ui/primitives/MyComponent.tsx
import React from 'react';

export interface MyComponentProps {
  /** Component description */
  label: string;
  /** Optional variant */
  variant?: 'primary' | 'secondary';
}

/**
 * MyComponent - Brief description
 * 
 * @example
 * \\\`\\\`\\\`tsx
 * <MyComponent label="Hello" variant="primary" />
 * \\\`\\\`\\\`
 */
export const MyComponent: React.FC<MyComponentProps> = ({ 
  label, 
  variant = 'primary' 
}) => {
  return (
    <div 
      data-variant={variant}
      style={{ 
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}
    >
      {label}
    </div>
  );
};\`
    }, {
      title: 'Export from Index',
      icon: Code,
      code: \`// src/ui/primitives/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';\`
    }, {
      title: 'Create Storybook Story',
      icon: BookOpen,
      code: \`// src/ui/stories/Primitives/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../../primitives/MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Primitives/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = {
  args: {
    label: 'Hello World',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Hello World',
    variant: 'secondary',
  },
};\`
    }, {
      title: 'Add Unit Tests',
      icon: TestTube,
      code: \`// src/ui/primitives/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders label', () => {
    render(<MyComponent label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant', () => {
    const { container } = render(
      <MyComponent label="Test" variant="secondary" />
    );
    expect(container.firstChild).toHaveAttribute(
      'data-variant', 
      'secondary'
    );
  });

  it('uses default variant', () => {
    const { container } = render(<MyComponent label="Test" />);
    expect(container.firstChild).toHaveAttribute(
      'data-variant', 
      'primary'
    );
  });
});\`
    }];
    const toggleStep = (index: number) => {
      if (completedSteps.includes(index)) {
        setCompletedSteps(completedSteps.filter(i => i !== index));
      } else {
        setCompletedSteps([...completedSteps, index]);
      }
    };
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          Component Creation Guide
        </Heading>

        <div style={{
        display: 'flex',
        gap: 'var(--ds-spacing-6)',
        flexWrap: 'wrap'
      }}>
          {/* Steps sidebar */}
          <div>
            <Card style={{
            padding: 'var(--ds-spacing-4)'
          }}>
              <Heading level={3} data-size="sm" style={{
              marginBottom: 'var(--ds-spacing-4)'
            }}>
                Steps
              </Heading>
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-2)'
            }}>
                {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                const isCompleted = completedSteps.includes(index);
                return <div key={index} onClick={() => setCurrentStep(index)} style={{
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: isActive ? 'var(--ds-color-accent-surface-default)' : 'transparent',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  border: isActive ? '1px solid var(--ds-color-accent-border-default)' : '1px solid transparent'
                }}>
                      {isCompleted ? <CheckCircle size={20} style={{
                    color: 'var(--ds-color-success-base-default)'
                  }} /> : <Icon size={20} style={{
                    color: isActive ? 'var(--ds-color-accent-base-default)' : 'var(--ds-color-neutral-text-subtle)'
                  }} />}
                      <span style={{
                    fontSize: 'var(--ds-font-size-sm)',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--ds-color-accent-text-default)' : 'inherit'
                  }}>
                        {index + 1}. {step.title}
                      </span>
                    </div>;
              })}
              </div>

              <div style={{
              marginTop: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-success-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)'
            }}>
                <Paragraph data-size="sm" style={{
                color: 'var(--ds-color-success-text-default)'
              }}>
                  <strong>
                    {completedSteps.length} of {steps.length}
                  </strong>{' '}
                  steps completed
                </Paragraph>
              </div>
            </Card>
          </div>

          {/* Content area */}
          <Card style={{
          padding: 'var(--ds-spacing-6)'
        }}>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
              {React.createElement(steps[currentStep].icon, {
              size: 32,
              style: {
                color: 'var(--ds-color-accent-base-default)'
              }
            })}
              <Heading level={3} data-size="md">
                Step {currentStep + 1}: {steps[currentStep].title}
              </Heading>
            </div>

            <pre style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'auto',
            fontSize: 'var(--ds-font-size-xs)',
            lineHeight: '1.6',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
              {steps[currentStep].code}
            </pre>

            <div style={{
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
            justifyContent: 'space-between'
          }}>
              <div>
                <Checkbox checked={completedSteps.includes(currentStep)} onChange={() => toggleStep(currentStep)} aria-label="Mark step as completed">
                  Mark as completed
                </Checkbox>
              </div>

              <div style={{
              display: 'flex',
              gap: 'var(--ds-spacing-2)'
            }}>
                <Button data-variant="tertiary" data-size="sm" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
                  ← Previous
                </Button>
                <Button data-variant="primary" data-size="sm" disabled={currentStep === steps.length - 1} onClick={() => setCurrentStep(currentStep + 1)}>
                  Next →
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>;
  }
}`,...(E=(W=x.parameters)==null?void 0:W.docs)==null?void 0:E.source},description:{story:"Interactive Component Creation Wizard",...(L=(F=x.parameters)==null?void 0:F.docs)==null?void 0:L.description}}};var O,G,_,q,N;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const checklistItems = [{
      category: 'Code Quality',
      items: [{
        id: 'typescript',
        label: 'Full TypeScript definitions with JSDoc'
      }, {
        id: 'tokens',
        label: 'Uses design tokens, no hard-coded values'
      }, {
        id: 'domain',
        label: 'Domain agnostic - no business logic'
      }, {
        id: 'layers',
        label: 'Follows layer hierarchy rules'
      }]
    }, {
      category: 'Accessibility',
      items: [{
        id: 'wcag',
        label: 'WCAG 2.1 AA compliant'
      }, {
        id: 'keyboard',
        label: 'Keyboard navigation support'
      }, {
        id: 'screen-reader',
        label: 'Screen reader compatible'
      }, {
        id: 'aria',
        label: 'Proper ARIA attributes'
      }, {
        id: 'contrast',
        label: 'Color contrast ratios met'
      }]
    }, {
      category: 'Documentation',
      items: [{
        id: 'jsdoc',
        label: 'JSDoc with examples'
      }, {
        id: 'stories',
        label: 'At least 2 story variants'
      }, {
        id: 'props',
        label: 'All props documented'
      }]
    }, {
      category: 'Testing',
      items: [{
        id: 'unit',
        label: 'Unit tests with >80% coverage'
      }, {
        id: 'interaction',
        label: 'Storybook interaction tests'
      }, {
        id: 'a11y-test',
        label: 'Accessibility tests'
      }]
    }];
    const toggleItem = (id: string) => {
      if (checkedItems.includes(id)) {
        setCheckedItems(checkedItems.filter(i => i !== id));
      } else {
        setCheckedItems([...checkedItems, id]);
      }
    };
    const totalItems = checklistItems.reduce((sum, cat) => sum + cat.items.length, 0);
    const completedItems = checkedItems.length;
    const progress = Math.round(completedItems / totalItems * 100);
    return <div>
        <Heading level={2} data-size="lg" style={{
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          Quality Checklist
        </Heading>

        <Card style={{
        padding: 'var(--ds-spacing-6)',
        marginBottom: 'var(--ds-spacing-6)'
      }}>
          <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--ds-spacing-2)'
          }}>
              <Paragraph data-size="sm" style={{
              fontWeight: 600
            }}>
                Overall Progress
              </Paragraph>
              <Paragraph data-size="sm" style={{
              color: 'var(--ds-color-accent-text-default)',
              fontWeight: 600
            }}>
                {completedItems} / {totalItems} ({progress}%)
              </Paragraph>
            </div>
            <div style={{
            height: '8px',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-full)',
            overflow: 'hidden'
          }}>
              <div style={{
              height: '100%',
              width: \`\${progress}%\`,
              backgroundColor: progress === 100 ? 'var(--ds-color-success-base-default)' : 'var(--ds-color-accent-base-default)',
              transition: 'width 0.3s ease'
            }} />
            </div>
          </div>

          {progress === 100 && <div style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-success-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)'
        }}>
              <CheckCircle size={24} style={{
            color: 'var(--ds-color-success-base-default)'
          }} />
              <Paragraph style={{
            color: 'var(--ds-color-success-text-default)'
          }}>
                <strong>Ready to submit!</strong> Your component meets all quality standards.
              </Paragraph>
            </div>}
        </Card>

        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--ds-spacing-6)'
      }}>
          {checklistItems.map(({
          category,
          items
        }) => {
          const categoryCompleted = items.filter(item => checkedItems.includes(item.id)).length;
          const categoryProgress = Math.round(categoryCompleted / items.length * 100);
          return <Card key={category} style={{
            padding: 'var(--ds-spacing-5)',
            flex: '1 1 300px'
          }}>
                <div style={{
              marginBottom: 'var(--ds-spacing-4)'
            }}>
                  <Heading level={3} data-size="sm" style={{
                marginBottom: 'var(--ds-spacing-2)'
              }}>
                    {category}
                  </Heading>
                  <Paragraph data-size="xs" style={{
                color: 'var(--ds-color-accent-text-default)'
              }}>
                    {categoryCompleted} / {items.length} completed
                  </Paragraph>
                </div>

                <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-3)'
            }}>
                  {items.map(item => <Checkbox key={item.id} checked={checkedItems.includes(item.id)} onChange={() => toggleItem(item.id)} aria-label={item.label}>
                      {item.label}
                    </Checkbox>)}
                </div>
              </Card>;
        })}
        </div>
      </div>;
  }
}`,...(_=(G=b.parameters)==null?void 0:G.docs)==null?void 0:_.source},description:{story:"Quality Checklist",...(N=(q=b.parameters)==null?void 0:q.docs)==null?void 0:N.description}}};var U,V,$,Q,K;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div>
      <Heading level={2} data-size="lg" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Testing Best Practices
      </Heading>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-6)'
    }}>
        {[{
        title: 'Unit Tests',
        icon: TestTube,
        description: 'Test component behavior in isolation',
        commands: [{
          cmd: 'pnpm test',
          desc: 'Run all unit tests'
        }, {
          cmd: 'pnpm test:watch',
          desc: 'Watch mode for development'
        }, {
          cmd: 'pnpm test:coverage',
          desc: 'Generate coverage report'
        }],
        example: \`describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies variant styles', () => {
    const { container } = render(
      <Button data-variant="primary">Button</Button>
    );
    expect(container.firstChild).toHaveAttribute('data-variant', 'primary');
  });
});\`
      }, {
        title: 'Storybook Tests',
        icon: BookOpen,
        description: 'Test component interactions in Storybook',
        commands: [{
          cmd: 'pnpm test:storybook',
          desc: 'Run Storybook tests'
        }, {
          cmd: 'pnpm storybook',
          desc: 'Start Storybook dev server'
        }],
        example: \`export const WithInteraction: Story = {
  args: {
    label: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};\`
      }, {
        title: 'Accessibility Tests',
        icon: Shield,
        description: 'Ensure WCAG 2.1 AA compliance',
        commands: [{
          cmd: 'pnpm test:a11y',
          desc: 'Run accessibility tests'
        }],
        example: \`it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('is keyboard accessible', async () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button');
  
  button.focus();
  expect(button).toHaveFocus();
  
  await userEvent.keyboard('{Enter}');
  // Verify action occurred
});\`
      }].map(({
        title,
        icon: Icon,
        description,
        commands,
        example
      }) => <Card key={title} style={{
        padding: 'var(--ds-spacing-6)',
        flex: '1 1 350px'
      }}>
            <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-3)',
          marginBottom: 'var(--ds-spacing-4)'
        }}>
              <Icon size={28} style={{
            color: 'var(--ds-color-accent-base-default)'
          }} />
              <div>
                <Heading level={3} data-size="md">
                  {title}
                </Heading>
                <Paragraph data-size="sm" style={{
              color: 'var(--ds-color-neutral-text-subtle)'
            }}>
                  {description}
                </Paragraph>
              </div>
            </div>

            <div style={{
          marginBottom: 'var(--ds-spacing-4)'
        }}>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                Commands
              </Heading>
              <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-2)'
          }}>
                {commands.map(({
              cmd,
              desc
            }) => <div key={cmd} style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)'
            }}>
                    <code style={{
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600
              }}>
                      {cmd}
                    </code>
                    <Paragraph data-size="xs" style={{
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)'
              }}>
                      {desc}
                    </Paragraph>
                  </div>)}
              </div>
            </div>

            <div>
              <Heading level={4} data-size="sm" style={{
            marginBottom: 'var(--ds-spacing-3)'
          }}>
                Example
              </Heading>
              <pre style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'auto',
            fontSize: 'var(--ds-font-size-xs)',
            lineHeight: '1.6'
          }}>
                {example}
              </pre>
            </div>
          </Card>)}
      </div>
    </div>
}`,...($=(V=h.parameters)==null?void 0:V.docs)==null?void 0:$.source},description:{story:"Testing Best Practices",...(K=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:K.description}}};var J,X,Z,Y,ee;C.parameters={...C.parameters,docs:{...(J=C.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div>
      <Heading level={2} data-size="lg" style={{
      marginBottom: 'var(--ds-spacing-6)'
    }}>
        Common Pitfalls to Avoid
      </Heading>

      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-spacing-4)'
    }}>
        {[{
        title: 'Hardcoding Design Values',
        bad: "style={{ padding: '16px', color: '#1E40AF' }}",
        good: "style={{ padding: 'var(--ds-spacing-4)', color: 'var(--ds-color-accent-base-default)' }}",
        why: 'Design tokens ensure consistency and enable theming'
      }, {
        title: 'Domain-Specific Logic',
        bad: '<BookingCard booking={booking} onBook={handleBook} />',
        good: '<ResourceCard resource={resource} onAction={handleAction} />',
        why: 'Components must be reusable across different domains'
      }, {
        title: 'Missing Accessibility',
        bad: '<div onClick={handleClick}>Click me</div>',
        good: '<button onClick={handleClick} aria-label="Submit form">Click me</button>',
        why: 'Proper semantic HTML and ARIA ensure accessibility'
      }, {
        title: 'Circular Dependencies',
        bad: 'primitives/Button imports from blocks/Card',
        good: 'blocks/Card imports from primitives/Button',
        why: 'Lower layers cannot import from higher layers'
      }, {
        title: 'Inline Styles Without Tokens',
        bad: '<div style={{ marginTop: 20, fontSize: 14 }}>',
        good: "<div style={{ marginTop: 'var(--ds-spacing-5)', fontSize: 'var(--ds-font-size-sm)' }}>",
        why: 'All styling must use design tokens for consistency'
      }, {
        title: 'Missing TypeScript Types',
        bad: 'export const MyComponent = ({ data }) => { ... }',
        good: 'export const MyComponent: React.FC<MyComponentProps> = ({ data }) => { ... }',
        why: 'Full type safety prevents runtime errors'
      }].map(({
        title,
        bad,
        good,
        why
      }) => <Card key={title} style={{
        padding: 'var(--ds-spacing-5)',
        borderLeft: '4px solid var(--ds-color-warning-base-default)',
        flex: '1 1 350px'
      }}>
            <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
              <AlertTriangle size={20} style={{
            color: 'var(--ds-color-warning-base-default)'
          }} />
              <Heading level={3} data-size="sm">
                {title}
              </Heading>
            </div>

            <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)',
          marginBottom: 'var(--ds-spacing-3)'
        }}>
              <div style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-danger-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)'
          }}>
                <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginBottom: 'var(--ds-spacing-2)'
            }}>
                  <XCircle size={16} style={{
                color: 'var(--ds-color-danger-base-default)'
              }} />
                  <strong style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-danger-text-default)'
              }}>
                    Bad
                  </strong>
                </div>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-danger-text-default)'
            }}>
                  {bad}
                </code>
              </div>

              <div style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)'
          }}>
                <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginBottom: 'var(--ds-spacing-2)'
            }}>
                  <CheckCircle size={16} style={{
                color: 'var(--ds-color-success-base-default)'
              }} />
                  <strong style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-success-text-default)'
              }}>
                    Good
                  </strong>
                </div>
                <code style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-success-text-default)'
            }}>
                  {good}
                </code>
              </div>
            </div>

            <Paragraph data-size="sm" style={{
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
              <strong>Why:</strong> {why}
            </Paragraph>
          </Card>)}
      </div>
    </div>
}`,...(Z=(X=C.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"Common Pitfalls",...(ee=(Y=C.parameters)==null?void 0:Y.docs)==null?void 0:ee.description}}};const We=["DesignPrinciples","ComponentArchitecture","ComponentCreationWizard","QualityChecklist","TestingBestPractices","CommonPitfalls"];export{C as CommonPitfalls,f as ComponentArchitecture,x as ComponentCreationWizard,y as DesignPrinciples,b as QualityChecklist,h as TestingBestPractices,We as __namedExportsOrder,De as default};
//# sourceMappingURL=Contributing.stories-pIPggH7q.js.map
