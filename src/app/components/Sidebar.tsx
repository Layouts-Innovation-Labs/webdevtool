/**
 * Represents the sidebar component of the application.
 */
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from './Tooltip';
import { toast } from 'sonner';
import {
	faBell,
	faChartBar,
	faCoins,
	faFileAlt,
	faGraduationCap,
	faHome,
	faMagnifyingGlassChart,
	faMagnifyingGlassDollar,
	faMessage,
	faPersonBreastfeeding,
	faScrewdriverWrench,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Represents the sidebar items with their respective href, icon, and label.
 */
const sidebarItems = [
	{ href: '/app/admin/dashboard', icon: faHome, label: 'Admin Dashboard' },
	{ href: '/app/student/dashboard', icon: faGraduationCap, label: 'Student Dashboard' },
	{ href: '/app/parent/dashboard', icon: faPersonBreastfeeding, label: 'Parent Dashboard' },
	// { href: '/app/student/:student_id', icon: faFileAlt, label: 'Student Records' },
	{ href: '/app/admin/reports', icon: faMagnifyingGlassChart, label: 'Admin Reports' },
	{ href: '/app/admin/analytics', icon: faChartBar, label: 'Analytics' },
	{ href: '/app/parent/financial-records', icon: faMagnifyingGlassDollar, label: 'Financial Records' },
	{ href: '/app/parent/payment', icon: faCoins, label: 'Payment' },
	{ href: '/app/notifications', icon: faBell, label: 'Notifications' },
	{ href: '/app/messaging', icon: faMessage, label: 'Messaging' },
	{ href: '/app/settings', icon: faScrewdriverWrench, label: 'Settings' },
];

/**
 * Represents the props for the Sidebar component.
 */
interface SidebarProps {
	isExpanded: boolean;
	toggleSidebar: () => void;
}

/**
 * Represents the Sidebar component.
 * @param {SidebarProps} props - The props for the Sidebar component.
 * @returns {JSX.Element} The Sidebar component.
 */
const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleSidebar }) => {
	const pathname = usePathname();
	const { push } = useRouter();

	/**
	 * Handles the logout functionality.
	 * @returns {Promise<void>} A promise that resolves when the logout is successful.
	 */
	async function handleLogout() {
		try {
			const response = await fetch("/api/auth/logout", {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				const responseData = await response.json();
				toast.info('Logged out', { description: 'Redirecting to login' });
				push('/auth/login');
			} else {
				const errorData = await response.json();
				toast.error('Oops! Something went wrong!', { description: errorData.message });
				console.error(errorData);
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred. Please try again later.');
		}
	}

	return (
		<div
			className={`fixed top-0 border-e-sec border-e-[2px] left-0 h-screen bg-suc text-white ${isExpanded ? 'w-64' : 'w-20'
				} transition-all duration-300 shadow-lg`}
		>
			<div
				className={`p-4 flex ${isExpanded ? 'w-64 justify-between' : 'w-20 justify-center'
					} items-center bg-pri border-b-sec shadow-lg border-b-2 border-e-sec border-e-2 transition-all duration-300`}
			>
				<Link href="/"
					className={`${isExpanded ? 'block' : 'hidden'} no-underline text-2xl text-sec-500 italic font-bold`}>
					{isExpanded && 'EduAmor'}
				</Link>
				<button onClick={toggleSidebar} className="focus:outline-none">
					<svg className="w-8 h-8 cursor-pointer text-2xl text-sec" fill="none" stroke="currentColor"
						viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d={isExpanded ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
					</svg>
				</button>
			</div>
			<nav className="overflow-y-auto hide-scrollbar h-[calc(100vh-4rem)]">
				<ul className={`list-none pl-0 ${isExpanded ? 'mb-[100px]' : 'mb-[100px]'}`}>
					{sidebarItems.map((item, index) => (
						<li key={index}>
							<Tooltip content={item.label}>
								<Link
									href={item.href}
									className={`flex no-underline p-4 align-items-center text-xl ${!isExpanded ? 'justify-center' : ''
										} hover:bg-pri-200 hover:text-sec ${pathname === item.href ? 'bg-sec text-pri hover:text-sec' : 'text-sec'}`}
								>
									<FontAwesomeIcon icon={item.icon} className="p-2 text-3xl" />
									{isExpanded && <span className="ml-4 text-1xl">{item.label}</span>}
								</Link>
							</Tooltip>
						</li>
					))}
				</ul>
				<Tooltip content={'Logout'}>
					<div
						onClick={handleLogout} className={`fixed ${isExpanded ? 'w-64 justify-between' : 'w-20 justify-center'} border-e-sec border-e-[2px] bottom-0 p-4 flex items-center bg-sec-400 text-suc border-b-sec shadow-lg border-b-2 transition-all duration-300`}
					>
						<Link href="/auth/logout"
							className={`${isExpanded ? 'block' : 'hidden'} no-underline text-2xl text-suc-500 italic font-bold`}>
							{isExpanded && 'Logout'}
						</Link>
						<button className="focus:outline-none">
							<FontAwesomeIcon icon={faSignOutAlt} className="text-3xl text-pri" />
						</button>
					</div>
				</Tooltip>
			</nav>
		</div>
	);
};

export default Sidebar;
