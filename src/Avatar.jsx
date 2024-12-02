export default function Avatar({ username }) {
  const initials = username[0] + username[username.length - 1];

  return (
    <div className="flex items-center gap-2 hover:cursor-pointer ">
      <div className="w-10 h-10 bg-pink-200 rounded-full text-gray-700 font-bold flex items-center justify-center">
        <p>{initials}</p>
      </div>
      <p>{username}</p>
    </div>
  );
}
