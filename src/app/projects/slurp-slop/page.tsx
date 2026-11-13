import AnimatedNumber from "@/components/animate-number"
import BackButton from "@/components/back-button"
import ProjectCard from "@/components/project-card"
import ReactiveCard from "@/components/reactive-card"
import { getWorkshopItem } from "@/lib/steam-workshop"
import { cacheLife } from "next/cache"

export default async function Page() {
    'use cache'
    cacheLife('days');

    const data = await fetch(`https://img.shields.io/chrome-web-store/users/kddigfbmalmcbnhiolglepanoekcgjdk.json`);
    const stats = await data.json();

    const users = stats.message;

    return (
        <div className="fixed inset-0 w-[calc(100%-300px)] mx-auto h-screen p-[5%] px-[10%] flex justify-between items-center text-amber-50 font-pixel scrollbar-none [&::-webkit-scrollbar]:hidden">
            <div className="absolute left-[-1%] top-[5%] w-[3%] aspect-square">
                <BackButton scrollPercentage={0.33}/>
            </div>                
            
            <div className="w-[45%] aspect-2/3 min-w-0 shrink-0">
                <ReactiveCard>
                    <ProjectCard
                        title="SLURP SLOP"
                        class="SOFTWARE DEVELOPMENT"
                        image='/slurp-slop-icon.svg'
                        languages={['html', 'css', 'javascript']}
                        children={(
                            <div className="w-full h-[30%] flex flex-col justify-evenly">
                                <div className="w-full flex justify-between">
                                    <p>CURRENT USERS</p>
                                    <AnimatedNumber value={users}/>
                                </div>
                            </div>
                        )}
                    />
                </ReactiveCard>
            </div>

            <div className="w-[45%] aspect-2/3 flex flex-col font-pixel justify-between p-4 gap-6 overflow-auto">
                <p className="font-pixel text-5xl">SLURP SLOP</p>

                <div className="flex flex-col gap-6">
                    <p>
                        Slurp Slop is a Google Chrome extension that removes the Google AI Overview and AI Overview 'People also asked' results
                        from a search page.
                    </p>
                    <p>
                        Started as a small project for the University of Vermont's Computer Science Fair 2025 with two other friends, Slurp Slop
                        grew into a publically available Chrome extension after recieving very positive response from the CS Fair. 
                    </p>
                    <p>
                        Slurp Slop eventually became the center piece for my startup <u><a href='https://www.aygilia.com/' target="_blank">Aygilia</a></u>'s
                        first product, mainly marketed towards its K-12 application for schools.
                    </p>
                </div>

                <p>
                    Development started in October 2025, and is currently still in development.
                </p>
                
                <div className="flex flex-col justify-evenly">
                    <div className="flex justify-evenly">
                        <a
                            href='https://chromewebstore.google.com/detail/slurpslop/kddigfbmalmcbnhiolglepanoekcgjdk?hl=en'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center cursor-pointer transition-all duration-100 ease-out hover:scale-101 hover:text-shadow-[0_0_16px_rgba(220,180,210,0.9)]"
                        >
                            <p>Chrome Webstore</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}