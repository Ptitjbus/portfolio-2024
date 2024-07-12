/* eslint-disable max-len */
import { redirect } from "next/navigation";
import WiiButton from "@/components/WiiButton";
import HandleStartSounds from "@/components/HandleStartSounds";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
// import { PrismicNextImage } from "@prismicio/next";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageCarousel from "@/components/ImageCarousel";
import { PrismicNextLink } from "@prismicio/next";
import HandleKeyboardRedirect from "@/components/HandleKeyboardRedirect";
import MuteButton from "@/components/MuteButton";

type Params = { projectId: string };

export default async function Project({
  params,
}: {
  params: { projectId: string };
}) {
  const client = createClient();
  const page = await client
    .getByUID("project_page", params.projectId)
    .catch(() => redirect("/"));

  return (
    <main
      style={{ backgroundColor: page.data.background_color ?? "#ffffff" }}
      className="transition-all h-svh fixed w-screen overflow-x-hidden flex flex-col xl:flex-row-reverse bg-gray-200"
    >
      <HandleKeyboardRedirect onExcapeUrl={`/preview/${page.uid}`} />
      <HandleStartSounds
        sound={{
          soundPath: `${page.data.sound_folder_name}/backgroundMusic.mp3`,
          loop: false,
          volume: 0.2,
        }}
      />
      <div
        style={{ color: page.data.main_color ?? "#000000" }}
        className="fade-in-right flex flex-col pt-8 sm:pt-20 px-8 sm:px-16 xl:px-32 basis-3/5 text-gray-700"
      >
        <p className="text-xl font-light py-4">{page.data.project_type}</p>
        <h1 className="text-4xl font-bold uppercase pb-5">
          {page.data.project_name}
        </h1>
        <div className="project-description text-lg md:text-xl xl:text-2xl font-normal pb-16">
          <PrismicRichText field={page.data.description} />
        </div>
      </div>
      <div className="fade-in-left flex flex-col gap-4 py-20 px-8 sm:px-16 lg:px-24 xl:px-24 h-full basis-2/5">
        <ImageCarousel images={page.data.images} />
        <div
          className="flex flex-col gap-4 underline uppercase text-lg font-bold py-2 italic"
          style={{ color: page.data.main_color ?? "#000000" }}
        >
          {page.data.links_group.map((item, index) => (
            <PrismicNextLink field={item.link} key={index}>
              {item.link_display_text}
            </PrismicNextLink>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 py-10">
          {page.data.tags.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: page.data.main_color ?? "#000000",
                color: page.data.background_color ?? "#ffffff",
              }}
              className="px-4 py-2 flex-auto max-w-44 flex items-center justify-center bg-gray-700 text-gray-200"
            >
              <p className="uppercase font-bold">{item.project_tag}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed transition-all bottom-10 left-10 lg:left-20 z-10 hover:opacity-100">
        <WiiButton
          text="Retour"
          className="min-w-44 md:min-w-64"
          link={`/preview/${page.uid}`}
        />
      </div>
      <div className="fixed top-10 right-10">
        <MuteButton />
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project_page", params.projectId)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
