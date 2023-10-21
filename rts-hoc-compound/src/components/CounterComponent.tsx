import { Card } from 'antd'
import Counter from '../compound/Counter'

interface Props {}

const CounterComponent = (props: Props) => {
  return (
    <Card>
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
