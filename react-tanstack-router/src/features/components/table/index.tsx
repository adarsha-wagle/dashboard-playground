import PrimaryHeader from '@/components/layouts/authenticated/primary-header'
import SectionInvoiceTableList from './components/section-invoice-table-list'
import Main from '@/components/layouts/authenticated/main'

function TablePage() {
  return (
    <Main>
      <PrimaryHeader
        title="Server Side Table"
        description="Tanstack Table that integrates with react query. Easy to integrate"
      />
      <SectionInvoiceTableList />
    </Main>
  )
}

export default TablePage
