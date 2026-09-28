const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add grid-flow-dense to portfolio grid
html = html.replace(
  'id="portfolioGrid"',
  'id="portfolioGrid" style="grid-auto-flow: dense;"'
);

// Ensure filter buttons have type="button" and cursor-pointer
html = html.replace(
  '<button\r\n\t\t\t\t\t\t\tclass="rounded-full border px-4 py-2 text-xs transition border-champagne bg-champagne text-wine">All</button>',
  '<button type="button" class="rounded-full border px-4 py-2 text-xs transition border-champagne bg-champagne text-wine font-semibold cursor-pointer">All</button>'
);

const filterNames = ['Bridal', 'Makeup', 'Hair', 'Draping', 'Transformations', 'Classes'];
filterNames.forEach(fn => {
  html = html.replace(
    new RegExp(`<button[^>]*>${fn}</button>`, 'g'),
    `<button type="button" class="rounded-full border px-4 py-2 text-xs transition border-wine-foreground/20 hover:border-champagne text-wine-foreground cursor-pointer">${fn}</button>`
  );
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Portfolio buttons enhanced with type="button", cursor-pointer, and dense grid packing!');
