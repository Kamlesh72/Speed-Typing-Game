import React from "react";

const diffLevel = ["Easy", "Medium", "Hard"];
const time = [30, 60, 90, 120];

const Header = ({
  totalTime,
  setTotalTime,
  difficultyLevel,
  setDifficultyLevel,
}) => {
  return (
    <div>
      <div className="text-yellow-500 text-4xl font-bold">
        SPEED TYPING GAME
      </div>
      <div className="text-white mt-3 text-lg" style={{ marginLeft: "70%" }}>
        {diffLevel.map((el, index) => {
          if (el === difficultyLevel)
            return (
              <span key={index} className="text-yellow-300 cursor-pointer">
                {el}{" "}
              </span>
            );
          return (
            <span
              key={index}
              className="cursor-pointer"
              onClick={() => setDifficultyLevel(el)}
            >
              {el}{" "}
            </span>
          );
        })}
        {"  |  "}
        {time.map((el, index) => {
          if (el === totalTime)
            return (
              <span key={index} className="text-yellow-300 cursor-pointer">
                {el}{" "}
              </span>
            );
          return (
            <span
              key={index}
              className="cursor-pointer"
              onClick={() => setTotalTime(el)}
            >
              {el}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
