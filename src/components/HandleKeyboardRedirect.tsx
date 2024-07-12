"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HandleKeyboardRedirect({
  onLeftArrowUrl,
  onRightArrowUrl,
  onExcapeUrl,
  onEnterUrl,
}: {
  onLeftArrowUrl?: string;
  onRightArrowUrl?: string;
  onExcapeUrl?: string;
  onEnterUrl?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowLeft" &&
        onLeftArrowUrl &&
        onLeftArrowUrl !== ""
      ) {
        router.push(onLeftArrowUrl);
      }
      if (
        event.key === "ArrowRight" &&
        onRightArrowUrl &&
        onRightArrowUrl !== ""
      ) {
        router.push(onRightArrowUrl);
      }
      if (event.key === "Escape" && onExcapeUrl && onExcapeUrl !== "") {
        router.push(onExcapeUrl);
      }
      if (event.key === "Enter" && onEnterUrl && onEnterUrl !== "") {
        router.push(onEnterUrl);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
