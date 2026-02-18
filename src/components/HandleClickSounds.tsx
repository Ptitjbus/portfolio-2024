"use client";

import { useEffect } from "react";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HandleClickSounds() {
    const isMuted = useSelector((state: RootState) => state.sound.isMuted);
    const [clickSound] = useSound("/sounds/on-click.mp3", {
        volume: 0.15,
        soundEnabled: !isMuted,
    });

    useEffect(() => {
        const handleDocumentClick = () => {
            if (!isMuted) {
                clickSound();
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [clickSound, isMuted]);

    return null;
}
