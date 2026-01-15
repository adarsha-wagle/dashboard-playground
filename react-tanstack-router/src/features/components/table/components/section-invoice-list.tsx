import { useGetInfiniteInvoices } from '../../shared/invoice-service'
import { InvoiceCard, InvoiceCardSkeleton } from './invoice-card'

function SectionInvoiceList() {
  const { isLoading, data, isSuccess, isError, error } =
    useGetInfiniteInvoices()

  let content

  if (isLoading) {
    content = (
      <>
        {[...Array(6)].map((_, index) => (
          <InvoiceCardSkeleton key={index} />
        ))}
      </>
    )
  }

  if (isError) {
    content = (
      <p className="text-red-500">Failed to load invoices. {error.message}</p>
    )
  }

  if (isSuccess && data?.length === 0) {
    content = <p>No invoices found.</p>
  }

  if (isSuccess && data?.length! > 0) {
    content = data?.map((invoice) => (
      <InvoiceCard key={invoice.id} invoice={invoice} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1>Hello </h1>
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Invoices : {data?.user.username || ''}
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content}
        </div>
      </div>
    </div>
  )
}

export default SectionInvoiceList
