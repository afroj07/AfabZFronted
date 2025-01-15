import React, { useState } from "react";
import Afabzlogo from "/src/assets/loginimage.jpg";
const RegistrationPage = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  const [error, setError] = useState("");

  // Function to handle from submission

  const handleSignUp = async (e) => {
    e.preventDefault(); //prevent default from submission behavior
    setError(null); //clear previous error

    try {
      // Send user input to the server
      const response = await fetch("http://localhost:9090/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        // Redirect to login page
        window.location.href = "/";
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message); //Display error message
    }
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img alt="AFabZ" src={Afabzlogo} className="h-3rem w-4rem " />

        <div className=" sm:mx-auto sm:w-full sm:max-w-md formBox bg-zinc-50 ">
          <h1 className=" text-center text-xl font-bold tracking-tight ">
            Create an account
          </h1>
          {error && (
            <p className="error-message text-sm/6 font-medium">{error}</p>
          )}
          <form onSubmit={handleSignUp} className="">
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
            <div className="mx-auto mt-2">
              <label htmlFor="email" className="text-sm/6 font-medium">
                Email:
              </label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
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
            <div className="mx-auto mt-2">
              <label htmlFor="role" className="text-sm/6 font-medium">
                Role:
              </label>
            </div>
            <select
              id={role}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="inputBox text-sm/6 font-medium"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
            <div className=" mx-auto mt-2">
              <button type="submit" className="form-button w-full">
                Sign Up
              </button>
            </div>
          </form>
          <p className="form-footer">
            Already a user? <a href="/">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
