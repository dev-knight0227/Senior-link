"use client"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLang } from "@/contexts/LangContext"

const AboutUsDetail = () => {
  const {messages} = useLang();
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
    <div className="bg-white dark:bg-gray-900">
      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {messages['ourmissionTitle']}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                {messages['aboutusmainContent']}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">{messages['verifiedprofilesTitle']}</span> - {messages['verifiedprofilesContent']}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">{messages['comprehensiveservicesTitle']}</span> - {messages['comprehensiveservicesContent']}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">{messages['trustedreviewsTitle']}</span> - {messages['trustedreviewsContent']}
                  </p>
                </div>
              </div>
              <Link href="/services" className="inline-flex items-center px-6 py-3 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                {messages['exploreourservicesTitle']}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </motion.div>
            <motion.div variants={fadeIn} className="order-1 lg:order-2">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/333.jpeg" 
                  alt="Senior care services" 
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              SeniorLink is designed for everyone involved in senior care.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div 
              variants={fadeIn}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">For Families</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                For families looking for safe, professional care for their loved ones. We help you make an informed choice with real reviews, clear info, and verified profiles.
              </p>

            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={fadeIn}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">For Seniors</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                For seniors seeking daily support or companionship. Find the help you need with dignity and respect, whether it is daily care, specialized assistance, or just companionship.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={fadeIn}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">For Care Providers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                For care homes, caregivers, nurses, and service providers who want to be found. Present your services professionally and connect with families who need you most.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              One platform. All the help you need.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Service 1 */}
            <motion.div 
              variants={fadeIn}
              className="flex gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Care Facilities</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your care home deserves to be seen by families who need you the most. SeniorLink helps you present your facility in a professional, trustworthy, and easy-to-find way.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Full description, contact info, map & photos
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Price range, capacity, and availability
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Specializations (e.g. Alzheimer, Parkinson)
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              variants={fadeIn}
              className="flex gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Caregivers & Nurses</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Whether you are an experienced caregiver, a nurse, or just starting out — SeniorLink lets you create a profile and offer your help on your terms.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Your type of service (daily care, specialized care, nursing)
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Travel distance, availability, and hourly rate
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Experience, certifications, and specializations
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              variants={fadeIn}
              className="flex gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Senior Stores</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you run a local shop with products for seniors — hygiene items, mobility aids, medical supplies — SeniorLink helps you show up exactly where people are looking.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Address, map, and opening hours
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Types of products you offer
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Optional link to your website or online shop
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Service 4 */}
            <motion.div 
              variants={fadeIn}
              className="flex gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Transport & Home Help</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Whether it is a medical ride, regular transport, cleaning, or cooking — your service makes life easier for seniors and their families. SeniorLink lets people in your area find you fast.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Type of service
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Area of operation
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Prices and availability
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              What drives us every day
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Value 1 */}
            <motion.div variants={fadeIn} className="text-center">
              <div className="w-20 h-20 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trust & Safety</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We verify profiles and reviews to ensure a safe environment for everyone involved in senior care. Your security and peace of mind are our top priorities.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div variants={fadeIn} className="text-center">
              <div className="w-20 h-20 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe in the power of connections and building a supportive community around senior care. Together, we can create a better experience for seniors and their families.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div variants={fadeIn} className="text-center">
              <div className="w-20 h-20 bg-[#206645]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#206645] dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Efficiency</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We make finding and offering care services simple, saving time and reducing stress for everyone. Our platform is designed to be intuitive and straightforward.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutUsDetail