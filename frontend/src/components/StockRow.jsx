import ScoreBadge from './ScoreBadge';

export default function StockRow({ data }) {
  const formatRp = (num) => "Rp " + (num ? num.toLocaleString('id-ID') : '0');
  
  const isPositive = data.price_change_pct > 0;
  const isNegative = data.price_change_pct < 0;
  const pctColor = isPositive ? "text-green-700" : isNegative ? "text-red-700" : "text-gray-900";
  const pctSign = isPositive ? "+" : "";

  const hasOutcome = data.outcome !== undefined;
  const isWin = data.outcome === "WIN";

  // Shared border class: Menggunakan border tebal gray-300
  const tdClass = "p-3 border border-gray-300 text-sm vertical-middle";

  return (
    <tr style={{fontFamily: 'Helvetica, sans-serif'}}>
      {/* Kolom Ticker dengan Persegi Ujung Lingkaran (Badge) */}
      <td className={`${tdClass} text-center`}>
        <div className="inline-block bg-gray-300 px-3 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-sm">
          {data.ticker_display}
        </div>
      </td>

      <td className={`${tdClass} font-bold text-gray-900 text-center`}>
        {formatRp(data.price_close)}
      </td>
      
      <td className={`${tdClass} font-bold ${pctColor} text-center`}>
        {pctSign}{data.price_change_pct}%
      </td>

      <td className={`${tdClass}`}>
        <div className="flex justify-center">
          <ScoreBadge score={data.score} />
        </div>
      </td>

      <td className={`${tdClass} hidden md:table-cell text-center font-bold text-gray-700`}>
        {data.rsi_14}
      </td>

      <td className={`${tdClass} hidden md:table-cell text-center font-bold text-gray-700`}>
        {data.volume_ratio}&times;
      </td>

      <td className={`${tdClass}`}>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="font-black text-xs uppercase tracking-tighter">
            {data.signal}
          </span>
          {hasOutcome && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
              isWin 
                ? 'bg-green-100  text-green-800 border-green-400' 
                : 'bg-red-100 text-red-800 border-red-400'
            }`}>
              {isWin ? 'WIN' : 'LOSS'} ({data.actual_gain_pct > 0 ? '+' : ''}{data.actual_gain_pct}%)
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}