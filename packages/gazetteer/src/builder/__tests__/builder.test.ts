/**
 * Builder Module Tests
 */
import { describe, it, expect } from 'vitest'
import {
    WidgetBuilder,
    PageBuilder,
    RouteBuilder,
    widget,
    page,
    route,
    BUILDER_VERSION,
} from '../index'

describe('WidgetBuilder', () => {
    it('should create a basic widget', () => {
        const spec = widget('btn-1', 'Button').build()

        expect(spec.widgetId).toBe('btn-1')
        expect(spec.type).toBe('Button')
        expect(spec.props).toEqual({})
    })

    it('should set props', () => {
        const spec = widget('btn-1', 'Button')
            .props({ label: 'Click me', variant: 'primary' })
            .build()

        expect(spec.props).toEqual({ label: 'Click me', variant: 'primary' })
    })

    it('should set individual prop', () => {
        const spec = widget('btn-1', 'Button')
            .prop('label', 'Hello')
            .prop('disabled', true)
            .build()

        expect(spec.props).toEqual({ label: 'Hello', disabled: true })
    })

    it('should set bindings', () => {
        const spec = widget('text-1', 'Text')
            .bindings({ content: 'vm.message', visible: 'vm.showMessage' })
            .build()

        expect(spec.bindings).toEqual({
            content: 'vm.message',
            visible: 'vm.showMessage',
        })
    })

    it('should set individual binding', () => {
        const spec = widget('text-1', 'Text')
            .binding('content', 'vm.text')
            .build()

        expect(spec.bindings).toEqual({ content: 'vm.text' })
    })

    it('should set visibility with showWhen', () => {
        const spec = widget('btn-1', 'Button')
            .showWhen('vm.isEditing')
            .build()

        expect(spec.visibility).toEqual({
            when: 'vm.isEditing',
        })
    })

    it('should set visibility with requirePermissions', () => {
        const spec = widget('btn-1', 'Button')
            .requirePermissions('admin', 'editor')
            .build()

        expect(spec.visibility?.permissionKeys).toEqual(['admin', 'editor'])
    })

    it('should set events', () => {
        const spec = widget('btn-1', 'Button')
            .events({
                onClick: 'handleClick',
                onHover: 'handleHover',
            })
            .build()

        expect(spec.events).toEqual({
            onClick: 'handleClick',
            onHover: 'handleHover',
        })
    })

    it('should throw if widgetId is missing', () => {
        const builder = new WidgetBuilder('', 'Button')
        
        expect(() => builder.build()).toThrow('Widget requires widgetId and type')
    })
})

describe('PageBuilder', () => {
    it('should create a basic page', () => {
        const spec = page('home').build()

        expect(spec.pageId).toBe('home')
        expect(spec.shellType).toBe('DataPageShell')
        expect(spec.layoutType).toBe('list')
        expect(spec.widgets.content).toEqual([])
    })

    it('should set shell type', () => {
        const spec = page('home').shell('DashboardShell').build()

        expect(spec.shellType).toBe('DashboardShell')
    })

    it('should set layout type', () => {
        const spec = page('home').layout('dashboard').build()

        expect(spec.layoutType).toBe('dashboard')
    })

    it('should add header widgets', () => {
        const w = widget('header-1', 'DashboardHeader').build()
        const spec = page('home').header(w).build()

        expect(spec.widgets.header).toHaveLength(1)
        expect(spec.widgets.header![0].widgetId).toBe('header-1')
    })

    it('should add content widgets', () => {
        const w1 = widget('card-1', 'StatsGrid').build()
        const w2 = widget('card-2', 'StatsGrid').build()
        const spec = page('home').content(w1, w2).build()

        expect(spec.widgets.content).toHaveLength(2)
    })

    it('should add sidebar widgets', () => {
        const w = widget('nav-1', 'FilterBar').build()
        const spec = page('home').sidebar(w).build()

        expect(spec.widgets.sidebar).toHaveLength(1)
    })

    it('should add overlay widgets', () => {
        const w = widget('modal-1', 'ModalConfirm').build()
        const spec = page('home').overlays(w).build()

        expect(spec.widgets.overlays).toHaveLength(1)
    })

    it('should add i18n keys', () => {
        const spec = page('home')
            .i18n('pages.home.title', 'pages.home.subtitle')
            .build()

        expect(spec.i18nRequiredKeys).toEqual(['pages.home.title', 'pages.home.subtitle'])
    })

    it('should set controller refs', () => {
        const spec = page('home')
            .controllers('HomeController', 'UserController')
            .build()

        expect(spec.controllerRefs).toEqual(['HomeController', 'UserController'])
    })

    it('should throw if pageId is missing', () => {
        const builder = new PageBuilder('')
        
        expect(() => builder.build()).toThrow('Page requires pageId')
    })
})

describe('RouteBuilder', () => {
    it('should create a basic route', () => {
        const spec = route('home', '/').build()

        expect(spec.routeId).toBe('home')
        expect(spec.path).toBe('/')
        expect(spec.pageRef).toBe('home')
        expect(spec.navigation.labelKey).toBe('routes.home.label')
        expect(spec.navigation.group).toBe('main')
    })

    it('should set page reference', () => {
        const spec = route('home', '/').page('home-page').build()

        expect(spec.pageRef).toBe('home-page')
    })

    it('should set label key', () => {
        const spec = route('home', '/').label('nav.home').build()

        expect(spec.navigation.labelKey).toBe('nav.home')
    })

    it('should set icon', () => {
        const spec = route('home', '/').icon('home').build()

        expect(spec.navigation.icon).toBe('home')
    })

    it('should set access control with roles', () => {
        const spec = route('admin', '/admin')
            .roles('admin', 'superuser')
            .build()

        expect(spec.access?.roles).toEqual(['admin', 'superuser'])
    })

    it('should set group', () => {
        const spec = route('settings', '/settings')
            .group('settings', 5)
            .build()

        expect(spec.navigation.group).toBe('settings')
        expect(spec.navigation.order).toBe(5)
    })

    it('should throw if routeId is missing', () => {
        const builder = new RouteBuilder('', '/test')
        
        expect(() => builder.build()).toThrow('Route requires routeId and path')
    })
})

describe('BUILDER_VERSION', () => {
    it('should be defined', () => {
        expect(BUILDER_VERSION).toBe('1.0.0')
    })
})
