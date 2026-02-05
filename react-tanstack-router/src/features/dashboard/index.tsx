import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

function DashboardPage() {
  return (
    <Main>
      <PrimaryHeader title="Dashboard" description="Brrrr" />
      <section className="bg-background-secondary my-20 h-50 rounded-xl border p-6 shadow-xs">
        Some Content
      </section>{' '}
      <section className="bg-background-secondary my-20 h-50 rounded-xl border p-6 shadow-xs">
        Some Content
      </section>{' '}
      <section className="bg-background-secondary my-20 h-50 rounded-xl border p-6 shadow-xs">
        Some Content
      </section>{' '}
      <section className="bg-background-secondary my-20 h-50 rounded-xl border p-6 shadow-xs">
        Some Content
      </section>{' '}
      <section className="bg-background-secondary my-20 h-50 rounded-xl border p-6 shadow-xs">
        Some Content
      </section>{' '}
      <section className="bg-background-secondary my-20 h-50 rounded-xl border p-6 shadow-xs">
        Some Content
      </section>
    </Main>
  )
}

export default DashboardPage
