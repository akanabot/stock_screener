export default function HighlightCards({ dayData }) {
  // Pastikan data ada, jika tidak, tampilkan loading/null agar tidak crash
  if (!dayData || !dayData.results || dayData.results.length === 0) {
    return (
      <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
        <p className="text-sm font-bold text-yellow-700 text-center uppercase tracking-widest">
           Menunggu Data Bursa Tersedia...
        </p>
      </div>
    );
  }

  // 1. Ambil Top Pick (Saham skor tertinggi)
  const topPick = dayData.results.reduce((max, stock) => (max.score > stock.score ? max : stock), dayData.results[0]);

  // Kalkulasi Harga (Pastikan angka valid)
  const buyPrice = topPick.price_close || 0;
  const tpPrice = Math.round(buyPrice * 1.02); // Target +2% (lebih masuk akal untuk Bluechip)
  const clPrice = Math.round(buyPrice * 0.98); // Cutloss -2%
  const formatRp = (num) => "Rp " + Math.round(num).toLocaleString('id-ID');

  // 2. Logika Market Sentiment (Disesuaikan untuk 80 emiten)
  const totalPassed = dayData.results.length;
  let sentimentStr = "NEUTRAL";
  let sentimentColor = "text-blue-600 bg-blue-50 border-blue-200";
  let sentimentDesc = "Peluang BSJP seimbang. Fokus pada emiten dengan skor > 70.";

  if (totalPassed >= 15) {
    sentimentStr = "BULLISH / OPTIMIS";
    sentimentColor = "text-green-700 bg-green-50 border-green-300";
    sentimentDesc = "Banyak emiten terdeteksi akumulasi. Market sedang bergairah.";
  } else if (totalPassed <= 5) {
    sentimentStr = "BEARISH / CAUTIOUS";
    sentimentColor = "text-red-700 bg-red-50 border-red-300";
    sentimentDesc = "Sedikit sinyal terdeteksi. Disarankan 'Wait & See' atau porsi kecil.";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" style={{ fontFamily: 'Helvetica, sans-serif' }}>
      {/* CARD 1: TOP PICK */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Highlight Sinyal</h3>
            <span className="bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
              SCORE: {topPick.score}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-4xl font-black text-gray-900 uppercase leading-none">{topPick.ticker_display}</h2>
            <p className="text-xl font-bold italic text-blue-700 uppercase">{topPick.signal}</p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-gray-50 px-2 py-3 rounded-md border border-gray-100 ">
          <div className="flex-1 flex flex-col items-center">
            <p className="text-[9px] text-black font-bold uppercase mb-0.5">Entry</p>
            <p className="text-sm font-black text-black">{formatRp(buyPrice)}</p>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex-1 flex flex-col items-center">
            <p className="text-[9px] text-green-600 font-bold uppercase mb-0.5">Target</p>
            <p className="text-sm font-black text-green-600">{formatRp(tpPrice)}</p>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex-1 flex flex-col items-center">
            <p className="text-[9px] text-red-600 font-bold uppercase mb-0.5">Stoploss</p>
            <p className="text-sm font-black text-red-600">{formatRp(clPrice)}</p>
          </div>
        </div>
      </div>

      {/* CARD 2: SENTIMENT */}
      <div className={`p-5 rounded-lg shadow-md border-2 flex flex-col justify-between transition-all ${sentimentColor}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-70">Market Pulse</h3>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/40 border border-current">
              {totalPassed} EMITEN LOLOS
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase mt-1 mb-1 tracking-tighter">{sentimentStr}</h2>
        </div>
        <p className="text-sm font-sm leading-snug">
          {sentimentDesc}
        </p>
      </div>
    </div>
  );
}