import ReactECharts from 'echarts-for-react'
import { useEffect } from 'react'
import { EChartOption, EChartsLoadingOption } from 'echarts'

export function Pie() {
	const option: EChartOption<EChartOption.SeriesPie> = {
		title: {
			text: 'Referer of a Website',
			subtext: 'Fake Data',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
		},
		legend: {
			orient: 'vertical',
			left: 'left',
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: '50%',
				data: [
					{ value: 1048, name: 'Search Engine' },
					{ value: 735, name: 'Direct' },
					{ value: 580, name: 'Email' },
					{ value: 484, name: 'Union Ads' },
					{ value: 300, name: 'Video Ads' },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}

	let timer: ReturnType<typeof setTimeout>

	useEffect(() => {
		console.log('render.pie')
		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadingOption: EChartsLoadingOption = {
		text: 'Loading...',
		color: 'orange',
		textColor: 'orange',
		maskColor: 'transparent',
		zlevel: 1,
	}

	function onChartReady(echarts: echarts.ECharts) {
		timer = setTimeout(function () {
			echarts.hideLoading()
		}, 1000)
	}

	function onChartClick(param: string, echarts: echarts.ECharts) {
		console.log(param, echarts)
	}

	return (
		<ReactECharts
			option={option}
			style={{ height: '100%', padding: 10 }}
			onEvents={{
				click: onChartClick,
			}}
			loadingOption={loadingOption}
			onChartReady={onChartReady}
			showLoading
		/>
	)
}
