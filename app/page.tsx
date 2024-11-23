"use client";
import { useState, useEffect, useRef } from "react";
import style from "@/styles/Home.module.css";
import { Button, Textarea } from "@nextui-org/react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { fontSerif } from "@/config/fonts";

export default function Home() {
  const [text, setText] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // const [streaming, setStreaming] = useState(false);
  // const [scales, setScales] = useState([1, 1, 1]);
  const containerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef(null);
  const transliteration = useSettingsStore((state) => state.romanization);
  const suggestion = useSettingsStore((state) => state.notifications);
  const debounceTimeout = 1000; // debounce delay in ms

  const getLastWords = (input: string, count: number): string => {
    const words = input.trim().split(/\s+/); // Split text by spaces
    return words.slice(-count).join(" "); // Get the last `count` words
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowHeight = window.innerHeight;
        containerRef.current.style.height = `${windowHeight}px`;
      }
    };

    // Initial setup
    handleResize();

    // Adjust on resize (e.g., keyboard appears/disappears)
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setScales([
  //       Math.random() * 0.5 + 1,
  //       Math.random() * 0.5 + 1,
  //       Math.random() * 0.5 + 1,
  //     ]);
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (!text) {
      setPredictions([]);
      return;
    }

    const debounce = setTimeout(() => {
      console.log("Debounce deez nuts");

      handlePredict();
    }, debounceTimeout);

    return () => clearTimeout(debounce);
  }, [text]);

  const handlePredict = async () => {
    setLoading(true);
    setPredictions([]);
    // setStreaming(false);

    try {
      const inputText = getLastWords(text, 1);
      const response = await fetch("api/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText, suggestion ,transliteration}),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const data = await response.json();
      const exampleSuggestions = data.predictions || ["word0"];

      setLoading(false);
      startStreaming(exampleSuggestions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setLoading(false);
    }
  };

  const startStreaming = (words: string[]) => {
    // setStreaming(true);

    let index = -1;

    const interval = setInterval(() => {
      setPredictions((prev) => {
        if (index < words.length) {
          const updatedPredictions = [...prev, words[index]];
          return updatedPredictions;
        }
        return prev;
      });

      index++;

      if (index >= words.length) {
        clearInterval(interval);
        // setStreaming(false);
      }
    }, 500);
  };

  const handleSelectPrediction = (word: string) => {
    //@ts-ignore
    textAreaRef.current?.focus();
    setText((prev) => `${prev}${word}`.trim());
    setPredictions([]);
  };

  return (
    <div ref={containerRef}>
      <div className={fontSerif.className}>
        <textarea
          ref={textAreaRef}
          name="Text"
          placeholder="Start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={style.Text}
        />
      </div>

      {/* Loading State */}

      {loading && (
        <Button
          variant="shadow"
          color="secondary"
          className="flex m-auto"
          isLoading
        >
          Generating
        </Button>
      )}
      {/* Predictions Stream */}
      {/* <div className={style.PredictionContainer}> */}
      {!loading && (
        <div className="flex m-auto flex-wrap items-center justify-center gap-4">
          {predictions.map((word, index) => (
            <Button
              color="primary"
              variant="shadow"
              key={index}
              size="lg"
              onClick={() => handleSelectPrediction(word)}
              // className={`${style.PredictOutput} ${
              //   streaming ? style.StreamAnimation : ""
              // }`}
            >
              {word}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
