import { useState } from "react";
import axios from "axios";

const AuthPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [loginPage, setLoginPage] = useState(true);

  const onLogin = (e) => {
    e.preventDefault();
    if(!username || !secret)return false
    axios
      .post("http://localhost:5000/api/auth/sign-in", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onSignup = (e) => {
    e.preventDefault();
    if(!username || !secret)return false
    axios
      .post("http://localhost:3001/signup", {
        username,
        secret,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <div className="login-page">
      {loginPage ? (
        <div className="card">
          <form onSubmit={onLogin}>
            <div className="title">Login</div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="secret"
              placeholder="Password"
              onChange={(e) => setSecret(e.target.value)}
            />
            <button type="submit">LOG IN</button>
            <p className="auth-type">Dont have an account?</p>
            <button
              onClick={() => {
                setSecret("");
                setUsername("");
                setLoginPage(!loginPage);
              }}
            >
              SIGN UP
            </button>
          </form>
        </div>
      ) : (
        <div className="card">
          {/* Sign Up Form */}
          <form onSubmit={onSignup}>
            <div className="title">Sign Up</div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="secret"
              placeholder="Password"
              onChange={(e) => setSecret(e.target.value)}
            />

            <button type="submit">SIGN UP</button>
            <p className="auth-type">Already have an account?</p>
            <button
              onClick={() => {
                setSecret("");
                setUsername("");
                setLoginPage(!loginPage);
              }}
            >
              LOGIN
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
