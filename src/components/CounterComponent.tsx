import { Card } from 'antd'
import Counter from '../compound/Counter'
import { style } from '../constants/style'

const CounterComponent = () => {
	return (
		<Card bodyStyle={style}>
			<h3>Counter with Compound Component</h3>
			<Counter>
				<Counter.Count />
				<br />
				<Counter.Label>Click here.</Counter.Label>
				<br />
				<Counter.Increase></Counter.Increase>
				<Counter.Decrease></Counter.Decrease>
			</Counter>
		</Card>
	)
}

export default CounterComponent
