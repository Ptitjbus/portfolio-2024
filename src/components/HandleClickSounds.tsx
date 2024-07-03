"use client";

import { useEffect } from "react";

// @ts-ignore
import launchSound from "@/../public/sounds/on-click.mp3";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HandleClickSounds() {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [clickSound] = useSound(launchSound, {
    volume: 0.2,
    soundEnabled: !isMuted,
  });

  useEffect(() => {
    document.addEventListener("click", clickSound);
    // cleanup
    return () => {
      document.removeEventListener("click", clickSound);
    };
  }, [clickSound]);
  return null;
}
