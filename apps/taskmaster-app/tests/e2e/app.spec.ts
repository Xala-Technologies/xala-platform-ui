import { test, expect } from '@playwright/test';

test.describe('Taskmaster-app E2E', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  test('should navigate to home', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  test('should navigate to tasks', async ({ page }) => {
    await page.goto('/tasks');
    await expect(page).toHaveURL('/tasks');
  });

  test('should navigate to projects', async ({ page }) => {
    await page.goto('/projects');
    await expect(page).toHaveURL('/projects');
  });

  test('should navigate to calendar', async ({ page }) => {
    await page.goto('/calendar');
    await expect(page).toHaveURL('/calendar');
  });

});
