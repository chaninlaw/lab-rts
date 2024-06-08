import { Button, Card, Modal } from 'antd'
import { useEffect, useState } from 'react'
import ContentComponent from './ContentComponent'
import { style } from '../constants/style'

const AntUseModal = () => {
	const [modal, contextHolder] = Modal.useModal()
	const [trigger, setTrigger] = useState(false)

	useEffect(() => {
		modal.confirm({
			title: 'Test',
			content: <ContentComponent />,
			icon: <></>,
		})
	}, [modal])

	return (
		<Card bodyStyle={style}>
			<h3>Antd useModal</h3>
			{trigger && contextHolder}
			<Button onClick={() => setTrigger(true)}>contextHolder</Button>
		</Card>
	)
}

export default AntUseModal
