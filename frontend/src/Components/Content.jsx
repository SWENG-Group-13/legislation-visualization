import React from "react";

export const Content = ({ title, children }) => {
	return (
		<div className='flex-column'>
			<div className='flex-item'>
				<h2>{title}</h2>
				<div className='flex-content'>{children}</div>
			</div>
		</div>
	);
};
