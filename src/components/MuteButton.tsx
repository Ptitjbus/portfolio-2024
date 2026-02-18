"use client";

/* eslint-disable max-len */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "@/redux/soundSlice";
import { RootState } from "@/redux/store";

export default function MuteButton() {
    const dispatch = useDispatch();
    const isMuted = useSelector((state: RootState) => state.sound.isMuted);

    const handleClick = () => {
        dispatch(toggleMute());
    };

    return (
        <div
            onClick={handleClick}
            className="z-20 transition-all bg-gray-50 rounded-full flex items-center justify-center ring-1 opacity-50 hover:opacity-100 hover:ring-4 ring-zinc-400 hover:ring-sky-400 w-12 h-12 sm:h-16 sm:w-16 outline-none focus:ring-sky-400 focus:ring-4"
        >
            <FontAwesomeIcon
                icon={isMuted ? faVolumeMute : faVolumeUp}
                className="h-5 sm:h-7 text-gray-400"
            />
        </div>
    );
}
