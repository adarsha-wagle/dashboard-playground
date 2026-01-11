// import SectionInvoiceList from './components/section-invoice-list'
import { useFilters } from '@/hooks/use-filters'
import InvoiceFilters, {
  invoiceFilterOptions,
} from './components/invoice-filters'
import SectionInvoiceTableList from './components/section-invoice-table-list'

function InvoiceList() {
  // const filterOptions = useFilters(invoiceFilterOptions)

  return (
    <main>
      {/* <SectionInvoiceList /> */}
      {/* <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <InvoiceFilters filterOptions={filterOptions} />
      </div> */}
      <SectionInvoiceTableList />
    </main>
  )
}

export default InvoiceList
