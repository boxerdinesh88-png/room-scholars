"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  MapPin,
  Home,
  HeadphonesIcon,
  Play,
  Search,
} from "lucide-react";

const features = [
  { icon: ShieldCheck, text: "Verified & Trusted Properties" },
  { icon: MapPin, text: "Prime Locations Across London" },
  { icon: Home, text: "Fully Furnished & Well Maintained" },
  { icon: HeadphonesIcon, text: "24/7 Support & Assistance" },
];

export default function Hero() {
  const router = useRouter();
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = (document.getElementById("hero-search") as HTMLInputElement)?.value.trim();
    router.push(q ? `/destinations?q=${encodeURIComponent(q)}` : "/destinations");
  }, [router]);

  return (
    <section className="bg-[#071D49] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(212,162,76,0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(255,255,255,0.03),_transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F7F4] via-white/40 to-transparent pointer-events-none" />

      <div className="relative z-10 w-[90%] max-w-[1700px] mx-auto mt-8 lg:mt-12 pb-0">
        <div className="hidden lg:flex items-center justify-between py-5 mb-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-white/40 text-xs tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24C]" />
            Premium student accommodation since 2020
          </div>
          <div className="flex items-center gap-8 text-white/40 text-xs">
            <span>+44 1234 567890</span>
            <span>info@roomscholars.com</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-[15px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] overflow-hidden border border-white/5"
        >
          <div className="grid lg:grid-cols-2 min-h-[580px]">
            <div className="px-8 sm:px-12 lg:px-14 xl:px-16 py-14 lg:py-16 xl:py-20 flex flex-col justify-center relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A24C]/[0.02] rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/20 text-[#D4A24C] text-xs font-semibold tracking-wide mb-7">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#D4A24C] opacity-75 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-[#D4A24C]" />
                  </span>
                  Premium Student Accommodation
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-[family-name:var(--font-playfair)] leading-[1.08] text-[#081F4D] mb-5">
                  Premium Student
                  <br />
                  Stays in{" "}
                  <span className="text-[#D4A24C] relative">
                    London
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5" viewBox="0 0 200 10" fill="none">
                      <path d="M0 5 Q50 0, 100 5 Q150 10, 200 5" stroke="#D4A24C" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" fill="none" />
                    </svg>
                  </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#081F4D]/55 leading-relaxed max-w-xl mb-9 lg:mb-10">
                  Fully furnished student accommodation in prime locations with
                  flexible stays and total comfort.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-9 lg:mb-10">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3 bg-[#F8F7F4]/80 rounded-xl px-4 py-3.5 border border-gray-100/80 hover:bg-white hover:border-[#D4A24C]/25 hover:shadow-lg hover:shadow-[#D4A24C]/5 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A24C]/15 to-[#D4A24C]/5 flex items-center justify-center shrink-0 group-hover:from-[#D4A24C]/20 group-hover:to-[#D4A24C]/10 transition-all duration-300">
                        <Icon className="w-4.5 h-4.5 text-[#D4A24C]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#081F4D]/80 leading-tight">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/destinations">
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full text-sm px-9 h-13 shadow-xl shadow-[#D4A24C]/25 hover:shadow-2xl hover:shadow-[#D4A24C]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    Explore Properties
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button
                    variant="outline-dark"
                    size="lg"
                    className="rounded-full text-sm px-8 h-13 gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    How It Works
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative min-h-[420px] lg:min-h-full overflow-hidden">
              <Image
                src="/Gemini_Generated_Image_bavkambavkambavk.png"
                alt="London cityscape with Big Ben and Houses of Parliament"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[68%_center] scale-105 transition-transform duration-[2s] ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/25 via-40% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

              <div className="absolute top-6 right-6 flex items-center gap-3 bg-[#081F4D]/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-[#D4A24C]/20 flex items-center justify-center">
                  <MapPin className="w-4.5 h-4.5 text-[#D4A24C]" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">Location</p>
                  <p className="text-sm font-bold text-white">London, United Kingdom</p>
                </div>
              </div>

              <div className="absolute bottom-12 right-6 flex items-center gap-3 bg-[#081F4D]/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/10">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4A24C] to-[#c08e38] border-2 border-white/30 flex items-center justify-center text-[11px] text-[#081F4D] font-bold shadow-lg"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">Happy Students</p>
                  <p className="text-sm font-bold text-white">2,000+</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative z-20 -mt-7 lg:-mt-10">
          <div className="bg-white rounded-2xl lg:rounded-[20px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100/60 p-5 sm:p-7 lg:p-9 relative overflow-hidden">
            <div className="absolute top-0 left-[20%] right-[20%] h-1 bg-gradient-to-r from-transparent via-[#D4A24C]/60 to-transparent rounded-full" />

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 max-w-4xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4A24C]" />
                <input
                  id="hero-search"
                  type="text"
                  placeholder="Search by city, property name, or location..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 bg-[#F8F7F4]/50 text-sm text-[#081F4D] placeholder:text-[#081F4D]/35 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all hover:border-[#D4A24C]/50 shadow-sm"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="rounded-xl px-8 gap-2.5 h-14 shadow-xl shadow-[#D4A24C]/25 hover:shadow-2xl hover:shadow-[#D4A24C]/35 text-sm tracking-wide font-bold hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto shrink-0 cursor-pointer"
              >
                <Search className="w-5 h-5" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
