import React from "react";
import { useState } from "react";
import { useUser } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";
export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    }

    await axios
      .post("/auth/sign-in", { username, password })
      .then((response) => {
        const user = response.data.user;
        setUser(user);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data);
      });
  };
  return (
    <article className="flex justify-center items-center h-screen ">
      <form
        className="max-w-md w-full border border-gray-200 shadow-sm rounded p-6 flex flex-col gap-4"
        onSubmit={onLogin}
      >
        <div className="mb-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600">
            Login
          </h1>
        </div>

        <input
          className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          type="text"
          required
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          type="text"
          placeholder="Password"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <input
          type="submit"
          className="w-full  button-primary h-12  text-sm font-bold text-gray-50"
          onClick={onLogin}
          defaultValue={"Sign in"}
        />
        <p className="text-base text-center font-medium text-red-500 ">
          {error}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="comments"
              className="ml-2 text-sm font-normal text-gray-600"
            >
              Remember me
            </label>
          </div>
          <div>
            <a className="text-sm text-blue-600 hover:underline" href="#">
              Forgot password?
            </a>
          </div>
        </div>

        <p className="ml-2 text-sm font-normal text-gray-600 ">
          Dont have an account?
          <a href="/register" className="ml-2 text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </article>
  );
}
