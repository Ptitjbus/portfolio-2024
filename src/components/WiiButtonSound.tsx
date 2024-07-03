"use client";
// @ts-ignore
import buttonSound from "@/../public/sounds/wii-button.mp3";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function WiiIconButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [clickSound] = useSound(buttonSound, {
    volume: 0.3,
    soundEnabled: !isMuted,
  });

  return (
    <div
      onClick={() => {
        clickSound();
      }}
      className={className}
    >
      {children}
    </div>
  );
}
