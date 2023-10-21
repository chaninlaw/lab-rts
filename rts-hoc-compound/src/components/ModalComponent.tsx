import { Card } from 'antd'
import Modal from '../compound/Modal'

const ModalComponent = () => {
  const onOk = () => console.log('callback')

  return (
    <Card>
      <Modal>
        <Modal.Content onOk={onOk}>
          <h1>My modal</h1>
          <p>using compound component</p>
        </Modal.Content>
        <Modal.Button>Open</Modal.Button>
      </Modal>
    </Card>
  )
}

export default ModalComponent
