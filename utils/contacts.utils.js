import axios from "axios";
export const getAllContacts = async () => {
  try {
    return await axios
      .get("/contacts")
      .then((res) => {
        if (!res.data.contacts.length) return null;
        return res.data.contacts;
      })
      .catch((err) => {
        return undefined;
        console.log(err);
      });
  } catch (error) {}
};
