const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/data-cat="([^"]+)"/g)].map(m => m[1]);
console.log('Total items with data-cat:', matches.length);

const counts = {};
matches.forEach(c => {
  counts[c] = (counts[c] || 0) + 1;
});
console.log('Category breakdown:');
console.log(JSON.stringify(counts, null, 2));

// Check filter buttons
const filterMatches = [...html.matchAll(/<button class="rounded-full border[^>]*>([^<]+)<\/button>/g)].map(m => m[1].trim());
console.log('\nFilter buttons found:', filterMatches);
