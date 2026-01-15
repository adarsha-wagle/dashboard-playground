import { type FC } from 'react'
import { type Row } from '@tanstack/react-table'
import { Edit, Trash } from 'lucide-react'
import type { IInvoice } from '../../../components/table/shared/invoice-type'
import InvoiceEdit from './invoice-edit'

type OrganizationRowActionProps = {
  row: Row<IInvoice>
}

const OrganizationRowAction: FC<OrganizationRowActionProps> = ({ row }) => {
  const handleEdit = () => {
    // navigate({
    //     to: '/Tags/$roleId',
    //     params: {
    //         roleId: row.original.id
    //     }
    // })
  }

  const handleDelete = () => {
    console.log('Deleting', row.original.customer)
  }

  return (
    <div className="flex items-center justify-center gap-4 w-full ">
      <InvoiceEdit invoice={row.original} />
      <Trash onClick={handleDelete} className="cursor-pointer" size={16} />
    </div>
  )
}

export default OrganizationRowAction
