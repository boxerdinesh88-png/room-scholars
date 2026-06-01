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
} from "lucide-react";
import { getPropertyBySlug } from "@/lib/properties";
import EnquiryModal from "@/components/enquiry-modal";
import { useState, useEffect } from "react";

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const property = getPropertyBySlug(slug);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = property ? [property.thumbnail, ...property.images] : [];

  useEffect(() => {
    const shown = sessionStorage.getItem(`popup_${slug}`);
    if (!shown) {
      const timer = setTimeout(() => {
        setModalOpen(true);
        sessionStorage.setItem(`popup_${slug}`, "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  useEffect(() => {
    if (!galleryOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryOpen(false);
      if (e.key === "ArrowLeft")
        setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      if (e.key === "ArrowRight")
        setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [galleryOpen]);

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
      {/* Header */}
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

      {/* Hero Image Gallery */}
      <section className="relative mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col lg:flex-row gap-3 rounded-2xl overflow-hidden h-auto lg:h-[360px]"
          >
             <motion.div
              onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
              className="relative w-full lg:w-[66.666%] h-[300px] lg:h-full overflow-hidden group cursor-pointer"
            >
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                priority
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => { setGalleryIndex(i + 2); setGalleryOpen(true); }}
                  className="relative flex-1 overflow-hidden rounded-xl group cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`${property.name} view ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 11vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: Details */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Location & Rating */}
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

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-8 leading-tight">
                  {property.name}
                </h1>

                {/* Quick Specs Card */}
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

                {/* About Section */}
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

                {/* Amenities Section */}
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

            {/* Right: Booking Sidebar */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-7">
                    <span className="text-4xl font-bold text-[#081F4D]">
                      {property.price}
                    </span>
                    <span className="text-[#081F4D]/60 text-sm font-medium">
                      /{property.period.replace("per ", "")}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F8F7F4]">
                      <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                        <CalendarDays className="w-5 h-5 text-[#D4A24C]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#081F4D]/50">
                          Move-in Date
                        </p>
                        <p className="text-sm font-semibold text-[#081F4D]">
                          Flexible
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F8F7F4]">
                      <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[#D4A24C]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#081F4D]/50">Deposit</p>
                        <p className="text-sm font-semibold text-[#081F4D]">
                          One month rent
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F8F7F4]">
                      <div className="w-10 h-10 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                        <HeadphonesIcon className="w-5 h-5 text-[#D4A24C]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#081F4D]/50">Support</p>
                        <p className="text-sm font-semibold text-[#081F4D]">
                          24/7 Assistance
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => setModalOpen(true)}
                    className="w-full rounded-full text-base h-14 shadow-lg shadow-[#D4A24C]/25 hover:shadow-xl hover:shadow-[#D4A24C]/30 hover:-translate-y-0.5 mb-3 transition-all duration-300"
                  >
                    Book This Property
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="lg"
                    onClick={() => setModalOpen(true)}
                    className="w-full rounded-full text-base h-14"
                  >
                    Schedule a Viewing
                  </Button>

                  <p className="text-center text-xs text-[#081F4D]/40 mt-5">
                    No hidden fees. Cancel anytime.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Lightbox */}
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
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex(
                (prev) =>
                  (prev - 1 + galleryImages.length) %
                  galleryImages.length
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
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
                style={{ imageRendering: "auto" }}
              />
            </motion.div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex(
                (prev) => (prev + 1) % galleryImages.length
              );
            }}
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

function CalendarDays(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
  );
}
