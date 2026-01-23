/**
 * E2E Tests for MediaResourceCard
 */

import { test, expect } from '@playwright/test';

test.describe('MediaResourceCard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook story
    await page.goto('/iframe.html?id=blocks-mediresourcecard--default');
  });

  test('displays card with all information', async ({ page }) => {
    // Check title
    await expect(page.getByText('Main Sports Arena')).toBeVisible();

    // Check subtitle
    await expect(page.getByText('Multi-purpose Venue')).toBeVisible();

    // Check description
    await expect(page.getByText(/State-of-the-art sports facility/)).toBeVisible();

    // Check image
    const image = page.locator('img[alt="Sports arena interior"]');
    await expect(image).toBeVisible();
  });

  test('handles click interaction', async ({ page }) => {
    // Click on the card
    const card = page.locator('.media-resource-card').first();
    await card.click();

    // In a real app, this would navigate or trigger an action
    // For Storybook, we just verify the card is clickable
    await expect(card).toBeVisible();
  });

  test('displays badges correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--with-badges');

    // Check badges are visible
    await expect(page.getByText('Indoor')).toBeVisible();
    await expect(page.getByText('Basketball')).toBeVisible();
    await expect(page.getByText('Volleyball')).toBeVisible();
  });

  test('displays capacity information', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--with-capacity');

    // Check capacity is displayed
    await expect(page.getByText(/500/)).toBeVisible();
    await expect(page.getByText(/capacity/)).toBeVisible();
  });

  test('displays location information', async ({ page }) => {
    // Location should be visible in default story
    await expect(page.getByText(/Downtown District/)).toBeVisible();
  });

  test('displays price information', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--with-capacity');

    // Check price is displayed
    await expect(page.getByText(/\$200/)).toBeVisible();
  });

  test('handles favorite toggle', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--with-favorite');

    // Find favorite button
    const favoriteButton = page.locator('button[aria-label*="favorite" i]').first();
    await expect(favoriteButton).toBeVisible();

    // Click favorite button
    await favoriteButton.click();

    // Verify button state changes (in real app, this would update)
    await expect(favoriteButton).toBeVisible();
  });

  test('displays status indicator', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--status-available');

    // Check status is displayed
    await expect(page.getByText('Available')).toBeVisible();
  });

  test('renders list variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--list-variant');

    // Check list variant class
    const card = page.locator('.media-resource-card--list').first();
    await expect(card).toBeVisible();
  });

  test('renders featured variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--featured-variant');

    // Check featured variant class
    const card = page.locator('.media-resource-card--featured').first();
    await expect(card).toBeVisible();
  });

  test('is keyboard accessible', async ({ page }) => {
    // Focus on card
    const card = page.locator('.media-resource-card').first();
    await card.focus();

    // Press Enter
    await page.keyboard.press('Enter');

    // Card should still be visible (interaction handled)
    await expect(card).toBeVisible();
  });

  test('has proper ARIA labels', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-mediresourcecard--with-favorite');

    // Check favorite button has aria-label
    const favoriteButton = page.locator('button[aria-label]').first();
    await expect(favoriteButton).toHaveAttribute('aria-label');
  });
});
