// ============ PAGE NAVIGATION ============
function navigatePage(page) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach(el => {
    el.classList.add('hidden');
  });

  // Show selected page
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }

  // Update navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-white', 'text-emerald-700');
    btn.classList.add('bg-emerald-600', 'text-white');
  });
  
  const activeBtn = document.getElementById(`nav-${page}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-emerald-600', 'text-white');
    activeBtn.classList.add('active', 'bg-white', 'text-emerald-700');
  }

  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ HITUNG ZIKIR FUNCTIONALITY ============
let counter = 0;
let target = 33;

function increment() {
  counter++;
  updateDisplay();
  triggerButtonAnimation('.add-btn');
  checkTarget();
}

function resetCounter() {
  counter = 0;
  const notifArea = document.getElementById('notification-area');
  if (notifArea) {
    notifArea.classList.add('hidden');
  }
  updateDisplay();
  triggerButtonAnimation('.reset-btn');
}

function setTarget(value) {
  target = value;
  const customInput = document.getElementById('customTarget');
  if (customInput) {
    customInput.value = '';
  }
  updateDisplay();
}

function setCustomTarget() {
  const customTarget = document.getElementById('customTarget');
  if (customTarget && customTarget.value && !isNaN(customTarget.value) && customTarget.value > 0) {
    target = parseInt(customTarget.value);
    updateDisplay();
  } else {
    alert('Masukkan angka target yang valid!');
  }
}

function updateDisplay() {
  const counterEl = document.getElementById('counter');
  const targetValueEl = document.getElementById('target-value');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  if (counterEl) counterEl.textContent = counter;
  if (targetValueEl) targetValueEl.textContent = target;

  // Update progress bar
  if (progressBar) {
    const progressPercent = Math.min((counter / target) * 100, 100);
    progressBar.style.width = progressPercent + '%';
  }
  if (progressText) {
    progressText.textContent = Math.round((counter / target) * 100) + '%';
  }
}

function checkTarget() {
  const notifArea = document.getElementById('notification-area');
  if (counter >= target && counter > 0) {
    if (notifArea) {
      notifArea.classList.remove('hidden');
    }
  } else {
    if (notifArea) {
      notifArea.classList.add('hidden');
    }
  }
}

function triggerButtonAnimation(selector) {
  const btn = document.querySelector(selector);
  if (btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 100);
  }
}

// ============ DOA PAGE FUNCTIONALITY ============
function showCategory(category) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-emerald-500', 'text-white');
    btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
  });
  
  const activeTabBtn = document.getElementById(`tab-${category}`);
  if (activeTabBtn) {
    activeTabBtn.classList.add('active', 'bg-emerald-500', 'text-white');
    activeTabBtn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
  }

  // Update cards
  document.querySelectorAll('.card').forEach(card => {
    if (category === 'semua' || card.classList.contains(`category-${category}`)) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn 0.3s ease-in';
    } else {
      card.classList.add('hidden');
    }
  });
}

// ============ COPY TO CLIPBOARD ============
function copyToClipboard(button, text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toastMessage) {
      toastMessage.textContent = 'Doa berhasil disalin!';
    }
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 2500);
    }
  });
}

// ============ SHARE FUNCTION ============
function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: 'Kumpulan Doa Ramadhan',
      text: 'Aplikasi doa Ramadhan untuk membantu ibadah Anda 🌙',
      url: window.location.href
    });
  } else {
    alert('Bagikan URL ini: ' + window.location.href);
  }
}
