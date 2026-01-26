#!/usr/bin/env node
/**
 * Detailed theme inspection - check if decorator and provider are working
 */
import { chromium } from 'playwright';

async function inspectDetailed() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  const url = 'http://localhost:6006/?path=/docs/overview-introduction--docs&globals=brandTheme:xaheen';
  console.log(`\n📍 Navigating to: ${url}\n`);
  
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  console.log('='.repeat(80));
  console.log('DETAILED THEME DEBUG');
  console.log('='.repeat(80));
  
  // Check if wrapper div with data-brand-theme exists
  console.log('\n1️⃣  DECORATOR WRAPPER DIV');
  const wrapperDiv = await page.evaluate(() => {
    const div = document.querySelector('[data-brand-theme]');
    if (div) {
      return {
        found: true,
        'data-brand-theme': div.getAttribute('data-brand-theme'),
        'data-color-scheme': div.getAttribute('data-color-scheme'),
        'data-size': div.getAttribute('data-size'),
        style: {
          backgroundColor: window.getComputedStyle(div).backgroundColor,
          color: window.getComputedStyle(div).color,
        }
      };
    }
    return { found: false };
  });
  
  if (wrapperDiv.found) {
    console.log('✅ Wrapper div found');
    console.log(`   data-brand-theme: ${wrapperDiv['data-brand-theme']}`);
    console.log(`   data-color-scheme: ${wrapperDiv['data-color-scheme']}`);
    console.log(`   Background: ${wrapperDiv.style.backgroundColor}`);
  } else {
    console.log('❌ Wrapper div NOT found');
  }
  
  // Check all style elements
  console.log('\n2️⃣  ALL STYLE ELEMENTS');
  const styles = await page.evaluate(() => {
    const allStyles = Array.from(document.querySelectorAll('style'));
    return allStyles.map(s => ({
      id: s.id || '(no id)',
      length: s.textContent?.length || 0,
      preview: s.textContent?.substring(0, 100) || ''
    }));
  });
  
  console.log(`Found ${styles.length} style elements:`);
  styles.forEach((s, i) => {
    console.log(`   ${i + 1}. ID: ${s.id}, Length: ${s.length}`);
    if (s.id === 'xala-platform-theme') {
      console.log(`      ✅ Theme style found!`);
    }
  });
  
  // Check if we're in an iframe
  console.log('\n3️⃣  IFRAME CHECK');
  const isInIframe = await page.evaluate(() => {
    return {
      isInFrame: window !== window.top,
      location: window.location.href,
      parentLocation: window !== window.top ? document.referrer : 'N/A'
    };
  });
  
  console.log(`In iframe: ${isInIframe.isInFrame}`);
  console.log(`Location: ${isInIframe.location}`);
  
  // Check the preview iframe specifically
  console.log('\n4️⃣  PREVIEW IFRAME CONTENT');
  try {
    const iframe = page.frameLocator('iframe[id*="storybook-preview"]');
    const iframeStyles = await iframe.locator('style').count();
    console.log(`Styles in iframe: ${iframeStyles}`);
    
    const iframeThemeStyle = await iframe.locator('style#xala-platform-theme').count();
    console.log(`Theme style in iframe: ${iframeThemeStyle > 0 ? '✅ Found' : '❌ Not found'}`);
    
    if (iframeThemeStyle === 0) {
      console.log('\n   ⚠️  Theme CSS is not being injected into preview iframe!');
      console.log('   This means DesignsystemetProvider.injectThemeCSS() is not running.');
    }
  } catch (e) {
    console.log(`Error checking iframe: ${e.message}`);
  }
  
  // Check console for errors
  console.log('\n5️⃣  CONSOLE MESSAGES (last 10)');
  const logs = [];
  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  
  await page.waitForTimeout(1000);
  logs.slice(-10).forEach(log => console.log(`   ${log}`));
  
  console.log('\n⏱️  Keeping browser open for 10 seconds for manual inspection...');
  await page.waitForTimeout(10000);
  
  await browser.close();
}

inspectDetailed().catch(console.error);
