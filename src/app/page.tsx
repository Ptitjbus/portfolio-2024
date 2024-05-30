"use client";

import MenuButtonLeft from "@/components/MenuButtonLeft";
import MenuButtonRight from "@/components/MenuButtonRight";
import MenuFooter from "@/components/MenuFooter";
import MenuGrid from "@/components/MenuGrid";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(true);

  const onEmailClick = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className="tvfilter">
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
        {showMenu && 
          <>
            <MenuGrid />
            <MenuFooter />
          </>
        }
        {!showMenu &&
          <MenuButtonLeft />
        }
        <MenuButtonRight onEmailClick={(onEmailClick)} rotated={!showMenu} />
      </main>
    </div>
  );
}
