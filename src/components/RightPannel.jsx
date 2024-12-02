import Searchbar from "./Searchbar";
import Stories from "./Stories";
import RecentChats from "./RecentChats";

export default function RightPannel() {
  return (
    <div className="right-pannel ">
      <Searchbar placeholder={"Search Stories"} />
      <Stories />
      <RecentChats />
    </div>
  );
}
