/**
 * ContactPersonsEditor Component
 *
 * Add/edit/remove contact persons for a resource.
 * Each contact has name, role, phone, and email.
 *
 * @example
 * ```tsx
 * import { ContactPersonsEditor } from '@xala-technologies/platform/ui';
 *
 * const [contacts, setContacts] = useState([
 *   { id: '1', name: 'Ola Nordmann', role: 'Ansvarlig', phone: '12345678', email: 'ola@example.no' },
 * ]);
 *
 * <ContactPersonsEditor
 *   contacts={contacts}
 *   onChange={setContacts}
 * />
 * ```
 */

import * as React from 'react';
import { Button, Textfield, Fieldset, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export interface ContactPerson {
  /** Unique identifier */
  id: string;
  /** Contact name */
  name: string;
  /** Contact role/title */
  role?: string;
  /** Phone number */
  phone?: string;
  /** Email address */
  email?: string;
  /** Is this the primary contact */
  isPrimary?: boolean;
}

export interface ContactPersonsEditorLabels {
  /** Fieldset legend */
  legend?: string;
  /** Helper text */
  helperText?: string;
  /** Field labels */
  name?: string;
  role?: string;
  phone?: string;
  email?: string;
  /** Actions */
  addContact?: string;
  remove?: string;
  setPrimary?: string;
  /** Placeholders */
  namePlaceholder?: string;
  rolePlaceholder?: string;
  phonePlaceholder?: string;
  emailPlaceholder?: string;
  /** Empty state */
  emptyMessage?: string;
  /** Primary badge */
  primaryBadge?: string;
}

export interface ContactPersonsEditorProps {
  /** Current contacts */
  contacts: ContactPerson[];
  /** Change handler */
  onChange: (contacts: ContactPerson[]) => void;
  /** Maximum number of contacts */
  maxContacts?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Localization labels */
  labels?: ContactPersonsEditorLabels;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<ContactPersonsEditorLabels> = {
  legend: 'Kontaktpersoner',
  helperText: 'Legg til kontaktpersoner for denne ressursen',
  name: 'Navn',
  role: 'Rolle',
  phone: 'Telefon',
  email: 'E-post',
  addContact: '+ Legg til kontakt',
  remove: 'Fjern',
  setPrimary: 'Sett som hovedkontakt',
  namePlaceholder: 'Fullt navn',
  rolePlaceholder: 'F.eks. Ansvarlig, Vaktmester',
  phonePlaceholder: '+47 123 45 678',
  emailPlaceholder: 'navn@eksempel.no',
  emptyMessage: 'Ingen kontaktpersoner lagt til',
  primaryBadge: 'Hovedkontakt',
};

// =============================================================================
// Utility
// =============================================================================

const generateId = (): string => `contact-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// =============================================================================
// Component
// =============================================================================

/**
 * ContactPersonsEditor provides add/edit/remove for contact persons.
 *
 * Accessibility:
 * - Fieldset with legend for grouping
 * - Labeled inputs
 * - Keyboard navigation
 */
export function ContactPersonsEditor({
  contacts,
  onChange,
  maxContacts,
  disabled = false,
  labels: customLabels,
  className,
}: ContactPersonsEditorProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const canAddMore = maxContacts === undefined || contacts.length < maxContacts;

  const handleAddContact = () => {
    if (!canAddMore) return;

    const newContact: ContactPerson = {
      id: generateId(),
      name: '',
      role: '',
      phone: '',
      email: '',
      isPrimary: contacts.length === 0, // First contact is primary by default
    };
    onChange([...contacts, newContact]);
  };

  const handleRemoveContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    // If removed contact was primary, make first remaining contact primary
    if (updated.length > 0 && !updated.some((c) => c.isPrimary)) {
      updated[0].isPrimary = true;
    }
    onChange(updated);
  };

  const handleUpdateContact = (id: string, field: keyof ContactPerson, value: string | boolean) => {
    onChange(
      contacts.map((contact) => (contact.id === id ? { ...contact, [field]: value } : contact))
    );
  };

  const handleSetPrimary = (id: string) => {
    onChange(
      contacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      }))
    );
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const contactCardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
    padding: 'var(--ds-spacing-4)',
    backgroundColor: 'var(--ds-color-neutral-surface-default)',
    borderRadius: 'var(--ds-border-radius-md)',
    border: '1px solid var(--ds-color-neutral-border-subtle)',
    position: 'relative',
  };

  const primaryBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'var(--ds-spacing-2)',
    right: 'var(--ds-spacing-2)',
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    backgroundColor: 'var(--ds-color-accent-surface-default)',
    color: 'var(--ds-color-accent-text-default)',
    borderRadius: 'var(--ds-border-radius-full)',
    fontSize: 'var(--ds-font-size-xs)',
    fontWeight: 'var(--ds-font-weight-medium)',
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--ds-spacing-3)',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    justifyContent: 'flex-end',
    paddingTop: 'var(--ds-spacing-2)',
    borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
  };

  return (
    <Fieldset className={cn('contact-persons-editor', className)}>
      <Fieldset.Legend>{labels.legend}</Fieldset.Legend>
      <Fieldset.Description>{labels.helperText}</Fieldset.Description>

      <div style={containerStyle}>
        {contacts.length === 0 && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              padding: 'var(--ds-spacing-4)',
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
              backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            {labels.emptyMessage}
          </Paragraph>
        )}

        {contacts.map((contact, index) => {
          const nameId = `contact-${contact.id}-name`;
          const roleId = `contact-${contact.id}-role`;
          const phoneId = `contact-${contact.id}-phone`;
          const emailId = `contact-${contact.id}-email`;

          return (
            <div
              key={contact.id}
              style={contactCardStyle}
              role="group"
              aria-label={`Kontakt ${index + 1}: ${contact.name || 'Ny kontakt'}`}
            >
              {contact.isPrimary && <span style={primaryBadgeStyle}>{labels.primaryBadge}</span>}

              <div style={rowStyle}>
                <div>
                  <Textfield
                    id={nameId}
                    label={labels.name}
                    value={contact.name}
                    onChange={(e) => handleUpdateContact(contact.id, 'name', e.target.value)}
                    placeholder={labels.namePlaceholder}
                    disabled={disabled}
                    data-size="sm"
                  />
                </div>

                <div>
                  <Textfield
                    id={roleId}
                    label={labels.role}
                    value={contact.role || ''}
                    onChange={(e) => handleUpdateContact(contact.id, 'role', e.target.value)}
                    placeholder={labels.rolePlaceholder}
                    disabled={disabled}
                    data-size="sm"
                  />
                </div>
              </div>

              <div style={rowStyle}>
                <div>
                  <Textfield
                    id={phoneId}
                    label={labels.phone}
                    type="tel"
                    value={contact.phone || ''}
                    onChange={(e) => handleUpdateContact(contact.id, 'phone', e.target.value)}
                    placeholder={labels.phonePlaceholder}
                    disabled={disabled}
                    data-size="sm"
                  />
                </div>

                <div>
                  <Textfield
                    id={emailId}
                    label={labels.email}
                    type="email"
                    value={contact.email || ''}
                    onChange={(e) => handleUpdateContact(contact.id, 'email', e.target.value)}
                    placeholder={labels.emailPlaceholder}
                    disabled={disabled}
                    data-size="sm"
                  />
                </div>
              </div>

              <div style={actionsStyle}>
                {!contact.isPrimary && contacts.length > 1 && (
                  <Button
                    variant="tertiary"
                    data-size="sm"
                    onClick={() => handleSetPrimary(contact.id)}
                    disabled={disabled}
                  >
                    {labels.setPrimary}
                  </Button>
                )}

                <Button
                  variant="tertiary"
                  data-size="sm"
                  data-color="danger"
                  onClick={() => handleRemoveContact(contact.id)}
                  disabled={disabled}
                  aria-label={`${labels.remove} ${contact.name || `kontakt ${index + 1}`}`}
                >
                  {labels.remove}
                </Button>
              </div>
            </div>
          );
        })}

        {canAddMore && (
          <Button
            variant="secondary"
            data-size="sm"
            onClick={handleAddContact}
            disabled={disabled}
            style={{ alignSelf: 'flex-start' }}
          >
            {labels.addContact}
          </Button>
        )}
      </div>
    </Fieldset>
  );
}

ContactPersonsEditor.displayName = 'ContactPersonsEditor';
