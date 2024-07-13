// components/Tooltip.tsx
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

/**
 * Props for the Tooltip component.
 */
interface TooltipProps {
	/**
	 * The content to be displayed in the tooltip.
	 */
	content: string;
	/**
	 * The React element that triggers the tooltip.
	 */
	children: React.ReactElement;
	/**
	 * The delay in milliseconds before the tooltip appears.
	 * @default 1000
	 */
	delay?: number;
	/**
	 * The position for the tooltip to appears.
	 * @default right
	 */
	position?: string;
}


/**
 * A tooltip component that displays additional information when the user hovers over an element.
 */
const Tooltip: React.FC<TooltipProps> = ({ content, children, delay = 1000, position}) => (
	<Tippy
		content={content}
		className="bg-secondary text-light rounded p-2"
		arrow={true}
		// @ts-ignore
		placement={!position ? 'right' : position}
		delay={delay}
	>
		{children}
	</Tippy>
);

export default Tooltip;
