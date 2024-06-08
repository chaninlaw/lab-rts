import { Button, Card, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import ContentComponent from './ContentComponent'
import { style } from '../constants/style'

interface Props {}

const AntUseModal = (props: Props) => {
	const [modal, contextHolder] = Modal.useModal()
	const [trigger, setTrigger] = useState(false)

	useEffect(() => {
		modal.confirm({
			title: 'Test',
			content: <ContentComponent />,
			icon: <></>,
		})
	}, [contextHolder])

	return (
		<Card bodyStyle={style}>
			<h3>Antd useModal</h3>
			{trigger && contextHolder}
			<Button onClick={() => setTrigger(true)}>contextHolder</Button>
		</Card>
	)
}

export default AntUseModal
