/**
 * UNICORN DIGITAL MEDIA - Main Interactive Script
 * High-performance agency frontend logic
 */

const UNICORN_CONFIG = {
  businessName: "Unicorn Digital Mediaa",
  founder: "Mr. Karan Sahani",
  whatsappNumber: "919455069464", // Mobile: 9455069464
  supportEmail: "unicorndigitalmediaa@gmail.com",
  domain: "unicorndigitalmediaa.com",
  phone: "+91 94550 69464",
  instagram: "https://instagram.com",
};

// Initialize Lucide Icons if available
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  initHeroCanvas();
  initCounters();
  initPortfolioFilter();
  initContactForms();
  initServiceModal();
  initQuoteCalculator();
  initMobileMenu();
});

// Toast notification helper
function showToast(message, icon = 'check-circle') {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 text-emerald-400"></i> <span>${message}</span>`;
  if (window.lucide) window.lucide.createIcons();
  
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// WhatsApp redirect builder - Guarantees direct opening of WhatsApp
function sendWhatsAppMessage(text) {
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${UNICORN_CONFIG.whatsappNumber}?text=${encodedText}`;
  const win = window.open(url, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = url;
  }
}

// Trigger inquiry for a specific service
function openServiceInquiry(serviceTitle) {
  const modal = document.getElementById('serviceModal');
  const serviceInput = document.getElementById('modalServiceInput');
  const modalHeading = document.getElementById('modalHeading');
  
  if (serviceInput && modalHeading) {
    serviceInput.value = serviceTitle;
    modalHeading.textContent = `Get Quote: ${serviceTitle}`;
  }
  
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeServiceModal() {
  const modal = document.getElementById('serviceModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Setup Service Modal
function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeServiceModal();
    }
  });

  const modalForm = document.getElementById('serviceInquiryForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalNameInput').value.trim();
      const phone = document.getElementById('modalPhoneInput').value.trim();
      const service = document.getElementById('modalServiceInput').value.trim();
      const notes = document.getElementById('modalNotesInput').value.trim();

      const message = `👋 Hello *${UNICORN_CONFIG.businessName}*,\n\nI want to inquire about: *${service}*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n📝 *Requirement:* ${notes || 'Standard enquiry'}\n\nPlease share quotation, portfolio samples and pricing packages.`;
      
      closeServiceModal();
      showToast('Opening WhatsApp with your request...');
      setTimeout(() => {
        sendWhatsAppMessage(message);
      }, 500);
    });
  }
}

// Direct quick contact form
function initContactForms() {
  const quickForm = document.getElementById('mainContactForm');
  if (!quickForm) return;

  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const messageText = document.getElementById('contactMessage').value.trim();

    const fullMessage = `🔥 *NEW PROJECT ENQUIRY*\n━━━━━━━━━━━━━━━━━\n🏢 *To:* ${UNICORN_CONFIG.businessName}\n👤 *Name:* ${name}\n📱 *Contact:* ${phone}\n🎯 *Service Required:* ${service}\n💬 *Project Brief:* ${messageText || 'Please contact me for details.'}`;

    showToast('Redirecting to WhatsApp for instant reply...');
    setTimeout(() => {
      sendWhatsAppMessage(fullMessage);
    }, 500);
  });
}

// Portfolio Category Filter
function initPortfolioFilter() {
  const buttons = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.portfolio-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.classList.add('animate-fadeIn');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Custom Package Builder (Prices Removed)
function initQuoteCalculator() {
  const calcForm = document.getElementById('quoteCalculatorForm');
  if (!calcForm) return;

  const checkboxes = calcForm.querySelectorAll('.calc-checkbox');
  const speedSelect = document.getElementById('calcSpeed');
  const estimateDisplay = document.getElementById('calcEstimateResult');

  function updateEstimate() {
    let selectedServices = [];

    checkboxes.forEach(cb => {
      if (cb.checked) {
        selectedServices.push(cb.getAttribute('data-name'));
      }
    });

    if (estimateDisplay) {
      if (selectedServices.length === 0) {
        estimateDisplay.textContent = '0 Services Selected';
      } else if (selectedServices.length === 1) {
        estimateDisplay.textContent = '1 Service Selected';
      } else {
        estimateDisplay.textContent = `${selectedServices.length} Services Selected (Combo Pack)`;
      }
    }

    return { selectedServices };
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateEstimate));
  if (speedSelect) speedSelect.addEventListener('change', updateEstimate);

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { selectedServices } = updateEstimate();

    if (selectedServices.length === 0) {
      alert('Please select at least one service to get a custom quote.');
      return;
    }

    const clientName = document.getElementById('calcClientName')?.value.trim() || 'Valued Client';
    const turnaround = speedSelect ? speedSelect.value : 'Standard Delivery';
    const msg = `⚡ *CUSTOM PACKAGE QUOTE REQUEST*\n━━━━━━━━━━━━━━━━━\n🏢 *Agency:* ${UNICORN_CONFIG.businessName}\n👤 *Client:* ${clientName}\n⏱️ *Turnaround:* ${turnaround}\n\n🛠️ *Selected Services (${selectedServices.length}):*\n${selectedServices.map(s => '• ' + s).join('\n')}\n\nPlease share the best quotation and package proposal for our requirements.`;

    sendWhatsAppMessage(msg);
  });
}

// Animated Numerical Counters
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  function runCounters() {
    if (animated) return;
    const statsSection = document.getElementById('statsSection');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = target / 50;

        const update = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count).toLocaleString('en-IN') + suffix;
            requestAnimationFrame(update);
          } else {
            counter.innerText = target.toLocaleString('en-IN') + suffix;
          }
        };
        update();
      });
    }
  }

  window.addEventListener('scroll', runCounters);
  runCounters();
}

// Mobile Menu Drawer
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.remove('hidden');
      drawer.classList.add('flex');
    });
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  navLinks.forEach(link => link.addEventListener('click', closeDrawer));
}

// Global helper for opening direct WhatsApp
function directWhatsAppInquiry(defaultTopic = "General Services") {
  const text = `Hello *${UNICORN_CONFIG.businessName}*! 👋\nI am interested in your *${defaultTopic}*. Please share pricing, packages, and sample works.`;
  sendWhatsAppMessage(text);
}

// Interactive Dynamic Cyber Particle & Starfield Background Engine
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('home');
  if (!heroSection) return;

  let width = (canvas.width = heroSection.offsetWidth);
  let height = (canvas.height = heroSection.offsetHeight);

  const colors = [
    'rgba(147, 51, 234, ',  // Neon Purple
    'rgba(6, 182, 212, ',   // Cyber Cyan
    'rgba(236, 72, 153, ',  // Bright Pink
    'rgba(245, 158, 11, ',  // 24K Gold
    'rgba(255, 255, 255, '  // Luminous Star
  ];

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 10000), 75);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      baseColor: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.3,
      alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  // Shooting Stars (Meteors)
  const meteors = [];
  function createMeteor() {
    meteors.push({
      x: Math.random() * width * 0.8 + width * 0.1,
      y: Math.random() * height * 0.35,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 9 + 7,
      angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 deg
      opacity: 1,
      fade: Math.random() * 0.02 + 0.015
    });
  }

  let meteorTimer = 0;

  // Mouse interaction
  let mouse = { x: null, y: null, active: false };
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Pulsing alpha
      p.alpha += p.alphaSpeed;
      if (p.alpha > 0.9 || p.alpha < 0.2) p.alphaSpeed = -p.alphaSpeed;

      // Draw particle circle with soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.baseColor + p.alpha + ')';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const lineAlpha = (1 - dist / 115) * 0.22;
          ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse if close
      if (mouse.active) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - mDist / 140) * 0.45})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Meteor animations
    meteorTimer++;
    if (meteorTimer > 200) {
      if (Math.random() < 0.45) createMeteor();
      meteorTimer = 0;
    }

    for (let m = meteors.length - 1; m >= 0; m--) {
      const meteor = meteors[m];
      meteor.x += Math.cos(meteor.angle) * meteor.speed;
      meteor.y += Math.sin(meteor.angle) * meteor.speed;
      meteor.opacity -= meteor.fade;

      if (meteor.opacity <= 0 || meteor.x > width || meteor.y > height) {
        meteors.splice(m, 1);
        continue;
      }

      const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
      const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

      const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.7, `rgba(147, 51, 234, ${meteor.opacity * 0.6})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${meteor.opacity})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(meteor.x, meteor.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Glowing head
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
