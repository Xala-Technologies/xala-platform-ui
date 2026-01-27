try{
(()=>{var L=__STORYBOOK_API__,{ActiveTabs:P,Consumer:M,ManagerContext:G,Provider:U,RequestResponseError:H,addons:n,combineParameters:Y,controlOrMetaKey:V,controlOrMetaSymbol:W,eventMatchesShortcut:K,eventToShortcut:X,experimental_MockUniversalStore:j,experimental_UniversalStore:Q,experimental_requestResponse:q,experimental_useUniversalStore:$,isMacLike:J,isShortcutTaken:Z,keyToSymbol:ee,merge:re,mockChannel:oe,optionOrAltSymbol:ae,shortcutMatchesShortcut:se,shortcutToHumanString:de,types:te,useAddonState:ce,useArgTypes:le,useArgs:ne,useChannel:be,useGlobalTypes:ue,useGlobals:fe,useParameter:ie,useSharedState:ge,useStoryPrepared:he,useStorybookApi:me,useStorybookState:ve}=__STORYBOOK_API__;var Ae=__STORYBOOK_THEMING__,{CacheProvider:we,ClassNames:ye,Global:ke,ThemeProvider:Se,background:ze,color:Te,convert:_e,create:m,createCache:De,createGlobal:Be,createReset:Ce,css:Re,darken:Oe,ensure:Ie,ignoreSsrWarning:Ne,isPropValid:Le,jsx:Pe,keyframes:Me,lighten:Ge,styled:Ue,themes:He,typography:Ye,useTheme:Ve,withTheme:We}=__STORYBOOK_THEMING__;var qe=__STORYBOOK_CORE_EVENTS__,{ARGTYPES_INFO_REQUEST:$e,ARGTYPES_INFO_RESPONSE:Je,CHANNEL_CREATED:Ze,CHANNEL_WS_DISCONNECT:er,CONFIG_ERROR:rr,CREATE_NEW_STORYFILE_REQUEST:or,CREATE_NEW_STORYFILE_RESPONSE:ar,CURRENT_STORY_WAS_SET:sr,DOCS_PREPARED:dr,DOCS_RENDERED:tr,FILE_COMPONENT_SEARCH_REQUEST:cr,FILE_COMPONENT_SEARCH_RESPONSE:lr,FORCE_REMOUNT:nr,FORCE_RE_RENDER:br,GLOBALS_UPDATED:v,NAVIGATE_URL:ur,PLAY_FUNCTION_THREW_EXCEPTION:fr,PRELOAD_ENTRIES:ir,PREVIEW_BUILDER_PROGRESS:gr,PREVIEW_KEYDOWN:hr,REGISTER_SUBSCRIPTION:mr,REQUEST_WHATS_NEW_DATA:vr,RESET_STORY_ARGS:pr,RESULT_WHATS_NEW_DATA:xr,SAVE_STORY_REQUEST:Er,SAVE_STORY_RESPONSE:Fr,SELECT_STORY:Ar,SET_CONFIG:wr,SET_CURRENT_STORY:yr,SET_FILTER:kr,SET_GLOBALS:Sr,SET_INDEX:zr,SET_STORIES:Tr,SET_WHATS_NEW_CACHE:_r,SHARED_STATE_CHANGED:Dr,SHARED_STATE_SET:Br,STORIES_COLLAPSE_ALL:Cr,STORIES_EXPAND_ALL:Rr,STORY_ARGS_UPDATED:Or,STORY_CHANGED:Ir,STORY_ERRORED:Nr,STORY_FINISHED:Lr,STORY_INDEX_INVALIDATED:Pr,STORY_MISSING:Mr,STORY_PREPARED:Gr,STORY_RENDERED:Ur,STORY_RENDER_PHASE_CHANGED:Hr,STORY_SPECIFIED:Yr,STORY_THREW_EXCEPTION:Vr,STORY_UNCHANGED:Wr,TELEMETRY_ERROR:Kr,TESTING_MODULE_CANCEL_TEST_RUN_REQUEST:Xr,TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE:jr,TESTING_MODULE_CRASH_REPORT:Qr,TESTING_MODULE_PROGRESS_REPORT:qr,TESTING_MODULE_RUN_ALL_REQUEST:$r,TESTING_MODULE_RUN_REQUEST:Jr,TOGGLE_WHATS_NEW_NOTIFICATIONS:Zr,UNHANDLED_ERRORS_WHILE_PLAYING:eo,UPDATE_GLOBALS:ro,UPDATE_QUERY_PARAMS:oo,UPDATE_STORY_ARGS:ao}=__STORYBOOK_CORE_EVENTS__;var u={digilist:{name:"Digilist",light:{accent:{base:"#2A5280",hover:"#214066",contrast:"#FFFFFF"},neutral:{background:"#f0f4f8",surface:"#FFFFFF",surfaceHover:"#eceef2",text:"#1e2b3c",textSubtle:"#5b6c7f",border:"#a9bed6"}},dark:{accent:{base:"#9EDBE5",hover:"#b5e5ec",contrast:"#1F2F6E"},neutral:{background:"#101822",surface:"#1b2939",surfaceHover:"#1f2f41",text:"#e8edf4",textSubtle:"#97aac0",border:"#375272"}}},xaheen:{name:"Xaheen",light:{accent:{base:"#8E8F5A",hover:"#7A7B4D",contrast:"#FFFFFF"},neutral:{background:"#F2F2ED",surface:"#FFFFFF",surfaceHover:"#E5E5E0",text:"#0B0B0F",textSubtle:"#5C6974",border:"#DEDED9"}},dark:{accent:{base:"#D6D876",hover:"#E6E7A3",contrast:"#0B0B0F"},neutral:{background:"#0B0B0F",surface:"#121216",surfaceHover:"#1A1A1F",text:"#E6E6E6",textSubtle:"#868F97",border:"#232323"}}},digdir:{name:"Digdir",light:{accent:{base:"#0062BA",hover:"#004d92",contrast:"#FFFFFF"},neutral:{background:"#f5f6f7",surface:"#FFFFFF",surfaceHover:"#e8e9ec",text:"#1e2b3c",textSubtle:"#68707c",border:"#c9c9c9"}},dark:{accent:{base:"#76b5fb",hover:"#9ecbfc",contrast:"#1a1a1a"},neutral:{background:"#1a1a1a",surface:"#2a2a2a",surfaceHover:"#333333",text:"#e0e0e0",textSubtle:"#a0a0a0",border:"#444444"}}},altinn:{name:"Altinn",light:{accent:{base:"#0062BA",hover:"#004d92",contrast:"#FFFFFF"},neutral:{background:"#f5f6f7",surface:"#FFFFFF",surfaceHover:"#e8e9ec",text:"#1e2b3c",textSubtle:"#68707c",border:"#c9c9c9"}},dark:{accent:{base:"#76b5fb",hover:"#9ecbfc",contrast:"#1a1a1a"},neutral:{background:"#1a1a1a",surface:"#2a2a2a",surfaceHover:"#333333",text:"#e0e0e0",textSubtle:"#a0a0a0",border:"#444444"}}},brreg:{name:"Bronnysundregistrene",light:{accent:{base:"#0062BA",hover:"#004d92",contrast:"#FFFFFF"},neutral:{background:"#f5f6f7",surface:"#FFFFFF",surfaceHover:"#e8e9ec",text:"#1e2b3c",textSubtle:"#68707c",border:"#c9c9c9"}},dark:{accent:{base:"#76b5fb",hover:"#9ecbfc",contrast:"#1a1a1a"},neutral:{background:"#1a1a1a",surface:"#2a2a2a",surfaceHover:"#333333",text:"#e0e0e0",textSubtle:"#a0a0a0",border:"#444444"}}},platform:{name:"Platform",light:{accent:{base:"#3a5ba0",hover:"#2e4a85",contrast:"#FFFFFF"},neutral:{background:"#f5f7fa",surface:"#FFFFFF",surfaceHover:"#e3eaf2",text:"#1a2238",textSubtle:"#4a5568",border:"#b0b8c1"}},dark:{accent:{base:"#3a5ba0",hover:"#4a6bb0",contrast:"#ffe066"},neutral:{background:"#181a24",surface:"#23243a",surfaceHover:"#32334d",text:"#e6eaf3",textSubtle:"#7a88a1",border:"#2d2e3e"}}}};var F="XALA_COLOR_SCHEME_CHANGED",p="xala-manager-theme",f=new Map;async function A(a){let o=a;if(f.has(o))return f.get(o);try{let e=[];switch(a){case"digilist":e=["/themes/xala.css","/themes/common-extensions.css","/themes/digilist-colors.css"];break;case"xaheen":e=["/themes/xala.css","/themes/common-extensions.css","/themes/xaheen-colors.css"];break;case"platform":e=["/themes/xala.css","/themes/common-extensions.css","/themes/platform-colors.css"];break;case"digdir":case"altinn":case"brreg":e=["/themes/xala.css","/themes/common-extensions.css"];break;default:e=["/themes/xala.css","/themes/common-extensions.css","/themes/digilist-colors.css"]}let r=await Promise.all(e.map(b=>fetch(b))),l=(await Promise.all(r.map(b=>b.text()))).join(`
`);return f.set(o,l),l}catch(e){return console.error("[Manager Theme] Failed to fetch theme CSS:",e),""}}async function w(a,o){if(typeof document>"u")return;console.log(`[Manager Theme] Injecting theme: ${a}, colorScheme: ${o}`);let e=document.getElementById(p);e&&e.remove();let r=await A(a);if(console.log(`[Manager Theme] CSS length: ${r?.length||0} characters`),r&&r.length>0){let s=document.createElement("style");s.id=p,s.textContent=r,document.head.appendChild(s),console.log("[Manager Theme] \u2705 Theme CSS injected successfully")}else console.log("[Manager Theme] Using base Designsystemet theme (no custom CSS needed)");document.documentElement.setAttribute("data-color-scheme",o),document.documentElement.setAttribute("data-size","md"),document.documentElement.setAttribute("data-typography","primary"),o==="dark"?(document.documentElement.classList.add("dark"),document.documentElement.classList.remove("light")):(document.documentElement.classList.add("light"),document.documentElement.classList.remove("dark")),console.log("[Manager Theme] \u2705 Data attributes set:",{colorScheme:document.documentElement.getAttribute("data-color-scheme"),themeClass:o==="dark"?"dark":"light"})}var y=`
  /* Apply design system font */
  body, * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* ==========================================================================
   * SIDEBAR - Use design tokens
   * ========================================================================== */
  aside,
  nav,
  [class*="sidebar"],
  [class*="Sidebar"] {
    background-color: var(--ds-color-neutral-background-default) !important;
    color: var(--ds-color-neutral-text-default) !important;
  }
  
  aside button,
  aside a,
  nav button,
  nav a,
  [class*="sidebar"] button,
  [class*="sidebar"] a {
    color: var(--ds-color-neutral-text-default) !important;
  }
  
  aside button:hover,
  aside a:hover,
  nav button:hover,
  nav a:hover {
    background-color: var(--ds-color-neutral-surface-hover) !important;
  }
  
  /* Selected sidebar items - use accent color with proper contrast */
  aside [data-selected="true"],
  nav [data-selected="true"],
  [class*="sidebar"] [data-selected="true"],
  [data-selected="true"],
  [aria-current="true"],
  [aria-current="page"] {
    background-color: var(--ds-color-accent-base-default) !important;
    color: var(--ds-color-accent-base-contrast-default) !important;
  }
  
  /* Selected item children and icons */
  aside [data-selected="true"] *,
  nav [data-selected="true"] *,
  [data-selected="true"] *,
  [aria-current="true"] *,
  [aria-current="page"] * {
    color: var(--ds-color-accent-base-contrast-default) !important;
  }
  
  aside [data-selected="true"] svg,
  nav [data-selected="true"] svg,
  [data-selected="true"] svg,
  [data-selected="true"] svg path {
    fill: var(--ds-color-accent-base-contrast-default) !important;
    color: var(--ds-color-accent-base-contrast-default) !important;
  }
  
  /* ==========================================================================
   * TOP BAR / HEADER - Use design tokens
   * ========================================================================== */
  [role="banner"],
  header,
  [class*="header"],
  [class*="toolbar"],
  [class*="Toolbar"] {
    background-color: var(--ds-color-neutral-surface-default) !important;
    border-bottom-color: var(--ds-color-neutral-border-default) !important;
    color: var(--ds-color-neutral-text-default) !important;
  }
  
  [role="banner"] *,
  [role="banner"] button,
  [role="banner"] svg {
    color: var(--ds-color-neutral-text-default) !important;
  }
  
  /* ==========================================================================
   * BORDERS AND DIVIDERS - Use design tokens
   * ========================================================================== */
  hr,
  [role="separator"] {
    border-color: var(--ds-color-neutral-border-default) !important;
    background-color: var(--ds-color-neutral-border-default) !important;
  }
  
  /* ==========================================================================
   * SMOOTH TRANSITIONS - Design system style
   * ========================================================================== */
  * {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
  }
`;function k(){if(typeof document>"u")return;let a=document.getElementById("storybook-ui-mapping");a||(a=document.createElement("style"),a.id="storybook-ui-mapping",a.textContent=y,document.head.appendChild(a))}var S={fontBase:'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',fontCode:'"JetBrains Mono", "Fira Code", monospace'};function E(a,o){let e=u[a]||u.digilist,r=e[o];return m({base:o,brandTitle:`${e.name} Design System`,brandUrl:"https://xala.no",...S,colorPrimary:r.accent.base,colorSecondary:r.accent.base,appBg:r.neutral.background,appContentBg:r.neutral.surface,appPreviewBg:r.neutral.surface,appBorderColor:r.neutral.border,appBorderRadius:4,textColor:r.neutral.text,textInverseColor:r.accent.contrast,textMutedColor:r.neutral.textSubtle,barBg:r.neutral.surface,barTextColor:r.neutral.text,barSelectedColor:r.accent.base,barHoverColor:r.accent.hover,inputBg:r.neutral.surface,inputBorder:r.neutral.border,inputTextColor:r.neutral.text,inputBorderRadius:4})}function z(){if(typeof window<"u"){let o=new URLSearchParams(window.location.search).get("globals");if(o){let e=o.match(/brandTheme:(\w+)/);if(e&&e[1]){let r=e[1];if(["digilist","xaheen","digdir","altinn","brreg","platform"].includes(r))return r}}}return"digilist"}function T(){if(typeof window<"u"){let o=new URLSearchParams(window.location.search).get("globals");if(o){let e=o.match(/colorScheme:(light|dark)/);if(e&&e[1])return e[1]}}return"light"}async function i(a,o){await w(a,o),k();let e=E(a,o);n.setConfig({theme:e})}function _(a,o){let e=null;return function(...s){let l=()=>{e=null,a(...s)};e&&clearTimeout(e),e=setTimeout(l,o)}}var x=_((a,o)=>{i(a,o)},50),g=z(),h=T(),D=E(g,h);n.setConfig({theme:D,sidebar:{showRoots:!0,collapsedRoots:[]}});typeof window<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>{i(g,h)}):i(g,h));n.register("xala-theme-manager",a=>{let o=a.getChannel();console.log("[Manager Theme] Registering theme manager addon"),o?(o.on(v,({globals:e})=>{let r=e?.brandTheme||"digilist",s=e?.colorScheme||"light";console.log("[Manager Theme] GLOBALS_UPDATED received:",{brandTheme:r,colorScheme:s}),x(r,s)}),o.on(F,e=>{let s=a.getGlobals()?.brandTheme||"digilist";console.log("[Manager Theme] COLOR_SCHEME_EVENT received:",{brandTheme:s,colorScheme:e}),x(s,e)}),console.log("[Manager Theme] Event listeners registered successfully")):console.error("[Manager Theme] Channel not available")});})();
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
