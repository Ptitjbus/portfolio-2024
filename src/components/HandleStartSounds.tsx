"use client";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";

// create a sound type
type Sound = {
  soundPath: string;
  volume: number;
  loop: boolean;
};

export default function HandleStartSounds({ sound }: { sound: Sound }) {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [isLoaded, setIsLoaded] = useState(false);

  const [launchSound, { stop: stopSound }] = useSound(
    `/sounds/${sound.soundPath}`,
    {
      volume: sound.volume,
      loop: sound.loop,
      onload: () => {
        setIsLoaded(true);
      },
      soundEnabled: !isMuted,
    },
  );

  useEffect(() => {
    const handleMouseEvent = () => {
      if (isLoaded) {
        launchSound();
        window.removeEventListener("mousemove", handleMouseEvent);
      }
    };

    window.addEventListener("mousemove", handleMouseEvent);

    return () => {
      stopSound();
      window.removeEventListener("mousemove", handleMouseEvent);
    };
  }, [isLoaded, launchSound, stopSound]);

  return null;
}
