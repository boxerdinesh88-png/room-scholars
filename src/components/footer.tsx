"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Globe,
  MessageCircle,
  Camera,
  Users,
  Play,
} from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "#" },
  { label: "Properties", href: "#properties" },
  { label: "Destinations", href: "#destinations" },
  { label: "How It Works", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "#" },
];

const destinations = [
  { label: "London", href: "#" },
  { label: "Manchester", href: "#" },
  { label: "Birmingham", href: "#" },
  { label: "Liverpool", href: "#" },
  { label: "Leeds", href: "#" },
  { label: "Edinburgh", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#081F4D] text-white">
      <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-[#D4A24C] font-bold text-lg font-[family-name:var(--font-playfair)]">
                  RS
                </span>
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">
                Room <span className="text-[#D4A24C]">Scholars</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium student accommodation across the UK. Find your perfect home
              away from home with Room Scholars.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, label: "Facebook" },
                { icon: MessageCircle, label: "Twitter" },
                { icon: Camera, label: "Instagram" },
                { icon: Users, label: "LinkedIn" },
                { icon: Play, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#D4A24C] hover:text-white transition-all hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-base font-bold font-[family-name:var(--font-playfair)] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#D4A24C] transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-base font-bold font-[family-name:var(--font-playfair)] mb-5">
              Destinations
            </h3>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.label}>
                  <a
                    href={dest.href}
                    className="text-white/60 text-sm hover:text-[#D4A24C] transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{dest.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-base font-bold font-[family-name:var(--font-playfair)] mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+4401234567890"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-[#D4A24C] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4A24C]" />
                  +44 1234 567890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@roomscholars.com"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-[#D4A24C] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4A24C]" />
                  info@roomscholars.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#D4A24C] mt-0.5" />
                <span>
                  123 Scholar Street,
                  <br />
                  London, EC1A 1BB
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Room Scholars. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/40 text-xs sm:text-sm hover:text-[#D4A24C] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/40 text-xs sm:text-sm hover:text-[#D4A24C] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/40 text-xs sm:text-sm hover:text-[#D4A24C] transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
