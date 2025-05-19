"use client";
import PrimaryButton from "../primaryButton/PrimaryButton";
import styles from "./hero.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Hero = ({ initialLocation = "Kraków" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(initialLocation);

  return (
    <section className={`${styles.bg} mt-16`}>
      <div className="container mx-auto px-4 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-100 mb-10">
            SeniorLink – connecting those who care, with those in need of care.
          </h1>
          <Link href="/contact-us">
            <PrimaryButton>Get In Touch</PrimaryButton>
          </Link>
        </div>

        {/* Search Inputs */}
        <div className="w-full md:w-1/2 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch w-full">
            {/* Search Input */}
            <div className="relative flex-grow w-full sm:w-2/3 mb-4 sm:mb-0">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for care homes, caregivers, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-300 focus:ring-2 focus:ring-[#206645] focus:border-[#206645] outline-none"
              />
            </div>

            {/* Location Input */}
            <div className="relative flex-grow w-full sm:w-1/3">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg sm:rounded-l-none sm:rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#206645] focus:border-[#206645] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
