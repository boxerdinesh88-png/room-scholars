"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  ShieldCheck,
  HeadphonesIcon,
  Home,
  ArrowLeft,
  Share2,
  Heart,
  UtensilsCrossed,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  CreditCard,
} from "lucide-react";
import { getPropertyBySlug } from "@/lib/properties";
import EnquiryModal from "@/components/enquiry-modal";
import { useState, useMemo, useCallback } from "react";

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const property = getPropertyBySlug(slug);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = useMemo(
    () => (property ? [property.thumbnail, ...property.images] : []),
    [property]
  );

  const handlePrevImage = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#081F4D] mb-4 font-[family-name:var(--font-playfair)]">
            Property Not Found
          </h1>
          <p className="text-[#081F4D]/60 mb-6">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button variant="primary" className="rounded-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#081F4D]/60 hover:text-[#081F4D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-[#081F4D] font-bold font-[family-name:var(--font-playfair)]"
            >
              <div className="w-7 h-7 rounded-md bg-[#D4A24C] flex items-center justify-center">
                <span className="text-[#081F4D] font-bold text-xs">RS</span>
              </div>
              <span className="hidden sm:inline">Room Scholars</span>
            </Link>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-[#081F4D]/60 hover:text-[#081F4D] transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 text-[#081F4D]/60 hover:text-[#081F4D] transition-all">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="relative mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col lg:flex-row gap-3 rounded-2xl overflow-hidden h-auto lg:h-[360px]"
          >
             <motion.div
              onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
              className="relative w-full lg:w-[66.666%] h-[300px] lg:h-full overflow-hidden group cursor-pointer bg-[#E8E6E1]"
            >
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              {property.tag && (
                <span className="absolute top-4 left-4 bg-[#D4A24C] text-[#081F4D] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {property.tag}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.div>
            <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-[33.333%] h-[100px] lg:h-full">
              {property.images.slice(1, 4).map((img, i) => (
                <div
                  key={i}
                  onClick={() => { setGalleryIndex(i + 2); setGalleryOpen(true); }}
                  className="relative flex-1 overflow-hidden rounded-xl group cursor-pointer bg-[#E8E6E1]"
                >
                  <Image
                    src={img}
                    alt={`${property.name} view ${i + 2}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 33vw, 11vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4A24C]" />
                    <span className="text-sm text-[#081F4D]/60">
                      {property.location}
                    </span>
                  </div>
                  <span className="text-[#081F4D]/20">|</span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#D4A24C] text-[#D4A24C]" />
                    <span className="text-sm font-semibold text-[#081F4D]">
                      {property.rating}
                    </span>
                    <span className="text-xs text-[#081F4D]/60">
                      ({property.reviews} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-8 leading-tight">
                  {property.name}
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4 mb-10 p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#081F4D]/5 flex items-center justify-center shrink-0">
                      <Bed className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Bedrooms</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.beds}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#081F4D]/5 flex items-center justify-center shrink-0">
                      <Bath className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Bathrooms</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.baths}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#081F4D]/5 flex items-center justify-center shrink-0">
                      <Square className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Area</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.sqft}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                      <UtensilsCrossed className="w-5 h-5 text-[#D4A24C]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Dining</p>
                      <p className="text-sm font-bold text-[#081F4D]">Yes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-[#D4A24C]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Rating</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.rating}/5
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#081F4D]/5 flex items-center justify-center shrink-0">
                      <Home className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Property Type</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        Apartment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-5">
                    About This Property
                  </h2>
                  <p
                    className="text-[#081F4D]/70 text-base max-w-3xl"
                    style={{ lineHeight: "1.8" }}
                  >
                    {property.description}
                  </p>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-5">
                    Amenities &amp; Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {property.amenities.map((amenity) => (
                      <motion.div
                        key={amenity}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4A24C]/20 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4A24C]/20 transition-colors">
                          <CheckCircle className="w-5 h-5 text-[#D4A24C]" />
                        </div>
                        <span className="text-sm font-medium text-[#081F4D]/80 group-hover:text-[#081F4D] transition-colors">
                          {amenity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="bg-[#081F4D] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#D4A24C]" />
                      <span className="text-white text-sm font-semibold">Secure Checkout</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline gap-1.5 mb-6">
                      <span className="text-4xl font-bold text-[#081F4D]">
                        {property.price}
                      </span>
                      <span className="text-[#081F4D]/60 text-sm font-medium">
                        /{property.period.replace("per ", "")}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#081F4D]/60">Booking Amount</span>
                        <span className="font-semibold text-[#081F4D]">{property.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#081F4D]/60">Service Fee</span>
                        <span className="font-semibold text-[#081F4D]">Free</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#081F4D]/60">Security Deposit</span>
                        <span className="font-semibold text-[#081F4D]">{property.price}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm font-bold text-[#081F4D]">Total Due Today</span>
                        <span className="text-lg font-bold text-[#D4A24C]">{property.price}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F7F4]">
                        <div className="w-9 h-9 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                          <svg className="w-4.5 h-4.5 text-[#D4A24C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="M8 14h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#081F4D]/50">Move-in Date</p>
                          <select className="text-sm font-semibold text-[#081F4D] bg-transparent border-none p-0 focus:outline-none w-full appearance-none cursor-pointer">
                            <option>Select move-in date</option>
                            <option>ASAP</option>
                            <option>This Month</option>
                            <option>Next Month</option>
                            <option>Next Semester</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F7F4]">
                        <div className="w-9 h-9 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4.5 h-4.5 text-[#D4A24C]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#081F4D]/50">Deposit</p>
                          <p className="text-sm font-semibold text-[#081F4D]">One month rent</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F7F4]">
                        <div className="w-9 h-9 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                          <HeadphonesIcon className="w-4.5 h-4.5 text-[#D4A24C]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#081F4D]/50">Support</p>
                          <p className="text-sm font-semibold text-[#081F4D]">24/7 Assistance</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-[#081F4D]/50 uppercase tracking-wider mb-3">
                        We accept
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-8 px-3 rounded-lg bg-[#F8F7F4] border border-gray-100 flex items-center gap-1.5">
                          <svg viewBox="0 0 24 16" className="w-8 h-5" fill="#1A1F71"><rect width="24" height="16" rx="2" fill="white"/><path d="M10.5 11.5H8.5L10 4.5H12L10.5 11.5Z" fill="#1A1F71"/><path d="M16.5 4.7C16.2 4.5 15.7 4.3 15 4.3C13.5 4.3 12.4 5.2 12.4 6.5C12.4 7.4 13.2 7.9 13.8 8.2C14.4 8.5 14.6 8.7 14.6 9C14.6 9.4 14.2 9.6 13.8 9.6C13.3 9.6 13 9.5 12.6 9.3L12.5 9.2L12.3 10.5C12.7 10.7 13.3 10.9 14 10.9C15.6 10.9 16.7 10 16.7 8.6C16.7 7.8 16.2 7.3 15.4 6.9C14.8 6.6 14.5 6.4 14.5 6.1C14.5 5.8 14.8 5.6 15.2 5.6C15.6 5.6 16 5.7 16.3 5.9L16.5 4.7Z" fill="#1A1F71"/><path d="M19 7.3C18.7 7.3 18.4 7.5 18.2 7.9L18.1 7.9L18.2 7C18.2 7 18.2 6.9 18.1 6.9H17.3L16.5 10.9H17.3L17.6 9.2C17.7 8.7 18 8.3 18.4 8.3C18.6 8.3 18.7 8.5 18.7 8.8C18.7 9 18.6 9.2 18.6 9.3L18.3 10.9H19.1L19.5 9.1C19.6 8.5 19.4 7.9 19 7.3Z" fill="#1A1F71"/><path d="M22.5 4.5L21 10.9H20.2L21.7 4.5H22.5Z" fill="#1A1F71"/><path d="M8.2 4.5L6.3 9.4L6.1 8.5C5.7 7.3 4.7 6.1 3.5 5.5L5.2 10.9H6L8.8 4.5H8.2Z" fill="#1A1F71"/><path d="M4.8 4.5H2.5L2.4 4.7C4.1 5.1 5.3 6.2 5.8 7.5L5.1 4.9C5 4.6 4.9 4.5 4.8 4.5Z" fill="#F79E1B"/></svg>
                          <span className="text-[10px] font-bold text-[#081F4D]/40">Visa</span>
                        </div>
                        <div className="h-8 px-3 rounded-lg bg-[#F8F7F4] border border-gray-100 flex items-center gap-1.5">
                          <svg viewBox="0 0 24 16" className="w-8 h-5" fill="#EB001B"><rect width="24" height="16" rx="2" fill="white"/><path d="M15.5 4.5C13.6 4.5 12 6.1 12 8C12 9.9 13.6 11.5 15.5 11.5C17.4 11.5 19 9.9 19 8C19 6.1 17.4 4.5 15.5 4.5Z" fill="#EB001B"/><path d="M8.5 4.5C6.6 4.5 5 6.1 5 8C5 9.9 6.6 11.5 8.5 11.5C10.4 11.5 12 9.9 12 8C12 6.1 10.4 4.5 8.5 4.5Z" fill="#F79E1B"/><path d="M12 5.5C13.1 6.2 13.8 7.5 13.8 8.9C13.8 10.3 13.1 11.6 12 12.3C10.9 11.6 10.2 10.3 10.2 8.9C10.2 7.5 10.9 6.2 12 5.5Z" fill="#FF5F00"/></svg>
                          <span className="text-[10px] font-bold text-[#081F4D]/40">MC</span>
                        </div>
                        <div className="h-8 px-3 rounded-lg bg-[#F8F7F4] border border-gray-100 flex items-center gap-1.5">
                          <svg viewBox="0 0 24 16" className="w-8 h-5"><rect width="24" height="16" rx="2" fill="white"/><text x="5" y="12" fontSize="8" fontWeight="bold" fill="#003087">AMEX</text></svg>
                          <span className="text-[10px] font-bold text-[#081F4D]/40">Amex</span>
                        </div>
                        <div className="h-8 px-3 rounded-lg bg-[#F8F7F4] border border-gray-100 flex items-center gap-1.5">
                          <svg viewBox="0 0 24 16" className="w-8 h-5"><rect width="24" height="16" rx="2" fill="#003087"/><text x="3" y="11" fontSize="7" fontWeight="bold" fill="white">Pay</text><text x="13" y="11" fontSize="7" fontWeight="bold" fill="#009CDE">Pal</text></svg>
                          <span className="text-[10px] font-bold text-[#081F4D]/40">PayPal</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => setModalOpen(true)}
                      className="w-full rounded-xl text-base h-14 shadow-lg shadow-[#D4A24C]/25 hover:shadow-xl hover:shadow-[#D4A24C]/30 hover:-translate-y-0.5 mb-3 transition-all duration-300 font-bold flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Confirm &amp; Book Now
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#081F4D]/40">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        SSL Secure
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#081F4D]/40">
                        <CreditCard className="w-3.5 h-3.5" />
                        Safe Payment
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#081F4D]/40">
                        <CheckCircle className="w-3.5 h-3.5" />
                        No Hidden Fees
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {galleryOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setGalleryOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        >
          <button
            onClick={(e) => { e.stopPropagation(); setGalleryOpen(false); }}
            className="absolute top-5 right-5 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 bg-[#1a1a1a]"
          >
            <motion.div
              key={galleryIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={galleryImages[galleryIndex]}
                alt={`${property.name} - Image ${galleryIndex + 1}`}
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-contain"
              />
            </motion.div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 px-4 py-2 rounded-full">
            <span className="text-white/80 text-sm font-medium">
              {galleryIndex + 1} / {galleryImages.length}
            </span>
          </div>
        </motion.div>
      )}

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        propertyName={property.name}
        propertyLocation={property.location}
        price={property.price}
      />
    </div>
  );
}
