import { createLazyFileRoute } from '@tanstack/react-router'
import { MyDashboard } from '../pages/dashboard'

export const Route = createLazyFileRoute('/dashboard')({
	component: Dashboard,
})

function Dashboard() {
	return (
		<div className='p-2 h-full w-full'>
			Hello from Dashboard!
			<MyDashboard />
		</div>
	)
}
