import React from "react";
import { useContext } from "react";
import { UserContext } from "../hooks/userContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { username, setUsername } = useContext(UserContext);
  return (
    <div>
      <div className="bg bg-white rounded-xl py-7 flex flex-col">
        <div className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ENTER YOUR USERNAME
        </div>
        <input
          id="username"
          name="username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
          className="block pl-2 w-80 mx-16 my-5 rounded-md  py-1.5 text-gray-900 shadow-sm border-2 border-blue-300"
        ></input>
        <Link
          to="/dashboard"
          className="mt-6 mx-auto rounded-md bg-blue-800 px-5 py-1.5 font-semibold  text-white shadow-sm hover:bg-blue-700"
          onClick={() => localStorage.setItem("username", username)}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Home;
