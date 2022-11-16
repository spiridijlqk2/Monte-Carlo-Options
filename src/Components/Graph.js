import Chart from "react-apexcharts";

const Graph = ({yData, xData}) => {
	let graphData = {
		series: [{
			name: "Price",
			data: xData
		}],
		options: {
			chart: {
				height: 350,
				type: 'line',
				zoom: {
					enabled: false
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'straight'
			},
			title: {
				text: 'Option Price Movement',
				align: 'left'
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				},
			},
			xaxis: {
				categories: yData,
			}
		}
	};

	return <Chart
		options={graphData.options}
		series={graphData.series}
		type="line"
		width={500}
	/>
}

export default Graph;
