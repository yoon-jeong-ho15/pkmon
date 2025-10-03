export default function WalkingAnimation({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`${className} 
      h-full col-span-3 flex items-center justify-center
      overflow-hidden rounded-lg border-2
      `}
      style={{
        backgroundImage: "url(/sprites/road.gif)",
        backgroundSize: "cover",
      }}
    >
      <img
        src="/sprites/t1.gif"
        alt="Walking animation"
        className="pixel-art"
      />
    </div>
  );
}
