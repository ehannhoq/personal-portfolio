import BackButton from "@/components/back-button"
import ProjectCard from "@/components/project-card"
import ReactiveCard from "@/components/reactive-card"

export default function Page() {
    return (
        <div className="fixed inset-0 w-[calc(100%-300px)] mx-auto h-screen p-[5%] px-[10%] flex justify-between items-center text-amber-50 font-pixel scrollbar-none [&::-webkit-scrollbar]:hidden">
            <div className="absolute left-[-1%] top-[5%] w-[3%] aspect-square">
                <BackButton scrollPercentage={0.33}/>
            </div>
            
            <div className="w-[40%] h-[80%]">
                <ReactiveCard>
                    <ProjectCard
                        title="BLOCKISM 3D"
                        class="SOFTWARE DEVELOPMENT"
                        image='/blockism3d-icon.png'
                        languages={['rust', 'typescript']}
                        skills={['tauri', 'react']}
                    />
                </ReactiveCard>
            </div>

            <div className="w-[55%] h-[80%] flex flex-col font-pixel justify-between p-4 gap-6">
                <p className="font-pixel text-5xl">BLOCKISM 3D</p>

                <div className="flex flex-col gap-6">
                    <p>
                        Blockism 3D is a virtual avatar puppeteering app that is aimed to make 'virtual tubing' more accessible, as normal
                        v-tubing models can cost upwards to $1000.
                    </p>
                    <p>
                        Blockism 3D uses a user's <i>Minecraft</i> skin as an avatar, and tracks the user's head orientation using a webcam
                        and imposes that onto the avatar. Users can also import custom models using my custom plugin for <i>Blockbench</i>,
                        which exports a special file type for Blockism 3D.
                    </p>
                    <p>
                        Blockism 3D is currently in development, with no public version available.
                    </p>
                </div>

                <p>
                    Development started in June 2026, and is currently still in development.
                </p>
                
                <div>
                </div>
            </div>
        </div>
    )
}