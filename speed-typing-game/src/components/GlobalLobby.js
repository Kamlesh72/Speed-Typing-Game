import io from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import TypingScreen from "./TypingScreen";

const socket = io.connect("http://localhost:8080");

const GlobalLobby = () => {
  const [wpm, setWPM] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const lobbyNo = 1;
  let data =
    "Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.";
  const username = localStorage.getItem("username");

  function handleStartTimer() {
    socket.emit("startTimer", lobbyNo);
  }

  useEffect(() => {
    socket.emit("joinRoom", { lobbyNo, wpm, username });
    socket.on("timerUpdate", (updatedTimer) => {
      setTotalTime(updatedTimer);
    });
    socket.on("activeUsers", (recUsers) => {
      setActiveUsers(recUsers.length);
      console.log(recUsers);
    });
  }, []);
  return (
    <div>
      <div className="text-2xl text-yellow-500">{username}</div>
      <button
        className="mt-6 px-3 py-2 bg-slate-200 rounded-lg text-2xl"
        onClick={handleStartTimer}
      >
        START
      </button>
      <div className="mt-6 px-3 py-2 bg-blue-600 rounded-lg text-2xl">
        TIME: {totalTime}
      </div>
      <div className="mt-6 px-3 py-2 bg-green-600 rounded-lg text-2xl">
        ACTIVE: {activeUsers}
      </div>
    </div>
  );
};

export default GlobalLobby;

{
  /* <TypingScreen
data={data}
setCorrectChars={setCorrectChars}
totalTime={totalTime}
setFlag={setFlag}
></TypingScreen> */
}
