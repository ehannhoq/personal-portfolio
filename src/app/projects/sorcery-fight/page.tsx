import AnimatedNumber from "@/components/animate-number"
import BackButton from "@/components/back-button";
import ProjectCard from "@/components/project-card"
import ReactiveCard from "@/components/reactive-card"
import { getWorkshopItem } from "@/lib/steam-workshop"

export default async function Page() {
    const stats = await getWorkshopItem('3371695690');

    const currentViews = stats.response.publishedfiledetails[0].views;
    const currentSubscriptions =stats.response.publishedfiledetails[0].subscriptions;
    const currentFavorited = stats.response.publishedfiledetails[0].favorited;

    return (
        <div className="fixed inset-0 w-[calc(100%-300px)] mx-auto h-screen p-[5%] px-[10%] flex justify-between items-center text-amber-50 font-pixel scrollbar-none [&::-webkit-scrollbar]:hidden">
            <div className="absolute left-[-1%] top-[5%] w-[3%] aspect-square">
                <BackButton scrollPercentage={0.33}/>
            </div>
            
            <div className="w-[40%] h-[80%]">
                <ReactiveCard>
                    <ProjectCard
                        title="SORCERY FIGHT"
                        class="GAME DEVELOPMENT"
                        image='/sorcery-fight-icon.png'
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
                <p className="font-pixel text-5xl">SORCERY FIGHT</p>

                <div className="flex flex-col gap-6">
                    <p>
                        Sorcery Fight is a content mod for <u><a href='https://github.com/tmodloader/tModLoader' target="_blank">tModLoader</a></u> that
                        adds mechanics, weapons, and items from the hit anime/manga <u><a href='https://en.wikipedia.org/wiki/Jujutsu_Kaisen' target="_blank">Jujutsu Kaisen</a></u>.
                    </p>
                    <p>
                        This was intended to be a short-term project made for a video on my <u><a href='https://www.youtube.com/watch?v=qjue-bP1RRs' target='_blank'>Youtube Channel</a></u>,
                        but I had accidentally published the mod with public visibility. By the time I noticed, the mod had already 500 subscribers,
                        and was receiving very positive attention. I decided that I would keep developing the mod, adding more features and popular requests.
                    </p>
                    <p>
                        Since then, the mod has grown massively to well over 100,000 subscribers, a development team of four developers and four sprite artists,
                        a growing community of loyal supporters, and well over 1,000,000 views on Youtube across multiple videos.
                    </p>
                </div>

                <p>
                    Development started in October 2024, and is currently still in development.
                </p>
                
                <div className="flex flex-col justify-evenly">
                    <div className="flex justify-evenly">
                        <a
                            href='https://github.com/ehannhoq/sorceryFight'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center cursor-pointer transition-all duration-100 ease-out hover:scale-101 hover:text-shadow-[0_0_16px_rgba(220,180,210,0.9)]"
                        >
                            <p>Github</p>
                        </a>
                        <a
                            href='https://steamcommunity.com/sharedfiles/filedetails/?id=3371695690'
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