import { Card } from 'antd'
import Modal from '../compound/Modal'
import { style } from '../constants/style'

const ModalComponent = () => {
  const onOk = () => console.log('callback')

  return (
    <Card bodyStyle={style}>
      <h3>Modal with Compound Component</h3>
      <Modal>
        <Modal.Content onOk={onOk}>
          <h2>My modal</h2>
          <p>using compound component</p>
        </Modal.Content>
        <Modal.Button>Open</Modal.Button>
      </Modal>
    </Card>
  )
}

export default ModalComponent
