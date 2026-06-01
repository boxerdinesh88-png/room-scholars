"use client";

import { motion } from "framer-motion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I book a property on Room Scholars?",
    answer:
      "Simply browse our listings, use the search filters to find your ideal property, and click 'Book Now'. Our team will guide you through the verification and booking process step by step.",
  },
  {
    question: "Are the properties verified before listing?",
    answer:
      "Yes, every property on Room Scholars undergoes a thorough verification process. We check the property condition, amenities, location authenticity, and landlord credentials before listing.",
  },
  {
    question: "Can I visit the property before booking?",
    answer:
      "Absolutely! We encourage virtual and in-person viewings. Many of our properties offer virtual tours, and we can arrange physical visits for listed properties upon request.",
  },
  {
    question: "What is the minimum stay duration?",
    answer:
      "Minimum stays vary by property, typically ranging from 1 month to 12 months. You can filter by duration on our search page to find properties that match your needs.",
  },
  {
    question: "Are utilities included in the rent?",
    answer:
      "Most of our properties include utilities (electricity, water, internet) in the weekly rent. Each property listing clearly specifies what's included in the price.",
  },
  {
    question: "What if I have issues after moving in?",
    answer:
      "Our 24/7 support team is always available to help. You can reach us via phone, email, or live chat. We'll coordinate with the property management to resolve any issues promptly.",
  },
];

export default function FAQ() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A24C] font-semibold text-sm tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
          <p className="text-[#081F4D]/60 mt-4">
            Everything you need to know about booking with Room Scholars.
          </p>
        </motion.div>

        <AccordionPrimitive.Root
          type="single"
          defaultValue="item-0"
          collapsible
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionPrimitive.Item
                value={`item-${index}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:border-[#D4A24C]/30"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="flex items-center justify-between w-full px-6 py-5 text-left text-[#081F4D] font-semibold hover:text-[#D4A24C] transition-colors group">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#D4A24C] shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-[#D4A24C] shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-6 pb-5 pl-14 text-[#081F4D]/60 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            </motion.div>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
