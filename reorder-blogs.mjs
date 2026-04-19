import fs from 'fs';
import path from 'path';

const blogPath = '/Users/bdlt/BioD2026/QuickAccutrateBooks/blog.html';
const content = fs.readFileSync(blogPath, 'utf8');

// Use regex to find all <article> blocks
// We use a non-greedy match that respects the nested structure of our articles
const articleRegex = /<article[\s\S]*?<\/article>/g;
const articles = content.match(articleRegex) || [];

console.log(`Found ${articles.length} articles.`);

// Function to extract date from an article
function extractDate(article) {
    const dateMatch = article.match(/<span>📅\s*([A-Za-z]+ \d{1,2}, \d{4})<\/span>/) ||
        article.match(/<span>([A-Za-z]+ \d{1,2}, \d{4})<\/span>/);
    if (!dateMatch) return new Date(0);
    return new Date(dateMatch[1]);
}

// Sort articles by date (Newest first)
articles.sort((a, b) => {
    const dateA = extractDate(a);
    const dateB = extractDate(b);
    return dateB - dateA;
});

// Process articles to ensure consistent formatting and valid dates
const processedArticles = articles.map((art) => {
    const date = extractDate(art);
    // If date is invalid, we don't change it, but we log it
    if (date.getTime() === 0) {
        console.warn("Could not find date in article:", art.substring(0, 100));
        return art;
    }

    const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Ensure all use the 📅 emoji if they are modern
    let newArt = art;
    if (art.includes('👤') && !art.includes('📅')) {
         newArt = art.replace(/(<span>)([A-Za-z]+ \d{1,2}, \d{4})(<\/span>)/, `$1📅 $2$3`);
    }

    return newArt;
});

// Rebuild the HTML - Find the grid container precisely
const gridStartTag = "<div class='blog-grid'>";
const gridStartIndex = content.indexOf(gridStartTag);
if (gridStartIndex === -1) {
    console.error("Could not find blog grid start!");
    process.exit(1);
}

// Find the end index - it's the </div> before the footer or navigation
const footerIndex = content.indexOf("<footer");
const gridEndIndex = content.lastIndexOf("</div>", footerIndex);

const beforeGrid = content.substring(0, gridStartIndex + gridStartTag.length);
const afterGrid = content.substring(gridEndIndex);

// Add the hook at the TOP of the grid
const hookContent = `\n            <!-- [IRONCLAW_HOOK] -->\n            `;
const newHtml = beforeGrid + hookContent + processedArticles.join('\n            ') + afterGrid;

fs.writeFileSync(blogPath, newHtml);
console.log("Successfully reordered blogs and placed [IRONCLAW_HOOK] at the top.");
