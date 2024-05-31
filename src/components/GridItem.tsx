/* eslint-disable max-len */
import EmptyGridItem from "./EmptyGridItem";
import Image from "next/image";

export default function GridItem({
  title,
  image_url,
  link,
  first = false,
  textsm,
  onClick,
  reference,
}: {
  title?: string;
  image_url?: string;
  link?: string;
  first?: boolean;
  textsm?: string;
  onClick?: () => void;
  reference?: any;
}) {
  if (!image_url || !link) {
    return <EmptyGridItem />;
  }

  return (
    <div
      className="rounded-3xl flex relative w-36 h-24 sm:w-64 sm:h-36 group"
      onClick={onClick}
    >
      {first && (
        <div className="absolute hidden md:block left-[-24px] top-[24px] translate-x-1 group-hover:translate-x-[-5px] transition w-24 h-24 bg-gray-400 rounded-full z-0 border-double border-4 border-gray-50" />
      )}
      <div className="overflow-hidden flex relative rounded-3xl w-full h-full bg-gray-200 ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 hover:scale-[1.01]  transition-transform">
        <div className="flex relative w-full ">
          <Image
            src={image_url}
            alt={title ?? "project image"}
            loading="lazy"
            width={500}
            height={500}
            className={`object-cover w-full pointer-events-none select-none ${first ? "" : "hover:scale-[1.05] transition-transform"}`}
            ref={reference}
          />
          {title && (
            <p
              className={`absolute bottom-4 left-[22px] font-medium translate-y-6 group-hover:translate-y-0 z-10 text-gray-200 opacity-0 group-hover:opacity-100 transition pointer-events-none ${textsm}`}
            >
              {title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
