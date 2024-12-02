import { useEffect, useState } from "react";
import { getAllContacts } from "../../utils/contacts.utils";
import ProfileButton from "./ProfileButton";
export default function Contacts() {
  const [contacts, setContacts] = useState(undefined);
  const handleFetchContacts = async () => {
    const data = await getAllContacts();
    setContacts(data);
  };
  useEffect(() => {
    handleFetchContacts();
  }, []);

  return (
    <div className="bg-white rounded-lg p-5">
      <p className="text-xl font-medium capitalize text-gray-700 ">
        My contacts
      </p>
      <div className="flex flex-col gap-2 items-center py-3">
        {contacts === null ? (
          <p>You have no contacts </p>
        ) : (
          <>
            {contacts &&
              contacts.map((contact) => (
                <ProfileButton
                  userdata={contact}
                  username
                  city
                  key={contact._id}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
