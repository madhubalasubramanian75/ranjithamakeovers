const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const p1 = html.indexOf('<section id="portfolio"');
const p2 = html.indexOf('<section id="portfolio"', p1 + 1);

console.log('p1:', p1);
console.log('p2:', p2);

// Check if there are duplicate sections
if (p2 !== -1) {
  console.log('DUPLICATE SECTION DETECTED at', p2);
  const endP2 = html.indexOf('</section>', p2) + '</section>'.length;
  console.log('Removing duplicate section from', p2, 'to', endP2);
  const cleaned = html.slice(0, p2) + html.slice(endP2);
  fs.writeFileSync('index.html', cleaned, 'utf8');
  console.log('Duplicate portfolio section removed successfully!');
} else {
  console.log('No duplicate section found.');
}
