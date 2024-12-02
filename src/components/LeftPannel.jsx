import Contacts from "./Contacts";
import MenuNav from "./MenuNav";

export default function LeftPannel() {
  return (
    <div className="p-5 flex flex-col gap-5 left-pannel">
      <MenuNav />
      <Contacts />
    </div>
  );
}
