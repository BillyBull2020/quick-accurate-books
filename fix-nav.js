const fs = require('fs');
const glob = require('glob');
const path = require('path');

const correctNav = `    <nav class="navbar" style="background: rgba(2, 6, 23, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <a href="index.html" class="logo" style="text-decoration: none;">
                <span class="logo-quick" style="color: white;">Quick</span><span class="logo-accurate" style="color: var(--accent-green);">Accurate</span>
                <span class="logo-books" style="color: rgba(255,255,255,0.5);">BOOKS</span>
            </a>
            <button class="mobile-menu-btn" aria-label="Toggle menu">
                <span style="background-color: white;"></span>
                <span style="background-color: white;"></span>
                <span style="background-color: white;"></span>
            </button>
            <div class="nav-links">
                <a href="index.html#services">Services</a>
                <a href="blog.html" style="color: var(--accent-green); font-weight: 700;">Blog</a>
                <a href="glossary.html">Glossary</a>
                <a href="index.html#contact" class="btn-primary cta-button">Free Consultation</a>
            </div>
        </div>
    </nav>`;

const scriptTag = `<script defer src="script.js?v=4"></script>\n</body>`;
const badNavRegex = /<nav class=['"]navbar['"][\s\S]*?<\/nav>/i;
const bodyEndRegex = /<\/body>/i;

const files = glob.sync('*.html');

for (const file of files) {
  if (file === 'index.html') continue;
  
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace bad nav
  if (content.match(badNavRegex)) {
    content = content.replace(badNavRegex, correctNav);
    changed = true;
  }

  // Ensure script.js is loaded
  if (!content.includes('script.js')) {
    content = content.replace(bodyEndRegex, scriptTag);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated nav/script for ${file}`);
  }
}
console.log('Done fixing HTML files!');
