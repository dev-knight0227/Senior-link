"use client";
import { useState, useRef, useEffect } from "react";
import { motion} from "framer-motion";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

const GreenBanner = () => {
  const {messages} = useLang();
  const { user, loading } = useAuth();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-[#206645] dark:bg-[#206645]/80 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {messages['bannerTitle']}
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
                {messages['bannerContent']}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user.setList?<Link href="/profile" className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#206645] font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  {messages['profileTitle']}
                </Link>:
                <Link href="/add-list/caregiver" className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#206645] font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  {messages['addlistingTitle']}
                </Link>}
                <Link href="/search-care/all" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-300">
                  {messages['searchcareTitle']}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
  );
};

export default GreenBanner;
