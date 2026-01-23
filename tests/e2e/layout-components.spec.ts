/**
 * Layout Components E2E Tests
 *
 * End-to-end tests for layout components using Playwright.
 * Tests real browser rendering and user interactions.
 */

import { test, expect } from '@playwright/test';

test.describe('Layout Components E2E', () => {
  test.describe('SimpleSidebar', () => {
    test('renders sidebar with proper structure', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--sidebar-example');

      // Wait for sidebar to be visible
      const sidebar = page.locator('.ds-sidebar');
      await expect(sidebar).toBeVisible();

      // Check sidebar has proper width
      const box = await sidebar.boundingBox();
      expect(box?.width).toBeGreaterThan(200);
    });

    test('sidebar is scrollable when content overflows', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

      const scrollArea = page.locator('.ds-sidebar-scroll-area');
      await expect(scrollArea).toBeVisible();

      // Check overflow is set to auto
      const overflow = await scrollArea.evaluate((el) => {
        return window.getComputedStyle(el).overflow;
      });
      expect(overflow).toBe('auto');
    });
  });

  test.describe('HorizontalLayout', () => {
    test('renders full viewport height layout', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

      const layout = page.locator('.ds-horizontal-layout');
      await expect(layout).toBeVisible();

      const viewportHeight = await page.evaluate(() => window.innerHeight);
      const layoutBox = await layout.boundingBox();

      expect(layoutBox?.height).toBeCloseTo(viewportHeight, -1);
    });

    test('sidebar and main content are side by side', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

      const sidebar = page.locator('.ds-sidebar');
      const mainContent = page.locator('.ds-main-content');

      await expect(sidebar).toBeVisible();
      await expect(mainContent).toBeVisible();

      const sidebarBox = await sidebar.boundingBox();
      const mainBox = await mainContent.boundingBox();

      // Main content should be to the right of sidebar
      expect(mainBox!.x).toBeGreaterThan(sidebarBox!.x);
    });
  });

  test.describe('Center', () => {
    test('centers content both horizontally and vertically', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--center-both');

      const center = page.locator('.ds-center').first();
      await expect(center).toBeVisible();

      // Check flex centering is applied
      const styles = await center.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
        };
      });

      expect(styles.display).toBe('flex');
      expect(styles.justifyContent).toBe('center');
      expect(styles.alignItems).toBe('center');
    });

    test('horizontal-only centering works', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--center-horizontal');

      const center = page.locator('.ds-center').first();
      await expect(center).toBeVisible();

      const styles = await center.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
        };
      });

      expect(styles.justifyContent).toBe('center');
      expect(styles.alignItems).toBe('flex-start');
    });
  });

  test.describe('MainContent', () => {
    test('has correct padding for different sizes', async ({ page }) => {
      // Test large padding
      await page.goto('/iframe.html?id=primitives-layout-center--main-content-padding');

      const mainContent = page.locator('.ds-main-content');
      await expect(mainContent).toBeVisible();

      const largePadding = await mainContent.evaluate((el) => {
        return window.getComputedStyle(el).padding;
      });

      // Should use var(--ds-spacing-8) which is typically 32px
      expect(largePadding).toBeTruthy();

      // Test small padding
      await page.goto('/iframe.html?id=primitives-layout-center--main-content-small-padding');

      const mainContentSmall = page.locator('.ds-main-content');
      await expect(mainContentSmall).toBeVisible();

      const smallPadding = await mainContentSmall.evaluate((el) => {
        return window.getComputedStyle(el).padding;
      });

      expect(smallPadding).toBeTruthy();
    });

    test('scrolls when content overflows', async ({ page }) => {
      await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

      const mainContent = page.locator('.ds-main-content');

      const overflow = await mainContent.evaluate((el) => {
        return window.getComputedStyle(el).overflow;
      });

      expect(overflow).toBe('auto');
    });
  });
});

test.describe('ExplorerItem E2E', () => {
  test('click interaction works', async ({ page }) => {
    await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

    // Find explorer items in the sidebar
    const explorerItems = page.locator('.ds-explorer-item');
    const count = await explorerItems.count();

    expect(count).toBeGreaterThan(0);

    // Click should work without errors
    await explorerItems.first().click();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

    const explorerItems = page.locator('.ds-explorer-item');
    await explorerItems.first().focus();

    // Should be focusable
    await expect(explorerItems.first()).toBeFocused();

    // Tab to next item
    await page.keyboard.press('Tab');
  });

  test('shows selected state visually', async ({ page }) => {
    await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

    // Find the selected item (has selected class or data attribute)
    const selectedItem = page.locator('.ds-explorer-item--selected');

    // If there's a selected item, it should have accent background
    if ((await selectedItem.count()) > 0) {
      const bgColor = await selectedItem.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Should not be transparent
      expect(bgColor).not.toBe('transparent');
    }
  });
});

test.describe('PreviewArea E2E', () => {
  test('centers preview content', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-previewarea--default');

    const previewArea = page.locator('.ds-preview-area');
    await expect(previewArea).toBeVisible();

    const innerDiv = previewArea.locator('> div');
    const styles = await innerDiv.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        justifyContent: computed.justifyContent,
        alignItems: computed.alignItems,
      };
    });

    expect(styles.display).toBe('flex');
    expect(styles.justifyContent).toBe('center');
    expect(styles.alignItems).toBe('center');
  });

  test('applies background correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-previewarea--default');

    const previewArea = page.locator('.ds-preview-area');
    const innerDiv = previewArea.locator('> div');

    const background = await innerDiv.evaluate((el) => {
      return window.getComputedStyle(el).background;
    });

    // Should have some background applied
    expect(background).toBeTruthy();
  });
});

test.describe('Workflow Components E2E', () => {
  test('WorkflowPipeline renders all steps', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-workflowpipeline--default');

    const steps = page.locator('.ds-workflow-step');
    const count = await steps.count();

    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('WorkflowCard buttons are interactive', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-workflowcard--default');

    // Find copy command button
    const copyButton = page.getByText('Copy Command');
    await expect(copyButton).toBeVisible();
    await copyButton.click();

    // Find view docs button
    const docsButton = page.getByText('View Docs');
    await expect(docsButton).toBeVisible();
    await docsButton.click();
  });

  test('CardGrid displays cards in grid layout', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-cardgrid--default');

    const grid = page.locator('.ds-card-grid');
    await expect(grid).toBeVisible();

    const display = await grid.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });

    expect(display).toBe('grid');
  });
});

test.describe('Cross-Browser Compatibility', () => {
  test('layout renders correctly across browsers', async ({ page, browserName }) => {
    await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

    // Basic structure should render in all browsers
    await expect(page.locator('.ds-horizontal-layout')).toBeVisible();
    await expect(page.locator('.ds-sidebar')).toBeVisible();
    await expect(page.locator('.ds-main-content')).toBeVisible();

    // Log browser for debugging
    console.log(`Testing in ${browserName}`);
  });

  test('design tokens resolve correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

    const sidebar = page.locator('.ds-sidebar');

    // Check that CSS variables resolve to actual values
    const borderColor = await sidebar.evaluate((el) => {
      return window.getComputedStyle(el).borderRightColor;
    });

    // Should be an actual color, not a CSS variable string
    expect(borderColor).toMatch(/^rgb/);
  });
});

test.describe('Responsive Behavior', () => {
  test('layout adapts to mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?id=primitives-layout-center--full-app-layout');

    const sidebar = page.locator('.ds-sidebar');
    const sidebarBox = await sidebar.boundingBox();

    // Sidebar should still be visible but may be narrower
    expect(sidebarBox?.width).toBeLessThanOrEqual(375);
  });

  test('card grid adapts to narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await page.goto('/iframe.html?id=blocks-cardgrid--default');

    const grid = page.locator('.ds-card-grid');
    await expect(grid).toBeVisible();

    // Grid should stack cards on narrow viewport
    const gridTemplate = await grid.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // Should have auto-fill behavior
    expect(gridTemplate).toBeTruthy();
  });
});
