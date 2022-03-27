import React from "react";

export const WideContent = ({ title, children }) => {
	return (
		<div className='flex-row'>
			<div className='flex-item'>
				<h2>{title}</h2>
				<div className='flex-content'>{children}</div>
			</div>
		</div>
	);
};
