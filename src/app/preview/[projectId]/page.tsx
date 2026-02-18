/* eslint-disable max-len */
import WiiButton from "@/components/WiiButton";
import { redirect } from "next/navigation";
import WiiArrow from "@/components/WiiArrow";
import HandleStartSounds from "@/components/HandleStartSounds";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import HandleKeyboardRedirect from "@/components/HandleKeyboardRedirect";
import MuteButton from "@/components/MuteButton";

type Params = { projectId: string };

export default async function Project({ params }: { params: Params }) {
    // const image = images.find((img) => img.id === parseInt(params.projectId, 10));

    const client = createClient();
    const page = await client
        .getByUID("preview_page", params.projectId)
        .catch(() => redirect("/"));

    const allPages = await client.getByTag("preview_page");

    let leftArrowUrl = "";
    let rightArrowUrl = "";

    //right
    if (Number(page.uid) === 0) {
        rightArrowUrl = `/preview/${Number(allPages.results_size - 1)}`;
    } else if (Number(page.uid) - 1 > 0) {
        rightArrowUrl = `/preview/${Number(page.uid) - 1}`;
    }

    //left
    if (Number(page.uid) !== 0) {
        if (Number(page.uid) + 1 < allPages.results_size) {
            leftArrowUrl = `/preview/${Number(page.uid) + 1}`;
        } else {
            leftArrowUrl = `/preview/0`;
        }
    }

    return (
        <div>
            <HandleKeyboardRedirect
                onLeftArrowUrl={leftArrowUrl}
                onRightArrowUrl={rightArrowUrl}
                onExcapeUrl="/"
                onEnterUrl={
                    Number(page.uid) !== 0 ? `/project/${page.uid}` : "/about"
                }
            />
            <main className="h-svh fixed w-screen overflow-hidden flex flex-col bg-gray-300">
                <div className="relative w-full h-full overflow-hidden ">
                    <HandleStartSounds
                        sound={{
                            soundPath: `${page.data.sound_folder_name}/banner.mp3`,
                            loop: false,
                            volume: 0.2,
                        }}
                    />
                    <div className="absolute-center w-full h-full bg-gray-600 animate-pulse z-0 pointer-events-none"></div>
                    <PrismicNextImage
                        field={page.data.preview_image}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover pointer-events-auto z-2 absolute-center select-none"
                        priority={true}
                    />
                </div>
                <div className="translate-in-bottom  bottom-0 left-0 flex items-center justify-center gap-10 w-full h-48 bg-gray-300 ">
                    <div className="flex items-center justify-center gap-10 sm:w-96">
                        <WiiButton
                            text="Menu"
                            className="min-w-40 sm:min-w-64"
                            link="/"
                        />
                        <WiiButton
                            text="Démarrer"
                            className="min-w-40 sm:min-w-64"
                            link={
                                Number(page.uid) !== 0
                                    ? `/project/${page.uid}`
                                    : "/about"
                            }
                        />
                    </div>
                </div>
                <div className="fixed top-10 right-10">
                    <MuteButton />
                </div>
                {Number(page.uid) === 0 && (
                    <>
                        <div className="absolute-preview-center right-10">
                            <WiiArrow
                                direction="right"
                                link={`/preview/${Number(allPages.results_size - 1)}`}
                            />
                        </div>
                    </>
                )}
                {Number(page.uid) !== 0 && (
                    <>
                        {Number(page.uid) + 1 < allPages.results_size ? (
                            <div className="absolute-preview-center left-10">
                                <WiiArrow
                                    direction="left"
                                    link={`/preview/${Number(page.uid) + 1}`}
                                />
                            </div>
                        ) : (
                            <div className="absolute-preview-center left-10">
                                <WiiArrow
                                    direction="left"
                                    link={`/preview/0`}
                                />
                            </div>
                        )}
                        {Number(page.uid) - 1 > 0 && (
                            <div className="absolute-preview-center right-10">
                                <WiiArrow
                                    direction="right"
                                    link={`/preview/${Number(page.uid) - 1}`}
                                />
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("preview_page", params.projectId)
        .catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}
