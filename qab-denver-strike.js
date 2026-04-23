/**
 * 🦅 Quick Accurate Books - DENVER EXPANSION STRIKE
 * Target: Denver Metro Elite Bookkeeping.
 * Status: SEO & LOCAL DOMINANCE.
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
  const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp", "gemini-2.0-flash"];

  for (let i = 0; i < geminiKeys.length; i++) {
    for (const modelName of models) {
      try {
        console.log(`🦅 Denver Strike: Testing Layer ${i} with ${modelName}...`);
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

async function runDenverStrike() {
  console.log("🏙️  Quick Accurate Books: Denver Market Strike Initiating...");

  const prompt = `
    You are an elite financial strategist for Quick Accurate Books.
    Target Audience: Denver, Colorado entrepreneurs, high-growth startups, and established professional services.
    Topic: "Mile-High Financial Mastery: Why Denver’s Scaling Elite are Abandoning Traditional Bookkeeping for Sovereign Revenue Intelligence."
    
    Tone: High-status, authoritative, cinematic, and deeply analytical. This is NOT a standard "tips" blog. This is a manifesto on financial architecture for Denver's business leaders.
    
    Key Themes to Include:
    - Denver's unique economic velocity and the "Mile-High Growth Ceiling".
    - The difference between "Compliance Bookkeeping" (looking backward) vs "Sovereign Revenue Intelligence" (looking forward).
    - Why Denver's fastest-growing firms treat their General Ledger as a "Financial Node" rather than a chore.
    - Actionable insights on reconciliation speed, cash flow forecasting, and the "ROI of Accuracy".
    - Mentioning Denver specific areas like LoDo, Cherry Creek, and RiNo to ground the local authority.
    
    Return ONLY a JSON object:
    {
      "title": "Denver Mile-High Mastery: The Sovereign Edge in Professional Bookkeeping",
      "slug": "denver-bookkeeping-sovereign-mastery-UNIQUE_ID",
      "content": "Full inner HTML content (~1200 words). Use <h2>, <h3>, and <p> tags. Use <strong> for emphasis on high-impact terms. NEVER mention roofing. Focus on Denver business dominance."
    }
  `;

  try {
    let aiResponseRaw = await generateWithAI(prompt);
    
    if (!aiResponseRaw && process.env.OPENROUTER_API_KEY) {
        console.log("🦅 Denver: Google APIs exhausted. Falling back to OpenRouter...");
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
             aiResponseRaw = data.choices[0].message.content;
        }
    }

    if (!aiResponseRaw) {
        console.error("💥 Denver Fail: No AI response generated.");
        return;
    }
    
    const jsonStr = aiResponseRaw.substring(aiResponseRaw.indexOf('{'), aiResponseRaw.lastIndexOf('}') + 1);
    const blogData = JSON.parse(jsonStr);

    // Ensure unique slug
    blogData.slug = blogData.slug.replace('UNIQUE_ID', Math.random().toString(36).substring(7));

    console.log(`✅ Denver Blog Generated: ${blogData.title}`);

    const fileName = `${blogData.slug}.html`;
    
    // 🔥 IMAGE ENGINE: CINEMATIC DENVER FINANCIAL
    const refinedImagePrompt = `Cinematic high-status view of Denver skyline at dusk with glowing financial data nodes, emerald and obsidian color palette, futuristic professional bookkeeping aesthetic, 8k, hyper-realistic`.replace(/\s+/g, ' ');
    const imageToUse = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedImagePrompt)}?width=1200&height=630&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

    const fullHtml = `<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>${blogData.title} | Quick Accurate Books Denver</title>
    <meta name='description' content='${blogData.title} - Scaling Denver businesses through elite sovereign bookkeeping.'>
    <link rel='canonical' href='https://quickaccuratebooks.com/${fileName}'>
    <link rel='stylesheet' href='styles.css?v=51'>
    <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap' rel='stylesheet'>
    <style>
        body { background: var(--gray-50); line-height: 1.8; color: var(--gray-800); }
        .blog-hero { padding: 160px 24px 80px; background: linear-gradient(135deg, #020617, #064e3b); color: var(--white); text-align: center; position: relative; }
        .blog-hero .category { display: inline-block; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 6px 16px; border-radius: 50px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; border: 1px solid rgba(16, 185, 129, 0.4); }
        .blog-hero h1 { font-family: var(--font-display); font-size: 56px; line-height: 1.1; margin-bottom: 30px; max-width: 950px; margin: 0 auto; }
        .blog-meta { display: flex; align-items: center; justify-content: center; gap: 24px; margin-top: 40px; opacity: 0.8; font-size: 15px; }
        .blog-meta img { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #10b981; object-fit: cover; }
        .blog-layout { display: grid; grid-template-columns: 1fr 340px; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; }
        .article-body { background: var(--white); padding: 60px; border-radius: 24px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); font-size: 19px; font-weight: 300; }
        .article-body h2, .article-body h3 { font-family: var(--font-display); font-size: 32px; color: var(--dark); margin: 60px 0 24px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }
        .blog-sidebar { position: sticky; top: 100px; }
        .author-card { background: var(--white); padding: 40px 30px; border-radius: 20px; text-align: center; border-top: 5px solid #10b981; }
        @media (max-width: 1024px) { .blog-layout { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <nav class="navbar" style="background: rgba(2, 6, 23, 0.95); backdrop-filter: blur(20px); border-bottom: 2px solid #0ea5e9;">
        <div class="container">
            <a href="index.html" class="logo" style="text-decoration: none;">
                <span style="color: white;">Quick</span><span style="color: #10b981;">Accurate</span>
                <span style="color: rgba(255,255,255,0.5); border-top: 3px solid #0ea5e9;">BOOKS</span>
            </a>
            <div class="nav-links">
                <a href="blog.html" style="color: #10b981; font-weight: 700;">Blog</a>
                <a href="index.html#contact" class="btn-primary">Denver Consultation</a>
            </div>
        </div>
    </nav>
    <header class='blog-hero'>
        <div class='container'>
            <span class='category'>Denver Market Strike</span>
            <h1>${blogData.title}</h1>
            <div class='blog-meta'>
                <img src='tanya-frank.jpg' alt='Tanya L. Frank'>
                <span>Written by Tanya L. Frank</span>
                <span>•</span>
                <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
    </header>
    <div class='blog-layout'>
        <article class='article-body'>
            <img src="${imageToUse}" alt="Denver Financial Mastery" style="width: 100%; border-radius: 16px; margin-bottom: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
            ${blogData.content}
        </article>
        <aside class='blog-sidebar'>
            <div class='author-card'>
                <img src='tanya-frank.jpg' alt='Tanya Frank' style="width:100px; border-radius:50%; margin-bottom:20px;">
                <h4>Tanya L. Frank</h4>
                <p>Founder & Intuit Certified QuickBooks Expert. Specializing in Denver's high-velocity financial sectors.</p>
                <a href='index.html#about'>Elite Consultation →</a>
            </div>
        </aside>
    </div>
    <footer style='background: #020617; color: #64748b; padding: 40px 0; text-align: center;'>
        <p>© ${new Date().getFullYear()} Quick Accurate Books Denver. All rights reserved.</p>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, fileName), fullHtml);
    console.log(`✅ Denver File Written: ${fileName}`);

    // Inject into blog.html
    const blogPath = path.join(__dirname, 'blog.html');
    let blogContent = fs.readFileSync(blogPath, 'utf8');

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const excerpt = blogData.content.replace(/<[^>]+>/g, ' ').substring(0, 150) + "...";
    
    const newCard = `<article class="blog-preview">
                <div class="blog-preview-image">
                    <img src="${imageToUse}" alt="${blogData.title}">
                </div>
                <div class="blog-preview-content">
                    <span class="blog-preview-category">Denver Expansion</span>
                    <h2>${blogData.title}</h2>
                    <p>${excerpt}</p>
                    <div class="blog-preview-meta">
                        <span>👤 Tanya L. Frank</span>
                        <span>📅 ${dateStr}</span>
                    </div>
                    <a href="${fileName}" class="read-more">Read Denver Manifesto →</a>
                </div>
            </article>`;

    blogContent = blogContent.replace('<!-- [IRONCLAW_HOOK] -->', `<!-- [IRONCLAW_HOOK] -->\n            ${newCard}`);
    fs.writeFileSync(blogPath, blogContent);

    console.log(`🚀 DENVER SEO LIVE: ${fileName} injected into blog.html`);

  } catch (e) {
    console.error("💥 Denver Fail:", e.message);
  }
}

runDenverStrike();
