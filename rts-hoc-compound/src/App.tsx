import { Card, Col, Row } from 'antd'
import './App.css'
import ContentComponent from './components/ContentComponent'
import ModalComponent from './components/ModalComponent'
import CounterComponent from './components/CounterComponent'

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
      </Row>
    </>
  )
}

export default App
