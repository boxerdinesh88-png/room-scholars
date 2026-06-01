"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Wifi,
  ShieldCheck,
  HeadphonesIcon,
  Home,
  ArrowLeft,
  Share2,
  Heart,
  UtensilsCrossed,
} from "lucide-react";
import { getPropertyBySlug } from "@/lib/properties";
import EnquiryModal from "@/components/enquiry-modal";
import { useState, useEffect } from "react";

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const property = getPropertyBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

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

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#081F4D] mb-4 font-[family-name:var(--font-playfair)]">
            Property Not Found
          </h1>
          <p className="text-[#081F4D]/60 mb-6">
            The property you're looking for doesn't exist.
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
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
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
              Room Scholars
            </Link>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 text-[#081F4D]/60 hover:text-[#081F4D] transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-[#081F4D]/60 hover:text-[#081F4D] transition-all">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="relative">
        <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8">
          <div className="grid lg:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setModalOpen(true)}
              className="lg:col-span-2 lg:row-span-2 relative overflow-hidden group cursor-pointer"
            >
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover min-h-[400px] lg:min-h-[500px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {property.tag && (
                <span className="absolute top-4 left-4 bg-[#D4A24C] text-[#081F4D] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {property.tag}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white text-sm font-semibold bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Enquire Now
                </span>
              </div>
            </motion.div>
            {property.images.slice(1, 4).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => setModalOpen(true)}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`${property.name} view ${i + 2}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover min-h-[150px] lg:min-h-[240px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm font-semibold bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                    Enquire Now
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-14">
        <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left: Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#D4A24C]" />
                    <span className="text-sm text-[#081F4D]/60">
                      {property.location}
                    </span>
                  </div>
                  <span className="text-[#081F4D]/20">|</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#D4A24C] text-[#D4A24C]" />
                    <span className="text-sm font-semibold text-[#081F4D]">
                      {property.rating}
                    </span>
                    <span className="text-xs text-[#081F4D]/60">
                      ({property.reviews} reviews)
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-6">
                  {property.name}
                </h1>

                {/* Quick Specs */}
                <div className="flex flex-wrap items-center gap-6 mb-8 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081F4D]/5 flex items-center justify-center">
                      <Bed className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Bedrooms</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.beds}
                      </p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081F4D]/5 flex items-center justify-center">
                      <Bath className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Bathrooms</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.baths}
                      </p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081F4D]/5 flex items-center justify-center">
                      <Square className="w-5 h-5 text-[#081F4D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Area</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.sqft}
                      </p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081F4D]/5 flex items-center justify-center">
                      <UtensilsCrossed className="w-5 h-5 text-[#D4A24C]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Dining</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        Yes
                      </p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#081F4D]/5 flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#D4A24C]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Rating</p>
                      <p className="text-sm font-bold text-[#081F4D]">
                        {property.rating}/5
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-4">
                    About This Property
                  </h2>
                  <p className="text-[#081F4D]/60 leading-relaxed text-base">
                    {property.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-4">
                    Amenities & Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#D4A24C]/10 flex items-center justify-center shrink-0">
                          <Wifi className="w-4 h-4 text-[#D4A24C]" />
                        </div>
                        <span className="text-sm text-[#081F4D]/80">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Booking Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-xl p-6 lg:p-8">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-[#081F4D]">
                    {property.price}
                  </span>
                  <span className="text-[#081F4D]/60 text-sm">
                    {property.period}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F4]">
                    <CalendarDays className="w-5 h-5 text-[#D4A24C]" />
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Move-in Date</p>
                      <p className="text-sm font-medium text-[#081F4D]">
                        Flexible
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F4]">
                    <ShieldCheck className="w-5 h-5 text-[#D4A24C]" />
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Deposit</p>
                      <p className="text-sm font-medium text-[#081F4D]">
                        One month rent
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7F4]">
                    <HeadphonesIcon className="w-5 h-5 text-[#D4A24C]" />
                    <div>
                      <p className="text-xs text-[#081F4D]/50">Support</p>
                      <p className="text-sm font-medium text-[#081F4D]">
                        24/7 Assistance
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="w-full rounded-full text-base h-14 shadow-xl shadow-[#D4A24C]/25 hover:shadow-2xl hover:shadow-[#D4A24C]/35 mb-3"
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

                <p className="text-center text-xs text-[#081F4D]/40 mt-4">
                  No hidden fees. Cancel anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
