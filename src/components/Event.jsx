import StackedProfile from "./StackedProfile";
export default function Event({ eventData }) {
  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-3 relative bg-white">
      <button className="text-blue-500 font-medium absolute right-2 ">
        view
      </button>
      <div className="flex gap-4 items-center ">
        <div className="w-16 h-16 rounded-full bg-green-600"></div>
        <div className="">
          <p className="text-lg font-medium">{eventData.title}</p>
          <p className="text-sm font-medium">{eventData.date}</p>
        </div>
      </div>

      <p className="border-b-2 border-b-gray-300 pb-2 px-2">{eventData.note}</p>
      <div className="flex justify-between h-12 ">
        <StackedProfile joinedUsers={eventData.joinedUsers} />

        <p className="self-center">{eventData.joinedUsers.length} joined</p>
      </div>
    </div>
  );
}
