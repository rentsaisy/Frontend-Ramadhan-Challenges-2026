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
// ============ KALKULATOR ZAKAT FUNCTIONALITY ============
function changeZakatType() {
  const zakatType = document.getElementById('zakatType').value;
  const formPenghasilan = document.getElementById('formPenghasilan');
  const formEmas = document.getElementById('formEmas');
  const goldPriceContainer = document.getElementById('goldPriceContainer');
  
  if (zakatType === 'penghasilan') {
    formPenghasilan.classList.remove('hidden');
    formEmas.classList.add('hidden');
    // Sembunyikan input harga emas untuk zakat penghasilan
    goldPriceContainer.classList.add('hidden');
  } else {
    formPenghasilan.classList.add('hidden');
    formEmas.classList.remove('hidden');
    // Tampilkan input harga emas untuk zakat emas
    goldPriceContainer.classList.remove('hidden');
  }
}

function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(Math.round(num));
}

function calculateZakat() {
  const zakatType = document.getElementById('zakatType').value;
  
  let zakatAmount = 0;
  let isWajibZakat = false;
  
  if (zakatType === 'penghasilan') {
    // ===== ZAKAT PENGHASILAN (BERDASARKAN PENGHASILAN BULANAN) =====
    const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 900000;
    
    // Ambil input penghasilan bulanan
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const otherIncome = parseFloat(document.getElementById('otherIncome').value) || 0;
    
    // Total penghasilan bulanan bersih
    const monthlyAmount = salary + otherIncome;
    
    // Hitung nisab bulanan = (Harga emas per gram × 85 gram) ÷ 12 bulan
    const nisabPerYear = goldPrice * 85;
    const nisabPerMonth = nisabPerYear / 12;
    
    // Bandingkan penghasilan bulanan dengan nisab bulanan
    if (monthlyAmount >= nisabPerMonth) {
      isWajibZakat = true;
      // Zakat per bulan = 2.5% × Penghasilan bulanan bersih
      zakatAmount = monthlyAmount * 0.025;
    } else {
      isWajibZakat = false;
      zakatAmount = 0;
    }
    
    // Update result display untuk zakat penghasilan
    document.getElementById('monthlyIncomeBox').classList.remove('hidden');
    document.getElementById('monthlyNisabBox').classList.remove('hidden');
    document.getElementById('totalEmasBox').classList.add('hidden');
    
    document.getElementById('monthlyAmount').textContent = formatNumber(monthlyAmount);
    document.getElementById('monthlyNisabAmount').textContent = formatNumber(nisabPerMonth);
    document.getElementById('nisabAmount').textContent = formatNumber(nisabPerYear);
    
    // Update label untuk zakat amount (per bulan)
    document.getElementById('zakatLabel').textContent = 'Jumlah Zakat Per Bulan (2,5%)';
    
    // Sembunyikan input harga emas untuk zakat penghasilan (opsional)
    // document.getElementById('goldPriceContainer').classList.add('hidden');
    
  } else {
    // ===== ZAKAT EMAS =====
    const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 900000;
    const goldAmount = parseFloat(document.getElementById('goldAmount').value) || 0;
    
    // Update gold price display
    document.getElementById('goldPriceDisplay').textContent = formatNumber(goldPrice);
    
    // Calculate nisab (85 gram emas)
    const nisabGram = 85;
    const nisabAmount = goldPrice * nisabGram;
    
    // Hitung nilai total emas
    const totalEmasAmount = goldAmount * goldPrice;
    
    // Bandingkan jumlah emas dengan nisab (85 gram)
    if (goldAmount >= nisabGram) {
      isWajibZakat = true;
      // Zakat = 2.5% dari jumlah emas (dalam gram), dikonversi ke rupiah
      zakatAmount = (goldAmount * 0.025) * goldPrice;
    } else {
      isWajibZakat = false;
      zakatAmount = 0;
    }
    
    // Update result display untuk zakat emas
    document.getElementById('monthlyIncomeBox').classList.add('hidden');
    document.getElementById('monthlyNisabBox').classList.add('hidden');
    document.getElementById('totalEmasBox').classList.remove('hidden');
    
    document.getElementById('totalAmount').textContent = formatNumber(totalEmasAmount);
    document.getElementById('nisabAmount').textContent = formatNumber(nisabAmount);
    
    // Update label untuk zakat amount (total)
    document.getElementById('zakatLabel').textContent = 'Jumlah Zakat yang Harus Dibayarkan (2,5%)';
    
    // Tampilkan input harga emas untuk zakat emas
    // document.getElementById('goldPriceContainer').classList.remove('hidden');
  }
  
  // Update status dan zakat (sama untuk keduanya)
  document.getElementById('zakatAmount').textContent = formatNumber(zakatAmount);
  
  // Update status
  const statusEl = document.getElementById('zakatStatus');
  if (isWajibZakat) {
    statusEl.textContent = '✓ Wajib Zakat';
    statusEl.className = 'inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold';
  } else {
    statusEl.textContent = '✗ Tidak Wajib Zakat';
    statusEl.className = 'inline-block px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold';
  }
  
  // Trigger animation
  const resultContainer = document.getElementById('resultContainer');
  if (resultContainer) {
    resultContainer.style.animation = 'fadeIn 0.3s ease-in';
  }
}

// Add event listeners when page loads
function initZakatPage() {
  const goldPriceInput = document.getElementById('goldPrice');
  const goldPriceContainer = document.getElementById('goldPriceContainer');
  
  // Sembunyikan input harga emas karena default adalah zakat penghasilan
  if (goldPriceContainer) {
    goldPriceContainer.classList.add('hidden');
  }
  
  if (goldPriceInput) {
    goldPriceInput.addEventListener('input', () => {
      const goldPrice = parseFloat(goldPriceInput.value) || 900000;
      document.getElementById('goldPriceDisplay').textContent = formatNumber(goldPrice);
    });
  }
}

// Initialize zakat page when navigating to it
const originalNavigatePage = navigatePage;
navigatePage = function(page) {
  originalNavigatePage(page);
  if (page === 'zakat') {
    setTimeout(() => initZakatPage(), 100);
  }
};