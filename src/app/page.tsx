import MenuFooter from "@/components/MenuFooter";
import MenuGrid from "@/components/MenuGrid";

export default function Home() {
  return (
    <main className="h-screen fixed w-screen overflow-hidden flex flex-col">
      <MenuGrid />
      <MenuFooter />
    </main>
  );
}
