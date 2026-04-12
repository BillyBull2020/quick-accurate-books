/**
 * 🦅 IronClaw SEO Swarm Strike for Quick Accurate Books
 * ZERO-COST AUTOPILOT (2026 Optimized)
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log("🦅 Commencing IronClaw SEO Swarm Strike for Quick Accurate Books.");

const geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey) {
  console.error("❌ ERROR: No GEMINI_API_KEY found.");
  process.exit(1);
}

async function generateWithAI(prompt) {
  console.log("♊ Using Direct Gemini Free Tier (gemini-pro-latest)...");
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(geminiKey);
  // Optimized for 2026 standard free tier
  const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function runIronclaw() {
  console.log("🔍 Swarm Analysis: High-Intent Revenue Keywords for Thornton...");

  const prompt = `
    You are an Elite AI Swarm working for "Quick Accurate Books", based in Thornton, Colorado.
    Generate a high-impact, long-form SEO blog post ($0.00 AI Cost).
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

    console.log(`✅ Generated: ${blogData.title}`);

    const refinedImagePrompt = `${blogData.imagePrompt}, golden hour lighting, cinematic resolution, ultra-detailed`.replace(/\s+/g, ' ');
    const encodedPrompt = encodeURIComponent(refinedImagePrompt);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1200&height=630&seed=${Math.floor(Math.random() * 100000)}&nologo=true&model=flux`;

    const templatePath = path.join(__dirname, 'tax-season-stress-free-guide.html');
    let masterTemplate = fs.readFileSync(templatePath, 'utf8');

    masterTemplate = masterTemplate.replace(/<title>.*?<\/title>/, `<title>${blogData.title} | Quick Accurate Books</title>`);
    masterTemplate = masterTemplate.replace(/<meta property="og:title" content=".*?"/g, `<meta property="og:title" content="${blogData.title} | Quick Accurate Books"`);
    masterTemplate = masterTemplate.replace(/<meta name="description" content=".*?"/g, `<meta name="description" content="${blogData.excerpt}"`);
    masterTemplate = masterTemplate.replace(/<meta property="og:description" content=".*?"/g, `<meta property="og:description" content="${blogData.excerpt}"`);
    masterTemplate = masterTemplate.replace(/<link rel='canonical' href='.*?'/g, `<link rel='canonical' href='https://quickaccuratebooks.com/${blogData.slug}.html'`);
    masterTemplate = masterTemplate.replace(/<meta property="og:url" content=".*?"/g, `<meta property="og:url" content='https://quickaccuratebooks.com/${blogData.slug}.html'`);
    masterTemplate = masterTemplate.replace(/<meta property="og:image" content=".*?"/g, `<meta property="og:image" content="${imageUrl}"`);

    masterTemplate = masterTemplate.replace(/<span class='category'>.*?<\/span>/g, `<span class='category'>${blogData.category}</span>`);
    masterTemplate = masterTemplate.replace(/<header class='blog-hero'>[\s\S]*?<h1>.*?<\/h1>/, `<header class='blog-hero'>\n        <div class='container'>\n            <span class='category'>${blogData.category}</span>\n            <h1>${blogData.title}</h1>`);

    const wordCount = blogData.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const todayShort = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

    masterTemplate = masterTemplate.replace(/<span>•<\/span>\s*<span>.*? min read<\/span>/, `<span>•</span>\n                <span>${readTime} min read</span>`);
    masterTemplate = masterTemplate.replace(/<span>•<\/span>\s*<span>[A-Z][a-z]+ \d{4}<\/span>/g, `<span>•</span>\n                <span>${todayShort}</span>`);

    const imageHtml = `<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"><img src="${imageUrl}" alt="${blogData.title}" style="width: 100%; display: block;"></div>`;
    const finalContentHtml = `${imageHtml}\n${blogData.content}\n<p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;"><strong>Tags:</strong> ${blogData.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}</p>`;

    const contentRegex = /<article class='article-body'>[\s\S]*?<div style='margin-top: 80px;/;
    masterTemplate = masterTemplate.replace(contentRegex, `<article class='article-body'>\n${finalContentHtml}\n<div style='margin-top: 80px;`);

    const fileName = `${blogData.slug}.html`;
    fs.writeFileSync(path.join(__dirname, fileName), masterTemplate);

    let blogIndex = fs.readFileSync(path.join(__dirname, 'blog.html'), 'utf8');
    const newPreviewCard = `
            <article class="blog-preview">
                <div class="blog-preview-image" style="height: 300px; overflow: hidden; border-radius: 20px 20px 0 0;">
                    <img src="${imageUrl}" alt="${blogData.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="blog-preview-content">
                    <span class="blog-preview-category">${blogData.category}</span>
                    <h2>${blogData.title}</h2>
                    <p>${blogData.excerpt}</p>
                    <a href="${fileName}" class="read-more">Read Full Guide →</a>
                    <div class="blog-preview-meta" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px; font-size: 13px; color: #666; display: flex; gap: 15px; font-weight: 600;">
                        <span>👤 Tanya L. Frank</span>
                        <span>📅 ${today}</span>
                    </div>
                </div>
            </article>
            <!-- [IRONCLAW_HOOK] -->`;

    blogIndex = blogIndex.replace('<!-- [IRONCLAW_HOOK] -->', newPreviewCard);
    fs.writeFileSync(path.join(__dirname, 'blog.html'), blogIndex);

    const allFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html') && !['blog.html', 'index.html', 'glossary.html', 'privacy.html', 'terms.html'].includes(file));
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://quickaccuratebooks.com/</loc><priority>1.0</priority></url>
  <url><loc>https://quickaccuratebooks.com/blog.html</loc><priority>0.9</priority></url>
`;
    allFiles.forEach(file => {
      sitemapContent += `  <url>
    <loc>https://quickaccuratebooks.com/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });
    sitemapContent += `</urlset>`;
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent);

    const socialLog = `
SOCIAL RECON - [${new Date().toISOString()}]
PROJECT: QAB
TITLE: ${blogData.title}
SLUG: ${blogData.slug}
IMAGE: ${imageUrl}

FACEBOOK:
${blogData.facebookCopy}

LINKEDIN:
${blogData.linkedinCopy}
--------------------------------------------------
`;
    fs.appendFileSync(path.join(__dirname, 'IRONCLAW_SOCIAL_RECON.log'), socialLog);

  } catch (error) {
    console.error("💥 Ironclaw encountered a fatal error:", error);
    process.exit(1);
  }
}

runIronclaw();