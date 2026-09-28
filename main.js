/**
 * MAKEOVERS BY RANJITHA
 * Interactive frontend logic: Header, Mobile Drawer, Portfolio Filter, Lightbox, WhatsApp Booking Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerBookBtn = document.getElementById('drawerBookBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = () => {
    const isOpen = mobileNavDrawer.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  };

  const openMobileNav = () => {
    mobileNavDrawer.classList.add('open');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNavDrawer.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  if (drawerBookBtn) {
    drawerBookBtn.addEventListener('click', closeMobileNav);
  }

  // 3. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('#portfolioFilters .filter-btn');
  const portfolioItems = document.querySelectorAll('#portfolioGrid .portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. Portfolio Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src') || item.querySelector('img').src;
      const caption = item.getAttribute('data-caption') || item.querySelector('.portfolio-item-title')?.textContent || '';

      lightboxImg.src = src;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;

      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal.classList.contains('active')) closeLightbox();
      if (mobileNavDrawer.classList.contains('open')) closeMobileNav();
    }
  });

  // 5. WhatsApp Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  const eventDateInput = document.getElementById('eventDate');

  if (eventDateInput) {
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.min = today;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const eventType = document.getElementById('eventType').value;
      const eventDate = document.getElementById('eventDate').value;
      const message = document.getElementById('clientMessage').value.trim();

      if (!name || !phone || !eventType) {
        alert('Please fill out all required fields.');
        return;
      }

      // Build structured WhatsApp message
      const textLines = [
        'Hello Ranjitha Makeover,',
        '',
        'I would like to enquire about your makeup services.',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Event Type: ${eventType}`,
        `Event Date: ${eventDate || 'Not specified'}`,
        '',
        'Requirements:',
        message || 'None',
        '',
        'Thank you.'
      ];

      const encodedText = encodeURIComponent(textLines.join('\n'));
      const whatsappUrl = `https://wa.me/919791659424?text=${encodedText}`;

      const win = window.open(whatsappUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    });
  }

  // 6. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
});
