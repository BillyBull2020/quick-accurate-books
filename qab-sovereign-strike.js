/**
 * 🦅 Quick Accurate Books - FINANCIAL SECTOR STRIKE (Internal)
 * Target: Thornton Professional Bookkeeping.
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
  console.log("🦅 QAB (Thornton) Financial Strike: Internal SEO Production Only...");

    const prompt = `
    You are an AI for Quick Accurate Books, Thornton, Colorado.
    Target: Small Businesses and Professional Services in Thornton (Bookkeeping and Accounting).
    Topic: "Revenue Leak Audit: Why Thornton small businesses are losing thousands in hidden costs and unrecorded expenses."
    
    Return ONLY a JSON object:
    {
      "title": "Thornton Revenue Leak Audit: Stop Losing Profit to Outdated Bookkeeping",
      "slug": "thornton-business-bookkeeping-audit-UNIQUE_ID",
      "content": "Full inner HTML content (~1000 words). Highly professional, actionable bookkeeping advice for Thornton small business owners. Use <h2> and <p> tags. Focus on reconciliation, profit margins, and accurate numbers. NEVER mention roofing."
    }
    `;

  try {
    let aiResponseRaw = await generateWithAI(prompt);
    
    if (!aiResponseRaw && process.env.OPENROUTER_API_KEY) {
        console.log("🦅 QAB: Google APIs exhausted. Falling back to OpenRouter...");
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
        console.error("💥 QAB Fail: No AI response generated.");
        return;
    }
    const jsonStr = aiResponseRaw.substring(aiResponseRaw.indexOf('{'), aiResponseRaw.lastIndexOf('}') + 1);
    const blogData = JSON.parse(jsonStr);

    // Ensure unique slug
    blogData.slug = blogData.slug.replace('UNIQUE_ID', Math.random().toString(36).substring(7));

    console.log(`✅ QAB Internal Financial Blog Generated: ${blogData.title}`);

    const fileName = `${blogData.slug}.html`;
    
    // 🔥 NANA BANANA IMAGE ENGINE FOR QAB
    const refinedImagePrompt = `Professional bookkeeping, financial accounting for Thornton small businesses, ${blogData.title}, clean, corporate, high quality`.replace(/\s+/g, ' ');
    const imageToUse = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedImagePrompt)}?width=1200&height=630&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

    // 1. Build the full HTML file
    const fullHtml = `<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>${blogData.title} | Quick Accurate Books</title>
    <meta name='description' content='${blogData.title} - Expert bookkeeping insights for Thornton businesses.'>
    <link rel='canonical' href='https://quickaccuratebooks.com/${fileName}'>
    <link rel='stylesheet' href='styles.css?v=50'>
    <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap' rel='stylesheet'>
    <style>
        body { background: var(--gray-50); line-height: 1.8; color: var(--gray-800); }
        .blog-hero { padding: 160px 24px 80px; background: linear-gradient(135deg, var(--dark), var(--gray-800)); color: var(--white); text-align: center; position: relative; }
        .blog-hero .category { display: inline-block; background: rgba(20, 184, 166, 0.2); color: var(--accent-green); padding: 6px 16px; border-radius: 50px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; border: 1px solid rgba(20, 184, 166, 0.4); }
        .blog-hero h1 { font-family: var(--font-display); font-size: 56px; line-height: 1.1; margin-bottom: 30px; max-width: 900px; margin: 0 auto; }
        .blog-meta { display: flex; align-items: center; justify-content: center; gap: 24px; margin-top: 40px; opacity: 0.8; font-size: 15px; }
        .blog-meta .author-info { display: flex; align-items: center; gap: 12px; }
        .blog-meta img { width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--accent-green); object-fit: cover; }
        .blog-layout { display: grid; grid-template-columns: 1fr 340px; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 24px; align-items: flex-start; }
        .article-body { background: var(--white); padding: 60px; border-radius: 24px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); font-size: 19px; font-weight: 300; }
        .article-body h2, .article-body h3 { font-family: var(--font-display); font-size: 32px; color: var(--dark); margin: 60px 0 24px; padding-bottom: 12px; border-bottom: 2px solid var(--gray-100); }
        .article-body p { margin-bottom: 24px; }
        .article-body ul, .article-body ol { margin: 0 0 32px 24px; padding: 0; }
        .article-body li { margin-bottom: 16px; padding-left: 12px; }
        .blog-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 30px; }
        .author-card { background: var(--white); padding: 40px 30px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); border-top: 5px solid var(--primary-green); }
        .author-card img { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; border: 3px solid var(--gray-100); }
        .author-card h4 { font-family: var(--font-display); font-size: 20px; color: var(--dark); margin-bottom: 8px; }
        .author-card p { font-size: 14px; color: var(--gray-600); margin-bottom: 24px; }
        @media (max-width: 1024px) { .blog-layout { grid-template-columns: 1fr; } .blog-sidebar { position: static; } }
        @media (max-width: 768px) { .blog-hero h1 { font-size: 38px; } .article-body { padding: 30px 24px; } .article-body h3, .article-body h2 { font-size: 26px; } }
    </style>
</head>
<body>
    <nav class="navbar" style="background: rgba(2, 6, 23, 0.9); backdrop-filter: blur(20px); border-bottom: 2px solid var(--primary-blue);">
        <div class="container">
            <a href="index.html" class="logo" style="text-decoration: none;">
                <span class="logo-quick" style="color: white;">Quick</span><span class="logo-accurate" style="color: var(--accent-green);">Accurate</span>
                <span class="logo-books" style="color: rgba(255,255,255,0.5); border-top: 3px solid var(--primary-blue);">BOOKS</span>
            </a>
            <div class="nav-links">
                <a href="index.html#services">Services</a>
                <a href="blog.html" style="color: var(--accent-green); font-weight: 700;">Blog</a>
                <a href="glossary.html">Glossary</a>
                <a href="index.html#contact" class="btn-primary cta-button">Free Consultation</a>
            </div>
        </div>
    </nav>
    <header class='blog-hero'>
        <div class='container'>
            <span class='category'>Financial Audit</span>
            <h1>${blogData.title}</h1>
            <div class='blog-meta'>
                <div class='author-info'>
                    <img src='tanya-frank.jpg' alt='Tanya L. Frank'>
                    <span>Written by Tanya L. Frank</span>
                </div>
                <span>•</span>
                <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>5 min read</span>
            </div>
        </div>
    </header>
    <div class='blog-layout'>
        <article class='article-body'>
            ${blogData.content}
        </article>
        <aside class='blog-sidebar'>
            <div class='author-card'>
                <img src='tanya-frank.jpg' alt='Tanya Frank'>
                <h4>Tanya L. Frank</h4>
                <p>Founder & Intuit Certified QuickBooks Expert with 20+ Years Experience mapping financial paths for startups and SMBs.</p>
                <a href='index.html#about'>Meet Tanya →</a>
            </div>
        </aside>
    </div>
    <footer style='background: var(--dark); color: var(--gray-600); padding: 40px 0; text-align: center; font-size: 14px;'>
        <p>© ${new Date().getFullYear()} Quick Accurate Books. All rights reserved.</p>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, fileName), fullHtml);
    console.log(`✅ QAB File Written: ${fileName}`);

    // 2. Inject into blog.html
    const blogPath = path.join(__dirname, 'blog.html');
    let blogContent = fs.readFileSync(blogPath, 'utf8');

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const excerpt = blogData.content.replace(/<[^>]+>/g, ' ').substring(0, 150) + "...";
    
    const newCard = `<article class="blog-preview">
                <div class="blog-preview-image">
                    <img src="${imageToUse}" alt="${blogData.title}">
                </div>
                <div class="blog-preview-content">
                    <span class="blog-preview-category">Financial Audit</span>
                    <h2>${blogData.title}</h2>
                    <p>${excerpt}</p>
                    <div class="blog-preview-meta">
                        <span>👤 Tanya L. Frank</span>
                        <span>📅 ${dateStr}</span>
                    </div>
                    <a href="${fileName}" class="read-more">Read Full Audit →</a>
                </div>
            </article>`;

    blogContent = blogContent.replace('<!-- [IRONCLAW_HOOK] -->', `<!-- [IRONCLAW_HOOK] -->\n            ${newCard}`);
    fs.writeFileSync(blogPath, blogContent);

    console.log(`🚀 QAB SEO LIVE: ${fileName} injected into blog.html`);

  } catch (e) {
    console.error("💥 QAB Fail:", e.message);
  }
}

runIronclaw();