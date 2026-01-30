import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { Transition, Fade, Slide, Scale, Collapse } from '../../composed';

const meta: Meta<typeof Transition> = {
  title: 'Composed/Transition',
  component: Transition,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Transition Components

A comprehensive set of animation components for smooth enter/exit transitions. All components respect \`prefers-reduced-motion\` for accessibility.

### Available Components

- **Transition**: Generic wrapper with configurable enter/exit styles
- **Fade**: Opacity-based fade in/out animations
- **Slide**: Directional sliding animations (left, right, up, down)
- **Scale**: Grow/shrink scale animations
- **Collapse**: Height-based collapse/expand animations

### Features

- Uses design tokens for duration and easing
- Respects \`prefers-reduced-motion\` media query
- Lifecycle callbacks (onEnter, onEntered, onExit, onExited)
- Optional unmount on exit
- Configurable timing and easing

### Usage

\`\`\`tsx
// Fade animation
<Fade show={isVisible}>
  <Card>Content that fades in/out</Card>
</Fade>

// Slide animation
<Slide show={isVisible} direction="left" duration="fast">
  <Card>Content that slides in from left</Card>
</Slide>

// Scale animation
<Scale show={isVisible} initialScale={0.9}>
  <Card>Content that scales up</Card>
</Scale>

// Collapse animation
<Collapse show={isExpanded}>
  <Paragraph>Content that collapses/expands</Paragraph>
</Collapse>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// FADE STORIES
// =============================================================================

const FadeDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Button onClick={() => setShow(!show)} data-size="medium">
        {show ? 'Hide' : 'Show'} Content
      </Button>
      <Fade show={show}>
        <Card data-color="neutral" data-size="medium">
          <Heading level={3} data-size="small">
            Fade Animation
          </Heading>
          <Paragraph data-size="medium">
            This content fades in and out smoothly using opacity transitions.
          </Paragraph>
        </Card>
      </Fade>
    </div>
  );
};

export const FadeAnimation: Story = {
  render: () => <FadeDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Simple fade in/out animation using opacity. Ideal for tooltips and overlays.',
      },
    },
  },
};

// =============================================================================
// SLIDE STORIES
// =============================================================================

const SlideDemo = () => {
  const [show, setShow] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('left');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Button onClick={() => setShow(!show)} data-size="medium">
          {show ? 'Hide' : 'Show'}
        </Button>
        <Button onClick={() => setDirection('left')} data-size="small" data-color="neutral">
          Left
        </Button>
        <Button onClick={() => setDirection('right')} data-size="small" data-color="neutral">
          Right
        </Button>
        <Button onClick={() => setDirection('up')} data-size="small" data-color="neutral">
          Up
        </Button>
        <Button onClick={() => setDirection('down')} data-size="small" data-color="neutral">
          Down
        </Button>
      </div>
      <Slide show={show} direction={direction} duration="normal">
        <Card data-color="accent" data-size="medium">
          <Heading level={3} data-size="small">
            Slide {direction.charAt(0).toUpperCase() + direction.slice(1)}
          </Heading>
          <Paragraph data-size="medium">
            This content slides in from the {direction} with transform animations.
          </Paragraph>
        </Card>
      </Slide>
    </div>
  );
};

export const SlideAnimation: Story = {
  render: () => <SlideDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Directional sliding animations. Choose from left, right, up, or down. Perfect for drawers and panels.',
      },
    },
  },
};

// =============================================================================
// SCALE STORIES
// =============================================================================

const ScaleDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Button onClick={() => setShow(!show)} data-size="medium">
        {show ? 'Hide' : 'Show'} Content
      </Button>
      <Scale show={show} initialScale={0.9} duration="fast">
        <Card data-color="success" data-size="medium">
          <Heading level={3} data-size="small">
            Scale Animation
          </Heading>
          <Paragraph data-size="medium">
            This content scales up from 90% to 100% with smooth easing.
          </Paragraph>
        </Card>
      </Scale>
    </div>
  );
};

export const ScaleAnimation: Story = {
  render: () => <ScaleDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Scale animations for grow/shrink effects. Configurable initial scale value. Great for modals and popovers.',
      },
    },
  },
};

// =============================================================================
// COLLAPSE STORIES
// =============================================================================

const CollapseDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Button onClick={() => setShow(!show)} data-size="medium">
        {show ? 'Collapse' : 'Expand'} Content
      </Button>
      <Collapse show={show} duration="normal">
        <Card data-color="info" data-size="medium">
          <Heading level={3} data-size="small">
            Collapsible Content
          </Heading>
          <Paragraph data-size="medium">
            This content smoothly collapses and expands by animating the height property. The height
            automatically adjusts to fit the content.
          </Paragraph>
          <Paragraph data-size="medium">
            Perfect for accordion panels, expandable sections, and progressive disclosure patterns.
          </Paragraph>
        </Card>
      </Collapse>
    </div>
  );
};

export const CollapseAnimation: Story = {
  render: () => <CollapseDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Height-based collapse/expand animations. Automatically measures content height. Ideal for accordions and expandable sections.',
      },
    },
  },
};

// =============================================================================
// ADVANCED EXAMPLES
// =============================================================================

const CombinedDemo = () => {
  const [showFade, setShowFade] = useState(true);
  const [showSlide, setShowSlide] = useState(true);
  const [showScale, setShowScale] = useState(true);
  const [showCollapse, setShowCollapse] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--ds-spacing-2)',
        }}
      >
        <Button onClick={() => setShowFade(!showFade)} data-size="small">
          Toggle Fade
        </Button>
        <Button onClick={() => setShowSlide(!showSlide)} data-size="small">
          Toggle Slide
        </Button>
        <Button onClick={() => setShowScale(!showScale)} data-size="small">
          Toggle Scale
        </Button>
        <Button onClick={() => setShowCollapse(!showCollapse)} data-size="small">
          Toggle Collapse
        </Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--ds-spacing-3)',
          minWidth: '600px',
        }}
      >
        <Fade show={showFade}>
          <Card data-color="neutral" data-size="small">
            <Heading level={4} data-size="xsmall">
              Fade
            </Heading>
            <Paragraph data-size="small">Opacity transition</Paragraph>
          </Card>
        </Fade>

        <Slide show={showSlide} direction="right" duration="fast">
          <Card data-color="accent" data-size="small">
            <Heading level={4} data-size="xsmall">
              Slide
            </Heading>
            <Paragraph data-size="small">Transform slide</Paragraph>
          </Card>
        </Slide>

        <Scale show={showScale} initialScale={0.85} duration="fast">
          <Card data-color="success" data-size="small">
            <Heading level={4} data-size="xsmall">
              Scale
            </Heading>
            <Paragraph data-size="small">Scale transform</Paragraph>
          </Card>
        </Scale>

        <div>
          <Collapse show={showCollapse}>
            <Card data-color="info" data-size="small">
              <Heading level={4} data-size="xsmall">
                Collapse
              </Heading>
              <Paragraph data-size="small">Height animation</Paragraph>
            </Card>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export const CombinedAnimations: Story = {
  render: () => <CombinedDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple animation types working together. Each can be toggled independently.',
      },
    },
  },
};

// =============================================================================
// DURATION VARIATIONS
// =============================================================================

const DurationDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Button onClick={() => setShow(!show)} data-size="medium">
        {show ? 'Hide' : 'Show'} All
      </Button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--ds-spacing-3)',
          minWidth: '700px',
        }}
      >
        <Fade show={show} duration="fast">
          <Card data-color="neutral" data-size="small">
            <Heading level={4} data-size="xsmall">
              Fast (150ms)
            </Heading>
            <Paragraph data-size="small">Quick fade</Paragraph>
          </Card>
        </Fade>

        <Fade show={show} duration="normal">
          <Card data-color="accent" data-size="small">
            <Heading level={4} data-size="xsmall">
              Normal (300ms)
            </Heading>
            <Paragraph data-size="small">Standard fade</Paragraph>
          </Card>
        </Fade>

        <Fade show={show} duration="slow">
          <Card data-color="success" data-size="small">
            <Heading level={4} data-size="xsmall">
              Slow (500ms)
            </Heading>
            <Paragraph data-size="small">Leisurely fade</Paragraph>
          </Card>
        </Fade>
      </div>
    </div>
  );
};

export const DurationVariations: Story = {
  render: () => <DurationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Animation durations from design tokens: fast (150ms), normal (300ms), slow (500ms). All respect reduced-motion preferences.',
      },
    },
  },
};

// =============================================================================
// UNMOUNT ON EXIT
// =============================================================================

const UnmountDemo = () => {
  const [showKeep, setShowKeep] = useState(true);
  const [showUnmount, setShowUnmount] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Button onClick={() => setShowKeep(!showKeep)} data-size="medium">
          Toggle Keep
        </Button>
        <Button onClick={() => setShowUnmount(!showUnmount)} data-size="medium">
          Toggle Unmount
        </Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--ds-spacing-3)',
          minWidth: '600px',
        }}
      >
        <Fade show={showKeep} unmountOnExit={false}>
          <Card data-color="neutral" data-size="medium">
            <Heading level={4} data-size="small">
              Kept in DOM
            </Heading>
            <Paragraph data-size="small">
              This element stays in the DOM when hidden. Check DevTools to see it with opacity: 0.
            </Paragraph>
          </Card>
        </Fade>

        <Fade show={showUnmount} unmountOnExit={true}>
          <Card data-color="accent" data-size="medium">
            <Heading level={4} data-size="small">
              Unmounted
            </Heading>
            <Paragraph data-size="small">
              This element is removed from the DOM when hidden. Check DevTools to confirm removal.
            </Paragraph>
          </Card>
        </Fade>
      </div>
    </div>
  );
};

export const UnmountOnExit: Story = {
  render: () => <UnmountDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Compare behavior with unmountOnExit. Left card stays in DOM (default), right card is removed when hidden.',
      },
    },
  },
};

// =============================================================================
// REDUCED MOTION
// =============================================================================

const ReducedMotionDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Button onClick={() => setShow(!show)} data-size="medium">
        {show ? 'Hide' : 'Show'} Content
      </Button>

      <Card data-color="warning" data-size="medium">
        <Heading level={4} data-size="small">
          Accessibility Note
        </Heading>
        <Paragraph data-size="medium">
          All transition components automatically respect the prefers-reduced-motion media query.
          When reduced motion is enabled in system settings, animations happen instantly without
          visual motion.
        </Paragraph>
        <Paragraph data-size="small">
          Try enabling &quot;Reduce Motion&quot; in your OS accessibility settings to see instant
          transitions.
        </Paragraph>
      </Card>

      <Slide show={show} direction="up" duration="normal">
        <Card data-color="info" data-size="medium">
          <Heading level={4} data-size="small">
            Animated Content
          </Heading>
          <Paragraph data-size="medium">
            This content will slide up with animation, or appear instantly if reduced motion is
            enabled.
          </Paragraph>
        </Card>
      </Slide>
    </div>
  );
};

export const ReducedMotion: Story = {
  render: () => <ReducedMotionDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'All animations respect prefers-reduced-motion. Enable "Reduce Motion" in your OS settings to test.',
      },
    },
  },
};

// =============================================================================
// LIFECYCLE CALLBACKS
// =============================================================================

const CallbackDemo = () => {
  const [show, setShow] = useState(true);
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    setEvents((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${event}`]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Button onClick={() => setShow(!show)} data-size="medium">
        {show ? 'Hide' : 'Show'} Content
      </Button>

      <Fade
        show={show}
        duration="normal"
        onEnter={() => addEvent('onEnter - Starting fade in')}
        onEntered={() => addEvent('onEntered - Fade in complete')}
        onExit={() => addEvent('onExit - Starting fade out')}
        onExited={() => addEvent('onExited - Fade out complete')}
      >
        <Card data-color="success" data-size="medium">
          <Heading level={4} data-size="small">
            Animated Content
          </Heading>
          <Paragraph data-size="medium">
            Watch the event log below to see lifecycle callbacks in action.
          </Paragraph>
        </Card>
      </Fade>

      <Card data-color="neutral" data-size="medium">
        <Heading level={4} data-size="small">
          Event Log
        </Heading>
        <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
          {events.length === 0 ? (
            <Paragraph data-size="small">No events yet. Toggle the content above.</Paragraph>
          ) : (
            events.map((event, index) => (
              <div key={index} style={{ padding: 'var(--ds-spacing-1)' }}>
                {event}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export const LifecycleCallbacks: Story = {
  render: () => <CallbackDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Lifecycle callbacks fire at different stages: onEnter (start), onEntered (complete), onExit (start), onExited (complete).',
      },
    },
  },
};
