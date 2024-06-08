import * as React from 'react'
import { Tab } from './Tab'
import { Panel } from './Panel'

interface ITabsContext {
	activeTab: string
	setActiveTab: (label: string) => void
}

const TabsContext = React.createContext<ITabsContext | undefined>(undefined)

/**
 * This component maintains internal state and provides those
 * pieces of state & functions to its children.
 *
 * Note that this component itself does not directly update state.
 */
const Tabs = (props: React.PropsWithChildren) => {
	const [activeTab, setActiveTab] = React.useState('a')

	/**
	 * Memoize the context to prevent unecessary renders.
	 */
	const memoizedContextValue = React.useMemo(
		() => ({
			activeTab,
			setActiveTab,
		}),
		[activeTab, setActiveTab]
	)

	return (
		<TabsContext.Provider value={memoizedContextValue}>
			{props.children}
		</TabsContext.Provider>
	)
}

/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Tabs component!
 */
export const useTabs = (): ITabsContext => {
	const context = React.useContext(TabsContext)
	if (!context) {
		throw new Error('This component must be used within a <Tabs> component.')
	}
	return context
}

Tabs.Tab = Tab
Tabs.Panel = Panel

export { Tabs }
