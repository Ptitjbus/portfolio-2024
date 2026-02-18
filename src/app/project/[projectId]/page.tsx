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
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import HandleKeyboardRedirect from "@/components/HandleKeyboardRedirect";
import MuteButton from "@/components/MuteButton";
import WiiButtonSound from "@/components/WiiButtonSound";
import Link from "next/link";

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
      style={
        {
          "--bg-gradient-color": page.data.background_color ?? "#ffffff",
          "--main-color": page.data.main_color ?? "#000000",
        } as React.CSSProperties
      }
      className="transition-all h-svh fixed w-screen overflow-x-hidden flex flex-col xl:flex-row-reverse bg-[var(--bg-gradient-color)] lg:py-12 pt-12 pb-20 gap-1"
    >
      <HandleKeyboardRedirect onExcapeUrl={`/preview/${page.uid}`} />
      <HandleStartSounds
        sound={{
          soundPath: `${page.data.sound_folder_name}/backgroundMusic.mp3`,
          loop: false,
          volume: 0.2,
        }}
      />
      <div className="flex flex-col gap-4 lg:h-full">
        <div className="flex justify-between w-full border-b-2 border-gray-300">
          <WiiButtonSound>
            <Link
              href="/"
              className="flex items-center group pl-10 md:pl-16 pr-12 md:pr-0 bg-gray-500 text-white py-1 md:w-96 text-lg sm:text-2xl font-semibold tracking-wide transition-all hover:bg-gray-600"
            >
              <p className="transition-all group-hover:translate-x-4 md:group-hover:translate-x-10 w-full">
                Menu principal
              </p>
            </Link>
          </WiiButtonSound>
          <div className="pr-6 md:pr-32 text-gray-500 text-2xl md:text-5xl font-bold">
            <span className=" italic tracking-wide">
              {page.data.project_name}
            </span>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col-reverse gap-4 h-full relative bg-[var(--bg-gradient-color)]">
          <PrismicNextImage
            field={page.data.background_image}
            width={1920}
            height={1080}
            className="w-full h-full object-cover pointer-events-auto z-0 absolute-center select-none opacity-0 hidden lg:block fade-in-50"
            priority={true}
          />
          <div
            className={`w-full h-full object-cover pointer-events-auto z-0 hidden lg:block absolute-center select-none bg-gradient-to-r from-30% from-[var(--bg-gradient-color)] to-transparent`}
          ></div>
          <div className="fade-in-left flex flex-col xl:p-10 lg:p-6 px-4 items-center justify-center lg:w-1/2 text-[var(--main-color)] z-10">
            <div className="lg:max-h-[60vh] lg:overflow-y-auto lg:p-4 lg:border-2 lg:border-gray-300 rounded-md lg:bg-[var(--main-color)]/80">
              <p className="text-xl font-light py-4">
                {page.data.project_type}
              </p>
              <h1 className="text-4xl font-bold uppercase pb-5">
                {page.data.project_name}
              </h1>
              <div className="project-description text-lg ">
                <PrismicRichText field={page.data.description} />
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
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
          </div>
          <div className="lg:fade-in-right flex flex-col lg:w-1/2 justify-center xl:p-10 lg:p-6 p-0 lg:gap-8 gap-4 z-10">
            <ImageCarousel images={page.data.images} />
            <div
              className="flex flex-col gap-4 uppercase text-lg font-bold lg:p-0 px-4 "
              style={{ color: page.data.main_color ?? "#000000" }}
            >
              {page.data.links_group.map(
                (item, index) =>
                  item.link !== null &&
                  item.link_display_text !== null && (
                    <WiiButtonSound key={index}>
                      <PrismicNextLink
                        field={item.link}
                        className="transition-all lg:rounded-xl rounded-md sm:py-5 py-3 flex items-center justify-center ring-2 ring-gray-300 bg-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg hover:ring-4 hover:ring-sky-400 outline-none min-w-40 sm:min-w-64 sm:w-full"
                      >
                        <p className="text-base md:text-lg text-gray-700">
                          {item.link_display_text}
                        </p>
                      </PrismicNextLink>
                    </WiiButtonSound>
                  ),
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-2 border-t-2 border-gray-300"></div>
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
