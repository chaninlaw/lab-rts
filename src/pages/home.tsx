import { Col, Flex, Row } from 'antd'
import AntUseModal from '../components/AntUseModal'
import ButtonComponent from '../components/ButtonComponent'
import ButtonRipple from '../components/ButtonRipple'
import ContentComponent from '../components/ContentComponent'
import CounterComponent from '../components/CounterComponent'
import DropdownContext from '../components/DropdownContext'
import ModalComponent from '../components/ModalComponent'
import { OTPComponents } from '../components/OTPComponents'
import { ProTableComponent } from '../components/ProTableComponent'
import ProgessComponent from '../components/ProgessComponent'
import TreeAntd from '../components/TreeAntd'
import { DialogWithInstanceHook } from '../components/DialogWithInstanceHook'

export function Home() {
  return (
    <Flex gap={20}>
      <h1>HOC & Compound</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <OTPComponents />
        </Col>
        <Col span={12}>
          <ProTableComponent />
        </Col>
        <Col span={12}>
          <ContentComponent />
        </Col>
        <Col span={12}>
          <CounterComponent />
        </Col>
        <Col span={12}>
          <ModalComponent />
        </Col>
        <Col span={12}>
          <AntUseModal />
        </Col>
        <Col span={12}>
          <ButtonComponent />
        </Col>
        <Col span={12}>
          <TreeAntd />
        </Col>
        <Col span={12}>
          <ProgessComponent />
        </Col>
        <Col span={12}>
          <ButtonRipple />
        </Col>
        <Col span={12}>
          <DropdownContext />
        </Col>
        <Col span={12}>
          <DialogWithInstanceHook />
        </Col>
      </Row>
    </Flex>
  )
}
