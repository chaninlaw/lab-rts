import { createLazyFileRoute } from '@tanstack/react-router'
import { MarkerPage } from '../pages/marker'

export const Route = createLazyFileRoute('/marker')({
	component: Dashboard,
})

function Dashboard() {
	return (
		<div className='p-2 h-full w-full'>
			<MarkerPage />
		</div>
	)
}
