import { useEffect, useState } from "react";

/**
 * Component that displays an application report with animated counts.
 */
const AppReport = () => {
	// State variables to hold data and animate counts
	const [numStudents, setNumStudents] = useState(12098);
	const [numSchools, setNumSchools] = useState(9763);
	const [numSatisfiedParents, setNumSatisfiedParents] = useState(758);
	const [animationStarted, setAnimationStarted] = useState(false);

	// Function to fetch data (replace with actual API calls)
	const fetchData = () => {
		// Simulated data fetching - replace with actual API calls
		setNumStudents(250); // Example data
		setNumSchools(50); // Example data
		setNumSatisfiedParents(150); // Example data
	};

	useEffect(() => {
		fetchData(); // Fetch data on component mount
	}, []);

	// Effect to animate numbers
	useEffect(() => {
		if (!animationStarted) {
			const duration = 2000; // Animation duration in milliseconds
			const step = 50; // Update interval in milliseconds

			// Calculate step increments
			const studentsStep = Math.ceil(numStudents / (duration / step));
			const schoolsStep = Math.ceil(numSchools / (duration / step));
			const parentsStep = Math.ceil(numSatisfiedParents / (duration / step));

			// Interval to update numbers gradually
			const interval = setInterval(() => {
				setNumStudents((prev) => {
					const nextValue = prev + studentsStep;
					return nextValue >= numStudents ? numStudents : nextValue;
				});
				setNumSchools((prev) => {
					const nextValue = prev + schoolsStep;
					return nextValue >= numSchools ? numSchools : nextValue;
				});
				setNumSatisfiedParents((prev) => {
					const nextValue = prev + parentsStep;
					return nextValue >= numSatisfiedParents ? numSatisfiedParents : nextValue;
				});
			}, step);

			// Clear interval when animation completes
			setTimeout(() => {
				clearInterval(interval);
				setAnimationStarted(false); // Reset animation flag
			}, duration);

			// Set animation flag to true
			setAnimationStarted(true);
		}
	}, [numStudents, numSchools, numSatisfiedParents, animationStarted]);

	return (
		<div className="p-6">
			{/*<h2 className="text-2xl font-bold mb-4">Application Report</h2>*/}
			<div className="font-Playwrite grid grid-cols-1 lg:grid-cols-3 gap-4 text-sec">
				<div className="p-4 rounded-lg shadow-md flex justify-center align-items-center">
					<h3 className="text-1xl lg:text-4xl font-semibold mb-2">
						<span className="text-1xl lg:text-4xl font-bold mr-4">{numStudents}</span>
						Students
					</h3>
				</div>
				<div className="p-4 rounded-lg shadow-md flex justify-center align-items-center">
					<h3 className="text-1xl lg:text-4xl font-semibold mb-2">
						<span className="text-1xl lg:text-4xl font-bold mr-4">{numSchools}</span>
						Schools
					</h3>
				</div>
				<div className="p-4 rounded-lg shadow-md flex justify-center align-items-center">
					<h3 className="text-1xl lg:text-4xl font-semibold mb-2">
						<span className="text-1xl lg:text-4xl font-bold mr-4">{numSatisfiedParents}</span>
						Satisfied Parents
					</h3>
				</div>
			</div>
		</div>
	);
};

export default AppReport;
