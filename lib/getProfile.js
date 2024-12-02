import axios from "axios";

export const getProfile = async () => {
  return await axios
    .get("/profile")
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};
