import { NextRequest, NextResponse } from "next/server";

function isHindi(input: string) {
    const hindiRegex = /[\u0900-\u097F]+/;
    return hindiRegex.test(input);
}

async function fetchPredictions(lang: string, input: string) {
    try {
        const endpoint = lang === "Hindi" ? "hi" : "asm";
        console.log(`Fetching predictions for ${lang}: ${input}`);
        const response = await fetch(`http://127.0.0.1:8000/models/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        const filteredText = data.text.replace(input, "").replace(/�/g, "").trim(); 
        console.log("Prediction:", filteredText);
        return filteredText;
    } catch (error) {
        console.error("Error fetching predictions:", error);
        throw error;
    }
}

async function handleRomanization(input: string) {
    try {
        console.log("Handling romanization for:", input);
        const response = await fetch("http://127.0.0.1:8000/translit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch romanization data");
        }

        const data = await response.json();
        console.log("Romanized value:", data.text, "Language:", data.lang);
        console.log("translitValue",data.text)
        return {
            translitValue: data.text,
            translitLang: data.lang,
        };
    } catch (error) {
        console.error("Error handling romanization:", error);
        throw error;
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { input, suggestion, romanization } = body;
        console.log("Input received:", input);

        let lang = isHindi(input) ? "Hindi" : "Assamese";
        let predictions: string[] = [];
        let processedInput = input;

        if (romanization) {
            const { translitValue, translitLang } = await handleRomanization(input);
            processedInput = translitValue; 
            lang = translitLang;
        }

        
        const calls = suggestion ? 3 : 1;

        for (let i = 0; i < calls; i++) {
            const prediction = await fetchPredictions(lang, processedInput);
            const finaltext = romanization ? `${processedInput} ${prediction}` : prediction
            console.log(finaltext)
            if (prediction.trim().length > 0) predictions.push(
                
                finaltext
            );
        }

      
        return NextResponse.json({ predictions });
    } catch (error) {
        console.error("Error handling API request:", error);
        return NextResponse.json(
            { error: "Failed to process the request" },
            { status: 500 }
        );
    }
}
