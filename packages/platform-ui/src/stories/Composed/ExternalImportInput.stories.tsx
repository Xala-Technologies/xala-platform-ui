import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ExternalImportInput } from '../../composed/ExternalImportInput';
import type { ImportSource, ImportStatus } from '../../composed/ExternalImportInput';

const meta: Meta<typeof ExternalImportInput> = {
  title: 'Composed/ExternalImportInput',
  component: ExternalImportInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ExternalImportInput

Input for external booking system URL import.
Validates URLs and provides preview of import source.

### Features
- URL input with validation
- Loading/valid/invalid states
- Import preview with item count
- Async validation handler

### Accessibility
- Labeled input via Fieldset
- Status via icon + text (not color-only)
- Error messages linked to input
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper
function ControlledInput({
  initialValue = '',
  validateDelay = 1000,
  shouldSucceed = true,
}: {
  initialValue?: string;
  validateDelay?: number;
  shouldSucceed?: boolean;
}) {
  const [url, setUrl] = useState(initialValue);

  const handleValidate = async (inputUrl: string): Promise<ImportSource | null> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, validateDelay));

    if (shouldSucceed && inputUrl.includes('http')) {
      return {
        name: 'Aktivby Booking',
        url: inputUrl,
        itemCount: 24,
        description: 'Kommunale idrettshaller og svømmehaller',
      };
    }
    return null;
  };

  const handleImport = (source: ImportSource) => {
    console.log('Importing:', source);
    alert(`Importerer ${source.itemCount} elementer fra ${source.name}`);
  };

  return (
    <div style={{ width: 450 }}>
      <ExternalImportInput
        value={url}
        onChange={setUrl}
        onValidate={handleValidate}
        onImport={handleImport}
        supportedPatterns={['Aktivby', 'IBOOKING', 'ActiveCity']}
      />
    </div>
  );
}

// Empty
export const Default: Story = {
  render: () => <ControlledInput />,
};

// With URL
export const WithUrl: Story = {
  render: () => <ControlledInput initialValue="https://aktivby.kommune.no/api/locations" />,
};

// Success validation
export const Validated: Story = {
  render: () => (
    <ControlledInput initialValue="https://aktivby.kommune.no/api/locations" validateDelay={500} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Click "Valider" to see successful validation.',
      },
    },
  },
};

// Failed validation
export const ValidationFails: Story = {
  render: () => <ControlledInput initialValue="invalid-url" shouldSucceed={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Click "Valider" to see failed validation.',
      },
    },
  },
};

// English labels
export const EnglishLabels: Story = {
  render: () => {
    function EnglishImport() {
      const [url, setUrl] = useState('');

      return (
        <div style={{ width: 450 }}>
          <ExternalImportInput
            value={url}
            onChange={setUrl}
            labels={{
              label: 'External URL',
              helperText: 'Paste URL from external booking system',
              placeholder: 'https://...',
              validate: 'Validate',
              validating: 'Validating...',
              import: 'Import',
              validUrl: 'URL validated',
              invalidUrl: 'Invalid URL',
              previewTitle: 'Import Preview',
              itemsToImport: 'items to import',
            }}
            supportedPatterns={['Aktivby', 'IBOOKING']}
          />
        </div>
      );
    }

    return <EnglishImport />;
  },
};
