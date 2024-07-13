import React, {ReactNode} from 'react';

interface ContainerProps {
	children: ReactNode;
	id?: string;
	className?: string;
}

export default function Container(props: ContainerProps) {
	return (
		<section id={props.id} className={`${props.className}`}>
			{props.children}
		</section>
	);
}
