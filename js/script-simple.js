// ============================================
// DATA JADWAL DUMMY SEDERHANA
// ============================================

const jadwalData = {
  jakarta: [
    {hari: 'Senin', tanggal: 1, imsak: '04:34', subuh: '04:52', dzuhur: '12:08', ashar: '15:42', berbuka: '18:07', maghrib: '18:22', isya: '19:39'},
    {hari: 'Selasa', tanggal: 2, imsak: '04:33', subuh: '04:51', dzuhur: '12:08', ashar: '15:43', berbuka: '18:08', maghrib: '18:23', isya: '19:40'},
    {hari: 'Rabu', tanggal: 3, imsak: '04:32', subuh: '04:50', dzuhur: '12:09', ashar: '15:44', berbuka: '18:09', maghrib: '18:24', isya: '19:41'},
    {hari: 'Kamis', tanggal: 4, imsak: '04:31', subuh: '04:49', dzuhur: '12:09', ashar: '15:44', berbuka: '18:10', maghrib: '18:25', isya: '19:42'},
    {hari: 'Jumat', tanggal: 5, imsak: '04:30', subuh: '04:48', dzuhur: '12:10', ashar: '15:45', berbuka: '18:11', maghrib: '18:26', isya: '19:43'},
  ],
  bandung: [
    {hari: 'Senin', tanggal: 1, imsak: '04:36', subuh: '04:54', dzuhur: '12:13', ashar: '15:47', berbuka: '18:10', maghrib: '18:25', isya: '19:42'},
    {hari: 'Selasa', tanggal: 2, imsak: '04:35', subuh: '04:53', dzuhur: '12:13', ashar: '15:48', berbuka: '18:11', maghrib: '18:26', isya: '19:43'},
    {hari: 'Rabu', tanggal: 3, imsak: '04:34', subuh: '04:52', dzuhur: '12:14', ashar: '15:48', berbuka: '18:12', maghrib: '18:27', isya: '19:44'},
    {hari: 'Kamis', tanggal: 4, imsak: '04:33', subuh: '04:51', dzuhur: '12:14', ashar: '15:49', berbuka: '18:13', maghrib: '18:28', isya: '19:45'},
    {hari: 'Jumat', tanggal: 5, imsak: '04:32', subuh: '04:50', dzuhur: '12:15', ashar: '15:50', berbuka: '18:14', maghrib: '18:29', isya: '19:46'},
  ],
  surabaya: [
    {hari: 'Senin', tanggal: 1, imsak: '04:19', subuh: '04:37', dzuhur: '11:54', ashar: '15:27', berbuka: '17:50', maghrib: '18:05', isya: '19:22'},
    {hari: 'Selasa', tanggal: 2, imsak: '04:18', subuh: '04:36', dzuhur: '11:55', ashar: '15:28', berbuka: '17:51', maghrib: '18:06', isya: '19:23'},
    {hari: 'Rabu', tanggal: 3, imsak: '04:17', subuh: '04:35', dzuhur: '11:55', ashar: '15:28', berbuka: '17:52', maghrib: '18:07', isya: '19:24'},
    {hari: 'Kamis', tanggal: 4, imsak: '04:16', subuh: '04:34', dzuhur: '11:56', ashar: '15:29', berbuka: '17:53', maghrib: '18:08', isya: '19:25'},
    {hari: 'Jumat', tanggal: 5, imsak: '04:15', subuh: '04:33', dzuhur: '11:57', ashar: '15:30', berbuka: '17:54', maghrib: '18:09', isya: '19:26'},
  ],
  medan: [
    {hari: 'Senin', tanggal: 1, imsak: '04:26', subuh: '04:44', dzuhur: '12:02', ashar: '15:35', berbuka: '17:58', maghrib: '18:13', isya: '19:30'},
    {hari: 'Selasa', tanggal: 2, imsak: '04:25', subuh: '04:43', dzuhur: '12:03', ashar: '15:36', berbuka: '17:59', maghrib: '18:14', isya: '19:31'},
    {hari: 'Rabu', tanggal: 3, imsak: '04:24', subuh: '04:42', dzuhur: '12:03', ashar: '15:36', berbuka: '18:00', maghrib: '18:15', isya: '19:32'},
    {hari: 'Kamis', tanggal: 4, imsak: '04:23', subuh: '04:41', dzuhur: '12:04', ashar: '15:37', berbuka: '18:01', maghrib: '18:16', isya: '19:33'},
    {hari: 'Jumat', tanggal: 5, imsak: '04:22', subuh: '04:40', dzuhur: '12:05', ashar: '15:38', berbuka: '18:02', maghrib: '18:17', isya: '19:34'},
  ],
  yogyakarta: [
    {hari: 'Senin', tanggal: 1, imsak: '04:24', subuh: '04:42', dzuhur: '12:00', ashar: '15:33', berbuka: '17:56', maghrib: '18:11', isya: '19:28'},
    {hari: 'Selasa', tanggal: 2, imsak: '04:23', subuh: '04:41', dzuhur: '12:01', ashar: '15:34', berbuka: '17:57', maghrib: '18:12', isya: '19:29'},
    {hari: 'Rabu', tanggal: 3, imsak: '04:22', subuh: '04:40', dzuhur: '12:01', ashar: '15:34', berbuka: '17:58', maghrib: '18:13', isya: '19:30'},
    {hari: 'Kamis', tanggal: 4, imsak: '04:21', subuh: '04:39', dzuhur: '12:02', ashar: '15:35', berbuka: '17:59', maghrib: '18:14', isya: '19:31'},
    {hari: 'Jumat', tanggal: 5, imsak: '04:20', subuh: '04:38', dzuhur: '12:03', ashar: '15:36', berbuka: '18:00', maghrib: '18:15', isya: '19:32'},
  ],
  bali: [
    {hari: 'Senin', tanggal: 1, imsak: '04:11', subuh: '04:29', dzuhur: '11:46', ashar: '15:19', berbuka: '17:38', maghrib: '17:53', isya: '19:10'},
    {hari: 'Selasa', tanggal: 2, imsak: '04:10', subuh: '04:28', dzuhur: '11:47', ashar: '15:20', berbuka: '17:39', maghrib: '17:54', isya: '19:11'},
    {hari: 'Rabu', tanggal: 3, imsak: '04:09', subuh: '04:27', dzuhur: '11:47', ashar: '15:20', berbuka: '17:40', maghrib: '17:55', isya: '19:12'},
    {hari: 'Kamis', tanggal: 4, imsak: '04:08', subuh: '04:26', dzuhur: '11:48', ashar: '15:21', berbuka: '17:41', maghrib: '17:56', isya: '19:13'},
    {hari: 'Jumat', tanggal: 5, imsak: '04:07', subuh: '04:25', dzuhur: '11:49', ashar: '15:22', berbuka: '17:42', maghrib: '17:57', isya: '19:14'},
  ]
};

// ============================================
// FUNGSI TOMBOL TAMPILKAN
// ============================================

function handleCitySearch() {
  const citySelect = document.getElementById('citySelect');
  const searchBtn = document.getElementById('searchBtn');
  const scheduleTable = document.getElementById('scheduleTable');
  
  if (!citySelect || !searchBtn || !scheduleTable) {
    console.error('Element not found');
    return;
  }
  
  const city = citySelect.value;
  
  // Show loading
  searchBtn.disabled = true;
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
  
  // Populate table
  setTimeout(() => {
    populateTable(city);
    
    // Reset button
    searchBtn.disabled = false;
    searchBtn.innerHTML = '<i class="fas fa-search"></i> Tampilkan';
  }, 300);
}

// ============================================
// FUNGSI POPULATE TABLE
// ============================================

function populateTable(city = 'jakarta') {
  const table = document.getElementById('scheduleTable');
  
  if (!table || !jadwalData[city]) {
    console.error('Table or city data not found');
    return;
  }
  
  table.innerHTML = '';
  
  jadwalData[city].forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="padding: 1rem; font-weight: 600; color: var(--primary-green);">${item.hari}</td>
      <td style="padding: 1rem; text-align: center; color: var(--text-light);">${item.tanggal} Ramadhan</td>
      <td style="padding: 1rem; text-align: center; color: #047857; font-weight: 600;">${item.imsak}</td>
      <td style="padding: 1rem; text-align: center; color: #1e40af; font-weight: 600;">${item.subuh}</td>
      <td style="padding: 1rem; text-align: center; color: #b45309; font-weight: 600;">${item.dzuhur}</td>
      <td style="padding: 1rem; text-align: center; color: #c2410c; font-weight: 600;">${item.ashar}</td>
      <td style="padding: 1rem; text-align: center; color: #dc2626; font-weight: 600;">${item.berbuka}</td>
      <td style="padding: 1rem; text-align: center; color: #7c2d12; font-weight: 600;">${item.maghrib}</td>
      <td style="padding: 1rem; text-align: center; color: #7c3aed; font-weight: 600;">${item.isya}</td>
    `;
    row.style.borderBottom = '1px solid #e0e0e0';
    row.addEventListener('mouseenter', () => row.style.background = '#fef5e7');
    row.addEventListener('mouseleave', () => row.style.background = 'white');
    table.appendChild(row);
  });
}

// ============================================
// ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Load default city (Jakarta)
  populateTable('jakarta');
  
  // Button hover effect
  const btn = document.getElementById('searchBtn');
  if (btn) {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  }
});
