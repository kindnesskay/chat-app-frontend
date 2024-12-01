import { useUser } from "../../context/AppContext";
import UserStoryButton from "./UserStoryButton";
import { useEffect, useState } from "react";
import { getAllContacts } from "../../utils/contacts.utils";
export default function Stories() {
  const { user } = useUser();
  const [contacts, setContacts] = useState(undefined);
  const handleFetchContacts = async () => {
    const data = await getAllContacts();
    setContacts(data);
  };
  useEffect(() => {
    handleFetchContacts();
  }, []);
  return (
    <div className="flex gap-3 w-full overflow-auto p-2 scroll-smooth ">
      {user && (
        <div>
          {" "}
          <UserStoryButton userdata={user} owner />
        </div>
      )}
      {contacts &&
        contacts.map((contact) => (
          <div key={contact._id}>
            <UserStoryButton userdata={contact} />
          </div>
        ))}
    </div>
  );
}
