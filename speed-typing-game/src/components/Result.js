import React from "react";

const Result = ({ correctChars }) => {
  const correct = correctChars.correct;

  return (
    <div>
      <div className="text-3xl text-gray-500">
        Correct characters : {correctChars}
      </div>
      <div className="text-3xl text-gray-500">Incorrect characters : {0}</div>
    </div>
  );
};

export default Result;
