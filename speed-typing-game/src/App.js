// import { faker } from "@faker-js/faker";
import Home from "./pages/Home";
import GlobalLobby from "./components/GlobalLobby";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./hooks/userContext";
import { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";

const router = createBrowserRouter([
  { path: "/", element: <Home></Home> },
  { path: "/dashboard", element: <Dashboard></Dashboard> },
  { path: "/global-lobby", element: <GlobalLobby></GlobalLobby> },
]);

function App() {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div className="max-w-7xl">
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
