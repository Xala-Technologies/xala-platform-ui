/**
 * E2E Tests for PeriodCard
 */

import { test, expect } from '@playwright/test';

test.describe('PeriodCard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--default');
  });

  test('displays card with all information', async ({ page }) => {
    await expect(page.getByText('Spring Season 2026')).toBeVisible();
    await expect(page.getByText('Basketball League')).toBeVisible();
    await expect(page.getByText('March 1, 2026')).toBeVisible();
    await expect(page.getByText('June 30, 2026')).toBeVisible();
  });

  test('displays status badge', async ({ page }) => {
    await expect(page.getByText('Registration Open')).toBeVisible();
  });

  test('displays deadline when provided', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--with-deadline');
    await expect(page.getByText(/Registration deadline/i)).toBeVisible();
  });

  test('handles click interaction', async ({ page }) => {
    const card = page.locator('.period-card').first();
    await card.click();
    await expect(card).toBeVisible();
  });

  test('handles action button click', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--with-action-button');
    const actionButton = page.getByRole('button', { name: /enroll/i });
    await expect(actionButton).toBeVisible();
    await actionButton.click();
  });

  test('disables action button when actionDisabled is true', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--disabled-action');
    const actionButton = page.getByRole('button', { name: /waitlist/i });
    await expect(actionButton).toBeDisabled();
  });

  test('renders compact variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--compact-variant');
    const card = page.locator('.period-card--compact').first();
    await expect(card).toBeVisible();
  });

  test('displays image when provided', async ({ page }) => {
    await page.goto('/iframe.html?id=blocks-periodcard--with-image');
    const image = page.locator('img').first();
    await expect(image).toBeVisible();
  });

  test('is keyboard accessible', async ({ page }) => {
    const card = page.locator('.period-card').first();
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(card).toBeVisible();
  });
});
