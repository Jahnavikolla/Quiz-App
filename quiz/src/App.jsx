import "./app.css";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [userName, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [data, setData] = useState([]);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1000" },
        { id: 6, amount: "$ 2000" },
        { id: 7, amount: "$ 4000" },
        { id: 8, amount: "$ 8000" },
        { id: 9, amount: "$ 16000" },
        { id: 10, amount: "$ 32000" },
        { id: 11, amount: "$ 64000" },
        { id: 12, amount: "$ 125000" },
        { id: 13, amount: "$ 250000" },
        { id: 14, amount: "$ 5000000" },
        { id: 15, amount: "$ 10000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 1) {
      const previousAmount = moneyPyramid.find((m) => m.id === questionNumber - 1)?.amount;
      if (previousAmount) {
        setEarned(previousAmount);
      }
    }
  }, [moneyPyramid, questionNumber]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://the-trivia-api.com/api/questions?limit=100");
        const formattedData = response.data.map((item, index) => ({
          id: index + 1,
          question: item.question,
          answers: [
            { text: item.correctAnswer, correct: true },
            ...item.incorrectAnswers.map(answer => ({ text: answer, correct: false }))
          ].sort(() => Math.random() - 0.5) 
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      {userName ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  {data.length > 0 ? (
                    <Trivia
                      data={data}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                    />
                  ) : (
                    <h2>Loading...</h2>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
