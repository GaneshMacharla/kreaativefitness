/**
 * KREAATIVE FITNESS - Interactive Logic & Conversion Engine
 * Phone: +91 8099221403 | Location: Chintal, Hyderabad
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveGymStatus();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initFaqAccordion();
  initScheduleTabs();
  initGalleryFilter();
  initBmiCalculator();
  initTrialForms();
  initModalTriggers();
  initSmoothScroll();
});

/* ==========================================================================
   1. LIVE GYM STATUS (Based on Hyderabad IST)
   Mon - Sat: 5:00 AM - 10:00 PM
   Sun: 6:00 AM - 11:00 AM
   ========================================================================== */
function initLiveGymStatus() {
  const badgeEl = document.getElementById('liveStatusBadge');
  const textEl = document.getElementById('liveStatusText');
  const drawerBadge = document.getElementById('drawerStatusBadge');
  const drawerText = document.getElementById('drawerStatusText');
  if (!badgeEl || !textEl) return;

  function updateStatus() {
    // Get current time in Indian Standard Time (UTC + 5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (3600000 * 5.5));

    const day = istTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const decimalHour = hours + (minutes / 60);

    let isOpen = false;
    let closingTimeMsg = '';

    if (day === 0) {
      // Sunday: 6:00 AM to 11:00 AM
      if (decimalHour >= 6 && decimalHour < 11) {
        isOpen = true;
        closingTimeMsg = 'Open Today until 11:00 AM (Sunday Zumba Session)';
      } else {
        isOpen = false;
        closingTimeMsg = decimalHour < 6 ? 'Opens at 6:00 AM (Sunday Zumba)' : 'Closed • Opens Mon 5:00 AM';
      }
    } else {
      // Monday to Saturday: 5:00 AM to 10:00 PM (22:00)
      if (decimalHour >= 5 && decimalHour < 22) {
        isOpen = true;
        closingTimeMsg = 'Open Now until 10:00 PM';
      } else {
        isOpen = false;
        closingTimeMsg = decimalHour < 5 ? 'Opens Today at 5:00 AM' : 'Closed for the night • Opens at 5:00 AM';
      }
    }

    if (isOpen) {
      badgeEl.className = 'status-badge';
      textEl.innerHTML = `<span class="status-dot"></span> <strong>${closingTimeMsg}</strong>`;
      if (drawerBadge && drawerText) {
        drawerBadge.className = 'status-badge';
        drawerText.innerHTML = 'Open Now';
      }
    } else {
      badgeEl.className = 'status-badge closed';
      textEl.innerHTML = `<span class="status-dot"></span> <span>${closingTimeMsg}</span>`;
      if (drawerBadge && drawerText) {
        drawerBadge.className = 'status-badge closed';
        drawerText.innerHTML = 'Closed';
      }
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000); // refresh every minute
}

/* ==========================================================================
   2. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.getElementById('closeDrawerBtn');
  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking any nav link or CTA button inside drawer
  drawer.querySelectorAll('.drawer-link, [data-open-trial-modal], .drawer-contact-btn').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ==========================================================================
   5. SCHEDULE TABS
   ========================================================================== */
function initScheduleTabs() {
  const tabButtons = document.querySelectorAll('.schedule-tab-btn');
  const tabPanels = document.querySelectorAll('.schedule-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. REAL GYM GALLERY FILTER
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE BMI & FITNESS GOAL CALCULATOR
   ========================================================================== */
function initBmiCalculator() {
  const heightInput = document.getElementById('bmiHeight');
  const weightInput = document.getElementById('bmiWeight');
  const scoreDisplay = document.getElementById('bmiScore');
  const categoryBadge = document.getElementById('bmiCategory');
  const summaryDisplay = document.getElementById('bmiSummary');
  const whatsappReportBtn = document.getElementById('bmiWhatsappBtn');

  if (!heightInput || !weightInput || !scoreDisplay) return;

  function calculateBMI() {
    const h = parseFloat(heightInput.value);
    const w = parseFloat(weightInput.value);

    if (!h || !w || h <= 50 || w <= 20) {
      scoreDisplay.textContent = '--.-';
      categoryBadge.textContent = 'Enter Details';
      categoryBadge.className = 'calc-category-badge';
      summaryDisplay.textContent = 'Enter your height and weight to view your personalized body mass index and custom workout plan.';
      if (whatsappReportBtn) whatsappReportBtn.style.display = 'none';
      return;
    }

    const heightInMeters = h / 100;
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(1);
    scoreDisplay.textContent = bmi;

    let category = '';
    let categoryClass = '';
    let advice = '';
    let recommendedProgram = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryClass = 'calc-category-badge';
      advice = `Your BMI is ${bmi}. Recommended: Lean Muscle Hypertrophy Program with high-protein nutritional guidance.`;
      recommendedProgram = 'Muscle Gain & Strength Program';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'Healthy & Normal';
      categoryClass = 'calc-category-badge normal';
      advice = `Your BMI is ${bmi}. Excellent! Recommended: Functional Athletic Conditioning & Progressive Strength.`;
      recommendedProgram = 'Strength & Crossfit Conditioning';
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = 'Overweight';
      categoryClass = 'calc-category-badge overweight';
      advice = `Your BMI is ${bmi}. Recommended: Fat Shredding High-Intensity Circuit + Sunday Zumba sessions.`;
      recommendedProgram = 'Fat Loss & Zumba Conditioning';
    } else {
      category = 'Obese Range';
      categoryClass = 'calc-category-badge';
      advice = `Your BMI is ${bmi}. Recommended: 1-on-1 Guided Metabolic Fat Loss Transformation & safe cardio.`;
      recommendedProgram = 'Personalized Transformation Plan';
    }

    categoryBadge.textContent = category;
    categoryBadge.className = categoryClass;
    summaryDisplay.textContent = advice;

    if (whatsappReportBtn) {
      whatsappReportBtn.style.display = 'inline-flex';
      const msg = encodeURIComponent(`Hello Kreaative Fitness! I checked my BMI on your website: Height ${h}cm, Weight ${w}kg, BMI ${bmi} (${category}). I want to consult for your ${recommendedProgram} at your Chintal branch!`);
      whatsappReportBtn.href = `https://wa.me/918099221403?text=${msg}`;
    }
  }

  heightInput.addEventListener('input', calculateBMI);
  weightInput.addEventListener('input', calculateBMI);
  calculateBMI(); // initial calculation with defaults
}

/* ==========================================================================
   8. FREE TRIAL FORMS (Direct WhatsApp Lead Automation)
   ========================================================================== */
function initTrialForms() {
  const forms = [document.getElementById('trialInlineForm'), document.getElementById('trialModalForm')];

  forms.forEach(form => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="client_name"]')?.value.trim() || 'Fitness Enthusiast';
      const phone = form.querySelector('[name="client_phone"]')?.value.trim() || '';
      const goal = form.querySelector('[name="client_goal"]')?.value || 'Weight Loss & Fitness';
      const slot = form.querySelector('[name="client_slot"]')?.value || 'Morning Batch (5AM - 12PM)';

      if (!phone || phone.length < 10) {
        alert('Please enter a valid 10-digit mobile number so we can confirm your Free Trial Pass.');
        return;
      }

      // Generate WhatsApp Direct Booking URL
      const text = encodeURIComponent(
        `Hi Kreaative Fitness! 👋\n\nI want to book a 1-Day FREE Trial Pass!\n\n` +
        `👤 Name: ${name}\n` +
        `📞 Phone: ${phone}\n` +
        `🎯 Fitness Goal: ${goal}\n` +
        `⏰ Preferred Time: ${slot}\n` +
        `📍 Location: Opposite Domino's, Chintal, Hyderabad\n\n` +
        `Please confirm my trial slot!`
      );

      const waUrl = `https://wa.me/918099221403?text=${text}`;

      // Show instant feedback button state
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `✓ Opening WhatsApp Confirmation...`;
        submitBtn.style.background = '#25d366';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }

      // Close modal if open
      closeModal();

      // Open WhatsApp
      window.open(waUrl, '_blank');
    });
  });
}

/* ==========================================================================
   9. MODAL POPUP TRIGGERS
   ========================================================================== */
const modalBackdrop = document.getElementById('trialModal');

function openModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModalTriggers() {
  const openButtons = document.querySelectorAll('[data-open-trial-modal]');
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   11. ACTIVE SCROLL SPY FOR NAVBAR
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
  const drawerLinks = document.querySelectorAll('.mobile-drawer .drawer-link');
  if (!sections.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 120;
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (window.scrollY < 200) {
      currentId = 'home';
    }

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    drawerLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
