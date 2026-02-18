import LiveClock from "./Clock";

export default function MenuFooter({ page }: { page: any }) {
    return (
        <footer className="flex flex-col w-full fade-in-bottom backdrop-blur-sm bg-transparent">
            <div className="flex h-20 justify-center">
                <div className="w-full overflow-hidden bg-gray-300 h-full " />
                <div className="flex-shrink-0 w-[200px] bg-transparent h-full">
                    <svg width="200" height="80">
                        <path
                            d="M200 80C100 80 100.418 0.000135278 0 0V80H200Z"
                            fill="rgb(209 213 219)"
                        />
                    </svg>
                </div>
                <div className="sm:w-[100rem]">
                    <p
                        className="text-xl sm:text-2xl font-medium text-center
          whitespace-nowrap text-[#010313]/50 translate-y-3 w-full"
                    >
                        <LiveClock />
                    </p>
                </div>
                <div className="flex-shrink-0 w-[200px] bg-transparent">
                    <svg width="200" height="80">
                        <path
                            d="M0 80C100 80 99.5825 0.000135278 200 0V80H0Z"
                            fill="rgb(209 213 219)"
                        />
                    </svg>
                </div>
                <div className="w-full overflow-hidden bg-gray-300 h-full" />
            </div>
            <div className="flex items-center justify-center bg-gray-300 h-20 text-gray-400">
                <p>{page.data.footer_text}</p>
            </div>
        </footer>
    );
}
