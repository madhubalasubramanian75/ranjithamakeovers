const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /src=["']([^"']+)["']/g;
let match;
const results = [];
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  if (src.includes('assets/')) {
    const cleanPath = src.startsWith('/') ? src.slice(1) : src;
    const exists = fs.existsSync(cleanPath);
    results.push({ src, exists });
  }
}
console.log(JSON.stringify(results, null, 2));
