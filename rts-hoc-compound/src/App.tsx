import { Card, Col, Flex, Row } from 'antd'
// import './App.css'
import ContentComponent from './components/ContentComponent'
import ModalComponent from './components/ModalComponent'
import CounterComponent from './components/CounterComponent'
import AntUseModal from './components/AntUseModal'
import CloneModalComponent from './components/CloneModalComponent'
import ButtonComponent from './components/ButtonComponent'
import TreeAntd from './components/TreeAntd'

function App() {
  return (
    <Flex gap={20}>
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
        <Col span={24}>
          <TreeAntd />
        </Col>
      </Row>
    </Flex>
  )
}

export default App
