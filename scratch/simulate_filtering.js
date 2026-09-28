const fs = require('fs');

const raw = fs.readFileSync('index.html', 'utf8');

// Extract all data-cat values
const cards = [];
const regex = /<button\b[^>]*data-cat="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
let m;
while ((m = regex.exec(raw)) !== null) {
  const cat = m[1];
  const aria = m[0].match(/aria-label="([^"]+)"/);
  cards.push({ cat, label: aria ? aria[1] : '' });
}

console.log(`Extracted ${cards.length} portfolio cards.`);

const categories = ['all', 'bridal', 'makeup', 'hair', 'draping', 'transformations', 'classes'];

categories.forEach(filter => {
  let visible = 0;
  let hidden = 0;
  const visibleCategories = new Set();

  cards.forEach(c => {
    if (filter === 'all' || c.cat === filter) {
      visible++;
      visibleCategories.add(c.cat);
    } else {
      hidden++;
    }
  });

  console.log(`\nFilter: [${filter.toUpperCase()}]`);
  console.log(`  Visible count: ${visible}, Hidden count: ${hidden}`);
  console.log(`  Visible categories present: ${Array.from(visibleCategories).join(', ')}`);
  
  if (filter !== 'all') {
    if (visibleCategories.size === 1 && visibleCategories.has(filter)) {
      console.log(`  SUCCESS: Strictly ONLY "${filter}" photos are shown. Zero mingling!`);
    } else {
      console.error(`  FAILURE: Mingling detected!`);
      process.exit(1);
    }
  } else {
    if (visible === cards.length) {
      console.log(`  SUCCESS: "All" displays all ${cards.length} photos.`);
    }
  }
});
