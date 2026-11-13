'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

const springOptions = {
    stiffness: 100,
    damping: 10,
    mass: 0.5
}

export default function ReactiveCard({ children }: Readonly<{ children: React.ReactNode; }>) {
    const rotateX = useSpring(useMotionValue(0), springOptions);
    const rotateY = useSpring(useMotionValue(0), springOptions);
    const translateZ = useSpring(useMotionValue(0), springOptions);

    const glowX = useSpring(useMotionValue(0), springOptions);
    const glowY = useSpring(useMotionValue(0), springOptions);
    const glowOpacity = useSpring(useMotionValue(0), springOptions);

    const cardTransform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
    const glowStyle = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.90) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`

    const onPointerEnter = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch')
            return;

        translateZ.set(10);
        glowOpacity.set(0.1)
    }
    
    const onPointerLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        translateZ.set(0);
        glowOpacity.set(0);
    }
    const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch')
            return;
        
        const bounds = event.currentTarget.getBoundingClientRect();
        const pointerX = event.clientX - bounds.left;
        const pointerY = event.clientY - bounds.top;
        const xProg = pointerX / bounds.width;
        const yProg = pointerY / bounds.height;
        
        rotateX.set((yProg - 0.5) * 10);
        rotateY.set((xProg - 0.5) * -10);
        translateZ.set(10);
        
        glowOpacity.set(0.1)
        glowX.set(xProg * 100);
        glowY.set(yProg * 100);
    }

    return (
        <div className="w-full h-full relative rounded-2xl
        ">
            <motion.div
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                style={{ transform: cardTransform }}
                className="w-full h-full"
            >
                {children}
            </motion.div>

            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style = {{ background: glowStyle, opacity: glowOpacity, transform: cardTransform }}
            />

        </div>
    )
}