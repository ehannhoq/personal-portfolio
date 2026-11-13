import LiquidChrome from "./LiquidChrome";
import Image from "next/image";
import SkillsBar from "./skills-bar";

export type ProjectCardProp = {
    title: string;
    class: string;
    image: string;
    languages?: string[]
    skills?: string[]
    children?: any;
}

export default function ProjectCard(projectCardProp: ProjectCardProp) {
    return (
        <div className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center font-mono rounded-xl">
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
                    style={{ filter: 'blur(3px)' }}
                    className="w-full h-full"/>
            </div>

            <div className="w-[75%] h-[90%] z-10 items-center">
                <div className="w-full h-[70%] flex flex-col gap-10">
                    <div className="w-full flex justify-between">
                        <p>{projectCardProp.title}</p>
                        <p className="text-right">{projectCardProp.class}</p>
                    </div>

                    <div className="w-full relative flex-1 min-h-0">
                        <Image
                            src={`${projectCardProp.image}`}
                            alt=''
                            fill
                            sizes="75vw"
                            className="object-contain"
                        />
                    </div>
                    { (projectCardProp.skills || projectCardProp.languages) && (
                        <div className="w-full relative">
                            <SkillsBar languages={projectCardProp.languages} skills={projectCardProp.skills}/>
                        </div>
                    )}
                </div>

                {projectCardProp.children}
            </div>
        </div>
    )
}