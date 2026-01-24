/**
 * Storybook-specific translations that extend @xala-technologies/i18n-platform.
 *
 * These translations are used for Storybook documentation and examples.
 * They follow the same namespace pattern as platform translations.
 */

export const storybookNb: Record<string, string> = {
  // Overview section
  'storybook.overview.welcome': 'Velkommen til Xala Platform',
  'storybook.overview.subtitle':
    'Et omfattende designsystem for a bygge tilgjengelige, konsistente applikasjoner',
  'storybook.overview.accessibilityFirst': 'Tilgjengelighet forst',
  'storybook.overview.accessibilityFirstDesc':
    'WCAG 2.1 AA-kompatible komponenter med tastaturnavigasjon, skjermleserstotte og riktige ARIA-attributter.',
  'storybook.overview.designTokens': 'Designtokens',
  'storybook.overview.designTokensDesc':
    'Konsistent styling med designtokens for farger, mellomrom, typografi og mer. Aldri hardkod verdier igjen.',
  'storybook.overview.components': '50+ Komponenter',
  'storybook.overview.componentsDesc':
    'Produksjonsklare komponenter fra knapper til datatabeller, alle bygget med beste praksis og tilgjengelighet i tankene.',
  'storybook.overview.i18n': 'Internasjonalisering',
  'storybook.overview.i18nDesc':
    'Full i18n-stotte med oversettelser for norsk, engelsk og arabisk. RTL-stotte inkludert.',
  'storybook.overview.multiTenancy': 'Multi-tenancy',
  'storybook.overview.multiTenancyDesc':
    'Bygget for SaaS-plattformer med leietakerisolasjon, RBAC og funksjonsflagg ut av boksen.',
  'storybook.overview.themeSupport': 'Temastotte',
  'storybook.overview.themeSupportDesc':
    'Tilpassbare temaer med lys/mork modus stotte. Skap din egen visuelle identitet mens du opprettholder konsistens.',

  // Getting started
  'storybook.gettingStarted.title': 'Kom i gang',
  'storybook.gettingStarted.installation': 'Installasjon',
  'storybook.gettingStarted.setup': 'Oppsett',
  'storybook.gettingStarted.firstComponent': 'Din forste komponent',

  // Architecture
  'storybook.architecture.title': 'Arkitekturprinsipper',
  'storybook.architecture.designTokensFirst': 'Designtokens forst',
  'storybook.architecture.designTokensFirstDesc':
    'All styling bruker designtokens. Ingen hardkodede farger, mellomrom eller typografiverdier.',
  'storybook.architecture.componentComposition': 'Komponentsammensetning',
  'storybook.architecture.componentCompositionDesc':
    'Bygg komplekse brukergrensesnitt ved a sette sammen enkle, gjenbrukbare komponenter fra plattformen.',
  'storybook.architecture.sdkFirst': 'SDK-forst',
  'storybook.architecture.sdkFirstDesc':
    'Alle API-kall gar gjennom SDK-en. Bruk aldri fetch() eller axios direkte.',
  'storybook.architecture.pureI18n': 'Ren i18n',
  'storybook.architecture.pureI18nDesc':
    'All brukervendt tekst ma vaere oversettbar. Ingen hardkodede strenger.',
  'storybook.architecture.accessibilityRequired': 'Tilgjengelighet pakrevd',
  'storybook.architecture.accessibilityRequiredDesc':
    'Hver komponent ma vaere tastatur-tilgjengelig med riktige ARIA-attributter.',

  // Component categories
  'storybook.categories.primitives': 'Primitiver',
  'storybook.categories.blocks': 'Blokker',
  'storybook.categories.composed': 'Sammensatte',
  'storybook.categories.patterns': 'Monstre',
  'storybook.categories.shells': 'Skall',
  'storybook.categories.pages': 'Sider',

  // Common story labels
  'storybook.story.default': 'Standard',
  'storybook.story.variants': 'Varianter',
  'storybook.story.sizes': 'Storrelser',
  'storybook.story.states': 'Tilstander',
  'storybook.story.interactive': 'Interaktiv',
  'storybook.story.withIcons': 'Med ikoner',
  'storybook.story.disabled': 'Deaktivert',
  'storybook.story.loading': 'Laster',
  'storybook.story.error': 'Feil',
  'storybook.story.success': 'Suksess',
  'storybook.story.warning': 'Advarsel',
  'storybook.story.info': 'Info',
  'storybook.story.example': 'Eksempel',
  'storybook.story.usage': 'Bruk',
  'storybook.story.playground': 'Lekeplass',
  'storybook.story.tryItLive': 'Prov det live',
  'storybook.story.theCode': 'Koden',
  'storybook.story.componentShowcase': 'Komponentutstilling',
  'storybook.story.resources': 'Ressurser og dokumentasjon',

  // Form labels
  'storybook.form.yourName': 'Ditt navn',
  'storybook.form.enterName': 'Skriv inn navnet ditt',
  'storybook.form.agreeTerms': 'Jeg godtar a bruke designtokens',
  'storybook.form.getStarted': 'Kom i gang',
  'storybook.form.welcomeMessage': 'Velkommen, {{name}}! Du er klar til a bygge med Xala Platform.',
  'storybook.form.submit': 'Send inn',
  'storybook.form.reset': 'Tilbakestill',

  // Demo content
  'storybook.demo.cardTitle': 'Korttittel',
  'storybook.demo.cardDescription':
    'Kort er allsidige beholdere for gruppering av relatert innhold.',
  'storybook.demo.sampleText': 'Dette er eksempeltekst for demonstrasjon.',
  'storybook.demo.clickMe': 'Klikk meg',
  'storybook.demo.learnMore': 'Laer mer',
  'storybook.demo.viewDetails': 'Se detaljer',
  'storybook.demo.primary': 'Primar',
  'storybook.demo.secondary': 'Sekundar',
  'storybook.demo.tertiary': 'Tertiaer',
  'storybook.demo.danger': 'Fare',

  // Headings
  'storybook.heading.xl': 'Overskrift XL',
  'storybook.heading.lg': 'Overskrift LG',
  'storybook.heading.md': 'Overskrift MD',
  'storybook.heading.sm': 'Overskrift SM',
  'storybook.heading.xs': 'Overskrift XS',

  // Resources
  'storybook.resources.gettingStarted': 'Kom i gang',
  'storybook.resources.gettingStartedDesc': 'Installasjon, oppsett og din forste komponent',
  'storybook.resources.fundamentals': 'Grunnleggende',
  'storybook.resources.fundamentalsDesc': 'Designtokens, tilgjengelighet, beste praksis og monstre',
  'storybook.resources.components': 'Komponenter',
  'storybook.resources.componentsDesc': 'Bla gjennom alle 50+ komponenter med live eksempler',
  'storybook.resources.examples': 'Eksempler',
  'storybook.resources.examplesDesc': '1000+ kodeeksempler og opplaeringsmateriell',
  'storybook.resources.designsystemet': 'Designsystemet',
  'storybook.resources.designsystemetDesc': 'Offisiell norsk designsystem dokumentasjon',
  'storybook.resources.view': 'Vis',
  'storybook.resources.visit': 'Besok',

  // Accessibility
  'storybook.a11y.title': 'Tilgjengelighet',
  'storybook.a11y.keyboardNavigation': 'Tastaturnavigasjon',
  'storybook.a11y.screenReader': 'Skjermleserstotte',
  'storybook.a11y.colorContrast': 'Fargekontrast',
  'storybook.a11y.focusManagement': 'Fokushandtering',

  // Best practices
  'storybook.bestPractices.title': 'Beste praksis',
  'storybook.bestPractices.do': 'Gjor',
  'storybook.bestPractices.dont': 'Ikke gjor',

  // Contributing
  'storybook.contributing.title': 'Bidra',
  'storybook.contributing.howToContribute': 'Hvordan bidra',
  'storybook.contributing.guidelines': 'Retningslinjer',

  // Key features
  'storybook.features.keyFeatures': 'Hovedfunksjoner',
  'storybook.features.builtWith': 'Bygget med',

  // Pattern stories - Interactive examples
  'storybook.patterns.selected': 'Valgt',
  'storybook.patterns.selectedMode': 'Valgt modus',
  'storybook.patterns.currentStep': 'Gjeldende steg',
  'storybook.patterns.selectItems': 'Velg elementer nedenfor for a se handlingsfeltet vises',
  'storybook.patterns.justNow': 'Akkurat na',
  'storybook.patterns.minutesAgo': '{minutes}m siden',
  'storybook.patterns.hoursAgo': '{hours}t siden',

  // Size comparison labels
  'storybook.patterns.sizeSmall': 'Liten',
  'storybook.patterns.sizeMedium': 'Medium',
  'storybook.patterns.sizeLarge': 'Stor',

  // Variant comparison labels
  'storybook.patterns.variantTabs': 'Faner-variant',
  'storybook.patterns.variantButtons': 'Knapper-variant',
  'storybook.patterns.variantCards': 'Kort-variant',
  'storybook.patterns.variantChip': 'MetadataRow (Chip-stil)',
  'storybook.patterns.variantInline': 'MetadataRowInline (Tekst-stil)',

  // Layout comparison labels
  'storybook.patterns.layoutWrap': 'Flyt (Standard)',
  'storybook.patterns.layoutHorizontal': 'Horisontal',
  'storybook.patterns.layoutVertical': 'Vertikal',

  // Interactive examples
  'storybook.patterns.yourSelections': 'Dine valg',
  'storybook.patterns.grandTotal': 'Totalt',
  'storybook.patterns.thankYou': 'Takk for din tilbakemelding!',
  'storybook.patterns.rating': 'Vurdering',
  'storybook.patterns.writeAnother': 'Skriv en ny anmeldelse',
  'storybook.patterns.noItemsYet': 'Ingen elementer enna',
  'storybook.patterns.getStarted': 'Kom i gang ved a opprette ditt forste element.',
  'storybook.patterns.createItem': 'Opprett element',

  // Layout stories
  'storybook.layout.contentInsideContainer': 'Innhold i en Container',
  'storybook.layout.fullWidthFluidContainer': 'Full bredde flytende container',
  'storybook.layout.column': 'Kolonne',
  'storybook.layout.sidebar': 'Sidefelt',
  'storybook.layout.mainContent': 'Hovedinnhold',
  'storybook.layout.card': 'Kort',
  'storybook.layout.item': 'Element',
  'storybook.layout.left': 'Venstre',
  'storybook.layout.center': 'Senter',
  'storybook.layout.right': 'Hoyre',
  'storybook.layout.header': 'Topptekst',
  'storybook.layout.footer': 'Bunntekst',
  'storybook.layout.navItem': 'Nav-element',
  'storybook.layout.mainContentArea': 'Hovedinnholdsomrade',
  'storybook.layout.centeredContent': 'Sentrert innhold',
  'storybook.layout.centeredBothDescription':
    'Dette innholdet er sentrert bade horisontalt og vertikalt',
  'storybook.layout.centeredHorizontalOnly': 'Sentrert kun horisontalt',
  'storybook.layout.appName': 'App-navn',
  'storybook.layout.subtitleText': 'Undertittel',
  'storybook.layout.controlsSection': 'Kontroll-seksjon',
  'storybook.layout.overview': 'Oversikt',
  'storybook.layout.configuration': 'Konfigurasjon',
  'storybook.layout.users': 'Brukere',
  'storybook.layout.userManagement': 'Brukeradministrasjon',
  'storybook.layout.playground': 'Lekeplass',
  'storybook.layout.componentExplorer': 'Komponentutforsker',
  'storybook.layout.newComponent': 'Ny komponent',
  'storybook.layout.buttonComponent': 'Knapp',
  'storybook.layout.cardComponent': 'Kort',
  'storybook.layout.modalComponent': 'Modal',
  'storybook.layout.interactiveElement': 'Interaktivt element',
  'storybook.layout.contentContainer': 'Innholdsbeholder',
  'storybook.layout.dialogOverlay': 'Dialogoverlegg',
  'storybook.layout.interactiveButtonDescription':
    'Interaktiv knappekomponent for brukerhandlinger.',
  'storybook.layout.exampleButton': 'Eksempelknapp',
  'storybook.layout.largePadding': 'Stor padding',
  'storybook.layout.largePaddingDescription': 'Dette innholdet har stor padding rundt seg.',
  'storybook.layout.smallPadding': 'Liten padding',
  'storybook.layout.smallPaddingDescription': 'Dette innholdet har liten padding rundt seg.',

  // Shell stories
  'storybook.shell.myApplication': 'Min applikasjon',
  'storybook.shell.copyright': '© 2026 Min applikasjon. Alle rettigheter reservert.',
  'storybook.shell.welcomeToDashboard': 'Velkommen til dashbordet',
  'storybook.shell.mainContentDescription': 'Dette er hovedinnholdsomradet til applikasjonen din.',
  'storybook.shell.someContentHere': 'Noe innhold her',
  'storybook.shell.minimalContentDescription':
    'Dette er minimalt innhold. Bunnteksten blir ved bunnen.',
  'storybook.shell.myApp': 'Min App',
  'storybook.shell.enterCredentials': 'Skriv inn legitimasjonen din for a fortsette',

  // Sidebar stories
  'storybook.sidebar.overview': 'Oversikt',
  'storybook.sidebar.home': 'Hjem',
  'storybook.sidebar.yourStartPage': 'Din startside',
  'storybook.sidebar.myBookings': 'Mine bestillinger',
  'storybook.sidebar.viewAndManageBookings': 'Se og administrer bestillinger',
  'storybook.sidebar.messages': 'Meldinger',
  'storybook.sidebar.conversationsAndAlerts': 'Samtaler og varsler',
  'storybook.sidebar.administration': 'Administrasjon',
  'storybook.sidebar.reports': 'Rapporter',
  'storybook.sidebar.statisticsAndAnalytics': 'Statistikk og analyser',
  'storybook.sidebar.organizations': 'Organisasjoner',
  'storybook.sidebar.manageOrganizations': 'Administrer organisasjoner',
  'storybook.sidebar.profile': 'Profil',
  'storybook.sidebar.yourProfileAndAccount': 'Din profil og konto',
  'storybook.sidebar.notifications': 'Varsler',
  'storybook.sidebar.notificationSettings': 'Varslingsinnstillinger',
  'storybook.sidebar.systemSettings': 'Systeminnstillinger',
  'storybook.sidebar.sampleUserName': 'Ola Nordmann',
  'storybook.sidebar.myPage': 'Min Side',
  'storybook.sidebar.admin': 'Admin',
  'storybook.sidebar.app': 'App',
  'storybook.sidebar.calendar': 'Kalender',
  'storybook.sidebar.bookings': 'Bestillinger',
  'storybook.sidebar.preferences': 'Preferanser',
  'storybook.sidebar.notificationsDemo': 'Varsler Demo',
  'storybook.sidebar.navigation': 'Navigasjon',
  'storybook.sidebar.inbox': 'Innboks',
  'storybook.sidebar.newMessages': 'Nye meldinger',
  'storybook.sidebar.tasks': 'Oppgaver',
  'storybook.sidebar.pendingTasks': 'Ventende oppgaver',
  'storybook.sidebar.alerts': 'Varsler',
  'storybook.sidebar.systemAlerts': 'Systemvarsler',
  'storybook.sidebar.backoffice': 'Backoffice',
  'storybook.sidebar.administrator': 'Administrator',
  'storybook.sidebar.mainOverview': 'Hovedoversikt',
  'storybook.sidebar.statistics': 'Statistikk',
  'storybook.sidebar.allBookings': 'Alle bestillinger',
  'storybook.sidebar.viewAllBookings': 'Se alle bestillinger',
  'storybook.sidebar.pending': 'Ventende',
  'storybook.sidebar.approvalRequired': 'Godkjenning pakrevd',
  'storybook.sidebar.users': 'Brukere',
  'storybook.sidebar.userAdministration': 'Brukeradministrasjon',
  'storybook.sidebar.manageUsers': 'Administrer brukere',
  'storybook.sidebar.manageOrg': 'Administrer org',
  'storybook.sidebar.adminUser': 'Admin-bruker',

  // Login page stories
  'storybook.login.simpleBooking': 'ENKEL BOOKING',
  'storybook.login.chooseLoginMethod': 'Velg hvordan du vil logge inn',
  'storybook.login.bankIdDescription': 'Logg inn med BankID pa mobil eller kodebrikke',
  'storybook.login.vippsDescription': 'Logg inn med Vipps-appen',
  'storybook.login.idPortenDescription': 'Logg inn via ID-porten',
  'storybook.login.privacy': 'Personvern',
  'storybook.login.terms': 'Vilkar',
  'storybook.login.help': 'Hjelp',
  'storybook.login.backoffice': 'Backoffice',
  'storybook.login.manageBookingsAndRentals': 'Administrer bestillinger og utleieobjekter',
  'storybook.login.featureBookingAdmin': 'Bestillingsadministrasjon',
  'storybook.login.featureBookingAdminDesc': 'Oversikt over alle bestillinger med kalendervisning',
  'storybook.login.featureRentalObjects': 'Utleieobjekter',
  'storybook.login.featureRentalObjectsDesc': 'Administrer lokaler, utstyr og tjenester',
  'storybook.login.featureReports': 'Rapporter',
  'storybook.login.featureReportsDesc': 'Detaljerte rapporter og statistikk',
  'storybook.login.featureUserManagement': 'Brukerhandtering',
  'storybook.login.featureUserManagementDesc': 'Administrer brukere og tilganger',
  'storybook.login.integrations': 'Integrasjoner',
  'storybook.login.demoLoginCompleted': 'Demo-innlogging fullfort som',
  'storybook.login.showDialogAgain': 'Vis dialog igjen',
  'storybook.login.demoLogin': 'Demo-innlogging',
  'storybook.login.demoLoginDescription': 'Logg inn med en testbruker for a prove systemet',
  'storybook.login.namePlaceholder': 'Ola Nordmann',
  'storybook.login.emailPlaceholder': 'ola@example.com',
  'storybook.login.demoToken': 'Demo-token',
  'storybook.login.demoTokenPlaceholder': 'demo-token-123',
  'storybook.login.demoTokenHint': 'Bruk "demo" for standard tilgang',
  'storybook.login.loggingIn': 'Logger inn...',
  'storybook.login.mobileOrCodeDevice': 'Mobil eller kodebrikke',
  'storybook.login.loginWithVipps': 'Logg inn med Vipps',
  'storybook.login.loginFailed': 'Innlogging feilet',
  'storybook.login.sessionExpired': 'BankID-sesjonen utlop. Vennligst prov igjen.',
  'storybook.login.tryAgainWithBankId': 'Prov igjen med BankID',
  'storybook.login.loginToBook': 'Logg inn for a booke',
  'storybook.login.loginWithBankId': 'Logg inn med BankID',
  'storybook.login.termsAgreement':
    'Ved a logge inn godtar du vare vilkar og personvernerklaering.',

  // Example stories
  'storybook.examples.primaryAction': 'Primar handling',
  'storybook.examples.secondaryAction': 'Sekundar handling',
  'storybook.examples.tertiaryAction': 'Tertiaer handling',
  'storybook.examples.submitForm': 'Send skjema',
  'storybook.examples.nameRequired': 'Navn er pakrevd',
  'storybook.examples.emailRequired': 'E-post er pakrevd',
  'storybook.examples.termsRequired': 'Du ma godta vilkarene',
  'storybook.examples.formSubmitted': 'Skjema sendt!',
  'storybook.examples.signUp': 'Registrer deg',
  'storybook.examples.acceptTerms': 'Jeg godtar vilkarene',
  'storybook.examples.createAccount': 'Opprett konto',
  'storybook.examples.cardTitle': 'Korttittel',
  'storybook.examples.cardDescription': 'Dette er en beskrivelse av kortinnholdet.',
  'storybook.examples.action': 'Handling',
  'storybook.examples.projects': 'Prosjekter',
  'storybook.examples.team': 'Team',
  'storybook.examples.navigation': 'Navigasjon',
  'storybook.examples.failedToLoadData': 'Kunne ikke laste data. Vennligst prov igjen.',
  'storybook.examples.retry': 'Prov igjen',

  // Notification stories
  'storybook.notifications.error': 'Feil',
  'storybook.notifications.success': 'Suksess!',
  'storybook.notifications.changesSaved': 'Endringene dine har blitt lagret.',

  // Loading stories
  'storybook.loading.loading': 'Laster...',
};

export const storybookEn: Record<string, string> = {
  // Overview section
  'storybook.overview.welcome': 'Welcome to Xala Platform',
  'storybook.overview.subtitle':
    'A comprehensive design system for building accessible, consistent applications',
  'storybook.overview.accessibilityFirst': 'Accessibility First',
  'storybook.overview.accessibilityFirstDesc':
    'WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and proper ARIA attributes.',
  'storybook.overview.designTokens': 'Design Tokens',
  'storybook.overview.designTokensDesc':
    'Consistent styling with design tokens for colors, spacing, typography, and more. Never hardcode values again.',
  'storybook.overview.components': '50+ Components',
  'storybook.overview.componentsDesc':
    'Production-ready components from buttons to data tables, all built with best practices and accessibility in mind.',
  'storybook.overview.i18n': 'Internationalization',
  'storybook.overview.i18nDesc':
    'Full i18n support with translations for Norwegian, English, and Arabic. RTL support included.',
  'storybook.overview.multiTenancy': 'Multi-tenancy',
  'storybook.overview.multiTenancyDesc':
    'Built for SaaS platforms with tenant isolation, RBAC, and feature flags out of the box.',
  'storybook.overview.themeSupport': 'Theme Support',
  'storybook.overview.themeSupportDesc':
    'Customizable themes with light/dark mode support. Create your own visual identity while maintaining consistency.',

  // Getting started
  'storybook.gettingStarted.title': 'Getting Started',
  'storybook.gettingStarted.installation': 'Installation',
  'storybook.gettingStarted.setup': 'Setup',
  'storybook.gettingStarted.firstComponent': 'Your first component',

  // Architecture
  'storybook.architecture.title': 'Architecture Principles',
  'storybook.architecture.designTokensFirst': 'Design Tokens First',
  'storybook.architecture.designTokensFirstDesc':
    'All styling uses design tokens. No hardcoded colors, spacing, or typography values.',
  'storybook.architecture.componentComposition': 'Component Composition',
  'storybook.architecture.componentCompositionDesc':
    'Build complex UIs by composing simple, reusable components from the platform.',
  'storybook.architecture.sdkFirst': 'SDK-First',
  'storybook.architecture.sdkFirstDesc':
    'All API calls go through the SDK. Never use fetch() or axios directly.',
  'storybook.architecture.pureI18n': 'Pure i18n',
  'storybook.architecture.pureI18nDesc':
    'All user-facing text must be translatable. No hardcoded strings.',
  'storybook.architecture.accessibilityRequired': 'Accessibility Required',
  'storybook.architecture.accessibilityRequiredDesc':
    'Every component must be keyboard accessible with proper ARIA attributes.',

  // Component categories
  'storybook.categories.primitives': 'Primitives',
  'storybook.categories.blocks': 'Blocks',
  'storybook.categories.composed': 'Composed',
  'storybook.categories.patterns': 'Patterns',
  'storybook.categories.shells': 'Shells',
  'storybook.categories.pages': 'Pages',

  // Common story labels
  'storybook.story.default': 'Default',
  'storybook.story.variants': 'Variants',
  'storybook.story.sizes': 'Sizes',
  'storybook.story.states': 'States',
  'storybook.story.interactive': 'Interactive',
  'storybook.story.withIcons': 'With Icons',
  'storybook.story.disabled': 'Disabled',
  'storybook.story.loading': 'Loading',
  'storybook.story.error': 'Error',
  'storybook.story.success': 'Success',
  'storybook.story.warning': 'Warning',
  'storybook.story.info': 'Info',
  'storybook.story.example': 'Example',
  'storybook.story.usage': 'Usage',
  'storybook.story.playground': 'Playground',
  'storybook.story.tryItLive': 'Try It Live',
  'storybook.story.theCode': 'The Code',
  'storybook.story.componentShowcase': 'Component Showcase',
  'storybook.story.resources': 'Resources & Documentation',

  // Form labels
  'storybook.form.yourName': 'Your Name',
  'storybook.form.enterName': 'Enter your name',
  'storybook.form.agreeTerms': 'I agree to use design tokens',
  'storybook.form.getStarted': 'Get Started',
  'storybook.form.welcomeMessage': "Welcome, {{name}}! You're ready to build with Xala Platform.",
  'storybook.form.submit': 'Submit',
  'storybook.form.reset': 'Reset',

  // Demo content
  'storybook.demo.cardTitle': 'Card Title',
  'storybook.demo.cardDescription': 'Cards are versatile containers for grouping related content.',
  'storybook.demo.sampleText': 'This is sample text for demonstration.',
  'storybook.demo.clickMe': 'Click me',
  'storybook.demo.learnMore': 'Learn more',
  'storybook.demo.viewDetails': 'View details',
  'storybook.demo.primary': 'Primary',
  'storybook.demo.secondary': 'Secondary',
  'storybook.demo.tertiary': 'Tertiary',
  'storybook.demo.danger': 'Danger',

  // Headings
  'storybook.heading.xl': 'Heading XL',
  'storybook.heading.lg': 'Heading LG',
  'storybook.heading.md': 'Heading MD',
  'storybook.heading.sm': 'Heading SM',
  'storybook.heading.xs': 'Heading XS',

  // Resources
  'storybook.resources.gettingStarted': 'Getting Started',
  'storybook.resources.gettingStartedDesc': 'Installation, setup, and your first component',
  'storybook.resources.fundamentals': 'Fundamentals',
  'storybook.resources.fundamentalsDesc':
    'Design tokens, accessibility, best practices, and patterns',
  'storybook.resources.components': 'Components',
  'storybook.resources.componentsDesc': 'Browse all 50+ components with live examples',
  'storybook.resources.examples': 'Examples',
  'storybook.resources.examplesDesc': '1000+ code examples and training materials',
  'storybook.resources.designsystemet': 'Designsystemet',
  'storybook.resources.designsystemetDesc': 'Official Norwegian Design System documentation',
  'storybook.resources.view': 'View',
  'storybook.resources.visit': 'Visit',

  // Accessibility
  'storybook.a11y.title': 'Accessibility',
  'storybook.a11y.keyboardNavigation': 'Keyboard Navigation',
  'storybook.a11y.screenReader': 'Screen Reader Support',
  'storybook.a11y.colorContrast': 'Color Contrast',
  'storybook.a11y.focusManagement': 'Focus Management',

  // Best practices
  'storybook.bestPractices.title': 'Best Practices',
  'storybook.bestPractices.do': 'Do',
  'storybook.bestPractices.dont': "Don't",

  // Contributing
  'storybook.contributing.title': 'Contributing',
  'storybook.contributing.howToContribute': 'How to Contribute',
  'storybook.contributing.guidelines': 'Guidelines',

  // Key features
  'storybook.features.keyFeatures': 'Key Features',
  'storybook.features.builtWith': 'Built With',

  // Pattern stories - Interactive examples
  'storybook.patterns.selected': 'Selected',
  'storybook.patterns.selectedMode': 'Selected mode',
  'storybook.patterns.currentStep': 'Current step',
  'storybook.patterns.selectItems': 'Select items below to see the action bar appear',
  'storybook.patterns.justNow': 'Just now',
  'storybook.patterns.minutesAgo': '{minutes}m ago',
  'storybook.patterns.hoursAgo': '{hours}h ago',

  // Size comparison labels
  'storybook.patterns.sizeSmall': 'Small',
  'storybook.patterns.sizeMedium': 'Medium',
  'storybook.patterns.sizeLarge': 'Large',

  // Variant comparison labels
  'storybook.patterns.variantTabs': 'Tabs Variant',
  'storybook.patterns.variantButtons': 'Buttons Variant',
  'storybook.patterns.variantCards': 'Cards Variant',
  'storybook.patterns.variantChip': 'MetadataRow (Chip Style)',
  'storybook.patterns.variantInline': 'MetadataRowInline (Text Style)',

  // Layout comparison labels
  'storybook.patterns.layoutWrap': 'Wrap (Default)',
  'storybook.patterns.layoutHorizontal': 'Horizontal',
  'storybook.patterns.layoutVertical': 'Vertical',

  // Interactive examples
  'storybook.patterns.yourSelections': 'Your selections',
  'storybook.patterns.grandTotal': 'Grand Total',
  'storybook.patterns.thankYou': 'Thank you for your feedback!',
  'storybook.patterns.rating': 'Rating',
  'storybook.patterns.writeAnother': 'Write another review',
  'storybook.patterns.noItemsYet': 'No items yet',
  'storybook.patterns.getStarted': 'Get started by creating your first item.',
  'storybook.patterns.createItem': 'Create Item',

  // Layout stories
  'storybook.layout.contentInsideContainer': 'Content inside a Container',
  'storybook.layout.fullWidthFluidContainer': 'Full-width fluid container',
  'storybook.layout.column': 'Column',
  'storybook.layout.sidebar': 'Sidebar',
  'storybook.layout.mainContent': 'Main Content',
  'storybook.layout.card': 'Card',
  'storybook.layout.item': 'Item',
  'storybook.layout.left': 'Left',
  'storybook.layout.center': 'Center',
  'storybook.layout.right': 'Right',
  'storybook.layout.header': 'Header',
  'storybook.layout.footer': 'Footer',
  'storybook.layout.navItem': 'Nav Item',
  'storybook.layout.mainContentArea': 'Main Content Area',
  'storybook.layout.centeredContent': 'Centered Content',
  'storybook.layout.centeredBothDescription':
    'This content is centered both horizontally and vertically',
  'storybook.layout.centeredHorizontalOnly': 'Centered horizontally only',
  'storybook.layout.appName': 'App Name',
  'storybook.layout.subtitleText': 'Subtitle text',
  'storybook.layout.controlsSection': 'Controls section',
  'storybook.layout.overview': 'Overview',
  'storybook.layout.configuration': 'Configuration',
  'storybook.layout.users': 'Users',
  'storybook.layout.userManagement': 'User management',
  'storybook.layout.playground': 'Playground',
  'storybook.layout.componentExplorer': 'Component Explorer',
  'storybook.layout.newComponent': 'New Component',
  'storybook.layout.buttonComponent': 'Button',
  'storybook.layout.cardComponent': 'Card',
  'storybook.layout.modalComponent': 'Modal',
  'storybook.layout.interactiveElement': 'Interactive element',
  'storybook.layout.contentContainer': 'Content container',
  'storybook.layout.dialogOverlay': 'Dialog overlay',
  'storybook.layout.interactiveButtonDescription': 'Interactive button component for user actions.',
  'storybook.layout.exampleButton': 'Example Button',
  'storybook.layout.largePadding': 'Large Padding',
  'storybook.layout.largePaddingDescription': 'This content has large padding around it.',
  'storybook.layout.smallPadding': 'Small Padding',
  'storybook.layout.smallPaddingDescription': 'This content has small padding around it.',

  // Shell stories
  'storybook.shell.myApplication': 'My Application',
  'storybook.shell.copyright': '© 2026 My Application. All rights reserved.',
  'storybook.shell.welcomeToDashboard': 'Welcome to the Dashboard',
  'storybook.shell.mainContentDescription': 'This is the main content area of your application.',
  'storybook.shell.someContentHere': 'Some content here',
  'storybook.shell.minimalContentDescription':
    'This is minimal content. The footer stays at the bottom.',
  'storybook.shell.myApp': 'My App',
  'storybook.shell.enterCredentials': 'Enter your credentials to continue',

  // Sidebar stories
  'storybook.sidebar.overview': 'Overview',
  'storybook.sidebar.home': 'Home',
  'storybook.sidebar.yourStartPage': 'Your start page',
  'storybook.sidebar.myBookings': 'My Bookings',
  'storybook.sidebar.viewAndManageBookings': 'View and manage bookings',
  'storybook.sidebar.messages': 'Messages',
  'storybook.sidebar.conversationsAndAlerts': 'Conversations and alerts',
  'storybook.sidebar.administration': 'Administration',
  'storybook.sidebar.reports': 'Reports',
  'storybook.sidebar.statisticsAndAnalytics': 'Statistics and analytics',
  'storybook.sidebar.organizations': 'Organizations',
  'storybook.sidebar.manageOrganizations': 'Manage organizations',
  'storybook.sidebar.profile': 'Profile',
  'storybook.sidebar.yourProfileAndAccount': 'Your profile and account',
  'storybook.sidebar.notifications': 'Notifications',
  'storybook.sidebar.notificationSettings': 'Notification settings',
  'storybook.sidebar.systemSettings': 'System settings',
  'storybook.sidebar.sampleUserName': 'John Doe',
  'storybook.sidebar.myPage': 'My Page',
  'storybook.sidebar.admin': 'Admin',
  'storybook.sidebar.app': 'App',
  'storybook.sidebar.calendar': 'Calendar',
  'storybook.sidebar.bookings': 'Bookings',
  'storybook.sidebar.preferences': 'Preferences',
  'storybook.sidebar.notificationsDemo': 'Notifications Demo',
  'storybook.sidebar.navigation': 'Navigation',
  'storybook.sidebar.inbox': 'Inbox',
  'storybook.sidebar.newMessages': 'New messages',
  'storybook.sidebar.tasks': 'Tasks',
  'storybook.sidebar.pendingTasks': 'Pending tasks',
  'storybook.sidebar.alerts': 'Alerts',
  'storybook.sidebar.systemAlerts': 'System alerts',
  'storybook.sidebar.backoffice': 'Backoffice',
  'storybook.sidebar.administrator': 'Administrator',
  'storybook.sidebar.mainOverview': 'Main overview',
  'storybook.sidebar.statistics': 'Statistics',
  'storybook.sidebar.allBookings': 'All Bookings',
  'storybook.sidebar.viewAllBookings': 'View all bookings',
  'storybook.sidebar.pending': 'Pending',
  'storybook.sidebar.approvalRequired': 'Approval required',
  'storybook.sidebar.users': 'Users',
  'storybook.sidebar.userAdministration': 'User Administration',
  'storybook.sidebar.manageUsers': 'Manage users',
  'storybook.sidebar.manageOrg': 'Manage org',
  'storybook.sidebar.adminUser': 'Admin User',

  // Login page stories
  'storybook.login.simpleBooking': 'SIMPLE BOOKING',
  'storybook.login.chooseLoginMethod': 'Choose how you want to log in',
  'storybook.login.bankIdDescription': 'Log in with BankID on mobile or code device',
  'storybook.login.vippsDescription': 'Log in with the Vipps app',
  'storybook.login.idPortenDescription': 'Log in via ID-porten',
  'storybook.login.privacy': 'Privacy',
  'storybook.login.terms': 'Terms',
  'storybook.login.help': 'Help',
  'storybook.login.backoffice': 'Backoffice',
  'storybook.login.manageBookingsAndRentals': 'Manage bookings and rental objects',
  'storybook.login.featureBookingAdmin': 'Booking Administration',
  'storybook.login.featureBookingAdminDesc': 'Overview of all bookings with calendar view',
  'storybook.login.featureRentalObjects': 'Rental Objects',
  'storybook.login.featureRentalObjectsDesc': 'Manage locations, equipment, and services',
  'storybook.login.featureReports': 'Reports',
  'storybook.login.featureReportsDesc': 'Detailed reports and statistics',
  'storybook.login.featureUserManagement': 'User Management',
  'storybook.login.featureUserManagementDesc': 'Manage users and permissions',
  'storybook.login.integrations': 'Integrations',
  'storybook.login.demoLoginCompleted': 'Demo login completed as',
  'storybook.login.showDialogAgain': 'Show dialog again',
  'storybook.login.demoLogin': 'Demo Login',
  'storybook.login.demoLoginDescription': 'Log in with a test user to try the system',
  'storybook.login.namePlaceholder': 'John Doe',
  'storybook.login.emailPlaceholder': 'john@example.com',
  'storybook.login.demoToken': 'Demo Token',
  'storybook.login.demoTokenPlaceholder': 'demo-token-123',
  'storybook.login.demoTokenHint': 'Use "demo" for standard access',
  'storybook.login.loggingIn': 'Logging in...',
  'storybook.login.mobileOrCodeDevice': 'Mobile or code device',
  'storybook.login.loginWithVipps': 'Log in with Vipps',
  'storybook.login.loginFailed': 'Login Failed',
  'storybook.login.sessionExpired': 'BankID session expired. Please try again.',
  'storybook.login.tryAgainWithBankId': 'Try again with BankID',
  'storybook.login.loginToBook': 'Log in to book',
  'storybook.login.loginWithBankId': 'Log in with BankID',
  'storybook.login.termsAgreement': 'By logging in you accept our terms and privacy policy.',

  // Example stories
  'storybook.examples.primaryAction': 'Primary Action',
  'storybook.examples.secondaryAction': 'Secondary Action',
  'storybook.examples.tertiaryAction': 'Tertiary Action',
  'storybook.examples.submitForm': 'Submit Form',
  'storybook.examples.nameRequired': 'Name is required',
  'storybook.examples.emailRequired': 'Email is required',
  'storybook.examples.termsRequired': 'You must accept the terms',
  'storybook.examples.formSubmitted': 'Form submitted!',
  'storybook.examples.signUp': 'Sign Up',
  'storybook.examples.acceptTerms': 'I accept the terms',
  'storybook.examples.createAccount': 'Create Account',
  'storybook.examples.cardTitle': 'Card Title',
  'storybook.examples.cardDescription': 'This is a description of the card content.',
  'storybook.examples.action': 'Action',
  'storybook.examples.projects': 'Projects',
  'storybook.examples.team': 'Team',
  'storybook.examples.navigation': 'Navigation',
  'storybook.examples.failedToLoadData': 'Failed to load data. Please try again.',
  'storybook.examples.retry': 'Retry',

  // Notification stories
  'storybook.notifications.error': 'Error',
  'storybook.notifications.success': 'Success!',
  'storybook.notifications.changesSaved': 'Your changes have been saved.',

  // Loading stories
  'storybook.loading.loading': 'Loading...',
};

/**
 * Merged translations for Storybook use.
 * Combines platform translations with Storybook-specific translations.
 */
export const storybookTranslations = {
  nb: storybookNb,
  en: storybookEn,
};
