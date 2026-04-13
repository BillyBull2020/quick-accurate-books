/**
 * 🦅 IronClaw SEO Swarm Strike for Quick Accurate Books
 * SEO ONLY Engine (Thornton, CO)
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3
].filter(k => !!k);

async function generateWithAI(prompt) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  for (let i = 0; i < geminiKeys.length; i++) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKeys[i]);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) { }
  }
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "google/gemini-2.0-flash-001", messages: [{ role: "user", content: prompt }] })
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    } catch (err) { }
  }
  return "";
}

async function runIronclaw() {
  console.log("🦅 QAB Engine (Thornton): Commencing Internal SEO Strike...");
  const topics = ["Hidden Revenue Leaks", "Sovereign Bookkeeping", "Thornton Tax Strategy"];
  const dailyTopic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `    You are an AI for Quick Accurate Books, Thornton, Colorado.
    Generate a long-form SEO blog. Return ONLY JSON.
    TOPIC: ${dailyTopic}
    {
      "title": "Viral Click-Trigger Title about ${dailyTopic}",
      "slug": "kebab-case-slug",
      "content": "HTML content. Address Thornton business owners."
    }`;

  try {
    const aiResponseRaw = await generateWithAI(prompt);
    const jsonStr = aiResponseRaw.substring(aiResponseRaw.indexOf('{'), aiResponseRaw.lastIndexOf('}') + 1);
    const blogData = JSON.parse(jsonStr);

    console.log(`✅ QAB Blog Generated: ${blogData.title}`);
    // NO SOCIAL DISPATCH.
    const fileName = `${blogData.slug}.html`;
    fs.writeFileSync(path.join(__dirname, fileName), blogData.content);
  } catch (e) {
    console.error("💥 QAB Fail:", e.message);
  }
}
runIronclaw();