"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  HeartHandshake,
  UserRound,
  Building2,
  GraduationCap,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

const TargetAudienceSection = () => {
  const { messages } = useLang();
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

  const audiences = [
    {
      icon: <Users className="h-6 w-6 text-[#206645] dark:text-green-400" />,
      title: messages["servicefamilycardTitle"],
      description: messages["servicefamilycardContent"],
    },
    {
      icon: (
        <UserRound className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: messages["serviceseniorcardTitle"],
      description: messages["serviceseniorcardContent"],
    },
    {
      icon: (
        <HeartHandshake className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: messages["servicecaregivercardTitle"],
      description: messages["servicecaregivercardContent"],
    },
    {
      icon: (
        <Building2 className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: messages["servicecarehomeTitle"],
      description: messages["servicecarehomeContent"],
    },
    {
      icon: (
        <GraduationCap className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: messages["serviceinstitutionTitle"],
      description: messages["serviceinstitutionContent"],
    },
  ];

  const services = [
    {
      href: "/search-care/care_home",
      label: messages["findhomeTitle"],
      img: "/images/knitting.jpeg",
    },
    {
      href: "/search-care/caregiver",
      label: messages["findgiverTitle"],
      img: "/images/asdaught.jpeg",
    },
    {
      href: "/search-care/carenurse",
      label: messages["findnurseTitle"],
      img: "/images/medicalquest.jpeg",
    },
    {
      href: "/search-care/volunteer",
      label: messages["findvolunteerTitle"],
      img: "/images/333.jpeg",
    },
    {
      href: "/search-care/store",
      label: messages["findproductTitle"],
      img: "/images/hands.jpeg",
    },
    {
      href: "/search-care/transport",
      label: messages["findtransportTitle"],
      img: "/images/transport.jpeg",
    },
    {
      href: "/search-care/institution",
      label: messages["findinstitutionTitle"],
      img: "/images/institution.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {messages["homeserviceTitle1"]}
            <span className="text-[#206645] dark:text-green-400">
              SeniorLink
            </span>
            {messages["homeserviceTitle2"]}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-3"></p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {services.map(({ href, label, img }) => (
            <Link
              key={href}
              href={href}
              className="w-64 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#206645]"
            >
              <div className="relative h-40 w-full">
                <Image src={img} alt={label} fill className="object-cover" />
              </div>
              <div className="p-3 text-center bg-[#206645]">
                <h3 className="text-lg font-semibold text-white">{label}</h3>
              </div>
            </Link>
          ))}

          {/* Add Your Profile CTA */}
          <Link
            href={isList?"/profile":"/add-list/careHome"}
            className="flex flex-col items-center justify-center w-64 h-52 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-xl shadow-md transition-colors text-center p-6"
          >
            <UserPlus className="w-10 h-10 mb-3" />
            <span className="text-lg">{messages["addprofileTitle"]}</span>
          </Link>
        </div>

        {/* Flexbox layout with centered items */}
        <div className="flex flex-wrap justify-center gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md"
            >
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                  {audience.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    {audience.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
