"use client";

/* eslint-disable max-len */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "@/redux/soundSlice";
import { RootState } from "@/redux/store";

export default function MenuMuteButton() {
  const dispatch = useDispatch();
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);

  const handleClick = () => {
    dispatch(toggleMute());
  };

  return (
    <div
      onClick={handleClick}
      className="fade-in-left z-10 absolute p-2 flex justify-end gap-4 shadow-md hover:shadow-lg rounded-full bg-gray-200 w-[270px] bottom-12 -left-28 sm:bottom-10 sm:-left-30"
    >
      <div className="transition-all rounded-full flex items-center justify-center ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 w-12 h-12 sm:h-16 sm:w-16 outline-none focus:ring-sky-400 focus:ring-4">
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          className="h-5 sm:h-7 text-gray-400"
        />
      </div>
    </div>
  );
}
