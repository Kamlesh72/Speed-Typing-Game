import { useCallback, useEffect, useState } from "react";

const TypingScreen = ({ data, setCorrectChars, setFlag, totalTime }) => {
  const dataArr = [...data];
  const sentence = dataArr.map((char, index) => (
    <span key={index}>{char}</span>
  ));
  const [currSentence, setCurrSentence] = useState(sentence);
  const [currIndex, setCurrIndex] = useState(0);
  const [currTime, setCurrentTime] = useState(totalTime);
  const [timerId, setTimerId] = useState(null);
  const handleKey = useCallback(
    (e) => {
      if (timerId === null && currIndex === 0) {
        setFlag(1);
        setTimerId(
          setInterval(() => {
            setCurrentTime((prevTime) => prevTime - 1);
          }, 1000)
        );
      } else if (currIndex === dataArr.length) {
        clearInterval(timerId);
      }
      if (e.key === "Backspace") {
        if (
          currIndex &&
          currSentence[currIndex - 1].props.className !== "text-slate-200"
        ) {
          setCurrSentence((currSentence) => {
            const updatedSentence = currSentence.map((currObj, index) => {
              if (index === currIndex - 1) {
                let updateObj = {
                  ...currObj,
                  props: {
                    ...currObj.props,
                    className:
                      "underline decoration-sky-500 underline-offset-4",
                  },
                };
                return updateObj;
              } else if (index === currIndex) {
                let updateObj = {
                  ...currObj,
                  props: {
                    ...currObj.props,
                    className: "text-slate-500",
                  },
                };
                return updateObj;
              }
              return currObj;
            });
            return updatedSentence;
          });
          setCurrIndex((currIndex) => currIndex - 1);
        }
      } else {
        if (e.key === dataArr[currIndex]) {
          setCurrSentence((currSentence) => {
            const updatedSentence = currSentence.map((currObj, index) => {
              if (index === currIndex) {
                let updateObj = {
                  ...currObj,
                  props: {
                    ...currObj.props,
                    className: "text-slate-200",
                  },
                };
                return updateObj;
              }
              return currObj;
            });
            return updatedSentence;
          });
        } else {
          setCurrSentence((currSentence) => {
            const updatedSentence = currSentence.map((currObj, index) => {
              if (index === currIndex) {
                let updateObj = {
                  ...currObj,
                  props: {
                    ...currObj.props,
                    className: "text-red-400",
                  },
                };
                return updateObj;
              }
              return currObj;
            });
            return updatedSentence;
          });
        }
        setCurrIndex((currIndex) => currIndex + 1);
      }
    },
    [dataArr, currIndex, timerId, currSentence]
  );
  useEffect(() => {
    setCurrentTime(totalTime);
  }, [totalTime]);
  useEffect(() => {
    setCurrSentence((currSentence) => {
      const updatedSentence = currSentence.map((currObj, index) => {
        if (index === currIndex) {
          let updateObj = {
            ...currObj,
            props: {
              ...currObj.props,
              className: "underline decoration-sky-500 underline-offset-4",
            },
          };
          return updateObj;
        }
        return currObj;
      });
      return updatedSentence;
    });
  }, [currIndex]);

  const calculateWPM = useCallback(() => {
    let correctChars = 0;
    for (let i = 0; i < currIndex; i++) {
      console.log(currSentence[currIndex].props.className);
      if (
        currSentence[currIndex].props.className ===
        "underline decoration-sky-500 underline-offset-4"
      )
        correctChars++;
    }
    console.log(correctChars);
    setCorrectChars({
      correct: correctChars,
      incorrect: currIndex - correctChars,
    });
    setFlag(2);
  }, [currIndex, currSentence, setFlag, setCorrectChars]);

  useEffect(() => {
    document.addEventListener("keypress", handleKey);
    return () => {
      document.removeEventListener("keypress", handleKey);
      if (currTime <= 0) {
        clearInterval(timerId);
        setCurrentTime(0);
        calculateWPM();
      }
    };
  }, [handleKey, currTime, timerId, calculateWPM, setFlag]);
  return (
    <div>
      <div className="text-4xl text-yellow-400">{currTime}</div>
      <div className="text-xl text-slate-500">{currSentence}</div>
    </div>
  );
};

export default TypingScreen;
