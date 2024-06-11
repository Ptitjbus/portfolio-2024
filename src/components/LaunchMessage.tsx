/* eslint-disable max-len */
import WiiButton from "./WiiButton";

export default function LaunchMessage({
  onOkClick,
  onMuteClick,
  className,
  isLoaded,
}: {
  onOkClick: () => void;
  onMuteClick: () => void;
  className?: string;
  isLoaded?: boolean;
}) {
  return (
    <div className="fixed w-screen h-screen bg-gray-950/30 z-20">
      <div
        className={`absolute-center w-full sm:w-[600px] sm:h-[450px] flex flex-col overflow-clip bg-gray-100 rounded-3xl z-20 border border-gray-400 ${className ?? ""}`}
      >
        <div className="h-4 bg-gray-300 border border-b-gray-400"></div>
        <div className="h-full flex flex-col justify-between pb-8">
          <div className="flex flex-col items-center justify-center gap-4 py-10 px-12 sm:px-28 text-2xl text-center text-pretty text-gray-600">
            <p className="">Welcome to my portfolio</p>
            <p className="">
              For a better experience, the website use sounds, if you want to
              mute them, please click the button below
            </p>
            <p className="">Enjoy these nostalgic memories</p>
          </div>
          {isLoaded ? (
            <div className="flex justify-center items-center p-8 gap-10">
              <WiiButton text="Mute sound" onClick={onMuteClick} />
              <WiiButton text="OK" onClick={onOkClick} />
            </div>
          ) : (
            <div className="flex justify-center items-center p-8 gap-10">
              <p className="text-2xl text-center text-gray-500 animate-pulse">
                Loading...
              </p>
            </div>
          )}
        </div>
        <div className="h-4 bg-gray-300 border border-t-gray-400"></div>
      </div>
    </div>
  );
}
