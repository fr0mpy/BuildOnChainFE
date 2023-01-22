import * as React from 'react';

interface IProps {
	className?: string;
	horizontal?: boolean;
	spacing: number;
	vertical?: boolean;
	style?: React.CSSProperties;
}

export const Spacer = ({ className, horizontal, vertical, style, spacing }: IProps) => {
	const calculateMargin = () => {
		spacing = spacing * 8;

		if (horizontal) {
			return { width: `${spacing}px` };
		} else if (vertical) {
			return { height: `${spacing}px`, minHeight: `${spacing}px` };
		} else {
			return {};
		}
	};

	const space = calculateMargin();

	return <div
		className={className}
		style={Object.assign(style ?? {}, space)}
	/>;
};

