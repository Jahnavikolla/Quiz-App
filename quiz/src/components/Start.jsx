import React, { useRef } from "react";
import useSound from "use-sound";
import "../app.css";

export default function Trivia({ setUsername }) {
  const inputRef = useRef();
  const [play] = useSound("/sound.mp3");

  const handleClick = () => {
    play();
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        placeholder="enter your name"
        className="startInput"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}