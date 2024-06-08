import { createLazyFileRoute } from '@tanstack/react-router'
import { Home } from '../pages/home'

export const Route = createLazyFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<div className='p-2 bg-black/10 h-full w-full'>
			<h3>Welcome Home!</h3>
			<div className=''>
				<Home />
			</div>
		</div>
	)
}
