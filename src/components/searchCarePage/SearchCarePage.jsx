"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";

// SearchCare Component - A standalone component for searching care services
const SearchCare = ({category = "all"}) => {
  // State for search and filters
  const {messages} = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Kraków");
  const [providerType, setProviderType] = useState(category);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("list");
  const [specializations, setSpecializations] = useState([]);
  const [availability, setAvailability] = useState("any");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Simulate loading data
    setTimeout(() => {
      setFilteredResults(CARE_PROVIDERS);
      setIsLoading(false);
    }, 500);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (isLoading) return;

    let results = [...CARE_PROVIDERS];

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.specializations.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by provider type
    if (providerType !== "all") {
      results = results.filter((provider) => provider.type === providerType);
    }

    // Filter by verified
    if (verifiedOnly) {
      results = results.filter((provider) => provider.verified);
    }

    // Filter by specializations
    if (specializations.length > 0) {
      results = results.filter((provider) =>
        specializations.some((spec) =>
          provider.specializations.some((providerSpec) => providerSpec.toLowerCase().includes(spec.toLowerCase()))
        )
      );
    }

    // Filter by availability
    if (availability !== "any") {
      results = results.filter((provider) => provider.availability.toLowerCase().includes(availability.toLowerCase()));
    }

    // Sort results
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "price_low":
        // This is a simplified sort for the mock data
        results.sort((a, b) => {
          const aPrice = a.price.includes("PLN/hour")
            ? parseFloat(a.price.split("-")[0]) * 160 // Assuming 160 hours per month
            : parseFloat(a.price.split("-")[0]);
          const bPrice = b.price.includes("PLN/hour")
            ? parseFloat(b.price.split("-")[0]) * 160
            : parseFloat(b.price.split("-")[0]);
          return aPrice - bPrice;
        });
        break;
      case "price_high":
        results.sort((a, b) => {
          const aPrice = a.price.includes("PLN/hour")
            ? parseFloat(a.price.split("-")[0]) * 160
            : parseFloat(a.price.split("-")[0]);
          const bPrice = b.price.includes("PLN/hour")
            ? parseFloat(b.price.split("-")[0]) * 160
            : parseFloat(b.price.split("-")[0]);
          return bPrice - aPrice;
        });
        break;
      default:
        // For relevance, show featured first
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredResults(results);
  }, [searchQuery, providerType, sortBy, verifiedOnly, specializations, availability, isLoading]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setProviderType("all");
    setSortBy("relevance");
    setSpecializations([]);
    setAvailability("any");
    setVerifiedOnly(true);
  };

  // Toggle specialization selection
  const toggleSpecialization = (spec) => {
    setSpecializations((prev) => (prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]));
  };

  // Render provider type badge
  const renderTypeBadge = (type) => {
    const colors = {
      care_home: "bg-blue-100 text-blue-800",
      caregiver: "bg-purple-100 text-purple-800",
      carenurse: "bg-purple-90 text-purple-700",
      transport: "bg-amber-100 text-amber-800",
      store: "bg-emerald-100 text-emerald-800",
      institution: "bg-gray-100 text-gray-800",
    };

    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[type]}`}>
        <span className="mr-1">{typeIcons[type]}</span>
        <span>{typeNames[type]}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {messages['findcarepageTitle1']} <span className="text-[#206645]">{messages['findcarepageTitle2']}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {messages['findcarepagesubTitle']}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={messages['searchPlaceholder']}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full rounded-l-lg border border-r-0 border-gray-300 focus:ring-2 focus:ring-[#206645] focus:border-[#206645] outline-none"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={messages['locationTitle']}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#206645] focus:border-[#206645] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          {!isMobile && (
            <div className="md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-[#206645]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filters
                  </h2>
                  <button
                    onClick={resetFilters}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Provider Type */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Provider Type</h3>
                    <div className="space-y-2">
                      {Object.entries({
                        all: "All Types",
                        care_home: "Care Homes",
                        caregiver: "Caregivers",
                        carenurse: "Carenurses",
                        transport: "Transport Services",
                        store: "Senior Stores",
                        institution: "Institutions",
                      }).map(([value, label]) => (
                        <div key={value} className="flex items-center">
                          <input
                            type="radio"
                            id={`type-${value}`}
                            name="providerType"
                            value={value}
                            checked={providerType === value}
                            onChange={() => setProviderType(value)}
                            className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300"
                          />
                          <label htmlFor={`type-${value}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Specializations</h3>
                    <div className="space-y-2">
                      {[
                        "Dementia Care",
                        "Alzheimer's Care",
                        "Rehabilitation",
                        "Palliative Care",
                        "Mobility Assistance",
                      ].map((spec) => (
                        <div key={spec} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`spec-${spec}`}
                            checked={specializations.includes(spec)}
                            onChange={() => toggleSpecialization(spec)}
                            className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                          />
                          <label htmlFor={`spec-${spec}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {spec}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#206645] focus:border-[#206645] text-sm"
                    >
                      <option value="any">Any availability</option>
                      <option value="available">Currently available</option>
                      <option value="weekday">Weekdays</option>
                      <option value="weekend">Weekends</option>
                      <option value="24/7">24/7 service</option>
                    </select>
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="verified"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300 rounded"
                    />
                    <label htmlFor="verified" className="ml-2 text-sm text-gray-700 cursor-pointer">
                      Verified providers only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {filteredResults.length} results found
                  </h2>
                  {(providerType !== "all" || specializations.length > 0 || availability !== "any") && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {providerType !== "all" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {typeNames[providerType]}
                          <button
                            onClick={() => setProviderType("all")}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      )}

                      {specializations.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {spec}
                          <button
                            onClick={() => toggleSpecialization(spec)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      ))}

                      {availability !== "any" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {availability === "available"
                            ? "Available now"
                            : availability === "weekday"
                            ? "Weekdays"
                            : availability === "weekend"
                            ? "Weekends"
                            : "24/7"}
                          <button
                            onClick={() => setAvailability("any")}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filters */}
                  {isMobile && (
                    <button
                      onClick={() => setIsFiltersOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Filters
                    </button>
                  )}

                  {/* Sort Dropdown */}
                  <div className="flex-grow sm:flex-grow-0">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full sm:w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#206645] focus:border-[#206645] text-sm"
                    >
                      <option value="relevance">Sort by: Relevance</option>
                      <option value="rating">Sort by: Highest Rating</option>
                      <option value="price_low">Sort by: Price: Low to High</option>
                      <option value="price_high">Sort by: Price: High to Low</option>
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:block">
                    <div className="inline-flex rounded-md shadow-sm">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                          viewMode === "list"
                            ? "bg-[#206645] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        List
                      </button>
                      <button
                        onClick={() => setViewMode("map")}
                        className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                          viewMode === "map"
                            ? "bg-[#206645] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Content */}
            <div>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#206645]"></div>
                </div>
              ) : viewMode === "list" ? (
                <div className="space-y-6">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((provider) => (
                      <div
                        key={provider.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Image */}
                          <div className="md:w-1/3 relative">
                            <div className="relative h-48 md:h-full">
                              <Image
                                src={provider.image || "/placeholder.svg"}
                                alt={provider.name}
                                className="w-full h-full object-cover"
                                height={300}
                                width={400}
                              />
                              {provider.featured && (
                                <div className="absolute top-2 left-2 bg-[#206645] text-white text-xs font-medium px-2 py-1 rounded">
                                  Featured
                                </div>
                              )}
                              <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400 hover:text-red-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 md:w-2/3 flex flex-col">
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{provider.name}</h3>
                                  <div className="flex items-center mb-2">
                                    {renderTypeBadge(provider.type)}
                                    {provider.verified && (
                                      <div className="ml-2 flex items-center text-xs text-[#206645] font-medium">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-3.5 w-3.5 mr-0.5"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                        Verified
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-yellow-400 mr-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="font-semibold text-gray-900">{provider.rating}</span>
                                  <span className="text-gray-500 text-sm ml-1">({provider.reviewCount})</span>
                                </div>
                              </div>

                              <div className="flex items-center text-gray-500 text-sm mb-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span>{provider.address}</span>
                                <span className="mx-2">•</span>
                              </div>

                              <p className="text-gray-600 mb-4 line-clamp-2">{provider.description}</p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {provider.specializations.slice(0, 3).map((spec, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700"
                                  >
                                    {spec}
                                  </span>
                                ))}
                                {provider.specializations.length > 3 && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                                    +{provider.specializations.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100">
                              <div className="mb-3 sm:mb-0">
                                <div className="text-[#206645] font-semibold">{provider.price}</div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  {provider.availability}
                                </div>
                              </div>
                              <div className="flex gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2 inline-block"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                  Contact
                                </button>
                                <button className="flex-1 sm:flex-initial px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#206645] hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                 ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600 mb-6">
                        We could not find any care providers matching your search criteria. Try adjusting your filters or
                        search terms.
                      </p>
                      <button
                        onClick={resetFilters}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#206645] hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645]"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="h-[600px] relative bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-[#206645] mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Map View</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Interactive map showing {filteredResults.length} care providers in {location} will be displayed
                        here.
                      </p>
                    </div>

                    {/* Map provider pins would be rendered here */}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredResults.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button
                    disabled
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-500 bg-white cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-[#206645] rounded-md text-sm font-medium text-white bg-[#206645]">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobile && isFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsFiltersOpen(false)}></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-t-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Filters</h3>
                      <button
                        onClick={() => setIsFiltersOpen(false)}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-2 max-h-[70vh] overflow-y-auto">
                      <div className="space-y-6">
                        {/* Provider Type */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Provider Type</h3>
                          <div className="space-y-2">
                            {Object.entries({
                              all: "All Types",
                              care_home: "Care Homes",
                              caregiver: "Caregivers",
                              carenurse: "Carenurses",
                              transport: "Transport Services",
                              store: "Senior Stores",
                              institution: "Institutions",
                            }).map(([value, label]) => (
                              <div key={value} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`mobile-type-${value}`}
                                  name="mobileProviderType"
                                  value={value}
                                  checked={providerType === value}
                                  onChange={() => setProviderType(value)}
                                  className="h-4 w-4 text-[#206645] focus:ring-[#206645] border-gray-300"
                                />
                                <label
                                  htmlFor={`mobile-type-${value}`}
                                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                                >
                                  {label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Other filters would go here */}
                        {/* ... */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#206645] text-base font-medium text-white hover:bg-[#185536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#206645] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    resetFilters();
                    setIsFiltersOpen(false);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data for care providers
const CARE_PROVIDERS = [
  {
    id: 1,
    name: "Golden Years Care Home",
    type: "care_home",
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    featured: true,
    address: "ul. Krakowska 45, Kraków",
    image: "/images/painting.jpeg?height=300&width=400",
    price: "4500-6000 PLN/month",
    availability: "3 spots available",
    specializations: ["Dementia Care", "24/7 Medical Support", "Rehabilitation"],
    description:
      "A premium care facility with 24/7 medical support, comfortable private rooms, and a wide range of activities for seniors.",
  },
  {
    id: 2,
    name: "Anna Kowalska",
    type: "caregiver",
    rating: 4.9,
    reviewCount: 56,
    verified: true,
    featured: false,
    address: "Nowa Huta, Kraków",
    image: "/images/medicalquest.jpeg?height=300&width=400",
    price: "30-35 PLN/hour",
    availability: "Available weekdays",
    specializations: ["Elderly Care", "Medication Management", "Companionship"],
    description:
      "Experienced caregiver with 10+ years of experience and nursing background. Specializes in elderly care and companionship.",
  },
  {
    id: 3,
    name: "Sunshine Senior Residence",
    type: "care_home",
    rating: 4.5,
    reviewCount: 89,
    verified: true,
    featured: false,
    address: "ul. Długa 76, Kraków",
    image: "/images/knitting.jpeg?height=300&width=400",
    price: "3800-5200 PLN/month",
    availability: "1 spot available",
    specializations: ["Long-term Care", "Memory Care", "Physical Therapy"],
    description:
      "Comfortable living environment with specialized memory care units and regular physical therapy sessions.",
  },
  {
    id: 4,
    name: "MediTransport Senior",
    type: "transport",
    rating: 4.7,
    reviewCount: 42,
    verified: true,
    featured: false,
    address: "Serves all Kraków",
    image: "/images/transport.jpeg?height=300&width=400",
    price: "From 60 PLN/trip",
    availability: "24/7 service",
    specializations: ["Medical Transport", "Wheelchair Accessible", "Hospital Visits"],
    description:
      "Specialized transport service for seniors with medical needs. Wheelchair accessible vehicles and trained staff.",
  },
];

// Icon mapping for provider types
const typeIcons = {
  care_home: "🏠",
  caregiver: "👨‍⚕️",
  carenurse: "👨‍⚕️",
  transport: "🚑",
  store: "🛒",
  institution: "🏛️",
};

// Type names for display
const typeNames = {
  care_home: "Care Home",
  caregiver: "Caregiver",
  carenurse: "Carenurse",
  transport: "Transport",
  store: "Senior Store",
  institution: "Institution",
};

export default SearchCare;