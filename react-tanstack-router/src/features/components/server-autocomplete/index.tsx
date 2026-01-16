import { Form } from '@/components/ui/form'
import { useGetPaginatedInvoices } from '../table/shared/invoice-service'
import { ServerAutocompleteInput } from './components/server-autocomplete-input'

import { useForm } from 'react-hook-form'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

function ServerAutocompletePage() {
  const form = useForm({
    defaultValues: {
      user: null,
      invoice: null,
      customerName: '',
    },
  })

  return (
    <>
      <PrimaryHeader
        title="Server Side Autocomplete"
        description="Server Side autocomplete field that has downshift feature, debounce fetching and integrates with seamlessly with reactquery"
      />
      <Form {...form}>
        <ServerAutocompleteInput
          control={form.control}
          name="invoice"
          label="Select Invoice"
          placeholder="Search invoices..."
          useQueryHook={useGetPaginatedInvoices}
          displayField="invoiceNumber"
          secondaryField="customer"
          setKey="id"
          required
          onSelect={(item) => {
            console.log('Invoice selected:', item)
          }}
        />
      </Form>
    </>
  )
}

export default ServerAutocompletePage
