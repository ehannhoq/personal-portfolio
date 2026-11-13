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
import { filter } from "motion/react-client";
import ReactiveCard from "./reactive-card";

const PROJECTS = [
  {
    title: "Sorcery Fight",
    class: "Game Development",
    img: "/sorcery-fight-icon.png",
    redirect: "sorcery-fight",
  },
  {
    title: "SlurpSlop",
    class: "Software Development",
    img: "/slurp-slop-icon.svg",
    redirect: "slurp-slop",
  },
  {
    title: "Blockism 3D",
    class: "Software Development",
    img: "/blockism3d-icon.png",
    redirect: "blockism-3d",
  },
  {
    title: "Constellation",
    class: "Game Development",
    img: "/constellation-icon.jpeg",
    redirect: "constellation",
  },
  // {
  //   title: "tsun-ai",
  //   class: "AI/ML",
  //   redirect: "tsun-ai",
  // },
  // {
  //   title: "Auto-GeoGuessr",
  //   class: "AI/ML",
  //   redirect: "auto-geoguessr",
  // },
];

export default function ProjectCarousel() {
  const target = useRef(null);
  const degree = 60 / PROJECTS.length;
  const rotationTarget = useMotionValue(0);
  const rotation = useSpring(rotationTarget, {
    stiffness: 500,
    damping: 100,
    mass: 0.5,
  });
  const [selected, setSelected] = useState(PROJECTS[0]);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(undefined);

  useMotionValueEvent(rotationTarget, "change", (latest) => {
    if (timeout.current != null) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      timeout.current = null;
      rotationTarget.set(Math.round(-latest / degree) * -degree);
    }, 300);
  });

  useMotionValueEvent(rotation, "change", (latest) => {
    const index = Math.round(-latest / degree);
    setSelected(
      PROJECTS[((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length],
    );
  });

  useEffect(() => {
    const element = target.current as HTMLDivElement | null;
    if (!element) return;

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
        <motion.div style={{ rotate: rotation }} className="relative -top-5">
          {Array.from(
            { length: Math.round(360 / degree) },
            (_, i) => PROJECTS[i % PROJECTS.length],
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
          <div className="w-full h-full bg-white/10 font-mono rounded-2xl overflow-hidden">
            <motion.div
              key={selected.title}
              initial={{ scale: 1.05, filter: "blur(5px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col w-full h-full p-10 justify-between items-center"
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

              <div className="relative z-10 flex w-full justify-between">
                <span>{selected.title.toUpperCase()}</span>
                <span>{selected.class.toUpperCase()}</span>
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

              <div className="relative z-10 flex w-full justify-end">
                <button
                  onClick={() => redirect(`projects/${selected.redirect!}`)}
                  className="relative cursor-pointer
                                            after:absolute after:bottom-0 after:left-0
                                            after:h-0.5 after:w-0 after:bg-current
                                            after:transition-all after:duration-300
                                            hover:after:w-full"
                >
                  <span
                    className="absolute w-5 h-5 bg-amber-50 -left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      mask: `url(/chevron_right.svg) center / contain no-repeat`,
                      WebkitMask: `url(/chevron_right.svg) center / contain no-repeat`,
                    }}
                  />
                  LEARN MORE
                </button>
              </div>
            </motion.div>
          </div>
        </ReactiveCard>
      </div>
    </div>
  );
}
