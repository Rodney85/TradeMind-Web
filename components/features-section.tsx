"use client";

import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconChartBar,
  IconCurrencyDollar,
  IconClockHour4,
  IconTargetArrow,
  IconSword,
  IconStarFilled,
  IconTrophy,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import Image from "next/image";

export function FeaturesSection() {
  return (
    <div id="features" className="relative min-h-screen">
      <div className="absolute inset-0">
        <div className="h-full w-full dark:bg-black bg-white [background-size:16px_16px] [background-image:radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-8 sm:pb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300">
            Unlock Your Trading Potential with Powerful Features
          </h2>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-7 sm:leading-8 text-neutral-600 dark:text-neutral-300 font-light tracking-wide max-w-2xl mx-auto">
            TradeMind is packed with tools to help you master your psychology, improve your decision-making, and achieve consistent profitability.
          </p>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={cn("[&>p:text-lg]", item.className)}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skeleton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-3 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center gap-2"
      >
        <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-2">
          <IconSword className="w-4 h-4 text-red-600" />
        </div>
        <p className="text-xs text-center font-semibold text-neutral-500">
          Complete daily challenges to improve
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-[10px] rounded-full px-2 py-0.5">
          Challenges
        </p>
      </motion.div>
      <motion.div 
        className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-3 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center gap-2"
      >
        <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
          <IconStarFilled className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-xs text-center font-semibold text-neutral-500">
          Earn points with consistent trading
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-[10px] rounded-full px-2 py-0.5">
          Points
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-3 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center gap-2"
      >
        <div className="rounded-full bg-orange-100 dark:bg-orange-900/20 p-2">
          <IconTrophy className="w-4 h-4 text-orange-600" />
        </div>
        <p className="text-xs text-center font-semibold text-neutral-500">
          Win real prizes and rewards
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-[10px] rounded-full px-2 py-0.5">
          Prizes
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
        <div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-900 rounded-full" />
      </div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center"
    >
      <motion.div
        variants={variants}
        className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
      />
    </motion.div>
  );
};

const items = [
  {
    title: "Effortless Trade Logging",
    description: (
      <span className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Quickly record your trades and emotional state with our intuitive and user-friendly journal.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-2",
    icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AI-Powered Insights",
    description: (
      <span className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Gain personalized feedback on your trading psychology and performance, uncovering hidden patterns and areas for improvement.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Trade & Earn",
    description: (
      <span className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Turn your trading journey into an engaging experience. Complete challenges, earn points, and win real prizes while improving your trading psychology.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconCurrencyDollar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Deep Psychology Tracking",
    description: (
      <span className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Monitor your emotions, identify triggers, and develop mental resilience to overcome fear and greed.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-1",
    icon: <IconTargetArrow className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Actionable Analytics",
    description: (
      <span className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
        Visualize your progress, track key performance metrics, and gain a data-driven understanding of your trading journey.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconStarFilled className="h-4 w-4 text-neutral-500" />,
  },
];
