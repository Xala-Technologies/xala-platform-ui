#!/usr/bin/env node
/**
 * Inspect Xaheen theme in Storybook using Playwright
 */
import { chromium } from 'playwright';

async function inspectTheme() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  // Listen to console
  page.on('console', msg => console.log(`[Browser] ${msg.type()}: ${msg.text()}`));
  
  const url = 'http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen';
  console.log(`\n📍 Navigating to: ${url}\n`);
  
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Wait for theme application
  
  console.log('='.repeat(80));
  console.log('THEME INSPECTION REPORT');
  console.log('='.repeat(80));
  
  // 1. URL Check
  console.log('\n1️⃣  URL PARAMETERS');
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  console.log(currentUrl.includes('brandTheme:xaheen') ? '✅ Xaheen in URL' : '❌ Xaheen NOT in URL');
  
  // 2. HTML attributes
  console.log('\n2️⃣  HTML ELEMENT ATTRIBUTES');
  const htmlAttrs = await page.evaluate(() => {
    const html = document.documentElement;
    return {
      'data-brand-theme': html.getAttribute('data-brand-theme'),
      'data-sb-theme': html.getAttribute('data-sb-theme'),
      'data-color-scheme': html.getAttribute('data-color-scheme'),
      'class': html.className,
    };
  });
  
  for (const [key, value] of Object.entries(htmlAttrs)) {
    console.log(`${value ? '✅' : '❌'} ${key}: ${value}`);
  }
  
  // 3. CSS Variables
  console.log('\n3️⃣  CSS CUSTOM PROPERTIES');
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const styles = window.getComputedStyle(root);
    return {
      '--ds-color-neutral-background-default': styles.getPropertyValue('--ds-color-neutral-background-default').trim(),
      '--ds-color-accent-base-default': styles.getPropertyValue('--ds-color-accent-base-default').trim(),
      '--ds-color-neutral-text-default': styles.getPropertyValue('--ds-color-neutral-text-default').trim(),
      '--sb-accent': styles.getPropertyValue('--sb-accent').trim(),
    };
  });
  
  const expected = {
    '--ds-color-accent-base-default': '#D6D876',
    '--sb-accent': '#D6D876',
  };
  
  for (const [key, value] of Object.entries(cssVars)) {
    if (expected[key]) {
      const match = value.toLowerCase().includes(expected[key].toLowerCase());
      console.log(`${match ? '✅' : '❌'} ${key}: ${value} ${!match ? `(expected: ${expected[key]})` : ''}`);
    } else {
      console.log(`ℹ️  ${key}: ${value}`);
    }
  }
  
  // 4. Theme CSS injection
  console.log('\n4️⃣  THEME CSS INJECTION');
  const themeStyle = await page.evaluate(() => {
    const style = document.getElementById('xala-platform-theme');
    if (style) {
      const content = style.textContent || '';
      return {
        found: true,
        length: content.length,
        hasXaheenColors: content.includes('#D6D876') || content.includes('#0B0B0F'),
      };
    }
    return { found: false };
  });
  
  if (themeStyle.found) {
    console.log(`✅ Theme style found (${themeStyle.length} chars)`);
    console.log(`${themeStyle.hasXaheenColors ? '✅' : '❌'} Contains Xaheen colors`);
  } else {
    console.log('❌ Theme style NOT found');
  }
  
  // 5. Sidebar styling
  console.log('\n5️⃣  SIDEBAR STYLES');
  const sidebarStyles = await page.evaluate(() => {
    const sidebar = document.querySelector('aside, nav, [class*="sidebar"]');
    if (!sidebar) return { error: 'Not found' };
    const styles = window.getComputedStyle(sidebar);
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
    };
  });
  
  if (!sidebarStyles.error) {
    console.log(`Background: ${sidebarStyles.backgroundColor}`);
    console.log(`Color: ${sidebarStyles.color}`);
    
    // Check for Xaheen dark (#0B0B0F = rgb(11, 11, 15))
    if (sidebarStyles.backgroundColor.includes('11, 11, 15') || sidebarStyles.backgroundColor.includes('0, 0, 0')) {
      console.log('✅ Sidebar matches Xaheen dark theme');
    }
  } else {
    console.log(`❌ ${sidebarStyles.error}`);
  }
  
  // 6. Selected item
  console.log('\n6️⃣  SELECTED ITEM');
  const selectedStyles = await page.evaluate(() => {
    const selected = document.querySelector('[data-selected="true"], [aria-current="true"]');
    if (!selected) return { error: 'Not found' };
    const styles = window.getComputedStyle(selected);
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
      text: selected.textContent.trim().substring(0, 30),
    };
  });
  
  if (!selectedStyles.error) {
    console.log(`Text: "${selectedStyles.text}"`);
    console.log(`Background: ${selectedStyles.backgroundColor}`);
    console.log(`Color: ${selectedStyles.color}`);
    
    // Check for gold background (#D6D876 = rgb(214, 216, 118))
    const hasGoldBg = selectedStyles.backgroundColor.includes('214') && selectedStyles.backgroundColor.includes('216');
    const hasBlackText = selectedStyles.color.includes('11, 11, 15') || selectedStyles.color.includes('0, 0, 0');
    
    console.log(`${hasGoldBg ? '✅' : '❌'} Gold background`);
    console.log(`${hasBlackText ? '✅' : '❌'} Black text (contrast)`);
  } else {
    console.log(`❌ ${selectedStyles.error}`);
  }
  
  // 7. Screenshots
  console.log('\n7️⃣  SCREENSHOTS');
  const timestamp = Date.now();
  
  await page.screenshot({ path: `/tmp/storybook_full_${timestamp}.png`, fullPage: true });
  console.log(`✅ Full page: /tmp/storybook_full_${timestamp}.png`);
  
  const sidebar = page.locator('aside, nav, [class*="sidebar"]').first();
  if (await sidebar.count() > 0) {
    await sidebar.screenshot({ path: `/tmp/storybook_sidebar_${timestamp}.png` });
    console.log(`✅ Sidebar: /tmp/storybook_sidebar_${timestamp}.png`);
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('=' + '='.repeat(79));
  
  const issues = [];
  if (htmlAttrs['data-brand-theme'] !== 'xaheen') {
    issues.push('❌ data-brand-theme is not "xaheen"');
  }
  if (!themeStyle.found) {
    issues.push('❌ Theme CSS not injected');
  }
  
  if (issues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:');
    issues.forEach(issue => console.log(`   ${issue}`));
  } else {
    console.log('\n✅ All checks passed!');
  }
  
  console.log('\n⏱️  Keeping browser open for 5 seconds...');
  await page.waitForTimeout(5000);
  
  await browser.close();
}

inspectTheme().catch(console.error);
