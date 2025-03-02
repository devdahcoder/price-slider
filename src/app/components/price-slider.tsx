import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
type Props = {
	min?: number;
	max?: number;
	step?: number;
	defaultValue?: number;
	onChangeHandler?: (n: any) => void;
};

const PriceSlider = ({
	min = 0,
	max = 7,
	step = 1,
	defaultValue = 0,
	onChangeHandler,
}: Props) => {
	const values = [
		5000, 50000, 100000, 200000, 500000, 1000000, 1500000, 2500000, 3000000,
	];
	const [value, setValue] = useState(defaultValue);
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	const formatCurrency = (value: number) => {
		return value.toLocaleString("en-US", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
	};
	const findClosestValue = (target: number) => {
		const closest = values?.reduce((prev, curr) => {
			return Math.abs(curr - target) < Math.abs(prev - target)
				? curr
				: prev;
		}, values[0]);
		return closest;
	};

	const calculatePercentage = () => {
		const index = values.indexOf(findClosestValue(value));
		return (index / (values.length - 1)) * 100;
	};

	const handleSliderChange = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const rect = sliderRef.current?.getBoundingClientRect();
		if (!rect) return;
		const x = event.clientX - rect.left;
		const percentage = x / rect.width;
		const index = Math.round(percentage * (values.length - 1));
		const clampedIndex = Math.min(Math.max(index, 0), values.length - 1);
		const newValue = values[clampedIndex];

		setValue(newValue);
		// onChange?.(newValue);
	};

	const handleMouseDown = () => {
		setIsDragging(true);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (event: MouseEvent | any) => {
		if (isDragging) {
			handleSliderChange(event);
		}
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging]);

	return (
		<div className="w-full max-w-[44rem]">
			<div className="relative pt-2">
				<motion.div
					ref={sliderRef}
					className="relative h-[5px] bg-gray-700 rounded-full cursor-pointer"
					onMouseDown={handleMouseDown}
					onClick={(e) => handleSliderChange(e)}
				>
					<motion.div
						animate={{ width: `${calculatePercentage()}%` }}
						transition={{ duration: 0.1 }}
						className="absolute h-full bg-white rounded-full"
					/>

					<motion.div
						animate={{ left: `${calculatePercentage()}%` }}
						transition={{ duration: 0.1 }}
						className={`absolute w-5 h-5 bg-white border-0 border-none rounded-full -mt-[7px] transform -translate-x-1/2 transition-transform
              ${isDragging ? "scale-110" : "hover:scale-110"}
            `}
					/>
				</motion.div>

				<div className="relative mt-4 w-full">
					{values.map((req, index) => (
						<motion.button
							key={req}
							className="absolute text-xs text-gray-600 transform -translate-x-1/2 font-medium outline-none outline-0 border-0 border-none cursor-pointer select-none"
							onClick={(e) => handleSliderChange(e)}
							style={{
								left: `${(index / (values.length - 1)) * 100}%`,
							}}
							initial={{
								left: `${(index / (values.length - 1)) * 100}%`,
							}}
							animate={{
								left: `${(index / (values.length - 1)) * 100}%`,
								opacity: value === req ? 1 : 0.5,
								color: `${value === req ? "#fff" : "#b5b5b5"}`,
							}}
						>
							{formatCurrency(req)}
							{req === 3000000 ? "+" : ""}
						</motion.button>
					))}
				</div>
			</div>
			<motion.input
				type="range"
				min={0}
				max={values.length - 1}
				step={1}
				value={values.indexOf(findClosestValue(value))}
				onChange={(e) => {
					const newValue = values[Number(e.target.value)];
					setValue(newValue);
					// onChange?.(newValue);
				}}
				className="sr-only"
			/>
		</div>
	);
};

export default PriceSlider;
