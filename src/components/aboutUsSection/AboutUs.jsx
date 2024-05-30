"use client"
import Image from 'next/image'
import AboutUsImg from '../../../public/about-us.png'
import { MdLibraryAddCheck } from "react-icons/md";
import PrimaryButton from '../primaryButton/PrimaryButton';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);



const AboutUs = () => {
  const imgRef = useRef(null);
  const h2Ref = useRef(null);
  const pRef = useRef(null);
  const ulRef = useRef(null);
  const btnRef = useRef(null);
  const secRef = useRef(null)

// const ulChildren = Array.from(ulRef.current.children)

  useGSAP(()=>{
    gsap.from(imgRef.current,{
      x: -1500,
      duration:1,
      // delay:1,
      stagger:.3,
      opacity: 0,
      scrollTrigger:{
        trigger: imgRef.current,
        start: "top 80%",
        end: "top 30%",
        // markers: true,
        // scrub: 1
      }
    })
       gsap.from([h2Ref.current,pRef.current], {
         y: 30,
         duration: 1,
        //  delay: 1,
         stagger: .3,
         opacity: 0,
         scrollTrigger: {
           trigger: secRef.current,
           start: "top 70%",
           end: "top 40%",
          //  markers: true,
          //  scrub: 1,
         },
       });
       if (ulRef.current) {
         gsap.from(Array.from(ulRef.current.children), {
           y: 30,
           duration: .3,
          //  delay: 1,
           stagger: .2,
           opacity: 0,
           scrollTrigger: {
             trigger: ulRef.current,
             start: "top 70%",
             end: "top 40%",
            //  markers: true,
            //  scrub: 1,
            
           },
         });
       }

       gsap.from(btnRef.current, {
         x: -500,
         duration: 1,
         //  delay: 1,
         stagger: 0.3,
         opacity: 0,
         scrollTrigger: {
           trigger: btnRef.current,
           start: "top 90%",
           end: "top 40%",
          //  markers: true,
            // scrub: 1,
         },
       });
  },[])
  return (
    <section className="py-20 dark:bg-slate-600 dark:text-slate-100">
      <div className="container mx-auto px-3 flex flex-col lg:flex-row lg:items-center gap-10">
        <div className="left flex-1 z-[1] mb-8 flex justify-center lg:justify-start">
          <div
            ref={imgRef}
            className="img-box max-w-[300px] sm:max-w-[450px] relative"
          >
            <div className="hidden sm:block border border-green-400 absolute w-full h-full top-10 left-10 z-[-1]"></div>
            <Image src={AboutUsImg} alt="About Us Image" />
          </div>
        </div>
        <div ref={secRef} className="right flex-1 font-light">
          <h2
            ref={h2Ref}
            className="text-3xl sm:text-4xl font-medium mb-5 text-center sm:text-start"
          >
            About Us
          </h2>
          <p ref={pRef}>
            Lorem ipsum dolor sit amet consectetur. Augue non malesuada placerat
            faucibus nam purus sem. Urna pulvinar porttitor dignissim congue
            pellentesque ac hac.
          </p>
          <ul
            ref={ulRef}
            className="mt-8 flex flex-col gap-2 list-disc list-inside mb-10"
          >
            <li className="flex gap-2 items-center">
              <MdLibraryAddCheck className="text-green-400 text-lg" /> Lorem
              ipsum dolor sit amet consectetur.{" "}
            </li>
            <li className="flex gap-2 items-center">
              <MdLibraryAddCheck className="text-green-400 text-lg" /> Augue non
              malesuada placerat faucibus nam purus sem.{" "}
            </li>
            <li className="flex gap-2 items-center">
              <MdLibraryAddCheck className="text-green-400 text-lg" />
              Urna pulvinar porttitor dignissim congue pellentesque ac hac.{" "}
            </li>
            <li className="flex gap-2 items-center">
              <MdLibraryAddCheck className="text-green-400 text-lg" /> Eu
              adipiscing massa ut proin mauris orci tincidunt ac in.
            </li>
          </ul>
          <div ref={btnRef}>
            <PrimaryButton>Learn More</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs