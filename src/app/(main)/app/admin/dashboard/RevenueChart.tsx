import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsExpensesChart = () => {
	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Earnings',
				data: [65, 59, 80, 81, 56, 55, 40],
				fill: false,
				backgroundColor: 'rgb(75, 192, 192)',
				borderColor: 'rgba(75, 192, 192, 0.2)',
			},
			{
				label: 'Expenses',
				data: [50, 45, 60, 70, 46, 50, 30],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
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
				text: 'Monthly Earnings and Expenses',
			},
		},
	};

	return <Line data={data} options={options} />;
};

export { EarningsExpensesChart };
