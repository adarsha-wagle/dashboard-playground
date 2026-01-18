import { Form } from '@/components/ui/form'
import { useGetPaginatedInvoices } from '../table/shared/invoice-service'
import { ServerAutocompleteInput } from './components/server-autocomplete-input'

import { useForm } from 'react-hook-form'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import Main from '@/components/layouts/authenticated/main'

function ServerAutocompletePage() {
  const form = useForm({
    defaultValues: {
      user: null,
      invoice: null,
      customerName: '',
    },
  })

  return (
    <Main>
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
    </Main>
  )
}

export default ServerAutocompletePage
