import GridItem from "./GridItem";

export default function MenuGrid() {

    return (
        <div className="flex flex-col justify-start items-start m-auto max-w-7xl relative w-full overflow-x-hidden overflow-y-scroll xl:overflow-y-hidden">
            <div className="hidden md:block absolute top-0 bottom-0 right-0 w-14 bg-gradient-to-r from-transparent to-gray-200 z-10"></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-0 w-14 bg-gradient-to-l from-transparent to-gray-200 z-10"></div>
            <div className="fade-in-right grid grid-cols-2 lg:grid-cols-3 place-content-center xl:grid-cols-4 gap-4 p-2 px-4 md:p-8 md:px-14  max-w-7xl mx-auto ">
                <GridItem 
                    image_url="https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffrogy%2Fflin%25201%2520big.webp&w=640&q=75"
                    link={"/frogy"}
                    first
                />
                <GridItem 
                    title="StarClean"
                    image_url="https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Fstarclean%2Fcover_starclean_3b770cb2cb.webp&w=640&q=75"
                    link={"/starclean"}
                />
                <GridItem 
                    title="Fnac"
                    image_url="https://www.mathis-viollet.fr/_next/image?url=https%3A%2F%2Fwyjsnkrgktfutfwyycwx.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fapplication%2Ffnac%2Fcover_fnac.webp&w=640&q=75"
                    link={"/fnac"}
                    textsm="text-gray-600"
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
    );
}