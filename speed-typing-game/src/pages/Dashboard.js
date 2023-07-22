import { useState } from "react";
import TypingScreen from "../components/TypingScreen";
import Result from "../components/Result";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // let data = faker.lorem.sentence(10);
  let data =
    "Another productive way to use this tool to begin a daily writing routine. One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes onto their day's writing projects, words are already flowing from their fingers.";
  const [correctChars, setCorrectChars] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [flag, setFlag] = useState(0);
  const [totalTime, setTotalTime] = useState(30);
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  return (
    <div className="grid grid-rows-3">
      <div>
        {flag === 0 && (
          <Header
            setDifficultyLevel={setDifficultyLevel}
            difficultyLevel={difficultyLevel}
            totalTime={totalTime}
            setTotalTime={setTotalTime}
          ></Header>
        )}
      </div>
      <div className="mb-10">
        {(flag === 0 || flag === 1) && (
          <TypingScreen
            data={data}
            setCorrectChars={setCorrectChars}
            setFlag={setFlag}
            totalTime={totalTime}
          ></TypingScreen>
        )}
        {flag === 2 && <Result correctChars={correctChars}></Result>}
      </div>
      {flag === 0 && (
        <div className="flex max-h-12">
          <Link
            to="/global-lobby"
            className="bg-slate-200 mr-6 w-fit px-4 py-3 rounded-xl shadow-md shadow-black cursor-pointer"
          >
            Join Global Lobby
          </Link>
          <Link
            to="/create-lobby"
            className="bg-slate-200 mr-6 w-fit px-4 py-3 rounded-xl shadow-md shadow-black cursor-pointer"
          >
            Create Custom Lobby
          </Link>
          <Link
            to="/join-lobby"
            className="bg-slate-200 mr-6 w-fit px-4 py-3 rounded-xl shadow-md shadow-black cursor-pointer"
          >
            Join Custom Lobby
          </Link>
        </div>
      )}
    </div>
  );
}
