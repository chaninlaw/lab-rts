import { Card } from 'antd'
import Counter from '../compound/Counter'

interface Props {}

const CounterComponent = (props: Props) => {
  return (
    <Card>
      <Counter>
        <Counter.Count />
        <Counter.Label>Click here.</Counter.Label>
        <Counter.Increase></Counter.Increase>
        <Counter.Decrease></Counter.Decrease>
      </Counter>
    </Card>
  )
}

export default CounterComponent
