import { menuLinks } from "../constants.js";
export default function MenuNav() {
  return (
    <div className="bg-white rounded-lg w-full ">
      <ul className="flex flex-col gap-2 items-center py-3">
        {menuLinks.map((link) => (
          <li
            className="text-lg font-medium capitalize text-gray-700"
            key={link.text}
          >
            <a href={link.url}>{link.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
