import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/project/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/project/$id/"!</div>
}
