"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EnquiryModal = lazy(() => import("@/components/enquiry-modal"));

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Properties", href: "#properties" },
  { label: "Destinations", href: "#destinations" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#081F4D]/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-[#081F4D]"
      )}
    >
      <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-end gap-6 py-1.5 text-xs border-b border-white/5">
          <a
            href="tel:+4401234567890"
            className="flex items-center gap-2 text-white/60 hover:text-[#D4A24C] transition-colors"
          >
            <Phone className="w-3 h-3" /> +44 1234 567890
          </a>
          <a
            href="mailto:info@roomscholars.com"
            className="flex items-center gap-2 text-white/60 hover:text-[#D4A24C] transition-colors"
          >
            <Mail className="w-3 h-3" /> info@roomscholars.com
          </a>
        </div>
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4A24C] flex items-center justify-center shadow-lg shadow-[#D4A24C]/20">
              <span className="text-[#081F4D] font-bold text-base font-[family-name:var(--font-playfair)]">RS</span>
            </div>
            <span className="text-lg font-bold font-[family-name:var(--font-playfair)] text-white">
              Room <span className="text-[#D4A24C]">Scholars</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-white/70 hover:text-[#D4A24C] transition-colors rounded-lg hover:bg-white/5 relative"
              >
                {link.label}
                {link.label === "Home" && (
                  <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 bg-[#D4A24C] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="default"
              size="default"
              onClick={() => setModalOpen(true)}
              className="rounded-full text-xs px-5 h-10 shadow-lg shadow-[#D4A24C]/20 cursor-pointer"
            >
              Enquire Now
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#081F4D] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-[#D4A24C] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 space-y-2 border-t border-white/5 mt-3">
                <a
                  href="tel:+4401234567890"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-white/60"
                >
                  <Phone className="w-4 h-4" /> +44 1234 567890
                </a>
                <a
                  href="mailto:info@roomscholars.com"
                  className="flex items-center gap-2 px-4 py-3 text-sm text-white/60"
                >
                  <Mail className="w-4 h-4" /> info@roomscholars.com
                </a>
              </div>
              <div className="pt-2 px-4">
                <Button
                  variant="default"
                  className="w-full rounded-full cursor-pointer"
                  onClick={() => { setMobileOpen(false); setModalOpen(true); }}
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        {modalOpen && (
          <EnquiryModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            propertyName="Room Scholars"
            propertyLocation="United Kingdom"
            price=""
          />
        )}
      </Suspense>
    </header>
  );
}
