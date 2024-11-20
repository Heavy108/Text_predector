"use client";
import { useState,useEffect } from "react";
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
  const [scales, setScales] = useState([1, 1, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate audio amplitude with random scaling
      setScales([
        Math.random() * 1.5 + 1,
        Math.random() * 1.5 + 1,
        Math.random() * 1.5 + 1,
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  const handlePredict = async () => {
    setLoading(true);
    setShowButton(false);
    setPredictions([]);
    setStreaming(false);
  
    try {
      // Send input data and suggestion to the API
      const response = await fetch("api/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: text, suggestion }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }
  
      const data = await response.json();
      const exampleSuggestions = data.predictions || ["word0"]; // Fallback if no predictions returned
  
      setLoading(false);
      startStreaming(exampleSuggestions); // Start streaming the predictions
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setLoading(false);
      setShowButton(true); // Allow retry if an error occurs
    }
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
      {loading && <div className={style.voiceAnimation}>
      {scales.map((scale, index) => (
        <div
          key={index}
          className={style.circle}
          style={{ transform: `scale(${scale})` }}
        ></div>
      ))}
    </div>}

      {/* Predictions Stream */}
      <div className={style.PredictionContainer}>
        {predictions.map((word, index) => (
          <Button
          color="primary" variant="ghost"
            key={index}
            onClick={() => handleSelectPrediction(word)}
            className={`${style.PredictOutput} ${
              streaming ? style.StreamAnimation : ""
            }`}
          >
            {word}
          </Button>
        ))}
      </div>
    </div>
  );
}
