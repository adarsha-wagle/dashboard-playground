import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import SectionInvoiceTableList from './components/section-invoice-table-list'

function TablePage() {
  return (
    <>
      <PrimaryHeader
        title="Server Side Table"
        description="Tanstack Table that integrates with react query. Easy to integrate"
      />
      <SectionInvoiceTableList />
    </>
  )
}

export default TablePage
