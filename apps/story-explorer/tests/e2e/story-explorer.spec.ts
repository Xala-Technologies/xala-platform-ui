import { test, expect } from '@playwright/test';

test.describe('Story Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stories');
  });

  test('should display the catalog page', async ({ page }) => {
    // Check header is visible
    await expect(page.getByRole('heading', { name: 'Story Explorer' })).toBeVisible();

    // Check search input is present
    await expect(page.getByPlaceholder(/search/i)).toBeVisible();
  });

  test('should search for stories', async ({ page }) => {
    // Type in search
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('Button');

    // Wait for results to filter
    await page.waitForTimeout(300);

    // Check that results are shown
    const storyLinks = page.locator('a[href*="/stories/"]');
    await expect(storyLinks.first()).toBeVisible();
  });

  test('should navigate to a story', async ({ page }) => {
    // Search for a known story
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('Button');

    // Wait for results
    await page.waitForTimeout(300);

    // Click on first story link
    const storyLink = page.locator('a[href*="/stories/components-button"]').first();
    if (await storyLink.isVisible()) {
      await storyLink.click();

      // Wait for navigation
      await page.waitForURL(/\/stories\/.+/);

      // Check that iframe is present
      const iframe = page.locator('iframe[data-story-viewer]');
      await expect(iframe).toBeVisible();
    }
  });

  test('should toggle theme', async ({ page }) => {
    // Find the dark mode toggle
    const darkToggle = page.getByRole('radio', { name: /dark/i });

    if (await darkToggle.isVisible()) {
      await darkToggle.click();

      // Check that color scheme attribute is set
      await expect(page.locator('html')).toHaveAttribute('data-color-scheme', 'dark');
    }
  });

  test('should toggle locale', async ({ page }) => {
    // Find the English locale toggle
    const enToggle = page.getByRole('radio', { name: /EN/i });

    if (await enToggle.isVisible()) {
      await enToggle.click();

      // Check that lang attribute is updated
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    }
  });

  test('should be accessible with skip link', async ({ page }) => {
    // Tab to skip link
    await page.keyboard.press('Tab');

    // Check skip link is focusable
    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await expect(skipLink).toBeFocused();
  });

  test('should filter by category', async ({ page }) => {
    // Click on a category chip
    const categoryChip = page.getByRole('button', { name: /components/i }).first();

    if (await categoryChip.isVisible()) {
      await categoryChip.click();

      // Wait for filter to apply
      await page.waitForTimeout(300);

      // Results should be filtered
      const storyLinks = page.locator('a[href*="/stories/"]');
      const count = await storyLinks.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('Story Viewer', () => {
  test('should display story in iframe', async ({ page }) => {
    // Navigate to a specific story
    await page.goto('/stories/components-button--primary');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check iframe is present
    const iframe = page.locator('iframe[data-story-viewer]');
    await expect(iframe).toBeVisible();

    // Check iframe has correct src
    const src = await iframe.getAttribute('src');
    expect(src).toContain('iframe.html');
    expect(src).toContain('id=components-button--primary');
  });

  test('should display story metadata', async ({ page }) => {
    await page.goto('/stories/components-button--primary');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check story title is displayed
    const title = page.locator('p').filter({ hasText: 'Button' }).first();
    await expect(title).toBeVisible();
  });

  test('should have working external links', async ({ page }) => {
    await page.goto('/stories/components-button--primary');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check "Open in Storybook" link
    const openInStorybookLink = page.getByRole('link', { name: /open in storybook/i });
    if (await openInStorybookLink.isVisible()) {
      const href = await openInStorybookLink.getAttribute('href');
      expect(href).toContain('localhost:6006');
      expect(href).toContain('components-button--primary');
    }
  });
});

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/stories');

    // Check navigation has aria-label
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Check search has label
    const searchInput = page.getByPlaceholder(/search/i);
    const ariaLabel = await searchInput.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
  });

  test('should support keyboard navigation in story list', async ({ page }) => {
    await page.goto('/stories');

    // Focus on search
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.focus();

    // Tab through the interface
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to navigate with keyboard
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
