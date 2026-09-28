const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Check script blocks for syntax errors
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
console.log(`Found ${scripts.length} script blocks.`);

scripts.forEach((s, idx) => {
  try {
    new Function(s[1]);
    console.log(`Script block ${idx + 1}: Valid syntax`);
  } catch (err) {
    console.error(`Script block ${idx + 1} ERROR:`, err.message);
  }
});

// Check count of image buttons in portfolio
const btnMatches = html.match(/<button class="group relative overflow-hidden rounded-md/g);
console.log(`Portfolio images count: ${btnMatches ? btnMatches.length : 0}`);
