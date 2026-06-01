"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, MapPin, HeadphonesIcon } from "lucide-react";

interface CounterProps {
  end: number;
  suffix: string;
  duration?: number;
}

function Counter({ end, suffix, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    value: 2000,
    suffix: "+",
    label: "Happy Students",
  },
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Properties Listed",
  },
  {
    icon: MapPin,
    value: 20,
    suffix: "+",
    label: "Cities Covered",
  },
  {
    icon: HeadphonesIcon,
    value: 24,
    suffix: "/7",
    label: "Support Available",
  },
];

export default function Statistics() {
  return (
    <section className="py-20 sm:py-28 bg-[#081F4D] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A24C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4A24C]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A24C] font-semibold text-sm tracking-widest uppercase">
            Our Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white mt-3 mb-4">
            Room Scholars by the Numbers
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 text-center border border-white/[0.06] hover:border-[#D4A24C]/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#D4A24C]/10 transition-all duration-300 ring-1 ring-white/[0.08] group-hover:ring-[#D4A24C]/30">
                  <Icon className="w-8 h-8 text-[#D4A24C]" />
                </div>
                <p className="text-white/50 text-sm tracking-wide uppercase">
                  {stat.label}
                </p>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 mt-5 font-[family-name:var(--font-playfair)]">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="w-8 h-0.5 bg-[#D4A24C]/40 mx-auto group-hover:w-12 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
