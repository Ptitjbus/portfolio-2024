"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import cursorTrail from "@/../public/img/cursortrail.png";

const CursorTrail = () => {
  const trailRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const trail = trailRef.current;

    const followMouse = (event: MouseEvent) => {
      if (trail) {
        gsap.to(trail, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    document.addEventListener("mousemove", followMouse);

    return () => {
      document.removeEventListener("mousemove", followMouse);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={trailRef}
      className="fixed top-0 left-0 w-[26px] h-[36px] pointer-events-none z-50 transform select-none"
      style={{
        transform: "translate(-50%, -50%) !important",
      }}
    >
      <Image src={cursorTrail} alt="Cursor Trail" width={26} height={36} />
    </div>
  );
};

export default CursorTrail;
