"use client";
import { useState } from "react";
import style from "@/styles/Home.module.css";
import { Button } from "@nextui-org/react";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function Home() {
  const [text, setText] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [streaming, setStreaming] = useState(false);

  const suggestion = useSettingsStore((state) => state.notifications);

  const handlePredict = () => {
    setLoading(true);
    setShowButton(false);
    setPredictions([]);
    setStreaming(false);

    // Simulate an API call delay
    setTimeout(() => {
      const exampleSuggestions = suggestion
        ? ["word1", "word2", "word3", "word4"]
        : ["word0"];
      setLoading(false);
      startStreaming(exampleSuggestions); // Start streaming the predictions
    }, 2000); // Simulate delay before predictions appear
  };

  const startStreaming = (words: string[]) => {
    setStreaming(true);
  
    let index = -1; // Start with the first word
  
    const interval = setInterval(() => {
      setPredictions((prev) => {
        if (index < words.length) {
          const updatedPredictions = [...prev, words[index]];
          return updatedPredictions; // Append the current word
        }
        return prev; // Do nothing if index exceeds bounds
      });
  
      index++; // Increment after adding the current word
  
      if (index >= words.length) {
        clearInterval(interval); // Stop interval once all words are added
        setStreaming(false);
      }
    }, 500); // Adjust interval speed
  };
  
  
  
  
  

  const handleSelectPrediction = (word: string) => {
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

      {/* Loading State */}
      {loading && <p className={style.LoadingText}>Generating predictions...</p>}

      {/* Predictions Stream */}
      <div className={style.PredictionContainer}>
        {predictions.map((word, index) => (
          <span
            key={index}
            onClick={() => handleSelectPrediction(word)}
            className={`${style.PredictOutput} ${
              streaming ? style.StreamAnimation : ""
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
