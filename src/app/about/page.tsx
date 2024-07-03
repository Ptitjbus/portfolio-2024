import WiiButtonSound from "@/components/WiiButtonSound";
import { createClient } from "@/prismicio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import HandleStartSounds from "@/components/HandleStartSounds";

/* eslint-disable max-len */
export default async function AboutPage() {
  const client = createClient();
  const page = await client.getSingle("about");

  return (
    <main className="transition-all h-full fixed w-screen overflow-x-hidden bg-gray-200 flex flex-col py-12 gap-1">
      <HandleStartSounds
        sound={{
          soundPath: `about/backgroundMusic.mp3`,
          loop: false,
          volume: 0.2,
        }}
      />
      <div className="flex justify-between w-full border-b-2 border-gray-300">
        <WiiButtonSound>
          <Link
            href="/"
            className="flex items-center pl-10 md:pl-16 pr-12 md:pr-0 bg-gray-500 text-white py-1 md:w-96 text-lg sm:text-2xl font-semibold tracking-wide transition-all hover:bg-gray-600"
          >
            <p className="transition-all hover:translate-x-4 md:hover:translate-x-10 w-full">
              Menu principal
            </p>
          </Link>
        </WiiButtonSound>
        <div className="pr-6 md:pr-32 text-gray-500 text-2xl md:text-5xl font-bold">
          About <span className="text-sky-400 italic tracking-wide">Me</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row border-y-2 border-gray-300 bg-gradient-to-tr from-sky-300 via-sky-400 to-sky-500">
        <div className="flex min-h-[75vh] flex-col justify-between gap-12 w-full h-full p-6 md:p-14">
          <div className="text-gray-900 text-xl xl:text-2xl font-semibold flex flex-col gap-5 text-pretty">
            <PrismicRichText field={page.data.description} />
          </div>
          <div className="flex flex-col gap-5">
            <WiiButtonSound>
              <div className="transition-all rounded-xl sm:py-10 flex items-center justify-center bg-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-700 outline-none min-w-40 sm:min-w-64 h-14 sm:h-16 sm:w-full">
                <p className="text-xl sm:text-2xl text-gray-700">
                  {page.data.mail_display}
                </p>
              </div>
            </WiiButtonSound>
            <WiiButtonSound>
              <PrismicNextLink
                field={page.data.cv_link}
                className="transition-all rounded-xl sm:py-10 flex items-center justify-center bg-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-700 outline-none min-w-40 sm:min-w-64 h-14 sm:h-16 sm:w-full"
              >
                <p className="text-xl sm:text-2xl text-gray-700">
                  {page.data.cv_display_text}
                </p>
              </PrismicNextLink>
            </WiiButtonSound>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full p-14">
          <div className="h-2/3">
            <PrismicNextImage
              field={page.data.image}
              className="h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex w-full gap-5 h-1/3">
            <WiiButtonSound className="w-full">
              <PrismicNextLink
                field={page.data.github_link}
                className="transition-all rounded-xl h-full w-full flex items-center justify-center bg-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-700 outline-none"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="h-12 lg:h-32 text-indigo-400"
                />
              </PrismicNextLink>
            </WiiButtonSound>
            <WiiButtonSound className="w-full">
              <PrismicNextLink
                field={page.data.linkedin_link}
                className="transition-all rounded-xl h-full w-full py-10 flex items-center justify-center bg-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-700 outline-none "
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="h-12 lg:h-32 text-emerald-400"
                />
              </PrismicNextLink>
            </WiiButtonSound>
          </div>
        </div>
      </div>
      <div className="w-full h-2 border-t-2 border-gray-300"></div>
    </main>
  );
}
