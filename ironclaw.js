/**
 * 🦅 Quick Accurate Books - ROOFING SECTOR STRIKE (Internal)
 * Target: Thornton Roofing Bookkeeping.
 * STATUS: SEO ONLY. NO SOCIAL DISPATCH.
 * Entity: Quick Accurate Books / Thornton.
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
  console.log("🦅 QAB (Thornton) Roofing Strike: Internal SEO Production Only...");

  const prompt = `
    You are an AI for Quick Accurate Books, Thornton, Colorado.
    Target: Thornton Roofing Companies (Specialized Bookkeeping).
    Topic: "Revenue Leak Audit: Why Thornton Roofers are losing $10k+ in uncaptured hail claims."
    
    Return ONLY a JSON object:
    {
      "title": "Thornton Roofing Revenue Leak Audit: Stop Losing Profit to Old-World Accounting",
      "slug": "thornton-roofing-bookkeeping-audit",
      "content": "Full inner HTML content. Min 1000 words. Technical bookkeeping advice for North Denver roofers."
    }
    `;

  try {
    const aiResponseRaw = await generateWithAI(prompt);
    if (!aiResponseRaw) return;
    const jsonStr = aiResponseRaw.substring(aiResponseRaw.indexOf('{'), aiResponseRaw.lastIndexOf('}') + 1);
    const blogData = JSON.parse(jsonStr);

    console.log(`✅ QAB Internal Roofing Blog Generated: ${blogData.title}`);

    const fileName = `${blogData.slug}.html`;
    fs.writeFileSync(path.join(__dirname, fileName), blogData.content);
    console.log(`🚀 QAB SEO LIVE: ${fileName} (NO SOCIAL POSTING)`);

  } catch (e) {
    console.error("💥 QAB Fail:", e.message);
  }
}

runIronclaw();