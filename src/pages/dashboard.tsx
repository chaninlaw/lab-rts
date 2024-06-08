import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './override-placeholder.css'
import {
	Responsive as ResponsiveGridLayout,
	WidthProvider,
} from 'react-grid-layout'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Bar } from '../echart/bar'
import { Pie } from '../echart/pie'

const ReactGridLayout = React.memo(WidthProvider(ResponsiveGridLayout))

type CustomReactGridLayout = {
	Layout: ReactGridLayout.Layout & {
		i: `${ItemType}-${number}`
	}
	ItemCallback?: (
		layout: CustomReactGridLayout['Layout'][],
		oldItem: CustomReactGridLayout['Layout'],
		newItem: CustomReactGridLayout['Layout'],
		placeholder: CustomReactGridLayout['Layout'],
		event: MouseEvent,
		element: HTMLElement
	) => void
}

type ItemType = 'number' | 'pie' | 'bar' | 'graph'
type ItemID = `${ItemType}-${number}`
type ItemDetail<Type = ItemType, ID = number> = {
	type: Type
	id: ID
}

const getItemDetail = (i: ItemID) => ({
	type: i.split('-')[0] as ItemType,
	id: +i.split('-')[1] as number,
})
const isCurrentChange = (curr: ItemID, incoming: ItemID) =>
	getItemDetail(curr).id === getItemDetail(incoming).id

const isPie = (i: ItemID) => getItemDetail(i).type === 'pie'
const isBar = (i: ItemID) => getItemDetail(i).type === 'bar'
const isGraph = (i: ItemID) => getItemDetail(i).type === 'graph'
const isNumber = (i: ItemID) => getItemDetail(i).type === 'number'

export function MyDashboard() {
	return <MemoMyDashboard />
}

function MemoMyDashboard() {
	const [layoutState, setLayoutState] = useState<
		CustomReactGridLayout['Layout'][]
	>([
		numberType({ x: 0, y: 0, id: 1 }),
		numberType({ x: 1, y: 0, id: 2 }),
		numberType({ x: 2, y: 0, id: 3 }),
		numberType({ x: 3, y: 0, id: 4 }),
		numberType({ x: 4, y: 0, id: 5 }),
		pieType({ x: 5, y: 0, id: 6 }),
		barType({ x: 7, y: 0, id: 7 }),
		barType({ x: 9, y: 0, id: 8 }),
		numberType({ x: 11, y: 0, id: 9 }),
		graphType({ x: 0, y: 1, id: 10 }),
	])

	const onResizeStop: CustomReactGridLayout['ItemCallback'] = (
		layout,
		oldItem,
		newItem
	) => {
		const updatedLayout = layout.map((item) => {
			if (!isCurrentChange(item.i, newItem.i)) return item
			if (isPie(item.i)) {
				const maximumXOrY = Math.max(newItem.h, newItem.w)
				const minimumXOrY = Math.min(newItem.h, newItem.w)

				// if oldItem is bigger than newItem = scale up
				if (oldItem.h > newItem.h || oldItem.w > newItem.w) {
					console.log('onResizeStop.isPie.minimumXOrY', minimumXOrY)
					return { ...item, w: minimumXOrY, h: minimumXOrY }
				} else {
					// else oldItem is smaller than newItem = scale down
					console.log('onResizeStop.isPie.maximumXOrY', maximumXOrY)
					return { ...item, w: maximumXOrY, h: maximumXOrY }
				}
			}
			return item
		})
		setLayoutState(updatedLayout)
	}

	const children = React.useMemo(() => {
		return layoutState.map((val) => {
			return (
				<Div key={val.i}>
					<div
						className='wrapper-widgets'
						onMouseDown={(e) => e.stopPropagation()}
						style={{ height: '100%' }}
					>
						<Widgets id={val.i} />
					</div>
				</Div>
			)
		})
	}, [layoutState])

	return (
		<ReactGridLayout
			className='bg-black/10 h-full w-full'
			layouts={{ lg: layoutState }}
			compactType='vertical'
			onResizeStop={onResizeStop as ReactGridLayout.ItemCallback}
			rowHeight={150}
		>
			{children}
		</ReactGridLayout>
	)
}

type CardTypeParams = { x: number; y: number; id: number }
type CardTypeGenerate = ({
	x,
	y,
	id,
}: CardTypeParams) => CustomReactGridLayout['Layout']
const baseType = ({ x, y }: Omit<CardTypeParams, 'id'>) => ({
	x,
	y,
})

const numberType: CardTypeGenerate = ({ x, y, id }) => ({
	...baseType({ x, y }),
	w: 1,
	h: 1,
	minH: 1,
	minW: 1,
	maxH: 1,
	maxW: 2,
	i: `number-${id}`,
})

const pieType: CardTypeGenerate = ({ x, y, id }) => ({
	...baseType({ x, y }),
	w: 2,
	h: 2,
	minH: 2,
	minW: 2,
	maxH: 4,
	maxW: 4,
	i: `pie-${id}`,
})

const barType: CardTypeGenerate = ({ x, y, id }) => ({
	...baseType({ x, y }),
	w: 2,
	h: 2,
	minH: 2,
	minW: 2,
	maxH: 4,
	maxW: 12,
	i: `bar-${id}`,
})

const graphType: CardTypeGenerate = ({ x, y, id }) => ({
	...baseType({ x, y }),
	...barType({ x, y, id }),
	i: `graph-${id}`,
})

const Div = styled.div`
	border: 1px solid white;
	border-radius: 10px;
	user-select: none;
	color: white;

	&::after {
		content: '';
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 1;
		width: 10px;
		height: 10px;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABOUlEQVR4nO2WT07CQBSHu2ApCxGPIHdQqMtyAv/cxIAbg9fwAogHwZgIhzDsRLyAn3nhNRmH1wlJB9Rkvm2/9v06M21+WZbYAuAI6AOdLdwOUACtWMPPgQ/WfAGjgHuvjrAE8hgB5vxEBpxUvHk5vOQ1RoBPNikMT5bdZxUjwMR76DtwaHgtXXaXcYwAbQ2xkiUFegE3V0fcsdxbO0Ai8ScAroEHYAg0A14TuFX3KtbwofdtPwMNw2sAL547iBFgYfzhzgyvZ3iLXQU4Nbyu4b3FCDDwHjoNbIFsj8tN7QACcKkHS8IcZBXINT0z4l5UeYnE/wI4Bp60ms1CRVML7FzdSZRCwnq4yzJQycr2XPK4z1La31Upnf12Lc+dtisD7gLuyAkh7blbO4Czv4X15j7iqLtxThKZwTfeurP5LHAhzwAAAABJRU5ErkJggg==');
		background-size: contain;
		cursor: move;
		cursor: grab;
	}
	&::after:active {
		cursor: grabbing;
	}

	&.react-grid-item .react-resizable-handle::after {
		border-right: 2px solid rgb(255 255 255);
		border-bottom: 2px solid rgb(255 255 255);
	}
	&.react-grid-item.react-draggable-dragging {
		// element that dragging
	}
	&.react-grid-item.react-grid-placeholder {
		background: orange;
		border-radius: 10px;
	}
`

const Widgets = ({ id }: { id: ItemID }) => {
	if (isPie(id)) return <Pie />
	if (isBar(id)) return <Bar />
	// if (isGraph(id)) return <Graph id={id} />
	// if (isNumber(id)) return <Number id={id} />
	return <>{id}</>
}
