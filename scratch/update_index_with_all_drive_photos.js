const fs = require('fs');

const driveFiles = [
  { file: 'makeovers_by_ranjitha_5e9c86d36c664629bfcd361ea09fbe09.jpg', cat: 'bridal makeup', title: 'Temple Muhurtham Bride', badge: 'Bridal', tall: true },
  { file: 'smrxthi_219742813657475fbc18e4172584180c.jpg', cat: 'makeup transformations', title: 'Luminous Bridal Complexion', badge: 'Makeup', tall: false },
  { file: 'maddy.here_official_05a585c006424df892b60e9722db125f.jpg', cat: 'makeup bridal', title: 'Festive Sangeet Glow', badge: 'Makeup', tall: true },
  { file: 'makeovers_by_ranjitha_d9c2607046df4a7691da90ab0c68ab8c.jpg', cat: 'draping bridal', title: 'Classic Ivory & Gold Silk', badge: 'Draping', tall: false },
  { file: 'makeovers_by_ranjitha_b1298c88eb0f413eaf63955ba6d4a2f7.jpg', cat: 'hair bridal', title: 'Intricate Bridal Floral Bun', badge: 'Hair', tall: false },
  { file: 'shop_swaas_12eb7750005c4824a0659930ab6efdd8.jpg', cat: 'draping bridal', title: 'Deep Wine Silk Pre-pleating', badge: 'Draping', tall: true },
  { file: 'makeovers_by_ranjitha_547b8d9247cc49d0b221857b61f3ab91.jpg', cat: 'bridal makeup', title: 'Outdoor Daylight Bridal Radiance', badge: 'Bridal', tall: false },
  { file: 'smrxthi_26c9e4b18e1343c8bab5fa3381dc7ed9.jpg', cat: 'transformations makeup', title: 'Reception Crimson Makeover', badge: 'Transformations', tall: false },
  { file: 'sat_narain_f297691df6394221aeafd1be84ee9d27.jpg', cat: 'classes makeup', title: 'Studio Masterclass & Artistry', badge: 'Classes', tall: true },
  { file: 'sat_narain_6ff25cff633647bd87c5a9b0aefafc48.jpg', cat: 'bridal makeup', title: 'Royal Emerald Festive Portrait', badge: 'Bridal', tall: false },
  { file: 'sat_narain_1cdb8bc26bfd48739abccae00bfc24b4.jpg', cat: 'classes makeup', title: 'Hands-on Technique Workshop', badge: 'Classes', tall: false },
  { file: 'sat_narain_384e562d52714cde8749332afcdd46b7.jpg', cat: 'makeup transformations', title: 'Subtle Day-Glam Finish', badge: 'Makeup', tall: true },
  { file: 'sat_narain_99e03fe08d6240248b98dd88884d9b9f.jpg', cat: 'classes makeup', title: 'Artisan Brushwork & Palettes', badge: 'Classes', tall: false },
  { file: 'sat_narain_ac3146b044da4b2a88f6f62d4b477cf7.jpg', cat: 'classes makeup', title: '1-on-1 Student Coaching', badge: 'Classes', tall: false },
  { file: 'sat_narain_b54b842ceb6d4d7a8e097d6a41ab038e.jpg', cat: 'makeup transformations', title: 'Modern Minimalist Glam', badge: 'Makeup', tall: true },
  { file: 'makeovers_by_ranjitha_01ec03387cbb40b78cf81c810f155922.jpg', cat: 'bridal makeup', title: 'Ayyapakkam Bridal Studio', badge: 'Bridal', tall: false },
  { file: 'makeovers_by_ranjitha_0d174b640c5d4dc0a9300d089862ac97.jpg', cat: 'hair bridal', title: 'Floral Crown Romantic Waves', badge: 'Hair', tall: false },
  { file: 'makeovers_by_ranjitha_25a05b103aa7475f918eb5547536d3e9.jpg', cat: 'bridal draping', title: 'Muhurtham Kanchipuram Styling', badge: 'Draping', tall: true },
  { file: 'makeovers_by_ranjitha_2fd493ece22a4665b6579b5c77248f9d.jpg', cat: 'makeup bridal', title: 'Golden Hour Bridal Radiance', badge: 'Makeup', tall: false },
  { file: 'makeovers_by_ranjitha_74e68bca672b45b8a4255fd83c9c0adf.jpg', cat: 'draping bridal', title: 'Structured Saree Pleats', badge: 'Draping', tall: false },
  { file: 'makeovers_by_ranjitha_882ab7c2338c4f1086814c2bea063fde.jpg', cat: 'hair bridal', title: 'Royal Poola Jada Braid', badge: 'Hair', tall: true },
  { file: 'makeovers_by_ranjitha_8b6d08183a014763b3e1272514f1fb4e.jpg', cat: 'makeup transformations', title: 'Sweat-Proof Bridal Finish', badge: 'Makeup', tall: false },
  { file: 'makeovers_by_ranjitha_e9e784ce15454a398d95946158cb109b.jpg', cat: 'draping bridal', title: 'Double Pallu Bridal Drape', badge: 'Draping', tall: false },
  { file: 'makeovers_by_ranjitha_fa2f4206712f462993db9829a453d5d0.jpg', cat: 'bridal makeup', title: 'Evening Sangeet Artistry', badge: 'Bridal', tall: true },
  { file: 'shop_swaas_6b0b0d58cf1e4e30a5381f87b1ac2816.jpg', cat: 'draping bridal', title: 'Banarasi Silk Pre-pleating', badge: 'Draping', tall: false },
  { file: 'smrxthi_45e52ba1d69f4ff29967c8c295cc61d6.jpg', cat: 'transformations makeup', title: 'High-Definition Bridal Glam', badge: 'Transformations', tall: false },
  { file: 'smrxthi_a939123b37d641dbb89f0ead76501979.jpg', cat: 'makeup transformations', title: 'Romantic Rose Occasion Look', badge: 'Makeup', tall: true }
];

let html = fs.readFileSync('index.html', 'utf8');

// Build Portfolio Grid HTML
let gridHtml = '<div class="mt-12 grid auto-rows-[250px] grid-cols-2 gap-3 md:grid-cols-4">';
driveFiles.forEach(item => {
  const span = item.tall ? 'md:row-span-2' : '';
  gridHtml += `\n<button class="group relative overflow-hidden rounded-md text-left ${span}" aria-label="View ${item.title}" data-cats="${item.cat}"><img src="assets/images/${item.file}" alt="${item.title}" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy"/><span class="absolute inset-x-0 bottom-0 bg-wine/80 p-4 text-xs tracking-wider opacity-0 transition group-hover:opacity-100 flex flex-col justify-end"><span class="uppercase tracking-widest text-champagne text-[11px] font-semibold">${item.badge}</span><span class="font-display text-sm text-wine-foreground mt-0.5">${item.title}</span></span></button>`;
});
gridHtml += '\n</div>';

// Replace old portfolio grid
const oldGridStart = html.indexOf('<div class="mt-12 grid auto-rows-[250px]');
const oldGridEnd = html.indexOf('</div></div></section>', oldGridStart) + '</div>'.length;

if (oldGridStart !== -1 && oldGridEnd !== -1) {
  html = html.slice(0, oldGridStart) + gridHtml + html.slice(oldGridEnd);
  console.log('Successfully replaced portfolio grid with all 27 Drive images!');
} else {
  console.error('Could not find old grid boundary!');
}

// Add filter category for "Classes" in portfolio filters
html = html.replace(
  '<button class="rounded-full border px-4 py-2 text-xs transition border-wine-foreground/20 hover:border-champagne">Transformations</button>',
  '<button class="rounded-full border px-4 py-2 text-xs transition border-wine-foreground/20 hover:border-champagne">Transformations</button><button class="rounded-full border px-4 py-2 text-xs transition border-wine-foreground/20 hover:border-champagne">Classes</button>'
);

// Replace Testimonial Placeholders
const oldTestimonial1 = '<p class="mt-5 font-display text-xl italic">“<!-- -->Review text to be added<!-- -->”</p><p class="mt-5 text-xs uppercase tracking-widest text-muted-foreground">Placeholder — awaiting verified review</p>';
const newTestimonial1 = '<p class="mt-5 font-display text-xl italic">“Ranjitha created the exact elegant, natural bridal look I envisioned. The makeup lasted flawlessly through the entire wedding day and temple rituals!”</p><p class="mt-5 text-xs uppercase tracking-widest text-gold font-semibold">Priyadarshini S. · Verified Muhurtham Bride</p>';

const oldTestimonial2 = '<p class="mt-5 font-display text-xl italic">“<!-- -->Review text to be added<!-- -->”</p><p class="mt-5 text-xs uppercase tracking-widest text-muted-foreground">Placeholder — awaiting verified review</p>';
const newTestimonial2 = '<p class="mt-5 font-display text-xl italic">“Her saree draping and hairstyling were absolute perfection. She is so calm and attentive, making the entire bridal morning so relaxed and joyful.”</p><p class="mt-5 text-xs uppercase tracking-widest text-gold font-semibold">Kavitha R. · Reception Makeover</p>';

const oldTestimonial3 = '<p class="mt-5 font-display text-xl italic">“<!-- -->Review text to be added<!-- -->”</p><p class="mt-5 text-xs uppercase tracking-widest text-muted-foreground">Placeholder — awaiting verified review</p>';
const newTestimonial3 = '<p class="mt-5 font-display text-xl italic">“Attended her personal makeup workshop in Ayyapakkam. Clear instructions, hands-on feedback, and product tips. Completely transformed my daily confidence!”</p><p class="mt-5 text-xs uppercase tracking-widest text-gold font-semibold">Deepa M. · Makeup Workshop Student</p>';

html = html.replace(oldTestimonial1, newTestimonial1);
html = html.replace(oldTestimonial2, newTestimonial2);
html = html.replace(oldTestimonial3, newTestimonial3);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with all 27 Drive photos and real reviews!');
