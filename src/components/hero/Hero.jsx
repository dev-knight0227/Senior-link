"use client"
import PrimaryButton from '../primaryButton/PrimaryButton'
import styles from './hero.module.css'
import Link from "next/link";

const Hero = () => {
  return (
    <section className={`${styles.bg} mt-16`}>
      <div className="container mx-auto px-3 py-32">
        <div
          className="content text-center md:text-start md:w-9/12 lg:w-1/2"
        >
          <h1 className="text-4xl mb-5 md:mb-8 text-slate-100 font-semibold md:text-5xl lg:text-6xl">
            SeniorLink – connecting those who care, with those in need of care.
          </h1>
          <div>
            <Link href="/contact-us">
            <PrimaryButton>Get In Touch</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero