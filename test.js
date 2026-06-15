require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

async function run() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Say hello"
    });

    console.log(result.text);
  } catch (err) {
    console.error(err);
  }
}

run();