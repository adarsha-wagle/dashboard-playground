import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function OrganizationsListActionButtons({
  setAddDialogOpen,
}: {
  setAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setAddDialogOpen(true)}>
        <Plus size={18} /> <span>Add Organization</span>
      </Button>
    </div>
  )
}
