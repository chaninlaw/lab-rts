import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
	component: () => (
		<div className='bg-black min-h-screen w-full'>
			<nav className='p-2 flex gap-2 bg-white/50'>
				<Link to='/' className='[&.active]:font-bold'>
					Home
				</Link>{' '}
				<Link to='/dashboard' className='[&.active]:font-bold'>
					Dashboard
				</Link>
				<Link to='/marker' className='[&.active]:font-bold'>
					Marker
				</Link>
			</nav>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	),
})
