#!/usr/bin/env node
/**
 * Final test of clean theme implementation
 */
import { chromium } from 'playwright';

async function testFinalTheme() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  console.log('\n' + '='.repeat(80));
  console.log('FINAL THEME TEST - Clean Implementation');
  console.log('='.repeat(80));
  
  // Test 1: Light mode with Xaheen
  console.log('\n1️⃣  TEST: Xaheen Light Mode');
  await page.goto('http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen;colorScheme:light');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const lightMode = await page.evaluate(() => {
    const html = document.documentElement;
    const styles = window.getComputedStyle(html);
    const selected = document.querySelector('[data-selected="true"]');
    const selectedStyles = selected ? window.getComputedStyle(selected) : null;
    
    return {
      colorScheme: html.getAttribute('data-color-scheme'),
      brandTheme: html.getAttribute('data-sb-theme'),
      accentColor: styles.getPropertyValue('--ds-color-accent-base-default').trim(),
      selectedBg: selectedStyles?.backgroundColor || 'N/A',
      selectedColor: selectedStyles?.color || 'N/A',
    };
  });
  
  console.log(`   Color Scheme: ${lightMode.colorScheme}`);
  console.log(`   Brand Theme: ${lightMode.brandTheme}`);
  console.log(`   Accent: ${lightMode.accentColor} ${lightMode.accentColor === '#8E8F5A' ? '✅' : '❌'} (should be #8E8F5A olive)`);
  console.log(`   Selected BG: ${lightMode.selectedBg}`);
  console.log(`   Selected Text: ${lightMode.selectedColor}`);
  
  await page.screenshot({ path: '/tmp/final-xaheen-light.png', fullPage: true });
  console.log('   📸 /tmp/final-xaheen-light.png');
  
  // Test 2: Switch to Dark mode
  console.log('\n2️⃣  TEST: Switching to Dark Mode');
  await page.goto('http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen;colorScheme:dark');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const darkMode = await page.evaluate(() => {
    const html = document.documentElement;
    const styles = window.getComputedStyle(html);
    const selected = document.querySelector('[data-selected="true"]');
    const selectedStyles = selected ? window.getComputedStyle(selected) : null;
    
    return {
      colorScheme: html.getAttribute('data-color-scheme'),
      brandTheme: html.getAttribute('data-sb-theme'),
      accentColor: styles.getPropertyValue('--ds-color-accent-base-default').trim(),
      selectedBg: selectedStyles?.backgroundColor || 'N/A',
      selectedColor: selectedStyles?.color || 'N/A',
      hasGoldBg: selectedStyles?.backgroundColor.includes('214') && selectedStyles?.backgroundColor.includes('216'),
      hasBlackText: selectedStyles?.color.includes('11') && selectedStyles?.color.includes('15'),
    };
  });
  
  console.log(`   Color Scheme: ${darkMode.colorScheme}`);
  console.log(`   Brand Theme: ${darkMode.brandTheme}`);
  console.log(`   Accent: ${darkMode.accentColor} ${darkMode.accentColor === '#D6D876' ? '✅' : '❌'} (should be #D6D876 gold)`);
  console.log(`   Selected BG: ${darkMode.selectedBg} ${darkMode.hasGoldBg ? '✅' : '❌'}`);
  console.log(`   Selected Text: ${darkMode.selectedColor} ${darkMode.hasBlackText ? '✅' : '❌'}`);
  
  await page.screenshot({ path: '/tmp/final-xaheen-dark.png', fullPage: true });
  console.log('   📸 /tmp/final-xaheen-dark.png');
  
  // Test 3: Use toolbar to toggle (if available)
  console.log('\n3️⃣  TEST: Toolbar Toggle');
  await page.goto('http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen;colorScheme:light');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Try to find color scheme toggle in toolbar
  const toolbarButtons = await page.locator('[role="banner"] button, [class*="toolbar"] button').all();
  console.log(`   Found ${toolbarButtons.length} toolbar buttons`);
  
  // Look for color scheme button by title or label
  const colorSchemeBtn = page.locator('button:has-text("Color Scheme"), button:has-text("Light"), button:has-text("Dark"), button[title*="color" i]').first();
  const btnCount = await colorSchemeBtn.count();
  
  if (btnCount > 0) {
    console.log('   ✅ Color scheme toggle found in toolbar');
    await colorSchemeBtn.click();
    await page.waitForTimeout(2000);
    
    const afterToggle = await page.evaluate(() => {
      return {
        colorScheme: document.documentElement.getAttribute('data-color-scheme'),
        accentColor: window.getComputedStyle(document.documentElement).getPropertyValue('--ds-color-accent-base-default').trim(),
      };
    });
    
    console.log(`   After toggle: ${afterToggle.colorScheme}, Accent: ${afterToggle.accentColor}`);
  } else {
    console.log('   ℹ️  Color scheme toggle not found in toolbar (expected - will be in globals)');
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  
  const issues = [];
  if (lightMode.accentColor !== '#8E8F5A') {
    issues.push('❌ Light mode accent color incorrect');
  }
  if (darkMode.accentColor !== '#D6D876') {
    issues.push('❌ Dark mode accent color incorrect');
  }
  if (!darkMode.hasGoldBg) {
    issues.push('❌ Dark mode selected item background not gold');
  }
  if (!darkMode.hasBlackText) {
    issues.push('❌ Dark mode selected item text not black (contrast issue)');
  }
  
  if (issues.length === 0) {
    console.log('\n✅ ALL TESTS PASSED! Theme working perfectly!');
  } else {
    console.log('\n⚠️  Issues found:');
    issues.forEach(issue => console.log(`   ${issue}`));
  }
  
  console.log('\n📸 Check screenshots in /tmp/final-xaheen-*.png');
  console.log('⏱️  Keeping browser open for 10 seconds...');
  await page.waitForTimeout(10000);
  
  await browser.close();
}

testFinalTheme().catch(console.error);
