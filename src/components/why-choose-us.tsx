"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Home,
  FileText,
  HeadphonesIcon,
  BadgeDollarSign,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "All properties are thoroughly verified for quality and authenticity.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description:
      "Properties in the best student-friendly neighborhoods across cities.",
  },
  {
    icon: Home,
    title: "Fully Furnished",
    description:
      "Move-in ready spaces with modern furniture and essential appliances.",
  },
  {
    icon: FileText,
    title: "Flexible Contracts",
    description:
      "Short-term and long-term leases tailored to your academic schedule.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance for any issues or questions you may have.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Value for Money",
    description:
      "Competitive pricing with no hidden fees or surprise charges.",
  },
];

export default function WhyChooseUs() {
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
            Why Room Scholars
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mt-3 mb-4">
            Why Choose Us
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
          <p className="text-[#081F4D]/60 mt-4 max-w-2xl mx-auto">
            We provide the best student accommodation experience with verified
            properties and unmatched support.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#D4A24C]/20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#081F4D] to-[#0a2d6b] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#081F4D]/20 transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#D4A24C]" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#081F4D]/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
