"use client";

import { motion } from "framer-motion";
import {
  Users,
  HeartHandshake,
  UserRound,
  Building2,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

const TargetAudienceSection = () => {
  const audiences = [
    {
      icon: <Users className="h-6 w-6 text-[#206645] dark:text-green-400" />,
      title:
        "For families looking for safe, professional care for their loved ones",
      description:
        "Find trusted caregivers and services to ensure your loved ones receive the best care possible.",
    },
    {
      icon: (
        <UserRound className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: "For seniors seeking daily support or companionship",
      description:
        "Connect with compassionate caregivers who can assist with daily activities and provide meaningful companionship.",
    },
    {
      icon: (
        <HeartHandshake className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: "For caregivers, nurses, and volunteers offering services",
      description:
        "Join our network to offer your professional services and connect with those who need your expertise.",
    },
    {
      icon: (
        <Building2 className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: "For care homes and service providers who want to be found",
      description:
        "Increase your visibility and connect with families looking for quality care services.",
    },
    {
      icon: (
        <GraduationCap className="h-6 w-6 text-[#206645] dark:text-green-400" />
      ),
      title: "For public institutions supporting the elderly",
      description:
        "Partner with us to expand your reach and better serve the senior community.",
    },
  ];

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Who is{" "}
            <span className="text-[#206645] dark:text-green-400">
              SeniorLink
            </span>{" "}
            for?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connecting seniors, families, caregivers, and institutions to create
            a supportive community.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-5">
          {[
            { href: "/search-care", label: "Find care services" },
            { href: "/care-facilities", label: "Add your care facility" },
            { href: "/caregivers", label: "Register as a caregiver" },
            { href: "/senior-stores", label: "Add your store" },
            { href: "/transport-home-help", label: "Add your service" },
            { href: "/institutions", label: "Add your institution" },
          ].map(({ href, label }) => (
            <div key={href} className="m-3">
              <Link
                href={href}
                className="inline-flex items-center justify-center w-64 px-5 py-2.5 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg transition-colors duration-300 text-center"
              >
                {label}
              </Link>
            </div>
          ))}
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
                    {audience.title.split("For ")[1]}
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
