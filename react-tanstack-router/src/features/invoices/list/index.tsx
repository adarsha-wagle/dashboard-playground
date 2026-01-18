// import TextEditor from '@/components/text-editor/editor'
import Main from '@/components/layouts/authenticated/main'
import SectionInvoiceTableList from './components/section-invoice-table-list'

function InvoiceList() {
  // const filterOptions = useFilters(invoiceFilterOptions)

  return (
    <Main>
      <SectionInvoiceTableList />
    </Main>
  )
}

export default InvoiceList
