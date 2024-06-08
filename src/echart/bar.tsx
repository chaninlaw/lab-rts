import { EChartOption } from 'echarts'
import ReactECharts from 'echarts-for-react'

export const Bar = () => {
	const options: EChartOption<EChartOption.SeriesLine> = {
		title: {
			text: 'Referer of a Website',
			subtext: 'Fake Data',
			left: 'center',
		},
		grid: { top: 8, right: 8, bottom: 24, left: 36 },
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				smooth: true,
			},
		],
		tooltip: {
			trigger: 'axis',
		},
	}

	return (
		<ReactECharts option={options} style={{ height: '100%', padding: 10 }} />
	)
}
