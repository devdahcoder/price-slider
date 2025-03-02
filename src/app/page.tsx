"use client";
import PriceSlider from "@components/price-slider";
import { motion } from "motion/react";
import PriceCard from './components/price-card';

const categories: {
	id: number;
	title: string;
	price: number;
	hasDiscount?: boolean;
	featuresTitle: string;
	features: string[];
}[] = [
	{
		id: 1,
		title: "Free",
		price: 0,
		featuresTitle: "For Small Teams",
		features: [
			"10 users included",
			"2 GB of storage",
			"Email support",
			"Help center access",
		],
	},
	{
		id: 2,
		title: "Basic",
		price: 15,
		hasDiscount: true,
		featuresTitle: "For Growing Teams",
		features: [
			"20 users included",
			"10 GB of storage",
			"Priority email support",
			"Help center access",
		],
	},
	{
		id: 3,
		title: "Pro",
		price: 25,
		hasDiscount: true,
		featuresTitle: "For Scaling Businesses",
		features: [
			"50 users included",
			"30 GB of storage",
			"Phone and email support",
			"Help center access",
		],
	},
	{
		id: 4,
		title: "Enterprise",
		price: 45,
		featuresTitle: "For Big Corporation",
		features: [
			"Unlimited users",
			"100 GB of storage",
			"Priority phone and email support",
			"Help center access",
		],
	},
  ];

export default function Home() {
	
  return (
		<div className="font-[family-name:var(--font-inter)]">
			<div className="py-20">
				<div className="w-[95%] mx-auto flex flex-col gap-y-28">
					<div className="flex flex-col items-center gap-y-10 ">
						<div className="flex flex-col items-center gap-y-5">
							<div className="text-center flex flex-col gap-y-4">
								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									className="text-4xl font-medium sm:text-4xl lg:text-7xl text-[#b5b5b5a4] bg-clip-text inline-block animate-shine"
									style={{
										backgroundImage:
											"linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
										backgroundSize: "200% 100%",
										WebkitBackgroundClip: "text",
										animationDuration: `${5}s`,
									}}
								>
									Pricing Plans
								</motion.p>
								<motion.p
									initial={{ opacity: 0, translateY: 50 }}
									whileInView={{
										opacity: 1,
										translateY: 0,
									}}
									viewport={{ once: true }}
									transition={{
										duration: 0.5,
										delay: 0.2,
									}}
									className="mt-4 text-xl text-white max-w-[30rem] mx-auto select-none"
								>
									Perfectly tailored for every stage of your
									growth. Get started today, no credit card
									needed.
									{/* Choose the perfect plan for your needs,
									Choose a plan that’s right for you */}
								</motion.p>
							</div>
						</div>

						<div className="flex flex-col w-full items-center gap-y-5">
							<PriceSlider />
						</div>
					</div>

					<div className="flex flex-row items-center w-full gap-x-5">
						{categories?.map((category, index) => (<PriceCard key={index} {...category} />))}
					</div>
				</div>
			</div>
		</div>
  );
}
