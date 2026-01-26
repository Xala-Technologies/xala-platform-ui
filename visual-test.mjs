#!/usr/bin/env node
/**
 * Visual test - Open Storybook and let user verify visually
 */
import { chromium } from 'playwright';

async function visualTest() {
  console.log('\n' + '='.repeat(80));
  console.log('VISUAL THEME VERIFICATION');
  console.log('='.repeat(80));
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ 
    viewport: null, // Use full window
    colorScheme: 'dark'
  });
  
  const page = await context.newPage();
  
  // Test 1: Xaheen Dark Mode
  console.log('\n📱 Opening Xaheen Dark Mode...');
  await page.goto('http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen;colorScheme:dark');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  // Check theme application
  const darkCheck = await page.evaluate(() => {
    const html = document.documentElement;
    return {
      'data-color-scheme': html.getAttribute('data-color-scheme'),
      'data-sb-theme': html.getAttribute('data-sb-theme'),
      'class': html.className,
      'accent': window.getComputedStyle(html).getPropertyValue('--ds-color-accent-base-default').trim(),
      'background': window.getComputedStyle(html).getPropertyValue('--ds-color-neutral-background-default').trim(),
    };
  });
  
  console.log('\n🎨 Theme Status:');
  console.log(`   Color Scheme: ${darkCheck['data-color-scheme']}`);
  console.log(`   Brand Theme: ${darkCheck['data-sb-theme']}`);
  console.log(`   Class: ${darkCheck['class']}`);
  console.log(`   Accent Color: ${darkCheck.accent} ${darkCheck.accent === '#D6D876' ? '✅ GOLD' : '❌'}`);
  console.log(`   Background: ${darkCheck.background} ${darkCheck.background === '#0B0B0F' ? '✅ BLACK' : '❌'}`);
  
  await page.screenshot({ path: '/tmp/visual-xaheen-dark.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/visual-xaheen-dark.png');
  
  // Check for theme CSS injection
  const themeCSS = await page.evaluate(() => {
    const managerTheme = document.getElementById('xala-manager-theme');
    const platformTheme = document.getElementById('xala-platform-theme');
    const docsTokens = document.getElementById('storybook-docs-design-tokens');
    const uiMapping = document.getElementById('storybook-ui-mapping');
    
    return {
      managerTheme: managerTheme ? '✅' : '❌',
      platformTheme: platformTheme ? '✅' : '❌',
      docsTokens: docsTokens ? '✅' : '❌',
      uiMapping: uiMapping ? '✅' : '❌',
    };
  });
  
  console.log('\n💉 CSS Injection Status:');
  console.log(`   Manager Theme: ${themeCSS.managerTheme}`);
  console.log(`   Platform Theme: ${themeCSS.platformTheme}`);
  console.log(`   Docs Tokens: ${themeCSS.docsTokens}`);
  console.log(`   UI Mapping: ${themeCSS.uiMapping}`);
  
  // Check selected item in main frame (not iframe)
  const mainFrameSelected = await page.evaluate(() => {
    // Check in the manager (main window, not iframe)
    const selected = document.querySelector('aside [data-selected="true"], aside [aria-current="page"], nav [data-selected="true"]');
    if (selected) {
      const styles = window.getComputedStyle(selected);
      return {
        found: true,
        tag: selected.tagName,
        text: selected.textContent?.substring(0, 30),
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    }
    return { found: false };
  });
  
  if (mainFrameSelected.found) {
    console.log('\n🎯 Selected Sidebar Item (Manager Frame):');
    console.log(`   Text: "${mainFrameSelected.text}"`);
    console.log(`   Background: ${mainFrameSelected.backgroundColor}`);
    console.log(`   Text Color: ${mainFrameSelected.color}`);
    
    // Check for gold (214, 216, 118) and black (11, 11, 15)
    const bgStr = mainFrameSelected.backgroundColor;
    const colorStr = mainFrameSelected.color;
    const hasGold = bgStr.includes('214') && bgStr.includes('216');
    const hasBlack = colorStr.includes('11') || colorStr.includes('0, 0, 0');
    
    console.log(`   ${hasGold ? '✅' : '⚠️'}  Gold background`);
    console.log(`   ${hasBlack ? '✅' : '⚠️'}  Black text (contrast)`);
  } else {
    console.log('\n⚠️  No selected item found in sidebar');
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ Browser will stay open for 60 seconds for manual inspection');
  console.log('='.repeat(80));
  console.log('\n👀 Please visually verify:');
  console.log('   1. Sidebar is TRUE BLACK (#0B0B0F)');
  console.log('   2. Selected item has GOLD background with BLACK text');
  console.log('   3. Content area uses dark theme');
  console.log('   4. No flickering when switching themes');
  console.log('\n⏱️  Keeping browser open...');
  
  await page.waitForTimeout(60000);
  
  await browser.close();
}

visualTest().catch(console.error);
