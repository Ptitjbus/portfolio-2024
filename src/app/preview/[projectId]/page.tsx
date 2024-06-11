"use client";

/* eslint-disable max-len */
import WiiButton from "@/components/WiiButton";
import { redirect } from "next/navigation";
import Image from "next/image";
import WiiArrow from "@/components/WiiArrow";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    src: "https://wyjsnkrgktfutfwyycwx.supabase.co/storage/v1/object/public/application/frogy/f293406b49457d032e080e035f5d680d.webp",
    alt: "Frogy",
    folder: "frogy",
  },
  {
    id: 2,
    src: "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Fstarclean%2Fcover_starclean_3b770cb2cb.webp&w=640&q=75",
    alt: "Starclean",
    folder: "starclean",
  },
  {
    id: 3,
    src: "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffnac%2Fcover_fnac.webp&w=640&q=75",
    alt: "Fnac",
    folder: "fnac",
  },
];

export default function Project({ params }: { params: { projectId: string } }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const image = images.find((img) => img.id === parseInt(params.projectId, 10));

  if (!image) {
    redirect("/");
  }

  const [launchMenuTheme, { stop: stopLaunchMenuTheme }] = useSound(
    `/sounds/${image.folder}/banner.mp3`,
    {
      volume: 0.5,
      loop: false,
      onload: () => {
        setIsLoaded(true);
      },
    },
  );

  useEffect(() => {
    if (isLoaded) {
      launchMenuTheme();
    }

    return () => {
      stopLaunchMenuTheme();
    };
  }, [isLoaded, launchMenuTheme, stopLaunchMenuTheme]);

  return (
    <div>
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            loading="lazy"
            width={2000}
            height={2000}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        {image.id - 1 > 0 && (
          <div className="absolute-1/3-center left-10">
            <WiiArrow direction="left" link={`/preview/${image.id - 1}`} />
          </div>
        )}
        <div className="absolute-1/3-center right-10">
          <WiiArrow direction="right" link={`/preview/${image.id + 1}`} />
        </div>
        <div className="translate-in-bottom absolute bottom-0 left-0 flex items-center justify-center gap-10 w-full h-48 bg-gray-300 ">
          <div className="flex items-center justify-center gap-10 sm:w-96">
            <WiiButton text="Menu" className="min-w-40 sm:min-w-64" link="/" />
            <WiiButton
              text="Show more"
              className="min-w-40 sm:min-w-64"
              link={`/project/${image.id}`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
