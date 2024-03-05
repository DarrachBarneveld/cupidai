import { useState } from "react";
import "./UI.css";

const ChoiceButton = ({ onClick, text }) => {
  const [selected, setSelected] = useState(false);
  function handleClick() {
    setSelected((prev) => !prev);
    onClick(text);
  }

  return (
    <div className="col px-1 d-flex justify-content-center fade-in-bounce ">
      <button
        onClick={handleClick}
        className={`choice-btn text-wrap ${selected && "selected-btn"}`}
      >
        {text}
      </button>
    </div>
  );
};

export default ChoiceButton;
