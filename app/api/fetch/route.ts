import { NextRequest, NextResponse } from "next/server";

// Function to check if input is in Hindi
function isHindi(input: any) {
  const hindiRegex = /[\u0900-\u097F]+/;
  return hindiRegex.test(input);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, suggestion } = body;

    // Check the language of the input (Hindi or not)
    const isHindiLanguage = isHindi(input);
    const code = isHindiLanguage ? "hi" : "asm"; // Use 'hi' for Hindi, 'asm' for Assamese

    // Function to fetch predictions from the model server
    const fetchPredictions = async () => {
      const response = await fetch(`http://127.0.0.1:8000/models/${code}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temp: 1.4,
          max_tokens_count: 15,
          start_text: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch predictions from the model server");
      }

      const data = await response.json();
      const filteredText = data.text.replace(/�/g, ""); // Remove any invalid characters
      return filteredText || "fallback_word"; // Return a fallback if no valid text
    };

    // Make multiple prediction calls if 'suggestion' is true
    const predictions = [];
    const calls = suggestion ? 4 : 1; // 4 calls if suggestion is true, otherwise 1 call

    for (let i = 0; i < calls; i++) {
      const prediction = await fetchPredictions();
      predictions.push(prediction);
    }

    // Return the predictions
    return NextResponse.json({ predictions });
  } catch (error) {
    console.error("Error handling API request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
