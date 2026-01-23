import{j as e}from"./jsx-runtime-BYYWji4R.js";import{S as a}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const T={title:"Components/Search",parameters:{docs:{description:{component:`
Search input component provides a dedicated interface for searching content, with built-in clear and submit functionality for optimal user experience.

## Variants

- **Default** - Standard search with all controls
- **Minimal** - Input only
- **With placeholder** - Custom placeholder text
- **Size variants** - sm, md (default), lg
- **Color variants** - neutral, primary, secondary
- **Autocomplete** - With suggestions dropdown

## When to Use

- Site-wide search functionality
- Table and list filtering
- Content search and discovery
- Data exploration
- Quick navigation
- Real-time search results

## Best Practices

### Do
- Use clear, descriptive placeholders
- Provide immediate visual feedback
- Include clear and submit buttons
- Support keyboard navigation
- Show search results count
- Maintain search state

### Don't
- Don't hide search functionality
- Don't use generic placeholders
- Don't forget clear button for long inputs
- Don't make submit ambiguous
- Don't lose search on navigation
- Don't ignore empty searches

## Usage Patterns

### Basic Search
\`\`\`tsx
<Search>
  <Search.Input aria-label="Search" placeholder="Search..." />
  <Search.Clear />
  <Search.Button />
</Search>
\`\`\`

### With Custom Placeholder
\`\`\`tsx
<Search>
  <Search.Input 
    aria-label="Search listings" 
    placeholder="Search for listings..." 
  />
  <Search.Clear />
  <Search.Button />
</Search>
\`\`\`

### Size Variants
\`\`\`tsx
<Search data-size="sm">
  <Search.Input aria-label="Small search" placeholder="Small..." />
  <Search.Clear />
  <Search.Button />
</Search>
<Search data-size="lg">
  <Search.Input aria-label="Large search" placeholder="Large..." />
  <Search.Clear />
  <Search.Button />
</Search>
\`\`\`

### Color Variants
\`\`\`tsx
<Search data-color="neutral">
  <Search.Input aria-label="Neutral search" placeholder="Neutral..." />
  <Search.Clear />
  <Search.Button />
</Search>
<Search data-color="primary">
  <Search.Input aria-label="Primary search" placeholder="Primary..." />
  <Search.Clear />
  <Search.Button />
</Search>
\`\`\`

### With Autocomplete
\`\`\`tsx
<Search>
  <Search.Input 
    aria-label="Search with suggestions" 
    placeholder="Type to search..."
    list="suggestions"
  />
  <Search.Clear />
  <Search.Button />
  <datalist id="suggestions">
    <option value="Apple" />
    <option value="Banana" />
    <option value="Cherry" />
  </datalist>
</Search>
\`\`\`

### Controlled Search
\`\`\`tsx
const [searchQuery, setSearchQuery] = useState('');
const [results, setResults] = useState([]);

const handleSearch = (query: string) => {
  setSearchQuery(query);
  // Perform search logic
  const searchResults = performSearch(query);
  setResults(searchResults);
};

<Search>
  <Search.Input 
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    aria-label="Search"
    placeholder="Search..."
  />
  <Search.Clear onClick={() => handleSearch('')} />
  <Search.Button />
</Search>
\`\`\`

## Anti-Patterns

### Anti-pattern: No Clear Button
Forcing users to manually clear long search queries.

### Anti-pattern: Vague Placeholders
Using generic text like "Search" without context.

### Anti-pattern: Hidden Submit
Making it unclear how to submit the search.

### Anti-pattern: No Feedback
Not showing search results or loading states.

## Accessibility

### Screen Readers
- Search role announced
- Clear button purpose described
- Submit button clearly labeled
- Results count announced
- Search state communicated

### Keyboard Navigation
- Tab navigates through search controls
- Enter submits search form
- Escape can clear search
- Arrow keys navigate suggestions
- Logical tab order maintained

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All controls reachable via keyboard
- **Clear labeling**: Descriptive labels and placeholders
- **Operable**: All functions available via keyboard
- **Predictable**: Expected search behavior
- **Feedback**: Search results clearly communicated

### ARIA Implementation
\`\`\`tsx
<form role="search" aria-label="Site search">
  <label htmlFor="search-input">Search</label>
  <input 
    id="search-input"
    type="search"
    aria-describedby="search-help"
    placeholder="Search for content..."
  />
  <div id="search-help" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
    Type to search, press Enter to submit
  </div>
  <button type="button" aria-label="Clear search">
    Clear
  </button>
  <button type="submit" aria-label="Submit search">
    Search
  </button>
</form>
\`\`\`

### Best Practice for Placeholders
Use context-specific placeholders:
\`\`\`tsx
// Good
<Search.Input placeholder="Search for products..." />
<Search.Input placeholder="Filter by name..." />
<Search.Input placeholder="Search documentation..." />

// Bad
<Search.Input placeholder="Search" />
<Search.Input placeholder="Type here" />
<Search.Input placeholder="Enter text" />
\`\`\`

### Advanced Search Example
\`\`\`tsx
const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    dateRange: 'any'
  });
  
  const handleSearch = () => {
    // Perform search with filters
    searchWithFilters(query, filters);
  };
  
  return (
    <Search>
      <Search.Input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        aria-label="Advanced search"
        placeholder="Search with filters..."
      />
      <Search.Clear onClick={() => setQuery('')} />
      <Search.Button onClick={handleSearch} />
    </Search>
  );
};
\`\`\`
        `}}},tags:["autodocs"]},r={render:()=>e.jsxs(a,{children:[e.jsx(a.Input,{"aria-label":"Search",placeholder:"Search..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]})},t={render:()=>e.jsxs(a,{children:[e.jsx(a.Input,{"aria-label":"Search listings",placeholder:"Search for listings..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(a,{"data-size":"sm",children:[e.jsx(a.Input,{"aria-label":"Small search",placeholder:"Small..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]}),e.jsxs(a,{"data-size":"md",children:[e.jsx(a.Input,{"aria-label":"Medium search",placeholder:"Medium..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]}),e.jsxs(a,{"data-size":"lg",children:[e.jsx(a.Input,{"aria-label":"Large search",placeholder:"Large..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]})]})},l={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-4)"},children:[e.jsxs(a,{"data-color":"neutral",children:[e.jsx(a.Input,{"aria-label":"Neutral search",placeholder:"Neutral color..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]}),e.jsxs(a,{"data-color":"accent",children:[e.jsx(a.Input,{"aria-label":"Accent search",placeholder:"Accent color..."}),e.jsx(a.Clear,{}),e.jsx(a.Button,{})]})]})};var s,o,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Search>
      <Search.Input aria-label="Search" placeholder="Search..." />
      <Search.Clear />
      <Search.Button />
    </Search>
}`,...(n=(o=r.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var i,h,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <Search>
      <Search.Input aria-label="Search listings" placeholder="Search for listings..." />
      <Search.Clear />
      <Search.Button />
    </Search>
}`,...(d=(h=t.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};var u,p,S;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Search data-size="sm">
        <Search.Input aria-label="Small search" placeholder="Small..." />
        <Search.Clear />
        <Search.Button />
      </Search>
      <Search data-size="md">
        <Search.Input aria-label="Medium search" placeholder="Medium..." />
        <Search.Clear />
        <Search.Button />
      </Search>
      <Search data-size="lg">
        <Search.Input aria-label="Large search" placeholder="Large..." />
        <Search.Clear />
        <Search.Button />
      </Search>
    </div>
}`,...(S=(p=c.parameters)==null?void 0:p.docs)==null?void 0:S.source}}};var m,b,g;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-4)'
  }}>
      <Search data-color="neutral">
        <Search.Input aria-label="Neutral search" placeholder="Neutral color..." />
        <Search.Clear />
        <Search.Button />
      </Search>
      <Search data-color="accent">
        <Search.Input aria-label="Accent search" placeholder="Accent color..." />
        <Search.Clear />
        <Search.Button />
      </Search>
    </div>
}`,...(g=(b=l.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};const U=["Default","WithPlaceholder","Sizes","Colors"];export{l as Colors,r as Default,c as Sizes,t as WithPlaceholder,U as __namedExportsOrder,T as default};
//# sourceMappingURL=Search.stories-CLJVjiYl.js.map
