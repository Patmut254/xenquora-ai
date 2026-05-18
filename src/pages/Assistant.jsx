import { useState } from "react";

import Layout from "../components/Layout";

import FileUpload from "../components/FileUpload";

import { model } from "../lib/gemini";

import { saveMemory, getMemory } from "../lib/aiMemory";

import { ClipLoader } from "react-spinners";

export default function Assistant() {
  const [prompt, setPrompt] = useState("");

  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Ask Gemini AI
  const askAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      setError("");

      setResponse("");

      // Save conversation memory
      saveMemory(prompt);

      const context = getMemory().join("\n");

      // Generate AI response
      const result = await model.generateContent(
        `
          You are Xenquora AI,
          an enterprise intelligence system.

          Previous Context:
          ${context}

          User Prompt:
          ${prompt}

          Generate a professional enterprise response.
          `,
      );

      const text = result.response.text();

      setResponse(text);
    } catch (error) {
      console.error("Gemini Error:", error);

      if (error.message?.includes("429")) {
        setError("AI quota exceeded. Please wait and try again.");
      } else {
        setError("Failed to generate AI response.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Analyze uploaded files
  const analyzeFile = async (file) => {
    if (!file) return;

    try {
      setLoading(true);

      setError("");

      const text = await file.text();

      const result = await model.generateContent(
        `
            Analyze the following enterprise file
            and provide operational insights,
            risks, summaries, and recommendations.

            File Content:
            ${text}
            `,
      );

      const aiResponse = result.response.text();

      setResponse(aiResponse);
    } catch (error) {
      console.error("File Analysis Error:", error);

      setError("Failed to analyze uploaded file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="AI Assistant"
      subtitle="Enterprise conversational intelligence engine."
    >
      <div className="space-y-6">
        {/* AI Chat */}
        <div className="glass neon rounded-3xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Xenquora AI Copilot</h2>

            <p className="text-gray-400 mt-2">
              Ask operational, strategic, forecasting, or business intelligence
              questions.
            </p>
          </div>

          <textarea
            placeholder="Ask Xenquora AI..."
            className="xenq-input min-h-[180px] resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex flex-wrap gap-4 mt-6">
            <button onClick={askAI} disabled={loading} className="btn-primary">
              {loading ? "Generating..." : "Generate Insight"}
            </button>

            <button
              onClick={() => {
                setPrompt("");
                setResponse("");
                setError("");
              }}
              className="btn-secondary"
            >
              Clear
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-3 mt-6">
              <ClipLoader color="#8B5CF6" size={22} />

              <p className="text-sm text-gray-400">
                Xenquora AI is analyzing...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-300">
              {error}
            </div>
          )}

          {/* AI Response */}
          {response && (
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="pulse-dot bg-purple-400" />

                <h3 className="font-semibold text-lg">AI Response</h3>
              </div>

              <div className="whitespace-pre-wrap leading-8 text-gray-300">
                {response}
              </div>
            </div>
          )}
        </div>

        {/* File Upload */}
        <div className="glass neon rounded-3xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Enterprise File Analysis</h2>

            <p className="text-gray-400 mt-2">
              Upload reports, operational logs, or business documents for AI
              analysis.
            </p>
          </div>

          <FileUpload onUpload={analyzeFile} />
        </div>
      </div>
    </Layout>
  );
}
