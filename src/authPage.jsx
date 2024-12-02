import { useContext, useState } from "react";
import axios from "axios";
import { appContext } from "../context/AppContext";

const AuthPage = () => {
  const [loginPage, setLoginPage] = useState(false);
  const [username, setUsername] = useState();
  const [password, setpassword] = useState();
  const { setUser } = useContext(appContext);
  const [error, setError] = useState("");
  const handlePages = () => {
    setLoginPage(!loginPage);
    if (username) setUsername("");
    if (password) setpassword("");
    return true;
  };
  const onLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) return false;
    await axios
      .post("/auth/sign-in", { username, password })
      .then((response) => {
        const user = response.data.user;
        setUser(user);
      })
      .catch((e) => {
        setError(e.response.data);
      });
  };

  const onSignup = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) return false;
    axios
      .post("/auth/sign-up", {
        username,
        password,
      })
      .then((response) => {
        const user = response.data.user;
        setUser(user);
      })

      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <div className="w-full flex justify-center items-center h-full bg-black">
      {loginPage ? (
        <form
          onSubmit={onLogin}
          className="w-full flex flex-col gap-2 max-w-sm p-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 w-full rounded-lg"
            required
            value={username}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="p-4 w-full rounded-lg"
            required
            value={password}
          />
          <p className="text-center text-sm font-semibold text-red-500 ">
            {error}
          </p>
          <button
            type="submit"
            className="p-4 w-full rounded-lg bg-orange-400 text-white font-semibold text-lg"
          >
            LOG IN
          </button>
          <p className="text-white text-center">Dont have an account?</p>
          <button
            onClick={handlePages}
            className="p-4 w-full rounded-lg bg-orange-400 text-white font-semibold text-lg "
          >
            SIGN UP
          </button>
        </form>
      ) : (
        <form
          onSubmit={onLogin}
          className="w-full flex flex-col gap-2 max-w-sm p-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 w-full rounded-lg"
            required
            value={username}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            className="p-4 w-full rounded-lg"
            required
            value={password}
          />
          <p className="text-sm text-center font-semibold text-red-500 ">
            {error}
          </p>
          <button
            type="submit"
            className="p-4 w-full rounded-lg bg-orange-400 text-white font-semibold text-lg"
            onClick={onSignup}
          >
            SIGN UP
          </button>
          <p className="text-white text-center">already have an account?</p>
          <button
            onClick={handlePages}
            className="p-4 w-full rounded-lg bg-orange-400 text-white font-semibold text-lg "
          >
            LOG IN
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthPage;
