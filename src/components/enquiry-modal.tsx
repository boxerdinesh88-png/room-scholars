"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, Mail, MapPin, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  propertyLocation: string;
  price: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  propertyName,
  propertyLocation,
  price,
}: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(`enquiry_submitted_${propertyName}`) === "true";
    }
    return false;
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      moveIn: form.get("moveIn") as string,
      message: form.get("message") as string,
      propertyName,
      propertyLocation,
      price,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }

      setSubmitted(true);
      sessionStorage.setItem(`enquiry_submitted_${propertyName}`, "true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#081F4D]/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative bg-[#081F4D] px-6 py-5 rounded-t-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,162,76,0.1),_transparent_50%)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent" />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative z-10">
                <p className="text-white/50 text-sm">
                  Fill in your details and we&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </div>

            {!submitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Property Info */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F7F4] border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-[#D4A24C]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4.5 h-4.5 text-[#D4A24C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#081F4D] text-sm truncate">
                      {propertyName}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D4A24C]" />
                      <span className="text-xs text-[#081F4D]/50 truncate">
                        {propertyLocation}
                      </span>
                    </div>
                    <p className="text-xs text-[#081F4D]/50 mt-0.5">
                      From{" "}
                      <span className="font-semibold text-[#D4A24C]">
                        {price}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/70 mb-1.5 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F8F7F4]/50 text-sm text-[#081F4D] placeholder:text-[#081F4D]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/70 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@email.com"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F8F7F4]/50 text-sm text-[#081F4D] placeholder:text-[#081F4D]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/70 mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+44 1234 567890"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F8F7F4]/50 text-sm text-[#081F4D] placeholder:text-[#081F4D]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/70 mb-1.5 uppercase tracking-wider">
                      Preferred Move-in
                    </label>
                    <select
                      name="moveIn"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F8F7F4]/50 text-sm text-[#081F4D] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all appearance-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D4A24C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                    >
                      <option>ASAP</option>
                      <option>This Month</option>
                      <option>Next Month</option>
                      <option>Next Semester</option>
                      <option>Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081F4D]/70 mb-1.5 uppercase tracking-wider">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Any specific questions or requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8F7F4]/50 text-sm text-[#081F4D] placeholder:text-[#081F4D]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={submitting}
                  className="w-full rounded-full text-base h-13 shadow-xl shadow-[#D4A24C]/25 hover:shadow-2xl disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? "Sending..." : "Send Enquiry"}
                </Button>

                <p className="text-center text-xs text-[#081F4D]/30">
                  Your information is safe with us. We respect your privacy.
                </p>
              </form>
            ) : (
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#D4A24C]/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#D4A24C]" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-2">
                  Enquiry Sent!
                </h3>
                <p className="text-[#081F4D]/60 text-sm mb-6 max-w-xs mx-auto">
                  Thank you for your interest. Our team will contact you within
                  24 hours.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-full"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </div>
            )}

            {/* Contact Info Footer */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100 text-xs text-[#081F4D]/40">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3" /> +44 1234 567890
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> info@roomscholars.com
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
