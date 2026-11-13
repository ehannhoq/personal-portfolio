'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState } from "react";


function Icon({ name }: { name: string }) {
    const [ mouseX, setMouseX ] = useState(0);
    const [ mouseY, setMouseY ] = useState(0)

    const [ tooltipDelay, setTooltipDelay ] = useState<ReturnType<typeof setTimeout>>();
    const [ showTooltip, setShowTooltip ] = useState(false);

    const transformZ = useSpring(useMotionValue(0))
    const transform = useMotionTemplate`perspective(1000px) translateZ(${transformZ}px)`

    const onPointerEnter = () => {
        transformZ.set(100);
        setTooltipDelay(setTimeout(() => {
            setShowTooltip(true);
        }, 500))
    }

    const onPointerLeave = () => {
        transformZ.set(0);
        clearTimeout(tooltipDelay);
        setShowTooltip(false);
    }

    const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch')
            return;

        const bounds = event.currentTarget.getBoundingClientRect();
        
        setMouseX(event.clientX - bounds.left);
        setMouseY(event.clientY - bounds.top);
    }


    return (
        <motion.div
            className="w-full aspect-square cursor-pointer relative"
            style={{ transform }}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
        >
            <Image
                src={`/skills/${name}.svg`}
                alt={name}
                width={30}
                height={30}
                className="h-full w-full object-contain"
            />

            {showTooltip && (
                <motion.div className="absolute top-1/2 left-0 -translate-x-1/2 bg-black/75 rounded-xl p-2 pointer-events-none font-mono whitespace-nowrap" style={{ x: mouseX, y: mouseY }}>
                    <p>{name.replaceAll('_', ' ').toLocaleUpperCase()}</p>
                </motion.div>
            )}
        </motion.div>
    )
}


export default function SkillsBar({ languages, skills }: { languages: string[] | undefined, skills: string[] | undefined } ) {
    return (
        <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            { skills && (
                <div className="flex flex-1 justify-center items-center gap-2 sm:gap-4" style={{ minWidth: skills.length * 28 }}>
                    {skills.map((skill) => (
                        <div key={skill} className="flex-1 min-w-0 max-w-7.5">
                            <Icon name={skill}/>
                        </div>
                    ))}
                </div>
            )}
            { languages && (
                <div className="flex flex-1 justify-center items-center gap-2 sm:gap-4" style={{ minWidth: languages.length * 28 }}>
                    {languages.map((language) => (
                        <div key={language} className="flex-1 min-w-0 max-w-7.5">
                            <Icon name={language}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
