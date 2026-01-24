import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ImageSlider } from '../../blocks/ImageSlider';

const meta: Meta<typeof ImageSlider> = {
  title: 'Blocks/ImageSlider',
  component: ImageSlider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ImageSlider

Full-width image carousel with navigation, thumbnails, and smooth transitions. Supports keyboard navigation, touch swipe, and fullscreen mode.

### Features
- Navigation arrows
- Dot indicators
- Thumbnail strip
- Image counter
- Fullscreen mode
- Auto-play option
- Keyboard navigation
- Touch swipe support

### Usage
\`\`\`tsx
<ImageSlider
  images={[
    { id: '1', src: '/img1.jpg', alt: 'Image 1' },
    { id: '2', src: '/img2.jpg', alt: 'Image 2' },
  ]}
  showArrows={true}
  showDots={true}
  showThumbnails={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    showDots: {
      control: 'boolean',
      description: 'Show dot indicators',
    },
    showThumbnails: {
      control: 'boolean',
      description: 'Show thumbnail strip',
    },
    showCounter: {
      control: 'boolean',
      description: 'Show image counter',
    },
    enableFullscreen: {
      control: 'boolean',
      description: 'Enable fullscreen on click',
    },
    autoPlay: {
      control: 'number',
      description: 'Auto-play interval in ms (0 to disable)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images
const sampleImages = [
  { id: '1', src: 'https://picsum.photos/1200/600?random=1', alt: 'Image 1' },
  { id: '2', src: 'https://picsum.photos/1200/600?random=2', alt: 'Image 2' },
  { id: '3', src: 'https://picsum.photos/1200/600?random=3', alt: 'Image 3' },
  { id: '4', src: 'https://picsum.photos/1200/600?random=4', alt: 'Image 4' },
];

// Basic slider
export const Default: Story = {
  args: {
    images: sampleImages,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 0,
    height: 500,
  },
};

// Without thumbnails
export const WithoutThumbnails: Story = {
  args: {
    images: sampleImages,
    showArrows: true,
    showDots: true,
    showThumbnails: false,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 0,
    height: 500,
  },
};

// Without dots
export const WithoutDots: Story = {
  args: {
    images: sampleImages,
    showArrows: true,
    showDots: false,
    showThumbnails: true,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 0,
    height: 500,
  },
};

// Without arrows
export const WithoutArrows: Story = {
  args: {
    images: sampleImages,
    showArrows: false,
    showDots: true,
    showThumbnails: true,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 0,
    height: 500,
  },
};

// Minimal (dots only)
export const Minimal: Story = {
  args: {
    images: sampleImages,
    showArrows: false,
    showDots: true,
    showThumbnails: false,
    showCounter: false,
    enableFullscreen: false,
    autoPlay: 0,
    height: 500,
  },
};

// With auto-play
export const WithAutoPlay: Story = {
  args: {
    images: sampleImages,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 3000,
    height: 500,
  },
};

// Custom height
export const CustomHeight: Story = {
  args: {
    images: sampleImages,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 0,
    height: 600,
  },
};

// Single image
export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    showArrows: false,
    showDots: false,
    showThumbnails: false,
    showCounter: false,
    enableFullscreen: true,
    autoPlay: 0,
    height: 500,
  },
};

// With initial index
export const WithInitialIndex: Story = {
  args: {
    images: sampleImages,
    initialIndex: 2,
    showArrows: true,
    showDots: true,
    showThumbnails: true,
    showCounter: true,
    enableFullscreen: true,
    autoPlay: 0,
    height: 500,
  },
};
