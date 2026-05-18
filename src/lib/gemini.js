import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

// WORKING MODEL
export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
