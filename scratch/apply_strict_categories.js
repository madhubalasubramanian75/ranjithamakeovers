const fs = require('fs');

const categorizedPhotos = [
  // 1. BRIDAL (6 photos)
  { file: 'makeovers_by_ranjitha_5e9c86d36c664629bfcd361ea09fbe09.jpg', cat: 'bridal', title: 'Temple Muhurtham Bride', badge: 'Bridal', tall: true, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_25a05b103aa7475f918eb5547536d3e9.jpg', cat: 'bridal', title: 'Muhurtham Kanchipuram Styling', badge: 'Bridal', tall: true, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_547b8d9247cc49d0b221857b61f3ab91.jpg', cat: 'bridal', title: 'Outdoor Daylight Bridal Radiance', badge: 'Bridal', tall: false, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_2fd493ece22a4665b6579b5c77248f9d.jpg', cat: 'bridal', title: 'Golden Hour Bridal Radiance', badge: 'Bridal', tall: false, width: 1080, height: 1350 },
  { file: 'sat_narain_6ff25cff633647bd87c5a9b0aefafc48.jpg', cat: 'bridal', title: 'Royal Emerald Festive Bride', badge: 'Bridal', tall: false, width: 960, height: 1280 },
  { file: 'makeovers_by_ranjitha_01ec03387cbb40b78cf81c810f155922.jpg', cat: 'bridal', title: 'Ayyapakkam Bridal Studio Look', badge: 'Bridal', tall: false, width: 1080, height: 1350 },

  // 2. MAKEUP (6 photos)
  { file: 'smrxthi_219742813657475fbc18e4172584180c.jpg', cat: 'makeup', title: 'Luminous Complexion & Dewy Skin', badge: 'Makeup', tall: false, width: 1080, height: 1350 },
  { file: 'maddy.here_official_05a585c006424df892b60e9722db125f.jpg', cat: 'makeup', title: 'Festive Sangeet Eye Artistry', badge: 'Makeup', tall: true, width: 1080, height: 1350 },
  { file: 'sat_narain_384e562d52714cde8749332afcdd46b7.jpg', cat: 'makeup', title: 'Subtle Day-Glam Occasion Finish', badge: 'Makeup', tall: true, width: 960, height: 1280 },
  { file: 'sat_narain_b54b842ceb6d4d7a8e097d6a41ab038e.jpg', cat: 'makeup', title: 'Modern Minimalist Contouring', badge: 'Makeup', tall: true, width: 960, height: 1280 },
  { file: 'makeovers_by_ranjitha_8b6d08183a014763b3e1272514f1fb4e.jpg', cat: 'makeup', title: 'Sweat-Proof HD Base Makeup', badge: 'Makeup', tall: false, width: 1080, height: 1350 },
  { file: 'smrxthi_a939123b37d641dbb89f0ead76501979.jpg', cat: 'makeup', title: 'Romantic Rose Occasion Glam', badge: 'Makeup', tall: true, width: 1080, height: 1350 },

  // 3. HAIR (3 photos)
  { file: 'makeovers_by_ranjitha_b1298c88eb0f413eaf63955ba6d4a2f7.jpg', cat: 'hair', title: 'Intricate Bridal Floral Bun', badge: 'Hair', tall: false, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_882ab7c2338c4f1086814c2bea063fde.jpg', cat: 'hair', title: 'Royal Poola Jada Braid Detailing', badge: 'Hair', tall: true, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_0d174b640c5d4dc0a9300d089862ac97.jpg', cat: 'hair', title: 'Floral Crown Romantic Waves', badge: 'Hair', tall: false, width: 1080, height: 1350 },

  // 4. DRAPING (5 photos)
  { file: 'makeovers_by_ranjitha_d9c2607046df4a7691da90ab0c68ab8c.jpg', cat: 'draping', title: 'Classic Ivory & Gold Silk Draping', badge: 'Draping', tall: false, width: 1080, height: 1350 },
  { file: 'shop_swaas_12eb7750005c4824a0659930ab6efdd8.jpg', cat: 'draping', title: 'Deep Wine Pre-pleated Silk Saree', badge: 'Draping', tall: true, width: 1280, height: 1917 },
  { file: 'makeovers_by_ranjitha_74e68bca672b45b8a4255fd83c9c0adf.jpg', cat: 'draping', title: 'Structured Saree Box Pleats', badge: 'Draping', tall: false, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_e9e784ce15454a398d95946158cb109b.jpg', cat: 'draping', title: 'Double Pallu Traditional Drape', badge: 'Draping', tall: false, width: 1080, height: 1350 },
  { file: 'shop_swaas_6b0b0d58cf1e4e30a5381f87b1ac2816.jpg', cat: 'draping', title: 'Banarasi Silk Pre-pleating Drape', badge: 'Draping', tall: false, width: 1293, height: 1918 },

  // 5. TRANSFORMATIONS (3 photos)
  { file: 'smrxthi_26c9e4b18e1343c8bab5fa3381dc7ed9.jpg', cat: 'transformations', title: 'Reception Crimson Makeover', badge: 'Transformations', tall: false, width: 1080, height: 1350 },
  { file: 'smrxthi_45e52ba1d69f4ff29967c8c295cc61d6.jpg', cat: 'transformations', title: 'High-Definition Evening Makeover', badge: 'Transformations', tall: false, width: 1080, height: 1350 },
  { file: 'makeovers_by_ranjitha_fa2f4206712f462993db9829a453d5d0.jpg', cat: 'transformations', title: 'Evening Sangeet Transformation', badge: 'Transformations', tall: true, width: 1080, height: 1350 },

  // 6. CLASSES (4 photos)
  { file: 'sat_narain_f297691df6394221aeafd1be84ee9d27.jpg', cat: 'classes', title: 'Studio Masterclass & Artistry', badge: 'Classes', tall: true, width: 960, height: 1280 },
  { file: 'sat_narain_1cdb8bc26bfd48739abccae00bfc24b4.jpg', cat: 'classes', title: 'Hands-on Technique Demonstration', badge: 'Classes', tall: false, width: 960, height: 1280 },
  { file: 'sat_narain_99e03fe08d6240248b98dd88884d9b9f.jpg', cat: 'classes', title: 'Artisan Brushwork & Palettes', badge: 'Classes', tall: false, width: 960, height: 1280 },
  { file: 'sat_narain_ac3146b044da4b2a88f6f62d4b477cf7.jpg', cat: 'classes', title: '1-on-1 Student Coaching Session', badge: 'Classes', tall: false, width: 960, height: 1280 }
];

let html = fs.readFileSync('index.html', 'utf8');

// Build strict grid HTML
let gridHtml = '<div class="mt-12 grid auto-rows-[250px] grid-cols-2 gap-3 md:grid-cols-4" id="portfolioGrid">';
categorizedPhotos.forEach(item => {
  const span = item.tall ? 'md:row-span-2' : '';
  gridHtml += `\n<button class="group relative overflow-hidden rounded-md text-left ${span}" aria-label="View ${item.title}" data-cat="${item.cat}"><img src="assets/images/${item.file}" alt="${item.title}" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" width="${item.width}" height="${item.height}"/><span class="absolute inset-x-0 bottom-0 bg-wine/85 p-4 text-xs tracking-wider opacity-0 transition group-hover:opacity-100 flex flex-col justify-end"><span class="uppercase tracking-widest text-champagne text-[11px] font-semibold">${item.badge}</span><span class="font-display text-sm text-wine-foreground mt-0.5">${item.title}</span></span></button>`;
});
gridHtml += '\n</div>';

// Replace grid in HTML
const gridStart = html.indexOf('<div class="mt-12 grid auto-rows-[250px]');
const gridEnd = html.indexOf('</div></div></section>', gridStart) + '</div>'.length;

if (gridStart !== -1 && gridEnd !== -1) {
  html = html.slice(0, gridStart) + gridHtml + html.slice(gridEnd);
  console.log('Grid replaced with strict category assignment!');
} else {
  console.error('Could not find grid start/end in index.html!');
}

// Update the JavaScript filtering code to perform STRICT matching: cat === filter
const jsSearch = "// 1. Portfolio Category Filtering";
const jsStart = html.indexOf(jsSearch);
const jsEnd = html.indexOf("// 2. Lightbox Modal", jsStart);

const strictJs = `// 1. Portfolio Category Filtering
			const portfolioSection = document.getElementById('portfolio');
			if (portfolioSection) {
				const filterButtons = portfolioSection.querySelectorAll('.flex.flex-wrap button');
				const imageCards = portfolioSection.querySelectorAll('button[data-cat]');

				filterButtons.forEach(btn => {
					btn.addEventListener('click', () => {
						const filter = btn.textContent.trim().toLowerCase();

						// Update active button styling
						filterButtons.forEach(b => {
							b.className = 'rounded-full border px-4 py-2 text-xs transition border-wine-foreground/20 hover:border-champagne text-wine-foreground';
						});
						btn.className = 'rounded-full border px-4 py-2 text-xs transition border-champagne bg-champagne text-wine font-semibold';

						// Strict filtering: if filter is 'all', show all; otherwise show ONLY matching category
						imageCards.forEach(card => {
							const cat = (card.getAttribute('data-cat') || '').toLowerCase();
							if (filter === 'all' || cat === filter) {
								card.style.display = '';
							} else {
								card.style.display = 'none';
							}
						});
					});
				});

				`;

if (jsStart !== -1 && jsEnd !== -1) {
  html = html.slice(0, jsStart) + strictJs + html.slice(jsEnd);
  console.log('JavaScript updated with strict filter logic (cat === filter)!');
} else {
  console.error('Could not find JS start/end in index.html!');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');
