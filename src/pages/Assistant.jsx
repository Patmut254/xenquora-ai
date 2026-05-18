import { useState } from "react";

import Layout from "../components/Layout";

import { model } from "../lib/gemini";

import FileUpload from "../components/FileUpload";

import { saveMemory, getMemory } from "../lib/aiMemory";

export default function Assistant() {
  const [prompt, setPrompt] = useState("");

  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt) return;

    setLoading(true);

    saveMemory(prompt);

    const context = getMemory().join("\\n");

    setResponse("");

    const result = await model.generateContentStream(context + "\\n" + prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();

      setResponse((prev) => prev + text);
    }

    setLoading(false);
  };

  const analyzeFile = async (file) => {
    const text = await file.text();

    const result = await model.generateContent(
      "Analyze this enterprise file:\\n" + text,
    );

    setResponse(result.response.text());
  };

  return (
    <Layout
      title="AI Assistant"
      subtitle="Enterprise conversational intelligence engine."
    >
      <div className="glass neon rounded-3xl p-6">
        <textarea
          placeholder="Ask Xenquora AI..."
          className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={askAI}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500"
          >
            {loading ? "Generating..." : "Generate Insight"}
          </button>
        </div>

        <div className="mt-6">
          <FileUpload onUpload={analyzeFile} />
        </div>

        {response && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 whitespace-pre-wrap leading-8">
            {response}
          </div>
        )}
      </div>
    </Layout>
  );
}
