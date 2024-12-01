export default function StackedProfile({ profiles }) {
  return (
    <>
      {profiles && (
        <div className="w-fit flex">
          {profiles.length > 0 && (
            <>
              {profiles.map((profile, index) => {
                const { username, photoUrl, _id } = profile;
                if (index < 3) {
                  return (
                    <div
                      key={_id}
                      style={{ transform: `translateX(${-index * 14}px)` }}
                      className={`h-full w-auto aspect-square min-w-7 min-h-7 overflow-hidden rounded-full cursor-pointer`}
                    >
                      <img
                        src={photoUrl}
                        alt={username}
                        className="w-full h-full "
                      />
                    </div>
                  );
                }
              })}

              {profiles.length > 3 && (
                <div
                  style={{ transform: `translateX(${-3 * 14}px)` }}
                  className={` h-full w-auto aspect-square min-w-7 min-h-7 overflow-hidden rounded-full bg-green-700 flex items-center justify-center font-medium p-1 text-base text-white cursor-pointer`}
                >
                  +{profiles.length - 3}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
