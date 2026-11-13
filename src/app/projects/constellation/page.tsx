import AnimatedNumber from "@/components/animate-number"
import BackButton from "@/components/back-button"
import LiquidChrome from "@/components/LiquidChrome"
import ProjectCard from "@/components/project-card"
import ReactiveCard from "@/components/reactive-card"
import { getWorkshopItem } from "@/lib/steam-workshop"
import Image from "next/image"

export default async function Page() {
    const stats = await getWorkshopItem('3784170701')
    
    const currentViews = stats.response.publishedfiledetails[0].views
    const currentSubscriptions = stats.response.publishedfiledetails[0].subscriptions
    const currentFavorited = stats.response.publishedfiledetails[0].favorited

    return (
        <div className="fixed inset-0 w-[calc(100%-300px)] mx-auto h-screen p-[5%] px-[10%] flex justify-between items-center text-amber-50 font-pixel scrollbar-none [&::-webkit-scrollbar]:hidden">
            <div className="absolute left-[-1%] top-[5%] w-[3%] aspect-square">
                <BackButton scrollPercentage={0.33}/>
            </div>
            
            <div className="w-[40%] h-[80%]">
                <ReactiveCard>
                    <ProjectCard
                        title="CONSTELLATION"
                        class="GAME DEVELOPMENT"
                        image='/constellation-icon.jpeg'
                        languages={['csharp']}
                        skills={['dotnet']}
                        children={(
                        <div className="w-full h-[30%] flex flex-col justify-evenly">
                            <div className="w-full flex justify-between">
                                <p>CURRENT VIEWS</p>
                                <AnimatedNumber value={currentViews}/>
                            </div>
                            <div className="w-full flex justify-between">
                                <p>CURRENT SUBSCRIBERS</p>
                                <AnimatedNumber value={currentSubscriptions}/>
                            </div>

                            <div className="w-full flex justify-between">
                                <p>CURRENT FAVORITED</p>
                                <AnimatedNumber value={currentFavorited}/>
                            </div>
                        </div>
                        )}
                    />
                </ReactiveCard>
            </div>

            <div className="w-[55%] h-[80%] flex flex-col font-pixel justify-between p-4 gap-6">
                <p className="font-pixel text-5xl">CONSTELLATION</p>

                <div className="flex flex-col gap-6">
                    <p>
                        Constellation is a library mod for <u><a href='https://github.com/tmodloader/tModLoader' target="_blank">tModLoader</a></u> that
                        adds useful utilities and helper functions for other mod developers.
                    </p>
                    <p>
                        As I was developing Sorcery Fight, I found that I was writing a lot of helper code and internal libraries. I ended up writing
                        my own libraries as the publically available libraries at the time wasn't able to solve the problems I had.
                    </p>
                    <p>
                        After a while, I managed to de-tangle Sorcery Fight's internal libraries and published <i>Constellation</i>, which features
                        some very helpful utilities that Sorcery Fight relies on.
                    </p>
                </div>

                <p>
                    Development started in August 2026, and is currently still in development.
                </p>
                
                <div className="flex flex-col justify-evenly">
                    <div className="flex justify-evenly">
                        <a
                            href='https://github.com/ehannhoq/Constellation'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center cursor-pointer transition-all duration-100 ease-out hover:scale-101 hover:text-shadow-[0_0_16px_rgba(220,180,210,0.9)]"
                        >
                            <p>Github</p>
                        </a>
                        <a
                            href='https://steamcommunity.com/sharedfiles/filedetails/?id=3784170701'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center cursor-pointer transition-all duration-100 ease-out hover:scale-101 hover:text-shadow-[0_0_16px_rgba(220,180,210,0.9)]"
                        >
                            <p>Steam</p>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}