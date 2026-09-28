const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const p = html.indexOf('<section id="portfolio"');
const end = html.indexOf('id="portfolioGrid"', p);
console.log(html.slice(p, end));
