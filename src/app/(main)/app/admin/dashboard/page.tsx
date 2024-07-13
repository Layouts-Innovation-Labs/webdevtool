"use client";
import { EarningsExpensesChart } from './RevenueChart';
import { GenderBarChart } from './GenderBarChart';
import { PaymentStatusChart } from './PaymentStatusChart';
import { EventCalendar } from './EventCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faMoneyBillWave, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { color } from 'chart.js/helpers';

const cardsData = [
	{
		title: 'Total Students',
		value: '150',
		icon: faUsers,
		colorBg: 'bg-blue-100',
		colorIc: 'text-blue-500',
	},
	{
		title: 'Total Teachers',
		value: '30',
		icon: faChalkboardTeacher,
		colorBg: 'bg-inf-100',
		colorIc: 'text-inf-500',
	},
	{
		title: 'Total Parents',
		value: '120',
		icon: faUserTie,
		colorBg: 'bg-sec-100',
		colorIc: 'text-sec-500',
	},
	{
		title: 'Term Earnings',
		value: '₦1,500,000',
		icon: faMoneyBillWave,
		colorBg: 'bg-pri-100',
		colorIc: 'text-pri-500',
	},
];

const notices = [
	{ date: '2023-01-10', notice: 'Upcoming exam schedule' },
	{ date: '2023-01-15', notice: 'Parent-teacher meeting on Friday' },
	{ date: '2023-01-20', notice: 'New library books available' },
	{ date: '2023-01-25', notice: 'Sports day event' },
	{ date: '2023-02-01', notice: 'Science fair announcement' },
	{ date: '2023-02-05', notice: 'New school uniforms arrival' },
	{ date: '2023-02-10', notice: 'Holiday on public day' },
	{ date: '2023-02-15', notice: 'Cultural fest preparation' },
	{ date: '2023-02-20', notice: 'New cafeteria menu' },
	{ date: '2023-02-25', notice: 'Annual day celebration' },
	{ date: '2023-03-01', notice: 'PTA meeting next month' },
];


export default function AdminOverview() {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-2 xl:gap-4 mb-4">
				{cardsData.map((card, index) => (
					<div key={index} className={`p-5 rounded-lg shadow-md animate-slideInTop ${card.colorBg}`}>
						<div className="flex text-4xl items-center">
							<FontAwesomeIcon icon={card.icon} className={`text-7xl ${card.colorIc} mr-4`} />
							<div>
								<h2 className="text-lg font-semibold">{card.title}</h2>
								<p className="text-2xl overflow-clip text-ellipsis">{card.value}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"></div> */}
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<div className="bg-white p-4 rounded-lg shadow-md">
					<EarningsExpensesChart />
					<br className='md:my-[5opx]' />
					<GenderBarChart />
				</div>
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold">Tuition Payment Status</h2>
					<PaymentStatusChart />
				</div>
			</div>
			<EventCalendar />
		</div>
	);
};