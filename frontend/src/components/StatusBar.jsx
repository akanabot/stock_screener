// frontend/src/components/StatusBar.jsx

export default function StatusBar({ metadata }) {
  if (!metadata) return null;

  // Indikator warna dot berdasarkan status
  const dotColor = 
    metadata.status === 'ok' ? 'bg-green-500' : 
    metadata.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500';

  // Format waktu khusus untuk menampilkan Hari dan Jam
  const formatFullTime = (isoString) => {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    
    // Menggunakan opsi Intl untuk mendapatkan format: Senin, 14:30
    return date.toLocaleString('id-ID', { 
      weekday: 'long', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false, // Menggunakan format 24 jam
      timeZone: 'Asia/Jakarta' 
    });
  };

  return (
    <div className="flex items-center text-xs md:text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-all hover:shadow-md">
      {/* Dot Status dengan efek Pulse */}
      <span className={`relative flex h-2 w-2 mr-3`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}></span>
      </span>
      
      <span className="tracking-tight">
        Data Bursa: <span className="font-bold text-gray-800">{formatFullTime(metadata.generated_at)} WIB</span> 
        <span> </span>
        <span className="text-gray-400 italic">Auto-refresh 5m</span>
      </span>
    </div>
  );
}