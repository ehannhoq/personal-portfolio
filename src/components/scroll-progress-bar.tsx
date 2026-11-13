'use client'

import { motion, MotionValue, useMotionValueEvent, useTransform } from "motion/react"
import { useState } from "react";

export default function ScrollProgressBar({ progress, sections }: { progress: MotionValue<number>, sections: any[] }) {
    const height = useTransform(progress, [0, 1], ["0%", "100%"])
    const [ current, setCurrent ] = useState(progress.getCurrent());

    useMotionValueEvent(progress, 'change', setCurrent)

    return (
        <div className="absolute right-0 h-[75%] w-1 bg-white/20 rounded-full pointer-events-auto">
            <motion.div className="h-full bg-amber-100 rounded-full" style={{ height }}></motion.div>

            {sections.map((section, i) => (
                <div key={section.label} className="absolute left-1/2 -translate-x-1/2" style={{ top: `${section.progress * 100}%`}}>
                    <motion.span
                        className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs w-auto h-auto cursor-pointer"
                        onClick={() => {
                            scrollTo({
                                top: (section.progress + 0.005) * (document.documentElement.scrollHeight - window.innerHeight),
                                behavior: 'instant'
                            })
                        }}
                        animate={{
                            scale: current >= section.progress && (i === sections.length - 1 || current < sections[i + 1].progress) ? 1.25 : 1,
                            color: current >= section.progress && (i === sections.length - 1 || current < sections[i + 1].progress) ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)',
                        }}
                    >
                        {section.label}
                    </motion.span>
                </div>
            ))}
        </div>
    )
}