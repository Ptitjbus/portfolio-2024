"use client";

import ContactForm from "@/components/ContactForm";
import ContactMenuButtonLeft from "@/components/ContactMenuButtonLeft";
import MenuButtonLeft from "@/components/MenuButtonLeft";
import MenuButtonRight from "@/components/MenuButtonRight";
import MenuFooter from "@/components/MenuFooter";
import MenuGrid from "@/components/MenuGrid";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(true);

  const onEmailClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="">
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
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
