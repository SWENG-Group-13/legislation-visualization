import React from "react";

export const Searchbar = ({ placeholder, onClick }) => {
	const [input, setInput] = React.useState("");
	return (
		<div className='searchbar-wrapper'>
			<input
				type='text'
				className='searchbar-input'
				value={input}
				placeholder={placeholder}
				onChange={(e) => {
					setInput(e.target.value);
				}}
			/>
			<button
				className='searchbar-button'
				onClick={(e) => {
					e.preventDefault();
					onClick?.(input);
					setInput("");
				}}>
				Search
			</button>
		</div>
	);
};
