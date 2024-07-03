/* eslint-disable max-len */
import { useRouter } from "next/navigation";
import GridItem from "./GridItem";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import ReactDOM from "react-dom";
import Image from "next/image";
// @ts-ignore
import hoverSound from "@/../public/sounds/hover.mp3";
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from "use-sound";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function MenuGrid({ page }: { page: any }) {
  const isMuted = useSelector((state: RootState) => state.sound.isMuted);
  const [launchHoverSound] = useSound(hoverSound, {
    playbackRate: 3,
    volume: 0.15,
    soundEnabled: !isMuted,
  });
  const router = useRouter();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [clonedImageProps, setClonedImageProps] = useState<{
    src: string;
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const pageDataLength = page.data.cards.length;

  const handleImageHover = () => {
    launchHoverSound();
  };

  const handleImageClick = (id: number, url: string) => {
    const image = imageRefs.current[id];

    if (!image) return;

    const rect = image.getBoundingClientRect();
    setClonedImageProps({
      src: url,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    const clonedRect = { ...rect };

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          router.push(`/preview/${id}`);
        }, 50);
      },
    });

    tl.to(backgroundRef.current, {
      duration: 0.6,
      ease: "power3.inOut",
      backgroundColor: "rgba(0, 0, 0, 1)",
    });

    tl.set(
      clonedRect,
      {
        top: rect.top,
        left: rect.left,
      },
      "<",
    );

    tl.to(
      clonedRect,
      {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        duration: 0.8,
        ease: "power3.inOut",
        onUpdate() {
          setClonedImageProps((props) =>
            props
              ? {
                  ...props,
                  top: clonedRect.top,
                  left: clonedRect.left,
                  width: clonedRect.width,
                  height: clonedRect.height,
                }
              : props,
          );
        },
      },
      "<",
    );
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start m-auto max-w-7xl relative w-full overflow-x-hidden overflow-y-scroll xl:overflow-y-hidden">
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-14 bg-gradient-to-r from-transparent to-gray-200 z-10" />
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-14 bg-gradient-to-l from-transparent to-gray-200 z-10" />
        <div className="fade-in-right grid grid-cols-2 lg:grid-cols-3 place-content-center xl:grid-cols-4 gap-4 p-2 px-4 md:p-8 md:px-14  max-w-7xl mx-auto ">
          {page.data.cards.map((item: any) => {
            return (
              <GridItem
                key={item.game_id}
                image_url={item.card_banner_image.url}
                onClick={() =>
                  handleImageClick(item.game_id, item.card_preview_image.url)
                }
                reference={(el: HTMLImageElement | null) =>
                  (imageRefs.current[item.game_id] = el)
                }
                onMouseEnter={() => handleImageHover()}
                first={item.game_id === 0}
              />
            );
          })}
          {pageDataLength < 12 &&
            Array(12 - pageDataLength)
              .fill(0)
              .map((_, index) => <GridItem key={index} />)}
        </div>
      </div>
      <div
        ref={backgroundRef}
        className="fixed w-screen h-screen top-0 left-0 z-30 pointer-events-none"
      />
      {clonedImageProps &&
        ReactDOM.createPortal(
          <div
            className="fixed overflow-hidden tvfilter pointer-events-none"
            style={{
              position: "fixed",
              top: clonedImageProps.top,
              left: clonedImageProps.left,
              width: clonedImageProps.width,
              height: clonedImageProps.height,
              zIndex: 9999,
            }}
          >
            <Image
              src={clonedImageProps.src}
              alt=""
              height={2000}
              width={2000}
              className="object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
