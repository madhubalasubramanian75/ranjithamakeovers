const fs = require('fs');

const raw = fs.readFileSync('index.html', 'utf8');
const lines = raw.split('\n');

const cleaned = raw;

const sectionRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/g;
let match;
let i = 1;
while ((match = sectionRegex.exec(cleaned)) !== null) {
  const attrs = match[1];
  const body = match[2];
  const h = body.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/);
  const p = body.match(/<p class="eyebrow">(.*?)<\/p>/);
  console.log(`${i}. attrs: ${attrs.trim()} | title: ${h ? h[1] : (p ? p[1] : 'No heading')}`);
  i++;
}

console.log('\nButtons in #portfolio:');
const pMatch = cleaned.match(/<section id="portfolio"[\s\S]*?<\/section>/);
if (pMatch) {
  const buttons = pMatch[0].match(/<button\b[^>]*data-cat="([^"]+)"[^>]*>/g) || [];
  console.log('Total data-cat buttons:', buttons.length);
  const counts = {};
  buttons.forEach(b => {
    const cat = b.match(/data-cat="([^"]+)"/)[1];
    counts[cat] = (counts[cat] || 0) + 1;
  });
  console.log('Category counts:', counts);
}
