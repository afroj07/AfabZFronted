import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "/src/assets/loginimage.jpg";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); // clear previous error

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //Ensure cookies are sent and received
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User logged in successfully:', data");

        // Redirect user based on their role

        if (data.role === "CUSTOMER") {
          navigate("/customerhome");
        } else if (data.role === "ADMIN") {
          navigate("/adminhome");
        } else {
          throw new Error("Invalid user role");
        }
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img alt="AFabZ" src={LoginImg} className="h-3rem w-4rem " />

        <div className=" sm:mx-auto sm:w-full sm:max-w-md formBox bg-zinc-50 ">
          <h1 className=" text-center text-xl font-bold tracking-tight ">
            Login
          </h1>
          {error && (
            <p className="error-message text-sm/6 font-medium">{error}</p>
          )}
          <form onSubmit={handleSignIn} className="">
            <div>
              <label htmlFor="username" className="text-sm/6 font-medium">
                Username:
              </label>
            </div>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter your username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="inputBox w-full"
            />
            <div className=" mx-auto mt-2">
              <label htmlFor="password" className="text-sm/6 font-medium">
                Password:
              </label>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="inputBox w-full"
            />
            <div className=" mx-auto mt-2">
              <button type="submit" className="form-button w-full">
                Sign In
              </button>
            </div>
          </form>
          <p className="form-footer">
            New User? <a href="/register">SignUp here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
