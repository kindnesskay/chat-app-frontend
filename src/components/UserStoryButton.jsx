export default function UserStoryButton({ userdata, owner }) {
  const { username, photoUrl, id } = userdata;
  return (
    <>
      <div className="flex flex-col items-center w-full gap-2">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-600 ">
          <img src={photoUrl} alt={username} className="w-full h-full" />
        </div>
        {owner ? (
          <div className="relative">
            <button className="w-6 h-6 rounded-full text-pink-500 bg-white border-pink-500 border-2  -translate-y-6 left-1/2 -translate-x-1/2 absolute bold text-2xl flex items-center justify-center">
              +
            </button>
            <p className="font-medium">Add</p>
          </div>
        ) : (
          <div className="">
            <p className="font-medium">{username}</p>
          </div>
        )}
      </div>
    </>
  );
}
