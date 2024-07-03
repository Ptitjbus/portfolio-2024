"use client";

/* eslint-disable max-len */
import { useEffect, useState } from "react";
import WiiButton from "./WiiButton";
import { useDispatch } from "react-redux";
import { setMute } from "@/redux/soundSlice";
import { PrismicRichText } from "@prismicio/react";

export default function LaunchMessage({ page }: { page: any }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopUp(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  const handleMuteClick = () => {
    dispatch(setMute(true));
    setShowPopUp(false);
  };
  const handleOkClick = () => {
    dispatch(setMute(false));
    setShowPopUp(false);
  };

  return (
    showPopUp && (
      <div className="fixed w-screen h-svh bg-gray-950/30 z-20">
        <div
          className={`absolute-center w-full sm:w-[600px] sm:h-[450px] flex flex-col overflow-clip bg-gray-100 rounded-3xl z-20 border border-gray-400`}
        >
          <div className="h-4 bg-gray-300 border border-b-gray-400"></div>
          <div className="h-full flex flex-col justify-between pb-8">
            <div className="flex flex-col items-center justify-center gap-4 py-10 px-12 text-xl text-center text-pretty text-gray-600">
              <PrismicRichText field={page.data.popup_message} />
            </div>
            <div className="flex justify-center items-center p-8 gap-10">
              <WiiButton text="Couper le son" onClick={handleMuteClick} />
              <WiiButton text="OK" onClick={handleOkClick} />
            </div>
          </div>
          <div className="h-4 bg-gray-300 border border-t-gray-400"></div>
        </div>
      </div>
    )
  );
}
