import React, { useId, useState } from "react";
import { handler } from "tailwindcss-animate";

const Input = React.forwardRef(function Input(
	{ label, type = "text", className = "", ...props },
	ref
) {
	const id = useId();
	return (
		<div className="w-full">
			{label && (
				<label
					className="inline-block text-left w-full mb-1 pl-1"
					htmlFor={id}>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`px-3 py-1.5 rounded-[4px] bg-[#d1d5db] text-black outline-none focus:bg-gray-50 duration-200 border-2 border-[#9ca3af] w-full ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	);
});
export default Input;


