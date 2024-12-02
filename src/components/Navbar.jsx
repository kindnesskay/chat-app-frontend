import ProfileButton from "./ProfileButton";
import Searchbar from "./Searchbar";
import { useUser } from "../../context/AppContext";
export default function Navbar() {
  const { user } = useUser();
  return (
    <nav className="w-full h-20 py-2 flex justify-between items-center px-8 fixed bg-white">
      <div className="w-12 h-12 rounded-full">
        <img src="/logo.png" alt="logo" />
      </div>
      <Searchbar placeholder={"Search something here.."} />
      <div className="w-fit">
        <ProfileButton userdata={user} username />
      </div>
    </nav>
  );
}
