"use client"
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const ServicesPageMainSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        {/* Intro Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            SeniorLink is the first marketplace in Poland focused entirely on services and institutions supporting senior citizens. We bring together care homes, caregivers, nurses, senior product stores, medical transport, and social institutions — all in one platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/add-list" className="inline-flex items-center px-6 py-3 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
              Add Your Listing
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </Link>
            <Link href="/search-care/all" className="inline-flex items-center px-6 py-3 border border-[#206645] text-[#206645] hover:bg-[#206645]/5 font-medium rounded-lg transition-colors duration-300">
              Find Services
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* For Families Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/family.jpg" 
                alt="Family with senior" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">For Families</h3>
                  <p className="text-white/80">Support for families caring for elderly loved ones</p>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">For Families</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Choosing care for an aging parent or grandparent is never easy. SeniorLink helps you make an informed choice — with real reviews, clear info, and verified profiles.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Search with confidence:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Compare care homes and independent caregivers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Filter by location, price, specialization, availability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Read verified reviews</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Contact directly or use built-in chat</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Save favorites and return anytime</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Make the right choice with peace of mind.
              </p>
              <div className="mt-6">
                <Link href="/search-care/all" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  Find care services
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Care Facilities Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/knitting.jpeg" 
                alt="Care Facility" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">Care Facilities</h3>
                  <p className="text-white/80">Professional care homes and nursing facilities</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Care Facilities</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your care home deserves to be seen by families who need you the most. SeniorLink helps you present your facility in a professional, trustworthy, and easy-to-find way. Whether you run a public or private nursing home or a day care center — this is your space.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your profile includes:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Full description, contact info, map & photos</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Price range, capacity, and availability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Specializations (e.g. Alzheimer, Parkinson)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Accessibility (elevators, private rooms, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Reviews from families</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Join SeniorLink and help families find safe, quality care.
              </p>
              <div className="mt-6">
                <Link href="/care-facilities" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  Add your care facility
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Caregivers & Nurses Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/medicalquest.jpeg" 
                alt="Caregiver with senior" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">Caregivers & Nurses</h3>
                  <p className="text-white/80">Professional care providers and healthcare specialists</p>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Caregivers & Nurses</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Whether you are an experienced caregiver, a nurse, or just starting out — SeniorLink lets you create a profile and offer your help on your terms. Your services matter, and we help you get discovered by those who need you most.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What you can share:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Your type of service (daily care, specialized care, nursing, rehabilitation, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Travel distance, availability, and hourly rate</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Experience, certifications, and specializations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Chat and contact options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Reviews from families and patients</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Build trust, reach more families, and grow your impact.
              </p>
              <div className="mt-6">
                <Link href="/caregivers" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  Register as a caregiver
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Senior Stores Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/hands.jpeg" 
                alt="Senior Store" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">Senior Stores</h3>
                  <p className="text-white/80">Specialized products and equipment for seniors</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Senior Stores</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                If you run a local shop with products for seniors — hygiene items, mobility aids, medical supplies — SeniorLink helps you show up exactly where people are looking. Reach the customers who need your products the most.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your listing can include:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Address, map, and opening hours</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Types of products you offer</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Optional link to your website or online shop</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Photos of your store or shelves</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Help families and caregivers find what they need locally.
              </p>
              <div className="mt-6">
                <Link href="/senior-stores" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  Add your store
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Transport & Home Help Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/transport.jpeg" 
                alt="Senior Transport Service" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">Transport & Home Help</h3>
                  <p className="text-white/80">Transportation and home assistance services</p>
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Transport & Home Help</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Whether it is a medical ride, regular transport, cleaning, or cooking — your service makes life easier for seniors and their families. SeniorLink lets people in your area find you fast when help is needed.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add to your listing:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Type of service</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Area of operation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Prices and availability</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Contact info and optional photos</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Make it easy for others to reach you when they need support.
              </p>
              <div className="mt-6">
                <Link href="/transport-home-help" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  Add your service
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Institutions Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/institution.jpg" 
                alt="Public Institution" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">Institutions</h3>
                  <p className="text-white/80">Public institutions and support organizations</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Institutions</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Public institutions supporting seniors often remain invisible to those who need them. SeniorLink gives you visibility and a clear point of contact to connect with your community.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Useful for:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Social welfare offices (MOPS, GOPS)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Family support centers (PCPR)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Senior offices and NGOs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">Local programs and networks</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Make sure seniors and families can find your support.
              </p>
              <div className="mt-6">
                <Link href="/institutions" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  Add your institution
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  )
}

export default ServicesPageMainSection