"use client";

import { motion } from "framer-motion";
import { Search, GitCompare, BookOpen } from "lucide-react";

import type { LucideIcon } from "lucide-react";

const steps = [
  {
    icon: Search as LucideIcon,
    step: "01",
    title: "Search Property",
    description:
      "Browse our extensive collection of verified student properties across top UK cities.",
  },
  {
    icon: GitCompare as LucideIcon,
    step: "02",
    title: "Compare Options",
    description:
      "Compare prices, locations, and amenities to find your perfect match.",
  },
  {
    icon: BookOpen as LucideIcon,
    step: "03",
    title: "Book Online",
    description:
      "Secure your booking instantly online with our hassle-free process.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A24C] font-semibold text-sm tracking-widest uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mt-3 mb-4">
            How It Works
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
          <p className="text-[#081F4D]/60 mt-4 max-w-2xl mx-auto">
            Find and book your ideal student accommodation in three simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16 relative">
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-[#D4A24C]/40 via-[#D4A24C] to-[#D4A24C]/40" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#081F4D] flex items-center justify-center mb-6 shadow-lg shadow-[#081F4D]/20">
                  <Icon className="w-9 h-9 text-[#D4A24C]" />
                </div>
                <span className="text-[#D4A24C] font-bold text-sm mb-2">
                  Step {step.step}
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#081F4D]/60 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
