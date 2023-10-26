import { Card, Progress } from 'antd'
import { style } from '../constants/style'
import styled from 'styled-components'
import React from 'react'

const StyledProgress = styled(Progress)`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  margin-bottom: 30px; // styled for test

  .ant-progress-outer {
    margin: 0 10px;
    padding: 0;
    position: relative; // styled for test
  }

  .ant-progress-text {
    position: absolute; // styled for test
    top: 20px;
    left: 70px;
    font-size: 12px;
    margin: 0 auto;
    transform: translateX(-250%);
    padding-bottom: 14px;
  }
`
const ProgressBar: React.FC<{percent: number, text: string | React.ReactNode}> = ({ percent, text}) => {
  return (
    <StyledProgress
      showInfo
      percent={percent < 0 ? 100 : percent}
      format={() => <>{text}</>}
      status={percent < 0 ? 'success' : percent >= 100 ? 'exception' : 'normal'}
    />
  )
}

const ProgessComponent = () => {

  return (
    <Card bodyStyle={style}>
      <ProgressBar percent={25} text={<strong>251.34 GB of 1 TB (25%) used</strong>}/>
      <ProgressBar percent={101} text={<strong>1.1 TB of 1 TB (Full) used</strong>}/>
      <ProgressBar percent={-1} text={<strong>2.5 TB of Unlimited usage</strong>} />
    </Card>
  )
}

export default ProgessComponent
