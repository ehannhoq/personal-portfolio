import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import LiquidChrome from "./LiquidChrome";
import ReactiveCard from "./reactive-card";
import SkillsBar from "./skills-bar";

const EXPERIENCES = [
  {
    title: "Aygilia",
    position: "Co-Founder",
    timeframe: "SEPT 2026 - PRESENT",
    img: "/aygilia-logo.svg",
    description: [
      "Launched an AI-regulating Chrome Extension for K-12 institutions",
    ]
  },
];

export default function ExperienceCarousel() {
  const target = useRef(null);
  const degree = 60 / EXPERIENCES.length;
  const rotationTarget = useMotionValue(0);
  const rotation = useSpring(rotationTarget, {
    stiffness: 500,
    damping: 100,
    mass: 0.5,
  });
  const [selected, setSelected] = useState(EXPERIENCES[0]);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(undefined);

  useMotionValueEvent(rotationTarget, "change", (latest) => {
    if (EXPERIENCES.length <= 1) return;

    if (timeout.current != null) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      timeout.current = null;
      rotationTarget.set(Math.round(-latest / degree) * -degree);
    }, 300);
  });

  useMotionValueEvent(rotation, "change", (latest) => {
    if (EXPERIENCES.length <= 1) return;
    const index = Math.round(-latest / degree);
    setSelected(
      EXPERIENCES[((index % EXPERIENCES.length) + EXPERIENCES.length) % EXPERIENCES.length],
    );
  });

  useEffect(() => {
    const element = target.current as HTMLDivElement | null;
    if (!element) return;

    if (EXPERIENCES.length <= 1) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      rotationTarget.set(rotationTarget.get() + e.deltaY * 0.2);
    };

    element.addEventListener("wheel", onWheel);

    return () => element.removeEventListener("wheel", onWheel);
  }, [rotationTarget]);

  return (
    <div className="w-full h-full flex items-center gap-10">
      <div
        ref={target}
        className="sticky top-0 w-[50%] h-[50%] flex items-center"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <span
          className="absolute w-10 h-10 bg-amber-50 left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            mask: `url(/chevron_right.svg) center / contain no-repeat`,
            WebkitMask: `url(/chevron_right.svg) center / contain no-repeat`,
          }}
        />
        <motion.div style={{ rotate: rotation, willChange: 'transform' }} className="relative -top-5">
          {Array.from(
            { length: Math.round(360 / degree) },
            (_, i) => EXPERIENCES[i % EXPERIENCES.length],
          ).map((project, i) => (
            <div
              key={`${project.title}-${i}`}
              className={`absolute top-1/2 left-1/2 whitespace-nowrap text-3xl ${project.title === selected.title ? "text-amber-50" : "text-amber-50/50"}`}
              style={{
                transform: `rotate(${i * degree}deg) translateX(20cqw)`,
                transformOrigin: "0 0",
              }}
            >
              {project.title}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="w-[30%] h-[60%]">
        <ReactiveCard>
          <div className="w-full h-full bg-white/10 font-mono rounded-2xl overflow-hidden" style={{ containerType: "inline-size" }}>
            <motion.div
              key={selected.title}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col w-full h-full p-10 justify-between items-center"
              style={{
                fontSize: "clamp(0.625rem, 4cqw, 1rem)",
                padding: "clamp(1rem, 10cqw, 2.5rem)"
              }}
            >
              <div className="absolute z-0 inset-0">
                <LiquidChrome
                  color="#48443e"
                  speed={0.2}
                  amplitude={0.33}
                  detail={3}
                  thickness={0.95}
                  interactive={false}
                  frequencyX={2.5}
                  frequencyY={8}
                  depth={1}
                  roughness={0}
                  exposure={0.95}
                  rippleStrength={1.85}
                  rippleSize={0.75}
                  tilt={0.7}
                  intro={false}
                  lightMode={false}
                  style={{ filter: "blur(3px)" }}
                  className="w-full h-full"
                />
              </div>

              <div className="relative z-10 flex w-full justify-between whitespace-nowrap">
                <span>{selected.position.toUpperCase()}</span>
                <span>{selected.timeframe.toUpperCase()}</span>
              </div>

              <div className="relative z-10 w-[75%] aspect-square shrink-0">
                {selected.img && (
                  <Image
                    src={selected.img}
                    alt={selected.title}
                    fill
                    sizes="75vw"
                    className="object-contain"
                  />
                )}
              </div>

              <div className="h-[1.2em] relative z-10">
                <SkillsBar
                  skills={['express.js', 'next.js', 'tailwind_css']}
                  languages={['html', 'css', 'javascript', 'typescript']}
                />
              </div>

              <div className="relative z-10 text-center">
                {selected.description.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </ReactiveCard>
      </div>
    </div>
  );
}
