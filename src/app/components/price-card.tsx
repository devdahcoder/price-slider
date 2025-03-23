import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import SquareCheckbox from "./checkbox,";

type Props = {
	id: number;
	title: string;
	price: number;
	hasDiscount?: boolean;
	featuresTitle: string;
	features: string[];
	isFocused?: boolean;
};

interface Position {
	x: number;
	y: number;
}

const PriceCard = (category: Props) => {
	const {
		id,
		title,
		price,
		features,
		featuresTitle,
		hasDiscount,
		isFocused: isPlanFocused,
	} = category;

	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({
		x: 0,
		y: 0,
	});
	const [opacity, setOpacity] = useState<number>(0);

	const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!divRef.current || isFocused) return;

		const rect = divRef.current.getBoundingClientRect();
		setPosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(0.6);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(0.6);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				duration: 0.5,
				delay: id * 0.1,
			}}
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`relative rounded-xl px-6 py-6 w-full ${
				isPlanFocused
					? "bg-neutral-800 ring-1 ring-white/30"
					: "bg-neutral-900"
			} overflow-hidden gap-y-7 flex flex-col`}
		>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.5,
				}}
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
				style={{
					opacity,
					background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 205, 0.25), transparent 80%)`,
				}}
			/>
			<motion.div className="flex flex-col items-start gap-y-6">
				<div className="flex flex-col items-start gap-y-2">
					<div className="text-2xl">
						<p>{title}</p>
					</div>
					<div className="flex flex-row items-center gap-x-1.5 text-4xl">
						<motion.p
							key={price}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							${price}
						</motion.p>
						{hasDiscount && (
							<span className="rounded-sm py-0.5 px-1 border text-sm text-neutral-500">
								-15%
							</span>
						)}
					</div>
					<div className="text-sm">
						<p>per user/month, billed annually</p>
					</div>
				</div>

				<motion.div className="flex flex-col items-start gap-y-3">
					<motion.div>
						<p>{featuresTitle}</p>
					</motion.div>

					<motion.div className="text-white text-sm">
						<ul className="list-none flex flex-col gap-y-3.5">
							{features.map((feature: string, index: number) => (
								<li
									className="flex flex-row items-center justify-start gap-x-3"
									key={index}
								>
									<SquareCheckbox />
									<div>
										<p>{feature}</p>
									</div>
								</li>
							))}
						</ul>
					</motion.div>
				</motion.div>
			</motion.div>

			<motion.a
				href="http://"
				className={`w-full flex flex-row items-center justify-center py-2.5 text-center ${
					isPlanFocused
						? "bg-white text-black"
						: "bg-neutral-800 text-white hover:bg-neutral-700"
				} rounded-md transition-colors`}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				Get Started
			</motion.a>
		</motion.div>
	);
};

export default PriceCard;
