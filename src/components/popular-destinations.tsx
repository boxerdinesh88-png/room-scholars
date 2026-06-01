"use client";

import { useState, useMemo, useCallback, useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Bed,
  Bath,
  Square,
  Search,
  SlidersHorizontal,
  X,
  UtensilsCrossed,
} from "lucide-react";
import { properties } from "@/lib/properties";
import EnquiryModal from "@/components/enquiry-modal";
import type { Property } from "@/lib/properties";

const cities = ["All", ...new Set(properties.map((p) => p.city))] as const;

const bedOptions = ["Any", "1", "2", "3+"] as const;
const bathOptions = ["Any", "1", "2+"] as const;
const priceOptions = [
  { label: "All Prices", value: "all" },
  { label: "Under £200", value: "0-200" },
  { label: "£200 - £300", value: "200-300" },
  { label: "£300 - £400", value: "300-400" },
  { label: "£400+", value: "400-9999" },
] as const;
const tagOptions = ["All", "Popular", "Best Value", "Premium"] as const;
const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
] as const;

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^0-9]/g, ""), 10);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function PropertyCard({
  property,
  onBookNow,
}: {
  property: Property;
  onBookNow: (p: Property) => void;
}) {
  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer"
    >
      <Link href={`/property/${property.slug}`} prefetch={false}>
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
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#D4A24C]" />
              <span className="text-[10px] font-semibold text-[#081F4D]">
                {property.city}
              </span>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/property/${property.slug}`} prefetch={false}>
          <h3 className="text-base font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-1 group-hover:text-[#D4A24C] transition-colors duration-300 line-clamp-1">
            {property.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="w-3 h-3 text-[#D4A24C] shrink-0" />
          <span className="text-xs text-[#081F4D]/60 truncate">
            {property.location}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3 text-[#081F4D]/60 text-xs">
          <span className="flex items-center gap-1" title="Bedrooms">
            <Bed className="w-3.5 h-3.5" /> {property.beds}{" "}
            {property.beds === 1 ? "Bed" : "Beds"}
          </span>
          <span className="flex items-center gap-1" title="Bathrooms">
            <Bath className="w-3.5 h-3.5" /> {property.baths}{" "}
            {property.baths === 1 ? "Bath" : "Baths"}
          </span>
          <span className="flex items-center gap-1" title="Area">
            <Square className="w-3.5 h-3.5" /> {property.sqft}
          </span>
          <span className="flex items-center gap-1" title="Dining Area">
            <UtensilsCrossed className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-[#081F4D]">
              {property.price}
            </span>
            <span className="text-xs text-[#081F4D]/60">
              {" "}
              {property.period}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#D4A24C] text-[#D4A24C]" />
            <span className="text-sm font-semibold text-[#081F4D]">
              {property.rating}
            </span>
            <span className="text-xs text-[#081F4D]/60">
              ({property.reviews})
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            onBookNow(property);
          }}
          className="w-full mt-3 rounded-full text-xs h-9"
        >
          Book Now
        </Button>
      </div>
    </motion.div>
  );
}

export default function PopularDestinations() {
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [bedsFilter, setBedsFilter] = useState<string>("Any");
  const [bathsFilter, setBathsFilter] = useState<string>("Any");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  const deferredSearch = useDeferredValue(searchQuery);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (selectedCity !== "All") {
      result = result.filter((p) => p.city === selectedCity);
    }

    if (bedsFilter !== "Any") {
      const minBeds = bedsFilter === "3+" ? 3 : parseInt(bedsFilter, 10);
      result = result.filter((p) =>
        bedsFilter === "3+" ? p.beds >= 3 : p.beds === minBeds
      );
    }

    if (bathsFilter !== "Any") {
      const minBaths = bathsFilter === "2+" ? 2 : parseInt(bathsFilter, 10);
      result = result.filter((p) =>
        bathsFilter === "2+" ? p.baths >= 2 : p.baths === minBaths
      );
    }

    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      result = result.filter((p) => {
        const num = parsePrice(p.price);
        return num >= min && num <= max;
      });
    }

    if (tagFilter !== "All") {
      result = result.filter((p) => p.tag === tagFilter);
    }

    if (deferredSearch.trim()) {
      const q = deferredSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCity, bedsFilter, bathsFilter, priceFilter, tagFilter, deferredSearch, sortBy]);

  const clearFilters = useCallback(() => {
    setSelectedCity("All");
    setBedsFilter("Any");
    setBathsFilter("Any");
    setPriceFilter("all");
    setTagFilter("All");
    setSearchQuery("");
    setSortBy("default");
  }, []);

  const handleBookNow = useCallback((property: Property) => {
    setModalProperty(property);
  }, []);

  const hasActiveFilters =
    selectedCity !== "All" ||
    bedsFilter !== "Any" ||
    bathsFilter !== "Any" ||
    priceFilter !== "all" ||
    tagFilter !== "All" ||
    searchQuery.trim() !== "";

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#F8F7F4]">
      <div className="w-[85%] max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D4A24C] font-semibold text-sm tracking-widest uppercase">
            Explore UK Cities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mt-3 mb-4">
            Popular Destinations
          </h2>
          <div className="w-20 h-1 bg-[#D4A24C] mx-auto rounded-full" />
          <p className="text-[#081F4D]/60 mt-4 max-w-2xl mx-auto">
            Find your perfect student home across the UK&apos;s best cities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {cities.map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#D4A24C] text-[#081F4D] shadow-lg shadow-[#D4A24C]/25 scale-105"
                    : "bg-white text-[#081F4D]/70 hover:bg-[#081F4D]/5 hover:text-[#081F4D] shadow-sm border border-gray-100"
                }`}
              >
                {city}
                {isActive && (
                  <motion.span
                    layoutId="city-active"
                    className="absolute inset-0 rounded-full bg-[#D4A24C] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#081F4D]/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by property, city or location..."
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white text-sm text-[#081F4D] placeholder:text-[#081F4D]/30 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 focus:border-[#D4A24C] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#081F4D]/10 flex items-center justify-center hover:bg-[#081F4D]/20 transition-colors"
              >
                <X className="w-3 h-3 text-[#081F4D]/50" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 px-4 rounded-xl border transition-all duration-300 flex items-center gap-2 text-sm font-semibold shadow-sm ${
              showFilters
                ? "bg-[#081F4D] text-white border-[#081F4D]"
                : "bg-white text-[#081F4D]/70 border-gray-200 hover:border-[#081F4D]/20"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-[#081F4D]/50 hover:text-[#D4A24C] hover:border-[#D4A24C]/30 transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/50 uppercase tracking-wider mb-2">
                      Bedrooms
                    </label>
                    <div className="flex gap-1.5">
                      {bedOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setBedsFilter(opt)}
                          className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            bedsFilter === opt
                              ? "bg-[#D4A24C] text-[#081F4D] shadow-sm"
                              : "bg-[#F8F7F4] text-[#081F4D]/60 hover:bg-[#081F4D]/5"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/50 uppercase tracking-wider mb-2">
                      Bathrooms
                    </label>
                    <div className="flex gap-1.5">
                      {bathOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setBathsFilter(opt)}
                          className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            bathsFilter === opt
                              ? "bg-[#D4A24C] text-[#081F4D] shadow-sm"
                              : "bg-[#F8F7F4] text-[#081F4D]/60 hover:bg-[#081F4D]/5"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/50 uppercase tracking-wider mb-2">
                      Price Range
                    </label>
                    <div className="relative">
                      <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-[#F8F7F4] text-xs font-semibold text-[#081F4D]/70 border-none focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 appearance-none cursor-pointer"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23081F4D' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 10px center",
                        }}
                      >
                        {priceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#081F4D]/50 uppercase tracking-wider mb-2">
                      Property Type
                    </label>
                    <div className="flex gap-1.5">
                      {tagOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setTagFilter(opt)}
                          className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            tagFilter === opt
                              ? "bg-[#D4A24C] text-[#081F4D] shadow-sm"
                              : "bg-[#F8F7F4] text-[#081F4D]/60 hover:bg-[#081F4D]/5"
                          }`}
                        >
                          {opt === "All" ? "All" : opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-sm text-[#081F4D]/60">
              <strong className="text-[#081F4D] font-bold">
                {filteredProperties.length}
              </strong>{" "}
              {filteredProperties.length === 1 ? "Property" : "Properties"}{" "}
              Found
              {selectedCity !== "All" && (
                <span>
                  {" "}
                  in <strong className="text-[#081F4D]">{selectedCity}</strong>
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#081F4D]/40 hidden sm:inline">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 pr-8 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-[#081F4D]/70 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/30 appearance-none cursor-pointer shadow-sm"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23081F4D' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <motion.div
          key={`${selectedCity}-${bedsFilter}-${bathsFilter}-${priceFilter}-${tagFilter}-${sortBy}-${searchQuery}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.slug}
                  property={property}
                  onBookNow={handleBookNow}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#081F4D]/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-[#081F4D]/30" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-[#081F4D] mb-2">
                  No Properties Found
                </h3>
                <p className="text-[#081F4D]/60 text-sm max-w-md mx-auto mb-6">
                  Try adjusting your filters or search criteria to find available
                  properties.
                </p>
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={clearFilters}
                  className="rounded-full"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
        )}
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
