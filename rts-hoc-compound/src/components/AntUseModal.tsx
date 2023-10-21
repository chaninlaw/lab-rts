import { Button, Card, Modal } from 'antd'
import React from 'react'
import ContentComponent from './ContentComponent'

interface Props {}

const AntUseModal = (props: Props) => {
  const [modal, cotextHolder] = Modal.useModal()

  return (
    <Card>
      <h3>Antd useModal</h3>
      <Button
        onClick={() =>
          Modal.confirm({
            title: 'Test',
            content: <ContentComponent />,
            icon: <></>,
          })
        }
      >
        Open
      </Button>
    </Card>
  )
}

export default AntUseModal
