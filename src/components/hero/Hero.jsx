"use client"
import gsap from 'gsap';
import PrimaryButton from '../primaryButton/PrimaryButton'
import styles from './hero.module.css'
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { bottomToTop } from '@/utils/gsapAnimationJs/gsapAnimation';

const Hero = () => {
  const tl = gsap.timeline()
  const heroRef = useRef(null)
  useGSAP(()=>{
    bottomToTop({
      ele: Array.from(heroRef.current?.children),
      obj: tl,
      delay: 1,
      duration: .5,
      stagger:.3,
      opacity: 0
    });
  },[])
  return (
    <section className={`${styles.bg} mt-16`}>
      <div className="container mx-auto px-3 py-32">
        <div
          className="content text-center md:text-start md:w-9/12 lg:w-1/2"
          ref={heroRef}
        >
          <h1 className="text-4xl mb-5 md:mb-8 text-slate-100 font-semibold md:text-5xl lg:text-6xl">
            Stay Comfortably Like Your Home
          </h1>
          <p className="mb-8 font-light md:md-8 text-slate-300">
            Lorem ipsum dolor sit amet consectetur. Mattis aenean quis cursus
            consectetur tortor facilisis vulputate.
          </p>
          <div>
            <PrimaryButton>Get In Touch</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero