import React from "react";
import { useState } from "react";
import { useUser } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSignup = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password || !email) {
      setError("All fields are required");
      return false;
    }
    axios
      .post("/auth/sign-up", {
        email,
        username,
        password,
      })
      .then((response) => {
        const user = response.data.user;
        setUser(user);
        navigate("/");
      })

      .catch((e) => {
        setError(e.response.data);
      });
  };

  return (
    <article className="flex justify-center items-center h-screen ">
      <form
        className="max-w-md w-full border border-gray-200 shadow-sm rounded-lg  p-6 space-y-4"
        onSubmit={onSignup}
      >
        <h1 className="text-center text-2xl font-semibold text-gray-600">
          Register
        </h1>

        <label
          htmlFor="email"
          className="flex flex-col gap-2 text-gray-600 font-semibold"
        >
          Username
          <input
            required
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          />
        </label>

        <label
          htmlFor="email"
          className="flex flex-col gap-2 text-gray-600 font-semibold"
        >
          Email
          <input
            required
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
          />
        </label>

        <label
          htmlFor="email"
          className="flex flex-col gap-2 text-gray-600 font-semibold"
        >
          Password
          <input
            required
            type="text"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 "
          />
        </label>

        <input
          className="w-full button-primary h-14  text-sm font-bold text-gray-50 text-center focus:outline-none cursor-pointer"
          onClick={onSignup}
          defaultValue={"Register"}
        />

        <p className="text-base text-center font-medium text-red-500 ">
          {error}
        </p>
        <p className="ml-2 mt-3 text-sm font-normal text-gray-600 ">
          Already have an account?
          <a href="/login" className="ml-2 text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </article>
  );
}
