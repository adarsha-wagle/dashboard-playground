import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/blogs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/blogs/"!</div>
}
