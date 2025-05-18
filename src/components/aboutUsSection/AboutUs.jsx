"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import AboutUsImg from "../../../public/images/111.jpeg";
import { motion, useInView, useAnimation } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const services = [
    ["Care homes", "Caregivers", "Nurses"],
    ["Senior product stores", "Medical transport", "Social institutions"],
  ];

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 dark:text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Image Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="lg:w-1/2"
          >
            <div className="relative mx-auto max-w-md lg:max-w-full">
              <div className="absolute inset-0 bg-[#206645] rounded-3xl transform rotate-3 scale-105 opacity-10 dark:opacity-20"></div>
              <div className="absolute inset-0 border-2 border-[#206645] rounded-3xl transform -rotate-2 scale-95 dark:border-opacity-40"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={AboutUsImg || "/placeholder.svg"}
                  alt="About Us Image"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  placeholder="blur"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="lg:w-1/2"
          >
            <div className="max-w-xl">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[#206645] dark:text-green-400">
                  About Us
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  SeniorLink is the first marketplace in Poland focused entirely
                  on services and institutions supporting senior citizens. We
                  bring together care homes, caregivers, nurses, senior product
                  stores, medical transport, and social institutions — all in
                  one platform.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.2 },
                  },
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((column, colIndex) => (
                    <div key={colIndex}>
                      {column.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.3 + index * 0.1 + colIndex * 0.3,
                          }}
                          className="flex items-center gap-3 mb-4"
                        >
                          <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full">
                            <CheckCircle className="h-5 w-5 text-[#206645] dark:text-green-400" />
                          </div>
                          <span className="text-gray-800 dark:text-gray-200">
                            {service}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.4 },
                  },
                }}
              >
                <Link href="/about-us" className="inline-block">
                  <button className="px-8 py-3 bg-[#206645] hover:bg-[#185536] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2">
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
