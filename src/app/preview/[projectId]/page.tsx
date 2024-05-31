/* eslint-disable max-len */
import WiiButton from "@/components/WiiButton";
import { redirect } from "next/navigation";
import Image from "next/image";

const images = [
  {
    id: 1,
    src: "https://wyjsnkrgktfutfwyycwx.supabase.co/storage/v1/object/public/application/frogy/f293406b49457d032e080e035f5d680d.webp",
    alt: "Frogy",
  },
  {
    id: 2,
    src: "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Fstarclean%2Fcover_starclean_3b770cb2cb.webp&w=640&q=75",
    alt: "Starclean",
  },
  {
    id: 3,
    src: "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffnac%2Fcover_fnac.webp&w=640&q=75",
    alt: "Fnac",
  },
];

export default function Project({ params }: { params: { projectId: string } }) {
  const image = images.find((img) => img.id === parseInt(params.projectId, 10));

  if (!image) {
    redirect("/");
  }

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
        <div className="translate-in-bottom absolute bottom-0 left-0 flex items-center justify-center gap-10 w-full h-48 bg-gray-300 ">
          <WiiButton text="Menu" className="min-w-40 sm:min-w-64" link="/" />
          <WiiButton
            text="Show more"
            className="min-w-40 sm:min-w-64"
            link={`/project/${image.id}`}
          />
        </div>
      </main>
    </div>
  );
}
