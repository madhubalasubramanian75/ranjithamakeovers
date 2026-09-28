const fs = require('fs');
const path = require('path');

const driveFiles = [
  { file: 'makeovers_by_ranjitha_5e9c86d36c664629bfcd361ea09fbe09.jpg', cat: 'bridal makeup', title: 'Temple Muhurtham Bride', desc: 'Traditional South Indian bridal signature with antique gold jewellery' },
  { file: 'smrxthi_219742813657475fbc18e4172584180c.jpg', cat: 'makeup transformations', title: 'Luminous Bridal Complexion', desc: 'Dewy skin finish with soft winged eyeliner and rose lips' },
  { file: 'maddy.here_official_05a585c006424df892b60e9722db125f.jpg', cat: 'makeup bridal', title: 'Festive Sangeet Glow', desc: 'Vibrant celebratory makeup in lime and turquoise hues' },
  { file: 'makeovers_by_ranjitha_d9c2607046df4a7691da90ab0c68ab8c.jpg', cat: 'draping bridal', title: 'Classic Ivory & Gold Silk', desc: 'Precision Muhurtham silk saree draping with emerald jewellery' },
  { file: 'makeovers_by_ranjitha_b1298c88eb0f413eaf63955ba6d4a2f7.jpg', cat: 'hair bridal', title: 'Intricate Bridal Floral Bun', desc: 'Traditional hair adornment with jasmine strings and gold jada' },
  { file: 'shop_swaas_12eb7750005c4824a0659930ab6efdd8.jpg', cat: 'draping bridal', title: 'Deep Wine Silk Pre-pleating', desc: 'Flawless box pleating and regal pallu drape in wine tone' },
  { file: 'makeovers_by_ranjitha_547b8d9247cc49d0b221857b61f3ab91.jpg', cat: 'bridal makeup', title: 'Outdoor Daylight Bridal Radiance', desc: 'Soft natural daylight bride in pastel silk' },
  { file: 'smrxthi_26c9e4b18e1343c8bab5fa3381dc7ed9.jpg', cat: 'transformations makeup', title: 'Reception Crimson Makeover', desc: 'Statement red glamour with contoured definition' },
  { file: 'sat_narain_f297691df6394221aeafd1be84ee9d27.jpg', cat: 'classes makeup', title: 'Studio Masterclass & Artistry', desc: 'Ranjitha demonstrating professional application techniques' },
  { file: 'sat_narain_6ff25cff633647bd87c5a9b0aefafc48.jpg', cat: 'bridal makeup', title: 'Royal Emerald Festive Portrait', desc: 'Polished editorial styling with traditional temple accents' },
  { file: 'sat_narain_1cdb8bc26bfd48739abccae00bfc24b4.jpg', cat: 'classes makeup', title: 'Hands-on Technique Workshop', desc: 'Step-by-step guidance on precision base and contouring' },
  { file: 'sat_narain_384e562d52714cde8749332afcdd46b7.jpg', cat: 'makeup transformations', title: 'Subtle Day-Glam Finish', desc: 'Clean, elegant occasion makeup for family celebrations' },
  { file: 'sat_narain_99e03fe08d6240248b98dd88884d9b9f.jpg', cat: 'makeup classes', title: 'Artisan Palette & Brushwork', desc: 'Curated luxury makeup tools and tailored complexion matching' },
  { file: 'sat_narain_ac3146b044da4b2a88f6f62d4b477cf7.jpg', cat: 'classes makeup', title: '1-on-1 Student Training Session', desc: 'Personal coaching for budding bridal makeup artists' },
  { file: 'sat_narain_b54b842ceb6d4d7a8e097d6a41ab038e.jpg', cat: 'makeup transformations', title: 'Modern Minimalist Glam', desc: 'Weightless foundation application highlighting natural bone structure' },
  { file: 'makeovers_by_ranjitha_01ec03387cbb40b78cf81c810f155922.jpg', cat: 'bridal makeup', title: 'Ayyapakkam Bridal Studio', desc: 'Bridal consultation and personalized makeover preview' },
  { file: 'makeovers_by_ranjitha_0d174b640c5d4dc0a9300d089862ac97.jpg', cat: 'hair bridal', title: 'Half-Up Floral Crown Waves', desc: 'Soft romantic waves paired with fresh baby breath florals' },
  { file: 'makeovers_by_ranjitha_25a05b103aa7475f918eb5547536d3e9.jpg', cat: 'bridal draping', title: 'Muhurtham Kanchipuram Styling', desc: 'Traditional South Indian wedding drape and temple jewellery' },
  { file: 'makeovers_by_ranjitha_2fd493ece22a4665b6579b5c77248f9d.jpg', cat: 'makeup bridal', title: 'Golden Hour Bridal Glow', desc: 'Warm shimmer eye shadow and sculpted cheekbones' },
  { file: 'makeovers_by_ranjitha_74e68bca672b45b8a4255fd83c9c0adf.jpg', cat: 'draping bridal', title: 'Contemporary Saree Pleating', desc: 'Clean structured folds ensuring effortless movement for the bride' },
  { file: 'makeovers_by_ranjitha_882ab7c2338c4f1086814c2bea063fde.jpg', cat: 'bridal hair', title: 'Royal South Indian Jada Braid', desc: 'Classic braided poola jada adorned with gold billas and flowers' },
  { file: 'makeovers_by_ranjitha_8b6d08183a014763b3e1272514f1fb4e.jpg', cat: 'makeup transformations', title: 'Flawless Airbrush Finish', desc: '16-hour sweat-proof bridal base designed for Chennai climate' },
  { file: 'makeovers_by_ranjitha_e9e784ce15454a398d95946158cb109b.jpg', cat: 'draping bridal', title: 'Double Pallu Saree Draping', desc: 'Regal bridal drape styling with intricate zari borders' },
  { file: 'makeovers_by_ranjitha_fa2f4206712f462993db9829a453d5d0.jpg', cat: 'bridal makeup', title: 'Evening Sangeet Artistry', desc: 'Smokey bronze lids and statement lipstick for the reception' },
  { file: 'shop_swaas_6b0b0d58cf1e4e30a5381f87b1ac2816.jpg', cat: 'draping bridal', title: 'Banarasi & Kanchipuram Draping', desc: 'Crisp iron-set pleats ready to wear in 5 minutes' },
  { file: 'smrxthi_45e52ba1d69f4ff29967c8c295cc61d6.jpg', cat: 'transformations makeup', title: 'Red Carpet High-Definition Makeover', desc: 'Studio camera-tested artistry for high-definition photography' },
  { file: 'smrxthi_a939123b37d641dbb89f0ead76501979.jpg', cat: 'makeup transformations', title: 'Romantic Rose Occasion Glam', desc: 'Soft monochromatic pink tones for pre-wedding ceremonies' }
];

console.log('Total Drive photos to showcase:', driveFiles.length);

// Verify all files exist
let allExist = true;
driveFiles.forEach(f => {
  const p = path.join('assets/images', f.file);
  if (!fs.existsSync(p)) {
    console.error('MISSING:', p);
    allExist = false;
  }
});
console.log('All files verified:', allExist);
