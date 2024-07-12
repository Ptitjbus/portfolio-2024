// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function WiiIconButton({
  onClick,
  icon,
}: {
  onClick?: () => void;
  icon: any;
}) {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [clickSound] = useSound("/sounds/wii-button.aac", {
    volume: 0.3,
    soundEnabled: !isMuted,
  });

  return (
    <div
      // eslint-disable-next-line max-len
      className="transition-all rounded-full flex items-center justify-center ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 w-12 h-12 sm:h-16 sm:w-16"
      onClick={() => {
        if (onClick) onClick();
        clickSound();
      }}
    >
      {icon}
    </div>
  );
}
