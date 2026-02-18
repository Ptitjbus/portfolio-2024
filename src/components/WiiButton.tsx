"use client";
/* eslint-disable max-len */
import Link from "next/link";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function WiiButton({
  text,
  className,
  onClick,
  link,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
  link?: string;
}) {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [clickSound] = useSound("/sounds/wii-button.aac", {
    volume: 0.3,
    soundEnabled: !isMuted,
  });

  if (link) {
    return (
      <Link
        onClick={() => clickSound()}
        href={link}
        className={`transition-all hover:scale-105 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg ring-4 ring-sky-400 outline-none min-w-40 sm:min-w-64 h-14 sm:h-16 sm:w-full ${className ?? ""}`}
      >
        <p className="text-2xl">{text}</p>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`transition-all rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 shadow-md hover:shadow-lg focus:shadow-lg ring-4 ring-sky-400 outline-none min-w-40 sm:min-w-64 h-14 sm:h-16 sm:w-full ${className ?? ""}`}
    >
      <p className="text-2xl">{text}</p>
    </button>
  );
}
