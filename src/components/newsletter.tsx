"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to subscribe");
      }

      setSubscribed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#081F4D] to-[#0d285a]" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#D4A24C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4A24C]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {!subscribed ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-[#D4A24C]/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#D4A24C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Subscribe to our newsletter for the latest properties, deals, and
                student accommodation tips.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1 w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/50 focus:border-[#D4A24C] transition-all text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={loading}
                  className="rounded-xl gap-2 shrink-0 w-full sm:w-auto shadow-lg shadow-[#D4A24C]/25 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              {error && (
                <p className="text-red-400 text-xs mt-3">{error}</p>
              )}

              <p className="text-white/40 text-xs mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#D4A24C]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#D4A24C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] text-white mb-4">
                You&apos;re Subscribed!
              </h2>
              <p className="text-white/70 max-w-md mx-auto">
                Thank you for subscribing. You&apos;ll receive the latest updates
                directly in your inbox.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
