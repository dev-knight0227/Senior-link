import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);



export const topToBottom = ({ ele, obj = gsap, animName = "" }) => {
    obj.from(ele, {
        y: -30,
        delay: 1,
        duration: .5,
        stagger: .3,
        opacity: 0,
        ease: "bounch.out"
    }, animName)

}


export const bottomToTop = ({ ele, obj = gsap, animName = "" }) => {
    obj.from(ele, {
        y: 30,
        delay: 1,
        duration: .5,
        stagger: .3,
        opacity: 0,
        ease :"bounch.out"
    }, animName)

}

export const leftToRight = ({ ele, obj = gsap, animName = "" }) => {
    obj.from(ele, {
        x: -5000,
        delay: 1,
        duration: .5,
        stagger: .3,
        opacity: 0,
        ease: "bounch.out"
    }, animName)

}


export const rightToLeft = ({ ele, obj = gsap, animName = "" }) => {
    obj.from(ele, {
        x: 30,
        delay: 1,
        duration: .5,
        stagger: .3,
        opacity: 0,
        ease: "bounch.out"
    }, animName)

}