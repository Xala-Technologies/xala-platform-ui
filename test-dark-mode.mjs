#!/usr/bin/env node
import { chromium } from 'playwright';

async function testDarkMode() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  console.log('\n=== LIGHT MODE ===');
  let accent = await page.evaluate(() => {
    return window.getComputedStyle(document.documentElement).getPropertyValue('--ds-color-accent-base-default').trim();
  });
  console.log(`Accent color: ${accent} (should be #8E8F5A olive)`);
  
  await page.screenshot({ path: '/tmp/xaheen-light.png', fullPage: true });
  console.log('Screenshot: /tmp/xaheen-light.png');
  
  // Toggle dark mode
  console.log('\n🌙 Toggling to DARK MODE...');
  const darkToggle = page.locator('[title*="dark" i], [aria-label*="dark" i]').first();
  await darkToggle.click();
  await page.waitForTimeout(2000);
  
  console.log('\n=== DARK MODE ===');
  accent = await page.evaluate(() => {
    return window.getComputedStyle(document.documentElement).getPropertyValue('--ds-color-accent-base-default').trim();
  });
  console.log(`Accent color: ${accent} (should be #D6D876 gold)`);
  
  let colorScheme = await page.evaluate(() => {
    return document.documentElement.getAttribute('data-color-scheme');
  });
  console.log(`Color scheme: ${colorScheme}`);
  
  await page.screenshot({ path: '/tmp/xaheen-dark.png', fullPage: true });
  console.log('Screenshot: /tmp/xaheen-dark.png');
  
  // Check selected item in dark mode
  const selected = await page.evaluate(() => {
    const item = document.querySelector('[data-selected="true"]');
    if (item) {
      const styles = window.getComputedStyle(item);
      return {
        bg: styles.backgroundColor,
        color: styles.color
      };
    }
    return null;
  });
  
  if (selected) {
    console.log('\nSelected item:');
    console.log(`  Background: ${selected.bg} (should have gold)`);
    console.log(`  Text: ${selected.color} (should be black for contrast)`);
  }
  
  console.log('\n✅ Check screenshots to verify theme!');
  console.log('⏱️  Keeping browser open for 10 seconds...');
  await page.waitForTimeout(10000);
  
  await browser.close();
}

testDarkMode().catch(console.error);
