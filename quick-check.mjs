#!/usr/bin/env node
/**
 * Quick theme check - 5 second test
 */
import { chromium } from 'playwright';

async function quickCheck() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('\n🔍 Quick Theme Check...\n');
  
  // Check Dark Mode
  await page.goto('http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen;colorScheme:dark');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  const result = await page.evaluate(() => {
    const html = document.documentElement;
    const styles = window.getComputedStyle(html);
    
    // Check for theme CSS injection
    const managerTheme = document.getElementById('xala-manager-theme');
    const uiMapping = document.getElementById('storybook-ui-mapping');
    
    // Check selected item in sidebar
    const selected = document.querySelector('aside [data-selected="true"], aside [aria-current="page"]');
    const selectedStyles = selected ? window.getComputedStyle(selected) : null;
    
    return {
      colorScheme: html.getAttribute('data-color-scheme'),
      brandTheme: html.getAttribute('data-sb-theme'),
      accentColor: styles.getPropertyValue('--ds-color-accent-base-default').trim(),
      background: styles.getPropertyValue('--ds-color-neutral-background-default').trim(),
      managerThemeInjected: !!managerTheme,
      uiMappingInjected: !!uiMapping,
      selectedBg: selectedStyles?.backgroundColor || null,
      selectedColor: selectedStyles?.color || null,
    };
  });
  
  console.log('Theme Configuration:');
  console.log(`  Color Scheme: ${result.colorScheme} ${result.colorScheme === 'dark' ? '✅' : '❌'}`);
  console.log(`  Brand Theme: ${result.brandTheme} ${result.brandTheme === 'xaheen' ? '✅' : '❌'}`);
  
  console.log('\nCSS Injection:');
  console.log(`  Manager Theme: ${result.managerThemeInjected ? '✅ Injected' : '❌ Missing'}`);
  console.log(`  UI Mapping: ${result.uiMappingInjected ? '✅ Injected' : '❌ Missing'}`);
  
  console.log('\nDesign Tokens:');
  console.log(`  Accent: ${result.accentColor} ${result.accentColor === '#D6D876' ? '✅ GOLD' : '❌'}`);
  console.log(`  Background: ${result.background} ${result.background === '#0B0B0F' ? '✅ BLACK' : '❌'}`);
  
  console.log('\nSelected Item:');
  if (result.selectedBg) {
    const hasGold = result.selectedBg.includes('214') && result.selectedBg.includes('216');
    const hasBlackText = result.selectedColor && (result.selectedColor.includes('11, 11, 15') || result.selectedColor.includes('0, 0, 0'));
    console.log(`  Background: ${result.selectedBg} ${hasGold ? '✅ GOLD' : '⚠️'}`);
    console.log(`  Text: ${result.selectedColor} ${hasBlackText ? '✅ BLACK' : '⚠️'}`);
  } else {
    console.log('  ⚠️  No selected item found (might be in iframe)');
  }
  
  await page.screenshot({ path: '/tmp/quick-check.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/quick-check.png');
  
  await browser.close();
  
  // Summary
  const allGood = 
    result.colorScheme === 'dark' &&
    result.brandTheme === 'xaheen' &&
    result.managerThemeInjected &&
    result.uiMappingInjected &&
    result.accentColor === '#D6D876' &&
    result.background === '#0B0B0F';
  
  console.log('\n' + '='.repeat(60));
  if (allGood) {
    console.log('✅ THEME WORKING PERFECTLY!');
  } else {
    console.log('⚠️  Some issues detected - check output above');
  }
  console.log('='.repeat(60) + '\n');
}

quickCheck().catch(console.error);
