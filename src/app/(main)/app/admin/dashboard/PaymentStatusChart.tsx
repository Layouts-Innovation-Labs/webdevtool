import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentStatusChart = () => {
	const data = {
		labels: ['Paid', 'Not Paid'],
		datasets: [
			{
				label: 'Tuition Payment Status',
				data: [100, 50],  // Replace with your actual data
				backgroundColor: ['bg-sec', 'rgba(255, 99, 132, 0.2)'],
				borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Tuition Payment Status',
			},
		},
	};

	return <Pie data={data} options={options}/>;
};

export { PaymentStatusChart };
