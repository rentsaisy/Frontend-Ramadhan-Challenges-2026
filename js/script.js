/* ============================================
   RAMADHAN PORTAL - JAVASCRIPT
   Performance: Event delegation, Debouncing, Caching
   ============================================ */

// ============================================
// PERFORMANCE: CACHING & DEBOUNCING UTILITIES
// ============================================

// Debounce function for resize/scroll events
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Cache DOM elements
const domCache = {
    menuToggle: null,
    navMenu: null,
    navLinks: null,
    
    init() {
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        return this;
    },
    
    clear() {
        this.menuToggle = null;
        this.navMenu = null;
        this.navLinks = null;
    }
};

// ============================================
// NAVBAR FUNCTIONALITY (OPTIMIZED)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cache
    domCache.init();
    
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active link based on current page
    domCache.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle different page paths - optimized logic
        if ((currentPage === 'index.html' || !currentPage) && (href === 'index.html' || href === './index.html') ||
            (currentPage === 'jadwal.html' && href.includes('jadwal')) ||
            (currentPage === 'doa.html' && href.includes('doa') && !href.includes('sahur')) ||
            (currentPage === 'todo.html' && href.includes('todo')) ||
            (currentPage === 'zakat.html' && href.includes('zakat')) ||
            (currentPage === 'zikir.html' && href.includes('zikir'))) {
            link.classList.add('active');
        }
    });
    
    // Toggle mobile menu
    if (domCache.menuToggle) {
        domCache.menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Close mobile menu when a link is clicked
    domCache.navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close mobile menu when clicking outside (delegated)
    document.addEventListener('click', handleOutsideClick, false);
});

// Optimized menu toggle
function toggleMenu() {
    domCache.menuToggle.classList.toggle('active');
    domCache.navMenu.classList.toggle('active');
    
    // Announce for accessibility
    const isOpen = domCache.navMenu.classList.contains('active');
    domCache.menuToggle.setAttribute('aria-expanded', isOpen);
}

// Close menu
function closeMenu() {
    domCache.menuToggle?.classList.remove('active');
    domCache.navMenu?.classList.remove('active');
    domCache.menuToggle?.setAttribute('aria-expanded', false);
}

// Handle outside click - optimized
function handleOutsideClick(event) {
    if (!domCache.navMenu || !domCache.menuToggle) return;
    
    const isClickInsideMenu = domCache.navMenu.contains(event.target);
    const isClickOnToggle = domCache.menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && domCache.navMenu.classList.contains('active')) {
        closeMenu();
    }
}

// ============================================
// HITUNG ZIKIR FUNCTIONALITY (OPTIMIZED)
// ============================================

let counter = 0;
let target = 33;
let lastAnimatedButton = null;

function increment() {
    counter++;
    updateDisplay();
    triggerButtonAnimation('.add-btn');
    checkTarget();
    saveZikirState(); // Auto-save
}

function resetCounter() {
    counter = 0;
    const notifArea = document.getElementById('notification-area');
    if (notifArea) {
        notifArea.classList.add('hidden');
    }
    updateDisplay();
    triggerButtonAnimation('.reset-btn');
    saveZikirState();
}

function setTarget(value) {
    target = value;
    const customInput = document.getElementById('customTarget');
    if (customInput) {
        customInput.value = '';
    }
    updateDisplay();
    saveZikirState();
}

function setCustomTarget() {
    const customTarget = document.getElementById('customTarget');
    if (customTarget && customTarget.value && !isNaN(customTarget.value) && customTarget.value > 0) {
        target = parseInt(customTarget.value);
        updateDisplay();
        saveZikirState();
    } else {
        alert('Masukkan angka target yang valid!');
    }
}

function updateDisplay() {
    const counterEl = document.getElementById('counter');
    const targetValueEl = document.getElementById('target-value');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressPercent = document.getElementById('progressPercent');
    const progressFill = document.getElementById('progressFill');

    // Update counter
    if (counterEl) counterEl.textContent = counter;
    if (targetValueEl) targetValueEl.textContent = target;

    // Calculate progress (cached to avoid repeated calculations)
    const progress = Math.min((counter / target) * 100, 100);

    // Update progress bar
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressText) progressText.textContent = Math.round(progress) + '%';
    if (progressPercent) progressPercent.textContent = Math.round(progress);
}

function checkTarget() {
    const notifArea = document.getElementById('notification-area');
    if (!notifArea) return;
    
    if (counter >= target && counter > 0) {
        notifArea.classList.remove('hidden');
    } else {
        notifArea.classList.add('hidden');
    }
}

function triggerButtonAnimation(selector) {
    const btn = document.querySelector(selector);
    if (btn && btn !== lastAnimatedButton) {
        lastAnimatedButton = btn;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    }
}

// ============================================
// STORAGE UTILITIES
// ============================================

function saveZikirState() {
    try {
        sessionStorage.setItem('zikir-counter', counter);
        sessionStorage.setItem('zikir-target', target);
    } catch (e) {
        console.warn('SessionStorage not available');
    }
}

function loadZikirState() {
    try {
        const savedCounter = sessionStorage.getItem('zikir-counter');
        const savedTarget = sessionStorage.getItem('zikir-target');
        
        if (savedCounter) counter = parseInt(savedCounter);
        if (savedTarget) target = parseInt(savedTarget);
        
        updateDisplay();
    } catch (e) {
        console.warn('SessionStorage not available');
    }
}

// ============================================
// DOA PAGE FUNCTIONALITY (OPTIMIZED)
// ============================================

function showCategory(category) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.card');
    
    // Update buttons efficiently
    tabBtns.forEach(btn => {
        const isActive = btn.id === `tab-${category}`;
        btn.classList.toggle('active', isActive);
        btn.classList.toggle('bg-emerald-500', isActive);
        btn.classList.toggle('text-white', isActive);
        btn.classList.toggle('bg-white', !isActive);
        btn.classList.toggle('text-gray-700', !isActive);
    });

    // Update cards efficiently
    cards.forEach(card => {
        const shouldShow = category === 'semua' || card.classList.contains(`category-${category}`);
        
        if (shouldShow) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            card.classList.add('hidden');
        }
    });
}

// ============================================
// COPY TO CLIPBOARD (OPTIMIZED)
// ============================================

function copyToClipboard(button, text) {
    // Use modern clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Doa berhasil disalin!');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Doa berhasil disalin!');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toastMessage) toastMessage.textContent = message;
    if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2500);
    }
}

// ============================================
// SHARE FUNCTION
// ============================================

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Ramadhan Portal 2026',
            text: 'Aplikasi Ramadhan untuk membantu ibadah Anda 🌙',
            url: window.location.href
        }).catch(err => console.log('Share cancelled:', err));
    } else {
        alert('Bagikan URL ini: ' + window.location.href);
    }
}

// ============================================
// KALKULATOR ZAKAT FUNCTIONALITY (OPTIMIZED)
// ============================================

function changeZakatType() {
    const zakatType = document.getElementById('zakatType').value;
    const formPenghasilan = document.getElementById('formPenghasilan');
    const formEmas = document.getElementById('formEmas');
    const goldPriceContainer = document.getElementById('goldPriceContainer');
    
    const isPenghasilan = zakatType === 'penghasilan';
    
    formPenghasilan?.classList.toggle('hidden', !isPenghasilan);
    formEmas?.classList.toggle('hidden', isPenghasilan);
    goldPriceContainer?.classList.toggle('hidden', isPenghasilan);
}

function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(Math.round(num));
}

function calculateZakat() {
    const zakatType = document.getElementById('zakatType').value;
    let zakatAmount = 0;
    let isWajibZakat = false;
    
    if (zakatType === 'penghasilan') {
        zakatAmount = calculateZakatPenghasilan();
    } else {
        zakatAmount = calculateZakatEmas();
    }
    
    displayZakatResult(zakatAmount);
}

function calculateZakatPenghasilan() {
    const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 900000;
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const otherIncome = parseFloat(document.getElementById('otherIncome').value) || 0;
    const monthlyAmount = salary + otherIncome;
    const nisabPerMonth = (goldPrice * 85) / 12;
    
    return monthlyAmount >= nisabPerMonth ? monthlyAmount * 0.025 : 0;
}

function calculateZakatEmas() {
    const goldPrice = parseFloat(document.getElementById('goldPrice').value) || 900000;
    const goldWeight = parseFloat(document.getElementById('goldWeight').value) || 0;
    
    return goldWeight >= 85 ? (goldWeight * 0.025) * goldPrice : 0;
}

function displayZakatResult(zakatAmount) {
    const resultContainer = document.getElementById('zakatResult');
    const zakatAmountEl = document.getElementById('zakatAmount');
    const statusMsg = document.getElementById('statusMessage');
    const statusInfo = document.getElementById('statusInfo');
    
    if (zakatAmountEl) zakatAmountEl.textContent = 'Rp ' + formatNumber(zakatAmount);
    
    if (resultContainer) {
        resultContainer.style.display = zakatAmount > 0 ? 'block' : 'none';
    }
    
    if (statusMsg && statusInfo) {
        if (zakatAmount > 0) {
            statusMsg.textContent = '✓ Zakat Wajib Dikeluarkan';
            statusInfo.style.background = '#e8f5e9';
            statusInfo.style.borderLeftColor = 'var(--primary-green)';
            statusMsg.style.color = 'var(--primary-green)';
        } else {
            statusMsg.textContent = '⚠️ Zakat Belum Wajib atau Nihil';
            statusInfo.style.background = '#fef5e7';
            statusInfo.style.borderLeftColor = 'var(--primary-gold)';
            statusMsg.style.color = '#b8860b';
        }
    }
}

// ============================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
    // Close menu with Escape key
    if (e.key === 'Escape' && domCache.navMenu?.classList.contains('active')) {
        closeMenu();
    }
});

// ============================================
// PERFORMANCE: LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute('data-src');
                observer.unobserve(entry.target);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}
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

// ============ IMSAKIYAH SCHEDULE FUNCTIONALITY ============
// Imsakiyah Schedule Controller
const ImsakiyahController = {
  currentCity: null,
  currentData: null,
  cities: [],
  citiesPromise: null,
  isInitialized: false,
  CACHE_KEY: 'imsakiyah_cities_cache',
  CACHE_EXPIRY_HOURS: 24,

  // Pre-load cities if not already loaded (called from index.html on app load)
  async loadCitiesIfNeeded() {
    if (this.cities.length > 0) {
      console.log('[Imsakiyah] Cities already loaded');
      return this.cities;
    }
    
    // Check cache first
    const cached = this.getCachedCities();
    if (cached && cached.length > 0) {
      console.log('[Imsakiyah] Using cached cities:', cached.length);
      this.cities = cached;
      return this.cities;
    }

    // Load from API if not in cache
    console.log('[Imsakiyah] Loading cities from API in background...');
    return await this.loadCities();
  },

  getCachedCities() {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const data = JSON.parse(cached);
      const expiry = new Date(data.timestamp).getTime() + (this.CACHE_EXPIRY_HOURS * 60 * 60 * 1000);
      
      if (Date.now() < expiry && data.cities && data.cities.length > 0) {
        console.log('[Imsakiyah] Cache is valid:', data.cities.length, 'cities');
        return data.cities;
      } else {
        console.log('[Imsakiyah] Cache expired or empty');
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }
    } catch (error) {
      console.warn('[Imsakiyah] Cache error:', error);
      return null;
    }
  },

  setCachedCities(cities) {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({
        cities: cities,
        timestamp: new Date().toISOString()
      }));
      console.log('[Imsakiyah] Cities cached:', cities.length);
    } catch (error) {
      console.warn('[Imsakiyah] Cache save error:', error);
    }
  },

  async loadCities() {
    // If already loading, return existing promise
    if (this.citiesPromise) {
      console.log('[Imsakiyah] Returning existing promise');
      return this.citiesPromise;
    }

    this.citiesPromise = this._loadCitiesFromAPI();
    try {
      const result = await this.citiesPromise;
      this.citiesPromise = null; // Reset after loading
      return result;
    } catch (error) {
      this.citiesPromise = null; // Reset on error
      throw error;
    }
  },

  async _loadCitiesFromAPI() {
    console.log('[Imsakiyah] Fetching cities from API...');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://api.myquran.com/v2/sholat/kota', { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      
      console.log('[Imsakiyah] Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log('[Imsakiyah] Response length:', text.length);
      
      if (!text) {
        throw new Error('Empty response from API');
      }
      
      const data = JSON.parse(text);
      console.log('[Imsakiyah] Parsed response:', typeof data, Object.keys(data || {}));
      
      if (!data) {
        throw new Error('No data in response');
      }
      
      // Handle both direct array and wrapped response
      let citiesArray = null;
      
      if (Array.isArray(data)) {
        citiesArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        citiesArray = data.data;
      } else if (data.data && Array.isArray(data.data.data)) {
        citiesArray = data.data.data;
      } else {
        console.error('[Imsakiyah] Unknown response structure:', data);
        throw new Error('Unexpected API response format');
      }
      
      if (!citiesArray || citiesArray.length === 0) {
        throw new Error('No cities data in response');
      }
      
      // Validate first city has required fields
      const firstCity = citiesArray[0];
      if (!firstCity.id || !firstCity.lokasi) {
        console.warn('[Imsakiyah] City data missing required fields:', firstCity);
        throw new Error('Cities data missing id or lokasi field');
      }
      
      this.cities = citiesArray;
      this.setCachedCities(this.cities);
      console.log('[Imsakiyah] Successfully loaded', this.cities.length, 'cities');
      return this.cities;
      
    } catch (error) {
      console.error('[Imsakiyah] API Error:', error.name, error.message);
      console.log('[Imsakiyah] Falling back to hardcoded cities...');
      
      // Use hardcoded fallback cities
      const fallbackCities = [
        { id: '1121', lokasi: 'JAKARTA PUSAT' },
        { id: '1102', lokasi: 'JAKARTA SELATAN' },
        { id: '1103', lokasi: 'JAKARTA TIMUR' },
        { id: '1104', lokasi: 'JAKARTA UTARA' },
        { id: '1105', lokasi: 'JAKARTA BARAT' },
        { id: '1201', lokasi: 'TANGERANG' },
        { id: '1202', lokasi: 'TANGERANG SELATAN' },
        { id: '1204', lokasi: 'BOGOR' },
        { id: '1206', lokasi: 'BEKASI' },
        { id: '1208', lokasi: 'BANDUNG' },
        { id: '1210', lokasi: 'CIREBON' },
        { id: '1301', lokasi: 'SEMARANG' },
        { id: '1303', lokasi: 'YOGYAKARTA' },
        { id: '1401', lokasi: 'SURABAYA' },
        { id: '1501', lokasi: 'BALI' },
        { id: '1601', lokasi: 'LOMBOK' },
        { id: '1701', lokasi: 'PONTIANAK' },
        { id: '1801', lokasi: 'BANJARMASIN' },
        { id: '1901', lokasi: 'MAKASSAR' },
        { id: '1903', lokasi: 'MANADO' },
        { id: '1905', lokasi: 'AMBON' }
      ];
      
      if (fallbackCities && fallbackCities.length > 0) {
        console.log('[Imsakiyah] Using', fallbackCities.length, 'fallback cities');
        this.cities = fallbackCities;
        return this.cities;
      } else {
        throw error;
      }
    }
  },

  populateCitySelect() {
    const citySelect = document.getElementById('city-select');
    const cityLoading = document.getElementById('city-loading');
    const cityError = document.getElementById('city-error');
    
    if (!citySelect) {
      console.warn('[Imsakiyah] city-select element not found');
      return false;
    }

    console.log('[Imsakiyah] Populating dropdown with', this.cities.length, 'cities');

    if (!this.cities || this.cities.length === 0) {
      console.warn('[Imsakiyah] No cities to populate');
      if (cityLoading) cityLoading.classList.add('hidden');
      if (cityError) cityError.classList.remove('hidden');
      return false;
    }

    // Clear existing options (keep the placeholder)
    const options = citySelect.querySelectorAll('option');
    for (let i = options.length - 1; i > 0; i--) {
      options[i].remove();
    }

    // Add cities from cache/API
    this.cities.forEach(city => {
      try {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.lokasi;
        citySelect.appendChild(option);
      } catch (error) {
        console.warn('[Imsakiyah] Error adding city option:', error);
      }
    });

    // Sort options alphabetically (except first one which is placeholder)
    const optionsArray = Array.from(citySelect.querySelectorAll('option')).slice(1);
    optionsArray.sort((a, b) => a.text.localeCompare(b.text, 'id'));
    optionsArray.forEach(option => citySelect.appendChild(option));

    // Verify options were added
    const newOptionsCount = citySelect.querySelectorAll('option').length - 1;
    console.log('[Imsakiyah] Added', newOptionsCount, 'options to dropdown');

    // Show select and hide loading/error
    citySelect.classList.remove('hidden');
    if (cityLoading) cityLoading.classList.add('hidden');
    if (cityError) cityError.classList.add('hidden');
    
    this.attachEventListener();
    return true;
  },

  showCityError() {
    const cityLoading = document.getElementById('city-loading');
    const cityError = document.getElementById('city-error');
    const citySelect = document.getElementById('city-select');
    
    console.log('[Imsakiyah] Showing error state');
    
    if (cityLoading) cityLoading.classList.add('hidden');
    if (citySelect) citySelect.classList.add('hidden');
    if (cityError) cityError.classList.remove('hidden');
  },

  retryLoadCities() {
    console.log('[Imsakiyah] Retrying city load...');
    const cityError = document.getElementById('city-error');
    const cityLoading = document.getElementById('city-loading');
    const citySelect = document.getElementById('city-select');
    
    // Show loading state
    if (cityError) cityError.classList.add('hidden');
    if (cityLoading) cityLoading.classList.remove('hidden');
    if (citySelect) citySelect.classList.add('hidden');
    
    // Reset state
    this.cities = [];
    this.citiesPromise = null;
    
    // Retry load
    this.loadCities()
      .then(() => {
        console.log('[Imsakiyah] Retry successful, populating dropdown');
        this.populateCitySelect();
      })
      .catch(error => {
        console.error('[Imsakiyah] Retry failed:', error);
        this.showCityError();
      });
  },

  attachEventListener() {
    if (this.isInitialized) {
      console.log('[Imsakiyah] Event listener already attached');
      return;
    }

    const citySelect = document.getElementById('city-select');
    if (citySelect) {
      // Remove any previous listeners
      const newSelect = citySelect.cloneNode(true);
      citySelect.parentNode.replaceChild(newSelect, citySelect);
      
      // Add new listener
      const listener = (e) => this.onCityChange(e);
      newSelect.addEventListener('change', listener);
      this.isInitialized = true;
      console.log('[Imsakiyah] Event listener attached');
    } else {
      console.warn('[Imsakiyah] city-select not found for event listener');
    }
  },

  onCityChange(event) {
    const cityId = event.target.value;
    console.log('[Imsakiyah] City changed:', cityId);
    
    if (cityId) {
      this.fetchSchedule(cityId);
    } else {
      this.reset();
    }
  },

  async fetchSchedule(cityId) {
    this.currentCity = cityId;
    this.showLoading();
    console.log('[Imsakiyah] Fetching schedule for city:', cityId);

    try {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      
      const url = `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${year}/${month}`;
      console.log('[Imsakiyah] API URL:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Gagal mengambil data dari server');
      
      const data = await response.json();
      console.log('[Imsakiyah] Response:', data);
      
      if (!data.data || !data.data.jadwal) {
        throw new Error('Format data tidak valid');
      }

      this.currentData = data.data.jadwal;
      console.log('[Imsakiyah] Data loaded:', this.currentData.length, 'rows');
      this.renderTable();
      this.hideLoading();
      this.hideError();
    } catch (error) {
      console.error('[Imsakiyah] Error:', error);
      this.showError(error.message);
      this.hideLoading();
    }
  },

  renderTable() {
    const tbody = document.getElementById('schedule-tbody');
    const tableContainer = document.getElementById('table-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!tbody || !this.currentData) {
      console.warn('[Imsakiyah] Missing tbody or data');
      return;
    }

    tbody.innerHTML = '';
    const today = new Date();
    const todayDate = today.getDate();

    this.currentData.forEach((item) => {
      const row = document.createElement('tr');
      const date = parseInt(item.tanggal);
      const isToday = date === todayDate;
      
      row.className = `border-b border-gray-200 transition-all hover:bg-emerald-50 ${
        isToday ? 'bg-gradient-to-r from-amber-100 to-yellow-50' : 'bg-white'
      }`;
      
      if (isToday) {
        row.classList.add('highlight-today');
      }
      
      row.innerHTML = `
        <td class="px-4 py-4 font-semibold text-gray-800 ${isToday ? 'text-amber-900' : ''}">
          ${item.tanggal}
          ${isToday ? '<span class="ml-2 text-xs bg-amber-500 text-white px-2 py-1 rounded font-bold">HARI INI</span>' : ''}
        </td>
        <td class="px-4 py-4 text-center font-semibold text-emerald-700">${item.imsak}</td>
        <td class="px-4 py-4 text-center font-semibold text-blue-700">${item.subuh}</td>
        <td class="px-4 py-4 text-center font-semibold text-orange-700">${item.dzuhur}</td>
        <td class="px-4 py-4 text-center font-semibold text-orange-700">${item.ashar}</td>
        <td class="px-4 py-4 text-center font-semibold text-red-700">${item.maghrib}</td>
        <td class="px-4 py-4 text-center font-semibold text-indigo-700">${item.isya}</td>
      `;

      tbody.appendChild(row);
    });

    tableContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    console.log('[Imsakiyah] Table rendered');
  },

  showLoading() {
    const loadingEl = document.getElementById('loading-state');
    const tableEl = document.getElementById('table-container');
    const emptyEl = document.getElementById('empty-state');
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (tableEl) tableEl.classList.add('hidden');
    if (emptyEl) emptyEl.classList.add('hidden');
  },

  hideLoading() {
    const loadingEl = document.getElementById('loading-state');
    if (loadingEl) loadingEl.classList.add('hidden');
  },

  showError(message) {
    const errorState = document.getElementById('error-state');
    const errorMessage = document.getElementById('error-message');
    if (errorState && errorMessage) {
      errorMessage.textContent = message || 'Silahkan coba memilih kota lain atau periksa koneksi internet Anda';
}

// ============ JADWAL IMSAKIYAH WITH CITY SELECTOR ============
// Ramadhan schedule data for different Indonesian cities
const ramadhanSchedules = {
  jakarta: {
    city: 'Jakarta',
    dates: [
      {day: 'Senin', date: 1, imsak: '03:47', subuh: '04:05', dzuhur: '11:57', ashar: '15:35', berbuka: '17:45', maghrib: '18:15', isya: '19:32'},
      {day: 'Selasa', date: 2, imsak: '03:45', subuh: '04:03', dzuhur: '11:58', ashar: '15:36', berbuka: '17:46', maghrib: '18:16', isya: '19:33'},
      {day: 'Rabu', date: 3, imsak: '03:43', subuh: '04:01', dzuhur: '11:58', ashar: '15:36', berbuka: '17:47', maghrib: '18:17', isya: '19:34'},
      {day: 'Kamis', date: 4, imsak: '03:41', subuh: '03:59', dzuhur: '11:59', ashar: '15:37', berbuka: '17:48', maghrib: '18:18', isya: '19:35'},
      {day: 'Jumat', date: 5, imsak: '03:39', subuh: '03:57', dzuhur: '12:00', ashar: '15:38', berbuka: '17:49', maghrib: '18:19', isya: '19:36'},
      {day: 'Sabtu', date: 6, imsak: '03:37', subuh: '03:55', dzuhur: '12:00', ashar: '15:38', berbuka: '17:50', maghrib: '18:20', isya: '19:37'},
      {day: 'Minggu', date: 7, imsak: '03:35', subuh: '03:53', dzuhur: '12:01', ashar: '15:39', berbuka: '17:51', maghrib: '18:21', isya: '19:38'},
      {day: 'Senin', date: 8, imsak: '03:33', subuh: '03:51', dzuhur: '12:02', ashar: '15:40', berbuka: '17:52', maghrib: '18:22', isya: '19:39'},
      {day: 'Selasa', date: 9, imsak: '03:31', subuh: '03:49', dzuhur: '12:02', ashar: '15:40', berbuka: '17:53', maghrib: '18:23', isya: '19:40'},
      {day: 'Rabu', date: 10, imsak: '03:29', subuh: '03:47', dzuhur: '12:03', ashar: '15:41', berbuka: '17:54', maghrib: '18:24', isya: '19:41'},
      {day: 'Kamis', date: 11, imsak: '03:27', subuh: '03:45', dzuhur: '12:04', ashar: '15:42', berbuka: '17:55', maghrib: '18:25', isya: '19:42'},
      {day: 'Jumat', date: 12, imsak: '03:25', subuh: '03:43', dzuhur: '12:04', ashar: '15:42', berbuka: '17:56', maghrib: '18:26', isya: '19:43'},
      {day: 'Sabtu', date: 13, imsak: '03:23', subuh: '03:41', dzuhur: '12:05', ashar: '15:43', berbuka: '17:57', maghrib: '18:27', isya: '19:44'},
      {day: 'Minggu', date: 14, imsak: '03:21', subuh: '03:39', dzuhur: '12:06', ashar: '15:44', berbuka: '17:58', maghrib: '18:28', isya: '19:45'},
      {day: 'Senin', date: 15, imsak: '03:19', subuh: '03:37', dzuhur: '12:06', ashar: '15:44', berbuka: '17:59', maghrib: '18:29', isya: '19:46'},
      {day: 'Selasa', date: 16, imsak: '03:17', subuh: '03:35', dzuhur: '12:07', ashar: '15:45', berbuka: '18:00', maghrib: '18:30', isya: '19:47'},
      {day: 'Rabu', date: 17, imsak: '03:15', subuh: '03:33', dzuhur: '12:08', ashar: '15:46', berbuka: '18:01', maghrib: '18:31', isya: '19:48'},
      {day: 'Kamis', date: 18, imsak: '03:13', subuh: '03:31', dzuhur: '12:08', ashar: '15:46', berbuka: '18:02', maghrib: '18:32', isya: '19:49'},
      {day: 'Jumat', date: 19, imsak: '03:11', subuh: '03:29', dzuhur: '12:09', ashar: '15:47', berbuka: '18:03', maghrib: '18:33', isya: '19:50'},
      {day: 'Sabtu', date: 20, imsak: '03:09', subuh: '03:27', dzuhur: '12:10', ashar: '15:48', berbuka: '18:04', maghrib: '18:34', isya: '19:51'},
      {day: 'Minggu', date: 21, imsak: '03:07', subuh: '03:25', dzuhur: '12:10', ashar: '15:48', berbuka: '18:05', maghrib: '18:35', isya: '19:52'},
      {day: 'Senin', date: 22, imsak: '03:05', subuh: '03:23', dzuhur: '12:11', ashar: '15:49', berbuka: '18:06', maghrib: '18:36', isya: '19:53'},
      {day: 'Selasa', date: 23, imsak: '03:03', subuh: '03:21', dzuhur: '12:12', ashar: '15:50', berbuka: '18:07', maghrib: '18:37', isya: '19:54'},
      {day: 'Rabu', date: 24, imsak: '03:01', subuh: '03:19', dzuhur: '12:12', ashar: '15:50', berbuka: '18:08', maghrib: '18:38', isya: '19:55'},
      {day: 'Kamis', date: 25, imsak: '02:59', subuh: '03:17', dzuhur: '12:13', ashar: '15:51', berbuka: '18:09', maghrib: '18:39', isya: '19:56'},
      {day: 'Jumat', date: 26, imsak: '02:57', subuh: '03:15', dzuhur: '12:14', ashar: '15:52', berbuka: '18:10', maghrib: '18:40', isya: '19:57'},
      {day: 'Sabtu', date: 27, imsak: '02:55', subuh: '03:13', dzuhur: '12:14', ashar: '15:52', berbuka: '18:11', maghrib: '18:41', isya: '19:58'},
      {day: 'Minggu', date: 28, imsak: '02:53', subuh: '03:11', dzuhur: '12:15', ashar: '15:53', berbuka: '18:12', maghrib: '18:42', isya: '19:59'},
      {day: 'Senin', date: 29, imsak: '02:51', subuh: '03:09', dzuhur: '12:16', ashar: '15:54', berbuka: '18:13', maghrib: '18:43', isya: '20:00'},
      {day: 'Selasa', date: 30, imsak: '02:49', subuh: '03:07', dzuhur: '12:16', ashar: '15:54', berbuka: '18:14', maghrib: '18:44', isya: '20:01'}
    ]
  },
  bandung: {
    city: 'Bandung',
    dates: [
      {day: 'Senin', date: 1, imsak: '03:48', subuh: '04:06', dzuhur: '11:56', ashar: '15:33', berbuka: '17:44', maghrib: '18:14', isya: '19:31'},
      {day: 'Selasa', date: 2, imsak: '03:46', subuh: '04:04', dzuhur: '11:57', ashar: '15:34', berbuka: '17:45', maghrib: '18:15', isya: '19:32'},
      {day: 'Rabu', date: 3, imsak: '03:44', subuh: '04:02', dzuhur: '11:57', ashar: '15:34', berbuka: '17:46', maghrib: '18:16', isya: '19:33'},
      {day: 'Kamis', date: 4, imsak: '03:42', subuh: '04:00', dzuhur: '11:58', ashar: '15:35', berbuka: '17:47', maghrib: '18:17', isya: '19:34'},
      {day: 'Jumat', date: 5, imsak: '03:40', subuh: '03:58', dzuhur: '11:59', ashar: '15:36', berbuka: '17:48', maghrib: '18:18', isya: '19:35'},
      {day: 'Sabtu', date: 6, imsak: '03:38', subuh: '03:56', dzuhur: '11:59', ashar: '15:36', berbuka: '17:49', maghrib: '18:19', isya: '19:36'},
      {day: 'Minggu', date: 7, imsak: '03:36', subuh: '03:54', dzuhur: '12:00', ashar: '15:37', berbuka: '17:50', maghrib: '18:20', isya: '19:37'},
      {day: 'Senin', date: 8, imsak: '03:34', subuh: '03:52', dzuhur: '12:01', ashar: '15:38', berbuka: '17:51', maghrib: '18:21', isya: '19:38'},
      {day: 'Selasa', date: 9, imsak: '03:32', subuh: '03:50', dzuhur: '12:01', ashar: '15:38', berbuka: '17:52', maghrib: '18:22', isya: '19:39'},
      {day: 'Rabu', date: 10, imsak: '03:30', subuh: '03:48', dzuhur: '12:02', ashar: '15:39', berbuka: '17:53', maghrib: '18:23', isya: '19:40'},
      {day: 'Kamis', date: 11, imsak: '03:28', subuh: '03:46', dzuhur: '12:03', ashar: '15:40', berbuka: '17:54', maghrib: '18:24', isya: '19:41'},
      {day: 'Jumat', date: 12, imsak: '03:26', subuh: '03:44', dzuhur: '12:03', ashar: '15:40', berbuka: '17:55', maghrib: '18:25', isya: '19:42'},
      {day: 'Sabtu', date: 13, imsak: '03:24', subuh: '03:42', dzuhur: '12:04', ashar: '15:41', berbuka: '17:56', maghrib: '18:26', isya: '19:43'},
      {day: 'Minggu', date: 14, imsak: '03:22', subuh: '03:40', dzuhur: '12:05', ashar: '15:42', berbuka: '17:57', maghrib: '18:27', isya: '19:44'},
      {day: 'Senin', date: 15, imsak: '03:20', subuh: '03:38', dzuhur: '12:05', ashar: '15:42', berbuka: '17:58', maghrib: '18:28', isya: '19:45'},
      {day: 'Selasa', date: 16, imsak: '03:18', subuh: '03:36', dzuhur: '12:06', ashar: '15:43', berbuka: '17:59', maghrib: '18:29', isya: '19:46'},
      {day: 'Rabu', date: 17, imsak: '03:16', subuh: '03:34', dzuhur: '12:07', ashar: '15:44', berbuka: '18:00', maghrib: '18:30', isya: '19:47'},
      {day: 'Kamis', date: 18, imsak: '03:14', subuh: '03:32', dzuhur: '12:07', ashar: '15:44', berbuka: '18:01', maghrib: '18:31', isya: '19:48'},
      {day: 'Jumat', date: 19, imsak: '03:12', subuh: '03:30', dzuhur: '12:08', ashar: '15:45', berbuka: '18:02', maghrib: '18:32', isya: '19:49'},
      {day: 'Sabtu', date: 20, imsak: '03:10', subuh: '03:28', dzuhur: '12:09', ashar: '15:46', berbuka: '18:03', maghrib: '18:33', isya: '19:50'},
      {day: 'Minggu', date: 21, imsak: '03:08', subuh: '03:26', dzuhur: '12:09', ashar: '15:46', berbuka: '18:04', maghrib: '18:34', isya: '19:51'},
      {day: 'Senin', date: 22, imsak: '03:06', subuh: '03:24', dzuhur: '12:10', ashar: '15:47', berbuka: '18:05', maghrib: '18:35', isya: '19:52'},
      {day: 'Selasa', date: 23, imsak: '03:04', subuh: '03:22', dzuhur: '12:11', ashar: '15:48', berbuka: '18:06', maghrib: '18:36', isya: '19:53'},
      {day: 'Rabu', date: 24, imsak: '03:02', subuh: '03:20', dzuhur: '12:11', ashar: '15:48', berbuka: '18:07', maghrib: '18:37', isya: '19:54'},
      {day: 'Kamis', date: 25, imsak: '03:00', subuh: '03:18', dzuhur: '12:12', ashar: '15:49', berbuka: '18:08', maghrib: '18:38', isya: '19:55'},
      {day: 'Jumat', date: 26, imsak: '02:58', subuh: '03:16', dzuhur: '12:13', ashar: '15:50', berbuka: '18:09', maghrib: '18:39', isya: '19:56'},
      {day: 'Sabtu', date: 27, imsak: '02:56', subuh: '03:14', dzuhur: '12:13', ashar: '15:50', berbuka: '18:10', maghrib: '18:40', isya: '19:57'},
      {day: 'Minggu', date: 28, imsak: '02:54', subuh: '03:12', dzuhur: '12:14', ashar: '15:51', berbuka: '18:11', maghrib: '18:41', isya: '19:58'},
      {day: 'Senin', date: 29, imsak: '02:52', subuh: '03:10', dzuhur: '12:15', ashar: '15:52', berbuka: '18:12', maghrib: '18:42', isya: '19:59'},
      {day: 'Selasa', date: 30, imsak: '02:50', subuh: '03:08', dzuhur: '12:15', ashar: '15:52', berbuka: '18:13', maghrib: '18:43', isya: '20:00'}
    ]
  },
  surabaya: {
    city: 'Surabaya',
    dates: [
      {day: 'Senin', date: 1, imsak: '03:52', subuh: '04:10', dzuhur: '12:01', ashar: '15:40', berbuka: '17:50', maghrib: '18:20', isya: '19:37'},
      {day: 'Selasa', date: 2, imsak: '03:50', subuh: '04:08', dzuhur: '12:02', ashar: '15:41', berbuka: '17:51', maghrib: '18:21', isya: '19:38'},
      {day: 'Rabu', date: 3, imsak: '03:48', subuh: '04:06', dzuhur: '12:02', ashar: '15:41', berbuka: '17:52', maghrib: '18:22', isya: '19:39'},
      {day: 'Kamis', date: 4, imsak: '03:46', subuh: '04:04', dzuhur: '12:03', ashar: '15:42', berbuka: '17:53', maghrib: '18:23', isya: '19:40'},
      {day: 'Jumat', date: 5, imsak: '03:44', subuh: '04:02', dzuhur: '12:04', ashar: '15:43', berbuka: '17:54', maghrib: '18:24', isya: '19:41'},
      {day: 'Sabtu', date: 6, imsak: '03:42', subuh: '04:00', dzuhur: '12:04', ashar: '15:43', berbuka: '17:55', maghrib: '18:25', isya: '19:42'},
      {day: 'Minggu', date: 7, imsak: '03:40', subuh: '03:58', dzuhur: '12:05', ashar: '15:44', berbuka: '17:56', maghrib: '18:26', isya: '19:43'},
      {day: 'Senin', date: 8, imsak: '03:38', subuh: '03:56', dzuhur: '12:06', ashar: '15:45', berbuka: '17:57', maghrib: '18:27', isya: '19:44'},
      {day: 'Selasa', date: 9, imsak: '03:36', subuh: '03:54', dzuhur: '12:06', ashar: '15:45', berbuka: '17:58', maghrib: '18:28', isya: '19:45'},
      {day: 'Rabu', date: 10, imsak: '03:34', subuh: '03:52', dzuhur: '12:07', ashar: '15:46', berbuka: '17:59', maghrib: '18:29', isya: '19:46'},
      {day: 'Kamis', date: 11, imsak: '03:32', subuh: '03:50', dzuhur: '12:08', ashar: '15:47', berbuka: '18:00', maghrib: '18:30', isya: '19:47'},
      {day: 'Jumat', date: 12, imsak: '03:30', subuh: '03:48', dzuhur: '12:08', ashar: '15:47', berbuka: '18:01', maghrib: '18:31', isya: '19:48'},
      {day: 'Sabtu', date: 13, imsak: '03:28', subuh: '03:46', dzuhur: '12:09', ashar: '15:48', berbuka: '18:02', maghrib: '18:32', isya: '19:49'},
      {day: 'Minggu', date: 14, imsak: '03:26', subuh: '03:44', dzuhur: '12:10', ashar: '15:49', berbuka: '18:03', maghrib: '18:33', isya: '19:50'},
      {day: 'Senin', date: 15, imsak: '03:24', subuh: '03:42', dzuhur: '12:10', ashar: '15:49', berbuka: '18:04', maghrib: '18:34', isya: '19:51'},
      {day: 'Selasa', date: 16, imsak: '03:22', subuh: '03:40', dzuhur: '12:11', ashar: '15:50', berbuka: '18:05', maghrib: '18:35', isya: '19:52'},
      {day: 'Rabu', date: 17, imsak: '03:20', subuh: '03:38', dzuhur: '12:12', ashar: '15:51', berbuka: '18:06', maghrib: '18:36', isya: '19:53'},
      {day: 'Kamis', date: 18, imsak: '03:18', subuh: '03:36', dzuhur: '12:12', ashar: '15:51', berbuka: '18:07', maghrib: '18:37', isya: '19:54'},
      {day: 'Jumat', date: 19, imsak: '03:16', subuh: '03:34', dzuhur: '12:13', ashar: '15:52', berbuka: '18:08', maghrib: '18:38', isya: '19:55'},
      {day: 'Sabtu', date: 20, imsak: '03:14', subuh: '03:32', dzuhur: '12:14', ashar: '15:53', berbuka: '18:09', maghrib: '18:39', isya: '19:56'},
      {day: 'Minggu', date: 21, imsak: '03:12', subuh: '03:30', dzuhur: '12:14', ashar: '15:53', berbuka: '18:10', maghrib: '18:40', isya: '19:57'},
      {day: 'Senin', date: 22, imsak: '03:10', subuh: '03:28', dzuhur: '12:15', ashar: '15:54', berbuka: '18:11', maghrib: '18:41', isya: '19:58'},
      {day: 'Selasa', date: 23, imsak: '03:08', subuh: '03:26', dzuhur: '12:16', ashar: '15:55', berbuka: '18:12', maghrib: '18:42', isya: '19:59'},
      {day: 'Rabu', date: 24, imsak: '03:06', subuh: '03:24', dzuhur: '12:16', ashar: '15:55', berbuka: '18:13', maghrib: '18:43', isya: '20:00'},
      {day: 'Kamis', date: 25, imsak: '03:04', subuh: '03:22', dzuhur: '12:17', ashar: '15:56', berbuka: '18:14', maghrib: '18:44', isya: '20:01'},
      {day: 'Jumat', date: 26, imsak: '03:02', subuh: '03:20', dzuhur: '12:18', ashar: '15:57', berbuka: '18:15', maghrib: '18:45', isya: '20:02'},
      {day: 'Sabtu', date: 27, imsak: '03:00', subuh: '03:18', dzuhur: '12:18', ashar: '15:57', berbuka: '18:16', maghrib: '18:46', isya: '20:03'},
      {day: 'Minggu', date: 28, imsak: '02:58', subuh: '03:16', dzuhur: '12:19', ashar: '15:58', berbuka: '18:17', maghrib: '18:47', isya: '20:04'},
      {day: 'Senin', date: 29, imsak: '02:56', subuh: '03:14', dzuhur: '12:20', ashar: '15:59', berbuka: '18:18', maghrib: '18:48', isya: '20:05'},
      {day: 'Selasa', date: 30, imsak: '02:54', subuh: '03:12', dzuhur: '12:20', ashar: '15:59', berbuka: '18:19', maghrib: '18:49', isya: '20:06'}
    ]
  },
  medan: {
    city: 'Medan',
    dates: [
      {day: 'Senin', date: 1, imsak: '04:02', subuh: '04:20', dzuhur: '12:04', ashar: '15:38', berbuka: '18:00', maghrib: '18:30', isya: '19:47'},
      {day: 'Selasa', date: 2, imsak: '04:00', subuh: '04:18', dzuhur: '12:05', ashar: '15:39', berbuka: '18:01', maghrib: '18:31', isya: '19:48'},
      {day: 'Rabu', date: 3, imsak: '03:58', subuh: '04:16', dzuhur: '12:05', ashar: '15:39', berbuka: '18:02', maghrib: '18:32', isya: '19:49'},
      {day: 'Kamis', date: 4, imsak: '03:56', subuh: '04:14', dzuhur: '12:06', ashar: '15:40', berbuka: '18:03', maghrib: '18:33', isya: '19:50'},
      {day: 'Jumat', date: 5, imsak: '03:54', subuh: '04:12', dzuhur: '12:07', ashar: '15:41', berbuka: '18:04', maghrib: '18:34', isya: '19:51'},
      {day: 'Sabtu', date: 6, imsak: '03:52', subuh: '04:10', dzuhur: '12:07', ashar: '15:41', berbuka: '18:05', maghrib: '18:35', isya: '19:52'},
      {day: 'Minggu', date: 7, imsak: '03:50', subuh: '04:08', dzuhur: '12:08', ashar: '15:42', berbuka: '18:06', maghrib: '18:36', isya: '19:53'},
      {day: 'Senin', date: 8, imsak: '03:48', subuh: '04:06', dzuhur: '12:09', ashar: '15:43', berbuka: '18:07', maghrib: '18:37', isya: '19:54'},
      {day: 'Selasa', date: 9, imsak: '03:46', subuh: '04:04', dzuhur: '12:09', ashar: '15:43', berbuka: '18:08', maghrib: '18:38', isya: '19:55'},
      {day: 'Rabu', date: 10, imsak: '03:44', subuh: '04:02', dzuhur: '12:10', ashar: '15:44', berbuka: '18:09', maghrib: '18:39', isya: '19:56'},
      {day: 'Kamis', date: 11, imsak: '03:42', subuh: '04:00', dzuhur: '12:11', ashar: '15:45', berbuka: '18:10', maghrib: '18:40', isya: '19:57'},
      {day: 'Jumat', date: 12, imsak: '03:40', subuh: '03:58', dzuhur: '12:11', ashar: '15:45', berbuka: '18:11', maghrib: '18:41', isya: '19:58'},
      {day: 'Sabtu', date: 13, imsak: '03:38', subuh: '03:56', dzuhur: '12:12', ashar: '15:46', berbuka: '18:12', maghrib: '18:42', isya: '19:59'},
      {day: 'Minggu', date: 14, imsak: '03:36', subuh: '03:54', dzuhur: '12:13', ashar: '15:47', berbuka: '18:13', maghrib: '18:43', isya: '20:00'},
      {day: 'Senin', date: 15, imsak: '03:34', subuh: '03:52', dzuhur: '12:13', ashar: '15:47', berbuka: '18:14', maghrib: '18:44', isya: '20:01'},
      {day: 'Selasa', date: 16, imsak: '03:32', subuh: '03:50', dzuhur: '12:14', ashar: '15:48', berbuka: '18:15', maghrib: '18:45', isya: '20:02'},
      {day: 'Rabu', date: 17, imsak: '03:30', subuh: '03:48', dzuhur: '12:15', ashar: '15:49', berbuka: '18:16', maghrib: '18:46', isya: '20:03'},
      {day: 'Kamis', date: 18, imsak: '03:28', subuh: '03:46', dzuhur: '12:15', ashar: '15:49', berbuka: '18:17', maghrib: '18:47', isya: '20:04'},
      {day: 'Jumat', date: 19, imsak: '03:26', subuh: '03:44', dzuhur: '12:16', ashar: '15:50', berbuka: '18:18', maghrib: '18:48', isya: '20:05'},
      {day: 'Sabtu', date: 20, imsak: '03:24', subuh: '03:42', dzuhur: '12:17', ashar: '15:51', berbuka: '18:19', maghrib: '18:49', isya: '20:06'},
      {day: 'Minggu', date: 21, imsak: '03:22', subuh: '03:40', dzuhur: '12:17', ashar: '15:51', berbuka: '18:20', maghrib: '18:50', isya: '20:07'},
      {day: 'Senin', date: 22, imsak: '03:20', subuh: '03:38', dzuhur: '12:18', ashar: '15:52', berbuka: '18:21', maghrib: '18:51', isya: '20:08'},
      {day: 'Selasa', date: 23, imsak: '03:18', subuh: '03:36', dzuhur: '12:19', ashar: '15:53', berbuka: '18:22', maghrib: '18:52', isya: '20:09'},
      {day: 'Rabu', date: 24, imsak: '03:16', subuh: '03:34', dzuhur: '12:19', ashar: '15:53', berbuka: '18:23', maghrib: '18:53', isya: '20:10'},
      {day: 'Kamis', date: 25, imsak: '03:14', subuh: '03:32', dzuhur: '12:20', ashar: '15:54', berbuka: '18:24', maghrib: '18:54', isya: '20:11'},
      {day: 'Jumat', date: 26, imsak: '03:12', subuh: '03:30', dzuhur: '12:21', ashar: '15:55', berbuka: '18:25', maghrib: '18:55', isya: '20:12'},
      {day: 'Sabtu', date: 27, imsak: '03:10', subuh: '03:28', dzuhur: '12:21', ashar: '15:55', berbuka: '18:26', maghrib: '18:56', isya: '20:13'},
      {day: 'Minggu', date: 28, imsak: '03:08', subuh: '03:26', dzuhur: '12:22', ashar: '15:56', berbuka: '18:27', maghrib: '18:57', isya: '20:14'},
      {day: 'Senin', date: 29, imsak: '03:06', subuh: '03:24', dzuhur: '12:23', ashar: '15:57', berbuka: '18:28', maghrib: '18:58', isya: '20:15'},
      {day: 'Selasa', date: 30, imsak: '03:04', subuh: '03:22', dzuhur: '12:23', ashar: '15:57', berbuka: '18:29', maghrib: '18:59', isya: '20:16'}
    ]
  },
  yogyakarta: {
    city: 'Yogyakarta',
    dates: [
      {day: 'Senin', date: 1, imsak: '03:54', subuh: '04:12', dzuhur: '12:02', ashar: '15:36', berbuka: '17:47', maghrib: '18:17', isya: '19:34'},
      {day: 'Selasa', date: 2, imsak: '03:52', subuh: '04:10', dzuhur: '12:03', ashar: '15:37', berbuka: '17:48', maghrib: '18:18', isya: '19:35'},
      {day: 'Rabu', date: 3, imsak: '03:50', subuh: '04:08', dzuhur: '12:03', ashar: '15:37', berbuka: '17:49', maghrib: '18:19', isya: '19:36'},
      {day: 'Kamis', date: 4, imsak: '03:48', subuh: '04:06', dzuhur: '12:04', ashar: '15:38', berbuka: '17:50', maghrib: '18:20', isya: '19:37'},
      {day: 'Jumat', date: 5, imsak: '03:46', subuh: '04:04', dzuhur: '12:05', ashar: '15:39', berbuka: '17:51', maghrib: '18:21', isya: '19:38'},
      {day: 'Sabtu', date: 6, imsak: '03:44', subuh: '04:02', dzuhur: '12:05', ashar: '15:39', berbuka: '17:52', maghrib: '18:22', isya: '19:39'},
      {day: 'Minggu', date: 7, imsak: '03:42', subuh: '04:00', dzuhur: '12:06', ashar: '15:40', berbuka: '17:53', maghrib: '18:23', isya: '19:40'},
      {day: 'Senin', date: 8, imsak: '03:40', subuh: '03:58', dzuhur: '12:07', ashar: '15:41', berbuka: '17:54', maghrib: '18:24', isya: '19:41'},
      {day: 'Selasa', date: 9, imsak: '03:38', subuh: '03:56', dzuhur: '12:07', ashar: '15:41', berbuka: '17:55', maghrib: '18:25', isya: '19:42'},
      {day: 'Rabu', date: 10, imsak: '03:36', subuh: '03:54', dzuhur: '12:08', ashar: '15:42', berbuka: '17:56', maghrib: '18:26', isya: '19:43'},
      {day: 'Kamis', date: 11, imsak: '03:34', subuh: '03:52', dzuhur: '12:09', ashar: '15:43', berbuka: '17:57', maghrib: '18:27', isya: '19:44'},
      {day: 'Jumat', date: 12, imsak: '03:32', subuh: '03:50', dzuhur: '12:09', ashar: '15:43', berbuka: '17:58', maghrib: '18:28', isya: '19:45'},
      {day: 'Sabtu', date: 13, imsak: '03:30', subuh: '03:48', dzuhur: '12:10', ashar: '15:44', berbuka: '17:59', maghrib: '18:29', isya: '19:46'},
      {day: 'Minggu', date: 14, imsak: '03:28', subuh: '03:46', dzuhur: '12:11', ashar: '15:45', berbuka: '18:00', maghrib: '18:30', isya: '19:47'},
      {day: 'Senin', date: 15, imsak: '03:26', subuh: '03:44', dzuhur: '12:11', ashar: '15:45', berbuka: '18:01', maghrib: '18:31', isya: '19:48'},
      {day: 'Selasa', date: 16, imsak: '03:24', subuh: '03:42', dzuhur: '12:12', ashar: '15:46', berbuka: '18:02', maghrib: '18:32', isya: '19:49'},
      {day: 'Rabu', date: 17, imsak: '03:22', subuh: '03:40', dzuhur: '12:13', ashar: '15:47', berbuka: '18:03', maghrib: '18:33', isya: '19:50'},
      {day: 'Kamis', date: 18, imsak: '03:20', subuh: '03:38', dzuhur: '12:13', ashar: '15:47', berbuka: '18:04', maghrib: '18:34', isya: '19:51'},
      {day: 'Jumat', date: 19, imsak: '03:18', subuh: '03:36', dzuhur: '12:14', ashar: '15:48', berbuka: '18:05', maghrib: '18:35', isya: '19:52'},
      {day: 'Sabtu', date: 20, imsak: '03:16', subuh: '03:34', dzuhur: '12:15', ashar: '15:49', berbuka: '18:06', maghrib: '18:36', isya: '19:53'},
      {day: 'Minggu', date: 21, imsak: '03:14', subuh: '03:32', dzuhur: '12:15', ashar: '15:49', berbuka: '18:07', maghrib: '18:37', isya: '19:54'},
      {day: 'Senin', date: 22, imsak: '03:12', subuh: '03:30', dzuhur: '12:16', ashar: '15:50', berbuka: '18:08', maghrib: '18:38', isya: '19:55'},
      {day: 'Selasa', date: 23, imsak: '03:10', subuh: '03:28', dzuhur: '12:17', ashar: '15:51', berbuka: '18:09', maghrib: '18:39', isya: '19:56'},
      {day: 'Rabu', date: 24, imsak: '03:08', subuh: '03:26', dzuhur: '12:17', ashar: '15:51', berbuka: '18:10', maghrib: '18:40', isya: '19:57'},
      {day: 'Kamis', date: 25, imsak: '03:06', subuh: '03:24', dzuhur: '12:18', ashar: '15:52', berbuka: '18:11', maghrib: '18:41', isya: '19:58'},
      {day: 'Jumat', date: 26, imsak: '03:04', subuh: '03:22', dzuhur: '12:19', ashar: '15:53', berbuka: '18:12', maghrib: '18:42', isya: '19:59'},
      {day: 'Sabtu', date: 27, imsak: '03:02', subuh: '03:20', dzuhur: '12:19', ashar: '15:53', berbuka: '18:13', maghrib: '18:43', isya: '20:00'},
      {day: 'Minggu', date: 28, imsak: '03:00', subuh: '03:18', dzuhur: '12:20', ashar: '15:54', berbuka: '18:14', maghrib: '18:44', isya: '20:01'},
      {day: 'Senin', date: 29, imsak: '02:58', subuh: '03:16', dzuhur: '12:21', ashar: '15:55', berbuka: '18:15', maghrib: '18:45', isya: '20:02'},
      {day: 'Selasa', date: 30, imsak: '02:56', subuh: '03:14', dzuhur: '12:21', ashar: '15:55', berbuka: '18:16', maghrib: '18:46', isya: '20:03'}
    ]
  },
  bali: {
    city: 'Bali',
    dates: [
      {day: 'Senin', date: 1, imsak: '04:06', subuh: '04:24', dzuhur: '12:08', ashar: '15:45', berbuka: '17:55', maghrib: '18:25', isya: '19:42'},
      {day: 'Selasa', date: 2, imsak: '04:04', subuh: '04:22', dzuhur: '12:09', ashar: '15:46', berbuka: '17:56', maghrib: '18:26', isya: '19:43'},
      {day: 'Rabu', date: 3, imsak: '04:02', subuh: '04:20', dzuhur: '12:09', ashar: '15:46', berbuka: '17:57', maghrib: '18:27', isya: '19:44'},
      {day: 'Kamis', date: 4, imsak: '04:00', subuh: '04:18', dzuhur: '12:10', ashar: '15:47', berbuka: '17:58', maghrib: '18:28', isya: '19:45'},
      {day: 'Jumat', date: 5, imsak: '03:58', subuh: '04:16', dzuhur: '12:11', ashar: '15:48', berbuka: '17:59', maghrib: '18:29', isya: '19:46'},
      {day: 'Sabtu', date: 6, imsak: '03:56', subuh: '04:14', dzuhur: '12:11', ashar: '15:48', berbuka: '18:00', maghrib: '18:30', isya: '19:47'},
      {day: 'Minggu', date: 7, imsak: '03:54', subuh: '04:12', dzuhur: '12:12', ashar: '15:49', berbuka: '18:01', maghrib: '18:31', isya: '19:48'},
      {day: 'Senin', date: 8, imsak: '03:52', subuh: '04:10', dzuhur: '12:13', ashar: '15:50', berbuka: '18:02', maghrib: '18:32', isya: '19:49'},
      {day: 'Selasa', date: 9, imsak: '03:50', subuh: '04:08', dzuhur: '12:13', ashar: '15:50', berbuka: '18:03', maghrib: '18:33', isya: '19:50'},
      {day: 'Rabu', date: 10, imsak: '03:48', subuh: '04:06', dzuhur: '12:14', ashar: '15:51', berbuka: '18:04', maghrib: '18:34', isya: '19:51'},
      {day: 'Kamis', date: 11, imsak: '03:46', subuh: '04:04', dzuhur: '12:15', ashar: '15:52', berbuka: '18:05', maghrib: '18:35', isya: '19:52'},
      {day: 'Jumat', date: 12, imsak: '03:44', subuh: '04:02', dzuhur: '12:15', ashar: '15:52', berbuka: '18:06', maghrib: '18:36', isya: '19:53'},
      {day: 'Sabtu', date: 13, imsak: '03:42', subuh: '04:00', dzuhur: '12:16', ashar: '15:53', berbuka: '18:07', maghrib: '18:37', isya: '19:54'},
      {day: 'Minggu', date: 14, imsak: '03:40', subuh: '03:58', dzuhur: '12:17', ashar: '15:54', berbuka: '18:08', maghrib: '18:38', isya: '19:55'},
      {day: 'Senin', date: 15, imsak: '03:38', subuh: '03:56', dzuhur: '12:17', ashar: '15:54', berbuka: '18:09', maghrib: '18:39', isya: '19:56'},
      {day: 'Selasa', date: 16, imsak: '03:36', subuh: '03:54', dzuhur: '12:18', ashar: '15:55', berbuka: '18:10', maghrib: '18:40', isya: '19:57'},
      {day: 'Rabu', date: 17, imsak: '03:34', subuh: '03:52', dzuhur: '12:19', ashar: '15:56', berbuka: '18:11', maghrib: '18:41', isya: '19:58'},
      {day: 'Kamis', date: 18, imsak: '03:32', subuh: '03:50', dzuhur: '12:19', ashar: '15:56', berbuka: '18:12', maghrib: '18:42', isya: '19:59'},
      {day: 'Jumat', date: 19, imsak: '03:30', subuh: '03:48', dzuhur: '12:20', ashar: '15:57', berbuka: '18:13', maghrib: '18:43', isya: '20:00'},
      {day: 'Sabtu', date: 20, imsak: '03:28', subuh: '03:46', dzuhur: '12:21', ashar: '15:58', berbuka: '18:14', maghrib: '18:44', isya: '20:01'},
      {day: 'Minggu', date: 21, imsak: '03:26', subuh: '03:44', dzuhur: '12:21', ashar: '15:58', berbuka: '18:15', maghrib: '18:45', isya: '20:02'},
      {day: 'Senin', date: 22, imsak: '03:24', subuh: '03:42', dzuhur: '12:22', ashar: '15:59', berbuka: '18:16', maghrib: '18:46', isya: '20:03'},
      {day: 'Selasa', date: 23, imsak: '03:22', subuh: '03:40', dzuhur: '12:23', ashar: '16:00', berbuka: '18:17', maghrib: '18:47', isya: '20:04'},
      {day: 'Rabu', date: 24, imsak: '03:20', subuh: '03:38', dzuhur: '12:23', ashar: '16:00', berbuka: '18:18', maghrib: '18:48', isya: '20:05'},
      {day: 'Kamis', date: 25, imsak: '03:18', subuh: '03:36', dzuhur: '12:24', ashar: '16:01', berbuka: '18:19', maghrib: '18:49', isya: '20:06'},
      {day: 'Jumat', date: 26, imsak: '03:16', subuh: '03:34', dzuhur: '12:25', ashar: '16:02', berbuka: '18:20', maghrib: '18:50', isya: '20:07'},
      {day: 'Sabtu', date: 27, imsak: '03:14', subuh: '03:32', dzuhur: '12:25', ashar: '16:02', berbuka: '18:21', maghrib: '18:51', isya: '20:08'},
      {day: 'Minggu', date: 28, imsak: '03:12', subuh: '03:30', dzuhur: '12:26', ashar: '16:03', berbuka: '18:22', maghrib: '18:52', isya: '20:09'},
      {day: 'Senin', date: 29, imsak: '03:10', subuh: '03:28', dzuhur: '12:27', ashar: '16:04', berbuka: '18:23', maghrib: '18:53', isya: '20:10'},
      {day: 'Selasa', date: 30, imsak: '03:08', subuh: '03:26', dzuhur: '12:27', ashar: '16:04', berbuka: '18:24', maghrib: '18:54', isya: '20:11'}
    ]
  }
};

// Function to handle city search button
function handleCitySearch() {
  const citySelect = document.getElementById('citySelect');
  const searchBtn = document.getElementById('searchBtn');
  
  if (!citySelect || !searchBtn) {
    console.error('City selector or search button not found');
    return;
  }
  
  // Add loading state to button
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
  searchBtn.disabled = true;
  
  // Generate schedule
  generateScheduleTable(citySelect.value);
  
  // Reset button after animation
  setTimeout(() => {
    searchBtn.innerHTML = '<i class="fas fa-search"></i> Tampilkan';
    searchBtn.disabled = false;
  }, 600);
}

// Function to generate schedule table
function generateScheduleTable(city = 'jakarta') {
  const scheduleTable = document.getElementById('scheduleTable');
  if (!scheduleTable || !ramadhanSchedules[city]) {
    console.error('Schedule table not found or city data missing');
    return;
  }

  // Show loading state
  scheduleTable.innerHTML = '<tr><td colspan="9" style="padding: 2rem; text-align: center; color: var(--text-light);"><i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Memuat jadwal...</td></tr>';
  
  // Simulate loading with slight delay for better UX
  setTimeout(() => {
    const schedule = ramadhanSchedules[city].dates;
    scheduleTable.innerHTML = '';

    schedule.forEach(item => {
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid var(--border-color)';
      row.style.transition = 'all 0.3s ease';
      
      row.innerHTML = `
        <td style="padding: 1rem; font-weight: 600; color: var(--primary-green);">${item.day}</td>
        <td style="padding: 1rem; text-align: center; color: var(--text-light);">${item.date} Ramadhan</td>
        <td style="padding: 1rem; text-align: center; color: #047857; font-weight: 600;">${item.imsak}</td>
        <td style="padding: 1rem; text-align: center; color: #1e40af; font-weight: 600;">${item.subuh}</td>
        <td style="padding: 1rem; text-align: center; color: #b45309; font-weight: 600;">${item.dzuhur}</td>
        <td style="padding: 1rem; text-align: center; color: #c2410c; font-weight: 600;">${item.ashar}</td>
        <td style="padding: 1rem; text-align: center; color: #dc2626; font-weight: 600;">${item.berbuka}</td>
        <td style="padding: 1rem; text-align: center; color: #7c2d12; font-weight: 600;">${item.maghrib}</td>
        <td style="padding: 1rem; text-align: center; color: #7c3aed; font-weight: 600;">${item.isya}</td>
      `;
      
      row.addEventListener('mouseenter', () => {
        row.style.background = 'var(--primary-cream)';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = 'white';
      });
      
      scheduleTable.appendChild(row);
    });
  }, 300);
}

// Function for copy doa
function copyDoa(button, text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show toast notification
    const toast = document.createElement('div');
    toast.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; background: var(--primary-green); color: white; padding: 1rem 1.5rem; border-radius: 8px; z-index: 1000; animation: slideIn 0.3s ease;';
    toast.textContent = '✓ Doa berhasil disalin!';
    document.body.appendChild(toast);
    
    // Change button styling
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check" style="margin-right: 0.5rem;"></i> Tersalin!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = 'var(--primary-green)';
      toast.remove();
    }, 2000);
  }).catch(err => {
    alert('Gagal menyalin: ' + err);
  });
}

// Event listener for initial load
document.addEventListener('DOMContentLoaded', function() {
  const citySelect = document.getElementById('citySelect');
  const searchBtn = document.getElementById('searchBtn');
  
  if (citySelect) {
    // Generate initial schedule with Jakarta
    generateScheduleTable('jakarta');
  }
  
  // Add hover effect to button
  if (searchBtn) {
    searchBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = 'var(--shadow-medium)';
    });
    searchBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  }
});
      errorState.classList.remove('hidden');
    }
    const tableEl = document.getElementById('table-container');
    const emptyEl = document.getElementById('empty-state');
    if (tableEl) tableEl.classList.add('hidden');
    if (emptyEl) emptyEl.classList.add('hidden');
  },

  hideError() {
    const errorState = document.getElementById('error-state');
    if (errorState) errorState.classList.add('hidden');
  },

  reset() {
    this.currentCity = null;
    this.currentData = null;
    const tableEl = document.getElementById('table-container');
    const emptyEl = document.getElementById('empty-state');
    if (tableEl) tableEl.classList.add('hidden');
    if (emptyEl) emptyEl.classList.remove('hidden');
    this.hideLoading();
    this.hideError();
  }
};

async function initImsakiyahPage() {
  console.log('[Imsakiyah] Initializing page');
  
  try {
    // If cities already loaded, just populate dropdown
    if (ImsakiyahController.cities.length > 0) {
      console.log('[Imsakiyah] Cities already in memory, populating now');
      ImsakiyahController.populateCitySelect();
    } else {
      // Otherwise load cities first
      console.log('[Imsakiyah] Cities not loaded, fetching...');
      await ImsakiyahController.loadCities();
      console.log('[Imsakiyah] Cities loaded successfully');
      ImsakiyahController.populateCitySelect();
    }
  } catch (error) {
    console.error('[Imsakiyah] Init error:', error);
    ImsakiyahController.showCityError();
  }
}

// Initialize zakat page when navigating to it
const originalNavigatePage = navigatePage;
navigatePage = function(page) {
  originalNavigatePage(page);
  if (page === 'zakat') {
    setTimeout(() => initZakatPage(), 100);
  } else if (page === 'imsakiyah') {
    setTimeout(() => initImsakiyahPage(), 100);
  }
};