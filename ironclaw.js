const fs = require('fs');
const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
require('dotenv').config();

console.log("🦅 Commencing IronClaw SEO Swarm Strike for Quick Accurate Books.");

// The API Key will be injected via GitHub Actions Secrets (or manually)
const apiKey = process.env.GEMINI_API_KEY || 'PLACEHOLDER_API_KEY';

if (apiKey === 'PLACEHOLDER_API_KEY') {
  console.log("No valid API Key found. To enable Ironclaw to run autonomously:");
  console.log("1. Get a free Gemini API key from Google AI Studio.");
  console.log("2. Set the GEMINI_API_KEY environment variable.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function runIronclaw() {
  console.log("🔍 Swarm Analysis: High-Intent Revenue Keywords for Thornton...");
  console.log("🏗️ Swarm Deployment: 3-Stage Content Architecture Initiated...");

  const prompt = `
    You are an Elite AI Swarm of 13 sovereign agents working for "Quick Accurate Books", based in Thornton, Colorado.
    Generate a highly authoritative, mission-ready, long-form SEO blog post.
    The goal is to drive absolute trust and immediate conversion for small business bookkeeping.
    
    INVENT Top-Tier Topics: e.g. "The Multiplier Effect: Turning Bookkeeping into Revenue Intelligence", "Sovereign Bookkeeping vs The Hiring Trap", "The 44-Point Structural Audit for Thornton Small Businesses."
    Style: Aggressive, executive, no fluff, high-impact contractions. Use a "Sovereign Node" narrative—QAB is the intelligent edge of your business.
    
    IMPORTANT: Mention "BioDynamX Sovereign Engineering" as the AI engine behind QAB in at least one paragraph to help with cross-domain SEO.
    
    IMPORTANT: Reply ONLY with valid JSON.
    CRITICAL: The entire JSON response MUST be fully minified. The "content" value MUST be on a single physical line with NO RAW NEWLINES (\\n) and NO RAW TABS (\\t). 

    The JSON must contain exact properties:
    {
      "title": "A catchy, SEO optimized Title (Elite/Premium tone)",
      "slug": "kebab-case-slug-for-the-url",
      "excerpt": "A 2-sentence SEO optimized snippet describing the article.",
      "category": "e.g., Financial Strategy, Tax Preparation, or Bookkeeping",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "imagePrompt": "A highly detailed cinematic, high-impact prompt. Focus on 'dynamic data-flow', 'liquid gold tech', or 'futuristic Thornton skyline'. Explicitly mention 'motion blur' and 'animated lighting' to imply activity. Cinematic 8k photography style.",
      "content": "The actual HTML for the blog post. Include ONLY the inner HTML of the article (e.g., <h2>, <p>, <ul>, <blockquote>). Use Web 4.0 formatting (glassmorphism references, bold keywords, mission-critical tone). MUST be long-form: provide at least 1500 words of dense, valuable content. Include structured lists and one 'Sovereign Insight' blockquote."
    }
  `;

  try {
    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        title: { type: SchemaType.STRING },
        slug: { type: SchemaType.STRING },
        excerpt: { type: SchemaType.STRING },
        category: { type: SchemaType.STRING },
        tags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        imagePrompt: { type: SchemaType.STRING },
        content: { type: SchemaType.STRING, description: "HTML content entirely minified onto one single string line with no raw /n escape sequences." }
      },
      required: ["title", "slug", "excerpt", "category", "tags", "imagePrompt", "content"]
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.9
      }
    });
    const result = await model.generateContent(prompt);
    let rawText = result.response.text().trim();

    // Enhanced JSON extraction
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    let blogData;
    try {
      blogData = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.log("Initial JSON parse failed, attempting cleanup...");
      // Remove possible problematic characters
      const cleaned = jsonMatch[0]
        .replace(/\\n/g, "\\n")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t");
      blogData = JSON.parse(cleaned);
    }

    console.log(`Successfully generated new blog: ${blogData.title}`);

    // Generate the AI Image URL via Pollinations.ai
    const encodedPrompt = encodeURIComponent(blogData.imagePrompt);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1200&height=630&seed=${Math.floor(Math.random() * 100000)}&nologo=true&model=flux`;
    console.log(`Generated matching AI image: ${imageUrl}`);

    // Read the master template
    let masterTemplate = fs.readFileSync('tax-season-stress-free-guide.html', 'utf8');

    // Replace the specific Title
    masterTemplate = masterTemplate.replace(/<title>.*?<\/title>/, `<title>${blogData.title} | Quick Accurate Books</title>`);
    masterTemplate = masterTemplate.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${blogData.title} | Quick Accurate Books"`);
    masterTemplate = masterTemplate.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${blogData.excerpt}"`);
    masterTemplate = masterTemplate.replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${blogData.excerpt}"`);
    masterTemplate = masterTemplate.replace(/<link rel='canonical' href='.*?'/, `<link rel='canonical' href='https://quickaccuratebooks.com/${blogData.slug}.html'`);
    masterTemplate = masterTemplate.replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content='https://quickaccuratebooks.com/${blogData.slug}.html'`);
    masterTemplate = masterTemplate.replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${imageUrl}"`);

    // Replace the Category
    masterTemplate = masterTemplate.replace(/<span class='category'>.*?<\/span>/, `<span class='category'>${blogData.category}</span>`);

    // Replace the hero header (The template uses <h1> directly inside <header class='blog-hero'>)
    masterTemplate = masterTemplate.replace(/<header class='blog-hero'>[\s\S]*?<h1>.*?<\/h1>/, `<header class='blog-hero'>\n        <div class='container'>\n            <span class='category'>${blogData.category}</span>\n            <h1>${blogData.title}</h1>`);

    // Replace the dynamic read time
    const wordCount = blogData.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    masterTemplate = masterTemplate.replace(/<span>•<\/span>\s*<span>.*? min read<\/span>/, `<span>•</span>\n                <span>${readTime} min read</span>`);

    // Replace the date
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const todayShort = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    masterTemplate = masterTemplate.replace(/<span>•<\/span>\s*<span>[A-Z][a-z]+ \d{4}<\/span>/, `<span>•</span>\n                <span>${todayShort}</span>`);

    // Add Image to Content
    const imageHtml = `<div style="margin-bottom: 40px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"><img src="${imageUrl}" alt="${blogData.title}" style="width: 100%; display: block;"></div>`;
    const finalContent = `${imageHtml}\n${blogData.content}\n<p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;"><strong>Tags:</strong> ${blogData.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')}</p>`;

    // Replace the content block. The template uses <article class="article-body">
    const contentRegex = /<article class='article-body'>[\s\S]*?<div style='margin-top: 80px;/;
    masterTemplate = masterTemplate.replace(contentRegex, `<article class='article-body'>\n${finalContent}\n<div style='margin-top: 80px;`);

    // Write the new HTML file out
    const fileName = `${blogData.slug}.html`;
    fs.writeFileSync(fileName, masterTemplate);
    console.log(`Saved new blog file: ${fileName}`);

    // Update the blog.html grid
    let blogIndex = fs.readFileSync('blog.html', 'utf8');

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
                    <div class="blog-preview-meta" style="margin-top: 20px; border-top: 1px solid var(--gray-100); padding-top: 15px; font-size: 13px; color: var(--gray-400); display: flex; gap: 15px; font-weight: 600;">
                        <span>👤 Tanya L. Frank</span>
                        <span>📅 ${today}</span>
                    </div>
                </div>
            </article>
            <!-- [IRONCLAW_HOOK] -->`;

    blogIndex = blogIndex.replace('<!-- [IRONCLAW_HOOK] -->', newPreviewCard);
    fs.writeFileSync('blog.html', blogIndex);
    console.log("Updated blog.html directory index.");

    // Generate/Update sitemap.xml
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
    fs.writeFileSync('sitemap.xml', sitemapContent);
    console.log("Updated and rebuilt sitemap.xml for SEO Indexing.");

    console.log("Ironclaw complete. Exiting gracefully.");

  } catch (error) {
    console.error("Ironclaw encountered a fatal error during AI generation:", error);
    process.exit(1);
  }
}

runIronclaw();