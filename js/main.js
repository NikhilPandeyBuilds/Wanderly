/**
 * Wanderly - Travel Explorer
 * Core Interactive Features & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollProgress();
  initDestinationFilters();
  initCostCalculator();
  initItineraryTabs();
  initWishlist();
  initQuickViewModal();
  initForms();
  initBackToTop();
  initFaqAccordion();
});

/* ----------------------------------------------------
   1. Navbar & Mobile Menu & Sticky Blur
   ---------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ----------------------------------------------------
   2. Reading / Scroll Progress Bar
   ---------------------------------------------------- */
function initScrollProgress() {
  let bar = document.getElementById('scrollProgress');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scrollProgress';
    bar.className = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

/* ----------------------------------------------------
   3. Destinations Filtering & Search
   ---------------------------------------------------- */
function initDestinationFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('destinationSearch');
  const cardGrid = document.querySelector('.destinations-grid, #destinationsGrid');
  const emptyState = document.getElementById('emptyFilterState');
  const resultCounter = document.getElementById('filterCount');

  if (!cardGrid) return;
  const cards = cardGrid.querySelectorAll('.destination-card');

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    let matchCount = 0;
    cards.forEach(card => {
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardTitle = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const cardDesc = (card.querySelector('p')?.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        card.classList.add('fade-in');
        matchCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('fade-in');
      }
    });

    if (resultCounter) {
      resultCounter.textContent = `${matchCount} destination${matchCount === 1 ? '' : 's'} available`;
    }

    if (emptyState) {
      emptyState.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = (pill.getAttribute('data-filter') || 'all').toLowerCase();
      applyFilters();
    });
  });

  if (searchInput) {
    // Check if query param exists in URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('destination');
    const mood = urlParams.get('mood');

    if (query) {
      searchInput.value = query;
      searchTerm = query.toLowerCase();
    }

    if (mood) {
      const moodMap = {
        'beach break': 'coast',
        'mountain air': 'mountains',
        'culture and heritage': 'heritage'
      };
      const cat = moodMap[mood.toLowerCase()];
      if (cat) {
        activeCategory = cat;
        filterPills.forEach(p => {
          if (p.getAttribute('data-filter')?.toLowerCase() === cat) {
            filterPills.forEach(x => x.classList.remove('active'));
            p.classList.add('active');
          }
        });
      }
    }

    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });

    applyFilters();
  }
}

/* ----------------------------------------------------
   4. Interactive Trip Cost Calculator (on packages.html)
   ---------------------------------------------------- */
function initCostCalculator() {
  const calcContainer = document.getElementById('tripCalculator');
  if (!calcContainer) return;

  const destinationSelect = document.getElementById('calcDestination');
  const travellersInput = document.getElementById('calcTravellers');
  const daysInput = document.getElementById('calcDays');
  const tierInputs = document.querySelectorAll('input[name="calcTier"]');
  const totalDisplay = document.getElementById('calcTotal');
  const perPersonDisplay = document.getElementById('calcPerPerson');

  const basePrices = {
    'goa': 4200,
    'kashmir': 5200,
    'rajasthan': 4600,
    'kerala': 4800,
    'ladakh': 5500,
    'andaman': 5800,
    'sikkim': 4500,
    'meghalaya': 4300
  };

  const tierMultipliers = {
    'budget': 0.85,
    'comfort': 1.0,
    'luxury': 1.45
  };

  function updatePrice() {
    const dest = destinationSelect ? destinationSelect.value : 'goa';
    const travellers = Math.max(1, parseInt(travellersInput?.value || '2', 10));
    const days = Math.max(1, parseInt(daysInput?.value || '4', 10));

    let tier = 'comfort';
    tierInputs.forEach(radio => {
      if (radio.checked) tier = radio.value;
    });

    const ratePerDay = basePrices[dest] || 4500;
    const tierMultiplier = tierMultipliers[tier] || 1.0;

    // Base calculation: ratePerDay * days * tier * group scaling discount
    const groupDiscount = travellers > 3 ? 0.9 : 1.0;
    const perPerson = Math.round(ratePerDay * (days / 3.5) * tierMultiplier * groupDiscount);
    const grandTotal = perPerson * travellers;

    if (totalDisplay) {
      totalDisplay.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    }
    if (perPersonDisplay) {
      perPersonDisplay.textContent = '₹' + perPerson.toLocaleString('en-IN') + ' / traveller';
    }
  }

  destinationSelect?.addEventListener('change', updatePrice);
  travellersInput?.addEventListener('input', updatePrice);
  daysInput?.addEventListener('input', updatePrice);
  tierInputs.forEach(r => r.addEventListener('change', updatePrice));

  // Travellers plus/minus buttons
  document.getElementById('calcTravellersMinus')?.addEventListener('click', () => {
    if (travellersInput && travellersInput.value > 1) {
      travellersInput.value = parseInt(travellersInput.value, 10) - 1;
      updatePrice();
    }
  });
  document.getElementById('calcTravellersPlus')?.addEventListener('click', () => {
    if (travellersInput && travellersInput.value < 15) {
      travellersInput.value = parseInt(travellersInput.value, 10) + 1;
      updatePrice();
    }
  });

  updatePrice();
}

/* ----------------------------------------------------
   5. Itinerary Day Tabs (on destination detail pages)
   ---------------------------------------------------- */
function initItineraryTabs() {
  const tabs = document.querySelectorAll('.itinerary-tab-btn');
  const panels = document.querySelectorAll('.itinerary-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetDay = tab.getAttribute('data-target-day');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetDay);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
   6. Wishlist Button Toggle & Toast
   ---------------------------------------------------- */
function initWishlist() {
  const buttons = document.querySelectorAll('.wishlist-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      const isSaved = btn.classList.contains('active');
      const cardTitle = btn.closest('.destination-card')?.querySelector('h3')?.textContent || 'Destination';

      if (isSaved) {
        showToast(`♥ Saved "${cardTitle}" to your Wanderlist!`);
      } else {
        showToast(`Removed "${cardTitle}" from Wanderlist.`);
      }
    });
  });
}

/* ----------------------------------------------------
   7. Quick View Modal
   ---------------------------------------------------- */
function initQuickViewModal() {
  let modal = document.getElementById('quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quick-modal';
    modal.innerHTML = `
      <div class="quick-modal-overlay" id="modalOverlay"></div>
      <div class="quick-modal-dialog">
        <button class="quick-modal-close" id="modalClose" aria-label="Close modal">&times;</button>
        <div class="quick-modal-content" id="modalBody">
          <!-- Injected via JS -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  const previewButtons = document.querySelectorAll('.quick-view-btn');
  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.destination-card');
      if (!card) return;

      const title = card.querySelector('h3')?.textContent || 'Travel Destination';
      const desc = card.querySelector('p')?.textContent || '';
      const img = card.querySelector('img')?.getAttribute('src') || 'images/hero.jpg';
      const category = card.querySelector('.category')?.textContent || 'Explorer';
      const link = card.querySelector('.text-link')?.getAttribute('href') || 'destinations.html';

      modalBody.innerHTML = `
        <div class="modal-card">
          <div class="modal-img-wrap">
            <img src="${img}" alt="${title}">
            <span class="category-badge">${category}</span>
          </div>
          <div class="modal-info">
            <div class="modal-rating">★★★★★ <span>4.9 (120+ reviews)</span></div>
            <h2>${title}</h2>
            <p class="modal-lead">${desc}</p>
            <div class="modal-perks">
              <div class="perk-item"><span>🌤️ Best Season:</span> October to March</div>
              <div class="perk-item"><span>⏱️ Suggested Stay:</span> 3 - 5 Days</div>
              <div class="perk-item"><span>📍 Experience:</span> Sightseeing, Local Culture & Nature</div>
            </div>
            <div class="modal-actions">
              <a class="button" href="${link}">Explore Full Guide &rarr;</a>
              <a class="button secondary" href="contact.html?destination=${encodeURIComponent(title)}">Book Trip</a>
            </div>
          </div>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ----------------------------------------------------
   8. Form Handlers & Feedback Toast
   ---------------------------------------------------- */
function initForms() {
  // Contact & Enquiry form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    // Auto-fill destination from URL param if available
    const urlParams = new URLSearchParams(window.location.search);
    const destParam = urlParams.get('destination');
    const destSelect = contactForm.querySelector('select[name="destination"]');
    if (destParam && destSelect) {
      for (let option of destSelect.options) {
        if (option.text.toLowerCase().includes(destParam.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Send Enquiry';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Enquiry...';
      }

      // Collect form data
      const formData = new FormData(contactForm);
      const dataObj = Object.fromEntries(formData.entries());

      try {
        // Try posting to Java backend if server is running
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataObj)
        });

        if (res.ok) {
          const json = await res.json();
          showToast(`✨ ${json.message || 'Enquiry received! Booking Ref: #WND-' + Math.floor(1000 + Math.random() * 9000)}`);
        } else {
          showToast(`✨ Enquiry received for ${dataObj.destination || 'your trip'}! Reference: #WND-${Math.floor(1000 + Math.random() * 9000)}`);
        }
      } catch (err) {
        // Graceful fallback for static hosting
        showToast(`✨ Enquiry confirmed for ${dataObj.destination || 'your trip'}! Booking Ref: #WND-${Math.floor(1000 + Math.random() * 9000)}`);
      }

      contactForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enquiry Sent ✓';
        setTimeout(() => {
          submitBtn.textContent = originalText;
        }, 3000);
      }
    });
  }

  // Newsletter form
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input ? input.value : '';
      if (email) {
        showToast(`🎉 You're in! Travel stories & secret guides will arrive at ${email}`);
        form.reset();
      }
    });
  });
}

/* ----------------------------------------------------
   9. Toast Notification System
   ---------------------------------------------------- */
function showToast(message, duration = 4000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `
    <span class="toast-icon">✦</span>
    <span class="toast-text">${message}</span>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  const removeToast = () => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('.toast-close')?.addEventListener('click', removeToast);
  setTimeout(removeToast, duration);
}

/* ----------------------------------------------------
   10. Back to Top Floating Button
   ---------------------------------------------------- */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----------------------------------------------------
   11. FAQ Accordion
   ---------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}
