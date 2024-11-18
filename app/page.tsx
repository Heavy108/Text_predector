"use client";
import { useState } from "react";
import style from "@/styles/Home.module.css";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [text, setText] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [suggestion, setSuggestion] = useState(true); // State to toggle suggestion type

  const handlePredict = () => {
    setLoading(true);
    setShowButton(false);

    // Mock prediction logic
    setTimeout(() => {
      if (suggestion) {
        setPredictions(["word1", "word2", "word3","word4"]); // Example suggestions
      } else {
        setPredictions(["word0"]);
      }
      setLoading(false);
    }, 2000); // Simulate API call
  };

  const handleSelectPrediction = (word) => {
    setText((prev) => `${prev} ${word}`.trim());
    setPredictions([]);
    setShowButton(true);
  };

  return (
    <div>
      <textarea
       
        name="Text"
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={style.Text}
      />
      <div className={style.MagicButton}>
        {showButton && (
          <Button color="primary" variant="shadow" onClick={handlePredict}>
            {loading ? "Loading..." : "Predict"}
          </Button>
        )}
      </div>
      <div>
        {predictions.map((word, index) => (
          <span
            key={index}
            onClick={() => handleSelectPrediction(word)}
           className={style.Predict_output}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
