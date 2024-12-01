import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../lib/getProfile";

export const appContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchuser() {
      const userdata = await getProfile();
      userdata ? setUser(userdata) : setUser(null);
      const wait = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    fetchuser();
  }, []);
  return (
    <appContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </appContext.Provider>
  );
};

export const useAuth = () => useContext(appContext);
export const useLoading = () => {
  const { isLoading, setIsLoading } = useAuth();
  return { isLoading, setIsLoading };
};
export const useUser = () => {
  const { user, setUser } = useAuth();
  return { user, setUser };
};
export default AppContextProvider;
