const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find inputs
const inputs = [...html.matchAll(/<input[^>]*>/gi)].map(m => m[0]);
console.log('Inputs found:', inputs);

// Find images without width or height
const imgs = [...html.matchAll(/<img[^>]*>/gi)].map(m => m[0]);
console.log('Total images found:', imgs.length);

const missingDims = imgs.filter(img => !img.includes('width=') || !img.includes('height='));
console.log('Images missing explicit dimensions:', missingDims.length);
missingDims.slice(0, 5).forEach((img, i) => console.log(`Sample ${i + 1}:`, img));
