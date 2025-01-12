import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/project/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/project/"!</div>
}
