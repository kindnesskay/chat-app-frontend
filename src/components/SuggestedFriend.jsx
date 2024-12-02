import ProfileButton from "./ProfileButton";
export default function SuggestedFriend() {
  const userdata = {
    id: 2,
    imageUrl: "/profile.jpg",
    username: "mark",
    city: "sydney",
  };

  return (
    <div className="relative border border-gray-300 rounded-lg p-3 bg-white">
      <button className="absolute right-2 top-2 border h-8 w-8 hover:border-gray-400 rounded-full border-gray-300 hover:shadow-xl cursor-pointer">
        X
      </button>
      <div>
        <ProfileButton userdata={userdata} city={true} />

        <div>
          <p className="mt-2">15 Mutuals</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between mt-2">
        <button className="bg-pink-500 rounded-lg text-white w-full p-2">
          Follow
        </button>
        <button className="border-2 border-gray-400 rounded-lg text-gray-400 w-full p-2">
          Ignore
        </button>
      </div>
    </div>
  );
}
