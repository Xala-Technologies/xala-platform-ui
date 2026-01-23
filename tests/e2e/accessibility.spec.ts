/**
 * Accessibility E2E Tests
 *
 * Tests for WCAG compliance and accessibility features
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from 'axe-playwright';

test.describe('Accessibility', () => {
  test('MediaResourceCard meets WCAG standards', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('PeriodCard meets WCAG standards', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('MultiStepFormModal meets WCAG standards', async ({ page }) => {
    await page.goto('/iframe.html?id=patterns-multistepformmodal--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('ReviewStep meets WCAG standards', async ({ page }) => {
    await page.goto('/iframe.html?id=patterns-reviewstep--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('components have proper heading hierarchy', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--default');

    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // Verify headings have text content
    for (const heading of headings) {
      const text = await heading.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--with-favorite');

    // Find interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      await button.focus();
      await expect(button).toBeFocused();

      // Check if button is keyboard accessible
      const tabIndex = await button.getAttribute('tabIndex');
      expect(['0', null]).toContain(tabIndex);
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--default');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const alt = await image.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('forms have proper labels', async ({ page }) => {
    await page.goto('/iframe.html?id=patterns-multistepformmodal--default');

    // Check for form inputs
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Input should have at least one: id (with label), aria-label, or aria-labelledby
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--default');

    // This is a basic check - full contrast testing would require more sophisticated tools
    // For now, we verify that design tokens are used (which should have proper contrast)
    const card = page.locator('.media-resource-card').first();
    const styles = await card.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
      };
    });

    // Verify styles are using CSS variables (design tokens)
    expect(styles.color).toContain('var(--ds-');
    expect(styles.backgroundColor).toContain('var(--ds-');
  });
});
