import HandleClickSounds from "@/components/HandleClickSounds";
import LaunchMessage from "@/components/LaunchMessage";
import { Metadata } from "next";

import { createClient } from "@/prismicio";
import HandleStartSounds from "@/components/HandleStartSounds";
import HomePage from "@/components/HomePage";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const client = createClient();
  const page = await client.getSingle("home");

  return (
    <div className="">
      <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
        <HandleClickSounds />
        <HandleStartSounds
          sound={{
            soundName: "wii-start",
            loop: false,
            volume: 0.5,
          }}
        />
        <HandleStartSounds
          sound={{
            soundName: "wii-menu-theme",
            loop: true,
            volume: 0.5,
          }}
        />
        <LaunchMessage page={page} />
        <HomePage page={page} />
      </main>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
