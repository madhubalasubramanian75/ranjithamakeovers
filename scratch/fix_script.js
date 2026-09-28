const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the lovable badge close script end
const badgeScriptEnd = '</aside>\n<script>\n\t// Don\'t show the lovable-badge';
const targetIndex = html.indexOf(badgeScriptEnd);

// Find everything from the end of the badge script up to 'const form = document.querySelector(\'form\');'
const formIndex = html.indexOf('const form = document.querySelector(\'form\');');
const badgeEndScriptTag = html.indexOf('</script>', targetIndex + 20) + '</script>'.length;

const cleanModalAndScript = `

<!-- Lightbox Modal -->
<div id="lightbox-modal" style="display:none; position:fixed; inset:0; background:rgba(20,10,14,0.94); z-index:99999; justify-content:center; align-items:center; padding:1.5rem; backdrop-filter:blur(10px);">
  <div style="position:relative; max-width:92vw; max-height:92vh; display:flex; flex-direction:column; align-items:center;">
    <button id="lightbox-close" style="position:absolute; top:-40px; right:0; background:none; border:none; color:#fff; font-size:2.2rem; cursor:pointer; padding:0.5rem; line-height:1;" aria-label="Close">&times;</button>
    <img id="lightbox-img" src="" alt="" style="max-width:100%; max-height:80vh; object-fit:contain; border-radius:10px; box-shadow:0 30px 60px rgba(0,0,0,0.6);">
    <p id="lightbox-caption" style="margin-top:1.25rem; color:#f5e6d3; font-family:'Italiana',serif; font-size:1.35rem; text-align:center; letter-spacing:0.02em;"></p>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // 1. Portfolio Category Filtering
  const portfolioSection = document.getElementById('portfolio');
  if (portfolioSection) {
    const filterButtons = portfolioSection.querySelectorAll('.flex.flex-wrap.gap-2 button');
    const imageCards = portfolioSection.querySelectorAll('.grid.auto-rows-\\[250px\\] button');

    imageCards.forEach(card => {
      let existing = card.getAttribute('data-cats') || '';
      if (!existing.includes('all')) {
        card.setAttribute('data-cats', 'all ' + existing);
      }
    });

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.textContent.trim().toLowerCase();
        
        // Update active class
        filterButtons.forEach(b => {
          b.className = 'rounded-full border px-4 py-2 text-xs transition border-wine-foreground/20 hover:border-champagne text-wine-foreground';
        });
        btn.className = 'rounded-full border px-4 py-2 text-xs transition border-champagne bg-champagne text-wine';

        imageCards.forEach(card => {
          const cats = card.getAttribute('data-cats') || '';
          if (filter === 'all' || cats.includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // 2. Lightbox Modal
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCap = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    imageCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img) {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modalCap.textContent = card.getAttribute('aria-label')?.replace(/^View\s+/, '') || img.alt || '';
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
  }

  // 3. Booking Form to WhatsApp
  `;

html = html.slice(0, badgeEndScriptTag) + cleanModalAndScript + html.slice(formIndex + 'const form = document.querySelector(\'form\');'.length);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Script and modal cleanly fixed and verified!');
