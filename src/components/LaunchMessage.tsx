export default function LaunchMessage({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      className={`fixed w-screen h-screen flex items-center justify-center bg-black z-20 ${className ?? ""}`}
      onClick={onClick}
    >
      <div className="text-white text-center">
        <h1 className="text-4xl">Welcome to my portfolio!</h1>
        <p className="text-lg">
          This site is still under construction. Please check back later!
        </p>
      </div>
    </div>
  );
}
