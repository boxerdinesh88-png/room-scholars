"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Users, DollarSign } from "lucide-react";

const locations = [
  "London",
  "Manchester",
  "Birmingham",
  "Liverpool",
  "Leeds",
  "Edinburgh",
];
const durations = [
  "Any Duration",
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months",
];
const budgets = [
  "Any Budget",
  "£100 - £200 / week",
  "£200 - £300 / week",
  "£300 - £400 / week",
  "£400+ / week",
];

export default function PropertySearch() {
  return (
    <section className="relative z-20 w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 -mt-14 lg:-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-white/20 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent rounded-full" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#081F4D]/50 uppercase tracking-wider px-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A24C]" />
              <select className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#081F4D] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] appearance-none cursor-pointer transition-all hover:border-[#D4A24C]/40 shadow-sm">
                <option>Select city</option>
                {locations.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#081F4D]/50 uppercase tracking-wider px-1">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A24C]" />
              <input
                type="date"
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#081F4D] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all hover:border-[#D4A24C]/40 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#081F4D]/50 uppercase tracking-wider px-1">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A24C]" />
              <input
                type="date"
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#081F4D] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all hover:border-[#D4A24C]/40 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#081F4D]/50 uppercase tracking-wider px-1">Duration</label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A24C]" />
              <select className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#081F4D] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] appearance-none cursor-pointer transition-all hover:border-[#D4A24C]/40 shadow-sm">
                {durations.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#081F4D]/50 uppercase tracking-wider px-1">Budget (Per Week)</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A24C]" />
              <select className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#081F4D] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] appearance-none cursor-pointer transition-all hover:border-[#D4A24C]/40 shadow-sm">
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-7 flex justify-center">
          <Button
            variant="default"
            size="lg"
            className="rounded-full px-14 gap-2.5 h-13 shadow-xl shadow-[#D4A24C]/25 hover:shadow-2xl hover:shadow-[#D4A24C]/35 text-sm tracking-widest font-bold"
          >
            <Search className="w-4.5 h-4.5" />
            SEARCH PROPERTIES
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
