export default function SuggestedGroup() {
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg p-3 bg-white">
      <div className="flex justify-between mb-4">
        <p className="font-medium text-gray-400">Suggested Groups </p>
        <button className="text-blue-500 font-medium">See all</button>
      </div>
      <div className="">
        <div className="w-full aspect-video bg-green-500 rounded-lg"></div>
        <div className="flex gap-2 items-end justify-center -translate-y-4 ">
          <div className="w-14 h-14 rounded-full bg-green-600 "></div>
          <p className="text-lg font-medium">Design UI UX</p>
        </div>
      </div>
      <div className="flex justify-between ">
        <p>124k Members</p>
        <button className="w-8 h-8 rounded-full bg-blue-600"></button>
      </div>
    </div>
  );
}
