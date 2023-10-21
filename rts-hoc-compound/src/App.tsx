import { Card, Col, Row } from 'antd'
import './App.css'
import ContentComponent from './components/ContentComponent'
import ModalComponent from './components/ModalComponent'
import CounterComponent from './components/CounterComponent'
import AntUseModal from './components/AntUseModal'
import CloneModalComponent from './components/CloneModalComponent'
import ButtonComponent from './components/ButtonComponent'

function App() {
  return (
    <>
      <h1>HOC & Compound</h1>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <ContentComponent />
        </Col>
        <Col span={24}>
          <CounterComponent />
        </Col>
        <Col span={24}>
          <ModalComponent />
        </Col>
        <Col span={24}>
          <AntUseModal />
        </Col>
        <Col span={24}>
          <ButtonComponent />
        </Col>
      </Row>
    </>
  )
}

export default App
