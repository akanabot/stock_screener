// frontend/src/components/ScreenerTable.jsx
import StockRow from './StockRow';

export default function ScreenerTable({ stocks }) {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-lg shadow-md border border-gray-200">
        <p className="text-gray-500 text-lg" style={{ fontFamily: 'Helvetica, sans-serif' }}>Tidak ada saham yang lolos screening hari ini.</p>
      </div>
    );
  }

  return (
    // Potongan di ScreenerTable.jsx
    <div className="overflow-x-auto rounded-lg border-1  shadow-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border border-gray-600 text-left text-xs font-black  tracking-widest">Ticker</th>
            <th className="p-3 border border-gray-600 text-left text-xs font-black uppercase tracking-widest">Harga</th>
            <th className="p-3 border border-gray-600 text-left text-xs font-black uppercase tracking-widest">Chg%</th>
            <th className="p-3 border border-gray-600 text-center text-xs font-black uppercase tracking-widest">Skor</th>
            <th className="p-3 border border-gray-600 text-center text-xs font-black uppercase tracking-widest hidden md:table-cell">RSI</th>
            <th className="p-3 border border-gray-600 text-center text-xs font-black uppercase tracking-widest hidden md:table-cell">Vol Ratio</th>
            <th className="p-3 border border-gray-600 text-center text-xs font-black uppercase tracking-widest">Signal</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <StockRow key={stock.ticker} data={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
