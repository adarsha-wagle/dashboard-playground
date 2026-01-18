import Main from '@/components/layouts/authenticated/main'
import PrimaryHeader from '@/components/layouts/authenticated/primary-header'

function DashboardPage() {
  return (
    <Main>
      <PrimaryHeader title="Dashboard" description="My Nigga" />
      <section className="my-20 h-50 bg-white"> Some Content</section>
      <section className="my-20 h-50 bg-white"> Some Content</section>
      <section className="my-20 h-50 bg-white"> Some Content</section>
      <section className="my-20 h-50 bg-white"> Some Content</section>
      <section className="my-20 h-50 bg-white"> Some Content</section>
      <section className="my-20 h-50 bg-white"> Some Content</section>
    </Main>
  )
}

export default DashboardPage
