/* eslint-disable max-len */
import { PrismicRichText } from "@prismicio/react";

export default function ContactForm({ page }: { page: any }) {
  return (
    <div className="fade-in-top flex flex-col justify-center items-center m-auto w-full sm:w-[600px] max-w-7xl relative ">
      <div className="flex flex-col bg-gray-100 w-full mt-8 p-3 rounded-3xl">
        <form className="flex flex-col rounded-2xl overflow-hidden border-2 border-gray-300 0">
          <div className="flex items-center justify-center py-5 bg-gray-300">
            <p className="text-xl font-bold text-gray-100">Contact</p>
          </div>
          <div className="flex flex-col p-8 text-lg sm:text-xl min-h-96 text-center text-pretty justify-between text-gray-700">
            <PrismicRichText field={page.data.contact_page_text} />
            {/* <input
              type="text"
              placeholder="Name"
              className="transition-all p-2 mb-4 bg-zinc-200 rounded-lg ring-0 focus:ring-4 focus:ring-sky-400 outline-none "
            />
            <input
              type="email"
              placeholder="Email"
              className="transition-all p-2 mb-4 bg-zinc-200 rounded-lg ring-0 focus:ring-4 focus:ring-sky-400 outline-none"
            />
            <textarea
              placeholder="Message"
              rows={8}
              maxLength={1000}
              className="transition-all p-2 mb-4 bg-zinc-200 rounded-lg resize-none ring-0 focus:ring-4 focus:ring-sky-400 outline-none"
            /> */}
          </div>
          {/* <div className="absolute -bottom-5 right-5 sm:-bottom-8 sm:-right-8">
            <WiiButton text="Send" />
          </div> */}
        </form>
      </div>
    </div>
  );
}
