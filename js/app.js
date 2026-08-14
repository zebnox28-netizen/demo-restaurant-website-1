/* ==========================================================================
   LUMIÈRE Main Application Logic (Multi-Page & 3D Animation Engine)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // App State with LocalStorage persistence for Cart across pages
  const savedCart = localStorage.getItem('lumiere_cart');
  const state = {
    cart: savedCart ? JSON.parse(savedCart) : [],
    activeCategory: 'all',
    activeDietary: [],
    bookingStep: 1,
    bookingData: {
      guests: '2',
      date: '',
      time: '20:00',
      occasion: 'Casual Dining',
      seating: 'Main Dining Room',
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  };

  // Modules Initializers
  initLiveClockStatus();
  initStickyNavbar();
  init3DTiltEffects();
  initScrollReveal();
  initMenuPreviewGrid();
  initHappyHourTimer();
  initReservationModule();
  initReviewsGrid();
  initCartModule();

  /* --------------------------------------------------------------------------
     1. Live US Timezone Store Status (America/New_York EST)
     -------------------------------------------------------------------------- */
  function initLiveClockStatus() {
    const statusPill = document.getElementById('liveStatusPill');
    const statusText = document.getElementById('liveStatusText');

    if (!statusPill || !statusText) return;

    function checkOpenStatus() {
      const now = new Date();
      const nyTimeStr = now.toLocaleString("en-US", { timeZone: "America/New_York" });
      const nyDate = new Date(nyTimeStr);
      const hours = nyDate.getHours();
      const minutes = nyDate.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 11 * 60 + 30; // 11:30 AM
      const closeMinutes = 23 * 60;      // 11:00 PM

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        statusPill.style.background = 'rgba(46, 196, 182, 0.12)';
        statusPill.style.borderColor = 'rgba(46, 196, 182, 0.4)';
        statusText.innerHTML = `🟢 Open Now • Closes 11 PM EST`;
      } else {
        statusPill.style.background = 'rgba(255, 159, 28, 0.12)';
        statusPill.style.borderColor = 'rgba(255, 159, 28, 0.4)';
        statusText.innerHTML = `🌙 Closed Now • Opens 11:30 AM EST`;
      }
    }

    checkOpenStatus();
    setInterval(checkOpenStatus, 60000);
  }

  /* --------------------------------------------------------------------------
     2. Sticky Navbar & Scroll Behavior
     -------------------------------------------------------------------------- */
  function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    mobileBtn?.addEventListener('click', () => {
      if (!navMenu) return;
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      if (navMenu.style.display === 'flex') {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'var(--bg-secondary)';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid var(--glass-border)';
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Interactive 3D Cursor Parallax Tilt Effect
     -------------------------------------------------------------------------- */
  function init3DTiltEffects() {
    const tiltCards = document.querySelectorAll('.card-3d-frame');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -14;
        const rotateY = ((x - centerX) / centerX) * 14;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Scroll Reveal Animations (Intersection Observer)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     5. Home Page Menu Preview Grid
     -------------------------------------------------------------------------- */
  function initMenuPreviewGrid() {
    const grid = document.getElementById('dishesGrid');
    if (!grid) return;

    const highlights = restaurantData.menuItems.slice(0, 3);

    grid.innerHTML = highlights.map(item => `
      <div class="dish-card">
        <div class="dish-img-wrap">
          <img src="${item.image}" alt="${item.title}" class="dish-img" loading="lazy">
          ${item.tag ? `<span class="dish-tag">${item.tag}</span>` : ''}
          <button class="dish-quick-add" onclick="quickAddToCart('${item.id}')" title="Add to bag">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        
        <div class="dish-content">
          <div class="dish-header">
            <h3 class="dish-title">${item.title}</h3>
            <div class="dish-price">$${item.price.toFixed(2)}</div>
          </div>
          <p class="dish-desc">${item.description}</p>
          <div class="dish-footer">
            <div class="dish-dietary-icons">
              ${item.dietary.map(d => `<span class="dietary-badge-icon">${d}</span>`).join('')}
            </div>
            <a href="menu.html" class="btn-detail-link">
              View on Menu <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     6. Table Booking Module
     -------------------------------------------------------------------------- */
  function initReservationModule() {
    const dateInput = document.getElementById('formDate');
    const quickDate = document.getElementById('quickDate');
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.value = today;
    if (quickDate) quickDate.value = today;

    document.getElementById('reservationForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      
      state.bookingData.name = document.getElementById('formName').value;
      state.bookingData.email = document.getElementById('formEmail').value;
      state.bookingData.phone = document.getElementById('formPhone').value;
      state.bookingData.notes = document.getElementById('formNotes').value;
      state.bookingData.guests = document.getElementById('formGuests').value;
      state.bookingData.date = document.getElementById('formDate').value;
      state.bookingData.time = document.getElementById('formTime').value;

      renderVirtualPass();
      nextBookingStep(4);
      showToast("Table reservation successfully confirmed!");
    });
  }

  window.nextBookingStep = function(step) {
    state.bookingStep = step;

    document.querySelectorAll('.step-item').forEach(item => {
      const s = parseInt(item.dataset.step);
      item.classList.remove('active');
      if (s <= step) item.classList.add('active');
    });

    for (let i = 1; i <= 4; i++) {
      const pane = document.getElementById(`stepPane${i}`);
      if (pane) pane.style.display = (i === step) ? 'block' : 'none';
    }
  };

  window.selectSeating = function(element, areaName) {
    document.querySelectorAll('.seating-option-card').forEach(card => card.classList.remove('selected'));
    element.classList.add('selected');
    state.bookingData.seating = areaName;
  };

  function renderVirtualPass() {
    const ticketBox = document.getElementById('virtualPassTicket');
    if (!ticketBox) return;

    const bookingId = 'LUMI-' + Math.floor(100000 + Math.random() * 900000);

    ticketBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(212, 175, 55, 0.3); padding-bottom: 1rem; margin-bottom: 1rem;">
        <div>
          <span style="font-size: 0.75rem; color: var(--gold-primary); font-weight: 700; letter-spacing: 2px;">RESERVATION PASS</span>
          <h4 style="color: var(--text-primary); font-size: 1.2rem;">${state.bookingData.name}</h4>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">CONFIRMATION ID</span>
          <strong style="color: var(--gold-primary); font-size: 1rem;">${bookingId}</strong>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Date & Time</span>
          <strong style="color: var(--text-primary);">${state.bookingData.date} @ ${state.bookingData.time}</strong>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Party Size</span>
          <strong style="color: var(--text-primary);">${state.bookingData.guests} Guests</strong>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Seating Area</span>
          <strong style="color: var(--gold-primary);">${state.bookingData.seating}</strong>
        </div>
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Venue</span>
          <strong style="color: var(--text-primary);">Lumière Midtown NYC</strong>
        </div>
      </div>

      <div style="text-align: center; border-top: 1px dashed rgba(212, 175, 55, 0.3); padding-top: 1rem;">
        <i class="fa-solid fa-barcode" style="font-size: 2.5rem; color: var(--gold-primary); letter-spacing: 6px;"></i>
        <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Please present this pass to our hostess upon arrival</span>
      </div>
    `;
  }

  window.resetReservationForm = function() {
    document.getElementById('reservationForm')?.reset();
    nextBookingStep(1);
  };

  /* --------------------------------------------------------------------------
     7. Happy Hour Timer
     -------------------------------------------------------------------------- */
  function initHappyHourTimer() {
    const cdH = document.getElementById('cdHours');
    if (!cdH) return;

    let hours = 3, minutes = 42, seconds = 18;

    setInterval(() => {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          minutes = 59;
          hours--;
          if (hours < 0) hours = 4;
        }
      }

      if (cdH) cdH.innerText = String(hours).padStart(2, '0');
      document.getElementById('cdMinutes').innerText = String(minutes).padStart(2, '0');
      document.getElementById('cdSeconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);
  }

  /* --------------------------------------------------------------------------
     8. Customer Reviews Grid
     -------------------------------------------------------------------------- */
  function initReviewsGrid() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;

    grid.innerHTML = restaurantData.reviews.map(rev => `
      <div class="review-card">
        <i class="fa-solid fa-quote-right quote-icon"></i>
        <div class="stars-wrap">
          ${'<i class="fa-solid fa-star"></i>'.repeat(rev.rating)}
        </div>
        <p class="review-text">"${rev.comment}"</p>

        <div class="reviewer-meta">
          <img src="${rev.avatar}" alt="${rev.author}" class="reviewer-avatar">
          <div class="reviewer-info">
            <strong>${rev.author}</strong>
            <span>${rev.title}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     9. Cart & Persistent Storage System
     -------------------------------------------------------------------------- */
  function initCartModule() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    const openBtn = document.getElementById('openCartBtn');
    const closeBtn = document.getElementById('closeCartBtn');

    openBtn?.addEventListener('click', () => {
      overlay?.classList.add('active');
      drawer?.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => {
      overlay?.classList.remove('active');
      drawer?.classList.remove('active');
    });

    overlay?.addEventListener('click', () => {
      overlay?.classList.remove('active');
      drawer?.classList.remove('active');
    });

    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast("Your food bag is currently empty!");
        return;
      }
      showToast("Order Placed! Thank you for ordering from Lumière.");
      state.cart = [];
      saveAndRenderCart();
      overlay?.classList.remove('active');
      drawer?.classList.remove('active');
    });

    renderCartUI();
  }

  window.quickAddToCart = function(id) {
    const item = restaurantData.menuItems.find(i => i.id === id);
    if (!item) return;

    const existing = state.cart.find(c => c.id === id);
    if (existing) {
      existing.qty++;
    } else {
      state.cart.push({ ...item, qty: 1 });
    }

    saveAndRenderCart();
    showToast(`Added "${item.title}" to your bag!`);
  };

  window.updateCartQty = function(id, delta) {
    const item = state.cart.find(c => c.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter(c => c.id !== id);
    }
    saveAndRenderCart();
  };

  function saveAndRenderCart() {
    localStorage.setItem('lumiere_cart', JSON.stringify(state.cart));
    renderCartUI();
  }

  function renderCartUI() {
    const cartList = document.getElementById('cartItemsList');
    const cartCount = document.getElementById('cartCount');
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const totalEl = document.getElementById('cartTotal');

    if (!cartList || !cartCount) return;

    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.innerText = totalQty;

    if (state.cart.length === 0) {
      cartList.innerHTML = `
        <div style="text-align: center; margin: 5rem 0; color: var(--text-muted);">
          <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; color: var(--gold-primary); opacity: 0.3; margin-bottom: 1rem;"></i>
          <p>Your food bag is empty.</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.innerText = '$0.00';
      if (taxEl) taxEl.innerText = '$0.00';
      if (totalEl) totalEl.innerText = '$0.00';
      return;
    }

    cartList.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>

        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
          <span style="font-size: 0.9rem; font-weight: 600;">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    `).join('');

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * 0.08875;
    const total = subtotal + tax;

    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
  }

  /* --------------------------------------------------------------------------
     10. Toast Helper
     -------------------------------------------------------------------------- */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = msg;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
