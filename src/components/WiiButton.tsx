/* eslint-disable max-len */
import Link from "next/link";

export default function WiiButton({
  text,
  className,
  onClick,
  link,
}: {
  text: string;
  className: string;
  onClick?: () => void;
  link?: string;
}) {
  if (link) {
    return (
      <Link
        href={link}
        className={`transition-all rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100shadow-md hover:shadow-lg focus:shadow-lg ring-4 ring-sky-400 outline-none w-28 h-14 sm:h-16 sm:w-44 ${className}`}
      >
        <p className="text-xl font-medium">{text}</p>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`transition-all rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100shadow-md hover:shadow-lg focus:shadow-lg ring-4 ring-sky-400 outline-none w-28 h-14 sm:h-16 sm:w-44 ${className}`}
    >
      <p className="text-xl font-medium">{text}</p>
    </button>
  );
}
