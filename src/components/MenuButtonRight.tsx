/* eslint-disable max-len */

"use client";

import { faGrip, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuButtonRight({
  onEmailClick,
  rotated,
}: {
  onEmailClick: () => void;
  rotated: boolean;
}) {
  return (
    <div
      className={`transition-all z-10 flex justify-between absolute p-2 shadow-md hover:shadow-lg rounded-full bg-gray-200 w-[200px] sm:w-[400px] bottom-12 -right-24 sm:bottom-10 sm:-right-60 ${rotated ? "rotate-180" : ""}`}
    >
      <div
        className="transition-all rounded-full flex items-center justify-center ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 w-12 h-12 sm:h-16 sm:w-16"
        onClick={() => {
          onEmailClick();
        }}
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          className="h-5 sm:h-7 text-gray-400"
        />
      </div>
      <div
        className="transition-all rounded-full flex items-center justify-center ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 w-12 h-12 sm:h-16 sm:w-16"
        onClick={() => {
          onEmailClick();
        }}
      >
        <FontAwesomeIcon
          icon={faGrip}
          className="h-5 sm:h-7 text-gray-400 rotate-180"
        />
      </div>
    </div>
  );
}
