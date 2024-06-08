import { Button } from 'antd'
import React from 'react'
type FCC = React.FC<React.PropsWithChildren>

export interface CounterContextType {
  count: number,
  increase: () => void
  decrease: () => void
}

// 1. Create a context
const CounterContext = React.createContext<CounterContextType>({
  count: 0,
  increase: function (): void {
    throw new Error('Function not implemented.')
  },
  decrease: function (): void {
    throw new Error('Function not implemented.')
  }
})

// 2. Create a parent component
const Counter = ({ children }: React.PropsWithChildren) => {
  const [count, setCount] = React.useState(0)
  const increase = () => setCount((c) => c + 1)
  const decrease = () => setCount((c) => c - 1)
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  )
}

// 3. Create a child components to help implementing the common task
const Count = () => {
  const context = React.useContext(CounterContext)
  if (!context) throw new Error('Count must be used within a Counter component')

  return <span>{context.count}</span>
}
const Label: FCC = ({ children }) => {
  return <span>{children}</span>
}
const Increase: FCC = ({ children }) => {
  const { increase } = React.useContext(CounterContext)
  return <Button onClick={increase}>{children ?? '+'}</Button>
}
const Decrease: FCC = ({ children }) => {
  const { decrease } = React.useContext(CounterContext)
  return <Button onClick={decrease}>{children ?? '-'}</Button>
}

// 4. Add child components as properties to parent component
Counter.Count = Count
Counter.Label = Label
Counter.Increase = Increase
Counter.Decrease = Decrease

export default Counter
