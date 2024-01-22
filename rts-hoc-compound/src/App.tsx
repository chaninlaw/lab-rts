import { Col, Flex, Row } from 'antd'
// import './App.css'
import ContentComponent from './components/ContentComponent'
import ModalComponent from './components/ModalComponent'
import CounterComponent from './components/CounterComponent'
import AntUseModal from './components/AntUseModal'
// import CloneModalComponent from './components/CloneModalComponent'
import ButtonComponent from './components/ButtonComponent'
import TreeAntd from './components/TreeAntd'
import ProgessComponent from './components/ProgessComponent'
import ButtonRipple from './components/ButtonRipple'
import DropdownContext from './components/DropdownContext'
import { ProTableComponent } from './components/ProtableComponent'
import { OTPComponents } from './components/OTPComponents'

function App() {
	return (
		<Flex gap={20}>
			<h1>HOC & Compound</h1>
			<Row gutter={[16, 16]}>
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
					<ProTableComponent />
				</Col>
				<Col span={12}>
					<OTPComponents />
				</Col>
			</Row>
		</Flex>
	)
}

export default App
