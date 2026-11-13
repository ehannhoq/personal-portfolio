'use client'

import ContactForm from "@/components/contact-form";
import ExperienceCarousel from "@/components/experience-carousel";
import HolographicReferralCard from "@/components/holographic-referral-card";
import ProjectCarousel from "@/components/project-carousel";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import { motion, useScroll, useMotionValueEvent, progress } from "motion/react";
import { section } from "motion/react-client";
import { useRef, useState } from "react";

const SECTIONS = [
  {
    label: "Introduction",
    progress: 0,
    id: 1
  },
  {
    label: "Projects",
    progress: 0.33,
    id: 2
  },
  {
    label: "Experience",
    progress: 0.67,
    id: 3
  },
  {
    label: "Contact",
    progress: 0.99,
    id: 4
  }
]

export default function Home() {
  const target = useRef(null);

  const [ scrollProgress, setScrollProgress ] = useState(0);

  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(0);
    for (const section of SECTIONS) {
      if (section.progress < latest) {
        setScrollProgress(section.id)
      }
    }
  })

  return (
    <div ref={target} className="w-[calc(100%-300px)] mx-auto h-[200vh] text-amber-50 font-pixel scrollbar-none [&::-webkit-scrollbar]:hidden">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        {scrollProgress != 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0 z-10 w-full flex items-center justify-center pointer-events-none"
          >
            <ScrollProgressBar progress={scrollYProgress} sections={SECTIONS}/>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: scrollProgress != 0 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-screen"
        >
          <span
            className="absolute w-75 h-75 bg-amber-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
                mask: `url(/signature.png) center / contain no-repeat`,
                WebkitMask: `url(/signature.png) center / contain no-repeat`,
            }}
          />

          <span
            className="absolute w-10 h-10 bg-amber-50 left-1/2 bottom-20 -translate-x-1/2"
            style={{
                mask: `url(/down_arrow.svg) center / contain no-repeat`,
                WebkitMask: `url(/down_arrow.svg) center / contain no-repeat`,
            }}
          />
        </motion.div>

        {scrollProgress == 1 && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0 w-full flex items-center justify-center"
          >
            <div className="w-full flex justify-center items-center flex-col">
              <div>
                <p className="text-6xl font-bold">ehan haque</p>
                <p>software developer, machine learning engineer, game developer</p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center text-amber">
              <HolographicReferralCard image="/IMG_7577.jpg" title="University of Vermont" description="Senior"/>
            </div>
          </motion.div>
        )}

        {scrollProgress == 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0 w-full flex items-center"
          >
            <ProjectCarousel/>
          </motion.div>
        )}

        {scrollProgress == 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0 w-full flex items-center"
          >
            <ExperienceCarousel/>
          </motion.div>
        )}

        {scrollProgress == 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0 w-full flex justify-center items-center"
          >
            <ContactForm/>
          </motion.div>
        )}
      </div>
    </div>
  );
}
