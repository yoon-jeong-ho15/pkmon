export default function Home() {
  const openOptions = () => {
    window.open("/option.html", "_blank");
  };

  return (
    <div className="flex flex-col items-center h-full bg-green-100">
      <div className="w-full h-1/16 bg-gray-50 flex">
        <button
          onClick={openOptions}
          className="ml-auto px-4 py-2 bg-black text-white hover:bg-gray-800"
        >
          Options
        </button>
      </div>
      <div className="border w-full flex-1"></div>
      <div className="w-full h-1/8 bg-gray-50"></div>
    </div>
  );
}
