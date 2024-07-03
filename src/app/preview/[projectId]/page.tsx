/* eslint-disable max-len */
import WiiButton from "@/components/WiiButton";
import { redirect } from "next/navigation";
import WiiArrow from "@/components/WiiArrow";
import HandleStartSounds from "@/components/HandleStartSounds";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

type Params = { projectId: string };

export default async function Project({ params }: { params: Params }) {
  // const image = images.find((img) => img.id === parseInt(params.projectId, 10));

  const client = createClient();
  const page = await client
    .getByUID("preview_page", params.projectId)
    .catch(() => redirect("/"));

  const allPages = await client.getByTag("preview_page");

  return (
    <div>
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
        <div className="relative w-full h-full overflow-hidden">
          <HandleStartSounds
            sound={{
              soundPath: `${page.data.sound_folder_name}/banner.mp3`,
              loop: false,
              volume: 0.2,
            }}
          />
          <PrismicNextImage
            field={page.data.preview_image}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        {Number(page.uid) === 0 && (
          <>
            <div className="absolute-1/3-center right-10">
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
              <div className="absolute-1/3-center left-10">
                <WiiArrow
                  direction="left"
                  link={`/preview/${Number(page.uid) + 1}`}
                />
              </div>
            ) : (
              <div className="absolute-1/3-center left-10">
                <WiiArrow direction="left" link={`/preview/0`} />
              </div>
            )}
            {Number(page.uid) - 1 > 0 && (
              <div className="absolute-1/3-center right-10">
                <WiiArrow
                  direction="right"
                  link={`/preview/${Number(page.uid) - 1}`}
                />
              </div>
            )}
          </>
        )}
        <div className="translate-in-bottom absolute bottom-0 left-0 flex items-center justify-center gap-10 w-full h-48 bg-gray-300 ">
          <div className="flex items-center justify-center gap-10 sm:w-96">
            <WiiButton text="Menu" className="min-w-40 sm:min-w-64" link="/" />
            <WiiButton
              text="Show more"
              className="min-w-40 sm:min-w-64"
              link={`/project/${page.uid}`}
            />
          </div>
        </div>
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
