import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderBarChart = () => {
	const data = {
		labels: ['Male Students', 'Female Students', 'Male Workers', 'Female Workers'],
		datasets: [
			{
				label: 'Gender Distribution',
				data: [60, 40, 20, 10],
				backgroundColor: [
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
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
				text: 'Gender Distribution of Students and Staff',
			},
		},
	};

	return <Bar data={data} options={options} />;
};

export { GenderBarChart };
