export default function ProfileButton({ userdata, city, username }) {
  return (
    <>
      {userdata && (
        <div className="items-center w-full flex">
          <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
            <img
              src={userdata.photoUrl}
              alt={userdata.username}
              className="w-full h-full"
            />
          </div>
          <div className="">
            {username && (
              <p className="font-medium ml-2 text-lg cursor-pointer">
                {userdata.username}
              </p>
            )}
            {city && (
              <p className="font-medium ml-2 text-sm text-gray-500 capitalize">
                {userdata.city}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
