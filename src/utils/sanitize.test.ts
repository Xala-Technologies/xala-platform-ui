/**
 * Tests for HTML Sanitization Utilities
 *
 * Validates protection against XSS attacks while preserving safe rich text formatting
 */

import { describe, it, expect } from 'vitest';
import { sanitizeHtml, isDangerousHtml, stripHtml } from './sanitize';

describe('sanitizeHtml', () => {
  // =============================================================================
  // XSS Attack Vectors - Script Tag Injection
  // =============================================================================

  describe('script tag injection', () => {
    it('should block basic script tags', () => {
      const malicious = '<script>alert("XSS")</script>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('<script');
      expect(result).not.toContain('alert');
    });

    it('should block script tags with different casings', () => {
      const malicious = '<ScRiPt>alert("XSS")</ScRiPt>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('script');
      expect(result).not.toContain('alert');
    });

    it('should block script tags with attributes', () => {
      const malicious = '<script type="text/javascript">alert("XSS")</script>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('<script');
      expect(result).not.toContain('alert');
    });

    it('should block script tags with nested content', () => {
      const malicious = '<div><script>alert("XSS")</script></div>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('<script');
      expect(result).not.toContain('alert');
    });
  });

  // =============================================================================
  // XSS Attack Vectors - Event Handler Attributes
  // =============================================================================

  describe('event handler attributes', () => {
    it('should block onclick handlers', () => {
      const malicious = '<button onclick="alert(\'XSS\')">Click me</button>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onclick');
      expect(result).not.toContain('alert');
    });

    it('should block onerror handlers on images', () => {
      const malicious = '<img src="x" onerror="alert(\'XSS\')">';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onerror');
      expect(result).not.toContain('alert');
    });

    it('should block onload handlers', () => {
      const malicious = '<body onload="alert(\'XSS\')">Content</body>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onload');
      expect(result).not.toContain('alert');
    });

    it('should block onmouseover handlers', () => {
      const malicious = '<div onmouseover="alert(\'XSS\')">Hover me</div>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onmouseover');
      expect(result).not.toContain('alert');
    });

    it('should block onfocus handlers', () => {
      const malicious = '<input onfocus="alert(\'XSS\')" value="test">';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onfocus');
      expect(result).not.toContain('alert');
    });

    it('should block onchange handlers', () => {
      const malicious = '<select onchange="alert(\'XSS\')"><option>1</option></select>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onchange');
      expect(result).not.toContain('alert');
    });
  });

  // =============================================================================
  // XSS Attack Vectors - JavaScript URLs
  // =============================================================================

  describe('javascript: URLs', () => {
    it('should block javascript: URLs in links', () => {
      const malicious = '<a href="javascript:alert(\'XSS\')">Click me</a>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('alert');
    });

    it('should block javascript: URLs with different casings', () => {
      const malicious = '<a href="JaVaScRiPt:alert(\'XSS\')">Click me</a>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('JaVaScRiPt:');
      expect(result).not.toContain('alert');
    });

    it('should block javascript: URLs with encoded characters', () => {
      const malicious = '<a href="java&#x09;script:alert(\'XSS\')">Click me</a>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('alert');
    });

    it('should block javascript: URLs in iframes', () => {
      const malicious = '<iframe src="javascript:alert(\'XSS\')"></iframe>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('javascript:');
      expect(result).not.toContain('alert');
      expect(result).not.toContain('iframe');
    });
  });

  // =============================================================================
  // XSS Attack Vectors - Data URIs
  // =============================================================================

  describe('data: URIs with scripts', () => {
    it('should block data:text/html URIs with scripts', () => {
      const malicious = '<iframe src="data:text/html,<script>alert(\'XSS\')</script>"></iframe>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('data:text/html');
      expect(result).not.toContain('alert');
    });

    it('should block data URLs in links', () => {
      const malicious = '<a href="data:text/html,<script>alert(\'XSS\')</script>">Click</a>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('alert');
    });

    it('should allow safe data: URIs for images', () => {
      const safe = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Red dot">';
      const result = sanitizeHtml(safe);
      expect(result).toContain('data:image/png');
    });
  });

  // =============================================================================
  // XSS Attack Vectors - Advanced Techniques
  // =============================================================================

  describe('advanced XSS techniques', () => {
    it('should block svg with embedded scripts', () => {
      const malicious = '<svg onload="alert(\'XSS\')"></svg>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('onload');
      expect(result).not.toContain('alert');
    });

    it('should block meta refresh redirects', () => {
      const malicious = '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\')">';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('meta');
      expect(result).not.toContain('javascript:');
    });

    it('should block object tags', () => {
      const malicious = '<object data="javascript:alert(\'XSS\')"></object>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('object');
      expect(result).not.toContain('javascript:');
    });

    it('should block embed tags', () => {
      const malicious = '<embed src="javascript:alert(\'XSS\')">';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('embed');
      expect(result).not.toContain('javascript:');
    });

    it('should block form tags with action attributes', () => {
      const malicious = '<form action="javascript:alert(\'XSS\')"><input type="submit"></form>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('form');
      expect(result).not.toContain('javascript:');
    });

    it('should block style tags with expressions', () => {
      const malicious = '<style>body { background: url("javascript:alert(\'XSS\')") }</style>';
      const result = sanitizeHtml(malicious);
      expect(result).not.toContain('<style');
      expect(result).not.toContain('javascript:');
    });
  });

  // =============================================================================
  // Safe HTML Preservation - Text Formatting
  // =============================================================================

  describe('text formatting preservation', () => {
    it('should preserve paragraph tags', () => {
      const safe = '<p>This is a paragraph</p>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<p>This is a paragraph</p>');
    });

    it('should preserve strong (bold) tags', () => {
      const safe = '<p><strong>Bold text</strong></p>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<p><strong>Bold text</strong></p>');
    });

    it('should preserve em (italic) tags', () => {
      const safe = '<p><em>Italic text</em></p>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<p><em>Italic text</em></p>');
    });

    it('should preserve underline tags', () => {
      const safe = '<p><u>Underlined text</u></p>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<p><u>Underlined text</u></p>');
    });

    it('should preserve strikethrough tags', () => {
      const safe = '<p><s>Strikethrough text</s></p>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<p><s>Strikethrough text</s></p>');
    });

    it('should preserve combined formatting', () => {
      const safe = '<p><strong>Bold</strong> and <em>italic</em> and <u>underlined</u></p>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<strong>Bold</strong>');
      expect(result).toContain('<em>italic</em>');
      expect(result).toContain('<u>underlined</u>');
    });
  });

  // =============================================================================
  // Safe HTML Preservation - Lists
  // =============================================================================

  describe('list preservation', () => {
    it('should preserve unordered lists', () => {
      const safe = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<ul>');
      expect(result).toContain('<li>Item 1</li>');
      expect(result).toContain('<li>Item 2</li>');
      expect(result).toContain('</ul>');
    });

    it('should preserve ordered lists', () => {
      const safe = '<ol><li>First</li><li>Second</li></ol>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<ol>');
      expect(result).toContain('<li>First</li>');
      expect(result).toContain('<li>Second</li>');
      expect(result).toContain('</ol>');
    });

    it('should preserve nested lists', () => {
      const safe = '<ul><li>Item 1<ul><li>Nested item</li></ul></li></ul>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('Item 1');
      expect(result).toContain('Nested item');
    });
  });

  // =============================================================================
  // Safe HTML Preservation - Headings
  // =============================================================================

  describe('heading preservation', () => {
    it('should preserve all heading levels', () => {
      const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      headings.forEach((tag) => {
        const safe = `<${tag}>Heading</${tag}>`;
        const result = sanitizeHtml(safe);
        expect(result).toBe(safe);
      });
    });

    it('should preserve headings with nested formatting', () => {
      const safe = '<h2><strong>Bold</strong> Heading</h2>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<h2>');
      expect(result).toContain('<strong>Bold</strong>');
    });
  });

  // =============================================================================
  // Safe HTML Preservation - Block Elements
  // =============================================================================

  describe('block element preservation', () => {
    it('should preserve blockquotes', () => {
      const safe = '<blockquote>This is a quote</blockquote>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<blockquote>This is a quote</blockquote>');
    });

    it('should preserve pre tags', () => {
      const safe = '<pre>Preformatted text</pre>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<pre>Preformatted text</pre>');
    });

    it('should preserve code tags', () => {
      const safe = '<code>const x = 1;</code>';
      const result = sanitizeHtml(safe);
      expect(result).toBe('<code>const x = 1;</code>');
    });

    it('should preserve code blocks', () => {
      const safe = '<pre><code>const x = 1;\nconsole.log(x);</code></pre>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<pre>');
      expect(result).toContain('<code>');
      expect(result).toContain('const x = 1;');
    });

    it('should preserve horizontal rules', () => {
      const safe = '<p>Before</p><hr><p>After</p>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<hr>');
    });
  });

  // =============================================================================
  // Safe HTML Preservation - Links and Images
  // =============================================================================

  describe('links and images preservation', () => {
    it('should preserve safe links with href', () => {
      const safe = '<a href="https://example.com">Link</a>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('<a href="https://example.com">');
      expect(result).toContain('Link');
      expect(result).toContain('</a>');
    });

    it('should preserve links with title attribute', () => {
      const safe = '<a href="https://example.com" title="Example">Link</a>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('title="Example"');
    });

    it('should preserve links with target attribute', () => {
      const safe = '<a href="https://example.com" target="_blank">Link</a>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('target="_blank"');
    });

    it('should preserve links with rel attribute', () => {
      const safe = '<a href="https://example.com" rel="noopener noreferrer">Link</a>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('rel="noopener noreferrer"');
    });

    it('should preserve images with safe attributes', () => {
      const safe = '<img src="https://example.com/image.jpg" alt="Description">';
      const result = sanitizeHtml(safe);
      expect(result).toContain('src="https://example.com/image.jpg"');
      expect(result).toContain('alt="Description"');
    });

    it('should preserve image dimensions', () => {
      const safe = '<img src="image.jpg" alt="Test" width="100" height="50">';
      const result = sanitizeHtml(safe);
      expect(result).toContain('width="100"');
      expect(result).toContain('height="50"');
    });
  });

  // =============================================================================
  // Safe HTML Preservation - Designsystemet Data Attributes
  // =============================================================================

  describe('Designsystemet data attributes preservation', () => {
    it('should preserve data-size attributes', () => {
      const safe = '<p data-size="medium">Paragraph</p>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('data-size="medium"');
    });

    it('should preserve data-color attributes', () => {
      const safe = '<div data-color="neutral">Content</div>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('data-color="neutral"');
    });

    it('should preserve class attributes', () => {
      const safe = '<p class="ds-paragraph">Text</p>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('class="ds-paragraph"');
    });
  });

  // =============================================================================
  // Edge Cases and Error Handling
  // =============================================================================

  describe('edge cases and error handling', () => {
    it('should handle null input', () => {
      const result = sanitizeHtml(null as any);
      expect(result).toBe('');
    });

    it('should handle undefined input', () => {
      const result = sanitizeHtml(undefined as any);
      expect(result).toBe('');
    });

    it('should handle empty string', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should handle non-string input', () => {
      const result = sanitizeHtml(123 as any);
      expect(result).toBe('');
    });

    it('should handle plain text without HTML', () => {
      const plain = 'Just plain text';
      const result = sanitizeHtml(plain);
      expect(result).toBe('Just plain text');
    });

    it('should handle HTML entities', () => {
      const safe = '<p>&lt;script&gt;alert("XSS")&lt;/script&gt;</p>';
      const result = sanitizeHtml(safe);
      expect(result).toContain('&lt;script&gt;');
    });

    it('should handle mixed malicious and safe content', () => {
      const mixed = '<p>Safe text</p><script>alert("XSS")</script><p>More safe text</p>';
      const result = sanitizeHtml(mixed);
      expect(result).toContain('Safe text');
      expect(result).toContain('More safe text');
      expect(result).not.toContain('<script');
      expect(result).not.toContain('alert');
    });
  });
});

// =============================================================================
// isDangerousHtml Tests
// =============================================================================

describe('isDangerousHtml', () => {
  it('should detect script tags', () => {
    expect(isDangerousHtml('<script>alert("XSS")</script>')).toBe(true);
    expect(isDangerousHtml('<SCRIPT>alert("XSS")</SCRIPT>')).toBe(true);
    expect(isDangerousHtml('<ScRiPt>alert("XSS")</ScRiPt>')).toBe(true);
  });

  it('should detect event handler attributes', () => {
    expect(isDangerousHtml('<div onclick="alert(1)">Test</div>')).toBe(true);
    expect(isDangerousHtml('<img onerror="alert(1)">')).toBe(true);
    expect(isDangerousHtml('<body onload="alert(1)">')).toBe(true);
    expect(isDangerousHtml('<input onfocus="alert(1)">')).toBe(true);
  });

  it('should detect javascript: URLs', () => {
    expect(isDangerousHtml('<a href="javascript:alert(1)">Link</a>')).toBe(true);
    expect(isDangerousHtml('<a href="JaVaScRiPt:alert(1)">Link</a>')).toBe(true);
  });

  it('should detect data:text/html URIs', () => {
    expect(isDangerousHtml('<iframe src="data:text/html,<script>alert(1)</script>"></iframe>')).toBe(
      true,
    );
  });

  it('should not flag safe HTML', () => {
    expect(isDangerousHtml('<p>Safe text</p>')).toBe(false);
    expect(isDangerousHtml('<strong>Bold</strong>')).toBe(false);
    expect(isDangerousHtml('<a href="https://example.com">Link</a>')).toBe(false);
    expect(isDangerousHtml('<img src="image.jpg" alt="Test">')).toBe(false);
  });

  it('should handle non-string input', () => {
    expect(isDangerousHtml(null as any)).toBe(false);
    expect(isDangerousHtml(undefined as any)).toBe(false);
    expect(isDangerousHtml(123 as any)).toBe(false);
  });

  it('should handle empty string', () => {
    expect(isDangerousHtml('')).toBe(false);
  });
});

// =============================================================================
// stripHtml Tests
// =============================================================================

describe('stripHtml', () => {
  it('should remove all HTML tags', () => {
    const html = '<p>Hello <strong>world</strong></p>';
    const result = stripHtml(html);
    expect(result).toBe('Hello world');
  });

  it('should remove nested tags', () => {
    const html = '<div><p>Nested <em>content</em></p></div>';
    const result = stripHtml(html);
    expect(result).toBe('Nested content');
  });

  it('should handle lists', () => {
    const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
    const result = stripHtml(html);
    expect(result).toContain('Item 1');
    expect(result).toContain('Item 2');
  });

  it('should sanitize before stripping', () => {
    const malicious = '<p>Safe</p><script>alert("XSS")</script>';
    const result = stripHtml(malicious);
    expect(result).toBe('Safe');
    expect(result).not.toContain('alert');
  });

  it('should handle non-string input', () => {
    expect(stripHtml(null as any)).toBe('');
    expect(stripHtml(undefined as any)).toBe('');
    expect(stripHtml(123 as any)).toBe('');
  });

  it('should handle empty string', () => {
    expect(stripHtml('')).toBe('');
  });

  it('should handle plain text', () => {
    const plain = 'Just plain text';
    const result = stripHtml(plain);
    expect(result).toBe('Just plain text');
  });

  it('should preserve text content order', () => {
    const html = '<h1>Title</h1><p>First paragraph</p><p>Second paragraph</p>';
    const result = stripHtml(html);
    expect(result).toContain('Title');
    expect(result).toContain('First paragraph');
    expect(result).toContain('Second paragraph');
  });
});
