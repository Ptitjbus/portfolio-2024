"use client";

import Link from "next/link";
// @ts-ignore
import buttonSound from "@/../public/sounds/wii-button.mp3";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function WiiArrow({
  link,
  direction,
}: {
  direction: "left" | "right";
  link: string;
}) {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [clickSound] = useSound(buttonSound, {
    volume: 0.5,
    soundEnabled: !isMuted,
  });
  return (
    <Link onClick={clickSound} href={link}>
      <svg
        width="39"
        height="66"
        viewBox="0 0 39 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // eslint-disable-next-line max-len
        className={`transform transition-all hover:scale-125 ${direction === "right" ? "rotate-180" : "rotate-0 "}`}
      >
        <path
          // eslint-disable-next-line max-len
          d="M2.33741 35.1895L32.5653 63.5042C34.7049 65.5084 38.1534 63.5693 37.5525 60.6998L31.8806 33.6149C31.7957 33.2094 31.7957 32.7906 31.8806 32.3851L37.5525 5.3002C38.1534 2.43071 34.7049 0.491614 32.5652 2.49584L2.33741 30.8105C1.07195 31.9959 1.07194 34.0041 2.33741 35.1895Z"
          fill="#38BDF8"
          stroke="#0369A1"
          strokeWidth="2"
        />
      </svg>
    </Link>
  );
}
