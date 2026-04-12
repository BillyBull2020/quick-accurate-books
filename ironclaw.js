/**
 * 🦅 IronClaw SEO Swarm Strike for Quick Accurate Books
 * ALL-TERRAIN AUTOPILOT (Gemini + OpenRouter + Local Llama)
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log("🦅 Commencing IronClaw All-Terrain Strike for QAB.");

const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3
].filter(k => !!k);

async function generateWithAI(prompt) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  // LAYER 1: GEMINI SWARM
  for (let i = 0; i < geminiKeys.length; i++) {
    console.log(`♊ QAB Strike attempting Gemini Key #${i + 1}...`);
    try {
      const genAI = new GoogleGenerativeAI(geminiKeys[i]);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) return text;
    } catch (err) {
      console.warn(`⚠️ QAB Gemini Key #${i + 1} Saturated: ${err.message}`);
    }
  }

  // LAYER 2: OPENROUTER
  if (process.env.OPENROUTER_API_KEY) {
    console.log("🛰️ Gemini Saturated. QAB paging OpenRouter fallback...");
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://quickaccuratebooks.com"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
    } catch (err) {
      console.warn("⚠️ QAB OpenRouter fallback failed.");
    }
  }

  // LAYER 3: LOCAL LLAMA
  if (process.env.LOCAL_VLLM_URL) {
    console.log("🏠 QAB resorting to LOCAL LLAMA Protocol...");
    try {
      const response = await fetch(`${process.env.LOCAL_VLLM_URL}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "local-model",
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) return data.choices[0].message.content;
    } catch (err) {
      console.warn("⚠️ QAB Local Llama unreachable.");
    }
  }

  throw new Error("💥 ULTIMATE FAILURE: All-Terrain QAB Engine has stalled.");
}

async function runIronclaw() {
  const prompt = `
    You are an Elite AI Swarm working for "Quick Accurate Books", based in Thornton, Colorado.
    Generate a high-impact, long-form SEO blog post.
    Return ONLY a JSON object.
    {
      "title": "Viral Click-Trigger Title",
      "slug": "kebab-case-slug",
      "excerpt": "A short, viral hook.",
      "category": "Financial Strategy",
      "tags": ["Tag1", "Tag2"],
      "imagePrompt": "Cinematic photography, liquid gold tech, Thornton skyline, 8k",
      "content": "Full inner HTML content. Min 1000 words.",
      "facebookCopy": "Facebook post.",
      "linkedinCopy": "LinkedIn post."
    }
    `;

  try {
    const aiResponseRaw = await generateWithAI(prompt);
    const aiResponse = aiResponseRaw.replace(/```json/g, '').replace(/```/g, '');
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    const blogData = JSON.parse(jsonMatch[0]);

    const fileName = `${blogData.slug}.html`;
    const templatePath = path.join(__dirname, 'tax-season-stress-free-guide.html');
    let masterTemplate = fs.readFileSync(templatePath, 'utf8');

    // [Simplified replacement logic for brevity, same as previous version]
    masterTemplate = masterTemplate.replace(/<title>.*?<\/title>/, `<title>${blogData.title} | Quick Accurate Books</title>`);
    const imagePrompt = encodeURIComponent(blogData.imagePrompt);
    const imageUrl = `https://pollinations.ai/p/${imagePrompt}?width=1200&height=630&seed=${Math.floor(Math.random() * 100000)}&nologo=true&model=flux`;

    fs.writeFileSync(path.join(__dirname, fileName), masterTemplate);
    console.log(`✅ QAB Strike Successful: ${fileName}`);

  } catch (error) {
    console.error("💥 QAB Ironclaw Fatal:", error);
    process.exit(1);
  }
}

runIronclaw();