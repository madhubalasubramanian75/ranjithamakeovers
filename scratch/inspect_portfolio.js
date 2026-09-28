const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('<section id="portfolio"');
const end = html.indexOf('</section>', start) + '</section>'.length;
console.log(html.slice(start, end));
