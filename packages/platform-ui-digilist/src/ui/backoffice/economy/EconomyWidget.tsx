/**
 * EconomyWidget (GAP-003)
 *
 * Comprehensive invoice management widget with:
 * - Invoice Basis (fakturagrunnlag) management
 * - Sales Documents (salgsbilag) management
 * - Credit Notes (kreditnota) management
 * - Export functionality
 *
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  Tabs,
  Table,
  Badge,
  Spinner,
  Alert,
  FormField,
  Textfield,
  Select,
  Dialog,
  PlusIcon,
  DownloadIcon,
  CheckIcon,
  SendIcon,
  TrashIcon,
  RefreshIcon,
} from '@xala-technologies/platform-ui';
import {
  useInvoiceBases,
  useSalesDocuments,
  useCreditNotes,
  useEconomyStatistics,
  useGenerateFromBookings,
  useApproveInvoiceBasis,
  useFinalizeInvoiceBasis,
  useDeleteInvoiceBasis,
  useSendSalesDocument,
  useMarkAsPaid,
  useDownloadInvoicePdf,
  useCancelSalesDocument,
  useCreateCreditNote,
  useApproveCreditNote,
  useProcessCreditNote,
  useDownloadCreditNotePdf,
  useExportEconomy,
  useSyncToVisma,
} from '@digilist/client-sdk';
import type {
  InvoiceBasis,
  SalesDocument,
  CreditNote,
  InvoiceBasisStatus,
  SalesDocumentStatus,
  CreditNoteStatus,
  EconomyExportParams,
} from '@digilist/client-sdk';

export interface EconomyWidgetProps {
  /** Initial active tab */
  initialTab?: 'invoice-basis' | 'sales-documents' | 'credit-notes' | 'export';
}

// Status badge color mapping
const invoiceBasisStatusColor: Record<InvoiceBasisStatus, 'info' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  draft: 'neutral',
  approved: 'info',
  invoiced: 'success',
  cancelled: 'danger',
};

const salesDocumentStatusColor: Record<SalesDocumentStatus, 'info' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  draft: 'neutral',
  sent: 'info',
  paid: 'success',
  overdue: 'danger',
  cancelled: 'warning',
};

const creditNoteStatusColor: Record<CreditNoteStatus, 'info' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  draft: 'neutral',
  approved: 'info',
  processed: 'success',
  cancelled: 'danger',
};

// Format currency
function formatCurrency(amount: number, currency: string = 'NOK'): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function EconomyWidget({ initialTab = 'invoice-basis' }: EconomyWidgetProps) {
  const t = useT();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [finalizeDialogOpen, setFinalizeDialogOpen] = useState(false);
  const [creditNoteDialogOpen, setCreditNoteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Data queries
  const { data: invoiceBasesData, isLoading: loadingBases, refetch: refetchBases } = useInvoiceBases();
  const { data: salesDocumentsData, isLoading: loadingSales, refetch: refetchSales } = useSalesDocuments();
  const { data: creditNotesData, isLoading: loadingCredits, refetch: refetchCredits } = useCreditNotes();
  const { data: statisticsData } = useEconomyStatistics();

  // Mutations
  const generateFromBookings = useGenerateFromBookings();
  const approveInvoiceBasis = useApproveInvoiceBasis();
  const finalizeInvoiceBasis = useFinalizeInvoiceBasis();
  const deleteInvoiceBasis = useDeleteInvoiceBasis();
  const sendSalesDocument = useSendSalesDocument();
  const markAsPaid = useMarkAsPaid();
  const downloadInvoicePdf = useDownloadInvoicePdf();
  const cancelSalesDocument = useCancelSalesDocument();
  const createCreditNote = useCreateCreditNote();
  const approveCreditNote = useApproveCreditNote();
  const processCreditNote = useProcessCreditNote();
  const downloadCreditNotePdf = useDownloadCreditNotePdf();
  const exportEconomy = useExportEconomy();
  const syncToVisma = useSyncToVisma();

  // Generate form state
  const [generateParams, setGenerateParams] = useState({
    startDate: '',
    endDate: '',
    groupByOrganization: true,
  });

  // Finalize form state
  const [finalizeParams, setFinalizeParams] = useState({
    invoiceDate: new Date().toISOString().split('T')[0],
    paymentTerms: 14,
    syncToVisma: false,
  });

  // Export form state
  const [exportParams, setExportParams] = useState<EconomyExportParams>({
    type: 'invoices',
    format: 'csv',
    startDate: '',
    endDate: '',
  });

  const statistics = statisticsData?.data;
  const invoiceBases = invoiceBasesData?.data ?? [];
  const salesDocuments = salesDocumentsData?.data ?? [];
  const creditNotes = creditNotesData?.data ?? [];

  // Handlers
  const handleGenerateFromBookings = useCallback(async () => {
    await generateFromBookings.mutateAsync({
      startDate: generateParams.startDate || undefined,
      endDate: generateParams.endDate || undefined,
      groupByOrganization: generateParams.groupByOrganization,
    });
    setGenerateDialogOpen(false);
    refetchBases();
  }, [generateFromBookings, generateParams, refetchBases]);

  const handleApproveInvoiceBasis = useCallback(async (id: string) => {
    await approveInvoiceBasis.mutateAsync(id);
    refetchBases();
  }, [approveInvoiceBasis, refetchBases]);

  const handleFinalizeInvoiceBasis = useCallback(async () => {
    if (!selectedItem) return;
    await finalizeInvoiceBasis.mutateAsync({
      invoiceBasisId: selectedItem,
      invoiceDate: finalizeParams.invoiceDate,
      paymentTerms: finalizeParams.paymentTerms,
      syncToVisma: finalizeParams.syncToVisma,
    });
    setFinalizeDialogOpen(false);
    setSelectedItem(null);
    refetchBases();
    refetchSales();
  }, [finalizeInvoiceBasis, selectedItem, finalizeParams, refetchBases, refetchSales]);

  const handleDeleteInvoiceBasis = useCallback(async (id: string) => {
    await deleteInvoiceBasis.mutateAsync(id);
    refetchBases();
  }, [deleteInvoiceBasis, refetchBases]);

  const handleSendSalesDocument = useCallback(async (id: string) => {
    await sendSalesDocument.mutateAsync({ salesDocumentId: id });
    refetchSales();
  }, [sendSalesDocument, refetchSales]);

  const handleMarkAsPaid = useCallback(async (id: string) => {
    await markAsPaid.mutateAsync({ salesDocumentId: id });
    refetchSales();
  }, [markAsPaid, refetchSales]);

  const handleDownloadInvoicePdf = useCallback(async (id: string) => {
    await downloadInvoicePdf.mutateAsync(id);
  }, [downloadInvoicePdf]);

  const handleCancelSalesDocument = useCallback(async (id: string) => {
    await cancelSalesDocument.mutateAsync({ id, reason: t('economy.cancelReason.default') });
    refetchSales();
  }, [cancelSalesDocument, refetchSales, t]);

  const handleApproveCreditNote = useCallback(async (id: string) => {
    await approveCreditNote.mutateAsync(id);
    refetchCredits();
  }, [approveCreditNote, refetchCredits]);

  const handleProcessCreditNote = useCallback(async (id: string) => {
    await processCreditNote.mutateAsync(id);
    refetchCredits();
  }, [processCreditNote, refetchCredits]);

  const handleDownloadCreditNotePdf = useCallback(async (id: string) => {
    await downloadCreditNotePdf.mutateAsync(id);
  }, [downloadCreditNotePdf]);

  const handleExport = useCallback(async () => {
    await exportEconomy.mutateAsync(exportParams);
  }, [exportEconomy, exportParams]);

  const handleSyncToVisma = useCallback(async (ids: string[]) => {
    await syncToVisma.mutateAsync({ salesDocumentIds: ids });
    refetchSales();
  }, [syncToVisma, refetchSales]);

  const openFinalizeDialog = (id: string) => {
    setSelectedItem(id);
    setFinalizeDialogOpen(true);
  };

  const isMutating = generateFromBookings.isPending ||
    approveInvoiceBasis.isPending ||
    finalizeInvoiceBasis.isPending ||
    deleteInvoiceBasis.isPending ||
    sendSalesDocument.isPending ||
    markAsPaid.isPending ||
    cancelSalesDocument.isPending ||
    approveCreditNote.isPending ||
    processCreditNote.isPending ||
    exportEconomy.isPending ||
    syncToVisma.isPending;

  return (
    <Stack gap="5">
      {/* Statistics Summary */}
      {statistics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('economy.stats.totalRevenue')}
            </Paragraph>
            <Heading level={3} data-size="lg" style={{ margin: 0 }}>
              {formatCurrency(statistics.totalRevenue, statistics.currency)}
            </Heading>
          </Card>
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('economy.stats.paidInvoices')}
            </Paragraph>
            <Heading level={3} data-size="lg" style={{ margin: 0, color: 'var(--ds-color-success-text-default)' }}>
              {statistics.paidInvoices}
            </Heading>
          </Card>
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('economy.stats.unpaidInvoices')}
            </Paragraph>
            <Heading level={3} data-size="lg" style={{ margin: 0, color: 'var(--ds-color-warning-text-default)' }}>
              {statistics.unpaidInvoices}
            </Heading>
          </Card>
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('economy.stats.overdueInvoices')}
            </Paragraph>
            <Heading level={3} data-size="lg" style={{ margin: 0, color: 'var(--ds-color-danger-text-default)' }}>
              {statistics.overdueInvoices}
            </Heading>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="invoice-basis">{t('economy.tabs.invoiceBasis')}</Tabs.Tab>
          <Tabs.Tab value="sales-documents">{t('economy.tabs.salesDocuments')}</Tabs.Tab>
          <Tabs.Tab value="credit-notes">{t('economy.tabs.creditNotes')}</Tabs.Tab>
          <Tabs.Tab value="export">{t('economy.tabs.export')}</Tabs.Tab>
        </Tabs.List>

        {/* Invoice Basis Tab */}
        <Tabs.Panel value="invoice-basis">
          <Stack gap="4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Paragraph>{t('economy.invoiceBasis.description')}</Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button type="button" variant="tertiary" onClick={() => refetchBases()} disabled={isMutating}>
                  <RefreshIcon />
                </Button>
                <Button type="button" variant="primary" onClick={() => setGenerateDialogOpen(true)} disabled={isMutating}>
                  <PlusIcon />
                  {t('economy.invoiceBasis.generateFromBookings')}
                </Button>
              </div>
            </div>

            {loadingBases ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
                <Spinner data-size="lg" />
              </div>
            ) : invoiceBases.length === 0 ? (
              <Card style={{ padding: 'var(--ds-spacing-8)', textAlign: 'center' }}>
                <Paragraph data-size="md" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('economy.invoiceBasis.empty')}
                </Paragraph>
                <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('economy.invoiceBasis.emptyHint')}
                </Paragraph>
              </Card>
            ) : (
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>{t('economy.table.invoiceNumber')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.organization')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.total')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.status')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.createdAt')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.actions')}</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {invoiceBases.map((basis: InvoiceBasis) => (
                    <Table.Row key={basis.id}>
                      <Table.Cell>{basis.invoiceNumber ?? '-'}</Table.Cell>
                      <Table.Cell>{basis.organizationName}</Table.Cell>
                      <Table.Cell>{formatCurrency(basis.total, basis.currency)}</Table.Cell>
                      <Table.Cell>
                        <Badge data-color={invoiceBasisStatusColor[basis.status]} data-size="sm">
                          {t(`economy.status.${basis.status}`)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{formatDate(basis.createdAt)}</Table.Cell>
                      <Table.Cell>
                        <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                          {basis.status === 'draft' && (
                            <>
                              <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleApproveInvoiceBasis(basis.id)} disabled={isMutating}>
                                <CheckIcon />
                              </Button>
                              <Button type="button" variant="tertiary" data-size="sm" data-color="danger" onClick={() => handleDeleteInvoiceBasis(basis.id)} disabled={isMutating}>
                                <TrashIcon />
                              </Button>
                            </>
                          )}
                          {basis.status === 'approved' && (
                            <Button type="button" variant="tertiary" data-size="sm" onClick={() => openFinalizeDialog(basis.id)} disabled={isMutating}>
                              <SendIcon />
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Stack>
        </Tabs.Panel>

        {/* Sales Documents Tab */}
        <Tabs.Panel value="sales-documents">
          <Stack gap="4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Paragraph>{t('economy.salesDocuments.description')}</Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button type="button" variant="tertiary" onClick={() => refetchSales()} disabled={isMutating}>
                  <RefreshIcon />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleSyncToVisma(salesDocuments.filter((d: SalesDocument) => d.vismaStatus === 'not_synced').map((d: SalesDocument) => d.id))}
                  disabled={isMutating || salesDocuments.filter((d: SalesDocument) => d.vismaStatus === 'not_synced').length === 0}
                >
                  {t('economy.salesDocuments.syncToVisma')}
                </Button>
              </div>
            </div>

            {loadingSales ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
                <Spinner data-size="lg" />
              </div>
            ) : salesDocuments.length === 0 ? (
              <Card style={{ padding: 'var(--ds-spacing-8)', textAlign: 'center' }}>
                <Paragraph data-size="md" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('economy.salesDocuments.empty')}
                </Paragraph>
                <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('economy.salesDocuments.emptyHint')}
                </Paragraph>
              </Card>
            ) : (
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>{t('economy.table.invoiceNumber')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.organization')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.total')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.dueDate')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.status')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.vismaStatus')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.actions')}</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {salesDocuments.map((doc: SalesDocument) => (
                    <Table.Row key={doc.id}>
                      <Table.Cell>{doc.invoiceNumber}</Table.Cell>
                      <Table.Cell>{doc.organizationName}</Table.Cell>
                      <Table.Cell>{formatCurrency(doc.total, doc.currency)}</Table.Cell>
                      <Table.Cell>{formatDate(doc.dueDate)}</Table.Cell>
                      <Table.Cell>
                        <Badge data-color={salesDocumentStatusColor[doc.status]} data-size="sm">
                          {t(`economy.status.${doc.status}`)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge data-color={doc.vismaStatus === 'synced' ? 'success' : doc.vismaStatus === 'failed' ? 'danger' : 'neutral'} data-size="sm">
                          {t(`economy.vismaStatus.${doc.vismaStatus ?? 'not_synced'}`)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                          <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleDownloadInvoicePdf(doc.id)} disabled={isMutating}>
                            <DownloadIcon />
                          </Button>
                          {doc.status === 'draft' && (
                            <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleSendSalesDocument(doc.id)} disabled={isMutating}>
                              <SendIcon />
                            </Button>
                          )}
                          {(doc.status === 'sent' || doc.status === 'overdue') && (
                            <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleMarkAsPaid(doc.id)} disabled={isMutating}>
                              <CheckIcon />
                            </Button>
                          )}
                          {doc.status !== 'paid' && doc.status !== 'cancelled' && (
                            <Button type="button" variant="tertiary" data-size="sm" data-color="danger" onClick={() => handleCancelSalesDocument(doc.id)} disabled={isMutating}>
                              <TrashIcon />
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Stack>
        </Tabs.Panel>

        {/* Credit Notes Tab */}
        <Tabs.Panel value="credit-notes">
          <Stack gap="4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Paragraph>{t('economy.creditNotes.description')}</Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button type="button" variant="tertiary" onClick={() => refetchCredits()} disabled={isMutating}>
                  <RefreshIcon />
                </Button>
                <Button type="button" variant="primary" onClick={() => setCreditNoteDialogOpen(true)} disabled={isMutating}>
                  <PlusIcon />
                  {t('economy.creditNotes.create')}
                </Button>
              </div>
            </div>

            {loadingCredits ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
                <Spinner data-size="lg" />
              </div>
            ) : creditNotes.length === 0 ? (
              <Card style={{ padding: 'var(--ds-spacing-8)', textAlign: 'center' }}>
                <Paragraph data-size="md" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('economy.creditNotes.empty')}
                </Paragraph>
              </Card>
            ) : (
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell>{t('economy.table.creditNoteNumber')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.originalInvoice')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.organization')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.total')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.status')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('economy.table.actions')}</Table.HeaderCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {creditNotes.map((note: CreditNote) => (
                    <Table.Row key={note.id}>
                      <Table.Cell>{note.creditNoteNumber}</Table.Cell>
                      <Table.Cell>{note.originalInvoiceNumber}</Table.Cell>
                      <Table.Cell>{note.organizationName}</Table.Cell>
                      <Table.Cell>{formatCurrency(note.total, note.currency)}</Table.Cell>
                      <Table.Cell>
                        <Badge data-color={creditNoteStatusColor[note.status]} data-size="sm">
                          {t(`economy.status.${note.status}`)}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                          <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleDownloadCreditNotePdf(note.id)} disabled={isMutating}>
                            <DownloadIcon />
                          </Button>
                          {note.status === 'draft' && (
                            <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleApproveCreditNote(note.id)} disabled={isMutating}>
                              <CheckIcon />
                            </Button>
                          )}
                          {note.status === 'approved' && (
                            <Button type="button" variant="tertiary" data-size="sm" onClick={() => handleProcessCreditNote(note.id)} disabled={isMutating}>
                              <SendIcon />
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Stack>
        </Tabs.Panel>

        {/* Export Tab */}
        <Tabs.Panel value="export">
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <Stack gap="4">
              <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                {t('economy.export.title')}
              </Heading>
              <Paragraph data-size="sm">
                {t('economy.export.description')}
              </Paragraph>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
                <FormField label={t('economy.export.type')}>
                  <Select
                    value={exportParams.type}
                    onChange={(e) => setExportParams((prev) => ({ ...prev, type: e.target.value as EconomyExportParams['type'] }))}
                  >
                    <option value="invoices">{t('economy.export.types.invoices')}</option>
                    <option value="credit-notes">{t('economy.export.types.creditNotes')}</option>
                    <option value="revenue">{t('economy.export.types.revenue')}</option>
                    <option value="vat-report">{t('economy.export.types.vatReport')}</option>
                  </Select>
                </FormField>

                <FormField label={t('economy.export.format')}>
                  <Select
                    value={exportParams.format}
                    onChange={(e) => setExportParams((prev) => ({ ...prev, format: e.target.value as EconomyExportParams['format'] }))}
                  >
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="pdf">PDF</option>
                  </Select>
                </FormField>

                <FormField label={t('economy.export.startDate')}>
                  <Textfield
                    type="date"
                    value={exportParams.startDate ?? ''}
                    onChange={(e) => setExportParams((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </FormField>

                <FormField label={t('economy.export.endDate')}>
                  <Textfield
                    type="date"
                    value={exportParams.endDate ?? ''}
                    onChange={(e) => setExportParams((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </FormField>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="button" variant="primary" onClick={handleExport} disabled={exportEconomy.isPending}>
                  {exportEconomy.isPending ? <Spinner data-size="sm" /> : <DownloadIcon />}
                  {t('economy.export.download')}
                </Button>
              </div>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Generate from Bookings Dialog */}
      <Dialog open={generateDialogOpen} onClose={() => setGenerateDialogOpen(false)}>
        <Dialog.Block>
          <Heading level={3} data-size="md" style={{ margin: 0 }}>
            {t('economy.dialog.generateFromBookings.title')}
          </Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Stack gap="4">
            <Paragraph data-size="sm">
              {t('economy.dialog.generateFromBookings.description')}
            </Paragraph>
            <FormField label={t('economy.dialog.generateFromBookings.startDate')}>
              <Textfield
                type="date"
                value={generateParams.startDate}
                onChange={(e) => setGenerateParams((prev) => ({ ...prev, startDate: e.target.value }))}
              />
            </FormField>
            <FormField label={t('economy.dialog.generateFromBookings.endDate')}>
              <Textfield
                type="date"
                value={generateParams.endDate}
                onChange={(e) => setGenerateParams((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </FormField>
            {generateFromBookings.isError && (
              <Alert data-color="danger">
                {t('economy.dialog.generateFromBookings.error')}
              </Alert>
            )}
          </Stack>
        </Dialog.Block>
        <Dialog.Block>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--ds-spacing-2)' }}>
            <Button type="button" variant="tertiary" onClick={() => setGenerateDialogOpen(false)}>
              {t('action.cancel')}
            </Button>
            <Button type="button" variant="primary" onClick={handleGenerateFromBookings} disabled={generateFromBookings.isPending}>
              {generateFromBookings.isPending ? <Spinner data-size="sm" /> : null}
              {t('economy.dialog.generateFromBookings.generate')}
            </Button>
          </div>
        </Dialog.Block>
      </Dialog>

      {/* Finalize Invoice Basis Dialog */}
      <Dialog open={finalizeDialogOpen} onClose={() => setFinalizeDialogOpen(false)}>
        <Dialog.Block>
          <Heading level={3} data-size="md" style={{ margin: 0 }}>
            {t('economy.dialog.finalize.title')}
          </Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Stack gap="4">
            <Paragraph data-size="sm">
              {t('economy.dialog.finalize.description')}
            </Paragraph>
            <FormField label={t('economy.dialog.finalize.invoiceDate')}>
              <Textfield
                type="date"
                value={finalizeParams.invoiceDate}
                onChange={(e) => setFinalizeParams((prev) => ({ ...prev, invoiceDate: e.target.value }))}
              />
            </FormField>
            <FormField label={t('economy.dialog.finalize.paymentTerms')}>
              <Select
                value={finalizeParams.paymentTerms.toString()}
                onChange={(e) => setFinalizeParams((prev) => ({ ...prev, paymentTerms: parseInt(e.target.value) }))}
              >
                <option value="7">7 {t('common.days')}</option>
                <option value="14">14 {t('common.days')}</option>
                <option value="30">30 {t('common.days')}</option>
                <option value="45">45 {t('common.days')}</option>
                <option value="60">60 {t('common.days')}</option>
              </Select>
            </FormField>
          </Stack>
        </Dialog.Block>
        <Dialog.Block>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--ds-spacing-2)' }}>
            <Button type="button" variant="tertiary" onClick={() => setFinalizeDialogOpen(false)}>
              {t('action.cancel')}
            </Button>
            <Button type="button" variant="primary" onClick={handleFinalizeInvoiceBasis} disabled={finalizeInvoiceBasis.isPending}>
              {finalizeInvoiceBasis.isPending ? <Spinner data-size="sm" /> : null}
              {t('economy.dialog.finalize.confirm')}
            </Button>
          </div>
        </Dialog.Block>
      </Dialog>

      {/* Credit Note Dialog - simplified placeholder */}
      <Dialog open={creditNoteDialogOpen} onClose={() => setCreditNoteDialogOpen(false)}>
        <Dialog.Block>
          <Heading level={3} data-size="md" style={{ margin: 0 }}>
            {t('economy.dialog.creditNote.title')}
          </Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Alert data-color="info">
            {t('economy.dialog.creditNote.selectInvoiceHint')}
          </Alert>
        </Dialog.Block>
        <Dialog.Block>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="button" variant="tertiary" onClick={() => setCreditNoteDialogOpen(false)}>
              {t('action.close')}
            </Button>
          </div>
        </Dialog.Block>
      </Dialog>
    </Stack>
  );
}

export default EconomyWidget;
