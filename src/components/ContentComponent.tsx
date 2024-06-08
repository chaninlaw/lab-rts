import { Card, Row } from 'antd'
import { Tabs } from '../compound/Tabs'
import { style } from '../constants/style'

const ContentComponent = () => {
  return (
    <Card bodyStyle={style}>
      <Tabs>
        {/* Group of tabs */}
        <Row justify='center'>
          <Tabs.Tab label="a">Tab A</Tabs.Tab>
          <Tabs.Tab label="b">Tab B</Tabs.Tab>
          <Tabs.Tab label="c">Tab C</Tabs.Tab>
        </Row>

        {/* Tab panels */}
        <Tabs.Panel label="a">
          This is tab A{' '}
          <span role="img" aria-label="Rocket ship">
            🚀
          </span>
        </Tabs.Panel>
        <Tabs.Panel label="b">
          This is tab B{' '}
          <span role="img" aria-label="Diamond">
            💎
          </span>
        </Tabs.Panel>
        <Tabs.Panel label="c">
          This is tab C{' '}
          <span role="img" aria-label="Ghost">
            👻
          </span>
        </Tabs.Panel>
      </Tabs>
    </Card>
  )
}

export default ContentComponent
