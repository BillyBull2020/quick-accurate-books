import fs from 'fs';
import path from 'path';

const blogPath = '/Users/bdlt/BioD2026/QuickAccutrateBooks/blog.html';
const content = fs.readFileSync(blogPath, 'utf8');

// Use regex to find all <article> blocks
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
articles.sort((a, b) => extractDate(b) - extractDate(a));

// Spread out dates if they are the same
const finalArticles = [];
let currentDate = new Date(); // Start from today
currentDate.setHours(0, 0, 0, 0);

// We'll work backwards from today for the display (or just respect their existing dates but ensure 1/day)
// Actually, let's just ensure they are in desc order and if two have same date, we move one back.
const datesSeen = new Set();

const processedArticles = articles.map((art, index) => {
    let date = extractDate(art);

    // If the date is 0 (not found) or we want to spread them out:
    // Let's just force a daily schedule starting from March 30 downwards for the old ones
    // Or just keep them but ensure unique.

    let dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    while (datesSeen.has(dateString)) {
        date.setDate(date.getDate() - 1);
        dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    datesSeen.add(dateString);

    // Replace the date in the article string
    const newArt = art.replace(/(<span>📅\s*)([A-Za-z]+ \d{1,2}, \d{4})(<\/span>)/, `$1${dateString}$3`)
        .replace(/(<span>)([A-Za-z]+ \d{1,2}, \d{4})(<\/span>)/, `$1${dateString}$3`);
    return newArt;
});

// Rebuild the HTML
const gridStart = content.indexOf("<div class='blog-grid'>");
const gridEnd = content.lastIndexOf("</div>", content.indexOf("<footer") - 1);

const beforeGrid = content.substring(0, gridStart + "<div class='blog-grid'>".length);
const afterGrid = content.substring(gridEnd);

const newGridContent = `\n            <!-- [IRONCLAW_HOOK] -->\n            ` + processedArticles.join('\n            ');

const finalHtml = beforeGrid + newGridContent + afterGrid;

fs.writeFileSync(blogPath, finalHtml);
console.log("Successfully reordered blogs and moved the [IRONCLAW_HOOK] to the top.");
