"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Bed, Bath, Square, UtensilsCrossed } from "lucide-react";
import { properties } from "@/lib/properties";
import EnquiryModal from "@/components/enquiry-modal";
import type { Property } from "@/lib/properties";

function PropertyCard({
  property,
  index,
  onBookNow,
}: {
  property: Property;
  index: number;
  onBookNow: (p: Property) => void;
}) {
  return (
    <Link href={`/property/${property.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.thumbnail}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {property.tag && (
            <span className="absolute top-3 left-3 bg-[#D4A24C] text-[#081F4D] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
              {property.tag}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-1 group-hover:text-[#D4A24C] transition-colors duration-300">
            {property.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#D4A24C]" />
            <span className="text-xs text-[#081F4D]/60">{property.location}</span>
          </div>

          <div className="flex items-center gap-4 mb-4 text-[#081F4D]/60 text-xs">
            <span className="flex items-center gap-1" title="Bedrooms">
              <Bed className="w-3.5 h-3.5" /> {property.beds} Bed
            </span>
            <span className="flex items-center gap-1" title="Bathrooms">
              <Bath className="w-3.5 h-3.5" /> {property.baths} Bath
            </span>
            <span className="flex items-center gap-1" title="Area">
              <Square className="w-3.5 h-3.5" /> {property.sqft}
            </span>
            <span className="flex items-center gap-1" title="Dining Area">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-xl font-bold text-[#081F4D]">{property.price}</span>
              <span className="text-xs text-[#081F4D]/60"> {property.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#D4A24C] text-[#D4A24C]" />
              <span className="text-sm font-semibold text-[#081F4D]">{property.rating}</span>
              <span className="text-xs text-[#081F4D]/60">({property.reviews})</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onBookNow(property);
            }}
            className="w-full mt-4 rounded-full"
          >
            Book Now
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}

export default function FeaturedProperties() {
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  const handleBookNow = useCallback((property: Property) => {
    setModalProperty(property);
  }, []);

  return (
    <section id="properties" className="py-20 sm:py-28 bg-white">
      <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A24C] font-semibold text-sm tracking-widest uppercase">
            Our Collection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mt-3 mb-4">
            Featured Properties
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
          <p className="text-[#081F4D]/60 mt-4 max-w-2xl mx-auto">
            Explore our handpicked selection of premium student accommodations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.slug}
              property={property}
              index={index}
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/destinations">
            <Button
              variant="outline-dark"
              size="lg"
              className="rounded-full"
            >
              View All Properties
            </Button>
          </Link>
        </motion.div>
      </div>

      {modalProperty && (
        <EnquiryModal
          isOpen={!!modalProperty}
          onClose={() => setModalProperty(null)}
          propertyName={modalProperty.name}
          propertyLocation={modalProperty.location}
          price={modalProperty.price}
        />
      )}
    </section>
  );
}
