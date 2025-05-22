"use client"
import React from "react"
import { useState, useRef, useEffect } from "react";
import { m, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useLang } from "@/contexts/LangContext"
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

const ServicesPageMainSection = () => {
  const {messages} = useLang();
  const { user, loading } = useAuth();
  const [isList, setIsList] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.email);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setIsList(userData.setList === true);
          } else {
            setIsList(false);
          }
        } catch (error) {
          console.error("Error fetching admin status:", error);
          setIsList(false);
        }
      } else {
        setIsList(false);
      }
    };

    fetchAdminStatus();
  }, [user]);

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
            {messages['ourservicesTitle']}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {messages['aboutusmainContent']}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isList?<Link href="/profile" className="inline-flex items-center px-6 py-3 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
              {messages['profileTitle']}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </Link>:
            <Link href="/add-list" className="inline-flex items-center px-6 py-3 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
              {messages['addlistingTitle']}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </Link>}
            <Link href="/search-care/all" className="inline-flex items-center px-6 py-3 border border-[#206645] text-[#206645] hover:bg-[#206645]/5 font-medium rounded-lg transition-colors duration-300">
              {messages['findservicesTitle']}
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
                  <h3 className="text-xl font-bold text-white">{messages['forfamiliesTitle']}</h3>
                  <p className="text-white/80">{messages['termsfamiliesimagesubTitle']}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{messages['forfamiliesTitle']}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {messages['termsfamiliesContent']}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{messages['termsfamiliessubTitle']}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfamiliessubContent1']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfamiliessubContent4']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfamiliessubContent2']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfamiliessubContent5']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfamiliessubContent3']}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {messages['termsfamiliesfinalContent']}
              </p>
              <div className="mt-6">
                <Link href="/search-care/all" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  {messages['findcareserviceTitle']}
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
                  <h3 className="text-xl font-bold text-white">{messages['carefacilitiesTitle']}</h3>
                  <p className="text-white/80">{messages['termsfacilitiesimagesubTitle']}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{messages['carefacilitiesTitle']}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {messages['termsfacilitiesContent']}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{messages['termsfacilitiessubTitle']}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfacilitiessubContent1']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfacilitiessubContent2']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfacilitiessubContent3']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfacilitiessubContent4']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsfacilitiessubContent5']}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {messages['termsfacilitiesfinalContent']}
              </p>
              <div className="mt-6">
                <Link href="/care-facilities" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  {messages['findfacilitiesTitle']}
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
                  <h3 className="text-xl font-bold text-white">{messages['caregivernursesTitle']}</h3>
                  <p className="text-white/80">{messages['termspersonimagesubTitle']}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{messages['caregivernursesTitle']}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {messages['termspersonContent']}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{messages['termspersonsubTitle']}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termspersonsubContent1']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termspersonsubContent2']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termspersonsubContent3']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termspersonsubContent4']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termspersonsubContent5']}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {messages['termspersonfinalContent']}
              </p>
              <div className="mt-6">
                <Link href="/caregivers" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  {messages['findpersonTitle']}
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
                  <h3 className="text-xl font-bold text-white">{messages['seniorstoresTitle']}</h3>
                  <p className="text-white/80">{messages['termsstoresimagesubTitle']}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{messages['seniorstoresTitle']}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {messages['termsstoresContent']}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{messages['termsstoressubTitle']}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsstoressubContent1']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsstoressubContent2']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsstoressubContent3']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsstoressubContent4']}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {messages['termsstoresfinalContent']}
              </p>
              <div className="mt-6">
                <Link href="/senior-stores" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  {messages['findstoresTitle']}
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
                  <h3 className="text-xl font-bold text-white">{messages['transporthomehelpTitle']}</h3>
                  <p className="text-white/80">{messages['termstranshomeimagesubTitle']}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{messages['transporthomehelpTitle']}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {messages['termstranshomeContent']}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{messages['termstranshomesubTitle']}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termstranshomesubContent1']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termstranshomesubContent2']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termstranshomesubContent3']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termstranshomesubContent4']}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {messages['termstranshomefinalContent']}
              </p>
              <div className="mt-6">
                <Link href="/transport-home-help" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  {messages['findtranshomeTitle']}
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
                  <h3 className="text-xl font-bold text-white">{messages['institutionsTitle']}</h3>
                  <p className="text-white/80">{messages['termsinstitutionsimagesubTitle']}</p>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{messages['institutionsTitle']}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {messages['termsinstitutionsContent']}
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{messages['termsinstitutionssubTitle']}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsinstitutionssubContent1']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsinstitutionssubContent2']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsinstitutionssubContent3']}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#206645] dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{messages['termsinstitutionssubContent4']}</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {messages['termsinstitutionsfinalContent']}
              </p>
              <div className="mt-6">
                <Link href="/institutions" className="inline-flex items-center px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300">
                  {messages['findinstitutionsTitle']}
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