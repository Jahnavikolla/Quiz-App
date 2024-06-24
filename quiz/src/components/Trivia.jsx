import { useEffect, useState } from "react";
import useSound from 'use-sound'; 
import play from '../assets/play.mp3';
import wrong from '../assets/wrong.mp3';
import correct from '../assets/correct.mp3';

export default function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() => {
        letsPlay();
    }, [letsPlay]);

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };
//  console.log(data)
    const handleClick = (a) => {
        setSelectedAnswer(a);
        delay(3000, () => {
            if (a.correct) {
                correctAnswer();
                delay(1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });
            } else {
                wrongAnswer();
                delay(1000, () => {
                    setStop(true);
                });
            }
        });
    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div
                        key={a.text} // Ensure each answer has a unique key 
                        className={`answer ${selectedAnswer === a ? (a.correct ? "correct" : "wrong") : ""}`}
                        onClick={() => handleClick(a)}
                    >
                        {a.text}
                    </div>
                ))}
            </div>
        </div>
    );
}
