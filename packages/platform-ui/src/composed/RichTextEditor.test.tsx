/**
 * Integration Tests for RichTextEditor XSS Protection
 *
 * Validates that the RichTextEditor component properly sanitizes input
 * to prevent XSS attacks while preserving safe rich text formatting.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RichTextEditor } from './RichTextEditor';

describe('RichTextEditor XSS Protection', () => {
  // =============================================================================
  // Script Tag Injection Protection
  // =============================================================================

  describe('script tag injection protection', () => {
    it('should block basic script tags in value prop', () => {
      const maliciousValue = '<p>Safe text</p><script>alert("XSS")</script>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor).toBeInTheDocument();
      expect(editor?.innerHTML).toContain('Safe text');
      expect(editor?.innerHTML).not.toContain('<script');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block script tags with different casings', () => {
      const maliciousValue = '<p>Text</p><ScRiPt>alert("XSS")</ScRiPt>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('script');
      expect(editor?.innerHTML).not.toContain('ScRiPt');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block script tags with attributes', () => {
      const maliciousValue = '<script type="text/javascript">alert("XSS")</script>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('<script');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block nested script tags', () => {
      const maliciousValue = '<div><p>Text</p><script>alert("XSS")</script></div>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('<script');
      expect(editor?.innerHTML).not.toContain('alert');
    });
  });

  // =============================================================================
  // Event Handler Attributes Protection
  // =============================================================================

  describe('event handler attributes protection', () => {
    it('should block onclick handlers', () => {
      const maliciousValue = '<button onclick="alert(\'XSS\')">Click me</button>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onclick');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block onerror handlers on images', () => {
      const maliciousValue = '<img src="x" onerror="alert(\'XSS\')">';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onerror');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block onload handlers', () => {
      const maliciousValue = '<body onload="alert(\'XSS\')">Content</body>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onload');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block onmouseover handlers', () => {
      const maliciousValue = '<div onmouseover="alert(\'XSS\')">Hover me</div>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onmouseover');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block onfocus handlers', () => {
      const maliciousValue = '<input onfocus="alert(\'XSS\')" value="test">';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onfocus');
      expect(editor?.innerHTML).not.toContain('alert');
    });
  });

  // =============================================================================
  // JavaScript URLs Protection
  // =============================================================================

  describe('javascript: URLs protection', () => {
    it('should block javascript: URLs in links', () => {
      const maliciousValue = '<a href="javascript:alert(\'XSS\')">Click me</a>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('javascript:');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block javascript: URLs with different casings', () => {
      const maliciousValue = '<a href="JaVaScRiPt:alert(\'XSS\')">Click me</a>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('javascript:');
      expect(editor?.innerHTML).not.toContain('JaVaScRiPt:');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block javascript: URLs in iframes', () => {
      const maliciousValue = '<iframe src="javascript:alert(\'XSS\')"></iframe>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('javascript:');
      expect(editor?.innerHTML).not.toContain('alert');
      expect(editor?.innerHTML).not.toContain('iframe');
    });
  });

  // =============================================================================
  // Data URIs Protection
  // =============================================================================

  describe('data: URIs protection', () => {
    it('should block data:text/html URIs with scripts', () => {
      const maliciousValue = '<iframe src="data:text/html,<script>alert(\'XSS\')</script>"></iframe>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('data:text/html');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block data URLs in links', () => {
      const maliciousValue = '<a href="data:text/html,<script>alert(\'XSS\')</script>">Click</a>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should allow safe data: URIs for images', () => {
      const safeValue =
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Red dot">';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('data:image/png');
    });
  });

  // =============================================================================
  // Advanced XSS Techniques Protection
  // =============================================================================

  describe('advanced XSS techniques protection', () => {
    it('should block svg with embedded scripts', () => {
      const maliciousValue = '<svg onload="alert(\'XSS\')"></svg>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onload');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block meta refresh redirects', () => {
      const maliciousValue = '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\')">';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('meta');
      expect(editor?.innerHTML).not.toContain('javascript:');
    });

    it('should block object tags', () => {
      const maliciousValue = '<object data="javascript:alert(\'XSS\')"></object>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('object');
      expect(editor?.innerHTML).not.toContain('javascript:');
    });

    it('should block embed tags', () => {
      const maliciousValue = '<embed src="javascript:alert(\'XSS\')">';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('embed');
      expect(editor?.innerHTML).not.toContain('javascript:');
    });

    it('should block form tags', () => {
      const maliciousValue =
        '<form action="javascript:alert(\'XSS\')"><input type="submit"></form>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('form');
      expect(editor?.innerHTML).not.toContain('javascript:');
    });

    it('should block style tags with expressions', () => {
      const maliciousValue = '<style>body { background: url("javascript:alert(\'XSS\')") }</style>';
      const { container } = render(<RichTextEditor value={maliciousValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('<style');
      expect(editor?.innerHTML).not.toContain('javascript:');
    });
  });

  // =============================================================================
  // Safe HTML Preservation
  // =============================================================================

  describe('safe HTML preservation', () => {
    it('should preserve paragraph tags', () => {
      const safeValue = '<p>This is a paragraph</p>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<p>This is a paragraph</p>');
    });

    it('should preserve strong (bold) tags', () => {
      const safeValue = '<p><strong>Bold text</strong></p>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<p><strong>Bold text</strong></p>');
    });

    it('should preserve em (italic) tags', () => {
      const safeValue = '<p><em>Italic text</em></p>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<p><em>Italic text</em></p>');
    });

    it('should preserve combined formatting', () => {
      const safeValue = '<p><strong>Bold</strong> and <em>italic</em> and <u>underlined</u></p>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('<strong>Bold</strong>');
      expect(editor?.innerHTML).toContain('<em>italic</em>');
      expect(editor?.innerHTML).toContain('<u>underlined</u>');
    });

    it('should preserve unordered lists', () => {
      const safeValue = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('<ul>');
      expect(editor?.innerHTML).toContain('<li>Item 1</li>');
      expect(editor?.innerHTML).toContain('<li>Item 2</li>');
      expect(editor?.innerHTML).toContain('</ul>');
    });

    it('should preserve ordered lists', () => {
      const safeValue = '<ol><li>First</li><li>Second</li></ol>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('<ol>');
      expect(editor?.innerHTML).toContain('<li>First</li>');
      expect(editor?.innerHTML).toContain('<li>Second</li>');
      expect(editor?.innerHTML).toContain('</ol>');
    });

    it('should preserve all heading levels', () => {
      const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      headings.forEach((tag) => {
        const safeValue = `<${tag}>Heading</${tag}>`;
        const { container } = render(<RichTextEditor value={safeValue} />);

        const editor = container.querySelector('[contenteditable]');
        expect(editor?.innerHTML).toBe(safeValue);
      });
    });

    it('should preserve blockquotes', () => {
      const safeValue = '<blockquote>This is a quote</blockquote>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<blockquote>This is a quote</blockquote>');
    });

    it('should preserve pre tags', () => {
      const safeValue = '<pre>Preformatted text</pre>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<pre>Preformatted text</pre>');
    });

    it('should preserve code tags', () => {
      const safeValue = '<code>const x = 1;</code>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<code>const x = 1;</code>');
    });

    it('should preserve horizontal rules', () => {
      const safeValue = '<p>Before</p><hr><p>After</p>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('<hr>');
    });

    it('should preserve safe links with href', () => {
      const safeValue = '<a href="https://example.com">Link</a>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('<a href="https://example.com">');
      expect(editor?.innerHTML).toContain('Link');
      expect(editor?.innerHTML).toContain('</a>');
    });

    it('should preserve images with safe attributes', () => {
      const safeValue = '<img src="https://example.com/image.jpg" alt="Description">';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('src="https://example.com/image.jpg"');
      expect(editor?.innerHTML).toContain('alt="Description"');
    });
  });

  // =============================================================================
  // onChange Callback Sanitization
  // =============================================================================

  describe('onChange callback sanitization', () => {
    it('should sanitize output in onChange callback', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = render(<RichTextEditor value="" onChange={onChange} />);

      const editor = container.querySelector('[contenteditable]') as HTMLElement;
      expect(editor).toBeInTheDocument();

      // Simulate typing (contentEditable doesn't support userEvent.type well, so we'll manipulate directly)
      editor.innerHTML = '<p>Safe text</p><script>alert("XSS")</script>';
      editor.dispatchEvent(new Event('input', { bubbles: true }));

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).toContain('Safe text');
      expect(lastCall[0]).not.toContain('<script');
      expect(lastCall[0]).not.toContain('alert');
    });

    it('should sanitize event handlers in onChange output', async () => {
      const onChange = vi.fn();
      const { container } = render(<RichTextEditor value="" onChange={onChange} />);

      const editor = container.querySelector('[contenteditable]') as HTMLElement;

      editor.innerHTML = '<div onclick="alert(\'XSS\')">Click me</div>';
      editor.dispatchEvent(new Event('input', { bubbles: true }));

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).not.toContain('onclick');
      expect(lastCall[0]).not.toContain('alert');
    });

    it('should preserve safe HTML in onChange output', async () => {
      const onChange = vi.fn();
      const { container } = render(<RichTextEditor value="" onChange={onChange} />);

      const editor = container.querySelector('[contenteditable]') as HTMLElement;

      editor.innerHTML = '<p><strong>Bold</strong> and <em>italic</em></p>';
      editor.dispatchEvent(new Event('input', { bubbles: true }));

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });

      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
      expect(lastCall[0]).toContain('<strong>Bold</strong>');
      expect(lastCall[0]).toContain('<em>italic</em>');
    });
  });

  // =============================================================================
  // Value Updates
  // =============================================================================

  describe('value updates', () => {
    it('should sanitize when value prop changes', async () => {
      const { container, rerender } = render(<RichTextEditor value="<p>Initial</p>" />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('<p>Initial</p>');

      // Update with malicious content
      rerender(<RichTextEditor value='<p>Updated</p><script>alert("XSS")</script>' />);

      await waitFor(() => {
        expect(editor?.innerHTML).toContain('Updated');
        expect(editor?.innerHTML).not.toContain('<script');
        expect(editor?.innerHTML).not.toContain('alert');
      });
    });

    it('should handle mixed safe and malicious content in updates', async () => {
      const { container, rerender } = render(<RichTextEditor value="<p>Start</p>" />);

      const editor = container.querySelector('[contenteditable]');

      const mixedContent =
        '<p>Safe paragraph</p><script>alert("XSS")</script><p><strong>Bold text</strong></p><img onerror="alert(1)" src="x">';
      rerender(<RichTextEditor value={mixedContent} />);

      await waitFor(() => {
        const html = editor?.innerHTML || '';
        expect(html).toContain('Safe paragraph');
        expect(html).toContain('<strong>Bold text</strong>');
        expect(html).not.toContain('<script');
        expect(html).not.toContain('onerror');
        expect(html).not.toContain('alert');
      });
    });
  });

  // =============================================================================
  // Edge Cases
  // =============================================================================

  describe('edge cases', () => {
    it('should handle empty value', () => {
      const { container } = render(<RichTextEditor value="" />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor).toBeInTheDocument();
      expect(editor?.innerHTML).toBe('');
    });

    it('should handle undefined value', () => {
      const { container } = render(<RichTextEditor />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor).toBeInTheDocument();
    });

    it('should handle plain text without HTML', () => {
      const { container } = render(<RichTextEditor value="Plain text content" />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toBe('Plain text content');
    });

    it('should handle HTML entities', () => {
      const safeValue = '<p>&lt;script&gt;alert("XSS")&lt;/script&gt;</p>';
      const { container } = render(<RichTextEditor value={safeValue} />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).toContain('&lt;script&gt;');
    });

    it('should render with label', () => {
      render(<RichTextEditor label="Content" value="<p>Text</p>" />);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<RichTextEditor error="This field is required" value="" />);

      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should render with helper text', () => {
      render(<RichTextEditor helperText="Enter your content here" value="" />);

      expect(screen.getByText('Enter your content here')).toBeInTheDocument();
    });

    it('should handle readOnly mode', () => {
      const { container } = render(<RichTextEditor value="<p>Read only</p>" readOnly />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor).toHaveAttribute('contenteditable', 'false');
    });

    it('should handle disabled mode', () => {
      const { container } = render(<RichTextEditor value="<p>Disabled</p>" disabled />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor).toHaveAttribute('contenteditable', 'false');
    });
  });

  // =============================================================================
  // OWASP XSS Attack Vectors
  // =============================================================================

  describe('OWASP XSS attack vectors', () => {
    it('should block OWASP vector: basic script tag', () => {
      const { container } = render(<RichTextEditor value='<script>alert("XSS")</script>' />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block OWASP vector: img onerror', () => {
      const { container } = render(<RichTextEditor value='<img src=x onerror=alert("XSS")>' />);

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onerror');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block OWASP vector: javascript protocol', () => {
      const { container } = render(
        <RichTextEditor value='<a href="javascript:alert(\'XSS\')">Click</a>' />,
      );

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('javascript:');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block OWASP vector: iframe with javascript', () => {
      const { container } = render(
        <RichTextEditor value='<iframe src="javascript:alert(\'XSS\')"></iframe>' />,
      );

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('iframe');
      expect(editor?.innerHTML).not.toContain('javascript:');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block OWASP vector: SVG with embedded script', () => {
      const { container } = render(
        <RichTextEditor value='<svg/onload=alert("XSS")>' />,
      );

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('onload');
      expect(editor?.innerHTML).not.toContain('alert');
    });

    it('should block OWASP vector: base64 encoded script in data URI', () => {
      const { container } = render(
        <RichTextEditor value='<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=">Click</a>' />,
      );

      const editor = container.querySelector('[contenteditable]');
      expect(editor?.innerHTML).not.toContain('PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4');
    });
  });
});
