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
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
  process.env.GEMINI_API_KEY_6,
  process.env.GEMINI_API_KEY_7,
  process.env.GEMINI_API_KEY_8,
  process.env.GEMINI_API_KEY_9,
  process.env.GEMINI_API_KEY_10
].filter(k => !!k);

async function generateWithAI(prompt) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp", "gemini-1.5-flash-8b"];

  for (let i = 0; i < geminiKeys.length; i++) {
    for (const modelName of models) {
      try {
        console.log(`🦅 QAB Sovereign Strike: Testing Layer ${i} with ${modelName}...`);
        const genAI = new GoogleGenerativeAI(geminiKeys[i]);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (text) return text;
      } catch (e) {
        if (e.message.includes("429")) {
          console.warn(`⚠️ Layer ${i} saturated. Rotating key...`);
          break;
        }
      }
    }
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
      "slug": "thornton-roofing-bookkeeping-audit-UNIQUE_ID",
      "content": "Full inner HTML content (~1000 words). Highly technical bookkeeping advice for North Denver roofers. Use <h2> and <p> tags. Focus on hail claims and accurate numbers."
    }
    `;

  try {
    const aiResponseRaw = await generateWithAI(prompt);
    if (!aiResponseRaw) {
        console.error("💥 QAB Fail: No AI response generated.");
        return;
    }
    const jsonStr = aiResponseRaw.substring(aiResponseRaw.indexOf('{'), aiResponseRaw.lastIndexOf('}') + 1);
    const blogData = JSON.parse(jsonStr);

    // Ensure unique slug
    blogData.slug = blogData.slug.replace('UNIQUE_ID', Math.random().toString(36).substring(7));

    console.log(`✅ QAB Internal Roofing Blog Generated: ${blogData.title}`);

    const fileName = `${blogData.slug}.html`;

    fs.writeFileSync(path.join(__dirname, fileName), blogData.content);
    console.log(`🚀 QAB SEO LIVE: ${fileName} (NO SOCIAL POSTING)`);

  } catch (e) {
    console.error("💥 QAB Fail:", e.message);
  }
}

runIronclaw();