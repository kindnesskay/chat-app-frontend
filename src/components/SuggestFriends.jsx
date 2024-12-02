import SuggestedFriend from "./SuggestedFriend";
export default function SuggestFriends() {
  return (
    <div className="flex flex-col gap-2 bg-white p-2">
      <div className="flex justify-between py-2">
        <p className="font-medium text-gray-400">You might like </p>
        <button className="text-blue-500 font-medium">See all</button>
      </div>
      <div>
        <SuggestedFriend />
      </div>
    </div>
  );
}
