import React, { useState } from "react";

function SquareCheckbox({ label, checked: initialChecked }: { label?: string; checked?: boolean; }) {
	const [isChecked] = useState(initialChecked || true);

	return (
		<label className="flex items-center space-x-2 cursor-pointer">
			<div
				className={`relative w-5 h-5 border rounded border-gray-400 ${
					isChecked ? "bg-white border-white" : ""
				}`}
			>
				<svg
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 25 25"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
			{label && <span className="text-sm">{label}</span>}
		</label>
	);
}

export default SquareCheckbox;
