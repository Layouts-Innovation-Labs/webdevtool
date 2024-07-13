/**
 * Represents a benefit card component.
 */
import React from 'react';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface CardProps {
	title: string;
	description: string;
	icon: IconDefinition;
}

/**
 * A functional component that renders a benefit card.
 * @param title - The title of the card.
 * @param description - The description of the card.
 * @param icon - The icon to be displayed on the card.
 * @returns The rendered benefit card component.
 */
const BenefitCard: React.FC<CardProps> = ({title, description, icon}) => {
	return (
		<div
			className="flex h-full border-1 border-sec hover:animate-glow rounded-4 flex-col items-center justify-center mb-8 md:mb-0 md:w-80 mx-auto">
			<div
				className="relative border-3 h-full shadow-sec-glow transform rotate-6 rounded-2xl bg-gray-100 p-6 transition duration-300 hover:rotate-0">
				<div className="absolute top-0 left-0 m-2 mr-2 h-4 w-4 rounded-full bg-gray-900"></div>
				<div>
					<p className="text-center text-3xl font-extrabold mb-0 text-gray-900">{title}</p>
					<footer className={`justify-center p-3 hover:animate-float`}>
						<div
							className="flex items-center justify-center align-middle gap-2 rounded-lg bg-sec px-4 py-2.5 text-pri-400 hover:text-sec hover:bg-pri-400">
							<FontAwesomeIcon icon={icon} className="text-9xl"/>
						</div>
					</footer>
					<p className="text-center text-lg text-gray-700">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default BenefitCard;
