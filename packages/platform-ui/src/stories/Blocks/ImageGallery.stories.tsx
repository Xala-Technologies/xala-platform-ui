import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ImageGallery } from '../../blocks/ImageGallery';

const meta: Meta<typeof ImageGallery> = {
  title: 'Blocks/ImageGallery',
  component: ImageGallery,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ImageGallery

Hero image with vertical thumbnail sidebar for resource detail pages. Displays main image on left (~70%) with vertical thumbnails on right (~30%).

### Features
- Main hero image display
- Vertical thumbnail sidebar
- Image counter badge
- Click handlers
- Customizable height
- Max thumbnails limit

### Usage
\`\`\`tsx
<ImageGallery
  images={[
    { id: '1', src: '/img1.jpg', alt: 'Image 1' },
    { id: '2', src: '/img2.jpg', alt: 'Image 2' },
  ]}
  showCounter={true}
  height={500}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onImageClick: fn(),
  },
  argTypes: {
    showCounter: {
      control: 'boolean',
      description: 'Show image counter badge',
    },
    height: {
      control: 'number',
      description: 'Gallery height',
    },
    maxThumbnails: {
      control: 'number',
      description: 'Maximum thumbnails to show',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images
const sampleImages = [
  { id: '1', src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { id: '2', src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
  { id: '3', src: 'https://picsum.photos/800/600?random=3', alt: 'Image 3' },
  { id: '4', src: 'https://picsum.photos/800/600?random=4', alt: 'Image 4' },
];

// Basic gallery
export const Default: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    showCounter: true,
    height: 500,
    maxThumbnails: 3,
  },
};

// Single image
export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    showCounter: false,
    height: 500,
  },
};

// Many images
export const ManyImages: Story = {
  args: {
    images: sampleImages,
    showCounter: true,
    height: 500,
    maxThumbnails: 3,
  },
};

// Without counter
export const WithoutCounter: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    showCounter: false,
    height: 500,
    maxThumbnails: 3,
  },
};

// Custom height
export const CustomHeight: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    showCounter: true,
    height: 600,
    maxThumbnails: 3,
  },
};

// Limited thumbnails
export const LimitedThumbnails: Story = {
  args: {
    images: sampleImages,
    showCounter: true,
    height: 500,
    maxThumbnails: 2,
  },
};

// With initial index
export const WithInitialIndex: Story = {
  args: {
    images: sampleImages,
    initialIndex: 2,
    showCounter: true,
    height: 500,
    maxThumbnails: 3,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    images: [],
    showCounter: false,
    height: 500,
  },
};
