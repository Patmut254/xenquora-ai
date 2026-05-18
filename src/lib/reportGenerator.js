import { model } from "./gemini";

export async function generateAIReport(metrics) {
  const prompt = `
  You are Xenquora AI.

  Analyze the following enterprise metrics
  and generate a professional executive report.

  Metrics:
  ${JSON.stringify(metrics, null, 2)}

  Include:
  - Revenue analysis
  - Operational efficiency
  - Risk intelligence
  - AI recommendations
  - Forecast outlook
  - Strategic observations
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}
