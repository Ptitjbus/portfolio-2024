"use client";
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
  const [clickSound] = useSound("/sounds/wii-button.aac", {
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
