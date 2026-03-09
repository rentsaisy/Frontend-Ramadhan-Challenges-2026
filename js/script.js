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