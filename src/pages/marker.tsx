import { Flex } from 'antd'
import { MarkerComponent } from '../components/MarkerComponent'
import { MarkerCanvasComponent } from '../components/MarkerCanvasComponent'

export function MarkerPage() {
	return (
		<Flex vertical gap={20}>
			<MarkerComponent />
			<MarkerCanvasComponent />
		</Flex>
	)
}
