import { Button, Card, Modal } from 'antd'
import React from 'react'
import ContentComponent from './ContentComponent'
import { style } from '../constants/style'

interface Props {}

const AntUseModal = (props: Props) => {
  const [modal, cotextHolder] = Modal.useModal()

  return (
    <Card bodyStyle={style}>
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
