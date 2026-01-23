import type { Meta, StoryObj } from '@storybook/react';
import { ContactInfoCard } from '../../blocks/ContactInfoCard';

const meta: Meta<typeof ContactInfoCard> = {
  title: 'Blocks/ContactInfoCard',
  component: ContactInfoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ContactInfoCard

Card displaying contact information with email and phone. Supports email, phone, website, and contact person name.

### Features
- Email with mailto link
- Phone with tel link
- Website link
- Contact person name
- Icon indicators
- Customizable title

### Usage
\`\`\`tsx
<ContactInfoCard
  email="kontakt@platform.example.com"
  phone="+47 12 34 56 78"
  website="https://example.com"
  contactName="John Doe"
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Complete contact info
export const Complete: Story = {
  args: {
    email: 'kontakt@platform.example.com',
    phone: '+47 12 34 56 78',
    website: 'https://example.com',
    contactName: 'John Doe',
    title: 'Kontaktinformasjon',
  },
};

// Email only
export const EmailOnly: Story = {
  args: {
    email: 'kontakt@platform.example.com',
    title: 'Kontaktinformasjon',
  },
};

// Phone only
export const PhoneOnly: Story = {
  args: {
    phone: '+47 12 34 56 78',
    title: 'Kontaktinformasjon',
  },
};

// Email and phone
export const EmailAndPhone: Story = {
  args: {
    email: 'kontakt@platform.example.com',
    phone: '+47 12 34 56 78',
    title: 'Kontaktinformasjon',
  },
};

// With contact name
export const WithContactName: Story = {
  args: {
    email: 'kontakt@platform.example.com',
    phone: '+47 12 34 56 78',
    contactName: 'Jane Smith',
    title: 'Kontaktinformasjon',
  },
};

// With website
export const WithWebsite: Story = {
  args: {
    email: 'kontakt@platform.example.com',
    phone: '+47 12 34 56 78',
    website: 'https://example.com',
    title: 'Kontaktinformasjon',
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    email: 'kontakt@platform.example.com',
    phone: '+47 12 34 56 78',
  },
};

// Contact name only
export const ContactNameOnly: Story = {
  args: {
    contactName: 'John Doe',
    title: 'Kontaktinformasjon',
  },
};
