"use client";

import ContactForm from "@/components/ContactForm";
import ContactMenuButtonLeft from "@/components/ContactMenuButtonLeft";
import HandleClickSounds from "@/components/HandleClickSounds";
import MenuButtonLeft from "@/components/MenuButtonLeft";
import MenuButtonRight from "@/components/MenuButtonRight";
import MenuFooter from "@/components/MenuFooter";
import MenuGrid from "@/components/MenuGrid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setMute } from "@/redux/soundSlice";
// @ts-ignore
import wiiStartSound from "@/../public/sounds/wii-start.mp3";
// @ts-ignore
import menuThemeSound from "@/../public/sounds/wii-menu-theme.mp3";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import LaunchMessage from "@/components/LaunchMessage";

export default function Home() {
  const [showMenu, setShowMenu] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleMuteClick = () => {
    dispatch(setMute(true));
    setShowPopUp(false);
  };
  const handleOkClick = () => {
    dispatch(setMute(false));
    setShowPopUp(false);
  };

  const isMuted = useSelector((state: RootState) => state.sound.isMuted);

  const [startSound, { stop: stopWiiStartSound }] = useSound(wiiStartSound, {
    volume: 0.5,
    soundEnabled: !isMuted,
  });
  const [menuTheme, { stop: stopMenuTheme }] = useSound(menuThemeSound, {
    volume: 0.5,
    loop: true,
    onload: () => {
      setIsLoaded(true);
    },
    soundEnabled: !isMuted,
  });

  const onEmailClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopUp(true);
      sessionStorage.setItem("hasSeenPopup", "true");
    }
  }, []);

  useEffect(() => {
    const handleMouseEvent = () => {
      if (isLoaded) {
        startSound();
        menuTheme();
        window.removeEventListener("mousemove", handleMouseEvent);
      }
    };

    window.addEventListener("mousemove", handleMouseEvent);

    return () => {
      stopWiiStartSound();
      stopMenuTheme();
      window.removeEventListener("mousemove", handleMouseEvent);
    };
  }, [isLoaded, menuTheme, startSound, stopMenuTheme, stopWiiStartSound]);

  return (
    <div className="">
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
        <HandleClickSounds />
        {showPopUp && (
          <LaunchMessage
            isLoaded={isLoaded}
            onOkClick={handleOkClick}
            onMuteClick={handleMuteClick}
          />
        )}
        {showMenu && (
          <>
            <MenuGrid />
            <MenuFooter />
            <MenuButtonLeft />
          </>
        )}
        {!showMenu && (
          <>
            <ContactForm />
            <ContactMenuButtonLeft />
          </>
        )}
        <MenuButtonRight onEmailClick={onEmailClick} rotated={!showMenu} />
      </main>
    </div>
  );
}
