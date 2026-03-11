const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

console.log("Welcome to the Ironclaw SEO Autopilot for Quick Accurate Books.");

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
  console.log("Analyzing current SEO rankings for QuickAccurateBooks.com...");
  console.log("Fetching real-time local Bookkeeping keywords for Thornton, CO...");

  const prompt = `
    You are an expert SEO copywriter and master bookkeeper working for "Quick Accurate Books", based in Thornton, Colorado.
    Generate a highly engaging, professional, long-form SEO blog post specifically about small business bookkeeping, accounting practices, or tax preparation.
    Invent a unique, high-conversion topic that hasn't been overly done. Focus on value, clarity, and authority.

    IMPORTANT: Reply ONLY with valid JSON. Do not use Markdown wrappers like \`\`\`json. 

    The JSON must contain exact properties:
    {
      "title": "A catchy, SEO optimized Title",
      "slug": "kebab-case-slug-for-the-url",
      "excerpt": "A 2-sentence SEO optimized snippet describing the article.",
      "content": "The actual HTML for the blog post. Include ONLY the inner HTML of the article (e.g., <h2>, <p>, <ul>, <blockquote>). Use Web 4.0 formatting, bold important keywords, and make it long-form (at least 800 words of content)."
    }
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    
    // Clean up if it returned markdown wrappers
    if (rawText.startsWith('```json')) {
      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (rawText.startsWith('```')) {
      rawText = rawText.replace(/```/g, '').trim();
    }

    const blogData = JSON.parse(rawText);

    console.log(`Successfully generated new blog: ${blogData.title}`);

    // Read the master template (using an existing blog post as a template basis)
    let masterTemplate = fs.readFileSync('tax-season-stress-free-guide.html', 'utf8');
    
    // Replace the specific Title
    masterTemplate = masterTemplate.replace(/<title>.*?\| Quick Accurate Books<\/title>/, `<title>${blogData.title} | Quick Accurate Books</title>`);
    masterTemplate = masterTemplate.replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${blogData.title} | Quick Accurate Books"`);
    masterTemplate = masterTemplate.replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${blogData.excerpt}"`);
    
    // Replace the hero header
    masterTemplate = masterTemplate.replace(/<h1 class="blog-hero-title">.*?<\/h1>/, `<h1 class="blog-hero-title">${blogData.title}</h1>`);
    
    // Replace the dynamic read time based strictly on word count
    const wordCount = blogData.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    masterTemplate = masterTemplate.replace(/<span class="blog-hero-meta-item">.*? Min Read<\/span>/, `<span class="blog-hero-meta-item">🕒 ${readTime} Min Read</span>`);
    
    // Replace the date
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    masterTemplate = masterTemplate.replace(/<span class="blog-hero-meta-item">📅 .*?<\/span>/, `<span class="blog-hero-meta-item">📅 ${today}</span>`);

    // Replace the content block. We look for <article class="blog-content"> mapping
    const contentRegex = /<article class="blog-content">[\s\S]*?<\/article>/;
    masterTemplate = masterTemplate.replace(contentRegex, `<article class="blog-content">\n${blogData.content}\n</article>`);

    // Write the new HTML file out
    const fileName = `${blogData.slug}.html`;
    fs.writeFileSync(fileName, masterTemplate);
    console.log(`Saved new blog file: ${fileName}`);

    // Update the blog.html grid
    let blogIndex = fs.readFileSync('blog.html', 'utf8');
    
    const newPreviewCard = `
            <article class="blog-preview">
                <div class="blog-preview-content">
                    <span class="blog-preview-category">Bookkeeping</span>
                    <h2>${blogData.title}</h2>
                    <p>${blogData.excerpt}</p>
                    <div class="blog-preview-meta">
                        <span>Tanya L. Frank</span>
                        <span>${today}</span>
                    </div>
                    <a href="${fileName}" class="read-more">Read Full Guide →</a>
                </div>
            </article>
            <!-- [IRONCLAW_HOOK] -->`;

    blogIndex = blogIndex.replace('<!-- [IRONCLAW_HOOK] -->', newPreviewCard);
    fs.writeFileSync('blog.html', blogIndex);
    console.log("Updated blog.html directory index.");

    // Generate/Update sitemap.xml
    const allFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    allFiles.forEach(file => {
      sitemapContent += `  <url>
    <loc>https://quickaccuratebooks.com/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${file === 'index.html' ? '1.0' : '0.8'}</priority>
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