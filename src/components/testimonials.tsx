"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    country: "United States",
    role: "Business Student",
    rating: 5,
    text: "Room Scholars made finding my accommodation incredibly easy. The property was exactly as described, and the support team was amazing throughout the process. Highly recommended!",
    initials: "SJ",
  },
  {
    name: "Mohammed Ali",
    country: "UAE",
    role: "Engineering Student",
    rating: 5,
    text: "I was nervous about finding accommodation abroad, but Room Scholars took all the stress away. The verified properties gave me peace of mind, and I love my new place!",
    initials: "MA",
  },
  {
    name: "Emily Chen",
    country: "China",
    role: "Medical Student",
    rating: 5,
    text: "The best student accommodation service I've used. Great locations, fair prices, and the 24/7 support really helps when you're new to the city. Five stars!",
    initials: "EC",
  },
  {
    name: "James Wilson",
    country: "Australia",
    role: "Law Student",
    rating: 4,
    text: "Fantastic selection of properties and the booking process was seamless. My only wish is that they had more properties in Manchester, but overall a great experience.",
    initials: "JW",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 sm:py-28 bg-[#F8F7F4]">
      <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A24C] font-semibold text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mt-3 mb-4">
            What Students Say
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100"
              >
                <Quote className="w-12 h-12 text-[#D4A24C]/20 mb-6" />
                <p className="text-lg sm:text-xl text-[#081F4D]/80 leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#081F4D] flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#081F4D]">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-sm text-[#081F4D]/60">
                      {testimonials[current].country} &middot;{" "}
                      {testimonials[current].role}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < testimonials[current].rating
                              ? "fill-[#D4A24C] text-[#D4A24C]"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#081F4D] hover:bg-[#081F4D] hover:text-white hover:border-[#081F4D] transition-all shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current
                      ? "bg-[#D4A24C] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#081F4D] hover:bg-[#081F4D] hover:text-white hover:border-[#081F4D] transition-all shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
