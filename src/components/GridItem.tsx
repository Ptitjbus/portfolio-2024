/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import EmptyGridItem from "./EmptyGridItem";
import Image from "next/image";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function GridItem({
  title,
  image_url,
  first = false,
  textsm,
  onClick,
  reference,
  onMouseEnter,
}: {
  title?: string;
  image_url?: string;
  first?: boolean;
  textsm?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  reference?: any;
}) {
  if (!image_url) {
    return <EmptyGridItem />;
  }
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [launchGameSound] = useSound("sounds/launchgame.aac", {
    volume: 0.15,
    soundEnabled: !isMuted,
  });

  return (
    <div
      className="rounded-3xl flex relative w-36 h-24 sm:w-64 sm:h-36 group"
      onClick={() => {
        launchGameSound();

        if (onClick) onClick();
      }}
      onMouseEnter={onMouseEnter}
    >
      {first && (
        <div className="absolute hidden md:block left-[-24px] top-[24px] translate-x-1 group-hover:translate-x-[-5px] transition w-24 h-24 bg-gray-400 rounded-full z-0 border-double border-4 border-gray-50" />
      )}
      <div className="overflow-hidden flex relative rounded-3xl w-full h-full bg-gray-200 ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 hover:scale-[1.01]  transition-transform">
        <div className="flex relative w-full h-full">
          <Image
            src={image_url}
            alt={title ?? "project image"}
            loading="lazy"
            width={384}
            height={217}
            className={`object-cover w-full h-full pointer-events-none select-none ${first ? "" : "hover:scale-[1.05] transition-transform"}`}
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
