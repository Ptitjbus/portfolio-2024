/* eslint-disable max-len */
import { useRouter } from "next/navigation";
import GridItem from "./GridItem";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import ReactDOM from "react-dom";
import Image from "next/image";

export default function MenuGrid() {
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
          router.push(`/project/${id}`);
        }, 50);
      },
    });

    tl.to(backgroundRef.current, {
      duration: 0.3,
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
    ); // Start this animation at the same time as the background animation
  };

  //   tl.to(clonedRect, {
  //     top: 0,
  //     left: 0,
  //     width: "100vw",
  //     height: "100vh",
  //     duration: 0.7,
  //     ease: "power3.inOut",
  //     onUpdate() {
  //       setClonedImageProps({
  //         src: url,
  //         top: clonedRect.top,
  //         left: clonedRect.left,
  //         width: clonedRect.width,
  //         height: clonedRect.height,
  //       });
  //     },
  //   });
  // };

  return (
    <>
      <div className="flex flex-col justify-start items-start m-auto max-w-7xl relative w-full overflow-x-hidden overflow-y-scroll xl:overflow-y-hidden">
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-14 bg-gradient-to-r from-transparent to-gray-200 z-10" />
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-14 bg-gradient-to-l from-transparent to-gray-200 z-10" />
        <div className="fade-in-right grid grid-cols-2 lg:grid-cols-3 place-content-center xl:grid-cols-4 gap-4 p-2 px-4 md:p-8 md:px-14  max-w-7xl mx-auto ">
          <GridItem
            image_url="https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffrogy%2Fflin%25201%2520big.webp&w=640&q=75"
            link="/project/1"
            onClick={() =>
              handleImageClick(
                1,
                "https://wyjsnkrgktfutfwyycwx.supabase.co/storage/v1/object/public/application/frogy/f293406b49457d032e080e035f5d680d.webp",
              )
            }
            reference={(el: HTMLImageElement | null) =>
              (imageRefs.current[1] = el)
            }
            first
          />
          <GridItem
            title="StarClean"
            image_url="https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Fstarclean%2Fcover_starclean_3b770cb2cb.webp&w=640&q=75"
            link="/project/2"
            onClick={() =>
              handleImageClick(
                2,
                "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Fstarclean%2Fcover_starclean_3b770cb2cb.webp&w=640&q=75",
              )
            }
            reference={(el: HTMLImageElement | null) =>
              (imageRefs.current[2] = el)
            }
          />
          <GridItem
            title="Fnac"
            image_url="https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffnac%2Fcover_fnac.webp&w=640&q=75"
            link="/project/3"
            textsm="text-gray-600"
            onClick={() =>
              handleImageClick(
                3,
                "https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffnac%2Fcover_fnac.webp&w=640&q=75",
              )
            }
            reference={(el: HTMLImageElement | null) =>
              (imageRefs.current[3] = el)
            }
          />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
        </div>
      </div>
      <div
        ref={backgroundRef}
        className="fixed w-screen h-screen top-0 left-0 z-30 pointer-events-none"
      />
      {clonedImageProps &&
        ReactDOM.createPortal(
          <div
            className="fixed overflow-hidden tvfilter"
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
