// frontend/src/components/FilterBar.jsx

export default function FilterBar({ currentFilter, setFilter, currentSort, setSort, availableDates, selectedDate, setSelectedDate }) {
  // Format tanggal hari ini GMT+7 (WIB)
  const todayWIB = new Date().toLocaleDateString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'); // Format YYYY-MM-DD

  // Update class untuk menghilangkan efek border tambahan saat aktif
  const filterBtnClass = (isActive) =>
    `px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 border outline-none focus:outline-none ${isActive
      ? "bg-blue-600 text-white border-transparent" // Saat terpilih: BG Biru, Border hilang/transparan
      : "bg-white text-gray-700 border-transparent hover:bg-gray-100" // Tidak terpilih: BG Putih, Border transparan
    }`;

  return (
    <div className="flex flex-col mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200 gap-4">
      {/* Baris Atas: Pemilih Tanggal Histori + Hari Ini */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-3 border-b border-gray-100">
        <label htmlFor="history-date" className="text-sm text-gray-700 font-bold whitespace-nowrap" style={{ fontFamily: 'Helvetica, sans-serif' }}>Histori Screening:</label>
        <select
          id="history-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ fontFamily: 'Helvetica, sans-serif', colorScheme: 'light' }}
          className="bg-white border border-blue-200 text-blue-900 text-sm rounded-md block p-2 w-full sm:w-auto cursor-pointer font-medium outline-none focus:outline-none focus:ring-0"
        >
          {/* Opsi Hari Ini selalu ada dan di atas */}
          <option value={todayWIB}>{todayWIB} (HARI INI)</option>
          {availableDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
          {availableDates.length === 0 && <option value="">Belum ada data histori</option>}
        </select>
      </div>

      {/* Baris Bawah: Filter & Sort */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
  <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
    <button
      className={`${filterBtnClass(currentFilter === 'ALL')} font-bold`}
      onClick={() => setFilter('ALL')}
      style={{ fontFamily: 'Helvetica, sans-serif' }}
    >
      SEMUA
    </button>
    <button
      className={`${filterBtnClass(currentFilter === 'STRONG')} font-bold`}
      onClick={() => setFilter('STRONG')}
      style={{ fontFamily: 'Helvetica, sans-serif' }}
    >
      SKOR ≥ 70
    </button>
    <button
      className={`${filterBtnClass(currentFilter === 'MODERATE')} font-bold`}
      onClick={() => setFilter('MODERATE')}
      style={{ fontFamily: 'Helvetica, sans-serif' }}
    >
      SKOR ≥ 50
    </button>
  </div>
</div>
    </div>
  );
}
